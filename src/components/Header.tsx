import React from 'react';
import { Briefcase } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-primary-600 font-bold text-xl flex items-center gap-2">
              <Briefcase size={24} />
              <div>
                <span>Tu caja de herramientas</span>
                <div className="text-sm font-normal text-gray-600">
                  Taller Regulación Emocional. Juan Orta
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <button 
              onClick={() => onNavigate('herramientas')}
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Herramientas
            </button>
            <button 
              onClick={() => onNavigate('registro')}
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Registro
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;