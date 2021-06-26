import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import useTrackerQuery, { AdaptedTracker } from "../queries/useTrackedQuery";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  padding: 32px 12px;
`;

const MonthTitle = styled.Text`
  font-size: 36px;
  color: ${colors.white};
`;

const DayButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.darkGray};
  border-radius: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
`;

const AddDayButton = styled(DayButton)`
  background-color: ${colors.white};
`;

const DaysContainer = styled.View`
  padding: 16px 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const DayButtonContentText = styled.Text`
  color: ${colors.white};
  font-size: 36px;
`;

const AddDayButtonContentText = styled(DayButtonContentText)`
  color: ${colors.black};
`;

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
    const day = workout.date.getDate();
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

        const isTodayCreated = month.workouts.find(
          ({ date }) => TODAY.getDate() === date.getDate()
        );

        const isCurrentMonth = monthIndex === TODAY.getMonth();

        const addDayButton =
          !isTodayCreated && isCurrentMonth ? (
            <AddDayButton key="+" onPress={() => {}}>
              <AddDayButtonContentText>+</AddDayButtonContentText>
            </AddDayButton>
          ) : null;

        return (
          <>
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
          </>
        );
      })}
    </Container>
  );
};

export default MainView;
