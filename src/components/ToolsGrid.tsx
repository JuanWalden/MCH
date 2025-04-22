import React from 'react';
import ToolCard from './ToolCard';
import { useModal } from '../context/ModalContext';
import { ModalId } from '../types';

const ToolsGrid: React.FC = () => {
  const { openModal } = useModal();
  
  const tools = [
    {
      id: 'respiracion' as ModalId,
      title: 'Respiración Guiada',
      description: 'Ejercicios de respiración para calmar el sistema nervioso y reducir la ansiedad rápidamente.',
      imageUrl: 'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'grounding' as ModalId,
      title: 'Técnicas de Grounding',
      description: 'Conexión con el presente a través de los sentidos para romper patrones de preocupación o disociación.',
      imageUrl: 'https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'dbt-opuesta' as ModalId,
      title: 'DBT: Acción Opuesta',
      description: 'Actúa de manera contraria a la emoción que estás experimentando para reducir su intensidad.',
      imageUrl: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'dbt-distraccion' as ModalId,
      title: 'DBT: Distracción',
      description: 'Técnicas para desviar la atención y reducir la intensidad emocional momentáneamente.',
      imageUrl: 'https://images.pexels.com/photos/3807693/pexels-photo-3807693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'dbt-autoconsuelo' as ModalId,
      title: 'DBT: Autoconsuelo',
      description: 'Actividades y prácticas que te ayudan a cuidarte y consolarte durante momentos difíciles.',
      imageUrl: 'https://images.pexels.com/photos/6765028/pexels-photo-6765028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <section className="py-16" id="herramientas">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-600 text-center mb-10">
          Herramientas de Apoyo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard
              key={tool.id}
              toolId={tool.id}
              title={tool.title}
              description={tool.description}
              imageUrl={tool.imageUrl}
              onOpen={openModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;