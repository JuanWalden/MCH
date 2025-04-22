import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useModal } from '../../context/ModalContext';

interface EmotionGuidance {
  title: string;
  description: string;
  steps: string[];
}

const emotionGuidance: Record<string, EmotionGuidance> = {
  miedo: {
    title: 'Miedo / Ansiedad',
    description: 'Cuando el miedo no es útil o proporcional a la situación, la acción opuesta implica acercarse a lo que temes de manera segura en lugar de evitarlo.',
    steps: [
      'Identifica la situación que te genera miedo.',
      'Determina si este miedo es justificado o desproporcionado.',
      'Si es desproporcionado, acércate gradualmente a lo que temes.',
      'Mantente en la situación hasta que la ansiedad disminuya.',
      'Adopta una postura corporal de confianza y seguridad.',
      'Respira profundamente mientras lo haces.'
    ]
  },
  tristeza: {
    title: 'Tristeza / Depresión',
    description: 'Cuando la tristeza no es útil o proporcional, la acción opuesta implica activarse y conectar en lugar de aislarse y rumiar.',
    steps: [
      'Evita el aislamiento: busca compañía o contacto social.',
      'Aumenta tu nivel de actividad física, incluso si no tienes ganas.',
      'Evita la rumiación: distrae tu mente con actividades.',
      'Adopta una postura corporal energizada.',
      'Busca experiencias positivas, aunque sean pequeñas.',
      'Actúa con optimismo, incluso si no lo sientes ahora.'
    ]
  },
  ira: {
    title: 'Ira / Enojo',
    description: 'Cuando la ira no es útil o proporcional, la acción opuesta implica ser amable y respetuoso en lugar de agresivo u hostil.',
    steps: [
      'Aléjate temporalmente de la situación si es posible.',
      'Suaviza tu postura corporal y expresión facial.',
      'Habla con un tono de voz más suave y lento.',
      'Busca entender el punto de vista de la otra persona.',
      'Practica la tolerancia y la paciencia.',
      'Haz algo amable por la persona con quien estás enojado/a.'
    ]
  },
  verguenza: {
    title: 'Vergüenza / Culpa',
    description: 'Cuando la vergüenza o culpa no es útil o proporcional, la acción opuesta implica exponerse y reparar en lugar de esconderse.',
    steps: [
      'Identifica si has hecho algo que realmente necesita reparación.',
      'Si es así, toma medidas para reparar el daño.',
      'Si la vergüenza es excesiva, desafíala exponiéndote gradualmente.',
      'Mantén contacto visual con otros.',
      'Adopta una postura corporal digna y erguida.',
      'Comparte tu experiencia con alguien de confianza.'
    ]
  },
  otra: {
    title: 'Emoción intensa',
    description: 'Cuando una emoción intensa no es útil o proporcional, la acción opuesta implica actuar de manera contraria al impulso que genera esa emoción.',
    steps: [
      'Identifica la emoción que estás experimentando.',
      'Determina el impulso o acción a la que te lleva esa emoción.',
      'Considera actuar de forma contraria a ese impulso.',
      'Hazlo completamente, poniendo todo tu esfuerzo.',
      'Continúa hasta que la emoción disminuya.'
    ]
  }
};

const OppositeActionModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModal();
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  
  const isOpen = activeModal === 'dbt-opuesta';
  
  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedEmotion('');
      setActionPlan('');
    }
  }, [isOpen]);
  
  const handleEmotionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmotion(e.target.value);
  };
  
  const handleComplete = () => {
    closeModal();
    
    // Open journal modal with opposite action pre-filled
    setTimeout(() => {
      openModal('journal');
    }, 100);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="DBT: Acción Opuesta"
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
          La acción opuesta consiste en actuar de forma contraria a la emoción intensa que estás 
          experimentando cuando esa emoción no es útil o proporcional a la situación.
        </p>
        
        <div className="mb-6">
          <label htmlFor="emotion-select" className="block text-gray-700 font-medium mb-2">
            ¿Qué emoción estás experimentando ahora?
          </label>
          <select
            id="emotion-select"
            value={selectedEmotion}
            onChange={handleEmotionChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Selecciona una emoción...</option>
            <option value="miedo">Miedo / Ansiedad</option>
            <option value="tristeza">Tristeza / Depresión</option>
            <option value="ira">Ira / Enojo</option>
            <option value="verguenza">Vergüenza / Culpa</option>
            <option value="otra">Otra emoción</option>
          </select>
        </div>
        
        {selectedEmotion && (
          <>
            <div className="bg-gray-50 p-4 border-l-4 border-primary-500 rounded-r mb-6">
              <h4 className="text-primary-600 font-medium mb-2">
                {emotionGuidance[selectedEmotion].title}
              </h4>
              <p className="text-gray-600 mb-4">
                {emotionGuidance[selectedEmotion].description}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {emotionGuidance[selectedEmotion].steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Mi plan de acción opuesta</h3>
              <div className="mb-4">
                <label htmlFor="opposite-action-plan" className="block text-gray-700 mb-2">
                  ¿Qué acción opuesta vas a tomar?
                </label>
                <textarea
                  id="opposite-action-plan"
                  value={actionPlan}
                  onChange={(e) => setActionPlan(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe qué acción vas a realizar que sea opuesta a tu impulso emocional..."
                  rows={4}
                />
              </div>
              
              <button
                onClick={() => setActionPlan('')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition"
              >
                Guardar plan
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default OppositeActionModal;