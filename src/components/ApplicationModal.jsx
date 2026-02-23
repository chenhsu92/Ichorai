import React, { useState } from 'react'
import FormField from './FormField'

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

export default ApplicationModal;
