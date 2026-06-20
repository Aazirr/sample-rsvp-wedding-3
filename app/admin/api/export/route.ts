import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

type GuestRow = {
  name: string;
  status: string;
  responded_at: string | null;
  created_at: string;
};

export async function GET() {
  const sql = getSql();

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = (await sql`
    SELECT name, status, responded_at, created_at
    FROM guests
    ORDER BY created_at ASC
  `) as GuestRow[];

  const header = "name,status,responded_at,created_at\n";
  const body = rows
    .map((r) =>
      [
        `"${r.name.replace(/"/g, '""')}"`,
        r.status,
        r.responded_at ?? "",
        r.created_at,
      ].join(",")
    )
    .join("\n");

  const csv = header + body;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="rsvp-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
