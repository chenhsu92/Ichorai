import React from 'react';

function FormField({ label, value, onChange, placeholder, type="text" }) {
  return (
    <div>
      <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"9px" }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width:"100%", background:"var(--g900)", border:"1px solid var(--g600)", borderBottom:"1px solid var(--g400)", color:"var(--white)", padding:"12px 15px", fontFamily:"var(--fm)", fontSize:"12px", outline:"none", transition:"border-color 0.2s" }}
        onFocus={e => e.target.style.borderBottomColor="var(--green)"}
        onBlur={e => e.target.style.borderBottomColor="var(--g400)"}
      />
    </div>
  );
}

export default FormField;