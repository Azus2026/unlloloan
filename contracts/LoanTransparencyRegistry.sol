// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract LoanTransparencyRegistry {
    enum LoanState {
        PreFunding,
        Active,
        Repaid,
        Defaulted
    }

    enum Category {
        ArbitrageLiquidity,
        RpcWebSockets,
        GasPrivateBundles,
        DedicatedVps,
        TransparencyPortal
    }

    struct Expense {
        Category category;
        uint256 amountUsdc;
        uint64 timestamp;
        string vendor;
        string receiptIpfsCid;
        bytes32 paymentTxHash;
    }

    error Unauthorized();
    error InvalidBorrower();
    error InvalidState(LoanState expected, LoanState current);
    error InvalidAmount();
    error CategoryCapExceeded(Category category, uint256 attempted, uint256 cap);
    error EmptyMetadata();
    error ExpenseOutOfBounds(uint256 expenseId);

    uint256 public constant TARGET_PRINCIPAL_USDC = 10_000 * 1e6;
    uint16 public constant MAX_APR_BPS = 2000;

    address public immutable borrower;
    LoanState public state;
    uint256 public fundedPrincipalUsdc;
    uint256 public repaidUsdc;
    uint64 public activatedAt;
    uint64 public maturityTimestamp;
    string public unllooLoanReference;

    mapping(Category => uint256) public categoryCapUsdc;
    mapping(Category => uint256) public categorySpentUsdc;
    Expense[] private expenses;

    event LoanActivated(uint256 fundedUsdc, uint64 maturityTimestamp, string unllooLoanReference);
    event ExpenseLogged(
        uint256 indexed expenseId,
        Category indexed category,
        uint256 amountUsdc,
        string vendor,
        string receiptIpfsCid,
        bytes32 paymentTxHash
    );
    event RepaymentRecorded(uint256 amountUsdc, bytes32 repaymentTxHash, bool completed);

    modifier onlyBorrower() {
        if (msg.sender != borrower) revert Unauthorized();
        _;
    }

    constructor(address _borrower) {
        if (_borrower == address(0)) revert InvalidBorrower();
        borrower = _borrower;
        state = LoanState.PreFunding;

        categoryCapUsdc[Category.ArbitrageLiquidity] = 6_000 * 1e6;
        categoryCapUsdc[Category.RpcWebSockets] = 1_500 * 1e6;
        categoryCapUsdc[Category.GasPrivateBundles] = 1_400 * 1e6;
        categoryCapUsdc[Category.DedicatedVps] = 600 * 1e6;
        categoryCapUsdc[Category.TransparencyPortal] = 500 * 1e6;
    }

    function activateLoan(
        uint256 _fundedUsdc,
        uint64 _maturityTimestamp,
        string calldata _unllooLoanReference
    ) external onlyBorrower {
        if (state != LoanState.PreFunding) revert InvalidState(LoanState.PreFunding, state);
        if (_fundedUsdc == 0 || _fundedUsdc > TARGET_PRINCIPAL_USDC) revert InvalidAmount();
        if (_maturityTimestamp <= block.timestamp) revert InvalidAmount();

        state = LoanState.Active;
        fundedPrincipalUsdc = _fundedUsdc;
        activatedAt = uint64(block.timestamp);
        maturityTimestamp = _maturityTimestamp;
        unllooLoanReference = _unllooLoanReference;

        emit LoanActivated(_fundedUsdc, _maturityTimestamp, _unllooLoanReference);
    }

    function logExpense(
        Category _category,
        uint256 _amountUsdc,
        string calldata _vendor,
        string calldata _receiptIpfsCid,
        bytes32 _paymentTxHash
    ) external onlyBorrower returns (uint256 expenseId) {
        if (state != LoanState.Active) revert InvalidState(LoanState.Active, state);
        if (_amountUsdc == 0) revert InvalidAmount();
        if (bytes(_vendor).length == 0 || bytes(_receiptIpfsCid).length == 0) revert EmptyMetadata();

        uint256 nextTotal = categorySpentUsdc[_category] + _amountUsdc;
        uint256 cap = categoryCapUsdc[_category];
        if (nextTotal > cap) revert CategoryCapExceeded(_category, nextTotal, cap);

        categorySpentUsdc[_category] = nextTotal;
        expenseId = expenses.length;

        expenses.push(
            Expense({
                category: _category,
                amountUsdc: _amountUsdc,
                timestamp: uint64(block.timestamp),
                vendor: _vendor,
                receiptIpfsCid: _receiptIpfsCid,
                paymentTxHash: _paymentTxHash
            })
        );

        emit ExpenseLogged(expenseId, _category, _amountUsdc, _vendor, _receiptIpfsCid, _paymentTxHash);
    }

    function recordRepayment(
        uint256 _amountUsdc,
        bytes32 _repaymentTxHash,
        bool _marksComplete
    ) external onlyBorrower {
        if (state != LoanState.Active) revert InvalidState(LoanState.Active, state);
        if (_amountUsdc == 0) revert InvalidAmount();

        repaidUsdc += _amountUsdc;
        if (_marksComplete) {
            state = LoanState.Repaid;
        }

        emit RepaymentRecorded(_amountUsdc, _repaymentTxHash, _marksComplete);
    }

    function expenseCount() external view returns (uint256) {
        return expenses.length;
    }

    function getExpense(uint256 _expenseId) external view returns (Expense memory) {
        if (_expenseId >= expenses.length) revert ExpenseOutOfBounds(_expenseId);
        return expenses[_expenseId];
    }

    function totalSpentUsdc() external view returns (uint256) {
        return
            categorySpentUsdc[Category.ArbitrageLiquidity] +
            categorySpentUsdc[Category.RpcWebSockets] +
            categorySpentUsdc[Category.GasPrivateBundles] +
            categorySpentUsdc[Category.DedicatedVps] +
            categorySpentUsdc[Category.TransparencyPortal];
    }
}
