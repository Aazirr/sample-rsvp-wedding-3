"use client";
import { useEffect, useState } from "react";

export default function RedLightLeak() {
  const [intensity, setIntensity] = useState(0.6);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        // Pulse between 0.4 and 1.0 based on scroll position
        const base = 0.4 + Math.sin(progress * Math.PI * 3) * 0.3;
        setIntensity(Math.max(0.4, Math.min(1, base)));
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="red-leak-left animate-leak" style={{ opacity: intensity }} />
      <div className="red-leak-right animate-leak" style={{ opacity: intensity * 0.8 }} />
      <div className="red-leak-bottom" />
    </>
  );
}
