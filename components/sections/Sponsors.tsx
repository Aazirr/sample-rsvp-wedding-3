import ScrollReveal from "@/components/ScrollReveal";
import { wedding } from "@/content/config";

const { sponsors } = wedding;

function CouplePair({ pair }: { pair: [string, string] }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="font-cormorant" style={{ color: "var(--text-primary)", fontSize: "clamp(0.9rem, 2.5vw, 1rem)", lineHeight: 1.5 }}>
        {pair[0]}
      </div>
      <div className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
        &amp;
      </div>
      <div className="font-cormorant" style={{ color: "var(--text-primary)", fontSize: "clamp(0.9rem, 2.5vw, 1rem)", lineHeight: 1.5 }}>
        {pair[1]}
      </div>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="section" style={{ background: "var(--charcoal)" }}>
      <div className="section-inner-wide">
        {/* Heading */}
        <ScrollReveal>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
              With Gratitude
            </div>
            <div className="brass-rule-sm" />
            <h2 className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
              Our Sponsors
            </h2>
            <p className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem, 3vw, 1.1rem)", fontStyle: "italic", lineHeight: 1.7 }}>
              We are deeply grateful to those who have blessed this union with their love and generosity.
            </p>
          </div>
        </ScrollReveal>

        {/* Primary Sponsors */}
        <ScrollReveal delay={0.1} className="w-full">
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              className="font-cinzel"
              style={{ textAlign: "center", color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
            >
              Principal Sponsors
            </div>

            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1px",
                background: "var(--surface-2)",
                border: "1px solid var(--surface-2)",
              }}
            >
              {sponsors.primary.map((pair, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.25rem 1rem",
                    background: i % 4 < 2 ? "var(--surface)" : "var(--charcoal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CouplePair pair={pair} />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Brass rule */}
        <ScrollReveal delay={0.2} className="w-full">
          <div className="brass-rule" />
        </ScrollReveal>

        {/* Secondary Sponsors */}
        <ScrollReveal delay={0.25} className="w-full">
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div
              className="font-cinzel"
              style={{ textAlign: "center", color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
            >
              Secondary Sponsors
            </div>

            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {/* Candle */}
              <div
                style={{
                  padding: "1.5rem 1rem",
                  border: "1px solid var(--surface-2)",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  🕯 Candle
                </div>
                <div className="brass-rule-sm" />
                <CouplePair pair={sponsors.secondary.candle} />
              </div>

              {/* Veil & Cord */}
              <div
                style={{
                  padding: "1.5rem 1rem",
                  border: "1px solid var(--surface-2)",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  Veil &amp; Cord
                </div>
                <div className="brass-rule-sm" />
                <CouplePair pair={sponsors.secondary.veilAndCord} />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
