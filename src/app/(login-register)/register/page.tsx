"use client";

import AppForm from "@/src/components/form/AppForm";
import AppInput from "@/src/components/form/AppInput";
import AppTextarea from "@/src/components/form/AppTextarea";
import { useUser } from "@/src/context/user.provider";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { registrationValidationSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaLock } from "react-icons/fa6";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const redirect = searchParams.get("redirect");

  const [showPass, setShowPass] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const { mutateAsync: handleUserRegistration, isPending } =
    useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await handleUserRegistration(data);

    if (!res.success) {
      setLoginSuccess(false);
      return;
    }

    router.push("/");
    setLoginSuccess(true);
    userLoading(true);
  };

  // useEffect(() => {
  //   if (!isPending && loginSuccess) {
  //     if (redirect) {
  //       router.push(redirect);
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }, [isPending, loginSuccess]);

  return (
    <div>
      <div className="flex w-full h-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Sign up with Purrfect Care</h3>
        <p className="mb-4">Let&lsquo;s Get You Signed Up !</p>
        <div className="w-10/12 md:w-[35%]">
          <AppForm
            onSubmit={onSubmit}
            resolver={zodResolver(registrationValidationSchema)}
          >
            <div className="py-3">
              <AppInput name="name" label="Name" type="text" />
            </div>
            <div className="py-3">
              <AppInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <AppInput
                name="password"
                label="Password"
                type={`${showPass ? "text" : "password"}`}
                clearable={false}
                endContent={
                  <FaLock
                    className="text-2xl text-default-400 cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  />
                }
              />
            </div>
            <div className="py-3">
              <AppTextarea name="bio" label="Bio" type="text" />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
              isLoading={isPending}
            >
              Sign UP
            </Button>
          </AppForm>
          <div className="text-center">
            Already have an account ?{" "}
            <Link href={"/login"} className="text-primary-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
