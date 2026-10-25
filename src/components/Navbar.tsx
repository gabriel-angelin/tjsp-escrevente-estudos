import React, { useState } from 'react';
import { ProfileKey, UserStats } from '../types';
import { exportDataAsJSON, importDataFromJSON } from '../utils/storage';
import { User, Users, Clock, CheckCircle2, Award, Download, Upload, Edit3, BookOpen, Calendar, BarChart3, PenTool } from 'lucide-react';

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

  // Compute total questions
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Título */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1b365d] to-[#0284c7] flex items-center justify-center text-white font-bold shadow-md">
              TJ
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">TJ-SP 2026/27</span>
                <span className="text-xs px-2 py-0.5 font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Escrevente
                </span>
              </div>
              <p className="text-xs text-slate-500">Preparação Conjunta do Casal</p>
            </div>
          </div>

          {/* Profile Switcher (Gabriel | Esposa) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onSwitchProfile('gabriel')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeProfileKey === 'gabriel'
                  ? 'bg-white text-[#1b365d] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>Gabriel</span>
            </button>

            <button
              onClick={() => onSwitchProfile('esposa')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeProfileKey === 'esposa'
                  ? 'bg-white text-rose-800 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-rose-500" />
              <span>{activeProfileKey === 'esposa' ? activeProfileData.profileName : partnerProfileData.profileName}</span>
            </button>

            {isEditingName ? (
              <div className="flex items-center space-x-1 ml-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-2 py-1 text-xs border rounded w-24"
                  placeholder="Nome"
                />
                <button
                  onClick={handleSaveName}
                  className="px-2 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700"
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
                title="Editar nome do perfil ativo"
                className="p-1.5 text-slate-400 hover:text-slate-700 ml-1 rounded"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span><strong>{studyHours}h</strong> estudadas</span>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span><strong>{completedCount}</strong>/{totalTopicsCount} tópicos ({progressPercent}%)</span>
            </div>

            <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span><strong>{accuracyPercent}%</strong> acertos ({correctQuestions}/{totalQuestions}q)</span>
            </div>

            {/* Pomodoro Timer Button */}
            <button
              onClick={onOpenPomodoro}
              className="flex items-center space-x-1 text-xs font-semibold px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pomodoro</span>
            </button>

            {/* Backup actions */}
            <button
              onClick={exportDataAsJSON}
              title="Baixar Backup dos Dados (JSON)"
              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <label
              title="Restaurar Backup (JSON)"
              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-4 border-t border-slate-100 py-2 overflow-x-auto text-xs sm:text-sm">
          <button
            onClick={() => onChangeView('cronograma')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentView === 'cronograma'
                ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Cronograma 20 Semanas</span>
          </button>

          <button
            onClick={() => onChangeView('conteudo')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentView === 'conteudo'
                ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Vade Mecum & Conteúdo Completo</span>
          </button>

          <button
            onClick={() => onChangeView('metricas')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentView === 'metricas'
                ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <span>Métricas do Casal (Comparativo)</span>
          </button>

          <button
            onClick={() => onChangeView('redacao')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              currentView === 'redacao'
                ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PenTool className="w-4 h-4 text-amber-600" />
            <span>Oficina & Simulador de Redação</span>
          </button>
        </div>
      </div>
    </header>
  );
};
