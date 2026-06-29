"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { cafeConfig } from "@/config/cafe";
import { useReducedMotion } from "./useReducedMotion";

export default function LoadingScreen() {
  const router = useRouter();
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          scale: shouldReduceMotion ? 1 : 1.1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            router.push("/home");
          },
        });
      },
    });

    if (!shouldReduceMotion) {
      // Background gradient animation
      tl.to(containerRef.current, {
        background: "radial-gradient(circle, #F7F3EE 0%, #EDE5DA 100%)",
        duration: 1.1,
        yoyo: true,
        repeat: 1, // Repeat once for 2.2s total
      }, 0);

      // Logo clay bounce
      tl.fromTo(
        logoRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        },
        0.2
      );

      // Name fade in and drift
      tl.fromTo(
        nameRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        0.8
      );

      // Ensure the timeline takes at least 2.2s
      tl.add(() => {}, 2.2);
    } else {
      tl.to(logoRef.current, { opacity: 1, duration: 0.5 }, 0.2);
      tl.to(nameRef.current, { opacity: 1, duration: 0.5 }, 0.5);
      tl.to({}, { duration: 1.5 }); // Wait
      tl.add(() => {}, 2.2);
    }

    return () => {
      tl.kill();
    };
  }, [router, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F3EE] overflow-hidden"
    >
      <div ref={logoRef} className="relative w-32 h-32 mb-6">
        <Image
          src={cafeConfig.logo}
          alt={cafeConfig.name}
          fill
          className="object-contain drop-shadow-clay"
          priority
        />
      </div>
      <h1
        ref={nameRef}
        className="text-4xl font-playfair font-bold text-text-primary"
      >
        {cafeConfig.name}
      </h1>
    </div>
  );
}
