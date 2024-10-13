import React from "react";
import { useFollowUser, useGetFollow } from "@/src/hooks/follow.hook";
import { Skeleton } from "@nextui-org/skeleton";
import { Card, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";

const MyFollowing = () => {
  const { data, isFetching } = useGetFollow();
  const followings = data?.following || [];

  const { mutate: handleFollowUser, isPending } = useFollowUser({
    invalidateQueries: ["GET_FOLLOW"],
  });

  if (isFetching) {
    return (
      <div className="w-11/12 max-w-md mx-auto">
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
      {followings.length > 0 ? (
        followings.map((following: IUser) => (
          <Card key={following._id} className="mb-4">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar
                  isBordered
                  radius="full"
                  src={following.profilePicture}
                  alt={`${following.name}'s profile picture`}
                  className="mr-4"
                />
                <div>
                  <div className="text-lg font-semibold">{following.name}</div>
                  <div className="text-small font-semibold">
                    {following.email}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                color="default"
                radius="full"
                variant="bordered"
                onPress={() => handleFollowUser({ followingId: following._id })}
              >
                Unfollow
              </Button>
            </CardHeader>
          </Card>
        ))
      ) : (
        <p className="text-center text-default-500">
          You have no following yet.
        </p>
      )}
    </div>
  );
};

export default MyFollowing;
