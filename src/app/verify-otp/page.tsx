"use client";
import Image from "next/image";
import Button from "../../../components/button/Button";
import { useRouter } from "next/navigation";
import ValidateOtpForm from "@/components/forms/validate-otp-form";
import Link from "next/link";
// import { Mulish } from "next/font/google";
// const mulish = Mulish({ subsets: ["latin"] });

const VerifyOtp = () => {
  const router = useRouter();
  return (
    <>
      <div
        className={
          " bg-[url('/net.png')] gap-2  w-full px-4 lg:px-0 lg:pl-52 xl:pl-64 h-[calc(100vh-80px)] flex justify-center lg:justify-between items-center"
        }
      >
        <div className="flex justify-center -mt-16">
          <div className="flex flex-col  gap-y-16">
            <div className="md:block hidden">
              <Image
                src={"/back.png"}
                alt="back"
                width={32}
                height={32}
                className="mb-4  md:bottom-0 cursor-pointer"
                onClick={() => router.back()}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl text-primary-500 ">Check your Email</h2>
              <ValidateOtpForm />

              <p>
                <span>Back to </span>
                <Link
                  className="text-primary-500 text-base font-bold"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className=" hidden self-start lg:block overflow-y-hidden max-h-full">
          <Image
            src={"/login.png"}
            alt="dates"
            width={750}
            height={700}
            className="w-fit "
          />
        </div>
      </div>
      {/* <div className="grid grid-cols-[60%_40%] justify-center bg-[url('/net.png')] bg-contain">
          <div className="w-[410px] m-auto grid gap-4">
            <Image
              src={"/back.png"}
              alt="back"
              width={32}
              height={32}
              className="mb-4 hidden md:bottom-0 cursor-pointer"
              onClick={() => router.back()}
            />
            <h2 className="text-4xl text-primary-500">Check your Email</h2>
            <ValidateOtpForm />

            <div className="flex gap-2">
              <p className="text-light-500 whitespace-nowrap">Back to</p>
              <Button
                text="Log In"
                className="!bg-transparent text-primary-500 px-0 !py-0"
                parentClass="mt-0"
                onClick={() => router.push("/login")}
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src={"/login.png"}
              alt="dates"
              width={750}
              height={700}
              className="w-fit"
            />
          </div>
        </div> */}
    </>
  );
};
export default VerifyOtp;
