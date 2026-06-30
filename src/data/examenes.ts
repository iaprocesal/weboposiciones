import { Question } from "../types";

export const EXAM_QUESTIONS: Question[] = [
  // --- CONVOCATORIA 2023 ---
  {
    id: "q23_1",
    question: "Según el artículo 477 de la Ley Orgánica del Poder Judicial, ¿cuál de las siguientes funciones corresponde específicamente al Cuerpo de Tramitación Procesal y Administrativa?",
    options: [
      "La redacción del acta de los juicios y comparecencias, dando fe de lo transcurrido.",
      "La ordenación formal del proceso mediante la elaboración de actas de constancia.",
      "La confección de cédulas de notificación y la tramitación de los asuntos que les sean atribuidos, bajo la dirección del Gestor.",
      "La elaboración de las propuestas de resolución que deban ser sometidas a la aprobación del Juez o del Letrado de la Administración de Justicia."
    ],
    correctOptionIndex: 2,
    explanation: "El art. 477 LOPJ establece que corresponde al cuerpo de Tramitación Procesal 'la confección de cédulas de notificación' y 'la tramitación de los asuntos que les correspondan, bajo la dirección del Gestor'. El acta de los juicios (opción A) da fe pública y corresponde al Letrado de la Administración de Justicia (LAJ). La opción D corresponde a funciones del Cuerpo de Gestión (art. 476 LOPJ).",
    articleRef: "Art. 477.1.a LOPJ",
    difficulty: "Medio",
    block: "Organización",
    convocatoria: "Convocatoria 2023",
    trickType: "Confusión de Órganos"
  },
  {
    id: "q23_2",
    question: "Conforme al artículo 135 de la Ley de Enjuiciamiento Civil, si se presenta un escrito de término sujeto a plazo a través del sistema LexNET, ¿hasta qué hora del día siguiente hábil se puede presentar válidamente?",
    options: [
      "Hasta las 24:00 horas.",
      "Hasta las 15:00 horas del día siguiente hábil al del vencimiento del plazo.",
      "Hasta las 14:00 horas del día siguiente hábil al del vencimiento del plazo.",
      "Hasta la hora de apertura del juzgado de guardia (9:00 horas)."
    ],
    correctOptionIndex: 1,
    explanation: "El artículo 135.5 de la LEC establece que la presentación de escritos sujetos a plazo podrá efectuarse hasta las 15:00 horas del día hábil siguiente al del vencimiento del plazo en que deba realizarse el acto correspondientes. La trampa habitual consiste en confundir las 15:00 con las 14:00 horas o con las 24:00 horas del mismo día.",
    articleRef: "Art. 135.5 LEC",
    difficulty: "Difícil",
    block: "Procedimiento Civil",
    convocatoria: "Convocatoria 2023",
    trickType: "Plazos Trampa"
  },
  {
    id: "q23_3",
    question: "En el procedimiento penal abreviado, contra el auto de sobreseimiento dictado por el Juez de Instrucción, ¿qué recurso cabe interponer?",
    options: [
      "Únicamente recurso de apelación ante la Audiencia Provincial.",
      "Recurso de reforma y/o apelación.",
      "Recurso de queja ante el Letrado de la Administración de Justicia.",
      "Ninguno, el auto de sobreseimiento es firme."
    ],
    correctOptionIndex: 1,
    explanation: "De acuerdo con el art. 766 de la LECrim, las resoluciones del Juez de Instrucción que no estén excluidas expresamente son recurribles en reforma y apelación. El sobreseimiento no es una excepción a esta regla general.",
    articleRef: "Art. 766 LECrim",
    difficulty: "Medio",
    block: "Procedimiento Penal",
    convocatoria: "Convocatoria 2023",
    trickType: "Falsas Excepciones"
  },
  {
    id: "q23_4",
    question: "De acuerdo con la Ley 20/2011 del Registro Civil, ¿cuál es la estructura general del Registro Civil?",
    options: [
      "Se divide en cuatro secciones: Nacimientos, Matrimonios, Defunciones, y Tutelas y Representaciones Legales.",
      "Se estructura en un Registro Central, Registros Generales y Registros Consulares.",
      "Se divide en Registros de Primera Instancia, Registros de Paz y Oficina Central.",
      "Se organiza en Secciones Provinciales, Secciones de Audiencia y Secciones Consulares."
    ],
    correctOptionIndex: 1,
    explanation: "La nueva Ley de Registro Civil (Ley 20/2011) elimina las clásicas cuatro secciones de la ley anterior de 1957 (Trampa típica). Bajo la nueva ley, el Registro Civil se estructura en: Oficina Central, Oficinas Generales y Oficinas Consulares.",
    articleRef: "Art. 9 Ley 20/2011",
    difficulty: "Difícil",
    block: "Especiales",
    convocatoria: "Convocatoria 2023",
    trickType: "Cambio Legislativo / Falso Sinónimo"
  },

  // --- CONVOCATORIA 2024 ---
  {
    id: "q24_1",
    question: "En un Juicio Ordinario civil, si el demandado no comparece en el plazo establecido para contestar a la demanda, el Letrado de la Administración de Justicia declarará al demandado en:",
    options: [
      "Rebeldía procesal de oficio.",
      "Rebeldía procesal, únicamente a instancia de la parte actora.",
      "Contumacia voluntaria con archivo de las actuaciones.",
      "Suspensión provisional del procedimiento."
    ],
    correctOptionIndex: 0,
    explanation: "De conformidad con el art. 496.1 de la LEC, el Letrado de la Administración de Justicia declarará en rebeldía al demandado que no comparezca en forma en la fecha o en el plazo señalado en la citación o emplazamiento. Esta declaración se realizará DE OFICIO, sin necesidad de que la solicite el demandante.",
    articleRef: "Art. 496.1 LEC",
    difficulty: "Medio",
    block: "Procedimiento Civil",
    convocatoria: "Convocatoria 2024",
    trickType: "Falsas Excepciones"
  },
  {
    id: "q24_2",
    question: "Según el art. 250.2 de la LEC (modificado), ¿cuál es el límite cuantitativo general que determina que un asunto se deba tramitar por las normas del Juicio Verbal por razón de la cuantía?",
    options: [
      "Asuntos cuya cuantía no exceda de 6.000 euros.",
      "Asuntos cuya cuantía no exceda de 15.000 euros.",
      "Asuntos cuya cuantía no exceda de 10.000 euros.",
      "Asuntos cuya cuantía no exceda de 3.000 euros."
    ],
    correctOptionIndex: 1,
    explanation: "Tras la reforma operada por el Real Decreto-ley 6/2023 (en vigor en 2024), el límite cuantitativo del Juicio Verbal pasó de 6.000 euros a 15.000 euros. Esta es una pregunta clave muy propensa a trampas por desfase legislativo.",
    articleRef: "Art. 250.2 LEC (Reforma RDL 6/2023)",
    difficulty: "Difícil",
    block: "Procedimiento Civil",
    convocatoria: "Convocatoria 2024",
    trickType: "Cambio Legislativo / Falso Sinónimo"
  },
  {
    id: "q24_3",
    question: "¿Qué tipo de resolución judicial dicta un Juez de lo Penal para acordar la apertura de un juicio oral en el procedimiento abreviado?",
    options: [
      "Auto.",
      "Providencia.",
      "Decreto.",
      "Sentencia de trámite."
    ],
    correctOptionIndex: 0,
    explanation: "La apertura del juicio oral se acuerda mediante Auto (art. 783 LECrim). No confundir con las resoluciones dictadas por el Letrado de la Administración de Justicia (que dicta decretos o diligencias de ordenación) o providencias que ordenan materialmente el proceso.",
    articleRef: "Art. 783 LECrim",
    difficulty: "Medio",
    block: "Procedimiento Penal",
    convocatoria: "Convocatoria 2024",
    trickType: "Confusión de Órganos"
  },
  {
    id: "q24_4",
    question: "Conforme a la Ley Orgánica del Poder Judicial, ¿cuál de los siguientes órganos jurisdiccionales ostenta jurisdicción en toda España en materia penal?",
    options: [
      "El Tribunal Supremo y la Audiencia Nacional.",
      "Únicamente el Tribunal Supremo.",
      "La Sala de lo Penal del Tribunal Superior de Justicia de Madrid.",
      "El Juzgado Central de Instrucción número 1 exclusivamente."
    ],
    correctOptionIndex: 0,
    explanation: "Tanto el Tribunal Supremo (art. 53 LOPJ) como la Audiencia Nacional (art. 62 LOPJ) tienen jurisdicción en toda España. La trampa habitual es excluir a la Audiencia Nacional o afirmar que solo la tiene el Supremo.",
    articleRef: "Arts. 53 y 62 LOPJ",
    difficulty: "Fácil",
    block: "Organización",
    convocatoria: "Convocatoria 2024",
    trickType: "Falsas Excepciones"
  },

  // --- CONVOCATORIA 2025/2026 ---
  {
    id: "q25_1",
    question: "Según el art. 130 de la LEC, las actuaciones judiciales civiles deben practicarse en días y horas hábiles. ¿Cuáles son consideradas horas hábiles?",
    options: [
      "Las que van desde las 8 de la mañana a las 8 de la tarde, sin excepción.",
      "Las que van desde las 8 de la mañana a las 8 de la tarde, salvo que la ley disponga otra cosa para actuaciones concretas.",
      "Las que van desde las 8 de la mañana a las 10 de la noche para los actos de comunicación y ejecución ordinarios.",
      "Las opciones B y C son correctas conjuntamente atendiendo al tipo de actuación judicial."
    ],
    correctOptionIndex: 3,
    explanation: "El art. 130.3 LEC indica que se consideran horas hábiles las que median desde las ocho de la mañana a las ocho de la tarde. Sin embargo, para los actos de comunicación y ejecución también se consideran hábiles las horas que median desde las ocho de la mañana hasta las diez de la noche (art. 130.4 LEC). Esta es una pregunta de alta dificultad con una trampa de doble matiz.",
    articleRef: "Art. 130 LEC",
    difficulty: "Difícil",
    block: "Procedimiento Civil",
    convocatoria: "Convocatoria 2025/2026",
    trickType: "Plazos Trampa"
  },
  {
    id: "q25_2",
    question: "De acuerdo con el artículo 476 de la LOPJ, ¿a quién corresponde realizar la propuesta de resolución de los expedientes de jurisdicción voluntaria de competencia judicial, cuando estos no estén atribuidos en exclusiva al Juez?",
    options: [
      "Al Letrado de la Administración de Justicia.",
      "Al Gestor Procesal y Administrativo.",
      "Al Tramitador Procesal, supervisado por el Letrado de la Administración de Justicia.",
      "A la fiscalía de menores."
    ],
    correctOptionIndex: 1,
    explanation: "El artículo 476.1.h de la LOPJ detalla que corresponde al Cuerpo de Gestión Procesal colaborar con los órganos competentes en la tramitación, y específicamente realizar 'la propuesta de resolución de los expedientes de jurisdicción voluntaria'. Los opositores de Tramitación suelen fallar al pensar que estas propuestas corresponden en primer término al Letrado de la Administración de Justicia.",
    articleRef: "Art. 476.1.h LOPJ",
    difficulty: "Difícil",
    block: "Organización",
    convocatoria: "Convocatoria 2025/2026",
    trickType: "Confusión de Órganos"
  },
  {
    id: "q25_3",
    question: "Contra el decreto dictado por el Letrado de la Administración de Justicia que ponga fin al procedimiento o resuelva la reposición en el proceso civil, cabe interponer:",
    options: [
      "Recurso de apelación directa ante el tribunal superior.",
      "Recurso directo de revisión ante el Juez o Magistrado ponente.",
      "Recurso de queja.",
      "Recurso de reforma penal."
    ],
    correctOptionIndex: 1,
    explanation: "De acuerdo con el artículo 454 bis de la LEC, cabe recurso directo de revisión ante el Juez o Magistrado del órgano judicial contra los decretos que pongan fin al procedimiento o impidan su continuación, y aquellos en los que expresamente lo determine la ley.",
    articleRef: "Art. 454 bis LEC",
    difficulty: "Medio",
    block: "Procedimiento Civil",
    convocatoria: "Convocatoria 2025/2026",
    trickType: "Confusión de Órganos"
  }
];
