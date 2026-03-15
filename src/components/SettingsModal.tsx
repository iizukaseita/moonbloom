import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Colors } from '../constants/colors';
import { getSettings, updateSettings } from '../stores/moodStore';
import type { AppSettings } from '../types';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const [settings, setSettings] = useState<AppSettings>({
    notificationTime: '21:00',
    notificationEnabled: true,
    language: 'ja',
    isPro: false,
  });

  useEffect(() => {
    if (visible) {
      getSettings().then(setSettings);
    }
  }, [visible]);

  const toggleLanguage = async () => {
    const newLang = settings.language === 'ja' ? 'en' : 'ja';
    await updateSettings({ language: newLang });
    setSettings((s) => ({ ...s, language: newLang }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={() => {}}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.title}>⚙️ せってい</Text>

          {/* 通知時間 */}
          <View style={styles.row}>
            <Text style={styles.label}>つうち時間</Text>
            <Text style={styles.value}>🕘 {settings.notificationTime}</Text>
          </View>

          {/* 言語切り替え */}
          <View style={styles.row}>
            <Text style={styles.label}>げんご</Text>
            <TouchableOpacity onPress={toggleLanguage}>
              <Text style={styles.langToggle}>
                {settings.language === 'ja' ? '日本語' : 'English'}
                {' '}
                <Text style={styles.langSwitch}>切替</Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pro placeholder */}
          <View style={styles.proCard}>
            <Text style={styles.proTitle}>✨ Pro へアップグレード</Text>
            <Text style={styles.proDesc}>
              もっとたくさんのお花やテーマが使えるまる！
            </Text>
            <Text style={styles.proComingSoon}>Coming Soon</Text>
          </View>

        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1a1a3e',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 340,
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
  },
  closeText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  langToggle: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  langSwitch: {
    fontSize: 11,
    color: Colors.accent,
  },
  proCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(246,224,94,0.15)',
  },
  proTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.proGold,
    marginBottom: 6,
  },
  proDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  proComingSoon: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default React.memo(SettingsModal);
