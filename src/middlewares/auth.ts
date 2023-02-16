import { Request, Response, NextFunction } from "express";

import sql from "../database";
import { User } from "../types";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const apiKey = req.get("X-Auth-User-Email");

  if (!apiKey) {
    return res.status(401).json({
      status: "error",
      message: "X-Auth-User-Email header not found.",
    });
  }

  const user = await sql<User[]>`
    select * from users where email=${apiKey} and deleted=false
  `;

  if (!user.length) {
    return res.status(401).json({
      status: "error",
      message: "Invalid X-Auth-User-Email header provided.",
    });
  }

  req.auth = {
    userId: user[0].id,
    userEmail: user[0].email,
  };

  return next();
};

export default auth;
