import { SortOrder, ObjectId } from "mongoose";

export type WithId<T> = T & {
  _id: ObjectId;
};

export interface Sort {
  [key: string]: SortOrder;
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

export interface Login {
  email: string;
  password: string;
}
