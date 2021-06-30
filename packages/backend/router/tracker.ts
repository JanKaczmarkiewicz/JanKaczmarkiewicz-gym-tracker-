import { Router } from "express";
import { Serialize } from "../types";
const tracker = Router();

const data = {
  id: "1",
  workouts: [
    {
      date: new Date("2021/6/23"),
      exercises: [
        {
          name: "Bench press",
          set: [
            { weight: 20, repetitions: 6, isCompleted: false },
            { weight: 40, repetitions: 8, isCompleted: true },
            { weight: 60, repetitions: 8, isCompleted: false },
            { weight: 20, repetitions: 6, isCompleted: true },
            { weight: 40, repetitions: 8, isCompleted: false },
            { weight: 60, repetitions: 8, isCompleted: true },
            { weight: 20, repetitions: 6, isCompleted: true },
            { weight: 40, repetitions: 8, isCompleted: false },
          ],
        },
        {
          name: "Squats",
          set: [
            { weight: 20, repetitions: 6, isCompleted: true },
            { weight: 40, repetitions: 8, isCompleted: false },
            { weight: 60, repetitions: 8, isCompleted: true },
            { weight: 20, repetitions: 6, isCompleted: true },
            { weight: 40, repetitions: 8, isCompleted: false },
            { weight: 60, repetitions: 8, isCompleted: true },
            { weight: 20, repetitions: 6, isCompleted: true },
            { weight: 40, repetitions: 8, isCompleted: false },
            { weight: 60, repetitions: 8, isCompleted: true },
          ],
        },
      ],
    },
    {
      date: new Date("2021/10/25"),
      exercises: [],
    },
  ],
};

export type Tracker = Serialize<typeof data>;

tracker.get("/tracker/:id", (req, res) => {
  res.status(200).json(data);
});

export default tracker;
