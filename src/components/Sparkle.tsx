import React from 'react';
import { View, type DimensionValue } from 'react-native';
import Svg, { Line } from 'react-native-svg';

interface SparkleProps {
  x: DimensionValue;
  y: DimensionValue;
  size?: number;
  color?: string;
}

const Sparkle: React.FC<SparkleProps> = ({
  x,
  y,
  size = 8,
  color = '#FFF3C4',
}) => (
  <View
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
    }}
    pointerEvents="none"
  >
    <Svg width={size} height={size} viewBox="0 0 8 8">
      <Line
        x1="4"
        y1="0"
        x2="4"
        y2="8"
        stroke={color}
        strokeWidth="1.2"
        opacity={0.6}
        strokeLinecap="round"
      />
      <Line
        x1="0"
        y1="4"
        x2="8"
        y2="4"
        stroke={color}
        strokeWidth="1.2"
        opacity={0.6}
        strokeLinecap="round"
      />
    </Svg>
  </View>
);

export default React.memo(Sparkle);
