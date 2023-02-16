import { Request, Response } from "express";

import sql from "../../database";
import { User } from "../../types";

const createUser = async (
  { body }: Request,
  res: Response
): Promise<Response> => {
  const { name, email } = body;

  console.log({ name, email });

  const user = await sql<User[]>`
    insert into users (name, email) values (${name}, ${email})
    returning *
  `;

  return res.json({
    data: user,
  });
};

export default createUser;
