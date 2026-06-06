import { UserProfile, Badge, LessonNode, QuizScenario, LeaderboardEntry } from "./types";

export const initialUserProfile: UserProfile = {
  name: "Juanito Pérez",
  grade: "Estudiante de 6to Grado",
  city: "Pasto, Colombia",
  points: 1250,
  tenths: 4.5,
  level: 5,
  levelName: "Guardián del Galeras",
  progressPercentage: 85,
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjbcmsFwd38XkwEXFGKTvhY214nrPYERGfZiA_EIKFA_3NcZec8OvgGNnBN5uApmSPR1BQs1fCAGnqHEjxNWg3jbUNnmM9fqZzolfgGc_bNHKKhU2rSXDNVpgZ1gHgx8NX0mBpfuPwcZUf_wGWSNvht7phaSO1M4YYScqPnHq7X-ZsY_DSDineoXlQyABSs-9jIOPIa4-haGE-lQQkDuFuIdzrb0JbEfKyPGRFFBUmweDzVP61c0IBBwn47AvHCzdSGBk6GkIfSg"
};

export const initialBadges: Badge[] = [
  {
    id: "guardian_digital",
    title: "Guardian Digital",
    subtitle: "Chat Amigable",
    icon: "Heart",
    category: "Amabilidad",
    status: "unlocked",
    borderCol: "border-brand-coral",
    bgCol: "bg-brand-coral/15",
    iconCol: "text-brand-coral"
  },
  {
    id: "guardian_galeras",
    title: "Guardián del Galeras",
    subtitle: "Líder de Grupo",
    icon: "Flame",
    category: "Liderazgo",
    status: "unlocked",
    borderCol: "border-brand-purple",
    bgCol: "bg-brand-purple/15",
    iconCol: "text-brand-purple"
  },
  {
    id: "escudo_privado",
    title: "Escudo Privado",
    subtitle: "Seguridad On",
    icon: "ShieldCheck",
    category: "Seguridad",
    status: "unlocked",
    borderCol: "border-brand-mauve",
    bgCol: "bg-brand-mauve/15",
    iconCol: "text-brand-mauve"
  },
  {
    id: "senda_secreta",
    title: "Senda Secreta",
    subtitle: "Por Desbloquear",
    icon: "Lock",
    category: "Secreto",
    status: "locked",
    borderCol: "border-slate-300",
    bgCol: "bg-slate-100",
    iconCol: "text-slate-400"
  }
];

export const initialLessons: LessonNode[] = [
  {
    id: "amabilidad",
    title: "Amabilidad Digital",
    description: "Aprende a comunicarte con empatía y respeto en la red escolar.",
    status: "completed",
    progress: 100,
    icon: "HeartHandshake"
  },
  {
    id: "legalidad",
    title: "Legalidad y Derechos",
    description: "Tus derechos como ciudadano digital y respeto a autores.",
    status: "completed",
    progress: 100,
    icon: "Scale"
  },
  {
    id: "seguridad",
    title: "Seguridad Digital",
    description: "Protege tu identidad, contraseñas y datos del colegio.",
    status: "current",
    progress: 65,
    icon: "ShieldAlert"
  },
  {
    id: "cima",
    title: "Cima del Galeras",
    description: "Meta final: consolidación y certificado de súper ciudadano digital.",
    status: "locked",
    progress: 0,
    icon: "Flag"
  }
];

