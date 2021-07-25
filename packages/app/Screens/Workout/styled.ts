import styled from "styled-components/native";
import colors from "../../colors";

export const SetText = styled.Text<{ isCompleted: boolean }>`
  color: ${({ isCompleted }) =>
    isCompleted ? colors.lightGreen : colors.white};
  font-size: 24px;
`;

export const SetWrapper = styled.TouchableOpacity`
  margin-bottom: 24px;
  margin-right: 24px;
`;

export const ExerciseContainer = styled.View<{ isCompleted: boolean }>`
  background-color: ${colors.darkGray};
  padding: 16px;
  font-size: 20px;
  margin-bottom: 32px;
  border-radius: 20px;
  border: 1px solid
    ${({ isCompleted }) => (isCompleted ? colors.lightGreen : "transparent")};
`;

export const SetsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ExerciseTitle = styled.Text`
  font-size: 36px;
  color: ${colors.white};
  margin-bottom: 24px;
`;

export const ProgressBarWrapper = styled.View`
  margin-bottom: 24px;
`;

export const EditButton = styled.TouchableOpacity`
  border-radius: 20px;
  padding: 12px 24px;
  background-color: ${colors.gray};
`;

export const EditButtonText = styled.Text`
  color: ${colors.white};
  font-size: 20px;
`;

export const ExerciseHeadingContainer = styled.View`
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row;
`;
