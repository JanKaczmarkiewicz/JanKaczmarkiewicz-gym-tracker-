import connect from "./database/connect";
import server from "./server";
import dotenv from "dotenv";

(async () => {
  if (process.env.NODE_ENV === "development") dotenv.config();

  try {
    await server();
    console.log("Server started.");
  } catch (error) {
    console.error("Something went wrong with server.", error);
  }

  try {
    await connect();
    console.log("DB is connected.");
  } catch (error) {
    console.error("Something went wrong with DB connection.", error);
  }
})();
