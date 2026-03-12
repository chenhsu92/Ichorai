import { useState, useEffect, useRef } from "react";

/* ─── Design tokens ──────────────────────────────────────── */
const C = {
  bg:        "#F4F4F1",
  surface:   "#FFFFFF",
  border:    "#C8C8C0",
  borderDark:"#1A1A18",
  mint:      "#3DC98A",
  mintLight: "#E8F9F1",
  mintDark:  "#1A7A4A",
  sage:      "#7ABFA0",
  ink:       "#1A1A18",
  inkMid:    "#4A4A44",
  inkLight:  "#9A9A90",
};

const MONO = "'DM Mono', 'Courier New', monospace";
const SANS = "'DM Sans', 'Helvetica Neue', sans-serif";

/* ─── Geometry ───────────────────────────────────────────── */
const W = 900, H = 620;
const PAD = 32;

const DT_Y = 28,  DT_H = 238;
const DM_Y = 348, DM_H = 222;

// Digital Twin internals
const OPT_X = 56,  OPT_Y = DT_Y + 46, OPT_W = 298, OPT_H = 172;
const GRP_X = 402, GRP_Y = DT_Y + 46, GRP_W = 410, GRP_H = 172;
const DASH_X = GRP_X + 14, DASH_Y = GRP_Y + 14, DASH_W = 185, DASH_H = 144;
const AGT_X  = GRP_X + 14 + 185 + 10, AGT_Y = GRP_Y + 14, AGT_W = 185, AGT_H = 144;

// Vertical connector
const CONN_X = W / 2, CONN_Y1 = DT_Y + DT_H, CONN_Y2 = DM_Y;

// Data Manager boxes
const BOX_W = 170, BOX_H = 124;
const BOX_Y  = DM_Y + 50;
const BOX_GAP = (W - PAD * 2 - BOX_W * 4) / 3;
const bx = (i) => PAD + i * (BOX_W + BOX_GAP);

/* ─── Sub-components ─────────────────────────────────────── */

function ComponentBox({ x, y, w, h, title, sub, accent, delay = 0, badge }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <g style={{ opacity: show ? 1 : 0, transition: "opacity 0.45s ease" }}>
      {/* Shadow */}
      <rect x={x + 2} y={y + 2} width={w} height={h} rx="3"
        fill={C.borderDark} fillOpacity="0.08" />
      {/* Card */}
      <rect x={x} y={y} width={w} height={h} rx="3"
        fill={C.surface} stroke={C.border} strokeWidth="0.85" />
      {/* Top stripe */}
      <rect x={x} y={y} width={w} height="3.5" rx="1.5"
        fill={accent} />

      {/* Badge */}
      {badge && (
        <g>
          <rect x={x + 10} y={y + 13} width={badge.length * 8.7 + 12} height={22} rx="11"
            fill={accent === C.mint ? C.mintLight : "#F0F0EC"}
            stroke={accent} strokeWidth="0.6" />
          <text x={x + 10 + (badge.length * 8.7 + 12) / 2} y={y + 24}
            textAnchor="middle" dominantBaseline="middle"
            fill={accent === C.mint ? C.mintDark : C.inkMid}
            fontSize="9.75" fontFamily={MONO} fontWeight="500" letterSpacing="1">
            {badge}
          </text>
        </g>
      )}

      {/* Inner grid lines for texture */}
      <line x1={x + 12} y1={y + h - 28} x2={x + w - 12} y2={y + h - 28}
        stroke={C.border} strokeWidth="0.5" strokeOpacity="0.6" />
      <line x1={x + 12} y1={y + h - 18} x2={x + w * 0.6} y2={y + h - 18}
        stroke={C.border} strokeWidth="0.5" strokeOpacity="0.4" />

      {/* Title */}
      <text x={x + w / 2} y={y + h / 2 - (sub ? 9 : 0)}
        textAnchor="middle" dominantBaseline="middle"
        fill={C.ink} fontSize="16.5" fontFamily={SANS} fontWeight="600" letterSpacing="0.2">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 10}
          textAnchor="middle" dominantBaseline="middle"
          fill={C.inkLight} fontSize="11.25" fontFamily={MONO} letterSpacing="0.2">
          {sub}
        </text>
      )}
    </g>
  );
}

