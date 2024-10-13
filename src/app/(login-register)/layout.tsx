import "@/src/styles/globals.css";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { fontSans } from "../../config/fonts";
import { siteConfig } from "../../config/site";
import { Providers } from "../../lib/providers";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
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

export default function LoginRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen w-full">
      <main className="container mx-auto pt-16 flex-grow">{children}</main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
}
