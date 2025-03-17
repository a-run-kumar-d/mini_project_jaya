import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import dietData from "../constants/dietData.json";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import app from "@/firebaseConfig";
import { router } from "expo-router"; // Import router for navigation

const Diet = () => {
  const [goal, setGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [dietPlan, setDietPlan] = useState(null);
  const [storedPlan, setStoredPlan] = useState(null);

  const goals = [
    "weight loss",
    "muscle gain",
    "maintain weight",
    "general health",
  ];
  const activityLevels = [
    "sedentary",
    "lightly active",
    "moderately active",
    "very active",
  ];
  const dietaryRestrictionsOptions = [
    "none",
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
  ];

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    loadStoredPlan();
  }, []);

  const loadStoredPlan = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const usersCollection = collection(db, "Users");
        const q = query(usersCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const docRef = doc(userDoc.ref, "dietPlans", "userDietPlan");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setStoredPlan(docSnap.data());
          }
        }
      }
    } catch (error) {
      console.error("Error loading stored diet plan from Firestore:", error);
    }
  };

  const storeDietPlan = async (plan) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const usersCollection = collection(db, "Users");
        const q = query(usersCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          await setDoc(doc(userDoc.ref, "dietPlans", "userDietPlan"), plan);
          setStoredPlan(plan);
        }
      }
    } catch (error) {
      console.error("Error storing diet plan in Firestore:", error);
    }
  };

  const clearStoredPlan = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const usersCollection = collection(db, "Users");
        const q = query(usersCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const dietPlansCollectionRef = collection(userDoc.ref, "dietPlans");
          const dietPlanDocRef = doc(dietPlansCollectionRef, "userDietPlan");

          // Delete the document within the subcollection
          await deleteDoc(dietPlanDocRef);

          setStoredPlan(null);
          router.push("/(tabs)/home");
        }
      }
    } catch (error) {
      console.error("Error clearing stored diet plan from Firestore:", error);
    }
  };

  const generateDietPlan = () => {
    if (!goal || !activityLevel || !dietaryRestrictions) {
      alert("Please select all options.");
      return;
    }

    let filteredData = dietData.filter((item) => {
      return (
        item.goal.toLowerCase().includes(goal.toLowerCase()) &&
        item.activityLevel
          .toLowerCase()
          .includes(activityLevel.toLowerCase()) &&
        item.dietaryRestrictions
          .toLowerCase()
          .includes(dietaryRestrictions.toLowerCase())
      );
    });

    if (filteredData.length === 0) {
      alert("No diet plan found matching your criteria.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredData.length);
    const generatedPlan = filteredData[randomIndex];
    setDietPlan(generatedPlan);
    storeDietPlan(generatedPlan);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Generate Your Weekly Diet Plan</Text>

      {storedPlan ? (
        <View style={styles.dietPlanContainer}>
          <Text style={styles.dietPlanTitle}>Your Stored Weekly Diet Plan</Text>
          <Text style={styles.dietPlanText}>Goal: {storedPlan.goal}</Text>
          <Text style={styles.dietPlanText}>
            Activity Level: {storedPlan.activityLevel}
          </Text>
          <Text style={styles.dietPlanText}>
            Dietary Restrictions: {storedPlan.dietaryRestrictions}
          </Text>

          {storedPlan &&
            storedPlan.weeklyPlan &&
            Object.entries(storedPlan.weeklyPlan).map(([day, meals]) => (
              <View key={day} style={styles.dayContainer}>
                <Text style={styles.dayTitle}>{day}</Text>
                {Object.entries(meals).map(([mealType, meal]) => (
                  <View key={mealType} style={styles.mealContainer}>
                    <Text style={styles.mealTitle}>{mealType}:</Text>
                    <Text style={styles.mealText}>{meal}</Text>
                  </View>
                ))}
              </View>
            ))}
          <TouchableOpacity style={styles.ctaButton} onPress={clearStoredPlan}>
            <Text style={styles.ctaButtonText}>Delete plan</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Fitness Goal:</Text>
            <Picker
              selectedValue={goal}
              style={styles.picker}
              onValueChange={(itemValue) => setGoal(itemValue)}
            >
              <Picker.Item label="Select Goal" value="" />
              {goals.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Activity Level:</Text>
            <Picker
              selectedValue={activityLevel}
              style={styles.picker}
              onValueChange={(itemValue) => setActivityLevel(itemValue)}
            >
              <Picker.Item label="Select Activity Level" value="" />
              {activityLevels.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Dietary Restrictions:</Text>
            <Picker
              selectedValue={dietaryRestrictions}
              style={styles.picker}
              onValueChange={(itemValue) => setDietaryRestrictions(itemValue)}
            >
              <Picker.Item label="Select Restrictions" value="" />
              {dietaryRestrictionsOptions.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={generateDietPlan}
            >
              <Text style={styles.ctaButtonText}>Generate Diet Plan</Text>
            </TouchableOpacity>
          </View>

          {dietPlan && (
            <View style={styles.dietPlanContainer}>
              <Text style={styles.dietPlanTitle}>Your Weekly Diet Plan</Text>
              <Text style={styles.dietPlanText}>Goal: {dietPlan.goal}</Text>
              <Text style={styles.dietPlanText}>
                Activity Level: {dietPlan.activityLevel}
              </Text>
              <Text style={styles.dietPlanText}>
                Dietary Restrictions: {dietPlan.dietaryRestrictions}
              </Text>

              {Object.entries(dietPlan.weeklyPlan).map(([day, meals]) => (
                <View key={day} style={styles.dayContainer}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  {Object.entries(meals).map(([mealType, meal]) => (
                    <View key={mealType} style={styles.mealContainer}>
                      <Text style={styles.mealTitle}>{mealType}:</Text>
                      <Text style={styles.mealText}>{meal}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    flex: 1,
    backgroundColor: "#111214",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF", // Match your text color
  },
  pickerContainer: {
    marginBottom: 10,
    paddingHorizontal: 20, // Add horizontal padding for consistency
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#D7D8D9", // Match your label color
  },
  picker: {
    height: 60,
    borderColor: "#393C43", // Match your button background
    borderWidth: 1,
    backgroundColor: "#24262B", // Match your stat box background
    borderRadius: 5,
    color: "#FFF", // Match your text color
    paddingHorizontal: 10, // Add horizontal padding for consistency
  },
  dietPlanContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#24262B", // Match your stat box background
    borderRadius: 8,
    elevation: 3, // Keep the elevation
    marginHorizontal: 20, // Add horizontal margin for spacing
  },
  dietPlanTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#FFF", // Match your text color
  },
  dietPlanText: {
    marginBottom: 5,
    color: "#D7D8D9", // Match your text color
  },
  dayContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#393C43", // Match your secondary background
    borderRadius: 5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF", // Match your text color
  },
  mealContainer: {
    marginBottom: 5,
  },
  mealTitle: {
    fontWeight: "bold",
    color: "#FFF", // Match your text color
  },
  mealText: {
    marginLeft: 5,
    color: "#D7D8D9", // Match your text color
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111214", // Match your background
  },
  loadingText: {
    fontSize: 18,
    color: "#FFF", // Match your text color
  },
  ctaButton: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginBottom: 100,
  },
  ctaButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Diet;
