import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, Animated, StatusBar, Share,
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { useTranslation } from 'react-i18next';

const SEVERITY_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
  High: { color: COLORS.riskHigh, bg: COLORS.dangerLight, icon: '🔴' },
  Medium: { color: COLORS.riskMedium, bg: COLORS.warningLight, icon: '🟡' },
  Low: { color: COLORS.riskLow, bg: COLORS.successLight, icon: '🟢' },
  None: { color: COLORS.riskNone, bg: COLORS.infoLight, icon: '✅' },
};

type TabKey = 'symptoms' | 'treatment' | 'prevention';

export default function ScanResultScreen({ route, navigation }: any) {
  const { t } = useTranslation();
  const { result, crop = 'Tomato', imageUri } = route.params || {};
  const [activeTab, setActiveTab] = useState<TabKey>('symptoms');
  const confidenceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const sev = result?.severity || 'Medium';
  const sevConfig = SEVERITY_CONFIG[sev] || SEVERITY_CONFIG.Medium;
  const confidence = result?.confidence || 91;
  const isHealthy = result?.disease?.toLowerCase() === 'healthy';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(confidenceAnim, { toValue: confidence, duration: 1400, useNativeDriver: false }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const confidenceWidth = confidenceAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleShare = async () => {
    try {
      await Share.share({
        title: 'CroPly Disease Report',
        message: `🌱 CroPly AI Scan Report\n\nCrop: ${crop}\nDisease: ${result?.disease || 'N/A'}\nConfidence: ${confidence}%\nSeverity: ${sev}\n\nRecommendation: ${result?.riskSummary || 'See full report in CroPly app.'}\n\nPowered by CroPly - Smart Agriculture Platform`,
      });
    } catch {}
  };

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'symptoms', label: 'Symptoms', icon: '🔍' },
    { key: 'treatment', label: 'Treatment', icon: '💊' },
    { key: 'prevention', label: 'Prevention', icon: '🛡️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('scanResult.title', 'Scan Result')}</Text>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.shareIcon}>↗</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Disease Banner */}
          <View style={[styles.diseaseBanner, { borderColor: sevConfig.color + '40', backgroundColor: sevConfig.bg }]}>
            <View style={styles.bannerTop}>
              <Text style={styles.bannerEmoji}>{isHealthy ? '✅' : '🦠'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.diseaseName, { color: isHealthy ? COLORS.primary : COLORS.textPrimary }]}>
                  {result?.disease || 'Tomato Leaf Spot'}
                </Text>
                {result?.scientificName && (
                  <Text style={styles.scientificName}>{result.scientificName}</Text>
                )}
                <View style={[styles.severityBadge, { backgroundColor: sevConfig.color }]}>
                  <Text style={styles.severityText}>{sevConfig.icon} {sev} Severity</Text>
                </View>
              </View>
            </View>
            <Text style={styles.riskSummary}>{result?.riskSummary}</Text>
          </View>

          {/* Confidence Meter */}
          <View style={styles.confidenceCard}>
            <View style={styles.confRow}>
              <Text style={styles.confLabel}>{t('scanResult.aiConfidence', 'AI Confidence')}</Text>
              <Text style={[styles.confValue, { color: confidence >= 85 ? COLORS.primary : COLORS.warning }]}>
                {confidence}%
              </Text>
            </View>
            <View style={styles.confBarBg}>
              <Animated.View
                style={[
                  styles.confBar,
                  {
                    width: confidenceWidth,
                    backgroundColor: confidence >= 85 ? COLORS.primary : confidence >= 70 ? COLORS.warning : COLORS.danger,
                  },
                ]}
              />
            </View>
            <Text style={styles.confNote}>
              {confidence >= 85 ? t('scanResult.highConf', '✅ High confidence result') : t('scanResult.lowConf', '⚠️ Consider re-scanning in better light')}
            </Text>
          </View>

          {/* Crop Info */}
          <View style={styles.cropInfoRow}>
            <View style={styles.cropInfoChip}>
              <Text style={styles.cropInfoLabel}>🌿 Crop</Text>
              <Text style={styles.cropInfoValue}>{crop}</Text>
            </View>
            <View style={styles.cropInfoChip}>
              <Text style={styles.cropInfoLabel}>📅 Scanned</Text>
              <Text style={styles.cropInfoValue}>Just now</Text>
            </View>
            <View style={styles.cropInfoChip}>
              <Text style={styles.cropInfoLabel}>🔬 Model</Text>
              <Text style={styles.cropInfoValue}>CroPly AI</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabBar}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.75}
              >
                <Text style={styles.tabIcon}>{tab.icon}</Text>
                <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content: Symptoms */}
          {activeTab === 'symptoms' && (
            <View style={styles.tabContent}>
              <Text style={styles.contentTitle}>🔍 Symptoms</Text>
              {(result?.symptoms || ['Small brown spots with yellow halo on leaves', 'Spots enlarge and merge causing leaf blight', 'Dark brown lesions on stems', 'Premature defoliation in severe cases']).map((s: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <View style={styles.listDot} />
                  <Text style={styles.listText}>{s}</Text>
                </View>
              ))}
              <Text style={styles.contentTitle} >🧬 Causes</Text>
              {(result?.causes || ['Fungal pathogen Alternaria solani', 'High humidity (above 70%) accelerates spread', 'Poor air circulation around plants', 'Infected seed or soil debris']).map((c: string, i: number) => (
                <View key={i} style={styles.listItem}>
                  <View style={[styles.listDot, { backgroundColor: COLORS.warning }]} />
                  <Text style={styles.listText}>{c}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Tab Content: Treatment */}
          {activeTab === 'treatment' && (
            <View style={styles.tabContent}>
              {/* Organic */}
              <View style={[styles.treatmentCard, { borderColor: COLORS.primary + '40' }]}>
                <View style={styles.treatmentHeader}>
                  <Text style={styles.treatmentHeaderIcon}>🌿</Text>
                  <Text style={[styles.treatmentHeaderTitle, { color: COLORS.primary }]}>Organic Treatment</Text>
                </View>
                {(result?.organicTreatment?.steps || ['Spray neem oil solution (2%) every 7 days', 'Apply Bordeaux mixture (copper-based fungicide)', 'Remove infected leaves immediately', 'Improve air circulation by pruning']).map((s: string, i: number) => (
                  <View key={i} style={styles.listItem}>
                    <Text style={styles.stepNumber}>{i + 1}</Text>
                    <Text style={styles.listText}>{s}</Text>
                  </View>
                ))}
                <View style={styles.medicinesRow}>
                  {(result?.organicTreatment?.medicines || ['Neem Oil', 'Bordeaux Mix', 'Trichoderma']).map((m: string, i: number) => (
                    <View key={i} style={[styles.medicinePill, { backgroundColor: COLORS.primarySurface }]}>
                      <Text style={[styles.medicinePillText, { color: COLORS.primary }]}>💊 {m}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Chemical */}
              <View style={[styles.treatmentCard, { borderColor: COLORS.danger + '30' }]}>
                <View style={styles.treatmentHeader}>
                  <Text style={styles.treatmentHeaderIcon}>🧪</Text>
                  <Text style={[styles.treatmentHeaderTitle, { color: COLORS.danger }]}>Chemical Treatment</Text>
                </View>
                {(result?.chemicalTreatment?.steps || ['Apply Mancozeb 75% WP @ 2.0g/L water', 'Use Iprodione 50% WP as alternate spray', 'Spray Azoxystrobin (0.1%) every 10 days', 'Maintain spray for 3 consecutive weeks']).map((s: string, i: number) => (
                  <View key={i} style={styles.listItem}>
                    <Text style={styles.stepNumber}>{i + 1}</Text>
                    <Text style={styles.listText}>{s}</Text>
                  </View>
                ))}
                <View style={styles.medicineBgRow}>
                  {(result?.chemicalTreatment?.medicines || ['Mancozeb 75%', 'Iprodione 50%', 'Azoxystrobin']).map((m: string, i: number) => (
                    <View key={i} style={[styles.medicinePill, { backgroundColor: COLORS.dangerLight }]}>
                      <Text style={[styles.medicinePillText, { color: COLORS.danger }]}>💉 {m}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.warningBanner}>
                  <Text style={styles.warningText}>⚠️ Wear protective gear. Do not spray before harvest.</Text>
                </View>
              </View>
            </View>
          )}

          {/* Tab Content: Prevention */}
          {activeTab === 'prevention' && (
            <View style={styles.tabContent}>
              <Text style={styles.contentTitle}>🛡️ Preventive Measures</Text>
              {(result?.preventiveMeasures || ['Use certified disease-free seeds', 'Practice 2-year crop rotation', 'Water at the base — avoid overhead irrigation', 'Maintain 45–60 cm spacing between plants', 'Apply preventive copper spray at first sign of rain']).map((p: string, i: number) => (
                <View key={i} style={styles.preventionItem}>
                  <View style={styles.preventionNum}>
                    <Text style={styles.preventionNumText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.listText}>{p}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.treatmentBtn}
              onPress={() => navigation.navigate('TreatmentGuide', { result })}
              activeOpacity={0.85}
            >
              <Text style={styles.treatmentBtnText}>📋 Full Treatment Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareActionBtn} onPress={handleShare} activeOpacity={0.85}>
              <Text style={styles.shareActionBtnText}>↗ Share</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SIZES.padding },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', ...SHADOWS.sm },
  backIcon: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  headerTitle: { fontSize: SIZES.fontLg, fontWeight: '800', color: COLORS.textPrimary },
  shareBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.primarySurface, alignItems: 'center', justifyContent: 'center', ...SHADOWS.sm },
  shareIcon: { fontSize: 18, fontWeight: '700', color: COLORS.primary },

  diseaseBanner: { borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 16, borderWidth: 1.5 },
  bannerTop: { flexDirection: 'row', gap: 12, marginBottom: 10 },
  bannerEmoji: { fontSize: 40 },
  diseaseName: { fontSize: SIZES.fontXl, fontWeight: '800', marginBottom: 4 },
  scientificName: { fontSize: SIZES.fontSm, color: COLORS.textTertiary, fontStyle: 'italic', marginBottom: 6 },
  severityBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: SIZES.radiusFull },
  severityText: { color: '#FFF', fontSize: SIZES.fontXs, fontWeight: '700' },
  riskSummary: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 20 },

  confidenceCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 16, ...SHADOWS.sm },
  confRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  confLabel: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary },
  confValue: { fontSize: SIZES.fontXxl, fontWeight: '800' },
  confBarBg: { height: 10, backgroundColor: COLORS.surfaceDim, borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  confBar: { height: '100%', borderRadius: 5 },
  confNote: { fontSize: SIZES.fontSm, color: COLORS.textMuted },

  cropInfoRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  cropInfoChip: { flex: 1, backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: 10, alignItems: 'center', ...SHADOWS.sm },
  cropInfoLabel: { fontSize: SIZES.fontXs, color: COLORS.textMuted, fontWeight: '600', marginBottom: 4 },
  cropInfoValue: { fontSize: SIZES.fontSm, fontWeight: '700', color: COLORS.textPrimary },

  tabBar: { flexDirection: 'row', backgroundColor: COLORS.surfaceDim, borderRadius: SIZES.radiusMd, padding: 4, marginBottom: 16 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, gap: 4, borderRadius: SIZES.radiusSm },
  tabActive: { backgroundColor: COLORS.surface, ...SHADOWS.sm },
  tabIcon: { fontSize: 14 },
  tabText: { fontSize: SIZES.fontSm, color: COLORS.textMuted, fontWeight: '600' },
  tabTextActive: { color: COLORS.primary, fontWeight: '700' },

  tabContent: { marginBottom: 16 },
  contentTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12, marginTop: 8 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  listDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginTop: 6 },
  listText: { flex: 1, fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 22 },
  stepNumber: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.primarySurface, textAlign: 'center', lineHeight: 22, fontSize: SIZES.fontXs, fontWeight: '800', color: COLORS.primary },

  treatmentCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 12, borderWidth: 1.5, ...SHADOWS.sm },
  treatmentHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  treatmentHeaderIcon: { fontSize: 22 },
  treatmentHeaderTitle: { fontSize: SIZES.fontBase, fontWeight: '800' },
  medicinesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  medicineBgRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  medicinePill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: SIZES.radiusFull },
  medicinePillText: { fontSize: SIZES.fontXs, fontWeight: '700' },
  warningBanner: { backgroundColor: COLORS.warningLight, borderRadius: SIZES.radiusSm, padding: 10, marginTop: 10 },
  warningText: { fontSize: SIZES.fontSm, color: COLORS.warning, fontWeight: '600' },

  preventionItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  preventionNum: { width: 26, height: 26, borderRadius: 13, backgroundColor: COLORS.primarySurface, alignItems: 'center', justifyContent: 'center' },
  preventionNumText: { fontSize: SIZES.fontSm, fontWeight: '800', color: COLORS.primary },

  actionRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  treatmentBtn: { flex: 1, backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: SIZES.radiusMd, alignItems: 'center', ...SHADOWS.md },
  treatmentBtnText: { color: '#FFF', fontSize: SIZES.fontBase, fontWeight: '700' },
  shareActionBtn: { backgroundColor: COLORS.primarySurface, paddingHorizontal: 20, paddingVertical: 16, borderRadius: SIZES.radiusMd, alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.primary },
  shareActionBtnText: { color: COLORS.primary, fontSize: SIZES.fontBase, fontWeight: '700' },
});
