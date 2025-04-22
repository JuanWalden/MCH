import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useModal } from '../../context/ModalContext';
import { useGroundingExercise } from '../../hooks/useGroundingExercise';

const GroundingModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModal();
  const {
    currentStep,
    stepLabels,
    moveToNextStep,
    reset
  } = useGroundingExercise();
  
  const [responses, setResponses] = useState<Record<number, string>>({});
  
  const isOpen = activeModal === 'grounding';
  
  // Reset the exercise when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      reset();
      setResponses({});
    }
  }, [isOpen, reset]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponses({
      ...responses,
      [currentStep]: e.target.value
    });
  };
  
  const handleComplete = () => {
    closeModal();
    
    // Open journal modal with grounding pre-filled
    setTimeout(() => {
      openModal('journal');
    }, 100);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Técnicas de Grounding (Anclaje)"
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
          Las técnicas de grounding te ayudan a conectar con el momento presente cuando te sientes 
          abrumado/a, ansioso/a o disociado/a.
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Técnica 5-4-3-2-1</h3>
          <p className="mb-4">Utiliza tus sentidos para anclarte al presente:</p>
          
          <div className="bg-gray-50 p-4 border-l-4 border-primary-500 rounded-r mb-4">
            <h4 className="text-primary-600 font-medium mb-2">
              {stepLabels[currentStep - 1]}
            </h4>
            <p className="text-gray-600 mb-3">
              {currentStep === 1 && "Mira a tu alrededor y nombra 5 cosas que puedes ver. Concéntrate en los detalles."}
              {currentStep === 2 && "Toca 4 cosas diferentes y nota su textura, temperatura, y cómo se sienten."}
              {currentStep === 3 && "Presta atención a 3 sonidos diferentes que puedes escuchar ahora mismo."}
              {currentStep === 4 && "Identifica 2 olores diferentes en tu entorno."}
              {currentStep === 5 && "Nota un sabor en tu boca, o prueba algo para crear una nueva sensación."}
            </p>
            <textarea
              value={responses[currentStep] || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={`Escribe aquí ${currentStep === 1 ? '5 cosas que puedes ver' : 
                             currentStep === 2 ? '4 cosas que puedes tocar' :
                             currentStep === 3 ? '3 cosas que puedes oír' :
                             currentStep === 4 ? '2 cosas que puedes oler' :
                             '1 cosa que puedes saborear'}...`}
              rows={3}
            />
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={moveToNextStep}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
              disabled={currentStep === 5}
            >
              {currentStep === 5 ? 'Finalizar' : 'Siguiente paso'}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Paso {currentStep} de 5
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GroundingModal;