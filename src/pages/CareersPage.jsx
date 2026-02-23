import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'
import ApplicationModal from '../components/ApplicationModal'

function CareersPage({ navigate }) {
  const [selected, setSelected] = useState(null);
  const [appRole, setAppRole] = useState(null);

  const roles = [
    { id:1, title:"Lead Architect — Industrial 5.0", type:"Full-Time", loc:"London, UK (Hybrid)", sal:"Competitive + Equity",
      desc:"[ Placeholder — edit with your full job description. Example: Seeking an experienced AI architect with expertise in probabilistic generative models, world-modelling systems, and cyber-physical architectures to lead the technical design of the Generative Archetype Engine. You will set the technical direction and work directly with the founder. ]",
      reqs:["[ Requirement 1 — e.g. 5+ years in AI/ML architecture ]","[ Requirement 2 — e.g. Experience with generative or world-modelling systems ]","[ Requirement 3 — e.g. PhD or equivalent in relevant field ]","[ Requirement 4 — e.g. Background in industrial or physical domain AI ]"] },
    { id:2, title:"Full-Stack Engineer (React / Python)", type:"Full-Time", loc:"London, UK (Hybrid)", sal:"Competitive + Equity",
      desc:"[ Placeholder — edit with your full job description. Example: Building the Domain Injection Interface and core platform infrastructure. You will own the product layer that allows domain experts to tune AI models without engineering support. Strong React and Python required. ]",
      reqs:["[ Requirement 1 — e.g. 3+ years React and Python ]","[ Requirement 2 — e.g. Experience with data-heavy interfaces ]","[ Requirement 3 — e.g. Healthcare data standards (FHIR, HL7) a plus ]","[ Requirement 4 — e.g. Comfort with ambiguity at early-stage ]"] },
    { id:3, title:"R&D Researcher — Socio-Industrial AI", type:"Full-Time / Contract", loc:"Remote / London", sal:"Competitive",
      desc:"[ Placeholder — edit with your full job description. Example: Research role focused on the mathematical architecture for Socio-Industrial Synthesis. Background in operations research, generative modelling, urban planning AI, or sustainable systems design. ]",
      reqs:["[ Requirement 1 — e.g. PhD candidate or postdoc in relevant discipline ]","[ Requirement 2 — e.g. Probabilistic modelling or generative AI ]","[ Requirement 3 — e.g. Interest in sustainability and human-centric systems ]","[ Requirement 4 — e.g. Publication record a plus ]"] },
  ];

  return (
    <>
      <PageHeader tag="Join Ichorai" title={'BUILD THE<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">FUTURE</span><br/>WITH US.'}
        sub="We hire people who believe AI should augment human capability — not replace it. Lean team. Deep thinking. Permanent impact."/>

      {/* Values */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        {[
          { icon:"◎", l:"Human-Centric", d:"We build AI that serves people, not the reverse." },
          { icon:"◈", l:"Domain-First",  d:"Deep expertise over surface-level generalism." },
          { icon:"◧", l:"Permanent Work",d:"We build for decades, not quarters." },
          { icon:"⬡", l:"Lean & Elite",  d:"Small team. Massive surface area. High trust." },
        ].map((v,i) => (
          <div key={i} style={{ padding:"32px 26px", borderRight:i<3?"1px solid rgba(255,255,255,0.07)":"none" }}>
            <div style={{ fontSize:"26px", color:"rgba(255,255,255,0.18)", marginBottom:"14px" }}>{v.icon}</div>
            <div style={{ fontFamily:"var(--fd)", fontSize:"20px", letterSpacing:"0.05em", marginBottom:"8px" }}>{v.l}</div>
            <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{v.d}</p>
          </div>
        ))}
      </div>

      <div style={{ margin:"40px 48px 0", padding:"16px 22px", border:"1px solid rgba(255,184,77,0.3)", background:"rgba(255,184,77,0.04)", fontSize:"11px", color:"var(--amber)", lineHeight:1.7, letterSpacing:"0.08em" }}>
        ⚠ PLACEHOLDER LISTINGS — Edit each role with actual job descriptions and requirements before publishing.
      </div>

      <section style={{ padding:"36px 48px 72px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
          {roles.map((role,i) => (
            <div key={role.id} style={{ border:"1px solid rgba(255,255,255,0.07)", overflow:"hidden", transition:"border-color 0.22s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}
            >
              <div onClick={() => setSelected(selected===role.id?null:role.id)}
                style={{ padding:"28px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", flexWrap:"wrap", gap:"14px" }}>
                <div>
                  <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"7px" }}>
                    {role.type} · {role.loc} · <span style={{ color:"var(--amber)" }}>PLACEHOLDER</span>
                  </div>
                  <h3 style={{ fontFamily:"var(--fd)", fontSize:"28px", letterSpacing:"0.04em" }}>{role.title}</h3>
                  <div style={{ fontSize:"10px", color:"var(--g600)", marginTop:"5px" }}>{role.sal}</div>
                </div>
                <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
                  <button className="btn-p" onClick={e => { e.stopPropagation(); setAppRole(role); }} style={{ fontSize:"10px", padding:"10px 26px" }}>Apply Now</button>
                  <span style={{ color:"var(--g400)", fontSize:"18px", transition:"transform 0.2s", transform:selected===role.id?"rotate(180deg)":"none" }}>↓</span>
                </div>
              </div>
              {selected===role.id && (
                <div style={{ padding:"0 32px 28px", animation:"fadeUp 0.3s ease", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ marginTop:"22px" }}>
                    <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"10px" }}>About the Role</div>
                    <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.8, fontStyle:"italic" }}>{role.desc}</p>
                  </div>
                  <div style={{ marginTop:"24px" }}>
                    <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"10px" }}>Requirements</div>
                    {role.reqs.map((r,j) => (
                      <div key={j} style={{ display:"flex", gap:"12px", marginBottom:"8px" }}>
                        <span style={{ color:"var(--g600)", fontSize:"12px" }}>→</span>
                        <span style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7, fontStyle:"italic" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Speculative */}
        <div style={{ marginTop:"40px", border:"1px dashed rgba(255,255,255,0.12)", padding:"36px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"20px" }}>
          <div>
            <div style={{ fontFamily:"var(--fd)", fontSize:"24px", marginBottom:"8px" }}>Don't See Your Role?</div>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.8, maxWidth:"480px" }}>We always have room for exceptional people. If you're deeply knowledgeable in Industrial AI, healthcare data, or Socio-Industrial systems — send a speculative application.</p>
          </div>
          <button className="btn-g" onClick={() => setAppRole({ title:"Speculative Application", id:99 })}>Apply Speculatively</button>
        </div>
      </section>

      {appRole && <ApplicationModal role={appRole} onClose={() => setAppRole(null)}/>}
      <Footer navigate={navigate}/>
    </>
  );
}

export default CareersPage;
