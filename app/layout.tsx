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
    <html lang="en" data-rivot-theme="light" data-theme="light" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Script id="rivot-theme-init" strategy="beforeInteractive">
          {`
              (function () {
                try {
                  var saved = localStorage.getItem("rivot-theme-mode");
                  var theme = saved === "dark" || saved === "light"
                    ? saved
                    : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  document.documentElement.dataset.rivotTheme = theme;
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `}
        </Script>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
