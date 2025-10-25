import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
// Không cần import Progress nữa

// Giả lập một tác vụ tải/khởi tạo bất đồng bộ
const mockAsyncOperation = (duration: number, taskName: string) => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(taskName);
        }, duration);
    });
};

export default function SplashScreen({ onFinish }: { onFinish?: () => void }) {
    
    // --- KHAI BÁO ANIMATION REFS ---
    // scaleAnim ban đầu là 0.8 để tạo hiệu ứng zoom-in
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    // opacity ban đầu là 0 để tạo hiệu ứng fade-in
    const logoOpacity = useRef(new Animated.Value(0)).current; 

    // Tổng thời gian tải ngầm, khoảng 4.6 giây
    const tasks = [
        { name: "Khởi tạo hệ thống (Firebase/API)", duration: 600 },
        { name: "Cân đo đong đếm dữ liệu dinh dưỡng", duration: 900 },
        { name: "Tải thông tin bữa ăn mẫu", duration: 800 },
        { name: "Cache hình ảnh menu", duration: 1000 },
        { name: "Phân tích năng lượng và dưỡng chất", duration: 700 },
        { name: "Chuẩn bị gợi ý thực đơn phù hợp", duration: 600 },
    ];
    
    // --- LOGIC ANIMATION & TẢI ---
    useEffect(() => {
        
        // BƯỚC 1: ANIMATION KHỞI ĐỘNG (Fade-In và Zoom In)
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1.0, // Phóng to đến kích thước gốc
                duration: 1000,
                easing: Easing.out(Easing.back(1)),
                useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
                toValue: 1, // Hiện logo
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();

        const loadResources = async () => {
            
            // BƯỚC 2: CHẠY TÁC VỤ ẨN (Background Loading)
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                // Chỉ cần chờ tác vụ hoàn thành, không cần animation progress
                await mockAsyncOperation(task.duration, task.name);
            }
            
            // BƯỚC 3: KẾT THÚC VÀ CHUYỂN MÀN HÌNH (Fade-Out và Zoom Out)
            
            // Chạy hiệu ứng logo: phóng to hơn và mờ dần
            Animated.parallel([
                Animated.timing(scaleAnim, { 
                    toValue: 1.5, // Phóng to logo hơn nữa
                    duration: 1000, 
                    easing: Easing.out(Easing.exp), 
                    useNativeDriver: true, 
                }),
                Animated.timing(logoOpacity, { 
                    toValue: 0, // Mờ hẳn đi
                    duration: 800, 
                    easing: Easing.inOut(Easing.quad), 
                    useNativeDriver: true, 
                }),
            ]).start(() => {
                 // Gọi onFinish chỉ khi animation kết thúc
                 if (onFinish) { 
                     onFinish();
                 }
            });
        };

        loadResources();

    }, [onFinish]);


    return (
        // View cha chiếm toàn bộ màn hình
        <View style={styles.container}>
            {/* Logo chiếm toàn bộ màn hình theo yêu cầu */}
            <Animated.Image
                source={require("../../assets/splash.png")}
                style={[
                    styles.logo,
                    // Sử dụng style để chiếm toàn bộ màn hình và căn giữa
                    styles.fullScreenLogo, 
                    { 
                        transform: [{ scale: scaleAnim }], 
                        opacity: logoOpacity 
                    },
                ]}
                // Giữ nguyên resizeMode để hình ảnh không bị méo
                resizeMode="contain" 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4FC3F7", // Xanh trời
        alignItems: "center",
        justifyContent: "center",
    },
    // Style dành cho Image khi muốn chiếm toàn bộ màn hình và căn giữa
    fullScreenLogo: {
        position: 'absolute',
        width: '100%', 
        height: '100%', 
        // Đảm bảo logo có thể phóng to mà vẫn nằm trong View
        alignItems: 'center', 
        justifyContent: 'center',
    },
    logo: {
        width: 160, // Kích thước ban đầu vẫn cần để resizeMode hoạt động
        height: 160, 
    },
});