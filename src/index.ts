/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import serve from "./server";

const PORT = 6000; // TODO move to dotenv

serve(PORT);
