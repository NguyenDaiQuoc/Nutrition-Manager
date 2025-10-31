import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function TestLottieScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Lottie Animation</Text>

      <LottieView
        source={require("../../assets/animations/food.json")}
        autoPlay
        loop
        style={styles.animation}
        resizeMode="contain"
      />

      <Text style={styles.note}>
        Nếu bạn thấy animation chuyển động → file hoạt động tốt ✅
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 20,
  },
  animation: {
    width: 300,
    height: 300,
  },
  note: {
    marginTop: 20,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
});
