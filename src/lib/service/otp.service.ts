import crypto from "crypto";
import hashService from "./hash.service";

class OTPService {
  async createOtp(): Promise<number> {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }
  async verifyOtp(hashedOtp: string, data: string): Promise<boolean> {
    let computedHash = await hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

const otpService = new OTPService();
export default otpService;
