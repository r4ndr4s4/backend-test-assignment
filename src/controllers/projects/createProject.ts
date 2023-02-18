import { Request, Response } from "express";

import sql from "../../database";
import { Project } from "../../types";
import { projectSchema } from "../../schemas";

const createProject = async (
  { body, auth }: Request,
  res: Response
): Promise<Response> => {
  const validatedBody = await projectSchema.validate(body);
  const { name } = validatedBody;

  const project = await sql<Project[]>`
    insert into projects (name, owner_id) values (${name}, ${auth.userId})
    returning *
  `;

  return res.json({
    data: project,
  });
};

export default createProject;
