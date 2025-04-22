import React from 'react';
import { ToolCardProps } from '../types';

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  toolId,
  onOpen 
}) => {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onOpen(toolId)}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-primary-600 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button 
          className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded transition"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(toolId);
          }}
        >
          Iniciar
        </button>
      </div>
    </div>
  );
};

export default ToolCard;