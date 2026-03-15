import { useState } from "react";

const colorSchemes = [
  { id: "moon", label: "お月さま", body: "#FFF8DC", outline: "#D4A843", cheek: "#FFD1A9", accent: "#FFF3C4", bg1: "#0f0c29", bg2: "#1a1a3e" },
  { id: "lavender", label: "ラベンダー", body: "#EDE4F7", outline: "#A07CC5", cheek: "#E8B4CB", accent: "#D8C4F0", bg1: "#1a0f29", bg2: "#2a1a3e" },
  { id: "cream", label: "クリーム", body: "#FFF5E6", outline: "#C9A96E", cheek: "#FFCBA4", accent: "#FFF0D0", bg1: "#0f1429", bg2: "#1a2040" },
];

const moodLevels = [
  { id: "great", label: "さいこー！", labelEn: "Amazing!", color: "#FFD700" },
  { id: "good", label: "にこにこ", labelEn: "Happy", color: "#90EE90" },
  { id: "okay", label: "ぼちぼち", labelEn: "So-so", color: "#87CEEB" },
  { id: "meh", label: "しょんぼり", labelEn: "Down", color: "#DDA0DD" },
  { id: "bad", label: "ぴえん", labelEn: "Sad", color: "#B0C4DE" },
];

const extraExpressions = [
  { id: "sleepy", label: "ねむねむ", labelEn: "Sleepy" },
  { id: "wave", label: "ばいばい", labelEn: "Bye-bye" },
  { id: "love", label: "だいすき", labelEn: "Love" },
];

