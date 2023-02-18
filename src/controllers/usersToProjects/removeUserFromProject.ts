import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { UserToProject } from "../../types";

const removeUserFromProject = async (
  { params, auth, project }: Request,
  res: Response
): Promise<Response> => {
  const { projectId, userId } = params;

  assert(
    project.ownerId === auth.userId || userId === auth.userId,
    "Users can only delete others from a project if they are the owner."
  );

  const userToProject = await sql<UserToProject[]>`
    delete from users_to_projects where project_id=${projectId} and user_id=${userId}
    returning *
  `;

  return res.json({
    data: userToProject,
  });
};

export default removeUserFromProject;
