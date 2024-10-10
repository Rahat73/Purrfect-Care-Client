"use client";

import { useChangePostVisibilty, useGetAllPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostItem {
  key: string;
  author: JSX.Element;
  title: string;
  comments: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  premium: string;
  action: JSX.Element;
}

const Contents = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isFetching } = useGetAllPosts({ page });
  const posts = data?.result || [];

  useEffect(() => {
    if (data?.meta.totalPage) {
      setTotalPages(data.meta.totalPage);
    }
  }, [data?.meta.totalPage]);

  const router = useRouter();

  const { mutate: changePostVisibilty, isPending } = useChangePostVisibilty();

  const columns = [
    { key: "title", label: "Post Title" },
    { key: "author", label: "Author" },
    { key: "comments", label: "Comments" },
    { key: "upvotes", label: "Upvotes" },
    { key: "downvotes", label: "Downvotes" },
    { key: "createdAt", label: "Created At" },
    { key: "premium", label: "Premium" },
    { key: "action", label: "Action" },
  ];

  const rows = posts.map((post: IPost) => ({
    key: post._id,
    author: (
      <div className="flex items-center gap-2">
        <Avatar src={post.author.profilePicture} size="sm" />
        <div>{post.author.name}</div>
      </div>
    ),
    title: post.title,
    comments: post.comments.length,
    upvotes: post.upvotes.length,
    downvotes: post.downvotes.length,
    createdAt: new Date(post.createdAt).toLocaleDateString(),
    premium: post.isPremium,
    action: (
      <Button
        size="sm"
        color={post.isPublished ? "danger" : "success"}
        onPress={() => changePostVisibilty(post._id)}
      >
        {post.isPublished ? "Unpublish" : "Publish"}
      </Button>
    ),
  }));

  return (
    <div className="overflow-x-auto">
      <Table
        aria-label="Post list"
        onRowAction={(key) => router.push(`/posts/${key}`)}
        selectionMode="single"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              //   initialPage={1}
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={rows}
          isLoading={isFetching || isPending}
          loadingContent={
            <div className=" bg-black/10 z-[999] backdrop-blur-md w-full h-full flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          }
        >
          {(item: PostItem) => (
            <TableRow key={item.key} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Contents;
