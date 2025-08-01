import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface GlitchCoreOverlayProps {
  isActive: boolean;
}

export default function GlitchCoreOverlay({ isActive }: GlitchCoreOverlayProps) {
  const glitchValue = useSharedValue(0);
  const scanlineValue = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      // Start glitch animation
      glitchValue.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 100 }),
          withTiming(0, { duration: 50 }),
          withTiming(1, { duration: 100 }),
          withTiming(0, { duration: 30 }),
          withTiming(1, { duration: 200 })
        ),
        -1,
        false
      );

      // Start scanline animation
      scanlineValue.value = withRepeat(
        withTiming(1, { duration: 2000 }),
        -1,
        false
      );
    } else {
      // Stop animations
      glitchValue.value = withTiming(0, { duration: 300 });
      scanlineValue.value = withTiming(0, { duration: 300 });
    }
  }, [isActive]);

  const glitchStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glitchValue.value, [0, 1], [0, 0.3]),
    transform: [
      {
        translateX: interpolate(glitchValue.value, [0, 1], [0, Math.random() * 10 - 5]),
      },
      {
        translateY: interpolate(glitchValue.value, [0, 1], [0, Math.random() * 10 - 5]),
      },
    ],
  }));

  const scanlineStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scanlineValue.value, [0, 1], [0, height]),
      },
    ],
  }));

  if (!isActive) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Glitch overlay */}
      <Animated.View style={[styles.glitchOverlay, glitchStyle]} />
      
      {/* Scanlines */}
      <Animated.View style={[styles.scanlines, scanlineStyle]}>
        {Array.from({ length: 50 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.scanline,
              {
                top: i * 4,
                opacity: Math.random() * 0.5 + 0.1,
              },
            ]}
          />
        ))}
      </Animated.View>

      {/* Static noise */}
      <View style={styles.staticNoise}>
        {Array.from({ length: 100 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.noisePixel,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                opacity: Math.random() * 0.3,
              },
            ]}
          />
        ))}
      </View>

      {/* Color distortion */}
      <Animated.View style={[styles.colorDistortion, glitchStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: 'none',
  },
  glitchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 46, 192, 0.1)',
  },
  scanlines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#00FFF7',
  },
  staticNoise: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  noisePixel: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#FF2EC0',
  },
  colorDistortion: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 255, 247, 0.05)',
  },
});