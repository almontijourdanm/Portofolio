"use client";

import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimatedModel } from "@/components/animated-model";

// declare global {
//   interface Window {
//     requestIdleCallback?: (
//       callback: IdleRequestCallback,
//       options?: IdleRequestOptions
//     ) => number;
//     cancelIdleCallback?: (handle: number) => void;
//   }
// }

function StaticHeroVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:border-white/10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <Image
          src="/icon0.svg"
          alt="Almonti Jourdan logo"
          width={112}
          height={112}
          priority={false}
          className="h-24 w-24"
        />
        <div>
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            Interactive 3D preview
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Deferred to keep the homepage fast for visitors and crawlers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomeHeroScene() {
  const [shouldRenderScene, setShouldRenderScene] = useState(false);
  const [shouldUseStaticVisual, setShouldUseStaticVisual] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCrawler =
      /bot|crawler|spider|crawling|googlebot|bingbot|duckduckbot|yandexbot/i.test(
        navigator.userAgent
      );

    if (prefersReducedMotion || isCrawler) {
      setShouldUseStaticVisual(true);
      return;
    }

    if (window.requestIdleCallback) {
      const idleId = window.requestIdleCallback(
        () => {
          useGLTF.preload("/trashbaggius_balloonius-_free_as_freedom.glb");
          setShouldRenderScene(true);
        },
        { timeout: 1500 }
      );

      return () => {
        window.cancelIdleCallback?.(idleId);
      };
    }

    timer = window.setTimeout(() => {
      useGLTF.preload("/trashbaggius_balloonius-_free_as_freedom.glb");
      setShouldRenderScene(true);
    }, 900);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  if (shouldUseStaticVisual || !shouldRenderScene) {
    return <StaticHeroVisual />;
  }

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        className="h-full w-full bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.35),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.25),transparent_70%)]"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />

        <Suspense fallback={null}>
          <Bounds fit clip margin={1.2}>
            <AnimatedModel
              modelPath="/trashbaggius_balloonius-_free_as_freedom.glb"
              scale={2.4}
              position={[0, -5, 0]}
              autoRotate
              onLoaded={() => setModelLoaded(true)}
            />
          </Bounds>

          <Environment preset="forest" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.08}
        />
      </Canvas>

      {!modelLoaded && (
        <div className="absolute inset-0 transition-opacity duration-300">
          <StaticHeroVisual />
        </div>
      )}
    </div>
  );
}