import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity } from 'react-native';
import '../src/i18n';
import { Colors } from '../src/constants/colors';
import SettingsModal from '../src/components/SettingsModal';

export default function RootLayout() {
  const [showSettings, setShowSettings] = useState(false);

  const headerRight = () => (
    <TouchableOpacity
      onPress={() => setShowSettings(true)}
      style={{ marginRight: 16 }}
    >
      <Text style={{ fontSize: 22 }}>⚙️</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerRight,
          tabBarStyle: {
            backgroundColor: 'rgba(15,12,41,0.97)',
            borderTopColor: 'rgba(255,255,255,0.06)',
            height: 56,
            paddingBottom: 4,
            paddingTop: 4,
          },
          tabBarActiveTintColor: Colors.accent,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 9,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'ホーム',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.35 }}>
                🌙
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="garden"
          options={{
            title: 'にわ',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.35 }}>
                🌸
              </Text>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'きろく',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.35 }}>
                📋
              </Text>
            ),
          }}
        />
      </Tabs>
      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
