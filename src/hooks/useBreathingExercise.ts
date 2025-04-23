import { useState, useRef, useEffect, useCallback } from 'react';

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
  const intervalRef = useRef<NodeJS.Timeout>();

  const stop = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setRemainingSeconds(totalDurationInSeconds);
  }, [stop, totalDurationInSeconds]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = useCallback(() => {
    if (isActive) return;
    
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isActive, stop]);

  // Calculate the current phase of breathing
  const phase = (() => {
    if (!isActive) return 'Prepárate';
    
    // 4-second cycle: 4s inhale, 4s hold, 4s exhale, 4s pause
    const cycleSeconds = remainingSeconds % 16;
    
    if (cycleSeconds >= 12) return 'Inhala';
    if (cycleSeconds >= 8) return 'Mantén';
    if (cycleSeconds >= 4) return 'Exhala';
    return 'Pausa';
  })();

  // Calculate progress percentage
  const progress = Math.min(
    ((totalDurationInSeconds - remainingSeconds) / totalDurationInSeconds) * 100,
    100
  );

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