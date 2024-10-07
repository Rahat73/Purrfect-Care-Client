"use client";

import PostCard from "./_component/post-card";
import { IPost } from "@/src/types";
import { useEffect, useState, useRef, useCallback } from "react";
import { useGetAllPosts } from "@/src/hooks/post.hook";

export default function Home() {
  // const [page, setPage] = useState(1); // Track current page
  const [limit, setLimit] = useState(5);
  const [posts, setPosts] = useState<IPost[]>([]); // Store all posts
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // Ref for load-more div

  const {
    data: { result: postData, meta } = {
      result: [],
      meta: { page: 1, totalPage: 1 },
    },
    isLoading: postLoading,
    isFetching,
  } = useGetAllPosts({
    page: 1,
    limit,
  });

  // When post data changes, append new posts to the list
  // useEffect(() => {
  //   if (postData?.length) {
  //     setPosts((prevPosts) => [...prevPosts, ...postData]);
  //     setLoadingMore(false);
  //   }
  // }, [postData]);

  // Intersection Observer to detect when loadMoreRef comes into view
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        // !postLoading &&
        // !loadingMore &&
        limit < meta.total
      ) {
        // setLoadingMore(true);
        setLimit((prevPage) => prevPage + 5);
      }
    },
    [postLoading, meta.total]
  );

  // Attach observer to the loadMoreRef element
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px", // Trigger when user is 200px near the bottom
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ul className="list-disc list-inside">
        {postData.map((post: IPost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </ul>

      {/* Loader Message */}
      {isFetching && <p className="text-gray-500">Loading more posts...</p>}

      {/* Stop loading if we've reached the last page */}
      {limit >= meta.total && (
        <p className="text-gray-500">No more posts to load.</p>
      )}

      {/* Load more ref for infinite scroll */}
      {limit < meta.total && <div ref={loadMoreRef} className="h-10"></div>}
    </section>
  );
}
