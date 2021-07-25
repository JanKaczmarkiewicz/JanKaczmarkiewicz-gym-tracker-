import React from "react";
import { useController, useFieldArray, useForm } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import { Modal } from "react-native";
import styled from "styled-components/native";
import colors from "../../colors";
import { AdaptedTracker } from "../../providers/Tracker";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonWithBorder from "./BorderWithBorder";

const Spacer = styled.View`
  width: 16px;
`;

const ColumnLayout = styled.View`
  flex-direction: row;
`;

const ModalPaper = styled.View`
  margin-top: 64px;
  margin: 16px;
  background-color: ${colors.darkGray};
  border-radius: 20px;
  padding: 16px;
`;

const SetTablePaper = styled.View`
  background-color: ${colors.gray};
  border-radius: 20px;
  margin-bottom: 16px;
`;

const SetTableRow = styled.View`
  flex-direction: row;
  padding: 16px 0;
  border: 1px solid ${colors.darkGray};
`;

const ModalOverlay = styled.View`
  height: 100%;
  background-color: ${colors.black}CC;
`;

const ColumnName = styled.Text`
  align-self: center;
  flex: 1;
  color: ${colors.lightGray};
  text-align: center;
`;

const Input1 = styled.TextInput`
  flex: 1;
  font-size: 20px;
  border-width: 1px;
  border: none;
  color: ${colors.white};
`;

const AddSetButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;

const AddSetButtonText = styled.Text`
  color: ${colors.lightGreen};
  text-align: center;
  font-size: 20px;
`;

const DeleteIconText = styled.Text`
  font-size: 20px;
  text-align: center;
  align-self: center;
  color: ${colors.red};
`;

type Set = AdaptedTracker["workouts"][number]["exercises"][number];

const Input = ({ control, name }) => {
  const { field } = useController({ control, name });

  return (
    <Input1
      keyboardType="number-pad"
      textAlign={"center"}
      value={field.value.toString()}
      onChangeText={field.onChange}
    />
  );
};

const DropdownInput = styled.View`
  border-width: 0;
  background-color: ${colors.gray};
  border-radius: 20px;
  padding: 16px 36px;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-direction: row;
`;

const DropdownInputText = styled.Text`
  color: ${colors.lightGray};
`;

const ExerciseModal = ({
  onClose,
  onSubmit,
  initialValue,
  onReject,
  submitText,
  rejectText,
}: {
  onClose: () => void;
  onSubmit: (set: Set) => void;
  initialValue: Set;
  onReject: () => void;
  submitText: string;
  rejectText: string;
}) => {
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

  const data = [
    { key: 1, label: "Bench Press" },
    { key: 2, label: "Squats" },
  ];

  const onExerciseChange = ({ label }: typeof data[number]) =>
    field.onChange({ target: { value: label, name: "name" } });

  return (
    <Modal transparent={true} visible onRequestClose={onClose}>
      <ModalOverlay>
        <ModalPaper>
          <ModalSelector
            data={data}
            renderItem={null}
            onChange={onExerciseChange}
          >
            <DropdownInput>
              <DropdownInputText>{field.value || "Exercise"}</DropdownInputText>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color={colors.lightGray}
              />
            </DropdownInput>
          </ModalSelector>
          <SetTablePaper>
            <SetTableRow>
              <ColumnName>weight</ColumnName>
              <ColumnName>reps</ColumnName>
              <ColumnName />
            </SetTableRow>
            {sets.map(({ id }, index) => (
              <SetTableRow key={id}>
                <Input name={`set.${index}.weight`} control={control} />
                <Input name={`set.${index}.repetitions`} control={control} />
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
