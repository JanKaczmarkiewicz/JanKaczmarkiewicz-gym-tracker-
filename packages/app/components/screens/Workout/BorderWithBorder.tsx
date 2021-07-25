import React, { FunctionComponent } from "react";
import { ButtonProps } from "react-native";
import styled from "styled-components/native";
import colors from "../../../colors";

type StylesProps = { color: string };

type ButtonWithBorderProps = StylesProps & {
  onPress: ButtonProps["onPress"];
};

const Button = styled.TouchableOpacity<StylesProps>`
  border-radius: 20px;
  background-color: ${colors.gray};
  padding: 16px 0px;
  flex: 1;
  border: 1px solid ${({ color }) => color};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text<StylesProps>`
  color: ${({ color }) => color};
  font-size: 20px;
`;

const ButtonWithBorder: FunctionComponent<ButtonWithBorderProps> = ({
  color,
  children,
  onPress,
}) => (
  <Button onPress={onPress} color={color}>
    <ButtonText color={color}>{children}</ButtonText>
  </Button>
);

export default ButtonWithBorder;
