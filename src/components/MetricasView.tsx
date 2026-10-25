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
    <div className="space-y-8">
      {/* Couple Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#1b365d] text-white p-6 sm:p-8 rounded-2xl shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5 text-pink-300" />
              <span>Painel de Conquistas do Casal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Gabriel & {esposaStats.profileName}</h1>
            <p className="text-purple-200 text-sm mt-1">
              Juntos rumo às duas vagas de Escrevente do TJ-SP! Cada um com suas métricas individuais e apoio mútuo diário.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-purple-200 block">Horas do Casal</span>
              <span className="text-2xl font-black text-amber-300">{coupleTotalHours}h</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-purple-200 block">Questões Totais</span>
              <span className="text-2xl font-black text-emerald-300">{coupleTotalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gabriel Card */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Perfil Gabriel
          </div>

          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800 font-black text-xl">
              G
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">{gabrielStats.profileName}</h3>
              <p className="text-xs text-slate-500">Escrevente Técnico Judiciário</p>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Horas Estudadas</span>
              </div>
              <span className="text-xl font-black text-slate-900">{gabrielHours}h</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tópicos Feitos</span>
              </div>
              <span className="text-xl font-black text-slate-900">{gabrielDoneTopics}/{totalTopics}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Aproveitamento</span>
              </div>
              <span className="text-xl font-black text-slate-900">{gabrielAccuracy}%</span>
              <span className="text-[10px] text-slate-400 block">({gabrielCorrectQ}/{gabrielTotalQ} questões)</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <PenTool className="w-3.5 h-3.5 text-purple-600" />
                <span>Redações</span>
              </div>
              <span className="text-xl font-black text-slate-900">{gabrielEssays}</span>
              <span className="text-[10px] text-slate-400 block">de 6 recomendadas</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">Cobertura do Edital</span>
              <span className="text-blue-600">{gabrielTopicPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, gabrielTopicPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Esposa Card */}
        <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Perfil {esposaStats.profileName}
          </div>

          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 font-black text-xl">
              {esposaStats.profileName.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">{esposaStats.profileName}</h3>
              <p className="text-xs text-slate-500">Escrevente Técnica Judiciária</p>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span>Horas Estudadas</span>
              </div>
              <span className="text-xl font-black text-slate-900">{esposaHours}h</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tópicos Feitos</span>
              </div>
              <span className="text-xl font-black text-slate-900">{esposaDoneTopics}/{totalTopics}</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Aproveitamento</span>
              </div>
              <span className="text-xl font-black text-slate-900">{esposaAccuracy}%</span>
              <span className="text-[10px] text-slate-400 block">({esposaCorrectQ}/{esposaTotalQ} questões)</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1">
                <PenTool className="w-3.5 h-3.5 text-purple-600" />
                <span>Redações</span>
              </div>
              <span className="text-xl font-black text-slate-900">{esposaEssays}</span>
              <span className="text-[10px] text-slate-400 block">de 6 recomendadas</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-600">Cobertura do Edital</span>
              <span className="text-rose-600">{esposaTopicPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-rose-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, esposaTopicPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Comparison Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900">Comparativo Visual do Casal</h3>
        </div>

        <div className="space-y-6">
          {/* Horas */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-blue-700">Gabriel: {gabrielHours}h</span>
              <span className="text-slate-400 uppercase text-[10px]">Horas Líquidas</span>
              <span className="text-rose-700">{esposaStats.profileName}: {esposaHours}h</span>
            </div>
            <div className="flex h-3 bg-slate-100 rounded-full overflow-hidden">
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
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-blue-700">Gabriel: {gabrielTotalQ} questões ({gabrielAccuracy}%)</span>
              <span className="text-slate-400 uppercase text-[10px]">Volume de Questões</span>
              <span className="text-rose-700">{esposaStats.profileName}: {esposaTotalQ} questões ({esposaAccuracy}%)</span>
            </div>
            <div className="flex h-3 bg-slate-100 rounded-full overflow-hidden">
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
