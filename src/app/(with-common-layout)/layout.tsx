import { Navbar } from "@/src/components/navbar";
import "@/src/styles/globals.css";
import { Link } from "@nextui-org/link";
import { Metadata, Viewport } from "next";
import { siteConfig } from "../../config/site";
import LeftSidebar from "./_component/left-sidebar";
import RightSidebar from "./_component/right-sidebar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function WithCommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-4">
        {/* Left Sidebar */}
        <div className="col-span-1">
          <div className="ml-4 fixed top-1/2 -translate-y-1/2 left-0">
            <LeftSidebar />
          </div>
        </div>
        {/* Main Content (Posts) */}
        <main className="flex-grow p-4 col-span-2">{children}</main>

        {/* Right Sidebar */}
        <div className="col-span-1">
          <div className="ml-4 fixed top-1/2 -translate-y-1/2 right-0">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
