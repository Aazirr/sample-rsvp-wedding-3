import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "No token" }, { status: 400 });

  const rows = await sql`
    SELECT name, status FROM guests WHERE token = ${token} LIMIT 1
  `;
  if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(rows[0]);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.token || !body?.status) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { token, status } = body;
  if (!["accepted", "declined"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const rows = await sql`
    UPDATE guests
    SET status = ${status}, responded_at = now()
    WHERE token = ${token}
    RETURNING id
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
