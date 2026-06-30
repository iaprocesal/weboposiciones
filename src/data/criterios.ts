export interface Criterio {
  category: string;
  title: string;
  description: string;
  knowledgeRequired: string;
  difficultyRating: "Alta" | "Media" | "Baja";
  solutionStrategy: string;
}

export const CRITERIOS_GENERALES: Criterio[] = [
  {
    category: "Cómputo de Plazos (Art. 133 LEC y Art. 185 LOPJ)",
    title: "Plazos Procesales de Días, Meses y Años",
    description: "Distinción entre plazos procesales (días hábiles, excluyendo sábados, domingos y festivos) y plazos administrativos o sustantivos civiles (computados de fecha a fecha, donde los inhábiles sí cuentan para el cómputo pero se trasladan si finalizan en inhábil).",
    knowledgeRequired: "Cómputo exacto. Saber cuándo comienza (el día siguiente al acto de notificación) y cuándo expira (a las 15:00 del día siguiente al vencimiento - día de gracia). Exclusiones de períodos vacacionales como agosto (salvo actuaciones urgentes de instrucción criminal).",
    difficultyRating: "Alta",
    solutionStrategy: "Escribir una línea de tiempo para cada caso. Identificar primero si el plazo es civil, administrativo o penal de instrucción (donde todos los días y horas son hábiles, Art. 184 LOPJ). Aplicar sistemáticamente la regla del día siguiente hábil."
  },
  {
    category: "Atribuciones de Órganos y Competencia",
    title: "Distribución de Funciones en la Oficina Judicial",
    description: "Saber deslindar inequívocamente qué firma el Letrado de la Administración de Justicia (LAJ), qué firma el Juez o Magistrado, y qué redacta o confecciona el Tramitador Procesal.",
    knowledgeRequired: "Decretos y Diligencias (LAJ) vs. Sentencias, Autos y Providencias (Juez). Funciones auxiliares de tramitación del art. 477 LOPJ (confección de cédulas, registro de escritos, apoyo en actas).",
    difficultyRating: "Alta",
    solutionStrategy: "Memorizar la 'Regla de las Resoluciones': Si ordena el impulso material del proceso, es Diligencia de Ordenación (LAJ); si decide el pleito de fondo, es Sentencia (Juez); si resuelve admisiones o recursos importantes, es Auto (Juez); si decide aspectos organizativos menores del pleito o tasación de costas, es Decreto (LAJ)."
  },
  {
    category: "Actos de Comunicación",
    title: "Notificaciones, Requerimientos, Citaciones y Emplazamientos",
    description: "La forma en que el órgano judicial se comunica con las partes y terceros. Es la tarea diaria principal de un Tramitador Procesal.",
    knowledgeRequired: "Artículo 149 a 168 de la LEC. Cuándo procede la notificación personal, la notificación por LexNET, el auxilio judicial (exhortos), y la publicación en tablón o Boletín Oficial (edictos) como último recurso.",
    difficultyRating: "Media",
    solutionStrategy: "Esquematizar el flujograma de notificación. Si falla la notificación telemática o personal ordinaria, se procede a la averiguación domiciliaria. Si no se halla domicilio, se acude al edicto en el Tablón Judicial Único. Nunca saltarse pasos."
  },
  {
    category: "Especialidades Penales",
    title: "El Sumario Ordinario frente al Procedimiento Abreviado",
    description: "Conocer las fases procesales de cada tipo de juicio penal. El sumario civilizado tradicional tiene una tramitación lenta, el abreviado es ágil y centrado en diligencias previas.",
    knowledgeRequired: "Arts. 299 y ss. (Sumario) y 757 y ss. (Abreviado) de la LECrim. Saber qué juzgado instruye y qué juzgado enjuicia en cada caso (Juez de Instrucción vs. Juez de lo Penal o Audiencia Provincial).",
    difficultyRating: "Alta",
    solutionStrategy: "Utilizar el criterio de la pena. Si la pena privativa de libertad supera los 9 años, se tramita por Sumario Ordinario (enjuicia Audiencia Provincial). Si no excede de 9 años, va por Procedimiento Abreviado. Si es hasta 5 años, enjuicia el Juez de lo Penal; si es de 5 a 9 años, enjuicia la Audiencia Provincial."
  }
];
