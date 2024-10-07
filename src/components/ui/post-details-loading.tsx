import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { Spacer } from "@nextui-org/spacer";
import React from "react";

const PostDetailsLoading = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Card className="w-full mx-auto my-4">
        {/* Header: Author Info */}
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
          </div>
          <Skeleton className="w-20 h-8 rounded-full" />
        </CardHeader>

        {/* Body: Post Content */}
        <CardBody className="px-3 py-0 text-default-600">
          <Skeleton className="h-8 w-4/5 rounded mb-4" />
          <Skeleton className="h-5 w-11/12 rounded mb-2" />
          <Skeleton className="h-5 w-10/12 rounded mb-2" />
          <Skeleton className="h-5 w-9/12 rounded mb-4" />
          <Spacer y={4} />
          <Skeleton className="h-4 w-28 rounded" />
          <Spacer y={4} />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="w-full h-36 rounded-lg" />
            <Skeleton className="w-full h-36 rounded-lg" />
          </div>
          <Spacer y={4} />
        </CardBody>

        {/* Footer: Actions (Upvotes, Downvotes, Comments) */}
        <CardFooter className="gap-7 flex justify-center">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full" />
        </CardFooter>
      </Card>

      {/* Comments Section */}
      <div className="px-4 py-2">
        <Skeleton className="h-6 w-32 rounded mb-4" />
        <div className="mb-4">
          <div className="flex gap-3 items-center mb-1">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
          <Skeleton className="h-5 w-full rounded" />
        </div>
        <div className="mb-4">
          <div className="flex gap-3 items-center mb-1">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
          <Skeleton className="h-5 w-full rounded" />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsLoading;
