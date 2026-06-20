import ScrollReveal from "@/components/ScrollReveal";
import { wedding } from "@/content/config";

const palette = [
  { name: "Coal Black", color: "#0c0b0a", border: "#2a2520" },
  { name: "Charcoal",   color: "#2a2520", border: "#3a3028" },
  { name: "Oxblood",    color: "#440000", border: "#550000" },
  { name: "Crimson",    color: "#550000", border: "#660000" },
  { name: "Brass",      color: "#b8944a", border: "#c9a84c" },
  { name: "Ivory",      color: "#e8e0d4", border: "#d4c8b8" },
];

export default function DressCode() {
  return (
    <section id="dresscode" className="section" style={{ background: "var(--charcoal)" }}>
      <div className="deco-corner deco-corner-tl" />
      <div className="deco-corner deco-corner-tr" />

      <div className="section-inner">
        {/* Heading */}
        <ScrollReveal>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
              Attire
            </div>
            <div className="brass-rule-sm" />
            <h2 className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
              The Dress Code
            </h2>
          </div>
        </ScrollReveal>

        {/* Dress code + optional note */}
        <ScrollReveal delay={0.1}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
            <p className="font-cinzel" style={{ color: "var(--brass-light)", fontSize: "clamp(0.85rem, 3vw, 1rem)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {wedding.dressCode}
            </p>
            <p className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic", letterSpacing: "0.04em" }}>
              {wedding.dressCodeOptional}
            </p>
          </div>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={0.2}>
          <p className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 3vw, 1.15rem)", fontStyle: "italic", lineHeight: 1.8, textAlign: "center" }}>
            {wedding.dressCodeNote}
          </p>
        </ScrollReveal>

        {/* Palette swatches */}
        <ScrollReveal delay={0.25}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Suggested Palette
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              {palette.map((p) => (
                <div key={p.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: 44, height: 44, background: p.color, border: `1px solid ${p.border}`, borderRadius: 2 }} />
                  <span className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "0.5rem", letterSpacing: "0.1em" }}>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Venue note — practical callout */}
        <ScrollReveal delay={0.3}>
          <div
            style={{
              width: "100%",
              padding: "1rem 1.25rem",
              border: "1px solid var(--surface-2)",
              borderLeft: "3px solid var(--brass)",
              background: "var(--surface)",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <span style={{ color: "var(--brass)", fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>☀</span>
            <p className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem, 2.8vw, 1rem)", fontStyle: "italic", lineHeight: 1.7 }}>
              {wedding.venueNote}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="brass-rule" />
        </ScrollReveal>
      </div>

      <div className="deco-corner deco-corner-bl" />
      <div className="deco-corner deco-corner-br" />
    </section>
  );
}
