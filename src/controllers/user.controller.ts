import bcrypt from "bcrypt";
import { FilterQuery } from "mongoose";

import UserModel from "../models/user";
import { AddUser, Sort, User } from "../types";

class UserController {
  async get(query: FilterQuery<User>, sort?: Sort) {
    return await UserModel.find(query).sort(sort);
  }

  async getById(userId: string) {
    return await UserModel.findById(userId);
  }

  async remove(userId: string) {
    await UserModel.findByIdAndDelete(userId);
  }

  async create(data: AddUser) {
    const userData: User = {
      name: data.name,
      email: data.email,
      cre_date: new Date(),
      identity: bcrypt.hashSync(data.password, 8),
    };

    const user = new UserModel(userData);
    return await user.save();
  }
}

export default new UserController();
