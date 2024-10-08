"use client";

import HtmlContentRenderer from "@/src/components/html-content-render";
import { useUser } from "@/src/context/user.provider";
import { useFollowUser } from "@/src/hooks/follow.hook";
import { useVotePost } from "@/src/hooks/post-action.hook";
import { useUserInfo } from "@/src/hooks/user.hook";
import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaRegCommentDots,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa6";
import { toast } from "sonner";

export default function PostCard({ post }: { post: IPost }) {
  const { data: user } = useUserInfo();
  const { user: loggedinUser } = useUser();

  const router = useRouter();

  const [localPost, setLocalPost] = useState(post); // Local state to track post data
  const [seeMoreClicked, setSeeMoreClicked] = useState(false);

  const { mutate: handleFollowUser, isPending } = useFollowUser({
    invalidateQueries: ["GET_USER_INFO"],
  });

  const { mutate: handleUpvotePost, isPending: upvotePending } = useVotePost({
    invalidateQueries: ["GET_ALL_POST"],
    onSuccess: () => {
      if (localPost.upvotes.includes(user!._id)) {
        setLocalPost((prevPost) => ({
          ...prevPost,
          upvotes: prevPost.upvotes.filter((id) => id !== user!._id),
        }));
      } else {
        setLocalPost((prevPost) => ({
          ...prevPost,
          upvotes: [...prevPost.upvotes, user!._id],
          downvotes: prevPost.downvotes.filter((id) => id !== user!._id),
        }));
      }
    },
  });

  const { mutate: handleDownvotePost, isPending: downvotePending } =
    useVotePost({
      invalidateQueries: ["GET_ALL_POST"],
      onSuccess: () => {
        if (localPost.downvotes.includes(user!._id)) {
          setLocalPost((prevPost) => ({
            ...prevPost,
            downvotes: prevPost.downvotes.filter((id) => id !== user!._id),
          }));
        } else {
          setLocalPost((prevPost) => ({
            ...prevPost,
            downvotes: [...prevPost.downvotes, user!._id],
            upvotes: prevPost.upvotes.filter((id) => id !== user!._id),
          }));
        }
      },
    });

  return (
    <Card
      className="w-11/12 lg:w-[600px] mx-auto my-4"
      isPressable
      onPress={() => router.push(`/posts/${localPost._id}`)}
    >
      {/* Header: Author Info */}
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={localPost.author.profilePicture}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {localPost.author.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {localPost.author.email}
            </h5>
          </div>
        </div>
        {loggedinUser && user?._id !== localPost.author._id && (
          <Button
            className={
              user?.following?.includes(localPost.author._id)
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={
              user?.following?.includes(localPost.author._id)
                ? "bordered"
                : "solid"
            }
            onPress={() =>
              handleFollowUser({ followingId: localPost.author._id })
            }
            isDisabled={!user}
            isLoading={isPending}
          >
            {user?.following?.includes(localPost.author._id)
              ? "Unfollow"
              : "Follow"}
          </Button>
        )}
      </CardHeader>

      {/* Body: Post Content */}
      <CardBody className="px-3 py-0 text-small text-default-600">
        <h4 className="text-lg font-bold">{localPost.title}</h4>
        <p className="pt-2">
          {localPost.content.length > 100 && !seeMoreClicked ? (
            <>
              <HtmlContentRenderer content={localPost.content.slice(0, 100)} />
              ...{" "}
              <span
                className="text-default-500 cursor-pointer"
                onClick={() => setSeeMoreClicked(true)}
              >
                See more
              </span>
            </>
          ) : (
            <HtmlContentRenderer content={localPost.content} />
          )}
        </p>
        <Spacer y={4} />
        <span className="text-xs text-default-500">
          Category: {localPost.category}
        </span>
        {/* Post Images */}
        <Spacer y={4} />
        {localPost.images.length > 0 && (
          <div className="flex gap-3">
            {localPost.images.map((image, index) => (
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
      {user && (
        <CardFooter className="gap-7 flex justify-center">
          <Tooltip content="Upvote">
            <Button
              variant="shadow"
              size="sm"
              onPress={() =>
                handleUpvotePost({
                  postId: localPost._id,
                  postData: { voteType: "upvote" },
                })
              }
              isLoading={upvotePending}
            >
              <div className="flex gap-2 items-center">
                <p className="text-default-400 text-small">
                  {localPost.upvotes.includes(user?._id) ? (
                    <FaThumbsUp className="text-xl cursor-pointer text-primary" />
                  ) : (
                    <FaRegThumbsUp className="text-xl cursor-pointer" />
                  )}
                </p>
                <p className="font-semibold text-default-400 text-small">
                  {localPost.upvotes.length}
                </p>
              </div>
            </Button>
          </Tooltip>
          <Tooltip content="Downvote">
            <Button
              variant="shadow"
              size="sm"
              onPress={() =>
                handleDownvotePost({
                  postId: localPost._id,
                  postData: { voteType: "downvote" },
                })
              }
              isLoading={downvotePending}
            >
              <div className="flex gap-2 items-center">
                <p className="text-default-400 text-small">
                  {localPost.downvotes.includes(user?._id) ? (
                    <FaThumbsDown className="text-xl cursor-pointer text-primary" />
                  ) : (
                    <FaRegThumbsDown className="text-xl cursor-pointer" />
                  )}
                </p>
                <p className="font-semibold text-default-400 text-small">
                  {localPost.downvotes.length}
                </p>
              </div>
            </Button>
          </Tooltip>
          <Tooltip content="Comments">
            <Button variant="shadow" size="sm">
              <div className="flex gap-2 items-center">
                <Link
                  href={`/posts/${localPost._id}`}
                  className="text-default-400 text-small"
                >
                  <FaRegCommentDots className="text-xl cursor-pointer" />
                </Link>

                <p className="font-semibold text-default-400 text-small">
                  {localPost.comments.length}
                </p>
              </div>
            </Button>
          </Tooltip>
        </CardFooter>
      )}
    </Card>
  );
}
