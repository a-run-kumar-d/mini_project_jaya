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
    options: ["Upper", "Lower", "Back", "Cardio", "Core"],
  },
  {
    id: 2,
    question: "Which equipment are you using?",
    options: [
      "Cardio Machines",
      "Bars & Weights",
      "Strength Equipment",
      "Functional Training Tools",
      "Resistance & Bodyweight",
    ],
  },
  {
    id: 3,
    question: "What intensity or preparation level?",
    options: ["High Intensity", "Moderate Effort", "Light Activity"],
  },
];

const equipmentGroups = {
  "Cardio Machines": [
    "stepmill machine",
    "stationary bike",
    "elliptical machine",
    "skierg machine",
    "upper body ergometer",
  ],
  "Bars & Weights": [
    "trap bar",
    "olympic barbell",
    "ez barbell",
    "barbell",
    "weighted",
  ],
  "Strength Equipment": [
    "smith machine",
    "sled machine",
    "dumbbell",
    "kettlebell",
    "medicine ball",
  ],
  "Functional Training Tools": [
    "tire",
    "roller",
    "wheel roller",
    "hammer",
    "bosu ball",
    "stability ball",
  ],
  "Resistance & Bodyweight": [
    "resistance band",
    "rope",
    "band",
    "assisted",
    "body weight",
    "cable",
    "leverage machine",
  ],
};
const muscleGroups = {
  Upper: ["shoulders", "upper arms", "chest"],
  Lower: ["lower arms", "upper legs", "lower legs", "waist"],
  Back: ["back"],
  Cardio: ["cardio"],
  Core: ["neck"],
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

  const generateWorkout = async () => {
    console.log("Selected Values:", selectedOptions);
    const [allowedEquipment, allowedMuscle] = [
      equipmentGroups[selectedOptions[1]],
      muscleGroups[selectedOptions[0]],
    ];
    const exerciseCount =
      selectedOptions[2] === "High Intensity"
        ? 7
        : selectedOptions[2] === "Moderate Effort"
        ? 5
        : 3;
    console.log(allowedEquipment, allowedMuscle, exerciseCount);

    try {
      let exercises = [];
      for (let i = 0; i < allowedMuscle.length; i++) {
        const response = await fetch(
          `https://exercisedb-api.vercel.app/api/v1/bodyparts/${allowedMuscle[i]}/exercises`
        );
        const data = await response.json();
        exercises = [...exercises, ...data.data.exercises];

        if (exerciseCount === 3) break;
      }

      if (exerciseCount > 3 && allowedMuscle.length === 1) {
        const nextPageResponse = await fetch(
          `https://exercisedb-api.vercel.app/api/v1/bodyparts/${allowedMuscle[0]}/exercises?page=2`
        );
        const nextPageData = await nextPageResponse.json();
        exercises = [...exercises, ...nextPageData.data.exercises];
      }

      const filteredExercises = exercises
        .filter((exercise) =>
          exercise.equipments.some((equip) => allowedEquipment.includes(equip))
        )
        .slice(0, exerciseCount);

      console.log(filteredExercises);
    } catch (error) {
      console.error(error);
    }

    // navigation.navigate("hard");
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
