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
import { getAuth } from "firebase/auth";
import app from "@/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  limit, // Added limit for efficiency
} from "firebase/firestore";

const Height = () => {
  const navigation = useNavigation();
  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const convertHeight = (value, isMetric) =>
    !value ? "" : isMetric ? value : (parseFloat(value) * 0.393701).toFixed(2);

  const convertWeight = (value, isMetric) =>
    !value ? "" : isMetric ? value : (parseFloat(value) * 2.20462).toFixed(2);

  const handleHeightChange = (value) =>
    setHeight(
      !value ? "" : isMetric ? value : (parseFloat(value) / 0.393701).toFixed(2)
    );

  const handleWeightChange = (value) =>
    setWeight(
      !value ? "" : isMetric ? value : (parseFloat(value) / 2.20462).toFixed(2)
    );

  const updateHeightAndWeight = async () => {
    try {
      const auth = getAuth(app);
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("No authenticated user found.");
        return;
      }

      const db = getFirestore(app);
      const colRef = collection(db, "Users");
      const q = query(colRef, where("userId", "==", userId), limit(1)); // Added limit(1) to improve efficiency
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User document not found in Firestore.");
        return;
      }

      const docRef = doc(db, "Users", querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        height: convertHeight(height, isMetric),
        weight: convertWeight(weight, isMetric),
      });

      console.log("User height and weight updated successfully in Firestore.");
      navigation.navigate("gender");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Enter Your Details</Text>

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

          <TextInput
            style={styles.input}
            placeholder={isMetric ? "Enter height (cm)" : "Enter height (in)"}
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />

          <TextInput
            style={styles.input}
            placeholder={isMetric ? "Enter weight (kg)" : "Enter weight (lb)"}
            placeholderTextColor="#ccc"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={updateHeightAndWeight}
          >
            <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    borderRadius: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#F97316",
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Height;
