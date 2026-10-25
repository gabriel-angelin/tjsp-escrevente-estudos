import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogStudyTime: (minutes: number) => void;
  activeProfileName: string;
}

export const PomodoroModal: React.FC<PomodoroModalProps> = ({
  isOpen,
  onClose,
  onLogStudyTime,
  activeProfileName,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(25); // minutes
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    setSecondsLeft(selectedDuration * 60);
    setIsRunning(false);
  }, [selectedDuration]);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      onLogStudyTime(selectedDuration);
      confetti({ particleCount: 80, spread: 70 });
      alert(`Parabéns ${activeProfileName}! Sessão de ${selectedDuration} minutos concluída e registrada com sucesso!`);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, selectedDuration, onLogStudyTime, activeProfileName]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(selectedDuration * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-black text-slate-900">Cronômetro de Foco</h3>
        <p className="text-xs text-slate-500 mt-1">
          Sessão ativa para <strong className="text-blue-600">{activeProfileName}</strong>
        </p>

        {/* Duration Select */}
        <div className="flex justify-center space-x-2 my-5">
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => setSelectedDuration(mins)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDuration === mins
                  ? 'bg-[#1b365d] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {mins} min
            </button>
          ))}
        </div>

        {/* Big Timer Display */}
        <div className="text-6xl font-black font-mono tracking-tight text-slate-900 py-6 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
          {formatTime}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pausar' : 'Iniciar Foco'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-all"
            title="Reiniciar tempo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-6 flex items-center justify-center space-x-1">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Ao zerar, o tempo é creditado automaticamente no seu perfil.</span>
        </p>
      </div>
    </div>
  );
};
