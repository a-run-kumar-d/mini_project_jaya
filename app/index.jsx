import { app } from "../firebaseConfig";
import fit from "@/assets/images/img1.png";
import { Link } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={fit} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.suptitle}>Welcome To</Text>
          <Text style={styles.title}>FitFlow!</Text>
          <Text style={styles.subtitle}>
            Your personal fitness AI Assistant
          </Text>

          <TouchableOpacity style={styles.button}>
            <Link href="/name_age" style={styles.buttonText}>
              Get Started
            </Link>
          </TouchableOpacity>

          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Link href="/sign_in" style={styles.signInLink}>
              Sign In
            </Link>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24262B",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "85%",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
  },
  logo: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  suptitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "semibold",
    textAlign: "center",
    marginBottom: -10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#FFFFFF",
    letterSpacing: 5,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 50,
  },
  button: {
    width: "80%",
    height: 72,
    backgroundColor: "#F97316",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  signInLink: {
    color: "#F97316",
    fontWeight: "bold",
  },
});
