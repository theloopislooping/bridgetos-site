import React, { useState } from 'react';
import WaitlistModal    from './components/sections/WaitlistModal.jsx';
import AnnouncementBar  from './components/sections/AnnouncementBar.jsx';
import StickyBar        from './components/sections/StickyBar.jsx';
import Nav              from './components/sections/Nav.jsx';
import Hero             from './components/sections/Hero.jsx';
import SocialProof      from './components/sections/SocialProof.jsx';
import Problem          from './components/sections/Problem.jsx';
import ThreatScenarios  from './components/sections/ThreatScenarios.jsx';
import HowItWorks       from './components/sections/HowItWorks.jsx';
import Integrations     from './components/sections/Integrations.jsx';
import Product          from './components/sections/Product.jsx';
import ConsolePreview   from './components/sections/ConsolePreview.jsx';
import VideoTeaser      from './components/sections/VideoTeaser.jsx';
import SovereigntyArch  from './components/sections/SovereigntyArch.jsx';
import Compliance       from './components/sections/Compliance.jsx';
import Comparison       from './components/sections/Comparison.jsx';
import MiniConsole      from './components/MiniConsole.jsx';
import Roadmap          from './components/sections/Roadmap.jsx';
import WhitePaper       from './components/sections/WhitePaper.jsx';
import FAQ              from './components/sections/FAQ.jsx';
import Founder          from './components/sections/Founder.jsx';
import Partnership      from './components/sections/Partnership.jsx';
import Footer           from './components/sections/Footer.jsx';

export default function App() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const join = () => setShowWaitlist(true);

  return (
    <>
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}

      {/* Fixed left sidebar — hidden on mobile (hamburger replaces it) */}
      <Nav onJoin={join} />

      {/* Sticky bottom bar — appears on scroll */}
      <StickyBar onJoin={join} />

      {/* Content area — offset right of sidebar on md+ */}
      <div className="md:ml-56">
        <AnnouncementBar />
        <main>
          <Hero onJoin={join} />
          <SocialProof />
          <Problem />
          <ThreatScenarios />
          <HowItWorks />
          <Integrations />
          <Product />
          <ConsolePreview onJoin={join} />
          <VideoTeaser onJoin={join} />
          <SovereigntyArch />
          <Compliance />
          <Comparison />
          <MiniConsole />
          <Roadmap />
          <WhitePaper />
          <FAQ />
          <Founder />
          <Partnership onJoin={join} />
        </main>
        <Footer />
      </div>
    </>
  );
}
