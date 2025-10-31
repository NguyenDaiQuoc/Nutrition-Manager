// src/screens/HomeScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [water, setWater] = useState(0);
  const totalWater = 2364; // ml
  const maxGlasses = 8;

  const foods = [
    { id: "1", name: "Cơm gà xối mỡ", kcal: 520 },
    { id: "2", name: "Bún bò Huế", kcal: 430 },
    { id: "3", name: "Salad ức gà", kcal: 270 },
  ];

  const progress = 0; // phần trăm kcal nạp
  const kcalNeed = 2635;
  const kcalIn = 0;
  const kcalOut = 1;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hôm nay</Text>
        <View style={styles.dateNav}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
          <TouchableOpacity style={styles.dateButton}>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            <Text style={styles.dateText}>30 thg 10</Text>
          </TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </View>
      </View>

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
                <Text style={styles.kcalSmall}>cần nạp</Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.kcalSubText}>{kcalOut}{"\n"}<Text style={styles.kcalSmall}>tiêu hao</Text></Text>
        </View>

        {/* Macros */}
        <View style={styles.macros}>
          <Text style={styles.macroText}>Carbs  0 / 231</Text>
          <Text style={styles.macroText}>Chất đạm  0 / 231</Text>
          <Text style={styles.macroText}>Chất béo  0 / 88</Text>
        </View>
      </View>

      {/* Water tracker */}
      <View style={styles.waterContainer}>
        <Text style={styles.waterTitle}>
          Bạn đã uống bao nhiêu nước{" "}
          <Text style={styles.waterGoal}>{water}/{totalWater} ml</Text>
        </Text>

        <View style={styles.glassesRow}>
          {Array.from({ length: maxGlasses }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setWater((prev) => Math.min(totalWater, prev + totalWater / maxGlasses))}
            >
              <MaterialCommunityIcons
                name={i < water / (totalWater / maxGlasses) ? "cup" : "cup-outline"}
                size={28}
                color={i < water / (totalWater / maxGlasses) ? "#43b0e2ff" : "#555"}
                style={{ marginHorizontal: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#28a745",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
