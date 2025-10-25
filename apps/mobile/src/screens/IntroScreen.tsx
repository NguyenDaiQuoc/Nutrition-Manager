import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Theo dõi dinh dưỡng dễ dàng',
    description:
      'Ghi lại bữa ăn, calo và chất dinh dưỡng mỗi ngày của bạn để hiểu rõ hơn về cơ thể mình.',
    image: require('../../assets/favicon.png'),
  },
  {
    id: '2',
    title: 'Phân tích sức khỏe thông minh',
    description:
      'AI hỗ trợ đánh giá thói quen ăn uống và đề xuất kế hoạch dinh dưỡng phù hợp.',
    image: require('../../assets/adaptive-icon.png'),
  },
  {
    id: '3',
    title: 'Đồng bộ và theo dõi tiến trình',
    description:
      'Kết nối với Google Fit / Health Connect để theo dõi cân nặng, hoạt động và mục tiêu.',
    image: require('../../assets/icon.png'),
  },
];

export default function IntroScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      navigation.navigate('Home'); // hoặc 'Home' tùy bạn
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const renderIndicator = () => (
    <View style={styles.indicatorContainer}>
      {slides.map((_, i) => {
        const scale = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.8, 1.2, 0.8],
          extrapolate: 'clamp',
        });
        return <Animated.View key={i} style={[styles.dot, { transform: [{ scale }], opacity: i === currentIndex ? 1 : 0.5 }]} />;
      })}
    </View>
  );

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
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {renderIndicator()}

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
    paddingHorizontal: 24,
  },
  image: {
    width: '80%',
    height: 250,
    marginBottom: 40,
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
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
