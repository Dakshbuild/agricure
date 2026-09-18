import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { useAppStore } from '../store/useAppStore';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', desc: 'Proceed in English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳', desc: 'हिंदी में जारी रखें' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', desc: 'ਪੰਜਾਬੀ ਵਿੱਚ ਜਾਰੀ ਰੱਖੋ' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', desc: 'मराठीत सुरू ठेवा' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', desc: 'தமிழில் தொடரவும்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', desc: 'తెలుగులో కొనసాగించండి' },
];

export default function LanguageScreen({ navigation }: any) {
  const [selected, setSelected] = useState('en');
  const { setLanguage, setLanguageSelected } = useAppStore();

  const handleContinue = () => {
    setLanguage(selected);
    setLanguageSelected();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIconWrap}>
          <Text style={styles.headerIcon}>🌐</Text>
        </View>
        <Text style={styles.title}>Choose Your Language</Text>
        <Text style={styles.subtitle}>
          Select your preferred language.{'\n'}You can change this later in Settings.
        </Text>
      </View>

      {/* Language Options */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const isSelected = selected === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.langCard, isSelected && styles.langCardSelected]}
              onPress={() => setSelected(lang.code)}
              activeOpacity={0.75}
            >
              <View style={[styles.flagWrap, isSelected && styles.flagWrapSelected]}>
                <Text style={styles.flag}>{lang.flag}</Text>
              </View>
              <View style={styles.langInfo}>
                <Text style={[styles.langName, isSelected && styles.langNameSelected]}>
                  {lang.native}
                </Text>
                <Text style={styles.langDesc}>{lang.desc}</Text>
              </View>
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Continue in {LANGUAGES.find(l => l.code === selected)?.name}</Text>
          <Text style={styles.continueBtnArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: SIZES.xl,
    paddingBottom: SIZES.lg,
  },
  headerIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: COLORS.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  headerIcon: {
    fontSize: 36,
  },
  title: {
    fontSize: SIZES.fontXxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: SIZES.fontMd,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.md,
    gap: 12,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.padding,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  langCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySurface,
  },
  flagWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceDim,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.md,
  },
  flagWrapSelected: {
    backgroundColor: COLORS.primary + '20',
  },
  flag: {
    fontSize: 28,
  },
  langInfo: {
    flex: 1,
  },
  langName: {
    fontSize: SIZES.fontLg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  langNameSelected: {
    color: COLORS.primary,
  },
  langDesc: {
    fontSize: SIZES.fontSm,
    color: COLORS.textTertiary,
    marginTop: 3,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.lg,
    paddingBottom: 36,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  continueBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingVertical: 18,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...SHADOWS.md,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: SIZES.fontLg,
    fontWeight: '700',
  },
  continueBtnArrow: {
    color: '#FFFFFF',
    fontSize: SIZES.fontXl,
    fontWeight: '700',
  },
});
