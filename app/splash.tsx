import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  Easing
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const [showText, setShowText] = useState(false);
  const glitchOpacity = useSharedValue(1);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Glitch effect animation
    glitchOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 100 }),
        withTiming(0.3, { duration: 50 }),
        withTiming(1, { duration: 100 }),
        withTiming(0.7, { duration: 30 }),
        withTiming(1, { duration: 200 })
      ),
      -1,
      false
    );

    // Show text after 1 second
    setTimeout(() => {
      setShowText(true);
      textOpacity.value = withTiming(1, { duration: 1000 });
    }, 1000);

    // Navigate to main app after 4 seconds
    setTimeout(() => {
      // Check if this is first time user
      const isFirstTime = !localStorage?.getItem('ghost_onboarding_completed');
      if (isFirstTime) {
        router.replace('/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    }, 4000);
  }, []);

  const glitchStyle = useAnimatedStyle(() => ({
    opacity: glitchOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <LinearGradient
      colors={['#0C0C0C', '#1E1E1E', '#0C0C0C']}
      style={styles.container}
    >
      {/* Background glitch lines */}
      <View style={styles.glitchLines}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.glitchLine,
              {
                top: Math.random() * height,
                left: Math.random() * width,
                width: Math.random() * 200 + 50,
                backgroundColor: Math.random() > 0.5 ? '#FF2EC0' : '#00FFF7',
              },
              glitchStyle,
            ]}
          />
        ))}
      </View>

      {/* Main logo/eye */}
      <Animated.View style={[styles.logoContainer, glitchStyle]}>
        <View style={styles.eye}>
          <View style={styles.eyeball} />
          <View style={styles.pupil} />
        </View>
        <View style={[styles.eye, styles.eyeGlitch]}>
        <Text style={styles.title}>GHOST</Text>
        <Text style={styles.subtitle}>PROTOCOL</Text>
        </View>
      </Animated.View>

      {/* App title */}
      {showText && (
        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
          <Text style={styles.title}>GHOST</Text>
          <Text style={styles.subtitle}>PROTOCOL</Text>
          <Text style={styles.tagline}>PLUG IN. WATCH EVERYTHING.</Text>
        </Animated.View>
      )}

      {/* Static overlay */}
      <Animated.View style={[styles.staticOverlay, glitchStyle]} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C0C0C',
  },
  glitchLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glitchLine: {
    position: 'absolute',
    height: 2,
    opacity: 0.6,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  eye: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#00FFF7',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C0C0C',
  },
  eyeGlitch: {
    position: 'absolute',
    borderColor: '#FF2EC0',
    transform: [{ translateX: 2 }, { translateY: -1 }],
    opacity: 0.7,
  },
  eyeball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00FFF7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeballGlitch: {
    backgroundColor: '#FF2EC0',
  },
  pupil: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0C0C0C',
  },
  pupilGlitch: {
    backgroundColor: '#1E1E1E',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 48,
    color: '#00FFF7',
    letterSpacing: 8,
    textShadowColor: '#FF2EC0',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 24,
    color: '#FF2EC0',
    letterSpacing: 4,
    marginTop: -5,
  },
  tagline: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 12,
    color: '#1E1E1E',
    letterSpacing: 2,
    marginTop: 20,
    textAlign: 'center',
  },
  staticOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 46, 192, 0.02)',
    opacity: 0.3,
  },
});