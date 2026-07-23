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
  objective: "Duplicar el número de pacientes en un año.",

  questions: [

    {
      id: 1,
      question: "La clínica tiene excelentes especialistas, pero su imagen no transmite confianza. ¿Qué debería hacerse primero?",
      options: [
        "Diseño de Marca",
        "Marketing en Salud",
        "Sitio Web",
        "Redes Sociales"
      ],
      correct: 0,
      explanation: "Una identidad visual sólida transmite confianza y fortalece el posicionamiento.",
      score: 10,
      impact: {
        branding: 20,
        manual: 10
      }
    },

    {
      id: 2,
      question: "La clínica recibe muchas visitas en su página web, pero pocos pacientes solicitan citas.",
      options: [
        "Optimizar el Sitio Web",
        "Cambiar el logo",
        "Abrir TikTok",
        "Comprar publicidad"
      ],
      correct: 0,
      explanation: "Antes de invertir más dinero es necesario mejorar la conversión del sitio web.",
      score: 10,
      impact: {
        website: 20,
        marketing: 10
      }
    },

    {
      id: 3,
      question: "La clínica tiene buena reputación, pero muy pocas personas conocen sus servicios.",
      options: [
        "Marketing en Salud",
        "Manual de Marca",
        "Plantillas",
        "Diseño"
      ],
      correct: 0,
      explanation: "El marketing permite aumentar el reconocimiento y atraer nuevos pacientes.",
      score: 10,
      impact: {
        marketing: 20,
        social: 10
      }
    },

    {
      id: 4,
      question: "Cada colaborador utiliza un logotipo diferente en sus documentos.",
      options: [
        "Manual de Marca",
        "Publicidad",
        "Sitio Web",
        "Marketing"
      ],
      correct: 0,
      explanation: "El Manual de Marca garantiza coherencia en toda la organización.",
      score: 10,
      impact: {
        manual: 20,
        branding: 10
      }
    },

    {
      id: 5,
      question: "La clínica publica contenido constantemente pero obtiene muy poca interacción.",
      options: [
        "Estrategia de Redes Sociales",
        "Cambiar el uniforme",
        "Comprar computadores",
        "Imprimir folletos"
      ],
      correct: 0,
      explanation: "Una estrategia de contenido mejora el alcance y el compromiso de la comunidad.",
      score: 10,
      impact: {
        social: 20,
        marketing: 10
      }
    },

    {
      id: 6,
      question: "El sitio web tarda demasiado en cargar desde dispositivos móviles.",
      options: [
        "Optimizar el Sitio Web",
        "Cambiar el logotipo",
        "Abrir Instagram",
        "Comprar publicidad"
      ],
      correct: 0,
      explanation: "La velocidad del sitio impacta directamente la experiencia del usuario.",
      score: 10,
      impact: {
        website: 20,
        marketing: 5
      }
    },

    {
      id: 7,
      question: "Todos los documentos institucionales tienen diseños diferentes.",
      options: [
        "Plantillas Personalizadas",
        "Redes Sociales",
        "Publicidad",
        "Diseño Web"
      ],
      correct: 0,
      explanation: "Las plantillas unifican la comunicación institucional.",
      score: 10,
      impact: {
        templates: 20,
        branding: 10
      }
    },

    {
      id: 8,
      question: "El equipo comercial consigue reuniones, pero no logra cerrar convenios.",
      options: [
        "Estrategia Comercial",
        "Manual de Marca",
        "Diseño",
        "Redes Sociales"
      ],
      correct: 0,
      explanation: "Una estrategia comercial mejora la conversión de oportunidades.",
      score: 10,
      impact: {
        commercial: 20,
        marketing: 10
      }
    },

    {
      id: 9,
      question: "Los pacientes realizan siempre las mismas preguntas en redes sociales.",
      options: [
        "Crear contenido educativo",
        "Cambiar el logo",
        "Comprar computadores",
        "Imprimir folletos"
      ],
      correct: 0,
      explanation: "El contenido educativo mejora la confianza y reduce dudas frecuentes.",
      score: 10,
      impact: {
        social: 20,
        marketing: 10
      }
    },

    {
      id: 10,
      question: "La gerencia quiere posicionar la clínica como líder regional durante el próximo año.",
      options: [
        "Integrar Branding, Marketing, Comercial y Sitio Web",
        "Cambiar únicamente el logotipo",
        "Publicar una vez al mes",
        "Comprar equipos"
      ],
      correct: 0,
      explanation: "El crecimiento sostenible requiere integrar todos los servicios estratégicos.",
      score: 10,
      impact: {
        branding: 10,
        marketing: 20,
        website: 10,
        commercial: 20
      }
    }

  ]
},

