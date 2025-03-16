import fit from "@/assets/images/img4.png";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";
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

const Gender = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);
  const updateGender = async () => {
    try {
      const auth = getAuth(app);
      await auth.authStateReady(); // Wait for auth state to be ready
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("No authenticated user found.");
        return;
      }

      const db = getFirestore(app);
      const colRef = collection(db, "Users");
      const q = query(colRef, where("userId", "==", userId), limit(1));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("User document not found in Firestore.");
        return;
      }

      const docRef = doc(db, "Users", querySnapshot.docs[0].id);
      await updateDoc(docRef, { gender: selectedGender });

      console.log("Gender updated successfully.");
      navigation.navigate("bmi");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Select Your Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === "male" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("male")}
            >
              <FontAwesome name="mars" size={60} color="white" />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                selectedGender === "female" && styles.selectedButton,
              ]}
              onPress={() => setSelectedGender("female")}
            >
              <FontAwesome name="venus" size={60} color="white" />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, !selectedGender && styles.disabledButton]}
            onPress={updateGender}
            disabled={!selectedGender}
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
    alignItems: "center",
    gap: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  genderContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  genderButton: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: "#F97316",
  },
  genderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "#1A1A1A",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Gender;
