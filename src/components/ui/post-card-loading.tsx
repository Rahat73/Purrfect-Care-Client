import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const PostCardLoading = () => {
  return (
    <Card className="w-11/12 lg:w-[600px] mx-auto my-4 bg-default-100">
      {/* Header: Skeleton for Author Info */}
      <CardHeader className="justify-between">
        <div className="flex gap-5 items-center">
          <Skeleton className="w-12 h-12 rounded-full" />{" "}
          {/* Avatar skeleton */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" /> {/* Name skeleton */}
            <Skeleton className="h-3 w-32" /> {/* Email skeleton */}
          </div>
        </div>
        <Skeleton className="h-6 w-16" /> {/* Follow button skeleton */}
      </CardHeader>

      {/* Body: Skeleton for Post Content */}
      <CardBody className="px-3 py-0 text-small text-default-600">
        <Skeleton className="h-6 w-3/4 mb-2" /> {/* Title skeleton */}
        <Skeleton className="h-4 w-full mb-2" /> {/* Content line 1 */}
        <Skeleton className="h-4 w-10/12 mb-2" /> {/* Content line 2 */}
        <Skeleton className="h-4 w-11/12" /> {/* Content line 3 */}
        <Skeleton className="h-4 w-20 mt-4" /> {/* Category skeleton */}
        {/* Post Images */}
        <div className="flex gap-3 mt-4">
          <Skeleton className="w-36 h-36 rounded-md" /> {/* Image skeleton 1 */}
          <Skeleton className="w-36 h-36 rounded-md" /> {/* Image skeleton 2 */}
        </div>
      </CardBody>

      {/* Footer: Skeleton for Upvotes, Downvotes, and Comments */}
      <CardFooter className="gap-7 flex justify-center">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-5 h-5 rounded-full" /> {/* Upvote Icon */}
          <Skeleton className="w-4 h-4" /> {/* Upvote count */}
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="w-5 h-5 rounded-full" /> {/* Downvote Icon */}
          <Skeleton className="w-4 h-4" /> {/* Downvote count */}
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="w-5 h-5 rounded-full" /> {/* Comment Icon */}
          <Skeleton className="w-4 h-4" /> {/* Comment count */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCardLoading;
