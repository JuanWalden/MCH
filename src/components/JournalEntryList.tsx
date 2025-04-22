import React from 'react';
import { useJournal } from '../context/JournalContext';
import { formatDate } from '../utils/dateFormatter';

const JournalEntryList: React.FC = () => {
  const { journalEntries, deleteEntry } = useJournal();

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      deleteEntry(id);
    }
  };

  if (journalEntries.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">
          No hay registros guardados. Crea uno nuevo haciendo clic en el botón "Crear nuevo registro".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {journalEntries.map((entry, index) => (
        <div key={entry.id} className="bg-white rounded-lg shadow-sm p-5 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg">
              Evento #{journalEntries.length - index}
            </h3>
            <span className="text-sm text-gray-500">
              {formatDate(entry.date)}
            </span>
          </div>
          
          <div className="space-y-2 mb-3">
            <p><span className="font-medium">Desencadenante:</span> {entry.trigger}</p>
            <p><span className="font-medium">Síntomas:</span> {entry.symptoms}</p>
            <p>
              <span className="font-medium">Intensidad:</span>{' '}
              <span className={`inline-block px-2 py-0.5 rounded-full text-white text-xs bg-mood-${entry.distressRating}`}>
                {entry.distressRating}/5
              </span>
            </p>
            <p><span className="font-medium">Estrategias:</span> {entry.strategies}</p>
            <p><span className="font-medium">Efectividad:</span> {entry.effectiveness}/5</p>
            <p><span className="font-medium">Aprendizajes:</span> {entry.learnings}</p>
          </div>
          
          <div className="text-right">
            <button 
              onClick={() => handleDelete(entry.id)}
              className="bg-danger-500 hover:bg-danger-600 text-white px-3 py-1 rounded text-sm transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JournalEntryList;