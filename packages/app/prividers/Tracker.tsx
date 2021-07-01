import produce from "immer";
import React, { Context, FC, useContext } from "react";
import { useState, useEffect, createContext } from "react";
import { ActivityIndicator } from "react-native";
import { Tracker } from "../../backend/router/tracker";

const adaptTracker = (tracker: Tracker) => ({
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
    fetch(`http://192.168.1.8:3000/tracker`)
      .then((res) => res.json())
      .then((response: Tracker) => setTracker(adaptTracker(response)))
      .catch(console.error);
  }, []);

  const updateTracker = (recipe: (tracker: AdaptedTracker) => void) => {
    if (!tracker) return;
    const updatedTracker = produce(tracker, recipe);

    setTracker(updatedTracker);

    fetch(`http://192.168.1.8:3000/tracker`, {
      method: "PATCH",
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
    addWorkout,
    addSet,
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
