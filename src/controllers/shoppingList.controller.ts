import { Types, FilterQuery } from "mongoose";

import { ShoppingList, Sort } from "../types";
import { getErrorMessage } from "../helpers/util";
import ShoppingListModel from "../models/shoppingList";

class ShoppingListController {
  async get(query: FilterQuery<ShoppingList>, sort?: Sort) {
    return await ShoppingListModel.find(query, {
      _id: true,
      title: true,
    }).sort(sort);
  }

  async getById(shoppingListId: Types.ObjectId) {
    const shoppingList = await ShoppingListModel.findById(
      shoppingListId
    );

    if (!shoppingList) {
      throw new Error("Invalid shopping list provided");
    }

    return shoppingList;
  }

  async deleteColumn(
    shoppingListId: Types.ObjectId,
    columnName: string
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

    // Delete provided column from list
    shoppingList.columns.delete(columnName);
    // Delete provided column in fields
    shoppingList.items.forEach(shoppingItem => {
      shoppingItem.fields.delete(columnName);
    });

    try {
      const savedShoppingList = await shoppingList.save();
      return savedShoppingList;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async modifyColumn(
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

    // Add or modify provided list column
    shoppingList.columns.set(name, label);
    // Add or modify provided column in fields
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
    const shoppingListData: ShoppingList = {
      user,
      title,
      items: [],
      status: "active",
      cre_date: new Date(),
      columns: new Types.Map([["name", "Nome"]]),
    };

    const shoppingList = new ShoppingListModel(shoppingListData);

    try {
      const savedShoppingList = await shoppingList.save();
      return savedShoppingList;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async update(
    shoppingListId: Types.ObjectId,
    {
      title,
      status,
    }: Partial<Pick<ShoppingList, "title" | "status">>
  ) {
    try {
      const updatedShoppingList =
        await ShoppingListModel.findByIdAndUpdate(
          shoppingListId,
          {
            $set: {
              title,
              status,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedShoppingList) {
        throw new Error("Invalid shopping list provided");
      }

      return updatedShoppingList;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async createItem(
    shoppingListId: Types.ObjectId,
    values: [string, string][]
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

    for (const [name] of values) {
      if (!shoppingList.columns.has(name)) {
        throw new Error(`Item "${name}" does not exist`);
      }
    }

    shoppingList.items.push({
      done: false,
      cre_date: new Date(),
      fields: new Types.Map(values),
    });

    try {
      const savedShoppingList = await shoppingList.save();
      return savedShoppingList;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new ShoppingListController();
