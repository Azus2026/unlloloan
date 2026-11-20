import { ArrowLeft } from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";

interface NotFoundViewProps {
  readonly copy: CopyBundle["notFound"];
  readonly onGoHome: () => void;
}

export function NotFoundView({ copy, onGoHome }: NotFoundViewProps) {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#272727] bg-[#131209]/90 p-2 backdrop-blur-xl">
        <div className="rounded-lg border border-[#272727] bg-[#181818] p-8 text-center">
          <p className="font-mono text-sm font-normal text-[#D4B886]">{copy.code}</p>
          <h1 className="mt-3 text-3xl font-extralight tracking-tight text-[#F5F3EE]">
            {copy.title}
          </h1>
          <p className="mt-3 text-sm font-light text-[#B8B4AC]">{copy.body}</p>
          <button
            type="button"
            onClick={onGoHome}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#D4B886] px-3 py-2 text-base font-semibold text-black hover:bg-[#E2CA9E] active:scale-[0.98] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
          >
            <ArrowLeft size={16} weight="light" aria-hidden="true" />
            <span>{copy.backHome}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
