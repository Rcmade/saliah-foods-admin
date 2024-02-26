import React from "react";
import OTPInput from "react-otp-input";
interface OtpInputFormProps {
  otp: string;
  setOtp: (otp: string) => void;
}
const OtpInputForm = ({ otp, setOtp }: OtpInputFormProps) => {
  return (
    <div className="flex gap-x-4">
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        inputStyle={
          " !w-16 !h-16 sm:!w-20 sm:!h-20 mx-[6px] text-2xl bg-white flex items-center justify-center rounded-md border border-primary-500 text-primary-500 font-semibold text-3xl lg:text-4xl"
        }
        renderInput={(props) => <input required {...props} />}
      />
    </div>
  );
};

export default OtpInputForm;
