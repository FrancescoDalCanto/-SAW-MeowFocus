import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const StudyBreakTimer = ({ studyDuration, breakDuration }) => {
  const [timeRemaining, setTimeRemaining] = useState(studyDuration);
  const [isStudyTime, setIsStudyTime] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Suoni per le notifiche
  const studyEndSound = new Howl({ src: ['/sounds/study-end.mp3'] });
  const breakEndSound = new Howl({ src: ['/sounds/break-end.mp3'] });

  // Effetti per il cambio di stato
  useEffect(() => {
    if (isStudyTime) {
      setTimeRemaining(studyDuration);
    } else {
      setTimeRemaining(breakDuration);
    }
  }, [studyDuration, breakDuration, isStudyTime]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handlePhaseTransition();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isStudyTime, timeRemaining]);

  const handlePhaseTransition = () => {
    if (isStudyTime) {
      studyEndSound.play();
      setIsStudyTime(false);
      setTimeRemaining(breakDuration);
    } else {
      breakEndSound.play();
      setIsStudyTime(true);
      setTimeRemaining(studyDuration);
      setCyclesCompleted(prev => prev + 1);
    }
    showTemporaryNotification();
  };

  const showTemporaryNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleTimer = () => {
    if (studyDuration === 0 && breakDuration === 0) {
      alert("Imposta una durata valida prima di avviare");
      return;
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsStudyTime(true);
    setTimeRemaining(studyDuration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calcola la percentuale per la progress bar
  const totalDuration = isStudyTime ? studyDuration : breakDuration;
  const progressPercent = ((totalDuration - timeRemaining) / totalDuration) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl">
      {/* Notifica */}
      {showNotification && (
        <div className="absolute top-4 animate-fade-in-out bg-purple-600 text-white px-6 py-3 rounded-lg">
          {isStudyTime ? 'Pausa terminata! Torna a studiare!' : 'Sessione di studio completata! Fai una pausa!'}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between w-full mb-6">
        <div className={`text-lg font-semibold ${isStudyTime ? 'text-green-400' : 'text-yellow-400'}`}>
          {isStudyTime ? '⏳ Sessione di Studio' : '☕ Pausa'}
        </div>
        <div className="text-gray-400">Cicli completati: {cyclesCompleted}</div>
      </div>

      {/* Timer */}
      <div className="text-8xl font-mono font-bold my-8">
        {formatTime(timeRemaining)}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-4 mb-8">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${isStudyTime ? 'bg-green-500' : 'bg-yellow-500'}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Controlli */}
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={toggleTimer}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all ${isActive
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
            } text-white shadow-lg transform hover:scale-105`}
        >
          {isActive ? 'Pausa' : 'Avvia'}
        </button>

        <button
          onClick={resetTimer}
          className="px-8 py-3 rounded-lg text-lg font-medium bg-gray-600 hover:bg-gray-700 text-white transition-all shadow-lg transform hover:scale-105"
        >
          Reset
        </button>
      </div>

      {/* Indicatore stato */}
      <div className="mt-6 text-gray-400 text-sm">
        {isActive
          ? 'Il timer è in esecuzione...'
          : 'Timer in pausa - Pronto per iniziare'}
      </div>
    </div>
  );
};

export default StudyBreakTimer;