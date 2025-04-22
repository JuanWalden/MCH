import React from 'react';

interface RatingOption {
  value: string;
  label: string;
}

interface RatingScaleProps {
  name: string;
  options: RatingOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
}

const RatingScale: React.FC<RatingScaleProps> = ({
  name,
  options,
  selectedValue,
  onChange
}) => {
  return (
    <div className="flex justify-between gap-2">
      {options.map((option) => (
        <div key={option.value} className="text-center flex-1">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only" // Hide visually but keep accessible
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="flex flex-col items-center cursor-pointer"
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all
                ${selectedValue === option.value ? 'transform scale-110 shadow-md' : ''}
                ${option.value === '1' ? 'bg-danger-500' : ''}
                ${option.value === '2' ? 'bg-warning-500' : ''}
                ${option.value === '3' ? 'bg-warning-400' : ''}
                ${option.value === '4' ? 'bg-success-400' : ''}
                ${option.value === '5' ? 'bg-success-500' : ''}
              `}
            >
              {option.value}
            </div>
            <span className="mt-1 text-xs">{option.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default RatingScale;