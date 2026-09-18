import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';

export default function TreatmentGuideScreen({ route, navigation }: any) {
  const { result } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Full Treatment Guide</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.diseaseName}>{result?.disease || 'Tomato Leaf Spot'}</Text>
          <Text style={styles.introText}>
            Below is a comprehensive guide to treating this disease. We recommend starting with organic methods if the severity is low, and escalating to chemical treatments if it's severe.
          </Text>
        </View>

        {/* Phase 1: Immediate Action */}
        <View style={styles.phaseCard}>
          <View style={styles.phaseHeader}>
            <View style={[styles.phaseNum, { backgroundColor: COLORS.warningLight }]}>
              <Text style={[styles.phaseNumText, { color: COLORS.warning }]}>1</Text>
            </View>
            <Text style={styles.phaseTitle}>Immediate Action</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepBullet}>•</Text>
            <Text style={styles.stepText}>Remove and destroy all infected leaves immediately.</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepBullet}>•</Text>
            <Text style={styles.stepText}>Do not compost infected material; burn or bag it.</Text>
          </View>
          <View style={styles.stepItem}>
            <Text style={styles.stepBullet}>•</Text>
            <Text style={styles.stepText}>Stop overhead watering to keep foliage dry.</Text>
          </View>
        </View>

        {/* Phase 2: Organic Application */}
        <View style={styles.phaseCard}>
          <View style={styles.phaseHeader}>
            <View style={[styles.phaseNum, { backgroundColor: COLORS.primarySurface }]}>
              <Text style={[styles.phaseNumText, { color: COLORS.primary }]}>2</Text>
            </View>
            <Text style={styles.phaseTitle}>Organic Treatment</Text>
          </View>
          {(result?.organicTreatment?.steps || ['Spray neem oil solution (2%) every 7 days', 'Apply Bordeaux mixture']).map((s: string, i: number) => (
            <View key={i} style={styles.stepItem}>
              <Text style={styles.stepNum}>{i + 1}.</Text>
              <Text style={styles.stepText}>{s}</Text>
            </View>
          ))}
          <Text style={styles.subHeading}>Recommended Products:</Text>
          <View style={styles.productRow}>
            {(result?.organicTreatment?.medicines || ['Neem Oil', 'Bordeaux Mix']).map((m: string, i: number) => (
              <View key={i} style={styles.productChip}>
                <Text style={styles.productChipText}>🌿 {m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Phase 3: Chemical Application */}
        <View style={styles.phaseCard}>
          <View style={styles.phaseHeader}>
            <View style={[styles.phaseNum, { backgroundColor: COLORS.dangerLight }]}>
              <Text style={[styles.phaseNumText, { color: COLORS.danger }]}>3</Text>
            </View>
            <Text style={styles.phaseTitle}>Chemical Treatment</Text>
          </View>
          {(result?.chemicalTreatment?.steps || ['Apply Mancozeb 75% WP @ 2.0g/L', 'Spray Azoxystrobin (0.1%)']).map((s: string, i: number) => (
            <View key={i} style={styles.stepItem}>
              <Text style={styles.stepNum}>{i + 1}.</Text>
              <Text style={styles.stepText}>{s}</Text>
            </View>
          ))}
          <Text style={styles.subHeading}>Recommended Chemicals:</Text>
          <View style={styles.productRow}>
            {(result?.chemicalTreatment?.medicines || ['Mancozeb 75%', 'Azoxystrobin']).map((m: string, i: number) => (
              <View key={i} style={[styles.productChip, { backgroundColor: COLORS.dangerLight }]}>
                <Text style={[styles.productChipText, { color: COLORS.danger }]}>🧪 {m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Shop CTA */}
        <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('FarmConnect')}>
          <Text style={styles.shopBtnText}>🛒 Find Nearby Agri Shops</Text>
        </TouchableOpacity>

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

  introCard: { backgroundColor: COLORS.surface, padding: SIZES.padding, borderRadius: SIZES.radiusMd, marginBottom: 16, ...SHADOWS.sm, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  diseaseName: { fontSize: SIZES.fontXl, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 8 },
  introText: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 22 },

  phaseCard: { backgroundColor: COLORS.surface, padding: SIZES.padding, borderRadius: SIZES.radiusMd, marginBottom: 16, ...SHADOWS.sm },
  phaseHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  phaseNum: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  phaseNumText: { fontSize: SIZES.fontSm, fontWeight: '800' },
  phaseTitle: { fontSize: SIZES.fontLg, fontWeight: '700', color: COLORS.textPrimary },
  
  stepItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  stepBullet: { fontSize: SIZES.fontMd, color: COLORS.textMuted, marginTop: -2 },
  stepNum: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, fontWeight: '600' },
  stepText: { flex: 1, fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 22 },

  subHeading: { fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.textPrimary, marginTop: 12, marginBottom: 8 },
  productRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  productChip: { backgroundColor: COLORS.primarySurface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: SIZES.radiusFull },
  productChipText: { fontSize: SIZES.fontSm, color: COLORS.primary, fontWeight: '600' },

  shopBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: SIZES.radiusMd, alignItems: 'center', ...SHADOWS.md, marginTop: 8 },
  shopBtnText: { color: '#FFF', fontSize: SIZES.fontBase, fontWeight: '700' },
});
