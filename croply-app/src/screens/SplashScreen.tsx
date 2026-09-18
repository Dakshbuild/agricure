import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslate = useRef(new Animated.Value(20)).current;
  const leafRotate = useRef(new Animated.Value(0)).current;
  const circle1Scale = useRef(new Animated.Value(0)).current;
  const circle2Scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(COLORS.primary);

    Animated.sequence([
      // Circles expand first
      Animated.parallel([
        Animated.spring(circle1Scale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
        Animated.spring(circle2Scale, { toValue: 1, tension: 40, friction: 8, useNativeDriver: true, delay: 150 }),
      ]),
      // Logo appears
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(leafRotate, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      // Tagline slides up
      Animated.parallel([
        Animated.timing(taglineOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(taglineTranslate, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3200);

    return () => {
      clearTimeout(timer);
      StatusBar.setBarStyle('dark-content');
    };
  }, [navigation]);

  const leafSpin = leafRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      {/* Background Decorative Circles */}
      <Animated.View
        style={[styles.bgCircle1, { transform: [{ scale: circle1Scale }] }]}
      />
      <Animated.View
        style={[styles.bgCircle2, { transform: [{ scale: circle2Scale }] }]}
      />
      <Animated.View
        style={[styles.bgCircle3, { transform: [{ scale: circle1Scale }] }]}
      />

      {/* Center Content */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }, { rotate: leafSpin }],
          },
        ]}
      >
        <Text style={styles.leafEmoji}>🌿</Text>
      </Animated.View>

      <Animated.View style={{ opacity: logoOpacity, transform: [{ scale: logoScale }] }}>
        <Text style={styles.appName}>CroPly</Text>
        <Text style={styles.teamName}>by AGRI CURE</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.taglineContainer,
          {
            opacity: taglineOpacity,
            transform: [{ translateY: taglineTranslate }],
          },
        ]}
      >
        <Text style={styles.tagline}>Scan Early. Act Smart. Save Crops.</Text>
        <View style={styles.dotRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>

      {/* Bottom badge */}
      <Animated.View style={[styles.badge, { opacity: taglineOpacity }]}>
        <Text style={styles.badgeText}>🏆 Smart India Hackathon 2024</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: COLORS.primaryDark,
    top: -width * 0.5,
    left: -width * 0.1,
    opacity: 0.4,
  },
  bgCircle2: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: COLORS.primaryLight,
    bottom: -width * 0.2,
    right: -width * 0.2,
    opacity: 0.2,
  },
  bgCircle3: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    top: height * 0.3,
    left: -50,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  leafEmoji: {
    fontSize: 52,
  },
  appName: {
    fontSize: SIZES.fontBig,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  teamName: {
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    color: COLORS.accentLight,
    textAlign: 'center',
    letterSpacing: 4,
    marginTop: 4,
    opacity: 0.9,
  },
  taglineContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  tagline: {
    fontSize: SIZES.fontLg,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 26,
  },
  dotRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.accent,
  },
  badge: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: SIZES.fontSm,
    fontWeight: '600',
  },
});
