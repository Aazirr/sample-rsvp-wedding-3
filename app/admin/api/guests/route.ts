import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { generateToken } from "@/lib/tokens";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const sql = getSql();

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json().catch(() => ({}));
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const token = generateToken();

  await sql`
    INSERT INTO guests (token, name) VALUES (${token}, ${name.trim()})
  `;

  return NextResponse.json({ token });
}

export async function DELETE(req: NextRequest) {
  const sql = getSql();

  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const rows = await sql`DELETE FROM guests WHERE id = ${id} RETURNING id`;
  if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
