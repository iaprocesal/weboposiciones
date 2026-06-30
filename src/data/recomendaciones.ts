import { Recommendation } from "../types";

export const RECOMENDACIONES: Recommendation[] = [
  {
    id: "rec_1",
    title: "El Cuaderno de Errores Activo (Tu recurso de oro)",
    phase: "Fase de Test / Simulacros",
    tip: "Anota cada pregunta fallada indicando el artículo exacto, la trampa utilizada por el tribunal y tu análisis de por qué caíste en ella.",
    actionItem: "Antes de cada nuevo test, lee las últimas 10 anotaciones de tu cuaderno. El cerebro tiende a repetir el mismo patrón de error si no se hace consciente de él."
  },
  {
    id: "rec_2",
    title: "Estudio Fraccionado de Plazos por Órdenes Jurisdiccionales",
    phase: "Fase de Estudio de Temas",
    tip: "No mezcles plazos civiles con plazos penales en la misma sesión de estudio. Los plazos penales de instrucción son de días y horas corridos (naturales), mientras que los civiles operan rigurosamente con días hábiles.",
    actionItem: "Elabora dos cartulinas de colores distintos: Azul para Civil (LEC), Rojo para Penal (LECrim). Colócalas en paredes opuestas de tu zona de estudio para crear memoria espacial asociativa."
  },
  {
    id: "rec_3",
    title: "La Técnica del 'Filtro de Trampas' al Leer Enunciados",
    phase: "Fase de Examen",
    tip: "En el examen real de Tramitación, lee la pregunta marcando con un bolígrafo rojo o lápiz los sujetos ('Juez', 'LAJ', 'Gestor') y los términos de exclusión ('siempre', 'salvo', 'exclusivamente').",
    actionItem: "Si ves la palabra 'siempre' o 'Letrado de la Administración de Justicia', detente un segundo y pregúntate: ¿Existe alguna excepción en este artículo? ¿Este acto realmente requiere fe pública o firma judicial?"
  },
  {
    id: "rec_4",
    title: "Simulación de Impresión y Lectura Física",
    phase: "Fase Final de Repaso",
    tip: "Dado que el examen real es físico, repasar en pantallas disminuye un 15% la tasa de detección de pequeños errores ortográficos o semánticos introducidos como trampas.",
    actionItem: "Utiliza el botón de imprimir de esta web para generar copias en PDF, imprímelas en papel y realiza los simulacros con cronómetro físico y bolígrafo."
  }
];
