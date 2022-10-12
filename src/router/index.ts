import { Express } from "express";

import { ENTRYPOINT } from "../constants";

import { login } from "./routes/login.route";
import { addUser } from "./routes/user.route";

export default (app: Express) => {
  app.post(`${ENTRYPOINT}/login`, login);
  app.post(`${ENTRYPOINT}/user`, addUser);
};
