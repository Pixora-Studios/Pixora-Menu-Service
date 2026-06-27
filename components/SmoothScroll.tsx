"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initLenis = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Connect Lenis to ScrollTrigger
      // Note: ReactLenis handles the internal instance, but we need GSAP to know about it if we do advanced triggers
    };

    initLenis();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