const CrescentYorumaru = ({ expression = "great", colorScheme = "moon", size = 200, hatSize = 1.0, armStyle = "line", feetSize = 1.0, showGlow = true }) => {
  const colors = colorSchemes.find(c => c.id === colorScheme) || colorSchemes[0];
  const s = size;
  const cx = s / 2;
  const cy = s * 0.45;
  const bodyR = s * 0.27;

  const isWave = expression === "wave";
  const isGreat = expression === "great";

  const renderBody = () => (
    <>
      {showGlow && <circle cx={cx} cy={cy} r={bodyR + s * 0.06} fill={colors.body} opacity="0.12" />}
      {showGlow && <circle cx={cx} cy={cy} r={bodyR + s * 0.12} fill={colors.body} opacity="0.05" />}

      {/* Main body */}
      <circle cx={cx} cy={cy} r={bodyR} fill={colors.body} stroke={colors.outline} strokeWidth="2" />

      {/* Crescent hat */}
      <g transform={`translate(${cx + bodyR * 0.32}, ${cy - bodyR - bodyR * 0.18 * hatSize}) scale(${hatSize})`}>
        <circle r={bodyR * 0.32} fill={colors.body} stroke={colors.outline} strokeWidth="1.8" />
        <circle cx={bodyR * 0.13} cy={-bodyR * 0.08} r={bodyR * 0.22} fill={colors.bg1} />
        <circle cx={-bodyR * 0.12} cy={-bodyR * 0.15} r={bodyR * 0.03} fill={colors.accent} opacity="0.8" />
      </g>

      {/* Left arm */}
      {isGreat ? (
        <>
          {/* Left arm raised up high - banzai! */}
          <path d={`M ${cx - bodyR + 2} ${cy - bodyR * 0.05}
            Q ${cx - bodyR - 16} ${cy - bodyR * 0.4} ${cx - bodyR - 6} ${cy - bodyR * 0.7}`}
            stroke={colors.outline} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx={cx - bodyR - 6} cy={cy - bodyR * 0.72} r={bodyR * 0.08}
            fill={colors.body} stroke={colors.outline} strokeWidth="1.5" />
        </>
      ) : armStyle === "line" ? (
        <path d={`M ${cx - bodyR + 4} ${cy + bodyR * 0.15} Q ${cx - bodyR - 12} ${cy + bodyR * 0.48} ${cx - bodyR + 3} ${cy + bodyR * 0.58}`}
          stroke={colors.outline} strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx={cx - bodyR - bodyR * 0.08} cy={cy + bodyR * 0.28} rx={bodyR * 0.18} ry={bodyR * 0.11}
          fill={colors.body} stroke={colors.outline} strokeWidth="1.8" transform={`rotate(-25 ${cx - bodyR - bodyR * 0.08} ${cy + bodyR * 0.28})`} />
      )}

      {/* Right arm */}
      {isGreat ? (
        <>
          {/* Right arm raised up high - banzai! */}
          <path d={`M ${cx + bodyR - 2} ${cy - bodyR * 0.05}
            Q ${cx + bodyR + 16} ${cy - bodyR * 0.4} ${cx + bodyR + 6} ${cy - bodyR * 0.7}`}
            stroke={colors.outline} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx={cx + bodyR + 6} cy={cy - bodyR * 0.72} r={bodyR * 0.08}
            fill={colors.body} stroke={colors.outline} strokeWidth="1.5" />
        </>
      ) : isWave ? (
        <>
          <path d={`M ${cx + bodyR - 2} ${cy - bodyR * 0.05}
            Q ${cx + bodyR + 14} ${cy - bodyR * 0.35} ${cx + bodyR + 8} ${cy - bodyR * 0.6}`}
            stroke={colors.outline} strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx={cx + bodyR + 8} cy={cy - bodyR * 0.62} r={bodyR * 0.08}
            fill={colors.body} stroke={colors.outline} strokeWidth="1.5" />
        </>
      ) : armStyle === "line" ? (
        <path d={`M ${cx + bodyR - 4} ${cy + bodyR * 0.15} Q ${cx + bodyR + 12} ${cy + bodyR * 0.48} ${cx + bodyR - 3} ${cy + bodyR * 0.58}`}
          stroke={colors.outline} strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx={cx + bodyR + bodyR * 0.08} cy={cy + bodyR * 0.28} rx={bodyR * 0.18} ry={bodyR * 0.11}
          fill={colors.body} stroke={colors.outline} strokeWidth="1.8" transform={`rotate(25 ${cx + bodyR + bodyR * 0.08} ${cy + bodyR * 0.28})`} />
      )}

      {/* Feet */}
      <ellipse cx={cx - bodyR * 0.35} cy={cy + bodyR + 4} rx={bodyR * 0.22 * feetSize} ry={bodyR * 0.13 * feetSize}
        fill={colors.body} stroke={colors.outline} strokeWidth="1.8" />
      <ellipse cx={cx + bodyR * 0.35} cy={cy + bodyR + 4} rx={bodyR * 0.22 * feetSize} ry={bodyR * 0.13 * feetSize}
        fill={colors.body} stroke={colors.outline} strokeWidth="1.8" />
    </>
  );

  const renderFace = () => {
    const eyeY = cy - bodyR * 0.06;
    const eyeSpacing = bodyR * 0.2;
    const mouthY = cy + bodyR * 0.24;

    const cheeks = (
      <>
        <ellipse cx={cx - bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.11} ry={bodyR * 0.07} fill={colors.cheek} opacity="0.45" />
        <ellipse cx={cx + bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.11} ry={bodyR * 0.07} fill={colors.cheek} opacity="0.45" />
      </>
    );

    switch (expression) {
      case "great":
        return (
          <>
            {/* Extra big bright cheeks */}
            <ellipse cx={cx - bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.14} ry={bodyR * 0.09} fill={colors.cheek} opacity="0.6" />
            <ellipse cx={cx + bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.14} ry={bodyR * 0.09} fill={colors.cheek} opacity="0.6" />
            {/* Super tight happy squint - thicker lines, more curved */}
            <path d={`M ${cx - eyeSpacing - bodyR * 0.08} ${eyeY + bodyR * 0.02} Q ${cx - eyeSpacing} ${eyeY - bodyR * 0.1} ${cx - eyeSpacing + bodyR * 0.08} ${eyeY + bodyR * 0.02}`}
              stroke="#2D2D3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d={`M ${cx + eyeSpacing - bodyR * 0.08} ${eyeY + bodyR * 0.02} Q ${cx + eyeSpacing} ${eyeY - bodyR * 0.1} ${cx + eyeSpacing + bodyR * 0.08} ${eyeY + bodyR * 0.02}`}
              stroke="#2D2D3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Big wide OPEN mouth - filled oval */}
            <ellipse cx={cx} cy={mouthY + bodyR * 0.04} rx={bodyR * 0.14} ry={bodyR * 0.11} fill="#2D2D3D" />
            {/* Tongue / inner highlight */}
            <ellipse cx={cx} cy={mouthY + bodyR * 0.1} rx={bodyR * 0.08} ry={bodyR * 0.045} fill="#E88A98" opacity="0.6" />
            {/* Multiple sparkles */}
            <g transform={`translate(${cx + bodyR * 0.65}, ${cy - bodyR * 0.45})`}>
              <line x1="0" y1="-6" x2="0" y2="6" stroke={colors.accent} strokeWidth="1.5" opacity="0.9" />
              <line x1="-6" y1="0" x2="6" y2="0" stroke={colors.accent} strokeWidth="1.5" opacity="0.9" />
              <line x1="-4" y1="-4" x2="4" y2="4" stroke={colors.accent} strokeWidth="1" opacity="0.5" />
              <line x1="4" y1="-4" x2="-4" y2="4" stroke={colors.accent} strokeWidth="1" opacity="0.5" />
            </g>
            <g transform={`translate(${cx - bodyR * 0.68}, ${cy - bodyR * 0.5}) scale(0.8)`}>
              <line x1="0" y1="-5" x2="0" y2="5" stroke={colors.accent} strokeWidth="1.5" opacity="0.7" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke={colors.accent} strokeWidth="1.5" opacity="0.7" />
            </g>
            <g transform={`translate(${cx + bodyR * 0.25}, ${cy - bodyR * 0.8}) scale(0.6)`}>
              <line x1="0" y1="-4" x2="0" y2="4" stroke={colors.accent} strokeWidth="1.5" opacity="0.5" />
              <line x1="-4" y1="0" x2="4" y2="0" stroke={colors.accent} strokeWidth="1.5" opacity="0.5" />
            </g>
          </>
        );

      case "good":
        return (
          <>
            {cheeks}
            {/* Soft happy eyes - slightly squinted upward */}
            <path d={`M ${cx - eyeSpacing - bodyR * 0.06} ${eyeY + bodyR * 0.02} Q ${cx - eyeSpacing} ${eyeY - bodyR * 0.06} ${cx - eyeSpacing + bodyR * 0.06} ${eyeY + bodyR * 0.02}`}
              stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={`M ${cx + eyeSpacing - bodyR * 0.06} ${eyeY + bodyR * 0.02} Q ${cx + eyeSpacing} ${eyeY - bodyR * 0.06} ${cx + eyeSpacing + bodyR * 0.06} ${eyeY + bodyR * 0.02}`}
              stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Curved smile - no fill */}
            <path d={`M ${cx - bodyR * 0.12} ${mouthY - 1} Q ${cx} ${mouthY + bodyR * 0.14} ${cx + bodyR * 0.12} ${mouthY - 1}`}
              stroke="#2D2D3D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </>
        );

      case "okay":
        return (
          <>
            {cheeks}
            {/* Open dot eyes - neutral */}
            <circle cx={cx - eyeSpacing} cy={eyeY} r={bodyR * 0.055} fill="#2D2D3D" />
            <circle cx={cx + eyeSpacing} cy={eyeY} r={bodyR * 0.055} fill="#2D2D3D" />
            {/* Small gentle smile */}
            <path d={`M ${cx - bodyR * 0.07} ${mouthY + 1} Q ${cx} ${mouthY + bodyR * 0.07} ${cx + bodyR * 0.07} ${mouthY + 1}`}
              stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        );

      case "meh":
        return (
          <>
            {/* Muted blue-gray cheeks - less energetic */}
            <ellipse cx={cx - bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.1} ry={bodyR * 0.06} fill="#B0AABE" opacity="0.35" />
            <ellipse cx={cx + bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.1} ry={bodyR * 0.06} fill="#B0AABE" opacity="0.35" />
            <circle cx={cx - eyeSpacing} cy={eyeY} r={bodyR * 0.055} fill="#2D2D3D" />
            <circle cx={cx + eyeSpacing} cy={eyeY} r={bodyR * 0.055} fill="#2D2D3D" />
            {/* Sad droopy brows - high inside, low outside */}
            <path d={`M ${cx - eyeSpacing + bodyR * 0.05} ${eyeY - bodyR * 0.14} L ${cx - eyeSpacing - bodyR * 0.07} ${eyeY - bodyR * 0.09}`}
              stroke="#2D2D3D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <path d={`M ${cx + eyeSpacing - bodyR * 0.05} ${eyeY - bodyR * 0.14} L ${cx + eyeSpacing + bodyR * 0.07} ${eyeY - bodyR * 0.09}`}
              stroke="#2D2D3D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            {/* Slight downturned mouth */}
            <path d={`M ${cx - bodyR * 0.07} ${mouthY + 1} Q ${cx} ${mouthY + bodyR * 0.06} ${cx + bodyR * 0.07} ${mouthY + 1}`}
              stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        );

      case "bad":
        return (
          <>
            {/* Sad blush */}
            <ellipse cx={cx - bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.1} ry={bodyR * 0.06} fill="#AABBDD" opacity="0.25" />
            <ellipse cx={cx + bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.1} ry={bodyR * 0.06} fill="#AABBDD" opacity="0.25" />
            {/* Big round teary eyes */}
            <circle cx={cx - eyeSpacing} cy={eyeY} r={bodyR * 0.07} fill="#2D2D3D" />
            <circle cx={cx + eyeSpacing} cy={eyeY} r={bodyR * 0.07} fill="#2D2D3D" />
            {/* Highlights */}
            <circle cx={cx - eyeSpacing + bodyR * 0.025} cy={eyeY - bodyR * 0.03} r={bodyR * 0.028} fill="white" opacity="0.9" />
            <circle cx={cx + eyeSpacing + bodyR * 0.025} cy={eyeY - bodyR * 0.03} r={bodyR * 0.028} fill="white" opacity="0.9" />
            <circle cx={cx - eyeSpacing - bodyR * 0.015} cy={eyeY + bodyR * 0.02} r={bodyR * 0.012} fill="white" opacity="0.5" />
            <circle cx={cx + eyeSpacing - bodyR * 0.015} cy={eyeY + bodyR * 0.02} r={bodyR * 0.012} fill="white" opacity="0.5" />
            {/* Big cute round tears */}
            <circle cx={cx - eyeSpacing - bodyR * 0.08} cy={eyeY + bodyR * 0.2} r={bodyR * 0.06} fill="#A8D4F0" opacity="0.65" />
            <circle cx={cx + eyeSpacing + bodyR * 0.08} cy={eyeY + bodyR * 0.2} r={bodyR * 0.06} fill="#A8D4F0" opacity="0.65" />
            <circle cx={cx - eyeSpacing - bodyR * 0.04} cy={eyeY + bodyR * 0.35} r={bodyR * 0.04} fill="#A8D4F0" opacity="0.45" />
            <circle cx={cx + eyeSpacing + bodyR * 0.04} cy={eyeY + bodyR * 0.35} r={bodyR * 0.04} fill="#A8D4F0" opacity="0.45" />
            <circle cx={cx - eyeSpacing - bodyR * 0.13} cy={eyeY + bodyR * 0.33} r={bodyR * 0.028} fill="#A8D4F0" opacity="0.3" />
            <circle cx={cx + eyeSpacing + bodyR * 0.13} cy={eyeY + bodyR * 0.33} r={bodyR * 0.028} fill="#A8D4F0" opacity="0.3" />
            {/* Wobble mouth */}
            <path d={`M ${cx - bodyR * 0.06} ${mouthY + 3} Q ${cx} ${mouthY + 0} ${cx + bodyR * 0.06} ${mouthY + 3}`}
              stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        );

      case "sleepy":
        return (
          <>
            {cheeks}
            {/* Closed relaxed eyes */}
            <path d={`M ${cx - eyeSpacing - bodyR * 0.06} ${eyeY} L ${cx - eyeSpacing + bodyR * 0.06} ${eyeY}`}
              stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={`M ${cx + eyeSpacing - bodyR * 0.06} ${eyeY} L ${cx + eyeSpacing + bodyR * 0.06} ${eyeY}`}
              stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Small O mouth */}
            <ellipse cx={cx} cy={mouthY + 2} rx={bodyR * 0.05} ry={bodyR * 0.06} fill="#2D2D3D" />
            {/* Black Z's - 3 sizes, all within visible area */}
            <text x={cx + bodyR * 0.32} y={cy + bodyR * 0.05}
              fill="#2D2D3D" fontSize={bodyR * 0.22} fontFamily="serif" fontWeight="900" fontStyle="italic" opacity="0.85">z</text>
            <text x={cx + bodyR * 0.45} y={cy - bodyR * 0.15}
              fill="#2D2D3D" fontSize={bodyR * 0.3} fontFamily="serif" fontWeight="900" fontStyle="italic" opacity="0.65">z</text>
            <text x={cx + bodyR * 0.55} y={cy - bodyR * 0.38}
              fill="#2D2D3D" fontSize={bodyR * 0.38} fontFamily="serif" fontWeight="900" fontStyle="italic" opacity="0.45">z</text>
          </>
        );

      case "wave":
        return (
          <>
            {cheeks}
            <circle cx={cx - eyeSpacing} cy={eyeY} r={bodyR * 0.06} fill="#2D2D3D" />
            <circle cx={cx + eyeSpacing} cy={eyeY} r={bodyR * 0.06} fill="#2D2D3D" />
            <circle cx={cx - eyeSpacing + bodyR * 0.02} cy={eyeY - bodyR * 0.02} r={bodyR * 0.02} fill="white" opacity="0.7" />
            <circle cx={cx + eyeSpacing + bodyR * 0.02} cy={eyeY - bodyR * 0.02} r={bodyR * 0.02} fill="white" opacity="0.7" />
            <path d={`M ${cx - bodyR * 0.1} ${mouthY} Q ${cx} ${mouthY + bodyR * 0.1} ${cx + bodyR * 0.1} ${mouthY}`}
              stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Motion lines */}
            <line x1={cx + bodyR + 16} y1={cy - bodyR * 0.55} x2={cx + bodyR + 22} y2={cy - bodyR * 0.6}
              stroke="white" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
            <line x1={cx + bodyR + 18} y1={cy - bodyR * 0.45} x2={cx + bodyR + 24} y2={cy - bodyR * 0.48}
              stroke="white" strokeWidth="1.2" opacity="0.3" strokeLinecap="round" />
            <line x1={cx + bodyR + 16} y1={cy - bodyR * 0.72} x2={cx + bodyR + 21} y2={cy - bodyR * 0.78}
              stroke="white" strokeWidth="1.0" opacity="0.3" strokeLinecap="round" />
          </>
        );

      case "love":
        return (
          <>
            {/* Extra pink cheeks */}
            <ellipse cx={cx - bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.13} ry={bodyR * 0.08} fill="#FFB4C8" opacity="0.5" />
            <ellipse cx={cx + bodyR * 0.38} cy={cy + bodyR * 0.1} rx={bodyR * 0.13} ry={bodyR * 0.08} fill="#FFB4C8" opacity="0.5" />
            {/* Happy squint eyes */}
            <path d={`M ${cx - eyeSpacing - bodyR * 0.06} ${eyeY + bodyR * 0.01} Q ${cx - eyeSpacing} ${eyeY - bodyR * 0.07} ${cx - eyeSpacing + bodyR * 0.06} ${eyeY + bodyR * 0.01}`}
              stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={`M ${cx + eyeSpacing - bodyR * 0.06} ${eyeY + bodyR * 0.01} Q ${cx + eyeSpacing} ${eyeY - bodyR * 0.07} ${cx + eyeSpacing + bodyR * 0.06} ${eyeY + bodyR * 0.01}`}
              stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Happy open mouth */}
            <path d={`M ${cx - bodyR * 0.12} ${mouthY - 2} Q ${cx} ${mouthY + bodyR * 0.15} ${cx + bodyR * 0.12} ${mouthY - 2}`}
              stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* BIG chiikawa-style floating hearts - 5 hearts, much bigger */}
            <g transform={`translate(${cx + bodyR * 0.65}, ${cy - bodyR * 0.5}) scale(${bodyR * 0.022})`}>
              <path d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
                fill="#F28BA8" stroke="#E06080" strokeWidth="0.4" opacity="0.9" />
            </g>
            <g transform={`translate(${cx - bodyR * 0.62}, ${cy - bodyR * 0.6}) scale(${bodyR * 0.019})`}>
              <path d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
                fill="#F5A0B8" stroke="#E06080" strokeWidth="0.4" opacity="0.8" />
            </g>
            <g transform={`translate(${cx + bodyR * 0.25}, ${cy - bodyR * 0.82}) scale(${bodyR * 0.016})`}>
              <path d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
                fill="#FFBDD0" stroke="#E06080" strokeWidth="0.4" opacity="0.65" />
            </g>
            <g transform={`translate(${cx - bodyR * 0.3}, ${cy - bodyR * 0.85}) scale(${bodyR * 0.013})`}>
              <path d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
                fill="#FFD0DE" stroke="#E06080" strokeWidth="0.4" opacity="0.5" />
            </g>
            <g transform={`translate(${cx + bodyR * 0.72}, ${cy - bodyR * 0.78}) scale(${bodyR * 0.011})`}>
              <path d="M 0 4 C -2 -1 -7 -3 -5 -6 C -3 -8 0 -6 0 -3 C 0 -6 3 -8 5 -6 C 7 -3 2 -1 0 4 Z"
                fill="#FFD0DE" stroke="#E06080" strokeWidth="0.4" opacity="0.4" />
            </g>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      {renderBody()}
      {renderFace()}
    </svg>
  );
};

