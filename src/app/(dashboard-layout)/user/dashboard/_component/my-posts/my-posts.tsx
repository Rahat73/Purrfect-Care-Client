"use client";

import { useGetMyPosts } from "@/src/hooks/post.hook";
import MyPostCard from "./my-post-card";
import { IPost } from "@/src/types";
import MyPostCardLoading from "@/src/components/ui/my-post-card-loading";

const MyPosts = () => {
  const { data: posts, isFetching } = useGetMyPosts();

  return (
    <section>
      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {Array.from({ length: 6 }).map((_, i) => (
            <MyPostCardLoading key={i} />
          ))}
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {posts.map((post: IPost) => (
                <MyPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-default-500 text-center my-10">
              You have no posts yet
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default MyPosts;
