import React from "react";
import { Alert, StyleSheet, View, Dimensions, TextInput, Text, TouchableOpacity } from "react-native";
import OtpInput from "react-native-animated-otp-input";

const { width, height } = Dimensions.get("window");

const OTPInput = ({navigation}) => {
  const showAlertWithButton = (code) => {
    Alert.alert(
      "Alert",
      `OTP is ${code}`,
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate('User'); // Navigate to HomeScreen
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>This is the place to fill OTP</Text>
        <OtpInput
          otpCount={5}
          autoFocus={false}
          onCodeFilled={(code) => {
            showAlertWithButton(code);
          }}
          onCodeChanged={(codes) => {
            console.log({ codes });
          }}
          // You can add further styles or props for the OtpInput component here
          // For example:
          // inputContainerStyles={styles.inputContainer} // Custom input container styles
          // inputStyles={styles.input} // Custom input styles
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Set a background color if necessary
  },
  inputContainer: {
    width: width * 0.8,
    marginBottom: height * 0.2, // 80% of screen width
    alignItems: "center",
    // Add other necessary styles like padding, border, etc.
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default OTPInput;
