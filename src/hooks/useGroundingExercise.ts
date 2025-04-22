import { useState } from 'react';

interface UseGroundingExerciseReturn {
  currentStep: number;
  isComplete: boolean;
  stepLabels: string[];
  moveToNextStep: () => void;
  reset: () => void;
}

export const useGroundingExercise = (): UseGroundingExerciseReturn => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const stepLabels = [
    '5 cosas que puedes VER',
    '4 cosas que puedes TOCAR',
    '3 cosas que puedes OÍR',
    '2 cosas que puedes OLER',
    '1 cosa que puedes SABOREAR'
  ];

  const moveToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentStep(1);
  };

  return {
    currentStep,
    isComplete: currentStep === totalSteps,
    stepLabels,
    moveToNextStep,
    reset
  };
};