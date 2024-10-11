"use client";

import Loading from "@/src/app/loading";
import {
  useCreatePost,
  useGetPostById,
  useUpdatePost,
} from "@/src/hooks/post.hook";
import { createPostSchema, updatePostSchema } from "@/src/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import axios from "axios";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaFileInvoice, FaRegFileImage } from "react-icons/fa6";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";
import { z } from "zod";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ header: [2, 3, false] }],
  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

const selectOptions = [
  { key: "Tip", label: "Tip" },
  { key: "Story", label: "Story" },
];

type EditPostFormData = z.infer<typeof createPostSchema>;

export default function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;

  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [isPremiumChecked, setIsPremiumChecked] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [imageLoading, setImageLoading] = useState(false);

  const { data: postData, isLoading, isFetching } = useGetPostById(postId);

  useEffect(() => {
    if (postData) {
      setContent(postData.content);
      setIsPremiumChecked(postData.isPremium > 0);
    }
  }, [postData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPostFormData>({
    resolver: zodResolver(updatePostSchema),
  });

  const { mutate: handleEditPost, isPending } = useUpdatePost({
    invalidateQueries: ["GET_POST_BY_ID", postId],
    onSuccess: () => {
      setImageFiles([]);
      setImagePreviews([]);
    },
  });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadImages = async () => {
    let imageUrls: string[] = [];

    if (imageFiles.length === 0) {
      return imageUrls;
    }

    setImageLoading(true);
    const promises = imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "rent_a_bike");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${"damvwxpdq"}/image/upload`,
          formData
        );

        const url = response.data.secure_url;
        imageUrls = [...imageUrls, url];
        console.log(url);
      } catch (error) {
        toast.error("Image upload failed");
      }
    });

    await Promise.all(promises);
    setImageLoading(false);

    return imageUrls;
  };

  const isQuillEmpty = () => {
    const quillEditor = document.querySelector(".ql-editor") as HTMLElement;
    return quillEditor?.innerText.trim().length === 0;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await handleUploadImages();

    if (isQuillEmpty()) {
      setContentError("Content cannot be empty");
      return;
    } else {
      setContentError("");
    }

    const postData = {
      ...data,
      isPremium: isPremiumChecked ? Number(data.isPremium) : 0,
      content,
      images,
    };

    handleEditPost({ postId, postData });
  };

  return (
    <section className="flex justify-center my-10">
      {isLoading ? (
        <div className=" bg-black/10 z-[999] backdrop-blur-md w-full h-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <Card className="w-11/12 p-5">
          <CardHeader className="flex justify-center">
            <h2 className="font-bold text-xl">Edit Post</h2>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Title */}
              <Input
                label="Title"
                placeholder="Enter post title"
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
                defaultValue={postData?.title}
                {...register("title")}
              />

              {/* Content */}
              <label className="block text-sm font-medium text-default-700">
                Comment
              </label>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={content}
                onChange={setContent}
                className="mb-14"
                placeholder="Enter post comment"
              />

              {contentError && (
                <div className="text-sm text-red-500">{contentError}</div>
              )}

              {/* Category (using NextUI Select) */}

              <Select
                items={selectOptions}
                label="Category"
                placeholder="Select an category"
                className="max-w-xs"
                {...register("category")}
                isInvalid={!!errors.category}
                errorMessage={errors.category?.message}
                defaultSelectedKeys={[postData?.category]}
              >
                {(option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                )}
              </Select>

              {/* Premium Post Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPremium"
                  onChange={(e) => setIsPremiumChecked(e.target.checked)}
                  className="mr-2"
                  defaultChecked={postData?.isPremium > 0}
                />
                <label htmlFor="isPremium" className="text-sm">
                  Premium Post
                </label>
              </div>

              {/* Premium Value Input (Conditional) */}
              {isPremiumChecked && (
                <Input
                  label="Premium Value"
                  placeholder="Enter premium value"
                  type="number"
                  {...register("isPremium")}
                  isInvalid={!!errors.isPremium}
                  errorMessage={errors.isPremium?.message}
                  defaultValue={postData?.isPremium.toString()}
                />
              )}

              {/* Images */}
              <label className="block text-sm font-medium text-default-500">
                Image
              </label>
              <div className="w-40 flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  <FaRegFileImage className="text-xl mr-2" /> Upload image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>

              {imagePreviews.length > 0 && (
                <div className="my-3">
                  <small>These images will be uploaded</small>
                  <div className="flex gap-5  flex-wrap">
                    {imagePreviews.map((imageDataUrl) => (
                      <Image
                        isBlurred
                        isZoomed
                        key={imageDataUrl}
                        alt="item"
                        className="size-48 object-cover object-center rounded-md"
                        src={imageDataUrl}
                        width={100}
                        height={100}
                      />
                    ))}
                  </div>
                </div>
              )}

              {postData.images?.length > 0 && (
                <div className=" my-3">
                  <small>Previously uploaded images will be deleted</small>
                  <div className="flex gap-5 flex-wrap">
                    {postData.images.map((image, index) => (
                      <Image
                        isBlurred
                        isZoomed
                        key={index}
                        src={image}
                        alt={`post-image-${index}`}
                        width={100}
                        height={100}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                size="lg"
                type="submit"
                variant="shadow"
                className="mt-4 w-9/12 mx-auto bg-default-900 font-semibold text-default"
                isLoading={imageLoading || isPending}
                isDisabled={content?.length === 0}
              >
                <FaFileInvoice className="text-xl mr-2" /> Edit Post
              </Button>
            </form>
          </CardBody>
        </Card>
      )}
    </section>
  );
}