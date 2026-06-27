"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <PageTransition>
        {!loading && (
          <main className="bg-bg">
            <Hero />
          </main>
        )}
      </PageTransition>
    </>
  );
}
