import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily to prevent crashing if key is not set
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// API endpoint for evaluating student messages using Gemini or local fallback engine
app.post("/api/evaluate-netiquette", async (req, res) => {
  const { userMessage, scenarioId } = req.body;

  if (!userMessage || typeof userMessage !== "string") {
    return res.status(400).json({ error: "El mensaje del usuario es requerido." });
  }

  const client = getGeminiClient();

  if (client) {
    try {
      const systemPrompt = `Eres 'Santi', el Cuy Explorador andino, mentor y pedagogo de netiqueta y ciudadanía digital para niños de grado 6to de educación básica (11-12 años) en la ciudad de Pasto, Nariño, Colombia.
Tu estilo de comunicación debe ser sumamente pedagógico, empático, motivador y dulce, usando sutilmente vocablos y modismos cultos del léxico nariñense/pastuso como '¡guagua!', '¡vea pues!', '¡achichay!' o 'ayayay' con respeto y cercanía.
Debes evaluar un mensaje redactado por un estudiante de sexto grado en un chat simulado.

ID del Escenario de evaluación: "${scenarioId || "general"}"
Mensaje escrito por el estudiante: "${userMessage}"

Sigue estrictamente las siguientes reglas pedagógicas:
1. Si el estudiante escribe con mayúsculas sostenidas descritas como gritos, o usa insultos, burlas duras, o incita a revelar datos privados, califícalo como INCORRECTO. Dale puntos negativos (entre -10 y -30) y 0 décimas.
2. Si el estudiante escribe de manera empática, con respeto, ofrece ayuda constructiva o protege la privacidad, califícalo como CORRECTO. Dale +50 puntos y +0.2 décimas.
3. Si el estudiante es neutral o su respuesta carece de amabilidad pero no es agresiva, califícalo como NEUTRAL. Dale 10 puntos y 0 décimas.
4. Explícale el error o felicítalo usando una linda analogía andina local (ej. pararse a gritar en el Volcán Galeras con megáfono, la brisa del Valle de Atriz, el agua clara de La Cocha, o lo escurridizo que es un cuy).
5. Limita tu explicación a un párrafo corto y amigable (máximo 120 palabras).
6. Responde estrictamente con un objeto JSON válido que contenga:
   - "isCorrect": booleano
   - "points": entero (entre -30 y 50)
   - "tenths": número (ej: 0, 0.1, 0.2)
   - "feedback": string (el mensaje directo de Santi al estudiante, en español tierno y pastuso)
   - "thought": string (tu justificación de evaluación pedagógica)`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Evalúa el mensaje del estudiante.",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isCorrect: { type: Type.BOOLEAN },
              points: { type: Type.INTEGER },
              tenths: { type: Type.NUMBER },
              feedback: { type: Type.STRING },
              thought: { type: Type.STRING },
            },
            required: ["isCorrect", "points", "tenths", "feedback", "thought"],
          },
          temperature: 0.5,
        },
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json(parsed);
      }
    } catch (err) {
      console.error("Error al llamar a Gemini API:", err);
    }
  }

  // --- LOCAL FALLBACK ENGINE (In case Gemini API Key is missing or service is offline) ---
  const normalized = userMessage.toLowerCase().trim();
  let isCorrect = true;
  let points = 50;
  let tenths = 0.2;
  let feedback = "";
  let thought = "Evaluación local heurística de netiqueta";

  const hasAllCaps = userMessage === userMessage.toUpperCase() && userMessage.length > 5;
  const containsInsult = /\b(tonto|bobo|maldito|tonta|estupido|estupida|estúpido|estúpida|idiota|bruto|bruta|malo|feo|fea|burlarse|rata|oso|no sabe|no sabes)\b/i.test(normalized);
  const revealsData = /\b(contraseña|clave|password|pass|email|correo|colegio|dame|pásame|pasa|te doy)\b/i.test(normalized);

  if (hasAllCaps) {
    isCorrect = false;
    points = -20;
    tenths = 0.0;
    feedback = "¡Ayayay, guagua! Veo que has escrito todo en MAYÚSCULAS sostenidas. Tutor Santi recuerda que escribir así en internet equivale a pararse en mitad del volcán Galeras a gritarle en la cara a tu compañero. El diálogo amigable se escribe con minúsculas.";
    thought = "Marcado incorrecto debido a uso de mayúsculas sostenidas interpretadas como gritos en el sistema educativo.";
  } else if (containsInsult) {
    isCorrect = false;
    points = -15;
    tenths = 0.0;
    feedback = "¡Achachay, mi guagua! Tus palabras contienen un tonito que hiere y desanima a tu grupo. La cortesía digital andina nos enseña a corregir con amor y soporte técnico en vez de burlas.";
    thought = "Marcado incorrecto debido a detección heurística de términos despectivos u hostiles (cybergossip).";
  } else if (revealsData && scenarioId === "seguridad" && normalized.includes("te doy") || normalized.includes("te paso") || /clave|contraseña/i.test(normalized)) {
    isCorrect = false;
    points = -30;
    tenths = 0.0;
    feedback = "¡Peligro, guagua! Un verdadero Guardián del Galeras nunca entrega las contraseñas escolares a extraños. Tu clave es el escudo personal que cuida tu senda de tramposos e impostores de internet.";
    thought = "Marcado incorrecto porque el alumno accedió a revelar datos sensibles (claves de acceso institucional).";
  } else {
    // Correct responses
    if (scenarioId === "seguridad") {
      feedback = "¡Excelente, guagua! Has defendido tu escudo de seguridad e identidad digital con verdadera valentía andina. Informar al docente de informática bloquea los trucos de estos traviesos de la red escolar. ¡Suma 50 puntos y 0.2 décimas!";
      thought = "El alumno rechazó entregar contraseñas y propuso denunciar o bloquear.";
    } else if (scenarioId === "legalidad") {
      feedback = "¡Urcutaita, qué brisita tan fresca del Valle de Atriz! Sugerir citar al fotógrafo del Galeras o buscar licencias Creative Commons demuestra una alta madurez ética e intelectual como ciudadano digital. ¡Sigue así, guagua!";
      thought = "El alumno sugirió licencias o atribución correcta de derechos de autor.";
    } else if (scenarioId === "cima") {
      feedback = "¡Magistral, mi guagua! Has coronado la cumbre del Galeras. Con este juramento de honor, te has ganado el Certificado de Súper Ciudadano Digital de Pasto. ¡Qué orgullo para tu institución y para mí!";
      thought = "El alumno completó con éxito el juramento ético final.";
    } else {
      feedback = "¡Vea pues, qué amabilidad! Respondes con la empatía de un líder constructor de paz interactiva. Tus palabras guían a tu compañero con andamiaje de respeto y solidaridad. ¡Has ganado 50 puntos de Netiqueta!";
      thought = "Satisface los criterios generales de amabilidad y cortesía digital.";
    }
  }

  return res.json({
    isCorrect,
    points,
    tenths,
    feedback,
    thought
  });
});

async function startServer() {
  // Vite integration
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
    console.log(`[Senda Digital Server] Corriendo en http://0.0.0.0:${PORT}`);
  });
}

startServer();
