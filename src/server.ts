import express from "express";
import { Server } from "http";
import helmet from "helmet";
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from "morgan"; // TODO check later

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

const serve = (port: number): Server => {
  const app = express();

  app.use(morgan("common"));
  app.use(helmet.noSniff());

  app.get("/", healthcheck);

  // users
  app.post("/users", createUser);
  app.get("/users/:userId", getUserDetails);
  app.patch("/users/:userId", updateUser);
  app.delete("/users/:userId", deleteUser);

  // projects
  app.post("/projects", createProject);
  app.get("/projects", getRelatedProjects);
  app.patch("/projects/:projectId", updateProject);
  app.delete("/projects/:projectId", deleteProject);

  // usersToProjects
  app.post("/projects/:projectId/users/:userId", addUserToProject);
  app.delete("/projects/:projectId/users/:userId", removeUserFromProject);
  app.get("/projects/:projectId/users", getRelatedUsers);

  return app.listen(port, () => {
    console.info(`Server listening on port ${port}.`);
  });
};

export default serve;
