import { useState, useEffect, useRef } from "react";

const C = {
  body: "#FFF8DC", outline: "#D4A843", cheek: "#FFD1A9", accent: "#FFF3C4",
  bg1: "#0f0c29", bg2: "#1a1a3e", card: "rgba(255,255,255,0.06)",
  text1: "#FFF3C4", text2: "#A0AEC0", purple: "#B794F4", mehCheek: "#B0AABE",
  pink: "#FFB4C8", gold: "#F6E05E",
};

const moods = [
  { id: "great", label: "さいこー！", en: "Amazing!", color: "#FFD700", emoji: "✨" },
  { id: "good", label: "にこにこ", en: "Happy", color: "#90EE90", emoji: "😊" },
  { id: "okay", label: "ぼちぼち", en: "So-so", color: "#87CEEB", emoji: "🌙" },
  { id: "meh", label: "しょんぼり", en: "Down", color: "#DDA0DD", emoji: "🍵" },
  { id: "bad", label: "ぴえん", en: "Sad", color: "#B0C4DE", emoji: "🌿" },
];

const reactions = {
  great: "さいこーの日だったまる〜！✨\nよるまるもうれしいまるー！！",
  good: "にこにこの日だったまる〜😊\nいいことあったまる？",
  okay: "ぼちぼちだったまる〜🌙\nおつかれさま、ゆっくり休むまる",
  meh: "しょんぼりな日だったまる…\nあったかい飲み物でも飲むまる〜🍵",
  bad: "ぴえんまる…😢\nよしよし。ゆっくりでいいまる。\nよるまるがそばにいるまる🌿",
};