function HFlowArrow({ x1, y, x2, color, animClass }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={C.border} strokeWidth="1" />
      <line x1={x1} y1={y} x2={x2} y2={y}
        stroke={color} strokeWidth="1.4" strokeOpacity="0.9"
        strokeDasharray="5 7" className={animClass} />
      <polygon points={`${x2},${y} ${x2 - 7},${y - 3.5} ${x2 - 7},${y + 3.5}`}
        fill={color} fillOpacity="0.9" />
    </g>
  );
}

function InternalArrow({ x1, y, x2, color, label, animClass }) {
  const mx = (x1 + x2) / 2;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={C.border} strokeWidth="0.75" />
      <line x1={x1} y1={y} x2={x2} y2={y}
        stroke={color} strokeWidth="1.3" strokeOpacity="0.9"
        strokeDasharray="4 6" className={animClass} />
      <polygon points={`${x2},${y} ${x2 - 6},${y - 3} ${x2 - 6},${y + 3}`}
        fill={color} fillOpacity="0.9" />
      {label && (
        <g>
          <rect x={mx - label.length * 3.2 - 6} y={y - 11}
            width={label.length * 6.4 + 12} height={14} rx="7"
            fill={C.surface} stroke={C.mint} strokeWidth="0.6" />
          <text x={mx} y={y - 4}
            textAnchor="middle" dominantBaseline="middle"
            fill={C.mintDark} fontSize="9.75" fontFamily={MONO} letterSpacing="0.3">
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

function FannedConnector() {
  const count = 11;
  const spread = 260;
  const paths = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const off = (t - 0.5) * spread;
    const topX = CONN_X + off * 0.2;
    const botX = CONN_X + off;
    const center = Math.abs(i - Math.floor(count / 2)) <= 1;
    return {
      d: `M ${botX} ${CONN_Y2} C ${botX} ${CONN_Y2 - 32}, ${topX} ${CONN_Y1 + 32}, ${topX} ${CONN_Y1}`,
      stroke: center ? C.mint : C.border,
      strokeWidth: center ? "1.5" : "0.8",
      strokeOpacity: center ? 0.95 : 0.55,
      strokeDasharray: center ? "6 7" : "3 9",
      cls: center ? "flow-v-main" : `flow-v-${i % 3}`,
    };
  });

  return (
    <g>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill="none"
          stroke={p.stroke} strokeWidth={p.strokeWidth}
          strokeOpacity={p.strokeOpacity} strokeDasharray={p.strokeDasharray}
          className={p.cls} />
      ))}
      {/* Upward arrow tip */}
      <polygon points={`${CONN_X},${CONN_Y1 + 2} ${CONN_X - 5},${CONN_Y1 + 11} ${CONN_X + 5},${CONN_Y1 + 11}`}
        fill={C.mint} />
      {/* Label pill */}
      <rect x={CONN_X - 56} y={(CONN_Y1 + CONN_Y2) / 2 - 12} width={112} height={24} rx="12"
        fill={C.surface} stroke={C.border} strokeWidth="0.75" />
      <text x={CONN_X} y={(CONN_Y1 + CONN_Y2) / 2}
        textAnchor="middle" dominantBaseline="middle"
        fill={C.inkMid} fontSize="10.5" fontFamily={MONO} letterSpacing="1.5">
        DATA PIPELINE
      </text>
    </g>
  );
}

