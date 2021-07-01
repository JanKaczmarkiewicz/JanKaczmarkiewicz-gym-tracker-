import React, { Fragment } from "react";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Container,
  AddDayButton,
  AddDayButtonContentText,
  MonthTitle,
  DaysContainer,
  DayButton,
  DayButtonContentText,
} from "./styled";
import { AdaptedTracker, useTrackerContext } from "../../prividers/Tracker";

const TODAY = new Date();

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const groupWorkoutsByMonth = (tracker: AdaptedTracker) => {
  const monthList: {
    name: string;
    workouts: AdaptedTracker["workouts"];
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

  for (const workout of tracker.workouts) {
    const month = workout.date.getMonth();
    monthList[month].workouts.push(workout);
  }

  return monthList;
};

const MainView = ({ navigation }: Props) => {
  const { tracker, addWorkout } = useTrackerContext();

  const monthList = groupWorkoutsByMonth(tracker);

  return (
    <Container>
      {monthList.map((month, monthIndex) => {
        if (!month.workouts.length) return null;
        //TODO: refactor this lines
        const isTodayCreated = month.workouts.find(
          ({ date }) => TODAY.getDate() === date.getDate()
        );

        const isCurrentMonth = monthIndex === TODAY.getMonth();

        const addDayButton =
          !isTodayCreated && isCurrentMonth ? (
            <AddDayButton
              key="+"
              onPress={() => {
                addWorkout({ date: TODAY });
                navigation.push("Workout", { workoutIndex: 0 });
              }}
            >
              <AddDayButtonContentText>+</AddDayButtonContentText>
            </AddDayButton>
          ) : null;

        return (
          <Fragment key={month.name}>
            <MonthTitle>{month.name}</MonthTitle>
            <DaysContainer>
              {addDayButton}
              {month.workouts.map((workout, workoutIndex) => (
                <DayButton
                  key={workout.date.getDate()}
                  onPress={() => navigation.push("Workout", { workoutIndex })}
                >
                  <DayButtonContentText>
                    {workout.date.getDate()}
                  </DayButtonContentText>
                </DayButton>
              ))}
            </DaysContainer>
          </Fragment>
        );
      })}
    </Container>
  );
};

export default MainView;
