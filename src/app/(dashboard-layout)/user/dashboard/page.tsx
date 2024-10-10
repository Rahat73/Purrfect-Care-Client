"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { BsFilePostFill } from "react-icons/bs";
import { FaUserCheck, FaUsers } from "react-icons/fa6";
import MyPosts from "./_component/my-posts/my-posts";
import MyFollowers from "./_component/my-followers";
import MyFollowing from "./_component/my-following";

const UserDashboard = () => {
  return (
    <section>
      <p className="text-center text-2xl underline underline-offset-8">
        User Dashboard
      </p>
      <div className="flex w-full flex-col my-10">
        <Tabs aria-label="Options" placement="top">
          <Tab
            key="posts"
            title={
              <div className="flex gap-2 justify-center items-center">
                <BsFilePostFill />
                My Posts
              </div>
            }
          >
            <MyPosts />
          </Tab>
          <Tab
            key="followers"
            title={
              <div className="flex gap-2 justify-center items-center">
                <FaUsers /> Followers
              </div>
            }
          >
            <MyFollowers />
          </Tab>
          <Tab
            key="following"
            title={
              <div className="flex gap-2 justify-center items-center">
                <FaUserCheck /> Following
              </div>
            }
          >
            <MyFollowing />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default UserDashboard;
