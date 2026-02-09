import { useState, useEffect, useRef, useCallback } from "react";
import type { Toast } from "../types/types";

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

export const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(toast.duration);
  const pauseStartTimeRef = useRef<number>(0);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(
    (duration: number) => {
      clearTimer();
      remainingTimeRef.current = duration;

      timerRef.current = window.setTimeout(() => {
        onRemove();
      }, duration);
    },
    [onRemove],
  );

  const pauseTimer = () => {
    if (!isPaused && timerRef.current !== null) {
      // Останавливаем текущий таймер и запоминаем время паузы
      clearTimer();
      pauseStartTimeRef.current = performance.now(); 
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    if (isPaused) {
      // Вычисляем сколько времени прошло на паузе
      const pauseDuration = performance.now() - pauseStartTimeRef.current;
      // Вычитаем время паузы из оставшегося
      const newRemainingTime = Math.max(remainingTimeRef.current - pauseDuration, 0);

      if (newRemainingTime > 0) {
        startTimer(newRemainingTime);
      } else {
        onRemove();
      }

      setIsPaused(false);
    }
  };


  useEffect(() => {
    if (!isPaused) {
      startTimer(toast.duration);
    }
  }, [toast.duration, isPaused, startTimer]);

  
  useEffect(() => {
    startTimer(toast.duration);
    return () => clearTimer();
  }, [startTimer, toast.duration]);

  const handleMouseEnter = () => {
    pauseTimer();
  };

  const handleMouseLeave = () => {
    resumeTimer();
  };

  return (
    <div className={`toast toast-${toast.type}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} role="alert" data-testid="toast-item">
      <span>{toast.text}</span>
      <button onClick={onRemove} aria-label="Close">
        ×
      </button>
    </div>
  );
};
