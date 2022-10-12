import { Request, Response } from "express";

import UserController from "../../controllers/user.controller";

import { buildErrorMessage } from "../../helpers/util";

// export const deleteUser = (req: Request, res: Response) => {};
// export const getUser = (req: Request, res: Response) => {};
// export const getUsers = (req: Request, res: Response) => {};

export const addUser = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body || typeof body !== "object") {
    return res
      .status(400)
      .json(buildErrorMessage("Missing/invalid body"));
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
