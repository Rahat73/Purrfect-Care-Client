import { Navbar } from "@/src/components/navbar";
import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "../../config/site";
import LeftSidebar from "./_component/left-sidebar";
import RightSidebar from "./_component/right-sidebar";
import BottomNavbar from "./_component/bottom-navbar";

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

export default function WithCommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-3 md:grid-cols-4">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <div className="hidden md:block  ml-4 fixed top-1/2 -translate-y-1/2 left-0">
            <LeftSidebar />
          </div>
        </div>
        {/* Main Content (Posts) */}
        <main className="flex-grow p-4 col-span-3 lg:col-span-2">
          {children}
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="ml-4 fixed top-1/2 -translate-y-1/2 right-0">
            <RightSidebar />
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}