export const quizScenarios: QuizScenario[] = [
  {
    id: "scen_amabilidad",
    title: "Lección: Amabilidad Digital",
    sender: "Mateo Ortiz (6-2)",
    messageText: "Oye, creo que envié el archivo de la tarea que no era al grupo escolar. ¿Me puedes ayudar a revisar, por favor? 😅",
    questionText: "¿Cómo responderías en el chat del grupo para ser un buen compañero?",
    options: [
      {
        text: "¡LO HICISTE HORRIBLE, QUÉ DISTRAÍDO!",
        points: -20,
        tenths: 0,
        feedback: "¡Ouch, guagua! Escribir en mayúsculas sostenidas es como pararse en la punta de la loma del Galeras a gritarle en la cara a tu compañero. El respeto es primero.",
        isCorrect: false
      },
      {
        text: "No te preocupes, ya lo resolvemos. Te paso el enlace correcto de entrega o te explico cómo corregir.",
        points: 50,
        tenths: 0.2,
        feedback: "¡Excelente, guagua! Con empatía y solidaridad fortaleces tu senda y construyes una comunidad sana.",
        isCorrect: true
      },
      {
        text: "Qué oso, de verdad ni sabes subir un archivo jaja.",
        points: -10,
        tenths: 0,
        feedback: "Achachay, burlarte o chismosear ('cybergossip') debilita la confianza grupal. Ayuda en vez de desanimar.",
        isCorrect: false
      }
    ]
  },
  {
    id: "scen_legalidad",
    title: "Lección: Legalidad y Derechos",
    sender: "Sofía Rosero (6-3)",
    messageText: "Oigan, encontré esta ilustración espectacular del Volcán Galeras hecha por un artista local en internet. ¡La voy a publicar en mi perfil atribuyéndomela a mí misma para ganar likes! 🏔️✨",
    questionText: "¿Cuál es el consejo ético correcto que le darías a Sofía?",
    options: [
      {
        text: "¡Qué gran idea! Súbela, de todos modos el artista nunca se enterará.",
        points: -15,
        tenths: 0,
        feedback: "Hacer pasar una creación ajena como propia se llama plagio. Deberías rechazar conductas que violan la propiedad intelectual.",
        isCorrect: false
      },
      {
        text: "Deberías incluir el nombre del artista original, o usar imágenes gratuitas bajo licencias libres como Creative Commons.",
        points: 50,
        tenths: 0.2,
        feedback: "¡Magistral! Explicar el respeto a las licencias Creative Commons empodera a tu grupo escolar en la Senda Informática.",
        isCorrect: true
      },
      {
        text: "Oye, no hagas eso, te va a meter preso la policía ahora mismo por plagio digital.",
        points: -5,
        tenths: 0,
        feedback: "Aunque es inapropiado mentir, no exageres de esa forma para asustar. Informa con asertividad y términos precisos.",
        isCorrect: false
      }
    ]
  },
  {
    id: "scen_seguridad",
    title: "Lección: Seguridad Digital",
    sender: "AndinoGamer99 (Privado)",
    messageText: "Hola amiguito de sexto, estoy regalando pase élite y 2000 diamantes gratis de Free Fire. Solo pásame el correo institucional de tu colegio y tu contraseña de acceso para poder cargártelos rápido. ¡No le digas a nadie! 💎🔥",
    questionText: "¿Qué debes hacer de inmediato ante este mensaje sospechoso?",
    options: [
      {
        text: "¡Wow, diamantes gratis! Ya te mando mi usuario y clave, pero no vayas a robarme.",
        points: -30,
        tenths: 0,
        feedback: "¡Ojo de Guardián! Compartir tu contraseña institucional es sumamente peligroso. Facilita el hackeo del sistema escolar y vulnera tu privacidad.",
        isCorrect: false
      },
      {
        text: "No te daré ninguna clave. Te reportaré inmediatamente con mi profesor de Tecnología y bloquearé este chat.",
        points: 50,
        tenths: 0.2,
        feedback: "¡Brillante! Las contraseñas escolares son tu escudo privado de seguridad. Ante sospecha de phishing o fraude, reportar es el camino correcto.",
        isCorrect: true
      },
      {
        text: "No confío mucho, pero te daré la clave de mi hermano menor a ver si es verdad.",
        points: -20,
        tenths: 0,
        feedback: "No arriesgues la seguridad de otros. Conviértete en e-regulador y frena la ingeniería social protegiendo a tu grupo.",
        isCorrect: false
      }
    ]
  }
];

