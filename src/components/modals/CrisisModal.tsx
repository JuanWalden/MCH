import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { useModal } from '../../context/ModalContext';

interface CrisisOption {
  id: string;
  label: string;
  content: React.ReactNode;
}

const CrisisModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModal();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const isOpen = activeModal === 'crisis-now';
  
  // Reset selected option when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedOption(null);
    }
  }, [isOpen]);
  
  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
  };
  
  const crisisOptions: CrisisOption[] = [
    {
      id: 'ansiedad',
      label: 'Ansiedad / Pánico',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-3">Técnica inmediata: Respiración 4-7-8</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="mb-1">1. Inhala por la nariz durante 4 segundos.</p>
            <p className="mb-1">2. Mantén la respiración durante 7 segundos.</p>
            <p className="mb-1">3. Exhala lentamente por la boca durante 8 segundos.</p>
            <p>4. Repite 4 veces.</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Qué está pasando en tu cuerpo:</h3>
          <p className="mb-4">
            Tu sistema nervioso está en modo "lucha o huida". La respiración lenta activa el sistema 
            nervioso parasimpático, reduciendo la respuesta de estrés.
          </p>
          
          <div className="text-center my-6">
            <button 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
              onClick={() => {
                closeModal();
                setTimeout(() => openModal('respiracion'), 100);
              }}
            >
              Iniciar ejercicio de respiración guiada
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'ira',
      label: 'Ira intensa',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-3">Técnica inmediata: Tiempo fuera</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="mb-1">1. Aléjate física o mentalmente de la situación por 10 minutos.</p>
            <p className="mb-1">2. Respira profundamente, contando hasta 10 en cada exhalación.</p>
            <p className="mb-1">3. Repite para ti: "Esto pasará. Puedo manejar mis emociones."</p>
            <p>4. Enfoca tu atención en relajar tu cuerpo: hombros, mandíbula, puños.</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Qué está pasando en tu mente:</h3>
          <p className="mb-4">
            La ira activa pensamientos de "ataque" y dificulta ver otras perspectivas. El tiempo 
            fuera te permite recuperar la capacidad de pensar con claridad.
          </p>
          
          <div className="text-center my-6">
            <button 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
              onClick={() => {
                closeModal();
                setTimeout(() => openModal('dbt-opuesta'), 100);
              }}
            >
              Explorar técnica de acción opuesta
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'tristeza',
      label: 'Tristeza abrumadora',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-3">Técnica inmediata: Activación</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="mb-1">1. Mueve tu cuerpo: camina, estira los brazos, mueve los hombros.</p>
            <p className="mb-1">2. Busca un estímulo sensorial positivo: música, aroma, sabor.</p>
            <p className="mb-1">3. Contacta con alguien que te haga sentir bien.</p>
            <p>4. Recuerda: el aislamiento intensifica la tristeza.</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Qué está pasando en tu mente:</h3>
          <p className="mb-4">
            La tristeza intensa reduce tu energía y te lleva a aislarte. La activación contrarresta 
            ese impulso y estimula neurotransmisores que mejoran el ánimo.
          </p>
          
          <div className="text-center my-6">
            <button 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
              onClick={() => {
                closeModal();
                setTimeout(() => openModal('dbt-autoconsuelo'), 100);
              }}
            >
              Explorar técnicas de autoconsuelo
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'disociacion',
      label: 'Desconexión / Disociación',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-3">Técnica inmediata: Anclaje sensorial</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="mb-1">1. Toca algo con textura definida (tela rugosa, objeto frío).</p>
            <p className="mb-1">2. Nombra en voz alta 5 cosas que puedes ver a tu alrededor.</p>
            <p className="mb-1">3. Siente tus pies en el suelo, presiona firmemente.</p>
            <p>4. Repite en voz alta: "Estoy aquí, en este lugar, en este momento".</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Qué está pasando en tu mente:</h3>
          <p className="mb-4">
            La disociación es un mecanismo de protección donde te "desconectas" de la realidad. 
            Las sensaciones físicas intensas te ayudan a reconectar con el presente.
          </p>
          
          <div className="text-center my-6">
            <button 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
              onClick={() => {
                closeModal();
                setTimeout(() => openModal('grounding'), 100);
              }}
            >
              Explorar técnicas de grounding
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'impulsos',
      label: 'Impulsos peligrosos',
      content: (
        <div>
          <h3 className="text-lg font-semibold mb-3">Técnica inmediata: STOP</h3>
          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="mb-1"><strong>S</strong> - Stop (Detente). Congela lo que estás haciendo.</p>
            <p className="mb-1"><strong>T</strong> - Take a step back (Da un paso atrás). Aléjate de la situación.</p>
            <p className="mb-1"><strong>O</strong> - Observe (Observa). Nota qué estás sintiendo sin juzgarte.</p>
            <p><strong>P</strong> - Proceed mindfully (Procede conscientemente). Actúa de acuerdo a tus valores, no a tu impulso.</p>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">Recuerda:</h3>
          <p className="mb-4">
            Los impulsos son temporales y pasarán. Espera 20 minutos antes de tomar cualquier decisión.
          </p>
          
          <div className="text-center my-6">
            <button 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded transition"
              onClick={() => {
                closeModal();
                setTimeout(() => openModal('dbt-distraccion'), 100);
              }}
            >
              Explorar técnicas de distracción
            </button>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Ayuda Inmediata"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4">¿Qué estás experimentando ahora?</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {crisisOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`px-4 py-2 rounded transition ${
                selectedOption === option.id 
                  ? 'bg-danger-500 text-white' 
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {selectedOption && (
          <div className="mb-6 animate-fadeIn">
            {crisisOptions.find(option => option.id === selectedOption)?.content}
          </div>
        )}
        
        <div className="mt-6 p-4 border-2 border-danger-500 rounded">
          <h4 className="text-danger-500 font-semibold mb-2">Recursos de emergencia:</h4>
          <p className="font-semibold mb-2">Si estás en peligro inmediato o tienes pensamientos de hacerte daño:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Emergencias: 911 (o el número de emergencias local)</li>
            <li>Línea Nacional de Prevención del Suicidio: 988</li>
            <li>Chat de Crisis: Envía un mensaje de texto con la palabra HOME al 741741</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default CrisisModal;