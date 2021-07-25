import { Dimensions } from "react-native";

export const HORIZONTAL_CONTAINER_PADDING = 12;
export const GUTTER_SIZE = 16;
export const NUMBER_OF_COLUMNS = 4;
export const DAY_BUTTON_SIZE =
  (Dimensions.get("window").width -
    2 * HORIZONTAL_CONTAINER_PADDING -
    (NUMBER_OF_COLUMNS - 1) * GUTTER_SIZE) /
  NUMBER_OF_COLUMNS;
