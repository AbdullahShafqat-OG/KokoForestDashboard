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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Rajdhani:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-content">{children}</body>
    </html>
  );
}
