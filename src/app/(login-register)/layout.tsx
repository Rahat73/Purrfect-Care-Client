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
    template: `%s - ${"Join the community"}`,
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
    <div className="relative flex flex-col justify-center items-center min-h-screen w-full">
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
