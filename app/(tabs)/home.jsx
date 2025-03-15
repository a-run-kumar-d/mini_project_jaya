import React, { useState, useEffect } from "react";
import fit from "@/assets/images/Frame.png";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, FAB } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";

const Home = () => {
  const [userName, setUserName] = useState("Arunkumar D");
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [bmiStatus, setBmiStatus] = useState("Normal");
  const [hasWorkoutPlan, setHasWorkoutPlan] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
      setUserHeight(user.height);
      setUserWeight(user.weight);
      setBmiStatus(user.bmiStatus);
      setHasWorkoutPlan(!!user.workoutPlan);
    }
  }, []);

  const handleGenerateWorkoutPlan = () => {
    // generate workout plan
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={fit}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to FitFlow</Text>
        <Text style={styles.welcomeText2}>{userName}!</Text>
        <Text style={styles.welcomeText3}>
          Your personal fitness AI Assistant
        </Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTextLabel}>Height</Text>
          <Text style={styles.statTextValue}>{userHeight} cm</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTextLabel}>Weight</Text>
          <Text style={styles.statTextValue}>{userWeight} kg</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTextLabel}>BMI</Text>
          <Text style={styles.statTextValue}>{bmiStatus}</Text>
        </View>
      </View>
      <View style={styles.ctaSection}>
        {hasWorkoutPlan ? (
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate("WorkoutPlan")}
          >
            <Text style={styles.ctaButtonText}>See Workout Plan</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate("goal")}
          >
            <Text style={styles.ctaButtonText}>Generate Workout Plan</Text>
          </TouchableOpacity>
        )}
        {hasWorkoutPlan && (
          <TouchableOpacity
            style={styles.ctaButton2}
            onPress={() => navigation.navigate("GenerateWorkoutPlan")}
          >
            <Text style={styles.ctaButtonText}>Generate New Workout Plan</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    flex: 1,
    backgroundColor: "#111214",
  },
  welcomeSection: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "center",
    color: "#D7D8D9",
  },
  welcomeText2: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
  },
  welcomeText3: {
    fontSize: 12,
    fontWeight: "regular",
    textAlign: "center",
    color: "#D7D8D9",
    letterSpacing: 2,
  },
  statsContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  statBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#24262B",
    gap: 5,
  },
  statTextLabel: {
    fontSize: 12,
    color: "#D7D8D9",
  },
  statTextValue: {
    fontSize: 20,
    color: "#fff",
  },
  ctaSection: {
    padding: 20,
  },
  ctaButton: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  ctaButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  ctaButton2: {
    backgroundColor: "#393C43",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
});

export default Home;
