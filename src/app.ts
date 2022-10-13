import dotenv from "dotenv";
import express from "express";

/** load .env stuff */
dotenv.config();

import router from "./router";
import dbConnect from "./db/connect";
import { APP_PORT } from "./constants";

const app = express();

/** middlewares */
import auth from "./middlewares/auth.middleware";

app.use(auth);
app.use(express.json());

/** api server start */
app.listen(APP_PORT, async () => {
  console.log(`App listening in port ${APP_PORT}`);
  await dbConnect();
  router(app);
});
