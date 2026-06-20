"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RedLightLeak from "@/components/RedLightLeak";
import { wedding } from "@/content/config";

type Guest = {
  id: string;
  name: string;
  token: string;
  status: string;
  responded_at: string | null;
  created_at: string;
};

type Stats = { total: number; accepted: number; declined: number; pending: number };

function statusColor(s: string) {
  if (s === "accepted") return "var(--brass-light)";
  if (s === "declined") return "var(--crimson)";
  return "var(--text-muted)";
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-PH", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}


type SortField = "name" | "status" | "created_at" | "responded_at";
type SortDir = "asc" | "desc";
type SortableValue = string | null;

export default function AdminDashboard({ guests, stats }: { guests: Guest[]; stats: Stats }) {
  const router = useRouter();
  const [newName, setNewName] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [newLink, setNewLink] = useState<{ name: string; url: string } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  async function addGuest() {
    if (!newName.trim()) return;
    setAddLoading(true);
    setAddError("");
    setNewLink(null);
    try {
      const res = await fetch("/admin/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add guest");
      setNewLink({ name: newName.trim(), url: `${origin}/invite/${data.token}` });
      setNewName("");
      router.refresh();
    } catch (e: unknown) {
      setAddError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setAddLoading(false);
    }
  }

  function copyLink(url: string, id: string) {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  async function deleteGuest(id: string) {
    setDeleteLoading(id);
    try {
      const res = await fetch("/admin/api/guests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setConfirmDelete(null);
      router.refresh();
    } catch {
      // silently keep the confirm state so user can retry
    } finally {
      setDeleteLoading(null);
    }
  }

  async function exportCSV() {
    const res = await fetch("/admin/api/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const sortedGuests = [...guests].sort((a, b) => {
    const aVal: SortableValue = a[sortField];
    const bVal: SortableValue = b[sortField];

    if (sortField === "name") {
      const aName = (aVal ?? "").toLowerCase();
      const bName = (bVal ?? "").toLowerCase();
      return sortDir === "asc" ? aName.localeCompare(bName) : bName.localeCompare(aName);
    }

    if (sortField === "status") {
      const order: { [key: string]: number } = { accepted: 0, declined: 1, pending: 2 };
      const aOrder = order[aVal ?? ""] ?? 3;
      const bOrder = order[bVal ?? ""] ?? 3;
      return sortDir === "asc" ? aOrder - bOrder : bOrder - aOrder;
    }

    if (sortField === "created_at" || sortField === "responded_at") {
      const aTime = aVal ? new Date(aVal).getTime() : 0;
      const bTime = bVal ? new Date(bVal).getTime() : 0;
      return sortDir === "asc" ? aTime - bTime : bTime - aTime;
    }

    return 0;
  });

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const filteredGuests = sortedGuests.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--coal)", padding: "2rem 1rem" }}>
      <RedLightLeak />

      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", textAlign: "center", paddingTop: "1rem" }}>
          <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Administration
          </div>
          <div className="brass-rule-sm" />
          <h1 className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "clamp(1.2rem, 4vw, 1.6rem)", fontWeight: 600 }}>
            The Family Office
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
          {[
            { label: "Total", value: stats.total, color: "var(--text-primary)" },
            { label: "Accepted", value: stats.accepted, color: "var(--brass-light)" },
            { label: "Declined", value: stats.declined, color: "var(--crimson)" },
            { label: "Pending", value: stats.pending, color: "var(--text-muted)" },
          ].map((s) => (
            <div
              key={s.label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", padding: "1rem", textAlign: "center", border: "1px solid var(--surface-2)", background: "var(--surface)" }}
            >
              <div className="font-cinzel" style={{ color: s.color, fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 700 }}>
                {s.value}
              </div>
              <div className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Add guest */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.25rem", border: "1px solid var(--surface-2)", background: "var(--surface)" }}>
          <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Add Guest
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGuest()}
              placeholder="Guest full name"
              className="input-dark"
              style={{ flex: 1 }}
            />
            <button
              onClick={addGuest}
              disabled={addLoading || !newName.trim()}
              className="btn-primary"
              style={{ minWidth: 80, flexShrink: 0 }}
            >
              {addLoading ? "..." : "Add"}
            </button>
          </div>
          {addError && (
            <p className="font-cormorant" style={{ color: "var(--crimson)", fontSize: "0.95rem", fontStyle: "italic" }}>
              {addError}
            </p>
          )}
          {newLink && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.75rem", background: "var(--surface-2)", borderLeft: "2px solid var(--brass)" }}>
              <div className="font-cinzel" style={{ color: "var(--brass-light)", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                Invite created for {newLink.name}
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <code style={{ flex: 1, fontSize: "0.75rem", color: "var(--text-muted)", wordBreak: "break-all", fontFamily: "monospace" }}>
                  {newLink.url}
                </code>
                <button
                  onClick={() => copyLink(newLink.url, "new")}
                  className="btn-primary"
                  style={{ minWidth: 70, flexShrink: 0, padding: "0.5rem 1rem" }}
                >
                  {copied === "new" ? "✓" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search + Export */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="input-dark"
            style={{ flex: 1, minWidth: 200 }}
          />
          <button onClick={exportCSV} className="btn-ghost">
            Export CSV
          </button>
        </div>

        {/* Guest count label + sort buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div className="font-cinzel" style={{ color: "var(--brass)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Guest List ({filteredGuests.length}{searchTerm && ` of ${guests.length}`})
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {(["name", "status", "created_at", "responded_at"] as SortField[]).map((field) => (
              <button
                key={field}
                onClick={() => toggleSort(field)}
                className="font-cinzel"
                style={{
                  fontSize: "0.52rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.4rem 0.6rem",
                  border: sortField === field ? "1px solid var(--brass)" : "1px solid var(--surface-2)",
                  background: sortField === field ? "rgba(184, 148, 74, 0.1)" : "transparent",
                  color: sortField === field ? "var(--brass)" : "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                {field === "name" ? "Name" : field === "status" ? "Status" : field === "created_at" ? "Sent" : "Response"}
                {sortField === field && (sortDir === "asc" ? " ↑" : " ↓")}
              </button>
            ))}
          </div>
        </div>

        {/* Guest cards */}
        {filteredGuests.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", border: "1px solid var(--surface-2)", background: "var(--surface)" }}>
            <p className="font-cormorant" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
              {guests.length === 0 ? "No guests yet. Add one above." : `No guests match "${searchTerm}".`}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {filteredGuests.map((g) => {
              const url = `${origin}/invite/${g.token}`;
              const isPendingDelete = confirmDelete === g.id;
              const isDeleting = deleteLoading === g.id;

              return (
                <div
                  key={g.id}
                  style={{
                    padding: "1rem",
                    border: "1px solid var(--surface-2)",
                    background: isPendingDelete ? "rgba(107,15,15,0.18)" : "var(--surface)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    transition: "background 0.2s ease",
                  }}
                >
                  {/* Name + status row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
                    <div className="font-cinzel" style={{ color: "var(--text-primary)", fontSize: "0.9rem", letterSpacing: "0.02em", flex: 1, minWidth: 0 }}>
                      {g.name}
                    </div>
                    <div
                      className="font-cinzel"
                      style={{
                        color: statusColor(g.status),
                        fontSize: "0.55rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.6rem",
                        border: `1px solid ${g.status === "accepted" ? "var(--brass)" : g.status === "declined" ? "var(--crimson)" : "var(--surface-2)"}`,
                        flexShrink: 0,
                      }}
                    >
                      {g.status}
                    </div>
                  </div>

                  {/* Responded date */}
                  <div className="font-cormorant" style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>
                    {g.responded_at ? `Responded: ${formatDate(g.responded_at)}` : "No response yet"}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <button
                      onClick={() => copyLink(url, g.id)}
                      className="btn-ghost font-cinzel"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.15em", padding: "0.6rem 0.5rem", color: copied === g.id ? "var(--brass)" : undefined }}
                    >
                      {copied === g.id ? "✓ Copied" : "Copy Link"}
                    </button>

                    {!isPendingDelete ? (
                      <button
                        onClick={() => setConfirmDelete(g.id)}
                        className="btn-ghost font-cinzel"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.15em", padding: "0.6rem 0.5rem", color: "var(--text-muted)", opacity: 0.7 }}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => deleteGuest(g.id)}
                        disabled={isDeleting}
                        className="font-cinzel"
                        style={{
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "0.6rem 0.5rem",
                          background: "var(--crimson)",
                          color: "var(--text-primary)",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {isDeleting ? "..." : "Confirm Delete"}
                      </button>
                    )}
                  </div>

                  {isPendingDelete && (
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="font-cormorant"
                      style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "0.85rem", fontStyle: "italic", cursor: "pointer", textAlign: "left", padding: 0 }}
                    >
                      Tap to cancel
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
          <div className="brass-rule" />
          <p className="font-cinzel" style={{ color: "var(--text-muted)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginTop: "0.75rem" }}>
            {wedding.groomFirst} &amp; {wedding.brideFirst} - Family Office
          </p>
        </div>
      </div>
    </div>
  );
}
