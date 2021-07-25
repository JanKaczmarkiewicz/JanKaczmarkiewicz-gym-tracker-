import { ExerciseKind } from "../../../../backend/database/models/Tracker";
import { AdaptedTracker } from "../../../providers/Tracker";

export const getUnusedExercises = (
  exercises: AdaptedTracker["workouts"][number]["exercises"]
) => {
  const usedExercises = exercises.map(({ type }) => type);

  return Object.values(ExerciseKind).filter(
    (exerciseKind) => !usedExercises.includes(exerciseKind)
  );
};