const MoodCard = ({ mood, selected, onClick, colorScheme }) => (
  <button onClick={onClick} style={{
    display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
    padding: "10px 2px", borderRadius: 16, border: selected ? "2px solid #B794F4" : "1px solid rgba(255,255,255,0.1)",
    background: selected ? "rgba(183,148,244,0.15)" : "rgba(255,255,255,0.04)",
    cursor: "pointer", flex: 1, transition: "all 0.2s",
  }}>
    <CrescentYorumaru expression={mood.id} colorScheme={colorScheme} size={72} showGlow={false} />
    <div style={{ fontSize: 11, fontWeight: 700, color: selected ? mood.color || "#FFF3C4" : "#E2E8F0" }}>{mood.label}</div>
    <div style={{ fontSize: 8, color: "#A0AEC0" }}>{mood.labelEn}</div>
  </button>
);

export default function YorumaruV3() {
  const [selectedMood, setSelectedMood] = useState("great");
  const [selectedColor, setSelectedColor] = useState("moon");
  const [hatSize, setHatSize] = useState(1.0);
  const [armStyle, setArmStyle] = useState("line");
  const [feetSize, setFeetSize] = useState(1.0);

  const currentColor = colorSchemes.find(c => c.id === selectedColor) || colorSchemes[0];
  const allExpr = [...moodLevels, ...extraExpressions];
  const currentExpr = allExpr.find(e => e.id === selectedMood) || moodLevels[0];

  const messages = {
    great: "さいこーの日だったまる〜！✨\nよるまるもうれしいまるー！！",
    good: "にこにこの日だったまる〜😊\nいいことあったまる？",
    okay: "ぼちぼちだったまる〜🌙\nおつかれさま、ゆっくり休むまる",
    meh: "しょんぼりな日だったまる…\nあったかい飲み物でも飲むまる〜🍵",
    bad: "ぴえんまる…😢\nよしよし。ゆっくりでいいまる。\nよるまるがそばにいるまる🌿",
    sleepy: "おやすみまる〜🌙\nいい夢みるまる…",
    wave: "またあしたね〜まる！\nばいばーいまる👋🌟",
    love: "だいすきまる〜！！\nいつもありがとうまる💕",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${currentColor.bg1} 0%, ${currentColor.bg2} 100%)`,
      color: "#E2E8F0",
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
      padding: "20px 16px",
      transition: "background 0.5s",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, textAlign: "center", marginBottom: 2, color: "#FFF3C4" }}>
          🌙 よるまる v3
        </h1>
        <p style={{ textAlign: "center", fontSize: 11, color: "#A0AEC0", marginBottom: 16 }}>
          三日月帽子 × ちいかわ風 — 最終調整版
        </p>

        {/* Hero Preview */}
        <div style={{
          background: "rgba(255,255,255,0.05)", borderRadius: 24, padding: "24px 16px 16px",
          marginBottom: 20, textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {Array.from({ length: 20 }, (_, i) => (
              <circle key={i} cx={`${((i * 41 + 7) % 90) + 5}%`} cy={`${((i * 29 + 13) % 85) + 5}%`}
                r={i % 4 === 0 ? 1.5 : 0.8} fill="white" opacity={0.15 + (i % 5) * 0.06} />
            ))}
          </svg>
          <div style={{ position: "relative", zIndex: 1 }}>
            <CrescentYorumaru expression={selectedMood} colorScheme={selectedColor} size={190}
              hatSize={hatSize} armStyle={armStyle} feetSize={feetSize} />
            <div style={{
              background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: "10px 14px",
              margin: "8px auto 0", maxWidth: 280, position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -6, left: "50%",
                width: 12, height: 12, background: "rgba(255,255,255,0.1)",
                borderRadius: 2, transform: "translateX(-50%) rotate(45deg)",
              }} />
              <div style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line", color: "#FFF3C4" }}>
                {messages[selectedMood] || ""}
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: currentExpr.color || "#FFF3C4" }}>
              {currentExpr.label}
            </div>
          </div>
        </div>

        {/* 5 Mood Levels */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#B794F4" }}>🎭 気分の5段階</div>
          <div style={{ display: "flex", gap: 4 }}>
            {moodLevels.map(m => (
              <MoodCard key={m.id} mood={m} selected={selectedMood === m.id}
                onClick={() => setSelectedMood(m.id)} colorScheme={selectedColor} />
            ))}
          </div>
        </div>

        {/* Extra */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#B794F4" }}>✨ その他の表情</div>
          <div style={{ display: "flex", gap: 6 }}>
            {extraExpressions.map(e => (
              <button key={e.id} onClick={() => setSelectedMood(e.id)} style={{
                flex: 1, padding: "10px 4px", borderRadius: 14,
                border: selectedMood === e.id ? "2px solid #B794F4" : "1px solid rgba(255,255,255,0.1)",
                background: selectedMood === e.id ? "rgba(183,148,244,0.15)" : "rgba(255,255,255,0.04)",
                cursor: "pointer", textAlign: "center",
              }}>
                <CrescentYorumaru expression={e.id} colorScheme={selectedColor} size={70} showGlow={false} />
                <div style={{ fontSize: 10, fontWeight: 600, color: "#E2E8F0", marginTop: 2 }}>{e.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, color: "#B794F4" }}>🎨 カラー</div>
          <div style={{ display: "flex", gap: 6 }}>
            {colorSchemes.map(c => (
              <button key={c.id} onClick={() => setSelectedColor(c.id)} style={{
                flex: 1, padding: "10px", borderRadius: 12,
                border: selectedColor === c.id ? "2px solid #B794F4" : "1px solid #4A5568",
                background: selectedColor === c.id ? "rgba(183,148,244,0.15)" : "rgba(255,255,255,0.05)",
                color: "#E2E8F0", cursor: "pointer", textAlign: "center",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", background: c.body,
                  border: `2px solid ${c.outline}`, margin: "0 auto 4px",
                }} />
                <div style={{ fontSize: 11, fontWeight: 600 }}>{c.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Adjustments */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: "#B794F4" }}>🔧 ディテール調整</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span>三日月帽子のサイズ</span>
              <span style={{ color: "#B794F4" }}>{Math.round(hatSize * 100)}%</span>
            </div>
            <input type="range" min="0.6" max="1.4" step="0.1" value={hatSize}
              onChange={e => setHatSize(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#B794F4" }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
              <span>足のサイズ</span>
              <span style={{ color: "#B794F4" }}>{Math.round(feetSize * 100)}%</span>
            </div>
            <input type="range" min="0.6" max="1.4" step="0.1" value={feetSize}
              onChange={e => setFeetSize(parseFloat(e.target.value))} style={{ width: "100%", accentColor: "#B794F4" }} />
          </div>
          <div>
            <div style={{ fontSize: 11, marginBottom: 6 }}>手のスタイル</div>
            <div style={{ display: "flex", gap: 6 }}>
              {[{ id: "line", label: "線の手" }, { id: "stub", label: "丸い手" }].map(a => (
                <button key={a.id} onClick={() => setArmStyle(a.id)} style={{
                  flex: 1, padding: "8px", borderRadius: 10, fontSize: 11,
                  border: armStyle === a.id ? "2px solid #B794F4" : "1px solid #4A5568",
                  background: armStyle === a.id ? "rgba(183,148,244,0.15)" : "rgba(255,255,255,0.05)",
                  color: "#E2E8F0", cursor: "pointer",
                }}>{a.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* All moods overview */}
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10, color: "#A0AEC0" }}>📋 全表情一覧</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {allExpr.map(e => (
              <div key={e.id} onClick={() => setSelectedMood(e.id)} style={{
                background: selectedMood === e.id ? "rgba(183,148,244,0.12)" : "transparent",
                borderRadius: 12, padding: 6, textAlign: "center", cursor: "pointer",
                border: selectedMood === e.id ? "1px solid rgba(183,148,244,0.3)" : "1px solid transparent",
              }}>
                <CrescentYorumaru expression={e.id} colorScheme={selectedColor} size={68}
                  hatSize={hatSize} armStyle={armStyle} feetSize={feetSize} showGlow={false} />
                <div style={{ fontSize: 9, color: "#A0AEC0" }}>{e.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
