import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, Image, Animated, ActivityIndicator, Alert, StatusBar, Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { analyzeCropImage } from '../services/api';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';

const { width } = Dimensions.get('window');

const CROPS = [
  { name: 'Tomato', emoji: '🍅' },
  { name: 'Wheat', emoji: '🌾' },
  { name: 'Potato', emoji: '🥔' },
  { name: 'Rice', emoji: '🌾' },
  { name: 'Maize', emoji: '🌽' },
  { name: 'Cotton', emoji: '☁️' },
  { name: 'Soybean', emoji: '🌱' },
  { name: 'Sugarcane', emoji: '🎋' },
  { name: 'Onion', emoji: '🧅' },
  { name: 'Chilli', emoji: '🌶️' },
];

export default function CropScanScreen({ navigation }: any) {
  const { t, i18n } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(scanLineAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  };

  const stopScanAnimation = () => {
    scanLineAnim.stopAnimation();
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required to scan crops.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAnalyze = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please capture or select a leaf image first.');
      return;
    }
    setAnalyzing(true);
    startScanAnimation();
    try {
      // Pass the language to the analyze endpoint so it uses Bhashini
      const result = await analyzeCropImage(selectedCrop, imageUri, i18n.language);
      navigation.navigate('ScanResult', { result, crop: selectedCrop, imageUri });
    } catch {
      Alert.alert(t('scan.errorTitle', 'Analysis Failed'), t('scan.errorBody', 'Could not analyze image. Please try again.'));
    } finally {
      setAnalyzing(false);
      stopScanAnimation();
    }
  };

  const scanLineY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{t('scan.title', 'AI Disease Scanner')}</Text>
            <Text style={styles.subtitle}>{t('scan.subtitle', 'Take a clear photo of the affected leaf')}</Text>
          </View>
        </View>

        {/* Camera Box */}
        <Animated.View style={[styles.cameraBox, analyzing && { transform: [{ scale: pulseAnim }] }]}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.cameraPlaceholderIcon}>📷</Text>
              <Text style={styles.cameraPlaceholderText}>{t('scan.tapCapture', 'Tap below to capture a leaf')}</Text>
              <Text style={styles.cameraPlaceholderSub}>{t('scan.bestResults', 'For best results, ensure good lighting')}</Text>
            </View>
          )}

          {/* Scan line animation */}
          {analyzing && (
            <View style={StyleSheet.absoluteFill}>
              <View style={styles.scanOverlay} />
              <Animated.View style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]} />
              <View style={styles.scanCornerTL} />
              <View style={styles.scanCornerTR} />
              <View style={styles.scanCornerBL} />
              <View style={styles.scanCornerBR} />
            </View>
          )}
        </Animated.View>

        {/* Camera / Gallery Buttons */}
        <View style={styles.captureRow}>
          <TouchableOpacity style={styles.captureBtn} onPress={handleCamera} activeOpacity={0.85}>
            <Text style={styles.captureBtnIcon}>📷</Text>
            <Text style={styles.captureBtnText}>{t('scan.camera', 'Camera')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.captureBtn, styles.captureBtnSecondary]} onPress={handleGallery} activeOpacity={0.85}>
            <Text style={styles.captureBtnIcon}>🖼️</Text>
            <Text style={[styles.captureBtnText, { color: COLORS.primary }]}>{t('scan.gallery', 'Gallery')}</Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        {!imageUri && (
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>📌 Tips for best results</Text>
            {[
              'Hold the phone 20–30 cm from the leaf',
              'Capture the affected (spotted/discolored) part',
              'Use natural daylight — avoid flash',
              'Single leaf in frame works best',
            ].map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Crop Selection */}
        <Text style={styles.sectionLabel}>{t('scan.selectCrop', 'Select Crop Type')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropScroll}>
          {CROPS.map((crop) => (
            <TouchableOpacity
              key={crop.name}
              style={[styles.cropChip, selectedCrop === crop.name && styles.cropChipActive]}
              onPress={() => setSelectedCrop(crop.name)}
              activeOpacity={0.75}
            >
              <Text style={styles.cropChipEmoji}>{crop.emoji}</Text>
              <Text style={[styles.cropChipText, selectedCrop === crop.name && styles.cropChipTextActive]}>
                {crop.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Analyze Button */}
        <TouchableOpacity
          style={[styles.analyzeBtn, (!imageUri || analyzing) && styles.analyzeBtnDisabled]}
          onPress={handleAnalyze}
          disabled={!imageUri || analyzing}
          activeOpacity={0.85}
        >
          {analyzing ? (
            <View style={styles.analyzingRow}>
              <ActivityIndicator color="#FFF" size="small" />
              <Text style={styles.analyzeBtnText}>{t('scan.analyzing', 'Analyzing with AI...')}</Text>
            </View>
          ) : (
            <Text style={styles.analyzeBtnText}>
              {imageUri ? t('scan.analyzeBtn', '🔬 Analyze Crop') : t('scan.captureFirst', '📷 Capture Image First')}
            </Text>
          )}
        </TouchableOpacity>

        {/* Supported Diseases Note */}
        <View style={styles.supportedNote}>
          <Text style={styles.supportedNoteText}>{t('scan.supportedNote', '🧬 Detects 50+ diseases • 90%+ accuracy')}</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SIZES.padding },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', ...SHADOWS.sm },
  backIcon: { fontSize: 18, color: COLORS.textPrimary, fontWeight: '700' },
  title: { fontSize: SIZES.fontXl, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: SIZES.fontSm, color: COLORS.textTertiary, marginTop: 2 },

  cameraBox: {
    height: 240, backgroundColor: COLORS.textPrimary, borderRadius: SIZES.radiusLg,
    marginBottom: 16, overflow: 'hidden', ...SHADOWS.lg,
    borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed',
  },
  previewImage: { width: '100%', height: '100%' },
  cameraPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  cameraPlaceholderIcon: { fontSize: 48, opacity: 0.6 },
  cameraPlaceholderText: { color: '#FFF', fontSize: SIZES.fontBase, fontWeight: '600', opacity: 0.8 },
  cameraPlaceholderSub: { color: '#FFF', fontSize: SIZES.fontSm, opacity: 0.5 },

  scanOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(46,125,50,0.1)' },
  scanLine: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: COLORS.primary, shadowColor: COLORS.primary, shadowOpacity: 0.8, shadowRadius: 6, elevation: 5 },
  scanCornerTL: { position: 'absolute', top: 12, left: 12, width: 24, height: 24, borderTopWidth: 3, borderLeftWidth: 3, borderColor: COLORS.primary, borderRadius: 2 },
  scanCornerTR: { position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderTopWidth: 3, borderRightWidth: 3, borderColor: COLORS.primary, borderRadius: 2 },
  scanCornerBL: { position: 'absolute', bottom: 12, left: 12, width: 24, height: 24, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: COLORS.primary, borderRadius: 2 },
  scanCornerBR: { position: 'absolute', bottom: 12, right: 12, width: 24, height: 24, borderBottomWidth: 3, borderRightWidth: 3, borderColor: COLORS.primary, borderRadius: 2 },

  captureRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  captureBtn: { flex: 1, backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: SIZES.radiusMd, gap: 6, ...SHADOWS.md },
  captureBtnSecondary: { backgroundColor: COLORS.surface, borderWidth: 2, borderColor: COLORS.primary },
  captureBtnIcon: { fontSize: 18 },
  captureBtnText: { color: '#FFF', fontSize: SIZES.fontBase, fontWeight: '700' },

  tipsCard: { backgroundColor: COLORS.primarySurface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 20, borderWidth: 1, borderColor: COLORS.primary + '30' },
  tipsTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.primary, marginBottom: 12 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  tipDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginTop: 6 },
  tipText: { flex: 1, fontSize: SIZES.fontSm, color: COLORS.textSecondary, lineHeight: 20 },

  sectionLabel: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  cropScroll: { marginBottom: 20 },
  cropChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: SIZES.radiusFull, backgroundColor: COLORS.surface, marginRight: 10, borderWidth: 1.5, borderColor: COLORS.border, ...SHADOWS.sm },
  cropChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  cropChipEmoji: { fontSize: 16 },
  cropChipText: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, fontWeight: '600' },
  cropChipTextActive: { color: '#FFF' },

  analyzeBtn: { backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: SIZES.radiusMd, alignItems: 'center', justifyContent: 'center', marginBottom: 12, ...SHADOWS.md },
  analyzeBtnDisabled: { backgroundColor: COLORS.textMuted },
  analyzeBtnText: { color: '#FFF', fontSize: SIZES.fontLg, fontWeight: '700' },
  analyzingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },

  supportedNote: { alignItems: 'center', padding: SIZES.sm },
  supportedNoteText: { fontSize: SIZES.fontXs, color: COLORS.textMuted, fontWeight: '500' },
});
