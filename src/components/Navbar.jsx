import React, { useState, useEffect } from 'react';
import Logo from './Logo';

function Navbar({ page, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const links = [
    { id:"home", label:"Home" }, { id:"platform", label:"Platform" },
    { id:"sectors", label:"Sectors" }, { id:"research", label:"Research" },
    { id:"people", label:"People" }, { id:"careers", label:"Careers" },
    { id:"contact", label:"Contact" },
  ];

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      height:"var(--nav)", padding:"0 48px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background: scrolled ? "rgba(7,7,7,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      transition:"background 0.4s, border-color 0.4s",
    }}>
      <button onClick={() => navigate("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", color:"var(--white)" }}>
        <Logo size={24}/><span style={{ fontFamily:"var(--fd)", fontSize:"21px", letterSpacing:"0.13em" }}>ICHORAI</span>
      </button>

      <div style={{ display:"flex", gap:"28px", alignItems:"center" }}>
        {links.slice(1).map(l => (
          <button key={l.id} onClick={() => navigate(l.id)} style={{
            background:"none", border:"none",
            color: page===l.id ? "var(--white)" : "var(--g400)",
            fontFamily:"var(--fm)", fontSize:"11px", letterSpacing:"0.14em",
            textTransform:"uppercase", cursor:"pointer", padding:"4px 0",
            borderBottom: page===l.id ? "1px solid var(--white)" : "1px solid transparent",
            transition:"color 0.2s, border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color="var(--white)"}
            onMouseLeave={e => e.currentTarget.style.color = page===l.id ? "var(--white)" : "var(--g400)"}
          >{l.label}</button>
        ))}
        <button className="btn-p" onClick={() => navigate("contact")} style={{ padding:"8px 20px", fontSize:"10px" }}>Get In Touch</button>
      </div>
    </nav>
  );
}

export default Navbar;