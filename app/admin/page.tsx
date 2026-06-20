import { isAdminAuthenticated } from "@/lib/auth";
import { sql } from "@/lib/db";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";

type Guest = {
  id: string;
  name: string;
  token: string;
  status: string;
  responded_at: string | null;
  created_at: string;
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const guests = (await sql`
    SELECT id, name, token, status, responded_at, created_at
    FROM guests
    ORDER BY created_at DESC
  `) as Guest[];

  const total = guests.length;
  const accepted = guests.filter((g) => g.status === "accepted").length;
  const declined = guests.filter((g) => g.status === "declined").length;
  const pending = guests.filter((g) => g.status === "pending").length;

  return (
    <AdminDashboard
      guests={guests}
      stats={{ total, accepted, declined, pending }}
    />
  );
}
