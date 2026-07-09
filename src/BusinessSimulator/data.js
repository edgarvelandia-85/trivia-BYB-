export const SERVICES = [
  {
    id: "branding",
    name: "Diseño de Marca",
    icon: "🎨",
    color: "#EC4899",
  },
  {
    id: "manual",
    name: "Manual de Marca",
    icon: "📘",
    color: "#3B82F6",
  },
  {
    id: "marketing",
    name: "Marketing en Salud",
    icon: "📈",
    color: "#10B981",
  },
  {
    id: "commercial",
    name: "Estrategia Comercial",
    icon: "🎯",
    color: "#F59E0B",
  },
  {
    id: "social",
    name: "Redes Sociales",
    icon: "📱",
    color: "#8B5CF6",
  },
  {
    id: "website",
    name: "Sitio Web",
    icon: "🌐",
    color: "#06B6D4",
  },
  {
    id: "templates",
    name: "Plantillas Personalizadas",
    icon: "🧩",
    color: "#6366F1",
  },
  {
    id: "formulas",
    name: "Fórmulas Magistrales",
    icon: "🧪",
    color: "#14B8A6",
  },
];

export const COMPANIES = [
  {
    id: 1,
    icon: "🏥",
    company: "Clínica San Gabriel",
    budget: 80000000,
    objective: "Duplicar el número de pacientes durante el próximo año.",

    questions: [

      {
        id: 1,

        question:
          "La clínica tiene excelentes especialistas, pero su imagen no transmite confianza. ¿Qué debería hacerse primero?",

        options: [
          "Diseño de Marca",
          "Marketing en Salud",
          "Sitio Web",
          "Redes Sociales",
        ],

        correct: 0,

        explanation:
          "Una identidad visual sólida genera confianza y sirve como base para todas las acciones de comunicación posteriores.",

        score: 20,

        impact: {
          branding: 20,
          manual: 10,
          marketing: 5,
        },
      },

      {
        id: 2,

        question:
          "La marca ya fue creada. Ahora la clínica necesita atraer nuevos pacientes.",

        options: [
          "Marketing en Salud",
          "Cambiar el logo",
          "Manual de Marca",
          "Plantillas",
        ],

        correct: 0,

        explanation:
          "El Marketing en Salud permite atraer pacientes potenciales mediante campañas estratégicas.",

        score: 20,

        impact: {
          marketing: 20,
          social: 10,
          website: 5,
        },
      },

      {
        id: 3,

        question:
          "Los pacientes llegan por publicidad, pero abandonan la página rápidamente.",

        options: [
          "Sitio Web",
          "Redes Sociales",
          "Diseño",
          "Plantillas",
        ],

        correct: 0,

        explanation:
          "Un sitio web optimizado mejora la experiencia del usuario y aumenta las conversiones.",

        score: 20,

        impact: {
          website: 20,
          marketing: 10,
        },
      },

      {
        id: 4,

        question:
          "La clínica publica contenido sin mantener la misma identidad visual.",

        options: [
          "Manual de Marca",
          "Marketing",
          "Publicidad",
          "Sitio Web",
        ],

        correct: 0,

        explanation:
          "El Manual de Marca garantiza consistencia en todos los canales de comunicación.",

        score: 20,

        impact: {
          manual: 20,
          branding: 10,
        },
      },

      {
        id: 5,

        question:
          "Ahora la clínica necesita mantener una comunicación constante con sus pacientes.",

        options: [
          "Redes Sociales",
          "Diseño",
          "Manual",
          "Sitio Web",
        ],

        correct: 0,

        explanation:
          "Las Redes Sociales fortalecen la relación con los pacientes y aumentan la recordación.",

        score: 20,

        impact: {
          social: 20,
          marketing: 10,
        },
      },
    ],
  },

  {
    id: 2,

    icon: "🤖",

    company: "HealthTech Nova",

    budget: 120000000,

    objective:
      "Conseguir inversionistas para acelerar su crecimiento.",

    questions: [

      {
        id: 1,

        question:
          "La startup tiene una excelente tecnología, pero su marca no genera confianza.",

        options: [
          "Diseño de Marca",
          "Publicidad",
          "Redes Sociales",
          "Sitio Web",
        ],

        correct: 0,

        explanation:
          "Una startup necesita proyectar confianza desde su identidad.",

        score: 20,

        impact: {
          branding: 20,
          manual: 10,
        },
      },

      {
        id: 2,

        question:
          "Los inversionistas solicitan conocer la propuesta de valor digital.",

        options: [
          "Sitio Web",
          "Plantillas",
          "Marketing",
          "Manual",
        ],

        correct: 0,

        explanation:
          "Un sitio web profesional transmite credibilidad frente a inversionistas.",

        score: 20,

        impact: {
          website: 20,
          branding: 5,
        },
      },

      {
        id: 3,

        question:
          "La empresa necesita generar reconocimiento en el sector salud.",

        options: [
          "Marketing en Salud",
          "Diseño",
          "Manual",
          "Plantillas",
        ],

        correct: 0,

        explanation:
          "El Marketing en Salud posiciona la empresa frente a clientes e inversionistas.",

        score: 20,

        impact: {
          marketing: 20,
          social: 10,
        },
      },

      {
        id: 4,

        question:
          "El equipo comercial no logra cerrar reuniones con hospitales.",

        options: [
          "Estrategia Comercial",
          "Redes",
          "Diseño",
          "Sitio Web",
        ],

        correct: 0,

        explanation:
          "Una estrategia comercial bien estructurada mejora la conversión de oportunidades.",

        score: 20,

        impact: {
          commercial: 20,
          marketing: 10,
        },
      },

      {
        id: 5,

        question:
          "La empresa necesita presentar propuestas visualmente impactantes.",

        options: [
          "Plantillas Personalizadas",
          "Publicidad",
          "Redes",
          "Manual",
        ],

        correct: 0,

        explanation:
          "Las plantillas permiten mantener una comunicación profesional y coherente.",

        score: 20,

        impact: {
          templates: 20,
          branding: 5,
        },
      },
    ],
  },
];
