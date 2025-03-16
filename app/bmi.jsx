import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Circle, Line, Path, Svg } from "react-native-svg";
import { getAuth } from "firebase/auth";
import app from "@/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

const { width } = Dimensions.get("window");

const Bmi = () => {
  const navigation = useNavigation();
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(app);
        const userId = auth.currentUser?.uid;
        if (userId) {
          const db = getFirestore(app);
          const colref = collection(db, "Users");
          const q = query(colref, where("userId", "==", userId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data();
            setHeight(data.height);
            setWeight(data.weight);
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    }
  }, [height, weight]);

  const calculateBMI = async () => {
    const h = height / 100;
    const w = weight;
    const bmiValue = (w / (h * h)).toFixed(2);
    setBmi(parseFloat(bmiValue));

    let bmiStatus = "";
    if (bmiValue < 18.5) bmiStatus = "Underweight";
    else if (bmiValue < 25) bmiStatus = "Normal";
    else if (bmiValue < 30) bmiStatus = "Overweight";
    else bmiStatus = "Obese";

    setStatus(bmiStatus);

    try {
      const auth = getAuth(app);
      const userId = auth.currentUser?.uid;
      if (userId) {
        const db = getFirestore(app);
        const colref = collection(db, "Users");
        const q = query(colref, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docRef = doc(db, "Users", querySnapshot.docs[0].id);
          await updateDoc(docRef, { BMIstatus: bmiStatus });
        }
      }
    } catch (error) {
      console.error("Error updating BMI status: ", error);
    }
  };

  const minBMI = 10,
    maxBMI = 40;
  const normalizedBmi = Math.max(minBMI, Math.min(bmi || minBMI, maxBMI));
  const bmiAngle = ((normalizedBmi - minBMI) / (maxBMI - minBMI)) * 90;

  return (
    <View style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>How is your BMI?</Text>
        <View style={styles.chartContainer}>
          <Svg width={width * 0.8} height={150} viewBox="0 0 200 100">
            <Path
              d="M10,100 A90,90 0 0,1 190,100"
              fill="none"
              stroke="#ddd"
              strokeWidth="15"
            />
            <Path
              d="M10,100 A90,90 0 0,1 45,30"
              fill="none"
              stroke="#ADD8E6"
              strokeWidth="15"
            />
            <Path
              d="M45,30 A96,120 0 0,1 100,10"
              fill="none"
              stroke="#90EE90"
              strokeWidth="15"
            />
            <Path
              d="M100,10 A90,90 0 0,1 145,23"
              fill="none"
              stroke="#FFA07A"
              strokeWidth="15"
            />
            <Path
              d="M145,23 A130,95 0 0,1 180,120"
              fill="none"
              stroke="#FF6347"
              strokeWidth="15"
            />
            <Line
              x1="100"
              y1="100"
              x2={100 + 80 * Math.cos((bmiAngle - 90) * (Math.PI / 90))}
              y2={100 + 80 * Math.sin((bmiAngle - 90) * (Math.PI / 90))}
              stroke="#D7D8D9"
              strokeWidth="3"
            />
            <Circle cx="100" cy="100" r="5" fill="#D7D8D9" />
          </Svg>
        </View>
        <Text style={styles.selectedText}>{bmi ?? "--"}</Text>
        <Text style={styles.statusText}>[ {status} ]</Text>
        <Text style={styles.description}>
          Your BMI is calculated based on height and weight. Keep tracking to
          stay healthy.
        </Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("hard")}
        >
          <Text style={styles.nextButtonText}>What to do now ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#111214",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  bottomContainer: {
    position: "absolute",
    top: "25%",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 30,
  },
  chartContainer: {
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 35,
    color: "#D7D8D9",
  },
  nextButton: {
    height: 72,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Bmi;
