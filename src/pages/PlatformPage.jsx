import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import FeatureCard from '../components/FeatureCard'
import Footer from '../components/Footer'

function PlatformPage({ navigate }) {
  const [tab, setTab] = useState(0);
  const tabs = [
    {
      label:"Industry 4.0 — Industrial AI PaaS", tag:"NOW DEPLOYING", tc:"var(--green)",
      title:"The 80/20 Framework",
      desc:"A proprietary architecture that standardises 80% of Industrial AI — handling noisy infrastructure and data fragmentation — leaving the critical 20% open for deep-domain customisation via the Domain Injection Interface.",
      arch:["RAW INDUSTRIAL DATA","↓  SEMANTIC NORMALISATION PROTOCOL","DATA MANAGER  [80% FOUNDATION]","↓  DOMAIN INJECTION INTERFACE","ACTIVE INTELLIGENCE LAYER  [20%]","↓  OUTPUT","PROPRIETARY AI ASSET"],
      hi:[2,4],
      features:[
        { name:"Data Manager", detail:"Hardened infrastructure layer. Resolves noisy, fragmented industrial data immediately out of the box using the Semantic Normalisation Protocol." },
        { name:"Semantic Normalisation Protocol", detail:"Dynamic schema inference + edge-based signal de-noising. Maps unstructured legacy data to a standardised ontology without rigid ETL pipelines." },
        { name:"Domain Injection Interface", detail:"Low-code interface for domain experts to define weighted parameters — tuning AI models without re-training core neural networks." },
        { name:"Active Intelligence Layer", detail:"The flexible 20% layer where clients inject proprietary domain expertise, transforming generic AI into a bespoke organisational asset." },
      ],
    },
    {
      label:"Industry 5.0 — Generative Archetype Engine", tag:"IN R&D", tc:"var(--amber)",
      title:"Generative Archetype Engine",
      desc:"A world-modelling AI system comparable in complexity to autonomous vehicle logic. GAE enables Socio-Industrial Synthesis — generating high-fidelity, human-centric blueprints for future infrastructure.",
      arch:["INPUT VECTORS  (DEMOGRAPHICS · ENV · LOGISTICS)","↓  WORLD MODELLING ENGINE","DIGITAL TWIN SANDBOX","↓  GENETIC ALGORITHM EVOLUTION","SOCIO-INDUSTRIAL SYNTHESIS","↓  OUTPUT","HUMAN-CENTRIC INFRASTRUCTURE BLUEPRINT"],
      hi:[2,4],
      features:[
        { name:"World Modelling", detail:"Probabilistic generative models simulate complex industrial ecosystems across thousands of configurations per second." },
        { name:"Socio-Industrial Synthesis", detail:"Multi-objective optimisation ingesting labour demographics, environmental constraints, and supply chain logistics." },
        { name:"Logic Container", detail:"Abstracts operational protocols from local billing codes — enabling global export of domain expertise without re-engineering software." },
        { name:"Digital Twin Sandbox", detail:"Evolutionary optimisation using genetic algorithms to breed optimal facility configurations before a single stone is laid." },
      ],
    },
  ];
  const t = tabs[tab];

  return (
    <>
      <PageHeader tag="Platform Architecture" title="THE<br/>PLATFORM." sub="Two stages of industrial intelligence — deployed today and engineered for Industry 5.0."/>

      <div style={{ padding:"0 48px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"var(--g900)", display:"flex" }}>
        {tabs.map((tb,i) => (
          <button key={i} onClick={() => setTab(i)} style={{ background:"none", border:"none", borderBottom:i===tab?"2px solid var(--white)":"2px solid transparent", color:i===tab?"var(--white)":"var(--g400)", padding:"18px 0", marginRight:"44px", fontFamily:"var(--fm)", fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s" }}>
            <span style={{ fontSize:"9px", color:tb.tc, display:"block", marginBottom:"5px", letterSpacing:"0.2em" }}>{tb.tag}</span>
            {tb.label}
          </button>
        ))}
      </div>

      <section style={{ padding:"72px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }}>
          <div>
            <h2 className="fu" style={{ fontFamily:"var(--fd)", fontSize:"clamp(40px,5vw,68px)", lineHeight:1, marginBottom:"22px" }}>{t.title}</h2>
            <p className="fu" style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, marginBottom:"44px", animationDelay:"0.1s" }}>{t.desc}</p>
            <div className="fu" style={{ border:"1px solid rgba(255,255,255,0.08)", padding:"26px", animationDelay:"0.2s" }}>
              <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px" }}>System Architecture</div>
              {t.arch.map((row,i) => (
                <div key={i} style={{ padding:"8px 12px", marginBottom:"2px", background:t.hi.includes(i)?"rgba(255,255,255,0.05)":"transparent", border:t.hi.includes(i)?"1px solid rgba(255,255,255,0.1)":"none", fontFamily:"var(--fm)", fontSize:"10px", letterSpacing:"0.08em", color:[1,3,5].includes(i)?"var(--g600)":"var(--white)" }}>{row}</div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            {t.features.map((f,i) => <FeatureCard key={f.name} index={i} name={f.name} detail={f.detail}/>)}
          </div>
        </div>
      </section>

      <section style={{ padding:"0 48px 72px" }}>
        <div className="tag" style={{ marginBottom:"40px" }}>Competitive Positioning</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2px" }}>
          {[
            { l:"Black Box Giants",      e:"Palantir, C3.ai",   d:"Generic. Prohibitively expensive. No domain connectors for legacy physical hardware.", adv:false },
            { l:"Legacy Incumbents",     e:"Epic, Siemens, SAP",d:"Data silos. Designed to store records, not synthesise cross-system intelligence.", adv:false },
            { l:"Boutique Consultancies",e:"Custom AI dev houses",d:"Zero scalability. Every deployment a new project. Technical debt guaranteed.", adv:false },
            { l:"Ichorai",               e:"Industrial AI PaaS", d:"Non-disruptive wrapper. Sector-agnostic 80/20 assembly line. Scalable from day one.", adv:true },
          ].map((c,i) => (
            <div key={i} style={{ border:`1px solid ${c.adv?"rgba(90,255,143,0.3)":"rgba(255,255,255,0.07)"}`, padding:"30px 26px", background:c.adv?"rgba(90,255,143,0.04)":"transparent" }}>
              <div style={{ fontSize:"9px", color:c.adv?"var(--green)":"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"12px" }}>{c.adv?"✓ ICHORAI":"TIER "+i}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"21px", marginBottom:"8px" }}>{c.l}</div>
              <div style={{ fontSize:"10px", color:"var(--g600)", marginBottom:"14px", fontStyle:"italic" }}>e.g. {c.e}</div>
              <p style={{ fontSize:"11px", color:c.adv?"var(--g200)":"var(--g400)", lineHeight:1.7 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTORS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default PlatformPage;
