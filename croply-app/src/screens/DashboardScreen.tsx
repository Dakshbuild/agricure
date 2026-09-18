import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
  TouchableOpacity, Animated, RefreshControl, StatusBar, Dimensions,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { fetchDashboardData } from '../services/api';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { icon: '🔬', label: 'AI Scan', route: 'Scan', color: COLORS.primary, bg: COLORS.primarySurface },
  { icon: '🌦️', label: 'Weather', route: 'WeatherRisk', color: '#1565C0', bg: '#E3F2FD' },
  { icon: '🗺️', label: 'Outbreaks', route: 'NearbyOutbreaks', color: '#6A1B9A', bg: '#F3E5F5' },
  { icon: '🤖', label: 'AI Chat', route: 'AIAssistant', color: COLORS.accentDark, bg: COLORS.accentSurface },
];

function RiskBadge({ level }: { level: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    High: { bg: COLORS.dangerLight, text: COLORS.riskHigh },
    Medium: { bg: COLORS.warningLight, text: COLORS.riskMedium },
    Low: { bg: COLORS.successLight, text: COLORS.riskLow },
  };
  const c = colors[level] || colors.Low;
  return (
    <View style={[styles.riskBadge, { backgroundColor: c.bg }]}>
      <Text style={[styles.riskBadgeText, { color: c.text }]}>{level} Risk</Text>
    </View>
  );
}

function HealthRing({ score }: { score: number }) {
  const animVal = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animVal, { toValue: score, duration: 1200, useNativeDriver: false }).start();
  }, [score]);

  const color = score >= 80 ? COLORS.primary : score >= 60 ? COLORS.warning : COLORS.danger;
  return (
    <View style={styles.healthRingWrap}>
      <View style={[styles.healthRingOuter, { borderColor: color + '30' }]}>
        <View style={[styles.healthRingInner, { borderColor: color }]}>
          <Text style={[styles.healthScore, { color }]}>{score}%</Text>
          <Text style={styles.healthLabel}>Health</Text>
        </View>
      </View>
    </View>
  );
}

