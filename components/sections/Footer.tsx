import { copy, wedding } from "@/content/config";

export default function Footer() {
  return (
    <footer
      className="section"
      style={{ background: "var(--coal)", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div className="section-inner" style={{ maxWidth: "36rem", gap: "1.5rem" }}>
        <div className="brass-rule" />

        <div
          className="font-cinzel"
          style={{
            color: "var(--brass)",
            fontSize: "clamp(1rem, 4vw, 1.4rem)",
            fontWeight: 600,
            letterSpacing: "0.1em",
          }}
        >
          {wedding.groomFirst} &amp; {wedding.brideFirst}
        </div>

        <div
          className="font-cinzel"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {wedding.date}
        </div>

        <div className="brass-rule-sm" />

        <blockquote
          className="font-cormorant"
          style={{
            color: "var(--text-muted)",
            fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
            fontStyle: "italic",
            lineHeight: 1.8,
            whiteSpace: "pre-line",
          }}
        >
          {wedding.footer}
        </blockquote>

        <div className="brass-rule" />

        <div
          className="font-cinzel"
          style={{ color: "var(--text-muted)", fontSize: "0.55rem", letterSpacing: "0.2em", opacity: 0.5 }}
        >
          &copy; {new Date().getFullYear()} &middot; {copy.introTagline}
        </div>
      </div>
    </footer>
  );
}
