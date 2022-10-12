import { Express } from "express";

import { ENTRYPOINT } from "../constants";

import {
  // deleteUser,
  // getUser,
  // getUsers,
  addUser,
} from "./routes/user.route";

export default (app: Express) => {
  // app.delete(`${ENTRYPOINT}/user/:userId`, deleteUser);
  // app.get(`${ENTRYPOINT}/user/:userId`, getUser);
  // app.get(`${ENTRYPOINT}/users`, getUsers);
  app.post(`${ENTRYPOINT}/user`, addUser);
};
