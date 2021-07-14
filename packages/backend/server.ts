import express from "express";
import router from "./router";

export default () => {
  const app = express();

  app.use(express.json());
  app.use(router);

  return new Promise((resolve, reject) =>
    app
      .listen(Number.parseInt(process.env.SERVER_PORT || "3000"))
      .once("listening", resolve)
      .once("error", reject)
  );
};
