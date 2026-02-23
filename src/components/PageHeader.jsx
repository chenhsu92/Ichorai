import React from 'react';

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

export default PageHeader;