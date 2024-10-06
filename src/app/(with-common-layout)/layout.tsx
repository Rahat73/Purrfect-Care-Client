import { Navbar } from "@/src/components/navbar";
import "@/src/styles/globals.css";
import { Link } from "@nextui-org/link";
import { Metadata, Viewport } from "next";
import { siteConfig } from "../../config/site";

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
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <aside className="w-1/4 p-4 border-r border-gray-200 bg-gray-50 dark:bg-gray-900">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/create-post">Create Post</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              {/* Add more menu options as needed */}
            </ul>
          </nav>
        </aside>

        {/* Main Content (Posts) */}
        <main className="flex-grow p-4">{children}</main>

        {/* Right Sidebar */}
        <aside className="w-1/4 p-4 border-l border-gray-200 bg-gray-50 dark:bg-gray-900">
          {/* Add content for the right sidebar here */}
          <div>
            <h2 className="font-semibold text-lg">Trending Posts</h2>
            <ul className="space-y-2">
              {/* Example items, replace with dynamic data */}
              <li>
                <Link href="/post/1">Post Title 1</Link>
              </li>
              <li>
                <Link href="/post/2">Post Title 2</Link>
              </li>
              <li>
                <Link href="/post/3">Post Title 3</Link>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-lg">Suggested Users</h2>
            <ul className="space-y-2">
              {/* Example items, replace with dynamic data */}
              <li>
                <Link href="/profile/1">User 1</Link>
              </li>
              <li>
                <Link href="/profile/2">User 2</Link>
              </li>
              <li>
                <Link href="/profile/3">User 3</Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
