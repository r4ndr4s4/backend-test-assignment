import { Request, Response } from "express";

import sql from "../../database";
import { User } from "../../types";

const deleteUser = async (
  { params }: Request,
  res: Response
): Promise<Response> => {
  const { userId } = params;

  console.log({ userId });

  const user = await sql<User[]>`
    update users set deleted=true where id=${userId}
    returning *
  `;

  return res.json({
    data: user,
  });
};

export default deleteUser;
