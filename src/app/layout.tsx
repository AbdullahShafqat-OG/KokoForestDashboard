import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOKO Forest Health Analytics Dashboard",
  description:
    "Interactive forest health analytics dashboard prototype for KOKO Forest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
