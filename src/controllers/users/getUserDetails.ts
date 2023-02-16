import { Request, Response } from "express";

import sql from "../../database";
import { User } from "../../types";

const getUserDetails = async (
  { params }: Request,
  res: Response
): Promise<Response> => {
  const { userId } = params;

  const user = await sql<User[]>`
    select name, email from users where id=${userId} and deleted=false
  `;

  return res.json({
    data: user,
  });
};

export default getUserDetails;
