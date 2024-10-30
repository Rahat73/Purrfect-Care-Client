"use client";

import AppForm from "@/src/components/form/AppForm";
import AppInput from "@/src/components/form/AppInput";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { loginValidationSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaLock } from "react-icons/fa6";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const redirect = searchParams.get("redirect");

  const [showPass, setShowPass] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const { mutateAsync: handleUserLogin, isPending } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await handleUserLogin(data);

    if (!res.success) {
      setLoginSuccess(false);
      return;
    }

    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
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
    <div className="flex w-full h-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">Login with Purrfect Care</h3>
      <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
      <div className="w-10/12 md:w-[35%]">
        <AppForm
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
          defaultValues={{ email: "admin@mail.com", password: "123456" }}
        >
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

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
            isLoading={isPending}
          >
            Login
          </Button>
        </AppForm>
        <div className="text-center">
          Don&lsquo;t have account ?{" "}
          <Link href={"/register"} className="text-primary-500">
            Register
          </Link>
        </div>
        <div className="text-center my-1">
          <Link href={"/forgot-password"} className="text-danger-500">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
