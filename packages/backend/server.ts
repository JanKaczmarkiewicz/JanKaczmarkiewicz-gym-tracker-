import express from "express";
import router from "./router";

export default () => {
  const app = express();

  app.use(express.json());
  app.use(router);

  return new Promise((resolve, reject) =>
    app
      .listen(process.env.PORT)
      .once("listening", resolve)
      .once("error", reject)
  );
};
