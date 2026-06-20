"use client";
import { useEffect, useState } from "react";
import { wedding, copy } from "@/content/config";

const STORAGE_KEY = "cj_intro_seen";

// Each entry: [left%, bottom%, width(px), height(px), delay(s), duration(s), peakOpacity]
// Puffs spread horizontally and grow outward — avoids the stacked "worm" look.
const PUFFS: [number, number, number, number, number, number, number][] = [
  // Core column — near center, tightest, fastest
  [49, 2, 130, 190, 0.0, 5.0, 0.80],
  [51, 4, 115, 170, 0.35, 4.8, 0.70],
  [47, 3, 155, 210, 0.65, 5.4, 0.65],
  // Mid spread — widening outward
  [42, 7, 210, 270, 1.1, 6.5, 0.50],
  [57, 5, 195, 255, 0.9, 6.2, 0.52],
  [36, 11, 270, 330, 1.6, 7.5, 0.36],
  [63, 9, 250, 310, 1.4, 7.2, 0.38],
  // Wide drift — filling the atmosphere
  [24, 15, 350, 410, 2.3, 8.8, 0.22],
  [73, 13, 320, 390, 2.1, 8.4, 0.24],
  [12, 19, 400, 460, 3.1, 9.8, 0.14],
  [83, 17, 370, 430, 2.9, 9.4, 0.16],
];

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"flare" | "smoke" | "crest">("flare");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY)) {
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setPhase("smoke"), 750);
    const t2 = setTimeout(() => setPhase("crest"), 2400);
    const t3 = setTimeout(finish, 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setExiting(true);
    setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      onComplete();
    }, 900);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#040302",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.9s ease",
      }}
    >
      {/* ── SVG turbulence filter — warps blobs into organic smoke wisps ── */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="smoke-warp" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.013 0.009"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Background photo — fades in behind the smoke ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/gallery/intro-bg.jpg'), url('/gallery/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          filter: "brightness(0.22) saturate(0.7)",
          opacity: phase === "crest" ? 1 : 0,
          transition: "opacity 2.8s ease",
          willChange: "opacity",
        }}
      />

      {/* Red glow from below — illuminates when photo appears */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(120,18,18,0.55) 0%, transparent 70%)",
          opacity: phase === "crest" ? 1 : 0,
          transition: "opacity 2s ease 0.8s",
        }}
      />

      {/* ── Lighter flare — point-source light at bottom center ── */}
      {phase === "flare" && (
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            left: "50%",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#fff9ee",
            boxShadow: [
              "0 0 4px 2px rgba(255,210,100,0.95)",
              "0 0 20px 10px rgba(230,130,20,0.75)",
              "0 0 60px 30px rgba(190,70,10,0.50)",
              "0 0 130px 65px rgba(140,30,5,0.28)",
              "0 0 240px 120px rgba(90,10,2,0.14)",
            ].join(", "),
            animation: "matchFlare 1.0s ease forwards",
          }}
        />
      )}

      {/* ── Smoke ── */}
      {(phase === "smoke" || phase === "crest") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: "url(#smoke-warp)",
            pointerEvents: "none",
          }}
        >
          {PUFFS.map(([left, bottom, w, h, delay, dur, op], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                bottom: `${bottom}%`,
                width: w,
                height: h,
                // translateX(-50%) is baked into the animation keyframes
                borderRadius: "50% 45% 55% 50%",
                background: `radial-gradient(ellipse 55% 65% at 50% 68%,
                  rgba(205,192,172,${op}) 0%,
                  rgba(170,158,140,${op * 0.55}) 38%,
                  rgba(130,120,108,${op * 0.2}) 62%,
                  transparent 75%)`,
                filter: `blur(${Math.round(w * 0.13)}px)`,
                mixBlendMode: "screen",
                animation: `smokeDrift ${dur}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s both`,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Crest ── */}
      {phase === "crest" && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
            padding: "0 2rem",
            textAlign: "center",
            animation: "fadeIn 1.6s ease both",
          }}
        >
          <div className="brass-rule" style={{ maxWidth: 180 }} />

          <div style={{ color: "var(--brass)", fontSize: "0.68rem", letterSpacing: "0.35em" }}>
            ✦ ✦ ✦
          </div>

          <p
            className="font-cinzel-decorative"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(0.8rem, 3.2vw, 1.15rem)",
              letterSpacing: "0.14em",
              lineHeight: 1.6,
              textShadow: "0 2px 24px rgba(139,26,26,0.55)",
            }}
          >
            {copy.introTagline}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1.2,
              gap: "0.15rem",
            }}
          >
            <span
              className="font-cinzel animate-flicker"
              style={{
                color: "var(--brass)",
                fontSize: "clamp(1.9rem, 6.5vw, 2.8rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textShadow: "0 0 40px rgba(184,148,74,0.45)",
              }}
            >
              {wedding.groomFirst}
            </span>
            <span
              className="font-cormorant"
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              &amp;
            </span>
            <span
              className="font-cinzel animate-flicker"
              style={{
                color: "var(--brass)",
                fontSize: "clamp(1.9rem, 6.5vw, 2.8rem)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textShadow: "0 0 40px rgba(184,148,74,0.45)",
                animationDelay: "0.4s",
              }}
            >
              {wedding.brideFirst}
            </span>
          </div>

          <div className="brass-rule" style={{ maxWidth: 180 }} />
        </div>
      )}

      {/* ── Skip ── */}
      <button
        onClick={finish}
        className="font-cinzel"
        style={{
          position: "absolute",
          bottom: "1.75rem",
          right: "1.25rem",
          zIndex: 20,
          color: "var(--text-muted)",
          fontSize: "0.58rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.75rem 1rem",
          minHeight: 44,
          minWidth: 44,
        }}
      >
        Skip
      </button>
    </div>
  );
}
