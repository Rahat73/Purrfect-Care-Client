"use client";

import Link from "next/link";
import { FaCrown } from "react-icons/fa6"; // FontAwesome Icon for Premium Posts

const RightSidebar = () => {
  return (
    <aside className="p-10 bg-transparent text-default-600">
      <div>
        {/* Post Categories Filter Section */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Filter</h2>
          <ul className="mt-2">
            <li className="hover:bg-default-200 transition-all rounded-md p-2">
              <Link href="/?sort=-upvotes" className=" transition-all">
                Upvote
              </Link>
            </li>
            <li className="hover:bg-default-200 transition-all rounded-md p-2">
              <Link href="/?sort=-downvotes" className=" transition-all">
                DownVote
              </Link>
            </li>
            <li className="hover:bg-default-200 transition-all rounded-md p-2">
              <Link href="/" className=" transition-all">
                All
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold text-lg">Categories</h2>
          <ul className="mt-2">
            <li className="hover:bg-default-200 transition-all rounded-md p-2">
              <Link href="/?category=Tip" className=" transition-all">
                Tip
              </Link>
            </li>
            <li className="hover:bg-default-200 transition-all rounded-md p-2">
              <Link href="/?category=Story" className=" transition-all">
                Story
              </Link>
            </li>
            <li className="hover:bg-default-200 transition-all rounded-md p-2">
              <Link href="/" className=" transition-all">
                All
              </Link>
            </li>
          </ul>
        </div>

        {/* Premium Posts Section */}
        {/* <div className="mb-6">
          <h2 className="font-semibold text-lg flex items-center">
            Premium Posts <FaCrown className="ml-2 text-yellow-500" />
          </h2>
          <ul className="space-y-2 mt-2">
            <li className="cursor-not-allowed">
              Premium Post 1
            </li>
            <li className="cursor-not-allowed">
              Premium Post 2
            </li>
            <li className="cursor-not-allowed">
              Premium Post 3
            </li>
          </ul>
        </div> */}

        {/* Suggested Users Section */}
        {/* <div className="mb-6">
          <h2 className="font-semibold text-lg ">Suggested Users</h2>
          <ul className="space-y-2 mt-2">
            <li className="cursor-not-allowed">User 1</li>
            <li className="cursor-not-allowed">User 2</li>
            <li className="cursor-not-allowed">User 1</li>
          </ul>
        </div> */}
      </div>
    </aside>
  );
};

export default RightSidebar;
