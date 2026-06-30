import { Theme } from "../types";

export const TEMARIO: Theme[] = [
  {
    id: 1,
    title: "La Constitución Española de 1978",
    block: "Organización",
    laws: ["Constitución Española (CE)"],
    summary: "Estructura y contenido general de la Constitución Española de 1978. Derechos y deberes fundamentales. La protección de los derechos constitucionales. El Tribunal Constitucional.",
    keyArticles: ["Art. 14 (Igualdad)", "Art. 24 (Tutela Judicial Efectiva)", "Art. 53 (Garantías de libertades)", "Art. 117 (Poder Judicial)"]
  },
  {
    id: 2,
    title: "El Derecho de Igualdad de Género",
    block: "Organización",
    laws: ["LO 3/2007 de Igualdad", "LO 1/2004 de Medidas de Protección Integral contra la Violencia de Género"],
    summary: "Políticas de igualdad, no discriminación y medidas de prevención contra la violencia sobre la mujer en el ámbito judicial.",
    keyArticles: ["Art. 1 LO 1/2004", "Art. 14 LO 3/2007", "Art. 15 (Transversalidad)"]
  },
  {
    id: 5,
    title: "El Poder Judicial y el Consejo General del Poder Judicial",
    block: "Organización",
    laws: ["Ley Orgánica del Poder Judicial (LOPJ)"],
    summary: "Principios constitucionales de la justicia. Organización de juzgados y tribunales. Composición y funciones del CGPJ.",
    keyArticles: ["Art. 122 CE", "Art. 104 LOPJ", "Art. 560 LOPJ (Atribuciones)"]
  },
  {
    id: 8,
    title: "Los Órganos Judiciales: Juzgados y Tribunales",
    block: "Organización",
    laws: ["LOPJ", "Ley de Demarcación y de Planta Judicial"],
    summary: "Organización territorial y funcional de la Administración de Justicia en España. Competencias por órdenes jurisdiccionales (Civil, Penal, Contencioso, Social).",
    keyArticles: ["Art. 54 LOPJ (Órdenes)", "Art. 82 LOPJ (Audiencias Provinciales)", "Art. 85 LOPJ (Juzgados de Primera Instancia)"]
  },
  {
    id: 13,
    title: "El Personal al Servicio de la Administración de Justicia",
    block: "Organización",
    laws: ["LOPJ (Libro VI)"],
    summary: "Cuerpos Generales (Gestión, Tramitación y Auxilio Judicial) y Cuerpos Especiales. Funciones del cuerpo de Tramitación Procesal y Administrativa.",
    keyArticles: ["Art. 476 LOPJ (Funciones de Gestión)", "Art. 477 LOPJ (Funciones de Tramitación)", "Art. 478 LOPJ (Funciones de Auxilio)"]
  },
  {
    id: 16,
    title: "El Juicio Ordinario en la Ley de Enjuiciamiento Civil",
    block: "Procedimiento Civil",
    laws: ["Ley de Enjuiciamiento Civil (LEC)"],
    summary: "Ámbito del juicio ordinario. Demanda, contestación, reconvención. Audiencia previa al juicio: finalidades y desarrollo. Acto del juicio y sentencia.",
    keyArticles: ["Art. 249 LEC (Ámbito)", "Art. 399 LEC (Demanda)", "Art. 414 LEC (Audiencia previa)", "Art. 431 LEC (Juicio)"]
  },
  {
    id: 17,
    title: "El Juicio Verbal en la Ley de Enjuiciamiento Civil",
    block: "Procedimiento Civil",
    laws: ["LEC"],
    summary: "Ámbito del juicio verbal. Demanda sucinta y contestación escrita. La vista: desarrollo y especialidades probatorias. Sentencia.",
    keyArticles: ["Art. 250 LEC (Ámbito)", "Art. 437 LEC (Demanda verbal)", "Art. 438 LEC (Contestación)", "Art. 443 LEC (Vista)"]
  },
  {
    id: 19,
    title: "Los Recursos en el Proceso Civil",
    block: "Procedimiento Civil",
    laws: ["LEC"],
    summary: "Teoría general de los recursos. Recurso de reposición, recurso de apelación, recurso de queja. Recursos extraordinarios de casación e infracción procesal.",
    keyArticles: ["Art. 451 LEC (Reposición)", "Art. 455 LEC (Apelación)", "Art. 494 LEC (Queja)", "Art. 517 LEC (Títulos Ejecutivos)"]
  },
  {
    id: 20,
    title: "La Ejecución Forzosa y las Medidas Cautelares",
    block: "Procedimiento Civil",
    laws: ["LEC"],
    summary: "Título ejecutivo y despacho de ejecución. Oposición a la ejecución. Vías de apremio. Embargo de bienes. Medidas cautelares.",
    keyArticles: ["Art. 549 LEC (Demanda ejecutiva)", "Art. 584 LEC (Embargo)", "Art. 721 LEC (Medidas cautelares)"]
  },
  {
    id: 24,
    title: "El Proceso Penal Común y las Funciones de Tramitación",
    block: "Procedimiento Penal",
    laws: ["Ley de Enjuiciamiento Criminal (LECrim)"],
    summary: "Sistemas procesales penales. El sumario: iniciación (denuncia, querella, de oficio) y diligencias de investigación. Procesamiento y recursos.",
    keyArticles: ["Art. 259 LECrim (Denuncia)", "Art. 270 LECrim (Querella)", "Art. 299 LECrim (Sumario)"]
  },
  {
    id: 25,
    title: "El Procedimiento Abreviado y los Juicios Rápidos",
    block: "Procedimiento Penal",
    laws: ["LECrim"],
    summary: "Ámbito de aplicación. Fase de diligencias previas. Escritos de acusación y defensa. Juicio oral y sentencia. Los juicios rápidos penales.",
    keyArticles: ["Art. 757 LECrim (Ámbito Abreviado)", "Art. 779 LECrim (Resolución del Juez)", "Art. 795 LECrim (Juicios Rápidos)"]
  },
  {
    id: 28,
    title: "El Procedimiento Contencioso-Administrativo",
    block: "Especiales",
    laws: ["Ley 29/1998 reguladora de la Jurisdicción Contencioso-Administrativa (LJCA)"],
    summary: "Recurso contencioso-administrativo ordinario. Demanda, contestación, prueba y vista o conclusiones. Procedimiento abreviado.",
    keyArticles: ["Art. 45 LJCA (Iniciación)", "Art. 52 LJCA (Demanda)", "Art. 78 LJCA (Procedimiento abreviado)"]
  },
  {
    id: 30,
    title: "El Registro Civil en España",
    block: "Especiales",
    laws: ["Ley 20/2011 del Registro Civil"],
    summary: "Organización y estructura del Registro Civil. Inscripciones de nacimiento, matrimonio, defunción. Certificaciones y resoluciones registrales.",
    keyArticles: ["Art. 4 Ley 20/2011 (Hechos inscribibles)", "Art. 9 Ley 20/2011 (Estructura)", "Art. 44 (Nacimiento)"]
  }
];
