import React, { useState } from 'react';
import { TopicItem } from '../types';
import { Search, BookOpen, CheckCircle2, Circle, AlertTriangle, HelpCircle, Check, X, ShieldAlert } from 'lucide-react';
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

  // Question modal inputs for the active topic
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

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setShowAnswer((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleSaveQuestions = () => {
    if (activeTopic) {
      onRecordQuestions(activeTopic.id, Number(qDoneInput), Number(qCorrectInput));
      alert(`Registrado com sucesso: ${qCorrectInput} acertos de ${qDoneInput} questões em "${activeTopic.title}"!`);
    }
  };

  const isDone = activeTopic ? completedTopicIds.includes(activeTopic.id) : false;
  const currentMetric = activeTopic && topicMetrics[activeTopic.id] ? topicMetrics[activeTopic.id] : { questionsDone: 0, questionsCorrect: 0 };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar: Topic List */}
      <div className="lg:col-span-4 space-y-4">
        {/* Search Input */}
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar em artigos, tópicos ou leis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-100">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'direito', label: 'Direito' },
              { id: 'portugues', label: 'Português' },
              { id: 'info', label: 'Informática' },
              { id: 'rlm', label: 'RLM' },
              { id: 'mat', label: 'Matemática' },
              { id: 'pcd', label: 'PCD/Atual.' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List Scroll */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-h-[700px] flex flex-col">
          <div className="p-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 uppercase tracking-wide flex justify-between items-center">
            <span>Matérias do Edital ({filteredTopics.length})</span>
            <span className="text-[10px] text-slate-400 font-normal">Clique para ler</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {filteredTopics.map((topic) => {
              const selected = topic.id === activeTopic?.id;
              const topicDone = completedTopicIds.includes(topic.id);

              return (
                <button
                  key={topic.id}
                  onClick={() => onSelectTopicId(topic.id)}
                  className={`w-full text-left p-3.5 transition-colors flex items-start space-x-3 ${
                    selected ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTopic(topic.id);
                      if (!topicDone) {
                        confetti({ particleCount: 30, spread: 50 });
                      }
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
                    <div className="flex items-center space-x-1.5 mb-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-slate-200 text-slate-700">
                        {topic.subjectName}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-600">{topic.bloc}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug truncate">{topic.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{topic.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Reader Content */}
      <div className="lg:col-span-8">
        {activeTopic ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-lg">
                    {activeTopic.subjectName}
                  </span>
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-lg">
                    {activeTopic.bloc}
                  </span>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold rounded">
                    Prioridade: {activeTopic.importance}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onToggleTopic(activeTopic.id);
                    if (!isDone) confetti({ particleCount: 50, spread: 60 });
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  <span>{isDone ? 'Tópico Concluído!' : 'Marcar como Lido'}</span>
                </button>
              </div>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">{activeTopic.title}</h2>
              {activeTopic.keyArticles && (
                <div className="mt-2 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
                  ⚖️ <strong>Dispositivos Legais:</strong> {activeTopic.keyArticles}
                </div>
              )}
            </div>

            {/* Vunesp Alerts / Tips */}
            {activeTopic.vunespTips && activeTopic.vunespTips.length > 0 && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wide mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Pegadinha Clássica da Banca VUNESP</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-amber-900">
                  {activeTopic.vunespTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Study Material Content */}
            <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-800 whitespace-pre-line font-sans">
              {activeTopic.fullContent}
            </div>

            {/* Questions Recorder for Metrics */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Registrar Questões deste Tópico</h4>
                  <p className="text-xs text-slate-500">
                    Acumulado: <strong>{currentMetric.questionsCorrect}</strong> acertos de <strong>{currentMetric.questionsDone}</strong> questões feitas.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-slate-500">Feitas:</span>
                    <input
                      type="number"
                      min="1"
                      value={qDoneInput}
                      onChange={(e) => setQDoneInput(Number(e.target.value))}
                      className="w-16 px-2 py-1 text-xs border border-slate-300 rounded text-center font-bold"
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-slate-500">Acertos:</span>
                    <input
                      type="number"
                      min="0"
                      max={qDoneInput}
                      value={qCorrectInput}
                      onChange={(e) => setQCorrectInput(Number(e.target.value))}
                      className="w-16 px-2 py-1 text-xs border border-slate-300 rounded text-center font-bold text-emerald-700"
                    />
                  </div>
                  <button
                    onClick={handleSaveQuestions}
                    className="px-3 py-1 bg-[#1b365d] hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>

            {/* Practice Questions if Available */}
            {activeTopic.practiceQuestions && activeTopic.practiceQuestions.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center space-x-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-extrabold text-slate-900">Questão Comentada de Fixação</h3>
                </div>

                <div className="space-y-4">
                  {activeTopic.practiceQuestions.map((q) => {
                    const selected = userAnswers[q.id];
                    const revealed = showAnswer[q.id];

                    return (
                      <div key={q.id} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                        <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-500 mb-2">
                          <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded">{q.exam}</span>
                          <span>Ano: {q.year}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-900 mb-4 leading-relaxed">{q.statement}</p>

                        <div className="space-y-2 mb-4">
                          {q.options.map((opt, oIdx) => {
                            const isUserChoice = selected === oIdx;
                            const isCorrect = q.correctIndex === oIdx;

                            let btnStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800';
                            if (revealed) {
                              if (isCorrect) {
                                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                              } else if (isUserChoice) {
                                btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectOption(q.id, oIdx)}
                                className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-start space-x-3 transition-colors ${btnStyle}`}
                              >
                                <span className="font-bold flex-shrink-0">{String.fromCharCode(65 + oIdx)})</span>
                                <span className="flex-1">{opt}</span>
                                {revealed && isCorrect && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                                {revealed && isUserChoice && !isCorrect && <X className="w-4 h-4 text-rose-500 flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {revealed && (
                          <div className="bg-blue-50/70 p-3.5 rounded-lg border border-blue-200 text-xs text-blue-900 leading-relaxed">
                            <strong>Comentário do Gabarito:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Selecione um tópico na lista ao lado para começar os estudos.</p>
          </div>
        )}
      </div>
    </div>
  );
};
