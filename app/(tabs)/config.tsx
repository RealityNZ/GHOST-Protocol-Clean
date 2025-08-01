import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Brain, Zap, Code, Shield } from 'lucide-react-native';

export default function ConfigScreen() {
  const [aiBackend, setAiBackend] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [temperature, setTemperature] = useState('0.7');
  const [maxTokens, setMaxTokens] = useState('1000');
  const [streaming, setStreaming] = useState(true);

  const backends = [
    { id: 'openai', name: 'OpenAI', description: 'GPT-4, GPT-3.5-turbo' },
    { id: 'anthropic', name: 'Anthropic', description: 'Claude models' },
    { id: 'local', name: 'Local', description: 'Ollama, LM Studio' },
    { id: 'custom', name: 'Custom', description: 'Custom API endpoint' },
  ];

  const saveConfig = () => {
    // Mock save functionality
    console.log('Saving configuration...');
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
          <Text style={styles.headerTitle}>NEURAL CONFIG</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveConfig}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* AI Backend Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI BACKEND</Text>
          <View style={styles.backendContainer}>
            {backends.map((backend) => (
              <TouchableOpacity
                key={backend.id}
                style={[
                  styles.backendOption,
                  aiBackend === backend.id && styles.backendOptionActive,
                ]}
                onPress={() => setAiBackend(backend.id)}
              >
                <View style={styles.backendInfo}>
                  <Text style={[
                    styles.backendName,
                    aiBackend === backend.id && styles.backendNameActive,
                  ]}>
                    {backend.name}
                  </Text>
                  <Text style={styles.backendDescription}>{backend.description}</Text>
                </View>
                <Brain size={16} color={aiBackend === backend.id ? '#00FFF7' : '#666666'} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* API Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API CONFIGURATION</Text>
          <View style={styles.configContainer}>
            <Text style={styles.configLabel}>API Key:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your API key"
              placeholderTextColor="#666666"
              value={apiKey}
              onChangeText={setApiKey}
              secureTextEntry
            />

            {aiBackend === 'custom' && (
              <>
                <Text style={styles.configLabel}>Endpoint URL:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://api.example.com/v1"
                  placeholderTextColor="#666666"
                  value={endpoint}
                  onChangeText={setEndpoint}
                />
              </>
            )}

            <View style={styles.paramRow}>
              <View style={styles.paramItem}>
                <Text style={styles.configLabel}>Temperature:</Text>
                <TextInput
                  style={styles.paramInput}
                  placeholder="0.7"
                  placeholderTextColor="#666666"
                  value={temperature}
                  onChangeText={setTemperature}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.paramItem}>
                <Text style={styles.configLabel}>Max Tokens:</Text>
                <TextInput
                  style={styles.paramInput}
                  placeholder="1000"
                  placeholderTextColor="#666666"
                  value={maxTokens}
                  onChangeText={setMaxTokens}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable Streaming</Text>
              <Switch
                value={streaming}
                onValueChange={setStreaming}
                trackColor={{ false: '#333333', true: '#FF2EC0' }}
                thumbColor={streaming ? '#00FFF7' : '#666666'}
              />
            </View>
          </View>
        </View>

        {/* Advanced Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADVANCED SETTINGS</Text>
          <View style={styles.advancedContainer}>
            <TouchableOpacity style={styles.advancedOption}>
              <Zap size={16} color="#00FFF7" />
              <Text style={styles.advancedText}>Performance Optimization</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.advancedOption}>
              <Code size={16} color="#00FFF7" />
              <Text style={styles.advancedText}>Plugin Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.advancedOption}>
              <Shield size={16} color="#00FFF7" />
              <Text style={styles.advancedText}>Security Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONNECTION STATUS</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Backend:</Text>
              <Text style={styles.statusValue}>{aiBackend.toUpperCase()}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Text style={[styles.statusValue, { color: '#00FF00' }]}>CONNECTED</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Last Test:</Text>
              <Text style={styles.statusValue}>2 minutes ago</Text>
            </View>
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
  saveButton: {
    backgroundColor: '#FF2EC0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#FF2EC0',
    marginBottom: 15,
    letterSpacing: 1,
  },
  backendContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
  },
  backendOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  backendOptionActive: {
    borderColor: '#00FFF7',
    backgroundColor: '#0C0C0C',
  },
  backendInfo: {
    flex: 1,
  },
  backendName: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  backendNameActive: {
    color: '#00FFF7',
  },
  backendDescription: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#666666',
  },
  configContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
  },
  configLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0C0C0C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 6,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    marginBottom: 15,
  },
  paramRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  paramItem: {
    flex: 1,
    marginRight: 10,
  },
  paramInput: {
    backgroundColor: '#0C0C0C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 6,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: '#CCCCCC',
  },
  advancedContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
  },
  advancedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  advancedText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  statusContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#666666',
  },
  statusValue: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});