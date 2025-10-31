import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Theo dõi dinh dưỡng dễ dàng',
    description:
      'Ghi lại bữa ăn, calo và chất dinh dưỡng mỗi ngày để hiểu rõ hơn về cơ thể của bạn.',
    animation: require('../../assets/animations/food.json'),
  },
  {
    id: '2',
    title: 'Phân tích sức khỏe thông minh',
    description:
      'AI giúp đánh giá thói quen ăn uống và gợi ý thực đơn cân bằng.',
    animation: require('../../assets/animations/ai_health.json'),
  },
  {
    id: '3',
    title: 'Đặt mục tiêu và theo dõi tiến trình',
    description:
      'Cập nhật cân nặng, hoạt động và mục tiêu để thấy sự thay đổi mỗi ngày.',
    animation: require('../../assets/animations/goal.json'),
  },
  {
    id: '4',
    title: 'Kết nối với Health Connect',
    description:
      'Đồng bộ dữ liệu sức khỏe từ Google Fit / Health Connect để quản lý toàn diện.',
    animation: require('../../assets/animations/health.json'),
  },
  {
    id: '5',
    title: 'Trải nghiệm cá nhân hoá',
    description:
      'Ứng dụng sẽ học từ bạn để gợi ý thực đơn, bài tập và lời khuyên phù hợp nhất.',
    animation: require('../../assets/animations/personal.json'),
  },
];

export default function IntroScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  const lottieRefs = useRef<(LottieView | null)[]>([]);

  // 🔹 Kiểm tra nếu đã xem intro hoặc đã đăng nhập thì bỏ qua
  // useEffect(() => {
  //   const checkIfSeen = async () => {
  //     try {
  //       const seen = await AsyncStorage.getItem('intro_seen');
  //       const loggedIn = await AsyncStorage.getItem('user_token');
  //       if (seen === 'true' || loggedIn) {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: 'Home' }],
  //           // hoặc 'Auth'
  //         });
  //       }
  //     } catch (e) {
  //       console.log('Error checking intro status:', e);
  //     }
  //   };
  //   checkIfSeen();
  // }, []);

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    lottieRefs.current.forEach((ref, i) => {
      if (ref) {
        if (i === currentIndex) ref.play();
        else ref.pause();
      }
    });
  }, [currentIndex]);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    } else {
      await AsyncStorage.setItem('intro_seen', 'true');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('intro_seen', 'true');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="center"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {slides.map((item, index) => (
          <View key={item.id} style={[styles.slide, { width }]}>
            <View style={styles.animationWrapper}>
              <LottieView
                ref={(ref) => (lottieRefs.current[index] = ref)}
                source={item.animation}
                loop
                style={styles.animation}
                resizeMode="contain"
                autoPlay={index === 0}
              />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.indicatorContainer}>
        {slides.map((_, i) => {
          const scale = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.8, 1.3, 0.8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  transform: [{ scale }],
                  backgroundColor: i === currentIndex ? '#4CAF50' : '#CFCFCF',
                },
              ]}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Bắt đầu ngay' : 'Tiếp tục'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationWrapper: {
    width: width * 0.9,
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // 👈 chặn tràn ra ngoài slide
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    width: width * 0.8,
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 40,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
