import bcrypt from "bcrypt";

import UserModel from "../models/user";
import { Login } from "../types";

class LoginController {
  async authenticate({ email, password }: Login) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return { error: "User not found" };
    }

    const { _id, identity } = user.toObject();

    if (!bcrypt.compareSync(password, identity)) {
      return { error: "Wrong password" };
    }

    return { _id };
  }
}

export default new LoginController();
