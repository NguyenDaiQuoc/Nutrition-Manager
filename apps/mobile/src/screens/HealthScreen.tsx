import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import * as AppleHealthKit from 'react-native-health';

const STEP_GOAL = 10000;

export default function HealthScreen() {
    const [steps, setSteps] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                try {
                    // ✅ Import động tránh lỗi fs
                    const { HealthConnect } = await import('expo-health-connect');

                    const granted = await HealthConnect.requestPermissionsAsync([
                        { accessType: 'read', recordType: 'Steps' },
                    ]);

                    if (granted) {
                        const data = await HealthConnect.readRecordsAsync('Steps');
                        if (data && data.length > 0) {
                            const total = data.reduce((sum: number, r: any) => sum + (r.count || 0), 0);
                            setSteps(total);
                        }
                    }
                } catch (e) {
                    console.warn('Health Connect error:', e);
                } finally {
                    setLoading(false);
                }
            } else if (Platform.OS === 'ios') {
                try {
                    const options = {
                        permissions: {
                            read: [AppleHealthKit.Constants.Permissions.Steps],
                            write: [],
                        },
                    };
                    AppleHealthKit.initHealthKit(options, (err: any) => {
                        if (err) {
                            console.error('HealthKit init error:', err);
                            setLoading(false);
                            return;
                        }

                        const today = new Date().toISOString().split('T')[0];
                        AppleHealthKit.getStepCount({ date: today }, (error: any, result: any) => {
                            if (!error && result) setSteps(result.value);
                            setLoading(false);
                        });
                    });
                } catch (e) {
                    console.warn('HealthKit error:', e);
                    setLoading(false);
                }
            } else {
                console.warn('Unsupported platform');
                setLoading(false);
            }
        })();
    }, []);

    const progress = steps ? Math.min(steps / STEP_GOAL, 1) : 0;
    const percentage = Math.round(progress * 100);
    const progressColor =
        progress < 0.4 ? '#FF5252' :
            progress < 0.6 ? '#FFA726' :
                progress < 0.8 ? '#FFEB3B' :
                    progress < 1 ? '#4CAF50' : '#00E676';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chỉ số sức khỏe hôm nay</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
                <>
                    <Text style={styles.value}>{steps ? `${steps} bước` : 'Không có dữ liệu'}</Text>
                    <Progress.Circle
                        size={180}
                        progress={progress}
                        showsText
                        color={progressColor}
                        thickness={10}
                        textStyle={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}
                        formatText={() => `${percentage}%`}
                    />
                    <Text style={styles.goal}>Mục tiêu: {STEP_GOAL} bước</Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' },
    title: { fontSize: 24, color: '#fff', marginBottom: 20 },
    value: { fontSize: 22, color: '#4CAF50', marginBottom: 30 },
    goal: { fontSize: 16, color: '#ccc', marginTop: 20 },
});
