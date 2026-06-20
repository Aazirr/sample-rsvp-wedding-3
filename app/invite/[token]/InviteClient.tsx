"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import RedLightLeak from "@/components/RedLightLeak";
import { copy, wedding } from "@/content/config";

type Guest = { id: string; name: string; status: string } | null;

export default function InviteClient({ guest, token }: { guest: Guest; token: string }) {
  const [status, setStatus] = useState(guest?.status ?? "pending");
  const [loading, setLoading] = useState<"accept" | "decline" | null>(null);
  const [submitted, setSubmitted] = useState(
    guest?.status === "accepted" || guest?.status === "declined"
  );
  const [error, setError] = useState("");

  // Persist token so the homepage RSVP section can read it
  useEffect(() => {
    if (guest && typeof window !== "undefined") {
      localStorage.setItem("rsvp_token", token);
    }
  }, [guest, token]);

  async function respond(choice: "accepted" | "declined") {
    setLoading(choice === "accepted" ? "accept" : "decline");
    setError("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, status: choice }),
      });
      if (!res.ok) throw new Error("Failed to save response.");
      setStatus(choice);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--coal)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
      }}
    >
      <RedLightLeak />

      <div
        style={{
          width: "100%",
          maxWidth: 460,
          position: "relative",
          zIndex: 10,
          animation: "fadeUp 0.8s ease both",
        }}
      >
        {/* Invalid invite */}
        {!guest && (
          <div
            style={{
              position: "relative",
              border: "1px solid var(--surface-2)",
              background: "var(--surface)",
              padding: "3rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            <div className="deco-corner deco-corner-tl" />
            <div className="deco-corner deco-corner-tr" />
            <div className="deco-corner deco-corner-bl" />
            <div className="deco-corner deco-corner-br" />

            <div style={{ color: "var(--brass)", fontSize: "1.5rem" }}>✦</div>
            <h1
              className="font-cinzel"
              style={{ color: "var(--text-primary)", fontSize: "clamp(1.1rem, 4vw, 1.4rem)", letterSpacing: "0.05em" }}
            >
              {copy.invalidInvite}
            </h1>
            <div className="brass-rule" />
            <p
              className="font-cormorant"
              style={{ color: "var(--text-muted)", fontSize: "1rem", fontStyle: "italic" }}
            >
              This link may be invalid or has expired. Please contact the family if you believe this is an error.
            </p>
          </div>
        )}

        {/* Valid invite */}
        {guest && (
          <div
            style={{
              position: "relative",
              border: "1px solid var(--surface-2)",
              background: "var(--surface)",
              // Extra bottom padding so buttons clear the bottom deco corners (which sit at bottom: 1.5rem)
              padding: "2rem 2rem 4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.75rem",
              textAlign: "center",
            }}
          >
            {/* Deco corners — top only on the invite card to avoid overlapping buttons */}
            <div className="deco-corner deco-corner-tl" />
            <div className="deco-corner deco-corner-tr" />
            <div className="deco-corner deco-corner-bl" />
            <div className="deco-corner deco-corner-br" />

            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div
                className="font-cinzel"
                style={{ color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
              >
                {copy.introTagline}
              </div>
              <div className="brass-rule-sm" />
            </div>

            {/* Guest name */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
              <div
                className="font-cinzel"
                style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Welcome,
              </div>
              <div
                className="font-cinzel animate-flicker"
                style={{
                  color: "var(--brass-light)",
                  fontSize: "clamp(1.4rem, 5vw, 1.9rem)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  lineHeight: 1.2,
                }}
              >
                {guest.name}
              </div>
            </div>

            {/* Invitation body */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
              <p
                className="font-cormorant"
                style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem, 3vw, 1.1rem)", fontStyle: "italic", lineHeight: 1.8 }}
              >
                You are cordially invited to witness the union of
              </p>
              <p className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(0.85rem, 3vw, 1rem)", letterSpacing: "0.06em" }}>
                {wedding.groom}
              </p>
              <p className="font-cormorant" style={{ color: "var(--brass)", fontSize: "1rem", fontStyle: "italic" }}>
                &amp;
              </p>
              <p className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(0.85rem, 3vw, 1rem)", letterSpacing: "0.06em" }}>
                {wedding.bride}
              </p>
              {wedding.date !== "TBA" && (
                <p className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.25rem" }}>
                  {wedding.date}
                </p>
              )}
            </div>

            <div className="brass-rule" />

            {/* Non-transferable notice */}
            <div
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                border: "1px solid var(--surface-2)",
                borderLeft: "2px solid var(--brass)",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <p
                className="font-cormorant"
                style={{ color: "var(--text-muted)", fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)", fontStyle: "italic", lineHeight: 1.7, textAlign: "left" }}
              >
                <span style={{ color: "var(--brass)", fontStyle: "normal", fontWeight: 600 }}>Please Note: </span>
                This invitation is non-transferable and is intended exclusively for the named guest. Due to limited seating and event arrangements, we respectfully request that no additional guests or plus-ones attend unless specifically indicated on the invitation.
              </p>
            </div>

            {/* Response area */}
            {!submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "100%" }}>
                <p
                  className="font-cinzel"
                  style={{ color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  Will you attend?
                </p>
                {/* Grid split ensures both buttons stay inside the card at any screen width */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", width: "100%" }}>
                  <button
                    onClick={() => respond("accepted")}
                    disabled={loading !== null}
                    className="btn-primary"
                    style={{ width: "100%", padding: "1rem 0.5rem", opacity: loading === "decline" ? 0.5 : 1 }}
                  >
                    {loading === "accept" ? "..." : "Accept"}
                  </button>
                  <button
                    onClick={() => respond("declined")}
                    disabled={loading !== null}
                    className="btn-ghost"
                    style={{ width: "100%", padding: "1rem 0.5rem", opacity: loading === "accept" ? 0.5 : 1 }}
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
            ) : (
              /* Confirmation + Go to website */
              <div
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", animation: "fadeUp 0.6s ease both" }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: `1px solid ${status === "accepted" ? "var(--crimson)" : "var(--surface-2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: status === "accepted" ? "var(--crimson)" : "var(--text-muted)",
                    fontSize: "1.2rem",
                  }}
                >
                  {status === "accepted" ? "✓" : "✕"}
                </div>

                <p
                  className="font-cinzel"
                  style={{
                    color: status === "accepted" ? "var(--brass-light)" : "var(--text-muted)",
                    fontSize: "clamp(0.85rem, 3vw, 1rem)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {status === "accepted" ? copy.rsvpAccept : copy.rsvpDecline}
                </p>

                {/* Go to website */}
                <Link
                  href="/"
                  className="btn-primary"
                  style={{ width: "100%", marginTop: "0.25rem" }}
                >
                  View the Invitation
                </Link>

                <button
                  onClick={() => setSubmitted(false)}
                  className="font-cinzel"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.4rem",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Change response
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
