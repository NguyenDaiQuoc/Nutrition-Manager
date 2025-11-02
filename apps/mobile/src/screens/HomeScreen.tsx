import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [water, setWater] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  const totalWater = 2364;
  const maxGlasses = 8;

  // 🧮 Dữ liệu user (có thể lấy từ profile hoặc firebase sau này)
  const user = { gender: "male", weight: 60, height: 160, age: 20, goal: "maintain" };

  // 🔹 BMR (chuẩn Harris–Benedict)
  const BMR =
    user.gender === "male"
      ? 66 + 13.7 * user.weight + 5 * user.height - 6.8 * user.age
      : 655 + 9.6 * user.weight + 1.8 * user.height - 4.7 * user.age;

  // 🔹 TDEE (vận động trung bình)
  const kcalNeed = Math.round(BMR * 1.55);

  const kcalIn = 0;
  const kcalOut = 100;
  const progress = Math.min((kcalIn / kcalNeed) * 100, 100);

  // 🔹 Macro (tính theo phần trăm)
  const carbs = Math.round((kcalNeed * 0.5) / 4);
  const protein = Math.round((kcalNeed * 0.25) / 4);
  const fat = Math.round((kcalNeed * 0.25) / 9);

  const formatDate = (d: Date) => `${d.getDate()} thg ${d.getMonth() + 1}`;

  const handleConfirm = (selectedDate: Date) => {
    setPickerVisible(false);
    setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hôm nay</Text>
        <View style={styles.dateNav}>
          <TouchableOpacity onPress={() => setDate(new Date(date.setDate(date.getDate() - 1)))}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.dateButton}>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            <Text style={styles.dateText}>{formatDate(date)}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDate(new Date(date.setDate(date.getDate() + 1)))}>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Tìm món ăn, công thức..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Calories summary */}
      <View style={styles.circleContainer}>
        <View style={styles.kcalRow}>
          <Text style={styles.kcalSubText}>{kcalIn}{"\n"}<Text style={styles.kcalSmall}>đã nạp</Text></Text>
          <AnimatedCircularProgress
            size={160}
            width={10}
            fill={progress}
            tintColor="#6ee7b7"
            backgroundColor="#333"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.kcalValue}>{kcalNeed}</Text>
                <Text style={styles.kcalSmall}>kcal cần/ngày</Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.kcalSubText}>{kcalOut}{"\n"}<Text style={styles.kcalSmall}>tiêu hao</Text></Text>
        </View>

        {/* Macros */}
        <View style={styles.macros}>
          <Text style={styles.macroText}>Carbs {0} / {carbs}g</Text>
          <Text style={styles.macroText}>Đạm {0} / {protein}g</Text>
          <Text style={styles.macroText}>Béo {0} / {fat}g</Text>
        </View>
      </View>

      {/* Water */}
      <View style={styles.waterContainer}>
        <Text style={styles.waterTitle}>
          Nước: <Text style={styles.waterGoal}>{water}/{totalWater} ml</Text>
        </Text>
        <View style={styles.glassesRow}>
          {Array.from({ length: maxGlasses }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setWater(Math.min(totalWater, water + totalWater / maxGlasses))}
            >
              <MaterialCommunityIcons
                name={i < water / (totalWater / maxGlasses) ? "cup" : "cup-outline"}
                size={28}
                color={i < water / (totalWater / maxGlasses) ? "#43b0e2" : "#555"}
                style={{ marginHorizontal: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 60, paddingHorizontal: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700", color: "#fff" },
  dateNav: { flexDirection: "row", alignItems: "center" },
  dateButton: { flexDirection: "row", alignItems: "center", marginHorizontal: 6 },
  dateText: { color: "#fff", marginLeft: 6 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 14,
  },
  searchInput: { flex: 1, color: "#fff", marginLeft: 8 },
  circleContainer: { alignItems: "center", marginTop: 24 },
  kcalRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  kcalSubText: { color: "#fff", textAlign: "center", width: 60, fontSize: 16 },
  kcalValue: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  kcalSmall: { color: "#aaa", fontSize: 12 },
  macros: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    width: "100%",
  },
  macroText: { color: "#aaa", fontSize: 14 },
  waterContainer: { marginTop: 30 },
  waterTitle: { color: "#fff", fontSize: 16, marginBottom: 10 },
  waterGoal: { color: "#6ee7b7", fontWeight: "600" },
  glassesRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
});
