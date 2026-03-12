import React from 'react';
import Logo from './Logo';

function Footer({ navigate }) {
  const cols = [
    { title:"Platform", links:[["platform","Industrial AI PaaS"],["platform","80/20 Framework"],["research","R&D Pipeline"],["platform","Competitor Comparison"]] },
    { title:"Company",  links:[["people","Key People"],["careers","Careers"],["contact","Contact"],["contact","Press"]] },
    { title:"Sectors",  links:[["sectors","Healthcare & LTC"],["sectors","Logistics"],["sectors","Energy & Manufacturing"]] },
  ];
  return (
     <footer style={{ background:"var(--g900)", borderTop:"1px solid var(--g600)", padding:"60px 48px 36px" }}>
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
                 onMouseEnter={e => e.currentTarget.style.color="var(--green)"}
                 onMouseLeave={e => e.currentTarget.style.color="var(--g400)"}
              >{label}</button>
            ))}
          </div>
        ))}
      </div>
       <div style={{ borderTop:"1px solid var(--g600)", paddingTop:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px" }}>
        <span style={{ fontSize:"10px", color:"var(--g600)", letterSpacing:"0.12em" }}>© 2026 ICHORAI LTD. ALL RIGHTS RESERVED.</span>
        <span style={{ fontSize:"10px", color:"var(--g600)", letterSpacing:"0.12em" }}>INDUSTRIAL AI · INDUSTRY 4.0 → 5.0 · BUILT FOR PERMANENCE</span>
      </div>
    </footer>
  );
}

export default Footer;