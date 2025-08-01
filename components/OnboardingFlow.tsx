import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, Server, Brain, Shield, Check } from 'lucide-react-native';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    discordToken: '',
    aiBackend: 'openai',
    aiApiKey: '',
    masterPassphrase: '',
    encryptionEnabled: true,
    glitchMode: true,
  });

  const steps = [
    {
      id: 'welcome',
      title: 'WELCOME TO GHOST PROTOCOL',
      subtitle: 'Neural Surveillance System',
      icon: Eye,
      component: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            GHOST Protocol is a cyberpunk-themed Discord monitoring and AI response system.
            {'\n\n'}
            This system allows you to monitor Discord servers and automatically generate AI-powered responses using configurable personas.
            {'\n\n'}
            ⚠️ Legal Disclaimer: This software is for educational purposes only. Users are responsible for complying with Discord's Terms of Service and local laws.
          </Text>
        </View>
      ),
    },
    {
      id: 'discord',
      title: 'DISCORD CONNECTION',
      subtitle: 'Configure Bot or User Gateway',
      icon: Server,
      component: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Choose your Discord connection method:
            {'\n\n'}
            • Bot Gateway (Recommended): Safe, follows Discord ToS
            • User Gateway: Advanced, violates Discord ToS
            {'\n\n'}
            Enter your Discord token:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Discord Bot Token"
            placeholderTextColor="#666666"
            value={formData.discordToken}
            onChangeText={(text) => setFormData({ ...formData, discordToken: text })}
            secureTextEntry
          />
        </View>
      ),
    },
    {
      id: 'ai',
      title: 'AI BACKEND',
      subtitle: 'Configure AI Response Generation',
      icon: Brain,
      component: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Select your AI backend for response generation:
          </Text>
          <View style={styles.optionContainer}>
            {['openai', 'anthropic', 'local'].map((backend) => (
              <TouchableOpacity
                key={backend}
                style={[
                  styles.option,
                  formData.aiBackend === backend && styles.optionSelected,
                ]}
                onPress={() => setFormData({ ...formData, aiBackend: backend })}
              >
                <Text style={[
                  styles.optionText,
                  formData.aiBackend === backend && styles.optionTextSelected,
                ]}>
                  {backend.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="AI API Key"
            placeholderTextColor="#666666"
            value={formData.aiApiKey}
            onChangeText={(text) => setFormData({ ...formData, aiApiKey: text })}
            secureTextEntry
          />
        </View>
      ),
    },
    {
      id: 'security',
      title: 'SECURITY SETUP',
      subtitle: 'Configure Encryption & Access',
      icon: Shield,
      component: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Set up security for your surveillance data:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Master Passphrase"
            placeholderTextColor="#666666"
            value={formData.masterPassphrase}
            onChangeText={(text) => setFormData({ ...formData, masterPassphrase: text })}
            secureTextEntry
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Enable Encryption</Text>
            <Switch
              value={formData.encryptionEnabled}
              onValueChange={(value) => setFormData({ ...formData, encryptionEnabled: value })}
              trackColor={{ false: '#333333', true: '#FF2EC0' }}
              thumbColor={formData.encryptionEnabled ? '#00FFF7' : '#666666'}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Glitch Mode</Text>
            <Switch
              value={formData.glitchMode}
              onValueChange={(value) => setFormData({ ...formData, glitchMode: value })}
              trackColor={{ false: '#333333', true: '#FF2EC0' }}
              thumbColor={formData.glitchMode ? '#00FFF7' : '#666666'}
            />
          </View>
        </View>
      ),
    },
    {
      id: 'complete',
      title: 'SETUP COMPLETE',
      subtitle: 'GHOST Protocol Ready',
      icon: Check,
      component: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            🎉 GHOST Protocol is now configured and ready for operation!
            {'\n\n'}
            Your surveillance system is initialized with:
            {'\n'}
            • Discord connection configured
            {'\n'}
            • AI backend ready
            {'\n'}
            • Security encryption active
            {'\n'}
            • Glitch effects enabled
            {'\n\n'}
            Tap "ACTIVATE" to begin monitoring.
          </Text>
        </View>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding completion
      localStorage?.setItem('ghost_onboarding_completed', 'true');
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <LinearGradient
      colors={['#0C0C0C', '#1E1E1E', '#0C0C0C']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <IconComponent size={48} color="#00FFF7" />
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.subtitle}>{currentStepData.subtitle}</Text>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        {/* Step content */}
        <View style={styles.content}>
          {currentStepData.component}
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>BACK</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'ACTIVATE' : 'NEXT'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 24,
    color: '#00FFF7',
    textAlign: 'center',
    marginTop: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: '#FF2EC0',
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333333',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#00FFF7',
  },
  content: {
    flex: 1,
    marginBottom: 40,
  },
  stepContent: {
    flex: 1,
  },
  stepDescription: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 15,
    color: '#FFFFFF',
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  optionSelected: {
    borderColor: '#00FFF7',
    backgroundColor: '#0C0C0C',
  },
  optionText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#666666',
  },
  optionTextSelected: {
    color: '#00FFF7',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 14,
    color: '#CCCCCC',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666666',
  },
  backButtonText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#CCCCCC',
    letterSpacing: 1,
  },
  nextButton: {
    backgroundColor: '#FF2EC0',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF2EC0',
  },
  nextButtonText: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});