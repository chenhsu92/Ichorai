import React, { useState, useEffect } from 'react'
import Marquee from '../components/Marquee'
import Footer from '../components/Footer'

function HomePage({ navigate }) {
  const words = ["INDUSTRIAL","GENERATIVE","PHYSICAL","DOMAIN"];
  const [wi, setWi] = useState(0);
  useEffect(() => { const t = setInterval(() => setWi(i => (i+1)%words.length), 2700); return () => clearInterval(t); }, []);

  const navCards = [
    { page:"platform", num:"01", label:"Platform",  h:"The 80/20 Framework",       d:"Standardised assembly line for domain intelligence. Proprietary Data Manager + Graphical Interface." },
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
        <div className="fu" style={{ animationDelay:"0.05s" }}>
          <span className="tag">Industrial AI PaaS · Est. 2026 · London, UK</span>
        </div>

        <h1 className="fu" style={{ fontFamily:"var(--fd)", fontSize:"clamp(60px,10vw,140px)", lineHeight:0.9, letterSpacing:"-0.02em", marginTop:"32px", animationDelay:"0.15s", fontWeight:"700" }}>
          <div style={{ color:"var(--g200)" }}>THE</div>
          <div style={{ color:"var(--green)", margin:"-10px 0" }}>{words[wi]}</div>
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

        <div className="fi" style={{ marginTop:"90px", display:"flex", gap:"0", borderTop:"1px solid var(--g600)", paddingTop:"36px", animationDelay:"0.9s", flexWrap:"wrap" }}>
          {[["9,047+","HCC Beds Served"],["80/20","Core Framework"],["3","Deep Domain Verticals"],["TRL 3→5","Technology Readiness"]].map(([n,l]) => (
            <div key={l} style={{ paddingRight:"36px", marginRight:"36px", borderRight:"1px solid var(--g600)", marginBottom:"16px", paddingBottom:"16px" }}>
              <div style={{ fontFamily:"var(--fd)", fontSize:"36px", fontWeight:"600" }}>{n}</div>
              <div style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.14em", textTransform:"uppercase", marginTop:"4px", fontFamily:"var(--fm)" }}>{l}</div>
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
              background:"var(--g800)", border:"1px solid var(--g600)", borderLeft:"3px solid var(--g600)", 
              padding:"36px 32px", textAlign:"left", cursor:"pointer", transition:"all 0.25s",
              animation:`fadeUp 0.6s ${0.06*i}s ease both`, position:"relative", overflow:"hidden"
            }}
              onMouseEnter={e => { 
                e.currentTarget.style.borderLeftColor="var(--green)"; 
                e.currentTarget.style.borderColor="var(--green)"; 
                e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.3)"; 
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.borderLeftColor="var(--g600)"; 
                e.currentTarget.style.borderColor="var(--g600)"; 
                e.currentTarget.style.boxShadow="none"; 
              }}
            >
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"36px" }}>
                <span style={{ fontSize:"9px", color:"var(--g200)", letterSpacing:"0.2em", fontFamily:"var(--fm)", fontWeight:"500" }}>{c.num}</span>
                <span style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.14em", textTransform:"uppercase", transition:"color 0.2s" }}>{c.label} ↗</span>
              </div>
              <h3 style={{ fontFamily:"var(--fd)", fontSize:"26px", letterSpacing:"0.05em", marginBottom:"14px", color:"var(--white)" }}>{c.h}</h3>
              <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.8 }}>{c.d}</p>
            </button>
          ))}
        </div>
      </section>

      {/* HCC strip */}
      <section style={{ margin:"0 48px 72px", padding:"44px", background:"var(--g900)", border:"1px solid var(--g600)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"center" }}>
        <div>
          <div className="tag" style={{ marginBottom:"22px" }}>Anchor Partnership</div>
          <h2 style={{ fontFamily:"var(--fd)", fontSize:"38px", lineHeight:1, marginBottom:"18px" }}>HCC HEALTHCARE GROUP</h2>
           <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9 }}>
             Validated through our living lab partnership with the Hsiao Chung-Cheng Healthcare Group — a multi-campus operator on track for NASDAQ IPO in 2026. Our live deployment serves as the proof-of-concept for every future vertical, with pilot testing in rehab centres.
           </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
          {[["9,047","Active Beds"],["$70.5M","HCC 2026 Revenue"],["$1M","Ichorai ARR Target 2028"],["4+","Integrated Systems"]].map(([n,l]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", border:"1px solid var(--g800)" }}>
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

export default HomePage;
