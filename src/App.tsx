import { useState, useEffect, FormEvent } from "react";
import { Question } from "./types";
import { TEMARIO } from "./data/temario";
import { CRITERIOS_GENERALES } from "./data/criterios";
import { PATRONES_TRAMPA, ANALISIS_ARTICULOS } from "./data/trampas";
import { RECOMENDACIONES } from "./data/recomendaciones";
import { TECNICAS_MEMORIZACION } from "./data/memorizacion";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ExamenInteractive from "./components/ExamenInteractive";
import ConvocatoriaSelector from "./components/ConvocatoriaSelector";

import { 
  Compass, 
  BookOpen, 
  FileText, 
  ShieldAlert, 
  Bookmark, 
  BrainCircuit, 
  Sparkles, 
  CheckSquare,
  Search,
  Upload,
  ChevronRight,
  Info,
  Scale,
  Sparkle,
  RefreshCw
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedConvocatorias, setSelectedConvocatorias] = useState<string[]>([
    "Convocatoria 2023",
    "Convocatoria 2024",
    "Convocatoria 2025/2026",
  ]);

  // Persist custom parsed questions in localStorage
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("iaprocesal_custom_questions");
    if (saved) {
      try {
        setCustomQuestions(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved custom questions:", e);
      }
    }
  }, []);

  const saveCustomQuestions = (newQuestions: Question[]) => {
    setCustomQuestions(newQuestions);
    localStorage.setItem("iaprocesal_custom_questions", JSON.stringify(newQuestions));
  };

  // State for search in Temario
  const [temarioSearch, setTemarioSearch] = useState<string>("");

  // State for AI Convocatoria Uploader
  const [rawExamText, setRawExamText] = useState<string>("");
  const [uploaderTitle, setUploaderTitle] = useState<string>("");
  const [uploaderYear, setUploaderYear] = useState<string>("2026");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // State for AI Article Analyser
  const [articleInput, setArticleInput] = useState<string>("");
  const [analyzedArticleResult, setAnalyzedArticleResult] = useState<any | null>(null);
  const [articleLoading, setArticleLoading] = useState<boolean>(false);
  const [articleError, setArticleError] = useState<string | null>(null);

  // Combine static and custom uploaded questions
  const allQuestions = [
    ...customQuestions
  ];

  // 1. API: Process raw exam text with Gemini
  const handleUploadExam = async (e: FormEvent) => {
    e.preventDefault();
    if (!rawExamText.trim()) {
      setUploadError("Por favor, introduce el texto de las preguntas de la convocatoria.");
      return;
    }

    setUploadLoading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const res = await fetch("/api/gemini/analyze-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: rawExamText,
          title: uploaderTitle || "Convocatoria Extraordinaria",
          year: uploaderYear
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al procesar el examen.");
      }

      const data = await res.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error("No se han podido extraer preguntas válidas del texto provisto.");
      }

      // Add questions to custom storage
      const newQuestionsList = [...customQuestions, ...data.questions];
      saveCustomQuestions(newQuestionsList);

      setUploadSuccess(`¡Éxito! Se han extraído, estructurado y analizado ${data.questions.length} preguntas adicionales mediante IA. Ya están incorporadas a la base de datos.`);
      setRawExamText("");
      setUploaderTitle("");
    } catch (err: any) {
      setUploadError(err.message || "Error al procesar el examen con la IA.");
    } finally {
      setUploadLoading(false);
    }
  };

  // 2. API: Process custom article analysis
  const handleAnalyzeArticle = async () => {
    if (!articleInput.trim()) {
      setArticleError("Por favor, introduce el número o texto del artículo.");
      return;
    }

    setArticleLoading(true);
    setArticleError(null);
    setAnalyzedArticleResult(null);

    try {
      const res = await fetch("/api/gemini/analyze-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleText: articleInput })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al analizar el artículo.");
      }

      const data = await res.json();
      setAnalyzedArticleResult(data);
    } catch (err: any) {
      setArticleError(err.message || "Error de red o clave de API de Gemini no configurada.");
    } finally {
      setArticleLoading(false);
    }
  };

  // Print trigger
  const triggerPrint = () => {
    window.print();
  };

  // Filtering themes
  const filteredThemes = TEMARIO.filter(t => 
    t.title.toLowerCase().includes(temarioSearch.toLowerCase()) ||
    t.summary.toLowerCase().includes(temarioSearch.toLowerCase()) ||
    t.laws.some(law => law.toLowerCase().includes(temarioSearch.toLowerCase())) ||
    t.keyArticles.some(art => art.toLowerCase().includes(temarioSearch.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Printable Title Header */}
      <Header onPrint={triggerPrint} />

      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Pane */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden min-h-[calc(100vh-80px)]" id="main-content-pane">
          {/* Printable only Header (hidden in screen) */}
          <div className="hidden print:block mb-8 pb-4 border-b-2 border-slate-950">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 font-sans">
                  iaProcesal - Dossier de Estudio
                </h1>
                <p className="text-sm text-slate-600 font-mono mt-1">
                  Preparación de Oposiciones para Tramitación Procesal y Administrativa
                </p>
              </div>
              <div className="text-right text-xs font-mono text-slate-500">
                <span>Fecha de impresión: {new Date().toLocaleDateString("es-ES")}</span>
              </div>
            </div>
          </div>

          {/* PAGE 1: ÍNDICE DE CONTENIDOS */}
          {activeTab === 1 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-indice">
              <div className="space-y-3">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">
                  Bienvenido a la Plataforma
                </span>
                <h2 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-slate-900 leading-none">
                  Índice de Contenidos del Programa
                </h2>
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-4xl">
                  Esta guía integral interactiva desglosa las mayores dificultades cognitivas, de plazos y trampas procesales del examen de Tramitación Procesal. Haz clic en cualquier módulo para navegar directamente.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {/* Card 1: Temario */}
                <button
                  onClick={() => setActiveTab(2)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-72 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="bg-blue-50 text-blue-750 p-3.5 rounded-xl w-fit">
                    <BookOpen className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                      2. Temario y Leyes Clave
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Syllabus estructurado con desglose de la LOPJ, LEC, LECrim y Registro Civil. Filtra por artículo y localiza los temas más recurrentes.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-1 mt-4">
                    Explorar temas <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                {/* Card 2: Exámenes */}
                <button
                  onClick={() => setActiveTab(3)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-72 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="bg-blue-50 text-blue-750 p-3.5 rounded-xl w-fit">
                    <FileText className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                      3. Convocatorias y Simulador
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Histórico desde 2023. Sube nuevas convocatorias de exámenes para que la IA las analice y las sume a tu gestor interactivo.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-1 mt-4">
                    Ir al simulador <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                {/* Card 3: Criterios */}
                <button
                  onClick={() => setActiveTab(4)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-72 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="bg-blue-50 text-blue-750 p-3.5 rounded-xl w-fit">
                    <CheckSquare className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                      4. Criterios de Oposición
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Exigencias de conocimientos del Ministerio, dificultades procedimentales graves y distribución de competencias de planta.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-1 mt-4">
                    Ver criterios <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                {/* Card 4: Patrones de Trampas */}
                <button
                  onClick={() => setActiveTab(5)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-72 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="bg-blue-50 text-blue-750 p-3.5 rounded-xl w-fit">
                    <ShieldAlert className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                      5. Patrones de Trampas
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      El método utilizado por los tribunales para engañar con las alternativas. Aprende a descifrar la inversión de excepciones procesales.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-1 mt-4">
                    Ver patrones <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                {/* Card 5: Susceptibilidad */}
                <button
                  onClick={() => setActiveTab(6)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-72 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="bg-blue-50 text-blue-750 p-3.5 rounded-xl w-fit">
                    <Bookmark className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                      6. Artículos Peligrosos
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Análisis de leyes y artículos propensos a trampas. Pega cualquier artículo legal para que la IA lo deconstruya en tiempo real.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-1 mt-4">
                    Analizar artículos <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                {/* Card 6: Recomendaciones */}
                <button
                  onClick={() => setActiveTab(7)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-72 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="bg-blue-50 text-blue-750 p-3.5 rounded-xl w-fit">
                    <Sparkles className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                      7. Recomendaciones de Estudio
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Estrategias metodológicas para aislar el error, crear cartulinas procesales temáticas y abordar el día del examen real en papel.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-1 mt-4">
                    Recomendaciones <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>

                {/* Card 7: Técnicas */}
                <button
                  onClick={() => setActiveTab(8)}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-6 md:p-8 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-72 group relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  <div className="bg-blue-50 text-blue-750 p-3.5 rounded-xl w-fit">
                    <BrainCircuit className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                      8. Técnicas de Memorización
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Loci judicial, el Sistema Herigón para plazos numéricos rígidos y repetición espaciada aplicada a códigos legislativos áridos.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-700 font-mono flex items-center gap-1 mt-4">
                    Ver técnicas <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>

              {/* Printable Book notice */}
              <div className="bg-slate-900 text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-10 shadow-lg print:hidden">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold">¿Listo para el estudio sin pantallas?</h4>
                  <p className="text-slate-300 text-sm max-w-xl">
                    Este curso interactivo está estructurado bajo pautas editoriales estrictas. Haz clic en el botón de impresión superior para descargar el dossier completo formateado para libros o carpetas de estudio.
                  </p>
                </div>
                <button
                  onClick={triggerPrint}
                  className="px-6 py-3 bg-white text-slate-950 font-bold rounded-lg text-sm shadow hover:bg-slate-100 transition duration-150"
                >
                  Generar PDF Corporativo
                </button>
              </div>
            </div>
          )}

          {/* PAGE 2: TEMARIO OPOSICIÓN */}
          {activeTab === 2 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-temario">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Syllabus Oficial
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Temario de Tramitación Procesal
                </h2>
                <p className="text-lg text-slate-500 max-w-4xl">
                  Estructura temática del programa oficial del Ministerio de Justicia. Filtra para buscar las leyes, artículos recomendados y bloques correspondientes.
                </p>
              </div>

              {/* Search filter */}
              <div className="relative max-w-md print:hidden">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar tema, ley, artículo o concept..."
                  value={temarioSearch}
                  onChange={(e) => setTemarioSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 pt-2">
                {filteredThemes.map((theme) => (
                  <div
                    key={theme.id}
                    id={`theme-card-${theme.id}`}
                    className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4 print:border-slate-300 print:shadow-none print:p-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md print:bg-slate-100">
                          Tema {theme.id}
                        </span>
                        <span className="text-xs font-bold font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          Bloque {theme.block}
                        </span>
                      </div>
                      <div className="text-xs font-bold font-mono text-slate-400">
                        {theme.laws.join(", ")}
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2.5xl font-extrabold text-slate-900">
                      {theme.title}
                    </h3>

                    <p className="text-slate-600 text-[17px] leading-relaxed">
                      {theme.summary}
                    </p>

                    <div className="pt-4 border-t border-slate-50 flex flex-wrap gap-4 items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Artículos Clave para Examen:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {theme.keyArticles.map((art) => (
                          <span
                            key={art}
                            className="bg-slate-50 border border-slate-150 text-slate-700 text-xs font-bold font-mono px-3 py-1 rounded-lg"
                          >
                            {art}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredThemes.length === 0 && (
                  <p className="text-slate-500 text-center py-12">
                    No se han encontrado temas que coincidan con la búsqueda.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* PAGE 3: CONVOCATORIAS Y EXÁMENES (ACTUALIZANDOSE) */}
          {activeTab === 3 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-examenes">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Base de Datos Viva y Simulador
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Histórico de Convocatorias y Simulador
                </h2>
                <p className="text-lg text-slate-500 max-w-4xl">
                  Selecciona y contrasta convocatorias reales. Utiliza el cargador de IA inferior para absorber inmediatamente los exámenes que se publiquen en el futuro.
                </p>
              </div>

              {/* Multi Convocatoria Filter & Aggregated Analytics (Requirement 4) */}
              <ConvocatoriaSelector
                questions={customQuestions}
                selectedConvocatorias={selectedConvocatorias}
                onChange={setSelectedConvocatorias}
              />

              {/* Collapsible New Exam Pasting Area (Updates system automatically) */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-5 shadow-sm print:hidden">
                <details className="group">
                  <summary className="list-none flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 text-blue-700 p-2.5 rounded-xl">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">
                          Cargar Nueva Convocatoria con IA
                        </h4>
                        <p className="text-xs text-slate-500">
                          Sube o pega exámenes nuevos para extraer preguntas y agregarlas a tu base de datos permanente.
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>

                  <form onSubmit={handleUploadExam} className="mt-6 space-y-4 pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">Nombre de la Convocatoria</label>
                        <input
                          type="text"
                          placeholder="Ej: Convocatoria 2026 - Turno Libre"
                          value={uploaderTitle}
                          onChange={(e) => setUploaderTitle(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">Año</label>
                        <input
                          type="text"
                          placeholder="Ej: 2026"
                          value={uploaderYear}
                          onChange={(e) => setUploaderYear(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-mono">Texto del Examen / Preguntas</label>
                      <textarea
                        rows={6}
                        placeholder="Pega aquí el texto extraído del PDF oficial del examen (Preguntas, opciones y fundamentos si se tienen)..."
                        value={rawExamText}
                        onChange={(e) => setRawExamText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        required
                      ></textarea>
                    </div>

                    {uploadError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs">
                        {uploadError}
                      </div>
                    )}

                    {uploadSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs">
                        {uploadSuccess}
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={uploadLoading}
                        className="px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl text-sm font-bold tracking-wider transition flex items-center gap-2 shadow"
                      >
                        {uploadLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Analizando con IA... (Espera por favor)</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            <span>Absorber con IA</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </details>
              </div>

              {/* Dynamic Interactive Quiz Generator Engine */}
              <ExamenInteractive customQuestions={allQuestions} />
            </div>
          )}

          {/* PAGE 4: CRITERIOS GENERALES Y DIFICULTADES */}
          {activeTab === 4 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-criterios">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Guía Metodológica de Competencia
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Criterios de Conocimientos y Dificultades
                </h2>
                <p className="text-lg text-slate-500 max-w-4xl">
                  Requisitos normativos que el opositor debe dominar. Mapeamos las mayores dificultades técnicas para dotarte de una respuesta instantánea.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {CRITERIOS_GENERALES.map((crit, index) => (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-4 shadow-sm flex flex-col justify-between print:border-slate-300 print:shadow-none print:p-0"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono text-slate-400">
                          {crit.category}
                        </span>
                        <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-md ${
                          crit.difficultyRating === "Alta"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          Dificultad: {crit.difficultyRating}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        {crit.title}
                      </h3>

                      <p className="text-slate-600 text-base leading-relaxed">
                        {crit.description}
                      </p>

                      <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-100 space-y-1">
                        <strong className="text-slate-800 font-sans block">Conocimientos Técnicos Exigidos:</strong>
                        <span>{crit.knowledgeRequired}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50/50 rounded-xl text-sm text-blue-950 border border-blue-100/40 space-y-1.5 mt-4">
                      <strong className="text-blue-950 font-sans block flex items-center gap-1.5">
                        <Scale className="h-4 w-4 text-blue-700" />
                        Estrategia de Resolución:
                      </strong>
                      <span>{crit.solutionStrategy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 5: ANÁLISIS DE TRAMPAS Y PATRONES */}
          {activeTab === 5 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-patrones">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Sistemática de Oposición
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Patrones de Elaboración de Trampas
                </h2>
                <p className="text-lg text-slate-500 max-w-4xl">
                  Deconstruimos los vicios y patrones lógicos con los que el tribunal examinador diseña las alternativas erróneas para forzar el fallo de los aspirantes.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-2">
                {PATRONES_TRAMPA.map((pat, idx) => (
                  <div
                    key={pat.id}
                    id={`pattern-card-${pat.id}`}
                    className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-5 shadow-sm print:border-slate-300 print:shadow-none print:p-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-50 pb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="bg-slate-900 text-white font-mono text-sm h-7 w-7 rounded-full flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {pat.name}
                      </h3>
                      <div className="flex gap-2">
                        {pat.lawsAffected.map((law) => (
                          <span
                            key={law}
                            className="text-xs font-bold font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded"
                          >
                            {law}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-600 text-lg leading-relaxed">
                      {pat.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      <div className="p-5 bg-rose-50/40 border border-rose-100 rounded-2xl space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 font-mono">
                          Ejemplo de Pregunta Trampa
                        </span>
                        <p className="text-slate-800 font-sans italic text-base">
                          &ldquo;{pat.exampleQuestion}&rdquo;
                        </p>
                        <p className="text-rose-900 font-semibold text-sm pt-2">
                          ❌ {pat.exampleSolution}
                        </p>
                      </div>

                      <div className="p-5 bg-emerald-50/40 border border-emerald-100 rounded-2xl space-y-2 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                            Filtro de Detección & Resolución
                          </span>
                          <p className="text-slate-800 text-base leading-relaxed pt-1">
                            {pat.howToDetect}
                          </p>
                        </div>
                        <span className="text-xs text-emerald-800 font-mono font-bold mt-3">
                          ✓ Aplicable a todo pleito civil y penal
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 6: RELACIÓN DE ARTÍCULOS Y DETECTOR DE TRAMPAS CON IA */}
          {activeTab === 6 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-articulos">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Auditoría de Leyes
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Relación de Artículos Susceptibles
                </h2>
                <p className="text-lg text-slate-500 max-w-4xl">
                  Artículos clásicos de la LOPJ, LEC y LECrim que son minas de oro para el tribunal, cruzados con el detector analítico de IA para deconstruir nuevos artículos legales.
                </p>
              </div>

              {/* Curated list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {ANALISIS_ARTICULOS.map((art, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-4 shadow-sm flex flex-col justify-between print:border-slate-300 print:shadow-none print:p-0"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-slate-900 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-md">
                          {art.article}
                        </span>
                        <span className="text-[11px] font-bold font-mono text-slate-400">
                          {art.usedInExams.join(", ") || "No utilizado - Susceptibilidad extrema"}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        {art.title}
                      </h3>

                      <p className="text-slate-500 text-sm italic bg-slate-50/50 p-3 rounded-lg border border-slate-100 font-sans">
                        &ldquo;{art.text}&rdquo;
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <h4 className="text-sm font-bold text-slate-700">¿Por qué es susceptible de trampa?</h4>
                        <p className="text-slate-600 text-[14px] leading-relaxed">
                          {art.susceptibilityReason}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-50">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 font-mono mb-2">
                        Posibles trampas a formular:
                      </h4>
                      <ul className="space-y-1 text-slate-600 text-[14px] leading-relaxed">
                        {art.trickIdeas.map((idea, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom IA Article Analyzer Widget (Interactive Innovation) */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm mt-8 print:hidden">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="bg-slate-900 text-white p-2.5 rounded-xl">
                    <Sparkle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Detector de Trampas de Artículos con IA</h3>
                    <p className="text-xs text-slate-500">Pega un artículo legal y la IA desvelará cómo formularán la pregunta trampa en el examen real.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-mono">Artículo Legislativo</label>
                    <textarea
                      rows={3}
                      placeholder="Ej: Art. 136 LEC. Transcurrido el plazo o pasado el término señalado para la realización de un acto procesal de parte..."
                      value={articleInput}
                      onChange={(e) => setArticleInput(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                    ></textarea>
                  </div>

                  {articleError && (
                    <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs">
                      {articleError}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleAnalyzeArticle}
                      disabled={articleLoading}
                      className="px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl text-sm font-bold tracking-wider transition flex items-center gap-2 shadow"
                    >
                      {articleLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Analizando artículo...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Auditar con IA</span>
                        </>
                      )}
                    </button>
                  </div>

                  {analyzedArticleResult && (
                    <div className="mt-6 p-6 bg-blue-50/30 border border-blue-100 rounded-xl space-y-4 animate-fade-in">
                      <div>
                        <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                          Artículo Auditado por IA
                        </span>
                        <h4 className="text-xl font-bold text-slate-900 mt-2">
                          {analyzedArticleResult.title}
                        </h4>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-500 uppercase font-mono">Susceptibilidad y Riesgo</span>
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                          {analyzedArticleResult.susceptibilityReason}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase font-mono">Fórmulas de Trampa Extraídas</span>
                        <ul className="space-y-1.5">
                          {analyzedArticleResult.trickIdeas.map((idea: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                              <span className="text-blue-500 font-bold shrink-0">•</span>
                              <span>{idea}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Render Mock Question generated */}
                      {analyzedArticleResult.questions && analyzedArticleResult.questions.length > 0 && (
                        <div className="pt-4 border-t border-blue-100 space-y-4">
                          <span className="text-xs font-bold text-blue-700 uppercase font-mono block">Pregunta de Entrenamiento Simulada por IA</span>
                          <div className="bg-white border border-blue-100 rounded-xl p-5 space-y-3">
                            <p className="font-bold text-slate-900 text-sm leading-relaxed">
                              {analyzedArticleResult.questions[0].question}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {analyzedArticleResult.questions[0].options.map((opt: string, i: number) => (
                                <div key={i} className={`p-2 rounded border border-slate-100 font-sans ${i === analyzedArticleResult.questions[0].correctOptionIndex ? "bg-emerald-50 border-emerald-200 text-emerald-950 font-bold" : "text-slate-500"}`}>
                                  {["A", "B", "C", "D"][i]}) {opt}
                                </div>
                              ))}
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-50 pt-2 font-sans whitespace-pre-line">
                              <strong className="text-slate-800">Fundamento:</strong> {analyzedArticleResult.questions[0].explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 7: RECOMENDACIONES DE ESTUDIO */}
          {activeTab === 7 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-recomendaciones">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Estrategia de Éxito
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Recomendaciones y Metodología de Estudio
                </h2>
                <p className="text-lg text-slate-500 max-w-4xl">
                  Acciones recomendadas por opositores aprobados de rango de excelencia para mitigar el agotamiento mental y optimizar la precisión de retención de las leyes procesales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {RECOMENDACIONES.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-4 shadow-sm flex flex-col justify-between print:border-slate-300 print:shadow-none print:p-0"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md print:bg-slate-100">
                          {rec.phase}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        {rec.title}
                      </h3>

                      <p className="text-slate-600 text-base leading-relaxed">
                        {rec.tip}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl text-sm text-slate-700 space-y-1 mt-4">
                      <strong className="text-slate-900 font-sans block">Acción Inmediata:</strong>
                      <span>{rec.actionItem}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGE 8: TÉCNICAS DE MEMORIZACION */}
          {activeTab === 8 && (
            <div className="space-y-8 animate-fade-in print:block" id="page-memorizacion">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest font-mono">
                  Ciencia Cognitiva
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Técnicas de Memorización y Mnemotecnias
                </h2>
                <p className="text-lg text-slate-500 max-w-4xl">
                  La legislación judicial española contiene miles de plazos y competencias numéricas. Utiliza estas metodologías cognitivas probadas para fijar la legislación de forma indeleble.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-2">
                {TECNICAS_MEMORIZACION.map((tech) => (
                  <div
                    key={tech.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-5 shadow-sm print:border-slate-300 print:shadow-none print:p-0"
                  >
                    <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
                      <div className="bg-slate-50 text-slate-900 p-2.5 rounded-xl">
                        <BrainCircuit className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                        {tech.name}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-[17px] leading-relaxed">
                      {tech.description}
                    </p>

                    <div className="p-4 bg-blue-50/50 border border-blue-100/40 rounded-xl text-slate-800 text-sm italic">
                      <strong className="text-blue-950 font-sans not-italic block mb-1">Ejemplo Práctico de Ley:</strong>
                      &ldquo;{tech.example}&rdquo;
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Pasos para Implementar:
                      </span>
                      <ol className="list-decimal pl-5 space-y-1 text-slate-600 text-base">
                        {tech.steps.map((step, index) => (
                          <li key={index} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
