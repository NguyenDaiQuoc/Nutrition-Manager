import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import CameraScreen from '../screens/CameraScreen';
import HealthScreen from '../screens/HealthScreen';
import IntroScreen from '../screens/IntroScreen';
import TermsScreen from "../screens/TermsOfUseScreen";
import PolicyScreen from "../screens/PrivacyPolicyScreen";
import GetInfoScreen from '../screens/GetInfoScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BlogScreen from '../screens/BlogScreen';
import ScanScreen from '../screens/ScanScreen';
import RecipesScreen from '../screens/RecipesScreen';
import TestLottieScreen from "../screens/TestLottieScreen";
import CreatePostScreen from '../screens/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import MainTabNavigator from './MainTabNavigator'; 

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Camera: undefined;
  Health: undefined;
  Intro: undefined;
  Home: { userInfo: any }; // 👈 truyền userInfo từ GetInfoScreen
  Profile: undefined;
  Blog: undefined;
  Scan: undefined;
  Recipes: undefined;
  TestLottie: undefined;
  Terms: undefined;
  Policy: undefined;
  GetInfo: undefined;
  CreatePost: undefined;
  PostDetail: { postId: string };
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
          {/* <Stack.Screen name="TestLottie" component={TestLottieScreen} /> */}
          {/* <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="Policy" component={PolicyScreen} />
          <Stack.Screen name="GetInfo" component={GetInfoScreen} /> */}
          {/* 👇 Thay HomeScreen bằng MainTabNavigator */}
          <Stack.Screen name="Home" component={MainTabNavigator} initialParams={{ userInfo: {} }} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Health" component={HealthScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