/* ─── Main export ────────────────────────────────────────── */
export default function IchoraiArchitecture() {
  const [ready, setReady] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    setTimeout(() => setReady(true), 120);
  }, []);

  const handleExport = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const SCALE = 4;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const canvas = document.createElement("canvas");
    canvas.width  = W * SCALE;
    canvas.height = H * SCALE;
    const ctx = canvas.getContext("2d");
    ctx.scale(SCALE, SCALE);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = "ichorai-architecture-4x.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  };

  return (
    <div style={{
      background: "#EAEAE5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      fontFamily: MONO,
    }}>
      <style>{`
        @keyframes dashH  { to { stroke-dashoffset: -100; } }
        @keyframes dashV  { to { stroke-dashoffset: -140; } }
        @keyframes dashI  { to { stroke-dashoffset: -60;  } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @keyframes blink  { 50% { opacity: 0.3; } }

        .flow-h-0 { animation: dashH 2.2s linear infinite 0.0s; }
        .flow-h-1 { animation: dashH 2.2s linear infinite 0.4s; }
        .flow-h-2 { animation: dashH 2.2s linear infinite 0.8s; }
        .flow-int { animation: dashI 1.8s linear infinite; }
        .flow-int2{ animation: dashI 1.8s linear infinite 0.6s; }
        .flow-v-main { animation: dashV 2.8s linear infinite 0.0s; }
        .flow-v-0    { animation: dashV 3.2s linear infinite 0.2s; }
        .flow-v-1    { animation: dashV 3.4s linear infinite 0.6s; }
        .flow-v-2    { animation: dashV 3.6s linear infinite 1.0s; }
        .live { animation: blink 2s ease infinite; }
      `}</style>

      {/* Header */}
      <div style={{
        width: "100%", maxWidth: W,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 18,
        opacity: ready ? 1 : 0, transition: "opacity 0.5s",
      }}>
        <div>
          <p style={{ fontSize: 12.75, color: "#9A9A90", letterSpacing: "3px",
            textTransform: "uppercase", margin: "0 0 5px", fontFamily: MONO }}>
              The 80/20 Framework · System Architecture
          </p>
          <h1 style={{ fontSize: 30, color: C.ink, letterSpacing: "1.5px",
            fontFamily: SANS, fontWeight: 600, margin: 0 }}>
            Ichorai Industrial AI
          </h1>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6,
            fontSize: 11.25, color: C.inkLight, letterSpacing: "2px", fontFamily: MONO }}>
            <span className="live" style={{ width: 6, height: 6, borderRadius: "50%",
              background: C.mint, display: "inline-block" }} />
          </span>
          <button onClick={handleExport} style={{
            background: "none", border: `1px solid ${C.border}`,
            color: C.inkMid, fontSize: 11.25, fontFamily: MONO,
            letterSpacing: "2px", padding: "6px 14px", cursor: "pointer",
            textTransform: "uppercase", borderRadius: 2, transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = C.mint; e.target.style.color = C.mintDark; }}
            onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.inkMid; }}>
            ↓ Export PNG
          </button>
        </div>
      </div>

      {/* Diagram */}
      <svg ref={svgRef} width={W} height={H} viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ background: C.bg, border: `1px solid ${C.border}`, display: "block",
          opacity: ready ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}>

        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill={C.border} fillOpacity="0.45" />
          </pattern>
          <linearGradient id="dtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.mint} stopOpacity="0.055" />
            <stop offset="100%" stopColor={C.mint} stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="dmGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#C89030" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#C89030" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width={W} height={H} fill={C.bg} />
        <rect width={W} height={H} fill="url(#grid)" />

        {/* ══════════════════════════════════════════ */}
        {/* DIGITAL TWIN                               */}
        {/* ══════════════════════════════════════════ */}
        <rect x={PAD} y={DT_Y} width={W - PAD * 2} height={DT_H} rx="4"
          fill="url(#dtGrad)" stroke={C.borderDark} strokeWidth="0.7" strokeOpacity="0.35"
          strokeDasharray="7 5" />

        {/* Section label */}
        <rect x={PAD + 16} y={DT_Y - 14} width={140} height={28} rx="14"
          fill={C.surface} stroke={C.borderDark} strokeWidth="0.7" strokeOpacity="0.45" />
        <text x={PAD + 16 + 70} y={DT_Y + 0.5}
          textAnchor="middle" dominantBaseline="middle"
          fill={C.ink} fontSize="12.75" fontFamily={MONO} fontWeight="500" letterSpacing="2.5">
          DIGITAL TWIN
        </text>

        {/* 20% badge */}
        <rect x={W - PAD - 82} y={DT_Y + 10} width={70} height={20} rx="10"
          fill={C.mintLight} stroke={C.mint} strokeWidth="0.7" />
        <text x={W - PAD - 47} y={DT_Y + 20}
          textAnchor="middle" dominantBaseline="middle"
          fill={C.mintDark} fontSize="10.5" fontFamily={MONO} fontWeight="500" letterSpacing="1">
          20% LAYER
        </text>

        {/* Architecture Optimiser */}
        <ComponentBox x={OPT_X} y={OPT_Y} w={OPT_W} h={OPT_H}
          title="Architecture Optimiser"
          sub="physics-informed SLM · no-code UI"
          badge="CORE ENGINE"
          accent={C.ink} delay={300} />

        {/* Intelligence layer group border */}
        <g style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s 0.25s" }}>
          <rect x={GRP_X} y={GRP_Y} width={GRP_W} height={GRP_H} rx="3"
            fill="none" stroke={C.mint} strokeWidth="0.7"
            strokeDasharray="5 5" strokeOpacity="0.5" />
          {/* Group label */}
          <rect x={GRP_X + 12} y={GRP_Y - 12} width={150} height={24} rx="12"
            fill={C.surface} stroke={C.mint} strokeWidth="0.65" />
          <text x={GRP_X + 12 + 75} y={GRP_Y + 0.5}
            textAnchor="middle" dominantBaseline="middle"
            fill={C.mintDark} fontSize="10.5" fontFamily={MONO} fontWeight="500" letterSpacing="1.5">
            INTELLIGENCE LAYER
          </text>
        </g>

        {/* Dashboard */}
        <ComponentBox x={DASH_X} y={DASH_Y} w={DASH_W} h={DASH_H}
          title="Dashboard" sub="intelligent operations"
          accent={C.mint} delay={450} />

        {/* AI Agents */}
        <ComponentBox x={AGT_X} y={AGT_Y} w={AGT_W} h={AGT_H}
          title="AI Agents" sub="agentic automation"
          accent={C.sage} delay={580} />

        {/* Optimiser → Intelligence group */}
        <InternalArrow x1={OPT_X + OPT_W} y={OPT_Y + OPT_H / 2}
          x2={GRP_X} color={C.inkMid} animClass="flow-int" />

        {/* Dashboard ↔ AI Agents */}
        <InternalArrow x1={DASH_X + DASH_W} y={DASH_Y + DASH_H / 2}
          x2={AGT_X} label="orchestrates" color={C.mint} animClass="flow-int2" />

        {/* DT corner dots */}
        {[[PAD + 14, DT_Y + 14, false], [W - PAD - 14, DT_Y + 14, true]].map(([cx, cy, flip], i) =>
          [0, 1, 2].map(a => [0, 1, 2].map(b => (
            <circle key={`dt-${i}-${a}-${b}`}
              cx={cx + (flip ? -a : a) * 8} cy={cy + b * 8} r="1.2" fill={C.border} />
          )))
        )}

        {/* ══════════════════════════════════════════ */}
        {/* VERTICAL CONNECTOR                         */}
        {/* ══════════════════════════════════════════ */}
        <FannedConnector />

        {/* Side note */}
        <text x={PAD + 16} y={(CONN_Y1 + CONN_Y2) / 2 + 1}
          dominantBaseline="middle"
          fill={C.inkLight} fontSize="10.5" fontFamily={MONO} letterSpacing="0.8">
          80% foundation → 20% intelligence
        </text>

        {/* ══════════════════════════════════════════ */}
        {/* DATA MANAGER                               */}
        {/* ══════════════════════════════════════════ */}
        <rect x={PAD} y={DM_Y} width={W - PAD * 2} height={DM_H} rx="4"
          fill="url(#dmGrad)" stroke={C.borderDark} strokeWidth="0.7" strokeOpacity="0.35"
          strokeDasharray="7 5" />

        {/* Section label */}
        <rect x={PAD + 16} y={DM_Y - 14} width={150} height={28} rx="14"
          fill={C.surface} stroke={C.borderDark} strokeWidth="0.7" strokeOpacity="0.45" />
        <text x={PAD + 16 + 75} y={DM_Y + 0.5}
          textAnchor="middle" dominantBaseline="middle"
          fill={C.ink} fontSize="12.75" fontFamily={MONO} fontWeight="500" letterSpacing="2.5">
          DATA MANAGER
        </text>

        {/* 80% badge */}
        <rect x={W - PAD - 82} y={DM_Y + 10} width={70} height={20} rx="10"
          fill="#FFF8EC" stroke="#C8922A" strokeWidth="0.7" />
        <text x={W - PAD - 47} y={DM_Y + 20}
          textAnchor="middle" dominantBaseline="middle"
          fill="#8A5E10" fontSize="10.5" fontFamily={MONO} fontWeight="500" letterSpacing="1">
          80% LAYER
        </text>

        {/* Pipeline boxes */}
        {[
          { title: "Legacy Data",    sub: "disparate sources",   badge: "INPUT",  accent: C.inkLight },
          { title: "Data Injector",  sub: "digitalisation", badge: null,     accent: C.inkMid  },
          { title: "Data Lake",      sub: "unified substrate",   badge: null,     accent: C.inkMid  },
          { title: "Ichorai Arch.",  sub: "standardised blueprints",  badge: "SELECT", accent: C.mint    },
        ].map((b, i) => (
          <ComponentBox key={i}
            x={bx(i)} y={BOX_Y} w={BOX_W} h={BOX_H}
            title={b.title} sub={b.sub} badge={b.badge}
            accent={b.accent} delay={600 + i * 130} />
        ))}

        {/* Horizontal flow arrows */}
        {[0, 1, 2].map(i => (
          <HFlowArrow key={i}
            x1={bx(i) + BOX_W + 2} y={BOX_Y + BOX_H / 2}
            x2={bx(i + 1) - 2}
            color={i === 2 ? C.mint : C.inkMid}
            animClass={`flow-h-${i}`} />
        ))}



        {/* DM corner dots */}
        {[[PAD + 14, DM_Y + DM_H - 14, false], [W - PAD - 14, DM_Y + DM_H - 14, true]].map(([cx, cy, flip], i) =>
          [0, 1, 2].map(a => [0, 1, 2].map(b => (
            <circle key={`dm-${i}-${a}-${b}`}
              cx={cx + (flip ? -a : a) * 8} cy={cy - b * 8} r="1.2" fill={C.border} />
          )))
        )}

        {/* Footer */}
        <text x={W - PAD} y={H - 11} textAnchor="end"
          fill={C.inkLight} fontSize="9.75" fontFamily={MONO} letterSpacing="0.8">
          ICHORAI · INDUSTRIAL AI PAAS · CONFIDENTIAL
        </text>
        <text x={PAD} y={H - 11}
          fill={C.inkLight} fontSize="9.75" fontFamily={MONO} letterSpacing="0.8">
           
        </text>
      </svg>

      {/* Legend */}
      <div style={{
        width: "100%", maxWidth: W,
        display: "flex", gap: 28, marginTop: 14, flexWrap: "wrap",
        opacity: ready ? 1 : 0, transition: "opacity 0.5s 0.5s",
      }}>
        {[
          { color: C.mint,    label: "Digital Twin — 20% Intelligence Layer" },
          { color: "#C8922A", label: "Data Manager — 80% Foundation Layer"  },
          { color: C.inkMid,  label: "Ichorai Core Engine"                  },
          { color: C.sage,    label: "AI Agent Orchestration"               },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 20, height: 1.5, background: color }} />
             <span style={{ fontSize: 12, color: C.inkLight, letterSpacing: "0.8px", fontFamily: MONO }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
