import { useState } from "react";
import { Question } from "../types";
import { EXAM_QUESTIONS } from "../data/examenes";
import { CheckCircle2, XCircle, Info, Sparkles, AlertTriangle, RefreshCw, Layers } from "lucide-react";

interface ExamenInteractiveProps {
  customQuestions?: Question[]; // Dynamically uploaded or state questions
}

export default function ExamenInteractive({ customQuestions = [] }: ExamenInteractiveProps) {
  // Config state
  const [selectedBlock, setSelectedBlock] = useState<string>("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Todos");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [source, setSource] = useState<"local" | "gemini">("local");

  // Game state
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Combine local and custom uploaded questions
  const allAvailableQuestions = [...EXAM_QUESTIONS, ...customQuestions];

  // Unique blocks and convocatorias
  const blocksList = ["Todos", "Organización", "Procedimiento Civil", "Procedimiento Penal", "Especiales"];

  // Start exam from Local Database
  const startLocalQuiz = () => {
    setError(null);
    let filtered = allAvailableQuestions;

    if (selectedBlock !== "Todos") {
      filtered = filtered.filter((q) => q.block === selectedBlock);
    }
    if (selectedDifficulty !== "Todos") {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    if (filtered.length === 0) {
      setError("No hay preguntas disponibles con los filtros elegidos en la base de datos local. Por favor, selecciona otra combinación.");
      return;
    }

    // Shuffle and slice
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, questionCount));
    setSelectedAnswers({});
    setIsSubmitted(false);
    setIsQuizActive(true);
  };

  // Start exam using Gemini AI
  const startGeminiQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/gemini/generate-custom-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          block: selectedBlock === "Todos" ? "Cualquiera (temas procesales o de organización)" : selectedBlock,
          difficulty: selectedDifficulty === "Todos" ? "Medio o Difícil (con trampas procesales)" : selectedDifficulty,
          count: questionCount
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Error al conectar con el servidor Gemini.");
      }

      const data = await response.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error("No se recibieron preguntas de la IA. Inténtalo de nuevo.");
      }

      // Ensure questions match our interface (map fallback attributes if needed)
      const sanitizedQuestions: Question[] = data.questions.map((q: any, idx: number) => ({
        ...q,
        id: q.id || `q_gem_${idx}_${Date.now()}`,
        difficulty: q.difficulty || selectedDifficulty,
        block: q.block || selectedBlock,
        convocatoria: q.convocatoria || "Simulación IA"
      }));

      setQuestions(sanitizedQuestions);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setIsQuizActive(true);
    } catch (err: any) {
      console.error(err);
      setError(
        `No se pudo generar el examen por IA. Detalle: ${err.message}. \n\nEsto suele pasar si la GEMINI_API_KEY no está configurada o se ha caído la conexión. Se ha seleccionado automáticamente el generador local para que puedas realizar tu test.`
      );
      setSource("local");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    if (source === "gemini") {
      startGeminiQuiz();
    } else {
      startLocalQuiz();
    }
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsQuizActive(false);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setQuestions([]);
  };

  // Calculate score
  const correctCount = questions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctOptionIndex ? acc + 1 : acc;
  }, 0);

  const totalAnswered = Object.keys(selectedAnswers).length;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm print:border-none print:shadow-none print:p-0">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 print:hidden">
        <div className="flex items-center gap-3">
          <Layers className="h-6 w-6 text-blue-700" />
          <h3 className="text-2xl font-bold text-slate-800">Generador de Test Interactivos</h3>
        </div>
        {isQuizActive ? (
          <button
            onClick={handleReset}
            className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Configurar otro test
          </button>
        ) : (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">Motor de IA Activo</span>
        )}
      </div>

      {!isQuizActive ? (
        <div className="space-y-6 max-w-2xl mx-auto print:hidden">
          <p className="text-base text-slate-600 leading-relaxed">
            Configura un test interactivo adaptado a tu ritmo. Puedes elegir preguntas reales de nuestra base de datos histórica o usar nuestro <strong className="text-blue-700">motor de IA (Gemini)</strong> para diseñar preguntas trampa de nivel avanzado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Block selection */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Bloque del Temario</label>
              <select
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
              >
                {blocksList.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nivel de Dificultad</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
              >
                <option value="Todos">Todos los niveles</option>
                <option value="Fácil">Fácil (Conocimiento directo)</option>
                <option value="Medio">Medio (Casos de procedimiento)</option>
                <option value="Difícil">Difícil (Con preguntas trampa)</option>
              </select>
            </div>

            {/* Questions count */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Número de Preguntas</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
              >
                <option value={5}>5 preguntas</option>
                <option value={10}>10 preguntas</option>
                <option value={15}>15 preguntas</option>
                <option value={20}>20 preguntas</option>
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Motor de Preguntas</label>
              <div className="flex bg-slate-50 p-1 border border-slate-200 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSource("local")}
                  className={`flex-1 text-center py-2.5 rounded-lg text-sm font-bold transition-all ${
                    source === "local" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Banco Histórico ({allAvailableQuestions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSource("gemini")}
                  className={`flex-1 text-center py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                    source === "gemini" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  Simulación IA
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl flex items-start gap-3 text-sm leading-relaxed whitespace-pre-line">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-4">
            <button
              onClick={handleStart}
              disabled={loading}
              className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-lg font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 duration-150"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Procesando con IA... (Esto puede tomar 10s)</span>
                </>
              ) : (
                <>
                  {source === "gemini" && <Sparkles className="h-5 w-5" />}
                  <span>Comenzar Simulación</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header of Active quiz */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 rounded-xl p-5 border border-slate-200 print:bg-white print:border-none print:p-0">
            <div>
              <h4 className="text-lg font-bold text-slate-800">
                Test en Progreso ({questions.length} preguntas)
              </h4>
              <p className="text-sm text-slate-500 font-mono mt-0.5">
                Categoría: {selectedBlock} | Dificultad: {selectedDifficulty}
              </p>
            </div>
            {isSubmitted ? (
              <div className="flex items-center gap-4">
                <div className="px-4 py-2.5 bg-slate-800 text-white rounded-xl text-center">
                  <span className="text-xl font-bold font-mono">
                    {correctCount} / {questions.length}
                  </span>
                  <span className="text-xs block opacity-80">Aciertos</span>
                </div>
                <div className="px-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl text-center font-mono font-bold text-lg">
                  {Math.round((correctCount / questions.length) * 100)}%
                </div>
              </div>
            ) : (
              <div className="text-sm font-bold text-slate-600">
                Respondidas: {totalAnswered} de {questions.length}
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl flex items-start gap-3 text-sm leading-relaxed">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Render Questions */}
          <div className="space-y-10">
            {questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctOptionIndex;
              const hasAnswered = userAnswer !== undefined;

              return (
                <div
                  key={q.id}
                  id={`test-question-card-${q.id}`}
                  className={`border border-slate-200 rounded-xl p-6 md:p-8 transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? "bg-emerald-50/40 border-emerald-100"
                        : "bg-rose-50/40 border-rose-100"
                      : "bg-white shadow-sm"
                  } print:bg-white print:border-none print:p-0 print:shadow-none`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="bg-slate-100 text-slate-700 font-bold h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-sm mt-0.5 font-mono">
                      {qIndex + 1}
                    </span>
                    <div className="space-y-4 w-full">
                      {/* Enunciado */}
                      <p className="text-[17px] font-bold text-slate-900 leading-relaxed">
                        {q.question}
                      </p>

                      {/* Metatags */}
                      <div className="flex flex-wrap gap-2 text-xs font-bold font-mono print:hidden">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                          {q.block}
                        </span>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                          Ref: {q.articleRef}
                        </span>
                        {q.trickType && (
                          <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">
                            ⚠️ {q.trickType}
                          </span>
                        )}
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                          {q.convocatoria}
                        </span>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 gap-2.5 pt-2">
                        {q.options.map((opt, optIdx) => {
                          const optionLetters = ["A", "B", "C", "D"];
                          const isUserSelected = userAnswer === optIdx;
                          const isAnswerCorrect = q.correctOptionIndex === optIdx;

                          let optionStyle = "border-slate-200 hover:bg-slate-50";
                          let badgeStyle = "bg-slate-100 text-slate-700";

                          if (isUserSelected) {
                            optionStyle = "border-blue-600 bg-blue-50/40 text-blue-950 font-semibold";
                            badgeStyle = "bg-blue-700 text-white";
                          }

                          if (isSubmitted) {
                            if (isAnswerCorrect) {
                              optionStyle = "border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold";
                              badgeStyle = "bg-emerald-500 text-white";
                            } else if (isUserSelected) {
                              optionStyle = "border-rose-400 bg-rose-50 text-rose-950 font-bold";
                              badgeStyle = "bg-rose-500 text-white";
                            } else {
                              optionStyle = "border-slate-100 opacity-60 text-slate-500";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              id={`q-${q.id}-opt-${optIdx}`}
                              disabled={isSubmitted}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left border rounded-xl px-4 py-3.5 flex items-start gap-3 transition-all text-base leading-relaxed ${optionStyle}`}
                            >
                              <span className={`font-bold font-mono text-sm h-6 w-6 rounded-md flex items-center justify-center shrink-0 ${badgeStyle}`}>
                                {optionLetters[optIdx]}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation (Only after submission) */}
                      {isSubmitted && (
                        <div className="mt-4 p-5 bg-white border border-slate-200 rounded-xl space-y-3.5 shadow-sm print:bg-white print:border-slate-200 print:shadow-none">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <Info className="h-4 w-4 text-slate-600" />
                            <span>Fundamento Jurídico & Análisis de Trampa</span>
                          </div>
                          <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                            {q.explanation}
                          </p>
                          <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-bold font-mono">
                            <div className="text-slate-700">
                              Artículos vinculados: <span className="bg-slate-50 text-slate-800 px-2 py-0.5 rounded border border-slate-100">{q.articleRef}</span>
                            </div>
                            {q.trickType && (
                              <div className="text-amber-800">
                                Patrón: <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-100">{q.trickType}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submission and Reset Controls */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3 print:hidden">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={totalAnswered < questions.length}
                className="w-full sm:w-auto px-8 py-4 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:hover:bg-blue-700 text-white rounded-xl font-bold tracking-wide shadow-md transition-all text-base"
              >
                {totalAnswered < questions.length
                  ? `Responde todas para corregir (${totalAnswered}/${questions.length})`
                  : "Finalizar y Corregir Examen"}
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold tracking-wide shadow-md transition-all text-base"
              >
                Generar otro examen
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
