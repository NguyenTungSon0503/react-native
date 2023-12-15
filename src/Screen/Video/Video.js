import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Audio, Video as OriginalVideo } from "expo-av";

const sourceArray = [
  "https://res.cloudinary.com/dul81x4pq/video/upload/v1702485363/Lyric_HD_T%C3%ADc_T%E1%BA%AFc_-_B-Ray_Prod._by_Omito_Beats_qyfv3v.mp4",
  "https://res.cloudinary.com/dul81x4pq/video/upload/v1702485155/demo_l5vrqs.mp4",
  "https://res.cloudinary.com/dul81x4pq/video/upload/v1702485852/Think_Of_You_-_Hu%E1%BB%B3nh_T%C3%BA_-_MV_Lyric_mrpepy.mp4",
  "https://res.cloudinary.com/dul81x4pq/video/upload/v1702486781/Don_t_C%C3%B4i_-_RPT_Orijinn_x_Ronboogz_Visualizer_zsw74c.mp4",
  "https://res.cloudinary.com/dul81x4pq/video/upload/v1702488566/Private/IMG_7607_2_pchpei.mp4",
  "https://res.cloudinary.com/dul81x4pq/video/upload/v1702488514/Private/video_2022-09-04_14-51-18_o1k3kb.mp4",
  "https://res.cloudinary.com/dul81x4pq/video/upload/v1702488579/Private/IMG_7606_thdo1v.mp4",
];

export default function VideoPage({ navigation }) {
  const [status, setStatus] = useState({});
  const videos = useRef([]);

  useEffect(() => {
    const init = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });

      const sound = new Audio.Sound();
      if (Platform.OS === "ios") {
        const playSilentSound = async () => {
          await sound.loadAsync(require("../../../sample/silent_sound.mp3"));
          await sound.playAsync();
          await sound.setIsLoopingAsync(true);
        };
        playSilentSound();
      }
      return () => {
        sound.stopAsync();
        sound.unloadAsync();
      };
    };
    init();
  }, []);

  // const handlePlayFromPosition = (index, position) => {
  //   if (videos.current[index]) {
  //     videos.current[index].playFromPositionAsync(position);
  //   }
  // };

  // const handleToggleLooping = (index) => {
  //   if (videos.current[index]) {
  //     videos.current[index].setIsLoopingAsync(!status.isLooping);
  //   }
  // };

  const renderVideos = () => {
    return sourceArray.map((source, index) => (
      <View key={index} style={styles.videoContainer}>
        <OriginalVideo
          ref={(video) => (videos.current[index] = video)}
          style={styles.video}
          source={{ uri: source }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(playbackStatus) => setStatus(playbackStatus)}
        />
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePlayFromPosition(index, 5000)}
          >
            <Text style={styles.buttonText}>Play from 5s</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleToggleLooping(index)}
          >
            <Text style={styles.buttonText}>
              {status.isLooping ? "Set to not loop" : "Set to loop"}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.videoList}>{renderVideos()}</View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Audio")}
      >
        <Text style={styles.buttonText}>Go to Audio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    flex: 1,
    alignSelf: "stretch",
    height: 300,
    marginVertical: 10,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6495ED",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
