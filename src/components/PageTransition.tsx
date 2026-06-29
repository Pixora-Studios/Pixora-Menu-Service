"use client";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="bg-background min-h-screen overflow-x-hidden">{children}</div>;
}
