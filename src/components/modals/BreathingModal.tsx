import React, { useEffect } from 'react';
import Modal from '../shared/Modal';
import { useModal } from '../../context/ModalContext';
import { useBreathingExercise } from '../../hooks/useBreathingExercise';
import { useJournal } from '../../context/JournalContext';

const BreathingModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModal();
  const { addEntry } = useJournal();
  
  const {
    isActive,
    remainingSeconds,
    phase,
    progress,
    start,
    stop,
    reset
  } = useBreathingExercise(120); // 2 minutes
  
  const isOpen = activeModal === 'respiracion';
  
  // Reset the exercise when modal is opened
  useEffect(() => {
    if (isOpen) {
      reset();
    } else {
      stop();
    }
  }, [isOpen, reset, stop]);
  
  // Format the remaining time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleComplete = () => {
    stop();
    closeModal();
    
    // Open journal modal with breathing exercise pre-filled
    setTimeout(() => {
      openModal('journal');
      // We'll add the strategy in the journal modal
    }, 100);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        stop();
        closeModal();
      }}
      title="Respiración Guiada"
      footer={
        <button 
          onClick={handleComplete}
          className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded transition"
        >
          Completar y registrar
        </button>
      }
    >
      <div>
        <p className="mb-6">
          La respiración profunda activa tu sistema nervioso parasimpático, ayudando a reducir la ansiedad y la respuesta de estrés.
        </p>
        
        <div 
          className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center text-white font-semibold transition-all duration-500 ${
            isActive 
              ? 'animate-breathe bg-secondary-500' 
              : 'bg-primary-500'
          }`}
        >
          <span className="text-xl">{phase}</span>
        </div>
        
        <div className="mt-6 mb-2 bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-primary-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-center text-3xl font-bold my-4 text-gray-700">
          {formatTime()}
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          {!isActive ? (
            <button 
              onClick={start}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
            >
              Comenzar
            </button>
          ) : (
            <button 
              onClick={stop}
              className="bg-danger-500 hover:bg-danger-600 text-white px-6 py-2 rounded transition"
            >
              Detener
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BreathingModal;