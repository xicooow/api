import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { CustomRequest } from "../types";
import { buildErrorMessage } from "../helpers/util";
import { getJWTSecret, UNPROTECTED_ROUTES } from "../constants";

export default (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path, headers } = req;

  if (UNPROTECTED_ROUTES.includes(path)) {
    return next();
  }

  const token = headers.authorization?.replace(
    /^Bearer[\s]/,
    ""
  );

  if (!token) {
    res
      .status(401)
      .json(buildErrorMessage("Authentication needed"));
  } else {
    try {
      const decoded = jwt.verify(token, getJWTSecret());
      (req as CustomRequest).token = decoded;

      next();
    } catch (error) {
      console.error(error);
      res
        .status(403)
        .json(buildErrorMessage("Authentication failed"));
    }
  }
};
