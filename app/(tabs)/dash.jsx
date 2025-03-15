import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Card, FAB } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;
const workouts = [
  {
    id: "1",
    name: "Push-ups",
    duration: 30,
    image: require("../../assets/images/img1.png"),
  },
  {
    id: "2",
    name: "Squats",
    duration: 45,
    image: require("../../assets/images/img2.png"),
  },
  {
    id: "3",
    name: "Jumping Jacks",
    duration: 60,
    image: require("../../assets/images/img4.png"),
  },
  {
    id: "4",
    name: "Plank",
    duration: 40,
    image: require("../../assets/images/img4.png"),
  },
];
const dailyData = [
  { id: "1", label: "Steps", value: 85, goal: 100 },
  { id: "2", label: "Calories Burned", value: 550, goal: 700 },
  { id: "3", label: "Water Intake", value: 2.5, goal: 3 },
  { id: "4", label: "Sleep", value: 6.5, goal: 8 },
];

const monthlyData = [
  { id: "1", label: "Steps", value: 255000, goal: 300000 },
  { id: "2", label: "Calories Burned", value: 16500, goal: 21000 },
  { id: "3", label: "Water Intake", value: 75, goal: 90 },
  { id: "4", label: "Sleep", value: 195, goal: 240 },
];

const Dash = () => {
  const [selectedTab, setSelectedTab] = useState("daily");
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!activeWorkout || timeLeft <= 0 || isPaused) {
      if (timeLeft === 0 && activeWorkout) {
        setCompletedWorkouts((prev) => [...prev, activeWorkout.id]);
        setActiveWorkout(null);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeWorkout, timeLeft, isPaused]);

  const startWorkout = (workout) => {
    setActiveWorkout(workout);
    setTimeLeft(workout.duration);
    setIsPaused(false);
  };

  const pauseResumeWorkout = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dashboard</Text>
        <View style={styles.tabContainer}>
          {["Workout", "Daily", "Monthly"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                selectedTab.toLowerCase() === tab.toLowerCase() &&
                  styles.activeTab,
              ]}
              onPress={() => setSelectedTab(tab.toLowerCase())}
            >
              <Text
                style={
                  selectedTab.toLowerCase() === tab.toLowerCase()
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

      {selectedTab === "workout" ? (
        <FlatList
          style={styles.workoutList}
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.workoutContainer}>
                  <Image source={item.image} style={styles.workoutImage} />
                  <View style={styles.workoutSubContainer}>
                    <Text style={styles.workoutName}>{item.name}</Text>
                    <Text style={styles.tabText}>
                      ({item.duration} seconds)
                    </Text>
                    <View style={styles.workoutControlContainer}>
                      {completedWorkouts.includes(item.id) ? (
                        <Text style={styles.completedText}>Completed</Text>
                      ) : (
                        <View style={styles.workoutControl}>
                          {activeWorkout?.id === item.id ? (
                            <Text style={styles.timerText}>
                              {`Time left: ${timeLeft}s`}
                            </Text>
                          ) : (
                            <Button
                              title="Start"
                              onPress={() => startWorkout(item)}
                            />
                          )}
                          {activeWorkout?.id === item.id && (
                            <Button
                              title={isPaused ? "Resume" : "Pause"}
                              onPress={pauseResumeWorkout}
                            />
                          )}
                        </View>
                      )}
                      <Button
                        title="Details"
                        style={styles.dButton}
                        onPress={() =>
                          navigation.navigate("WorkoutDetails", item)
                        }
                      />
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      ) : (
        <FlatList
          data={selectedTab === "daily" ? dailyData : monthlyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.label}>{item.label}</Text>
                <PieChart
                  data={[
                    {
                      name: "Completed",
                      population: item.value,
                      color: "#4CAF50",
                      legendFontColor: "#fff",
                      legendFontSize: 12,
                    },
                    {
                      name: "Remaining",
                      population: item.goal - item.value,
                      color: "#D3D3D3",
                      legendFontColor: "#fff",
                      legendFontSize: 12,
                    },
                  ]}
                  width={screenWidth - 60}
                  height={150}
                  chartConfig={{
                    backgroundGradientFrom: "#1E1E1E",
                    backgroundGradientTo: "#1E1E1E",
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </Card.Content>
            </Card>
          )}
        />
      )}
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
  workoutContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  workoutSubContainer: {
    flex: 1,
    paddingLeft: 30,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
  workoutImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  workoutControlContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  workoutControl: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  completedText: { fontSize: 16, fontWeight: "bold", color: "#4CAF50" },
  timerText: { fontSize: 18, color: "#D32F2F", fontWeight: "bold" },
});

export default Dash;
