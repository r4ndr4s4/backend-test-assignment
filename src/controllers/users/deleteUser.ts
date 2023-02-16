import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { User } from "../../types";

const deleteUser = async (
  { params, auth }: Request,
  res: Response
): Promise<Response> => {
  const { userId } = params;

  assert(userId === auth.userId, "Users can only delete themselves.");

  const user = await sql<User[]>`
    update users set deleted=true where id=${userId}
    returning *
  `;

  return res.json({
    data: user,
  });
};

export default deleteUser;
