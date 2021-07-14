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

const MainView = ({ navigation }: Props) => {
  const { tracker, addWorkout } = useTrackerContext();

  const monthList = groupWorkoutsByMonth(tracker);

  return (
    <Container>
      {monthList.map((month, monthIndex) => {
        const isCurrentMonth = monthIndex === TODAY.getMonth();
        const isTodayCreated = !!month.workouts.find(
          ({ date }) => TODAY.getDate() === date.getDate()
        );

        const showAddDay = !isTodayCreated && isCurrentMonth;
        const isMonthEmpty = !month.workouts.length;

        if (isMonthEmpty && !showAddDay) return null;
        const addDayButton = showAddDay ? (
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
              {month.workouts.map(({ date, index }) => (
                <DayButton
                  key={date.getDate()}
                  onPress={() => {
                    navigation.push("Workout", { workoutIndex: index });
                  }}
                >
                  <DayButtonContentText>{date.getDate()}</DayButtonContentText>
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
