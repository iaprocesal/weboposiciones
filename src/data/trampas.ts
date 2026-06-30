import { TrickPattern, ArticleAnalysis } from "../types";

export const PATRONES_TRAMPA: TrickPattern[] = [
  {
    id: "pat_1",
    name: "La Confusión de Órgano Resolutor (Juez vs. Letrado de la A.J.)",
    description: "Sustituyen sistemáticamente al órgano decisor real de una resolución por otro cuerpo judicial, aprovechando que el opositor estudia de memoria las acciones procesales pero no quién las rubrica.",
    exampleQuestion: "Contra el decreto dictado por el Letrado de la Administración de Justicia que decida sobre la admisión de prueba, ¿cabe recurso de reposición?",
    exampleSolution: "Incorrecto, la admisión de prueba la dicta el Juez mediante Auto o Providencia, por lo que nunca existirá un 'decreto' del LAJ que decida sobre la admisibilidad de pruebas en sí.",
    howToDetect: "Busca palabras clave asociadas a resoluciones: 'Decreto' y 'Diligencia de Ordenación' siempre corresponden al Letrado de la A.J. (LAJ); 'Sentencia', 'Auto' y 'Providencia' siempre corresponden al Juez o Tribunal. Compara la acción con el tipo de documento.",
    lawsAffected: ["LEC (Art. 206)", "LOPJ (Art. 245)"]
  },
  {
    id: "pat_2",
    name: "La Inversión del Cómputo de Plazos (Hábiles vs. Naturales / De Gracia)",
    description: "Intercambian las palabras 'días hábiles' por 'días naturales' o 'días corridos', o recortan o añaden un día al cómputo (e.g., decir que el plazo expira el mismo día del término a las 15:00, en lugar del día hábil siguiente).",
    exampleQuestion: "Los escritos sujetos a plazo podrán presentarse hasta las 14:00 horas del día siguiente hábil al del vencimiento del plazo.",
    exampleSolution: "Falso. La hora de gracia es hasta las 15:00 horas, no las 14:00.",
    howToDetect: "Examina con lupa: 1) Si se indica 'naturales' o 'hábiles'. En civil todo plazo es de días hábiles. En penal, la fase de instrucción cuenta todos los días como hábiles. 2) La hora exacta. El art. 135.5 LEC especifica las 15:00 horas.",
    lawsAffected: ["LEC (Art. 135)", "LOPJ (Art. 185)"]
  },
  {
    id: "pat_3",
    name: "La Tridimensionalidad de Excepciones ('Salvo que...')",
    description: "Se toma un artículo de regla general que tiene excepciones, y se formula la pregunta declarando la regla general como absoluta (e.g. usando 'en todo caso', 'siempre'), o se enuncia la excepción omitiendo su condición indispensable.",
    exampleQuestion: "El auxilio judicial se solicitará siempre que deba practicarse una actuación fuera de la circunscripción del tribunal.",
    exampleSolution: "Incorrecto. No se solicitará si es posible la práctica mediante videoconferencia (Art. 169 LEC, excepción tecnológica).",
    howToDetect: "Extrema las alertas ante términos absolutos: 'siempre', 'nunca', 'en todo caso', 'obligatoriamente', 'únicamente'. Casi toda regla procesal tiene una excepción redactada en la ley.",
    lawsAffected: ["LEC (Art. 169)", "LECrim (Art. 731 bis)"]
  },
  {
    id: "pat_4",
    name: "El Desfase Legislativo Activo",
    description: "Los examinadores adoran preguntar sobre artículos reformados recientemente (menos de 2 años), colocando la opción obsoleta (que el opositor recuerda de temarios antiguos) como una de las opciones trampa más atractivas.",
    exampleQuestion: "Se tramitarán por Juicio Verbal las demandas civiles cuya cuantía no exceda de 6.000 euros.",
    exampleSolution: "Falso. El límite histórico de 6.000 euros se reformó a 15.000 euros en el RDL 6/2023.",
    howToDetect: "Mantén una tabla activa de reformas de la LEC y LOPJ. Cuando veas cifras o plazos que solían ser estándar, recuerda siempre si han sido afectados por decretos o leyes de simplificación digital recientes.",
    lawsAffected: ["LEC (Art. 250 - Reforma 2023)", "Reglamento Registro Civil 2011 (Implantación definitiva)"]
  }
];

