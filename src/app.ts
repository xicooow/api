import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";

/** load .env stuff */
dotenv.config();

import router from "./router";
import dbConnect from "./db/connect";
import { APP_PORT } from "./constants";

const app = express();

/** middlewares */
import cors from "./middlewares/cors.middleware";
import auth from "./middlewares/auth.middleware";
import notFound from "./middlewares/404.middleware";

/** json body */
app.use(express.json());

/** security headers */
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.dnsPrefetchControl());

/** cors */
app.use(cors);

/** api server start */
app.listen(APP_PORT, async () => {
  console.log(`App listening in port ${APP_PORT}`);
  await dbConnect();

  app.use(auth);
  router(app);
  app.use(notFound);
});
