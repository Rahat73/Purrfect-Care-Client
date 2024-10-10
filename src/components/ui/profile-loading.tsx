import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const ProfileLoading = () => {
  return (
    <Card className="w-11/12 mx-auto max-w-2xl">
      <CardHeader className="flex items-center justify-end">
        <Skeleton className="w-24 h-8 rounded-md" />
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4 items-center">
          <Skeleton className="w-40 h-40 rounded-full" />
          <Skeleton className="w-1/2 h-8 rounded-md" />
          <Skeleton className="w-3/4 h-6 rounded-md" />
        </div>

        <div className="flex justify-around mt-6">
          <div className="text-center">
            <Skeleton className="w-12 h-4 rounded-md" />
            <Skeleton className="w-8 h-6 rounded-md mt-1" />
          </div>
          <div className="text-center">
            <Skeleton className="w-12 h-4 rounded-md" />
            <Skeleton className="w-8 h-6 rounded-md mt-1" />
          </div>
          <div className="text-center">
            <Skeleton className="w-12 h-4 rounded-md" />
            <Skeleton className="w-8 h-6 rounded-md mt-1" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfileLoading;
