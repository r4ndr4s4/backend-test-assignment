import { Request, Response } from "express";

import sql from "../../database";
import { Project } from "../../types";

const deleteProject = async (
  { params }: Request,
  res: Response
): Promise<Response> => {
  const { projectId } = params;

  console.log({ projectId });

  const project = await sql<Project[]>`
    update projects set deleted=true where id=${projectId}
    returning *
  `;

  return res.json({
    data: project,
  });
};

export default deleteProject;
