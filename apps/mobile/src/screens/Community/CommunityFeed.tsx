import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Pressable,
  TextInput,
  RefreshControl,
  Modal,
  PanResponder,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const currentUser = "Bạn";

const getTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return "Vừa xong";
};

// Sample posts
const samplePosts = [
  {
    id: "1",
    user: "Ngọc Linh",
    avatar: "https://i.pravatar.cc/150?img=1",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    caption: "Bữa sáng healthy với yến mạch và trái cây 🍓🥝",
    likes: 45,
    liked: false,
    likedBy: ["Minh Tuấn", "Hà My", "Thuỳ Linh", "Hảo", "Kỳ Nam"],
    comments: 4,
    createdAt: new Date("2025-11-12T08:30:00").getTime(),
    commentData: [
      { user: "Minh Tuấn", text: "Ngon quá 😋", timestamp: new Date("2025-11-12T09:00:00").getTime() },
      { user: "Hà My", text: "Mình cũng muốn thử!", timestamp: new Date("2025-11-12T09:10:00").getTime() },
      { user: "Thuỳ Linh", text: "Healthy ghê 😍", timestamp: new Date("2025-11-12T10:00:00").getTime() },
      { user: "Trung Kiên", text: "Chia sẻ công thức đi bro", timestamp: new Date("2025-11-12T10:30:00").getTime() },
    ],
  },
  {
    id: "2",
    user: "Trung Kiên",
    avatar: "https://i.pravatar.cc/150?img=8",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    caption: "Bữa trưa giảm cân nhẹ nhàng 💪",
    likes: 32,
    liked: false,
    likedBy: ["Ngọc Linh", "Hà My"],
    comments: 2,
    createdAt: new Date("2025-11-13T10:00:00").getTime(),
    commentData: [
      { user: "Ngọc Linh", text: "Ăn vậy là ổn rồi", timestamp: new Date("2025-11-13T10:30:00").getTime() },
      { user: "Hà My", text: "Cân nhắc thêm trái cây đi", timestamp: new Date("2025-11-13T11:00:00").getTime() },
    ],
  },
  {
    id: "3",
    user: "Hà My",
    avatar: "https://i.pravatar.cc/150?img=12",
    image:
      "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    caption: "Tối nay ăn salad 🍅🥗, healthy life",
    likes: 5,
    liked: false,
    likedBy: ["Minh Tuấn", "Ngọc Linh", "Thuỳ Linh", "Hảo", "Kỳ Nam"],
    comments: 5,
    createdAt: new Date("2025-11-13T09:10:00").getTime(),
    commentData: [
      { user: "Minh Tuấn", text: "Ngon quá" },
      { user: "Thuỳ Linh", text: "Tối nay mình làm theo luôn" },
      { user: "Ngọc Linh", text: "Mình ăn thử luôn" },
      { user: "Hảo", text: "Healthy ghê" },
      { user: "Kỳ Nam", text: "Mình cũng thử nhé" },
    ],
  },
  {
    id: "4",
    user: "Minh Tuấn",
    avatar: "https://i.pravatar.cc/150?img=21",
    image:
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    caption: "Smoothie buổi sáng 🍌🥭",
    likes: 5,
    liked: false,
    likedBy: ["Ngọc Linh", "Hà My", "Thuỳ Linh", "Hảo", "Kỳ Nam"],
    comments: 5,
    createdAt: new Date("2025-11-13T08:20:00").getTime(),
    commentData: [
      { user: "Ngọc Linh", text: "Mùi vị hấp dẫn" },
      { user: "Hà My", text: "Thêm chút mật ong nữa ngon hơn" },
      { user: "Thuỳ Linh", text: "Mình thử luôn sáng nay" },
      { user: "Hảo", text: "Ngon quá" },
      { user: "Kỳ Nam", text: "Mình cũng thích smoothie" },
    ],
  },
  {
    id: "5",
    user: "Thuỳ Linh",
    avatar: "https://i.pravatar.cc/150?img=31",
    image:
      "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=806&auto=format&fit=crop&ixlib=rb-4.1.0",
    caption: "Snack giảm cân đơn giản 🥑🥒",
    likes: 5,
    liked: false,
    likedBy: ["Ngọc Linh", "Hà My", "Thuỳ Linh", "Hảo", "Kỳ Nam"],
    comments: 5,
    createdAt: new Date("2025-11-13T09:50:00").getTime(),
    commentData: [
      { user: "Ngọc Linh", text: "Snack ngon quá" },
      { user: "Hà My", text: "Thử làm ngay" },
      { user: "Thuỳ Linh", text: "Mình thích snack này" },
      { user: "Hảo", text: "Healthy snack" },
      { user: "Kỳ Nam", text: "Mình cũng ăn rồi" },
    ],
  },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState(samplePosts);
  const [commentTextMap, setCommentTextMap] = useState<{ [key: string]: string }>({});
  const [refreshing, setRefreshing] = useState(false);
  const [tick, setTick] = useState(0);
  const heartAnimMap = useRef<{ [key: string]: Animated.Value }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [expandedCaption, setExpandedCaption] = useState(false);
  const navigation = useNavigation<any>();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  // Drag & zoom states
  const pan = useRef(new Animated.ValueXY()).current;
  const lastOffset = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const [scale, setScale] = useState(new Animated.Value(1));
  const [translate] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const dragOpacity = useRef(new Animated.Value(1)).current;
  const dismissThreshold = 120;
  const initialTouch = useRef({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset(lastOffset.current);
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });

        const distance = Math.sqrt(gesture.dx ** 2 + gesture.dy ** 2);
        const opacity = Math.max(1 - distance / dismissThreshold, 0.7);
        dragOpacity.setValue(opacity);

        const scaleValue = Math.max(1 - distance / (dismissThreshold * 5), 0.85);
        scale.setValue(scaleValue);
      },
      onPanResponderRelease: (_, gesture) => {
        const distance = Math.sqrt(gesture.dx ** 2 + gesture.dy ** 2);

        if (distance > dismissThreshold) {
          // Animate out
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: gesture.dx * 2, y: gesture.dy * 2 },
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(dragOpacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 0.8,
              duration: 250,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Tắt modal khi xong animation
            setModalVisible(false);

            // Reset tất cả
            pan.setValue({ x: 0, y: 0 });
            scale.setValue(1);
            dragOpacity.setValue(1);
            lastOffset.current = { x: 0, y: 0 };
          });
        } else {
          // Animate quay về
          Animated.parallel([
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
            Animated.timing(dragOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
          ]).start();
        }

        pan.flattenOffset();
      },
    })
  ).current;



  useEffect(() => {
    const interval = setInterval(() => setTick((v) => v + 1), 30 * 1000);
    return () => clearInterval(interval);
  }, []);



  const toggleLike = useCallback((id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = !p.liked;
          let likedBy = [...p.likedBy];

          if (liked) {
            if (!likedBy.includes(currentUser)) likedBy.unshift(currentUser);
          } else {
            likedBy = likedBy.filter((u) => u !== currentUser);
          }

          const likes = p.likes + (liked ? 1 : -1);

          if (!heartAnimMap.current[id]) heartAnimMap.current[id] = new Animated.Value(0);
          const anim = heartAnimMap.current[id];
          anim.setValue(0);
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start(() => anim.setValue(0));

          return { ...p, liked, likedBy, likes };
        }
        return p;
      })
    );
  }, []);



  const addComment = useCallback((id: string, text: string) => {
    if (!text.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newComment = { user: currentUser, text, timestamp: Date.now() };
          const commentData = [...p.commentData, newComment];
          const comments = commentData.length;
          return { ...p, commentData, comments };
        }
        return p;
      })
    );

    setCommentTextMap((prev) => ({ ...prev, [id]: "" }));
  }, []);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const renderItem = useCallback(
    ({ item }: any) => {
      const commentText = commentTextMap[item.id] || "";
      const anim = heartAnimMap.current[item.id] || new Animated.Value(0);

      // Sắp xếp comment theo timestamp cũ → mới
      const displayComments = [...item.commentData].sort((a, b) => a.timestamp - b.timestamp).slice(-3);

      // Logic hiển thị like/comment realtime
      let likedUsersDisplay = "";
      if (item.liked) {
        const others = item.likedBy.filter((u) => u !== currentUser).slice(0, 1);
        if (others.length === 0) likedUsersDisplay = "Bạn";
        else likedUsersDisplay = `Bạn, ${others[0]} và ${item.likes - 2} người khác`;
      } else {
        const latest = item.likedBy.slice(0, 2);
        if (latest.length === 0) likedUsersDisplay = "";
        else if (latest.length === 1) likedUsersDisplay = latest[0];
        else likedUsersDisplay = `${latest[0]} và ${latest[1]} và ${item.likes - 2} người khác`;
      }

      // Số comment realtime
      const commentsCount = item.commentData.length;


      return (
        <View style={styles.postCard}>
          <View style={styles.header}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.user}>{item.user}</Text>
              <Text style={styles.time}>{getTimeAgo(item.createdAt)}</Text>
            </View>
          </View>

          <View style={styles.captionOverlay}>
            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.captionText}>
              {item.caption}
            </Text>
          </View>


          <Pressable
            onPress={() => {
              setSelectedPost(item);
              setModalVisible(true);
              setExpandedCaption(false);
            }}
            onLongPress={() => toggleLike(item.id)}
            delayLongPress={200}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Animated.View
              style={[
                styles.doubleTapHeart,
                {
                  opacity: anim,
                  transform: [
                    {
                      scale: anim.interpolate({
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

          <View style={styles.footer}>
            <TouchableOpacity style={styles.iconRow} onPress={() => toggleLike(item.id)}>
              <Ionicons
                name={item.liked ? "heart" : "heart-outline"}
                size={22}
                color={item.liked ? "#e74c3c" : "#ff5c5c"}
              />
              <Text style={styles.iconLabel}>Thích</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconRow} onPress={() => navigation.navigate("PostDetail", { post: item })}>
              <Ionicons name="chatbubble-outline" size={22} color="#43b0e2" />
              <Text style={[styles.iconLabel, { color: "#333" }]}>Bình luận</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconRow}>
              <Ionicons name="share-social-outline" size={22} color="#43b0e2" />
              <Text style={styles.iconLabel}>Chia sẻ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stats}>
            <Text style={styles.likes}>{likedUsersDisplay ? likedUsersDisplay + " thích" : ""}</Text>
            <Text style={styles.comments}>{item.comments} bình luận</Text>
          </View>

          <View style={styles.commentSection}>
            {displayComments.map((c, index) => (
              <Text key={index} style={styles.commentText} numberOfLines={2}>
                <Text style={{ fontWeight: "600" }}>{c.user}: </Text>
                {c.text}
              </Text>
            ))}
          </View>

          <View style={styles.commentInputRow}>
            <TextInput
              placeholder="Thêm bình luận..."
              placeholderTextColor="#666"
              style={styles.inputComment}
              value={commentText}
              onChangeText={(text) => setCommentTextMap((prev) => ({ ...prev, [item.id]: text }))}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={() => addComment(item.id, commentText)}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [commentTextMap, tick]
  );

  return (
    <>
      <FlatList
        data={[...posts].sort((a, b) => b.createdAt - a.createdAt)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
          setExpandedCaption(false);
        }}
      >
        {/* Background + tất cả info + caption + nút */}
        <Animated.View
          style={[
            styles.modalContainer,
            {
              backgroundColor: dragOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,1)"],
              }),
            },
          ]}
        >
          {/* Nút X */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => {
              setModalVisible(false);
              setExpandedCaption(false);
            }}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          

          {/* New Button for Options */}
          <TouchableOpacity
            style={[styles.optionBtn]} // Adjust position to the right of the close button
            onPress={() => setActionSheetVisible(true)}
          >
            <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Action Sheet Modal */}
          <Modal
            visible={actionSheetVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setActionSheetVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setActionSheetVisible(false)}>
              <View style={styles.menuOverlay}>
                <View style={styles.menuContent}>
                  <TouchableOpacity style={styles.menuItem} onPress={() => { /* Copy Image Logic */ }}>
                    <Text style={styles.menuText}>Sao chép ảnh</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => { /* Save Image Logic */ }}>
                    <Text style={styles.menuText}>Lưu hình ảnh</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => { /* Share Logic */ }}>
                    <Text style={styles.menuText}>Chia sẻ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => { /* Report Logic */ }}>
                    <Text style={styles.menuText}>Báo cáo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => setActionSheetVisible(false)}>
                    <Text style={[styles.menuText, { color: "red" }]}>Huỷ</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Ảnh ở giữa - Draggable */}
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.imageContainer,
              {
                transform: [
                  ...pan.getTranslateTransform(),
                  { scale: scale },
                  { translateX: translate.x },
                  { translateY: translate.y },
                ],
              },
            ]}
          >
            
            <Image source={{ uri: selectedPost?.image }} style={styles.modalImage} />
            
          </Animated.View>


          {/* Info + Caption */}
          <Animated.View style={{ opacity: dragOpacity }}>
            <View style={styles.modalInfoSection}>
              <View style={styles.modalHeader}>
                <Image source={{ uri: selectedPost?.avatar }} style={styles.modalAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.modalUserName}>{selectedPost?.user}</Text>
                  <Text style={styles.modalTime}>{getTimeAgo(selectedPost?.createdAt)}</Text>
                </View>
              </View>

              {/* Caption */}
              <View style={styles.captionBox}>
                <Text
                  style={styles.modalCaption}
                  numberOfLines={expandedCaption ? undefined : 1}
                  ellipsizeMode="tail"
                >
                  {selectedPost?.caption}
                </Text>
                {selectedPost?.caption && selectedPost.caption.length > 30 && !expandedCaption && (
                  <TouchableOpacity onPress={() => setExpandedCaption(true)}>
                    <Text style={styles.seeMore}>... xem thêm</Text>
                  </TouchableOpacity>
                )}
                {expandedCaption && selectedPost?.caption && selectedPost.caption.length > 30 && (
                  <TouchableOpacity onPress={() => setExpandedCaption(false)}>
                    <Text style={styles.seeLess}>ẩn đi</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalActionBtn} onPress={() => toggleLike(selectedPost?.id)}>
                <Ionicons
                  name={selectedPost?.liked ? "heart" : "heart-outline"}
                  size={20}
                  color={selectedPost?.liked ? "#e74c3c" : "#999"}
                />
                <Text style={styles.modalActionText}>Thích</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalActionBtn}
                onPress={() => navigation.navigate("PostDetail", { post: selectedPost })}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#999" />
                <Text style={styles.modalActionText}>Bình luận</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalActionBtn}>
                <Ionicons name="share-social-outline" size={20} color="#999" />
                <Text style={styles.modalActionText}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.modalStats}>
              <Text style={styles.modalStatsText}>{selectedPost?.likes} lượt thích</Text>
              <Text style={styles.modalStatsText}>{selectedPost?.comments} bình luận</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  postCard: { backgroundColor: "#fff", marginVertical: 8, marginHorizontal: 12, borderRadius: 12, overflow: "hidden", elevation: 2 },
  header: { flexDirection: "row", alignItems: "center", padding: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  user: { fontWeight: "600", fontSize: 15 },
  time: { color: "#999", fontSize: 12 },
  captionOverlay: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#fff" },
  captionText: { color: "#333", fontSize: 14 },
  image: { width: "100%", height: 220 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: "#eee" },
  iconRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  iconLabel: { fontSize: 14, color: "#333", fontWeight: "500" },
  stats: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, marginTop: 4 },
  likes: { fontWeight: "500", color: "#333" },
  comments: { fontWeight: "500", color: "#333" },
  commentSection: { paddingHorizontal: 12, paddingTop: 4 },
  commentText: { color: "#333", fontSize: 14, marginBottom: 2 },
  commentInputRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6 },
  inputComment: { flex: 1, fontSize: 14, color: "#333", borderWidth: 0.5, borderColor: "#ccc", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, marginRight: 6 },
  sendBtn: { backgroundColor: "#43b0e2", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  doubleTapHeart: { position: "absolute", top: "40%", left: "40%" },

  // Modal styles
  modalContainer: { flex: 1, backgroundColor: "rgba(0, 0, 0, 1)", paddingTop: 80, paddingHorizontal: 16, paddingBottom: 30 },
  closeBtn: { position: "absolute", top: 60, left: 20, zIndex: 10, padding: 8 },
  imageContainer: { alignItems: "center", justifyContent: "center", marginVertical: 20, flex: 1 },
  modalImage: { width: "120%", height: "100%", resizeMode: "contain" },
  modalInfoSection: { backgroundColor: "#000", borderRadius: 12, padding: 12, marginTop: 16 },
  modalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  modalAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  modalUserName: { fontWeight: "600", fontSize: 14, color: "#999" },
  modalTime: { color: "#999", fontSize: 12, marginTop: 2 },
  captionBox: { marginBottom: 12 },
  modalCaption: { fontSize: 14, color: "#999", lineHeight: 18 },
  seeMore: { color: "#999", fontWeight: "500", marginTop: 4 },
  seeLess: { color: "#999", fontWeight: "500", marginTop: 4 },
  modalFooter: { flexDirection: "row", justifyContent: "space-around", borderTopWidth: 0.5, paddingTop: 10, marginTop: 10 },
  modalActionBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  modalActionText: { fontSize: 13, color: "#999", fontWeight: "500" },
  modalStats: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTopWidth: 0.5 },
  modalStatsText: { fontSize: 13, color: "#999", fontWeight: "500" },
  optionBtn: { position: "absolute", top: 60, zIndex: 10, padding: 8,right: 10 },
  // Menu styles
  menuOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.7)", justifyContent: "center", alignItems: "center" },
  menuContent: { backgroundColor: "#232121ff", borderRadius: 12, padding: 20, width: "98%", elevation: 4,top: 225},
  menuItem: { paddingVertical: 15, borderBottomWidth: 0.3, borderBottomColor: "#999", marginBottom: 10 },
  menuText: { fontSize: 16, color: "#43b0e2", textAlign: "center" },
});
