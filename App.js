// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/Screen/Home/HomeScreen";
import OTPInput from "./src/Screen/Auth/OTPInput";
import UserPage from "./src/components/User";
import CameraPage from "./src/Screen/Camera/Camera";
import VideoPage from "./src/Screen/Video/Video";
import AudioPage from "./src/Screen/Video/Audio";
import Login from "./src/Screen/Auth/Login";
import Register from "./src/Screen/Auth/Register";
import BiometricAuthScreen from "./src/Screen/Printfinger/PrintFinger";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Biometric">
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
          name="Login"
          component={Login}
          options={{
            title: "Login Screen",
            headerStyle: { backgroundColor: "#77DD77" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register Screen",
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
        <Stack.Screen
          name="Camera"
          component={CameraPage}
          options={{
            title: "User",
            headerStyle: { backgroundColor: "#77DD77" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen name="Biometric" component={BiometricAuthScreen} />
        <Stack.Screen name="Video" component={VideoPage} />
        <Stack.Screen name="Audio" component={AudioPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
