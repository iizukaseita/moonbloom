import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Path,
  Text as SvgText,
} from 'react-native-svg';
import { YorumaruExpression } from '../types';

const C = {
  body: '#FFF8DC',
  outline: '#D4A843',
  cheek: '#FFD1A9',
  accent: '#FFF3C4',
  bg1: '#0f0c29',
  mehCheek: '#B0AABE',
};

interface YorumaruMiniProps {
  expression: YorumaruExpression;
  size?: number;
}

const YorumaruMini: React.FC<YorumaruMiniProps> = ({
  expression,
  size = 48,
}) => {
  const s = size;
  const cx = s / 2;
  const cy = s * 0.45;
  const r = s * 0.3;
  const ey = cy - r * 0.06;
  const es = r * 0.2;
  const my = cy + r * 0.24;

  const renderCheeks = (c: string = C.cheek, o: number = 0.45) => (
    <>
      <Ellipse
        cx={cx - r * 0.38}
        cy={cy + r * 0.1}
        rx={r * 0.1}
        ry={r * 0.06}
        fill={c}
        opacity={o}
      />
      <Ellipse
        cx={cx + r * 0.38}
        cy={cy + r * 0.1}
        rx={r * 0.1}
        ry={r * 0.06}
        fill={c}
        opacity={o}
      />
    </>
  );

  const renderFace = () => {
    switch (expression) {
      case 'great':
        return (
          <>
            {renderCheeks(C.cheek, 0.6)}
            <Path
              d={`M${cx - es - r * 0.08} ${ey + r * 0.02}Q${cx - es} ${ey - r * 0.1} ${cx - es + r * 0.08} ${ey + r * 0.02}`}
              stroke="#2D2D3D"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx + es - r * 0.08} ${ey + r * 0.02}Q${cx + es} ${ey - r * 0.1} ${cx + es + r * 0.08} ${ey + r * 0.02}`}
              stroke="#2D2D3D"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <Ellipse
              cx={cx}
              cy={my + r * 0.04}
              rx={r * 0.12}
              ry={r * 0.09}
              fill="#2D2D3D"
            />
          </>
        );

      case 'good':
        return (
          <>
            {renderCheeks()}
            <Path
              d={`M${cx - es - r * 0.06} ${ey + r * 0.02}Q${cx - es} ${ey - r * 0.06} ${cx - es + r * 0.06} ${ey + r * 0.02}`}
              stroke="#2D2D3D"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx + es - r * 0.06} ${ey + r * 0.02}Q${cx + es} ${ey - r * 0.06} ${cx + es + r * 0.06} ${ey + r * 0.02}`}
              stroke="#2D2D3D"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx - r * 0.12} ${my - 1}Q${cx} ${my + r * 0.14} ${cx + r * 0.12} ${my - 1}`}
              stroke="#2D2D3D"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'okay':
        return (
          <>
            {renderCheeks()}
            <Circle cx={cx - es} cy={ey} r={r * 0.05} fill="#2D2D3D" />
            <Circle cx={cx + es} cy={ey} r={r * 0.05} fill="#2D2D3D" />
            <Path
              d={`M${cx - r * 0.07} ${my + 1}Q${cx} ${my + r * 0.07} ${cx + r * 0.07} ${my + 1}`}
              stroke="#2D2D3D"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'meh':
        return (
          <>
            {renderCheeks(C.mehCheek, 0.35)}
            <Circle cx={cx - es} cy={ey} r={r * 0.05} fill="#2D2D3D" />
            <Circle cx={cx + es} cy={ey} r={r * 0.05} fill="#2D2D3D" />
            <Path
              d={`M${cx - es + r * 0.05} ${ey - r * 0.14}L${cx - es - r * 0.07} ${ey - r * 0.09}`}
              stroke="#2D2D3D"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx + es - r * 0.05} ${ey - r * 0.14}L${cx + es + r * 0.07} ${ey - r * 0.09}`}
              stroke="#2D2D3D"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx - r * 0.06} ${my + 1}Q${cx} ${my + r * 0.05} ${cx + r * 0.06} ${my + 1}`}
              stroke="#2D2D3D"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'bad':
        return (
          <>
            <Circle cx={cx - es} cy={ey} r={r * 0.06} fill="#2D2D3D" />
            <Circle cx={cx + es} cy={ey} r={r * 0.06} fill="#2D2D3D" />
            <Circle
              cx={cx - es + r * 0.02}
              cy={ey - r * 0.025}
              r={r * 0.022}
              fill="white"
              opacity={0.8}
            />
            <Circle
              cx={cx + es + r * 0.02}
              cy={ey - r * 0.025}
              r={r * 0.022}
              fill="white"
              opacity={0.8}
            />
            <Circle
              cx={cx - es - r * 0.07}
              cy={ey + r * 0.18}
              r={r * 0.05}
              fill="#A8D4F0"
              opacity={0.6}
            />
            <Circle
              cx={cx + es + r * 0.07}
              cy={ey + r * 0.18}
              r={r * 0.05}
              fill="#A8D4F0"
              opacity={0.6}
            />
            <Path
              d={`M${cx - r * 0.06} ${my + 3}Q${cx} ${my} ${cx + r * 0.06} ${my + 3}`}
              stroke="#2D2D3D"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'sleepy':
        return (
          <>
            {renderCheeks()}
            <Path
              d={`M${cx - es - r * 0.06} ${ey}L${cx - es + r * 0.06} ${ey}`}
              stroke="#2D2D3D"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx + es - r * 0.06} ${ey}L${cx + es + r * 0.06} ${ey}`}
              stroke="#2D2D3D"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <Ellipse
              cx={cx}
              cy={my + 2}
              rx={r * 0.05}
              ry={r * 0.06}
              fill="#2D2D3D"
            />
            <SvgText
              x={cx + r * 0.32}
              y={cy + r * 0.05}
              fill="#2D2D3D"
              fontSize={r * 0.22}
              fontFamily="serif"
              fontWeight="900"
              fontStyle="italic"
              opacity={0.8}
            >
              z
            </SvgText>
            <SvgText
              x={cx + r * 0.45}
              y={cy - r * 0.15}
              fill="#2D2D3D"
              fontSize={r * 0.3}
              fontFamily="serif"
              fontWeight="900"
              fontStyle="italic"
              opacity={0.6}
            >
              z
            </SvgText>
            <SvgText
              x={cx + r * 0.55}
              y={cy - r * 0.38}
              fill="#2D2D3D"
              fontSize={r * 0.38}
              fontFamily="serif"
              fontWeight="900"
              fontStyle="italic"
              opacity={0.4}
            >
              z
            </SvgText>
          </>
        );

      case 'wave':
        return (
          <>
            {renderCheeks()}
            <Circle cx={cx - es} cy={ey} r={r * 0.06} fill="#2D2D3D" />
            <Circle cx={cx + es} cy={ey} r={r * 0.06} fill="#2D2D3D" />
            <Circle
              cx={cx - es + r * 0.02}
              cy={ey - r * 0.02}
              r={r * 0.02}
              fill="white"
              opacity={0.7}
            />
            <Circle
              cx={cx + es + r * 0.02}
              cy={ey - r * 0.02}
              r={r * 0.02}
              fill="white"
              opacity={0.7}
            />
            <Path
              d={`M${cx - r * 0.1} ${my}Q${cx} ${my + r * 0.1} ${cx + r * 0.1} ${my}`}
              stroke="#2D2D3D"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      case 'love':
        return (
          <>
            <Ellipse
              cx={cx - r * 0.38}
              cy={cy + r * 0.1}
              rx={r * 0.13}
              ry={r * 0.08}
              fill="#FFB4C8"
              opacity={0.5}
            />
            <Ellipse
              cx={cx + r * 0.38}
              cy={cy + r * 0.1}
              rx={r * 0.13}
              ry={r * 0.08}
              fill="#FFB4C8"
              opacity={0.5}
            />
            <Path
              d={`M${cx - es - r * 0.06} ${ey + r * 0.01}Q${cx - es} ${ey - r * 0.07} ${cx - es + r * 0.06} ${ey + r * 0.01}`}
              stroke="#2D2D3D"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx + es - r * 0.06} ${ey + r * 0.01}Q${cx + es} ${ey - r * 0.07} ${cx + es + r * 0.06} ${ey + r * 0.01}`}
              stroke="#2D2D3D"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d={`M${cx - r * 0.12} ${my - 2}Q${cx} ${my + r * 0.15} ${cx + r * 0.12} ${my - 2}`}
              stroke="#2D2D3D"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {/* Body */}
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill={C.body}
        stroke={C.outline}
        strokeWidth="1.5"
      />

      {/* Crescent hat */}
      <G
        transform={`translate(${cx + r * 0.32},${cy - r * 1.18}) scale(0.9)`}
      >
        <Circle
          r={r * 0.3}
          fill={C.body}
          stroke={C.outline}
          strokeWidth="1.3"
        />
        <Circle cx={r * 0.12} cy={-r * 0.07} r={r * 0.2} fill={C.bg1} />
      </G>

      {/* Left foot */}
      <Ellipse
        cx={cx - r * 0.35}
        cy={cy + r + 3}
        rx={r * 0.2}
        ry={r * 0.1}
        fill={C.body}
        stroke={C.outline}
        strokeWidth="1.3"
      />

      {/* Right foot */}
      <Ellipse
        cx={cx + r * 0.35}
        cy={cy + r + 3}
        rx={r * 0.2}
        ry={r * 0.1}
        fill={C.body}
        stroke={C.outline}
        strokeWidth="1.3"
      />

      {/* Face */}
      {renderFace()}
    </Svg>
  );
};

export default React.memo(YorumaruMini);