export const leaderboardEntries: LeaderboardEntry[] = [
  {
    id: "l1",
    name: "Sofía Rosero",
    school: "I.E.M. Normal Superior de Pasto",
    grade: "Grado 6-3",
    points: 1410,
    tenths: 5.0,
    level: "Sabio de La Cocha",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjbcmsFwd38XkwEXFGKTvhY214nrPYERGfZiA_EIKFA_3NcZec8OvgGNnBN5uApmSPR1BQs1fCAGnqHEjxNWg3jbUNnmM9fqZzolfgGc_bNHKKhU2rSXDNVpgZ1gHgx8NX0mBpfuPwcZUf_wGWSNvht7phaSO1M4YYScqPnHq7X-ZsY_DSDineoXlQyABSs-9jIOPIa4-haGE-lQQkDuFuIdzrb0JbEfKyPGRFFBUmweDzVP61c0IBBwn47AvHCzdSGBk6GkIfSg"
  },
  {
    id: "l2",
    name: "Camila Narváez",
    school: "I.E.M. Ciudad de Pasto",
    grade: "Grado 6-2",
    points: 1340,
    tenths: 4.8,
    level: "Guardián del Galeras",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA01"
  },
  {
    id: "l3",
    name: "Juanito Pérez (Tú)",
    school: "I.E.M. Ciudad de Pasto",
    grade: "Grado 6-1",
    points: 1250,
    tenths: 4.5,
    level: "Guardián del Galeras",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjbcmsFwd38XkwEXFGKTvhY214nrPYERGfZiA_EIKFA_3NcZec8OvgGNnBN5uApmSPR1BQs1fCAGnqHEjxNWg3jbUNnmM9fqZzolfgGc_bNHKKhU2rSXDNVpgZ1gHgx8NX0mBpfuPwcZUf_wGWSNvht7phaSO1M4YYScqPnHq7X-ZsY_DSDineoXlQyABSs-9jIOPIa4-haGE-lQQkDuFuIdzrb0JbEfKyPGRFFBUmweDzVP61c0IBBwn47AvHCzdSGBk6GkIfSg"
  },
  {
    id: "l4",
    name: "Mateo Insuasty",
    school: "I.E.M. San Juan Bosco",
    grade: "Grado 6-1",
    points: 1180,
    tenths: 4.2,
    level: "Guardián del Galeras",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA02"
  },
  {
    id: "l5",
    name: "Diego Portilla",
    school: "I.E.M. Ciudad de Pasto",
    grade: "Grado 6-1",
    points: 1020,
    tenths: 3.8,
    level: "Guardián del Galeras",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA03"
  },
  {
    id: "l6",
    name: "Valentina Cabrera",
    school: "I.E.M. San Juan Bosco",
    grade: "Grado 6-2",
    points: 980,
    tenths: 3.5,
    level: "Artesano del Chat",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA04"
  },
  {
    id: "l7",
    name: "Santiago Erazo",
    school: "I.E.M. Liceo de la Universidad",
    grade: "Grado 6-1",
    points: 890,
    tenths: 3.1,
    level: "Artesano del Chat",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA05"
  },
  {
    id: "l8",
    name: "Isabela Martínez",
    school: "I.E.M. Normal Superior de Pasto",
    grade: "Grado 6-2",
    points: 750,
    tenths: 2.8,
    level: "Artesano del Chat",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA06"
  },
  {
    id: "l9",
    name: "Juan José Ortiz",
    school: "I.E.M. Liceo de la Universidad",
    grade: "Grado 6-3",
    points: 620,
    tenths: 2.2,
    level: "Artesano del Chat",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA07"
  },
  {
    id: "l10",
    name: "Allison Bucheli",
    school: "I.E.M. Ciudad de Pasto",
    grade: "Grado 6-2",
    points: 510,
    tenths: 1.8,
    level: "Cuy Explorador",
    avatarUrl: "https://lh3.googleusercontent.com/oid-public/AA08"
  }
];

export const schoolsList = [
  "Todas las IE",
  "I.E.M. Ciudad de Pasto",
  "I.E.M. San Juan Bosco",
  "I.E.M. Normal Superior de Pasto",
  "I.E.M. Liceo de la Universidad"
];

export const gradesList = [
  "Todos los grados",
  "Grado 6-1",
  "Grado 6-2",
  "Grado 6-3"
];

export const levelsFilterList = [
  "Todos los niveles",
  "Sabio de La Cocha",
  "Guardián del Galeras",
  "Artesano del Chat",
  "Cuy Explorador"
];
