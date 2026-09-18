import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LanguageScreen from '../screens/LanguageScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CropScanScreen from '../screens/CropScanScreen';
import ScanResultScreen from '../screens/ScanResultScreen';
import NearbyDiseaseOutbreakScreen from '../screens/NearbyDiseaseOutbreakScreen';
import FarmConnectScreen from '../screens/FarmConnectScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WeatherRiskScreen from '../screens/WeatherRiskScreen';
import SmartWateringScreen from '../screens/SmartWateringScreen';
import CropHealthDashboard from '../screens/CropHealthDashboard';
import TreatmentGuideScreen from '../screens/TreatmentGuideScreen';

import { COLORS } from '../theme/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon({ focused, emoji }: { focused: boolean; emoji: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
      <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{emoji}</Text>
      {focused && (
        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.primary, marginTop: 4 }} />
      )}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        }
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} emoji="🏠" />
        }} 
      />
      <Tab.Screen 
        name="Scan" 
        component={CropScanScreen} 
        options={{ 
          tabBarLabel: 'AI Scan',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} emoji="📸" />
        }} 
      />
      <Tab.Screen 
        name="NearbyOutbreaks" 
        component={NearbyDiseaseOutbreakScreen} 
        options={{ 
          tabBarLabel: 'Map',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} emoji="🗺️" />
        }} 
      />
      <Tab.Screen 
        name="AIAssistant" 
        component={AIAssistantScreen} 
        options={{ 
          tabBarLabel: 'Assistant',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} emoji="🤖" />
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} emoji="👤" />
        }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        {/* Auth & Onboarding Flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        
        {/* Main App */}
        <Stack.Screen name="Main" component={MainTabs} />
        
        {/* Feature Details */}
        <Stack.Screen name="ScanResult" component={ScanResultScreen} />
        <Stack.Screen name="TreatmentGuide" component={TreatmentGuideScreen} />
        <Stack.Screen name="WeatherRisk" component={WeatherRiskScreen} />
        <Stack.Screen name="SmartWatering" component={SmartWateringScreen} />
        <Stack.Screen name="CropHealth" component={CropHealthDashboard} />
        <Stack.Screen name="FarmConnect" component={FarmConnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
