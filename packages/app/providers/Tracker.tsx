import produce from "immer";
import React, { Context, FC, useContext } from "react";
import { useState, useEffect, createContext } from "react";
import { ActivityIndicator } from "react-native";
import { TrackerResponse } from "../../backend/router/tracker";
import env from "../constants/env";

const TRACKER_API_URL = `${env.API_URL}/tracker`;

const adaptTracker = (tracker: TrackerResponse) => ({
  ...tracker,
  workouts: tracker.workouts.map((workout) => ({
    ...workout,
    date: new Date(workout.date),
  })),
});

export type AdaptedTracker = ReturnType<typeof adaptTracker>;

const useTrackerValue = () => {
  const [tracker, setTracker] = useState<AdaptedTracker>();

  useEffect(() => {
    fetch(TRACKER_API_URL)
      .then((res) => res.json())
      .then((response) => setTracker(adaptTracker(response)));
  }, []);

  const updateTracker = (recipe: (tracker: AdaptedTracker) => void) => {
    if (!tracker) return;
    const updatedTracker = produce(tracker, recipe);

    setTracker(updatedTracker);

    fetch(TRACKER_API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTracker),
    });
  };

  const updateIsCompleted = ({
    setIndex,
    exerciseIndex,
    workoutIndex,
    isCompleted,
  }: {
    setIndex: number;
    exerciseIndex: number;
    workoutIndex: number;
    isCompleted: boolean;
  }) =>
    updateTracker((draft) => {
      draft.workouts[workoutIndex].exercises[exerciseIndex].set[
        setIndex
      ].isCompleted = isCompleted;
    });

  const addExercise = ({
    exercise,
    workoutIndex,
  }: {
    exercise: AdaptedTracker["workouts"][number]["exercises"][number];
    workoutIndex: number;
  }) =>
    updateTracker((draft) => {
      draft.workouts[workoutIndex].exercises.push(exercise);
    });

  const deleteExercise = ({
    workoutIndex,
    exerciseIndex,
  }: {
    exerciseIndex: number;
    workoutIndex: number;
  }) =>
    updateTracker((draft) => {
      draft.workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
    });

  const updateExercise = ({
    exercise,
    exerciseIndex,
    workoutIndex,
  }: {
    exercise: AdaptedTracker["workouts"][number]["exercises"][number];
    workoutIndex: number;
    exerciseIndex: number;
  }) =>
    updateTracker((draft) => {
      draft.workouts[workoutIndex].exercises[exerciseIndex] = exercise;
    });

  const addWorkout = ({ date }: { date: Date }) =>
    updateTracker((draft) => {
      draft.workouts.unshift({ date, exercises: [] });
    });

  const addSet = ({
    workoutIndex,
    exerciseIndex,
    repetitions,
    weight,
  }: {
    workoutIndex: number;
    exerciseIndex: number;
    repetitions: number;
    weight: number;
  }) =>
    updateTracker((draft) => {
      draft.workouts[workoutIndex].exercises[exerciseIndex].set.push({
        repetitions,
        weight,
        isCompleted: false,
      });
    });

  return {
    updateIsCompleted,
    updateExercise,
    addWorkout,
    addSet,
    addExercise,
    deleteExercise,
    tracker: tracker!,
  };
};

const context = createContext(undefined) as unknown as Context<
  ReturnType<typeof useTrackerValue>
>;

export const TrackerProvider: FC = ({ children }) => {
  const value = useTrackerValue();

  if (!value.tracker) return <ActivityIndicator />;

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useTrackerContext = () => useContext(context);
