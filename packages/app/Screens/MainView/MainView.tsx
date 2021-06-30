import React, { Fragment } from "react";
import { ActivityIndicator } from "react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import useTrackerQuery, { AdaptedTracker } from "../../queries/useTrackedQuery";
import {
  Container,
  AddDayButton,
  AddDayButtonContentText,
  MonthTitle,
  DaysContainer,
  DayButton,
  DayButtonContentText,
} from "./styled";

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
  const result = useTrackerQuery("1");

  if (result.isLoading) return <ActivityIndicator />;

  const monthList = groupWorkoutsByMonth(result.data);

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
                //create day & navigate to it
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
              {month.workouts.map((workout) => (
                <DayButton
                  key={workout.date.getDate()}
                  onPress={() => navigation.push("Workout", workout)}
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
