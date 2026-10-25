import React, { useState } from 'react';
import { ProfileKey, UserStats } from '../types';
import { exportDataAsJSON, importDataFromJSON } from '../utils/storage';
import { User, Users, Clock, CheckCircle2, Award, Download, Upload, Edit3, BookOpen, Calendar, BarChart3, PenTool, Flame } from 'lucide-react';

interface NavbarProps {
  activeProfileKey: ProfileKey;
  onSwitchProfile: (key: ProfileKey) => void;
  activeProfileData: UserStats;
  partnerProfileData: UserStats;
  onUpdateName: (newName: string) => void;
  currentView: 'cronograma' | 'conteudo' | 'metricas' | 'redacao';
  onChangeView: (view: 'cronograma' | 'conteudo' | 'metricas' | 'redacao') => void;
  onOpenPomodoro: () => void;
  totalTopicsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeProfileKey,
  onSwitchProfile,
  activeProfileData,
  partnerProfileData,
  onUpdateName,
  currentView,
  onChangeView,
  onOpenPomodoro,
  totalTopicsCount,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(activeProfileData.profileName);

  const completedCount = activeProfileData.completedTopicIds.length;
  const progressPercent = Math.round((completedCount / Math.max(1, totalTopicsCount)) * 100);
  const studyHours = (activeProfileData.totalStudyMinutes / 60).toFixed(1);

  const totalQuestions = Object.values(activeProfileData.topicMetrics).reduce((acc, m) => acc + (m.questionsDone || 0), 0);
  const correctQuestions = Object.values(activeProfileData.topicMetrics).reduce((acc, m) => acc + (m.questionsCorrect || 0), 0);
  const accuracyPercent = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content && importDataFromJSON(content)) {
          alert('Dados restaurados com sucesso!');
          window.location.reload();
        } else {
          alert('Erro ao importar backup: arquivo JSON incompatível.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm safe-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo / App Name */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#1b365d] to-[#0284c7] flex items-center justify-center text-white font-extrabold text-xs sm:text-base shadow-sm">
                TJ
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-lg">TJ-SP</span>
                  <span className="text-[10px] px-1.5 py-0.2 font-bold rounded bg-amber-100 text-amber-900 border border-amber-200">
                    2026/27
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">Preparação Gabriel & Thalia</p>
              </div>
            </div>

            {/* Profile Switcher (Compact & Touch Friendly) */}
            <div className="flex items-center bg-slate-100/90 p-0.5 sm:p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => onSwitchProfile('gabriel')}
                className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeProfileKey === 'gabriel'
                    ? 'bg-white text-[#1b365d] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Gabriel</span>
              </button>

              <button
                onClick={() => onSwitchProfile('esposa')}
                className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeProfileKey === 'esposa'
                    ? 'bg-white text-rose-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-rose-500" />
                <span>{activeProfileKey === 'esposa' ? activeProfileData.profileName : partnerProfileData.profileName}</span>
              </button>

              {isEditingName ? (
                <div className="flex items-center space-x-1 ml-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-1.5 py-0.5 text-xs border rounded w-16"
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] rounded"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTempName(activeProfileData.profileName);
                    setIsEditingName(true);
                  }}
                  title="Editar nome"
                  className="p-1 text-slate-400 hover:text-slate-700 ml-0.5 rounded"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick Actions (Pomodoro & Backup) */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <button
                onClick={onOpenPomodoro}
                className="flex items-center space-x-1 text-xs font-bold px-2.5 sm:px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all active:scale-95"
              >
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pomodoro</span>
                <span className="sm:hidden">{studyHours}h</span>
              </button>

              {/* Desktop quick metrics */}
              <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-600">
                <span className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 font-medium">
                  <strong>{completedCount}</strong>/{totalTopicsCount} tópicos ({progressPercent}%)
                </span>
                <span className="bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 font-medium">
                  <strong>{accuracyPercent}%</strong> acertos
                </span>
              </div>

              {/* Backup Menu */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={exportDataAsJSON}
                  title="Exportar Backup"
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <label
                  title="Importar Backup"
                  className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Hidden on mobile - Mobile uses Bottom Nav) */}
          <div className="hidden md:flex space-x-2 border-t border-slate-100 py-2 text-xs sm:text-sm">
            <button
              onClick={() => onChangeView('cronograma')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                currentView === 'cronograma'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Cronograma 20 Semanas</span>
            </button>

            <button
              onClick={() => onChangeView('conteudo')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                currentView === 'conteudo'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Vade Mecum & Conteúdo</span>
            </button>

            <button
              onClick={() => onChangeView('metricas')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                currentView === 'metricas'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Métricas do Casal</span>
            </button>

            <button
              onClick={() => onChangeView('redacao')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                currentView === 'redacao'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-4 h-4 text-amber-600" />
              <span>Oficina de Redação</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modern Mobile Bottom Navigation Bar (Thumb-friendly iOS/Android pattern) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg safe-bottom">
        <div className="grid grid-cols-4 h-14">
          <button
            onClick={() => onChangeView('cronograma')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              currentView === 'cronograma' ? 'text-blue-600 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <Calendar className={`w-4 h-4 ${currentView === 'cronograma' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px]">Semanal</span>
          </button>

          <button
            onClick={() => onChangeView('conteudo')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              currentView === 'conteudo' ? 'text-emerald-600 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${currentView === 'conteudo' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px]">Estudar</span>
          </button>

          <button
            onClick={() => onChangeView('metricas')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              currentView === 'metricas' ? 'text-purple-600 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${currentView === 'metricas' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px]">Casal</span>
          </button>

          <button
            onClick={() => onChangeView('redacao')}
            className={`flex flex-col items-center justify-center space-y-0.5 transition-colors ${
              currentView === 'redacao' ? 'text-amber-600 font-extrabold' : 'text-slate-500 font-medium'
            }`}
          >
            <PenTool className={`w-4 h-4 ${currentView === 'redacao' ? 'stroke-[2.5]' : ''}`} />
            <span className="text-[10px]">Redação</span>
          </button>
        </div>
      </nav>
    </>
  );
};
