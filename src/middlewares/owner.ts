import { Request, Response, NextFunction } from "express";

import sql from "../database";
import { Project } from "../types";

export const owner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(403).json({
      status: "error",
      message: "Project ID not found.",
    });
  }

  const projectOwner = await sql<Project[]>`
    select owner_id from projects where id=${projectId} and deleted=false
  `;

  if (!projectOwner.length) {
    return res.status(403).json({
      status: "error",
      message: "Project owner not found.",
    });
  }

  req.project = {
    ownerId: projectOwner[0].owner_id,
  };

  return next();
};

export default owner;
