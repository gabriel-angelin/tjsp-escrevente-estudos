import React from 'react';
import { UserStats, TopicItem } from '../types';
import { BarChart3, Clock, CheckCircle2, Award, Users, BookOpen, PenTool, Sparkles } from 'lucide-react';

interface MetricasViewProps {
  gabrielStats: UserStats;
  esposaStats: UserStats;
  allTopics: TopicItem[];
}

export const MetricasView: React.FC<MetricasViewProps> = ({
  gabrielStats,
  esposaStats,
  allTopics,
}) => {
  const totalTopics = allTopics.length;

  // Gabriel Computations
  const gabrielHours = (gabrielStats.totalStudyMinutes / 60).toFixed(1);
  const gabrielDoneTopics = gabrielStats.completedTopicIds.length;
  const gabrielTopicPercent = Math.round((gabrielDoneTopics / Math.max(1, totalTopics)) * 100);

  const gabrielTotalQ = Object.values(gabrielStats.topicMetrics).reduce((acc, m) => acc + (m.questionsDone || 0), 0);
  const gabrielCorrectQ = Object.values(gabrielStats.topicMetrics).reduce((acc, m) => acc + (m.questionsCorrect || 0), 0);
  const gabrielAccuracy = gabrielTotalQ > 0 ? Math.round((gabrielCorrectQ / gabrielTotalQ) * 100) : 0;
  const gabrielEssays = gabrielStats.savedEssays.length;

  // Esposa Computations
  const esposaHours = (esposaStats.totalStudyMinutes / 60).toFixed(1);
  const esposaDoneTopics = esposaStats.completedTopicIds.length;
  const esposaTopicPercent = Math.round((esposaDoneTopics / Math.max(1, totalTopics)) * 100);

  const esposaTotalQ = Object.values(esposaStats.topicMetrics).reduce((acc, m) => acc + (m.questionsDone || 0), 0);
  const esposaCorrectQ = Object.values(esposaStats.topicMetrics).reduce((acc, m) => acc + (m.questionsCorrect || 0), 0);
  const esposaAccuracy = esposaTotalQ > 0 ? Math.round((esposaCorrectQ / esposaTotalQ) * 100) : 0;
  const esposaEssays = esposaStats.savedEssays.length;

  // Combined stats
  const coupleTotalMinutes = gabrielStats.totalStudyMinutes + esposaStats.totalStudyMinutes;
  const coupleTotalHours = (coupleTotalMinutes / 60).toFixed(1);
  const coupleTotalQuestions = gabrielTotalQ + esposaTotalQ;

  return (
    <div className="space-y-6">
      {/* Couple Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#1b365d] text-white p-5 sm:p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <Users className="w-3 h-3 text-pink-300" />
              <span>Painel do Casal</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight">Gabriel & {esposaStats.profileName}</h1>
            <p className="text-purple-200 text-xs sm:text-sm mt-0.5">
              Dois futuros Escreventes do TJ-SP! Cada um com suas métricas individuais e apoio mútuo.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/20 self-stretch sm:self-auto justify-around">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-wider text-purple-200 block">Horas Casal</span>
              <span className="text-lg sm:text-2xl font-black text-amber-300">{coupleTotalHours}h</span>
            </div>
            <div className="w-px h-7 bg-white/20" />
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-wider text-purple-200 block">Questões</span>
              <span className="text-lg sm:text-2xl font-black text-emerald-300">{coupleTotalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Gabriel Card */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider">
            Perfil Gabriel
          </div>

          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 font-black text-lg">
              G
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">{gabrielStats.profileName}</h3>
              <p className="text-[11px] text-slate-500">Escrevente Técnico Judiciário</p>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <Clock className="w-3 h-3 text-blue-600" />
                <span>Horas</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{gabrielHours}h</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <BookOpen className="w-3 h-3 text-emerald-600" />
                <span>Tópicos</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{gabrielDoneTopics}/{totalTopics}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <Award className="w-3 h-3 text-amber-600" />
                <span>Acertos</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{gabrielAccuracy}%</span>
              <span className="text-[9px] text-slate-400 block">({gabrielCorrectQ}/{gabrielTotalQ}q)</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <PenTool className="w-3 h-3 text-purple-600" />
                <span>Redações</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{gabrielEssays}</span>
              <span className="text-[9px] text-slate-400 block">de 6</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600 text-[11px]">Cobertura do Edital</span>
              <span className="text-blue-600 text-[11px]">{gabrielTopicPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, gabrielTopicPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Thalia Card */}
        <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider">
            Perfil {esposaStats.profileName}
          </div>

          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 font-black text-lg">
              {esposaStats.profileName.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">{esposaStats.profileName}</h3>
              <p className="text-[11px] text-slate-500">Escrevente Técnica Judiciária</p>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <Clock className="w-3 h-3 text-rose-600" />
                <span>Horas</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{esposaHours}h</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <BookOpen className="w-3 h-3 text-emerald-600" />
                <span>Tópicos</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{esposaDoneTopics}/{totalTopics}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <Award className="w-3 h-3 text-amber-600" />
                <span>Acertos</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{esposaAccuracy}%</span>
              <span className="text-[9px] text-slate-400 block">({esposaCorrectQ}/{esposaTotalQ}q)</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mb-0.5">
                <PenTool className="w-3 h-3 text-purple-600" />
                <span>Redações</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-900">{esposaEssays}</span>
              <span className="text-[9px] text-slate-400 block">de 6</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600 text-[11px]">Cobertura do Edital</span>
              <span className="text-rose-600 text-[11px]">{esposaTopicPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-rose-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, esposaTopicPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison Breakdown */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Comparativo Visual do Casal
          </h3>
        </div>

        <div className="space-y-4">
          {/* Horas */}
          <div>
            <div className="flex justify-between text-[11px] font-semibold mb-1.5">
              <span className="text-blue-700">Gabriel: {gabrielHours}h</span>
              <span className="text-slate-400 uppercase text-[9px]">Horas</span>
              <span className="text-rose-700">{esposaStats.profileName}: {esposaHours}h</span>
            </div>
            <div className="flex h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 transition-all duration-500"
                style={{
                  width: `${coupleTotalMinutes > 0 ? (gabrielStats.totalStudyMinutes / coupleTotalMinutes) * 100 : 50}%`,
                }}
              />
              <div
                className="bg-rose-500 transition-all duration-500"
                style={{
                  width: `${coupleTotalMinutes > 0 ? (esposaStats.totalStudyMinutes / coupleTotalMinutes) * 100 : 50}%`,
                }}
              />
            </div>
          </div>

          {/* Questões */}
          <div>
            <div className="flex justify-between text-[11px] font-semibold mb-1.5">
              <span className="text-blue-700">Gabriel: {gabrielTotalQ}q ({gabrielAccuracy}%)</span>
              <span className="text-slate-400 uppercase text-[9px]">Questões</span>
              <span className="text-rose-700">{esposaStats.profileName}: {esposaTotalQ}q ({esposaAccuracy}%)</span>
            </div>
            <div className="flex h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 transition-all duration-500"
                style={{
                  width: `${coupleTotalQuestions > 0 ? (gabrielTotalQ / coupleTotalQuestions) * 100 : 50}%`,
                }}
              />
              <div
                className="bg-rose-500 transition-all duration-500"
                style={{
                  width: `${coupleTotalQuestions > 0 ? (esposaTotalQ / coupleTotalQuestions) * 100 : 50}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
