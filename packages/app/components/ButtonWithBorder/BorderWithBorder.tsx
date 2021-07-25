import React, { FunctionComponent } from "react";
import { ButtonProps } from "react-native";
import styled from "styled-components/native";
import colors from "../../colors";

type StylesProps = { color: string; disabled?: boolean };

type ButtonWithBorderProps = StylesProps & {
  onPress: ButtonProps["onPress"];
};

const Button = styled.TouchableOpacity<StylesProps>`
  border-radius: 20px;
  background-color: ${colors.gray};
  padding: 16px 0px;
  flex: 1;
  border: 1px solid ${({ color }) => color};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
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
  disabled = false,
}) => (
  <Button disabled={disabled} onPress={onPress} color={color}>
    <ButtonText disabled={disabled} color={color}>
      {children}
    </ButtonText>
  </Button>
);

export default ButtonWithBorder;
