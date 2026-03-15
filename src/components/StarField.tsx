import React from 'react';
import { StyleSheet, View } from 'react-native';

const STARS = Array.from({ length: 25 }, (_, i) => ({
  key: i,
  left: `${((i * 41 + 7) % 90) + 5}%` as const,
  top: `${((i * 29 + 13) % 85) + 5}%` as const,
  size: i % 4 === 0 ? 3 : 1.5,
  opacity: 0.08 + (i % 5) * 0.05,
}));

const StarField: React.FC = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    {STARS.map((star) => (
      <View
        key={star.key}
        style={{
          position: 'absolute',
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          borderRadius: star.size / 2,
          backgroundColor: 'white',
          opacity: star.opacity,
        }}
      />
    ))}
  </View>
);

export default React.memo(StarField);
