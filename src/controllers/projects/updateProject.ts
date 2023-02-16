import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { Project } from "../../types";

const updateProject = async (
  { params, body, auth, project }: Request,
  res: Response
): Promise<Response> => {
  const { projectId } = params;
  const { name } = body;

  assert(
    project.ownerId === auth.userId,
    "Users can only update their own projects."
  );

  const updatedProject = await sql<Project[]>`
    update projects set name=${name} where id=${projectId} and deleted=false
    returning *
  `;

  return res.json({
    data: updatedProject,
  });
};

export default updateProject;
