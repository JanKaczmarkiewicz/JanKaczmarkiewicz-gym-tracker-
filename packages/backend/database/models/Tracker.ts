import mongoose from "mongoose";

export interface ITracker {
  workouts: {
    date: Date;
    exercises: {
      name: string;
      set: {
        weight: number;
        repetitions: number;
        isCompleted: true;
      }[];
    }[];
  }[];
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
    name: { type: String, required: true },
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
