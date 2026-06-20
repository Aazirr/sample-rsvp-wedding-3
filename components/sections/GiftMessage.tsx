import ScrollReveal from "@/components/ScrollReveal";

export default function GiftMessage() {
  return (
    <section id="gift-message" className="section" style={{ background: "var(--charcoal)" }}>
      <div className="section-inner">
        <ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            {/* Heading */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
                A Note from Us
              </div>
              <div className="brass-rule-sm" />
              <h2 className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
                Message from our Hearts
              </h2>
            </div>

            {/* Message body */}
            <p
              className="font-cormorant"
              style={{
                color: "var(--text-muted)",
                fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
                fontStyle: "italic",
                lineHeight: 1.8,
                textAlign: "center",
                maxWidth: 600,
              }}
            >
              Your presence fills our hearts with happiness and makes our day complete. Should you wish to honor us with a gift, a monetary contribution would be gratefully received and will help us create a beautiful future together. More than anything, we thank you for your love, support, and for being part of this cherished moment in our lives.
            </p>

            <div className="brass-rule" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
