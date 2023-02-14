import { Request, Response } from "express";

const deleteUser = async (_: Request, res: Response): Promise<Response> => {
  return res.json({
    status: "deleteUser OK",
  });
};

export default deleteUser;
