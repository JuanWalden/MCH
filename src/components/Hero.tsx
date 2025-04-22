import React from 'react';
import { useModal } from '../context/ModalContext';

const Hero: React.FC = () => {
  const { openModal } = useModal();
  
  return (
    <section className="bg-primary-600 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Tu caja de herramientas
        </h1>
        <h2 className="text-xl md:text-2xl mb-4">
          Taller Regulación Emocional. Juan Orta
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Estrategias rápidas de regulación emocional frente a crisis, ansiedad intensa o ataques de pánico.
        </p>
        <button 
          onClick={() => openModal('crisis-now')}
          className="btn btn-secondary bg-secondary-500 hover:bg-secondary-600 text-white py-2 px-6 rounded-md font-medium transition transform hover:-translate-y-1"
        >
          Necesito ayuda ahora
        </button>
      </div>
    </section>
  );
};

export default Hero;