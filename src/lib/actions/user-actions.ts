"use server";
import { cookies } from "next/headers";
import otpService from "../service/otp.service";
import hashService from "../service/hash.service";
import sendService from "../service/send.service";
import { otpNewUserTemplate } from "../templates/email.template";
import { UserModel, UserSchema } from "../models/user.model";
import { connectToDB } from "@/config/mongoose.config";
import { otpLoginTemplate } from "../templates/login.opt.template";
import userService from "../service/user.service";

// export const loginAction = async (token: string) => {
//   cookies().set("authorization", token, { secure: true });
// };

export const logoutAction = async () => {
  cookies().delete("authorization");
};

// for signup
export const sendOptAction = async (
  emailOrPhone: string,
  name: string,
  type: string = "email"
) => {
  if (!emailOrPhone || !name)
    return {
      error: `Please enter a valid ${type} and name`,
    };

  await connectToDB();

  const user = await UserModel.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  });

  if (user) {
    return { error: "User already exists!" };
  }

  const otp = await otpService.createOtp();
  //Time to leave
  const ttl = 1000 * 60 * 10; // 10 minutes
  const expires = Date.now() + ttl;
  const data = `${emailOrPhone}.${name}.${otp}.${expires}`;
  const hash = await hashService.hashOtp(data);

  if (type === "phone") {
    const d = await sendService.sendSMS(emailOrPhone, `Your OTP is ${otp}`)
    if (d) {
      return {
        message: "Message sent successfully",
      };
    } else {
      return { error: "Error sending" }
    }

  } else {
    await sendService.sendEmailService(
      "Email verification",
      emailOrPhone,
      otpNewUserTemplate(otp)
    );
    return { hash, message: "OTP sent successfully", expires };
  }
};

// for sighup
export const verifyOtpAction = async (
  otp: number,
  hash: string,
  emailOrPhone: string,
  name: string
) => {
  if (!otp || !hash || !emailOrPhone) {
    return { message: "All fields are required!" };
  }
  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    return { error: "OTP expired!" };
  }
  // const data = `${email}.${+otp}.${+expires}`;
  const data = `${emailOrPhone}.${name}.${+otp}.${expires}`;
  const isValid = await otpService.verifyOtp(hashedOtp, data);

  if (!isValid) {
    return { error: "Invalid OTP" };
  } else {
    await connectToDB();
    const formateData = {
      email: isNaN(parseFloat(emailOrPhone)) ? emailOrPhone : undefined,
      phone: isNaN(parseInt(emailOrPhone)) ? undefined : parseInt(emailOrPhone),
      name: name,
    };

    const user: UserSchema = await UserModel.create(formateData);
    if (user) {
      return { message: "You Are Verified", user };
    } else {
      return { error: "Failed to create user!" };
    }
  }
};

// for login
export const loginOptAction = async (
  emailOrPhone: string,
  type: string = "email"
) => {
  if (!emailOrPhone)
    return {
      error: `Please enter a valid ${type}`,
    };

  await connectToDB();

  const user = await UserModel.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  });

  if (!user) {
    return { error: "User does not exists!" };
  }

  const otp = await otpService.createOtp();
  //Time to leave
  const ttl = 1000 * 60 * 10; // 10 minutes
  const expires = Date.now() + ttl;
  const data = `${emailOrPhone}.${otp}.${expires}`;
  const hash = await hashService.hashOtp(data);
  if (type === "phone") {
    await sendService.sendSMS(emailOrPhone, `Your OTP is ${otp}`);
    // return {
    //   error: "Phone verification is not supported yet!",
    // };

    return {
      message: "Message sent successfully",
    };
  } else {
    await sendService.sendEmailService(
      "Email verification",
      emailOrPhone,
      otpLoginTemplate(otp)
    );
    return { hash, message: "OTP sent successfully", expires };
  }
};

// login the user and set the cookies
export const loginAction = async (
  otp: number,
  hash: string,
  emailOrPhone: string
) => {
  if (!otp || !hash || !emailOrPhone) {
    return { message: "All fields are required!" };
  }
  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    return { error: "OTP expired!" };
  }
  const data = `${emailOrPhone}.${+otp}.${expires}`;
  const isValid = await otpService.verifyOtp(hashedOtp, data);
  if (!isValid) {
    return { error: "Invalid OTP" };
  } else {
    await connectToDB();
    const user = await UserModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (user) {
      const token = await userService.signJWT(user);
      cookies().set("authorization", token, { secure: true });
      return { message: "You Are Verified", user, token };
    } else {
      return { error: "Failed to login!" };
    }
  }
};

// login or create account

export const loginOrCreateAccount = async (phone: string, name = "") => {
  if (!phone) {
    return { error: "Phone number is required!" };
  }
};
