import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Animated, ActivityIndicator, StatusBar,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { fetchCropHealth } from '../services/api';

function ProgressBar({ score, color }: { score: number; color: string }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: score, duration: 1000, useNativeDriver: false }).start();
  }, [score]);
  const width = anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  
  return (
    <View style={barStyles.container}>
      <View style={barStyles.bg}>
        <Animated.View style={[barStyles.fill, { width, backgroundColor: color }]} />
      </View>
      <Text style={barStyles.scoreText}>{score}%</Text>
    </View>
  );
}

const barStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  bg: { flex: 1, height: 8, backgroundColor: COLORS.surfaceDim, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
  scoreText: { width: 35, fontSize: SIZES.fontSm, fontWeight: '700', color: COLORS.textPrimary, textAlign: 'right' },
});

export default function CropHealthDashboard({ navigation }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await fetchCropHealth();
      setData(result);
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    } catch {
      // Handled by API mock
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 10, color: COLORS.textSecondary }}>Loading Analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = (score: number) => {
    if (score >= 80) return COLORS.primary;
    if (score >= 60) return COLORS.warning;
    return COLORS.danger;
  };

  const mainColor = getStatusColor(data.overallScore);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Analytics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          
          {/* Main Score Card */}
          <View style={[styles.mainScoreCard, { borderBottomColor: mainColor }]}>
            <Text style={styles.mainScoreLabel}>Overall Health Score</Text>
            <View style={styles.scoreRow}>
              <Text style={[styles.mainScoreValue, { color: mainColor }]}>{data.overallScore}</Text>
              <Text style={styles.mainScoreTotal}>/ 100</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: mainColor + '20' }]}>
              <Text style={[styles.statusBadgeText, { color: mainColor }]}>{data.status} Condition</Text>
            </View>
          </View>

          {/* Detailed Indicators */}
          <View style={styles.indicatorsCard}>
            <Text style={styles.sectionTitle}>Plant Indicators</Text>
            {[
              { label: 'Leaf Health', score: data.indicators.leafHealth, icon: '🌿' },
              { label: 'Stem Strength', score: data.indicators.stemHealth, icon: '🎋' },
              { label: 'Root System', score: data.indicators.rootHealth, icon: '🌱' },
              { label: 'Fruit Quality', score: data.indicators.fruitHealth, icon: '🍅' },
            ].map((ind, i) => (
              <View key={i} style={styles.indicatorRow}>
                <View style={styles.indHeader}>
                  <Text style={styles.indIcon}>{ind.icon}</Text>
                  <Text style={styles.indLabel}>{ind.label}</Text>
                </View>
                <ProgressBar score={ind.score} color={getStatusColor(ind.score)} />
              </View>
            ))}
          </View>

          {/* Recent Issues Timeline */}
          <Text style={styles.sectionTitleExt}>Recent Issues Log</Text>
          <View style={styles.timelineCard}>
            {data.recentIssues.map((issue: any, i: number) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineLine} />
                <View style={[styles.timelineDot, issue.status === 'Resolved' || issue.status === 'Treated' ? { backgroundColor: COLORS.success } : { backgroundColor: COLORS.warning }]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineDate}>{issue.date}</Text>
                  <Text style={styles.timelineIssue}>{issue.issue}</Text>
                  <Text style={[styles.timelineStatus, issue.status === 'Resolved' || issue.status === 'Treated' ? { color: COLORS.success } : { color: COLORS.warning }]}>
                    {issue.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Quick Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxIcon}>📅</Text>
              <Text style={styles.statBoxVal}>{data.daysToHarvest}</Text>
              <Text style={styles.statBoxLabel}>Days to Harvest</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxIcon}>🌦️</Text>
              <Text style={[styles.statBoxVal, { fontSize: SIZES.fontLg, marginTop: 4 }]}>{data.weatherRisk}</Text>
              <Text style={styles.statBoxLabel}>Weather Risk</Text>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: SIZES.padding },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', ...SHADOWS.sm },
  backIcon: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  headerTitle: { fontSize: SIZES.fontLg, fontWeight: '800', color: COLORS.textPrimary },

  mainScoreCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLg, padding: SIZES.xl, alignItems: 'center', marginBottom: 20, ...SHADOWS.md, borderBottomWidth: 4 },
  mainScoreLabel: { fontSize: SIZES.fontMd, color: COLORS.textSecondary, fontWeight: '600', marginBottom: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 12 },
  mainScoreValue: { fontSize: 64, fontWeight: '800', lineHeight: 70 },
  mainScoreTotal: { fontSize: SIZES.fontXl, color: COLORS.textMuted, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: SIZES.radiusFull },
  statusBadgeText: { fontSize: SIZES.fontSm, fontWeight: '700' },

  indicatorsCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 20, ...SHADOWS.sm },
  sectionTitle: { fontSize: SIZES.fontLg, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 16 },
  sectionTitleExt: { fontSize: SIZES.fontLg, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 12, marginLeft: 4 },
  
  indicatorRow: { marginBottom: 16 },
  indHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  indIcon: { fontSize: 16 },
  indLabel: { fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.textSecondary },

  timelineCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 20, ...SHADOWS.sm },
  timelineItem: { flexDirection: 'row', marginBottom: 16, position: 'relative' },
  timelineLine: { position: 'absolute', left: 5, top: 20, bottom: -20, width: 2, backgroundColor: COLORS.border },
  timelineDot: { width: 12, height: 12, borderRadius: 6, marginTop: 4, zIndex: 1 },
  timelineContent: { flex: 1, marginLeft: 16 },
  timelineDate: { fontSize: SIZES.fontXs, color: COLORS.textMuted, fontWeight: '600', marginBottom: 4 },
  timelineIssue: { fontSize: SIZES.fontMd, color: COLORS.textPrimary, fontWeight: '600', marginBottom: 4 },
  timelineStatus: { fontSize: SIZES.fontXs, fontWeight: '700' },

  statsGrid: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, alignItems: 'center', ...SHADOWS.sm },
  statBoxIcon: { fontSize: 24, marginBottom: 8 },
  statBoxVal: { fontSize: SIZES.fontXxl, fontWeight: '800', color: COLORS.textPrimary },
  statBoxLabel: { fontSize: SIZES.fontXs, color: COLORS.textSecondary, fontWeight: '500', marginTop: 4 },
});
