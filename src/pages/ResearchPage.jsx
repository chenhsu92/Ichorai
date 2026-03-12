import React from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'

function ResearchPage({ navigate }) {
  const phases = [
    { trl:"TRL 3", label:"Experimental Proof of Concept", status:"ACHIEVED", sc:"var(--green)", desc:"Core Industrial AI architecture validated in a controlled lab setting using HCC sample data extracts. Noise-reduction algorithms confirmed feasible." },
    { trl:"TRL 1", label:"Ichorai Architecture Optimiser — Basic Principles", status:"IN DEVELOPMENT", sc:"var(--g400)", desc:"Knowledge-guided Small Language Model encoding domain-specific constraints. Physics-informed ML groundwork for verifiable reasoning." },
    { trl:"TRL 5", label:"Validation in Relevant Environment", status:"ACTIVE TARGET", sc:"var(--amber)", desc:"Scale testing to ingest full HCC historical datasets. Industrial AI runs as a shadow system to verify fidelity against real-world complexity without impacting live operations." },
    { trl:"TRL 1→3", label:"GAE — Basic Principles Phase", status:"EARLY R&D", sc:"var(--g400)", desc:"Formulating mathematical architecture and Socio-Industrial theoretical constraints for the Generative Archetype Engine. Scientific groundwork before coding begins." },
  ];
  const wps = [
    { code:"WP1", title:"Data Manager & Data Components", icon:"◧", items:["Finalise Data Injector & Data Lake architecture for rehab/polypharmacy HCC pilot","Dynamic schema inference + signal de-noising for Norak/Yangming HIS","Build Graphical Interface for clinicians","Achieve TRL 5 in shadow mode at HCC"] },
    { code:"WP2", title:"Generative Archetype Engine", icon:"◈", items:["Formalise GAE mathematical architecture & Socio-Industrial multi-objective functions","Begin Digital Twin sandbox simulation environment","Research genetic algorithms for facility design generation","Publish 'Logic Container' concept paper"] },
    { code:"WP3", title:"Business Development", icon:"◎", items:["Finalise HCC case study (white paper + video)","Identify 3 target UK healthcare providers for second pilot","Present at 2 key UK health-tech conferences","Secure MoU with system integrator partner"] },
    { code:"WP4", title:"Team & Operations", icon:"◉", items:["Recruit Lead Architect (Industrial 5.0 Specialist)","Recruit Full-Stack Engineer (React/Python)","Establish UK office & legal/financial infrastructure","Implement secure data handling protocols (FHIR, HL7)"] },
  ];

  return (
    <>
      <PageHeader tag="Research & Development" title={'BRIDGING<br/>THE<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">FRONTIER.</span>'}
        sub="Moving beyond standard supervised learning — towards a Cyber-Physical System architecture that interprets existing industrial data and simulates future industrial states."/>

      <section style={{ padding:"72px 48px" }}>
        <div className="tag" style={{ marginBottom:"44px" }}>Technology Readiness Levels</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"2px", marginBottom:"72px" }}>
          {phases.map((p,i) => (
              <div key={i} className="fu" style={{ border:"1px solid var(--g600)", background:"var(--g800)", borderLeft:`4px solid ${p.sc}`, padding:"28px", display:"grid", gridTemplateColumns:"140px 1fr auto", gap:"36px", alignItems:"center", animationDelay:`${0.1*i}s` }}>
               <div style={{ fontFamily:"var(--fd)", fontSize:"38px", color:p.sc, fontWeight:"700" }}>{p.trl}</div>
               <div>
                 <div style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"9px", fontFamily:"var(--fm)", fontWeight:"500" }}>{p.label}</div>
                 <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.8, fontFamily:"var(--fm)" }}>{p.desc}</p>
               </div>
                <div><span style={{ fontSize:"9px", color:p.sc, border:`1px solid ${p.sc}`, background:"var(--g800)", padding:"4px 10px", letterSpacing:"0.18em", whiteSpace:"nowrap", fontFamily:"var(--fm)", fontWeight:"500" }}>{p.status}</span></div>
             </div>
          ))}
        </div>

        <div className="tag" style={{ marginBottom:"40px" }}>Work Packages</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"2px", marginBottom:"72px" }}>
          {wps.map((w,i) => (
            <div key={i} className="fu card" style={{ padding:"32px", animationDelay:`${0.1*i}s` }}>
              <div style={{ display:"flex", gap:"14px", alignItems:"flex-start", marginBottom:"24px" }}>
                <span style={{ fontSize:"26px", color:"var(--g600)" }}>{w.icon}</span>
                <div>
                  <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"5px" }}>{w.code}</div>
                  <div style={{ fontFamily:"var(--fd)", fontSize:"22px" }}>{w.title}</div>
                </div>
              </div>
              {w.items.map((item,j) => (
                <div key={j} style={{ display:"flex", gap:"12px", marginBottom:"8px" }}>
                  <span style={{ color:"var(--g600)", fontSize:"12px", marginTop:"1px", flexShrink:0 }}>→</span>
                  <span style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="tag" style={{ marginBottom:"40px" }}>Financial Milestones</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {[
             { fy:"FY 2026-27", rev:"$150K", pct:"0.16% of HCC Revenue", phase:"Pilot Phase", desc:"Data Manager in Rehab Centre only. Fixed-fee pilot licensing includes upfront NRE (Non-Recurring Engineering). TRL 5 objective." },
             { fy:"FY 2027-28", rev:"$450K", pct:"0.64% of HCC Revenue", phase:"Expansion Phase", desc:"Rollout to Pharmacy & LTC units. Efficiency commission activates, plus commission for ontology library usage. Cash flow neutral." },
            { fy:"FY 2028-29", rev:"$1M",   pct:"1.1% of HCC Revenue",  phase:"Ecosystem Standard", desc:"Full 9,047-bed deployment. ~$9.25/bed/month. 90% gross margin. 25-30% net profit target." },
          ].map((m,i) => (
             <div key={i} style={{ border:"1px solid var(--g600)", background:"var(--g800)", padding:"32px", transition:"border-color 0.2s" }}>
               <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"14px", fontFamily:"var(--fm)", fontWeight:"500" }}>{m.fy} · {m.phase}</div>
               <div style={{ fontFamily:"var(--fd)", fontSize:"46px", lineHeight:1, marginBottom:"8px", fontWeight:"700" }}>{m.rev}</div>
               <div style={{ fontSize:"10px", color:"var(--g600)", marginBottom:"18px", fontFamily:"var(--fm)" }}>{m.pct}</div>
               <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7, fontFamily:"var(--fm)" }}>{m.desc}</p>
             </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PEOPLE PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default ResearchPage;
