import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainView from "./Screens/MainView";
import Workout from "./Screens/Workout";
import { AdaptedTracker } from "./queries/useTrackedQuery";

export type RootStackParamList = {
  Home: undefined;
  Workout: AdaptedTracker["workouts"][number];
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainView} />
      <Stack.Screen name="Workout" component={Workout} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
