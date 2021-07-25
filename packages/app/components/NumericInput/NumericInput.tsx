import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components/native";
import colors from "../../colors";

const Input = styled.TextInput`
  flex: 1;
  font-size: 20px;
  border-width: 1px;
  border: none;
  color: ${colors.white};
`;

// TODO: type control prop
const NumericInput = ({ control, name }: { name: string; control: any }) => {
  const { field } = useController({ control, name });

  return (
    <Input
      keyboardType="number-pad"
      textAlign="center"
      value={field.value.toString()}
      onChangeText={field.onChange}
    />
  );
};

export default NumericInput;
