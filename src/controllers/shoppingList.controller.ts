import { ShoppingList } from "../types";
import ShoppingListModel from "../models/shoppingList";

class ShoppingListController {
  async create({
    title,
    user,
  }: Pick<ShoppingList, "title" | "user">) {
    const shoppingListData: ShoppingList = {
      user,
      title,
      status: "active",
      cre_date: new Date(),
    };

    const shoppingList = new ShoppingListModel(shoppingListData);
    return await shoppingList.save();
  }
}

export default new ShoppingListController();
