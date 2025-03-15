import fit from "@/assets/images/img4.png";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";

const Height = () => {
  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const navigation = useNavigation();

  // Convert height & weight based on unit system
  const convertHeight = (value, isMetric) => {
    if (!value) return ""; // Handle empty input
    return isMetric ? value : (parseFloat(value) * 0.393701).toFixed(2); // cm to inches
  };

  const convertWeight = (value, isMetric) => {
    if (!value) return ""; // Handle empty input
    return isMetric ? value : (parseFloat(value) * 2.20462).toFixed(2); // kg to lbs
  };

  const handleHeightChange = (value) => {
    if (!value) return setHeight("");
    setHeight(isMetric ? value : (parseFloat(value) / 0.393701).toFixed(2)); // Inches to cm
  };

  const handleWeightChange = (value) => {
    if (!value) return setWeight("");
    setWeight(isMetric ? value : (parseFloat(value) / 2.20462).toFixed(2)); // lbs to kg
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Enter Your Details</Text>

          {/* Unit Toggle Switch */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>lb/in</Text>
            <Switch
              value={isMetric}
              onValueChange={() => setIsMetric(!isMetric)}
              trackColor={{ false: "#767577", true: "#4CAF50" }}
              thumbColor={isMetric ? "#fff" : "#f4f3f4"}
            />
            <Text style={styles.label}>kg/cm</Text>
          </View>

          {/* Height Input */}
          <TextInput
            style={styles.input}
            placeholder={isMetric ? "Enter height (cm)" : "Enter height (in)"}
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          {/* Weight Input */}
          <TextInput
            style={styles.input}
            placeholder={isMetric ? "Enter weight (kg)" : "Enter weight (lb)"}
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />

          {/* Next Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("gender")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark overlay for readability
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "100%",
    height: 60,
    fontSize: 18,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent input field
    color: "white",
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Height;
