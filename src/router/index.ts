import { Express } from "express";

import { ENTRYPOINT } from "../constants";

import { login } from "./routes/login.route";
import {
  addUser,
  getUser,
  getUsers,
  deleteUser,
} from "./routes/user.route";

export default (app: Express) => {
  app.post(`${ENTRYPOINT}/login`, login);
  app.post(`${ENTRYPOINT}/user`, addUser);
  app.get(`${ENTRYPOINT}/users`, getUsers);
  app.get(`${ENTRYPOINT}/user/:userId`, getUser);
  app.delete(`${ENTRYPOINT}/user/:userId`, deleteUser);
};
