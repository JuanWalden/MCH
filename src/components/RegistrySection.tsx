import React from 'react';
import { useModal } from '../context/ModalContext';
import JournalEntryList from './JournalEntryList';

const RegistrySection: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section className="py-16 bg-gray-50" id="registro">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-600 text-center mb-4">
          Registro de Eventos
        </h2>
        
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Lleva un registro de tus episodios de crisis para identificar patrones y mejorar tu autoconocimiento.
        </p>
        
        <button 
          onClick={() => openModal('journal')}
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-md font-medium transition transform hover:-translate-y-1 block mx-auto mb-10"
        >
          Crear nuevo registro
        </button>
        
        <JournalEntryList />
      </div>
    </section>
  );
};

export default RegistrySection;