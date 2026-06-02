import { AppLayout } from "@/components/layout/AppLayout";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SalonPro - Smart Salon Management",
  description: "A premium smart salon management platform with AI styling and booking.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SalonPro",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#D4AF37",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-background text-foreground`}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
