import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import { useModal } from '../../context/ModalContext';
import { useJournal } from '../../context/JournalContext';
import RatingScale from '../shared/RatingScale';
import { getCurrentDateTimeLocal } from '../../utils/dateFormatter';

const JournalModal: React.FC = () => {
  const { activeModal, closeModal } = useModal();
  const { addEntry } = useJournal();
  
  const [formState, setFormState] = useState({
    date: getCurrentDateTimeLocal(),
    trigger: '',
    symptoms: '',
    distressRating: '3',
    strategies: '',
    effectiveness: '3',
    learnings: ''
  });
  
  const isOpen = activeModal === 'journal';
  
  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormState({
        ...formState,
        date: getCurrentDateTimeLocal()
      });
    }
  }, [isOpen]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id.replace('journal-', '')]: value
    });
  };
  
  const handleRatingChange = (value: string) => {
    setFormState({
      ...formState,
      distressRating: value
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({
      ...formState,
      effectiveness: e.target.value
    });
  };
  
  const handleSubmit = () => {
    // Basic validation
    if (!formState.trigger && !formState.symptoms && !formState.strategies) {
      alert('Por favor, completa al menos uno de los campos principales.');
      return;
    }
    
    addEntry({
      date: formState.date,
      trigger: formState.trigger || 'No especificado',
      symptoms: formState.symptoms || 'No especificados',
      distressRating: formState.distressRating,
      strategies: formState.strategies || 'No especificadas',
      effectiveness: formState.effectiveness,
      learnings: formState.learnings || 'No especificados'
    });
    
    closeModal();
    
    // Show confirmation
    alert('Registro guardado correctamente.');
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Registro de Evento"
      footer={
        <button
          onClick={handleSubmit}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
        >
          Guardar registro
        </button>
      }
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="journal-date" className="block text-gray-700 font-medium mb-2">
            Fecha y hora:
          </label>
          <input
            type="datetime-local"
            id="journal-date"
            value={formState.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="journal-trigger" className="block text-gray-700 font-medium mb-2">
            ¿Qué desencadenó la crisis?
          </label>
          <textarea
            id="journal-trigger"
            value={formState.trigger}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe lo que ocurrió antes de la crisis..."
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="journal-symptoms" className="block text-gray-700 font-medium mb-2">
            Síntomas experimentados:
          </label>
          <textarea
            id="journal-symptoms"
            value={formState.symptoms}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe los síntomas físicos y emocionales que experimentaste..."
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Intensidad de la angustia (1-5):
          </label>
          <RatingScale
            name="distress-rating"
            options={[
              { value: '1', label: 'Leve' },
              { value: '2', label: 'Moderada' },
              { value: '3', label: 'Fuerte' },
              { value: '4', label: 'Muy fuerte' },
              { value: '5', label: 'Extrema' }
            ]}
            selectedValue={formState.distressRating}
            onChange={handleRatingChange}
          />
        </div>
        
        <div>
          <label htmlFor="journal-strategies" className="block text-gray-700 font-medium mb-2">
            Estrategias utilizadas:
          </label>
          <textarea
            id="journal-strategies"
            value={formState.strategies}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="¿Qué herramientas o técnicas utilizaste?"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="journal-effectiveness" className="block text-gray-700 font-medium mb-2">
            Efectividad de las estrategias:
          </label>
          <select
            id="journal-effectiveness"
            value={formState.effectiveness}
            onChange={handleSelectChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="1">No fueron efectivas</option>
            <option value="2">Ligeramente efectivas</option>
            <option value="3">Moderadamente efectivas</option>
            <option value="4">Muy efectivas</option>
            <option value="5">Extremadamente efectivas</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="journal-learnings" className="block text-gray-700 font-medium mb-2">
            Aprendizajes o reflexiones:
          </label>
          <textarea
            id="journal-learnings"
            value={formState.learnings}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="¿Qué has aprendido de esta experiencia?"
            rows={3}
          />
        </div>
      </div>
    </Modal>
  );
};

export default JournalModal;