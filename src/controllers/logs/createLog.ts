import { Request, Response } from "express";

import sql from "../../database";
import { Log, UserToProject } from "../../types";

const createLog = async (
  { body, auth }: Request,
  res: Response
): Promise<Response> => {
  const { startDate, endDate, projectId } = body;

  const userToProject = await sql<UserToProject[]>`
    select id from users_to_projects where user_id=${auth.userId} and project_id=${projectId}
  `;

  // TODO handle if not linked to project

  const log = await sql<Log[]>`
    insert into logs (start_date, end_date, user_and_project_id) values (${startDate}, ${endDate}, ${userToProject[0].id})
    returning *
  `;

  return res.json({
    data: log,
  });
};

export default createLog;
