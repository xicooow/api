import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SortOrder, Schema, Types } from "mongoose";

export type WithId<T> = T & {
  _id: Types.ObjectId;
};

export interface WithCreDate {
  cre_date: Date;
}

export interface WithPassword {
  password: string;
}

export interface Sort {
  [key: string]: SortOrder;
}

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export interface CustomRequest extends Request {
  authData: CustomJwtPayload;
}

export interface User extends WithCreDate {
  name: string;
  email: string;
  identity: string;
}

export interface AddUser
  extends WithPassword,
    Pick<User, "name" | "email"> {}

export interface Login
  extends WithPassword,
    Pick<User, "email"> {}

export interface ShoppingList extends WithCreDate {
  title: string;
  user: Schema.Types.ObjectId;
  status: "active" | "inactive" | "archived";
}
