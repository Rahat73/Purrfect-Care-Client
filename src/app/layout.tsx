import "@/src/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { fontSans } from "../config/fonts";
import { siteConfig } from "../config/site";
import { Providers } from "../lib/providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${"Share your stories & tips"}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon_new.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
