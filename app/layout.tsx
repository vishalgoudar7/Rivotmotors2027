import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RIVOT Motors | Electric Mobility Reimagined",
  description: "RIVOT Motors electric mobility.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="rivot-theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("rivot-theme-mode") === "light" ? "light" : "dark";
                document.documentElement.dataset.rivotTheme = theme;
                document.documentElement.dataset.theme = theme;
              } catch {}
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
