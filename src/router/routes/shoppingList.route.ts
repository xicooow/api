import { Types } from "mongoose";
import { Request, Response } from "express";

import ShoppingListController from "../../controllers/shoppingList.controller";

import {
  buildErrorMessage,
  validBody,
} from "../../helpers/util";
import { CustomRequest } from "../../types";

export const addShoppingList = async (
  req: Request,
  res: Response
) => {
  const { authData, body } = req as CustomRequest;

  if (!validBody(body)) {
    return res.status(400).json(buildErrorMessage());
  }

  if (!body.title) {
    return res
      .status(400)
      .json(buildErrorMessage("Missing title"));
  }

  try {
    const result = await ShoppingListController.create({
      ...body,
      user: new Types.ObjectId(authData.userId),
    });
    return res.status(201).json(result.toJSON());
  } catch (error) {
    console.error(error);
    return res.status(400).json(buildErrorMessage());
  }
};
