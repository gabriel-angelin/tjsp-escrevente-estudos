import React, { useState, useEffect } from 'react';
import { AppStorage, ProfileKey, TopicItem } from './types';
import { getStorageData, saveStorageData } from './utils/storage';
import { topicsDireito } from './data/conteudoDireito';
import { topicsGerais } from './data/conteudoGerais';
import { weeksPlanData } from './data/cronogramaData';
import { redacaoThemesData } from './data/redacaoData';

import { Navbar } from './components/Navbar';
import { CronogramaView } from './components/CronogramaView';
import { ConteudoView } from './components/ConteudoView';
import { MetricasView } from './components/MetricasView';
import { RedacaoView } from './components/RedacaoView';
import { PomodoroModal } from './components/PomodoroModal';

const allTopicsList: TopicItem[] = [...topicsDireito, ...topicsGerais];

export function App() {
  const [storage, setStorage] = useState<AppStorage>(getStorageData());
  const [currentView, setCurrentView] = useState<'cronograma' | 'conteudo' | 'metricas' | 'redacao'>('cronograma');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(allTopicsList[0].id);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState<boolean>(false);

  // Sync to local storage on change
  useEffect(() => {
    saveStorageData(storage);
  }, [storage]);

  const activeKey: ProfileKey = storage.activeProfile;
  const partnerKey: ProfileKey = activeKey === 'gabriel' ? 'esposa' : 'gabriel';
  const activeProfile = storage.profiles[activeKey];
  const partnerProfile = storage.profiles[partnerKey];

  // Actions
  const handleSwitchProfile = (key: ProfileKey) => {
    setStorage((prev) => ({
      ...prev,
      activeProfile: key,
    }));
  };

  const handleUpdateName = (newName: string) => {
    setStorage((prev) => ({
      ...prev,
      profiles: {
        ...prev.profiles,
        [activeKey]: {
          ...prev.profiles[activeKey],
          profileName: newName,
        },
      },
    }));
  };

  const handleToggleTopic = (topicId: string) => {
    setStorage((prev) => {
      const user = prev.profiles[activeKey];
      const isCompleted = user.completedTopicIds.includes(topicId);
      const newCompleted = isCompleted
        ? user.completedTopicIds.filter((id) => id !== topicId)
        : [...user.completedTopicIds, topicId];

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [activeKey]: {
            ...user,
            completedTopicIds: newCompleted,
          },
        },
      };
    });
  };

  const handleRecordQuestions = (topicId: string, done: number, correct: number) => {
    setStorage((prev) => {
      const user = prev.profiles[activeKey];
      const existing = user.topicMetrics[topicId] || { questionsDone: 0, questionsCorrect: 0 };
      const updated = {
        ...existing,
        questionsDone: existing.questionsDone + done,
        questionsCorrect: existing.questionsCorrect + correct,
        lastStudied: new Date().toISOString(),
      };

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [activeKey]: {
            ...user,
            topicMetrics: {
              ...user.topicMetrics,
              [topicId]: updated,
            },
          },
        },
      };
    });
  };

  const handleSaveEssay = (essay: {
    themeId: string;
    themeTitle: string;
    text: string;
    linesCount: number;
    date: string;
  }) => {
    setStorage((prev) => {
      const user = prev.profiles[activeKey];
      const newEssay = {
        ...essay,
        id: 'essay-' + Date.now(),
      };
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [activeKey]: {
            ...user,
            savedEssays: [newEssay, ...user.savedEssays],
          },
        },
      };
    });
  };

  const handleLogStudyTime = (minutes: number) => {
    setStorage((prev) => {
      const user = prev.profiles[activeKey];
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [activeKey]: {
            ...user,
            totalStudyMinutes: user.totalStudyMinutes + minutes,
            studyLogs: [
              {
                id: 'log-' + Date.now(),
                date: new Date().toLocaleDateString('pt-BR'),
                minutes,
                subjectId: 'pomodoro',
              },
              ...user.studyLogs,
            ],
          },
        },
      };
    });
  };

  const handleNavigateToTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentView('conteudo');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar
        activeProfileKey={activeKey}
        onSwitchProfile={handleSwitchProfile}
        activeProfileData={activeProfile}
        partnerProfileData={partnerProfile}
        onUpdateName={handleUpdateName}
        currentView={currentView}
        onChangeView={setCurrentView}
        onOpenPomodoro={() => setIsPomodoroOpen(true)}
        totalTopicsCount={allTopicsList.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'cronograma' && (
          <CronogramaView
            weeks={weeksPlanData}
            completedTopicIds={activeProfile.completedTopicIds}
            onToggleTopic={handleToggleTopic}
            onNavigateToTopic={handleNavigateToTopic}
            activeProfileName={activeProfile.profileName}
          />
        )}

        {currentView === 'conteudo' && (
          <ConteudoView
            topics={allTopicsList}
            completedTopicIds={activeProfile.completedTopicIds}
            onToggleTopic={handleToggleTopic}
            selectedTopicId={selectedTopicId}
            onSelectTopicId={setSelectedTopicId}
            onRecordQuestions={handleRecordQuestions}
            topicMetrics={activeProfile.topicMetrics}
          />
        )}

        {currentView === 'metricas' && (
          <MetricasView
            gabrielStats={storage.profiles.gabriel}
            esposaStats={storage.profiles.esposa}
            allTopics={allTopicsList}
          />
        )}

        {currentView === 'redacao' && (
          <RedacaoView
            themes={redacaoThemesData}
            savedEssays={activeProfile.savedEssays}
            onSaveEssay={handleSaveEssay}
            activeProfileName={activeProfile.profileName}
          />
        )}
      </main>

      <PomodoroModal
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
        onLogStudyTime={handleLogStudyTime}
        activeProfileName={activeProfile.profileName}
      />

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>TJ-SP Escrevente Técnico Judiciário (Edital 02/2026 - VUNESP) • Projeto de Estudos Gabriel & Esposa</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Dados persistidos localmente no navegador (LocalStorage). Use o botão de download no topo para salvar cópias de segurança JSON.
        </p>
      </footer>
    </div>
  );
}

export default App;
