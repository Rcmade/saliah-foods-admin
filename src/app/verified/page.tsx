"use client";
import Image from "next/image";
import Button from "../../../components/button/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const VerifiedMail = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid  grid-cols-[60%_40%] h-[calc(100vh-80px)]  px-2 bg-[url('/net.png')] bg-contain">
        <div className="w-[375px] m-auto grid gap-4">
          <Image
            src={"/back.png"}
            alt="back"
            width={32}
            height={32}
            className="mb-4 cursor-pointer"
            onClick={() => router.back()}
          />
          <h2 className="text-4xl text-primary-500">Email Verified</h2>
          <p className="text-light-500 flex flex-wrap">
            Your Email has been verified. Click below to log In.
          </p>
          <div>
            <Button
              text="Continue"
              className="w-full justify-center rounded-md"
              onClick={() => router.push("/login")}
            />
          </div>
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
        <div className="md:block hidden">
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
export default VerifiedMail;
