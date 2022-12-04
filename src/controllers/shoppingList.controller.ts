import { Types } from "mongoose";

import { ShoppingList } from "../types";
import { getErrorMessage } from "../helpers/util";
import ShoppingListModel from "../models/shoppingList";

class ShoppingListController {
  async addColumn(
    shoppingListId: Types.ObjectId,
    name: string,
    label: string
  ) {
    let shoppingList;

    try {
      shoppingList = await ShoppingListModel.findById(
        shoppingListId
      );
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }

    if (!shoppingList) {
      throw new Error("Invalid shopping list provided");
    }

    shoppingList.columns.set(name, label);

    try {
      const savedShoppingList = await shoppingList.save();
      return savedShoppingList;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async create({
    title,
    user,
  }: Pick<ShoppingList, "title" | "user">) {
    const defaultColumns = new Map<string, string>();
    defaultColumns.set("name", "Nome");

    const shoppingListData: ShoppingList = {
      user,
      title,
      status: "active",
      cre_date: new Date(),
      columns: defaultColumns,
    };

    const shoppingList = new ShoppingListModel(shoppingListData);
    return await shoppingList.save();
  }
}

export default new ShoppingListController();
