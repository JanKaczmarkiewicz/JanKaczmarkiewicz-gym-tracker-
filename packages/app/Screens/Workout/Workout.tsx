import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { Container } from "../MainView/styled";
import styled from "styled-components/native";
import colors from "../../colors";
import { Bar as ProgressBar } from "react-native-progress";
import { useTrackerContext } from "../../prividers/Tracker";
import ExerciseModal from "./ExerciseModal";
import ButtonWithBorder from "./BorderWithBorder";

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

const EditButton = styled.TouchableOpacity`
  border-radius: 20px;
  padding: 12px 24px;
  background-color: ${colors.gray};
`;

const EditButtonText = styled.Text`
  color: ${colors.white};
  font-size: 20px;
`;

const ExerciseHeadingContainer = styled.View`
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row;
`;

const Workout = ({
  route: {
    params: { workoutIndex },
  },
}: Props) => {
  const { tracker, updateIsCompleted, addExercise, updateExercise } =
    useTrackerContext();
  const [modalOpen, setModalOpen] = useState<"add" | number | undefined>();
  const workout = tracker.workouts[workoutIndex];

  const isAddModalOpen = modalOpen === "add";
  const editedExersise = typeof modalOpen === "number" ? modalOpen : -1;
  const isEditModalOpen = editedExersise > -1;

  return (
    <Container>
      {isEditModalOpen && (
        <ExerciseModal
          initialValue={workout.exercises[editedExersise]}
          onSubmit={(exercise) =>
            updateExercise({
              exercise,
              workoutIndex,
              exerciseIndex: editedExersise,
            })
          }
          onClose={() => setModalOpen(undefined)}
        />
      )}

      {isAddModalOpen && (
        <ExerciseModal
          initialValue={{ name: "", set: [] }}
          onSubmit={(exercise) => addExercise({ exercise, workoutIndex })}
          onClose={() => setModalOpen(undefined)}
        />
      )}

      {workout.exercises.map(({ set, name }, exerciseIndex) => {
        const progress =
          set.filter(({ isCompleted }) => isCompleted).length / set.length;

        return (
          <ExerciseContainer isCompleted={progress === 1}>
            <ExerciseHeadingContainer>
              <ExerciseTitle>{name}</ExerciseTitle>
              <EditButton onPress={() => setModalOpen(exerciseIndex)}>
                <EditButtonText>edit</EditButtonText>
              </EditButton>
            </ExerciseHeadingContainer>
            {set.length > 0 && (
              <ProgressBarWrapper>
                <ProgressBar
                  progress={progress}
                  width={350}
                  color={colors.lightGreen}
                />
              </ProgressBarWrapper>
            )}
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
                    {weight}kg ✕ {repetitions}
                  </SetText>
                </SetWrapper>
              ))}
            </SetsContainer>
          </ExerciseContainer>
        );
      })}

      <ButtonWithBorder
        color={colors.white}
        onPress={() => setModalOpen("add")}
      >
        Add an excersise
      </ButtonWithBorder>
    </Container>
  );
};

export default Workout;
