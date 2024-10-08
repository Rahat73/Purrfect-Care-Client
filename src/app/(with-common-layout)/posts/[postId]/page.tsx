"use client";

import AppForm from "@/src/components/form/AppForm";
import AppInput from "@/src/components/form/AppInput";
import AppTextarea from "@/src/components/form/AppTextarea";
import HtmlContentRenderer from "@/src/components/html-content-render";
import PostDetailsLoading from "@/src/components/ui/post-details-loading";
import { useFollowUser } from "@/src/hooks/follow.hook";
import { useAddComment, useVotePost } from "@/src/hooks/post-action.hook";
import { useGetPostById } from "@/src/hooks/post.hook";
import { useUserInfo } from "@/src/hooks/user.hook";
import { addCommentValidationSchema } from "@/src/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spacer } from "@nextui-org/spacer";
import { Tooltip } from "@nextui-org/tooltip";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  FaPaperPlane,
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

  const { data: user } = useUserInfo();

  const {
    mutate: handleFollowUser,
    isPending,
    isSuccess,
  } = useFollowUser({ invalidateQueries: ["GET_USER_INFO"] });
  const {
    mutate: handleUpvotePost,
    isPending: upvotePending,
    isSuccess: upvoteSuccess,
  } = useVotePost({
    invalidateQueries: ["GET_POST_BY_ID", params.postId],
  });

  const {
    mutate: handleDownvotePost,
    isPending: downvotePending,
    isSuccess: downvoteSuccess,
  } = useVotePost({
    invalidateQueries: ["GET_POST_BY_ID", params.postId],
  });

  const {
    mutate: handleAddComment,
    isPending: addCommentPending,
    isSuccess: addCommentSuccess,
  } = useAddComment({
    invalidateQueries: ["GET_POST_BY_ID", params.postId],
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleAddComment({
      postId: params.postId,
      commentData: data,
    });
  };

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
          {user?._id !== postData.author._id && (
            <Button
              className={
                user?.following?.includes(postData.author._id)
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="sm"
              variant={
                user?.following?.includes(postData.author._id)
                  ? "bordered"
                  : "solid"
              }
              onPress={() =>
                handleFollowUser({ followingId: postData.author._id })
              }
              isDisabled={!user}
              isLoading={isPending}
            >
              {user?.following?.includes(postData.author._id)
                ? "Unfollow"
                : "Follow"}
            </Button>
          )}
        </CardHeader>

        {/* Body: Post Content */}
        <CardBody className="px-3 py-0 text-default-600">
          <h2 className="text-2xl font-bold mb-2">{postData?.title}</h2>
          <p className="text-base mb-4">
            <HtmlContentRenderer content={postData?.content} />
          </p>
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
            <Button
              variant="shadow"
              size="sm"
              isLoading={upvotePending}
              onPress={() =>
                handleUpvotePost({
                  postId: postData._id,
                  postData: { voteType: "upvote" },
                })
              }
            >
              <div className="flex gap-2 items-center">
                <p className="text-default-400 text-small">
                  {postData.upvotes.includes(user?._id) ? (
                    <FaThumbsUp className="text-xl cursor-pointer text-primary" />
                  ) : (
                    <FaRegThumbsUp className="text-xl cursor-pointer" />
                  )}
                </p>
                <p className="font-semibold text-default-400 text-small">
                  {postData.upvotes.length}
                </p>
              </div>
            </Button>
          </Tooltip>
          <Tooltip content="Downvote">
            <Button
              variant="shadow"
              size="sm"
              isLoading={downvotePending}
              onPress={() =>
                handleDownvotePost({
                  postId: postData._id,
                  postData: { voteType: "downvote" },
                })
              }
            >
              <div className="flex gap-2 items-center">
                <p className="text-default-400 text-small">
                  {postData.downvotes.includes(user?._id) ? (
                    <FaThumbsDown className="text-xl cursor-pointer text-primary" />
                  ) : (
                    <FaRegThumbsDown className="text-xl cursor-pointer" />
                  )}
                </p>
                <p className="font-semibold text-default-400 text-small">
                  {postData.downvotes.length}
                </p>
              </div>
            </Button>
          </Tooltip>
          <Tooltip content="Comments">
            <Button variant="shadow" size="sm">
              <div className="flex gap-2 items-center">
                <FaRegCommentDots className="text-xl text-default-400 cursor-pointer" />
                <p className="font-semibold text-default-400 text-small">
                  {postData.comments.length}
                </p>
              </div>
            </Button>
          </Tooltip>
        </CardFooter>

        {/* Comments Section */}
        <Spacer y={4} />
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <Spacer y={4} />
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

        <Spacer y={4} />
        <div className="px-4">
          <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
          <Spacer y={3} />
          <AppForm
            onSubmit={onSubmit}
            resolver={zodResolver(addCommentValidationSchema)}
          >
            <div className="">
              <AppTextarea
                name="content"
                label=""
                type="text"
                placeholder="Add your comment"
              />
            </div>
            <Button
              className="my-3 w-40 rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
              isLoading={addCommentPending}
            >
              <FaPaperPlane /> Comment
            </Button>
          </AppForm>
        </div>
      </Card>
    </div>
  );
};

export default PostDetailsPage;
