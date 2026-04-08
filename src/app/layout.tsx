import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lem-projects-profile-portal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LEM Projects | Strategic and Operational Project Solutions",
    template: "%s | LEM Projects",
  },
  description: "Strategic and operational project solutions presented through the LEM Projects business profile, with a focus on execution, delivery, and business support.",
  keywords: [
    "LEM Projects",
    "project solutions South Africa",
    "strategic execution",
    "operational project support",
    "business profile",
    "project management company",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LEM Projects | Strategic and Operational Project Solutions",
    description:
      "Explore the LEM Projects business profile and project delivery positioning across strategic and operational support.",
    url: siteUrl,
    siteName: "LEM Projects",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/logos/LEM-Projects_Logo.png",
        width: 1200,
        height: 630,
        alt: "LEM Projects logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEM Projects | Strategic and Operational Project Solutions",
    description:
      "Business profile and project positioning for LEM Projects, focused on execution, capability, and delivery.",
    images: ["/logos/LEM-Projects_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-full flex-1 flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
