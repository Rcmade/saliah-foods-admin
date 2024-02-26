"use client";
import Image from "next/image";
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
import { FormEvent, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import OtpInput from "react-otp-input";
import RemainingTime from "./RemainingTimeForm";
import { sendOptAction, verifyOtpAction } from "@/lib/actions/user-actions";
import OtpInputForm from "./OtpInputForm";

const ValidateOtpForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      setIsLoading(true);
      const data = await verifyOtpAction(
        Number(otp),
        searchParams.get("hash") || "",
        searchParams.get("toUser") || "",
        searchParams.get("name") || ""
      );
      if (data?.error) {
        setError(data?.error);
        return;
      } else if (data?.message) {
        toast.success(data?.message);
        router.replace("/verified");
      }
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  const resendSubmit = async (type = "email") => {
    try {
      setError("");
      setMessage("");
      setIsLoading(true);
      const toUser = searchParams.get("toUser") || "";
      const name = searchParams.get("name") || "";
      const data = await sendOptAction(toUser, name, type);
      if (data?.hash) {
        router.replace(
          `/verify-otp?toUser=${toUser}&name=${name}&message=${data?.message}&hash=${data?.hash}.${data?.expires}`
        );
        setMessage(`Otp has been successfully sent to your ${type}`);
      } else if (data?.error) {
        setError(data?.error);
      }
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <p className="whitespace-nowrap text-[0.85rem] sm:text-base text-light-500">
        We sent a verification code to {searchParams.get("toUser")}
      </p>

      <div className="flex gap-2 w-full justify-start">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* <div className="flex gap-x-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={
                " !w-16 !h-16 sm:!w-20 sm:!h-20 mx-[6px] text-2xl bg-white flex items-center justify-center rounded-md border border-primary-500 text-primary-500 font-semibold text-3xl lg:text-4xl"
              }
              renderInput={(props) => <input required {...props} />}
            />
          </div> */}
          <OtpInputForm otp={otp} setOtp={setOtp} />

          {(error || message) && (
            <Alert variant={error ? "destructive" : "default"}>
              {error && <AlertTriangle className="h-4 w-4" />}
              <AlertTitle>{error ? "Error!" : "Message"}</AlertTitle>
              <AlertDescription>{error || message}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full !py-6 text-white text-lg uppercase rounded-full"
          >
            Verify Email
          </Button>
          <p className="text-primary-500">
            Time Remaining{" "}
            <RemainingTime
              expires={
                Number(searchParams.get("hash")?.split(".")[1]) || Date.now()
              }
            />{" "}
          </p>

          <div className="flex gap-2 items-center !-mt-[0.25rem]">
            <p className="text-light-500 whitespace-nowrap">
              Didn’t receive the email?
            </p>
            <Button
              disabled={isLoading}
              onClick={() => resendSubmit(searchParams.get("type") as string)}
              type="button"
              className="!bg-transparent text-base text-primary-500 px-0 !py-0"
            >
              Click to resend
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ValidateOtpForm;
