import React from 'react';

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

export default FormField;