import Link from "next/link";
import React from "react";

const LeftSidebar = () => {
  return (
    <aside className="p-4 border-r border-gray-200  h-screen">
      <nav className="fixed top-1/2 -translate-y-1/2">
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
  );
};

export default LeftSidebar;
