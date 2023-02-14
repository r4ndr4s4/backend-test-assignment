import { Request, Response } from "express";

const getRelatedUsers = async (
  _: Request,
  res: Response
): Promise<Response> => {
  return res.json({
    status: "getRelatedUsers OK",
  });
};

export default getRelatedUsers;
