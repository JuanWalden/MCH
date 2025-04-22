import { useState, useRef, useEffect } from 'react';

interface UseBreathingExerciseReturn {
  isActive: boolean;
  remainingSeconds: number;
  phase: string;
  progress: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const useBreathingExercise = (
  totalDurationInSeconds = 120
): UseBreathingExerciseReturn => {
  const [isActive, setIsActive] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(totalDurationInSeconds);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = () => {
    if (isActive) return;
    
    setIsActive(true);
    
    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (!isActive) return;
    
    setIsActive(false);
    
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setRemainingSeconds(totalDurationInSeconds);
  };

  // Calculate the current phase of breathing
  const phase = (() => {
    if (!isActive) return 'Prepárate';
    
    // 8-second cycle: 2s inhale, 2s hold, 2s exhale, 2s pause
    const cyclePosition = Math.floor(remainingSeconds / 2) % 4;
    
    switch (cyclePosition) {
      case 0: return 'Inhala';
      case 1: return 'Mantén';
      case 2: return 'Exhala';
      case 3: return 'Pausa';
      default: return 'Prepárate';
    }
  })();

  // Calculate progress percentage
  const progress = 100 - ((remainingSeconds / totalDurationInSeconds) * 100);

  return {
    isActive,
    remainingSeconds,
    phase,
    progress,
    start,
    stop,
    reset
  };
};