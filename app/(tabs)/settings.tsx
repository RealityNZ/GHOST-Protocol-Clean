import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Eye, Shield, Download, Trash2, Palette, Volume2 } from 'lucide-react-native';

export default function SettingsScreen() {
  const [glitchMode, setGlitchMode] = useState(true);
  const [soundscapeEnabled, setSoundscapeEnabled] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [autoLockMinutes, setAutoLockMinutes] = useState('30');
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  const settingsSections = [
    {
      title: 'INTERFACE',
      icon: Palette,
      items: [
        {
          label: 'Glitch Mode',
          description: 'Enable cyberpunk visual effects',
          type: 'switch',
          value: glitchMode,
          onValueChange: setGlitchMode,
        },
        {
          label: 'Soundscape',
          description: 'Enable ambient cyberpunk sounds',
          type: 'switch',
          value: soundscapeEnabled,
          onValueChange: setSoundscapeEnabled,
        },
      ],
    },
    {
      title: 'SECURITY',
      icon: Shield,
      items: [
        {
          label: 'Encryption',
          description: 'Enable AES-256 encryption',
          type: 'switch',
          value: encryptionEnabled,
          onValueChange: setEncryptionEnabled,
        },
        {
          label: 'Auto Lock',
          description: 'Lock vault after inactivity (minutes)',
          type: 'input',
          value: autoLockMinutes,
          onValueChange: setAutoLockMinutes,
        },
      ],
    },
    {
      title: 'DEVELOPMENT',
      icon: Eye,
      items: [
        {
          label: 'Debug Mode',
          description: 'Enable detailed logging and debugging',
          type: 'switch',
          value: debugMode,
          onValueChange: setDebugMode,
        },
      ],
    },
  ];

  const exportData = () => {
    // Mock export functionality
    console.log('Exporting data...');
  };

  const clearData = () => {
    // Mock clear functionality
    console.log('Clearing data...');
  };

  const renderSettingItem = (item: any) => {
    switch (item.type) {
      case 'switch':
        return (
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onValueChange}
              trackColor={{ false: '#333333', true: '#FF2EC0' }}
              thumbColor={item.value ? '#00FFF7' : '#666666'}
            />
          </View>
        );
      case 'input':
        return (
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.settingDescription}>{item.description}</Text>
            </View>
            <TextInput
              style={styles.settingInput}
              value={item.value}
              onChangeText={item.onValueChange}
              keyboardType="numeric"
              placeholder="30"
              placeholderTextColor="#666666"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#0C0C0C', '#1E1E1E', '#0C0C0C']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Settings size={24} color="#00FFF7" />
          <Text style={styles.headerTitle}>SYSTEM CONFIG</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={exportData}>
            <Download size={16} color="#00FFF7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={clearData}>
            <Trash2 size={16} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <section.icon size={16} color="#FF2EC0" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.settingContainer}>
                  {renderSettingItem(item)}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPLICATION INFO</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version:</Text>
              <Text style={styles.infoValue}>1.0.0-ALPHA</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build:</Text>
              <Text style={styles.infoValue}>SURVEILLANCE.2025.001</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Framework:</Text>
              <Text style={styles.infoValue}>React Native + Expo</Text>
            </View>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LEGAL</Text>
          <View style={styles.legalContainer}>
            <Text style={styles.legalText}>
              GHOST Protocol is for educational purposes only. Users are responsible for complying with Discord's Terms of Service and local laws.
            </Text>
            <Text style={styles.legalText}>
              This software operates in legal gray areas. Use responsibly and ethically.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 16,
    color: '#00FFF7',
    marginLeft: 10,
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#FF2EC0',
    marginLeft: 8,
    letterSpacing: 1,
  },
  sectionContent: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
  },
  settingContainer: {
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#666666',
  },
  settingInput: {
    backgroundColor: '#0C0C0C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 4,
    padding: 8,
    color: '#FFFFFF',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    width: 60,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#666666',
  },
  infoValue: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  legalContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
  },
  legalText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#CCCCCC',
    lineHeight: 18,
    marginBottom: 10,
  },
});