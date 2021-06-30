import styled from "styled-components/native";
import colors from "../../colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  padding: 32px 12px;
`;

export const MonthTitle = styled.Text`
  font-size: 36px;
  color: ${colors.white};
`;

export const DayButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.darkGray};
  border-radius: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
`;

export const AddDayButton = styled(DayButton)`
  background-color: ${colors.white};
`;

export const DaysContainer = styled.View`
  padding: 16px 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const DayButtonContentText = styled.Text`
  color: ${colors.white};
  font-size: 36px;
`;

export const AddDayButtonContentText = styled(DayButtonContentText)`
  color: ${colors.black};
`;
