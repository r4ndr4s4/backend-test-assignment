import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { User, UserToProject } from "../../types";

const getRelatedUsers = async (
  { params, auth, project }: Request,
  res: Response
): Promise<Response> => {
  const { projectId } = params;

  assert(
    project.ownerId === auth.userId,
    "Users can only see the linked users of their own projects."
  );

  const usersToProject = await sql<UserToProject[]>`
    select user_id from users_to_projects where project_id=${projectId}
  `;

  const userIdsToProject = usersToProject.map(
    (userToProject) => userToProject.user_id
  );

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
