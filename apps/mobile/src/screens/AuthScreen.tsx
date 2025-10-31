// src/screens/AuthScreen.tsx
import React, { useState, useEffect } from 'react';
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
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';

const BACKGROUND_IMAGE = require('../../assets/splash1.png');

type AuthNav = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export default function AuthScreen() {
    const navigation = useNavigation<AuthNav>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
        }).start();
    }, [isRegister]);

    const handleAuth = async () => {
        if (!email || !password) {
            Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        if (isRegister && !agreeTerms) {
            Alert.alert('Yêu cầu', 'Bạn cần đồng ý với điều khoản sử dụng và chính sách bảo mật.');
            return;
        }

        setLoading(true);
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert('Thành công', 'Tạo tài khoản thành công!');
                setIsRegister(false);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate('Home');
            }
        } catch (error: any) {
            console.log(error);
            Alert.alert('Lỗi', error.message);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        Alert.alert("Google Sign-In", "Cần tích hợp @react-native-google-signin/google-signin");
    };

    const signInWithFacebook = async () => {
        Alert.alert("Facebook Sign-In", "Cần tích hợp react-native-fbsdk-next");
    };

    const signInWithApple = async () => {
        Alert.alert("Apple Sign-In", "Cần tích hợp expo-apple-authentication");
    };

    const signInWithOTP = async () => {
        Alert.alert("OTP / SMS", "Tính năng đăng nhập qua số điện thoại đang được phát triển.");
    };

    return (
        <ImageBackground source={BACKGROUND_IMAGE} style={styles.imageBackground} resizeMode="cover">
            <View style={styles.overlay} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
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

                    {/* Checkbox khi đăng ký */}
                    {isRegister && (
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setAgreeTerms(!agreeTerms)}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                                {agreeTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
                            </View>
                            <Text style={styles.checkboxLabel}>
                                Tôi đồng ý với{' '}
                                <Text style={styles.linkText} onPress={() => navigation.navigate('Terms')}>
                                    Điều khoản sử dụng
                                </Text>{' '}
                                và{' '}
                                <Text style={styles.linkText} onPress={() => navigation.navigate('Policy')}>
                                    Chính sách bảo mật
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Nút chính */}
                    <TouchableOpacity
                        style={[
                            styles.button,
                            loading && { opacity: 0.7 },
                            isRegister && !agreeTerms && { backgroundColor: '#777' },
                        ]}
                        onPress={handleAuth}
                        disabled={loading || (isRegister && !agreeTerms)}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>
                                {isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* Chuyển đổi login/register */}
                    <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={{ marginTop: 15 }}>
                        <Text style={styles.switchText}>
                            {isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
                        </Text>
                    </TouchableOpacity>

                    {/* Separator */}
                    <View style={styles.separatorContainer}>
                        <View style={styles.line} />
                        <Text style={styles.separatorText}>Hoặc</Text>
                        <View style={styles.line} />
                    </View>

                    {/* Social login buttons */}
                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.socialButton, styles.googleButton]}
                            onPress={signInWithGoogle}
                        >
                            <Ionicons name="logo-google" size={22} color="#fff" />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialButton, styles.facebookButton]}
                            onPress={signInWithFacebook}
                        >
                            <FontAwesome name="facebook" size={22} color="#fff" />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialButton, styles.appleButton]}
                            onPress={signInWithApple}
                        >
                            <AntDesign name="apple" size={22} color="#fff" />
                            <Text style={styles.socialButtonText}>Apple ID</Text>
                        </TouchableOpacity>
                    </View>

                    {/* OTP / SMS login */}
                    <TouchableOpacity onPress={signInWithOTP}>
                        <Text style={styles.forgotPasswordText}>Đăng nhập bằng OTP / SMS</Text>
                    </TouchableOpacity>

                    {/* ✅ Dòng điều khoản luôn hiển thị */}
                    <Text style={styles.bottomNote}>
                        Bằng việc đăng nhập, bạn đã đồng ý với{' '}
                        <Text style={styles.linkText} onPress={() => navigation.navigate('Terms')}>
                            Điều khoản sử dụng
                        </Text>{' '}
                        và{' '}
                        <Text style={styles.linkText} onPress={() => navigation.navigate('Policy')}>
                            Chính sách bảo mật
                        </Text>{' '}
                        của chúng tôi.
                    </Text>
                </Animated.View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: { flex: 1, justifyContent: 'center' },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
    card: {
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    title: { fontSize: 28, color: '#fff', textAlign: 'center', marginBottom: 25, fontWeight: '700' },
    input: {
        backgroundColor: '#2A2A2A',
        color: '#fff',
        padding: 14,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#444',
        fontSize: 16,
    },
    button: { backgroundColor: '#4CAF50', paddingVertical: 16, borderRadius: 12, marginTop: 15 },
    buttonText: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600' },
    switchText: { color: '#ccc', textAlign: 'center', marginTop: 18, fontSize: 15 },
    separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    line: { flex: 1, height: 1, backgroundColor: '#444' },
    separatorText: { width: 50, textAlign: 'center', color: '#aaa', fontSize: 15 },
    socialButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        width: '30%',
    },
    googleButton: { backgroundColor: '#DB4437' },
    facebookButton: { backgroundColor: '#4267B2' },
    appleButton: { backgroundColor: '#333' },
    socialButtonText: { color: '#fff', marginLeft: 8, fontSize: 14, fontWeight: '500' },
    forgotPasswordText: {
        color: '#4CAF50',
        textAlign: 'center',
        marginTop: 15,
        textDecorationLine: 'underline',
        fontSize: 15,
    },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#4CAF50',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: { backgroundColor: '#4CAF50' },
    checkboxLabel: { color: '#ccc', flex: 1, flexWrap: 'wrap' },
    linkText: { color: '#4CAF50', textDecorationLine: 'underline' },
    bottomNote: {
        color: '#999',
        textAlign: 'center',
        marginTop: 25,
        fontSize: 13,
        lineHeight: 18,
    },
});