// ---- YORUMARU ----
const YorumaruMini = ({ expression, size = 48 }) => {
  const s = size, cx = s/2, cy = s*0.45, r = s*0.3;
  const ey = cy-r*0.06, es = r*0.2, my = cy+r*0.24;
  const ch = (c=C.cheek,o=0.45) => <><ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.1} ry={r*0.06} fill={c} opacity={o}/><ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.1} ry={r*0.06} fill={c} opacity={o}/></>;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth="1.5"/>
      <g transform={`translate(${cx+r*0.32},${cy-r*1.18}) scale(0.9)`}><circle r={r*0.3} fill={C.body} stroke={C.outline} strokeWidth="1.3"/><circle cx={r*0.12} cy={-r*0.07} r={r*0.2} fill={C.bg1}/></g>
      <ellipse cx={cx-r*0.35} cy={cy+r+3} rx={r*0.2} ry={r*0.1} fill={C.body} stroke={C.outline} strokeWidth="1.3"/>
      <ellipse cx={cx+r*0.35} cy={cy+r+3} rx={r*0.2} ry={r*0.1} fill={C.body} stroke={C.outline} strokeWidth="1.3"/>
      {expression==="great"&&<>{ch(C.cheek,0.6)}<path d={`M${cx-es-r*0.08} ${ey+r*0.02}Q${cx-es} ${ey-r*0.1} ${cx-es+r*0.08} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round"/><path d={`M${cx+es-r*0.08} ${ey+r*0.02}Q${cx+es} ${ey-r*0.1} ${cx+es+r*0.08} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round"/><ellipse cx={cx} cy={my+r*0.04} rx={r*0.12} ry={r*0.09} fill="#2D2D3D"/></>}
      {expression==="good"&&<>{ch()}<path d={`M${cx-es-r*0.06} ${ey+r*0.02}Q${cx-es} ${ey-r*0.06} ${cx-es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="1.8" fill="none" strokeLinecap="round"/><path d={`M${cx+es-r*0.06} ${ey+r*0.02}Q${cx+es} ${ey-r*0.06} ${cx+es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="1.8" fill="none" strokeLinecap="round"/><path d={`M${cx-r*0.12} ${my-1}Q${cx} ${my+r*0.14} ${cx+r*0.12} ${my-1}`} stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round"/></>}
      {expression==="okay"&&<>{ch()}<circle cx={cx-es} cy={ey} r={r*0.05} fill="#2D2D3D"/><circle cx={cx+es} cy={ey} r={r*0.05} fill="#2D2D3D"/><path d={`M${cx-r*0.07} ${my+1}Q${cx} ${my+r*0.07} ${cx+r*0.07} ${my+1}`} stroke="#2D2D3D" strokeWidth="1.3" fill="none" strokeLinecap="round"/></>}
      {expression==="meh"&&<>{ch(C.mehCheek,0.35)}<circle cx={cx-es} cy={ey} r={r*0.05} fill="#2D2D3D"/><circle cx={cx+es} cy={ey} r={r*0.05} fill="#2D2D3D"/><path d={`M${cx-es+r*0.05} ${ey-r*0.14}L${cx-es-r*0.07} ${ey-r*0.09}`} stroke="#2D2D3D" strokeWidth="1.2" fill="none" strokeLinecap="round"/><path d={`M${cx+es-r*0.05} ${ey-r*0.14}L${cx+es+r*0.07} ${ey-r*0.09}`} stroke="#2D2D3D" strokeWidth="1.2" fill="none" strokeLinecap="round"/><path d={`M${cx-r*0.06} ${my+1}Q${cx} ${my+r*0.05} ${cx+r*0.06} ${my+1}`} stroke="#2D2D3D" strokeWidth="1.3" fill="none" strokeLinecap="round"/></>}
      {expression==="bad"&&<><circle cx={cx-es} cy={ey} r={r*0.06} fill="#2D2D3D"/><circle cx={cx+es} cy={ey} r={r*0.06} fill="#2D2D3D"/><circle cx={cx-es+r*0.02} cy={ey-r*0.025} r={r*0.022} fill="white" opacity="0.8"/><circle cx={cx+es+r*0.02} cy={ey-r*0.025} r={r*0.022} fill="white" opacity="0.8"/><circle cx={cx-es-r*0.07} cy={ey+r*0.18} r={r*0.05} fill="#A8D4F0" opacity="0.6"/><circle cx={cx+es+r*0.07} cy={ey+r*0.18} r={r*0.05} fill="#A8D4F0" opacity="0.6"/><path d={`M${cx-r*0.06} ${my+3}Q${cx} ${my} ${cx+r*0.06} ${my+3}`} stroke="#2D2D3D" strokeWidth="1.3" fill="none" strokeLinecap="round"/></>}
    </svg>
  );
};

const YorumaruBig = ({ expression, size = 140 }) => {
  const s=size,cx=s/2,cy=s*0.45,r=s*0.27,ey=cy-r*0.06,es=r*0.2,my=cy+r*0.24;
  const isGreat = expression==="great";
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <circle cx={cx} cy={cy} r={r+s*0.06} fill={C.body} opacity="0.12"/>
      <circle cx={cx} cy={cy} r={r} fill={C.body} stroke={C.outline} strokeWidth="2"/>
      <g transform={`translate(${cx+r*0.32},${cy-r-r*0.18})`}><circle r={r*0.32} fill={C.body} stroke={C.outline} strokeWidth="1.8"/><circle cx={r*0.13} cy={-r*0.08} r={r*0.22} fill={C.bg1}/><circle cx={-r*0.12} cy={-r*0.15} r={r*0.03} fill={C.accent} opacity="0.8"/></g>
      {isGreat?<><path d={`M${cx-r+2} ${cy-r*0.05}Q${cx-r-16} ${cy-r*0.4} ${cx-r-6} ${cy-r*0.7}`} stroke={C.outline} strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx={cx-r-6} cy={cy-r*0.72} r={r*0.08} fill={C.body} stroke={C.outline} strokeWidth="1.5"/><path d={`M${cx+r-2} ${cy-r*0.05}Q${cx+r+16} ${cy-r*0.4} ${cx+r+6} ${cy-r*0.7}`} stroke={C.outline} strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx={cx+r+6} cy={cy-r*0.72} r={r*0.08} fill={C.body} stroke={C.outline} strokeWidth="1.5"/></>:<><path d={`M${cx-r+4} ${cy+r*0.15}Q${cx-r-12} ${cy+r*0.48} ${cx-r+3} ${cy+r*0.58}`} stroke={C.outline} strokeWidth="2" fill="none" strokeLinecap="round"/><path d={`M${cx+r-4} ${cy+r*0.15}Q${cx+r+12} ${cy+r*0.48} ${cx+r-3} ${cy+r*0.58}`} stroke={C.outline} strokeWidth="2" fill="none" strokeLinecap="round"/></>}
      <ellipse cx={cx-r*0.35} cy={cy+r+4} rx={r*0.22} ry={r*0.13} fill={C.body} stroke={C.outline} strokeWidth="1.8"/>
      <ellipse cx={cx+r*0.35} cy={cy+r+4} rx={r*0.22} ry={r*0.13} fill={C.body} stroke={C.outline} strokeWidth="1.8"/>
      {expression==="great"&&<><ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.14} ry={r*0.09} fill={C.cheek} opacity="0.6"/><ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.14} ry={r*0.09} fill={C.cheek} opacity="0.6"/><path d={`M${cx-es-r*0.08} ${ey+r*0.02}Q${cx-es} ${ey-r*0.1} ${cx-es+r*0.08} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d={`M${cx+es-r*0.08} ${ey+r*0.02}Q${cx+es} ${ey-r*0.1} ${cx+es+r*0.08} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="2.5" fill="none" strokeLinecap="round"/><ellipse cx={cx} cy={my+r*0.04} rx={r*0.14} ry={r*0.11} fill="#2D2D3D"/><ellipse cx={cx} cy={my+r*0.1} rx={r*0.08} ry={r*0.045} fill="#E88A98" opacity="0.6"/><g transform={`translate(${cx+r*0.65},${cy-r*0.45})`}><line x1="0" y1="-6" x2="0" y2="6" stroke={C.accent} strokeWidth="1.5" opacity="0.9"/><line x1="-6" y1="0" x2="6" y2="0" stroke={C.accent} strokeWidth="1.5" opacity="0.9"/></g></>}
      {expression==="good"&&<><ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.45"/><ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.45"/><path d={`M${cx-es-r*0.06} ${ey+r*0.02}Q${cx-es} ${ey-r*0.06} ${cx-es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round"/><path d={`M${cx+es-r*0.06} ${ey+r*0.02}Q${cx+es} ${ey-r*0.06} ${cx+es+r*0.06} ${ey+r*0.02}`} stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round"/><path d={`M${cx-r*0.12} ${my-1}Q${cx} ${my+r*0.14} ${cx+r*0.12} ${my-1}`} stroke="#2D2D3D" strokeWidth="1.8" fill="none" strokeLinecap="round"/></>}
      {expression==="okay"&&<><ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.45"/><ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.45"/><circle cx={cx-es} cy={ey} r={r*0.055} fill="#2D2D3D"/><circle cx={cx+es} cy={ey} r={r*0.055} fill="#2D2D3D"/><path d={`M${cx-r*0.07} ${my+1}Q${cx} ${my+r*0.07} ${cx+r*0.07} ${my+1}`} stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round"/></>}
      {expression==="meh"&&<><ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.1} ry={r*0.06} fill={C.mehCheek} opacity="0.35"/><ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.1} ry={r*0.06} fill={C.mehCheek} opacity="0.35"/><circle cx={cx-es} cy={ey} r={r*0.055} fill="#2D2D3D"/><circle cx={cx+es} cy={ey} r={r*0.055} fill="#2D2D3D"/><path d={`M${cx-es+r*0.05} ${ey-r*0.14}L${cx-es-r*0.07} ${ey-r*0.09}`} stroke="#2D2D3D" strokeWidth="1.3" fill="none" strokeLinecap="round"/><path d={`M${cx+es-r*0.05} ${ey-r*0.14}L${cx+es+r*0.07} ${ey-r*0.09}`} stroke="#2D2D3D" strokeWidth="1.3" fill="none" strokeLinecap="round"/><path d={`M${cx-r*0.07} ${my+1}Q${cx} ${my+r*0.06} ${cx+r*0.07} ${my+1}`} stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round"/></>}
      {expression==="bad"&&<><ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.1} ry={r*0.06} fill="#AABBDD" opacity="0.25"/><ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.1} ry={r*0.06} fill="#AABBDD" opacity="0.25"/><circle cx={cx-es} cy={ey} r={r*0.07} fill="#2D2D3D"/><circle cx={cx+es} cy={ey} r={r*0.07} fill="#2D2D3D"/><circle cx={cx-es+r*0.025} cy={ey-r*0.03} r={r*0.028} fill="white" opacity="0.9"/><circle cx={cx+es+r*0.025} cy={ey-r*0.03} r={r*0.028} fill="white" opacity="0.9"/><circle cx={cx-es-r*0.08} cy={ey+r*0.2} r={r*0.06} fill="#A8D4F0" opacity="0.65"/><circle cx={cx+es+r*0.08} cy={ey+r*0.2} r={r*0.06} fill="#A8D4F0" opacity="0.65"/><circle cx={cx-es-r*0.04} cy={ey+r*0.35} r={r*0.04} fill="#A8D4F0" opacity="0.45"/><circle cx={cx+es+r*0.04} cy={ey+r*0.35} r={r*0.04} fill="#A8D4F0" opacity="0.45"/><path d={`M${cx-r*0.06} ${my+3}Q${cx} ${my} ${cx+r*0.06} ${my+3}`} stroke="#2D2D3D" strokeWidth="1.5" fill="none" strokeLinecap="round"/></>}
      {expression==="sleepy"&&<><ellipse cx={cx-r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.45"/><ellipse cx={cx+r*0.38} cy={cy+r*0.1} rx={r*0.11} ry={r*0.07} fill={C.cheek} opacity="0.45"/><path d={`M${cx-es-r*0.06} ${ey}L${cx-es+r*0.06} ${ey}`} stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round"/><path d={`M${cx+es-r*0.06} ${ey}L${cx+es+r*0.06} ${ey}`} stroke="#2D2D3D" strokeWidth="2" fill="none" strokeLinecap="round"/><ellipse cx={cx} cy={my+2} rx={r*0.05} ry={r*0.06} fill="#2D2D3D"/><text x={cx+r*0.32} y={cy+r*0.05} fill="#2D2D3D" fontSize={r*0.22} fontFamily="serif" fontWeight="900" fontStyle="italic" opacity="0.8">z</text><text x={cx+r*0.45} y={cy-r*0.15} fill="#2D2D3D" fontSize={r*0.3} fontFamily="serif" fontWeight="900" fontStyle="italic" opacity="0.6">z</text><text x={cx+r*0.55} y={cy-r*0.38} fill="#2D2D3D" fontSize={r*0.38} fontFamily="serif" fontWeight="900" fontStyle="italic" opacity="0.4">z</text></>}
    </svg>
  );
};

// ---- ANIMATED FLOWER ----
const FlowerAnimated = ({ stage, type = "moonflower", size = 48, animating = false }) => {
  const [anim, setAnim] = useState(0);
  useEffect(() => {
    if (!animating) { setAnim(0); return; }
    const id = setInterval(() => setAnim(p => (p + 1) % 360), 30);
    return () => clearInterval(id);
  }, [animating]);

  const cols = { moonflower:{p:"#FFF3C4",c:"#F6E05E"}, starbell:{p:"#D8C4F0",c:"#B794F4"}, nightrose:{p:"#FFB4C8",c:"#E06080"} };
  const cl = cols[type]||cols.moonflower;
  const cx = size/2;
  const scale = animating ? 1 + Math.sin(anim * Math.PI/180) * 0.08 : 1;
  const glow = animating ? 0.3 + Math.sin(anim * Math.PI/90) * 0.2 : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {animating && <circle cx={cx} cy={size*0.4} r={size*0.35} fill={cl.c} opacity={glow} />}
      <g transform={`translate(${cx},${size*0.5}) scale(${scale}) translate(${-cx},${-size*0.5})`}>
        {stage==="seed"&&<ellipse cx={cx} cy={size*0.8} rx={size*0.1} ry={size*0.06} fill="#8B7355"/>}
        {stage==="sprout"&&<><line x1={cx} y1={size*0.85} x2={cx} y2={size*0.5} stroke="#6B8E5A" strokeWidth="2" strokeLinecap="round"/><ellipse cx={cx-4} cy={size*0.5} rx={4} ry={6} fill="#8FBC6A" transform={`rotate(-20 ${cx-4} ${size*0.5})`}/><ellipse cx={cx+4} cy={size*0.52} rx={4} ry={5} fill="#8FBC6A" transform={`rotate(20 ${cx+4} ${size*0.52})`}/></>}
        {stage==="bud"&&<><line x1={cx} y1={size*0.85} x2={cx} y2={size*0.4} stroke="#6B8E5A" strokeWidth="2" strokeLinecap="round"/><ellipse cx={cx-5} cy={size*0.55} rx={4} ry={6} fill="#8FBC6A" transform={`rotate(-25 ${cx-5} ${size*0.55})`}/><ellipse cx={cx} cy={size*0.38} rx={5} ry={7} fill={cl.p} opacity="0.7"/></>}
        {stage==="bloom"&&<><line x1={cx} y1={size*0.85} x2={cx} y2={size*0.4} stroke="#6B8E5A" strokeWidth="2" strokeLinecap="round"/><ellipse cx={cx-5} cy={size*0.58} rx={3} ry={5} fill="#8FBC6A" transform={`rotate(-25 ${cx-5} ${size*0.58})`}/>{[0,60,120,180,240,300].map((a,i)=><ellipse key={i} cx={cx} cy={size*0.28} rx={4} ry={7} fill={cl.p} transform={`rotate(${a} ${cx} ${size*0.35})`} opacity="0.85"/>)}<circle cx={cx} cy={size*0.35} r={3.5} fill={cl.c}/></>}
      </g>
      {/* Sparkle particles when animating */}
      {animating && <>
        <circle cx={cx-8+Math.sin(anim*0.05)*4} cy={size*0.2+Math.cos(anim*0.03)*6} r={1.5} fill={cl.c} opacity={0.4+Math.sin(anim*0.08)*0.3}/>
        <circle cx={cx+10+Math.cos(anim*0.04)*3} cy={size*0.15+Math.sin(anim*0.06)*5} r={1} fill="white" opacity={0.3+Math.cos(anim*0.07)*0.2}/>
        <circle cx={cx+Math.sin(anim*0.03)*6} cy={size*0.1+Math.cos(anim*0.05)*4} r={1.2} fill={cl.c} opacity={0.3+Math.sin(anim*0.06)*0.2}/>
      </>}
    </svg>
  );
};

const Stars = () => <>{Array.from({length:25},(_,i)=><div key={i} style={{position:"absolute",left:`${((i*41+7)%90)+5}%`,top:`${((i*29+13)%85)+5}%`,width:i%4===0?3:1.5,height:i%4===0?3:1.5,borderRadius:"50%",background:"white",opacity:0.08+(i%5)*0.05}}/>)}</>;

// Cute decorative sparkle
const Sparkle = ({ x, y, size = 8, color = C.accent }) => (
  <div style={{ position:"absolute", left:x, top:y, width:size, height:size, pointerEvents:"none" }}>
    <svg width={size} height={size} viewBox="0 0 8 8">
      <line x1="4" y1="0" x2="4" y2="8" stroke={color} strokeWidth="1.2" opacity="0.6" strokeLinecap="round"/>
      <line x1="0" y1="4" x2="8" y2="4" stroke={color} strokeWidth="1.2" opacity="0.6" strokeLinecap="round"/>
    </svg>
  </div>
);

// ---- MAIN ----
export default function MoonbloomMockV3() {
  const [phase, setPhase] = useState("onboarding");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMood, setSelectedMood] = useState(null);
  const [memoText, setMemoText] = useState("");
  const [animateGrow, setAnimateGrow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [onboardStep, setOnboardStep] = useState(0);
  const [streak, setStreak] = useState(5);
  const [growingIdx, setGrowingIdx] = useState(-1);
  const [historyTab, setHistoryTab] = useState("week");
  const [flowers, setFlowers] = useState([
    { type:"moonflower", stage:"bloom" },
    { type:"starbell", stage:"bud" },
    { type:"nightrose", stage:"sprout" },
    { type:"moonflower", stage:"seed" },
  ]);

  const goSplash = () => { setPhase("splash"); setActiveTab("home"); };
  const goSelect = () => { setPhase("select"); setShowSettings(false); };
  const goMemo = (id) => { setSelectedMood(id); setPhase("memo"); };
  const goReaction = () => setPhase("reaction");
  const goDone = () => {
    setAnimateGrow(true);
    setStreak(s=>s+1);
    const idx = flowers.findIndex(f=>f.stage!=="bloom");
    setGrowingIdx(idx);
    setTimeout(() => {
      setFlowers(prev => {
        const u=[...prev]; if(idx!==-1){const st=["seed","sprout","bud","bloom"];const ci=st.indexOf(u[idx].stage);if(ci<3)u[idx]={...u[idx],stage:st[ci+1]};}
        return u;
      });
      setAnimateGrow(false);
      setGrowingIdx(-1);
      setPhase("splash");
      setActiveTab("garden");
      setSelectedMood(null);
      setMemoText("");
    }, 2000);
  };
  const resetAll = () => { setPhase("onboarding"); setOnboardStep(0); setActiveTab("home"); setSelectedMood(null); setMemoText(""); setShowSettings(false); setHistoryTab("week"); };

  // History data
  const weekData = [
    { day:"月", mood:"great", memo:"友達とランチ！" },
    { day:"火", mood:"good", memo:"散歩した" },
    { day:"水", mood:"okay", memo:"ふつうの日" },
    { day:"木", mood:"good", memo:"映画見た" },
    { day:"金", mood:"meh", memo:"仕事疲れた" },
    { day:"土", mood:null, memo:"" },
    { day:"日", mood:null, memo:"" },
  ];
  const monthPixels = Array.from({length:30},(_,i)=> i<23 ? moods[i%5].color : null);

  return (
    <div style={{ minHeight:"100vh", background:"#111", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"20px 16px", fontFamily:"'Segoe UI',-apple-system,sans-serif" }}>
      <div style={{ fontSize:14, color:"#888", marginBottom:12 }}>🌙 Moonbloom UXモック v3</div>

      {/* Phone */}
      <div style={{ width:320, height:660, borderRadius:36, border:"3px solid #333", overflow:"hidden", position:"relative", background:`linear-gradient(180deg, ${C.bg1} 0%, ${C.bg2} 100%)` }}>
        <div style={{ height:44, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:10 }}>
          <div style={{ width:80, height:24, background:"#000", borderRadius:12, position:"absolute", top:8 }}/>
        </div>

        <div style={{ height:560, overflow:"hidden", position:"relative" }}>
          <Stars/>

          {/* ==== ONBOARDING ==== */}
          {phase==="onboarding"&&(
            <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", padding:"0 28px", textAlign:"center" }}>
              {onboardStep===0&&<>
                <YorumaruBig expression="good" size={140}/>
                <div style={{ fontSize:20, fontWeight:700, color:C.text1, marginTop:12 }}>はじめまして！</div>
                <div style={{ fontSize:13, color:C.text2, marginTop:10, lineHeight:1.8 }}>
                  ぼく、<span style={{color:C.accent,fontWeight:700}}>よるまる</span>まる🌙<br/>
                  まいにちの気分をいっしょに<br/>きろくするまる！
                </div>
              </>}
              {onboardStep===1&&<>
                <div style={{ display:"flex", gap:8, marginBottom:8 }}>
                  {["seed","sprout","bud","bloom"].map((st,i) => <FlowerAnimated key={i} type={["moonflower","starbell","nightrose","moonflower"][i]} stage={st} size={52}/>)}
                </div>
                <div style={{ fontSize:16, fontWeight:700, color:C.text1, marginTop:10 }}>きろくするとおはなが育つまる🌸</div>
                <div style={{ fontSize:13, color:C.text2, marginTop:10, lineHeight:1.8 }}>
                  まいにちの気分をえらぶだけ。<br/>
                  いい日もわるい日も、<br/>
                  <span style={{color:C.pink}}>ぜんぶお花になるまる！</span>
                </div>
              </>}
              {onboardStep===2&&<>
                <YorumaruBig expression="sleepy" size={120}/>
                <div style={{ fontSize:16, fontWeight:700, color:C.text1, marginTop:12 }}>よるになったら会いにくるまる🌙</div>
                <div style={{ fontSize:13, color:C.text2, marginTop:8, lineHeight:1.7 }}>つうちでお知らせするまる。<br/>いつがいいまる？</div>
                <div style={{ marginTop:16, background:"rgba(255,255,255,0.08)", borderRadius:14, padding:"12px 24px", fontSize:20, color:C.text1, fontWeight:600 }}>🕘 21:00</div>
                <div style={{ fontSize:10, color:C.text2, marginTop:6 }}>あとから変えられるまる</div>
              </>}
              <div style={{ display:"flex", gap:6, marginTop:28 }}>
                {[0,1,2].map(i=><div key={i} style={{ width:8, height:8, borderRadius:4, background:onboardStep===i?C.purple:"rgba(255,255,255,0.15)", transition:"all 0.3s" }}/>)}
              </div>
              <button onClick={()=>onboardStep<2?setOnboardStep(s=>s+1):goSplash()} style={{
                marginTop:16, padding:"14px 44px", borderRadius:24, border:"none",
                background:C.purple, color:"#1a1a2e", fontSize:15, fontWeight:700, cursor:"pointer",
              }}>
                {onboardStep<2?"つぎへ →":"はじめる！ 🌙"}
              </button>
            </div>
          )}

          {/* ==== SPLASH ==== */}
          {phase==="splash"&&activeTab==="home"&&(
            <div onClick={goSelect} style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", cursor:"pointer", padding:"0 30px" }}>
              <Sparkle x="15%" y="12%" size={10} color={C.accent}/>
              <Sparkle x="78%" y="8%" size={7} color={C.purple}/>
              <Sparkle x="85%" y="65%" size={8} color={C.accent}/>

              <div onClick={e=>{e.stopPropagation();setShowSettings(!showSettings);}} style={{
                position:"absolute", top:8, right:16, width:32, height:32, borderRadius:16,
                background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", fontSize:14, zIndex:5,
              }}>⚙️</div>

              {showSettings&&(
                <div onClick={e=>e.stopPropagation()} style={{
                  position:"absolute", top:48, right:16, background:"rgba(26,22,52,0.97)", borderRadius:18,
                  padding:16, width:200, zIndex:5, border:"1px solid rgba(183,148,244,0.2)",
                  boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
                }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text1, marginBottom:12 }}>⚙️ せってい</div>
                  <div style={{ fontSize:11, color:C.text2, marginBottom:4 }}>つうち時間</div>
                  <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:10, padding:"8px 12px", fontSize:15, color:C.text1, marginBottom:14 }}>🕘 21:00</div>
                  <div style={{ fontSize:11, color:C.text2, marginBottom:4 }}>げんご</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <div style={{ flex:1, padding:"6px 0", borderRadius:8, background:C.purple, color:"#1a1a2e", fontSize:11, textAlign:"center", fontWeight:700 }}>日本語</div>
                    <div style={{ flex:1, padding:"6px 0", borderRadius:8, background:"rgba(255,255,255,0.06)", color:C.text2, fontSize:11, textAlign:"center" }}>English</div>
                  </div>
                </div>
              )}

              <YorumaruBig expression="good" size={170}/>
              <div style={{
                background:"rgba(255,255,255,0.08)", borderRadius:20, padding:"14px 24px",
                marginTop:10, textAlign:"center",
              }}>
                <div style={{ fontSize:15, color:C.text1, lineHeight:1.6, fontWeight:500, whiteSpace:"nowrap" }}>
                  今日はどんな一日だった〜まる？
                </div>
              </div>
              <div style={{ marginTop:24, fontSize:12, color:C.text2, opacity:0.5, letterSpacing:2 }}>
                タップしてつづける
              </div>
            </div>
          )}

          {/* ==== MOOD SELECT ==== */}
          {phase==="select"&&(
            <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", padding:"16px 20px" }}>
              <div style={{ fontSize:14, color:C.text2, marginBottom:24 }}>今日の気分をえらんでね</div>
              <div style={{ display:"flex", gap:8, width:"100%", marginBottom:8 }}>
                {moods.slice(0,3).map(m=>(
                  <button key={m.id} onClick={()=>goMemo(m.id)} style={{
                    flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                    padding:"14px 4px", borderRadius:20, border:"1px solid rgba(255,255,255,0.08)",
                    background:"rgba(255,255,255,0.04)", cursor:"pointer", transition:"all 0.15s",
                  }}>
                    <YorumaruMini expression={m.id} size={56}/>
                    <div style={{ fontSize:12, fontWeight:700, color:"#E2E8F0" }}>{m.label}</div>
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", gap:8, width:"70%", justifyContent:"center" }}>
                {moods.slice(3).map(m=>(
                  <button key={m.id} onClick={()=>goMemo(m.id)} style={{
                    flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                    padding:"14px 4px", borderRadius:20, border:"1px solid rgba(255,255,255,0.08)",
                    background:"rgba(255,255,255,0.04)", cursor:"pointer", transition:"all 0.15s",
                  }}>
                    <YorumaruMini expression={m.id} size={56}/>
                    <div style={{ fontSize:12, fontWeight:700, color:"#E2E8F0" }}>{m.label}</div>
                  </button>
                ))}
              </div>
              <div style={{ position:"absolute", bottom:12, left:0, right:0, display:"flex", gap:20, justifyContent:"center" }}>
                <div style={{ textAlign:"center" }}><div style={{ fontSize:20, fontWeight:700, color:C.text1 }}>{streak}<span style={{ fontSize:12, fontWeight:500 }}>日</span></div><div style={{ fontSize:9, color:C.text2 }}>れんぞく 🌟</div></div>
                <div style={{ width:1, background:"rgba(255,255,255,0.1)" }}/>
                <div style={{ textAlign:"center" }}><div style={{ fontSize:20, fontWeight:700, color:C.text1 }}>23<span style={{ fontSize:12, fontWeight:500 }}>回</span></div><div style={{ fontSize:9, color:C.text2 }}>きろく 📝</div></div>
              </div>
            </div>
          )}

          {/* ==== MEMO ==== */}
          {phase==="memo"&&selectedMood&&(
            <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", height:"100%", padding:"24px 24px" }}>
              <YorumaruMini expression={selectedMood} size={72}/>
              <div style={{ fontSize:15, fontWeight:700, color:moods.find(m=>m.id===selectedMood)?.color, marginTop:4 }}>
                {moods.find(m=>m.id===selectedMood)?.label}
              </div>
              <div style={{ marginTop:24, width:"100%", textAlign:"center" }}>
                <div style={{ fontSize:13, color:C.text2, marginBottom:10 }}>📝 ひとことメモ<span style={{ fontSize:11, opacity:0.6 }}>（かかなくてもOK）</span></div>
                <div style={{
                  background:"rgba(255,255,255,0.06)", borderRadius:16, padding:"14px 16px",
                  border:"1px solid rgba(183,148,244,0.15)",
                }}>
                  <input type="text" value={memoText} onChange={e=>setMemoText(e.target.value)}
                    placeholder="今日あったことをひとことで..."
                    maxLength={60}
                    style={{ width:"100%", background:"none", border:"none", outline:"none", color:C.text1, fontSize:14, fontFamily:"inherit" }}
                  />
                </div>
                <div style={{ fontSize:10, color:C.text2, marginTop:6, textAlign:"right" }}>{memoText.length}/60</div>
              </div>
              <div style={{ marginTop:"auto", paddingBottom:20, display:"flex", flexDirection:"column", gap:10, width:"100%" }}>
                <button onClick={goReaction} style={{
                  padding:"14px 0", borderRadius:24, border:"none",
                  background:C.purple, color:"#1a1a2e", fontSize:15, fontWeight:700, cursor:"pointer",
                }}>きろくする 🌙</button>
                <button onClick={goReaction} style={{
                  padding:"10px 0", borderRadius:20, border:"none",
                  background:"none", color:C.text2, fontSize:12, cursor:"pointer",
                }}>スキップ</button>
              </div>
            </div>
          )}

          {/* ==== REACTION ==== */}
          {phase==="reaction"&&selectedMood&&(
            <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", padding:"0 24px" }}>
              <Sparkle x="10%" y="15%" size={8}/>
              <Sparkle x="82%" y="20%" size={10} color={C.purple}/>
              <YorumaruBig expression={selectedMood} size={160}/>
              <div style={{
                background:"rgba(255,255,255,0.08)", borderRadius:20, padding:"14px 20px",
                marginTop:10, maxWidth:260, textAlign:"center",
              }}>
                <div style={{ fontSize:14, color:C.text1, lineHeight:1.7, whiteSpace:"pre-line" }}>
                  {reactions[selectedMood]}
                </div>
              </div>
              {memoText&&<div style={{ marginTop:8, fontSize:12, color:C.text2, fontStyle:"italic", background:"rgba(255,255,255,0.04)", padding:"6px 12px", borderRadius:10 }}>📝 {memoText}</div>}
              {animateGrow?(
                <div style={{ marginTop:20, textAlign:"center" }}>
                  <FlowerAnimated type="starbell" stage="bloom" size={48} animating={true}/>
                  <div style={{ fontSize:13, color:C.accent, marginTop:4 }}>おはなが育ったまる…！ 🌱</div>
                </div>
              ):(
                <button onClick={goDone} style={{
                  marginTop:28, padding:"14px 44px", borderRadius:24, border:"none",
                  background:C.purple, color:"#1a1a2e", fontSize:15, fontWeight:700, cursor:"pointer",
                }}>おやすみまる 🌙</button>
              )}
            </div>
          )}

          {/* ==== GARDEN ==== */}
          {activeTab==="garden"&&phase==="splash"&&(
            <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", padding:"8px 20px", height:"100%" }}>
              <div style={{ fontSize:17, fontWeight:700, color:C.text1, marginBottom:2 }}>🌸 よるまるの庭</div>
              <div style={{ display:"flex", gap:16, marginBottom:14 }}>
                <div style={{ fontSize:11, color:C.text2 }}>🌟 {streak}日れんぞく</div>
                <div style={{ fontSize:11, color:C.text2 }}>📝 23回きろく</div>
              </div>
              {/* Garden visual */}
              <div style={{
                background:"rgba(255,255,255,0.03)", borderRadius:24, padding:"20px 16px",
                width:"100%", flex:1, position:"relative", overflow:"hidden",
                border:"1px solid rgba(255,255,255,0.05)",
              }}>
                {/* Ground gradient */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:40, background:"linear-gradient(transparent, rgba(107,142,90,0.08))", borderRadius:"0 0 24px 24px" }}/>
                {/* Flowers grid */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", position:"relative", zIndex:1 }}>
                  {flowers.map((f,i)=>(
                    <div key={i} style={{ width:62, height:78, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end",
                      background:"rgba(255,255,255,0.03)", borderRadius:14, padding:"4px 0 6px",
                    }}>
                      <FlowerAnimated type={f.type} stage={f.stage} size={48} animating={growingIdx===i}/>
                      <div style={{ fontSize:8, color:C.text2, marginTop:3, fontWeight:500 }}>
                        {{bloom:"まんかい 🌸",bud:"つぼみ 🌱",sprout:"ふたば 🌿",seed:"たね ・"}[f.stage]}
                      </div>
                    </div>
                  ))}
                  {[...Array(4)].map((_,i)=>(
                    <div key={`e${i}`} style={{ width:62, height:78, display:"flex", alignItems:"center", justifyContent:"center",
                      border:"1px dashed rgba(255,255,255,0.06)", borderRadius:14, opacity:0.4,
                    }}>
                      <div style={{ fontSize:18, color:"rgba(255,255,255,0.15)" }}>?</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Yorumaru */}
              <div style={{ marginTop:8 }}><YorumaruBig expression="good" size={72}/></div>
              <div style={{ fontSize:11, color:C.text2, marginTop:0, marginBottom:4 }}>きろくを続けるとお花が咲くまる〜🌸</div>
            </div>
          )}

          {/* ==== HISTORY ==== */}
          {activeTab==="history"&&phase==="splash"&&(
            <div style={{ position:"relative", zIndex:2, padding:"8px 18px", height:"100%", overflowY:"auto" }}>
              <div style={{ fontSize:17, fontWeight:700, color:C.text1, marginBottom:10, textAlign:"center" }}>📋 きろく</div>

              {/* Tab switcher */}
              <div style={{ display:"flex", gap:4, marginBottom:14, background:"rgba(255,255,255,0.04)", borderRadius:12, padding:3 }}>
                {[{id:"week",label:"こんしゅう"},{id:"month",label:"こんげつ"},{id:"calendar",label:"カレンダー"}].map(t=>(
                  <button key={t.id} onClick={()=>setHistoryTab(t.id)} style={{
                    flex:1, padding:"7px 0", borderRadius:10, border:"none", fontSize:11, fontWeight:600, cursor:"pointer",
                    background:historyTab===t.id?C.purple:"transparent",
                    color:historyTab===t.id?"#1a1a2e":C.text2,
                  }}>{t.label}</button>
                ))}
              </div>

              {/* WEEK VIEW */}
              {historyTab==="week"&&<>
                {weekData.map((d,i)=>{
                  const m = d.mood ? moods.find(x=>x.id===d.mood) : null;
                  return (
                    <div key={i} style={{
                      display:"flex", alignItems:"center", gap:8, padding:"8px 8px",
                      background: i%2===0 ? "rgba(255,255,255,0.02)" : "transparent",
                      borderRadius:10, marginBottom:2, opacity:m?1:0.3,
                    }}>
                      <div style={{ width:22, fontSize:12, color:C.text2, fontWeight:600 }}>{d.day}</div>
                      {m ? <>
                        <YorumaruMini expression={d.mood} size={30}/>
                        <div style={{ fontSize:11, color:m.color, fontWeight:600, minWidth:56 }}>{m.label}</div>
                        <div style={{ fontSize:10, color:C.text2, opacity:0.7, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.memo}</div>
                      </> : <div style={{ fontSize:11, color:C.text2 }}>— きろくなし</div>}
                    </div>
                  );
                })}
                {/* Week summary */}
                <div style={{ marginTop:12, background:"rgba(255,255,255,0.04)", borderRadius:16, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, fontWeight:600, color:C.text2, marginBottom:8 }}>📊 こんしゅうのまとめ</div>
                  <div style={{ display:"flex", gap:6, alignItems:"flex-end", justifyContent:"center", height:60 }}>
                    {weekData.map((d,i)=>{
                      const m = d.mood ? moods.find(x=>x.id===d.mood) : null;
                      const h = m ? {great:50,good:40,okay:30,meh:20,bad:10}[d.mood] : 5;
                      return (
                        <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                          <div style={{ width:24, height:h, borderRadius:6, background:m?m.color:"rgba(255,255,255,0.05)", transition:"height 0.3s" }}/>
                          <div style={{ fontSize:8, color:C.text2 }}>{d.day}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Legend */}
                <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap", justifyContent:"center" }}>
                  {moods.map(m=>(
                    <div key={m.id} style={{ display:"flex", alignItems:"center", gap:3 }}>
                      <div style={{ width:10, height:10, borderRadius:3, background:m.color, opacity:0.75 }}/>
                      <div style={{ fontSize:9, color:C.text2 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </>}

              {/* MONTH VIEW */}
              {historyTab==="month"&&<>
                <div style={{ fontSize:12, fontWeight:600, color:C.text2, marginBottom:8 }}>3月のきぶん</div>
                {/* Mood distribution */}
                <div style={{ display:"flex", gap:4, marginBottom:14 }}>
                  {moods.map(m=>{
                    const count = monthPixels.filter(c=>c===m.color).length;
                    return (
                      <div key={m.id} style={{ flex:1, textAlign:"center", background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"8px 2px" }}>
                        <YorumaruMini expression={m.id} size={28}/>
                        <div style={{ fontSize:16, fontWeight:700, color:m.color, marginTop:2 }}>{count}</div>
                        <div style={{ fontSize:8, color:C.text2 }}>{m.label}</div>
                      </div>
                    );
                  })}
                </div>
                {/* Best streak */}
                <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"10px 14px", marginBottom:12, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ fontSize:24 }}>🌟</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.text1 }}>さいちょうれんぞく: {streak}日</div>
                    <div style={{ fontSize:10, color:C.text2 }}>いまもけいぞくちゅうまる！</div>
                  </div>
                </div>
                {/* Favorite mood */}
                <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
                  <YorumaruMini expression="good" size={36}/>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.text1 }}>いちばんおおかった気分</div>
                    <div style={{ fontSize:12, color:moods[1].color }}>にこにこ 😊（8回）</div>
                  </div>
                </div>
              </>}

              {/* CALENDAR VIEW */}
              {historyTab==="calendar"&&<>
                <div style={{ fontSize:12, fontWeight:600, color:C.text2, marginBottom:8 }}>3月 2026</div>
                {/* Day headers */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:4 }}>
                  {["月","火","水","木","金","土","日"].map(d=>(
                    <div key={d} style={{ fontSize:9, color:C.text2, textAlign:"center" }}>{d}</div>
                  ))}
                </div>
                {/* Calendar grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
                  {/* Empty days for offset (March 2026 starts on Sunday) */}
                  {[...Array(6)].map((_,i)=><div key={`off${i}`}/>)}
                  {monthPixels.map((c,i)=>(
                    <div key={i} style={{
                      width:"100%", aspectRatio:"1", borderRadius:6,
                      background:c||"rgba(255,255,255,0.04)",
                      opacity:c?0.75:0.2,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:8, color:c?"rgba(0,0,0,0.3)":C.text2,
                    }}>
                      {i+1}
                    </div>
                  ))}
                </div>
                {/* Legend */}
                <div style={{ display:"flex", gap:6, marginTop:12, flexWrap:"wrap", justifyContent:"center" }}>
                  {moods.map(m=>(
                    <div key={m.id} style={{ display:"flex", alignItems:"center", gap:3 }}>
                      <div style={{ width:10, height:10, borderRadius:3, background:m.color, opacity:0.75 }}/>
                      <div style={{ fontSize:9, color:C.text2 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </>}
            </div>
          )}
        </div>

        {/* Tab bar */}
        <div style={{ height:56, display:"flex", borderTop:"1px solid rgba(255,255,255,0.06)", background:"rgba(15,12,41,0.97)" }}>
          {[
            { id:"home", label:"ホーム", icon:"🌙" },
            { id:"garden", label:"にわ", icon:"🌸" },
            { id:"history", label:"きろく", icon:"📋" },
          ].map(tab=>(
            <button key={tab.id} onClick={()=>{setActiveTab(tab.id);if(tab.id==="home"){setPhase("splash");setSelectedMood(null);setMemoText("");setShowSettings(false);}else{setPhase("splash");}}}
              style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, border:"none", background:"none", cursor:"pointer", opacity:activeTab===tab.id?1:0.35, transition:"opacity 0.2s" }}>
              <div style={{ fontSize:20 }}>{tab.icon}</div>
              <div style={{ fontSize:9, color:activeTab===tab.id?C.purple:C.text2, fontWeight:activeTab===tab.id?700:400 }}>{tab.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop:14, textAlign:"center", maxWidth:340 }}>
        <div style={{ fontSize:11, color:"#555", lineHeight:1.6 }}>
          全フロー体験可。きろくタブは3つのビュー（週/月/カレンダー）切り替え可能。
        </div>
        <button onClick={resetAll} style={{ marginTop:8, padding:"6px 20px", borderRadius:16, border:"1px solid #333", background:"none", color:"#666", fontSize:11, cursor:"pointer" }}>
          🔄 最初から
        </button>
      </div>
    </div>
  );
}
