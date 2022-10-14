import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SortOrder, Types } from "mongoose";

export type WithId<T> = T & OId;

export interface OId {
  _id: Types.ObjectId;
}

export interface Sort {
  [key: string]: SortOrder;
}

export interface CustomJwtPayload
  extends OId,
    Pick<User, "name">,
    JwtPayload {}

export interface CustomRequest extends Request {
  token: CustomJwtPayload;
}

export interface User {
  name: string;
  email: string;
  identity: string;
  cre_date: Date;
}

export interface AddUser extends Pick<User, "name" | "email"> {
  password: string;
}

export interface Login extends Pick<User, "email"> {
  password: string;
}
