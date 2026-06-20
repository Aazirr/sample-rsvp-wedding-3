"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import RedLightLeak from "@/components/RedLightLeak";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        setError("Invalid password. Try again.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--coal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
      }}
    >
      <RedLightLeak />

      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "2.5rem 2rem",
          border: "1px solid var(--surface-2)",
          background: "var(--surface)",
          position: "relative",
          animation: "fadeUp 0.7s ease both",
          zIndex: 10,
        }}
      >
        <div className="deco-corner deco-corner-tl" />
        <div className="deco-corner deco-corner-tr" />
        <div className="deco-corner deco-corner-bl" />
        <div className="deco-corner deco-corner-br" />

        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className="font-cinzel"
            style={{ color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
          >
            Administration
          </div>
          <div className="brass-rule-sm" />
          <h1
            className="font-cinzel"
            style={{ color: "var(--text-primary)", fontSize: "1.2rem", letterSpacing: "0.06em", fontWeight: 600 }}
          >
            The Family Office
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-cinzel"
            style={{ color: "var(--text-muted)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-dark"
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p
            className="font-cormorant text-center"
            style={{ color: "var(--crimson)", fontSize: "0.95rem", fontStyle: "italic" }}
          >
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
