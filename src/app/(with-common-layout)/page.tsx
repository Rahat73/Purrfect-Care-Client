import envConfig from "@/src/config/env-config";
import PostCard from "./_component/post-card";
import { IPost } from "@/src/types";

export default async function Home() {
  const res = await fetch(`${envConfig.baseApi}/posts`, {
    next: {
      tags: ["posts"],
    },
  });
  const data = await res.json();
  console.log(data?.data);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <ul className="list-disc list-inside">
        {data?.data?.map((post: IPost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </ul>
    </section>
  );
}
