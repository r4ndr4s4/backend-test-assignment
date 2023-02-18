import { Request, Response } from "express";
import assert from "assert";

import sql from "../../database";
import { User } from "../../types";
import { userSchema } from "../../schemas";

const updateUser = async (
  { params, body, auth }: Request,
  res: Response
): Promise<Response> => {
  const validatedBody = await userSchema.validate(body);
  const { name, email } = validatedBody;

  const { userId } = params;

  assert(userId === auth.userId, "Users can only update themselves.");

  const user = await sql<User[]>`
    update users set name=${name}, email=${email} where id=${userId} and deleted=false
    returning *
  `;

  return res.json({
    data: user,
  });
};

export default updateUser;
