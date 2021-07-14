import { Router } from "express";
import { Serialize } from "../types";
import Tracker, { ITracker } from "../database/models/Tracker";

const tracker = Router();

export type TrackerResponse = Serialize<ITracker>;

tracker.get("/tracker", async (req, res) => {
  const foundTracker = await Tracker.findOne();
  if (!foundTracker) return res.status(404);
  res.status(200).json(foundTracker);
});

tracker.put("/tracker", async (req, res) => {
  const foundTracker = await Tracker.findOneAndUpdate({}, req.body);
  if (!foundTracker) return res.status(404);
  res.status(200).json(foundTracker);
});

export default tracker;
