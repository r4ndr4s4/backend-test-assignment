import { Request, Response } from "express";

import sql from "../../database";
import { Project } from "../../types";

const updateProject = async (
  { params, body }: Request,
  res: Response
): Promise<Response> => {
  const { projectId } = params;
  const { name } = body;

  console.log({ projectId, name });

  const project = await sql<Project[]>`
    update projects set name=${name} where id=${projectId} and deleted=false
    returning *
  `;

  return res.json({
    data: project,
  });
};

export default updateProject;
