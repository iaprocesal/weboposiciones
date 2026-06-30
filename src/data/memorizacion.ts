import { MemoryTechnique } from "../types";

export const TECNICAS_MEMORIZACION: MemoryTechnique[] = [
  {
    id: "tech_1",
    name: "El Sistema Herigón (Memorización de Plazos Numéricos)",
    description: "Asocia cada número (del 0 al 9) con una consonante para formar palabras con los plazos de la ley. Es infalible para memorizar artículos y plazos exactos de días.",
    example: "Para recordar que el plazo para interponer recurso de apelación civil es de '20 días' (Art. 455 LEC): El número 20 se desglosa en N (2) y D/T (0). Puedes formar la palabra 'Nido' o 'Nota'. Imagina un 'Nido' de expedientes apelados sobre la mesa del Juez.",
    steps: [
      "Asigna consonantes a números: 1=T/D, 2=N, 3=M, 4=C/Q, 5=L, 6=S/Z, 7=F, 8=G/J, 9=P/B, 0=R.",
      "Convierte el plazo o artículo en una palabra clave.",
      "Asocia visualmente esa palabra con el objeto o acción procesal en tu mente."
    ]
  },
  {
    id: "tech_2",
    name: "El Palacio de la Memoria Judicial (Loci)",
    description: "Asocia los pasos de un procedimiento judicial a habitaciones físicas de tu casa o de un edificio que conozcas muy bien (como un tribunal que hayas visitado).",
    example: "El Juicio Verbal (Art. 437 LEC): En la puerta de tu casa está la 'Demanda Sucinta' (cuelga de la cerradura). Al entrar al recibidor, ves al demandado escribiendo la 'Contestación' (10 días hábilmente sentado). En el pasillo, un gran cartel te convoca a la 'Vista' (citación en 5 días). En la cocina, se celebra el juicio y el grifo gotea la 'Sentencia' final (10 días para dictar).",
    steps: [
      "Elige un trayecto familiar con paradas fijas (mínimo 5 estancias).",
      "Asigna un hito procesal a cada estancia en orden cronológico.",
      "Visualiza la escena con humor, exageración o dramatismo para afianzar la memoria a largo plazo."
    ]
  },
  {
    id: "tech_3",
    name: "Reglas Mnemotécnicas de Siglas Judiciales",
    description: "Crea frases divertidas o siglas fáciles de recordar para agrupar resoluciones, funciones u órganos que se prestan a confusión constante en las preguntas de opción múltiple.",
    example: "Las resoluciones del Juez: S.A.P. (Sentencia, Auto, Providencia). 'El Juez bebe la SAPa'. Las resoluciones del Letrado de la A.J.: D.D. (Diligencia de ordenación, Decreto). 'El Letrado da Dos Dedos'. Esto evita mezclar Decretos con Autos de manera automática.",
    steps: [
      "Identifica el grupo de elementos que sueles confundir en los test.",
      "Toma la inicial de cada término.",
      "Crea una frase surrealista donde el sujeto realice una acción que refleje el concepto real de la ley."
    ]
  },
  {
    id: "tech_4",
    name: "Repetición Espaciada Activa (Tablas de Repaso)",
    description: "Agenda los repasos con intervalos crecientes de tiempo. Es el único método científicamente probado que previene la curva del olvido de leyes extremadamente áridas.",
    example: "Estudias el bloque de recursos de la LEC hoy. Debes repasarlo a las 24 horas, a los 7 días, a los 15 días, y finalmente a los 30 días para consolidarlo en tu memoria permanente.",
    steps: [
      "Registra la fecha del primer estudio de un tema procesal.",
      "Calcula las fechas de repaso (D+1, D+7, D+15, D+30).",
      "Durante el repaso, realiza un test rápido o un autodiagrama mental sin mirar los apuntes, en lugar de una lectura pasiva."
    ]
  }
];
