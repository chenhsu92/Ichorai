import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import FormField from '../components/FormField'

function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name:"", email:"", subject:"general", message:"" });
  const [sent, setSent] = useState(false);
  const up = (k,v) => setForm(f => ({...f,[k]:v}));
  const FORMSPREE_ID = "YOUR_FORM_ID"; // ← REPLACE WITH YOUR FORMSPREE FORM ID

  const send = async () => {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { method:"POST", headers:{"Content-Type":"application/json",Accept:"application/json"}, body:JSON.stringify(form) });
      if (res.ok) setSent(true);
    } catch {}
  };

  return (
    <>
      <PageHeader tag="Get In Touch" title={"LET'S BUILD<br/>SOMETHING<br/>PERMANENT."} sub="Whether you're a deep domain operator, an investor aligned with Industry 5.0, or a potential team member — we want to hear from you."/>

      <section style={{ padding:"72px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }}>
          <div>
            <div className="tag" style={{ marginBottom:"32px" }}>Contact Information</div>
            {[
              { l:"General Enquiries",     v:"hello@ichorai.com" },
              { l:"Partnerships & Pilots", v:"partnerships@ichorai.com" },
              { l:"Careers",               v:"careers@ichorai.com" },
              { l:"Press & Media",         v:"press@ichorai.com" },
              { l:"Location",              v:"London, United Kingdom" },
            ].map(({ l,v }) => (
              <div key={l} style={{ padding:"18px 0", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:"28px", alignItems:"center" }}>
                <span style={{ fontSize:"10px", color:"var(--g600)", letterSpacing:"0.14em", textTransform:"uppercase", minWidth:"170px" }}>{l}</span>
                <span style={{ fontSize:"13px", color:"var(--white)" }}>{v}</span>
              </div>
            ))}

            <div style={{ marginTop:"44px", border:"1px solid rgba(255,255,255,0.07)", padding:"26px" }}>
              <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px" }}>Quick Routing Guide</div>
              {[
                ["Pilot Partnership","Deep domain operator with a noisy data problem? We offer a de-risked pilot model — select a specific domain, prove the value, then scale."],
                ["Investment","We are raising a seed round to accelerate R&D and expand to 2-3 new clients. Institutional and strategic investors welcome."],
                ["Career Enquiries","Not seeing a role? Send a speculative application. We always have room for exceptional people aligned with our mission."],
              ].map(([t,d]) => (
                <div key={t} style={{ marginBottom:"16px" }}>
                  <div style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"5px" }}>{t}</div>
                  <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="tag" style={{ marginBottom:"32px" }}>Send a Message</div>
            {sent ? (
              <div style={{ border:"1px solid rgba(90,255,143,0.3)", padding:"44px", textAlign:"center", background:"rgba(90,255,143,0.04)" }}>
                <div style={{ fontFamily:"var(--fd)", fontSize:"34px", marginBottom:"14px" }}>MESSAGE SENT</div>
                <p style={{ color:"var(--g400)", fontSize:"13px" }}>We'll be in touch shortly.</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
                <FormField label="Name *" value={form.name} onChange={v=>up("name",v)} placeholder="Your name"/>
                <FormField label="Email *" value={form.email} onChange={v=>up("email",v)} placeholder="you@email.com" type="email"/>
                <div>
                  <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"9px" }}>Subject</label>
                  <select value={form.subject} onChange={e=>up("subject",e.target.value)} style={{ width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderBottom:"1px solid rgba(255,255,255,0.26)", color:"var(--white)", padding:"12px 15px", fontFamily:"var(--fm)", fontSize:"12px", outline:"none" }}>
                    <option value="general"    style={{background:"#111"}}>General Enquiry</option>
                    <option value="pilot"      style={{background:"#111"}}>Pilot Partnership</option>
                    <option value="investment" style={{background:"#111"}}>Investment</option>
                    <option value="careers"    style={{background:"#111"}}>Careers / Speculative</option>
                    <option value="press"      style={{background:"#111"}}>Press & Media</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:"10px", color:"var(--g400)", letterSpacing:"0.15em", textTransform:"uppercase", display:"block", marginBottom:"9px" }}>Message *</label>
                  <textarea value={form.message} onChange={e=>up("message",e.target.value)} placeholder="Tell us about your organisation, challenge, or vision..."
                    style={{ width:"100%", minHeight:"140px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderBottom:"1px solid rgba(255,255,255,0.26)", color:"var(--white)", padding:"13px 15px", fontFamily:"var(--fm)", fontSize:"12px", lineHeight:1.8, resize:"vertical", outline:"none" }}/>
                </div>
                <button className="btn-p" onClick={send} disabled={!form.name||!form.email||!form.message} style={{ width:"100%", padding:"15px", opacity:!form.name||!form.email||!form.message?0.38:1 }}>
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}


export default ContactPage;
