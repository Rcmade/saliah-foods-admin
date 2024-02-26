"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { userFormSchema } from "@/lib/schemas/user-schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle } from "lucide-react";
import { sendOptAction } from "@/lib/actions/user-actions";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"email" | "phone">("phone");
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      agree: false,
    },
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      setIsLoading(true);
      setError("");
      //   // user address for notifications
      const toUser = type === "email" ? values?.email : values?.phone;
      const data = await sendOptAction(
        toUser || "",
        values?.name as string,
        type
      );
      if (data?.hash) {
        router.push(
          `/verify-otp?toUser=${toUser}&name=${values.name}&message=${data?.message}&hash=${data?.hash}.${data?.expires}&type=${type}`
        );
      } else if (data?.error) {
        setError(data?.error);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message || "Something went wrong");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const changeForm = () => {
    form.reset();
    setTimeout(() => {
      setType((pre) => (pre === "email" ? "phone" : "email"));
    }, 500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black-800 ">Full Name </FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {type === "email" ? (
          <FormField
            control={form.control}
            name="email"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black-800 ">Email </FormLabel>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="phone"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black-800 ">Phone </FormLabel>
                <FormControl>
                  <Input placeholder="Your Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="agree"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="flex items-center justify-center gap-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm m-0 text-light-500">
                I agree with Privacy Policy and Terms and Conditions
              </FormLabel>
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
        <Button disabled={isLoading} type="submit" className="w-full">
          SIGN UP
        </Button>
      </form>

      <div className="mt-2">
        <span className="text-light-500">
          Instead of use
          <span
            onClick={() => changeForm()}
            className="text-primary-500 uppercase font-semibold ml-2 cursor-pointer"
          >
            {type === "email" ? "phone" : "email"}?
          </span>{" "}
        </span>
      </div>
    </Form>
  );
}
