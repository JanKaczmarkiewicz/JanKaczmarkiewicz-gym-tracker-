import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { Container } from "../MainView/styled";
import colors from "../../../colors";
import { Bar as ProgressBar } from "react-native-progress";
import { useTrackerContext } from "../../../providers/Tracker";
import ExerciseModal from "../../ExerciseModal/ExerciseModal";
import ButtonWithBorder from "../../ButtonWithBorder/BorderWithBorder";
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
import { getUnusedExercises } from "./helpers";
import { EXERCISE_LABELS } from "../../../constants";

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

  const closeModal = () => setModalOpen(undefined);
  const openAddModal = () => setModalOpen("add");

  const unusedExercises = getUnusedExercises(workout.exercises);

  return (
    <Container>
      {isEditModalOpen && (
        <ExerciseModal
          allowedExercises={[
            workout.exercises[editedExercise].type,
            ...unusedExercises,
          ]}
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
          onClose={closeModal}
        />
      )}

      {isAddModalOpen && (
        <ExerciseModal
          allowedExercises={unusedExercises}
          rejectText="Cancel"
          submitText="Create"
          initialValue={{ type: unusedExercises[0], set: [] }}
          onSubmit={(exercise) => addExercise({ exercise, workoutIndex })}
          onReject={() => {}}
          onClose={closeModal}
        />
      )}

      {workout.exercises.map(({ set, type }, exerciseIndex) => {
        const progress =
          set.filter(({ isCompleted }) => isCompleted).length / set.length;

        return (
          <ExerciseContainer key={type} isCompleted={progress === 1}>
            <ExerciseHeadingContainer>
              <ExerciseTitle>{EXERCISE_LABELS[type]}</ExerciseTitle>
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
                  key={setIndex}
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
        disabled={unusedExercises.length === 0}
        color={colors.white}
        onPress={openAddModal}
      >
        Add an exercise
      </ButtonWithBorder>
    </Container>
  );
};

export default Workout;
