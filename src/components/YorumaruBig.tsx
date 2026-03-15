import React from "react";
import Svg, {
  Circle,
  Path,
  Ellipse,
  G,
  Text as SvgText,
  Line,
} from "react-native-svg";
import { YorumaruExpression } from "../types";

const C = {
  body: "#FFF8DC",
  outline: "#D4A843",
  cheek: "#FFD1A9",
  accent: "#FFF3C4",
  bg1: "#0f0c29",
  mehCheek: "#B0AABE",
};

interface YorumaruBigProps {
  expression: YorumaruExpression;
  size?: number;
}

const YorumaruBig: React.FC<YorumaruBigProps> = ({
  expression,
  size = 140,
}) => {
  const s = size;
  const cx = s / 2;
  const cy = s * 0.45;
  const r = s * 0.27;
  const ey = cy - r * 0.06;
  const es = r * 0.2;
  const my = cy + r * 0.24;
  const isGreat = expression === "great";
  const isWave = expression === "wave";

  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {/* Glow circle behind body */}
      <Circle cx={cx} cy={cy} r={r + s * 0.06} fill={C.body} opacity={0.12} />

      {/* Body circle */}
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill={C.body}
        stroke={C.outline}
        strokeWidth={2}
      />

      {/* Crescent hat */}
      <G
        transform={`translate(${cx + r * 0.32},${cy - r - r * 0.18})`}
      >
        <Circle
          r={r * 0.32}
          fill={C.body}
          stroke={C.outline}
          strokeWidth={1.8}
        />
        <Circle
          cx={r * 0.13}
          cy={-r * 0.08}
          r={r * 0.22}
          fill={C.bg1}
        />
        <Circle
          cx={-r * 0.12}
          cy={-r * 0.15}
          r={r * 0.03}
          fill={C.accent}
          opacity={0.8}
        />
      </G>

      {/* Arms */}
      {isGreat ? (
        <>
          <Path
            d={`M${cx - r + 2} ${cy - r * 0.05}Q${cx - r - 16} ${cy - r * 0.4} ${cx - r - 6} ${cy - r * 0.7}`}
            stroke={C.outline}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Circle
            cx={cx - r - 6}
            cy={cy - r * 0.72}
            r={r * 0.08}
            fill={C.body}
            stroke={C.outline}
            strokeWidth={1.5}
          />
          <Path
            d={`M${cx + r - 2} ${cy - r * 0.05}Q${cx + r + 16} ${cy - r * 0.4} ${cx + r + 6} ${cy - r * 0.7}`}
            stroke={C.outline}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Circle
            cx={cx + r + 6}
            cy={cy - r * 0.72}
            r={r * 0.08}
            fill={C.body}
            stroke={C.outline}
            strokeWidth={1.5}
          />
        </>
      ) : isWave ? (
        <>
          <Path
            d={`M${cx - r + 4} ${cy + r * 0.15}Q${cx - r - 12} ${cy + r * 0.48} ${cx - r + 3} ${cy + r * 0.58}`}
            stroke={C.outline}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + r - 2} ${cy - r * 0.05}Q${cx + r + 14} ${cy - r * 0.35} ${cx + r + 8} ${cy - r * 0.6}`}
            stroke={C.outline}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Circle
            cx={cx + r + 8}
            cy={cy - r * 0.62}
            r={r * 0.08}
            fill={C.body}
            stroke={C.outline}
            strokeWidth={1.5}
          />
        </>
      ) : (
        <>
          <Path
            d={`M${cx - r + 4} ${cy + r * 0.15}Q${cx - r - 12} ${cy + r * 0.48} ${cx - r + 3} ${cy + r * 0.58}`}
            stroke={C.outline}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + r - 4} ${cy + r * 0.15}Q${cx + r + 12} ${cy + r * 0.48} ${cx + r - 3} ${cy + r * 0.58}`}
            stroke={C.outline}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* Feet */}
      <Ellipse
        cx={cx - r * 0.35}
        cy={cy + r + 4}
        rx={r * 0.22}
        ry={r * 0.13}
        fill={C.body}
        stroke={C.outline}
        strokeWidth={1.8}
      />
      <Ellipse
        cx={cx + r * 0.35}
        cy={cy + r + 4}
        rx={r * 0.22}
        ry={r * 0.13}
        fill={C.body}
        stroke={C.outline}
        strokeWidth={1.8}
      />

      {/* === Expression: great === */}
      {expression === "great" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.14} ry={r * 0.09} fill={C.cheek} opacity={0.6} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.14} ry={r * 0.09} fill={C.cheek} opacity={0.6} />
          <Path
            d={`M${cx - es - r * 0.08} ${ey + r * 0.02}Q${cx - es} ${ey - r * 0.1} ${cx - es + r * 0.08} ${ey + r * 0.02}`}
            stroke="#2D2D3D"
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + es - r * 0.08} ${ey + r * 0.02}Q${cx + es} ${ey - r * 0.1} ${cx + es + r * 0.08} ${ey + r * 0.02}`}
            stroke="#2D2D3D"
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
          />
          <Ellipse cx={cx} cy={my + r * 0.04} rx={r * 0.14} ry={r * 0.11} fill="#2D2D3D" />
          <Ellipse cx={cx} cy={my + r * 0.1} rx={r * 0.08} ry={r * 0.045} fill="#E88A98" opacity={0.6} />
          <G transform={`translate(${cx + r * 0.65},${cy - r * 0.45})`}>
            <Line x1={0} y1={-6} x2={0} y2={6} stroke={C.accent} strokeWidth={1.5} opacity={0.9} />
            <Line x1={-6} y1={0} x2={6} y2={0} stroke={C.accent} strokeWidth={1.5} opacity={0.9} />
          </G>
        </>
      )}

      {/* === Expression: good === */}
      {expression === "good" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Path
            d={`M${cx - es - r * 0.06} ${ey + r * 0.02}Q${cx - es} ${ey - r * 0.06} ${cx - es + r * 0.06} ${ey + r * 0.02}`}
            stroke="#2D2D3D"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + es - r * 0.06} ${ey + r * 0.02}Q${cx + es} ${ey - r * 0.06} ${cx + es + r * 0.06} ${ey + r * 0.02}`}
            stroke="#2D2D3D"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx - r * 0.12} ${my - 1}Q${cx} ${my + r * 0.14} ${cx + r * 0.12} ${my - 1}`}
            stroke="#2D2D3D"
            strokeWidth={1.8}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* === Expression: okay === */}
      {expression === "okay" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Circle cx={cx - es} cy={ey} r={r * 0.055} fill="#2D2D3D" />
          <Circle cx={cx + es} cy={ey} r={r * 0.055} fill="#2D2D3D" />
          <Path
            d={`M${cx - r * 0.07} ${my + 1}Q${cx} ${my + r * 0.07} ${cx + r * 0.07} ${my + 1}`}
            stroke="#2D2D3D"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* === Expression: meh === */}
      {expression === "meh" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.1} ry={r * 0.06} fill={C.mehCheek} opacity={0.35} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.1} ry={r * 0.06} fill={C.mehCheek} opacity={0.35} />
          <Circle cx={cx - es} cy={ey} r={r * 0.055} fill="#2D2D3D" />
          <Circle cx={cx + es} cy={ey} r={r * 0.055} fill="#2D2D3D" />
          <Path
            d={`M${cx - es + r * 0.05} ${ey - r * 0.14}L${cx - es - r * 0.07} ${ey - r * 0.09}`}
            stroke="#2D2D3D"
            strokeWidth={1.3}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + es - r * 0.05} ${ey - r * 0.14}L${cx + es + r * 0.07} ${ey - r * 0.09}`}
            stroke="#2D2D3D"
            strokeWidth={1.3}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx - r * 0.07} ${my + 1}Q${cx} ${my + r * 0.06} ${cx + r * 0.07} ${my + 1}`}
            stroke="#2D2D3D"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* === Expression: bad === */}
      {expression === "bad" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.1} ry={r * 0.06} fill="#AABBDD" opacity={0.25} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.1} ry={r * 0.06} fill="#AABBDD" opacity={0.25} />
          <Circle cx={cx - es} cy={ey} r={r * 0.07} fill="#2D2D3D" />
          <Circle cx={cx + es} cy={ey} r={r * 0.07} fill="#2D2D3D" />
          <Circle cx={cx - es + r * 0.025} cy={ey - r * 0.03} r={r * 0.028} fill="white" opacity={0.9} />
          <Circle cx={cx + es + r * 0.025} cy={ey - r * 0.03} r={r * 0.028} fill="white" opacity={0.9} />
          <Circle cx={cx - es - r * 0.08} cy={ey + r * 0.2} r={r * 0.06} fill="#A8D4F0" opacity={0.65} />
          <Circle cx={cx + es + r * 0.08} cy={ey + r * 0.2} r={r * 0.06} fill="#A8D4F0" opacity={0.65} />
          <Circle cx={cx - es - r * 0.04} cy={ey + r * 0.35} r={r * 0.04} fill="#A8D4F0" opacity={0.45} />
          <Circle cx={cx + es + r * 0.04} cy={ey + r * 0.35} r={r * 0.04} fill="#A8D4F0" opacity={0.45} />
          <Path
            d={`M${cx - r * 0.06} ${my + 3}Q${cx} ${my} ${cx + r * 0.06} ${my + 3}`}
            stroke="#2D2D3D"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      {/* === Expression: sleepy === */}
      {expression === "sleepy" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Path
            d={`M${cx - es - r * 0.06} ${ey}L${cx - es + r * 0.06} ${ey}`}
            stroke="#2D2D3D"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + es - r * 0.06} ${ey}L${cx + es + r * 0.06} ${ey}`}
            stroke="#2D2D3D"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Ellipse cx={cx} cy={my + 2} rx={r * 0.05} ry={r * 0.06} fill="#2D2D3D" />
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
      )}

      {/* === Expression: wave === */}
      {expression === "wave" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.11} ry={r * 0.07} fill={C.cheek} opacity={0.45} />
          <Circle cx={cx - es} cy={ey} r={r * 0.06} fill="#2D2D3D" />
          <Circle cx={cx + es} cy={ey} r={r * 0.06} fill="#2D2D3D" />
          <Circle cx={cx - es + r * 0.02} cy={ey - r * 0.02} r={r * 0.02} fill="white" opacity={0.7} />
          <Circle cx={cx + es + r * 0.02} cy={ey - r * 0.02} r={r * 0.02} fill="white" opacity={0.7} />
          <Path
            d={`M${cx - r * 0.1} ${my}Q${cx} ${my + r * 0.1} ${cx + r * 0.1} ${my}`}
            stroke="#2D2D3D"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
          <Line
            x1={cx + r + 16}
            y1={cy - r * 0.55}
            x2={cx + r + 22}
            y2={cy - r * 0.6}
            stroke="white"
            strokeWidth={1.2}
            opacity={0.4}
            strokeLinecap="round"
          />
          <Line
            x1={cx + r + 18}
            y1={cy - r * 0.45}
            x2={cx + r + 24}
            y2={cy - r * 0.48}
            stroke="white"
            strokeWidth={1.2}
            opacity={0.3}
            strokeLinecap="round"
          />
        </>
      )}

      {/* === Expression: love === */}
      {expression === "love" && (
        <>
          <Ellipse cx={cx - r * 0.38} cy={cy + r * 0.1} rx={r * 0.13} ry={r * 0.08} fill="#FFB4C8" opacity={0.5} />
          <Ellipse cx={cx + r * 0.38} cy={cy + r * 0.1} rx={r * 0.13} ry={r * 0.08} fill="#FFB4C8" opacity={0.5} />
          <Path
            d={`M${cx - es - r * 0.06} ${ey + r * 0.01}Q${cx - es} ${ey - r * 0.07} ${cx - es + r * 0.06} ${ey + r * 0.01}`}
            stroke="#2D2D3D"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx + es - r * 0.06} ${ey + r * 0.01}Q${cx + es} ${ey - r * 0.07} ${cx + es + r * 0.06} ${ey + r * 0.01}`}
            stroke="#2D2D3D"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M${cx - r * 0.12} ${my - 2}Q${cx} ${my + r * 0.15} ${cx + r * 0.12} ${my - 2}`}
            stroke="#2D2D3D"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />
          {/* Floating hearts */}
          <G transform={`translate(${cx + r * 0.65},${cy - r * 0.5}) scale(${r * 0.022})`}>
            <Path
              d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
              fill="#F28BA8"
              stroke="#E06080"
              strokeWidth={0.4}
              opacity={0.9}
            />
          </G>
          <G transform={`translate(${cx - r * 0.62},${cy - r * 0.6}) scale(${r * 0.019})`}>
            <Path
              d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
              fill="#F5A0B8"
              stroke="#E06080"
              strokeWidth={0.4}
              opacity={0.8}
            />
          </G>
          <G transform={`translate(${cx + r * 0.25},${cy - r * 0.82}) scale(${r * 0.016})`}>
            <Path
              d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
              fill="#FFBDD0"
              stroke="#E06080"
              strokeWidth={0.4}
              opacity={0.65}
            />
          </G>
          <G transform={`translate(${cx - r * 0.3},${cy - r * 0.85}) scale(${r * 0.013})`}>
            <Path
              d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
              fill="#FFD0DE"
              stroke="#E06080"
              strokeWidth={0.4}
              opacity={0.5}
            />
          </G>
          <G transform={`translate(${cx + r * 0.72},${cy - r * 0.78}) scale(${r * 0.011})`}>
            <Path
              d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
              fill="#FFD0DE"
              stroke="#E06080"
              strokeWidth={0.4}
              opacity={0.4}
            />
          </G>
        </>
      )}
    </Svg>
  );
};

export default React.memo(YorumaruBig);
