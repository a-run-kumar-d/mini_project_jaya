import fit from "@/assets/images/img10.png";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button, Provider as PaperProvider } from "react-native-paper";

const questions = [
  {
    id: 1,
    question: "What equipment are you using today?",
    options: [
      "Dumbbells",
      "Barbell",
      "Resistance Bands",
      "Bodyweight Only",
      "Kettlebells",
    ],
  },
  {
    id: 2,
    question: "Which body part are you focusing on?",
    options: ["Chest", "Back", "Legs", "Arms", "Full Body"],
  },
  {
    id: 3,
    question: "Any additional preparation?",
    options: [
      "Stretching",
      "Warm-up Cardio",
      "Foam Rolling",
      "No Additional Prep",
    ],
  },
];

const Goal = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      navigation.navigate("hard");
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
          <View style={styles.overlay}>
            <Text style={styles.title}>
              {questions[currentQuestion].question}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownText}>
                {selectedOption || "Select an option"}
              </Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.option}
                      onPress={() => {
                        setSelectedOption(option);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                  <Button
                    mode="contained"
                    onPress={() => setModalVisible(false)}
                  >
                    Close
                  </Button>
                </View>
              </View>
            </Modal>

            <Button
              mode="contained"
              style={styles.button}
              onPress={nextQuestion}
              disabled={!selectedOption}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "80%",
    padding: 10,
    backgroundColor: "#F97316",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  option: {
    paddingVertical: 10,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
});

export default Goal;
