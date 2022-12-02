import { Schema, model } from "mongoose";

import { ShoppingList } from "../types";

const shoppingListSchema = new Schema<ShoppingList>(
  {
    title: {
      type: String,
      maxlength: 25,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "archived"],
    },
    user: {
      ref: "user",
      required: true,
      type: Schema.Types.ObjectId,
    },
    cre_date: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
);

export default model("shoppingList", shoppingListSchema);
