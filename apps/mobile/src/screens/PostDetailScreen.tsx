import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PostDetailScreen({ route, navigation }: any) {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Image source={{ uri: post.image }} style={styles.image} />
      <Text style={styles.user}>{post.user}</Text>
      <Text style={styles.time}>{post.time}</Text>
      <Text style={styles.caption}>{post.caption}</Text>

      <View style={styles.footer}>
        <Ionicons name="heart-outline" size={24} color="#ff5c5c" />
        <Ionicons name="chatbubble-outline" size={24} color="#43b0e2" style={{ marginLeft: 12 }} />
        <Ionicons name="share-social-outline" size={24} color="#43b0e2" style={{ marginLeft: 12 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  backBtn: { marginBottom: 10 },
  image: { width: "100%", height: 250, borderRadius: 10 },
  user: { fontWeight: "600", fontSize: 18, marginTop: 10 },
  time: { color: "#999", fontSize: 13, marginBottom: 6 },
  caption: { fontSize: 16, color: "#333", marginBottom: 20 },
  footer: { flexDirection: "row", marginTop: 10 },
});
