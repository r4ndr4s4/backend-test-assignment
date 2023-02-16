import express from "express";
import { Server } from "http";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import auth from "./middlewares/auth";
import owner from "./middlewares/owner";

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

const serve = (port: number): Server => {
  const app = express();

  app.use(morgan("common"));
  app.use(helmet.noSniff());
  app.use(bodyParser.json());

  app.get("/", healthcheck);

  app.use(auth);

  // users
  app.post("/users", createUser);
  app.get("/users/:userId", getUserDetails);
  app.patch("/users/:userId", updateUser);
  app.delete("/users/:userId", deleteUser);

  // projects
  app.post("/projects", createProject);
  app.get("/projects", getRelatedProjects);
  app.patch("/projects/:projectId", owner, updateProject);
  app.delete("/projects/:projectId", owner, deleteProject);

  // usersToProjects
  app.post("/projects/:projectId/users/:userId", owner, addUserToProject);
  app.delete(
    "/projects/:projectId/users/:userId",
    owner,
    removeUserFromProject
  );
  app.get("/projects/:projectId/users", owner, getRelatedUsers);

  // logs
  app.post("/logs", createLog);

  return app.listen(port, () => {
    console.info(`Server listening on port ${port}.`);
  });
};

export default serve;
