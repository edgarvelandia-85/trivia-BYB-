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

      explanation: "Una identidad visual sólida genera confianza y sirve como base para todas las acciones posteriores.",

      score: 10,

      impact: {
        branding: 20,
        manual: 10
      }
    },

    {
      id: 2,

      question: "La clínica recibe 8.000 visitas al sitio web al mes, pero menos del 2% agenda una cita. ¿Qué harías primero?",

      options: [
        "Optimizar el sitio web",
        "Cambiar el logo",
        "Abrir TikTok",
        "Comprar más publicidad"
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

      question: "La clínica tiene buena imagen, pero casi nadie la conoce en la ciudad.",

      options: [
        "Marketing en Salud",
        "Manual de Marca",
        "Diseño",
        "Plantillas"
      ],

      correct: 0,

      explanation: "La prioridad es aumentar el reconocimiento mediante una estrategia de marketing.",

      score: 10,

      impact: {
        marketing: 20,
        social: 10
      }
    },

    {
      id: 4,

      question: "Cada empleado utiliza un logo diferente en sus presentaciones.",

      options: [
        "Manual de Marca",
        "Marketing",
        "Publicidad",
        "Sitio Web"
      ],

      correct: 0,

      explanation: "El Manual de Marca garantiza coherencia en toda la comunicación.",

      score: 10,

      impact: {
        manual: 20,
        branding: 10
      }
    },

    {
      id: 5,

      question: "La clínica publica contenido constantemente, pero casi nadie interactúa.",

      options: [
        "Crear una estrategia de Redes Sociales",
        "Cambiar el edificio",
        "Imprimir folletos",
        "Modificar el uniforme"
      ],

      correct: 0,

      explanation: "Una estrategia de contenido aumenta la interacción y la comunidad.",

      score: 10,

      impact: {
        social: 20,
        marketing: 10
      }
    }

  ]
},

{
  id: 6,

  question: "Los pacientes encuentran la clínica en Google, pero el sitio tarda mucho en cargar.",

  options: [
    "Optimizar el Sitio Web",
    "Cambiar el logo",
    "Crear un video",
    "Imprimir publicidad"
  ],

  correct: 0,

  explanation: "La velocidad del sitio influye directamente en la experiencia del usuario y en la conversión.",

  score: 10,

  impact: {
    website: 20,
    marketing: 5
  }
},
  ,
{
  id: 7,

  question: "La clínica necesita que todos sus documentos corporativos tengan el mismo diseño.",

  options: [
    "Plantillas Personalizadas",
    "Redes Sociales",
    "Marketing",
    "Publicidad"
  ],

  correct: 0,

  explanation: "Las plantillas garantizan uniformidad y profesionalismo en la comunicación.",

  score: 10,

  impact: {
    templates: 20,
    branding: 10
  }
},

