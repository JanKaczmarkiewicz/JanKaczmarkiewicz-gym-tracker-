import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import { DropdownInput, DropdownInputText } from "./styled";
import colors from "../../colors";

type DropdownProps<T> = {
  value: string;
  options: { key: T; label: string }[];
  placeholder: string;
  onChange: (value: { key: T; label: string }) => void;
};

const Dropdown = <T extends unknown>({
  onChange,
  options,
  placeholder,
  value,
}: DropdownProps<T>) => {
  const displayValue =
    options.find((option) => option.key === value)?.label || placeholder;

  return (
    <ModalSelector data={options} renderItem={null} onChange={onChange}>
      <DropdownInput>
        <DropdownInputText>{displayValue}</DropdownInputText>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color={colors.lightGray}
        />
      </DropdownInput>
    </ModalSelector>
  );
};

export default Dropdown;
