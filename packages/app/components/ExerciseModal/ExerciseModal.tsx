import React from "react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import { Modal } from "react-native";
import colors from "../../colors";
import { AdaptedTracker } from "../../providers/Tracker";
import ButtonWithBorder from "../ButtonWithBorder/BorderWithBorder";
import {
  ModalOverlay,
  ModalPaper,
  SetTablePaper,
  SetTableRow,
  ColumnName,
  AddSetButton,
  DeleteIconText,
  AddSetButtonText,
  ColumnLayout,
  Spacer,
} from "./styled";
import Dropdown from "../Dropdown/Dropdown";
import NumericInput from "../NumericInput/NumericInput";

type Set = AdaptedTracker["workouts"][number]["exercises"][number];

type ExerciseModalProps = {
  onClose: () => void;
  onSubmit: (set: Set) => void;
  initialValue: Set;
  onReject: () => void;
  submitText: string;
  rejectText: string;
};

const ExerciseModal = ({
  onClose,
  onSubmit,
  initialValue,
  onReject,
  submitText,
  rejectText,
}: ExerciseModalProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
  });
  const {
    fields: sets,
    append,
    remove,
  } = useFieldArray({ name: "set", control });
  const { field } = useController({ name: "name", control });

  const onAddSetButtonClick = () => {
    const { weight: lastWeight } = sets[sets.length - 1] || { weight: 0 };
    append({ isCompleted: false, repetitions: 8, weight: lastWeight + 5 });
  };

  const submitForm = () => {
    handleSubmit(onSubmit)();
    onClose();
  };

  const reject = () => {
    onReject();
    onClose();
  };

  const options = [
    { key: "1", label: "Bench Press" },
    { key: "2", label: "Squats" },
  ];

  const onExerciseChange = ({ label }: typeof options[number]) =>
    field.onChange({ target: { value: label, name: "name" } });

  return (
    <Modal transparent={true} visible onRequestClose={onClose}>
      <ModalOverlay>
        <ModalPaper>
          <Dropdown
            value={field.value}
            placeholder="Exercise"
            options={options}
            onChange={onExerciseChange}
          />
          <SetTablePaper>
            <SetTableRow>
              <ColumnName>weight</ColumnName>
              <ColumnName>reps</ColumnName>
              <ColumnName />
            </SetTableRow>
            {sets.map(({ id }, index) => (
              <SetTableRow key={id}>
                <NumericInput name={`set.${index}.weight`} control={control} />
                <NumericInput
                  name={`set.${index}.repetitions`}
                  control={control}
                />
                <AddSetButton onPress={() => remove(index)}>
                  <DeleteIconText>✕</DeleteIconText>
                </AddSetButton>
              </SetTableRow>
            ))}
            <SetTableRow>
              <AddSetButton onPress={onAddSetButtonClick}>
                <AddSetButtonText>Add +</AddSetButtonText>
              </AddSetButton>
            </SetTableRow>
          </SetTablePaper>

          <ColumnLayout>
            <ButtonWithBorder color={colors.red} onPress={reject}>
              {rejectText}
            </ButtonWithBorder>
            <Spacer />
            <ButtonWithBorder color={colors.white} onPress={submitForm}>
              {submitText}
            </ButtonWithBorder>
          </ColumnLayout>
        </ModalPaper>
      </ModalOverlay>
    </Modal>
  );
};

export default ExerciseModal;
