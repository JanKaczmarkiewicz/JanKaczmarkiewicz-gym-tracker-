import { Tracker } from "../../backend/router/tracker";
import useQuery from "./useQuery";

const useTrackerQuery = (id: string) => {
  const result = useQuery(() =>
    fetch(`http://192.168.1.8:3000/tracker/${id}`)
      .then((res) => res.json())
      .then((response: Tracker) => ({
        ...response,
        workouts: response.workouts.map((workout) => ({
          ...workout,
          date: new Date(workout.date),
        })),
      }))
  );
  return result;
};

export type AdaptedTracker = NonNullable<
  ReturnType<typeof useTrackerQuery>["data"]
>;

export default useTrackerQuery;
