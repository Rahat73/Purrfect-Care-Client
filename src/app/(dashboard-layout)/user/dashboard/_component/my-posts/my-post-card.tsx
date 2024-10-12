"use client";

import HtmlContentRenderer from "@/src/components/html-content-render";
import { useDeletePost, useUpdatePost } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaComment, FaCrown, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FaPen, FaTrash } from "react-icons/fa6";

const MyPostCard = ({ post }: { post: IPost }) => {
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);

  const router = useRouter();

  // const { mutate: handleUpdatePost, isPending: editPostLoading } =
  //   useUpdatePost();

  const { mutate: handleDeletePost, isPending: deletePostLoading } =
    useDeletePost();

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
        <div className="flex justify-center mx-3 gap-3">
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

          {post.isPremium > 0 && (
            <FaCrown className="text-yellow-500 mr-2 text-xl" />
          )}
        </div>
        <div className="flex space-x-3">
          <Link href={`/posts/edit-post/${post._id}`}>
            <Button variant="shadow" color="default" size="sm">
              <FaPen /> Edit
            </Button>
          </Link>
          <Popover showArrow>
            <PopoverTrigger>
              <Button variant="shadow" color="danger" size="sm">
                <FaTrash /> Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-red-500">
                Are you sure you want to delete this post?
              </p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="mt-2"
                  color="danger"
                  isLoading={deletePostLoading}
                  onPress={() => handleDeletePost(post._id)}
                >
                  Yes, delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MyPostCard;
