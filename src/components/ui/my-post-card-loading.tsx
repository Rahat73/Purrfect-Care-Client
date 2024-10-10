import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { FaThumbsUp, FaThumbsDown, FaComment, FaCrown } from "react-icons/fa";

const MyPostCardLoading = () => {
  return (
    <Card className="w-full max-w-xs mx-auto bg-default-100">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>

      {/* Skeleton for images */}
      <div className="flex justify-center gap-3 my-3">
        <Skeleton className="h-24 w-24 rounded-lg" />
        <Skeleton className="h-24 w-24 rounded-lg" />
      </div>

      <CardBody>
        {/* Skeleton for content preview */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-11/12 mb-2" />
        <Skeleton className="h-4 w-10/12" />
      </CardBody>

      <CardFooter className="flex flex-col justify-between items-center space-y-5">
        {/* Skeleton for footer icons and stats */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center">
            <FaThumbsUp className="mr-1" /> <Skeleton className="h-4 w-6" />
          </div>

          <div className="flex items-center">
            <FaThumbsDown className="mr-1" /> <Skeleton className="h-4 w-6" />
          </div>

          <div className="flex items-center">
            <FaComment className="mr-1" /> <Skeleton className="h-4 w-6" />
          </div>

          <FaCrown className="text-yellow-500 mr-2 text-xl" />
        </div>

        {/* Skeleton for delete button */}
        <Skeleton className="h-10 w-24 rounded-lg" />
      </CardFooter>
    </Card>
  );
};

export default MyPostCardLoading;
