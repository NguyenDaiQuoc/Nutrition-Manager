import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const samplePosts = [
  {
    id: "1",
    user: "Ngọc Linh",
    avatar: "https://i.pravatar.cc/150?img=1",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    caption: "Bữa sáng healthy với yến mạch và trái cây 🍓🥝",
    likes: 45,
    comments: 8,
    time: "2 giờ trước",
    liked: false,
    commentData: [
      { user: "Minh Tuấn", text: "Ngon quá 😋" },
      { user: "Hà My", text: "Mình cũng muốn thử!" },
      { user: "Thuỳ Linh", text: "Healthy ghê 😍" },
      { user: "Trung Kiên", text: "Chia sẻ công thức đi bro" },
    ],
  },
  {
    id: "2",
    user: "Trung Kiên",
    avatar: "https://i.pravatar.cc/150?img=8",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    caption: "Bữa trưa giảm cân nhẹ nhàng 💪",
    likes: 32,
    comments: 4,
    time: "5 giờ trước",
    liked: false,
    commentData: [
      { user: "Ngọc Linh", text: "Ăn vậy là ổn rồi" },
      { user: "Hà My", text: "Cân nhắc thêm trái cây đi" },
    ],
  },
  {
    id: "3",
    user: "Hà My",
    avatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1516685018646-5494b1b42b4e",
    caption: "Tối nay ăn salad 🍅🥗, healthy life",
    likes: 20,
    comments: 3,
    time: "1 giờ trước",
    liked: false,
    commentData: [
      { user: "Minh Tuấn", text: "Ngon quá" },
      { user: "Thuỳ Linh", text: "Tối nay mình làm theo luôn" },
    ],
  },
  {
    id: "4",
    user: "Minh Tuấn",
    avatar: "https://i.pravatar.cc/150?img=21",
    image: "https://images.unsplash.com/photo-1606788075765-fd2d9ee3f273",
    caption: "Smoothie buổi sáng 🍌🥭",
    likes: 55,
    comments: 10,
    time: "3 giờ trước",
    liked: false,
    commentData: [],
  },
  {
    id: "5",
    user: "Thuỳ Linh",
    avatar: "https://i.pravatar.cc/150?img=31",
    image: "https://images.unsplash.com/photo-1582719478173-8e5d03d1e7de",
    caption: "Snack giảm cân đơn giản 🥑🥒",
    likes: 15,
    comments: 2,
    time: "30 phút trước",
    liked: false,
    commentData: [],
  },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState(samplePosts);
  const navigation = useNavigation<any>();
  const scaleAnimMap = useRef<{ [key: string]: Animated.Value }>({}).current;
  const heartAnimMap = useRef<{ [key: string]: Animated.Value }>({}).current;

  const toggleLike = (id: string, isDoubleTap = false) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = !p.liked || isDoubleTap;
          if (!scaleAnimMap[id]) scaleAnimMap[id] = new Animated.Value(1);
          if (!isDoubleTap) {
            Animated.sequence([
              Animated.timing(scaleAnimMap[id], {
                toValue: 1.4,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnimMap[id], {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]).start();
          } else {
            // Double-tap heart animation
            if (!heartAnimMap[id]) heartAnimMap[id] = new Animated.Value(0);
            heartAnimMap[id].setValue(0);
            Animated.timing(heartAnimMap[id], {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start(() => heartAnimMap[id].setValue(0));
          }
          return { ...p, liked, likes: liked ? p.likes + 1 : p.likes - 1 };
        }
        return p;
      })
    );
  };

  const renderItem = ({ item }: any) => {
    if (!scaleAnimMap[item.id]) scaleAnimMap[item.id] = new Animated.Value(1);
    if (!heartAnimMap[item.id]) heartAnimMap[item.id] = new Animated.Value(0);

    return (
      <View style={styles.postCard}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.user}>{item.user}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>

        {/* Caption trên ảnh */}
        <View style={styles.captionOverlay}>
          <Text
            numberOfLines={4}
            ellipsizeMode="tail"
            style={styles.captionText}
          >
            {item.caption}
          </Text>
          {item.caption.length > 100 && (
            <Text
              style={styles.readMore}
              onPress={() =>
                navigation.navigate("PostDetail", { post: item })
              }
            >
              ... Xem thêm
            </Text>
          )}
        </View>

        {/* Ảnh */}
        <Pressable
          onPress={() => navigation.navigate("PostDetail", { post: item })}
          onLongPress={() => toggleLike(item.id, true)}
          delayLongPress={200}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <Animated.View
            style={[
              styles.doubleTapHeart,
              {
                opacity: heartAnimMap[item.id],
                transform: [
                  {
                    scale: heartAnimMap[item.id].interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1.5, 0],
                    }),
                  },
                ],
              },
            ]}
            pointerEvents="none"
          >
            <Ionicons name="heart" size={100} color="#e74c3c" />
          </Animated.View>
        </Pressable>

        {/* Nút tương tác */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.iconRow}
            onPress={() => toggleLike(item.id)}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleAnimMap[item.id] }] }}
            >
              <Ionicons
                name={item.liked ? "heart" : "heart-outline"}
                size={22}
                color={item.liked ? "#e74c3c" : "#ff5c5c"}
              />
            </Animated.View>
            <Text style={styles.iconLabel}>Thích</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconRow}
            onPress={() =>
              navigation.navigate("PostDetail", { post: item })
            }
          >
            <Ionicons name="chatbubble-outline" size={22} color="#43b0e2" />
            <Text style={styles.iconLabel}>Bình luận</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconRow}>
            <Ionicons name="share-social-outline" size={22} color="#43b0e2" />
            <Text style={styles.iconLabel}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>

        {/* Lượt thích & bình luận */}
        <View style={styles.stats}>
          <Text style={styles.likes}>{item.likes} lượt thích</Text>
          <Text style={styles.comments}>{item.comments} bình luận</Text>
        </View>

        {/* Hiển thị tối đa 3 bình luận */}
        <View style={styles.commentSection}>
          {item.commentData.slice(0, 3).map((c, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("PostDetail", { post: item })
              }
            >
              <Text style={styles.commentText} numberOfLines={2}>
                <Text style={{ fontWeight: "600" }}>{c.user}: </Text>
                {c.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Input comment placeholder */}
        <TextInput
          placeholder="Thêm bình luận..."
          style={styles.inputComment}
          onFocus={() =>
            navigation.navigate("PostDetail", { post: item })
          }
        />
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  user: { fontWeight: "600", fontSize: 15 },
  time: { color: "#999", fontSize: 12 },
  captionOverlay: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
  },
  captionText: { color: "#333", fontSize: 14 },
  readMore: { color: "#333", fontWeight: "600" },
  image: { width: "100%", height: 220 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 4,
  },
  likes: { fontWeight: "500", color: "#333" },
  comments: { fontWeight: "500", color: "#333" },
  commentSection: { paddingHorizontal: 12, paddingTop: 4 },
  commentText: { color: "#333", fontSize: 14, marginBottom: 2 },
  inputComment: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    fontSize: 14,
    color: "#333",
  },
  doubleTapHeart: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
});
