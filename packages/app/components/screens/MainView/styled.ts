import styled from "styled-components/native";
import colors from "../../../colors";
import {
  DAY_BUTTON_SIZE,
  GUTTER_SIZE,
  HORIZONTAL_CONTAINER_PADDING,
} from "./constants";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.black};
  padding: 32px ${HORIZONTAL_CONTAINER_PADDING}px;
`;

export const MonthTitle = styled.Text`
  font-size: 36px;
  color: ${colors.white};
`;

export const DayButton = styled.TouchableOpacity`
  width: ${DAY_BUTTON_SIZE}px;
  height: ${DAY_BUTTON_SIZE}px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.darkGray};
  border-radius: 20px;
  margin-right: ${GUTTER_SIZE}px;
  margin-bottom: ${GUTTER_SIZE}px;
`;

export const AddDayButton = styled(DayButton)`
  background-color: ${colors.white};
`;

export const DaysContainer = styled.View`
  padding: 16px 0;
`;

export const DayButtonContentText = styled.Text`
  color: ${colors.white};
  font-size: 36px;
`;

export const AddDayButtonContentText = styled(DayButtonContentText)`
  color: ${colors.black};
`;
