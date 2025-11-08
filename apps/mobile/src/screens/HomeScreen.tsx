import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [water, setWater] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [meals, setMeals] = useState<any[]>([]); // Danh sách món ăn trong ngày
  const totalWater = 2364;
  const maxGlasses = 8;

  const user = { gender: "male", weight: 60, height: 160, age: 20, goal: "maintain" };
  const BMR =
    user.gender === "male"
      ? 66 + 13.7 * user.weight + 5 * user.height - 6.8 * user.age
      : 655 + 9.6 * user.weight + 1.8 * user.height - 4.7 * user.age;
  const kcalNeed = Math.round(BMR * 1.55);
  const kcalIn = meals.reduce((sum, m) => sum + m.kcal, 0);
  const kcalOut = 100;
  const progress = Math.min((kcalIn / kcalNeed) * 100, 100);

  const carbs = Math.round((kcalNeed * 0.5) / 4);
  const protein = Math.round((kcalNeed * 0.25) / 4);
  const fat = Math.round((kcalNeed * 0.25) / 9);

  // 🕓 Format và tính ngày tương đối
  const formatDate = (d: Date) => `${d.getDate()} thg ${d.getMonth() + 1}`;
  const getRelativeDay = (d: Date) => {
    const today = new Date();
    const diffDays = Math.floor((d.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 3600 * 24));

    if (diffDays === 0) return "Hôm nay";
    if (diffDays === -1) return "Hôm qua";
    if (diffDays === -2) return "Hôm kia";
    if (diffDays < -2 && diffDays >= -7) return `${Math.abs(diffDays)} ngày trước`;
    if (diffDays === 1) return "Ngày mai";
    if (diffDays === 2) return "Ngày mốt";
    if (diffDays > 2 && diffDays <= 7) return `Trong ${diffDays} ngày tới`;
    return diffDays < 0 ? "Thời gian trước" : "Thời gian tới";
  };

  const handleConfirm = (selectedDate: Date) => {
    setPickerVisible(false);
    setDate(selectedDate);
  };

  const resetToToday = () => setDate(new Date());

  // Thêm món ăn (mock tạm)
  const addMeal = () => {
    const newMeal = {
      id: Date.now().toString(),
      name: "Cơm gà xối mỡ",
      kcal: 550,
      type: "Bữa trưa",
    };
    setMeals((prev) => [...prev, newMeal]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{getRelativeDay(date)}</Text>
          </View>
          <View style={styles.dateNav}>
            <TouchableOpacity
              onPress={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
            >
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </TouchableOpacity>

            {/* Khi bấm vào ngày → về hôm nay */}
            <TouchableOpacity onPress={resetToToday} style={styles.dateButton}>
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </TouchableOpacity>

            {/* Bấm vào calendar → mở picker */}
            <TouchableOpacity onPress={() => setPickerVisible(true)}>
              <Ionicons name="calendar-outline" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
            >
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
            <Text style={styles.kcalSubText}>
              {kcalIn}
              {"\n"}
              <Text style={styles.kcalSmall}>đã nạp</Text>
            </Text>
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
            <Text style={styles.kcalSubText}>
              {kcalOut}
              {"\n"}
              <Text style={styles.kcalSmall}>tiêu hao</Text>
            </Text>
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
            {Array.from({ length: maxGlasses }).map((_, i) => {
              const glassVolume = totalWater / maxGlasses;
              const filledGlasses = Math.round(water / glassVolume);
              const isFilled = i < filledGlasses;

              const onPressGlass = () => {
                // Chuyển logic sang toggle từng ly độc lập
                const glassAmount = totalWater / maxGlasses;
                const numFilled = Math.round(water / glassAmount);
                const filledArray = Array.from({ length: maxGlasses }, (_, idx) => idx < numFilled);

                // Toggle trạng thái của ly hiện tại
                filledArray[i] = !filledArray[i];

                // Tính lại tổng lượng nước sau khi toggle
                const newWater = filledArray.filter(Boolean).length * glassAmount;
                setWater(newWater);
              };

              return (
                <TouchableOpacity key={i} onPress={onPressGlass}>
                  <MaterialCommunityIcons
                    name={isFilled ? "cup" : "cup-outline"}
                    size={28}
                    color={isFilled ? "#43b0e2" : "#555"}
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Meals section */}
        {meals.length > 0 && (
          <View style={styles.mealContainer}>
            <Text style={styles.sectionTitle}>🍽️ Thực đơn hôm nay</Text>
            {meals.map((m) => (
              <View key={m.id} style={styles.mealItem}>
                <Text style={styles.mealName}>
                  {m.type}: {m.name}
                </Text>
                <Text style={styles.mealKcal}>{m.kcal} kcal</Text>
              </View>
            ))}
          </View>
        )}

        {/* Health sync section */}
        <View style={styles.healthContainer}>
          <Text style={styles.sectionTitle}>💓 Đồng bộ với Health App</Text>
          <Text style={styles.healthText}>
            Dữ liệu sức khỏe sẽ được đồng bộ với Apple Health / Samsung Health để
            cập nhật hoạt động, giấc ngủ và năng lượng tiêu hao.
          </Text>
          <TouchableOpacity style={styles.syncButton}>
            <Ionicons name="sync-outline" size={18} color="#fff" />
            <Text style={styles.syncText}>Đồng bộ ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating add button */}
      <TouchableOpacity style={styles.addButton} onPress={addMeal}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 60, paddingHorizontal: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700", color: "#fff" },
  dateNav: { flexDirection: "row", alignItems: "center" },
  dateButton: { marginHorizontal: 8 },
  dateText: { color: "#fff", fontSize: 16 },
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
  macros: { flexDirection: "row", justifyContent: "space-around", marginTop: 12, width: "100%" },
  macroText: { color: "#aaa", fontSize: 14 },
  waterContainer: { marginTop: 30 },
  waterTitle: { color: "#fff", fontSize: 16, marginBottom: 10 },
  waterGoal: { color: "#43b0e2", fontWeight: "600" },
  glassesRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center" },
  mealContainer: { marginTop: 30 },
  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  mealName: { color: "#fff", fontSize: 15 },
  mealKcal: { color: "#43b0e2", fontWeight: "600" },
  healthContainer: { marginTop: 30, marginBottom: 80 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 10 },
  healthText: { color: "#aaa", fontSize: 14, lineHeight: 20 },
  syncButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#43b0e2",
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  syncText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
  addButton: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#43b0e2",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#43b0e2",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});
