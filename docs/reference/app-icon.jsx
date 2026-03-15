import { useState } from "react";

const C = {
  body: "#FFF8DC", outline: "#D4A843", cheek: "#FFD1A9", accent: "#FFF3C4",
  bg1: "#0f0c29", bg2: "#1a1a3e", purple: "#B794F4",
};

// ---- ICON VARIATIONS ----

const IconFaceOnly = ({ size, bg }) => {
  const s = size, cx = s/2, cy = s*0.48, r = s*0.32;
  const ey = cy-r*0.06, es = r*0.2, my = cy+r*0.24;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <rect width={s} height={s} rx={s*0.22} fill={bg} />
      {/* Glow */}
      <circle cx={cx} cy={cy} r={r+s*0.05} fill={C.body} opacity="0.1"/>
      {/* Body */}
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth={s*0.015}/>
      {/* Hat */}
      <g transform={`translate(${cx+r*0.32},${cy-r-r*0.16})`}>
        <circle r={r*0.32} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
        <circle cx={r*0.13} cy={-r*0.08} r={r*0.22} fill={bg}/>
        <circle cx={-r*0.12} cy={-r*0.15} r={r*0.03} fill={C.accent} opacity="0.9"/>
      </g>
      {/* Arms */}
      <path d={`M${cx-r+s*0.02} ${cy+r*0.15}Q${cx-r-s*0.04} ${cy+r*0.48} ${cx-r+s*0.02} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+r-s*0.02} ${cy+r*0.15}Q${cx+r+s*0.04} ${cy+r*0.48} ${cx+r-s*0.02} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      {/* Feet */}
      <ellipse cx={cx-r*0.35} cy={cy+r+s*0.02} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
      <ellipse cx={cx+r*0.35} cy={cy+r+s*0.02} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
      {/* Cheeks */}
      <ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      <ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      {/* Eyes - happy squint */}
      <path d={`M${cx-es-r*0.06} ${ey+r*0.02}Q${cx-es} ${ey-r*0.06} ${cx-es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+es-r*0.06} ${ey+r*0.02}Q${cx+es} ${ey-r*0.06} ${cx+es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      {/* Smile */}
      <path d={`M${cx-r*0.12} ${my-1}Q${cx} ${my+r*0.14} ${cx+r*0.12} ${my-1}`} stroke="#2D2D3D" strokeWidth={s*0.014} fill="none" strokeLinecap="round"/>
    </svg>
  );
};

const IconWithStars = ({ size, bg }) => {
  const s = size, cx = s/2, cy = s*0.5, r = s*0.28;
  const ey = cy-r*0.06, es = r*0.2, my = cy+r*0.24;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <rect width={s} height={s} rx={s*0.22} fill={bg}/>
      {/* Stars */}
      {[[0.15,0.15],[0.82,0.12],[0.12,0.75],[0.88,0.8],[0.5,0.08],[0.25,0.42],[0.78,0.45]].map(([x,y],i)=>(
        <circle key={i} cx={s*x} cy={s*y} r={i%3===0?s*0.012:s*0.007} fill="white" opacity={0.3+i*0.08}/>
      ))}
      {/* Glow */}
      <circle cx={cx} cy={cy} r={r+s*0.06} fill={C.body} opacity="0.08"/>
      {/* Body */}
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth={s*0.015}/>
      {/* Hat */}
      <g transform={`translate(${cx+r*0.32},${cy-r-r*0.16})`}>
        <circle r={r*0.32} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
        <circle cx={r*0.13} cy={-r*0.08} r={r*0.22} fill={bg}/>
        <circle cx={-r*0.12} cy={-r*0.15} r={r*0.03} fill={C.accent} opacity="0.9"/>
      </g>
      {/* Arms */}
      <path d={`M${cx-r+2} ${cy+r*0.15}Q${cx-r-s*0.04} ${cy+r*0.48} ${cx-r+2} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+r-2} ${cy+r*0.15}Q${cx+r+s*0.04} ${cy+r*0.48} ${cx+r-2} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      {/* Feet */}
      <ellipse cx={cx-r*0.35} cy={cy+r+s*0.02} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
      <ellipse cx={cx+r*0.35} cy={cy+r+s*0.02} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
      {/* Face */}
      <ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      <ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      <path d={`M${cx-es-r*0.06} ${ey+r*0.02}Q${cx-es} ${ey-r*0.06} ${cx-es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+es-r*0.06} ${ey+r*0.02}Q${cx+es} ${ey-r*0.06} ${cx+es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      <path d={`M${cx-r*0.12} ${my-1}Q${cx} ${my+r*0.14} ${cx+r*0.12} ${my-1}`} stroke="#2D2D3D" strokeWidth={s*0.014} fill="none" strokeLinecap="round"/>
    </svg>
  );
};

const IconCloseUp = ({ size, bg }) => {
  const s = size, cx = s/2, cy = s*0.52, r = s*0.38;
  const ey = cy-r*0.06, es = r*0.2, my = cy+r*0.24;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <rect width={s} height={s} rx={s*0.22} fill={bg}/>
      {/* Glow */}
      <circle cx={cx} cy={cy} r={r+s*0.04} fill={C.body} opacity="0.1"/>
      {/* Body - cropped at bottom */}
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth={s*0.018}/>
      {/* Hat */}
      <g transform={`translate(${cx+r*0.32},${cy-r-r*0.14})`}>
        <circle r={r*0.3} fill={C.body} stroke={C.outline} strokeWidth={s*0.015}/>
        <circle cx={r*0.12} cy={-r*0.07} r={r*0.2} fill={bg}/>
        <circle cx={-r*0.1} cy={-r*0.13} r={r*0.03} fill={C.accent} opacity="0.9"/>
      </g>
      {/* Cheeks */}
      <ellipse cx={cx-r*0.36} cy={cy+r*0.1} rx={r*0.12} ry={r*0.08} fill={C.cheek} opacity="0.55"/>
      <ellipse cx={cx+r*0.36} cy={cy+r*0.1} rx={r*0.12} ry={r*0.08} fill={C.cheek} opacity="0.55"/>
      {/* Eyes */}
      <path d={`M${cx-es-r*0.07} ${ey+r*0.02}Q${cx-es} ${ey-r*0.07} ${cx-es+r*0.07} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.02} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+es-r*0.07} ${ey+r*0.02}Q${cx+es} ${ey-r*0.07} ${cx+es+r*0.07} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.02} fill="none" strokeLinecap="round"/>
      {/* Smile */}
      <path d={`M${cx-r*0.12} ${my}Q${cx} ${my+r*0.14} ${cx+r*0.12} ${my}`} stroke="#2D2D3D" strokeWidth={s*0.016} fill="none" strokeLinecap="round"/>
    </svg>
  );
};

const IconWithFlower = ({ size, bg }) => {
  const s = size, cx = s/2, cy = s*0.46, r = s*0.26;
  const ey = cy-r*0.06, es = r*0.2, my = cy+r*0.24;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <rect width={s} height={s} rx={s*0.22} fill={bg}/>
      {/* Stars */}
      {[[0.14,0.12],[0.86,0.1],[0.9,0.7]].map(([x,y],i)=>(
        <circle key={i} cx={s*x} cy={s*y} r={s*0.008} fill="white" opacity={0.25+i*0.1}/>
      ))}
      {/* Flower on right */}
      <g transform={`translate(${s*0.78},${s*0.72})`}>
        <line x1="0" y1={s*0.08} x2="0" y2={-s*0.02} stroke="#6B8E5A" strokeWidth={s*0.015} strokeLinecap="round"/>
        <ellipse cx={-s*0.03} cy={s*0.02} rx={s*0.025} ry={s*0.04} fill="#8FBC6A" transform="rotate(-25)"/>
        {[0,60,120,180,240,300].map((a,i)=><ellipse key={i} cx="0" cy={-s*0.05} rx={s*0.025} ry={s*0.045} fill="#FFF3C4" transform={`rotate(${a} 0 ${-s*0.01})`} opacity="0.85"/>)}
        <circle cx="0" cy={-s*0.01} r={s*0.02} fill="#F6E05E"/>
      </g>
      {/* Small sprout on left */}
      <g transform={`translate(${s*0.18},${s*0.8})`}>
        <line x1="0" y1={s*0.04} x2="0" y2={-s*0.01} stroke="#6B8E5A" strokeWidth={s*0.012} strokeLinecap="round"/>
        <ellipse cx={-s*0.02} cy={0} rx={s*0.02} ry={s*0.03} fill="#8FBC6A" transform="rotate(-20)"/>
        <ellipse cx={s*0.02} cy={s*0.005} rx={s*0.018} ry={s*0.025} fill="#8FBC6A" transform="rotate(20)"/>
      </g>
      {/* Body */}
      <circle cx={cx} cy={cy} r={r+s*0.05} fill={C.body} opacity="0.08"/>
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth={s*0.015}/>
      {/* Hat */}
      <g transform={`translate(${cx+r*0.32},${cy-r-r*0.16})`}>
        <circle r={r*0.32} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
        <circle cx={r*0.13} cy={-r*0.08} r={r*0.22} fill={bg}/>
        <circle cx={-r*0.12} cy={-r*0.15} r={r*0.03} fill={C.accent} opacity="0.9"/>
      </g>
      {/* Arms */}
      <path d={`M${cx-r+2} ${cy+r*0.15}Q${cx-r-s*0.035} ${cy+r*0.48} ${cx-r+2} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+r-2} ${cy+r*0.15}Q${cx+r+s*0.035} ${cy+r*0.48} ${cx+r-2} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      {/* Feet */}
      <ellipse cx={cx-r*0.35} cy={cy+r+s*0.015} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.012}/>
      <ellipse cx={cx+r*0.35} cy={cy+r+s*0.015} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.012}/>
      {/* Face */}
      <ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      <ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      <path d={`M${cx-es-r*0.06} ${ey+r*0.02}Q${cx-es} ${ey-r*0.06} ${cx-es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+es-r*0.06} ${ey+r*0.02}Q${cx+es} ${ey-r*0.06} ${cx+es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      <path d={`M${cx-r*0.12} ${my-1}Q${cx} ${my+r*0.14} ${cx+r*0.12} ${my-1}`} stroke="#2D2D3D" strokeWidth={s*0.014} fill="none" strokeLinecap="round"/>
    </svg>
  );
};

const IconSymbol = ({ size, bg }) => {
  const s = size, cx = s/2, cy = s/2;
  const r = s * 0.28;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <rect width={s} height={s} rx={s*0.22} fill={bg}/>
      {/* Large crescent moon */}
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth={s*0.015}/>
      <circle cx={cx+r*0.4} cy={cy-r*0.2} r={r*0.7} fill={bg}/>
      {/* Star */}
      <circle cx={cx+r*0.55} cy={cy-r*0.65} r={s*0.02} fill={C.accent} opacity="0.9"/>
      <circle cx={cx+r*0.8} cy={cy-r*0.3} r={s*0.012} fill="white" opacity="0.5"/>
      {/* Small flower */}
      <g transform={`translate(${cx-r*0.4},${cy+r*0.6})`}>
        {[0,72,144,216,288].map((a,i)=><ellipse key={i} cx="0" cy={-s*0.04} rx={s*0.02} ry={s*0.04} fill={C.accent} transform={`rotate(${a})`} opacity="0.7"/>)}
        <circle r={s*0.015} fill="#F6E05E"/>
      </g>
    </svg>
  );
};

const IconGradientBg = ({ size, bg }) => {
  const s = size, cx = s/2, cy = s*0.48, r = s*0.3;
  const ey = cy-r*0.06, es = r*0.2, my = cy+r*0.24;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <defs>
        <linearGradient id="iconGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0f3a"/>
          <stop offset="100%" stopColor="#2d1b69"/>
        </linearGradient>
      </defs>
      <rect width={s} height={s} rx={s*0.22} fill="url(#iconGrad)"/>
      {/* Stars */}
      {[[0.15,0.13],[0.85,0.1],[0.1,0.8],[0.88,0.75],[0.5,0.06]].map(([x,y],i)=>(
        <circle key={i} cx={s*x} cy={s*y} r={i===0?s*0.01:s*0.006} fill="white" opacity={0.2+i*0.06}/>
      ))}
      {/* Glow */}
      <circle cx={cx} cy={cy} r={r+s*0.06} fill={C.body} opacity="0.1"/>
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth={s*0.015}/>
      <g transform={`translate(${cx+r*0.32},${cy-r-r*0.16})`}>
        <circle r={r*0.32} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
        <circle cx={r*0.13} cy={-r*0.08} r={r*0.22} fill="#1a0f3a"/>
        <circle cx={-r*0.12} cy={-r*0.15} r={r*0.03} fill={C.accent} opacity="0.9"/>
      </g>
      <path d={`M${cx-r+2} ${cy+r*0.15}Q${cx-r-s*0.04} ${cy+r*0.48} ${cx-r+2} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+r-2} ${cy+r*0.15}Q${cx+r+s*0.04} ${cy+r*0.48} ${cx+r-2} ${cy+r*0.58}`} stroke={C.outline} strokeWidth={s*0.015} fill="none" strokeLinecap="round"/>
      <ellipse cx={cx-r*0.35} cy={cy+r+s*0.02} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
      <ellipse cx={cx+r*0.35} cy={cy+r+s*0.02} rx={r*0.22} ry={r*0.12} fill={C.body} stroke={C.outline} strokeWidth={s*0.013}/>
      <ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      <ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.5"/>
      <path d={`M${cx-es-r*0.06} ${ey+r*0.02}Q${cx-es} ${ey-r*0.06} ${cx-es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      <path d={`M${cx+es-r*0.06} ${ey+r*0.02}Q${cx+es} ${ey-r*0.06} ${cx+es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth={s*0.018} fill="none" strokeLinecap="round"/>
      <path d={`M${cx-r*0.12} ${my-1}Q${cx} ${my+r*0.14} ${cx+r*0.12} ${my-1}`} stroke="#2D2D3D" strokeWidth={s*0.014} fill="none" strokeLinecap="round"/>
    </svg>
  );
};

const designs = [
  { id: "full", label: "全身", desc: "よるまる全身", Component: IconFaceOnly },
  { id: "stars", label: "全身＋星", desc: "星がキラキラ", Component: IconWithStars },
  { id: "close", label: "アップ", desc: "顔のクローズアップ", Component: IconCloseUp },
  { id: "flower", label: "花つき", desc: "よるまる＋お花", Component: IconWithFlower },
  { id: "symbol", label: "シンボル", desc: "三日月＋花", Component: IconSymbol },
  { id: "gradient", label: "紫グラデ", desc: "紫の夜空背景", Component: IconGradientBg },
];

const bgColors = [
  { id: "navy", label: "ネイビー", color: "#0f0c29" },
  { id: "deepblue", label: "ディープブルー", color: "#141432" },
  { id: "darkpurple", label: "ダークパープル", color: "#1a0f3a" },
  { id: "midnight", label: "ミッドナイト", color: "#0d1117" },
  { id: "indigo", label: "インディゴ", color: "#1a1a4e" },
];

export default function AppIconExplorer() {
  const [selectedDesign, setSelectedDesign] = useState("stars");
  const [selectedBg, setSelectedBg] = useState("navy");
  const [favorite, setFavorite] = useState(null);

  const bg = bgColors.find(b => b.id === selectedBg)?.color || "#0f0c29";
  const SelectedIcon = designs.find(d => d.id === selectedDesign)?.Component || IconFaceOnly;

  return (
    <div style={{
      minHeight: "100vh", background: "#111", padding: "24px 16px",
      fontFamily: "'Segoe UI',-apple-system,sans-serif", color: "#E2E8F0",
    }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, textAlign: "center", color: C.accent, marginBottom: 4 }}>
          🌙 Moonbloom アプリアイコン
        </h1>
        <p style={{ textAlign: "center", fontSize: 11, color: "#A0AEC0", marginBottom: 20 }}>
          デザイン × 背景色を選んで比較
        </p>

        {/* Large preview */}
        <div style={{
          background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: 24,
          marginBottom: 20, textAlign: "center",
        }}>
          <div style={{ marginBottom: 12 }}>
            <SelectedIcon size={160} bg={bg} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.accent }}>
            {designs.find(d => d.id === selectedDesign)?.label}
          </div>
          <div style={{ fontSize: 11, color: "#A0AEC0", marginTop: 2 }}>
            {designs.find(d => d.id === selectedDesign)?.desc} × {bgColors.find(b => b.id === selectedBg)?.label}
          </div>

          {/* Size previews */}
          <div style={{ marginTop: 16, fontSize: 10, color: "#A0AEC0", marginBottom: 8 }}>
            実際のサイズ感
          </div>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "flex-end" }}>
            <div style={{ textAlign: "center" }}>
              <SelectedIcon size={60} bg={bg} />
              <div style={{ fontSize: 8, color: "#A0AEC0", marginTop: 4 }}>ホーム画面</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <SelectedIcon size={40} bg={bg} />
              <div style={{ fontSize: 8, color: "#A0AEC0", marginTop: 4 }}>設定</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <SelectedIcon size={28} bg={bg} />
              <div style={{ fontSize: 8, color: "#A0AEC0", marginTop: 4 }}>通知</div>
            </div>
          </div>

          {/* Mock home screen */}
          <div style={{ marginTop: 16, fontSize: 10, color: "#A0AEC0", marginBottom: 8 }}>
            📱 ホーム画面イメージ
          </div>
          <div style={{
            background: "linear-gradient(180deg, #1a1a2e 0%, #2d2d4e 100%)",
            borderRadius: 16, padding: "16px 12px", display: "inline-block",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {/* Fake other app icons */}
              {[
                { color: "#3B82F6", label: "メール" },
                { color: "#10B981", label: "電話" },
                { color: "#8B5CF6", label: "写真" },
                { custom: true, label: "Moonbloom" },
                { color: "#EF4444", label: "音楽" },
                { color: "#F59E0B", label: "メモ" },
                { color: "#6366F1", label: "天気" },
                { color: "#EC4899", label: "カメラ" },
              ].map((app, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  {app.custom ? (
                    <SelectedIcon size={48} bg={bg} />
                  ) : (
                    <div style={{
                      width: 48, height: 48, borderRadius: 11, background: app.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20,
                    }}>
                      {["📧","📞","🖼","","🎵","📝","🌤","📸"][i]}
                    </div>
                  )}
                  <div style={{ fontSize: 7, color: "#ccc", marginTop: 3 }}>{app.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design Selection */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.purple, marginBottom: 8 }}>🎨 デザイン</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {designs.map(d => (
              <button key={d.id} onClick={() => setSelectedDesign(d.id)} style={{
                padding: "8px 4px", borderRadius: 14, cursor: "pointer", textAlign: "center",
                border: selectedDesign === d.id ? "2px solid " + C.purple : "1px solid rgba(255,255,255,0.08)",
                background: selectedDesign === d.id ? "rgba(183,148,244,0.15)" : "rgba(255,255,255,0.04)",
              }}>
                <d.Component size={52} bg={bg} />
                <div style={{ fontSize: 10, fontWeight: 600, color: "#E2E8F0", marginTop: 4 }}>{d.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.purple, marginBottom: 8 }}>🌙 背景色</div>
          <div style={{ display: "flex", gap: 6 }}>
            {bgColors.map(b => (
              <button key={b.id} onClick={() => setSelectedBg(b.id)} style={{
                flex: 1, padding: "10px 4px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                border: selectedBg === b.id ? "2px solid " + C.purple : "1px solid rgba(255,255,255,0.08)",
                background: selectedBg === b.id ? "rgba(183,148,244,0.15)" : "rgba(255,255,255,0.04)",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7, background: b.color,
                  border: "1px solid rgba(255,255,255,0.15)", margin: "0 auto 4px",
                }} />
                <div style={{ fontSize: 9, color: "#A0AEC0" }}>{b.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* All combos grid */}
        <div style={{
          background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 14,
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#A0AEC0", marginBottom: 10 }}>📋 全デザイン一覧（現在の背景色）</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {designs.map(d => (
              <div key={d.id} onClick={() => setSelectedDesign(d.id)} style={{
                textAlign: "center", cursor: "pointer", padding: 6, borderRadius: 12,
                background: selectedDesign === d.id ? "rgba(183,148,244,0.1)" : "transparent",
                border: selectedDesign === d.id ? "1px solid rgba(183,148,244,0.2)" : "1px solid transparent",
              }}>
                <d.Component size={72} bg={bg} />
                <div style={{ fontSize: 9, color: "#A0AEC0", marginTop: 2 }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
