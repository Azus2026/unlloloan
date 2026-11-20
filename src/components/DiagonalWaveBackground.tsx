import { useEffect, useRef } from "react";
import * as THREE from "three";

const WAVE_GLSL_HELPERS = `
  float computeWaveHeight(vec2 uvCoord, float t) {
    float primary = sin(uvCoord.x * 0.48 - t * 0.72 + uvCoord.y * 0.24) * 0.92;
    float harmonic = cos(uvCoord.x * 0.94 - t * 1.12 - uvCoord.y * 0.36) * 0.36;
    float swell = sin(uvCoord.x * 0.24 - t * 0.38 + cos(uvCoord.y * 0.42) * 1.15) * 0.58;
    float ripple = sin((uvCoord.x + uvCoord.y * 0.5) * 1.45 - t * 1.48) * 0.14;
    return primary + harmonic + swell + ripple;
  }
`;

const SILK_VERTEX_SHADER = `
  uniform float uTime;
  varying float vHeight;
  varying vec2 vLocalPos;
  varying float vSlope;

  ${WAVE_GLSL_HELPERS}

  void main() {
    vec3 pos = position;
    float h = computeWaveHeight(pos.xy, uTime);
    float hx = computeWaveHeight(pos.xy + vec2(0.15, 0.0), uTime);
    float hy = computeWaveHeight(pos.xy + vec2(0.0, 0.15), uTime);

    pos.z += h;
    vHeight = h;
    vLocalPos = pos.xy;
    vSlope = length(vec2(hx - h, hy - h)) * 6.5;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SILK_FRAGMENT_SHADER = `
  varying float vHeight;
  varying vec2 vLocalPos;
  varying float vSlope;

  void main() {
    float edgeX = smoothstep(16.0, 4.5, abs(vLocalPos.x));
    float edgeY = smoothstep(9.0, 2.0, abs(vLocalPos.y));
    float radialMask = edgeX * edgeY;

    float crest = smoothstep(-0.8, 1.5, vHeight);
    float sheen = clamp(vSlope * 0.45 + crest * 0.55, 0.0, 1.0);

    vec3 obsidian = vec3(0.04, 0.038, 0.03);
    vec3 champagne = vec3(0.831, 0.722, 0.525);
    vec3 pearl = vec3(0.92, 0.90, 0.87);

    vec3 color = mix(obsidian, champagne, pow(crest, 1.55) * 0.48);
    color = mix(color, pearl, pow(sheen, 2.8) * 0.28);

    float alpha = radialMask * (0.05 + pow(crest, 1.7) * 0.24 + pow(sheen, 2.4) * 0.14);
    gl_FragColor = vec4(color, alpha);
  }
`;

const THREAD_VERTEX_SHADER = `
  uniform float uTime;
  attribute float aRibbonIndex;
  varying float vHeight;
  varying vec2 vLocalPos;
  varying float vRibbonIndex;

  ${WAVE_GLSL_HELPERS}

  void main() {
    vec3 pos = position;
    float h = computeWaveHeight(pos.xy, uTime);
    pos.z += h + 0.05;
    vHeight = h;
    vLocalPos = pos.xy;
    vRibbonIndex = aRibbonIndex;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const THREAD_FRAGMENT_SHADER = `
  varying float vHeight;
  varying vec2 vLocalPos;
  varying float vRibbonIndex;

  void main() {
    float edgeX = smoothstep(16.0, 5.0, abs(vLocalPos.x));
    float edgeY = smoothstep(8.6, 2.4, abs(vLocalPos.y));
    float crest = smoothstep(-0.7, 1.45, vHeight);
    float diagonalGlow = smoothstep(-14.0, 11.0, vLocalPos.x);

    vec3 champagne = vec3(0.831, 0.722, 0.525);
    vec3 silver = vec3(0.85, 0.84, 0.81);
    float toneMix = 0.5 + 0.5 * sin(vRibbonIndex * 3.14159 * 2.0);
    vec3 lineColor = mix(champagne, silver, toneMix * 0.45);

    float alpha = edgeX * edgeY * (0.09 + pow(crest, 1.45) * 0.40) * (0.76 + diagonalGlow * 0.35);
    gl_FragColor = vec4(lineColor, alpha);
  }
`;

const PARTICLE_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aSpeed;
  attribute float aPhase;
  varying float vAlpha;

  ${WAVE_GLSL_HELPERS}

  void main() {
    vec3 pos = position;
    float span = 30.0;
    float shiftedX = mod(pos.x + 15.0 + uTime * aSpeed, span) - 15.0;
    pos.x = shiftedX;

    float h = computeWaveHeight(pos.xy, uTime);
    pos.z += h + 0.22 + sin(uTime * 0.6 + aPhase) * 0.12;

    float edgeX = smoothstep(15.0, 6.0, abs(pos.x));
    float edgeY = smoothstep(8.0, 2.5, abs(pos.y));
    float twinkle = 0.45 + 0.55 * sin(uTime * 1.4 + aPhase);
    vAlpha = edgeX * edgeY * twinkle * 0.65;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (1.6 + twinkle * 1.1) * uPixelRatio * (10.0 / max(-mvPosition.z, 1.0));
  }
`;

const PARTICLE_FRAGMENT_SHADER = `
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float soft = smoothstep(0.5, 0.08, dist);
    vec3 gold = vec3(0.87, 0.78, 0.61);
    gl_FragColor = vec4(gold, soft * vAlpha);
  }
