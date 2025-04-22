import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ToolsGrid from './components/ToolsGrid';
import RegistrySection from './components/RegistrySection';
import BreathingModal from './components/modals/BreathingModal';
import GroundingModal from './components/modals/GroundingModal';
import OppositeActionModal from './components/modals/OppositeActionModal';
import DistractionModal from './components/modals/DistractionModal';
import SelfSoothingModal from './components/modals/SelfSoothingModal';
import CrisisModal from './components/modals/CrisisModal';
import JournalModal from './components/modals/JournalModal';
import { ModalProvider } from './context/ModalContext';
import { JournalProvider } from './context/JournalContext';

function App() {
  const herramientasRef = useRef<HTMLDivElement>(null);
  const registroRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    if (section === 'herramientas' && herramientasRef.current) {
      herramientasRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'registro' && registroRef.current) {
      registroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <JournalProvider>
      <ModalProvider>
        <div className="min-h-screen bg-gray-50">
          <Header onNavigate={scrollToSection} />
          <Hero />
          
          <div ref={herramientasRef}>
            <ToolsGrid />
          </div>
          
          <div ref={registroRef}>
            <RegistrySection />
          </div>
          
          {/* Modals */}
          <BreathingModal />
          <GroundingModal />
          <OppositeActionModal />
          <DistractionModal />
          <SelfSoothingModal />
          <CrisisModal />
          <JournalModal />
        </div>
      </ModalProvider>
    </JournalProvider>
  );
}

export default App;