// UserPage.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { getValueFor } from "../utils/secureStore";

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function getAccessToken() {
      const accessToken = await getValueFor("accessToken");
      setAccessToken(accessToken);
    }
    getAccessToken();
  }, []);

  const fetchData = async () => {
    try {
      // using ngrok or port forwarding instead using localhost
      const response = await axios.get(`${baseUrl}companies`);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Your accessToken: {accessToken}</Text>
        {userData && userData.length > 0 ? (
          userData.map((user, index) => (
            <View key={index}>
              <Text style={styles.title}>{user.email}</Text>
              <Text>{`Username: ${user.username}`}</Text>
              {/* Display other user data as needed */}
            </View>
          ))
        ) : (
          <Text>No user data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default UserPage;
