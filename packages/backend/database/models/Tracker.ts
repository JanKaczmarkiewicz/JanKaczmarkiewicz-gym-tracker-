import mongoose from "mongoose";

export interface ITracker {
  workouts: {
    date: Date;
    exercises: {
      type: ExerciseKind;
      set: {
        weight: number;
        repetitions: number;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}

export enum ExerciseKind {
  SQUATS = "SQUATS",
  BENCH_PRESS = "BENCH_PRESS",
  DEADLIFT = "DEADLIFT",
  OVERHEAD_PRESS = "OVERHEAD_PRESS",
}


const setSchema = new mongoose.Schema(
  {
    weight: { type: Number, required: true },
    repetitions: { type: Number, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  { _id: false }
);

const exerciseSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: Object.values(ExerciseKind) },
    set: [setSchema],
  },
  { _id: false }
);

const workoutSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    exercises: [exerciseSchema],
  },
  { _id: false }
);

const trackerSchema = new mongoose.Schema<ITracker>({
  workouts: [workoutSchema],
});

export default mongoose.model<ITracker>("Tracker", trackerSchema);
