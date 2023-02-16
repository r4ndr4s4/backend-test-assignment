import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { Project } from "../../types";

const deleteProject = async (
  { params, auth }: Request,
  res: Response
): Promise<Response> => {
  const { projectId } = params;

  // TODO move to middleware?
  const projectOwner = await sql<Project[]>`
    select owner_id from projects where id=${projectId} and deleted=false
  `;

  assert(
    projectOwner[0].owner_id === auth.userId,
    "Users can only delete their own projects."
  );

  const project = await sql<Project[]>`
    update projects set deleted=true where id=${projectId}
    returning *
  `;

  return res.json({
    data: project,
  });
};

export default deleteProject;
