import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { Server } from "http";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import auth from "./middlewares/auth";
import owner from "./middlewares/owner";
import error from "./middlewares/error";

import healthcheck from "./healthcheck";

// users
import createUser from "./controllers/users/createUser";
import getUserDetails from "./controllers/users/getUserDetails";
import updateUser from "./controllers/users/updateUser";
import deleteUser from "./controllers/users/deleteUser";

// projects
import createProject from "./controllers/projects/createProject";
import getRelatedProjects from "./controllers/projects/getRelatedProjects";
import updateProject from "./controllers/projects/updateProject";
import deleteProject from "./controllers/projects/deleteProject";

// usersToProjects
import addUserToProject from "./controllers/usersToProjects/addUserToProject";
import removeUserFromProject from "./controllers/usersToProjects/removeUserFromProject";
import getRelatedUsers from "./controllers/usersToProjects/getRelatedUsers";

// logs
import createLog from "./controllers/logs/createLog";

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const serve = (port: number): Server => {
  const app = express();

  app.use(morgan("common"));
  app.use(helmet.noSniff());
  app.use(cors());

  app.use(express.json());

  app.get("/", asyncHandler(healthcheck));

  app.use(auth);

  // users
  app.post("/users", asyncHandler(createUser));
  app.get("/users/:userId", asyncHandler(getUserDetails));
  app.patch("/users/:userId", asyncHandler(updateUser));
  app.delete("/users/:userId", asyncHandler(deleteUser));

  // projects
  app.post("/projects", asyncHandler(createProject));
  app.get("/projects", asyncHandler(getRelatedProjects));
  app.patch("/projects/:projectId", owner, asyncHandler(updateProject));
  app.delete("/projects/:projectId", owner, asyncHandler(deleteProject));

  // usersToProjects
  app.post(
    "/projects/:projectId/users/:userId",
    owner,
    asyncHandler(addUserToProject)
  );
  app.delete(
    "/projects/:projectId/users/:userId",
    owner,
    asyncHandler(removeUserFromProject)
  );
  app.get("/projects/:projectId/users", owner, asyncHandler(getRelatedUsers));

  // logs
  app.post("/logs", asyncHandler(createLog));

  app.use(error);

  return app.listen(port, () => {
    console.info(`Server listening on port ${port}.`);
  });
};

export default serve;
