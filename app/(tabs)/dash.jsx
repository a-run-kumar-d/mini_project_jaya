import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  const [expandedExerciseId, setExpandedExerciseId] = useState(null); // Track the ID of the expanded exercise
  const [loading, setLoading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [gif, setGif] = useState(null);

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setLoading(true); // Set loading to true before fetching data

          const usersCollection = collection(db, "Users");
          const q = query(usersCollection, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            setLoading(false); // Set loading to false if no user found
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

            // Fetch workout details concurrently using Promise.all
            const workoutDetailsPromises = todayExercises.map(async (id) => {
              const response = await fetch(
                `https://exercisedb-api.vercel.app/api/v1/exercises/${id}`
              );
              const data = await response.json();
              return data; // Return the entire data object
            });

            const workoutDetails = await Promise.all(workoutDetailsPromises);

            // Extract the data.data part after all promises are resolved
            const extractedWorkoutDetails = workoutDetails.map(
              (item) => item.data
            );
            setTodayWorkoutDetails(extractedWorkoutDetails);

            console.log(todayExercises, workouts.slice(1, 6));
          }
          setLoading(false); // Set loading to false after all data is fetched and processed
        } else {
          setLoading(false); // Set loading to false if no user is logged in
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchWorkouts();
  }, []);

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
            <TouchableOpacity
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
                        Muscles: {item.targetMuscles.join(", ")}
                      </Text>
                      <Text style={styles.exerciseText}>
                        Equipment: {item.equipments.join(", ")}
                      </Text>
                      <Button title="Start" onPress={() => {}} />
                    </>
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          previousWorkoutDetails.map((item, index) => (
            <TouchableOpacity key={index}>
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.workoutDate}>{item.timestamp}</Text>
                  {item.exercises.map((exercise, exerciseIndex) => (
                    <Text key={exerciseIndex}>{exercise}</Text>
                  ))}
                </Card.Content>
              </Card>
            </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  exerciseText: {
    color: "#D7D8D9",
    fontSize: 16,
    marginBottom: 5,
  },
  workoutDate: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  scrollContainer: {
    flex: 1, // Ensure the scroll container takes up remaining space
  },
});

export default Dash;
