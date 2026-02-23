import React from 'react';

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

export default Marquee;