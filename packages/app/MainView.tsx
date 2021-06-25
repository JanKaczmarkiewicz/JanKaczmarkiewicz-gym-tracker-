import React from "react";
import styled from "styled-components/native";
import colors from "./colors";
import { text } from "@gym-tracker/backend";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  padding: 32px 12px;
`;

const MonthTitle = styled.Text`
  font-size: 36px;
  color: ${colors.white};
`;

const DayButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.darkGray};
  border-radius: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
`;

const AddDayButton = styled(DayButton)`
  background-color: ${colors.white};
`;

const DaysContainer = styled.View`
  padding: 16px 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const DayButtonContentText = styled.Text`
  color: ${colors.white};
  font-size: 36px;
`;

const AddDayButtonContentText = styled(DayButtonContentText)`
  color: ${colors.black};
`;

const MainView = () => (
  <Container>
    <MonthTitle>April {text}</MonthTitle>
    <DaysContainer>
      <AddDayButton key="+" onPress={() => {}}>
        <AddDayButtonContentText>{"+".toString()}</AddDayButtonContentText>
      </AddDayButton>
      {[30, 28, 26, 25, 21, 19, 18, 16, 10, 5].map((num) => (
        <DayButton key={num} onPress={() => {}}>
          <DayButtonContentText>{num.toString()}</DayButtonContentText>
        </DayButton>
      ))}
    </DaysContainer>

    <MonthTitle>May</MonthTitle>
    <DaysContainer>
      {[30, 28, 26, 25, 21, 19, 18, 16, 10, 5].map((num) => (
        <DayButton key={num} onPress={() => {}}>
          <DayButtonContentText>{num.toString()}</DayButtonContentText>
        </DayButton>
      ))}
    </DaysContainer>
  </Container>
);

export default MainView;
