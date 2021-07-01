import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { Container } from "./MainView/styled";
import styled from "styled-components/native";
import colors from "../colors";
import { Bar as ProgressBar } from "react-native-progress";
import { useTrackerContext } from "../prividers/Tracker";

type Props = {
  route: RouteProp<RootStackParamList, "Workout">;
};

const SetText = styled.Text<{ isCompleted: boolean }>`
  color: ${({ isCompleted }) =>
    isCompleted ? colors.lightGreen : colors.white};
  font-size: 24px;
`;

const SetWrapper = styled.TouchableOpacity`
  margin-bottom: 24px;
  margin-right: 24px;
`;

const ExerciseContainer = styled.View<{ isCompleted: boolean }>`
  background-color: ${colors.darkGray};
  padding: 16px;
  font-size: 20px;
  margin-bottom: 32px;
  border-radius: 20px;
  border: 1px solid
    ${({ isCompleted }) => (isCompleted ? colors.lightGreen : "transparent")};
`;

const SetsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ExerciseTitle = styled.Text`
  font-size: 36px;
  color: ${colors.white};
  margin-bottom: 24px;
`;

const ProgressBarWrapper = styled.View`
  margin-bottom: 24px;
`;

const Workout = ({
  route: {
    params: { workoutIndex },
  },
}: Props) => {
  const { tracker, updateIsCompleted } = useTrackerContext();
  const workout = tracker.workouts[workoutIndex];

  return (
    <Container>
      {workout.exercises.map(({ set, name }, exerciseIndex) => {
        const progress =
          set.filter(({ isCompleted }) => isCompleted).length / set.length;

        return (
          <ExerciseContainer key={name} isCompleted={progress === 1}>
            <ExerciseTitle>{name}</ExerciseTitle>
            <ProgressBarWrapper>
              <ProgressBar
                progress={progress}
                width={350}
                color={colors.lightGreen}
              />
            </ProgressBarWrapper>
            <SetsContainer>
              {set.map(({ isCompleted, repetitions, weight }, setIndex) => (
                <SetWrapper
                  onPress={() => {
                    updateIsCompleted({
                      setIndex,
                      exerciseIndex,
                      workoutIndex,
                      isCompleted: !isCompleted,
                    });
                  }}
                >
                  <SetText isCompleted={isCompleted}>
                    {weight} ✕ {repetitions}
                  </SetText>
                </SetWrapper>
              ))}
            </SetsContainer>
          </ExerciseContainer>
        );
      })}
    </Container>
  );
};

export default Workout;
