import connect from "../database/connect";
import Tracker from "../database/models/Tracker";
import dotenv from "dotenv";

dotenv.config();

connect()
  .then(() => Tracker.deleteMany({}))
  .then(() => new Tracker({ workouts: [] }).save())
  .then((doc) => console.info(`Tracker created ${doc.id}`))
  .catch((err: Error) => console.error(`Something went wrong: `, err))
  .finally(() => process.exit(0));
