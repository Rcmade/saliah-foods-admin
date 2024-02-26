import Image from "next/image"
import { Suspense } from "react";
import CreatePasswordForm from "@/components/forms/create-password-form";
import Loading from "@/components/Loading";
import ValidateOtpForm from "@/components/forms/validate-otp-form";

const CreatePassword = () => {
  return (
    <>
      <div>
        <div className="grid grid-cols-[60%_40%] bg-[url('/net.png')] bg-contain">
          <div className="w-[375px] m-auto grid gap-4">
            <h2 className="text-4xl text-primary-500">Sign Up</h2>
            <p className="text-light-500">Welcome to Saliah Dates</p>

            <Suspense fallback={<Loading />}>
              {/* <CreatePasswordForm /> */}
              <ValidateOtpForm />
            </Suspense>
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
      </div>
    </>
  );
};
export default CreatePassword;
