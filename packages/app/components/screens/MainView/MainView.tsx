import React, { Fragment } from "react";
import { RootStackParamList } from "../../../App";
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
import { useTrackerContext } from "../../../providers/Tracker";
import { FlatList, ListRenderItem } from "react-native";
import { ADD_DAY_OPTION, NUMBER_OF_COLUMNS, TODAY } from "./constants";
import { groupWorkoutsByMonth } from "./helpers";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
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
