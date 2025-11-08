import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const exploreData = [
  {
    id: "1",
    title: "5 thực phẩm vàng giúp ngủ ngon hơn 🌙",
    image: "https://images.unsplash.com/photo-1556911073-52527ac437f5",
  },
  {
    id: "2",
    title: "Thực đơn giảm mỡ 7 ngày hiệu quả nhanh 🔥",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: "3",
    title: "Cách kết hợp protein và rau củ đúng cách 🥗",
    image: "https://images.unsplash.com/photo-1601050690597-7d3a1cd0b6a0",
  },
];

export default function CommunityExplore() {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return <FlatList data={exploreData} renderItem={renderItem} keyExtractor={(item) => item.id} />;
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "#000",
  },
  image: { width: "100%", height: 180 },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
