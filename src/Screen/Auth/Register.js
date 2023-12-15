import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { saveToSecureStore } from "../../utils/secureStore";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    const userInfo = {
      email: email,
      password: password,
      username: username,
      avatar_url:
        "https://res.cloudinary.com/dul81x4pq/image/upload/v1701188560/Facebook_Logo__2019_.png_jhlfdj.webp",
    };
    const response = await axios.post(`${baseUrl}auth/register`, userInfo, {
      headers: "Content-Type: application/json",
    });
    await saveToSecureStore("accessToken", response.data.accessToken);
    await saveToSecureStore("otp", `${response.data.otp}`);
    navigation.navigate("OTPInput");
  };

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
      />
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
