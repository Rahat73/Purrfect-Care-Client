"use client";

import {
  FaRegCommentDots,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa6";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";
import Link from "next/link";
import { IPost } from "@/src/types";

export default function PostCard({ post }: { post: IPost }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);

  const { user } = useUser();

  return (
    <Card className="w-11/12 mx-auto my-4">
      {/* Header: Author Info */}
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={post.author.profilePicture}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {post.author.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {post.author.email}
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>

      {/* Body: Post Content */}
      <CardBody className="px-3 py-0 text-small text-default-600">
        <h4 className="text-lg font-bold">{post.title}</h4>
        <p className="pt-2">
          {post.content.length > 100 && !seeMoreClicked ? (
            <>
              {post.content.slice(0, 100)}...{" "}
              <span
                className="text-default-500 cursor-pointer"
                onClick={() => setSeeMoreClicked(true)}
              >
                See more
              </span>
            </>
          ) : (
            post.content
          )}
        </p>
        <Spacer y={4} />
        <span className="text-xs text-default-500">
          Category: {post.category}
        </span>
        {/* Post Images */}
        <Spacer y={4} />
        {post.images.length > 0 && (
          <div className="flex gap-3">
            {post.images.map((image, index) => (
              <Image
                isBlurred
                isZoomed
                key={index}
                src={image}
                alt={`post-image-${index}`}
                width={150}
                height={150}
              />
            ))}
          </div>
        )}
        <Spacer y={4} />
      </CardBody>

      {/* Footer: Actions (Upvotes, Downvotes, Comments) */}
      <CardFooter className="gap-7 flex justify-center">
        <Tooltip content="Upvote">
          <div className="flex gap-2 items-center">
            <p className="text-default-400 text-small">
              {user && post.upvotes.includes(user?._id) ? (
                <FaThumbsUp className="text-xl cursor-pointer text-primary" />
              ) : (
                <FaRegThumbsUp className="text-xl cursor-pointer" />
              )}
            </p>
            <p className="font-semibold text-default-400 text-small">
              {post.upvotes.length}
            </p>
          </div>
        </Tooltip>
        <Tooltip content="Downvote">
          <div className="flex gap-2 items-center">
            <p className="text-default-400 text-small">
              {user && post.downvotes.includes(user?._id) ? (
                <FaThumbsDown className="text-xl cursor-pointer text-primary" />
              ) : (
                <FaRegThumbsDown className="text-xl cursor-pointer" />
              )}
            </p>
            <p className="font-semibold text-default-400 text-small">
              {post.downvotes.length}
            </p>
          </div>
        </Tooltip>
        <Tooltip content="Comments">
          <div className="flex gap-2 items-center">
            <Link
              href={`/posts/${post._id}`}
              className="text-default-400 text-small"
            >
              <FaRegCommentDots className="text-xl cursor-pointer" />
            </Link>

            <p className="font-semibold text-default-400 text-small">
              {post.comments.length}
            </p>
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
