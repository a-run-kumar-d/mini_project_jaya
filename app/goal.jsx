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
    question: "Which body part are you focusing on?",
    options: [
      "Chest",
      "Back",
      "Legs",
      "Arms",
      "Core",
      "Shoulders",
      "Neck",
      "Cardio",
      "Waist",
    ],
  },
  {
    id: 2,
    question: "Which equipment are you using?",
    options: [
      "Dumbbells",
      "Barbell",
      "Resistance Bands",
      "Bodyweight",
      "Kettlebells",
      "Machines",
      "Cardio Machines",
      "Specialty Equipment",
    ],
  },
  {
    id: 3,
    question: "What intensity or preparation level?",
    options: [
      "Stretching",
      "Warm-up Cardio",
      "Foam Rolling",
      "No Additional Prep",
      "High Intensity",
      "Moderate Effort",
      "Light Activity",
    ],
  },
];

const equipmentGroups = {
  Machines: [
    "Smith Machine",
    "Sled Machine",
    "Leverage Machine",
    "Cable",
    "Assisted",
  ],
  CardioMachines: [
    "Treadmill",
    "Bike",
    "Elliptical",
    "Skierg Machine",
    "Upper Body Ergometer (UBE)",
  ],
  SpecialtyEquipment: [
    "Trap Bar",
    "Bosu Ball",
    "Medicine Ball",
    "Rope",
    "Hammer",
    "Tire",
    "Roller",
  ],
};

const Goal = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Added modalVisible state

  const handleOptionSelect = (option) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = option;
    setSelectedOptions(updatedSelections);
    setModalVisible(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateWorkout();
    }
  };

  const generateWorkout = () => {
    console.log("Selected Values:", selectedOptions);

    const selectedEquipment = selectedOptions[1]; // Equipment selection

    if (selectedEquipment === "Machines") {
      console.log("Machines:", equipmentGroups.Machines);
    }
    if (selectedEquipment === "Cardio Machines") {
      console.log("Cardio Machines:", equipmentGroups.CardioMachines);
    }
    if (selectedEquipment === "Specialty Equipment") {
      console.log("Specialty Equipment:", equipmentGroups.SpecialtyEquipment);
    }

    navigation.navigate("hard");
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
                {selectedOptions[currentQuestion] || "Select an option"}
              </Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.option}
                      onPress={() => handleOptionSelect(option)}
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
              disabled={!selectedOptions[currentQuestion]}
            >
              <Text style={styles.buttonText}>
                {currentQuestion === questions.length - 1
                  ? "Generate Workouts"
                  : "Continue"}
              </Text>
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
