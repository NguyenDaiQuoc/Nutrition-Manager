import React, { useRef, useEffect } from "react";
import { Animated, View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PolicyScreen() {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(60)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
          <Text style={styles.headerTitle}>Chính sách bảo mật</Text>
        </View>

        {/* Nội dung */}
        <ScrollView style={styles.scroll}>
          <Text style={styles.sectionTitle}>1. Thu thập thông tin</Text>
          <Text style={styles.text}>
            Ứng dụng có thể thu thập thông tin cá nhân như tên, email, dữ liệu sức khỏe (nếu có)
            nhằm cải thiện trải nghiệm người dùng và hỗ trợ dịch vụ.
          </Text>

          <Text style={styles.sectionTitle}>2. Bảo mật dữ liệu</Text>
          <Text style={styles.text}>
            Tất cả thông tin được mã hoá và lưu trữ an toàn. Chúng tôi cam kết không chia sẻ dữ liệu
            cho bên thứ ba nếu không có sự đồng ý của người dùng.
          </Text>

          <Text style={styles.sectionTitle}>3. Quyền truy cập và xoá dữ liệu</Text>
          <Text style={styles.text}>
            Người dùng có quyền yêu cầu xem, chỉnh sửa hoặc xoá dữ liệu cá nhân của mình bất cứ lúc nào
            thông qua phần "Hồ sơ cá nhân" hoặc liên hệ trực tiếp.
          </Text>

          <Text style={styles.sectionTitle}>4. Cookie & công nghệ theo dõi</Text>
          <Text style={styles.text}>
            Chúng tôi có thể sử dụng cookie để ghi nhớ lựa chọn của bạn, giúp cải thiện hiệu suất và
            cá nhân hóa nội dung hiển thị.
          </Text>

          <Text style={styles.sectionTitle}>5. Thay đổi chính sách</Text>
          <Text style={styles.text}>
            Chính sách bảo mật có thể được cập nhật định kỳ. Các thay đổi sẽ được thông báo rõ ràng
            trong ứng dụng trước khi áp dụng.
          </Text>

          <Text style={styles.sectionTitle}>6. Liên hệ</Text>
          <Text style={styles.text}>
            Email: privacy@nutrition.vn — chúng tôi luôn sẵn lòng hỗ trợ mọi thắc mắc của bạn.
          </Text>

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
