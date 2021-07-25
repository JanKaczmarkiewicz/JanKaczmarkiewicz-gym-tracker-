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
import { FlatList, ListRenderItem } from "react-native";
import { NUMBER_OF_COLUMNS } from "./constants";

const TODAY = new Date();

const ADD_DAY_OPTION = { date: TODAY, type: "NEW_DAY" } as const;

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

  const onAddDayPress = () => {
    addWorkout({ date: TODAY });
    navigation.push("Workout", { workoutIndex: 0 });
  };

  const renderDay: ListRenderItem<
    typeof monthList[number]["workouts"][number] | typeof ADD_DAY_OPTION
  > = ({ item: day }) => {
    if ("type" in day) {
      return (
        <AddDayButton key="+" onPress={onAddDayPress}>
          <AddDayButtonContentText>+</AddDayButtonContentText>
        </AddDayButton>
      );
    }

    const { date, index } = day;

    const onDayPress = () =>
      navigation.push("Workout", { workoutIndex: index });

    return (
      <DayButton key={date.getDate()} onPress={onDayPress}>
        <DayButtonContentText>{date.getDate()}</DayButtonContentText>
      </DayButton>
    );
  };

  return (
    <Container>
      {monthList.map((month, monthIndex) => {
        const isCurrentMonth = monthIndex === TODAY.getMonth();
        const isTodayCreated = !!month.workouts.find(
          ({ date }) => TODAY.getDate() === date.getDate()
        );

        const showAddDay = !isTodayCreated && isCurrentMonth;
        const isMonthEmpty = !month.workouts.length;
        const isMonthNotVisible = isMonthEmpty && !showAddDay;

        if (isMonthNotVisible) return null;

        const data = showAddDay
          ? [ADD_DAY_OPTION, ...month.workouts]
          : month.workouts;

        return (
          <Fragment key={month.name}>
            <MonthTitle>{month.name}</MonthTitle>

            <DaysContainer>
              <FlatList
                renderItem={renderDay}
                data={data}
                numColumns={NUMBER_OF_COLUMNS}
              />
            </DaysContainer>
          </Fragment>
        );
      })}
    </Container>
  );
};

export default MainView;
