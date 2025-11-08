import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommunityFeed from "./CommunityFeed";
import CommunityExplore from "./CommunityExplore";
import { useNavigation } from "@react-navigation/native";

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<"feed" | "explore">("feed");
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Header tab */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "feed" && styles.activeTab]}
          onPress={() => setActiveTab("feed")}
        >
          <Text style={[styles.tabText, activeTab === "feed" && styles.activeText]}>
            Bài viết
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "explore" && styles.activeTab]}
          onPress={() => setActiveTab("explore")}
        >
          <Text style={[styles.tabText, activeTab === "explore" && styles.activeText]}>
            Khám phá
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung tab */}
      <View style={styles.content}>
        {activeTab === "feed" ? <CommunityFeed /> : <CommunityExplore />}
      </View>

      {/* Floating Action Button (hiện khi ở tab Feed) */}
      {activeTab === "feed" && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 25,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#43b0e2",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  activeText: {
    color: "#43b0e2",
    fontWeight: "700",
  },
  content: { flex: 1 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 25,
    backgroundColor: "#43b0e2",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
