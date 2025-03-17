import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";

type TabIconsProps = {
  icon: string;
  color: string;
  name: string;
  focused: boolean;
  main?: boolean;
};

const TabIcons = (props: TabIconsProps) => {
  if (props.main === true) {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 60,
          width: 60,
          backgroundColor: "#fff",
          gap: 5,
          marginBottom: 50,
          borderRadius: 50,
        }}
      >
        <FontAwesome5 name={props.icon} size={25} color="#121215" />
      </View>
    );
  } else {
    return (
      <View
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FontAwesome5
          name={props.icon}
          size={20}
          color={props.color}
          style={styles.icon}
        />
        <Text
          style={{
            fontSize: 12,
            color: props.color,
          }}
        >
          {props.name}
        </Text>
      </View>
    );
  }
};

const tabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#121215",
          tabBarStyle: {
            paddingHorizontal: 40,
            display: "flex",
            alignItems: "stretch",
            backgroundColor: "#3E3E43",
            height: 75,
            paddingTop: 5,
            borderColor: "#121215",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                icon="home"
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="dash"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcons
                icon="user"
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default tabsLayout;

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
  },
});