{
  id: 2,
  icon: "🤖",
  company: "HealthTech Nova",
  budget: 120000000,
  objective: "Conseguir inversión y expandirse a nivel nacional.",

  questions: [

    {
      id: 1,
      question: "La startup tiene una tecnología innovadora, pero los inversionistas consideran que la marca no transmite confianza.",
      options: [
        "Diseño de Marca",
        "Publicidad",
        "Redes Sociales",
        "Plantillas"
      ],
      correct: 0,
      explanation: "Una identidad de marca sólida aumenta la credibilidad frente a inversionistas.",
      score: 10,
      impact: {
        branding: 20,
        manual: 10
      }
    },

    {
      id: 2,
      question: "Antes de una reunión de inversión, los socios revisarán la presencia digital de la empresa.",
      options: [
        "Optimizar el Sitio Web",
        "Crear TikTok",
        "Imprimir folletos",
        "Cambiar el nombre"
      ],
      correct: 0,
      explanation: "El sitio web suele ser la primera impresión para inversionistas.",
      score: 10,
      impact: {
        website: 20,
        branding: 10
      }
    },

    {
      id: 3,
      question: "La solución tecnológica es excelente, pero muy pocos hospitales conocen la empresa.",
      options: [
        "Marketing en Salud",
        "Comprar computadores",
        "Cambiar colores",
        "Publicidad impresa"
      ],
      correct: 0,
      explanation: "Una estrategia de marketing aumenta el reconocimiento de marca.",
      score: 10,
      impact: {
        marketing: 20,
        social: 10
      }
    },

    {
      id: 4,
      question: "El equipo comercial consigue reuniones, pero pocas terminan en contratos.",
      options: [
        "Estrategia Comercial",
        "Manual de Marca",
        "Diseño de Marca",
        "Redes Sociales"
      ],
      correct: 0,
      explanation: "Una estrategia comercial mejora el proceso de ventas.",
      score: 10,
      impact: {
        commercial: 20,
        marketing: 10
      }
    },

    {
      id: 5,
      question: "Cada asesor utiliza una presentación diferente para vender la solución.",
      options: [
        "Plantillas Personalizadas",
        "Publicidad",
        "Sitio Web",
        "TikTok"
      ],
      correct: 0,
      explanation: "Las plantillas garantizan coherencia en todas las presentaciones.",
      score: 10,
      impact: {
        templates: 20,
        branding: 10
      }
    },

    {
      id: 6,
      question: "Muchos usuarios visitan la página principal, pero pocos solicitan una demostración.",
      options: [
        "Optimizar el Sitio Web",
        "Cambiar el logo",
        "Abrir Instagram",
        "Comprar publicidad"
      ],
      correct: 0,
      explanation: "La conversión depende de una buena experiencia digital.",
      score: 10,
      impact: {
        website: 20,
        marketing: 10
      }
    },

    {
      id: 7,
      question: "Los clientes están satisfechos, pero casi nadie recomienda la plataforma.",
      options: [
        "Fortalecer Redes Sociales",
        "Cambiar el logo",
        "Comprar oficinas",
        "Imprimir folletos"
      ],
      correct: 0,
      explanation: "Las redes ayudan a crear comunidad y aumentar las recomendaciones.",
      score: 10,
      impact: {
        social: 20,
        marketing: 10
      }
    },

    {
      id: 8,
      question: "Cada área utiliza versiones diferentes del logotipo y los colores corporativos.",
      options: [
        "Manual de Marca",
        "Nueva campaña",
        "Publicidad",
        "Diseño Web"
      ],
      correct: 0,
      explanation: "El Manual de Marca garantiza coherencia institucional.",
      score: 10,
      impact: {
        manual: 20,
        branding: 10
      }
    },

    {
      id: 9,
      question: "La empresa quiere expandirse a tres ciudades durante el próximo año.",
      options: [
        "Integrar Marketing + Comercial + Sitio Web",
        "Cambiar el nombre",
        "Crear una mascota",
        "Comprar oficinas"
      ],
      correct: 0,
      explanation: "El crecimiento requiere una estrategia integral.",
      score: 10,
      impact: {
        marketing: 15,
        commercial: 15,
        website: 10
      }
    },

    {
      id: 10,
      question: "La meta es convertirse en la startup HealthTech más reconocida del país.",
      options: [
        "Integrar Branding, Marketing, Comercial y Sitio Web",
        "Solo invertir en publicidad",
        "Cambiar el logo",
        "Publicar una vez al mes"
      ],
      correct: 0,
      explanation: "El liderazgo se logra integrando todas las estrategias de crecimiento.",
      score: 10,
      impact: {
        branding: 10,
        marketing: 20,
        commercial: 20,
        website: 10
      }
    }

  ]
},

