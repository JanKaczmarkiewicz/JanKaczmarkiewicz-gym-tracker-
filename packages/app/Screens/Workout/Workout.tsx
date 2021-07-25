import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { Container } from "../MainView/styled";
import colors from "../../colors";
import { Bar as ProgressBar } from "react-native-progress";
import { useTrackerContext } from "../../providers/Tracker";
import ExerciseModal from "./ExerciseModal";
import ButtonWithBorder from "./BorderWithBorder";
import {
  EditButton,
  EditButtonText,
  ExerciseContainer,
  ExerciseHeadingContainer,
  ExerciseTitle,
  ProgressBarWrapper,
  SetsContainer,
  SetText,
  SetWrapper,
} from "./styled";

type Props = {
  route: RouteProp<RootStackParamList, "Workout">;
};

const Workout = ({
  route: {
    params: { workoutIndex },
  },
}: Props) => {
  const {
    tracker,
    updateIsCompleted,
    addExercise,
    updateExercise,
    deleteExercise,
  } = useTrackerContext();
  const [modalOpen, setModalOpen] = useState<"add" | number | undefined>();
  const workout = tracker.workouts[workoutIndex];

  const isAddModalOpen = modalOpen === "add";
  const editedExercise = typeof modalOpen === "number" ? modalOpen : -1;
  const isEditModalOpen = editedExercise > -1;

  return (
    <Container>
      {isEditModalOpen && (
        <ExerciseModal
          rejectText="Delete"
          submitText="Save"
          initialValue={workout.exercises[editedExercise]}
          onReject={() =>
            deleteExercise({ workoutIndex, exerciseIndex: editedExercise })
          }
          onSubmit={(exercise) =>
            updateExercise({
              exercise,
              workoutIndex,
              exerciseIndex: editedExercise,
            })
          }
          onClose={() => setModalOpen(undefined)}
        />
      )}

      {isAddModalOpen && (
        <ExerciseModal
          rejectText="Undo"
          submitText="Create"
          initialValue={{ name: "", set: [] }}
          onSubmit={(exercise) => addExercise({ exercise, workoutIndex })}
          onReject={() => {}}
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
        Add an exercise
      </ButtonWithBorder>
    </Container>
  );
};

export default Workout;
