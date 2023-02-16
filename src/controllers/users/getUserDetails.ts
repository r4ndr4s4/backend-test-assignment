import { Request, Response } from "express";

import sql from "../../database";

const getUserDetails = async (
  { params }: Request,
  res: Response
): Promise<Response> => {
  const { userId } = params;

  console.log({ userId });

  const user = await sql`
    select name, email from users where id=${userId}
  `;

  return res.json({
    data: user,
  });
};

export default getUserDetails;
