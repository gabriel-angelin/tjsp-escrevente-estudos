import React, { useState } from 'react';
import { WeekPlan } from '../types';
import { Calendar, CheckCircle2, Circle, Clock, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CronogramaViewProps {
  weeks: WeekPlan[];
  completedTopicIds: string[];
  onToggleTopic: (topicId: string) => void;
  onNavigateToTopic: (topicId: string) => void;
  activeProfileName: string;
}

export const CronogramaView: React.FC<CronogramaViewProps> = ({
  weeks,
  completedTopicIds,
  onToggleTopic,
  onNavigateToTopic,
  activeProfileName,
}) => {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const activeWeek = weeks.find((w) => w.weekNumber === selectedWeekNum) || weeks[0];

  const handleToggle = (topicId: string) => {
    onToggleTopic(topicId);
    if (!completedTopicIds.includes(topicId)) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1b365d] to-[#075985] text-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Cronograma Oficial de 20 Semanas</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Rumo à Aprovação no TJ-SP</h1>
            <p className="text-blue-100 text-sm mt-1">
              Perfil ativo: <strong className="text-amber-300 font-bold">{activeProfileName}</strong>. As tarefas marcadas aqui são salvas no seu histórico individual.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 text-center">
            <span className="text-xs uppercase tracking-wider text-blue-200 block">Data da Prova</span>
            <span className="text-lg font-black text-amber-300">14 de Março de 2027</span>
            <span className="text-xs text-blue-200 block mt-0.5">Vespertino (5 horas)</span>
          </div>
        </div>
      </div>

      {/* Week Selector Pills */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Selecione a Semana de Estudo:</h2>
          <span className="text-xs text-slate-500">Semana atual: <strong>Semana {selectedWeekNum}</strong></span>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          {weeks.map((week) => {
            const isSelected = week.weekNumber === selectedWeekNum;
            // check how many topics in this week are completed
            const allTopicIds = week.days.flatMap((d) => d.topicIds);
            const doneCount = allTopicIds.filter((id) => completedTopicIds.includes(id)).length;
            const isAllDone = allTopicIds.length > 0 && doneCount === allTopicIds.length;

            return (
              <button
                key={week.weekNumber}
                onClick={() => setSelectedWeekNum(week.weekNumber)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#1b365d] text-white border-[#1b365d] shadow-md'
                    : isAllDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Semana {week.weekNumber}</div>
                <div className="text-[10px] opacity-80 mt-0.5">{week.startDate.slice(0, 5)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Week Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Semana {activeWeek.weekNumber} ({activeWeek.startDate} a {activeWeek.endDate})</span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{activeWeek.theme}</h2>
          </div>
          <div className="inline-flex items-center space-x-2 text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            <span>Ritmo Recomendado: 1h15 a 1h45 / dia</span>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {activeWeek.days.map((day, idx) => {
            const hasTopics = day.topicIds.length > 0;
            const isCompleted = hasTopics && day.topicIds.every((id) => completedTopicIds.includes(id));

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  day.isRedacao
                    ? 'border-amber-300 bg-amber-50/50'
                    : isCompleted
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">{day.dayName}</span>
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{day.timeMinutes} min</span>
                  </span>
                </div>

                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 text-[11px] font-bold rounded bg-blue-100 text-blue-800 mb-1">
                    {day.subject1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{day.subject2}</h3>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">{day.taskDescription}</p>

                {/* Topic Actions */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  {hasTopics ? (
                    <div className="flex items-center space-x-2">
                      {day.topicIds.map((topicId) => {
                        const done = completedTopicIds.includes(topicId);
                        return (
                          <button
                            key={topicId}
                            onClick={() => handleToggle(topicId)}
                            className={`flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                              done
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                            <span>{done ? 'Concluído' : 'Marcar'}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : day.isRedacao ? (
                    <span className="text-xs font-bold text-amber-700 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Oficina de Redação</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Sem tarefas de lei seca</span>
                  )}

                  {hasTopics && (
                    <button
                      onClick={() => onNavigateToTopic(day.topicIds[0])}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                      title="Abrir conteúdo para estudar"
                    >
                      <span>Estudar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
