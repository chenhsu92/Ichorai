import { useState, useEffect, useCallback } from "react";

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:    #070707;
    --white:    #F4F3EF;
    --g900:     #101010;
    --g800:     #1a1a1a;
    --g600:     #3a3a3a;
    --g400:     #777;
    --g200:     #bbb;
    --green:    #5aff8f;
    --amber:    #ffb84d;
    --fd: 'Bebas Neue', sans-serif;
    --fm: 'DM Mono', monospace;
    --fs: 'Playfair Display', serif;
    --nav: 64px;
  }

  html { scroll-behavior: smooth; }
  body { background: var(--black); color: var(--white); font-family: var(--fm); overflow-x: hidden; }
  ::selection { background: var(--white); color: var(--black); }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--g600); }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes scanline { 0% { top:-4%; } 100% { top:104%; } }
  @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }

  .fu  { animation: fadeUp 0.65s ease both; }
  .fi  { animation: fadeIn 0.9s ease both; }

  .tag {
    font-family: var(--fm); font-size: 10px; letter-spacing: 0.26em;
    text-transform: uppercase; color: var(--g400);
    display: flex; align-items: center; gap: 12px;
  }
  .tag::before { content:''; display:block; width:28px; height:1px; background:var(--g400); }

  .gbg {
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .card {
    border: 1px solid rgba(255,255,255,0.07);
    transition: border-color 0.25s;
  }
  .card:hover { border-color: rgba(255,255,255,0.2); }

  .btn-p {
    background: var(--white); color: var(--black);
    border: none; padding: 13px 32px;
    font-family: var(--fm); font-size: 11px; letter-spacing: 0.16em;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .btn-p:hover { background: var(--black); color: var(--white); outline: 1px solid var(--white); }

  .btn-g {
    background: transparent; color: var(--white);
    border: 1px solid rgba(255,255,255,0.18); padding: 13px 32px;
    font-family: var(--fm); font-size: 11px; letter-spacing: 0.16em;
    text-transform: uppercase; cursor: pointer; transition: border-color 0.2s;
  }
  .btn-g:hover { border-color: var(--white); }
`;

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <polygon points="14,2 26,26 2,26" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <polygon points="14,8 20,22 8,22" fill="currentColor"/>
    </svg>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const links = [
    { id:"home", label:"Home" }, { id:"platform", label:"Platform" },
    { id:"sectors", label:"Sectors" }, { id:"research", label:"Research" },
    { id:"people", label:"People" }, { id:"careers", label:"Careers" },
    { id:"contact", label:"Contact" },
  ];

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      height:"var(--nav)", padding:"0 48px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background: scrolled ? "rgba(7,7,7,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      transition:"background 0.4s, border-color 0.4s",
    }}>
      <button onClick={() => navigate("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", color:"var(--white)" }}>
        <Logo size={24}/><span style={{ fontFamily:"var(--fd)", fontSize:"21px", letterSpacing:"0.13em" }}>ICHORAI</span>
      </button>

      <div style={{ display:"flex", gap:"28px", alignItems:"center" }}>
        {links.slice(1).map(l => (
          <button key={l.id} onClick={() => navigate(l.id)} style={{
            background:"none", border:"none",
            color: page===l.id ? "var(--white)" : "var(--g400)",
            fontFamily:"var(--fm)", fontSize:"11px", letterSpacing:"0.14em",
            textTransform:"uppercase", cursor:"pointer", padding:"4px 0",
            borderBottom: page===l.id ? "1px solid var(--white)" : "1px solid transparent",
            transition:"color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color="var(--white)"}
            onMouseLeave={e => e.currentTarget.style.color = page===l.id ? "var(--white)" : "var(--g400)"}
          >{l.label}</button>
        ))}
        <button className="btn-p" onClick={() => navigate("contact")} style={{ padding:"8px 20px", fontSize:"10px" }}>Get In Touch</button>
      </div>
    </nav>
  );
}

// ─── PAGE HEADER ──────────────────────────────────────────────────────────────
function PageHeader({ tag, title, sub }) {
  return (
    <div className="gbg" style={{
      padding:"calc(var(--nav) + 72px) 48px 72px",
      borderBottom:"1px solid rgba(255,255,255,0.06)", position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", animation:"scanline 7s linear infinite", pointerEvents:"none" }}/>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ position:"absolute", top:i<2?"18px":"auto", bottom:i>=2?"18px":"auto", left:i%2===0?"18px":"auto", right:i%2===1?"18px":"auto", width:"16px", height:"16px", borderTop:i<2?"1px solid rgba(255,255,255,0.14)":"none", borderBottom:i>=2?"1px solid rgba(255,255,255,0.14)":"none", borderLeft:i%2===0?"1px solid rgba(255,255,255,0.14)":"none", borderRight:i%2===1?"1px solid rgba(255,255,255,0.14)":"none" }}/>
      ))}
      <div className="tag fu" style={{ marginBottom:"24px", animationDelay:"0.05s" }}>{tag}</div>
      <h1 className="fu" style={{ fontFamily:"var(--fd)", fontSize:"clamp(52px,8vw,108px)", lineHeight:0.91, letterSpacing:"0.01em", marginBottom:"24px", animationDelay:"0.12s" }}
        dangerouslySetInnerHTML={{ __html: title }}/>
      {sub && <p className="fu" style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, maxWidth:"500px", animationDelay:"0.22s" }}>{sub}</p>}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  const cols = [
    { title:"Platform", links:[["platform","Industrial AI PaaS"],["platform","80/20 Framework"],["research","R&D Pipeline"],["platform","Competitor Comparison"]] },
    { title:"Company",  links:[["people","Key People"],["careers","Careers"],["contact","Contact"],["contact","Press"]] },
    { title:"Sectors",  links:[["sectors","Healthcare & LTC"],["sectors","Logistics"],["sectors","Energy & Manufacturing"]] },
  ];
  return (
    <footer style={{ background:"var(--g900)", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"60px 48px 36px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1.8fr 1fr 1fr 1fr", gap:"56px", marginBottom:"56px" }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
            <Logo size={20}/><span style={{ fontFamily:"var(--fd)", fontSize:"18px", letterSpacing:"0.12em" }}>ICHORAI</span>
          </div>
          <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.9, maxWidth:"260px" }}>Building the Industrial AI — the essential manufacturing capability for deep domain sectors.</p>
          <div style={{ marginTop:"24px", fontSize:"10px", color:"var(--g600)", letterSpacing:"0.1em", lineHeight:1.8 }}>London, United Kingdom<br/>hello@ichorai.com</div>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <div style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px" }}>{c.title}</div>
            {c.links.map(([pg, label]) => (
              <button key={label} onClick={() => navigate(pg)} style={{ display:"block", background:"none", border:"none", color:"var(--g400)", fontFamily:"var(--fm)", fontSize:"12px", cursor:"pointer", padding:"5px 0", letterSpacing:"0.04em", transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color="var(--white)"}
                onMouseLeave={e => e.currentTarget.style.color="var(--g400)"}
              >{label}</button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px" }}>
        <span style={{ fontSize:"10px", color:"var(--g600)", letterSpacing:"0.12em" }}>© 2026 ICHORAI LTD. ALL RIGHTS RESERVED.</span>
        <span style={{ fontSize:"10px", color:"var(--g600)", letterSpacing:"0.12em" }}>INDUSTRIAL AI · INDUSTRY 4.0 → 5.0 · BUILT FOR PERMANENCE</span>
      </div>
    </footer>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["DATA MANAGER","80/20 FRAMEWORK","GENERATIVE ARCHETYPE ENGINE","SEMANTIC NORMALISATION PROTOCOL","DOMAIN INTELLIGENCE","INDUSTRY 5.0","CYBER-PHYSICAL SYSTEMS","SOCIO-INDUSTRIAL SYNTHESIS"];
  const rep = [...items,...items];
  return (
    <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", borderBottom:"1px solid rgba(255,255,255,0.08)", overflow:"hidden", padding:"12px 0", background:"var(--g900)" }}>
      <div style={{ display:"flex", animation:"marquee 30s linear infinite", whiteSpace:"nowrap" }}>
        {rep.map((t,i) => (
          <span key={i} style={{ fontFamily:"var(--fm)", fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", color:i%2===0?"var(--white)":"var(--g600)", padding:"0 34px" }}>
            {t} <span style={{ color:"var(--g600)", margin:"0 6px" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
function FeatureCard({ index, name, detail }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ border:"1px solid rgba(255,255,255,0.07)", borderLeft:"3px solid rgba(255,255,255,0.16)", padding:"20px", cursor:"pointer", background:open?"rgba(255,255,255,0.03)":"transparent", transition:"background 0.2s" }}
      onMouseEnter={e => { if(!open) e.currentTarget.style.background="rgba(255,255,255,0.02)"; }}
      onMouseLeave={e => { if(!open) e.currentTarget.style.background="transparent"; }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"var(--fm)", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase" }}>
          <span style={{ color:"var(--g600)", fontSize:"9px", marginRight:"8px" }}>0{index+1}</span>{name}
        </span>
        <span style={{ color:"var(--g400)", fontSize:"18px", transition:"transform 0.2s", transform:open?"rotate(45deg)":"none" }}>+</span>
      </div>
      {open && <p style={{ marginTop:"14px", color:"var(--g400)", fontSize:"12px", lineHeight:1.8, animation:"fadeUp 0.3s ease" }}>{detail}</p>}
    </div>
  );
}

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
function FormField({ label, value, onChange, placeholder, type="text" }) {
  return (
    <div>
      <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"9px" }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderBottom:"1px solid rgba(255,255,255,0.26)", color:"var(--white)", padding:"12px 15px", fontFamily:"var(--fm)", fontSize:"12px", outline:"none", transition:"border-color 0.2s" }}
        onFocus={e => e.target.style.borderBottomColor="rgba(255,255,255,0.7)"}
        onBlur={e => e.target.style.borderBottomColor="rgba(255,255,255,0.26)"}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({ navigate }) {
  const words = ["INDUSTRIAL","GENERATIVE","PHYSICAL","DOMAIN"];
  const [wi, setWi] = useState(0);
  useEffect(() => { const t = setInterval(() => setWi(i => (i+1)%words.length), 2700); return () => clearInterval(t); }, []);

  const navCards = [
    { page:"platform", num:"01", label:"Platform",  h:"The 80/20 Framework",       d:"Standardised assembly line for domain intelligence. Proprietary Data Manager + Domain Injection Interface." },
    { page:"sectors",  num:"02", label:"Sectors",   h:"Deep Domain Verticals",      d:"Healthcare, Logistics, Energy. The capability gap is sector-agnostic — and so is our solution." },
    { page:"research", num:"03", label:"R&D",       h:"TRL 3 → 5 Pipeline",         d:"From experimental proof-of-concept to the Generative Archetype Engine. R&D is our competitive moat." },
    { page:"people",   num:"04", label:"People",    h:"The Team",                   d:"Built by domain thinkers, not just engineers. Lean, elite, and opinionated about what AI should be." },
    { page:"careers",  num:"05", label:"Careers",   h:"Join Ichorai",               d:"We hire people who believe AI should augment human capability, not replace it. Multiple roles open." },
    { page:"contact",  num:"06", label:"Contact",   h:"Work With Us",               d:"Pilots, partnerships, investment, or just a conversation about industrial intelligence." },
  ];

  return (
    <>
      {/* Hero */}
      <section className="gbg" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"calc(var(--nav)+60px) 48px 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)", animation:"scanline 6s linear infinite", pointerEvents:"none" }}/>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ position:"absolute", top:i<2?"20px":"auto", bottom:i>=2?"20px":"auto", left:i%2===0?"20px":"auto", right:i%2===1?"20px":"auto", width:"18px", height:"18px", borderTop:i<2?"1px solid rgba(255,255,255,0.16)":"none", borderBottom:i>=2?"1px solid rgba(255,255,255,0.16)":"none", borderLeft:i%2===0?"1px solid rgba(255,255,255,0.16)":"none", borderRight:i%2===1?"1px solid rgba(255,255,255,0.16)":"none" }}/>
        ))}

        <div className="fu" style={{ animationDelay:"0.05s" }}>
          <span className="tag">Industrial AI PaaS · Est. 2026 · London, UK</span>
        </div>

        <h1 className="fu" style={{ fontFamily:"var(--fd)", fontSize:"clamp(68px,11vw,150px)", lineHeight:0.9, letterSpacing:"-0.01em", marginTop:"32px", animationDelay:"0.15s" }}>
          <div>THE</div>
          <div style={{ color:"transparent", WebkitTextStroke:"1.5px rgba(255,255,255,0.5)", minHeight:"1em" }}>{words[wi]}</div>
          <div>ASSEMBLY</div>
          <div>LINE.</div>
        </h1>

        <p className="fu" style={{ marginTop:"44px", maxWidth:"480px", color:"var(--g400)", fontSize:"13px", lineHeight:1.9, animationDelay:"0.35s" }}>
          Ichorai builds the Industrial AI — providing deep domain sectors with the essential manufacturing capability to deploy proprietary, high-performance AI without transforming into software companies.
        </p>

        <div className="fu" style={{ marginTop:"48px", display:"flex", gap:"14px", animationDelay:"0.5s" }}>
          <button className="btn-p" onClick={() => navigate("platform")}>Explore Platform</button>
          <button className="btn-g" onClick={() => navigate("research")}>R&amp;D Pipeline</button>
        </div>

        <div className="fi" style={{ marginTop:"90px", display:"flex", gap:"0", borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"36px", animationDelay:"0.9s", flexWrap:"wrap" }}>
          {[["9,047+","HCC Beds Served"],["80/20","Core Framework"],["3","Deep Domain Verticals"],["TRL 3→5","Technology Readiness"]].map(([n,l]) => (
            <div key={l} style={{ paddingRight:"36px", marginRight:"36px", borderRight:"1px solid rgba(255,255,255,0.07)", marginBottom:"16px" }}>
              <div style={{ fontFamily:"var(--fd)", fontSize:"36px" }}>{n}</div>
              <div style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.14em", textTransform:"uppercase", marginTop:"4px" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <Marquee/>

      {/* Nav cards */}
      <section style={{ padding:"72px 48px" }}>
        <div className="tag" style={{ marginBottom:"48px" }}>Explore Ichorai</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {navCards.map((c,i) => (
            <button key={c.page} onClick={() => navigate(c.page)} style={{
              background:"none", border:"1px solid rgba(255,255,255,0.07)", padding:"36px 32px",
              textAlign:"left", cursor:"pointer", transition:"all 0.25s",
              animation:`fadeUp 0.6s ${0.06*i}s ease both`,
            }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"36px" }}>
                <span style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em" }}>{c.num}</span>
                <span style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.14em", textTransform:"uppercase" }}>{c.label} ↗</span>
              </div>
              <h3 style={{ fontFamily:"var(--fd)", fontSize:"26px", letterSpacing:"0.05em", marginBottom:"14px" }}>{c.h}</h3>
              <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.8 }}>{c.d}</p>
            </button>
          ))}
        </div>
      </section>

      {/* HCC strip */}
      <section style={{ margin:"0 48px 72px", padding:"44px", background:"var(--g900)", border:"1px solid rgba(255,255,255,0.07)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"center" }}>
        <div>
          <div className="tag" style={{ marginBottom:"22px" }}>Anchor Partnership</div>
          <h2 style={{ fontFamily:"var(--fd)", fontSize:"38px", lineHeight:1, marginBottom:"18px" }}>HCC HEALTHCARE GROUP</h2>
          <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9 }}>
            Validated through our partnership with the Hsiao Chung-Cheng Healthcare Group — a multi-campus operator on track for NASDAQ IPO in 2026. Our live deployment serves as the proof-of-concept for every future vertical.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
          {[["9,047","Active Beds"],["$70.5M","HCC 2026 Revenue"],["$1M","Ichorai ARR Target 2028"],["4+","Integrated Systems"]].map(([n,l]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", border:"1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.12em" }}>{l}</span>
              <span style={{ fontFamily:"var(--fd)", fontSize:"24px" }}>{n}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PLATFORM PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function PlatformPage({ navigate }) {
  const [tab, setTab] = useState(0);
  const tabs = [
    {
      label:"Industry 4.0 — Industrial AI PaaS", tag:"NOW DEPLOYING", tc:"var(--green)",
      title:"The 80/20 Framework",
      desc:"A proprietary architecture that standardises 80% of Industrial AI — handling noisy infrastructure and data fragmentation — leaving the critical 20% open for deep-domain customisation via the Domain Injection Interface.",
      arch:["RAW INDUSTRIAL DATA","↓  SEMANTIC NORMALISATION PROTOCOL","DATA MANAGER  [80% FOUNDATION]","↓  DOMAIN INJECTION INTERFACE","ACTIVE INTELLIGENCE LAYER  [20%]","↓  OUTPUT","PROPRIETARY AI ASSET"],
      hi:[2,4],
      features:[
        { name:"Data Manager", detail:"Hardened infrastructure layer. Resolves noisy, fragmented industrial data immediately out of the box using the Semantic Normalisation Protocol." },
        { name:"Semantic Normalisation Protocol", detail:"Dynamic schema inference + edge-based signal de-noising. Maps unstructured legacy data to a standardised ontology without rigid ETL pipelines." },
        { name:"Domain Injection Interface", detail:"Low-code interface for domain experts to define weighted parameters — tuning AI models without re-training core neural networks." },
        { name:"Active Intelligence Layer", detail:"The flexible 20% layer where clients inject proprietary domain expertise, transforming generic AI into a bespoke organisational asset." },
      ],
    },
    {
      label:"Industry 5.0 — Generative Archetype Engine", tag:"IN R&D", tc:"var(--amber)",
      title:"Generative Archetype Engine",
      desc:"A world-modelling AI system comparable in complexity to autonomous vehicle logic. GAE enables Socio-Industrial Synthesis — generating high-fidelity, human-centric blueprints for future infrastructure.",
      arch:["INPUT VECTORS  (DEMOGRAPHICS · ENV · LOGISTICS)","↓  WORLD MODELLING ENGINE","DIGITAL TWIN SANDBOX","↓  GENETIC ALGORITHM EVOLUTION","SOCIO-INDUSTRIAL SYNTHESIS","↓  OUTPUT","HUMAN-CENTRIC INFRASTRUCTURE BLUEPRINT"],
      hi:[2,4],
      features:[
        { name:"World Modelling", detail:"Probabilistic generative models simulate complex industrial ecosystems across thousands of configurations per second." },
        { name:"Socio-Industrial Synthesis", detail:"Multi-objective optimisation ingesting labour demographics, environmental constraints, and supply chain logistics." },
        { name:"Logic Container", detail:"Abstracts operational protocols from local billing codes — enabling global export of domain expertise without re-engineering software." },
        { name:"Digital Twin Sandbox", detail:"Evolutionary optimisation using genetic algorithms to breed optimal facility configurations before a single stone is laid." },
      ],
    },
  ];
  const t = tabs[tab];

  return (
    <>
      <PageHeader tag="Platform Architecture" title="THE<br/>PLATFORM." sub="Two stages of industrial intelligence — deployed today and engineered for Industry 5.0."/>

      <div style={{ padding:"0 48px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"var(--g900)", display:"flex" }}>
        {tabs.map((tb,i) => (
          <button key={i} onClick={() => setTab(i)} style={{ background:"none", border:"none", borderBottom:i===tab?"2px solid var(--white)":"2px solid transparent", color:i===tab?"var(--white)":"var(--g400)", padding:"18px 0", marginRight:"44px", fontFamily:"var(--fm)", fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s" }}>
            <span style={{ fontSize:"9px", color:tb.tc, display:"block", marginBottom:"5px", letterSpacing:"0.2em" }}>{tb.tag}</span>
            {tb.label}
          </button>
        ))}
      </div>

      <section style={{ padding:"72px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }}>
          <div>
            <h2 className="fu" style={{ fontFamily:"var(--fd)", fontSize:"clamp(40px,5vw,68px)", lineHeight:1, marginBottom:"22px" }}>{t.title}</h2>
            <p className="fu" style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, marginBottom:"44px", animationDelay:"0.1s" }}>{t.desc}</p>
            <div className="fu" style={{ border:"1px solid rgba(255,255,255,0.08)", padding:"26px", animationDelay:"0.2s" }}>
              <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px" }}>System Architecture</div>
              {t.arch.map((row,i) => (
                <div key={i} style={{ padding:"8px 12px", marginBottom:"2px", background:t.hi.includes(i)?"rgba(255,255,255,0.05)":"transparent", border:t.hi.includes(i)?"1px solid rgba(255,255,255,0.1)":"none", fontFamily:"var(--fm)", fontSize:"10px", letterSpacing:"0.08em", color:[1,3,5].includes(i)?"var(--g600)":"var(--white)" }}>{row}</div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            {t.features.map((f,i) => <FeatureCard key={f.name} index={i} name={f.name} detail={f.detail}/>)}
          </div>
        </div>
      </section>

      <section style={{ padding:"0 48px 72px" }}>
        <div className="tag" style={{ marginBottom:"40px" }}>Competitive Positioning</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2px" }}>
          {[
            { l:"Black Box Giants",      e:"Palantir, C3.ai",   d:"Generic. Prohibitively expensive. No domain connectors for legacy physical hardware.", adv:false },
            { l:"Legacy Incumbents",     e:"Epic, Siemens, SAP",d:"Data silos. Designed to store records, not synthesise cross-system intelligence.", adv:false },
            { l:"Boutique Consultancies",e:"Custom AI dev houses",d:"Zero scalability. Every deployment a new project. Technical debt guaranteed.", adv:false },
            { l:"Ichorai",               e:"Industrial AI PaaS", d:"Non-disruptive wrapper. Sector-agnostic 80/20 assembly line. Scalable from day one.", adv:true },
          ].map((c,i) => (
            <div key={i} style={{ border:`1px solid ${c.adv?"rgba(90,255,143,0.3)":"rgba(255,255,255,0.07)"}`, padding:"30px 26px", background:c.adv?"rgba(90,255,143,0.04)":"transparent" }}>
              <div style={{ fontSize:"9px", color:c.adv?"var(--green)":"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"12px" }}>{c.adv?"✓ ICHORAI":"TIER "+i}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"21px", marginBottom:"8px" }}>{c.l}</div>
              <div style={{ fontSize:"10px", color:"var(--g600)", marginBottom:"14px", fontStyle:"italic" }}>e.g. {c.e}</div>
              <p style={{ fontSize:"11px", color:c.adv?"var(--g200)":"var(--g400)", lineHeight:1.7 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTORS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function SectorsPage({ navigate }) {
  const [active, setActive] = useState(0);
  const sectors = [
    {
      num:"01", icon:"⬡", name:"Healthcare & Long-Term Care", status:"LIVE", sc:"var(--green)",
      desc:"Anchor deployment at HCC Healthcare Group. Resolving fragmented multi-system data environments across hospitals, LTC facilities (1,000+ beds), pharmacies, rehabilitation centres, and social work workflows.",
      proof:"9,047 beds · $1M ARR target 2028 · Yangming HIS + Norak + CareYou + KL1 integration",
      details:[
        { l:"Pain Point", v:"4+ non-communicating software systems. Paper-based social work. 300+ active patients tracked via coloured trays and handwritten notes. No unified clinical-to-therapist trigger." },
        { l:"Our Solution", v:"Data Manager normalises disparate clinical, administrative, pharmacy, and social care signals. SNP acts as connective tissue over existing systems — no rip-and-replace." },
        { l:"Unit Economics", v:"~$9.25 per bed/month. Significantly below legacy HIS costs. $1M ARR from single client by FY 2028-29. 90% gross margin target." },
      ],
    },
    {
      num:"02", icon:"◈", name:"Logistics & Supply Chain", status:"PHASE 2", sc:"var(--amber)",
      desc:"The same noisy-data problem that plagues healthcare — fragmented supply chain logs, disparate sensor arrays, siloed inventory data — translates directly via our sector-agnostic Data Manager.",
      proof:"Planned Phase 2 vertical · SNP retrained on logistics datasets · Living lab partnership model",
      details:[
        { l:"The Parallel", v:"Fragmented supply chain logs mirror healthcare's disconnected HIS systems. Our Semantic Normalisation Protocol is domain-agnostic — same architecture, different ontology." },
        { l:"Our Approach", v:"The SNP retrains on logistics datasets via another 'living lab' partnership. 80% infrastructure reused with minimal R&D overhead. Phase 2 expansion target: Years 2-3." },
        { l:"Opportunity", v:"Universal technical debt. Logistics companies struggle with fragmented inventory data the same way hospitals struggle with siloed patient records." },
      ],
    },
    {
      num:"03", icon:"◉", name:"Energy & Manufacturing", status:"PHASE 3", sc:"var(--g400)",
      desc:"Disparate SCADA sensor arrays and energy load profiles pose identical normalisation challenges. The 80% Fixed Foundation ports horizontally — enabling a zero-touch deployment model for simpler clients.",
      proof:"Phase 3 automated self-service · Zero human intervention deployment · Standardised assembly line model",
      details:[
        { l:"The Gap", v:"Energy grids struggle with disparate sensor arrays exactly as hospitals struggle with siloed patient data. The normalisation problem is universal across physical sectors." },
        { l:"Our Approach", v:"Automated, self-service version of the Data Manager for smaller industrial players. Platform maturity enables deployment with zero human intervention." },
        { l:"Timeline", v:"Phase 3: Years 3-5. As the platform matures from high-touch healthcare model to fully automated standardised assembly line — the true Ichorai endgame." },
      ],
    },
  ];
  const s = sectors[active];

  return (
    <>
      <PageHeader tag="Target Verticals" title={'DEEP<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">DOMAIN</span><br/>SECTORS.'} sub="The Capability Gap is sector-agnostic. Where physical industries lack the software DNA to build complex AI infrastructure, Ichorai deploys its standardised assembly line."/>

      <section style={{ padding:"72px 48px" }}>
        <div style={{ display:"flex", gap:"2px", marginBottom:"56px" }}>
          {sectors.map((sec,i) => (
            <button key={i} onClick={() => setActive(i)} style={{ flex:1, background:i===active?"rgba(255,255,255,0.05)":"transparent", border:`1px solid ${i===active?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)"}`, padding:"22px 18px", cursor:"pointer", textAlign:"left", transition:"all 0.22s" }}>
              <div style={{ fontSize:"9px", color:sec.sc, letterSpacing:"0.2em", border:`1px solid ${sec.sc}40`, display:"inline-block", padding:"2px 8px", marginBottom:"10px" }}>{sec.status}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"20px", letterSpacing:"0.04em", color:"var(--white)" }}>{sec.name}</div>
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", animation:"fadeUp 0.4s ease" }} key={active}>
          <div>
            <div style={{ fontSize:"44px", color:"rgba(255,255,255,0.2)", marginBottom:"22px" }}>{s.icon}</div>
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(34px,4vw,54px)", lineHeight:1, marginBottom:"22px" }}>{s.name}</h2>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, marginBottom:"30px" }}>{s.desc}</p>
            <div style={{ border:"1px solid rgba(255,255,255,0.07)", padding:"18px", fontSize:"11px", color:"var(--g400)", letterSpacing:"0.05em", lineHeight:1.7 }}>{s.proof}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            {s.details.map((d,i) => (
              <div key={i} style={{ border:"1px solid rgba(255,255,255,0.07)", borderLeft:"3px solid rgba(255,255,255,0.14)", padding:"22px" }}>
                <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"9px" }}>{d.l}</div>
                <p style={{ color:"var(--g200)", fontSize:"12px", lineHeight:1.8 }}>{d.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"0 48px 72px" }}>
        <div className="tag" style={{ marginBottom:"40px" }}>Market Opportunity</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {[
            { circle:"Level 1", title:"HCC Ecosystem", value:"$90.75M", sub:"Projected HCC revenue by 2028. Our core ARR base. Scales linearly with HCC bed count and pharmacy expansion." },
            { circle:"Level 2", title:"Global Ageing Economy", value:"2B+", sub:"Population aged 60+ by 2050 (WHO). Healthcare providers allocating 5-10% revenue to technology budgets." },
            { circle:"Level 3", title:"Deep Domain TAM", value:"Multi-BN", sub:"Logistics, Energy, Manufacturing face identical capability gap. Sector-agnostic platform multiplies TAM." },
          ].map((m,i) => (
            <div key={i} style={{ border:"1px solid rgba(255,255,255,0.07)", padding:"36px 32px" }}>
              <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px" }}>{m.circle}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"50px", lineHeight:1, marginBottom:"10px" }}>{m.value}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"18px", letterSpacing:"0.05em", marginBottom:"14px" }}>{m.title}</div>
              <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESEARCH PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function ResearchPage({ navigate }) {
  const phases = [
    { trl:"TRL 3", label:"Experimental Proof of Concept", status:"ACHIEVED", sc:"var(--green)", desc:"Core Industrial AI architecture validated in a controlled lab setting using HCC sample data extracts. Noise-reduction algorithms confirmed feasible." },
    { trl:"TRL 5", label:"Validation in Relevant Environment", status:"ACTIVE TARGET", sc:"var(--amber)", desc:"Scale testing to ingest full HCC historical datasets. Industrial AI runs as a shadow system to verify fidelity against real-world complexity without impacting live operations." },
    { trl:"TRL 1→3", label:"GAE — Basic Principles Phase", status:"EARLY R&D", sc:"var(--g400)", desc:"Formulating mathematical architecture and Socio-Industrial theoretical constraints for the Generative Archetype Engine. Scientific groundwork before coding begins." },
  ];
  const wps = [
    { code:"WP1", title:"Data Manager & SNP", icon:"◧", items:["Finalise SNP architecture for rehab/polypharmacy HCC pilot","Dynamic schema inference + signal de-noising for Norak/Yangming HIS","Build low-code Domain Injection Interface for clinicians","Achieve TRL 5 in shadow mode at HCC"] },
    { code:"WP2", title:"Generative Archetype Engine", icon:"◈", items:["Formalise GAE mathematical architecture & Socio-Industrial multi-objective functions","Begin Digital Twin sandbox simulation environment","Research genetic algorithms for facility design generation","Publish 'Logic Container' concept paper"] },
    { code:"WP3", title:"Business Development", icon:"◎", items:["Finalise HCC case study (white paper + video)","Identify 3 target UK healthcare providers for second pilot","Present at 2 key UK health-tech conferences","Secure MoU with system integrator partner"] },
    { code:"WP4", title:"Team & Operations", icon:"◉", items:["Recruit Lead Architect (Industrial 5.0 Specialist)","Recruit Full-Stack Engineer (React/Python)","Establish UK office & legal/financial infrastructure","Implement secure data handling protocols (FHIR, HL7)"] },
  ];

  return (
    <>
      <PageHeader tag="Research & Development" title={'BRIDGING<br/>THE<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">FRONTIER.</span>'}
        sub="Moving beyond standard supervised learning — towards a Cyber-Physical System architecture that interprets existing industrial data and simulates future industrial states."/>

      <section style={{ padding:"72px 48px" }}>
        <div className="tag" style={{ marginBottom:"44px" }}>Technology Readiness Levels</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"2px", marginBottom:"72px" }}>
          {phases.map((p,i) => (
            <div key={i} className="fu" style={{ border:"1px solid rgba(255,255,255,0.07)", borderLeft:`4px solid ${p.sc}40`, padding:"28px", display:"grid", gridTemplateColumns:"140px 1fr auto", gap:"36px", alignItems:"center", animationDelay:`${0.1*i}s` }}>
              <div style={{ fontFamily:"var(--fd)", fontSize:"38px", color:p.sc }}>{p.trl}</div>
              <div>
                <div style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"9px" }}>{p.label}</div>
                <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.8 }}>{p.desc}</p>
              </div>
              <div><span style={{ fontSize:"9px", color:p.sc, border:`1px solid ${p.sc}40`, padding:"4px 10px", letterSpacing:"0.18em", whiteSpace:"nowrap" }}>{p.status}</span></div>
            </div>
          ))}
        </div>

        <div className="tag" style={{ marginBottom:"40px" }}>Work Packages</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"2px", marginBottom:"72px" }}>
          {wps.map((w,i) => (
            <div key={i} className="fu card" style={{ padding:"32px", animationDelay:`${0.1*i}s` }}>
              <div style={{ display:"flex", gap:"14px", alignItems:"flex-start", marginBottom:"24px" }}>
                <span style={{ fontSize:"26px", color:"rgba(255,255,255,0.2)" }}>{w.icon}</span>
                <div>
                  <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"5px" }}>{w.code}</div>
                  <div style={{ fontFamily:"var(--fd)", fontSize:"22px" }}>{w.title}</div>
                </div>
              </div>
              {w.items.map((item,j) => (
                <div key={j} style={{ display:"flex", gap:"12px", marginBottom:"8px" }}>
                  <span style={{ color:"var(--g600)", fontSize:"12px", marginTop:"1px", flexShrink:0 }}>→</span>
                  <span style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="tag" style={{ marginBottom:"40px" }}>Financial Milestones</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {[
            { fy:"FY 2026-27", rev:"$150K", pct:"0.16% of HCC Revenue", phase:"Pilot Phase", desc:"Data Manager in Rehab Centre only. Fixed-fee pilot licensing. TRL 5 objective." },
            { fy:"FY 2027-28", rev:"$450K", pct:"0.64% of HCC Revenue", phase:"Expansion Phase", desc:"Rollout to Pharmacy & LTC units. Efficiency commission activates. Cash flow neutral." },
            { fy:"FY 2028-29", rev:"$1M",   pct:"1.1% of HCC Revenue",  phase:"Ecosystem Standard", desc:"Full 9,047-bed deployment. ~$9.25/bed/month. 90% gross margin. 25-30% net profit target." },
          ].map((m,i) => (
            <div key={i} style={{ border:"1px solid rgba(255,255,255,0.07)", padding:"32px" }}>
              <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"14px" }}>{m.fy} · {m.phase}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"46px", lineHeight:1, marginBottom:"8px" }}>{m.rev}</div>
              <div style={{ fontSize:"10px", color:"var(--g600)", marginBottom:"18px" }}>{m.pct}</div>
              <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PEOPLE PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function PeoplePage({ navigate }) {
  return (
    <>
      <PageHeader tag="The Team" title={'KEY<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">PEOPLE.</span>'}
        sub="A lean, elite team of domain thinkers — people who believe that AI should augment human capability, not replace it."/>

      <div style={{ margin:"40px 48px 0", padding:"18px 24px", border:"1px solid rgba(255,184,77,0.3)", background:"rgba(255,184,77,0.04)", fontSize:"11px", color:"var(--amber)", lineHeight:1.7, letterSpacing:"0.08em" }}>
        ⚠ PLACEHOLDER SECTION — Replace all bios, headshots, and links with actual team details. This layout is pre-built and ready.
      </div>

      <section style={{ padding:"48px 48px 72px" }}>
        {/* Founder - full-width card */}
        <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", border:"1px solid rgba(255,255,255,0.07)", marginBottom:"2px" }}>
          <div style={{ background:"var(--g900)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", minHeight:"340px", borderRight:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"18px 18px" }}/>
            <div style={{ width:"80px", height:"80px", border:"1px solid rgba(255,255,255,0.14)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fd)", fontSize:"22px", color:"rgba(255,255,255,0.28)", zIndex:1 }}>HC</div>
            <div style={{ position:"absolute", bottom:"16px", fontSize:"9px", color:"var(--g600)", letterSpacing:"0.15em", zIndex:1 }}>[ ADD HEADSHOT ]</div>
          </div>
          <div style={{ padding:"44px" }}>
            <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"8px" }}>Founder & CEO</div>
            <div style={{ fontFamily:"var(--fs)", fontSize:"30px", marginBottom:"22px" }}>Hsu, Chen</div>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, fontStyle:"italic", marginBottom:"28px" }}>
              [ Founder bio placeholder — replace with your own. Describe your background, domain expertise, the vision behind Ichorai, and what drove you to build Industrial AI. Include any relevant experience in healthcare technology, AI/ML research, business building, or deep domain sectors. ]
            </p>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, fontStyle:"italic", marginBottom:"28px" }}>
              [ Add a second paragraph if desired — personal philosophy, specific achievements, or your perspective on Industry 5.0. ]
            </p>
            <div style={{ display:"flex", gap:"12px" }}>
              <button className="btn-g" style={{ fontSize:"10px", padding:"8px 20px" }}>LinkedIn ↗</button>
              <button className="btn-g" style={{ fontSize:"10px", padding:"8px 20px" }}>Twitter / X ↗</button>
            </div>
          </div>
        </div>

        {/* Two placeholder cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px", marginBottom:"56px" }}>
          {[
            { role:"Lead Architect — Industrial 5.0", bio:"[ Seeking an Industrial 5.0 Specialist with expertise in probabilistic generative models, NLP, and cyber-physical system architecture. ]" },
            { role:"Full-Stack Engineer", bio:"[ React/Python engineer for the Domain Injection Interface and core platform infrastructure. Healthcare data standards (FHIR, HL7) a plus. ]" },
          ].map((p,i) => (
            <div key={i} style={{ border:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ background:"var(--g900)", height:"190px", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"16px 16px" }}/>
                <div style={{ width:"60px", height:"60px", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fd)", fontSize:"16px", color:"rgba(255,255,255,0.18)", zIndex:1 }}>—</div>
                <div style={{ position:"absolute", bottom:"12px", fontSize:"9px", color:"var(--g600)", letterSpacing:"0.15em", zIndex:1 }}>POSITION OPEN</div>
              </div>
              <div style={{ padding:"28px" }}>
                <div style={{ fontSize:"9px", color:"var(--amber)", letterSpacing:"0.2em", border:"1px solid rgba(255,184,77,0.3)", display:"inline-block", padding:"2px 8px", marginBottom:"10px" }}>PLACEHOLDER</div>
                <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"6px" }}>{p.role}</div>
                <div style={{ fontFamily:"var(--fs)", fontSize:"20px", marginBottom:"14px", color:"var(--g400)", fontStyle:"italic" }}>[ Position Open ]</div>
                <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.8, fontStyle:"italic" }}>{p.bio}</p>
                <button className="btn-p" onClick={() => navigate("careers")} style={{ marginTop:"20px", fontSize:"10px", padding:"8px 20px" }}>View Open Role →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="tag" style={{ marginBottom:"36px" }}>Advisors & Partners</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {["Strategic Advisor","Industry Advisor","Technical Advisor"].map((r,i) => (
            <div key={i} style={{ border:"1px solid rgba(255,255,255,0.07)", borderLeft:"3px solid rgba(255,184,77,0.3)", padding:"28px" }}>
              <div style={{ fontSize:"9px", color:"var(--amber)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"10px" }}>PLACEHOLDER</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"20px", marginBottom:"8px", color:"var(--g400)" }}>{r}</div>
              <p style={{ color:"var(--g600)", fontSize:"11px", lineHeight:1.7, fontStyle:"italic" }}>[ Add advisor name, background, and their contribution to Ichorai's mission here. ]</p>
            </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAREERS PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function CareersPage({ navigate }) {
  const [selected, setSelected] = useState(null);
  const [appRole, setAppRole] = useState(null);

  const roles = [
    { id:1, title:"Lead Architect — Industrial 5.0", type:"Full-Time", loc:"London, UK (Hybrid)", sal:"Competitive + Equity",
      desc:"[ Placeholder — edit with your full job description. Example: Seeking an experienced AI architect with expertise in probabilistic generative models, world-modelling systems, and cyber-physical architectures to lead the technical design of the Generative Archetype Engine. You will set the technical direction and work directly with the founder. ]",
      reqs:["[ Requirement 1 — e.g. 5+ years in AI/ML architecture ]","[ Requirement 2 — e.g. Experience with generative or world-modelling systems ]","[ Requirement 3 — e.g. PhD or equivalent in relevant field ]","[ Requirement 4 — e.g. Background in industrial or physical domain AI ]"] },
    { id:2, title:"Full-Stack Engineer (React / Python)", type:"Full-Time", loc:"London, UK (Hybrid)", sal:"Competitive + Equity",
      desc:"[ Placeholder — edit with your full job description. Example: Building the Domain Injection Interface and core platform infrastructure. You will own the product layer that allows domain experts to tune AI models without engineering support. Strong React and Python required. ]",
      reqs:["[ Requirement 1 — e.g. 3+ years React and Python ]","[ Requirement 2 — e.g. Experience with data-heavy interfaces ]","[ Requirement 3 — e.g. Healthcare data standards (FHIR, HL7) a plus ]","[ Requirement 4 — e.g. Comfort with ambiguity at early-stage ]"] },
    { id:3, title:"R&D Researcher — Socio-Industrial AI", type:"Full-Time / Contract", loc:"Remote / London", sal:"Competitive",
      desc:"[ Placeholder — edit with your full job description. Example: Research role focused on the mathematical architecture for Socio-Industrial Synthesis. Background in operations research, generative modelling, urban planning AI, or sustainable systems design. ]",
      reqs:["[ Requirement 1 — e.g. PhD candidate or postdoc in relevant discipline ]","[ Requirement 2 — e.g. Probabilistic modelling or generative AI ]","[ Requirement 3 — e.g. Interest in sustainability and human-centric systems ]","[ Requirement 4 — e.g. Publication record a plus ]"] },
  ];

  return (
    <>
      <PageHeader tag="Join Ichorai" title={'BUILD THE<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">FUTURE</span><br/>WITH US.'}
        sub="We hire people who believe AI should augment human capability — not replace it. Lean team. Deep thinking. Permanent impact."/>

      {/* Values */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        {[
          { icon:"◎", l:"Human-Centric", d:"We build AI that serves people, not the reverse." },
          { icon:"◈", l:"Domain-First",  d:"Deep expertise over surface-level generalism." },
          { icon:"◧", l:"Permanent Work",d:"We build for decades, not quarters." },
          { icon:"⬡", l:"Lean & Elite",  d:"Small team. Massive surface area. High trust." },
        ].map((v,i) => (
          <div key={i} style={{ padding:"32px 26px", borderRight:i<3?"1px solid rgba(255,255,255,0.07)":"none" }}>
            <div style={{ fontSize:"26px", color:"rgba(255,255,255,0.18)", marginBottom:"14px" }}>{v.icon}</div>
            <div style={{ fontFamily:"var(--fd)", fontSize:"20px", letterSpacing:"0.05em", marginBottom:"8px" }}>{v.l}</div>
            <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{v.d}</p>
          </div>
        ))}
      </div>

      <div style={{ margin:"40px 48px 0", padding:"16px 22px", border:"1px solid rgba(255,184,77,0.3)", background:"rgba(255,184,77,0.04)", fontSize:"11px", color:"var(--amber)", lineHeight:1.7, letterSpacing:"0.08em" }}>
        ⚠ PLACEHOLDER LISTINGS — Edit each role with actual job descriptions and requirements before publishing.
      </div>

      <section style={{ padding:"36px 48px 72px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
          {roles.map((role,i) => (
            <div key={role.id} style={{ border:"1px solid rgba(255,255,255,0.07)", overflow:"hidden", transition:"border-color 0.22s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}
            >
              <div onClick={() => setSelected(selected===role.id?null:role.id)}
                style={{ padding:"28px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", flexWrap:"wrap", gap:"14px" }}>
                <div>
                  <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"7px" }}>
                    {role.type} · {role.loc} · <span style={{ color:"var(--amber)" }}>PLACEHOLDER</span>
                  </div>
                  <h3 style={{ fontFamily:"var(--fd)", fontSize:"28px", letterSpacing:"0.04em" }}>{role.title}</h3>
                  <div style={{ fontSize:"10px", color:"var(--g600)", marginTop:"5px" }}>{role.sal}</div>
                </div>
                <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
                  <button className="btn-p" onClick={e => { e.stopPropagation(); setAppRole(role); }} style={{ fontSize:"10px", padding:"10px 26px" }}>Apply Now</button>
                  <span style={{ color:"var(--g400)", fontSize:"18px", transition:"transform 0.2s", transform:selected===role.id?"rotate(180deg)":"none" }}>↓</span>
                </div>
              </div>
              {selected===role.id && (
                <div style={{ padding:"0 32px 28px", animation:"fadeUp 0.3s ease", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ marginTop:"22px" }}>
                    <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"10px" }}>About the Role</div>
                    <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.8, fontStyle:"italic" }}>{role.desc}</p>
                  </div>
                  <div style={{ marginTop:"24px" }}>
                    <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"10px" }}>Requirements</div>
                    {role.reqs.map((r,j) => (
                      <div key={j} style={{ display:"flex", gap:"12px", marginBottom:"8px" }}>
                        <span style={{ color:"var(--g600)", fontSize:"12px" }}>→</span>
                        <span style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7, fontStyle:"italic" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Speculative */}
        <div style={{ marginTop:"40px", border:"1px dashed rgba(255,255,255,0.12)", padding:"36px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"20px" }}>
          <div>
            <div style={{ fontFamily:"var(--fd)", fontSize:"24px", marginBottom:"8px" }}>Don't See Your Role?</div>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.8, maxWidth:"480px" }}>We always have room for exceptional people. If you're deeply knowledgeable in Industrial AI, healthcare data, or Socio-Industrial systems — send a speculative application.</p>
          </div>
          <button className="btn-g" onClick={() => setAppRole({ title:"Speculative Application", id:99 })}>Apply Speculatively</button>
        </div>
      </section>

      {appRole && <ApplicationModal role={appRole} onClose={() => setAppRole(null)}/>}
      <Footer navigate={navigate}/>
    </>
  );
}

// ─── APPLICATION MODAL ────────────────────────────────────────────────────────
function ApplicationModal({ role, onClose }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", linkedin:"", coverLetter:"", portfolio:"", availability:"" });
  const [cvFile, setCvFile] = useState(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const up = (k,v) => setForm(f => ({...f,[k]:v}));
  const FORMSPREE_ID = "YOUR_FORM_ID"; // ← REPLACE WITH YOUR FORMSPREE FORM ID

  const submit = async () => {
    setSubmitting(true); setError("");
    try {
      const data = new FormData();
      data.append("role", role.title);
      Object.entries(form).forEach(([k,v]) => data.append(k,v));
      if (cvFile) data.append("cv", cvFile);
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method:"POST", body:data, headers:{Accept:"application/json"} });
      if (res.ok) setSubmitted(true);
      else setError("Submission failed. Please email careers@ichorai.com directly with your CV.");
    } catch { setError("Network error. Please email careers@ichorai.com directly."); }
    setSubmitting(false);
  };

  const stepLabels = ["PERSONAL DETAILS","YOUR BACKGROUND","UPLOAD & SUBMIT"];
  const canNext1 = form.name && form.email;
  const canSubmit = form.name && form.email && cvFile;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(0,0,0,0.93)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", animation:"fadeIn 0.25s ease" }}>
      <div style={{ background:"var(--g900)", border:"1px solid rgba(255,255,255,0.12)", width:"100%", maxWidth:"660px", maxHeight:"90vh", overflow:"auto" }}>
        {/* Header */}
        <div style={{ padding:"26px 30px", borderBottom:"1px solid rgba(255,255,255,0.07)", position:"sticky", top:0, background:"var(--g900)", zIndex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ flex:1, paddingRight:"18px" }}>
              <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"5px" }}>Application Portal</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"20px", lineHeight:1.1 }}>{role.title}</div>
            </div>
            <button onClick={onClose} style={{ background:"none", border:"1px solid rgba(255,255,255,0.14)", color:"var(--g400)", width:"32px", height:"32px", fontSize:"15px", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
          <div style={{ marginTop:"14px", display:"flex", gap:"4px" }}>
            {[1,2,3].map(s => <div key={s} style={{ height:"2px", flex:1, background:step>=s?"var(--white)":"rgba(255,255,255,0.1)", transition:"background 0.3s" }}/>)}
          </div>
          <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.15em", marginTop:"7px" }}>STEP {step}/3 · {stepLabels[step-1]}</div>
        </div>

        {/* Body */}
        <div style={{ padding:"32px 30px" }}>
          {submitted ? (
            <div style={{ textAlign:"center", padding:"44px 0" }}>
              <div style={{ fontSize:"44px", marginBottom:"18px" }}>◎</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"34px", marginBottom:"14px" }}>APPLICATION RECEIVED</div>
              <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.8, maxWidth:"360px", margin:"0 auto 28px" }}>Thank you for your interest in Ichorai. We review every application and will be in touch if your profile aligns with our needs.</p>
              <button className="btn-p" onClick={onClose}>Close</button>
            </div>
          ) : (
            <>
              {step===1 && (
                <div style={{ display:"flex", flexDirection:"column", gap:"18px", animation:"fadeUp 0.3s ease" }}>
                  <FormField label="Full Name *" value={form.name} onChange={v=>up("name",v)} placeholder="Your full name"/>
                  <FormField label="Email *" value={form.email} onChange={v=>up("email",v)} placeholder="you@email.com" type="email"/>
                  <FormField label="Phone" value={form.phone} onChange={v=>up("phone",v)} placeholder="+44 ..."/>
                  <FormField label="LinkedIn" value={form.linkedin} onChange={v=>up("linkedin",v)} placeholder="linkedin.com/in/you"/>
                  <FormField label="Availability / Start Date" value={form.availability} onChange={v=>up("availability",v)} placeholder="e.g. Immediate / 2 months notice"/>
                </div>
              )}
              {step===2 && (
                <div style={{ display:"flex", flexDirection:"column", gap:"18px", animation:"fadeUp 0.3s ease" }}>
                  <div>
                    <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"9px" }}>Cover Letter *</label>
                    <textarea value={form.coverLetter} onChange={e=>up("coverLetter",e.target.value)} placeholder="Why Ichorai? What makes you the right person for this role? How does your background align with our mission of Industrial AI that prioritises human prosperity?"
                      style={{ width:"100%", minHeight:"190px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderBottom:"1px solid rgba(255,255,255,0.26)", color:"var(--white)", padding:"13px 15px", fontFamily:"var(--fm)", fontSize:"12px", lineHeight:1.8, resize:"vertical", outline:"none" }}/>
                  </div>
                  <FormField label="Portfolio / GitHub / Links" value={form.portfolio} onChange={v=>up("portfolio",v)} placeholder="github.com/... or portfolio URL"/>
                </div>
              )}
              {step===3 && (
                <div style={{ display:"flex", flexDirection:"column", gap:"24px", animation:"fadeUp 0.3s ease" }}>
                  <div>
                    <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"11px" }}>Upload CV / Resume *</label>
                    <div onClick={() => document.getElementById("cv-up").click()}
                      onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"; }}
                      onDragLeave={e => { e.currentTarget.style.borderColor=cvFile?"rgba(90,255,143,0.4)":"rgba(255,255,255,0.16)"; }}
                      onDrop={e => { e.preventDefault(); const f=e.dataTransfer.files[0]; if(f) setCvFile(f); e.currentTarget.style.borderColor=cvFile?"rgba(90,255,143,0.4)":"rgba(255,255,255,0.16)"; }}
                      style={{ border:`1px dashed ${cvFile?"rgba(90,255,143,0.4)":"rgba(255,255,255,0.16)"}`, padding:"40px 28px", textAlign:"center", cursor:"pointer", background:cvFile?"rgba(90,255,143,0.04)":"transparent", transition:"all 0.2s" }}>
                      <input id="cv-up" type="file" style={{ display:"none" }} accept=".pdf,.doc,.docx" onChange={e => setCvFile(e.target.files[0])}/>
                      <div style={{ fontSize:"26px", marginBottom:"9px", color:cvFile?"var(--green)":"var(--g600)" }}>{cvFile?"✓":"↑"}</div>
                      <div style={{ fontSize:"11px", color:cvFile?"var(--green)":"var(--g400)", letterSpacing:"0.1em" }}>{cvFile?cvFile.name:"DROP FILE OR CLICK TO UPLOAD"}</div>
                      <div style={{ fontSize:"10px", color:"var(--g600)", marginTop:"5px" }}>PDF, DOC, DOCX · Max 10MB</div>
                    </div>
                  </div>
                  <div style={{ border:"1px solid rgba(255,255,255,0.07)", padding:"20px" }}>
                    <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"14px" }}>Application Summary</div>
                    {[["Role",role.title],["Name",form.name||"—"],["Email",form.email||"—"],["CV",cvFile?cvFile.name:"Not uploaded"]].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px", fontSize:"11px" }}>
                        <span style={{ color:"var(--g600)", letterSpacing:"0.1em" }}>{k}</span>
                        <span style={{ color:"var(--white)", textAlign:"right", maxWidth:"64%" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {error && <div style={{ border:"1px solid rgba(255,100,100,0.4)", padding:"13px 17px", fontSize:"11px", color:"#ff9090", lineHeight:1.7 }}>⚠ {error}</div>}
                  <div style={{ fontSize:"10px", color:"var(--g600)", lineHeight:1.7 }}>By submitting, you agree that Ichorai may store and process your application data for recruitment purposes only.</div>
                </div>
              )}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"32px", paddingTop:"22px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                {step>1 ? <button className="btn-g" style={{ fontSize:"10px", padding:"10px 22px" }} onClick={() => setStep(s=>s-1)}>← Back</button> : <div/>}
                {step<3
                  ? <button className="btn-p" onClick={() => setStep(s=>s+1)} disabled={step===1&&!canNext1} style={{ fontSize:"10px", padding:"10px 26px", opacity:step===1&&!canNext1?0.38:1 }}>Continue →</button>
                  : <button className="btn-p" onClick={submit} disabled={submitting||!canSubmit} style={{ fontSize:"10px", padding:"10px 26px", opacity:!canSubmit?0.38:1 }}>{submitting?"Submitting...":"Submit Application"}</button>
                }
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name:"", email:"", subject:"general", message:"" });
  const [sent, setSent] = useState(false);
  const up = (k,v) => setForm(f => ({...f,[k]:v}));
  const FORMSPREE_ID = "YOUR_FORM_ID"; // ← REPLACE WITH YOUR FORMSPREE FORM ID

  const send = async () => {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method:"POST", headers:{"Content-Type":"application/json",Accept:"application/json"}, body:JSON.stringify(form) });
      if (res.ok) setSent(true);
    } catch {}
  };

  return (
    <>
      <PageHeader tag="Get In Touch" title={"LET'S BUILD<br/>SOMETHING<br/>PERMANENT."} sub="Whether you're a deep domain operator, an investor aligned with Industry 5.0, or a potential team member — we want to hear from you."/>

      <section style={{ padding:"72px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }}>
          <div>
            <div className="tag" style={{ marginBottom:"32px" }}>Contact Information</div>
            {[
              { l:"General Enquiries",     v:"hello@ichorai.com" },
              { l:"Partnerships & Pilots", v:"partnerships@ichorai.com" },
              { l:"Careers",               v:"careers@ichorai.com" },
              { l:"Press & Media",         v:"press@ichorai.com" },
              { l:"Location",              v:"London, United Kingdom" },
            ].map(({ l,v }) => (
              <div key={l} style={{ padding:"18px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:"28px", alignItems:"center" }}>
                <span style={{ fontSize:"10px", color:"var(--g600)", letterSpacing:"0.14em", textTransform:"uppercase", minWidth:"170px" }}>{l}</span>
                <span style={{ fontSize:"13px", color:"var(--white)" }}>{v}</span>
              </div>
            ))}

            <div style={{ marginTop:"44px", border:"1px solid rgba(255,255,255,0.07)", padding:"26px" }}>
              <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px" }}>Quick Routing Guide</div>
              {[
                ["Pilot Partnership","Deep domain operator with a noisy data problem? We offer a de-risked pilot model — select a specific domain, prove the value, then scale."],
                ["Investment","We are raising a seed round to accelerate R&D and expand to 2-3 new clients. Institutional and strategic investors welcome."],
                ["Career Enquiries","Not seeing a role? Send a speculative application. We always have room for exceptional people aligned with our mission."],
              ].map(([t,d]) => (
                <div key={t} style={{ marginBottom:"16px" }}>
                  <div style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"5px" }}>{t}</div>
                  <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="tag" style={{ marginBottom:"32px" }}>Send a Message</div>
            {sent ? (
              <div style={{ border:"1px solid rgba(90,255,143,0.3)", padding:"44px", textAlign:"center", background:"rgba(90,255,143,0.04)" }}>
                <div style={{ fontFamily:"var(--fd)", fontSize:"34px", marginBottom:"14px" }}>MESSAGE SENT</div>
                <p style={{ color:"var(--g400)", fontSize:"13px" }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
                <FormField label="Name *" value={form.name} onChange={v=>up("name",v)} placeholder="Your name"/>
                <FormField label="Email *" value={form.email} onChange={v=>up("email",v)} placeholder="you@email.com" type="email"/>
                <div>
                  <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"9px" }}>Subject</label>
                  <select value={form.subject} onChange={e=>up("subject",e.target.value)} style={{ width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderBottom:"1px solid rgba(255,255,255,0.26)", color:"var(--white)", padding:"12px 15px", fontFamily:"var(--fm)", fontSize:"12px", outline:"none" }}>
                    <option value="general"    style={{background:"#111"}}>General Enquiry</option>
                    <option value="pilot"      style={{background:"#111"}}>Pilot Partnership</option>
                    <option value="investment" style={{background:"#111"}}>Investment</option>
                    <option value="careers"    style={{background:"#111"}}>Careers / Speculative</option>
                    <option value="press"      style={{background:"#111"}}>Press & Media</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"9px" }}>Message *</label>
                  <textarea value={form.message} onChange={e=>up("message",e.target.value)} placeholder="Tell us about your organisation, challenge, or vision..."
                    style={{ width:"100%", minHeight:"140px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderBottom:"1px solid rgba(255,255,255,0.26)", color:"var(--white)", padding:"13px 15px", fontFamily:"var(--fm)", fontSize:"12px", lineHeight:1.8, resize:"vertical", outline:"none" }}/>
                </div>
                <button className="btn-p" onClick={send} disabled={!form.name||!form.email||!form.message} style={{ width:"100%", padding:"15px", opacity:!form.name||!form.email||!form.message?0.38:1 }}>
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTER + APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
const PAGES = {
  home:     HomePage,
  platform: PlatformPage,
  sectors:  SectorsPage,
  research: ResearchPage,
  people:   PeoplePage,
  careers:  CareersPage,
  contact:  ContactPage,
};

export default function App() {
  const [page, setPage]   = useState("home");
  const [fading, setFading] = useState(false);

  const navigate = useCallback((to) => {
    if (to === page) { window.scrollTo({top:0,behavior:"smooth"}); return; }
    setFading(true);
    setTimeout(() => { setPage(to); setFading(false); window.scrollTo(0,0); }, 200);
  }, [page]);

  const Page = PAGES[page] || HomePage;

  return (
    <>
      <style>{G}</style>
      <Navbar page={page} navigate={navigate}/>
      <main style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(8px)" : "translateY(0)", transition:"opacity 0.2s ease, transform 0.2s ease" }}>
        <Page navigate={navigate}/>
      </main>
    </>
  );
}
