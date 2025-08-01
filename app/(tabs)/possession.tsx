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
import { Brain, Power, MessageSquare, Settings, Play, Pause } from 'lucide-react-native';

export default function PossessionScreen() {
  const [isActive, setIsActive] = useState(false);
  const [currentPersona, setCurrentPersona] = useState('Digital Ghost');
  const [triggerKeywords, setTriggerKeywords] = useState(['@ghost', 'help', 'ai']);
  const [responseHistory, setResponseHistory] = useState([
    {
      id: '1',
      trigger: '@ghost',
      prompt: 'Can you help me with this code?',
      response: 'I see you\'re working on some interesting code. Let me analyze this for you...',
      timestamp: '2025-01-07T23:45:00Z',
      sent: true,
    },
    {
      id: '2',
      trigger: 'help',
      prompt: 'I need help with debugging',
      response: 'Debugging can be tricky. Let\'s break this down systematically...',
      timestamp: '2025-01-07T23:42:00Z',
      sent: true,
    },
  ]);

  const personas = [
    { id: '1', name: 'Digital Ghost', description: 'Cyberpunk hacker persona' },
    { id: '2', name: 'Neural Assistant', description: 'Helpful AI assistant' },
    { id: '3', name: 'Code Whisperer', description: 'Programming expert' },
  ];

  const togglePossession = () => {
    setIsActive(!isActive);
  };

  const addResponse = () => {
    const newResponse = {
      id: Date.now().toString(),
      trigger: 'manual',
      prompt: 'Manual response',
      response: 'Generated AI response...',
      timestamp: new Date().toISOString(),
      sent: false,
    };
    setResponseHistory(prev => [newResponse, ...prev]);
  };

  return (
    <LinearGradient
      colors={['#0C0C0C', '#1E1E1E', '#0C0C0C']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Brain size={24} color="#00FFF7" />
          <Text style={styles.headerTitle}>NEURAL HIJACK</Text>
        </View>
        <TouchableOpacity
          style={[styles.powerButton, isActive && styles.powerButtonActive]}
          onPress={togglePossession}
        >
          <Power size={20} color={isActive ? '#FFFFFF' : '#666666'} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>STATUS:</Text>
            <Text style={[styles.statusValue, { color: isActive ? '#00FF00' : '#FF4444' }]}>
              {isActive ? 'ACTIVE' : 'INACTIVE'}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>PERSONA:</Text>
            <Text style={styles.statusValue}>{currentPersona}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>TRIGGERS:</Text>
            <Text style={styles.statusValue}>{triggerKeywords.length} ACTIVE</Text>
          </View>
        </View>

        {/* Persona Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACTIVE PERSONA</Text>
          <View style={styles.personaContainer}>
            {personas.map((persona) => (
              <TouchableOpacity
                key={persona.id}
                style={[
                  styles.personaOption,
                  currentPersona === persona.name && styles.personaOptionActive,
                ]}
                onPress={() => setCurrentPersona(persona.name)}
              >
                <Text style={[
                  styles.personaName,
                  currentPersona === persona.name && styles.personaNameActive,
                ]}>
                  {persona.name}
                </Text>
                <Text style={styles.personaDescription}>{persona.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trigger Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRIGGER CONFIGURATION</Text>
          <View style={styles.triggerContainer}>
            <Text style={styles.triggerLabel}>Keywords:</Text>
            <View style={styles.keywordList}>
              {triggerKeywords.map((keyword, index) => (
                <View key={index} style={styles.keywordTag}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Response History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RESPONSE HISTORY</Text>
            <TouchableOpacity style={styles.addButton} onPress={addResponse}>
              <MessageSquare size={16} color="#00FFF7" />
            </TouchableOpacity>
          </View>
          {responseHistory.map((response) => (
            <View key={response.id} style={styles.responseContainer}>
              <View style={styles.responseHeader}>
                <Text style={styles.responseTrigger}>{response.trigger}</Text>
                <Text style={styles.responseTimestamp}>
                  {new Date(response.timestamp).toLocaleTimeString()}
                </Text>
              </View>
              <Text style={styles.responsePrompt}>{response.prompt}</Text>
              <Text style={styles.responseText}>{response.response}</Text>
              <View style={styles.responseStatus}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: response.sent ? '#00FF00' : '#FFD700' },
                ]} />
                <Text style={styles.responseStatusText}>
                  {response.sent ? 'SENT' : 'PENDING'}
                </Text>
              </View>
            </View>
          ))}
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
  powerButton: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666666',
  },
  powerButtonActive: {
    backgroundColor: '#FF2EC0',
    borderColor: '#FF2EC0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
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
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#FF2EC0',
    marginBottom: 15,
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  personaContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
  },
  personaOption: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  personaOptionActive: {
    borderColor: '#00FFF7',
    backgroundColor: '#0C0C0C',
  },
  personaName: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  personaNameActive: {
    color: '#00FFF7',
  },
  personaDescription: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#666666',
  },
  triggerContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
  },
  triggerLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 10,
  },
  keywordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordTag: {
    backgroundColor: '#00FFF7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 10,
    color: '#0C0C0C',
  },
  addButton: {
    backgroundColor: '#FF2EC0',
    padding: 8,
    borderRadius: 4,
  },
  responseContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  responseTrigger: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#00FFF7',
  },
  responseTimestamp: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
  },
  responsePrompt: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  responseText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    marginBottom: 10,
  },
  responseStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  responseStatusText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 10,
    color: '#666666',
  },
});