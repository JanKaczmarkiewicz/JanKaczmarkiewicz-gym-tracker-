import React from "react";
import { Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type Props = {
  route: RouteProp<RootStackParamList, "Workout">;
};

const Workout = ({ route: { params: workout } }: Props) => {
  return <Text>{workout.date.toLocaleDateString()}</Text>;
};

export default Workout;
