import fit from "@/assets/images/img4.png";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

const questions = [
  {
    id: 1,
    question: "What is your primary goal?",
    options: [
      "Build Muscle Mass & Size",
      "Lose Weight & Burn Fat",
      "Increase Strength & Lift More Weight",
      "Tone Up - Gain Muscle & Lose Fat",
      "Get Fitter & Feel Healthy",
      "Train For Tactical Readiness",
    ],
  },
];

const Goal = () => {
  const navigation = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("hard");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>{questions[currentQuestion].question}</Text>
        {questions[currentQuestion].options.map((option, index) => (
          <RadioButton.Item
            key={index}
            label={option}
            status={selectedOption === option ? "checked" : "unchecked"}
            onPress={() => setSelectedOption(option)}
          />
        ))}
        <RadioButton.Item
          label="Continue"
          status={selectedOption ? "checked" : "unchecked"}
          onPress={nextQuestion}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});

export default Goal;
