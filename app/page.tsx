"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Hero />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]">
        <div className="absolute inset-0 bg-[url('/noise.png')] bg-repeat"></div>
      </div>
    </main>
  );
}