export default function DashboardScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAppStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const result = await fetchDashboardData();
      setData(result);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    } catch {
      setData({
        farmerName: user?.name || 'Farmer',
        cropHealth: 82, diseaseRisk: 'Medium', diseaseRiskScore: 45,
        weatherAlert: 'High humidity. Fungal disease risk may increase.',
        wateringAlert: 'Light watering recommended in the morning.',
        recentScan: { date: 'Yesterday', result: 'Healthy', crop: 'Tomato' },
        quickStats: { scansThisMonth: 12, diseasesDetected: 3, waterSaved: '240L', alertsResolved: 8 },
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => { setRefreshing(true); loadData(); };

  const getHour = () => {
    const h = new Date().getHours();
    if (h < 12) return t('dashboard.goodMorning', 'Good Morning');
    if (h < 17) return t('dashboard.goodAfternoon', 'Good Afternoon');
    return t('dashboard.goodEvening', 'Good Evening');
  };

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.skeletonHeader} />
        <View style={styles.skeletonCard} />
        <View style={[styles.skeletonCard, { height: 120 }]} />
        <View style={styles.skeletonCard} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* ── Header ── */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{getHour()},</Text>
              <Text style={styles.farmerName}>{data.farmerName} 👋</Text>
              <Text style={styles.subtitle}>{t('dashboard.subtitle', "Here's your farm overview today")}</Text>
            </View>
            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.avatarEmoji}>👨‍🌾</Text>
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>

          {/* ── Hero Card: Health + Risk ── */}
          <View style={styles.heroCard}>
            <View style={styles.heroCardLeft}>
              <HealthRing score={data.cropHealth} />
            </View>
            <View style={styles.heroCardRight}>
              <Text style={styles.heroCardTitle}>{t('dashboard.cropStatus', 'Crop Status')}</Text>
              <RiskBadge level={data.diseaseRisk} />
              <View style={styles.heroStatRow}>
                <Text style={styles.heroStatIcon}>📅</Text>
                <Text style={styles.heroStatText}>28 days to harvest</Text>
              </View>
              <View style={styles.heroStatRow}>
                <Text style={styles.heroStatIcon}>🌿</Text>
                <Text style={styles.heroStatText}>Flowering Stage</Text>
              </View>
              <TouchableOpacity
                style={styles.viewHealthBtn}
                onPress={() => navigation.navigate('CropHealth')}
              >
                <Text style={styles.viewHealthBtnText}>{t('dashboard.viewDetails', 'View Details →')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Quick Actions ── */}
          <Text style={styles.sectionTitle}>{t('dashboard.quickActions', 'Quick Actions')}</Text>
          <View style={styles.quickActionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.route}
                style={[styles.quickActionCard, { backgroundColor: action.bg }]}
                onPress={() => navigation.navigate(action.route)}
                activeOpacity={0.75}
              >
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={[styles.quickActionLabel, { color: action.color }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Quick Stats ── */}
          <View style={styles.statsRow}>
            {[
              { label: 'Scans', value: data.quickStats?.scansThisMonth || 12, icon: '🔬' },
              { label: 'Diseases', value: data.quickStats?.diseasesDetected || 3, icon: '⚠️' },
              { label: 'Water Saved', value: data.quickStats?.waterSaved || '240L', icon: '💧' },
            ].map((s, i) => (
              <View key={i} style={styles.statCard}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* ── Weather Alert Card ── */}
          <TouchableOpacity
            style={styles.alertCard}
            onPress={() => navigation.navigate('WeatherRisk')}
            activeOpacity={0.85}
          >
            <View style={styles.alertCardHeader}>
              <View style={styles.alertIconWrap}>
                <Text style={styles.alertIcon}>⛅</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>Weather Alert</Text>
                <View style={[styles.alertBadge, { backgroundColor: COLORS.warningLight }]}>
                  <Text style={[styles.alertBadgeText, { color: COLORS.warning }]}>⚠️ High Fungal Risk</Text>
                </View>
              </View>
              <Text style={styles.arrowText}>›</Text>
            </View>
            <Text style={styles.alertBody}>{data.weatherAlert}</Text>
            <View style={styles.weatherPills}>
              {[['🌡️', '28°C'], ['💧', '76%'], ['🌧️', '62%']].map(([icon, val], i) => (
                <View key={i} style={styles.weatherPill}>
                  <Text style={styles.weatherPillText}>{icon} {val}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          {/* ── Smart Watering Card ── */}
          <TouchableOpacity
            style={styles.waterCard}
            onPress={() => navigation.navigate('SmartWatering')}
            activeOpacity={0.85}
          >
            <View style={styles.alertCardHeader}>
              <View style={[styles.alertIconWrap, { backgroundColor: '#E3F2FD' }]}>
                <Text style={styles.alertIcon}>💧</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.alertTitle}>Smart Watering</Text>
                <View style={[styles.alertBadge, { backgroundColor: '#E3F2FD' }]}>
                  <Text style={[styles.alertBadgeText, { color: '#1565C0' }]}>💧 12mm today</Text>
                </View>
              </View>
              <Text style={styles.arrowText}>›</Text>
            </View>
            <Text style={styles.alertBody}>{data.wateringAlert}</Text>
          </TouchableOpacity>

          {/* ── Recent Scan ── */}
          <Text style={styles.sectionTitle}>Recent Scan</Text>
          <TouchableOpacity
            style={styles.recentScanCard}
            onPress={() => navigation.navigate('Scan')}
            activeOpacity={0.85}
          >
            <View style={styles.recentScanLeft}>
              <View style={styles.recentScanIconWrap}>
                <Text style={{ fontSize: 28 }}>🍅</Text>
              </View>
              <View>
                <Text style={styles.recentScanCrop}>{data.recentScan?.crop}</Text>
                <Text style={styles.recentScanDate}>{data.recentScan?.date}</Text>
              </View>
            </View>
            <View style={[
              styles.recentScanStatus,
              { backgroundColor: data.recentScan?.result === 'Healthy' ? COLORS.primarySurface : COLORS.warningLight }
            ]}>
              <Text style={[
                styles.recentScanStatusText,
                { color: data.recentScan?.result === 'Healthy' ? COLORS.primary : COLORS.warning }
              ]}>
                {data.recentScan?.result === 'Healthy' ? '✅ Healthy' : `⚠️ ${data.recentScan?.result}`}
              </Text>
            </View>
          </TouchableOpacity>

          {/* ── Farm Connect Teaser ── */}
          <TouchableOpacity
            style={styles.connectCard}
            onPress={() => navigation.navigate('FarmConnect')}
            activeOpacity={0.85}
          >
            <Text style={styles.connectEmoji}>🏪</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.connectTitle}>Farm Connect</Text>
              <Text style={styles.connectSub}>4 buyers • 2 experts nearby</Text>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, backgroundColor: COLORS.background, padding: SIZES.padding },
  skeletonHeader: { height: 80, backgroundColor: COLORS.border, borderRadius: SIZES.radiusMd, marginBottom: 12, opacity: 0.5 },
  skeletonCard: { height: 160, backgroundColor: COLORS.border, borderRadius: SIZES.radiusMd, marginBottom: 12, opacity: 0.4 },
  scrollContent: { padding: SIZES.padding },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 8, marginBottom: 20 },
  greeting: { fontSize: SIZES.fontMd, color: COLORS.textTertiary, fontWeight: '500' },
  farmerName: { fontSize: SIZES.fontXxl, fontWeight: '800', color: COLORS.textPrimary, marginTop: 2 },
  subtitle: { fontSize: SIZES.fontSm, color: COLORS.textMuted, marginTop: 2 },
  avatarBtn: { width: 52, height: 52, borderRadius: 16, backgroundColor: COLORS.primarySurface, alignItems: 'center', justifyContent: 'center', position: 'relative', ...SHADOWS.sm },
  avatarEmoji: { fontSize: 26 },
  notifDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accent, position: 'absolute', top: 6, right: 6, borderWidth: 2, borderColor: COLORS.background },

  // Hero Card
  heroCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLg, padding: SIZES.padding, flexDirection: 'row', marginBottom: 20, ...SHADOWS.card },
  heroCardLeft: { alignItems: 'center', justifyContent: 'center', marginRight: SIZES.padding },
  heroCardRight: { flex: 1 },
  heroCardTitle: { fontSize: SIZES.fontSm, color: COLORS.textTertiary, fontWeight: '600', marginBottom: 6 },
  heroStatRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  heroStatIcon: { fontSize: 14 },
  heroStatText: { fontSize: SIZES.fontSm, color: COLORS.textSecondary },
  viewHealthBtn: { marginTop: 12, alignSelf: 'flex-start', backgroundColor: COLORS.primarySurface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: SIZES.radiusFull },
  viewHealthBtnText: { color: COLORS.primary, fontSize: SIZES.fontSm, fontWeight: '700' },

  // Health Ring
  healthRingWrap: { alignItems: 'center', justifyContent: 'center' },
  healthRingOuter: { width: 80, height: 80, borderRadius: 40, borderWidth: 6, alignItems: 'center', justifyContent: 'center' },
  healthRingInner: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
  healthScore: { fontSize: SIZES.fontLg, fontWeight: '800' },
  healthLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: '600' },

  // Risk Badge
  riskBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: SIZES.radiusFull, marginBottom: 4 },
  riskBadgeText: { fontSize: SIZES.fontXs, fontWeight: '700' },

  // Section Title
  sectionTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12, marginTop: 4 },

  // Quick Actions
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  quickActionCard: { flex: 1, minWidth: (width - SIZES.padding * 2 - 36) / 4, alignItems: 'center', paddingVertical: SIZES.md, borderRadius: SIZES.radiusMd, ...SHADOWS.sm },
  quickActionIcon: { fontSize: 24, marginBottom: 4 },
  quickActionLabel: { fontSize: SIZES.fontXs, fontWeight: '700' },

  // Stats
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.md, alignItems: 'center', ...SHADOWS.sm },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: SIZES.fontXl, fontWeight: '800', color: COLORS.textPrimary },
  statLabel: { fontSize: SIZES.fontXs, color: COLORS.textMuted, fontWeight: '500', marginTop: 2 },

  // Alert Card
  alertCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 12, ...SHADOWS.sm, borderLeftWidth: 4, borderLeftColor: COLORS.warning },
  waterCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 20, ...SHADOWS.sm, borderLeftWidth: 4, borderLeftColor: '#1565C0' },
  alertCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  alertIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.warningLight, alignItems: 'center', justifyContent: 'center' },
  alertIcon: { fontSize: 20 },
  alertTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary },
  alertBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: SIZES.radiusFull, marginTop: 2 },
  alertBadgeText: { fontSize: SIZES.fontXs, fontWeight: '600' },
  alertBody: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, lineHeight: 20 },
  arrowText: { fontSize: 24, color: COLORS.textMuted },
  weatherPills: { flexDirection: 'row', gap: 8, marginTop: 8 },
  weatherPill: { backgroundColor: COLORS.surfaceDim, paddingHorizontal: 10, paddingVertical: 4, borderRadius: SIZES.radiusFull },
  weatherPillText: { fontSize: SIZES.fontXs, color: COLORS.textSecondary, fontWeight: '600' },

  // Recent Scan
  recentScanCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, ...SHADOWS.sm },
  recentScanLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  recentScanIconWrap: { width: 48, height: 48, borderRadius: 14, backgroundColor: COLORS.primarySurface, alignItems: 'center', justifyContent: 'center' },
  recentScanCrop: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary },
  recentScanDate: { fontSize: SIZES.fontSm, color: COLORS.textMuted, marginTop: 2 },
  recentScanStatus: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: SIZES.radiusFull },
  recentScanStatusText: { fontSize: SIZES.fontXs, fontWeight: '700' },

  // Farm Connect
  connectCard: { backgroundColor: COLORS.primarySurface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, flexDirection: 'row', alignItems: 'center', gap: 12, ...SHADOWS.sm },
  connectEmoji: { fontSize: 28 },
  connectTitle: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.primary },
  connectSub: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, marginTop: 2 },
});
