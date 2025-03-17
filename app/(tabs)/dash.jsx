import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Dash = () => {
  const [selectedTab, setSelectedTab] = useState("today");
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [todayWorkoutDetails, setTodayWorkoutDetails] = useState([]);
  const [previousWorkouts, setPreviousWorkouts] = useState([]);
  const [previousWorkoutDetails, setPreviousWorkoutDetails] = useState([]);
  const [expandedExerciseId, setExpandedExerciseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timerAction, setTimerAction] = useState(false);
  const [timer, setTimer] = useState(60);
  const [gif, setGif] = useState(null);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(null);

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setLoading(true);

          const usersCollection = collection(db, "Users");
          const q = query(usersCollection, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            setLoading(false);
            return;
          }

          const userDoc = querySnapshot.docs[0];
          const workoutsCollection = collection(userDoc.ref, "Workouts");
          const workoutsSnapshot = await getDocs(workoutsCollection);

          const workouts = workoutsSnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

          if (workouts.length) {
            const todayExercises = workouts[0].exercises || [];
            setTodayWorkouts(todayExercises);
            setPreviousWorkouts(workouts.slice(1, 6));

            const workoutDetailsPromises = todayExercises.map(async (id) => {
              const response = await fetch(
                `https://exercisedb-api.vercel.app/api/v1/exercises/${id}`
              );
              const data = await response.json();
              return data;
            });

            const workoutDetails = await Promise.all(workoutDetailsPromises);
            const extractedWorkoutDetails = workoutDetails.map(
              (item) => item.data
            );
            setTodayWorkoutDetails(extractedWorkoutDetails);

            let previousDetailArray = [];
            for (let i = 0; i < previousWorkouts.length; i++) {
              const prevworkoutsDetailsPromises = previousWorkouts[
                i
              ].exercises.map(async (id) => {
                const response = await fetch(
                  `https://exercisedb-api.vercel.app/api/v1/exercises/${id}`
                );
                const data = await response.json();
                return data;
              });
              const previousDetail = await Promise.all(
                prevworkoutsDetailsPromises
              );
              const extractedPreviousDetail = previousDetail.map(
                (item) => item.data
              );

              previousDetailArray.push({
                timestamp: previousWorkouts[i].timestamp,
                exercises: extractedPreviousDetail,
              });

              setPreviousWorkoutDetails(previousDetailArray);
            }
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [selectedTab]);

  const startTimer = (index) => {
    setActiveExerciseIndex(index);
    setTimerAction(true);
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          closeTimer();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  const closeTimer = () => {
    setTimerAction(false);
    setTimer(60);
    setActiveExerciseIndex(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dashboard</Text>
        <View style={styles.tabContainer}>
          {["Today", "Previous"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab === tab.toLowerCase() && styles.activeTab,
              ]}
              onPress={() => setSelectedTab(tab.toLowerCase())}
            >
              <Text
                style={
                  selectedTab === tab.toLowerCase()
                    ? styles.activeTabText
                    : styles.tabText
                }
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading workouts...</Text>
          </View>
        ) : selectedTab === "today" ? (
          todayWorkoutDetails.map((item, index) => (
            <TouchableWithoutFeedback
              key={item.exerciseId}
              onPress={() => {
                setExpandedExerciseId(
                  expandedExerciseId === item.exerciseId
                    ? null
                    : item.exerciseId
                );
                setGif(item.gifUrl);
              }}
            >
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.workoutName}>{item.name}</Text>
                  {expandedExerciseId === item.exerciseId && (
                    <>
                      <Text style={styles.exerciseText}>
                        <Text style={styles.subText}>Muscles</Text>
                        {"  "}
                        {item.targetMuscles.join(", ")}
                      </Text>
                      <Text style={styles.exerciseText}>
                        <Text style={styles.subText}>Equipment</Text>
                        {"  "}
                        {item.equipments.join(", ")}
                      </Text>
                      <Text style={styles.intructionList}>
                        Intructions <Text>{"\n"}</Text>
                        {item.instructions.map((instruction, index) => (
                          <Text style={styles.subText} key={index}>
                            {instruction}
                            <Text>{"\n"}</Text>
                            <Text>{"\n"}</Text>
                          </Text>
                        ))}
                      </Text>

                      {activeExerciseIndex === index && timerAction && (
                        <View style={styles.timerContainer}>
                          <Text style={styles.timerText}>
                            {timer} secs remaining
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => {
                          if (activeExerciseIndex === index && timerAction) {
                            closeTimer();
                          } else {
                            startTimer(index);
                          }
                        }}
                      >
                        <Text style={styles.exerciseText}>
                          {activeExerciseIndex === index && timerAction
                            ? "Stop"
                            : "Start"}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          ))
        ) : (
          previousWorkoutDetails.map((item, index) => (
            <TouchableWithoutFeedback key={index}>
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.workoutDate}>
                    {item.timestamp.toDate().toLocaleDateString()}
                  </Text>
                  {item.exercises.map((exercise, exerciseIndex) => (
                    <Text style={styles.subText} key={exerciseIndex}>
                      {exercise.name}
                    </Text>
                  ))}
                </Card.Content>
              </Card>
            </TouchableWithoutFeedback>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111214" },
  headerContainer: {
    paddingBottom: 20,
    padding: 20,
    backgroundColor: "#393C43",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 20,
  },
  header: {
    marginTop: 30,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#24262B",
    borderRadius: 20,
    marginBottom: 25,
  },
  tab: {
    padding: 15,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: { fontSize: 18, color: "#D7D8D9" },
  activeTabText: { fontSize: 18, fontWeight: "bold", color: "#111214" },
  card: {
    marginHorizontal: 20,
    backgroundColor: "#24262B",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  exerciseImage: {
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
  },
  workoutName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  exerciseText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  intructionList: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subText: {
    color: "#D7D8D9",
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "normal",
  },
  workoutDate: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: "#F97316",
    height: 64,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  timerContainer: {
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#393C43",
    borderRadius: 10,
    alignSelf: "center",
    width: "80%",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Dash;
