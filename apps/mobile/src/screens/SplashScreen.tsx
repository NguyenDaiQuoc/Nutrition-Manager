import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
import * as Progress from "react-native-progress";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("Đang nạp năng lượng cho ứng dụng... và cho bạn nữa 💪");

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const logoOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        // ⏳ Tiến trình mượt
        interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 0.02; // tăng đều 2% mỗi lần
                if (next >= 1) {
                    clearInterval(interval);
                    animateLogoOut(); // hiệu ứng kết thúc
                    setTimeout(onFinish, 1300);
                    return 1;
                }
                return next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // 🔮 Đổi message theo phần trăm tiến độ
    useEffect(() => {
        if (progress < 0.2)
            updateMessage("Đang nạp năng lượng cho ứng dụng... và cho bạn nữa 💪");
        else if (progress < 0.4)
            updateMessage("Đang cân đo đong đếm dữ liệu dinh dưỡng... ⚖️");
        else if (progress < 0.6)
            updateMessage("Thu thập thông tin bữa ăn của bạn... 🥬");
        else if (progress < 0.8)
            updateMessage("Phân tích năng lượng và dưỡng chất... 🔬");
        else if (progress < 1)
            updateMessage("Chuẩn bị gợi ý thực đơn phù hợp 🍽️");
        else updateMessage("Sẵn sàng giúp bạn ăn ngon và sống khỏe 🌟");
    }, [progress]);

    // 💬 Hiệu ứng text trượt đổi
    const updateMessage = (text: string) => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
            Animated.timing(translateAnim, { toValue: -10, duration: 200, useNativeDriver: true }),
        ]).start(() => {
            setMessage(text);
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.timing(translateAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
            ]).start();
        });
    };

    // 🌟 Khi hoàn tất: logo sáng & phóng nhẹ ra
    const animateLogoOut = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1.3,
                duration: 800,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
                toValue: 0,
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Animated.Image
                source={require("../../assets/splash.png")}
                style={[
                    styles.logo,
                    { transform: [{ scale: scaleAnim }], opacity: logoOpacity },
                ]}
                resizeMode="contain"
            />

            {/* Text + progress */}
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: translateAnim }],
                    alignItems: "center",
                }}
            >
                <Text style={styles.message}>{message}</Text>

                <Progress.Bar
                    progress={progress}
                    width={260}
                    color="#fff"
                    unfilledColor="rgba(255,255,255,0.25)"
                    borderWidth={0}
                    borderRadius={10}
                    height={10}
                    animationType="timing"
                />

                <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4FC3F7", // xanh trời năng lượng
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 160,
        height: 160,
        marginBottom: 60,
    },
    message: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "500",
        paddingHorizontal: 20,
    },
    percent: {
        color: "#fff",
        marginTop: 10,
        fontWeight: "600",
    },
});
