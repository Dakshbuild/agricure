import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Animated, StatusBar, RefreshControl,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { fetchWeatherData } from '../services/api';

function RiskBar({ label, score, color }: { label: string; score: number; color: string }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: score, duration: 1000, useNativeDriver: false }).start();
  }, [score]);
  const width = anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  const riskLevel = score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low';
  const riskColors: Record<string, string> = { High: COLORS.danger, Medium: COLORS.warning, Low: COLORS.primary };
  return (
    <View style={riskBarStyles.container}>
      <View style={riskBarStyles.header}>
        <Text style={riskBarStyles.label}>{label}</Text>
        <View style={[riskBarStyles.badge, { backgroundColor: riskColors[riskLevel] + '20' }]}>
          <Text style={[riskBarStyles.badgeText, { color: riskColors[riskLevel] }]}>{riskLevel}</Text>
        </View>
      </View>
      <View style={riskBarStyles.barBg}>
        <Animated.View style={[riskBarStyles.bar, { width, backgroundColor: color }]} />
      </View>
      <Text style={riskBarStyles.score}>{score}%</Text>
    </View>
  );
}
const riskBarStyles = StyleSheet.create({
  container: { marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { fontSize: SIZES.fontBase, fontWeight: '600', color: COLORS.textPrimary },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: SIZES.radiusFull },
  badgeText: { fontSize: SIZES.fontXs, fontWeight: '700' },
  barBg: { height: 10, backgroundColor: COLORS.surfaceDim, borderRadius: 5, overflow: 'hidden', marginBottom: 4 },
  bar: { height: '100%', borderRadius: 5 },
  score: { fontSize: SIZES.fontXs, color: COLORS.textMuted, textAlign: 'right' },
});

