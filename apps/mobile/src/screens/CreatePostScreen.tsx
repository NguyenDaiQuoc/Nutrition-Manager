// src/screens/CreatePostScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function CreatePostScreen() {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string>("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    // logic đăng bài
    console.log({ content, images, tags });
    alert("Bài viết đã được đăng!");
    setContent("");
    setImages([]);
    setTags("");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tạo bài viết mới</Text>
      </View>

      {/* Text Input */}
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Bạn đang nghĩ gì?"
        placeholderTextColor={"#999"}
        value={content}
        onChangeText={setContent}
      />

      {/* Thêm ảnh */}
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeImage(index)}
            >
              <Ionicons name="close-circle" size={22} color="red" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addImage} onPress={pickImage}>
          <Ionicons name="image-outline" size={30} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Thẻ tag */}
      <TextInput
        style={styles.tagInput}
        placeholder="Thêm thẻ (ví dụ: #food #travel)"
        value={tags}
        onChangeText={setTags}
      />

      {/* Button đăng bài */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Đăng bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 30,
    textAlign:"center"
  },

  header: {
    marginBottom: 18,
  },
  
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 115,
  },
  
  textInput: {
    minHeight: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 16,
    color: "#333",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeBtn: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  addImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  tagInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
