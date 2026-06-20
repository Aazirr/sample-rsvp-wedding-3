import ScrollReveal from "@/components/ScrollReveal";
import { wedding } from "@/content/config";

export default function OurStory() {
  return (
    <section
      id="story"
      className="section"
      style={{ background: "var(--charcoal)" }}
    >
      <div className="deco-corner deco-corner-tl" />
      <div className="deco-corner deco-corner-tr" />

      <div className="section-inner">
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
            Our Story
          </div>
          <div className="brass-rule-sm mt-3" />
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
            The Summons
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            className="font-cormorant"
            style={{
              color: "var(--text-muted)",
              fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
              fontStyle: "italic",
              lineHeight: 1.9,
              whiteSpace: "pre-line",
            }}
          >
            {wedding.story}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="brass-rule" />
          <div
            className="font-cinzel mt-4"
            style={{
              color: "var(--brass)",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            {wedding.groomFirst} &amp; {wedding.brideFirst}
          </div>
        </ScrollReveal>
      </div>

      <div className="deco-corner deco-corner-bl" />
      <div className="deco-corner deco-corner-br" />
    </section>
  );
}
