import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { useAppStore } from '../store/useAppStore';
import { sendOTP, verifyOTP, googleLogin } from '../services/api';
import { LanguageSelector } from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

type Step = 'phone' | 'otp';

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const { setUser } = useAppStore();
  const otpRefs = useRef<TextInput[]>([]);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const slideToOTP = () => {
    Animated.spring(slideAnim, { toValue: -width, tension: 80, friction: 12, useNativeDriver: true }).start();
  };

  const handleSendOTP = async () => {
    if (phone.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    try {
      await sendOTP(`+91${phone}`);
      setStep('otp');
      slideToOTP();
      // Start resend countdown
      let t = 30;
      setResendTimer(t);
      const interval = setInterval(() => {
        t -= 1;
        setResendTimer(t);
        if (t === 0) clearInterval(interval);
      }, 1000);
    } catch {
      // Demo mode: proceed anyway
      setStep('otp');
      slideToOTP();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otpStr = otp.join('');
    if (otpStr.length < 6) {
      Alert.alert('Invalid OTP', 'Please enter the complete 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const result = await verifyOTP(`+91${phone}`, otpStr);
      if (result.token && result.user) {
        setUser(result.user, result.token);
        navigation.replace('Main');
      }
    } catch {
      // Demo mode: skip to main
      setUser(
        { id: 'demo_user', name: 'Ramesh Kumar', phone: `+91${phone}`, language: 'en' },
        'demo_token'
      );
      navigation.replace('Main');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // In production: use expo-auth-session for Google OAuth
      // Demo: skip to main
      setUser(
        { id: 'google_user', name: 'Ramesh Kumar', email: 'ramesh@gmail.com', language: 'en' },
        'google_demo_token'
      );
      navigation.replace('Main');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpInput = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (!val && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* ── Top Illustration ── */}
          <View style={styles.heroSection}>
            <TouchableOpacity 
              style={styles.langButton}
              onPress={() => setLangModalVisible(true)}
            >
              <Text style={styles.langButtonText}>🌐 Language</Text>
            </TouchableOpacity>
            <View style={styles.heroCircle} />
            <View style={styles.heroCircleSmall} />
            <Text style={styles.heroEmoji}>🌱</Text>
            <Text style={styles.heroTitle}>CroPly</Text>
            <Text style={styles.heroSub}>{t('home.title', 'Smart Agriculture Platform')}</Text>
          </View>

          {/* ── Sliding Form Card ── */}
          <View style={styles.formWrapper}>
            <Animated.View
              style={[styles.slideContainer, { transform: [{ translateX: slideAnim }] }]}
            >
              {/* STEP 1: Phone */}
              <View style={[styles.formSlide, { width }]}>
                <View style={styles.formCard}>
                  <Text style={styles.formTitle}>Welcome Back 👋</Text>
                  <Text style={styles.formSubtitle}>Enter your phone number to continue</Text>

                  <View style={styles.phoneInputRow}>
                    <View style={styles.countryCode}>
                      <Text style={styles.flag}>🇮🇳</Text>
                      <Text style={styles.codeText}>+91</Text>
                    </View>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="9876543210"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={phone}
                      onChangeText={setPhone}
                      placeholderTextColor={COLORS.textMuted}
                    />
                  </View>

                  <TouchableOpacity
                    style={[styles.primaryBtn, loading && styles.btnDisabled]}
                    onPress={handleSendOTP}
                    disabled={loading}
                    activeOpacity={0.85}
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.primaryBtnText}>Send OTP →</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  <TouchableOpacity
                    style={styles.googleBtn}
                    onPress={handleGoogleLogin}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.googleIcon}>G</Text>
                    <Text style={styles.googleBtnText}>Continue with Google</Text>
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    By continuing, you agree to CroPly's{' '}
                    <Text style={styles.termsLink}>Terms & Privacy Policy</Text>
                  </Text>
                </View>
              </View>

              {/* STEP 2: OTP */}
              <View style={[styles.formSlide, { width }]}>
                <View style={styles.formCard}>
                  <TouchableOpacity style={styles.backBtn} onPress={() => { setStep('phone'); Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start(); }}>
                    <Text style={styles.backBtnText}>← Back</Text>
                  </TouchableOpacity>

                  <Text style={styles.formTitle}>Verify OTP 🔐</Text>
                  <Text style={styles.formSubtitle}>
                    Enter the 6-digit code sent to{'\n'}
                    <Text style={styles.phoneHighlight}>+91 {phone}</Text>
                  </Text>

                  <View style={styles.otpContainer}>
                    {otp.map((digit, idx) => (
                      <TextInput
                        key={idx}
                        ref={(ref) => { if (ref) otpRefs.current[idx] = ref; }}
                        style={[styles.otpBox, digit !== '' && styles.otpBoxFilled]}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(val) => handleOtpInput(val, idx)}
                        textAlign="center"
                      />
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[styles.primaryBtn, loading && styles.btnDisabled]}
                    onPress={handleVerifyOTP}
                    disabled={loading}
                    activeOpacity={0.85}
                  >
                    {loading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text style={styles.primaryBtnText}>Verify & Continue ✓</Text>
                    )}
                  </TouchableOpacity>

                  {resendTimer > 0 ? (
                    <Text style={styles.resendTimer}>Resend OTP in {resendTimer}s</Text>
                  ) : (
                    <TouchableOpacity onPress={handleSendOTP}>
                      <Text style={styles.resendLink}>Resend OTP</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <LanguageSelector 
        visible={langModalVisible} 
        onClose={() => setLangModalVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  langButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroSection: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.primaryDark,
    top: -100,
    right: -80,
    opacity: 0.4,
  },
  heroCircleSmall: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.primaryLight,
    bottom: -60,
    left: -40,
    opacity: 0.2,
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: SIZES.fontDisplay,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: SIZES.fontMd,
    marginTop: 4,
    fontWeight: '500',
  },
  formWrapper: {
    overflow: 'hidden',
    flex: 1,
  },
  slideContainer: {
    flexDirection: 'row',
  },
  formSlide: {
    padding: SIZES.xl,
    paddingTop: SIZES.xxl,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusXl,
    padding: SIZES.xl,
    ...SHADOWS.lg,
  },
  backBtn: {
    marginBottom: SIZES.md,
  },
  backBtnText: {
    color: COLORS.primary,
    fontSize: SIZES.fontMd,
    fontWeight: '600',
  },
  formTitle: {
    fontSize: SIZES.fontXxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: SIZES.fontMd,
    color: COLORS.textTertiary,
    marginBottom: SIZES.xl,
    lineHeight: 22,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.surfaceDim,
    marginBottom: SIZES.lg,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.padding,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    gap: 6,
  },
  flag: { fontSize: 20 },
  codeText: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: SIZES.md,
    fontSize: SIZES.fontLg,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  btnDisabled: {
    backgroundColor: COLORS.textMuted,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: SIZES.fontLg,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.lg,
    gap: SIZES.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: SIZES.fontSm,
    fontWeight: '500',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingVertical: 16,
    borderRadius: SIZES.radiusMd,
    gap: 10,
    backgroundColor: COLORS.surface,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4285F4',
  },
  googleBtnText: {
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  termsText: {
    textAlign: 'center',
    fontSize: SIZES.fontXs,
    color: COLORS.textMuted,
    marginTop: SIZES.lg,
    lineHeight: 18,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xl,
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMd,
    fontSize: SIZES.fontXxl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.surfaceDim,
  },
  otpBoxFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySurface,
    color: COLORS.primary,
  },
  phoneHighlight: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  resendTimer: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: SIZES.fontSm,
    marginTop: SIZES.md,
  },
  resendLink: {
    textAlign: 'center',
    color: COLORS.primary,
    fontSize: SIZES.fontMd,
    fontWeight: '600',
    marginTop: SIZES.md,
  },
});
