import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import OtpInput from "react-native-animated-otp-input";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { getValueFor } from "../../utils/secureStore";

const { width, height } = Dimensions.get("window");

const OTPInput = ({ navigation }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [otp, setOtp] = useState(null);

  useEffect(() => {
    async function getAccessToken() {
      const accessToken = await getValueFor("accessToken");
      setAccessToken(accessToken);
    }
    async function getOtp() {
      const otp = await getValueFor("otp");
      setOtp(otp);
    }
    getAccessToken();
    getOtp();
  }, []);

  const handleOtpVerify = async (code) => {
    const otp = {
      otp: `${code}`,
    };
    try {
      const result = await axios.post(`${baseUrl}auth/otp-verify`, otp, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      if (result && result.data === "Verified") {
        navigation.replace("Video");
      } else {
      }
    } catch (error) {
      Alert.alert("Alert", `${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>This is the place to fill OTP</Text>
        <OtpInput
          otpCount={5}
          autoFocus={false}
          onCodeFilled={(code) => {
            handleOtpVerify(code);
          }}
          onCodeChanged={(codes) => {
            console.log({ codes });
          }}
          // You can add further styles or props for the OtpInput component here
          // For example:
          // inputContainerStyles={styles.inputContainer} // Custom input container styles
          // inputStyles={styles.input} // Custom input styles
        />
        <Text style={styles.textInput}>Your OTP is {otp}</Text>
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