{
  id: 3,
  icon: "💊",
  company: "Laboratorio BioPlus",
  budget: 150000000,
  objective: "Posicionar una nueva línea de productos farmacéuticos en el mercado nacional.",

  questions: [

    {
      id: 1,
      question: "El laboratorio lanzará una nueva línea de productos, pero la marca es poco reconocida.",
      options: [
        "Diseño de Marca",
        "Publicidad impresa",
        "Comprar equipos",
        "Redes Sociales"
      ],
      correct: 0,
      explanation: "Una marca sólida genera confianza antes del lanzamiento de nuevos productos.",
      score: 10,
      impact: {
        branding: 20,
        manual: 10
      }
    },

    {
      id: 2,
      question: "Los distribuidores buscan información del laboratorio y encuentran un sitio web desactualizado.",
      options: [
        "Actualizar el Sitio Web",
        "Cambiar el nombre",
        "Imprimir catálogos",
        "Abrir TikTok"
      ],
      correct: 0,
      explanation: "El sitio web es la principal carta de presentación para aliados comerciales.",
      score: 10,
      impact: {
        website: 20,
        marketing: 10
      }
    },

    {
      id: 3,
      question: "El laboratorio tiene excelentes productos, pero pocas clínicas conocen sus beneficios.",
      options: [
        "Marketing en Salud",
        "Cambiar el logo",
        "Comprar vehículos",
        "Imprimir folletos"
      ],
      correct: 0,
      explanation: "El Marketing en Salud aumenta el reconocimiento y genera confianza.",
      score: 10,
      impact: {
        marketing: 20,
        social: 10
      }
    },

    {
      id: 4,
      question: "Cada vendedor presenta la empresa con materiales completamente diferentes.",
      options: [
        "Plantillas Personalizadas",
        "Publicidad",
        "Redes Sociales",
        "Sitio Web"
      ],
      correct: 0,
      explanation: "Las plantillas mantienen una comunicación uniforme.",
      score: 10,
      impact: {
        templates: 20,
        branding: 10
      }
    },

    {
      id: 5,
      question: "El equipo comercial visita hospitales, pero la tasa de cierre es muy baja.",
      options: [
        "Estrategia Comercial",
        "Diseño de Marca",
        "Cambiar el uniforme",
        "Publicidad"
      ],
      correct: 0,
      explanation: "Una estrategia comercial mejora la conversión de oportunidades.",
      score: 10,
      impact: {
        commercial: 20,
        marketing: 10
      }
    },

    {
      id: 6,
      question: "Los clientes hacen siempre las mismas preguntas sobre los productos.",
      options: [
        "Crear contenido educativo",
        "Cambiar el logo",
        "Comprar computadores",
        "Abrir otra sede"
      ],
      correct: 0,
      explanation: "El contenido educativo fortalece la confianza y reduce dudas frecuentes.",
      score: 10,
      impact: {
        social: 20,
        marketing: 10
      }
    },

    {
      id: 7,
      question: "Cada área utiliza colores y logotipos diferentes en sus documentos.",
      options: [
        "Manual de Marca",
        "Publicidad",
        "Redes Sociales",
        "Sitio Web"
      ],
      correct: 0,
      explanation: "El Manual de Marca garantiza consistencia en toda la organización.",
      score: 10,
      impact: {
        manual: 20,
        branding: 10
      }
    },

    {
      id: 8,
      question: "El laboratorio invertirá en publicidad, pero primero quiere asegurar una buena experiencia digital.",
      options: [
        "Optimizar el Sitio Web",
        "Cambiar el nombre",
        "Comprar más publicidad",
        "Abrir otra oficina"
      ],
      correct: 0,
      explanation: "Una buena experiencia digital mejora el retorno de cualquier campaña.",
      score: 10,
      impact: {
        website: 20,
        marketing: 10
      }
    },

    {
      id: 9,
      question: "La empresa busca expandirse a otros países durante los próximos dos años.",
      options: [
        "Integrar Branding, Marketing y Estrategia Comercial",
        "Cambiar el logotipo",
        "Solo publicar en Facebook",
        "Comprar vehículos"
      ],
      correct: 0,
      explanation: "La expansión requiere una estrategia integral.",
      score: 10,
      impact: {
        branding: 10,
        marketing: 15,
        commercial: 20
      }
    },

    {
      id: 10,
      question: "La gerencia quiere convertir a BioPlus en uno de los laboratorios más reconocidos del país.",
      options: [
        "Implementar una estrategia integral con todos los servicios BYB",
        "Cambiar únicamente el logotipo",
        "Publicar solo en redes sociales",
        "Invertir únicamente en publicidad"
      ],
      correct: 0,
      explanation: "El posicionamiento nacional requiere integrar branding, marketing, estrategia comercial y presencia digital.",
      score: 10,
      impact: {
        branding: 10,
        manual: 10,
        marketing: 20,
        commercial: 20,
        social: 10,
        website: 20,
        templates: 10
      }
    }

  ]
}

];
