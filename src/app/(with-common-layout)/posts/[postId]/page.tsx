"use client";

import AppForm from "@/src/components/form/AppForm";
import AppInput from "@/src/components/form/AppInput";
import AppTextarea from "@/src/components/form/AppTextarea";
import HtmlContentRenderer from "@/src/components/html-content-render";
import PostDetailsLoading from "@/src/components/ui/post-details-loading";
import { useFollowUser } from "@/src/hooks/follow.hook";
import { Spinner } from "@nextui-org/spinner";
import {
  useAddComment,
  useDeleteComment,
  useEditComment,
  useVotePost,
} from "@/src/hooks/post-action.hook";
import { useGetPostById } from "@/src/hooks/post.hook";
import { useUserInfo } from "@/src/hooks/user.hook";
import { addCommentValidationSchema } from "@/src/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Spacer } from "@nextui-org/spacer";
import { Tooltip } from "@nextui-org/tooltip";
import { formatDistance } from "date-fns";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  FaCrown,
  FaPaperPlane,
  FaRegCommentDots,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa6";
import { useUser } from "@/src/context/user.provider";
import { usePurchasePost } from "@/src/hooks/payment.hook";

const PostDetailsPage = ({ params }: { params: { postId: string } }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState<{
    _id: string;
    content: string;
  } | null>(null);

  const { data: postData, isLoading: postLoading } = useGetPostById(
    params.postId
  );

  const { data: user } = useUserInfo();

  const { user: loggedinUser } = useUser();

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
    onSuccess: () => {},
  });

  const {
    mutate: handleDownvotePost,
    isPending: downvotePending,
    isSuccess: downvoteSuccess,
  } = useVotePost({
    invalidateQueries: ["GET_POST_BY_ID", params.postId],
    onSuccess: () => {},
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

  const { mutate: handleEditComment, isPending: editCommentPending } =
    useEditComment({
      invalidateQueries: ["GET_POST_BY_ID", params.postId],
      onSuccess: () => {
        setIsEditOpen(false);
      },
    });

  const { mutate: handleDeleteComment, isPending: deleteCommentPending } =
    useDeleteComment({
      invalidateQueries: ["GET_POST_BY_ID", params.postId],
    });

  const { mutateAsync: purchasePost, isPending: purchasePending } =
    usePurchasePost();

  if (postLoading) return <PostDetailsLoading />;

  return (
    <>
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
                <p className="text-xs text-default-500">
                  {postData?.author.bio}
                </p>
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
            {formatDistance(new Date(postData.createdAt), new Date(), {
              addSuffix: true,
            })}
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              {postData?.isPremium > 0 && (
                <FaCrown className="text-amber-500" />
              )}
              {postData?.title}
            </h2>
            {!(postData?.isPremium > 0) ||
            loggedinUser?._id === postData.author._id ||
            user?.premiumPostsPurchased?.includes(postData._id) ? (
              <>
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
              </>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <p>Purchase premium to see full content</p>
                  <Button
                    className=""
                    size="sm"
                    color="warning"
                    onPress={async () => {
                      const data = await purchasePost(postData._id);
                      window.location.href = data.data.payment_url;
                    }}
                    isLoading={purchasePending}
                  >
                    Purchase
                  </Button>
                </div>
                <div className="filter blur-xl">
                  <p className="pt-2">
                    - This is Dummy Content. You need to purchase premium to see
                    it. <br />
                    - This is Dummy Content.
                    <br />- This is Dummy Content.
                    <br />- This is Dummy Content.
                  </p>
                  <Spacer y={4} />
                  <span className="text-xs text-default-500">
                    Category: {postData?.category}
                  </span>
                  {/* Post Images */}
                  <Spacer y={4} />
                  {postData.images.length > 0 && (
                    <div className="flex gap-3">
                      <Image
                        isBlurred
                        isZoomed
                        src={
                          "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D"
                        }
                        alt={"dummy image"}
                        width={150}
                        height={150}
                      />
                      <Image
                        isBlurred
                        isZoomed
                        src={
                          "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
                        }
                        alt={"dummy image"}
                        width={150}
                        height={150}
                      />
                    </div>
                  )}
                  <Spacer y={4} />
                </div>
              </>
            )}
          </CardBody>

          {/* Footer: Actions (Upvotes, Downvotes, Comments) */}
          {loggedinUser && (
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
          )}

          {/* Comments Section */}
          <Spacer y={4} />
          {loggedinUser && (
            <>
              <div className="px-4 py-2">
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                <Spacer y={4} />
                {postData?.comments && postData?.comments.length > 0 ? (
                  postData?.comments.map((comment, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center mb-1 justify-between">
                        <div className="flex gap-3 items-center">
                          <Avatar
                            isBordered
                            radius="full"
                            size="sm"
                            src={comment.author.profilePicture}
                          />
                          <p className="font-medium">{comment.author.name}</p>
                        </div>
                        {user?._id === comment.author._id && (
                          <div className="flex gap-5 text-default-600">
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                setCurrentComment({
                                  _id: comment._id,
                                  content: comment.content,
                                });
                                setIsEditOpen(true);
                              }}
                            >
                              Edit
                            </div>
                            <Popover
                              key={comment._id}
                              placement="top"
                              color={"foreground"}
                              size="lg"
                              showArrow
                            >
                              <PopoverTrigger>
                                <p className="cursor-pointer">Delete</p>
                              </PopoverTrigger>
                              <PopoverContent className=" gap-2">
                                {deleteCommentPending ? (
                                  <Spinner />
                                ) : (
                                  <>
                                    <p>Are you sure?</p>
                                    <p
                                      className="text-red-500 cursor-pointer"
                                      onClick={() => {
                                        handleDeleteComment({
                                          postId: postData._id,
                                          commentId: comment._id,
                                        });
                                      }}
                                    >
                                      Confirm
                                    </p>
                                  </>
                                )}
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                      </div>
                      <p className="text-default-500 mx-10">
                        {comment.content}
                      </p>
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
            </>
          )}
        </Card>
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Edit Comment</ModalHeader>
          <ModalBody>
            <AppForm
              onSubmit={(data) => {
                handleEditComment({
                  postId: postData._id,
                  commentId: currentComment?._id,
                  commentData: { content: data.content },
                });
              }}
            >
              <AppTextarea
                name="content"
                label=""
                defaultValue={currentComment?.content}
                placeholder="Edit your comment"
              />
              <div className="flex gap-2 mt-4">
                <Button
                  type="submit"
                  isLoading={editCommentPending}
                  className="bg-primary-600 text-white"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="light"
                  onPress={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostDetailsPage;
