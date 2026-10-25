import React, { useState } from 'react';
import { RedacaoTheme } from '../data/redacaoData';
import { PenTool, AlertTriangle, CheckCircle, Save, History, FileText, Info, BookOpen } from 'lucide-react';
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
  const [mobileTab, setMobileTab] = useState<'editor' | 'proposta'>('editor');

  const activeTheme = themes.find((t) => t.id === selectedThemeId) || themes[0];

  const characterCount = essayText.length;
  const paragraphCount = essayText.split('\n').filter((p) => p.trim().length > 0).length;
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
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-4 sm:p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
              <PenTool className="w-3 h-3" />
              <span>Prova Discursiva VUNESP (40 Pts)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black">Oficina de Redação</h1>
            <p className="text-amber-100 text-xs mt-0.5">
              Grade oficial de 30 linhas. Treine a síntese reflexiva sem modelos prontos decorados.
            </p>
          </div>

          <button
            onClick={() => setViewHistory(!viewHistory)}
            className="flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-white text-amber-900 rounded-xl font-bold text-xs hover:bg-amber-50 shadow-xs transition-all self-start sm:self-auto"
          >
            <History className="w-3.5 h-3.5" />
            <span>{viewHistory ? 'Voltar ao Editor' : `Minhas Redações (${savedEssays.length})`}</span>
          </button>
        </div>
      </div>

      {viewHistory ? (
        /* Saved Essays History */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Histórico de Redações de {activeProfileName}</span>
          </h2>

          {savedEssays.length === 0 ? (
            <p className="text-xs sm:text-sm text-slate-500 py-8 text-center">Nenhuma redação salva ainda neste perfil.</p>
          ) : (
            <div className="space-y-4">
              {savedEssays.map((essay, idx) => (
                <div key={essay.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{essay.themeTitle}</h3>
                    <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-semibold self-start sm:self-auto">
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
        /* Mobile Tab Switcher: Proposta vs Editor */
        <div className="space-y-4">
          <div className="lg:hidden flex bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setMobileTab('editor')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mobileTab === 'editor'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Escrever Redação (~{estimatedLines} linhas)
            </button>
            <button
              onClick={() => setMobileTab('proposta')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mobileTab === 'proposta'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ver Proposta & Critérios
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Theme & Guidelines (Hidden on mobile if on 'editor' tab) */}
            <div className={`lg:col-span-5 space-y-4 ${mobileTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Selecione a Proposta:
                </label>
                <select
                  value={selectedThemeId}
                  onChange={(e) => setSelectedThemeId(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {themes.map((th) => (
                    <option key={th.id} value={th.id}>
                      {th.axis}: {th.title.slice(0, 45)}...
                    </option>
                  ))}
                </select>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-amber-700 block mb-0.5">Eixo: {activeTheme.axis}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{activeTheme.title}</h3>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  <span className="font-bold text-amber-900 block mb-1">Textos de Apoio:</span>
                  {activeTheme.contextText}
                </div>
              </div>

              {/* Vunesp Rules */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Critérios do Edital 02/2026:</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li className="flex items-start space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Ideal: 25 a 28 linhas em 4 parágrafos.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Conclusão sem proposta do ENEM (faça síntese).</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Menos de 20 linhas não atinge nota máxima.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>Proibido usar esqueletos prontos decorados (Item 10.i).</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Sheet (Hidden on mobile if on 'proposta' tab) */}
            <div className={`lg:col-span-7 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-3 ${mobileTab === 'proposta' ? 'hidden lg:block' : 'block'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">Folha Definitiva de Resposta</h3>
                  <span className="text-[11px] text-slate-500">
                    {characterCount} chars • {paragraphCount} parágrafos • <strong>~{estimatedLines} linhas</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      estimatedLines >= 22 && estimatedLines <= 30
                        ? 'bg-emerald-100 text-emerald-800'
                        : estimatedLines < 20
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {estimatedLines >= 22 && estimatedLines <= 30
                      ? 'Ideal (22-30)'
                      : estimatedLines < 20
                      ? 'Curto (<20)'
                      : 'Limite (30)'}
                  </span>

                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 active:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    <Save className="w-3 h-3" />
                    <span>Salvar</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={16}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Escreva sua dissertação aqui (introdução com tese, desenvolvimento 1, desenvolvimento 2 e conclusão reflexiva)..."
                className="w-full p-3 text-base sm:text-xs font-mono leading-relaxed border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/15"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
