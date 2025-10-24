import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

type AuthNav = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

export default function AuthScreen() {
    const navigation = useNavigation<AuthNav>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    const fadeAnim = useState(new Animated.Value(0))[0];

    React.useEffect(() => {
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

        setLoading(true);
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert('Thành công', 'Tạo tài khoản thành công!');
                setIsRegister(false);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate('Camera'); // hoặc HomeScreen
            }
        } catch (error: any) {
            console.log(error);
            Alert.alert('Lỗi', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
                <Text style={styles.logo}>🥗</Text>
                <Text style={styles.title}>{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#777"
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                />

                <TextInput
                    placeholder="Mật khẩu"
                    placeholderTextColor="#777"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.7 }]}
                    onPress={handleAuth}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                    <Text style={styles.switchText}>
                        {isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    card: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    logo: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#2A2A2A',
        color: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    switchText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 14,
    },
});
