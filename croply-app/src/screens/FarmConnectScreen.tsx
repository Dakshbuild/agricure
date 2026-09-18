import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, ActivityIndicator, TextInput, StatusBar, Linking,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { fetchFarmConnect } from '../services/api';

const TABS = [
  { key: 'buyers', label: 'Buyers', emoji: '🤝' },
  { key: 'shops', label: 'Agri Shops', emoji: '🏪' },
  { key: 'experts', label: 'Experts', emoji: '👨‍🔬' },
  { key: 'government', label: 'Govt. Centers', emoji: '🏛️' },
];

export default function FarmConnectScreen({ navigation }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('buyers');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchFarmConnect();
      setData(result);
    } catch {
      // Mock handled by API
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleLocation = (address: string) => {
    Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(address)}`);
  };

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 10, color: COLORS.textSecondary }}>Loading Network...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const listData = data[activeTab] || [];
  const filteredData = listData.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.crops && item.crops.join(' ').toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primarySurface} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Farm Connect</Text>
        <Text style={styles.headerSub}>Connect with buyers, experts, and local shops</Text>
        
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, crop, or specialty..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textMuted}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabChip, activeTab === tab.key && styles.tabChipActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.8}
            >
              <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🏜️</Text>
            <Text style={styles.emptyText}>No results found</Text>
          </View>
        ) : (
          filteredData.map((item: any) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    {item.verified && <Text style={styles.verifiedIcon}>✓</Text>}
                  </View>
                  <Text style={styles.cardType}>{item.type}</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                </View>
              </View>

              <Text style={styles.cardDesc}>{item.description}</Text>

              {item.crops && (
                <View style={styles.tagsRow}>
                  {item.crops.map((crop: string, i: number) => (
                    <View key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{crop}</Text>
                    </View>
                  ))}
                </View>
              )}
              {item.speciality && (
                <View style={styles.tagsRow}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.speciality}</Text>
                  </View>
                </View>
              )}

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>📍 {item.distance} • {item.address}</Text>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtnCall} onPress={() => handleCall(item.contact)}>
                  <Text style={styles.actionBtnCallText}>📞 Call Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtnMap} onPress={() => handleLocation(item.address)}>
                  <Text style={styles.actionBtnMapText}>🗺️ Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  
  header: { backgroundColor: COLORS.primarySurface, padding: SIZES.padding, paddingTop: 20, borderBottomLeftRadius: SIZES.largeRadius, borderBottomRightRadius: SIZES.largeRadius, ...SHADOWS.sm, zIndex: 10 },
  headerTitle: { fontSize: SIZES.fontXxl, fontWeight: '800', color: COLORS.primaryDark },
  headerSub: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, marginTop: 4, marginBottom: 16 },
  
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, paddingHorizontal: 12, height: 48, ...SHADOWS.sm },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, fontSize: SIZES.fontMd, color: COLORS.textPrimary },

  tabsContainer: { marginTop: 16, marginBottom: 8 },
  tabsScroll: { paddingHorizontal: SIZES.padding, gap: 12 },
  tabChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingVertical: 10, borderRadius: SIZES.radiusFull, gap: 8, borderWidth: 1, borderColor: COLORS.border, ...SHADOWS.sm },
  tabChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabEmoji: { fontSize: 16 },
  tabText: { fontSize: SIZES.fontSm, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: '#FFF' },

  listContainer: { padding: SIZES.padding },
  emptyBox: { alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: SIZES.fontMd, color: COLORS.textMuted },

  card: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusMd, padding: SIZES.padding, marginBottom: 16, ...SHADOWS.sm, borderWidth: 1, borderColor: COLORS.borderLight },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cardTitle: { fontSize: SIZES.fontLg, fontWeight: '800', color: COLORS.textPrimary },
  verifiedIcon: { color: '#FFF', backgroundColor: COLORS.info, fontSize: 10, fontWeight: '800', width: 16, height: 16, textAlign: 'center', lineHeight: 16, borderRadius: 8 },
  cardType: { fontSize: SIZES.fontXs, color: COLORS.textMuted, fontWeight: '600', marginTop: 2, textTransform: 'uppercase' },
  ratingBadge: { backgroundColor: COLORS.accentSurface, paddingHorizontal: 8, paddingVertical: 4, borderRadius: SIZES.radiusSm },
  ratingText: { fontSize: SIZES.fontXs, fontWeight: '700', color: COLORS.accentDark },
  
  cardDesc: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 12 },
  
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  tag: { backgroundColor: COLORS.surfaceDim, paddingHorizontal: 10, paddingVertical: 4, borderRadius: SIZES.radiusFull },
  tagText: { fontSize: SIZES.fontXs, color: COLORS.textSecondary, fontWeight: '500' },
  
  metaRow: { marginBottom: 16 },
  metaText: { fontSize: SIZES.fontXs, color: COLORS.textMuted, fontWeight: '500' },

  actionRow: { flexDirection: 'row', gap: 12 },
  actionBtnCall: { flex: 1, backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: SIZES.radiusMd, alignItems: 'center' },
  actionBtnCallText: { color: '#FFF', fontSize: SIZES.fontSm, fontWeight: '700' },
  actionBtnMap: { flex: 1, backgroundColor: COLORS.primarySurface, paddingVertical: 12, borderRadius: SIZES.radiusMd, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary },
  actionBtnMapText: { color: COLORS.primary, fontSize: SIZES.fontSm, fontWeight: '700' },
});
