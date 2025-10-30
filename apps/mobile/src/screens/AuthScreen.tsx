import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Animated,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    // signInWithPopup, // Không dùng cho React Native
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 

// Import ảnh nền (Bạn cần đảm bảo đường dẫn này là chính xác)
const BACKGROUND_IMAGE = require('../../assets/splash1.png'); 

type AuthNav = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

// -------------------------------------------------------------
// HÀM HỖ TRỢ XÁC THỰC SOCIAL (Cần tích hợp thư viện Native)
// -------------------------------------------------------------

const signInWithGoogle = async () => {
    // THỰC HIỆN TÍCH HỢP NATIVE TẠI ĐÂY (VD: @react-native-google-signin/google-signin)
    Alert.alert("Tích hợp Google", "Cần cài đặt và sử dụng thư viện Google Sign-In Native để lấy credential.");
};

const signInWithFacebook = async () => {
    // THỰC HIỆN TÍCH HỢP NATIVE TẠI ĐÂY (VD: @react-native-firebase/auth + SDK Facebook)
    Alert.alert("Tích hợp Facebook", "Cần cài đặt và sử dụng thư viện Facebook SDK Native để lấy credential.");
};

// -------------------------------------------------------------
// COMPONENT AUTHSCREEN
// -------------------------------------------------------------

export default function AuthScreen() {
    const navigation = useNavigation<AuthNav>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fade animation cho card đăng nhập/đăng ký
    const fadeAnim = useState(new Animated.Value(0))[0];

    React.useEffect(() => {
        // Reset opacity về 0 mỗi khi chế độ (Đăng nhập/Đăng ký) thay đổi
        // và chạy lại animation Fade-In
        fadeAnim.setValue(0); 

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
        }).start();
        
    }, [isRegister]); // Chạy khi mount lần đầu và khi isRegister thay đổi

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        setLoading(true);
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert('Thành công', 'Tạo tài khoản thành công!');
                // Chuyển về màn hình đăng nhập sau khi đăng ký thành công
                setIsRegister(false);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                // Đăng nhập thành công, chuyển hướng
                navigation.navigate('Home'); 
            }
        } catch (error: any) {
            console.log(error);
            Alert.alert('Lỗi', error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSocialAuth = async (authFunction: () => Promise<void>) => {
        setLoading(true);
        try {
            await authFunction();
            // Xử lý chuyển hướng sau khi Social Login thành công (Firebase tự động lắng nghe auth state)
        } catch (error: any) {
            console.log(error);
            Alert.alert('Lỗi', "Đăng nhập thất bại: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground 
            source={BACKGROUND_IMAGE}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            {/* Lớp phủ tối giúp text dễ đọc hơn */}
            <View style={styles.overlay} /> 

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}> 
                
                {/* Card chứa form đăng nhập/đăng ký */}
                <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                    <Text style={styles.title}>{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</Text>

                    {/* Email Input */}
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#777"
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password Input */}
                    <TextInput
                        placeholder="Mật khẩu"
                        placeholderTextColor="#777"
                        secureTextEntry
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                    />

                    {/* Main Auth Button (Đăng nhập/Đăng ký) */}
                    <TouchableOpacity
                        style={[styles.button, loading && { opacity: 0.7 }]}
                        onPress={handleAuth}
                        disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</Text>
                        )}
                    </TouchableOpacity>

                    {/* Switch Mode */}
                    <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={{ marginTop: 15 }}>
                        <Text style={styles.switchText}>
                            {isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
                        </Text>
                    </TouchableOpacity>

                    {/* Social Login Section */}
                    <View style={styles.separatorContainer}>
                        <View style={styles.line} />
                        <Text style={styles.separatorText}>Hoặc</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialButtonsContainer}>
                        {/* Google Login Button */}
                        <TouchableOpacity
                            style={[styles.socialButton, styles.googleButton]}
                            onPress={() => handleSocialAuth(signInWithGoogle)}
                            disabled={loading}
                        >
                            <Ionicons name="logo-google" size={24} color="#fff" />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>

                        {/* Facebook Login Button */}
                        <TouchableOpacity
                            style={[styles.socialButton, styles.facebookButton]}
                            onPress={() => handleSocialAuth(signInWithFacebook)}
                            disabled={loading}
                        >
                            <FontAwesome name="facebook" size={24} color="#fff" />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* OTP/Mail Verification Link */}
                    <TouchableOpacity onPress={() => Alert.alert("Xác thực", "Tính năng xác thực OTP/Email đang được phát triển...")}>
                        <Text style={styles.forgotPasswordText}>Xác thực bằng OTP / Email?</Text>
                    </TouchableOpacity>
                    
                </Animated.View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

// -------------------------------------------------------------
// STYLESHEET
// -------------------------------------------------------------

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tăng độ tối nhẹ cho nền
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    card: {
        backgroundColor: 'rgba(30, 30, 30, 0.9)', 
        borderRadius: 20,
        padding: 24,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.3, // Tăng độ bóng
        shadowRadius: 15, // Tăng độ lan của bóng
        elevation: 10,
    },
    title: {
        fontSize: 28, // Tăng cỡ chữ
        color: '#fff',
        textAlign: 'center',
        marginBottom: 25,
        fontWeight: '700', // Đậm hơn
    },
    input: {
        backgroundColor: '#2A2A2A',
        color: '#fff',
        padding: 14, // Tăng padding
        borderRadius: 12, // Bo tròn hơn
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#444',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 16, // Tăng padding
        borderRadius: 12,
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
    switchText: {
        color: '#ccc', // Sáng hơn
        textAlign: 'center',
        marginTop: 18,
        fontSize: 15,
    },
    
    // --- SOCIAL LOGIN STYLES ---
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    line: {
        flex: 1,
        height: 1.5, // Dày hơn
        backgroundColor: '#444',
    },
    separatorText: {
        width: 50,
        textAlign: 'center',
        color: '#aaa',
        fontSize: 15,
        fontWeight: '500',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14, // Tăng padding
        borderRadius: 12,
        marginHorizontal: 8, // Khoảng cách lớn hơn
    },
    googleButton: {
        backgroundColor: '#DB4437', 
    },
    facebookButton: {
        backgroundColor: '#4267B2', 
    },
    socialButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    forgotPasswordText: {
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});