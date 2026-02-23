import React, { useState } from 'react';

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

export default FeatureCard;