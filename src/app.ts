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
import notFound from "./middlewares/404.middleware";

app.use(express.json());

/** api server start */
app.listen(APP_PORT, async () => {
  console.log(`App listening in port ${APP_PORT}`);
  await dbConnect();

  app.use(auth);
  router(app);
  app.use(notFound);
});
