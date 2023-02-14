/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import serve from "./server";

serve(Number(process.env.PORT || 3000));
