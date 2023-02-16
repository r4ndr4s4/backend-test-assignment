import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { Project } from "../../types";

const deleteProject = async (
  { params, auth, project }: Request,
  res: Response
): Promise<Response> => {
  const { projectId } = params;

  assert(
    project.ownerId === auth.userId,
    "Users can only delete their own projects."
  );

  const deletedProject = await sql<Project[]>`
    update projects set deleted=true where id=${projectId}
    returning *
  `;

  return res.json({
    data: deletedProject,
  });
};

export default deleteProject;
