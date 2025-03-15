import fit from "@/assets/images/img2.png";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";

const NameAge = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNameAge, setShowNameAge] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create Your Account</Text>
          {showNameAge && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#ccc"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your age"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </>
          )}
          {showEmail && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (showNameAge) {
                setShowEmail(true);
                setShowNameAge(false);
              } else {
                navigation.navigate("height");
              }
            }}
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
});

export default NameAge;
