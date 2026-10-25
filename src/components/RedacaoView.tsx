import React, { useState } from 'react';
import { RedacaoTheme } from '../data/redacaoData';
import { PenTool, AlertTriangle, CheckCircle, Save, History, FileText, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RedacaoViewProps {
  themes: RedacaoTheme[];
  savedEssays: Array<{
    id: string;
    themeId: string;
    themeTitle: string;
    text: string;
    linesCount: number;
    date: string;
    notes?: string;
  }>;
  onSaveEssay: (essay: {
    themeId: string;
    themeTitle: string;
    text: string;
    linesCount: number;
    date: string;
  }) => void;
  activeProfileName: string;
}

export const RedacaoView: React.FC<RedacaoViewProps> = ({
  themes,
  savedEssays,
  onSaveEssay,
  activeProfileName,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(themes[0].id);
  const [essayText, setEssayText] = useState<string>('');
  const [viewHistory, setViewHistory] = useState<boolean>(false);

  const activeTheme = themes.find((t) => t.id === selectedThemeId) || themes[0];

  // Rough estimation of handwritten lines:
  // Usually ~65-75 characters per handwritten line in standard exam sheet
  const characterCount = essayText.length;
  const paragraphCount = essayText.split('\n').filter((p) => p.trim().length > 0).length;
  // Estimate lines by character density plus paragraphs
  const estimatedLines = Math.max(
    essayText.split('\n').length,
    Math.ceil(characterCount / 70)
  );

  const handleSave = () => {
    if (!essayText.trim()) {
      alert('Escreva o texto da sua redação antes de salvar.');
      return;
    }
    onSaveEssay({
      themeId: activeTheme.id,
      themeTitle: activeTheme.title,
      text: essayText,
      linesCount: estimatedLines,
      date: new Date().toLocaleDateString('pt-BR'),
    });
    confetti({ particleCount: 50, spread: 60 });
    alert('Redação salva com sucesso no perfil de ' + activeProfileName + '!');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-6 rounded-2xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
              <PenTool className="w-3.5 h-3.5" />
              <span>Prova Discursiva - VUNESP (40 Pontos - Eliminatória)</span>
            </div>
            <h1 className="text-2xl font-black">Oficina e Simulador de Redação</h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1">
              Escreva diretamente na grade de 30 linhas. Treine a síntese reflexiva sem recorrer a modelos prontos decorados.
            </p>
          </div>

          <button
            onClick={() => setViewHistory(!viewHistory)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-amber-900 rounded-xl font-bold text-xs hover:bg-amber-50 shadow transition-all self-start sm:self-auto"
          >
            <History className="w-4 h-4" />
            <span>{viewHistory ? 'Voltar ao Editor' : `Minhas Redações (${savedEssays.length})`}</span>
          </button>
        </div>
      </div>

      {viewHistory ? (
        /* Saved Essays History */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <span>Histórico de Redações de {activeProfileName}</span>
          </h2>

          {savedEssays.length === 0 ? (
            <p className="text-sm text-slate-500 py-8 text-center">Nenhuma redação salva ainda neste perfil. Escolha um tema e pratique!</p>
          ) : (
            <div className="space-y-4">
              {savedEssays.map((essay, idx) => (
                <div key={essay.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-slate-900">{essay.themeTitle}</h3>
                    <span className="text-xs bg-slate-200 px-2.5 py-1 rounded-md text-slate-700 font-semibold">
                      {essay.date} • ~{essay.linesCount} linhas
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 whitespace-pre-wrap font-mono bg-white p-3 rounded-lg border border-slate-200">
                    {essay.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Main Writing Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Theme & Guidelines Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            {/* Theme Selector */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                Selecione o Tema da Proposta:
              </label>
              <select
                value={selectedThemeId}
                onChange={(e) => setSelectedThemeId(e.target.value)}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {themes.map((th) => (
                  <option key={th.id} value={th.id}>
                    {th.axis}: {th.title.slice(0, 50)}...
                  </option>
                ))}
              </select>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-amber-700 block mb-1">Eixo Temático: {activeTheme.axis}</span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{activeTheme.title}</h3>
              </div>

              {/* Motivating Texts */}
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                <span className="font-bold text-amber-900 block mb-1">Textos Coletânea de Apoio:</span>
                {activeTheme.contextText}
              </div>

              {/* Reflexive questions */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-600 block">Pontos para reflexão na tese:</span>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                  {activeTheme.focusQuestions.map((q, qIdx) => (
                    <li key={qIdx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vunesp Rules Checklist Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
              <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Critérios e Vedações do Edital 02/2026:</span>
              </div>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-start space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Ideal:</strong> 25 a 28 linhas, 4 parágrafos (Intro, D1, D2, Conclusão).</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Conclusão:</strong> Não faça proposta de intervenção do ENEM. Faça síntese reflexiva.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Aviso:</strong> Menos de 20 linhas não alcança nota máxima nos critérios C e D.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Proibido:</strong> Usar modelos prontos decorados (Item 10.i do edital).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Sheet (30 lines) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Folha Definitiva de Resposta</h3>
                <span className="text-xs text-slate-500">
                  {characterCount} caracteres • {paragraphCount} parágrafos • <strong>~{estimatedLines} linhas</strong>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                    estimatedLines >= 22 && estimatedLines <= 30
                      ? 'bg-emerald-100 text-emerald-800'
                      : estimatedLines < 20
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {estimatedLines >= 22 && estimatedLines <= 30
                    ? 'Tamanho Ideal (22-30)'
                    : estimatedLines < 20
                    ? 'Muito Curto (<20)'
                    : 'Atenção ao Limite'}
                </span>

                <button
                  onClick={handleSave}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Redação</span>
                </button>
              </div>
            </div>

            <textarea
              rows={18}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Comece aqui a sua dissertação em prosa. Exemplo de introdução:
A evolução tecnológica tem transformado profundamente a prestação dos serviços públicos contemporâneos..."
              className="w-full p-4 text-xs sm:text-sm font-mono leading-relaxed border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/20"
            />
          </div>
        </div>
      )}
    </div>
  );
};