{
  id: 8,

  question: "El equipo comercial visita hospitales pero no logra cerrar convenios.",

  options: [
    "Estrategia Comercial",
    "Manual de Marca",
    "Diseño",
    "Sitio Web"
  ],

  correct: 0,

  explanation: "Una estrategia comercial bien definida aumenta la tasa de cierre y fortalece las relaciones comerciales.",

  score: 10,

  impact: {
    commercial: 20,
    marketing: 10
  }
},
  ,
{
  id: 9,

  question: "Los pacientes preguntan constantemente por los mismos servicios a través de redes sociales.",

  options: [
    "Crear contenido educativo",
    "Cambiar el logo",
    "Comprar computadores",
    "Imprimir folletos"
  ],

  correct: 0,

  explanation: "El contenido educativo reduce dudas frecuentes y fortalece la confianza de los pacientes.",

  score: 10,

  impact: {
    social: 20,
    marketing: 10
  }
},
  ,
{
  id: 10,

  question: "La gerencia quiere posicionar la clínica como referente regional durante el próximo año.",

  options: [
    "Integrar Branding, Marketing, Sitio Web y Estrategia Comercial",
    "Cambiar únicamente el logotipo",
    "Publicar una vez al mes en Facebook",
    "Comprar más computadores"
  ],

  correct: 0,

  explanation: "El crecimiento sostenible requiere una estrategia integral, no una acción aislada.",

  score: 10,

  impact: {
    branding: 10,
    marketing: 20,
    website: 10,
    commercial: 20
  }
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
      question: "La startup tiene una tecnología innovadora, pero los inversionistas dicen que la marca no inspira confianza.",
      options: [
        "Diseño de Marca",
        "Publicidad",
        "Redes Sociales",
        "Plantillas"
      ],
      correct: 0,
      explanation: "Una identidad de marca sólida transmite profesionalismo y credibilidad ante inversionistas.",
      score: 10,
      impact: {
        branding: 20,
        manual: 10
      }
    },

    {
      id: 2,
      question: "Los inversionistas solicitan conocer la empresa antes de la reunión. ¿Qué debería fortalecerse primero?",
      options: [
        "Sitio Web",
        "TikTok",
        "Volantes",
        "Publicidad impresa"
      ],
      correct: 0,
      explanation: "El sitio web suele ser el primer punto de contacto para inversionistas y aliados.",
      score: 10,
      impact: {
        website: 20,
        branding: 10
      }
    },

    {
      id: 3,
      question: "La empresa tiene un gran producto, pero casi nadie la conoce dentro del sector salud.",
      options: [
        "Marketing en Salud",
        "Cambiar el nombre",
        "Comprar computadores",
        "Imprimir afiches"
      ],
      correct: 0,
      explanation: "El Marketing en Salud permite posicionar la empresa frente a clientes e inversionistas.",
      score: 10,
      impact: {
        marketing: 20,
        social: 10
      }
    },

    {
      id: 4,
      question: "El equipo comercial consigue reuniones, pero casi nunca logra cerrar negocios.",
      options: [
        "Estrategia Comercial",
        "Diseño de Marca",
        "Manual de Marca",
        "Publicidad"
      ],
      correct: 0,
      explanation: "Una estrategia comercial bien estructurada mejora la conversión de oportunidades.",
      score: 10,
      impact: {
        commercial: 20,
        marketing: 10
      }
    },

    {
      id: 5,
      question: "Cada vendedor presenta la empresa con diapositivas diferentes.",
      options: [
        "Plantillas Personalizadas",
        "Sitio Web",
        "Redes Sociales",
        "Publicidad"
      ],
      correct: 0,
      explanation: "Las plantillas mantienen una imagen profesional y coherente en todas las presentaciones.",
      score: 10,
      impact: {
        templates: 20,
        branding: 10
      }
    },

    {
      id: 6,
      question: "La empresa recibe muchas visitas desde LinkedIn, pero casi nadie solicita una demostración.",
      options: [
        "Optimizar el Sitio Web",
        "Cambiar el logo",
        "Comprar publicidad",
        "Crear un eslogan"
      ],
      correct: 0,
      explanation: "Una buena conversión depende de una experiencia digital optimizada.",
      score: 10,
      impact: {
        website: 20,
        marketing: 10
      }
    },

    {
      id: 7,
      question: "Los clientes actuales están satisfechos, pero no recomiendan la solución.",
      options: [
        "Estrategia de Redes Sociales",
        "Cambiar colores",
        "Comprar computadores",
        "Imprimir folletos"
      ],
      correct: 0,
      explanation: "Una estrategia digital fortalece la comunidad y genera recomendaciones.",
      score: 10,
      impact: {
        social: 20,
        marketing: 10
      }
    },

    {
      id: 8,
      question: "La empresa creció rápidamente y cada área comunica la marca de forma diferente.",
      options: [
        "Manual de Marca",
        "Más publicidad",
        "Nuevo logotipo",
        "Campaña en radio"
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
      id: 9,
      question: "La startup quiere expandirse a tres ciudades en menos de un año.",
      options: [
        "Integrar Marketing + Comercial + Sitio Web",
        "Cambiar el logo",
        "Crear una mascota",
        "Comprar oficinas"
      ],
      correct: 0,
      explanation: "El crecimiento sostenible requiere una estrategia integral de posicionamiento y ventas.",
      score: 10,
      impact: {
        marketing: 15,
        commercial: 15,
        website: 10
      }
    },

    {
      id: 10,
      question: "La empresa quiere convertirse en referente nacional del sector HealthTech.",
      options: [
        "Combinar Branding, Marketing, Comercial y Sitio Web",
        "Solo publicar en redes",
        "Cambiar el nombre",
        "Invertir únicamente en publicidad"
      ],
      correct: 0,
      explanation: "El liderazgo de una empresa se construye integrando todos los servicios estratégicos.",
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
      question: "Los distribuidores buscan información del laboratorio y encuentran un sitio desactualizado.",
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
      question: "El laboratorio tiene buenos productos, pero pocas clínicas conocen sus beneficios.",
      options: [
        "Marketing en Salud",
        "Cambiar el logo",
        "Comprar vehículos",
        "Imprimir folletos"
      ],
      correct: 0,
      explanation: "Una estrategia de Marketing en Salud aumenta la visibilidad y la confianza del mercado.",
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
      explanation: "Las plantillas garantizan uniformidad y fortalecen la imagen corporativa.",
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
      explanation: "Una estrategia comercial bien definida mejora la conversión de oportunidades.",
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
        "Crear contenido educativo en Redes Sociales",
        "Cambiar el logo",
        "Comprar computadores",
        "Abrir otra sede"
      ],
      correct: 0,
      explanation: "El contenido educativo fortalece la confianza y reduce las dudas frecuentes.",
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
      explanation: "El Manual de Marca mantiene la coherencia en toda la organización.",
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
      explanation: "Una experiencia digital optimizada aumenta el retorno de la inversión en campañas.",
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
        "Comprar más vehículos"
      ],
      correct: 0,
      explanation: "La expansión requiere una estrategia integral que fortalezca la marca y las ventas.",
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
      explanation: "El posicionamiento nacional requiere una estrategia integral que combine branding, marketing, ventas, presencia digital y comunicación consistente.",
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

  