export default function WeatherRiskScreen({ navigation }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const result = await fetchWeatherData();
      setData(result);
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    } catch {
      setData({
        location: 'Dehradun, Uttarakhand', temp: 28, humidity: 76, rainChance: 62, wind: 12,
        condition: 'Partly Cloudy', conditionIcon: '⛅',
        alert: 'High humidity detected. Fungal disease risk may increase in the next 48 hours.',
        diseaseRisks: { fungalScore: 78, bacterialScore: 45, humidityScore: 76, rainScore: 62, heatStressScore: 28 },
        forecast: [
          { day: 'Today', temp: 28, rain: 62, condition: '⛅', risk: 'High' },
          { day: 'Tue', temp: 26, rain: 80, condition: '🌧️', risk: 'High' },
          { day: 'Wed', temp: 24, rain: 45, condition: '🌦️', risk: 'Medium' },
          { day: 'Thu', temp: 27, rain: 20, condition: '🌤️', risk: 'Low' },
          { day: 'Fri', temp: 30, rain: 10, condition: '☀️', risk: 'Low' },
        ],
        alerts: [
          { type: 'Fungal', severity: 'High', message: 'Humidity above 75% — Ideal conditions for fungal spread', action: 'Apply preventive fungicide spray within 24 hours' },
          { type: 'Rain', severity: 'Medium', message: '62% rain chance — Avoid pesticide application today', action: 'Schedule sprays for Thursday when rain clears' },
        ],
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => { setRefreshing(true); loadData(); };

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingBox}>
          <Text style={styles.loadingEmoji}>⛅</Text>
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const riskItems = [
    { label: '🍄 Fungal Risk', score: data.diseaseRisks?.fungalScore || 78, color: '#8B5CF6' },
    { label: '🦠 Bacterial Risk', score: data.diseaseRisks?.bacterialScore || 45, color: '#3B82F6' },
    { label: '💧 Humidity Risk', score: data.diseaseRisks?.humidityScore || 76, color: '#06B6D4' },
    { label: '🌧️ Rain Risk', score: data.diseaseRisks?.rainScore || 62, color: '#6366F1' },
    { label: '🌡️ Heat Stress', score: data.diseaseRisks?.heatStressScore || 28, color: '#EF4444' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />}
      >
        {/* Hero Weather Card */}
        <View style={styles.heroCard}>
          <TouchableOpacity style={styles.backBtnLight} onPress={() => navigation.goBack()}>
            <Text style={styles.backIconLight}>←</Text>
          </TouchableOpacity>
          <Text style={styles.locationText}>📍 {data.location}</Text>
          <Text style={styles.conditionEmoji}>{data.conditionIcon || '⛅'}</Text>
          <Text style={styles.tempText}>{data.temp}°C</Text>
          <Text style={styles.conditionText}>{data.condition}</Text>
          <View style={styles.weatherMetrics}>
            {[
              ['💧', `${data.humidity}%`, 'Humidity'],
              ['🌧️', `${data.rainChance}%`, 'Rain'],
              ['💨', `${data.wind} km/h`, 'Wind'],
            ].map(([icon, val, label], i) => (
              <View key={i} style={styles.metricItem}>
                <Text style={styles.metricIcon}>{icon}</Text>
                <Text style={styles.metricVal}>{val}</Text>
                <Text style={styles.metricLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Active Alert Banner */}
          <View style={styles.alertBanner}>
            <Text style={styles.alertBannerTitle}>⚠️ Active Alert</Text>
            <Text style={styles.alertBannerText}>{data.alert}</Text>
          </View>

          {/* 5-Day Forecast */}
          <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.forecastScroll}>
            {(data.forecast || []).map((f: any, i: number) => {
              const riskColors: Record<string, string> = { High: COLORS.danger, Medium: COLORS.warning, Low: COLORS.primary };
              return (
                <View key={i} style={[styles.forecastCard, i === 0 && styles.forecastCardActive]}>
                  <Text style={[styles.forecastDay, i === 0 && { color: '#FFF' }]}>{f.day}</Text>
                  <Text style={styles.forecastEmoji}>{f.condition}</Text>
                  <Text style={[styles.forecastTemp, i === 0 && { color: '#FFF' }]}>{f.temp}°</Text>
                  <Text style={styles.forecastRain}>🌧️ {f.rain}%</Text>
                  <View style={[styles.forecastRisk, { backgroundColor: riskColors[f.risk] + '20' }]}>
                    <Text style={[styles.forecastRiskText, { color: riskColors[f.risk] }]}>{f.risk}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Disease Risk Analysis */}
          <View style={styles.riskCard}>
            <Text style={styles.sectionTitle}>Disease Risk Analysis</Text>
            {riskItems.map((r, i) => (
              <RiskBar key={i} label={r.label} score={r.score} color={r.color} />
            ))}
          </View>

          {/* Alerts */}
          <Text style={styles.sectionTitle}>Smart Alerts</Text>
          {(data.alerts || []).map((alert: any, i: number) => {
            const sevColors: Record<string, string> = { High: COLORS.danger, Medium: COLORS.warning, Low: COLORS.primary };
            const sevBg: Record<string, string> = { High: COLORS.dangerLight, Medium: COLORS.warningLight, Low: COLORS.primarySurface };
            return (
              <View key={i} style={[styles.alertCard, { borderLeftColor: sevColors[alert.severity] }]}>
                <View style={styles.alertCardHeader}>
                  <View style={[styles.alertTypeBadge, { backgroundColor: sevColors[alert.severity] }]}>
                    <Text style={styles.alertTypeBadgeText}>{alert.type}</Text>
                  </View>
                  <View style={[styles.alertSevBadge, { backgroundColor: sevBg[alert.severity] }]}>
                    <Text style={[styles.alertSevBadgeText, { color: sevColors[alert.severity] }]}>{alert.severity}</Text>
                  </View>
                </View>
                <Text style={styles.alertMsg}>{alert.message}</Text>
                <View style={styles.alertAction}>
                  <Text style={styles.alertActionIcon}>✅</Text>
                  <Text style={styles.alertActionText}>{alert.action}</Text>
                </View>
              </View>
            );
          })}
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
  loadingEmoji: { fontSize: 48 },
  loadingText: { color: COLORS.textSecondary, fontSize: SIZES.fontBase },

  heroCard: { backgroundColor: '#1565C0', paddingTop: 60, paddingBottom: 32, paddingHorizontal: SIZES.xl, alignItems: 'center' },
  backBtnLight: { position: 'absolute', top: 16, left: SIZES.padding, width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  backIconLight: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  locationText: { color: 'rgba(255,255,255,0.8)', fontSize: SIZES.fontSm, fontWeight: '600', marginBottom: 12 },
  conditionEmoji: { fontSize: 64, marginBottom: 8 },
  tempText: { fontSize: 72, fontWeight: '800', color: '#FFF', lineHeight: 80 },
  conditionText: { color: 'rgba(255,255,255,0.7)', fontSize: SIZES.fontLg, fontWeight: '500', marginBottom: 24 },
  weatherMetrics: { flexDirection: 'row', gap: 32 },
  metricItem: { alignItems: 'center', gap: 4 },
  metricIcon: { fontSize: 20 },
  metricVal: { color: '#FFF', fontSize: SIZES.fontBase, fontWeight: '700' },
  metricLabel: { color: 'rgba(255,255,255,0.6)', fontSize: SIZES.fontXs },

  alertBanner: { backgroundColor: COLORS.warningLight, margin: SIZES.padding, borderRadius: SIZES.radiusMd, padding: SIZES.padding, borderLeftWidth: 4, borderLeftColor: COLORS.warning },
  alertBannerTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.warning, marginBottom: 4 },
  alertBannerText: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 20 },

  sectionTitle: { fontSize: SIZES.fontBase, fontWeight: '800', color: COLORS.textPrimary, paddingHorizontal: SIZES.padding, marginBottom: 12, marginTop: 8 },
  forecastScroll: { paddingLeft: SIZES.padding, marginBottom: 20 },
  forecastCard: { width: 90, backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: 12, alignItems: 'center', marginRight: 10, ...SHADOWS.sm },
  forecastCardActive: { backgroundColor: '#1565C0' },
  forecastDay: { fontSize: SIZES.fontXs, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 6 },
  forecastEmoji: { fontSize: 24, marginBottom: 4 },
  forecastTemp: { fontSize: SIZES.fontXl, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 4 },
  forecastRain: { fontSize: SIZES.fontXs, color: COLORS.textMuted, marginBottom: 6 },
  forecastRisk: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: SIZES.radiusFull },
  forecastRiskText: { fontSize: 9, fontWeight: '700' },

  riskCard: { backgroundColor: COLORS.surface, marginHorizontal: SIZES.padding, borderRadius: SIZES.radiusMd, padding: SIZES.padding, ...SHADOWS.sm, marginBottom: 20 },
  alertCard: { backgroundColor: COLORS.surface, marginHorizontal: SIZES.padding, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 12, borderLeftWidth: 4, ...SHADOWS.sm },
  alertCardHeader: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  alertTypeBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: SIZES.radiusFull },
  alertTypeBadgeText: { color: '#FFF', fontSize: SIZES.fontXs, fontWeight: '700' },
  alertSevBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: SIZES.radiusFull },
  alertSevBadgeText: { fontSize: SIZES.fontXs, fontWeight: '700' },
  alertMsg: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 10 },
  alertAction: { flexDirection: 'row', gap: 6, alignItems: 'flex-start', backgroundColor: COLORS.primarySurface, borderRadius: SIZES.radiusSm, padding: 10 },
  alertActionIcon: { fontSize: 14 },
  alertActionText: { flex: 1, fontSize: SIZES.fontSm, color: COLORS.primary, fontWeight: '600', lineHeight: 18 },
});
