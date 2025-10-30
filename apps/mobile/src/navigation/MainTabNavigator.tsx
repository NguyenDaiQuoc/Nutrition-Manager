import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import BlogScreen from "../screens/BlogScreen";
import ScanScreen from "../screens/ScanScreen";
import RecipesScreen from "../screens/RecipesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#00C853",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#111",
          borderTopColor: "#222",
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Blog") iconName = "newspaper-outline";
          else if (route.name === "Scan") iconName = "barcode-outline";
          else if (route.name === "Recipes") iconName = "fast-food-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Recipes" component={RecipesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
