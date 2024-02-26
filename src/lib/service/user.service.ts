import jwt from "jsonwebtoken";
import { UserSchema } from "@/lib/models/user.model";

class UserService {
  signJWT(payload: UserSchema): string {
  const plainPayload = payload.toObject();
    return jwt.sign(plainPayload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "30d",
    });
  }

  verifyJWT(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  }
}

const userService = new UserService();

export default userService;
