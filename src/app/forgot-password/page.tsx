"use client";
import Image from "next/image";
import Button from "../../../components/button/Button";
import { useRouter } from "next/navigation";
import InputField from "../../../components/input-field/input-field";

const ForgotPassword = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-[60%_40%] bg-[url('/net.png')] bg-contain">
        <div className="w-[375px] m-auto grid gap-4">
          <h2 className="text-4xl text-primary-500">Password Recovery</h2>
          <p className="text-light-500">
            No worries, we&apos;ll send a recovery link to your email.
          </p>
          <div className="grid gap-2">
            <InputField label="Username Or Email" placeholder="Your Email" />

            <div className="flex justify-end">
              <div
                className="mt-2 text-sm text-primary-500 cursor-pointer"
                // onClick={() => router.push("/forgot-password")}
              >
                Remember password?
              </div>
            </div>
            <Button
              text="Continue"
              className="w-full justify-center rounded-md"
              onClick={()=>router.push("/confirmation-mail-sent")}
            />
          </div>
        </div>
        <div>
          <Image
            src={"/login.png"}
            alt="dates"
            width={750}
            height={700}
            className="w-fit"
          />
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
