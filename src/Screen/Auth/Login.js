import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { saveToSecureStore } from "../../utils/secureStore";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const userInfo = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${baseUrl}auth/login`, userInfo, {
        headers: "Content-Type: application/json",
      });
      if (response.status === 200) {
        await saveToSecureStore("accessToken", response.data.accessToken);
        navigation.replace("Video");
      } else {
        Alert.alert("Alert", `${response.data.message}`);
      }
    } catch (error) {
      Alert.alert("Alert", `${error.message}`);
    }
  };

  const handleNavigateSignup = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text>{"\n"}</Text>
      <Text onPress={handleNavigateSignup}>No have account, go to Sign Up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "blue", // Change the color to your preference
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