export const ANALISIS_ARTICULOS: ArticleAnalysis[] = [
  {
    article: "Art. 135 LEC",
    title: "Presentación de escritos por medios telemáticos",
    text: "La presentación de escritos y documentos, cuando se realice por medios telemáticos, podrá efectuarse todos los días del año durante las veinticuatro horas... Si el escrito estuviera sujeto a plazo, se podrá presentar hasta las 15:00 horas del día hábil siguiente al vencimiento.",
    usedInExams: ["Examen Tramitación 2023 (Pregunta 14)", "Examen Gestión 2024"],
    susceptibilityReason: "Contiene una hora exacta de corte ('15:00 horas') y define qué ocurre en caso de fallos técnicos en LexNET, lo que permite elaborar trampas sobre prórrogas de plazos.",
    trickIdeas: [
      "Indicar que el plazo se extiende hasta las 24:00 del día hábil siguiente.",
      "Sustituir '15:00 horas del día hábil siguiente' por '15:00 horas del día siguiente' (omitiendo hábil).",
      "Decir que siLexnet se cae por 1 hora, se suspenden todos los plazos del territorio de forma indefinida."
    ]
  },
  {
    article: "Art. 477 LOPJ",
    title: "Funciones del Cuerpo de Tramitación Procesal",
    text: "Corresponde con carácter general al Cuerpo de Tramitación Procesal y Administrativa la realización de actividades de apoyo a la gestión procesal, la confección de documentos, cédulas, registro de escritos y la tramitación de expedientes bajo la supervisión del Gestor.",
    usedInExams: ["Examen Tramitación 2023 (Pregunta 3)", "Examen Auxilio 2024"],
    susceptibilityReason: "Es la ley orgánica que define el trabajo por el que opositas. Es de memorización obligatoria y fácil de mezclar con las funciones del Gestor (Art. 476) o del Auxilio Judicial (Art. 478).",
    trickIdeas: [
      "Atribuir la 'redacción de actas que requieran fe pública' al tramitador (le corresponde exclusivamente al LAJ).",
      "Atribuir la 'ordenación material del proceso' al tramitador (le corresponde al Gestor o LAJ)."
    ]
  },
  {
    article: "Art. 161 LEC",
    title: "Entrega de la copia de la resolución o cédula en domicilio",
    text: "Si el destinatario no fuera hallado en su domicilio, la entrega se podrá hacer a cualquier empleado, familiar o persona mayor de catorce años que se encuentre en él, o al conserje de la finca... requiriéndole para que la entregue al destinatario.",
    usedInExams: ["Ninguno reciente en Tramitación - ¡ALTA SUSCEPTIBILIDAD!"],
    susceptibilityReason: "Contiene un límite de edad muy preciso: 'mayor de catorce años' (14 años). La tentación del examinador es cambiarlo por 'mayor de edad' o 'mayor de dieciséis años' (16).",
    trickIdeas: [
      "Modificar el texto a 'cualquier persona mayor de edad' que se halle en el domicilio.",
      "Afirmar que si se entrega a un familiar de 15 años la notificación es nula de pleno derecho."
    ]
  },
  {
    article: "Art. 438 LEC",
    title: "Reconvención en el Juicio Verbal",
    text: "En ningún caso se admitirá reconvención en los juicios verbales que deban finalizar por sentencia sin efectos de cosa juzgada. En los demás juicios verbales, se admitirá reconvención siempre que se proponga en la contestación a la demanda y no determine la incompetencia del tribunal...",
    usedInExams: ["Gestión Procesal 2023 - ¡Muy probable en Tramitación!"],
    susceptibilityReason: "Prohíbe de manera absoluta ('En ningún caso') la reconvención para juicios sin efectos de cosa juzgada (como desahucios o sumarios de tutela sumaria). Combina prohibición absoluta con condiciones de admisibilidad.",
    trickIdeas: [
      "Sostener que la reconvención se admite en absolutamente todos los juicios verbales de cuantía inferior a 15.000€.",
      "Afirmar que la reconvención se presenta en escrito independiente tres días después de contestar a la demanda."
    ]
  }
];
