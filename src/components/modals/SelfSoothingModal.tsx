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

const SelfSoothingModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModal();
  
  const [formState, setFormState] = useState({
    visual: { value: '', details: '' },
    audio: { value: '', details: '' },
    smell: { value: '', details: '' },
    taste: { value: '', details: '' },
    touch: { value: '', details: '' },
    letter: ''
  });
  
  const isOpen = activeModal === 'dbt-autoconsuelo';
  
  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setFormState({
        visual: { value: '', details: '' },
        audio: { value: '', details: '' },
        smell: { value: '', details: '' },
        taste: { value: '', details: '' },
        touch: { value: '', details: '' },
        letter: ''
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
  
  const handleLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      letter: e.target.value
    });
  };
  
  const handleComplete = () => {
    closeModal();
    
    // Open journal modal with self-soothing pre-filled
    setTimeout(() => {
      openModal('journal');
    }, 100);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="DBT: Técnicas de Autoconsuelo"
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
          Las técnicas de autoconsuelo te ayudan a cuidarte cuando estás pasando por momentos difíciles. 
          Consiste en tratarte con la misma amabilidad que tratarías a un amigo.
        </p>
        
        <h3 className="text-lg font-semibold mb-4">Autoconsuelo a través de los sentidos</h3>
        
        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 p-4 border-l-4 border-primary-500 rounded-r">
            <h4 className="text-primary-600 font-medium mb-2">Vista</h4>
            <p className="text-gray-600 mb-3">Busca algo agradable visualmente.</p>
            <SelectWithDetails
              id="visual-comfort-select"
              label="Selecciona una opción:"
              options={[
                { value: 'naturaleza', label: 'Mirar imágenes de naturaleza' },
                { value: 'arte', label: 'Contemplar una obra de arte' },
                { value: 'fotos', label: 'Ver fotos de momentos felices' },
                { value: 'otra', label: 'Otra opción (especifica abajo)' }
              ]}
              selectedValue={formState.visual.value}
              onSelectChange={handleSelectChange('visual')}
              detailsValue={formState.visual.details}
              onDetailsChange={handleDetailsChange('visual')}
            />
          </div>
          
          <div className="bg-gray-50 p-4 border-l-4 border-primary-500 rounded-r">
            <h4 className="text-primary-600 font-medium mb-2">Oído</h4>
            <p className="text-gray-600 mb-3">Escucha sonidos reconfortantes.</p>
            <SelectWithDetails
              id="audio-comfort-select"
              label="Selecciona una opción:"
              options={[
                { value: 'musica', label: 'Escuchar música relajante' },
                { value: 'naturaleza', label: 'Sonidos de naturaleza' },
                { value: 'meditacion', label: 'Meditación guiada' },
                { value: 'otra', label: 'Otra opción (especifica abajo)' }
              ]}
              selectedValue={formState.audio.value}
              onSelectChange={handleSelectChange('audio')}
              detailsValue={formState.audio.details}
              onDetailsChange={handleDetailsChange('audio')}
            />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3">Carta de autocompasión</h3>
        <p className="mb-4">
          Escribe una carta a ti mismo/a desde una perspectiva compasiva, como si le escribieras 
          a un amigo querido que está pasando por una situación similar.
        </p>
        <textarea
          id="self-compassion-letter"
          value={formState.letter}
          onChange={handleLetterChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-6"
          placeholder="Querido/a [tu nombre]..."
          rows={5}
        />
        
        <div className="text-center">
          <button
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
            onClick={() => alert('Plan de autoconsuelo guardado')}
          >
            Guardar plan de autoconsuelo
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SelfSoothingModal;