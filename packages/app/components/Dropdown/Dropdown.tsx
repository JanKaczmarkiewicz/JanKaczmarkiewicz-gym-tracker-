import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ModalSelector from "react-native-modal-selector";
import { DropdownInput, DropdownInputText } from "./styled";
import colors from "../../colors";

type DropdownProps = {
  value: string;
  options: { key: string; label: string }[];
  placeholder: string;
  onChange: (value: { key: string; label: string }) => void;
};

const Dropdown = ({ onChange, options, placeholder, value }: DropdownProps) => {
  return (
    <ModalSelector data={options} renderItem={null} onChange={onChange}>
      <DropdownInput>
        <DropdownInputText>{value || placeholder}</DropdownInputText>
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
