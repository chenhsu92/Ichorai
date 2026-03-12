import React from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'

function PeoplePage({ navigate }) {
  return (
    <>
      <PageHeader tag="The Team" title={'KEY<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">PEOPLE.</span>'}
        sub="A lean, elite team of domain thinkers — people who believe that AI should augment human capability, not replace it."/>

      <div style={{ margin:"40px 48px 0", padding:"18px 24px", border:"1px solid rgba(255,184,77,0.3)", background:"rgba(255,184,77,0.04)", fontSize:"11px", color:"var(--amber)", lineHeight:1.7, letterSpacing:"0.08em" }}>
        ⚠ PLACEHOLDER SECTION — Replace all bios, headshots, and links with actual team details. This layout is pre-built and ready.
      </div>

      <section style={{ padding:"48px 48px 72px" }}>
        {/* Founder - full-width card */}
        <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", border:"1px solid var(--g600)", marginBottom:"2px" }}>
          <div style={{ background:"var(--g900)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", minHeight:"340px", borderRight:"1px solid var(--g600)" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"18px 18px" }}/>
            <div style={{ width:"80px", height:"80px", border:"1px solid var(--g600)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fd)", fontSize:"22px", color:"var(--g400)", zIndex:1 }}>HC</div>
            <div style={{ position:"absolute", bottom:"16px", fontSize:"9px", color:"var(--g600)", letterSpacing:"0.15em", zIndex:1 }}>[ ADD HEADSHOT ]</div>
          </div>
          <div style={{ padding:"44px" }}>
            <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"8px" }}>Founder & CEO</div>
            <div style={{ fontFamily:"var(--fd)", fontSize:"30px", marginBottom:"22px" }}>Hsu, Chen</div>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, fontStyle:"italic", marginBottom:"28px" }}>
              [ Founder bio placeholder — replace with your own. Describe your background, domain expertise, the vision behind Ichorai, and what drove you to build Industrial AI. Include any relevant experience in healthcare technology, AI/ML research, business building, or deep domain sectors. ]
            </p>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, fontStyle:"italic", marginBottom:"28px" }}>
              [ Add a second paragraph if desired — personal philosophy, specific achievements, or your perspective on Industry 5.0. ]
            </p>
            <div style={{ display:"flex", gap:"12px" }}>
              <button className="btn-g" style={{ fontSize:"10px", padding:"8px 20px" }}>LinkedIn ↗</button>
              <button className="btn-g" style={{ fontSize:"10px", padding:"8px 20px" }}>Twitter / X ↗</button>
            </div>
          </div>
        </div>

        {/* Two placeholder cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px", marginBottom:"56px" }}>
          {[
            { role:"Lead Architect — Industrial 5.0", bio:"[ Seeking an Industrial 5.0 Specialist with expertise in probabilistic generative models, NLP, and cyber-physical system architecture. ]" },
            { role:"Full-Stack Engineer", bio:"[ React/Python engineer for the Graphical Interface and core platform infrastructure. Healthcare data standards (FHIR, HL7) a plus. ]" },
          ].map((p,i) => (
             <div key={i} style={{ border:"1px solid var(--g600)" }}>
               <div style={{ background:"var(--g900)", height:"190px", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", borderBottom:"1px solid var(--g600)" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize:"16px 16px" }}/>
                <div style={{ width:"60px", height:"60px", border:"1px solid var(--g600)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--fd)", fontSize:"16px", color:"var(--g400)", zIndex:1 }}>—</div>
                <div style={{ position:"absolute", bottom:"12px", fontSize:"9px", color:"var(--g600)", letterSpacing:"0.15em", zIndex:1 }}>POSITION OPEN</div>
              </div>
              <div style={{ padding:"28px" }}>
                <div style={{ fontSize:"9px", color:"var(--amber)", letterSpacing:"0.2em", border:"1px solid rgba(255,184,77,0.3)", display:"inline-block", padding:"2px 8px", marginBottom:"10px" }}>PLACEHOLDER</div>
                <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"6px" }}>{p.role}</div>
                <div style={{ fontFamily:"var(--fd)", fontSize:"20px", marginBottom:"14px", color:"var(--g400)", fontStyle:"italic" }}>[ Position Open ]</div>
                <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.8, fontStyle:"italic" }}>{p.bio}</p>
                <button className="btn-p" onClick={() => navigate("careers")} style={{ marginTop:"20px", fontSize:"10px", padding:"8px 20px" }}>View Open Role →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <div className="tag" style={{ marginBottom:"36px" }}>Advisors & Partners</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {["Strategic Advisor","Industry Advisor","Technical Advisor"].map((r,i) => (
            <div key={i} style={{ border:"1px solid rgba(255,255,255,0.07)", borderLeft:"3px solid rgba(255,184,77,0.3)", padding:"28px" }}>
              <div style={{ fontSize:"9px", color:"var(--amber)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"10px" }}>PLACEHOLDER</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"20px", marginBottom:"8px", color:"var(--g400)" }}>{r}</div>
              <p style={{ color:"var(--g600)", fontSize:"11px", lineHeight:1.7, fontStyle:"italic" }}>[ Add advisor name, background, and their contribution to Ichorai's mission here. ]</p>
            </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAREERS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default PeoplePage;
