import React from 'react';

function PageHeader({ tag, title, sub }) {
  return (
     <div className="gbg" style={{
       padding:"calc(var(--nav) + 72px) 48px 72px",
       borderBottom:"1px solid var(--g600)", position:"relative", overflow:"hidden",
     }}>
       <div className="tag fu" style={{ marginBottom:"24px", animationDelay:"0.05s" }}>{tag}</div>
       <h1 className="fu" style={{ fontFamily:"var(--fd)", fontSize:"clamp(52px,8vw,108px)", lineHeight:0.91, letterSpacing:"0.01em", marginBottom:"24px", animationDelay:"0.12s", fontWeight:"700" }}
         dangerouslySetInnerHTML={{ __html: title }}/>
       {sub && <p className="fu" style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, maxWidth:"500px", animationDelay:"0.22s" }}>{sub}</p>}
     </div>
  );
}

export default PageHeader;