import Image from "next/image";
import SignUpForm from "@/components/forms/signup-form";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <div>
        <div className="grid grid-cols-[60%_40%] bg-[url('/net.png')] bg-contain py-10">
          <div className="w-[375px] m-auto grid gap-4">
            <h2 className="text-4xl text-primary-500">Sign Up</h2>
            <p className="text-light-500">Create an Account</p>
            <div className="grid">
              <SignUpForm />
              <div>
                <span className="text-light-500">Already have an Account?</span>
                <span
                  className="text-primary-500 font-semibold ml-2 cursor-pointer"
                >
                  <Link href="/login"> Log In</Link>
                </span>
              </div>
            </div>
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
      </div>
    </>
  );
};
export default SignUp;
