import { ExerciseKind } from "../../backend/database/models/Tracker";

export const EXERCISE_LABELS: Record<ExerciseKind, string> = {
  [ExerciseKind.BENCH_PRESS]: "Bench press",
  [ExerciseKind.SQUATS]: "Squats",
  [ExerciseKind.DEADLIFT]: "Deadlift",
  [ExerciseKind.OVERHEAD_PRESS]: "OHP",
};
