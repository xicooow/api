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
  addShoppingItem,
  getShoppingLists,
  updateShoppingList,
  modifyShoppingListColumn,
  deleteShoppingListColumn,
} from "./routes/shoppingList.route";

export default (app: Express) => {
  /** login */
  app.post(`${ENTRYPOINT}/login`, login);
  /** user */
  app.post(`${ENTRYPOINT}/user`, addUser);
  app.get(`${ENTRYPOINT}/users`, getUsers);
  app.get(`${ENTRYPOINT}/logged`, getLoggedUser);
  app.get(`${ENTRYPOINT}/user/:userId`, getUser);
  /** shoppingList */
  app.get(`${ENTRYPOINT}/shoppingLists`, getShoppingLists);
  app.post(`${ENTRYPOINT}/shoppingList`, addShoppingList);
  app.patch(
    `${ENTRYPOINT}/shoppingList/:shoppingListId`,
    updateShoppingList
  );
  app.patch(
    `${ENTRYPOINT}/shoppingList/:shoppingListId/column`,
    modifyShoppingListColumn
  );
  app.delete(
    `${ENTRYPOINT}/shoppingList/:shoppingListId/column/:columnName`,
    deleteShoppingListColumn
  );
  /** shoppingItem */
  app.post(
    `${ENTRYPOINT}/shoppingList/:shoppingListId/item`,
    addShoppingItem
  );
};
