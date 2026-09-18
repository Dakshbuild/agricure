import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Animated, StatusBar, RefreshControl,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { fetchWateringRecommendation } from '../services/api';

const CROPS = ['Tomato', 'Wheat', 'Potato', 'Rice', 'Maize', 'Cotton'];

function WaterDrops({ level }: { level: string }) {
  const levels: Record<string, number> = { Low: 1, Medium: 2, High: 3 };
  const n = levels[level] || 2;
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {[1, 2, 3].map((i) => (
        <Text key={i} style={{ fontSize: 20, opacity: i <= n ? 1 : 0.2 }}>💧</Text>
      ))}
    </View>
  );
}

export default function SmartWateringScreen({ navigation }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const moistureAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => { loadData(); }, [selectedCrop]);

  const loadData = async () => {
    try {
      const result = await fetchWateringRecommendation({ crop: selectedCrop });
      setData(result);
      Animated.parallel([
        Animated.timing(moistureAnim, { toValue: result.soilMoisture || 55, duration: 1200, useNativeDriver: false }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    } catch {
      setData({
        crop: selectedCrop, growthStage: 'Flowering', soilMoisture: 55,
        waterNeeded: 'Low', waterAmount: 12, nextWatering: 'Tomorrow Morning',
        recommendation: 'Light watering in the morning (before 8 AM). Avoid evening watering.',
        schedule: [
          { time: '06:00 AM', duration: '20 min', zone: 'Zone A (North)', status: 'Scheduled' },
          { time: '06:25 AM', duration: '15 min', zone: 'Zone B (South)', status: 'Scheduled' },
        ],
        tomorrow: { waterNeeded: 'High', waterAmount: 25, reason: 'Clear skies tomorrow with high evapotranspiration.' },
        waterSavingTips: ['Use drip irrigation to reduce water use by 40%', 'Water in early morning to minimize evaporation', 'Mulch around plants to retain soil moisture'],
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => { setRefreshing(true); loadData(); };

  const moistureWidth = moistureAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  const moistureColor = moistureAnim.interpolate({
    inputRange: [0, 30, 60, 100],
    outputRange: ['#EF4444', '#F59E0B', '#2E7D32', '#1565C0'],
  });

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingBox}>
          <Text style={{ fontSize: 48 }}>💧</Text>
          <Text style={styles.loadingText}>Calculating water needs...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D47A1" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />}
      >
        {/* Hero */}
        <View style={styles.heroCard}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.heroTitle}>Smart Watering</Text>
          <Text style={styles.heroSub}>AI-powered irrigation scheduling</Text>
          <Text style={styles.heroEmoji}>💧</Text>
          <Text style={styles.waterAmount}>{data.waterAmount} mm</Text>
          <Text style={styles.waterAmountLabel}>Today's Requirement</Text>
          <WaterDrops level={data.waterNeeded} />
          <View style={styles.heroPills}>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>🌿 {data.crop}</Text>
            </View>
            <View style={styles.heroPill}>
              <Text style={styles.heroPillText}>📅 {data.growthStage}</Text>
            </View>
          </View>
        </View>

        <Animated.View style={{ opacity: fadeAnim, paddingHorizontal: SIZES.padding }}>
          {/* Crop Selector */}
          <Text style={styles.sectionTitle}>Select Crop</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropScroll}>
            {CROPS.map((crop) => (
              <TouchableOpacity
                key={crop}
                style={[styles.cropChip, selectedCrop === crop && styles.cropChipActive]}
                onPress={() => { setSelectedCrop(crop); setLoading(true); }}
              >
                <Text style={[styles.cropChipText, selectedCrop === crop && { color: '#FFF' }]}>{crop}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Soil Moisture */}
          <View style={styles.moistureCard}>
            <View style={styles.moistureHeader}>
              <Text style={styles.moistureTitle}>🌍 Soil Moisture</Text>
              <Text style={styles.moistureValue}>{data.soilMoisture}%</Text>
            </View>
            <View style={styles.moistureBarBg}>
              <Animated.View style={[styles.moistureBar, { width: moistureWidth, backgroundColor: moistureColor }]} />
            </View>
            <View style={styles.moistureLegend}>
              <Text style={styles.moistureLegendText}>Dry</Text>
              <Text style={styles.moistureLegendText}>Optimal</Text>
              <Text style={styles.moistureLegendText}>Wet</Text>
            </View>
          </View>

          {/* Today vs Tomorrow */}
          <Text style={styles.sectionTitle}>Water Forecast</Text>
          <View style={styles.forecastRow}>
            <View style={[styles.forecastCard, { borderColor: COLORS.primary + '50' }]}>
              <Text style={styles.forecastDay}>Today</Text>
              <Text style={styles.forecastEmoji}>💧</Text>
              <Text style={[styles.forecastAmount, { color: COLORS.primary }]}>{data.waterAmount} mm</Text>
              <View style={[styles.forecastBadge, { backgroundColor: COLORS.primarySurface }]}>
                <Text style={[styles.forecastBadgeText, { color: COLORS.primary }]}>{data.waterNeeded} Need</Text>
              </View>
            </View>
            <View style={[styles.forecastCard, { borderColor: COLORS.danger + '30' }]}>
              <Text style={styles.forecastDay}>Tomorrow</Text>
              <Text style={styles.forecastEmoji}>⬆️</Text>
              <Text style={[styles.forecastAmount, { color: COLORS.danger }]}>{data.tomorrow?.waterAmount} mm</Text>
              <View style={[styles.forecastBadge, { backgroundColor: COLORS.dangerLight }]}>
                <Text style={[styles.forecastBadgeText, { color: COLORS.danger }]}>{data.tomorrow?.waterNeeded} Need</Text>
              </View>
            </View>
          </View>

          {/* AI Recommendation */}
          <View style={styles.recCard}>
            <Text style={styles.recTitle}>🤖 AI Recommendation</Text>
            <Text style={styles.recText}>{data.recommendation}</Text>
            <View style={styles.recDetail}>
              <Text style={styles.recDetailIcon}>⏰</Text>
              <Text style={styles.recDetailText}>Next watering: {data.nextWatering}</Text>
            </View>
          </View>

          {/* Irrigation Schedule */}
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          {(data.schedule || []).map((s: any, i: number) => (
            <View key={i} style={styles.scheduleItem}>
              <View style={styles.scheduleLeft}>
                <Text style={styles.scheduleTime}>{s.time}</Text>
                <Text style={styles.scheduleDuration}>{s.duration}</Text>
              </View>
              <View style={styles.scheduleMiddle}>
                <Text style={styles.scheduleZone}>{s.zone}</Text>
                <View style={[styles.statusPill, { backgroundColor: COLORS.primarySurface }]}>
                  <Text style={[styles.statusPillText, { color: COLORS.primary }]}>✅ {s.status}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Water Saving Tips */}
          <Text style={styles.sectionTitle}>💡 Water Saving Tips</Text>
          <View style={styles.tipsCard}>
            {(data.waterSavingTips || []).map((tip: string, i: number) => (
              <View key={i} style={styles.tipRow}>
                <Text style={styles.tipNum}>{i + 1}</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: {},
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: COLORS.textSecondary, fontSize: SIZES.fontBase },

  heroCard: { backgroundColor: '#0D47A1', paddingTop: 60, paddingBottom: 32, paddingHorizontal: SIZES.xl, alignItems: 'center', gap: 6 },
  backBtn: { position: 'absolute', top: 16, left: SIZES.padding, width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  backIcon: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  heroTitle: { color: '#FFF', fontSize: SIZES.fontXxl, fontWeight: '800', marginBottom: 2 },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: SIZES.fontSm },
  heroEmoji: { fontSize: 56, marginTop: 8 },
  waterAmount: { fontSize: 56, fontWeight: '800', color: '#FFF', lineHeight: 64 },
  waterAmountLabel: { color: 'rgba(255,255,255,0.7)', fontSize: SIZES.fontSm, marginBottom: 4 },
  heroPills: { flexDirection: 'row', gap: 8, marginTop: 12 },
  heroPill: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: SIZES.radiusFull },
  heroPillText: { color: '#FFF', fontSize: SIZES.fontSm, fontWeight: '600' },

  sectionTitle: { fontSize: SIZES.fontBase, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 12, marginTop: 20 },
  cropScroll: { marginBottom: 4 },
  cropChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: SIZES.radiusFull, backgroundColor: COLORS.surface, marginRight: 10, borderWidth: 1.5, borderColor: COLORS.border, ...SHADOWS.sm },
  cropChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  cropChipText: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, fontWeight: '600' },

  moistureCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, ...SHADOWS.sm, marginBottom: 4 },
  moistureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  moistureTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary },
  moistureValue: { fontSize: SIZES.fontXxl, fontWeight: '800', color: COLORS.primary },
  moistureBarBg: { height: 14, backgroundColor: COLORS.surfaceDim, borderRadius: 7, overflow: 'hidden', marginBottom: 8 },
  moistureBar: { height: '100%', borderRadius: 7 },
  moistureLegend: { flexDirection: 'row', justifyContent: 'space-between' },
  moistureLegendText: { fontSize: SIZES.fontXs, color: COLORS.textMuted },

  forecastRow: { flexDirection: 'row', gap: 12 },
  forecastCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, alignItems: 'center', borderWidth: 1.5, ...SHADOWS.sm },
  forecastDay: { fontSize: SIZES.fontSm, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 8 },
  forecastEmoji: { fontSize: 32, marginBottom: 4 },
  forecastAmount: { fontSize: SIZES.fontXxl, fontWeight: '800', marginBottom: 8 },
  forecastBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: SIZES.radiusFull },
  forecastBadgeText: { fontSize: SIZES.fontXs, fontWeight: '700' },

  recCard: { backgroundColor: COLORS.primarySurface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, borderWidth: 1, borderColor: COLORS.primary + '30', ...SHADOWS.sm },
  recTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.primary, marginBottom: 8 },
  recText: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 22, marginBottom: 10 },
  recDetail: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  recDetailIcon: { fontSize: 14 },
  recDetailText: { fontSize: SIZES.fontSm, color: COLORS.primary, fontWeight: '600' },

  scheduleItem: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, flexDirection: 'row', gap: 12, marginBottom: 8, ...SHADOWS.sm },
  scheduleLeft: { alignItems: 'center' },
  scheduleTime: { fontSize: SIZES.fontBase, fontWeight: '800', color: COLORS.textPrimary },
  scheduleDuration: { fontSize: SIZES.fontXs, color: COLORS.textMuted, marginTop: 2 },
  scheduleMiddle: { flex: 1 },
  scheduleZone: { fontSize: SIZES.fontBase, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 4 },
  statusPill: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: SIZES.radiusFull },
  statusPillText: { fontSize: SIZES.fontXs, fontWeight: '700' },

  tipsCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, ...SHADOWS.sm },
  tipRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  tipNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.primarySurface, textAlign: 'center', lineHeight: 22, fontSize: SIZES.fontXs, fontWeight: '800', color: COLORS.primary },
  tipText: { flex: 1, fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 20 },
});
