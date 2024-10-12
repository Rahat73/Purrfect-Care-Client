"use client";

import {
  useBlockUser,
  useGetAllUsers,
  useMakeAdmin,
} from "@/src/hooks/user.hook";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";
import { FaUserShield, FaUserSlash } from "react-icons/fa6";

const columns = [
  { key: "profilePicture", label: "" },
  { key: "name", label: "NAME" },
  { key: "email", label: "EMAIL" },
  { key: "role", label: "ROLE" },
  { key: "followersCount", label: "FOLLOWERS" },
  { key: "followingCount", label: "FOLLOWING" },
  //   { key: "purchasedPosts", label: "Purchased Posts" },
  //   { key: "createdAt", label: "Created Date" },
  { key: "isBlocked", label: "STATUS" },
  { key: "actions", label: "ACTION" },
];

const Users = () => {
  const { data: usersData, isFetching } = useGetAllUsers();

  const { mutate: makeAdmin, isPending: makeAdminPending } = useMakeAdmin();

  const { mutate: blockUser, isPending: blockUserPending } = useBlockUser();

  const rows =
    usersData?.map((user) => ({
      key: user._id,
      profilePicture: user.profilePicture,
      name: user.name,
      email: user.email,
      role: user.role.toUpperCase(),
      followersCount: user.followers.length,
      followingCount: user.following.length,
      // purchasedPosts: user.premiumPostsPurchased.length,
      // createdAt: new Date(user.createdAt).toLocaleDateString(),
      isBlocked: user.isBlocked ? "Blocked" : "Active",
      actions: user,
    })) || [];

  return (
    <div className="overflow-x-auto">
      <Table aria-label="User Management Table" selectionMode="single">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rows}
          isLoading={isFetching || blockUserPending || makeAdminPending}
          loadingContent={
            <div className=" bg-black/10 z-[999] backdrop-blur-md w-full h-full flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          }
        >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "profilePicture" ? (
                    <Avatar
                      src={getKeyValue(item, columnKey)}
                      alt={item.name}
                    />
                  ) : columnKey === "actions" ? (
                    <>
                      {item.role === "USER" && (
                        <div className="text-xl flex space-x-5 justify-end">
                          {item.isBlocked !== "Blocked" && (
                            <Tooltip content="Make Admin">
                              <div onClick={() => makeAdmin(item.key)}>
                                <FaUserShield className="cursor-pointer text-amber-500" />
                              </div>
                            </Tooltip>
                          )}
                          <Tooltip
                            content={
                              item.isBlocked === "Blocked" ? "Unblock" : "Block"
                            }
                          >
                            <div onClick={() => blockUser(item.key)}>
                              <FaUserSlash className="cursor-pointer text-red-500" />
                            </div>
                          </Tooltip>
                        </div>
                      )}
                    </>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
