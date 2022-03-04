import { ExerciseKind } from '../entities/tracker.entity';

export class ReplaceTrackerDto {
  readonly workouts!: {
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
