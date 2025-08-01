import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, View } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useGlitchCore } from '@/hooks/useGlitchCore';
import GlitchCoreOverlay from '@/components/GlitchCoreOverlay';
import { useFonts, JetBrainsMono_400Regular, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';

export default function RootLayout() {
  useFrameworkReady();
  const { isGlitchActive, handleSecretTap } = useGlitchCore();

  const [fontsLoaded] = useFonts({
    'JetBrainsMono-Regular': JetBrainsMono_400Regular,
    'JetBrainsMono-Bold': JetBrainsMono_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#0C0C0C' }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Secret Tap Zone - Top Left Corner */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          zIndex: 10000,
          backgroundColor: 'transparent',
        }}
        onPress={handleSecretTap}
        activeOpacity={1}
      />
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" backgroundColor="#0C0C0C" />
      
      {/* GlitchCore Overlay */}
      <GlitchCoreOverlay isActive={isGlitchActive} />
    </View>
  );
}