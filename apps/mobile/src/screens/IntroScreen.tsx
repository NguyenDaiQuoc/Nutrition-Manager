import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

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

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      navigation.navigate('Home'); // hoặc 'Home'
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
          listener: handleScroll,
        })}
        scrollEventThrottle={16}
      >
        {slides.map((item) => (
          <View key={item.id} style={styles.slide}>
            <LottieView
              source={item.animation}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Step bar indicator */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, i) => {
          const scale = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  transform: [{ scale }],
                  opacity: i === currentIndex ? 1 : 0.4,
                  backgroundColor: i === currentIndex ? '#4CAF50' : '#BDBDBD',
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
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  animation: {
    width: width * 0.8,
    height: 280,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
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
});
