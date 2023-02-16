import { Request, Response } from "express";

import sql from "../../database";
import { Project, UserToProject } from "../../types";

const getRelatedProjects = async (
  { auth }: Request,
  res: Response
): Promise<Response> => {
  // linked projects
  const projectsToUser = await sql<UserToProject[]>`
    select project_id from users_to_projects where user_id=${auth.userId} and deleted=false
  `;

  const projectIdsToUser = projectsToUser.map(
    (projectToUser) => projectToUser.project_id
  );

  // owned and linked projects
  const projects = await sql<Project[]>`
    select id, name from projects where owner_id=${
      auth.userId
    } or id in (${projectIdsToUser.join(", ")}) and deleted=false
  `;

  return res.json({
    data: projects,
  });
};

export default getRelatedProjects;
