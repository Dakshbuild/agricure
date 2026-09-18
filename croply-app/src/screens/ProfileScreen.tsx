import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  TouchableOpacity, Switch, StatusBar, Alert,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../theme/colors';
import { useAppStore } from '../store/useAppStore';
import { LanguageSelector } from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen({ navigation }: any) {
  const { user, isDarkMode, toggleDarkMode, logout } = useAppStore();
  const [langModalVisible, setLangModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    Alert.alert(t('profile.logout', 'Logout'), t('profile.logoutConfirm', 'Are you sure you want to log out?'), [
      { text: t('common.cancel', 'Cancel'), style: 'cancel' },
      { 
        text: t('profile.logout', 'Logout'), 
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.replace('Login');
        }
      },
    ]);
  };

  const SettingRow = ({ icon, label, rightNode, onPress, danger }: any) => (
    <TouchableOpacity 
      style={[styles.settingRow, danger && { borderBottomWidth: 0 }]} 
      onPress={onPress} 
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.settingIconWrap, danger && { backgroundColor: COLORS.dangerLight }]}>
        <Text style={styles.settingIcon}>{icon}</Text>
      </View>
      <Text style={[styles.settingLabel, danger && { color: COLORS.danger }]}>{label}</Text>
      {rightNode || (onPress && <Text style={styles.settingArrow}>›</Text>)}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      
      {/* Top Banner */}
      <View style={styles.banner}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarEmoji}>👨‍🌾</Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Ramesh Kumar'}</Text>
        <Text style={styles.userPhone}>{user?.phone || '+91 9876543210'}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>2</Text>
            <Text style={styles.statLabel}>Farms</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>3</Text>
            <Text style={styles.statLabel}>Crops</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>12</Text>
            <Text style={styles.statLabel}>Scans</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Settings Block */}
        <View style={styles.settingsBlock}>
          <Text style={styles.blockTitle}>{t('profile.preferences', 'Preferences')}</Text>
          <View style={styles.card}>
            <SettingRow 
              icon="🌐" 
              label={t('profile.language', 'Language')} 
              rightNode={<Text style={styles.rightText}>{i18n.language.toUpperCase()}</Text>} 
              onPress={() => setLangModalVisible(true)} 
            />
            <SettingRow 
              icon="🌙" 
              label={t('profile.darkMode', 'Dark Mode')} 
              rightNode={<Switch value={isDarkMode} onValueChange={toggleDarkMode} trackColor={{ true: COLORS.primary }} />} 
            />
            <SettingRow 
              icon="🔔" 
              label={t('profile.notifications', 'Notifications')} 
              rightNode={<Switch value={true} onValueChange={() => {}} trackColor={{ true: COLORS.primary }} />} 
            />
          </View>
        </View>

        {/* Farm Block */}
        <View style={styles.settingsBlock}>
          <Text style={styles.blockTitle}>{t('profile.myFarm', 'My Farm')}</Text>
          <View style={styles.card}>
            <SettingRow icon="🌾" label={t('profile.manageCrops', 'Manage Crops')} onPress={() => {}} />
            <SettingRow icon="📍" label={t('profile.farmLocation', 'Farm Location')} onPress={() => {}} />
            <SettingRow icon="🚜" label={t('profile.equipment', 'Equipment')} onPress={() => {}} />
          </View>
        </View>

        {/* Support Block */}
        <View style={styles.settingsBlock}>
          <Text style={styles.blockTitle}>{t('profile.support', 'Support')}</Text>
          <View style={styles.card}>
            <SettingRow icon="❓" label={t('profile.helpCenter', 'Help Center')} onPress={() => {}} />
            <SettingRow icon="📄" label={t('profile.termsPrivacy', 'Terms & Privacy')} onPress={() => {}} />
            <SettingRow icon="🚪" label={t('profile.logout', 'Logout')} danger onPress={handleLogout} />
          </View>
        </View>

        <Text style={styles.versionText}>CroPly v1.0.0 • Made with ❤️ for SIH</Text>
        <View style={{ height: 40 }} />
      </ScrollView>
      
      <LanguageSelector 
        visible={langModalVisible} 
        onClose={() => setLangModalVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  
  banner: { backgroundColor: COLORS.primary, alignItems: 'center', paddingTop: 20, paddingBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, ...SHADOWS.md },
  avatarWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12, ...SHADOWS.sm, borderWidth: 4, borderColor: COLORS.primaryLight },
  avatarEmoji: { fontSize: 40 },
  userName: { fontSize: SIZES.fontXxl, fontWeight: '800', color: '#FFF' },
  userPhone: { fontSize: SIZES.fontSm, color: COLORS.lightGreen, marginTop: 4, fontWeight: '500' },
  
  statsRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: SIZES.radiusLg, paddingVertical: 12, paddingHorizontal: 20, marginTop: 20 },
  statBox: { alignItems: 'center', paddingHorizontal: 16 },
  statVal: { fontSize: SIZES.fontLg, fontWeight: '800', color: '#FFF' },
  statLabel: { fontSize: SIZES.fontXs, color: COLORS.lightGreen, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },

  scroll: { padding: SIZES.padding, paddingTop: 24 },
  
  settingsBlock: { marginBottom: 24 },
  blockTitle: { fontSize: SIZES.fontSm, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', marginBottom: 8, marginLeft: 12 },
  card: { backgroundColor: COLORS.surface, borderRadius: SIZES.radiusLg, ...SHADOWS.sm, overflow: 'hidden' },
  
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  settingIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: COLORS.primarySurface, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  settingIcon: { fontSize: 18 },
  settingLabel: { flex: 1, fontSize: SIZES.fontBase, fontWeight: '600', color: COLORS.textPrimary },
  settingArrow: { fontSize: 20, color: COLORS.textMuted },
  rightText: { fontSize: SIZES.fontSm, color: COLORS.textSecondary, fontWeight: '600' },

  versionText: { textAlign: 'center', color: COLORS.textMuted, fontSize: SIZES.fontXs, marginTop: 10, marginBottom: 20 },
});
