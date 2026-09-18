import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, ActivityIndicator, Dimensions, StatusBar,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { fetchNearbyOutbreaks } from '../services/api';

const { width, height } = Dimensions.get('window');

const FILTERS = ['All Crops', 'Tomato', 'Potato', 'Wheat', 'Rice'];
const RISK_FILTERS = ['All Risks', 'High', 'Medium', 'Low'];

export default function NearbyDiseaseOutbreakScreen({ navigation }: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedRisk, setSelectedRisk] = useState('All Risks');

  const INITIAL_REGION = {
    latitude: 30.3165,
    longitude: 78.0322,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  useEffect(() => {
    loadData();
  }, [selectedCrop, selectedRisk]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchNearbyOutbreaks({
        crop: selectedCrop !== 'All Crops' ? selectedCrop : undefined,
      });
      let filtered = result.outbreaks || [];
      if (selectedRisk !== 'All Risks') {
        filtered = filtered.filter((o: any) => o.risk === selectedRisk);
      }
      setData(filtered);
    } catch {
      // Fallback data is handled by API mock
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (risk: string) => {
    switch (risk) {
      case 'High': return COLORS.danger;
      case 'Medium': return COLORS.warning;
      case 'Low': return COLORS.primary;
      default: return COLORS.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Outbreak Map</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, selectedCrop === f && styles.filterChipActive]}
              onPress={() => setSelectedCrop(f)}
            >
              <Text style={[styles.filterText, selectedCrop === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.filterScroll, { marginTop: 8 }]}>
          {RISK_FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, selectedRisk === f && styles.filterChipActive]}
              onPress={() => setSelectedRisk(f)}
            >
              <Text style={[styles.filterText, selectedRisk === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.mapLoading}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 10, color: COLORS.textSecondary }}>Loading Outbreaks...</Text>
          </View>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={INITIAL_REGION}
            showsUserLocation={true}
          >
            {data.map((ob: any) => (
              <Marker
                key={ob.id}
                coordinate={{ latitude: ob.lat, longitude: ob.lng }}
                pinColor={getMarkerColor(ob.risk)}
              >
                <Callout>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{ob.disease}</Text>
                    <Text style={styles.calloutCrop}>{ob.crop} • {ob.distanceStr}</Text>
                    <View style={[styles.calloutBadge, { backgroundColor: getMarkerColor(ob.risk) + '20' }]}>
                      <Text style={[styles.calloutBadgeText, { color: getMarkerColor(ob.risk) }]}>{ob.risk} Risk</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
      </View>

      {/* Bottom Sheet (List) */}
      <View style={styles.bottomSheet}>
        <View style={styles.handleBar} />
        <Text style={styles.sheetTitle}>{data.length} Outbreaks Nearby</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((ob: any) => (
            <View key={ob.id} style={styles.outbreakCard}>
              <View style={styles.obHeader}>
                <View style={styles.obIconWrap}>
                  <Text style={{ fontSize: 24 }}>🦠</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.obDisease}>{ob.disease}</Text>
                  <Text style={styles.obCrop}>{ob.crop} • {ob.distanceStr} away</Text>
                </View>
                <View style={[styles.obRiskBadge, { backgroundColor: getMarkerColor(ob.risk) + '20' }]}>
                  <Text style={[styles.obRiskText, { color: getMarkerColor(ob.risk) }]}>{ob.risk}</Text>
                </View>
              </View>
              <Text style={styles.obSuggestion}>{ob.suggestion}</Text>
              <View style={styles.obFooter}>
                <Text style={styles.obReportedBy}>Reported by {ob.reportedBy}</Text>
                <Text style={styles.obTime}>{ob.reported}</Text>
              </View>
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SIZES.padding, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center', ...SHADOWS.sm },
  backIcon: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  headerTitle: { fontSize: SIZES.fontLg, fontWeight: '800', color: COLORS.textPrimary },
  
  filtersContainer: { paddingBottom: 12, backgroundColor: COLORS.background },
  filterScroll: { paddingHorizontal: SIZES.padding },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: SIZES.radiusFull, backgroundColor: COLORS.surface, marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  mapContainer: { flex: 1, backgroundColor: '#E0E0E0' },
  mapLoading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  map: { width: '100%', height: '100%' },

  calloutContainer: { width: 150, padding: 4 },
  calloutTitle: { fontSize: SIZES.fontSm, fontWeight: '700', marginBottom: 2 },
  calloutCrop: { fontSize: SIZES.fontXs, color: COLORS.textSecondary, marginBottom: 4 },
  calloutBadge: { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  calloutBadgeText: { fontSize: 9, fontWeight: '700' },

  bottomSheet: { height: height * 0.45, backgroundColor: COLORS.background, borderTopLeftRadius: SIZES.largeRadius, borderTopRightRadius: SIZES.largeRadius, paddingHorizontal: SIZES.padding, ...SHADOWS.lg, marginTop: -20 },
  handleBar: { width: 40, height: 4, borderRadius: 2, backgroundColor: COLORS.border, alignSelf: 'center', marginTop: 12, marginBottom: 16 },
  sheetTitle: { fontSize: SIZES.fontBase, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 12 },
  
  outbreakCard: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 12, ...SHADOWS.sm },
  obHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  obIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.dangerLight, alignItems: 'center', justifyContent: 'center' },
  obDisease: { fontSize: SIZES.fontBase, fontWeight: '700', color: COLORS.textPrimary },
  obCrop: { fontSize: SIZES.fontXs, color: COLORS.textSecondary, marginTop: 2 },
  obRiskBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: SIZES.radiusFull },
  obRiskText: { fontSize: SIZES.fontXs, fontWeight: '700' },
  obSuggestion: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 12 },
  obFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 10 },
  obReportedBy: { fontSize: SIZES.fontXs, color: COLORS.textMuted },
  obTime: { fontSize: SIZES.fontXs, color: COLORS.textMuted, fontWeight: '600' },
});
