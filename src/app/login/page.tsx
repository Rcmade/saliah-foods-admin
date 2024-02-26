import Image from "next/image";
import Button from "../../../components/button/Button";
import Checkbox from "../../../components/checkbox/checkbox";
import InputField from "../../../components/input-field/input-field";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginOtpForm from "@/components/forms/login-otp-form";

const Login = () => {
  return (
    <>
      <div className=" flex flex-col-reverse justify-center md:grid grid-cols-[60%_40%] bg-[url('/net.png')] bg-contain py-10">
        <div className="md:w-[375px] md:m-auto grid gap-4 p-4 md:p-0">
          <h2 className="text-4xl text-primary-500">Login</h2>
          <p className="text-light-500">
            Welcome back! Please enter your details.
          </p>
          <div className="grid gap-4">
            {/* <LoginForm /> */}
            <LoginOtpForm />
            {/* <InputField label="Email" placeholder="Your Email" />
            <InputField
              type="password"
              label="Password"
              placeholder="Your password"
            />
            <div className="flex justify-between">
              <Checkbox
                id="remember"
                content="Remember Me"
                contentColor="text-light-500"
              />
              <Link
                href="/forgot-password"
                className="mt-2 text-sm text-primary-500 cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              text="Log In"
              className="w-full justify-center rounded-md"
            /> */}
            <div>
              <span className="text-light-500">New to Saliah Dates?</span>
              <Link
                href="/sign-up"
                className="text-primary-500 font-semibold ml-2 cursor-pointer"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={"/login.png"}
            alt="dates"
            width={850}
            height={800}
            className="md:w-fit mx-auto md:mx-0 w-[80%]"
          />
        </div>
      </div>
    </>
  );
};
export default Login;
