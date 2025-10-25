import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
// ⚠️ QUAN TRỌNG: Import Camera và CameraType riêng biệt.
import { Camera, CameraType } from 'expo-camera'; 

export default function CameraScreen() {
  // Sử dụng kiểu dữ liệu CameraType cho state 'type'
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  // 🚀 SỬA LỖI: Truy cập hằng số camera trực tiếp qua đối tượng CameraType
  const [type, setType] = useState<CameraType>(CameraType.back); 
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          skipProcessing: false,
        });
        console.log('Ảnh chụp:', photo.uri);
      } catch (error) {
        console.error('Lỗi khi chụp ảnh:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Đang kiểm tra quyền camera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Không có quyền truy cập camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={type}
        ratio="16:9"
      />
      <View style={styles.controls}>
        <Button title="Chụp ảnh" onPress={takePicture} />
        <Button
          title="Đổi camera"
          onPress={() =>
            // 🚀 SỬA LỖI: Truy cập hằng số camera trực tiếp qua đối tượng CameraType
            setType(type === CameraType.back ? CameraType.front : CameraType.back)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#111',
  },
});