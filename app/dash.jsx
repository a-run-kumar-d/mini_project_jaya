import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Card, FAB } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

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

const workouts = [
  { id: "1", name: "Push-ups", duration: 30 },
  { id: "2", name: "Squats", duration: 45 },
  { id: "3", name: "Jumping Jacks", duration: 60 },
  { id: "4", name: "Plank", duration: 40 },
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
      <Text style={styles.header}>Fitness Dashboard</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "workout" && styles.activeTab]}
          onPress={() => setSelectedTab("workout")}
        >
          <Text style={styles.tabText}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "daily" && styles.activeTab]}
          onPress={() => setSelectedTab("daily")}
        >
          <Text style={styles.tabText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "monthly" && styles.activeTab]}
          onPress={() => setSelectedTab("monthly")}
        >
          <Text style={styles.tabText}>Monthly</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === "workout" ? (
        <>
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.workoutName}>{item.name}</Text>
                {completedWorkouts.includes(item.id) ? (
                  <Text style={styles.completedText}>Completed</Text>
                ) : activeWorkout?.id === item.id ? (
                  <Button title={isPaused ? "Resume" : "Pause"} onPress={pauseResumeWorkout} />
                ) : (
                  <Button title="Start" onPress={() => startWorkout(item)} />
                )}
              </View>
            )}
          />
          {activeWorkout && (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                {`Time left for ${activeWorkout.name}: ${timeLeft}s`}
              </Text>
            </View>
          )}
        </>
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
                    { name: "Completed", population: item.value, color: "#4CAF50", legendFontColor: "#000", legendFontSize: 12 },
                    { name: "Remaining", population: item.goal - item.value, color: "#D3D3D3", legendFontColor: "#000", legendFontSize: 12 },
                  ]}
                  width={screenWidth - 60}
                  height={150}
                  chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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

      {/* Floating Action Button for Chat Navigation */}
      <FAB
        style={styles.fab}
        icon="chat"
        onPress={() => navigation.navigate("Chat")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#E3F2FD" },
  header: { fontSize: 26, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#1E88E5" },
  tabContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 15 },
  tab: { padding: 10, marginHorizontal: 5, borderBottomWidth: 2, borderBottomColor: "transparent" },
  activeTab: { borderBottomColor: "#1E88E5" },
  tabText: { fontSize: 18, fontWeight: "bold", color: "#1E88E5" },
  card: { backgroundColor: "#FFF", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  label: { fontSize: 18, fontWeight: "600" },
  workoutName: { fontSize: 18, fontWeight: "600" },
  completedText: { fontSize: 16, fontWeight: "bold", color: "green" },
  timerContainer: { marginTop: 20, alignItems: "center" },
  timerText: { fontSize: 20, fontWeight: "bold", color: "#D32F2F" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1E88E5",
  },
});

export default Dash;
