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
    shoppingList.items.forEach(shoppingItem => {
      const fieldValue = shoppingItem.fields.get(name);
      shoppingItem.fields.set(name, fieldValue || "");
    });

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
    const defaultFields = new Map<string, string>();

    defaultColumns.set("name", "Nome");
    for (const column of defaultColumns.keys()) {
      defaultFields.set(column, "");
    }

    const shoppingListData: ShoppingList = {
      user,
      title,
      status: "active",
      cre_date: new Date(),
      columns: defaultColumns,
      items: [
        {
          done: false,
          cre_date: new Date(),
          fields: defaultFields,
        },
      ],
    };

    const shoppingList = new ShoppingListModel(shoppingListData);
    return await shoppingList.save();
  }
}

export default new ShoppingListController();
