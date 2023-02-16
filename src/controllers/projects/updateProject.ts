import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { Project } from "../../types";

const updateProject = async (
  { params, body, auth }: Request,
  res: Response
): Promise<Response> => {
  const { projectId } = params;
  const { name } = body;

  // TODO move to middleware?
  const projectOwner = await sql<Project[]>`
    select owner_id from projects where id=${projectId} and deleted=false
  `;

  assert(
    projectOwner[0].owner_id === auth.userId,
    "Users can only update their own projects."
  );

  const project = await sql<Project[]>`
    update projects set name=${name} where id=${projectId} and deleted=false
    returning *
  `;

  return res.json({
    data: project,
  });
};

export default updateProject;
