import React, { Suspense, lazy } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import MouseEffects from './components/originkit/ui/clickeffects';

// Lazy load non-critical sections for performance
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const FrameScrollAnimation = lazy(() => import('./components/FrameScrollAnimation'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <>
      {/* Originkit Futuristic Cyber Click Effects */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <MouseEffects 
          color="#3b82f6" 
          interactionMode="sniper" 
          duration={0.4} 
          effectSize={80} 
          strokeWidth={2} 
          showLabel={false} 
        />
      </div>

      <Navbar />
      <Hero />
      
      <Suspense fallback={<div className="h-screen bg-black" />}>
        {/* Welcome to Portfolio Section */}
        <FrameScrollAnimation frameCount={240} />
        <About />
        <Portfolio />
        <Services />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
