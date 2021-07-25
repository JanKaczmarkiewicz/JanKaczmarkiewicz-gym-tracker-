import styled from "styled-components/native";
import colors from "../../colors";

export const Spacer = styled.View`
  width: 16px;
`;

export const ColumnLayout = styled.View`
  flex-direction: row;
`;

export const ModalPaper = styled.View`
  margin-top: 64px;
  margin: 16px;
  background-color: ${colors.darkGray};
  border-radius: 20px;
  padding: 16px;
`;

export const SetTablePaper = styled.View`
  background-color: ${colors.gray};
  border-radius: 20px;
  margin-bottom: 16px;
`;

export const SetTableRow = styled.View`
  flex-direction: row;
  padding: 16px 0;
  border: 1px solid ${colors.darkGray};
`;

export const ModalOverlay = styled.View`
  height: 100%;
  background-color: ${colors.black}CC;
`;

export const ColumnName = styled.Text`
  align-self: center;
  flex: 1;
  color: ${colors.lightGray};
  text-align: center;
`;

export const AddSetButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;

export const AddSetButtonText = styled.Text`
  color: ${colors.lightGreen};
  text-align: center;
  font-size: 20px;
`;

export const DeleteIconText = styled.Text`
  font-size: 20px;
  text-align: center;
  align-self: center;
  color: ${colors.red};
`;
