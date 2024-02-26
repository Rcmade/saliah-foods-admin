"use client";
import Image from "next/image";
import Button from "../../../components/button/Button";
import { useRouter } from "next/navigation";

const ConfirmationMail = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid grid-cols-[60%_40%] bg-[url('/net.png')] bg-contain">
        <div className="w-[375px] m-auto grid gap-4">
          <Image
            src={"/back.png"}
            alt="back"
            width={32}
            height={32}
            className="mb-4 cursor-pointer"
            onClick={() => router.back()}
          />
          <h2 className="text-4xl text-primary-500">Check your Email</h2>
          <p className="text-light-500">
            We sent a verification link to user@saliahdates.com
          </p>
          <div>
            <Button
              text="Enter Code Menually"
              className="w-full justify-center rounded-md"
              onClick={() => router.push("/verify-otp")}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap">Back to</span>
            <Button
              text="Log In"
              className="px-0 !bg-transparent text-primary-500 !py-0"
              onClick={() => router.push("/login")}
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
export default ConfirmationMail;
