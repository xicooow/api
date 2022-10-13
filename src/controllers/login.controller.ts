import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getErrorMessage } from "../helpers/util";
import { getJWTSecret } from "../constants";
import UserModel from "../models/user";
import { Login } from "../types";

class LoginController {
  async authenticate({ email, password }: Login) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return { error: "User not found" };
    }

    const { _id, name, identity } = user.toObject();

    if (!bcrypt.compareSync(password, identity)) {
      return { error: "Wrong password" };
    }

    try {
      const token = jwt.sign({ _id, name }, getJWTSecret(), {
        expiresIn: "1d",
      });

      return { token };
    } catch (error) {
      return {
        error: getErrorMessage(error),
      };
    }
  }
}

export default new LoginController();
