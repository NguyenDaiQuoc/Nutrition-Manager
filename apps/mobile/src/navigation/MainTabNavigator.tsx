import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import CommunityScreen from "../screens/Community/CommunityScreen";
import BlogScreen from "../screens/BlogScreen";
import ScanScreen from "../screens/ScanScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import RecipesScreen from "../screens/RecipesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#43b0e2",
        tabBarInactiveTintColor: "#888",
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Community":
              iconName = focused ? "people" : "people-outline";
              break;
            case "Blog":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Scan":
              return (
                <View
                  style={{
                    backgroundColor: "#43b0e2",
                    borderRadius: 10,
                    padding: 10,
                    width: 45,
                    marginTop: -20,
                  }}
                >
                  <Ionicons name="barcode-outline" color="#000" size={26} />
                </View>
              );
            case "Workout":
              iconName = focused ? "barbell" : "barbell-outline";
              break;
            case "Recipes":
              iconName = focused ? "restaurant" : "restaurant-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Recipes" component={RecipesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
