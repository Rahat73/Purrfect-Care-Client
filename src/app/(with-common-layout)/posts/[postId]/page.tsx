"use client";

import PostDetailsLoading from "@/src/components/ui/post-details-loading";
import { useUser } from "@/src/context/user.provider";
import { useGetPostById } from "@/src/hooks/post.hook";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import {
  FaRegCommentDots,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa6";

const PostDetailsPage = ({ params }: { params: { postId: string } }) => {
  const { data: postData, isLoading: postLoading } = useGetPostById(
    params.postId
  );

  const { user } = useUser();

  if (postLoading) return <PostDetailsLoading />;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Card className="w-full mx-auto my-4">
        {/* Header: Author Info */}
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="lg"
              src={postData?.author.profilePicture}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-lg font-semibold leading-none text-default-600">
                {postData?.author.name}
              </h4>
              <h5 className="text-sm tracking-tight text-default-400">
                {postData?.author.email}
              </h5>
              <p className="text-xs text-default-500">{postData?.author.bio}</p>
            </div>
          </div>
          <Button
            className="bg-transparent text-foreground border-default-200"
            color="primary"
            radius="full"
            size="sm"
            variant="bordered"
          >
            Follow
          </Button>
        </CardHeader>

        {/* Body: Post Content */}
        <CardBody className="px-3 py-0 text-default-600">
          <h2 className="text-2xl font-bold mb-2">{postData?.title}</h2>
          <p className="text-base mb-4">{postData?.content}</p>
          <Spacer y={4} />
          <span className="text-xs text-default-500">
            Category: {postData?.category}
          </span>
          <Spacer y={4} />
          {postData?.images && postData?.images.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {postData?.images.map((image, index) => (
                <Image
                  isBlurred
                  isZoomed
                  key={index}
                  src={image}
                  alt={`post-image-${index}`}
                  width="100%"
                  height={200}
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
                {user && postData?.upvotes.includes(user._id) ? (
                  <FaThumbsUp className="text-2xl cursor-pointer text-primary" />
                ) : (
                  <FaRegThumbsUp className="text-2xl cursor-pointer" />
                )}
              </p>
              <p className="font-semibold text-default-400 text-small">
                {postData?.upvotes.length}
              </p>
            </div>
          </Tooltip>
          <Tooltip content="Downvote">
            <div className="flex gap-2 items-center">
              <p className="text-default-400 text-small">
                {user && postData?.downvotes.includes(user._id) ? (
                  <FaThumbsDown className="text-2xl cursor-pointer text-primary" />
                ) : (
                  <FaRegThumbsDown className="text-2xl cursor-pointer" />
                )}
              </p>
              <p className="font-semibold text-default-400 text-small">
                {postData?.downvotes.length}
              </p>
            </div>
          </Tooltip>
          <Tooltip content="Comments">
            <div className="flex gap-2 items-center">
              <FaRegCommentDots className="text-2xl cursor-pointer" />
              <p className="font-semibold text-default-400 text-small">
                {postData?.comments.length}
              </p>
            </div>
          </Tooltip>
        </CardFooter>

        {/* Comments Section */}
        <Spacer y={4} />
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {postData?.comments && postData?.comments.length > 0 ? (
            postData?.comments.map((comment, index) => (
              <div key={index} className="mb-4">
                <div className="flex gap-3 items-center mb-1">
                  <Avatar
                    isBordered
                    radius="full"
                    size="sm"
                    src={comment.author.profilePicture}
                  />
                  <p className="font-medium">{comment.author.name}</p>
                </div>
                <p className="text-default-500">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-default-400">No comments yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostDetailsPage;
