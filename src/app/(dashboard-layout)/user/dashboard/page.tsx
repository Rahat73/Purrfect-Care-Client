"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { BsFilePostFill } from "react-icons/bs";
import { FaCat, FaUserCheck, FaUsers } from "react-icons/fa6";
import MyFollowers from "./_component/my-followers";
import MyFollowing from "./_component/my-following";
import MyPosts from "./_component/my-posts/my-posts";
import NutritionOutline from "./_component/nutrition-outline/nutrition-outline";

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
          <Tab
            key="nutrition-outline"
            title={
              <div className="flex gap-2 justify-center items-center">
                <FaCat /> Nutrition Outline
              </div>
            }
          >
            <NutritionOutline />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default UserDashboard;
