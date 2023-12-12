// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./component/HomeScreen";
import OTPInput from "./component/OTPInput";
import UserPage from "./component/User";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="OTPInput"
          component={OTPInput}
          options={{
            title: "OTP Input",
            headerStyle: { backgroundColor: "#77DD77" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="User"
          component={UserPage}
          options={{
            title: "User",
            headerStyle: { backgroundColor: "#77DD77" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
