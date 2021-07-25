import styled from "styled-components/native";
import colors from "../../colors";

export const DropdownInput = styled.View`
  border-width: 0;
  background-color: ${colors.gray};
  border-radius: 20px;
  padding: 16px 36px;
  margin-bottom: 16px;
  justify-content: space-between;
  flex-direction: row;
`;

export const DropdownInputText = styled.Text`
  color: ${colors.lightGray};
`;
