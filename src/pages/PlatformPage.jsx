import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import FeatureCard from '../components/FeatureCard'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import Footer from '../components/Footer'

function PlatformPage({ navigate }) {
  const [tab, setTab] = useState(0);
  const tabs = [
    {
      label:"Industry 4.0 — Industrial AI PaaS", tag:"NOW DEPLOYING", tc:"var(--green)",
      title:"The 80/20 Framework",
       desc:"A proprietary architecture that standardises 80% of Industrial AI — handling noisy infrastructure and data fragmentation — leaving the critical 20% open for deep-domain customisation via the Ichorai Architecture Optimiser, a knowledge-guided Small Language Model that encodes domain-specific constraints.",
        arch:["RAW INDUSTRIAL DATA","↓  DATA INJECTOR & DATA LAKE","DATA MANAGER  [80% FOUNDATION]","↓  GRAPHICAL INTERFACE","ICHORAI ARCHITECTURE OPTIMISER  [20%]","↓  OUTPUT","PROPRIETARY AI ASSET"],
      hi:[2,4],
      features:[
        { name:"Data Manager", detail:"Hardened infrastructure layer. Resolves noisy, fragmented industrial data immediately out of the box through Data Injector and Data Lake components." },
        { name:"Data Injector & Data Lake", detail:"Components that normalise disparate industrial signals into a coherent digital substrate, mapping incoming data to pre-defined Ichorai Architectures." },
        { name:"Graphical Interface for Domain Experts", detail:"Purely graphical UI allowing domain experts to adjust ontology representations without software expertise, tailoring outputs to specific organisational needs." },
         { name:"Ichorai Architecture Optimiser", detail:"Knowledge-guided Small Language Model encoding domain-specific constraints into latent space for sample-efficient learning and verifiable reasoning. Uses physics-informed ML to ensure outputs respect real-world limits." },
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

      <div style={{ padding:"0 48px", borderBottom:"1px solid var(--g600)", background:"var(--g900)", display:"flex" }}>
        {tabs.map((tb,i) => (
          <button key={i} onClick={() => setTab(i)} style={{ background:"none", border:"none", borderBottom:i===tab?"2px solid var(--green)":"2px solid transparent", color:i===tab?"var(--white)":"var(--g400)", padding:"18px 0", marginRight:"44px", fontFamily:"var(--fm)", fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.2s", fontWeight:"500" }}>
            <span style={{ fontSize:"9px", color:tb.tc, display:"block", marginBottom:"5px", letterSpacing:"0.2em", fontFamily:"var(--fm)" }}>{tb.tag}</span>
            {tb.label}
          </button>
        ))}
      </div>

      <section style={{ padding:"72px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }}>
          <div>
            <h2 className="fu" style={{ fontFamily:"var(--fd)", fontSize:"clamp(40px,5vw,68px)", lineHeight:1, marginBottom:"22px" }}>{t.title}</h2>
            <p className="fu" style={{ color:"var(--g400)", fontSize:"13px", lineHeight:1.9, marginBottom:"44px", animationDelay:"0.1s" }}>{t.desc}</p>
            <div className="fu" style={{ border:"1px solid var(--g600)", padding:"26px", animationDelay:"0.2s" }}>
              <div style={{ fontSize:"9px", color:"var(--g600)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"18px" }}>System Architecture</div>
              {t.arch.map((row,i) => (
                <div key={i} style={{ padding:"8px 12px", marginBottom:"2px", background:t.hi.includes(i)?"var(--g800)":"transparent", border:t.hi.includes(i)?"1px solid var(--g600)":"none", fontFamily:"var(--fm)", fontSize:"10px", letterSpacing:"0.08em", color:[1,3,5].includes(i)?"var(--g600)":"var(--white)" }}>{row}</div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            {t.features.map((f,i) => <FeatureCard key={f.name} index={i} name={f.name} detail={f.detail}/>)}
           </div>
        </div>
      </section>

      {tab === 0 && (
        <section style={{ padding: "0 48px 72px" }}>
          <ArchitectureDiagram />
        </section>
      )}

      <section style={{ padding:"0 48px 72px" }}>
        <div className="tag" style={{ marginBottom:"40px" }}>Competitive Positioning</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"2px" }}>
          {[
            { l:"'Operating System' Giants", group:"GROUP 1", e:"Palantir Foundry, d.AP", d:"Powerful general-purpose data operating systems built from ground-up for each client. Prohibitively expensive for SMEs; requires building proprietary ontology from scratch.", adv:false },
            { l:"Project-Based Consultancies", group:"GROUP 2", e:"Blue Projects, Zutari, Akselos", d:"Custom solutions with good flexibility but zero scalability. Treat every deployment as a new project, creating technical debt and client dependency.", adv:false },
            { l:"Legacy Systems — AI Rejects", group:"GROUP 3A", e:"MEDITECH, CPSI, Epic/Cerner", d:"Massive entrenched systems of record designed to store data, not support intelligence. Data silos prevent cross-system interoperability.", adv:false },
            { l:"Healthcare Interoperability Middleware", group:"GROUP 3B", e:"Oracle Health, Siemens, Microsoft Foundry", d:"Rule-heavy, expert-dependent middleware requiring manual scripting. Cost-prohibitive for mid-market; designed for flagship hospital trusts.", adv:false },
            { l:"Ichorai", group:"✓ ICHORAI", e:"Industrial AI PaaS", d:"Non-disruptive wrapper. Sector-agnostic 80/20 assembly line. Scalable from day one with domain connectors for legacy hardware.", adv:true },
          ].map((c,i) => (
            <div key={i} style={{ border:`1px solid ${c.adv?"rgba(90,255,143,0.3)":"var(--g600)"}`, padding:"30px 26px", background:c.adv?"rgba(90,255,143,0.04)":"transparent" }}>
              <div style={{ fontSize:"9px", color:c.adv?"var(--green)":"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"12px" }}>{c.group}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"21px", marginBottom:"8px" }}>{c.l}</div>
              <div style={{ fontSize:"10px", color:"var(--g600)", marginBottom:"14px", fontStyle:"italic" }}>e.g. {c.e}</div>
              <p style={{ fontSize:"11px", color:c.adv?"var(--g200)":"var(--g400)", lineHeight:1.7 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:"0 48px 72px" }}>
        <div className="tag" style={{ marginBottom:"40px" }}>Partnerships & Infrastructure</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"2px" }}>
          {[
            { name:"Taiwan National Institute of Applied Research", desc:"Secure data centre collaboration with National Centre for High-performance Computing for Asia Pacific distribution", type:"Infrastructure Partner" },
            { name:"Tenstorrent", desc:"Developing 'middle-edge' on-premise servers to keep domain data local, ensuring data never leaves client premises", type:"Hardware Partner" },
          ].map((p,i) => (
            <div key={i} style={{ border:"1px solid var(--g600)", padding:"30px 26px" }}>
              <div style={{ fontSize:"9px", color:"var(--g400)", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"12px" }}>{p.type}</div>
              <div style={{ fontFamily:"var(--fd)", fontSize:"21px", marginBottom:"8px" }}>{p.name}</div>
              <p style={{ fontSize:"11px", color:"var(--g400)", lineHeight:1.7 }}>{p.desc}</p>
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
