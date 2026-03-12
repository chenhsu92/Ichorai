import React, { useState } from 'react';

function FeatureCard({ index, name, detail }) {
  const [open, setOpen] = useState(false);
  return (
     <div onClick={() => setOpen(!open)} style={{ border:"1px solid var(--g600)", borderLeft:"3px solid var(--green)", padding:"20px", cursor:"pointer", background:open?"rgba(90,255,143,0.05)":"transparent", transition:"all 0.2s" }}
       onMouseEnter={e => { if(!open) e.currentTarget.style.background="rgba(90,255,143,0.03)"; e.currentTarget.style.borderColor="var(--g400)"; }}
       onMouseLeave={e => { if(!open) e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="var(--g600)"; }}
     >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"var(--fm)", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase" }}>
          <span style={{ color:"var(--g600)", fontSize:"9px", marginRight:"8px" }}>0{index+1}</span>{name}
        </span>
         <span style={{ color:"var(--green)", fontSize:"18px", transition:"transform 0.2s", transform:open?"rotate(45deg)":"none" }}>+</span>
      </div>
      {open && <p style={{ marginTop:"14px", color:"var(--g400)", fontSize:"12px", lineHeight:1.8, animation:"fadeUp 0.3s ease" }}>{detail}</p>}
    </div>
  );
}

export default FeatureCard;