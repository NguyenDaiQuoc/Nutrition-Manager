import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import CameraScreen from '../screens/CameraScreen';
import HealthScreen from '../screens/HealthScreen';
import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BlogScreen from '../screens/BlogScreen';
import ScanScreen from '../screens/ScanScreen';
import RecipesScreen from '../screens/RecipesScreen';
import MainTabNavigator from './MainTabNavigator'; // 👈 thay vì HomeScreen

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Camera: undefined;
  Health: undefined;
  Intro: undefined;
  Home: undefined;
  Profile: undefined;
  Blog: undefined;
  Scan: undefined;
  Recipes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : (
        <>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          {/* 👇 Thay HomeScreen bằng MainTabNavigator */}
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Health" component={HealthScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
