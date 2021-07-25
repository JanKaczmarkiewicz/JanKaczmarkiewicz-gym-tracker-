import { AdaptedTracker } from "../../../providers/Tracker";

export const groupWorkoutsByMonth = (tracker: AdaptedTracker) => {
  const monthList: {
    name: string;
    workouts: (AdaptedTracker["workouts"][number] & { index: number })[];
  }[] = [
    { name: "December", workouts: [] },
    { name: "November", workouts: [] },
    { name: "October", workouts: [] },
    { name: "September", workouts: [] },
    { name: "August", workouts: [] },
    { name: "July", workouts: [] },
    { name: "June", workouts: [] },
    { name: "May", workouts: [] },
    { name: "April", workouts: [] },
    { name: "March", workouts: [] },
    { name: "February", workouts: [] },
    { name: "January", workouts: [] },
  ];

  tracker.workouts.forEach((workout, index) => {
    const month = workout.date.getMonth();
    monthList[monthList.length - month].workouts.push({ ...workout, index });
  });

  return monthList;
};
