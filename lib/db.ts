import { neon } from "@neondatabase/serverless";

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return neon(databaseUrl);
}

export async function initDb() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS guests (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      token       TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'accepted', 'declined')),
      responded_at TIMESTAMPTZ,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}
