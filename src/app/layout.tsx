import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEM Projects",
  description: "Strategic and operational project solutions presented through the LEM Projects business profile.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
