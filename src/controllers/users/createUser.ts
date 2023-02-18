import { Request, Response } from "express";

import sql from "../../database";
import { User } from "../../types";
import { userSchema } from "../../schemas";

const createUser = async (
  { body }: Request,
  res: Response
): Promise<Response> => {
  const validatedBody = await userSchema.validate(body);
  const { name, email } = validatedBody;

  const user = await sql<User[]>`
    insert into users (name, email) values (${name}, ${email})
    returning *
  `;

  return res.json({
    data: user,
  });
};

export default createUser;
