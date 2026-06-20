"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function RSVPSection() {
  return (
    <section id="rsvp" className="section" style={{ background: "var(--charcoal)" }}>
      <div className="deco-corner deco-corner-tl" />
      <div className="deco-corner deco-corner-tr" />

      <div className="section-inner" style={{ maxWidth: "36rem" }}>
        <ScrollReveal>
          <div
            className="font-cinzel"
            style={{
              color: "var(--brass)",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Showcase RSVP
          </div>
          <div className="brass-rule-sm" style={{ marginTop: "0.75rem" }} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-cinzel"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(1.6rem, 6vw, 2.4rem)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              lineHeight: 1.2,
            }}
          >
            A Polished RSVP Experience
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="font-cormorant"
            style={{
              color: "var(--text-muted)",
              fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
              fontStyle: "italic",
              lineHeight: 1.8,
            }}
          >
            This sample keeps the visual RSVP presentation without requiring database,
            authentication, or environment setup. It is meant for demos, client review,
            and design showcases.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div
            style={{
              width: "100%",
              border: "1px solid var(--surface-2)",
              background: "var(--surface)",
              padding: "1.75rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              className="font-cinzel"
              style={{
                color: "var(--brass-light)",
                fontSize: "clamp(1rem, 4vw, 1.3rem)",
                letterSpacing: "0.04em",
              }}
            >
              Sample Guest Experience
            </div>

            <p
              className="font-cormorant"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.98rem",
                fontStyle: "italic",
                textAlign: "center",
                lineHeight: 1.7,
              }}
            >
              In a production version, this area can connect to a real RSVP flow.
              For this showcase build, the layout is intentionally static and deploys
              without any `.env` configuration.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "100%" }}>
              <button className="btn-primary" style={{ width: "100%", padding: "1rem 0.5rem", opacity: 0.8 }}>
                Accept
              </button>
              <button className="btn-ghost" style={{ width: "100%", padding: "1rem 0.5rem", opacity: 0.8 }}>
                Decline
              </button>
            </div>
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
