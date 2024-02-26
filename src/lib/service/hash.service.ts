import crypto from "crypto";

class HashService {
  async hashOtp(data: string): Promise<string> {
    const hash = crypto
      .createHmac("sha256", process.env.HASH_SECRET as string)
      .update(data)
      .digest("hex");
    return hash;
  }
}

const hashService = new HashService();
export default hashService;
