import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const difficultyLevels = [
  { id: 1, label: "Easy", icon: "speedometer-outline", color: "#FFA500" },
  { id: 2, label: "Moderate", icon: "speedometer-outline", color: "#008000" },
  {
    id: 3,
    label: "Challenging",
    icon: "speedometer-outline",
    color: "#4682B4",
  },
  { id: 4, label: "Hard", icon: "speedometer-outline", color: "#F97316" },
  { id: 5, label: "Intense", icon: "speedometer", color: "#DC143C" },
];

const Hard = () => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/images/img8.png")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>How hard would you like to train?</Text>
        <View style={styles.difficultyContainer}>
          {difficultyLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.difficultyButton,
                {
                  backgroundColor:
                    selectedLevel === level.id ? level.color : "#E0E0E0",
                },
              ]}
              onPress={() => setSelectedLevel(level.id)}
            >
              <Ionicons
                name={level.icon}
                size={30}
                color={selectedLevel === level.id ? "#FFF" : "#555"}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.selectedText}>
          {difficultyLevels[selectedLevel - 1]?.label || "Select Level"}
        </Text>
        <Text style={styles.description}>
          Difficulty helps balance challenge with your desired pace. You can
          adjust these settings anytime.
        </Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay for readability
  },
  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  title: {
    width: "90%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 25,
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  difficultyButton: {
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 8,
    alignItems: "center",
  },
  selectedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 25,
    color: "#D7D8D9",
  },
  nextButton: {
    height: 72,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Hard;
