"use client";

import { useGetAllPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./_component/post-card";
import PostCardLoading from "@/src/components/ui/post-card-loading";

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { category } = searchParams;

  // Pagination states
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts with pagination
  const {
    data: { result: postData = [], meta } = {
      result: [],
      meta: { page: 1, totalPage: 100, limit: 5, total: 0 },
    },
    isFetching: postLoading,
  } = useGetAllPosts({
    page,
    limit: 5,
    category,
    sort: category && "-upvotes", // Sort by upvotes if category is set
  });

  // Reset posts when category changes
  useEffect(() => {
    setPage(1);
    setPosts([]); // Clear posts on category change
    setHasMore(true); // Reset hasMore flag
  }, [category]);

  // Update posts when new data is fetched
  useEffect(() => {
    if (postData.length > 0) {
      setPosts((prevPosts) => {
        const newPosts = postData.filter(
          (newPost: IPost) =>
            !prevPosts.some((prevPost) => prevPost._id === newPost._id)
        );
        return [...prevPosts, ...newPosts];
      });
      setHasMore(page < meta.totalPage); // Check if there are more pages
    }
  }, [postData]); // Only depend on postData

  // Function to fetch the next page
  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {postLoading && posts.length === 0 ? (
        Array.from({ length: 6 }).map((_, i) => <PostCardLoading key={i} />)
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading more posts...</h4>}
          endMessage={<p>No more posts to load.</p>}
          scrollThreshold={0.9}
        >
          <ul className="list-disc list-inside">
            {posts.map((post: IPost) => (
              <PostCard key={post._id} post={post} />
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </section>
  );
}
