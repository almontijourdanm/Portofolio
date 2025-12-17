"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  isModelLoaded: boolean;
}

export default function LoadingScreen({ onLoadingComplete, isModelLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const spinner2Ref = useRef<HTMLDivElement>(null);
  const spinner3Ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLParagraphElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP animations on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Container fade in with scale
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      // Logo entrance animation - dramatic bounce
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -360, y: -100 },
        { 
          scale: 1, 
          rotation: 0, 
          y: 0,
          duration: 1.2, 
          ease: "elastic.out(1, 0.6)",
          delay: 0.2
        }
      );

      // Logo continuous breathing/pulse
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2
      });

      // Spinner 1 - fast rotation
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "linear",
      });

      // Spinner 2 - reverse rotation
      gsap.to(spinner2Ref.current, {
        rotation: -360,
        duration: 3,
        repeat: -1,
        ease: "linear",
      });

      // Spinner 3 - slower rotation
      gsap.to(spinner3Ref.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "linear",
      });

      // Glow pulse effect
      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Logo text - dramatic entrance with color shift
      gsap.fromTo(
        logoTextRef.current,
        { opacity: 0, scale: 0.5, rotationY: 180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotationY: 0,
          duration: 0.8, 
          delay: 0.8,
          ease: "back.out(2)"
        }
      );

      // Text floating animation
      gsap.to(logoTextRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.6
      });

      // Loading text entrance - stagger letters effect
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.8, 
          delay: 0.5, 
          ease: "power3.out" 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [progress]);

  // Particles animation - more dynamic and numerous
  useEffect(() => {
    if (!isMounted || !particlesRef.current) return;

    const particles = particlesRef.current.querySelectorAll(".particle");
    
    particles.forEach((particle, i) => {
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      const randomDuration = Math.random() * 2 + 1.5;
      const randomDelay = Math.random() * 1.5;
      const randomRotation = Math.random() * 360;
      const randomScale = Math.random() * 2 + 1;

      gsap.set(particle, { 
        x: randomX, 
        y: randomY, 
        opacity: 0,
        rotation: randomRotation,
        scale: randomScale
      });

      // More dramatic particle movement
      gsap.to(particle, {
        y: `-=${Math.random() * 200 + 100}`,
        x: `+=${(Math.random() - 0.5) * 100}`,
        rotation: `+=${360}`,
        scale: randomScale * 0.5,
        keyframes: [
          { opacity: 0, duration: 0 },
          { opacity: 0.8, duration: randomDuration / 4 },
          { opacity: 1, duration: randomDuration / 4 },
          { opacity: 0, duration: randomDuration / 2 },
        ],
        duration: randomDuration,
        repeat: -1,
        delay: randomDelay,
        ease: "power1.out",
      });
    });
  }, [isMounted]);

  // Progress in large jumps: 10 -> 20 -> 30 -> 40 -> wait for model -> 50 -> 60 -> 70 -> 80 -> 90 -> 100%
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Stop at 40% and wait for actual model to load
        if (prev >= 40 && prev < 100 && !isModelLoaded) {
          return prev;
        }
        // Once model is loaded, continue incrementing by 10% until 100%
        if (prev < 100) {
          return prev + 10;
        }
        return prev;
      });
    }, 400); // 400ms interval for visible jumps

    return () => clearInterval(timer);
  }, [isModelLoaded]);

  // Trigger exit animation when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        delay: 0.2,
        onComplete: onLoadingComplete,
      });
    }
  }, [progress, onLoadingComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950"
      style={{ opacity: 0 }}
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Logo with multiple spinners */}
        <div ref={logoRef} className="relative">
          {/* Glow effect */}
          <div
            ref={glowRef}
            className="absolute inset-0 w-32 h-32 -translate-x-4 -translate-y-4 bg-blue-500/20 rounded-full blur-2xl"
          />
          
          {/* Outer spinner */}
          <div
            ref={spinner3Ref}
            className="absolute -inset-6 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
          />
          
          {/* Middle spinner */}
          <div
            ref={spinner2Ref}
            className="absolute -inset-3 border-4 border-blue-500/40 border-t-blue-500 rounded-full"
          />
          
          {/* Inner spinner */}
          <div
            ref={spinnerRef}
            className="w-24 h-24 border-4 border-cyan-400 border-t-transparent rounded-full shadow-lg shadow-cyan-500/50"
          />
          
          {/* Logo image with enhanced styling */}
          <div ref={logoTextRef} className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/icon0.svg" 
              alt="Logo" 
              className="w-20 h-20 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            />
          </div>
        </div>

        {/* Loading Text */}
        <div ref={textRef} className="flex flex-col items-center gap-4">
          {/* <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Loading Portfolio
          </h2> */}
          
          {/* Progress Bar with glow */}
          {/* <div className="w-72 h-3 bg-gray-800/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm border border-blue-500/20">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 relative"
              style={{ width: "0%" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div> */}
          
          {/* Percentage */}
          {/* <p
            ref={percentageRef}
            className="text-cyan-300 text-2xl font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          >
            {progress}%
          </p> */}
        </div>

        {/* Animated Particles - increased count */}
        {isMounted && (
          <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="particle absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, rgba(34,211,238,1) 0%, rgba(34,211,238,0) 70%)'
                    : i % 3 === 1
                    ? 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%)'
                    : 'radial-gradient(circle, rgba(168,85,247,1) 0%, rgba(168,85,247,0) 70%)',
                  boxShadow: '0 0 10px currentColor'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
