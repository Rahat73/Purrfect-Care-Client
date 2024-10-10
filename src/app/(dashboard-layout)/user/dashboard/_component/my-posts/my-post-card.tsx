"use client";

import HtmlContentRenderer from "@/src/components/html-content-render";
import { IPost } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaComment, FaCrown, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const MyPostCard = ({ post }: { post: IPost }) => {
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);

  const router = useRouter();

  return (
    <Card
      className="w-full max-w-xs mx-auto bg-default-100"
      isPressable
      onPress={() => router.push(`/posts/${post._id}`)}
    >
      <CardHeader>
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </CardHeader>

      {post.images?.length > 0 && (
        <div className="flex justify-center gap-3">
          {post.images.map((image, index) => (
            <Image
              isBlurred
              isZoomed
              key={index}
              src={image}
              alt={`post-image-${index}`}
              width={100}
              height={100}
            />
          ))}
        </div>
      )}

      <CardBody>
        <p>
          {post.content.length > 100 && !seeMoreClicked ? (
            <>
              <HtmlContentRenderer content={post.content.slice(0, 100)} />
              ...{" "}
              <Button
                className="text-default-500 cursor-pointer"
                onClick={() => setSeeMoreClicked(true)}
                size="sm"
              >
                See more
              </Button>
            </>
          ) : (
            <HtmlContentRenderer content={post.content} />
          )}
        </p>
      </CardBody>

      <CardFooter className="flex flex-col justify-between items-center space-y-5">
        <div className="flex items-center space-x-5">
          <div className="flex items-center">
            <FaThumbsUp className="mr-1" /> {post.upvotes.length}
          </div>

          <div className="flex items-center">
            <FaThumbsDown className="mr-1" /> {post.downvotes.length}
          </div>

          <div className="flex items-center">
            <FaComment className="mr-1" /> {post.comments.length}
          </div>

          {post.isPremium === 0 && (
            <FaCrown className="text-yellow-500 mr-2 text-xl" />
          )}
        </div>
        <Button variant="shadow">Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default MyPostCard;
