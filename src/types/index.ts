import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { SortOrder, Types } from "mongoose";

export interface WithId {
  readonly _id?: Types.ObjectId;
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

export interface User extends WithId, WithCreDate {
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

export interface ShoppingList extends WithId, WithCreDate {
  title: string;
  items: ShoppingItem[];
  user: Types.ObjectId;
  columns: Types.Map<string>;
  status: "active" | "inactive" | "archived";
}

export interface ShoppingItem extends WithId, WithCreDate {
  done: boolean;
  fields: ShoppingList["columns"];
}
