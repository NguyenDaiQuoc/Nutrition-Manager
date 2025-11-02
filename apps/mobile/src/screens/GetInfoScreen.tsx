// src/screens/GetInfoScreen.tsx
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

export default function GetInfoScreen({ navigation }: any) {
  const [info, setInfo] = useState({
    name: "",
    age: "",
    gender: "male",
    height: 170,
    weight: 60,
    targetWeight: 65,
    activityLevel: 1.55, // mặc định trung bình
    workoutMinutes: 30,
  });

  const handleChange = (key: string, value: any) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    navigation.navigate("Home", { userInfo: info });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <LottieView
            source={require("../../assets/animations/fitness.json")}
            autoPlay
            loop
            style={{ width: 220, height: 220 }}
          />
          <Text style={styles.title}>Cung cấp thông tin của bạn</Text>
          <Text style={styles.subtitle}>Giúp tạo kế hoạch dinh dưỡng & luyện tập phù hợp 🌱</Text>
        </View>

        <View style={styles.form}>
          <InputField label="Họ tên" icon="person-outline" value={info.name} onChange={(v) => handleChange("name", v)} />
          <InputField label="Tuổi" icon="calendar-outline" value={info.age} onChange={(v) => handleChange("age", v)} keyboardType="numeric" />

          {/* --- GENDER --- */}
          <View style={styles.genderContainer}>
            <Ionicons name="male-female-outline" size={22} color="#10b981" style={{ marginRight: 8 }} />
            <Text style={styles.sliderLabel}>Giới tính</Text>
            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[styles.genderBtn, info.gender === "male" && styles.genderActive]}
                onPress={() => handleChange("gender", "male")}
              >
                <Text style={styles.genderText}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.genderBtn, info.gender === "female" && styles.genderActive]}
                onPress={() => handleChange("gender", "female")}
              >
                <Text style={styles.genderText}>Nữ</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- SLIDER SECTIONS --- */}
          <SliderSection
            label="Chiều cao"
            unit="cm"
            value={info.height}
            min={130}
            max={220}
            step={1}
            icon="body-outline"
            onChange={(v) => handleChange("height", v)}
          />
          <SliderSection
            label="Cân nặng hiện tại"
            unit="kg"
            value={info.weight}
            min={30}
            max={150}
            step={0.5}
            icon="barbell-outline"
            onChange={(v) => handleChange("weight", v)}
          />
          <SliderSection
            label="Cân nặng mong muốn"
            unit="kg"
            value={info.targetWeight}
            min={30}
            max={150}
            step={0.5}
            icon="flag-outline"
            onChange={(v) => handleChange("targetWeight", v)}
          />

          {/* --- ACTIVITY LEVEL --- */}
          <SliderSection
            label="Mức độ vận động"
            unit={
              info.activityLevel === 1.2
                ? "Ít vận động"
                : info.activityLevel === 1.55
                ? "Trung bình"
                : "Tích cực"
            }
            value={info.activityLevel}
            min={1.2}
            max={1.725}
            step={0.175}
            icon="walk-outline"
            onChange={(v) => handleChange("activityLevel", v)}
          />

          {/* --- WORKOUT MINUTES --- */}
          <SliderSection
            label="Thời lượng tập mỗi ngày"
            unit="phút"
            value={info.workoutMinutes}
            min={0}
            max={120}
            step={5}
            icon="timer-outline"
            onChange={(v) => handleChange("workoutMinutes", v)}
          />
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
          <LinearGradient colors={["#34d399", "#059669"]} style={styles.button}>
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* Input & Slider Components */
function InputField({ label, icon, value, onChange, keyboardType = "default" }: any) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={22} color="#10b981" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
      />
    </View>
  );
}

function SliderSection({ label, unit, value, min, max, step, icon, onChange }: any) {
  return (
    <View style={styles.sliderContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Ionicons name={icon} size={22} color="#10b981" style={{ marginRight: 8 }} />
        <Text style={styles.sliderLabel}>{label}</Text>
      </View>
      <Text style={styles.sliderValue}>
        {typeof value === "number" ? value.toFixed(1) : value} {unit}
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={min}
        maximumValue={max}
        step={step}
        minimumTrackTintColor="#10b981"
        maximumTrackTintColor="#d1d5db"
        thumbTintColor="#059669"
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafb",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },
  genderContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  genderBtn: {
    borderWidth: 1,
    borderColor: "#10b981",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  genderActive: {
    backgroundColor: "#10b981",
  },
  genderText: {
    color: "#111827",
    fontWeight: "600",
  },
  sliderContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sliderLabel: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#059669",
    alignSelf: "center",
    marginBottom: 6,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
