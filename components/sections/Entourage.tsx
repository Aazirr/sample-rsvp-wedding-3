import ScrollReveal from "@/components/ScrollReveal";
import { wedding } from "@/content/config";

const { entourage } = wedding;

function RoleLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-cinzel"
      style={{
        color: "var(--brass)",
        fontSize: "0.58rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        marginBottom: "0.6rem",
        opacity: 0.85,
      }}
    >
      {children}
    </div>
  );
}

function NameList({ names }: { names: readonly string[] | string }) {
  const list = typeof names === "string" ? [names] : names;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      {list.map((name) => (
        <div
          key={name}
          className="font-cormorant"
          style={{ color: "var(--text-primary)", fontSize: "clamp(0.95rem, 2.8vw, 1.1rem)", lineHeight: 1.4 }}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

// One column block: label + names
function RoleBlock({ label, names }: { label: string; names: readonly string[] | string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <RoleLabel>{label}</RoleLabel>
      <NameList names={names} />
    </div>
  );
}

// Divider between paired columns
function ColDivider() {
  return (
    <div
      style={{
        width: 1,
        background: "linear-gradient(to bottom, transparent, var(--surface-2), transparent)",
        alignSelf: "stretch",
        flexShrink: 0,
      }}
    />
  );
}

export default function Entourage() {
  return (
    <section id="entourage" className="section" style={{ background: "var(--coal)" }}>
      <div className="deco-corner deco-corner-tl" />
      <div className="deco-corner deco-corner-tr" />

      <div className="section-inner-wide">
        {/* Heading */}
        <ScrollReveal>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
              The Wedding Party
            </div>
            <div className="brass-rule-sm" />
            <h2 className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
              The Entourage
            </h2>
          </div>
        </ScrollReveal>

        {/* ── Parents ── */}
        <ScrollReveal delay={0.1} className="w-full">
          <div
            style={{
              width: "100%",
              padding: "1.5rem",
              border: "1px solid var(--surface-2)",
              background: "var(--surface)",
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <RoleBlock label="Parents of the Bride" names={entourage.brideParents} />
            </div>
            <ColDivider />
            <div style={{ flex: 1, textAlign: "center" }}>
              <RoleBlock label="Parents of the Groom" names={entourage.groomParents} />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Matron of Honor + Best Man ── */}
        <ScrollReveal delay={0.15} className="w-full">
          <div style={{ width: "100%", display: "flex", gap: "1.5rem", justifyContent: "center" }}>
            <div
              style={{
                flex: 1,
                padding: "1.25rem",
                border: "1px solid var(--surface-2)",
                background: "var(--charcoal)",
                textAlign: "center",
              }}
            >
              <RoleBlock label="Matron of Honor" names={entourage.matronOfHonor} />
            </div>
            <div
              style={{
                flex: 1,
                padding: "1.25rem",
                border: "1px solid var(--surface-2)",
                background: "var(--charcoal)",
                textAlign: "center",
              }}
            >
              <RoleBlock label="Best Man" names={entourage.bestMan} />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Bridesmaids + Groomsmen ── */}
        <ScrollReveal delay={0.2} className="w-full">
          <div style={{ width: "100%", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <RoleLabel>Bridesmaids</RoleLabel>
              <NameList names={entourage.bridesmaids} />
            </div>
            <ColDivider />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <RoleLabel>Groomsmen</RoleLabel>
              <NameList names={entourage.groomsmen} />
            </div>
          </div>
        </ScrollReveal>

        {/* ── Brass rule ── */}
        <ScrollReveal delay={0.25} className="w-full">
          <div className="brass-rule" />
        </ScrollReveal>

        {/* ── Flower Girls + Flower Ladies + Bearers ── */}
        <ScrollReveal delay={0.3} className="w-full">
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            <RoleBlock label="Flower Girls" names={entourage.flowerGirls} />
            <RoleBlock label="Flower Ladies" names={entourage.flowerLadies} />
            <RoleBlock label="Bearers" names={entourage.bearers} />
          </div>
        </ScrollReveal>
      </div>

      <div className="deco-corner deco-corner-bl" />
      <div className="deco-corner deco-corner-br" />
    </section>
  );
}
