import { Express } from "express";

import { ENTRYPOINT } from "../constants";

import { login } from "./routes/login.route";
import {
  addUser,
  getUser,
  getUsers,
  getLoggedUser,
} from "./routes/user.route";
import {
  addShoppingList,
  addShoppingListColumn,
} from "./routes/shoppingList.route";

export default (app: Express) => {
  app.post(`${ENTRYPOINT}/login`, login);
  app.post(`${ENTRYPOINT}/user`, addUser);
  app.get(`${ENTRYPOINT}/users`, getUsers);
  app.get(`${ENTRYPOINT}/logged`, getLoggedUser);
  app.get(`${ENTRYPOINT}/user/:userId`, getUser);
  app.post(`${ENTRYPOINT}/shoppingList`, addShoppingList);
  app.post(
    `${ENTRYPOINT}/shoppingList/:shoppingListId/column`,
    addShoppingListColumn
  );
};
