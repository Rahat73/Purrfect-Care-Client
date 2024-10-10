import { Navbar } from "@/src/components/navbar";
import { siteConfig } from "@/src/config/site";
import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import LeftSidebar from "../(with-common-layout)/_component/left-sidebar";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-screen-2xl mx-auto grid grid-cols-4 ">
        {/* Left Sidebar */}
        <div className="col-span-1">
          <div className="ml-4 fixed top-1/2 -translate-y-1/2 left-0">
            <LeftSidebar />
          </div>
        </div>
        {/* Main Content (Posts) */}
        <main className="flex-grow p-4 col-span-3 bg-default-50 m-5 mr-16 rounded-lg min-h-[80vh]">
          {children}
        </main>
      </div>
    </div>
  );
}
