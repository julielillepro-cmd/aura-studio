import { useState } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

// ─── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  cream:"#F5EDE8", creamDark:"#EDE0D8", creamDeep:"#E4D4CB",
  bordeaux:"#9f4b64", bordeauxLight:"#B86080",
  mauve:"#C9A8B2", mauveLight:"#DEC4CC",
  choco:"#4A3438", chocoLight:"#6B4E54",
  text:"#66514f", textDark:"#3A2830", textLight:"#9A8080",
  white:"#FFFFFF",
  trail:"#5a8a6a", run:"#6a7a9a", interval:"#9a7a4a",
};

const MUSCLE_GROUPS = ["Glutes","Hamstrings","Quads","Back","Chest","Shoulders","Arms","Core","Calves","Full Body"];

const BASE_EXERCISES = [
  {id:1,name:"Squat",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:2,name:"Hack Squat",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:3,name:"Leg Press",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:4,name:"Bulgarian Split Squat",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:5,name:"Walking Lunge",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:6,name:"Step Up",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:7,name:"Goblet Squat",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:8,name:"Sumo Squat",category:"Strength",subcat:"Legs",muscles:["Quads","Glutes","Hamstrings"],pr:0,prUnit:"kg"},
  {id:9,name:"Sissy Squat",category:"Strength",subcat:"Legs",muscles:["Quads"],pr:0,prUnit:"kg"},
  {id:10,name:"Hip Thrust",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Glutes"],pr:0,prUnit:"kg"},
  {id:11,name:"Glute Bridge",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Glutes"],pr:0,prUnit:"kg"},
  {id:12,name:"Romanian Deadlift",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Hamstrings","Glutes"],pr:0,prUnit:"kg"},
  {id:13,name:"Stiff-Leg Deadlift",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Hamstrings","Glutes"],pr:0,prUnit:"kg"},
  {id:14,name:"Leg Curl (couché)",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Hamstrings"],pr:0,prUnit:"kg"},
  {id:15,name:"Leg Curl (incliné)",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Hamstrings"],pr:0,prUnit:"kg"},
  {id:16,name:"Leg Curl (assis)",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Hamstrings"],pr:0,prUnit:"kg"},
  {id:17,name:"Nordic Curl",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Hamstrings"],pr:0,prUnit:"kg"},
  {id:18,name:"Cable Kickback",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Glutes"],pr:0,prUnit:"kg"},
  {id:19,name:"Abduction Machine",category:"Strength",subcat:"Glutes & Hamstrings",muscles:["Glutes"],pr:0,prUnit:"kg"},
  {id:20,name:"Deadlift",category:"Strength",subcat:"Back",muscles:["Back","Hamstrings"],pr:0,prUnit:"kg"},
  {id:21,name:"Pull-up",category:"Strength",subcat:"Back",muscles:["Back","Arms"],pr:0,prUnit:"kg"},
  {id:22,name:"Chin-up",category:"Strength",subcat:"Back",muscles:["Back","Arms"],pr:0,prUnit:"kg"},
  {id:23,name:"Cable Row",category:"Strength",subcat:"Back",muscles:["Back"],pr:0,prUnit:"kg"},
  {id:24,name:"Seated Row",category:"Strength",subcat:"Back",muscles:["Back"],pr:0,prUnit:"kg"},
  {id:25,name:"Bent-over Row",category:"Strength",subcat:"Back",muscles:["Back","Core"],pr:0,prUnit:"kg"},
  {id:26,name:"T-Bar Row",category:"Strength",subcat:"Back",muscles:["Back"],pr:0,prUnit:"kg"},
  {id:27,name:"Lat Pulldown",category:"Strength",subcat:"Back",muscles:["Back"],pr:0,prUnit:"kg"},
  {id:28,name:"Face Pull",category:"Strength",subcat:"Back",muscles:["Back","Shoulders"],pr:0,prUnit:"kg"},
  {id:29,name:"Hyperextension",category:"Strength",subcat:"Back",muscles:["Back","Glutes"],pr:0,prUnit:"kg"},
  {id:30,name:"Bench Press",category:"Strength",subcat:"Chest",muscles:["Chest","Shoulders"],pr:0,prUnit:"kg"},
  {id:31,name:"Incline Bench Press",category:"Strength",subcat:"Chest",muscles:["Chest","Shoulders"],pr:0,prUnit:"kg"},
  {id:32,name:"Decline Bench Press",category:"Strength",subcat:"Chest",muscles:["Chest"],pr:0,prUnit:"kg"},
  {id:33,name:"Dumbbell Fly",category:"Strength",subcat:"Chest",muscles:["Chest"],pr:0,prUnit:"kg"},
  {id:34,name:"Cable Fly",category:"Strength",subcat:"Chest",muscles:["Chest"],pr:0,prUnit:"kg"},
  {id:35,name:"Push-up",category:"Strength",subcat:"Chest",muscles:["Chest","Shoulders","Arms"],pr:0,prUnit:"kg"},
  {id:36,name:"Dip",category:"Strength",subcat:"Chest",muscles:["Chest","Arms"],pr:0,prUnit:"kg"},
  {id:40,name:"Overhead Press",category:"Strength",subcat:"Shoulders",muscles:["Shoulders"],pr:0,prUnit:"kg"},
  {id:41,name:"Dumbbell Shoulder Press",category:"Strength",subcat:"Shoulders",muscles:["Shoulders"],pr:0,prUnit:"kg"},
  {id:42,name:"Lateral Raise",category:"Strength",subcat:"Shoulders",muscles:["Shoulders"],pr:0,prUnit:"kg"},
  {id:43,name:"Front Raise",category:"Strength",subcat:"Shoulders",muscles:["Shoulders"],pr:0,prUnit:"kg"},
  {id:44,name:"Arnold Press",category:"Strength",subcat:"Shoulders",muscles:["Shoulders"],pr:0,prUnit:"kg"},
  {id:45,name:"Upright Row",category:"Strength",subcat:"Shoulders",muscles:["Shoulders","Back"],pr:0,prUnit:"kg"},
  {id:50,name:"Bicep Curl",category:"Strength",subcat:"Arms",muscles:["Arms"],pr:0,prUnit:"kg"},
  {id:51,name:"Hammer Curl",category:"Strength",subcat:"Arms",muscles:["Arms"],pr:0,prUnit:"kg"},
  {id:52,name:"Preacher Curl",category:"Strength",subcat:"Arms",muscles:["Arms"],pr:0,prUnit:"kg"},
  {id:53,name:"Tricep Pushdown",category:"Strength",subcat:"Arms",muscles:["Arms"],pr:0,prUnit:"kg"},
  {id:54,name:"Skull Crusher",category:"Strength",subcat:"Arms",muscles:["Arms"],pr:0,prUnit:"kg"},
  {id:55,name:"Overhead Tricep Extension",category:"Strength",subcat:"Arms",muscles:["Arms"],pr:0,prUnit:"kg"},
  {id:60,name:"Plank",category:"Strength",subcat:"Core",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:61,name:"Ab Crunch",category:"Strength",subcat:"Core",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:62,name:"Cable Crunch",category:"Strength",subcat:"Core",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:63,name:"Russian Twist",category:"Strength",subcat:"Core",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:64,name:"Leg Raise",category:"Strength",subcat:"Core",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:65,name:"Dead Bug",category:"Strength",subcat:"Core",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:66,name:"Pallof Press",category:"Strength",subcat:"Core",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:100,name:"Clean & Jerk",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Back","Shoulders"],pr:0,prUnit:"kg"},
  {id:101,name:"Power Clean",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Back"],pr:0,prUnit:"kg"},
  {id:102,name:"Squat Clean",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Quads"],pr:0,prUnit:"kg"},
  {id:103,name:"Hang Power Clean",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Back"],pr:0,prUnit:"kg"},
  {id:104,name:"Snatch",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Back"],pr:0,prUnit:"kg"},
  {id:105,name:"Power Snatch",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Shoulders"],pr:0,prUnit:"kg"},
  {id:106,name:"Overhead Squat",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Quads","Shoulders"],pr:0,prUnit:"kg"},
  {id:107,name:"Push Jerk",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Shoulders","Quads"],pr:0,prUnit:"kg"},
  {id:108,name:"Split Jerk",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Shoulders","Quads","Core"],pr:0,prUnit:"kg"},
  {id:109,name:"Hang Squat Clean",category:"CrossFit",subcat:"Olympic Lifts",muscles:["Full Body","Quads"],pr:0,prUnit:"kg"},
  {id:110,name:"Pull-up (CF)",category:"CrossFit",subcat:"Gymnastics",muscles:["Back","Arms"],pr:0,prUnit:"kg"},
  {id:111,name:"Chest-to-bar Pull-up",category:"CrossFit",subcat:"Gymnastics",muscles:["Back","Arms"],pr:0,prUnit:"kg"},
  {id:112,name:"Muscle-up (bar)",category:"CrossFit",subcat:"Gymnastics",muscles:["Back","Arms","Chest"],pr:0,prUnit:"kg"},
  {id:113,name:"Muscle-up (ring)",category:"CrossFit",subcat:"Gymnastics",muscles:["Back","Arms","Chest"],pr:0,prUnit:"kg"},
  {id:114,name:"Handstand Push-up",category:"CrossFit",subcat:"Gymnastics",muscles:["Shoulders","Arms"],pr:0,prUnit:"kg"},
  {id:115,name:"Handstand Walk",category:"CrossFit",subcat:"Gymnastics",muscles:["Shoulders","Core"],pr:0,prUnit:"kg"},
  {id:116,name:"Toes-to-Bar",category:"CrossFit",subcat:"Gymnastics",muscles:["Core","Arms"],pr:0,prUnit:"kg"},
  {id:117,name:"Knees-to-Elbows",category:"CrossFit",subcat:"Gymnastics",muscles:["Core"],pr:0,prUnit:"kg"},
  {id:118,name:"Ring Dip",category:"CrossFit",subcat:"Gymnastics",muscles:["Chest","Arms"],pr:0,prUnit:"kg"},
  {id:119,name:"L-Sit",category:"CrossFit",subcat:"Gymnastics",muscles:["Core","Arms"],pr:0,prUnit:"kg"},
  {id:120,name:"Thruster",category:"CrossFit",subcat:"MetCon",muscles:["Quads","Shoulders","Full Body"],pr:0,prUnit:"kg"},
  {id:121,name:"Wall Ball",category:"CrossFit",subcat:"MetCon",muscles:["Quads","Shoulders"],pr:0,prUnit:"kg"},
  {id:122,name:"Box Jump",category:"CrossFit",subcat:"MetCon",muscles:["Quads","Glutes"],pr:0,prUnit:"kg"},
  {id:123,name:"Burpee",category:"CrossFit",subcat:"MetCon",muscles:["Full Body"],pr:0,prUnit:"kg"},
  {id:124,name:"Burpee Box Jump",category:"CrossFit",subcat:"MetCon",muscles:["Full Body"],pr:0,prUnit:"kg"},
  {id:125,name:"Kettlebell Swing",category:"CrossFit",subcat:"MetCon",muscles:["Glutes","Hamstrings","Back"],pr:0,prUnit:"kg"},
  {id:126,name:"American KB Swing",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Shoulders"],pr:0,prUnit:"kg"},
  {id:127,name:"Double Under",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Calves"],pr:0,prUnit:"kg"},
  {id:128,name:"GHD Sit-up",category:"CrossFit",subcat:"MetCon",muscles:["Core","Hamstrings"],pr:0,prUnit:"kg"},
  {id:129,name:"Row (ergomètre)",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Back"],pr:0,prUnit:"kg"},
  {id:130,name:"Assault Bike",category:"CrossFit",subcat:"MetCon",muscles:["Full Body"],pr:0,prUnit:"kg"},
  {id:131,name:"Ski Erg",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Back","Shoulders"],pr:0,prUnit:"kg"},
  {id:132,name:"Sled Push",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Quads"],pr:0,prUnit:"kg"},
  {id:133,name:"Farmer Carry",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Core","Arms"],pr:0,prUnit:"kg"},
  {id:134,name:"Devil Press",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Shoulders"],pr:0,prUnit:"kg"},
  {id:135,name:"Sandbag Clean",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Back"],pr:0,prUnit:"kg"},
  {id:136,name:"Tire Flip",category:"CrossFit",subcat:"MetCon",muscles:["Full Body","Back"],pr:0,prUnit:"kg"},
];

const INITIAL_RACES = [
  {id:1,name:"Trail des Calanques",date:"2026-04-12",distance:22,type:"trail",notes:"D+ 1200m",goal:"Sub-3h"},
  {id:2,name:"Marathon de Paris",date:"2026-04-06",distance:42.2,type:"run",notes:"Route",goal:"Sub-4h"},
];

const makeWorkouts = () => [
  {id:1,name:"Lower – Force",date:"2026-03-03",type:"strength",unit:"kg",label:"Lower",favorite:true,
    exercises:[{exId:1,sets:[{reps:5,weight:75},{reps:5,weight:80}]},{exId:12,sets:[{reps:8,weight:62.5},{reps:8,weight:65}]},{exId:10,sets:[{reps:10,weight:85},{reps:10,weight:90}]}]},
  {id:2,name:"WOD Fran",date:"2026-03-05",type:"crossfit",unit:"kg",label:"MetCon",favorite:false,
    exercises:[{exId:120,sets:[{reps:21,weight:42.5},{reps:15,weight:42.5},{reps:9,weight:42.5}]},{exId:110,sets:[{reps:21,weight:0},{reps:15,weight:0},{reps:9,weight:0}]}]},
  {id:3,name:"Trail Ventoux",date:"2026-03-07",type:"trail",favorite:false,label:"Trail",distance:18.4,duration:165,elevation:1240,pace:"8:58"},
  {id:4,name:"Fractionné 10×400m",date:"2026-03-09",type:"interval",favorite:false,label:"Fractionné",distance:6,duration:45,intervals:"10×400m",restTime:"90s",pace:"4:30"},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const calcRM = (w,r) => r===1 ? w : Math.round(w*(1+r/30)*10)/10;
const kgToLbs = kg => Math.round(kg*2.2046*10)/10;
const lbsToKg = lbs => Math.round(lbs/2.2046*10)/10;
const fmtDate = d => new Date(d).toLocaleDateString("fr-FR",{day:"2-digit",month:"short"});
const daysUntil = d => Math.ceil((new Date(d)-new Date())/86400000);
const toKg = (v,u) => u==="lbs" ? lbsToKg(v) : v;
const fromKg = (v,u) => u==="lbs" ? kgToLbs(v) : v;
const TYPE_COLOR = {strength:C.bordeaux,crossfit:C.chocoLight,trail:C.trail,run:C.run,interval:C.interval};
const TYPE_LABEL = {strength:"Muscu",crossfit:"CrossFit",trail:"Trail",run:"Course",interval:"Fractionné"};
const TYPE_EMOJI = {strength:"🏋️",crossfit:"⚡",trail:"🏔️",run:"🏃",interval:"⏱️"};
const isRun = t => ["trail","run","interval"].includes(t);

// ─── GLOBAL CSS ──────────────────────────────────────────────────────────────
const css = `
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${C.cream};}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:${C.creamDark};}
::-webkit-scrollbar-thumb{background:${C.mauve};border-radius:2px;}
input:focus,select:focus,textarea:focus{outline:none;border-color:${C.bordeaux}!important;}
input[type=range]{-webkit-appearance:none;width:100%;height:4px;border-radius:2px;background:${C.mauveLight};}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${C.bordeaux};cursor:pointer;}
select option{background:#fff;}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.fade-in{animation:fadeIn 0.25s ease forwards}
button:hover{opacity:0.82;}
@media(max-width:600px){
  .grid-2{grid-template-columns:1fr!important;}
  .grid-4{grid-template-columns:1fr 1fr!important;}
  .hide-mobile{display:none!important;}
  .mobile-full{width:100%!important;max-width:100%!important;}
}
`;

// ─── STYLE TOKENS ────────────────────────────────────────────────────────────
const S = {
  input: {background:C.white,border:`1.5px solid ${C.mauveLight}`,borderRadius:8,color:C.text,fontFamily:"'DM Sans',sans-serif",fontSize:14,padding:"9px 14px",width:"100%"},
  label: {fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.textLight,display:"block",marginBottom:6},
  card:  {background:C.white,borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(58,40,48,0.07)"},
  btn: (v="default") => ({
    fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,padding:"9px 20px",borderRadius:8,border:"none",cursor:"pointer",
    background: v==="primary"?C.bordeaux : v==="soft"?C.mauveLight : v==="danger"?"#f8e8ec" : C.creamDark,
    color: v==="primary"?C.white : v==="danger"?C.bordeaux : C.text,
  }),
  navBtn: active => ({fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",padding:"7px 14px",borderRadius:20,border:"none",cursor:"pointer",background:active?C.bordeaux:"transparent",color:active?C.white:C.textLight,transition:"all 0.2s",whiteSpace:"nowrap"}),
  h1: {fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:C.bordeaux,marginBottom:20},
  h2: {fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:600,color:C.text,marginBottom:8},
};

// ─── SPIDER CHART ────────────────────────────────────────────────────────────
function Spider({data}) {
  const cx=100,cy=100,r=70,n=data.length;
  const max=Math.max(...data.map(d=>d.v),1);
  const pts=data.map((d,i)=>{
    const a=(i/n)*2*Math.PI-Math.PI/2, pct=d.v/max;
    return {x:cx+Math.cos(a)*r*pct, y:cy+Math.sin(a)*r*pct, lx:cx+Math.cos(a)*(r+26), ly:cy+Math.sin(a)*(r+26), label:d.label, v:d.v};
  });
  return (
    <svg width={200} height={200} style={{overflow:"visible"}}>
      {[0.25,0.5,0.75,1].map((lvl,i) => {
        const gp=Array.from({length:n},(_,j)=>{const a=(j/n)*2*Math.PI-Math.PI/2;return `${cx+Math.cos(a)*r*lvl},${cy+Math.sin(a)*r*lvl}`;}).join(" ");
        return <polygon key={i} points={gp} fill="none" stroke={C.mauveLight} strokeWidth="1"/>;
      })}
      {Array.from({length:n},(_,i)=>{
        const a=(i/n)*2*Math.PI-Math.PI/2;
        return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(a)*r} y2={cy+Math.sin(a)*r} stroke={C.mauveLight} strokeWidth="1"/>;
      })}
      <polygon points={pts.map(p=>`${p.x},${p.y}`).join(" ")} fill={C.bordeaux} fillOpacity="0.2" stroke={C.bordeaux} strokeWidth="2"/>
      {pts.map((p,i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill={C.bordeaux}/>
          <text x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" style={{fontSize:9,fontFamily:"'DM Mono',monospace",fill:p.v===0?C.mauve:C.text}}>{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── RM TAB ──────────────────────────────────────────────────────────────────
function RMTab({exercises}) {
  const [selEx,setSelEx]=useState(exercises[0]?.id||"");
  const [weight,setWeight]=useState("");
  const [reps,setReps]=useState("5");
  const [pct,setPct]=useState(80);
  const [iu,setIu]=useState("kg");
  const rawW = iu==="lbs" ? lbsToKg(Number(weight)) : Number(weight);
  const rm = weight&&reps ? calcRM(rawW,Number(reps)) : null;
  const rmD = rm ? (iu==="lbs" ? kgToLbs(rm) : rm) : null;
  const tgt = rm ? Math.round(rm*pct/100*2)/2 : null;
  const tgtD = tgt ? (iu==="lbs" ? kgToLbs(tgt) : tgt) : null;
  return (
    <div className="fade-in">
      <div style={S.h1}>Simulateur RM</div>
      <div style={{...S.card,maxWidth:520}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div style={{gridColumn:"1/-1"}}>
            <span style={S.label}>Exercice</span>
            <select style={S.input} value={selEx} onChange={e=>setSelEx(e.target.value)}>
              {exercises.map(ex=><option key={ex.id} value={ex.id}>{ex.name}</option>)}
            </select>
          </div>
          <div>
            <span style={S.label}>Poids</span>
            <div style={{display:"flex",gap:8}}>
              <input style={S.input} type="number" placeholder="ex: 80" value={weight} onChange={e=>setWeight(e.target.value)}/>
              <select style={{...S.input,width:80}} value={iu} onChange={e=>setIu(e.target.value)}>
                <option value="kg">kg</option><option value="lbs">lbs</option>
              </select>
            </div>
          </div>
          <div>
            <span style={S.label}>Répétitions</span>
            <input style={S.input} type="number" min="1" max="30" value={reps} onChange={e=>setReps(e.target.value)}/>
          </div>
        </div>
        {rmD && (
          <>
            <div style={{background:C.creamDark,borderRadius:12,padding:16,marginBottom:24,textAlign:"center"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:2,color:C.textLight,marginBottom:4}}>1RM ESTIMÉ</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:40,fontWeight:700,color:C.bordeaux}}>{rmD}<span style={{fontSize:20}}> {iu}</span></div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight,marginTop:4}}>{iu==="kg"?`= ${kgToLbs(rm)} lbs`:`= ${rm} kg`}</div>
            </div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <span style={S.label}>Pourcentage cible</span>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:C.bordeaux}}>{pct}%</div>
              </div>
              <input type="range" min="50" max="100" step="5" value={pct} onChange={e=>setPct(Number(e.target.value))}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4,marginBottom:20}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight}}>50%</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight}}>100%</span>
              </div>
              <div style={{background:C.bordeaux,borderRadius:12,padding:20,textAlign:"center"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:2,color:C.mauveLight,marginBottom:6}}>OBJECTIF À {pct}%</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:700,color:C.white}}>{tgtD}<span style={{fontSize:18}}> {iu}</span></div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.mauveLight,marginTop:4}}>{iu==="kg"?`= ${kgToLbs(tgt)} lbs`:`= ${tgt} kg`}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── EXERCISES TAB ───────────────────────────────────────────────────────────
function ExercisesTab({exercises,setExercises}) {
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");
  const [adding,setAdding]=useState(false);
  const [editId,setEditId]=useState(null);
  const [prModal,setPrModal]=useState(null); // exercice id for PR editing
  const [prForm,setPrForm]=useState({pr:"",prUnit:"kg"});
  const [form,setForm]=useState({name:"",category:"Strength",subcat:"",muscles:[],pr:0,prUnit:"kg"});

  const filtered=exercises.filter(e=>(cat==="All"||e.category===cat)&&e.name.toLowerCase().includes(search.toLowerCase()));
  const grouped=filtered.reduce((acc,e)=>{const k=e.subcat||e.category;if(!acc[k])acc[k]=[];acc[k].push(e);return acc;},{});
  const toggleM=m=>setForm(f=>({...f,muscles:f.muscles.includes(m)?f.muscles.filter(x=>x!==m):[...f.muscles,m]}));

  const save=()=>{
    if(editId){setExercises(p=>p.map(e=>e.id===editId?{...e,...form}:e));setEditId(null);}
    else{setExercises(p=>[...p,{id:Date.now(),...form}]);setAdding(false);}
    setForm({name:"",category:"Strength",subcat:"",muscles:[],pr:0,prUnit:"kg"});
  };

  const savePR=()=>{
    const prKg=prForm.prUnit==="lbs"?lbsToKg(Number(prForm.pr)):Number(prForm.pr);
    setExercises(p=>p.map(e=>e.id===prModal?{...e,pr:prKg,prUnit:prForm.prUnit}:e));
    setPrModal(null);
  };

  const prEx=exercises.find(e=>e.id===prModal);

  return (
    <div className="fade-in">
      <div style={S.h1}>Exercices & PRs</div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <input style={{...S.input,width:220}} placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div style={{display:"flex",gap:6}}>
          {["All","Strength","CrossFit"].map(c=><button key={c} style={S.navBtn(c===cat)} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
        <button style={{...S.btn("primary"),marginLeft:"auto"}} onClick={()=>{setAdding(true);setEditId(null);setForm({name:"",category:"Strength",subcat:"",muscles:[],pr:0,prUnit:"kg"});}}>+ Exercice</button>
      </div>

      {(adding||editId) && (
        <div style={{...S.card,marginBottom:16,border:`1.5px solid ${C.bordeaux}`}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
            <div><span style={S.label}>Nom</span><input style={S.input} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
            <div><span style={S.label}>Catégorie</span>
              <select style={S.input} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                <option>Strength</option><option>CrossFit</option>
              </select>
            </div>
            <div><span style={S.label}>Sous-catégorie</span><input style={S.input} value={form.subcat} onChange={e=>setForm({...form,subcat:e.target.value})} placeholder="ex: Legs"/></div>
          </div>
          <span style={S.label}>Groupes musculaires</span>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
            {MUSCLE_GROUPS.map(m=><button key={m} onClick={()=>toggleM(m)} style={{...S.btn(form.muscles.includes(m)?"primary":"soft"),padding:"5px 12px",fontSize:12}}>{m}</button>)}
          </div>
          <div style={{display:"flex",gap:8}}><button style={S.btn("primary")} onClick={save}>Sauvegarder</button><button style={S.btn()} onClick={()=>{setAdding(false);setEditId(null);}}>Annuler</button></div>
        </div>
      )}

      {Object.entries(grouped).map(([grp,exs])=>(
        <div key={grp} style={{marginBottom:20}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:2,color:C.textLight,textTransform:"uppercase",marginBottom:8,paddingLeft:4}}>{grp} <span style={{color:C.mauve}}>({exs.length})</span></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:10}}>
            {exs.map(ex=>(
              <div key={ex.id} style={{...S.card,padding:14}}>
                {/* Name + PR badge inline */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div style={{fontWeight:600,fontSize:14,color:C.text,flex:1,lineHeight:1.3}}>{ex.name}</div>
                  {ex.pr>0 ? (
                    <div onClick={()=>{setPrModal(ex.id);setPrForm({pr:ex.pr||"",prUnit:ex.prUnit||"kg"});}} style={{flexShrink:0,marginLeft:8,background:C.bordeaux,borderRadius:8,padding:"4px 9px",cursor:"pointer",textAlign:"center"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:C.white,lineHeight:1}}>{ex.prUnit==="lbs"?ex.pr:ex.pr}<span style={{fontSize:10}}> {ex.prUnit||"kg"}</span></div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.mauveLight,marginTop:1}}>🏆 PR</div>
                    </div>
                  ) : (
                    <div onClick={()=>{setPrModal(ex.id);setPrForm({pr:"",prUnit:"kg"});}} style={{flexShrink:0,marginLeft:8,background:C.creamDark,borderRadius:8,padding:"4px 9px",cursor:"pointer",textAlign:"center",border:`1px dashed ${C.mauve}`}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight}}>🏆 PR</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.textLight,marginTop:1}}>à saisir</div>
                    </div>
                  )}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                  {(ex.muscles||[]).map(m=><span key={m} style={{background:C.creamDark,borderRadius:4,padding:"2px 7px",fontSize:9,fontFamily:"'DM Mono',monospace",color:C.textLight}}>{m}</span>)}
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  <button style={{...S.btn(),padding:"4px 10px",fontSize:11}} onClick={()=>{setEditId(ex.id);setAdding(false);setForm({name:ex.name,category:ex.category,subcat:ex.subcat||"",muscles:ex.muscles||[],pr:ex.pr||0,prUnit:ex.prUnit||"kg"});}}>Modifier</button>
                  <button style={{...S.btn("danger"),padding:"4px 10px",fontSize:11}} onClick={()=>setExercises(p=>p.filter(e=>e.id!==ex.id))}>×</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* PR Modal – always centered in viewport */}
      {prModal && prEx && (
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(58,40,48,0.5)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{...S.card,width:360,border:`2px solid ${C.bordeaux}`,boxShadow:"0 20px 60px rgba(58,40,48,0.3)"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:C.bordeaux,marginBottom:4}}>🏆 Record personnel</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.textLight,marginBottom:20}}>{prEx.name}</div>
            <span style={S.label}>Poids (1RM ou meilleur set)</span>
            <div style={{display:"flex",gap:10,marginBottom:16}}>
              <input style={S.input} type="number" placeholder="ex: 100" value={prForm.pr} onChange={e=>setPrForm({...prForm,pr:e.target.value})}/>
              <select style={{...S.input,width:90}} value={prForm.prUnit} onChange={e=>setPrForm({...prForm,prUnit:e.target.value})}>
                <option value="kg">kg</option><option value="lbs">lbs</option>
              </select>
            </div>
            {prForm.pr && (
              <div style={{background:C.creamDark,borderRadius:8,padding:"8px 12px",marginBottom:16,fontFamily:"'DM Mono',monospace",fontSize:11,color:C.textLight}}>
                = {prForm.prUnit==="kg"?`${kgToLbs(Number(prForm.pr))} lbs`:`${lbsToKg(Number(prForm.pr))} kg`}
              </div>
            )}
            <div style={{display:"flex",gap:8}}><button style={S.btn("primary")} onClick={savePR}>Enregistrer</button><button style={S.btn()} onClick={()=>setPrModal(null)}>Annuler</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WORKOUTS TAB ────────────────────────────────────────────────────────────
function WorkoutsTab({workouts,setWorkouts,exercises,calendar,setCalendar}) {
  const [view,setView]=useState("list");
  const [selId,setSelId]=useState(null);
  const [editId,setEditId]=useState(null);
  const [filterCat,setFilterCat]=useState("All");
  const [form,setForm]=useState({name:"",type:"strength",date:new Date().toISOString().split("T")[0],unit:"kg",label:""});
  const [wExs,setWExs]=useState([]);
  const [runForm,setRunForm]=useState({distance:"",duration:"",elevation:"",pace:"",intervals:"",restTime:""});
  const [openGroups,setOpenGroups]=useState({strength:true,crossfit:true,trail:true,run:true,interval:true});
  const sel=workouts.find(w=>w.id===selId);

  const save=()=>{
    const run=isRun(form.type);
    const w={id:editId||Date.now(),name:form.name||TYPE_LABEL[form.type]||"Séance",date:form.date,type:form.type,unit:form.unit,label:form.label,favorite:editId?(workouts.find(x=>x.id===editId)?.favorite||false):false,...(run?runForm:{exercises:wExs})};
    if(editId) setWorkouts(p=>p.map(x=>x.id===editId?w:x));
    else { setWorkouts(p=>[...p,w]); setCalendar(p=>[...p.filter(c=>c.date!==form.date),{date:form.date,workoutId:w.id}]); }
    setView("list"); setEditId(null);
  };

  const startEdit=w=>{
    setEditId(w.id);
    setForm({name:w.name,type:w.type,date:w.date,unit:w.unit||"kg",label:w.label||""});
    if(isRun(w.type)) setRunForm({distance:w.distance||"",duration:w.duration||"",elevation:w.elevation||"",pace:w.pace||"",intervals:w.intervals||"",restTime:w.restTime||""});
    else setWExs(w.exercises||[]);
    setView("create");
  };

  const toggleFav=id=>setWorkouts(p=>p.map(w=>w.id===id?{...w,favorite:!w.favorite}:w));
  const filtered=workouts.filter(w=>filterCat==="All"||(filterCat==="strength"&&w.type==="strength")||(filterCat==="crossfit"&&w.type==="crossfit")||(filterCat==="cardio"&&isRun(w.type)));
  const sorted=[...filtered].sort((a,b)=>{if(a.favorite&&!b.favorite)return -1;if(!a.favorite&&b.favorite)return 1;return new Date(b.date)-new Date(a.date);});
  const grouped=sorted.reduce((acc,w)=>{if(!acc[w.type])acc[w.type]=[];acc[w.type].push(w);return acc;},{});

  if(view==="detail"&&sel) {
    const run=isRun(sel.type);
    return (
      <div className="fade-in">
        <button style={{...S.btn(),marginBottom:20}} onClick={()=>setView("list")}>← Retour</button>
        <div style={{display:"flex",alignItems:"baseline",gap:16,marginBottom:24,flexWrap:"wrap"}}>
          <div style={S.h1}>{sel.name}</div>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.textLight}}>{fmtDate(sel.date)}</span>
          {sel.label && <span style={{background:C.creamDark,borderRadius:6,padding:"3px 10px",fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{sel.label}</span>}
        </div>
        {run ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12}}>
            {[["Distance",`${sel.distance} km`],["Durée",`${sel.duration} min`],sel.elevation&&["D+",`${sel.elevation} m`],sel.pace&&["Allure",sel.pace+"/km"],sel.intervals&&["Fractions",sel.intervals],sel.restTime&&["Récup.",sel.restTime]].filter(Boolean).map(([l,v])=>(
              <div key={l} style={S.card}><span style={S.label}>{l}</span><div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.bordeaux}}>{v}</div></div>
            ))}
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {(sel.exercises||[]).map((se,i)=>{
              const ex=exercises.find(e=>e.id===se.exId);
              const maxRM=se.sets.length?Math.max(...se.sets.map(s=>calcRM(s.weight,s.reps))):0;
              return (
                <div key={i} style={S.card}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                    <div style={{fontWeight:600,color:C.text}}>{ex?.name}</div>
                    {maxRM>0 && <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.textLight}}>1RM ~ <span style={{color:C.bordeaux}}>{sel.unit==="lbs"?kgToLbs(maxRM):maxRM}{sel.unit||"kg"}</span></div>}
                  </div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {se.sets.map((s,j)=>(
                      <div key={j} style={{background:C.creamDark,borderRadius:8,padding:"8px 14px",textAlign:"center"}}>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:500,color:C.text}}>{sel.unit==="lbs"?kgToLbs(s.weight):s.weight}{sel.unit||"kg"}</div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>× {s.reps}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if(view==="create") {
    const run=isRun(form.type);
    return (
      <div className="fade-in">
        <button style={{...S.btn(),marginBottom:20}} onClick={()=>{setView("list");setEditId(null);}}>← Retour</button>
        <div style={S.h1}>{editId?"Modifier la séance":"Nouvelle séance"}</div>
        <div style={{...S.card,marginBottom:16}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12}}>
            <div><span style={S.label}>Nom</span><input style={S.input} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="ex: Lower A"/></div>
            <div><span style={S.label}>Type</span>
              <select style={S.input} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                <option value="strength">Musculation</option>
                <option value="crossfit">CrossFit</option>
                <option value="trail">Trail</option>
                <option value="run">Course à pieds</option>
                <option value="interval">Fractionné</option>
              </select>
            </div>
            <div><span style={S.label}>Label (Full Body / Lower…)</span><input style={S.input} value={form.label} onChange={e=>setForm({...form,label:e.target.value})} placeholder="ex: Lower"/></div>
            <div><span style={S.label}>Date</span><input style={S.input} type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
            {!run && <div><span style={S.label}>Unité</span><select style={S.input} value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})}><option value="kg">kg</option><option value="lbs">lbs</option></select></div>}
          </div>
        </div>
        {!run ? (
          <div>
            {wExs.map((we,ei)=>(
              <div key={ei} style={{...S.card,marginBottom:10}}>
                <div style={{display:"flex",gap:10,marginBottom:10,alignItems:"center"}}>
                  <select style={{...S.input,flex:1}} value={we.exId} onChange={e=>setWExs(p=>p.map((w,i)=>i===ei?{...w,exId:Number(e.target.value)}:w))}>
                    {exercises.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                  <button style={{...S.btn("danger"),padding:"6px 12px",fontSize:12}} onClick={()=>setWExs(p=>p.filter((_,i)=>i!==ei))}>×</button>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {we.sets.map((s,si)=>(
                    <div key={si} style={{display:"flex",gap:6,alignItems:"center",background:C.creamDark,borderRadius:8,padding:"6px 10px"}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>S{si+1}</span>
                      <input style={{...S.input,width:65,padding:"4px 8px",fontSize:12}} type="number" placeholder="poids" value={s.weight||""} onChange={e=>setWExs(p=>p.map((w,i)=>i===ei?{...w,sets:w.sets.map((ss,j)=>j===si?{...ss,weight:Number(e.target.value)}:ss)}:w))}/>
                      <span style={{color:C.textLight,fontSize:12}}>×</span>
                      <input style={{...S.input,width:50,padding:"4px 8px",fontSize:12}} type="number" placeholder="reps" value={s.reps||""} onChange={e=>setWExs(p=>p.map((w,i)=>i===ei?{...w,sets:w.sets.map((ss,j)=>j===si?{...ss,reps:Number(e.target.value)}:ss)}:w))}/>
                      <button style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:14}} onClick={()=>setWExs(p=>p.map((w,i)=>i===ei?{...w,sets:w.sets.filter((_,j)=>j!==si)}:w))}>×</button>
                    </div>
                  ))}
                  <button style={{...S.btn("soft"),padding:"6px 12px",fontSize:12}} onClick={()=>setWExs(p=>p.map((w,i)=>i===ei?{...w,sets:[...w.sets,{reps:5,weight:0}]}:w))}>+ Série</button>
                </div>
              </div>
            ))}
            <div style={{display:"flex",gap:10,marginTop:10}}>
              <button style={S.btn()} onClick={()=>setWExs(p=>[...p,{exId:exercises[0]?.id,sets:[{reps:5,weight:0}]}])}>+ Exercice</button>
              <button style={S.btn("primary")} onClick={save}>Sauvegarder</button>
            </div>
          </div>
        ) : (
          <div style={S.card}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><span style={S.label}>Distance (km)</span><input style={S.input} type="number" value={runForm.distance} onChange={e=>setRunForm({...runForm,distance:e.target.value})}/></div>
              <div><span style={S.label}>Durée (min)</span><input style={S.input} type="number" value={runForm.duration} onChange={e=>setRunForm({...runForm,duration:e.target.value})}/></div>
              <div><span style={S.label}>Allure (min/km)</span><input style={S.input} placeholder="ex: 5:30" value={runForm.pace} onChange={e=>setRunForm({...runForm,pace:e.target.value})}/></div>
              {form.type==="trail" && <div><span style={S.label}>Dénivelé+ (m)</span><input style={S.input} type="number" value={runForm.elevation} onChange={e=>setRunForm({...runForm,elevation:e.target.value})}/></div>}
              {form.type==="interval" && <>
                <div><span style={S.label}>Fractions (ex: 10×400m)</span><input style={S.input} value={runForm.intervals} onChange={e=>setRunForm({...runForm,intervals:e.target.value})}/></div>
                <div><span style={S.label}>Récupération</span><input style={S.input} placeholder="ex: 90s" value={runForm.restTime} onChange={e=>setRunForm({...runForm,restTime:e.target.value})}/></div>
              </>}
            </div>
            <button style={{...S.btn("primary"),marginTop:16}} onClick={save}>Sauvegarder</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={S.h1}>Séances</div>
        <button style={S.btn("primary")} onClick={()=>{setView("create");setForm({name:"",type:"strength",date:new Date().toISOString().split("T")[0],unit:"kg",label:""});setWExs([]);setRunForm({distance:"",duration:"",elevation:"",pace:"",intervals:"",restTime:""});}}>+ Nouvelle</button>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {[["All","Tout"],["strength","🏋️ Muscu"],["crossfit","⚡ CrossFit"],["cardio","🏃 Cardio"]].map(([v,l])=>(
          <button key={v} style={S.navBtn(filterCat===v)} onClick={()=>setFilterCat(v)}>{l}</button>
        ))}
      </div>
      {Object.entries(grouped).map(([type,ws])=>(
        <div key={type} style={{marginBottom:16}}>
          <button onClick={()=>setOpenGroups(p=>({...p,[type]:!p[type]}))} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",background:C.creamDark,border:"none",borderRadius:10,padding:"10px 16px",cursor:"pointer",marginBottom:openGroups[type]?8:0}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:C.text,fontWeight:600}}>{TYPE_EMOJI[type]} {TYPE_LABEL[type]||type} <span style={{color:C.textLight,fontWeight:400}}>({ws.length})</span></span>
            <span style={{color:C.textLight,fontSize:12}}>{openGroups[type]?"▲":"▼"}</span>
          </button>
          {openGroups[type] && ws.map(w=>(
            <div key={w.id} style={{...S.card,display:"flex",alignItems:"center",gap:14,marginBottom:8,cursor:"pointer",borderLeft:`4px solid ${TYPE_COLOR[w.type]||C.mauve}`}} onClick={()=>{setSelId(w.id);setView("detail");}}>
              <button style={{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:0,flexShrink:0}} onClick={e=>{e.stopPropagation();toggleFav(w.id);}}>{w.favorite?"⭐":"☆"}</button>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:14,color:C.text,marginBottom:3}}>{w.name} {w.label&&<span style={{background:C.creamDark,borderRadius:4,padding:"1px 7px",fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight,fontWeight:400}}>{w.label}</span>}</div>
                <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{fmtDate(w.date)}</span>
                  {isRun(w.type)&&w.distance&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:TYPE_COLOR[w.type]}}>{w.distance}km</span>}
                  {!isRun(w.type)&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{w.exercises?.length||0} ex.</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:8}} onClick={e=>e.stopPropagation()}>
                <button style={{...S.btn(),padding:"5px 12px",fontSize:12}} onClick={()=>startEdit(w)}>Modifier</button>
                <button style={{...S.btn("danger"),padding:"5px 12px",fontSize:12}} onClick={()=>{setWorkouts(p=>p.filter(x=>x.id!==w.id));setCalendar(p=>p.filter(c=>c.workoutId!==w.id));}}>Suppr.</button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── CALENDAR TAB ────────────────────────────────────────────────────────────
function CalendarTab({calendar,setCalendar,workouts,setWorkouts,exercises,races}) {
  const today=new Date();
  const [month,setMonth]=useState(today.getMonth());
  const [year,setYear]=useState(today.getFullYear());
  const [logModal,setLogModal]=useState(null);
  const [editModal,setEditModal]=useState(null);
  const [detailModal,setDetailModal]=useState(null);
  const [editForm,setEditForm]=useState({name:"",description:"",distance:"",duration:"",elevation:"",pace:"",label:""});

  const daysInMonth=new Date(year,month+1,0).getDate();
  const firstDay=new Date(year,month,1).getDay();
  const offset=firstDay===0?6:firstDay-1;
  const monthName=new Date(year,month).toLocaleDateString("fr-FR",{month:"long",year:"numeric"});
  const calMap={};calendar.forEach(c=>{calMap[c.date]=c.workoutId;});
  const raceMap={};races.forEach(r=>{raceMap[r.date]=r;});

  // log modal state: "pick" = choose existing | "create" = create new
  const [logMode,setLogMode]=useState("pick");
  const [logSearch,setLogSearch]=useState("");
  const [newForm,setNewForm]=useState({name:"",type:"strength",label:"",unit:"kg",distance:"",duration:"",elevation:"",pace:"",description:""});

  const resetLog=()=>{setLogModal(null);setLogMode("pick");setLogSearch("");setNewForm({name:"",type:"strength",label:"",unit:"kg",distance:"",duration:"",elevation:"",pace:"",description:""});};

  const assignExisting=(w)=>{
    // link existing workout to this date (copy with new date instance)
    const copy={...w,id:Date.now(),date:logModal};
    setWorkouts(p=>[...p,copy]);
    setCalendar(p=>[...p.filter(c=>c.date!==logModal),{date:logModal,workoutId:copy.id}]);
    resetLog();
  };

  const saveNewWorkout=()=>{
    const run=isRun(newForm.type);
    const w={id:Date.now(),name:newForm.name||(TYPE_LABEL[newForm.type]||"Séance"),date:logModal,type:newForm.type,label:newForm.label,unit:newForm.unit,description:newForm.description,favorite:false,...(run?{distance:newForm.distance,duration:newForm.duration,elevation:newForm.elevation,pace:newForm.pace}:{exercises:[]})};
    setWorkouts(p=>[...p,w]);
    setCalendar(p=>[...p.filter(c=>c.date!==logModal),{date:logModal,workoutId:w.id}]);
    resetLog();
  };

  const openEdit=wId=>{
    const w=workouts.find(x=>x.id===wId);
    if(!w) return;
    setEditForm({name:w.name,description:w.description||"",distance:w.distance||"",duration:w.duration||"",elevation:w.elevation||"",pace:w.pace||"",label:w.label||""});
    setEditModal(wId);
  };

  const saveEdit=()=>{
    setWorkouts(p=>p.map(w=>w.id===editModal?{...w,...editForm}:w));
    setEditModal(null);
  };

  const detailW=detailModal?workouts.find(w=>w.id===calMap[detailModal]):null;
  const detailRace=detailModal?raceMap[detailModal]:null;

  return (
    <div className="fade-in">
      <div style={S.h1}>Calendrier</div>
      <div style={S.card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <button style={S.btn()} onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}}>←</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600,textTransform:"capitalize",color:C.text}}>{monthName}</div>
          <button style={S.btn()} onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}}>→</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:6}}>
          {["Lu","Ma","Me","Je","Ve","Sa","Di"].map(d=><div key={d} style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight,textAlign:"center",padding:"4px 0"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
          {Array.from({length:offset}).map((_,i)=><div key={"e"+i}/>)}
          {Array.from({length:daysInMonth},(_,i)=>i+1).map(day=>{
            const d=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            const wId=calMap[d]; const w=wId?workouts.find(x=>x.id===wId):null;
            const race=raceMap[d];
            const isToday=d===today.toISOString().split("T")[0];
            return (
              <div key={day} style={{minHeight:70,borderRadius:10,padding:"6px 6px",cursor:"pointer",background:race?"#f0e8d0":w?`${TYPE_COLOR[w.type]||C.bordeaux}18`:C.creamDark,border:isToday?`2px solid ${C.bordeaux}`:"2px solid transparent",transition:"all 0.15s"}}
                onClick={()=>w||race ? setDetailModal(d) : setLogModal(d)}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:isToday?C.bordeaux:C.textLight,fontWeight:isToday?"600":"400",marginBottom:2}}>{day}</div>
                {race && <div style={{fontSize:10,color:"#b8960a"}}>🏁</div>}
                {w && (
                  <>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,fontWeight:700,color:TYPE_COLOR[w.type]||C.bordeaux,lineHeight:1.4,marginTop:2,textTransform:"uppercase",letterSpacing:0.5}}>
                      {TYPE_LABEL[w.type]||w.type}
                    </div>
                    {w.label && (
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:7,color:C.textLight,lineHeight:1.3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {w.label}
                      </div>
                    )}
                    {isRun(w.type)&&w.distance && <div style={{fontFamily:"'DM Mono',monospace",fontSize:7,color:TYPE_COLOR[w.type]}}>{w.distance}km</div>}
                  </>
                )}
                {!w&&!race&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:7,color:C.textLight,marginTop:4,opacity:0.4}}>+ log</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* LOG MODAL – pick existing or create new */}
      {logModal && (
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(58,40,48,0.5)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{...S.card,width:480,maxHeight:"88vh",overflowY:"auto",border:`2px solid ${C.bordeaux}`,display:"flex",flexDirection:"column",gap:0}}>

            {/* Header */}
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:C.bordeaux,marginBottom:4}}>
                {fmtDate(logModal)}
              </div>
              {/* Mode tabs */}
              <div style={{display:"flex",gap:6,marginTop:12}}>
                <button style={{...S.navBtn(logMode==="pick"),flex:1,textAlign:"center"}} onClick={()=>setLogMode("pick")}>
                  📋 Séance existante
                </button>
                <button style={{...S.navBtn(logMode==="create"),flex:1,textAlign:"center"}} onClick={()=>setLogMode("create")}>
                  ✨ Nouvelle séance
                </button>
              </div>
            </div>

            {/* ── MODE PICK ── */}
            {logMode==="pick" && (
              <div>
                <input style={{...S.input,marginBottom:12}} placeholder="🔍 Rechercher une séance..." value={logSearch} onChange={e=>setLogSearch(e.target.value)}/>
                <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:360,overflowY:"auto"}}>
                  {workouts
                    .filter(w=>w.name.toLowerCase().includes(logSearch.toLowerCase())||w.label?.toLowerCase().includes(logSearch.toLowerCase()))
                    .sort((a,b)=>{if(a.favorite&&!b.favorite)return -1;if(!a.favorite&&b.favorite)return 1;return new Date(b.date)-new Date(a.date);})
                    .map(w=>(
                    <div key={w.id} onClick={()=>assignExisting(w)}
                      style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,background:C.creamDark,cursor:"pointer",border:`1.5px solid transparent`,transition:"all 0.15s"}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=C.bordeaux}
                      onMouseLeave={e=>e.currentTarget.style.borderColor="transparent"}
                    >
                      <span style={{fontSize:20,flexShrink:0}}>{TYPE_EMOJI[w.type]||"🏋️"}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:600,fontSize:14,color:C.text,marginBottom:2}}>{w.name} {w.favorite&&"⭐"}</div>
                        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,background:`${TYPE_COLOR[w.type]||C.bordeaux}20`,color:TYPE_COLOR[w.type]||C.bordeaux,borderRadius:4,padding:"1px 6px"}}>{TYPE_LABEL[w.type]||w.type}</span>
                          {w.label&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight}}>{w.label}</span>}
                          {isRun(w.type)&&w.distance&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight}}>{w.distance}km</span>}
                          {!isRun(w.type)&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight}}>{w.exercises?.length||0} ex.</span>}
                        </div>
                      </div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight,flexShrink:0}}>{fmtDate(w.date)}</div>
                    </div>
                  ))}
                  {workouts.filter(w=>w.name.toLowerCase().includes(logSearch.toLowerCase())).length===0&&(
                    <div style={{textAlign:"center",color:C.textLight,padding:24,fontSize:13}}>Aucune séance trouvée</div>
                  )}
                </div>
                <div style={{marginTop:16,paddingTop:12,borderTop:`1px solid ${C.creamDark}`}}>
                  <button style={S.btn()} onClick={resetLog}>Annuler</button>
                </div>
              </div>
            )}

            {/* ── MODE CREATE ── */}
            {logMode==="create" && (
              <div>
                {/* Type */}
                <div style={{marginBottom:12}}>
                  <span style={S.label}>Type de séance</span>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    {[["strength","🏋️ Muscu"],["crossfit","⚡ CrossFit"],["trail","🏔️ Trail"],["run","🏃 Course"],["interval","⏱️ Fractionné"]].map(([v,l])=>(
                      <button key={v} onClick={()=>setNewForm({...newForm,type:v})} style={{...S.btn(newForm.type===v?"primary":"soft"),fontSize:12,padding:"8px"}}>{l}</button>
                    ))}
                  </div>
                </div>
                {/* Name + label */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  <div><span style={S.label}>Nom de la séance</span><input style={S.input} value={newForm.name} onChange={e=>setNewForm({...newForm,name:e.target.value})} placeholder={`ex: ${TYPE_LABEL[newForm.type]} A`}/></div>
                  <div><span style={S.label}>Label (Lower / Upper…)</span><input style={S.input} value={newForm.label} onChange={e=>setNewForm({...newForm,label:e.target.value})}/></div>
                </div>
                {/* Run fields */}
                {isRun(newForm.type) && (
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                    <div><span style={S.label}>Distance km</span><input style={S.input} type="number" value={newForm.distance} onChange={e=>setNewForm({...newForm,distance:e.target.value})}/></div>
                    <div><span style={S.label}>Durée min</span><input style={S.input} type="number" value={newForm.duration} onChange={e=>setNewForm({...newForm,duration:e.target.value})}/></div>
                    {newForm.type==="trail"&&<div><span style={S.label}>D+ (m)</span><input style={S.input} type="number" value={newForm.elevation} onChange={e=>setNewForm({...newForm,elevation:e.target.value})}/></div>}
                    <div><span style={S.label}>Allure min/km</span><input style={S.input} placeholder="ex: 5:30" value={newForm.pace} onChange={e=>setNewForm({...newForm,pace:e.target.value})}/></div>
                  </div>
                )}
                {/* Notes */}
                <div style={{marginBottom:16}}>
                  <span style={S.label}>Ressenti / Notes</span>
                  <textarea style={{...S.input,resize:"vertical",minHeight:60}} value={newForm.description} onChange={e=>setNewForm({...newForm,description:e.target.value})} placeholder="RPE, énergie, notes..."/>
                </div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight,marginBottom:12,background:C.creamDark,borderRadius:8,padding:"8px 12px"}}>
                  ℹ️ Cette séance sera ajoutée à ta bibliothèque et assignée au {fmtDate(logModal)}.
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button style={S.btn("primary")} onClick={saveNewWorkout}>Créer & logger</button>
                  <button style={S.btn()} onClick={resetLog}>Annuler</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL – type-aware */}
      {editModal && (()=>{
        const ew=workouts.find(w=>w.id===editModal);
        if(!ew) return null;
        const run=isRun(ew.type);
        const strength=["strength","crossfit"].includes(ew.type);
        return (
          <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(58,40,48,0.5)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
            <div style={{...S.card,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",border:`2px solid ${C.mauve}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <span style={{fontSize:22}}>{TYPE_EMOJI[ew.type]}</span>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:C.text}}>Modifier la séance</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:TYPE_COLOR[ew.type]||C.bordeaux,textTransform:"uppercase"}}>{TYPE_LABEL[ew.type]}</div>
                </div>
              </div>

              {/* Name + label always */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                <div><span style={S.label}>Nom</span><input style={S.input} value={editForm.name} onChange={e=>setEditForm({...editForm,name:e.target.value})}/></div>
                <div><span style={S.label}>Label</span><input style={S.input} value={editForm.label} onChange={e=>setEditForm({...editForm,label:e.target.value})} placeholder="Lower / Upper…"/></div>
              </div>

              {/* Run fields */}
              {run && (
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                  <div><span style={S.label}>Distance km</span><input style={S.input} type="number" value={editForm.distance} onChange={e=>setEditForm({...editForm,distance:e.target.value})}/></div>
                  <div><span style={S.label}>Durée min</span><input style={S.input} type="number" value={editForm.duration} onChange={e=>setEditForm({...editForm,duration:e.target.value})}/></div>
                  {ew.type==="trail" && <div><span style={S.label}>D+ (m)</span><input style={S.input} type="number" value={editForm.elevation} onChange={e=>setEditForm({...editForm,elevation:e.target.value})}/></div>}
                  <div><span style={S.label}>Allure min/km</span><input style={S.input} placeholder="ex: 5:30" value={editForm.pace} onChange={e=>setEditForm({...editForm,pace:e.target.value})}/></div>
                </div>
              )}

              {/* Strength: show exercises */}
              {strength && (
                <div style={{marginBottom:12}}>
                  <span style={S.label}>Exercices ({ew.exercises?.length||0})</span>
                  {(ew.exercises||[]).length===0 ? (
                    <div style={{color:C.textLight,fontSize:13,padding:"8px 0"}}>Aucun exercice — ajoute-en via l'onglet Séances</div>
                  ) : (
                    <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:160,overflowY:"auto"}}>
                      {(ew.exercises||[]).map((se,i)=>{
                        const ex=exercises.find(e=>e.id===se.exId);
                        return (
                          <div key={i} style={{background:C.creamDark,borderRadius:8,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <span style={{fontSize:13,fontWeight:600,color:C.text}}>{ex?.name||"Exercice"}</span>
                            <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{se.sets.length} séries</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Notes always */}
              <div style={{marginBottom:16}}>
                <span style={S.label}>Ressenti / Notes</span>
                <textarea style={{...S.input,resize:"vertical",minHeight:70}} value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})} placeholder="RPE, énergie, sensations..."/>
              </div>

              <div style={{display:"flex",gap:8}}>
                <button style={S.btn("primary")} onClick={saveEdit}>Sauvegarder</button>
                <button style={S.btn()} onClick={()=>setEditModal(null)}>Annuler</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* DETAIL MODAL */}
      {detailModal && (detailW||detailRace) && (
        <div style={{position:"fixed",inset:0,background:"rgba(58,40,48,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{...S.card,width:420,border:`2px solid ${C.mauveLight}`}}>
            {detailRace && (
              <div style={{marginBottom:detailW?16:0}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:2,color:"#b8960a",marginBottom:4}}>🏁 COURSE PRÉVUE</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:C.text,marginBottom:4}}>{detailRace.name}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.textLight}}>{detailRace.distance}km · {detailRace.type}{detailRace.notes?` · ${detailRace.notes}`:""}</div>
                {detailRace.goal && <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.bordeaux,marginTop:4}}>Objectif: {detailRace.goal}</div>}
              </div>
            )}
            {detailW && (
              <div>
                {detailRace && <div style={{borderTop:`1px solid ${C.mauveLight}`,marginTop:12,paddingTop:12}}/>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:C.text}}>{detailW.name}</div>
                    {detailW.label && <span style={{background:C.creamDark,borderRadius:4,padding:"2px 8px",fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{detailW.label}</span>}
                  </div>
                  <button style={{...S.btn("soft"),padding:"5px 12px",fontSize:12}} onClick={()=>{setDetailModal(null);openEdit(detailW.id);}}>✏️ Modifier</button>
                </div>
                {detailW.description && <div style={{fontSize:13,color:C.text,fontStyle:"italic",margin:"8px 0",background:C.creamDark,borderRadius:8,padding:"10px 12px",lineHeight:1.6}}>{detailW.description}</div>}
                {isRun(detailW.type) && <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.textLight}}>{detailW.distance}km · {detailW.duration}min{detailW.pace?` · ${detailW.pace}/km`:""}{detailW.elevation?` · D+ ${detailW.elevation}m`:""}</div>}
                {!isRun(detailW.type) && <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:C.textLight}}>{detailW.exercises?.length||0} exercices</div>}
              </div>
            )}
            <button style={{...S.btn(),marginTop:16}} onClick={()=>setDetailModal(null)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RACES TAB ───────────────────────────────────────────────────────────────
function RacesTab({races,setRaces}) {
  const [adding,setAdding]=useState(false);
  const [editId,setEditId]=useState(null);
  const [form,setForm]=useState({name:"",date:"",distance:"",type:"trail",notes:"",goal:""});
  const sorted=[...races].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const save=()=>{
    const r={...form,distance:Number(form.distance)};
    if(editId){setRaces(p=>p.map(x=>x.id===editId?{...x,...r}:x));setEditId(null);}
    else{setRaces(p=>[...p,{id:Date.now(),...r}]);setAdding(false);}
    setForm({name:"",date:"",distance:"",type:"trail",notes:"",goal:""});
  };
  const startEdit=r=>{setEditId(r.id);setAdding(false);setForm({name:r.name,date:r.date,distance:r.distance,type:r.type,notes:r.notes||"",goal:r.goal||""}); };
  return (
    <div className="fade-in">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={S.h1}>Courses à venir</div>
        {!adding&&!editId&&<button style={S.btn("primary")} onClick={()=>{setAdding(true);setEditId(null);}}>+ Ajouter</button>}
      </div>
      {(adding||editId) && (
        <div style={{...S.card,marginBottom:16,border:`2px solid ${C.bordeaux}`}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div style={{gridColumn:"1/-1"}}><span style={S.label}>Nom</span><input style={S.input} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="ex: Marathon de Paris"/></div>
            <div><span style={S.label}>Date</span><input style={S.input} type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div>
            <div><span style={S.label}>Distance (km)</span><input style={S.input} type="number" value={form.distance} onChange={e=>setForm({...form,distance:e.target.value})}/></div>
            <div><span style={S.label}>Type</span><select style={S.input} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value="trail">Trail</option><option value="run">Route</option><option value="ultra">Ultra</option></select></div>
            <div><span style={S.label}>Objectif</span><input style={S.input} value={form.goal} onChange={e=>setForm({...form,goal:e.target.value})} placeholder="ex: Sub-4h"/></div>
            <div style={{gridColumn:"1/-1"}}><span style={S.label}>Notes</span><input style={S.input} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="D+, terrain, équipement..."/></div>
          </div>
          <div style={{display:"flex",gap:8}}><button style={S.btn("primary")} onClick={save}>{editId?"Modifier":"Ajouter"}</button><button style={S.btn()} onClick={()=>{setAdding(false);setEditId(null);}}>Annuler</button></div>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {sorted.map(race=>{
          const days=daysUntil(race.date); const past=days<0;
          return (
            <div key={race.id} style={{...S.card,display:"flex",alignItems:"center",gap:20,opacity:past?0.5:1,borderLeft:`4px solid ${past?C.mauve:days<=14?C.bordeaux:C.chocoLight}`}}>
              <div style={{minWidth:64,textAlign:"center",background:past?C.creamDark:days<=14?C.bordeaux:C.creamDark,borderRadius:12,padding:"10px 6px",flexShrink:0}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:past?13:24,fontWeight:700,color:past?C.textLight:days<=14?C.white:C.bordeaux,lineHeight:1}}>{past?"Passé":days===0?"Auj.":days}</div>
                {!past&&days>0&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:days<=14?C.mauveLight:C.textLight}}>jours</div>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:15,color:C.text,marginBottom:4}}>{race.name}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{fmtDate(race.date)}</span>
                  <span style={{background:C.creamDark,borderRadius:4,padding:"2px 8px",fontSize:10,fontFamily:"'DM Mono',monospace",color:C.textLight}}>{race.distance}km · {race.type}</span>
                  {race.goal&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.bordeaux}}>🎯 {race.goal}</span>}
                  {race.notes&&<span style={{fontSize:12,color:C.textLight}}>{race.notes}</span>}
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <button style={{...S.btn(),padding:"5px 12px",fontSize:12}} onClick={()=>startEdit(race)}>Modifier</button>
                <button style={{...S.btn("danger"),padding:"5px 10px",fontSize:12}} onClick={()=>setRaces(p=>p.filter(r=>r.id!==race.id))}>×</button>
              </div>
            </div>
          );
        })}
        {sorted.length===0&&<div style={{textAlign:"center",color:C.textLight,padding:40}}>Aucune course planifiée</div>}
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({workouts,exercises,races}) {
  const monthAgo=new Date(); monthAgo.setDate(monthAgo.getDate()-30);
  const recent=workouts.filter(w=>new Date(w.date)>=monthAgo);
  const recentRun=recent.filter(w=>isRun(w.type));
  const recentStr=recent.filter(w=>["strength","crossfit"].includes(w.type));
  const totalKm=recentRun.reduce((a,w)=>a+Number(w.distance||0),0);
  const totalD=recentRun.reduce((a,w)=>a+Number(w.elevation||0),0);

  // muscle heatmap
  const muscleCount={};
  MUSCLE_GROUPS.forEach(m=>{muscleCount[m]=0;});
  recentStr.forEach(w=>{(w.exercises||[]).forEach(se=>{const ex=exercises.find(e=>e.id===se.exId);(ex?.muscles||[]).forEach(m=>{muscleCount[m]=(muscleCount[m]||0)+se.sets.length;});});});
  const spiderData=MUSCLE_GROUPS.map(m=>({label:m.length>7?m.slice(0,6)+"…":m,v:muscleCount[m]||0}));
  const maxM=Math.max(...Object.values(muscleCount),1);
  const sortedM=Object.entries(muscleCount).sort((a,b)=>b[1]-a[1]);
  const mostWorked=sortedM.slice(0,3).filter(m=>m[1]>0);
  const leastWorked=sortedM.slice(-3).reverse().filter(m=>m[1]<2);

  // weekly volume
  const weeklyVol=Array.from({length:4},(_,i)=>{
    const end=new Date(); end.setDate(end.getDate()-i*7);
    const start=new Date(end); start.setDate(start.getDate()-7);
    let vol=0;
    workouts.filter(w=>new Date(w.date)>=start&&new Date(w.date)<=end&&["strength","crossfit"].includes(w.type)).forEach(w=>{(w.exercises||[]).forEach(ex=>ex.sets.forEach(s=>{vol+=s.weight*s.reps;}));});
    return {label:i===0?"Cette sem.":i===1?"S-1":i===2?"S-2":"S-3",vol:Math.round(vol)};
  }).reverse();
  const maxVol=Math.max(...weeklyVol.map(w=>w.vol),1);

  const upcomingRaces=[...races].sort((a,b)=>new Date(a.date)-new Date(b.date)).filter(r=>daysUntil(r.date)>=0).slice(0,3);
  const nextRace=upcomingRaces[0];

  // running PRs
  const runPRMap={};
  workouts.filter(w=>["trail","run"].includes(w.type)&&w.distance&&w.duration).forEach(w=>{
    [[5,0.95,1.05],[10,0.95,1.05],[21.1,0.93,1.07],[42.2,0.97,1.03]].forEach(([dist,lo,hi])=>{
      if(Number(w.distance)>=dist*lo&&Number(w.distance)<=dist*hi){
        const pace=Number(w.duration)/Number(w.distance);
        if(!runPRMap[dist]||pace<runPRMap[dist].pace) runPRMap[dist]={pace,duration:Number(w.duration),date:w.date};
      }
    });
  });

  return (
    <div className="fade-in">
      <div style={S.h1}>Dashboard</div>

      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:12,marginBottom:20}}>
        {[["Séances",recent.length,""],["Km courus",totalKm.toFixed(1),"km"],["D+",totalD,"m"],["Prochain",nextRace?daysUntil(nextRace.date)+"j":"—",""]].map(([l,v,u])=>(
          <div key={l} style={S.card}>
            <span style={S.label}>{l}</span>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:C.bordeaux}}>{v}<span style={{fontSize:13,fontWeight:400,color:C.textLight}}> {u}</span></div>
            {l==="Prochain"&&nextRace&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{nextRace.name}</div>}
          </div>
        ))}
      </div>

      {/* Upcoming races */}
      {upcomingRaces.length>0 && (
        <div style={{...S.card,marginBottom:16}}>
          <div style={S.h2}>🏁 Prochaines courses</div>
          {upcomingRaces.map(race=>{
            const d=daysUntil(race.date);
            return (
              <div key={race.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.creamDark}`}}>
                <div style={{minWidth:54,textAlign:"center",background:d<=14?C.bordeaux:C.creamDark,borderRadius:8,padding:"8px 4px"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:d===0?14:22,fontWeight:700,color:d<=14?C.white:C.bordeaux,lineHeight:1}}>{d===0?"Auj.":d}</div>
                  {d>0&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:d<=14?C.mauveLight:C.textLight}}>j</div>}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:14,color:C.text}}>{race.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{fmtDate(race.date)} · {race.distance}km{race.goal?` · 🎯 ${race.goal}`:""}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:16}}>
        <div style={S.card}>
          <div style={S.h2}>Volume muscu – 4 semaines</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:10,height:80,marginTop:12}}>
            {weeklyVol.map((w,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.textLight}}>{w.vol>0?w.vol.toLocaleString():"—"}</div>
                <div style={{width:"100%",background:i===3?C.bordeaux:C.mauveLight,borderRadius:4,height:w.vol>0?`${(w.vol/maxVol)*60}px`:"4px",minHeight:4,transition:"height 0.3s"}}/>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:C.textLight,textAlign:"center"}}>{w.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Spider */}
        <div style={{...S.card,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{...S.h2,alignSelf:"flex-start",marginBottom:12}}>Groupes musculaires</div>
          <Spider data={spiderData}/>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16,marginBottom:16}}>
        {/* Muscle analysis */}
        <div style={S.card}>
          <div style={S.h2}>Analyse musculaire</div>
          {mostWorked.length>0 && (
            <>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:1,color:C.bordeaux,marginBottom:8,marginTop:4}}>✓ LES PLUS TRAVAILLÉS</div>
              {mostWorked.map(([m,v])=>(
                <div key={m} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{flex:1,fontSize:13,color:C.text}}>{m}</div>
                  <div style={{background:C.creamDark,borderRadius:4,height:5,flex:2}}><div style={{background:C.bordeaux,borderRadius:4,height:5,width:`${(v/maxM)*100}%`}}/></div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.bordeaux,minWidth:28,textAlign:"right"}}>{v}s</div>
                </div>
              ))}
            </>
          )}
          {leastWorked.length>0 && (
            <>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:1,color:C.textLight,marginTop:12,marginBottom:8}}>⚠ À PRIORISER</div>
              {leastWorked.map(([m,v])=>(
                <div key={m} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <div style={{flex:1,fontSize:13,color:C.textLight}}>{m}</div>
                  <span style={{background:C.creamDark,borderRadius:4,padding:"2px 8px",fontSize:10,fontFamily:"'DM Mono',monospace",color:C.textLight}}>{v===0?"0 séries":v+" séries"}</span>
                </div>
              ))}
            </>
          )}
        </div>
        {/* Recent */}
        <div style={S.card}>
          <div style={S.h2}>Activités récentes</div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:4}}>
            {[...workouts].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,7).map(w=>(
              <div key={w.id} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:15}}>{TYPE_EMOJI[w.type]}</span>
                <div style={{flex:1,fontSize:13,color:C.text,fontWeight:500}}>{w.name}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:C.textLight}}>{fmtDate(w.date)}</div>
                {isRun(w)&&w.distance&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:C.bordeaux}}>{w.distance}km</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Running PRs – bottom */}
      <div style={S.card}>
        <div style={S.h2}>🏃 Records course à pieds</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))",gap:10,marginTop:8}}>
          {[["5","5 km"],["10","10 km"],["21.1","Semi"],["42.2","Marathon"]].map(([dist,label])=>{
            const pr=runPRMap[Number(dist)];
            return (
              <div key={dist} style={{background:C.creamDark,borderRadius:10,padding:14,textAlign:"center"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:1,color:C.textLight,marginBottom:6}}>{label}</div>
                {pr ? (
                  <>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:C.bordeaux}}>{Math.floor(pr.duration/60)}h{String(Math.round(pr.duration%60)).padStart(2,"0")}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight,marginTop:3}}>{pr.pace.toFixed(2)} min/km</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:C.textLight}}>{fmtDate(pr.date)}</div>
                  </>
                ) : (
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:16,color:C.mauve}}>—</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── USERS & ROOT ────────────────────────────────────────────────────────────
const USERS = [
  {id:"julie",  name:"Julie",   emoji:"🌿"},
  {id:"guest",  name:"Invitée", emoji:"✨"},
];

const TABS=[
  {id:"dashboard", label:"Dashboard", emoji:"📊"},
  {id:"workouts",  label:"Séances",   emoji:"🏋️"},
  {id:"calendar",  label:"Calendrier",emoji:"📅"},
  {id:"exercises", label:"Exercices", emoji:"💪"},
  {id:"rm",        label:"RM",        emoji:"🎯"},
  {id:"races",     label:"Courses",   emoji:"🏁"},
];

function UserSpace({userId,onSwitch}) {
  const user=USERS.find(u=>u.id===userId);
  const [exercises,setExercises]=useState(BASE_EXERCISES);
  const [workouts,setWorkouts]=useState(makeWorkouts());
  const [calendar,setCalendar]=useState([
    {date:"2026-03-03",workoutId:1},{date:"2026-03-05",workoutId:2},
    {date:"2026-03-07",workoutId:3},{date:"2026-03-09",workoutId:4},
  ]);
  const [races,setRaces]=useState(INITIAL_RACES);
  const [tab,setTab]=useState("dashboard");
  const [showMenu,setShowMenu]=useState(false);
  const [showUserMenu,setShowUserMenu]=useState(false);

  // Detect mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:C.cream,minHeight:"100vh",paddingBottom:isMobile?70:0}}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <header style={{background:C.white,borderBottom:`1px solid ${C.mauveLight}`,padding:"0 16px",height:52,display:"flex",alignItems:"center",gap:12,boxShadow:"0 2px 12px rgba(58,40,48,0.06)",position:"sticky",top:0,zIndex:50}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"baseline",gap:6,flexShrink:0}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:C.bordeaux}}>AURA</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:2,color:C.textLight}} className="hide-mobile">STUDIO</span>
        </div>
        <div style={{width:1,height:18,background:C.mauveLight,flexShrink:0}}/>

        {/* Desktop nav */}
        <nav style={{display:"flex",gap:2,flex:1,overflowX:"auto"}} className="hide-mobile">
          {TABS.map(t=><button key={t.id} style={S.navBtn(tab===t.id)} onClick={()=>setTab(t.id)}>{t.label}</button>)}
        </nav>

        {/* Mobile: current tab title */}
        <div style={{flex:1,fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:600,color:C.text}} className="show-mobile-only">
          {TABS.find(t=>t.id===tab)?.label}
        </div>

        {/* User switcher */}
        <div style={{position:"relative",flexShrink:0}}>
          <button onClick={()=>setShowUserMenu(p=>!p)} style={{display:"flex",alignItems:"center",gap:6,background:C.creamDark,border:"none",borderRadius:20,padding:"6px 12px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,color:C.text}}>
            <span>{user.emoji}</span>
            <span className="hide-mobile">{user.name}</span>
            <span style={{fontSize:10,color:C.textLight}}>▼</span>
          </button>
          {showUserMenu && (
            <div style={{position:"absolute",top:"110%",right:0,background:C.white,borderRadius:12,boxShadow:"0 8px 24px rgba(58,40,48,0.15)",border:`1px solid ${C.mauveLight}`,overflow:"hidden",minWidth:150,zIndex:200}}>
              {USERS.map(u=>(
                <button key={u.id} onClick={()=>{onSwitch(u.id);setShowUserMenu(false);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:u.id===userId?C.creamDark:C.white,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:u.id===userId?600:400,color:C.text,textAlign:"left"}}>
                  <span>{u.emoji}</span><span>{u.name}</span>
                  {u.id===userId&&<span style={{marginLeft:"auto",color:C.bordeaux}}>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{padding:"20px 16px",maxWidth:1100,margin:"0 auto"}}>
        {tab==="dashboard"  && <Dashboard    workouts={workouts} exercises={exercises} races={races}/>}
        {tab==="workouts"   && <WorkoutsTab  workouts={workouts} setWorkouts={setWorkouts} exercises={exercises} calendar={calendar} setCalendar={setCalendar}/>}
        {tab==="exercises"  && <ExercisesTab exercises={exercises} setExercises={setExercises}/>}
        {tab==="rm"         && <RMTab        exercises={exercises}/>}
        {tab==="calendar"   && <CalendarTab  calendar={calendar} setCalendar={setCalendar} workouts={workouts} setWorkouts={setWorkouts} exercises={exercises} races={races}/>}
        {tab==="races"      && <RacesTab     races={races} setRaces={setRaces}/>}
      </main>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav style={{display:"none",position:"fixed",bottom:0,left:0,right:0,background:C.white,borderTop:`1px solid ${C.mauveLight}`,zIndex:50,paddingBottom:"env(safe-area-inset-bottom)"}} className="mobile-bottom-nav">
        <style>{`.mobile-bottom-nav{display:flex!important;}@media(min-width:601px){.mobile-bottom-nav{display:none!important;}}`}</style>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 2px",background:"none",border:"none",cursor:"pointer",gap:2}}>
            <span style={{fontSize:18}}>{t.emoji}</span>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:0.5,color:tab===t.id?C.bordeaux:C.textLight,fontWeight:tab===t.id?700:400}}>{t.label}</span>
            {tab===t.id && <div style={{width:16,height:2,background:C.bordeaux,borderRadius:1}}/>}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  const [userId,setUserId]=useState(null);
  if(!userId) return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:C.cream,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <style>{css}</style>
      <div style={{textAlign:"center",marginBottom:48}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:56,fontWeight:700,color:C.bordeaux,lineHeight:1}}>AURA</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,letterSpacing:4,color:C.textLight,marginTop:6}}>LADIES ONLY STUDIO</div>
      </div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
        {USERS.map(u=>(
          <button key={u.id} onClick={()=>setUserId(u.id)}
            style={{background:C.white,border:`2px solid ${C.mauveLight}`,borderRadius:20,padding:"28px 36px",cursor:"pointer",textAlign:"center",boxShadow:"0 4px 24px rgba(58,40,48,0.08)",transition:"all 0.2s",minWidth:140}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.bordeaux;e.currentTarget.style.transform="translateY(-4px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.mauveLight;e.currentTarget.style.transform="none";}}
          >
            <div style={{fontSize:44,marginBottom:12}}>{u.emoji}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.text,marginBottom:4}}>{u.name}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:1,color:C.textLight}}>Mon espace</div>
          </button>
        ))}
      </div>
    </div>
  );
  return <UserSpace userId={userId} onSwitch={setUserId}/>;
}
