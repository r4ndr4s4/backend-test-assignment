import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { Project, UserToProject } from "../../types";

const addUserToProject = async (
  { params, auth }: Request,
  res: Response
): Promise<Response> => {
  const { projectId, userId } = params;

  // TODO move to middleware?
  const projectOwner = await sql<Project[]>`
    select owner_id from projects where id=${projectId} and deleted=false
  `;

  assert(
    projectOwner[0].owner_id === auth.userId,
    "Users can only add other users to their own projects."
  );

  assert(
    userId !== auth.userId,
    "Users can only add other users to their own projects."
  );

  const userToProject = await sql<UserToProject[]>`
    insert into users_to_projects (user_id, project_id) values (${userId}, ${projectId})
    returning *
  `;

  return res.json({
    data: userToProject,
  });
};

export default addUserToProject;
