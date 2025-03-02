import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const difficultyLevels = [
  { id: 1, label: "Easy", icon: "speedometer-outline", color: "#FFA07A" },
  { id: 2, label: "Moderate", icon: "speedometer-outline", color: "#FA8072" },
  { id: 3, label: "Challenging", icon: "speedometer-outline", color: "#FF8C00" },
  { id: 4, label: "Hard", icon: "speedometer-outline", color: "#FF4500" },
  { id: 5, label: "Intense", icon: "speedometer", color: "#DC143C" },
];

const Hard = () => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How hard would you like to train?</Text>
      <View style={styles.difficultyContainer}>
        {difficultyLevels.map((level) => (
          <TouchableOpacity
            key={level.id}
            style={[
              styles.difficultyButton,
              { backgroundColor: selectedLevel === level.id ? level.color : "#E0E0E0" },
            ]}
            onPress={() => setSelectedLevel(level.id)}
          >
            <Ionicons name={level.icon} size={30} color={selectedLevel === level.id ? "#FFF" : "#555"} />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.selectedText}>{difficultyLevels[selectedLevel - 1]?.label || "Select Level"}</Text>
      <Text style={styles.description}>
        Difficulty will help you balance challenge against your desired pace of progress; you can adjust these settings at any time.
      </Text>
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('dash')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  difficultyContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  difficultyButton: { padding: 15, borderRadius: 50, marginHorizontal: 8, alignItems: "center" },
  selectedText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  description: { textAlign: "center", paddingHorizontal: 20, marginBottom: 20, color: "#666" },
  nextButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default Hard;
