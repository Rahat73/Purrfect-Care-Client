import { Navbar } from "@/src/components/navbar";
import { siteConfig } from "@/src/config/site";
import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import LeftSidebar from "../(with-common-layout)/_component/left-sidebar";
import BottomNavbar from "../(with-common-layout)/_component/bottom-navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - Dashboard`,
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-3 md:grid-cols-4 ">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <div className="hidden md:block ml-4 fixed top-1/2 -translate-y-1/2 left-0">
            <LeftSidebar />
          </div>
        </div>
        {/* Main Content (Posts) */}
        <main className="flex-grow p-4 col-span-3 bg-default-50 m-5 md:mr-16 rounded-lg min-h-[80vh]">
          {children}
        </main>
      </div>
      <BottomNavbar />
    </div>
  );
}