`;

export function DiagonalWaveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.25, 11.4);
    camera.lookAt(0, 0, 0);

    const waveGroup = new THREE.Group();
    waveGroup.rotation.order = "ZYX";
    // Positive Z rotation aligns +X from bottom-left to top-right across the viewport.
    waveGroup.rotation.z = 0.56;
    waveGroup.rotation.x = -0.68;
    waveGroup.position.set(0.2, -0.35, -0.8);
    scene.add(waveGroup);

    const uniforms = {
      uTime: { value: 1.8 },
      uPixelRatio: { value: pixelRatio },
    };

    const silkGeometry = new THREE.PlaneGeometry(32, 18, 132, 60);
    const silkMaterial = new THREE.ShaderMaterial({
      vertexShader: SILK_VERTEX_SHADER,
      fragmentShader: SILK_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const silkMesh = new THREE.Mesh(silkGeometry, silkMaterial);
    waveGroup.add(silkMesh);

    const ribbonCount = 44;
    const segmentsPerRibbon = 140;
    const threadPositions: number[] = [];
    const ribbonIndices: number[] = [];

    for (let r = 0; r < ribbonCount; r++) {
      const ratio = r / (ribbonCount - 1);
      const y = (ratio - 0.5) * 16.4;
      for (let s = 0; s < segmentsPerRibbon; s++) {
        const x0 = (s / segmentsPerRibbon - 0.5) * 32;
        const x1 = ((s + 1) / segmentsPerRibbon - 0.5) * 32;
        threadPositions.push(x0, y, 0, x1, y, 0);
        ribbonIndices.push(ratio, ratio);
      }
    }

    const threadGeometry = new THREE.BufferGeometry();
    threadGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(threadPositions, 3),
    );
    threadGeometry.setAttribute(
      "aRibbonIndex",
      new THREE.Float32BufferAttribute(ribbonIndices, 1),
    );

    const threadMaterial = new THREE.ShaderMaterial({
      vertexShader: THREAD_VERTEX_SHADER,
      fragmentShader: THREAD_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const threadLines = new THREE.LineSegments(threadGeometry, threadMaterial);
    waveGroup.add(threadLines);

    const particleCount = 150;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    const particlePhases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const seed = (i * 9301 + 49297) % 233280;
      const n1 = seed / 233280;
      const n2 = ((i * 4253 + 17891) % 233280) / 233280;
      const n3 = ((i * 7127 + 8419) % 233280) / 233280;

      particlePositions[i * 3] = (n1 - 0.5) * 30;
      particlePositions[i * 3 + 1] = (n2 - 0.5) * 15.2;
      particlePositions[i * 3 + 2] = 0;
      particleSpeeds[i] = 0.65 + n3 * 1.15;
      particlePhases[i] = n1 * Math.PI * 2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    particleGeometry.setAttribute(
      "aSpeed",
      new THREE.BufferAttribute(particleSpeeds, 1),
    );
    particleGeometry.setAttribute(
      "aPhase",
      new THREE.BufferAttribute(particlePhases, 1),
    );

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX_SHADER,
      fragmentShader: PARTICLE_FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    waveGroup.add(particles);

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.x = (event.clientX / window.innerWidth - 0.5) * 0.45;
      pointerTarget.y = -(event.clientY / window.innerHeight - 0.5) * 0.3;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const renderFrame = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      if (!prefersReducedMotion) {
        uniforms.uTime.value += delta * 0.85;
      }

      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.04;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.04;

      camera.position.x = pointerCurrent.x;
      camera.position.y = 0.25 + pointerCurrent.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      silkGeometry.dispose();
      silkMaterial.dispose();
      threadGeometry.dispose();
      threadMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    />
  );
}
