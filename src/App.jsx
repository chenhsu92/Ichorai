import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import SectorsPage from './pages/SectorsPage';
import ResearchPage from './pages/ResearchPage';
import PeoplePage from './pages/PeoplePage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';

const PAGES = {
  home:     HomePage,
  platform: PlatformPage,
  sectors:  SectorsPage,
  research: ResearchPage,
  people:   PeoplePage,
  careers:  CareersPage,
  contact:  ContactPage,
};

export default function App() {
  const [page, setPage]   = useState("home");
  const [fading, setFading] = useState(false);

  const navigate = useCallback((to) => {
    if (to === page) { window.scrollTo({top:0,behavior:"smooth"}); return; }
    setFading(true);
    setTimeout(() => { setPage(to); setFading(false); window.scrollTo(0,0); }, 200);
  }, [page]);

  const Page = PAGES[page] || HomePage;

  return (
    <>
      <Navbar page={page} navigate={navigate}/>
      <main style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(8px)" : "translateY(0)", transition:"opacity 0.2s ease, transform 0.2s ease" }}>
        <Page navigate={navigate}/>
      </main>
    </>
  );
}