import { Request, Response } from "express";

import {
  buildErrorMessage,
  validBody,
} from "../../helpers/util";
import LoginController from "../../controllers/login.controller";

export const login = async (req: Request, res: Response) => {
  const { body } = req;

  if (!validBody(body)) {
    return res.status(400).json(buildErrorMessage());
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
    const { error, token } = await LoginController.authenticate(
      body
    );

    if (error) {
      return res.status(403).json(buildErrorMessage(error));
    }

    if (!token) {
      return res.status(401).json(buildErrorMessage());
    }

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(buildErrorMessage());
  }
};
