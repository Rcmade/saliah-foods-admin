"use client";
import Image from "next/image";
// import Button from "../../../components/button/Button";
import Checkbox from "../../../components/checkbox/checkbox";
import InputField from "../../../components/input-field/input-field";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
const passwordSchema = z
  .object({
    password: z
      .string()
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .min(8, "Password must be at least 8 characters long")
      .refine((value) => value.trim() !== "", {
        message: "Password cannot be empty",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });
const CreatePasswordForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  // const searchParams = new URLSearchParams(window.location.search);
  // const paramValue = searchParams.get("paramName");

  const [criteria, setCriteria] = useState<{ label: string; valid: boolean }[]>(
    []
  );
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { watch } = form;

  const password = watch("password");

  const handlePasswordChange = (value: string) => {
    const capitalLetterRegex = /[A-Z]/;
    const lowercaseLetterRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    const criteria = [
      {
        label: "At least one capital letter",
        valid: capitalLetterRegex.test(value),
      },
      {
        label: "At least one lowercase letter",
        valid: lowercaseLetterRegex.test(value),
      },
      { label: "At least one number", valid: numberRegex.test(value) },
      {
        label: "Minimum character length is 8 characters",
        valid: value.length >= 8,
      },
    ];

    setCriteria(criteria);
  };
  useEffect(() => {
    handlePasswordChange(password);
  }, [password]);

  async function onSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`,
        {
          email: searchParams.get("email"),
          name: searchParams.get("name"),
          password: values.password,
        }
      );
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error: AxiosError | any) {
      console.log({ error });
      setError(error?.response?.data?.message || error.message);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-black-800 ">
                  Create Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    {...field}
                  />
                </FormControl>
                {/* <HidePassword ref={passwordRef} /> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black-800 ">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password "
                    type={"password"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            LOG IN
          </Button>
        </form>
      </Form>
      <div className="grid gap-4">
        <div>
          {criteria.map((val, i) => {
            return (
              <div
                key={i}
                className={`flex items-center gap-2 ${val.valid ? "opacity-40" : ""
                  }`}
              >
                <Image src={"/check.png"} alt="check" width={16} height={16} />{" "}
                <p>{val.label}</p>
              </div>
            );
          })}

          {/* <div className="flex items-center gap-2 opacity-40">
                  <Image
                    src={"/check.png"}
                    alt="check"
                    width={16}
                    height={16}
                  />{" "}
                  <p>At least one lowercase letter</p>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <Image
                    src={"/check.png"}
                    alt="check"
                    width={16}
                    height={16}
                  />{" "}
                  <p>At least one number</p>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <Image
                    src={"/check.png"}
                    alt="check"
                    width={16}
                    height={16}
                  />{" "}
                  <p>Minimum character length is 8 characters</p>
                </div> */}
        </div>
        {/* <Button
                text="Continue"
                className="w-full justify-center rounded-md"
                onClick={() => router.push("/login")}
              /> */}
        <div>
          <span className="text-light-500">Back to</span>
          <span
            className="text-primary-500 font-semibold ml-2 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Log In
          </span>
        </div>
      </div>
    </>
  );
};

export default CreatePasswordForm;
