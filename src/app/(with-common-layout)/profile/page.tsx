"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { use, useState } from "react";
import { IUser } from "@/src/types";
import { useUserInfo, useUserUpdate } from "@/src/hooks/user.hook";
import ProfileLoading from "@/src/components/ui/profile-loading";
import { FaLock, FaPen, FaUser } from "react-icons/fa6";
import AppForm from "@/src/components/form/AppForm";
import AppInput from "@/src/components/form/AppInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserValidationSchema } from "@/src/schemas/user.schema";
import AppTextarea from "@/src/components/form/AppTextarea";
import { toast } from "sonner";
import axios from "axios";
import { changePasswordValidationSchema } from "@/src/schemas/auth.schema";
import { usePasswordChange } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { logout } from "@/src/services/auth-service";
import { useUser } from "@/src/context/user.provider";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const router = useRouter();

  const { data: user, isLoading, isFetching } = useUserInfo();
  const { setIsLoading: userLoading } = useUser();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setProfilePicture("");
  };

  const { mutate: handleUpdateProfile, isPending } = useUserUpdate();

  const methods = useForm({
    resolver: zodResolver(updateUserValidationSchema),
  });
  const { handleSubmit } = methods;

  const handleUploadImages = async () => {
    setImageLoading(true);

    if (!profilePicture) {
      return;
    }

    let imageUrl = null;

    const formData = new FormData();
    formData.append("file", profilePicture);
    formData.append("upload_preset", "rent_a_bike");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${"damvwxpdq"}/image/upload`,
        formData
      );

      imageUrl = response.data.secure_url;
    } catch (error) {
      toast.error("Image upload failed");
    }

    setImageLoading(false);

    return imageUrl;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const profilePicture = await handleUploadImages();

    const updateData = {
      ...data,
      profilePicture,
    };

    handleUpdateProfile(updateData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        closeModal();
      },
    });
  };

  const { mutate: handlePasswordMutate, isPending: isPassLoading } =
    usePasswordChange();

  const handleChangePassword: SubmitHandler<FieldValues> = (data) => {
    handlePasswordMutate(data, {
      onSuccess: () => {
        setIsPassModalOpen(false);
        logout();
        userLoading(true);
        router.push("/");
      },
    });
  };

  return (
    <section className=" flex-col items-center justify-center my-5">
      <h2 className="font-bold text-3xl text-center mb-10">Profile</h2>

      {isLoading ? (
        <ProfileLoading />
      ) : (
        <Card className="w-11/12 mx-auto max-w-2xl">
          <CardHeader className="flex items-center justify-end"></CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4 items-center">
              <Avatar
                isBordered
                radius="full"
                src={user?.profilePicture}
                alt={`${user?.name}'s profile picture`}
                className="w-40 h-40"
              />

              <h3 className="text-2xl font-bold">{user?.name}</h3>
              <p>{user?.bio}</p>
            </div>

            <div className="flex justify-around mt-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold">Followers</h4>
                <p>{user?.followers.length}</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold">Following</h4>
                <p>{user?.following.length}</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold">Purchased Posts</h4>
                <p>{user?.premiumPostsPurchased.length}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col justify-center my-10 space-y-4">
            <div className="flex space-x-4">
              <Button variant="shadow" color="primary" onClick={openModal}>
                <FaPen /> Edit Profile
              </Button>
              <Button
                variant="shadow"
                color="danger"
                onClick={() => setIsPassModalOpen(true)}
              >
                <FaLock /> Change Password
              </Button>
            </div>
            <Button variant="shadow" color="default">
              <FaUser /> User dashboard
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        backdrop="blur"
        onClose={closeModal}
      >
        <ModalContent className="py-5">
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <div className="flex justify-center mb-4">
              {/* Hidden File Input */}
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      // Use the result to update the user profile picture URL
                      if (reader.result) {
                        // Setting image to state
                        setProfilePicture(reader.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Clickable Avatar */}
              <label htmlFor="profilePicture">
                <Avatar
                  isBordered
                  radius="full"
                  src={profilePicture || user?.profilePicture}
                  alt={`${user?.name}'s profile picture`}
                  className="w-32 h-32 cursor-pointer hover:opacity-80"
                />
              </label>
            </div>

            {/* Form to edit Name and Bio */}
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
              >
                <AppInput
                  label="Name"
                  defaultValue={user?.name}
                  name="name"
                  placeholder="Name"
                />
                <AppTextarea
                  label="Bio"
                  defaultValue={user?.bio}
                  name="bio"
                  placeholder="Tell something about yourself"
                />

                {/* Action Buttons */}
                <div className="flex justify-end items-center space-x-3 my-5">
                  <Button onClick={closeModal} variant="flat" color="danger">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    isLoading={imageLoading || isPending}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isPassModalOpen}
        onOpenChange={setIsPassModalOpen}
        backdrop="blur"
      >
        <ModalContent className="py-5">
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <AppForm
              onSubmit={handleChangePassword}
              resolver={zodResolver(changePasswordValidationSchema)}
            >
              <AppInput
                name="newPassword"
                label="New Password"
                clearable={false}
                type={`${showPass ? "text" : "password"}`}
                endContent={
                  <FaLock
                    className="text-2xl text-default-400 cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  />
                }
              />
              <p className="text-red-500 text-sm my-3 ml-2">
                You will be logged out after password change.
              </p>
              <div className="flex justify-end items-center space-x-3 mt-4">
                <Button>Cancel</Button>
                <Button type="submit" color="danger" isLoading={isPassLoading}>
                  Confirm
                </Button>
              </div>
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </section>
  );
}
