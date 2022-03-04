import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

export enum ExerciseKind {
  SQUATS = 'SQUATS',
  BENCH_PRESS = 'BENCH_PRESS',
  DEADLIFT = 'DEADLIFT',
  OVERHEAD_PRESS = 'OVERHEAD_PRESS',
}

class Set {
  @Column()
  repetitions!: number;

  @Column()
  weight!: number;

  @Column()
  isCompleted!: boolean;
}

class Exercise {
  @Column({ type: 'enum', enum: ExerciseKind })
  type!: ExerciseKind;

  @Column(() => Set)
  set!: Set[];
}

class Workout {
  @Column()
  date!: Date;

  @Column(() => Exercise)
  exercises!: Exercise[];
}

@Entity({ name: 'trackers' })
export class Tracker {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  date!: Date;

  @Column(() => Workout)
  workouts!: Workout[];
}
