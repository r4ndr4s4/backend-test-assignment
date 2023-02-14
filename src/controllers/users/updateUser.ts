import { Request, Response } from "express";

const updateUser = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "updateUser OK",
  });
};

export default updateUser;
