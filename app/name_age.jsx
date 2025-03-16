import fit from "@/assets/images/img2.png";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import "react-native-gesture-handler";
import { Link, router, useLocalSearchParams } from "expo-router";
import app from "@/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getFirestore,
} from "firebase/firestore";

const NameAge = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNameAge, setShowNameAge] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();
  const handleNext = () => {
    if (showNameAge) {
      const nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
      const ageRegex = /^\d+$/;
      if (!nameRegex.test(name)) {
        setNameError("Name should only contain letters and spaces");
      } else if (!ageRegex.test(age)) {
        setAgeError("Age should only contain numbers");
      } else {
        setShowEmail(true);
        setShowNameAge(false);
        setNameError("");
        setAgeError("");
      }
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setEmailError("Email is invalid");
      } else {
        setLoading(true);
        const db = getFirestore(app);
        const colRef = collection(db, "Users");
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            addDoc(colRef, {
              userId: userCredential.user.uid,
              name: name,
              age: age,
              email: email,
              hasWorkoutPlan: false,
            })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
            const user = userCredential.user;
            console.log(user);
            router.replace("/height");
          })
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Error", errorMessage);
          });
        // setTimeout(() => {
        //   console.log("Name:", name);
        //   console.log("Age:", age);
        //   console.log("Email:", email);
        //   console.log("Password:", password);
        //   setLoading(false);
        //   navigation.navigate("height");
        // }, 2000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create Your Account</Text>
          {showNameAge && (
            <>
              <TextInput
                style={[styles.input, nameError && { borderColor: "red" }]}
                placeholder="Enter your name"
                placeholderTextColor="#ccc"
                value={name}
                onChangeText={setName}
              />
              {nameError && <Text style={styles.error}>{nameError}</Text>}
              <TextInput
                style={[styles.input, ageError && { borderColor: "red" }]}
                placeholder="Enter your age"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
              {ageError && <Text style={styles.error}>{ageError}</Text>}
            </>
          )}
          {showEmail && (
            <>
              <TextInput
                style={[styles.input, emailError && { borderColor: "red" }]}
                placeholder="Enter your email"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              {emailError && <Text style={styles.error}>{emailError}</Text>}
              <TextInput
                style={[styles.input, passwordError && { borderColor: "red" }]}
                placeholder="Enter your password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {passwordError && (
                <Text style={styles.error}>{passwordError}</Text>
              )}
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Slight dark overlay for readability
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
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default NameAge;
