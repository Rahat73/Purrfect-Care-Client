"use client";

import Link from "next/link";
import { FaCrown } from "react-icons/fa6"; // FontAwesome Icon for Premium Posts

const RightSidebar = () => {
  return (
    <aside className="p-10 bg-transparent text-default-600">
      <div>
        {/* Post Categories Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Categories</h2>
          <ul className="space-y-2 mt-2">
            <li>
              <Link href="/?category=Tip" className=" transition-all">
                Tip
              </Link>
            </li>
            <li>
              <Link href="/?category=Story" className=" transition-all">
                Story
              </Link>
            </li>
            <li>
              <Link href="/" className=" transition-all">
                All
              </Link>
            </li>
          </ul>
        </div>

        {/* Premium Posts Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg flex items-center">
            Premium Posts <FaCrown className="ml-2 text-yellow-500" />
          </h2>
          <ul className="space-y-2 mt-2">
            {/* Example items, replace with dynamic data */}
            <li>
              <Link href="/post/premium/1" className=" transition-all">
                Premium Post 1
              </Link>
            </li>
            <li>
              <Link href="/post/premium/2" className=" transition-all">
                Premium Post 2
              </Link>
            </li>
            <li>
              <Link href="/post/premium/3" className=" transition-all">
                Premium Post 3
              </Link>
            </li>
          </ul>
        </div>

        {/* Suggested Users Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg ">Suggested Users</h2>
          <ul className="space-y-2 mt-2">
            {/* Example items, replace with dynamic data */}
            <li>
              <Link href="/profile/1" className=" transition-all">
                User 1
              </Link>
            </li>
            <li>
              <Link href="/profile/2" className=" transition-all">
                User 2
              </Link>
            </li>
            <li>
              <Link href="/profile/3" className=" transition-all">
                User 3
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
