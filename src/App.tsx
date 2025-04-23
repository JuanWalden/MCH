import Login from './components/Login';
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
import { useAuth } from './hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const herramientasRef = useRef<HTMLDivElement>(null);
  const registroRef = useRef<HTMLDivElement>(null);

  const { user, role, expired, loading } = useAuth();

  const scrollToSection = (section: string) => {
    if (section === 'herramientas' && herramientasRef.current) {
      herramientasRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'registro' && registroRef.current) {
      registroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Cargando...</div>;
  }

  if (!user) {
    return <Login />;
  }

  if (expired) {
    return <div className="p-4 text-center text-red-600">Tu acceso ha expirado. Contacta con el administrador.</div>;
  }

  if (role !== 'admin' && role !== 'taller') {
    return <div className="p-4 text-center text-red-600">No tienes permisos para acceder a esta aplicación.</div>;
  }

  return (
    <JournalProvider>
      <ModalProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="p-4 text-right">
            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded"
            >
              Cerrar sesión
            </button>
          </div>

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