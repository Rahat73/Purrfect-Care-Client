"use client";

import { useCreatePost } from "@/src/hooks/post.hook";
import { createPostSchema } from "@/src/schemas/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import axios from "axios";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
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

type CreatePostFormData = z.infer<typeof createPostSchema>;

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  });

  const { mutate: handleCreatePost, isPending } = useCreatePost({
    invalidateQueries: ["GET_ALL_POST"],
  });

  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [isPremiumChecked, setIsPremiumChecked] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [imageLoading, setImageLoading] = useState(false);

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

  const onSubmit = async (data: CreatePostFormData) => {
    const images = await handleUploadImages();

    if (isQuillEmpty()) {
      setContentError("Content cannot be empty");
      return;
    } else {
      setContentError("");
    }

    const postData = {
      ...data,
      isPremium: Number(data.isPremium),
      content,
      images,
    };

    handleCreatePost(postData);
  };

  return (
    <section className="flex justify-center my-10">
      <Card className="w-11/12 p-5">
        <CardHeader className="flex justify-center">
          <h2 className="font-bold text-xl">Create New Post</h2>
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
              {...register("title")}
            />

            {/* Content */}
            <label className="block text-sm font-medium text-default-500">
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
                onChange={(e) => handleImageChange(e)}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl) => (
                  <Image
                    isBlurred
                    isZoomed
                    key={imageDataUrl}
                    alt="item"
                    className="size-48 object-cover object-center rounded-md"
                    src={imageDataUrl}
                  />
                ))}
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
              <FaFileInvoice className="text-xl mr-2" /> Create Post
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
