"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { wedding } from "@/content/config";

const PHOTO_COUNT = 6;

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="section"
      style={{ background: "var(--coal)", padding: "5rem 0" }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <ScrollReveal className="px-6">
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              className="font-cinzel"
              style={{
                color: "var(--brass)",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              The Gallery
            </div>
            <div className="brass-rule-sm" />
            <h2
              className="font-cinzel"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(1.6rem, 6vw, 2.4rem)",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              The Photoshoot
            </h2>
          </div>
        </ScrollReveal>

        <div className="w-full px-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          {Array.from({ length: PHOTO_COUNT }).map((_, i) => {
            const isWide = i === 0 || i === 3;
            return (
              <ScrollReveal
                key={i}
                delay={i * 0.08}
                className={isWide ? "col-span-2 md:col-span-2" : "col-span-1"}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: isWide ? "50%" : "120%",
                    overflow: "hidden",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      background: "var(--surface)",
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: "1px solid var(--surface-2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
                        *
                      </span>
                    </div>
                  </div>

                  <img
                    src={`/gallery/photo-${i + 1}.jpg`}
                    alt={`${wedding.groomFirst} & ${wedding.brideFirst} - photo ${i + 1}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "brightness(0.88) saturate(0.82)",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 2,
                      background:
                        "linear-gradient(135deg, rgba(139,26,26,0.1) 0%, transparent 55%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
