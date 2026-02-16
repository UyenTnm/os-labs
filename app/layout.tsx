import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Geist } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({ subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OS LABS | Premium Web Solutions",
  description:
    "Productized Service Studio specializing in bespoke web design, development, and digital transformation.",
  keywords:
    "website, website development, productized services, digital studio, saas, business anslyst, product owner",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${ibmPlexMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
