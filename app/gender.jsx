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

const Gender = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);

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
            style={styles.button}
            onPress={() => navigation.navigate("bmi")}
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
    height: "50%",
    paddingVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#007BFF",
  },
  genderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "semibold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#1A1A1A",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Gender;
