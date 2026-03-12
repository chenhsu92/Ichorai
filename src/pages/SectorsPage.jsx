import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'

function SectorsPage({ navigate }) {
  const [active, setActive] = useState(0);
  const sectors = [
    {
      num:"01", icon:"⬡", name:"Healthcare & Long-Term Care", status:"LIVE", sc:"var(--green)",
      desc:"Anchor deployment at HCC Healthcare Group. Resolving fragmented multi-system data environments across hospitals, LTC facilities (1,000+ beds), pharmacies, rehabilitation centres, and social work workflows.",
       proof:"9,047 beds · $1M ARR target 2028 · Yangming HIS + Norak + CareYou + KL1 integration · IKO Life & G-Clinic validation",
      details:[
        { l:"Pain Point", v:"4+ non-communicating software systems. Paper-based social work. 300+ active patients tracked via coloured trays and handwritten notes. No unified clinical-to-therapist trigger." },
        { l:"Our Solution", v:"Data Manager normalises disparate clinical, administrative, pharmacy, and social care signals. Data Injector & Data Lake acts as connective tissue over existing systems — no rip-and-replace." },
        { l:"Unit Economics", v:"~$9.25 per bed/month. Significantly below legacy HIS costs. $1M ARR from single client by FY 2028-29. 90% gross margin target." },
        { l:"Validation Partners", v:"IKO Life and G-Clinic serve as secondary clients for testing the Ichorai Architecture Optimiser, ensuring robustness across diverse healthcare environments." },
      ],
    },
    {
      num:"02", icon:"◈", name:"Logistics & Supply Chain", status:"PHASE 2", sc:"var(--amber)",
      desc:"The same noisy-data problem that plagues healthcare — fragmented supply chain logs, disparate sensor arrays, siloed inventory data — translates directly via our sector-agnostic Data Manager.",
      proof:"Planned Phase 2 vertical · Data Injector & Data Lake retrained on logistics datasets · Living lab partnership model",
      details:[
        { l:"The Parallel", v:"Fragmented supply chain logs mirror healthcare's disconnected HIS systems. Our Data Injector & Data Lake is domain-agnostic — same architecture, different ontology." },
        { l:"Our Approach", v:"The Data Injector & Data Lake retrains on logistics datasets via another 'living lab' partnership. 80% infrastructure reused with minimal R&D overhead. Phase 2 expansion target: Years 2-3." },
        { l:"Opportunity", v:"Universal technical debt. Logistics companies struggle with fragmented inventory data the same way hospitals struggle with siloed patient records." },
      ],
    },
    {
      num:"03", icon:"◉", name:"Energy & Manufacturing", status:"PHASE 3", sc:"var(--g400)",
      desc:"Disparate SCADA sensor arrays and energy load profiles pose identical normalisation challenges. The 80% Fixed Foundation ports horizontally — enabling a zero-touch deployment model for simpler clients.",
      proof:"Phase 3 automated self-service · Zero human intervention deployment · Standardised assembly line model",
      details:[
        { l:"The Gap", v:"Energy grids struggle with disparate sensor arrays exactly as hospitals struggle with siloed patient data. The normalisation problem is universal across physical sectors." },
        { l:"Our Approach", v:"Automated, self-service version of the Data Manager for smaller industrial players. Platform maturity enables deployment with zero human intervention." },
        { l:"Timeline", v:"Phase 3: Years 3-5. As the platform matures from high-touch healthcare model to fully automated standardised assembly line — the true Ichorai endgame." },
      ],
    },
  ];
  const s = sectors[active];

  return (
    <>
      <PageHeader tag="Target Verticals" title={'DEEP<br/><span style="color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,0.42)">DOMAIN</span><br/>SECTORS.'} sub="The Capability Gap is sector-agnostic. Where physical industries lack the software DNA to build complex AI infrastructure, Ichorai deploys its standardised assembly line."/>

      <section style={{ padding:"72px 48px" }}>
        <div style={{ display:"flex", gap:"2px", marginBottom:"56px" }}>
           {sectors.map((sec,i) => (
            <button key={i} onClick={() => setActive(i)} style={{ flex:1, background:i===active?"var(--g800)":"transparent", border:`1px solid ${i===active?"var(--green)":"var(--g600)"}`, padding:"22px 18px", cursor:"pointer", textAlign:"left", transition:"all 0.22s" }}>
              <div style={{ fontSize:"9px", color:sec.sc, letterSpacing:"0.2em", border:`1px solid ${sec.sc}40`, display:"inline-block", padding:"2px 8px", marginBottom:"10px", fontFamily:"var(--fm)", fontWeight:"500" }}>{sec.status}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"20px", letterSpacing:"0.04em", color:"var(--white)", fontWeight:"600" }}>{sec.name}</div>
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", animation:"fadeUp 0.4s ease" }} key={active}>
          <div>
            <div style={{ fontSize:"44px", color:"var(--g600)", marginBottom:"22px" }}>{s.icon}</div>
            <h2 style={{ fontFamily:"var(--fd)", fontSize:"clamp(34px,4vw,54px)", lineHeight:1, marginBottom:"22px" }}>{s.name}</h2>
            <p style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, marginBottom:"30px" }}>{s.desc}</p>
            <div style={{ border:"1px solid var(--g600)", background:"var(--g800)", padding:"18px", fontSize:"11px", color:"var(--g400)", letterSpacing:"0.05em", lineHeight:1.7, fontFamily:"var(--fm)" }}>{s.proof}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
             {s.details.map((d,i) => (
              <div key={i} style={{ border:"1px solid var(--g600)", borderLeft:"3px solid var(--green)", background:"var(--g800)", padding:"22px", transition:"border-color 0.2s" }}>
                <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"9px", fontFamily:"var(--fm)", fontWeight:"500" }}>{d.l}</div>
                <p style={{ color:"var(--g200)", fontSize:"12px", lineHeight:1.8, fontFamily:"var(--fm)" }}>{d.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"0 48px 72px" }}>
        <div className="tag" style={{ marginBottom:"40px" }}>Market Opportunity</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
          {[
            { circle:"Level 1", title:"HCC Ecosystem", value:"$90.75M", sub:"Projected HCC revenue by 2028. Our core ARR base. Scales linearly with HCC bed count and pharmacy expansion." },
            { circle:"Level 2", title:"Global Ageing Economy", value:"2B+", sub:"Population aged 60+ by 2050 (WHO). Healthcare providers allocating 5-10% revenue to technology budgets." },
            { circle:"Level 3", title:"Deep Domain TAM", value:"Multi-BN", sub:"Logistics, Energy, Manufacturing face identical capability gap. Sector-agnostic platform multiplies TAM." },
          ].map((m,i) => (
             <div key={i} style={{ border:"1px solid var(--g600)", background:"var(--g800)", padding:"36px 32px", transition:"border-color 0.2s" }}>
               <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px", fontFamily:"var(--fm)", fontWeight:"500" }}>{m.circle}</div>
               <div style={{ fontFamily:"var(--fd)", fontSize:"50px", lineHeight:1, marginBottom:"10px", fontWeight:"700" }}>{m.value}</div>
               <div style={{ fontFamily:"var(--fd)", fontSize:"18px", letterSpacing:"0.05em", marginBottom:"14px", fontWeight:"600" }}>{m.title}</div>
               <p style={{ color:"var(--g400)", fontSize:"12px", lineHeight:1.7, fontFamily:"var(--fm)" }}>{m.sub}</p>
             </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESEARCH PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default SectorsPage;
