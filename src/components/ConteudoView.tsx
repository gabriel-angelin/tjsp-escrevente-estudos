import React, { useState } from 'react';
import { TopicItem } from '../types';
import { Search, BookOpen, CheckCircle2, Circle, AlertTriangle, HelpCircle, Check, X, ArrowLeft, Plus, Minus, CheckSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConteudoViewProps {
  topics: TopicItem[];
  completedTopicIds: string[];
  onToggleTopic: (topicId: string) => void;
  selectedTopicId?: string;
  onSelectTopicId: (id: string) => void;
  onRecordQuestions: (topicId: string, done: number, correct: number) => void;
  topicMetrics: Record<string, { questionsDone: number; questionsCorrect: number }>;
}

export const ConteudoView: React.FC<ConteudoViewProps> = ({
  topics,
  completedTopicIds,
  onToggleTopic,
  selectedTopicId,
  onSelectTopicId,
  onRecordQuestions,
  topicMetrics,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});

  // Mobile navigation state: 'list' (topic catalog) or 'reader' (reading lesson)
  const [mobileScreen, setMobileScreen] = useState<'list' | 'reader'>(selectedTopicId ? 'reader' : 'list');

  React.useEffect(() => {
    if (selectedTopicId) {
      setMobileScreen('reader');
    }
  }, [selectedTopicId]);

  // Question recorder state
  const [qDoneInput, setQDoneInput] = useState<number>(5);
  const [qCorrectInput, setQCorrectInput] = useState<number>(4);

  // Filter topics
  const filteredTopics = topics.filter((t) => {
    const matchCat =
      selectedCategory === 'all' ||
      t.category === selectedCategory ||
      t.subjectId === selectedCategory;
    const matchSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.fullContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.keyArticles && t.keyArticles.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  const activeTopic = topics.find((t) => t.id === selectedTopicId) || filteredTopics[0] || topics[0];

  const handleSelectTopic = (id: string) => {
    onSelectTopicId(id);
    setMobileScreen('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setShowAnswer((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleSaveQuestions = () => {
    if (activeTopic) {
      onRecordQuestions(activeTopic.id, Number(qDoneInput), Number(qCorrectInput));
      confetti({ particleCount: 30, spread: 50 });
      alert(`Registrado com sucesso: ${qCorrectInput}/${qDoneInput} acertos em "${activeTopic.title}"!`);
    }
  };

  const isDone = activeTopic ? completedTopicIds.includes(activeTopic.id) : false;
  const currentMetric = activeTopic && topicMetrics[activeTopic.id] ? topicMetrics[activeTopic.id] : { questionsDone: 0, questionsCorrect: 0 };

  return (
    <div className="space-y-4">
      {/* Mobile Breadcrumb / Back button when in Reader mode */}
      <div className="lg:hidden flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
        {mobileScreen === 'reader' ? (
          <button
            onClick={() => setMobileScreen('list')}
            className="flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg active:scale-95 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ver Todas as Matérias</span>
          </button>
        ) : (
          <span className="text-xs font-bold text-slate-700 px-1">
            Selecione uma matéria ({filteredTopics.length})
          </span>
        )}

        {mobileScreen === 'reader' && activeTopic && (
          <button
            onClick={() => {
              onToggleTopic(activeTopic.id);
              if (!isDone) confetti({ particleCount: 40, spread: 60 });
            }}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isDone ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{isDone ? 'Concluído' : 'Marcar'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar: Topic Catalog (Visible on Desktop always; On mobile only when mobileScreen === 'list') */}
        <div className={`lg:col-span-4 space-y-3 ${mobileScreen === 'reader' ? 'hidden lg:block' : 'block'}`}>
          {/* Search Box */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar em leis, artigos ou matérias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>

            {/* Quick Category Filters */}
            <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-slate-100">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'direito', label: 'Direito' },
                { id: 'portugues', label: 'Português' },
                { id: 'info', label: 'Informática' },
                { id: 'rlm', label: 'RLM' },
                { id: 'mat', label: 'Matemática' },
                { id: 'pcd', label: 'PCD' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#1b365d] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog list */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 flex justify-between items-center">
              <span>Aulas do Edital ({filteredTopics.length})</span>
              <span className="text-[10px] text-slate-400">Toque para abrir</span>
            </div>

            <div className="divide-y divide-slate-100 overflow-y-auto max-h-[calc(100vh-250px)] lg:max-h-[650px]">
              {filteredTopics.map((topic) => {
                const selected = topic.id === activeTopic?.id;
                const topicDone = completedTopicIds.includes(topic.id);

                return (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    className={`p-3.5 transition-all cursor-pointer flex items-start space-x-3 active:bg-blue-100 ${
                      selected ? 'bg-blue-50/90 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTopic(topic.id);
                        if (!topicDone) confetti({ particleCount: 25, spread: 50 });
                      }}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 flex-shrink-0"
                    >
                      {topicDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5 mb-0.5">
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase bg-slate-200 text-slate-700">
                          {topic.subjectName}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600">{topic.bloc}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{topic.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{topic.summary}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reader Screen (Visible on Desktop always; On mobile only when mobileScreen === 'reader') */}
        <div className={`lg:col-span-8 ${mobileScreen === 'list' ? 'hidden lg:block' : 'block'}`}>
          {activeTopic ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-8 space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-900 text-[11px] font-bold rounded-md">
                      {activeTopic.subjectName}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-900 text-[11px] font-bold rounded-md">
                      {activeTopic.bloc}
                    </span>
                    <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold rounded">
                      {activeTopic.importance}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onToggleTopic(activeTopic.id);
                      if (!isDone) confetti({ particleCount: 50, spread: 60 });
                    }}
                    className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    <span>{isDone ? 'Concluído!' : 'Marcar Lido'}</span>
                  </button>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2 leading-snug">
                  {activeTopic.title}
                </h1>

                {activeTopic.keyArticles && (
                  <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                    ⚖️ <strong>Artigos no Edital:</strong> {activeTopic.keyArticles}
                  </div>
                )}
              </div>

              {/* Vunesp Traps Alert */}
              {activeTopic.vunespTips && activeTopic.vunespTips.length > 0 && (
                <div className="bg-amber-50/90 border-l-4 border-amber-500 p-3 sm:p-4 rounded-r-xl">
                  <div className="flex items-center space-x-1.5 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Pegadinha Clássica da VUNESP</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-amber-950 font-medium">
                    {activeTopic.vunespTips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Content Body */}
              <div className="text-xs sm:text-sm leading-relaxed text-slate-800 whitespace-pre-line font-sans prose-headings:font-bold">
                {activeTopic.fullContent}
              </div>

              {/* Mobile-Friendly Stepper for Questions Recording */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-800">
                    Registrar Questões Resolvidas
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Acumulado: <strong>{currentMetric.questionsCorrect}/{currentMetric.questionsDone}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block mb-1">Feitas</span>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setQDoneInput(Math.max(1, qDoneInput - 1))}
                        className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-sm w-8">{qDoneInput}</span>
                      <button
                        onClick={() => setQDoneInput(qDoneInput + 1)}
                        className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block mb-1">Acertos</span>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setQCorrectInput(Math.max(0, qCorrectInput - 1))}
                        className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-sm w-8 text-emerald-700">{qCorrectInput}</span>
                      <button
                        onClick={() => setQCorrectInput(Math.min(qDoneInput, qCorrectInput + 1))}
                        className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center font-bold text-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveQuestions}
                  className="w-full py-2.5 bg-[#1b365d] active:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Salvar Questões no Meu Perfil
                </button>
              </div>

              {/* Practice Questions */}
              {activeTopic.practiceQuestions && activeTopic.practiceQuestions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Questão de Fixação da VUNESP</h3>
                  </div>

                  {activeTopic.practiceQuestions.map((q) => {
                    const selected = userAnswers[q.id];
                    const revealed = showAnswer[q.id];

                    return (
                      <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">
                          {q.exam} • Ano {q.year}
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">{q.statement}</p>

                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => {
                            const isUserChoice = selected === oIdx;
                            const isCorrect = q.correctIndex === oIdx;

                            let btnStyle = 'border-slate-200 bg-white text-slate-800 active:bg-slate-100';
                            if (revealed) {
                              if (isCorrect) {
                                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                              } else if (isUserChoice) {
                                btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectOption(q.id, oIdx)}
                                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start space-x-2.5 transition-all ${btnStyle}`}
                              >
                                <span className="font-bold flex-shrink-0">{String.fromCharCode(65 + oIdx)})</span>
                                <span className="flex-1 leading-snug">{opt}</span>
                                {revealed && isCorrect && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />}
                                {revealed && isUserChoice && !isCorrect && <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />}
                              </button>
                            );
                          })}
                        </div>

                        {revealed && (
                          <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-blue-900 leading-relaxed">
                            <strong>Gabarito Comentado:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Selecione uma matéria na lista para abrir o material.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
