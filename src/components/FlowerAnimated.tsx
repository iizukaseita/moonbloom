import React, { useEffect } from 'react';
import Svg, { Circle, Ellipse, Line, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { FlowerStage, FlowerType } from '../types';

interface FlowerAnimatedProps {
  stage: FlowerStage;
  type?: FlowerType;
  size?: number;
  animating?: boolean;
}

const FLOWER_COLORS: Record<FlowerType, { petal: string; center: string }> = {
  moonflower: { petal: '#FFF3C4', center: '#F6E05E' },
  starbell: { petal: '#D8C4F0', center: '#B794F4' },
  nightrose: { petal: '#FFB4C8', center: '#E06080' },
};

const FlowerAnimated: React.FC<FlowerAnimatedProps> = ({
  stage,
  type = 'moonflower',
  size = 48,
  animating = false,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (animating) {
      scale.value = withRepeat(
        withTiming(1.08, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    } else {
      scale.value = withTiming(1, { duration: 300 });
    }
  }, [animating, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const cl = FLOWER_COLORS[type];
  const cx = size / 2;

  const renderFlower = () => {
    switch (stage) {
      case 'seed':
        return (
          <Ellipse
            cx={cx}
            cy={size * 0.8}
            rx={size * 0.1}
            ry={size * 0.06}
            fill="#8B7355"
          />
        );
      case 'sprout':
        return (
          <>
            <Line
              x1={cx}
              y1={size * 0.85}
              x2={cx}
              y2={size * 0.5}
              stroke="#6B8E5A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Ellipse
              cx={cx - 4}
              cy={size * 0.5}
              rx={4}
              ry={6}
              fill="#8FBC6A"
              rotation={-20}
              origin={`${cx - 4}, ${size * 0.5}`}
            />
            <Ellipse
              cx={cx + 4}
              cy={size * 0.52}
              rx={4}
              ry={5}
              fill="#8FBC6A"
              rotation={20}
              origin={`${cx + 4}, ${size * 0.52}`}
            />
          </>
        );
      case 'bud':
        return (
          <>
            <Line
              x1={cx}
              y1={size * 0.85}
              x2={cx}
              y2={size * 0.4}
              stroke="#6B8E5A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Ellipse
              cx={cx - 5}
              cy={size * 0.55}
              rx={4}
              ry={6}
              fill="#8FBC6A"
              rotation={-25}
              origin={`${cx - 5}, ${size * 0.55}`}
            />
            <Ellipse
              cx={cx}
              cy={size * 0.38}
              rx={5}
              ry={7}
              fill={cl.petal}
              opacity={0.7}
            />
          </>
        );
      case 'bloom':
        return (
          <>
            <Line
              x1={cx}
              y1={size * 0.85}
              x2={cx}
              y2={size * 0.4}
              stroke="#6B8E5A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Ellipse
              cx={cx - 5}
              cy={size * 0.58}
              rx={3}
              ry={5}
              fill="#8FBC6A"
              rotation={-25}
              origin={`${cx - 5}, ${size * 0.58}`}
            />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <Ellipse
                key={angle}
                cx={cx}
                cy={size * 0.28}
                rx={4}
                ry={7}
                fill={cl.petal}
                rotation={angle}
                origin={`${cx}, ${size * 0.35}`}
                opacity={0.85}
              />
            ))}
            <Circle cx={cx} cy={size * 0.35} r={3.5} fill={cl.center} />
          </>
        );
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {animating && (
          <Circle
            cx={cx}
            cy={size * 0.4}
            r={size * 0.35}
            fill={cl.center}
            opacity={0.15}
          />
        )}
        {renderFlower()}
      </Svg>
    </Animated.View>
  );
};

export default React.memo(FlowerAnimated);
