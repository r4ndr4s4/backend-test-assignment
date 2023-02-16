import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { Project, User, UserToProject } from "../../types";

const getRelatedUsers = async (
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
    "Users can only see the linked users of their own projects."
  );

  const usersToProject = await sql<UserToProject[]>`
    select user_id from users_to_projects where project_id=${projectId} and deleted=false
  `;

  console.log({ usersToProject });

  const userIdsToProject = usersToProject.map(
    (userToProject) => userToProject.user_id
  );

  console.log({ userIdsToProject });

  // TODO doesn't work
  const users = await sql<User[]>`
    select * from users where id::text in (${userIdsToProject.join(
      ", "
    )}) and deleted=false
  `;

  return res.json({
    data: users,
  });
};

export default getRelatedUsers;
