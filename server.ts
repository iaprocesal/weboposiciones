import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initializer for Gemini client to prevent crash on startup if key is missing
let aiClient: any = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY no configurada. Por favor, añádela en la sección de secretos de AI Studio.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Analizar nueva convocatoria (pasting exam text)
app.post("/api/gemini/analyze-exam", async (req: express.Request, res: express.Response) => {
  try {
    const { text, title, year } = req.body;
    if (!text) {
      res.status(400).json({ error: "Falta el texto del examen para analizar." });
      return;
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analiza el siguiente texto de un examen de la oposición de Tramitación Procesal y Administrativa de España. 
Extrae un listado de preguntas de opción múltiple con 4 opciones cada una. Identifica la opción correcta (0-indexed), aporta una explicación jurídica rigurosa citando la ley y el artículo, clasifica la dificultad (Fácil, Medio o Difícil), el bloque del temario (Organización, Procedimiento Civil, Procedimiento Penal, Especiales) y el tipo de trampa empleado si lo detectas (por ejemplo: "Confusión de Órganos", "Plazos Trampa", "Falsas Excepciones", "Cambio Legislativo").

Nombre de convocatoria asignado: "${title || "Nueva Convocatoria"} (${year || "Actual"})"

Texto del examen:
${text.substring(0, 15000)}`,
      config: {
        systemInstruction: "Eres un magistrado experto en oposiciones de los Cuerpos al Servicio de la Administración de Justicia de España. Devuelves únicamente un array JSON estructurado con las preguntas encontradas en el texto.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "Listado de preguntas extraídas del examen",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "ID único autogenerado (ej: q_new_1)" },
              question: { type: Type.STRING, description: "El enunciado completo de la pregunta de examen" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array de exactamente 4 opciones de respuesta"
              },
              correctOptionIndex: { type: Type.INTEGER, description: "Índice de la respuesta correcta (0 a 3)" },
              explanation: { type: Type.STRING, description: "Explicación detallada del porqué es correcta y el truco o trampa que contiene" },
              articleRef: { type: Type.STRING, description: "Artículo y ley de referencia de la respuesta (ej: Art. 477 LOPJ o Art. 135 LEC)" },
              difficulty: { type: Type.STRING, description: "Fácil, Medio o Difícil" },
              block: { type: Type.STRING, description: "Organización, Procedimiento Civil, Procedimiento Penal o Especiales" },
              convocatoria: { type: Type.STRING, description: "Nombre de la convocatoria asignada" },
              trickType: { type: Type.STRING, description: "Tipo de trampa identificada en la pregunta" }
            },
            required: ["id", "question", "options", "correctOptionIndex", "explanation", "articleRef", "difficulty", "block", "convocatoria"]
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "[]");
    res.json({ questions: parsedData });
  } catch (error: any) {
    console.error("Error analyzing exam with Gemini:", error);
    res.status(500).json({ error: error.message || "Error interno del servidor al procesar con Gemini." });
  }
});

// 2. API: Analizar artículo susceptible de trampa
app.post("/api/gemini/analyze-article", async (req: express.Request, res: express.Response) => {
  try {
    const { articleText } = req.body;
    if (!articleText) {
      res.status(400).json({ error: "Falta el texto o número de artículo para analizar." });
      return;
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Analiza el siguiente artículo de la legislación procesal española (LOPJ, LEC, LECrim, etc.):
"${articleText}"

Extrae:
1. El título del artículo.
2. La razón de su susceptibilidad para generar preguntas trampa en oposiciones de Tramitación Procesal.
3. Tres ideas concretas de cómo un tribunal opositor puede elaborar una pregunta trampa con este artículo.
4. Dos preguntas trampa de prueba basadas en este artículo, con 4 opciones cada una, indicando la opción correcta y explicaciones detalladas.`,
      config: {
        systemInstruction: "Eres un preparador de élite de oposiciones judiciales españolas. Devuelves un objeto JSON estructurado con el análisis completo.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Título o identificador del artículo analizado" },
            susceptibilityReason: { type: Type.STRING, description: "Por qué este artículo es peligroso o propicio para trampas (plazos, competencias, excepciones)" },
            trickIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Estrategias de trampas que se pueden armar con este artículo"
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctOptionIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  articleRef: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  block: { type: Type.STRING },
                  convocatoria: { type: Type.STRING },
                  trickType: { type: Type.STRING }
                },
                required: ["id", "question", "options", "correctOptionIndex", "explanation", "articleRef", "difficulty", "block", "convocatoria"]
              }
            }
          },
          required: ["title", "susceptibilityReason", "trickIdeas", "questions"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error analyzing article with Gemini:", error);
    res.status(500).json({ error: error.message || "Error al analizar el artículo." });
  }
});

// 3. API: Generar test interactivo por IA
app.post("/api/gemini/generate-custom-quiz", async (req: express.Request, res: express.Response) => {
  try {
    const { block, difficulty, count } = req.body;
    const countNum = parseInt(count) || 5;

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Genera exactamente ${countNum} preguntas de examen tipo test para la oposición de Tramitación Procesal y Administrativa de España.
Bloque del temario solicitado: "${block || "Todos"}"
Dificultad de las preguntas: "${difficulty || "Medio"}" (Si es Difícil, asegúrate de incorporar trampas procesales refinadas de plazos, de recursos, o competencias de órgano).

Las preguntas deben ser realistas, con base estricta en la LOPJ, LEC, LECrim, o LJCA, siguiendo el estilo real del Ministerio de Justicia.`,
      config: {
        systemInstruction: "Eres un preparador y examinador del tribunal de oposiciones de la Administración de Justicia en España. Devuelves únicamente un array JSON estructurado de preguntas.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctOptionIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              articleRef: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              block: { type: Type.STRING },
              convocatoria: { type: Type.STRING },
              trickType: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctOptionIndex", "explanation", "articleRef", "difficulty", "block", "convocatoria"]
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "[]");
    res.json({ questions: parsedData });
  } catch (error: any) {
    console.error("Error generating custom quiz with Gemini:", error);
    res.status(500).json({ error: error.message || "Error al generar las preguntas del examen." });
  }
});

// Setup Vite Dev Server / Static Files Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[iaProcesal] Servidor en ejecución en http://localhost:${PORT}`);
  });
}

startServer();
