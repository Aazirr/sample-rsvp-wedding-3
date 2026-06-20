import { wedding, copy } from "@/content/config";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: "var(--coal)" }}
    >
      {/* Hero image (placeholder — drop image in public/gallery/hero.jpg) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/gallery/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.35) saturate(0.7)",
        }}
      />

      {/* Red tint overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 80% 40%, rgba(139,26,26,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Dark vignette */}
      <div className="cinematic-overlay" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ width: "100%", maxWidth: "36rem", marginLeft: "auto", marginRight: "auto", gap: "1.25rem", padding: "4rem 1.5rem" }}
      >
        {/* Top ornament */}
        <div
          className="font-cinzel"
          style={{
            color: "var(--brass)",
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: 0.8,
            animation: "fadeIn 1.5s ease 0.5s both",
          }}
        >
          You are cordially invited
        </div>

        <div className="brass-rule-sm" style={{ animation: "fadeIn 1s ease 0.7s both" }} />

        {/* Groom name */}
        <h1
          className="font-cinzel"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            animation: "fadeUp 1s ease 0.8s both",
          }}
        >
          {wedding.groom}
        </h1>

        {/* Ampersand */}
        <div
          className="font-cormorant"
          style={{
            color: "var(--brass)",
            fontSize: "clamp(1.4rem, 5vw, 2rem)",
            fontStyle: "italic",
            animation: "fadeIn 1s ease 1s both",
          }}
        >
          &amp;
        </div>

        {/* Bride name */}
        <h1
          className="font-cinzel"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(2rem, 8vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            animation: "fadeUp 1s ease 1.1s both",
          }}
        >
          {wedding.bride}
        </h1>

        <div className="brass-rule" style={{ animation: "fadeIn 1s ease 1.3s both" }} />

        {/* Tagline */}
        <p
          className="font-cormorant"
          style={{
            color: "var(--text-muted)",
            fontSize: "clamp(1rem, 3.5vw, 1.2rem)",
            fontStyle: "italic",
            letterSpacing: "0.05em",
            animation: "fadeIn 1s ease 1.5s both",
          }}
        >
          {copy.heroTagline}
        </p>

        {/* Date */}
        <div
          className="font-cinzel"
          style={{
            color: "var(--brass-light)",
            fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            animation: "fadeIn 1s ease 1.7s both",
          }}
        >
          {wedding.date}
        </div>

        {/* Scroll cue */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            animation: "fadeIn 1s ease 2.2s both",
          }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, var(--brass), transparent)",
            }}
          />
          <span
            className="font-cinzel"
            style={{ color: "var(--text-muted)", fontSize: "0.55rem", letterSpacing: "0.3em" }}
          >
            scroll
          </span>
        </div>
      </div>

      {/* Deco corners (desktop) */}
      <div className="deco-corner deco-corner-tl hidden md:block" />
      <div className="deco-corner deco-corner-tr hidden md:block" />
      <div className="deco-corner deco-corner-bl hidden md:block" />
      <div className="deco-corner deco-corner-br hidden md:block" />
    </section>
  );
}
