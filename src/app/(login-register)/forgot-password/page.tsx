"use client";

import AppForm from "@/src/components/form/AppForm";
import AppInput from "@/src/components/form/AppInput";
import envConfig from "@/src/config/env-config";
import { useForgotPassword } from "@/src/hooks/auth.hook";
import {
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
} from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [showPass, setShowPass] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const { mutateAsync: handleForgotPassword, isPending } = useForgotPassword();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await handleForgotPassword(data);

    if (!res.success) {
      setForgotSuccess(false);
      return;
    }

    setForgotSuccess(true);
  };

  const handleNewPasswordSubmit: SubmitHandler<FieldValues> = async (data) => {
    setResetLoading(true);
    await axios
      .post(
        `${envConfig.baseApi}/auth/change-password`,
        { ...data },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setResetSuccess(true);
          toast.success(res.data.message);
        } else {
          setResetSuccess(false);
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setResetSuccess(false);
        toast.error(err.message);
      });

    setResetLoading(false);
  };

  useEffect(() => {
    if (resetSuccess) {
      router.push("/login");
    }
  }, [resetSuccess]);

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      {email && token ? (
        <>
          <h3 className="my-2 text-2xl font-bold">Purrfect Care</h3>
          <p className="mb-4">Enter your new password</p>
          <div className="w-10/12 md:w-[35%]">
            <AppForm
              onSubmit={handleNewPasswordSubmit}
              resolver={zodResolver(changePasswordValidationSchema)}
            >
              <div className="py-3">
                <AppInput
                  name="newPassword"
                  label="New Password"
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

              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
                isLoading={resetLoading}
              >
                Submit Password
              </Button>
            </AppForm>
            <div className="text-center text-primary-500 my-2">
              <Link href="/login">Back to Login ?</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="my-2 text-2xl font-bold">Purrfect Care</h3>
          <p className="mb-4">Enter your email to reset password</p>
          <div className="w-10/12 md:w-[35%]">
            <AppForm
              onSubmit={onSubmit}
              resolver={zodResolver(forgotPasswordValidationSchema)}
            >
              <div className="py-3">
                <AppInput name="email" label="Email" type="email" />
              </div>

              <Button
                className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                size="lg"
                type="submit"
                isLoading={isPending}
              >
                Reset Password
              </Button>
            </AppForm>
            <div className="text-center text-primary-500 my-2">
              <Link href="/login">Back to Login ?</Link>
            </div>
            {forgotSuccess && (
              <p className="text-center font-bold text-default">
                Reset Password Link Sent to your email. Check spam box if not
                found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
