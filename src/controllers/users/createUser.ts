import { Request, Response } from "express";

import sql from "../../database";

const createUser = async (
  { body }: Request,
  res: Response
): Promise<Response> => {
  const { name, email } = body;

  console.log({ name, email });

  const user = await sql`
    insert into users (name, email) values (${name}, ${email})
    returning *
  `;

  return res.json({
    data: user,
  });
};

export default createUser;
