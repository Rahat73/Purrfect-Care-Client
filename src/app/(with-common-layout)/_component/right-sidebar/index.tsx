import Link from "next/link";
import React from "react";

const RightSidebar = () => {
  return (
    <aside className="p-4 border-l border-gray-200  h-screen">
      {/* Add content for the right sidebar here */}
      <div className="fixed top-1/2 -translate-y-1/2">
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
      </div>
    </aside>
  );
};

export default RightSidebar;
