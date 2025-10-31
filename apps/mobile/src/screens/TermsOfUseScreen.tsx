import React, { useRef, useEffect } from "react";
import { Animated, View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TermsScreen() {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(60)).current; // Bắt đầu từ dưới
  const fadeAnim = useRef(new Animated.Value(0)).current;   // Mờ dần

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Điều khoản sử dụng</Text>
        </View>

        {/* Nội dung */}
        <ScrollView style={styles.scroll}>
          <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
          <Text style={styles.text}>
            Khi sử dụng ứng dụng này, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản sử dụng dưới đây.
            Vui lòng đọc kỹ trước khi tiếp tục.
          </Text>

          <Text style={styles.sectionTitle}>2. Trách nhiệm người dùng</Text>
          <Text style={styles.text}>
            Bạn cam kết cung cấp thông tin chính xác, không sử dụng ứng dụng cho mục đích gian lận,
            vi phạm pháp luật hoặc gây hại cho người khác.
          </Text>

          <Text style={styles.sectionTitle}>3. Quyền sở hữu trí tuệ</Text>
          <Text style={styles.text}>
            Mọi nội dung, logo, hình ảnh, mã nguồn thuộc quyền sở hữu của nhóm phát triển ứng dụng
            và được bảo hộ bởi pháp luật Việt Nam.
          </Text>

          <Text style={styles.sectionTitle}>4. Thay đổi điều khoản</Text>
          <Text style={styles.text}>
            Chúng tôi có thể cập nhật điều khoản này bất cứ lúc nào. Người dùng nên kiểm tra thường xuyên
            để đảm bảo nắm rõ phiên bản mới nhất.
          </Text>

          <Text style={styles.sectionTitle}>5. Liên hệ</Text>
          <Text style={styles.text}>Nếu có câu hỏi, vui lòng liên hệ qua email: support@nutrition.vn</Text>

          <View style={{ height: 40 }} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c0c0c" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  backButton: { marginRight: 10 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  scroll: { padding: 16 },
  sectionTitle: { color: "#00C853", fontSize: 16, fontWeight: "700", marginTop: 16 },
  text: { color: "#ccc", fontSize: 15, lineHeight: 22, marginTop: 6 },
});
