import React from "react";
import { useGetFollow } from "@/src/hooks/follow.hook";
import { Skeleton } from "@nextui-org/skeleton";
import { Card, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { IUser } from "@/src/types";

const MyFollowers = () => {
  const { data, isFetching } = useGetFollow();
  const followers = data?.followers || [];

  if (isFetching) {
    return (
      <div className="w-11/12 max-w-md mx-auto">
        {/* Skeleton while loading */}
        {[...Array(3)].map((_, idx) => (
          <Card key={idx} className="mb-4">
            <CardHeader className="flex items-center">
              <Skeleton className="w-10 h-10 rounded-full mr-4" />{" "}
              {/* Avatar Skeleton */}
              <Skeleton className="h-4 w-2/3" /> {/* Name Skeleton */}
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-md mx-auto my-10">
      {followers.length > 0 ? (
        followers.map((follower: IUser) => (
          <Card key={follower._id} className="mb-4">
            <CardHeader className="flex items-center">
              <Avatar
                isBordered
                radius="full"
                src={follower.profilePicture}
                alt={`${follower.name}'s profile picture`}
                className="mr-4"
              />
              <div>
                <div className="text-small font-semibold">{follower.name}</div>
                <div className="text-small font-semibold">{follower.email}</div>
              </div>
            </CardHeader>
          </Card>
        ))
      ) : (
        <p className="text-center text-default-500">
          You have no followers yet.
        </p>
      )}
    </div>
  );
};

export default MyFollowers;
