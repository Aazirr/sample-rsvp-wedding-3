import { Metadata } from "next";
import { getSql } from "@/lib/db";
import { wedding } from "@/content/config";
import InviteClient from "./InviteClient";

interface Props {
  params: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: `Your Invitation - ${wedding.groomFirst} & ${wedding.brideFirst}`,
};

export default async function InvitePage({ params }: Props) {
  const sql = getSql();
  const { token } = await params;

  const rows = await sql`
    SELECT id, name, status FROM guests WHERE token = ${token} LIMIT 1
  `;

  if (rows.length === 0) {
    return <InviteClient guest={null} token={token} />;
  }

  const guest = rows[0] as { id: string; name: string; status: string };
  return <InviteClient guest={guest} token={token} />;
}
