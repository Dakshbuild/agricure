import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { useAppStore } from '../store/useAppStore';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    emoji: '🔬',
    icon: '🌿',
    title: 'AI Disease Scanner',
    subtitle: 'Detect Crop Diseases Instantly',
    description:
      'Point your camera at any leaf. Our AI identifies 50+ crop diseases with 90%+ accuracy and gives you an instant treatment plan.',
    color: COLORS.primary,
    bgColor: COLORS.primarySurface,
    accent: COLORS.primaryLight,
    features: ['📸 Camera & Gallery', '🧬 50+ Diseases', '⚡ 2-second results'],
  },
  {
    id: '2',
    emoji: '🌦️',
    icon: '⚡',
    title: 'Weather Prediction',
    subtitle: 'Stay Ahead of Disease Outbreaks',
    description:
      'Get hyper-local weather forecasts and AI-powered disease risk predictions before an outbreak hits your farm.',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    accent: '#42A5F5',
    features: ['🌡️ Live Weather', '⚠️ Risk Alerts', '📅 5-Day Forecast'],
  },
  {
    id: '3',
    emoji: '💧',
    icon: '🌾',
    title: 'Smart Farming',
    subtitle: 'Optimize Every Drop & Decision',
    description:
      'Smart irrigation scheduling, nearby buyer connections, and a 24/7 AI farming assistant — all in one app.',
    color: COLORS.accent,
    bgColor: COLORS.accentSurface,
    accent: COLORS.accentDark,
    features: ['💧 Smart Watering', '🏪 Farm Connect', '🤖 AI Assistant'],
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const setOnboardingSeen = useAppStore((s) => s.setOnboardingSeen);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next });
      setCurrentIndex(next);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => handleGetStarted();

  const handleGetStarted = () => {
    setOnboardingSeen();
    navigation.replace('Language');
  };

  const renderSlide = ({ item, index }: { item: (typeof SLIDES)[0]; index: number }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.slide, { width }]}>
        {/* Illustration Card */}
        <Animated.View
          style={[
            styles.illustrationCard,
            { backgroundColor: item.bgColor, transform: [{ scale }], opacity },
          ]}
        >
          {/* Decorative circles */}
          <View style={[styles.innerCircle, { backgroundColor: item.accent + '20' }]} />
          <View style={[styles.innerCircleSmall, { backgroundColor: item.color + '15' }]} />
          <Text style={styles.mainEmoji}>{item.emoji}</Text>
          <View style={[styles.badge, { backgroundColor: item.color }]}>
            <Text style={styles.badgeText}>{item.icon} {item.subtitle}</Text>
          </View>
        </Animated.View>

        {/* Feature Chips */}
        <View style={styles.featureRow}>
          {item.features.map((f, i) => (
            <View key={i} style={[styles.featureChip, { borderColor: item.color + '30' }]}>
              <Text style={styles.featureChipText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* Text */}
        <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(idx);
        }}
        scrollEventThrottle={16}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Dots */}
        <View style={styles.dotContainer}>
          {SLIDES.map((_, i) => {
            const dotWidth = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            const dotColor = scrollX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [COLORS.border, COLORS.primary, COLORS.border],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]}
              />
            );
          })}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={[
            styles.nextBtn,
            currentIndex === SLIDES.length - 1 && styles.nextBtnFinal,
          ]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {currentIndex === SLIDES.length - 1 ? '🌱 Get Started' : 'Next  →'}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>
            Already have an account? <Text style={styles.loginLinkBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  skipBtn: {
    position: 'absolute',
    top: 50,
    right: SIZES.padding,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surfaceDim,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
    fontWeight: '600',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
    paddingTop: 60,
  },
  illustrationCard: {
    width: width - 80,
    height: 260,
    borderRadius: SIZES.radiusXl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.lg,
  },
  innerCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    top: -40,
    right: -40,
  },
  innerCircleSmall: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    bottom: -20,
    left: -20,
  },
  mainEmoji: {
    fontSize: 90,
  },
  badge: {
    position: 'absolute',
    bottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: SIZES.fontSm,
    fontWeight: '700',
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 8,
  },
  featureChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  featureChipText: {
    fontSize: SIZES.fontSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: SIZES.fontXxl,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: SIZES.fontMd,
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: SIZES.md,
  },
  bottomSection: {
    paddingHorizontal: SIZES.xl,
    paddingBottom: 40,
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  nextBtnFinal: {
    backgroundColor: COLORS.primary,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: SIZES.fontLg,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginLink: {
    marginTop: 16,
    padding: 8,
  },
  loginLinkText: {
    color: COLORS.textTertiary,
    fontSize: SIZES.fontMd,
  },
  loginLinkBold: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
