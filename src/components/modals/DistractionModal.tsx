import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useModal } from '../../context/ModalContext';

interface SelectWithDetailsProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  detailsValue: string;
  onDetailsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SelectWithDetails: React.FC<SelectWithDetailsProps> = ({
  id,
  label,
  options,
  selectedValue,
  onSelectChange,
  detailsValue,
  onDetailsChange
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 mb-2">
      {label}
    </label>
    <select
      id={id}
      value={selectedValue}
      onChange={onSelectChange}
      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-3"
    >
      <option value="">Selecciona una opción...</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    
    {selectedValue === 'otra' && (
      <textarea
        id={`${id}-details`}
        value={detailsValue}
        onChange={onDetailsChange}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder="Detalles..."
        rows={2}
      />
    )}
  </div>
);

const DistractionModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModal();
  
  const [formState, setFormState] = useState({
    activity: { value: '', details: '' },
    contribute: { value: '', details: '' },
    comparison: '',
    emotion: { value: '', details: '' },
    thoughts: { value: '', details: '' },
    sensations: { value: '', details: '' },
    suspend: { value: '', details: '' }
  });
  
  const isOpen = activeModal === 'dbt-distraccion';
  
  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setFormState({
        activity: { value: '', details: '' },
        contribute: { value: '', details: '' },
        comparison: '',
        emotion: { value: '', details: '' },
        thoughts: { value: '', details: '' },
        sensations: { value: '', details: '' },
        suspend: { value: '', details: '' }
      });
    }
  }, [isOpen]);
  
  const handleSelectChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [field]: {
        ...formState[field as keyof typeof formState],
        value: e.target.value
      }
    });
  };
  
  const handleDetailsChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [field]: {
        ...formState[field as keyof typeof formState],
        details: e.target.value
      }
    });
  };
  
  const handleComparisonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      comparison: e.target.value
    });
  };
  
  const handleComplete = () => {
    closeModal();
    
    // Open journal modal with distraction technique pre-filled
    setTimeout(() => {
      openModal('journal');
    }, 100);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="DBT: Técnicas de Distracción"
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
          Las técnicas de distracción te ayudan a desviar temporalmente la atención de emociones 
          intensas cuando no puedes abordarlas de inmediato.
        </p>
        
        <h3 className="text-lg font-semibold mb-4">Estrategias ACCEPTS</h3>
        
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 border-l-4 border-primary-500 rounded-r">
            <h4 className="text-primary-600 font-medium mb-2">A - Actividades</h4>
            <p className="text-gray-600 mb-3">Realiza una actividad que requiera concentración.</p>
            <SelectWithDetails
              id="activity-select"
              label="Selecciona una actividad:"
              options={[
                { value: 'contar', label: 'Contar hacia atrás desde 100 de 7 en 7' },
                { value: 'palabras', label: 'Nombrar 5 palabras que empiecen con cada letra del alfabeto' },
                { value: 'fisica', label: 'Realizar 10 saltos o estiramientos' },
                { value: 'limpieza', label: 'Ordenar/limpiar un espacio pequeño' },
                { value: 'otra', label: 'Otra actividad (especifica abajo)' }
              ]}
              selectedValue={formState.activity.value}
              onSelectChange={handleSelectChange('activity')}
              detailsValue={formState.activity.details}
              onDetailsChange={handleDetailsChange('activity')}
            />
          </div>
          
          <div className="bg-gray-50 p-4 border-l-4 border-primary-500 rounded-r">
            <h4 className="text-primary-600 font-medium mb-2">C - Contribuir</h4>
            <p className="text-gray-600 mb-3">Ayudar a otros puede distraerte de tu malestar.</p>
            <SelectWithDetails
              id="contribute-select"
              label="Selecciona una forma de contribuir:"
              options={[
                { value: 'mensaje', label: 'Enviar un mensaje amable a alguien' },
                { value: 'ayuda', label: 'Ofrecer ayuda a alguien cercano' },
                { value: 'complemento', label: 'Dar un cumplido sincero' },
                { value: 'otra', label: 'Otra forma (especifica abajo)' }
              ]}
              selectedValue={formState.contribute.value}
              onSelectChange={handleSelectChange('contribute')}
              detailsValue={formState.contribute.details}
              onDetailsChange={handleDetailsChange('contribute')}
            />
          </div>
          
          <div className="bg-gray-50 p-4 border-l-4 border-primary-500 rounded-r">
            <h4 className="text-primary-600 font-medium mb-2">C - Comparaciones</h4>
            <p className="text-gray-600 mb-3">Compara tu situación actual con momentos más difíciles que has superado.</p>
            <textarea
              value={formState.comparison}
              onChange={handleComparisonChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Describe una situación difícil que hayas superado en el pasado..."
              rows={3}
            />
          </div>
          
          <div className="text-center">
            <button
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
              onClick={() => alert('Plan de distracción guardado')}
            >
              Guardar plan de distracción
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DistractionModal;