import ScrollReveal from "@/components/ScrollReveal";
import { wedding } from "@/content/config";

export default function OrderOfDay() {
  return (
    <section
      id="details"
      className="section"
      style={{ background: "var(--coal)" }}
    >
      <div className="section-inner" style={{ gap: "2rem" }}>
        {/* Heading */}
        <ScrollReveal>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div
              className="font-cinzel"
              style={{ color: "var(--brass)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
            >
              The Details
            </div>
            <div className="brass-rule-sm" />
            <h2
              className="font-cinzel"
              style={{ color: "var(--text-primary)", fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              The Order of the Day
            </h2>
          </div>
        </ScrollReveal>

        {/* Shared date — sits above both venue cards */}
        <ScrollReveal delay={0.08}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem" }}>
            <div
              className="font-cinzel"
              style={{ color: "var(--brass-light)", fontSize: "clamp(1rem, 3.5vw, 1.3rem)", letterSpacing: "0.12em", fontWeight: 600 }}
            >
              {wedding.date}
            </div>
            <div
              className="font-cormorant"
              style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic", letterSpacing: "0.05em" }}
            >
              {wedding.venue.ceremony.address}
            </div>
          </div>
        </ScrollReveal>

        {/* Ceremony & Reception cards */}
        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <ScrollReveal delay={0.15}>
            <div
              style={{
                display: "flex", flexDirection: "column", gap: "0.5rem",
                padding: "1.5rem 1.25rem", textAlign: "center",
                border: "1px solid var(--surface-2)", background: "var(--surface)",
                height: "100%",
              }}
            >
              <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Ceremony
              </div>
              <div className="brass-rule-sm" />
              <div className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)", letterSpacing: "0.04em" }}>
                {wedding.time.ceremony}
              </div>
              <div className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)", lineHeight: 1.5 }}>
                {wedding.venue.ceremony.name}
              </div>
              {wedding.venue.ceremony.mapsUrl !== "#" && (
                <a
                  href={wedding.venue.ceremony.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel"
                  style={{ color: "var(--brass)", fontSize: "0.55rem", letterSpacing: "0.2em", textDecoration: "underline", textUnderlineOffset: "3px", marginTop: "0.25rem" }}
                >
                  View Map
                </a>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <div
              style={{
                display: "flex", flexDirection: "column", gap: "0.5rem",
                padding: "1.5rem 1.25rem", textAlign: "center",
                border: "1px solid var(--surface-2)", background: "var(--surface)",
                height: "100%",
              }}
            >
              <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Reception
              </div>
              <div className="brass-rule-sm" />
              <div className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)", letterSpacing: "0.04em" }}>
                {wedding.time.reception}
              </div>
              <div className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)", lineHeight: 1.5 }}>
                {wedding.venue.reception.name}
              </div>
              {wedding.venue.reception.mapsUrl !== "#" && (
                <a
                  href={wedding.venue.reception.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cinzel"
                  style={{ color: "var(--brass)", fontSize: "0.55rem", letterSpacing: "0.2em", textDecoration: "underline", textUnderlineOffset: "3px", marginTop: "0.25rem" }}
                >
                  View Map
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
