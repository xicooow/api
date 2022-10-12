import { Request, Response } from "express";

import {
  buildErrorMessage,
  validBody,
} from "../../helpers/util";
import UserController from "../../controllers/user.controller";

export const addUser = async (req: Request, res: Response) => {
  const { body } = req;

  if (!validBody(body)) {
    return res.status(400).json(buildErrorMessage());
  }

  if (!body.name) {
    return res
      .status(400)
      .json(buildErrorMessage("Missing name"));
  }

  if (!body.email) {
    return res
      .status(400)
      .json(buildErrorMessage("Missing email"));
  }

  if (!body.password) {
    return res
      .status(400)
      .json(buildErrorMessage("Missing password"));
  }

  try {
    const result = await UserController.create(body);
    return res.status(201).json(result.toJSON());
  } catch (error) {
    console.error(error);
    return res.status(400).json(buildErrorMessage());
  }
};
