import { Request, Response } from "express";

import sql from "../../database";

const updateUser = async (
  { params, body }: Request,
  res: Response
): Promise<Response> => {
  const { userId } = params;
  const { name, email } = body;

  console.log({ userId, name, email });

  const user = await sql`
    update users set name=${name}, email=${email} where id=${userId}
    returning *
  `;

  return res.json({
    data: user,
  });
};

export default updateUser;
