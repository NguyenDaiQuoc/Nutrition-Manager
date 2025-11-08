import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreatePostScreen({ navigation }: any) {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tạo bài viết mới</Text>

      <TextInput
        placeholder="Nội dung bài viết..."
        value={caption}
        onChangeText={setCaption}
        multiline
        style={styles.input}
      />

      <TextInput
        placeholder="URL hình ảnh (tùy chọn)"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />

      <TouchableOpacity style={styles.postButton} onPress={() => navigation.goBack()}>
        <Ionicons name="send" color="#fff" size={20} />
        <Text style={styles.postText}>Đăng bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 40 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
  },
  postButton: {
    flexDirection: "row",
    backgroundColor: "#43b0e2",
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  postText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
});
