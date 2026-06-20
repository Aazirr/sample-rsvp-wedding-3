"use client";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { copy } from "@/content/config";

type GuestData = { name: string; status: string } | null;

function statusLabel(s: string) {
  if (s === "accepted") return copy.rsvpAccept;
  if (s === "declined") return copy.rsvpDecline;
  return "Your response is pending.";
}

function statusColor(s: string) {
  if (s === "accepted") return "var(--brass-light)";
  if (s === "declined") return "var(--text-muted)";
  return "var(--text-muted)";
}

export default function RSVPSection() {
  const [token] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("rsvp_token");
  });
  const [guest, setGuest] = useState<GuestData>(null);
  const [fetched, setFetched] = useState(() => token === null);
  const [loading, setLoading] = useState<"accept" | "decline" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch(`/api/rsvp?token=${encodeURIComponent(token)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.name) setGuest(data);
      })
      .finally(() => setFetched(true));
  }, [token]);

  async function respond(choice: "accepted" | "declined") {
    if (!token) return;
    setLoading(choice === "accepted" ? "accept" : "decline");
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, status: choice }),
      });
      if (!res.ok) throw new Error();
      setGuest((g) => g ? { ...g, status: choice } : g);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="rsvp" className="section" style={{ background: "var(--charcoal)" }}>
      <div className="deco-corner deco-corner-tl" />
      <div className="deco-corner deco-corner-tr" />

      <div className="section-inner" style={{ maxWidth: "36rem" }}>
        <ScrollReveal>
          <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>
            The Invitation
          </div>
          <div className="brass-rule-sm" style={{ marginTop: "0.75rem" }} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-cinzel"
            style={{ color: "var(--text-primary)", fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 600, letterSpacing: "0.05em", lineHeight: 1.2 }}
          >
            Will You Join Us?
          </h2>
        </ScrollReveal>

        {/* Guest-aware RSVP panel (shown when a token is saved from the invite link) */}
        {fetched && guest ? (
          <ScrollReveal delay={0.2}>
            <div
              style={{
                width: "100%",
                border: "1px solid var(--surface-2)",
                background: "var(--surface)",
                padding: "1.75rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.25rem",
                position: "relative",
              }}
            >
              {/* Guest greeting */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
                <span className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                  Welcome back,
                </span>
                <span className="font-cinzel" style={{ color: "var(--brass-light)", fontSize: "clamp(1.1rem, 4vw, 1.4rem)", fontWeight: 700, letterSpacing: "0.04em" }}>
                  {guest.name}
                </span>
              </div>

              <div className="brass-rule-sm" />

              {/* Current status */}
              <p
                className="font-cinzel"
                style={{ color: statusColor(guest.status), fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)", letterSpacing: "0.1em" }}
              >
                {statusLabel(guest.status)}
              </p>

              {/* Change response buttons */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", width: "100%" }}>
                <p className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Change your response
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "100%" }}>
                  <button
                    onClick={() => respond("accepted")}
                    disabled={loading !== null || guest.status === "accepted"}
                    className="btn-primary"
                    style={{ width: "100%", padding: "1rem 0.5rem", opacity: guest.status === "accepted" || loading === "decline" ? 0.45 : 1 }}
                  >
                    {loading === "accept" ? "..." : "Accept"}
                  </button>
                  <button
                    onClick={() => respond("declined")}
                    disabled={loading !== null || guest.status === "declined"}
                    className="btn-ghost"
                    style={{ width: "100%", padding: "1rem 0.5rem", opacity: guest.status === "declined" || loading === "accept" ? 0.45 : 1 }}
                  >
                    {loading === "decline" ? "..." : "Decline"}
                  </button>
                </div>
                {error && (
                  <p className="font-cormorant" style={{ color: "var(--crimson)", fontSize: "0.9rem", fontStyle: "italic" }}>
                    {error}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ) : fetched ? (
          /* No saved token — static message */
          <>
            <ScrollReveal delay={0.2}>
              <p
                className="font-cormorant"
                style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 3.5vw, 1.2rem)", fontStyle: "italic", lineHeight: 1.8 }}
              >
                Your personal invitation has been sent. Open the link in your message to confirm your attendance.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div
                style={{
                  width: "100%",
                  border: "1px solid var(--surface-2)",
                  background: "var(--surface)",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  Have an invitation?
                </div>
                <p className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic" }}>
                  Use the personal link sent to you to respond.
                </p>
              </div>
            </ScrollReveal>
          </>
        ) : null /* still loading — render nothing to avoid flash */}

        <ScrollReveal delay={0.35}>
          <div className="brass-rule" />
        </ScrollReveal>
      </div>

      <div className="deco-corner deco-corner-bl" />
      <div className="deco-corner deco-corner-br" />
    </section>
  );
}
