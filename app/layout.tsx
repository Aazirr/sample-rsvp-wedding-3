import type { Metadata, Viewport } from "next";
import "./globals.css";
import { copy, wedding } from "@/content/config";

export const metadata: Metadata = {
  title: `${wedding.groomFirst} & ${wedding.brideFirst} - Wedding Invitation`,
  description: `You are cordially invited to witness the union of ${wedding.groom} and ${wedding.bride}.`,
  openGraph: {
    title: `${wedding.groomFirst} & ${wedding.brideFirst} - Wedding Invitation`,
    description: copy.introTagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
