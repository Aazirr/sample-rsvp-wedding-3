import { cookies } from "next/headers";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "changeme";
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE)?.value === getAdminPassword();
}

export async function setAdminCookie(res: Response) {
  res.headers.append(
    "Set-Cookie",
    `${COOKIE}=${getAdminPassword()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}`
  );
}
