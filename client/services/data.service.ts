export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
  trending: boolean;
  tags: string[];
}

export const categories = [
  { id: "deportes", name: "Deportes", icon: "⚽", color: "bg-green-500" },
  { id: "tech", name: "Tech", icon: "💻", color: "bg-blue-500" },
  { id: "ciencia", name: "Ciencia", icon: "🔬", color: "bg-purple-500" },
  {
    id: "entretenimiento",
    name: "Entretenimiento",
    icon: "🎬",
    color: "bg-red-500",
  },
  {
    id: "estilo-de-vida",
    name: "Estilo de Vida",
    icon: "✨",
    color: "bg-pink-500",
  },
  { id: "sociedad", name: "Sociedad", icon: "🏛️", color: "bg-gray-500" },
];

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "El Futuro del Fútbol: Tecnología en los Estadios del Mañana",
    excerpt:
      "Los estadios inteligentes revolucionan la experiencia deportiva con realidad aumentada, análisis en tiempo real y conectividad 5G.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "deportes",
    author: "María González",
    publishedAt: "2024-01-15",
    imageUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop",
    readTime: 5,
    views: 12500,
    likes: 234,
    featured: true,
    trending: true,
    tags: ["fútbol", "tecnología", "estadios"],
  },
  {
    id: "2",
    title:
      "Inteligencia Artificial: El Nuevo Motor de la Innovación Empresarial",
    excerpt:
      "Las empresas adoptan IA para optimizar procesos, mejorar la experiencia del cliente y crear nuevos modelos de negocio.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "tech",
    author: "Carlos Rodríguez",
    publishedAt: "2024-01-14",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    readTime: 8,
    views: 18750,
    likes: 456,
    featured: true,
    trending: true,
    tags: ["IA", "empresas", "innovación"],
  },
  {
    id: "3",
    title:
      "Descubrimiento Revolucionario: Nueva Terapia Génica para el Alzheimer",
    excerpt:
      "Científicos desarrollan una innovadora terapia que podría cambiar el tratamiento de enfermedades neurodegenerativas.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "ciencia",
    author: "Dr. Ana Martín",
    publishedAt: "2024-01-13",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    readTime: 6,
    views: 9875,
    likes: 312,
    featured: true,
    trending: false,
    tags: ["medicina", "alzheimer", "terapia génica"],
  },
  {
    id: "4",
    title:
      "Netflix Presenta su Estrategia para 2024: Contenido Local y Tecnología",
    excerpt:
      "La plataforma apuesta por producciones regionales y nuevas tecnologías inmersivas para mantener su liderazgo.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "entretenimiento",
    author: "Luis Fernández",
    publishedAt: "2024-01-12",
    imageUrl:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=400&fit=crop",
    readTime: 4,
    views: 15200,
    likes: 389,
    featured: false,
    trending: true,
    tags: ["netflix", "streaming", "entretenimiento"],
  },
  {
    id: "5",
    title: "Tendencias de Bienestar 2024: Mindfulness y Vida Sostenible",
    excerpt:
      "Exploramos las principales tendencias que definirán el bienestar personal y ambiental en el nuevo año.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "estilo-de-vida",
    author: "Carmen Silva",
    publishedAt: "2024-01-11",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
    readTime: 7,
    views: 8456,
    likes: 178,
    featured: false,
    trending: true,
    tags: ["bienestar", "sostenibilidad", "mindfulness"],
  },
  {
    id: "6",
    title: "Elecciones 2024: Análisis de las Propuestas Económicas",
    excerpt:
      "Un repaso detallado de los planes económicos de los principales candidatos y su impacto potencial.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "sociedad",
    author: "Roberto Vega",
    publishedAt: "2024-01-10",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop",
    readTime: 10,
    views: 22100,
    likes: 567,
    featured: false,
    trending: true,
    tags: ["política", "economía", "elecciones"],
  },
  {
    id: "7",
    title: "Champions League: Barcelona Avanza a Cuartos con Goleada Histórica",
    excerpt:
      "El equipo catalán se impuso 4-1 al PSG en una noche mágica en el Camp Nou que pasará a la historia.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "deportes",
    author: "Miguel Santos",
    publishedAt: "2024-01-09",
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    readTime: 5,
    views: 45600,
    likes: 892,
    featured: false,
    trending: true,
    tags: ["fútbol", "champions", "barcelona"],
  },
  {
    id: "8",
    title: "Revolución en el Espacio: SpaceX Completa Primera Misión a Marte",
    excerpt:
      "La nave Starship logra aterrizar exitosamente en el planeta rojo, marcando un hito en la exploración espacial.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "ciencia",
    author: "Dr. Patricia López",
    publishedAt: "2024-01-08",
    imageUrl:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop",
    readTime: 8,
    views: 78300,
    likes: 1245,
    featured: true,
    trending: false,
    tags: ["espacio", "marte", "spacex"],
  },
  {
    id: "9",
    title:
      "iPhone 16 Pro: Todo lo que Sabemos Sobre el Próximo Flagship de Apple",
    excerpt:
      "Filtraciones revelan características revolucionarias del próximo smartphone que llegará en septiembre.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "tech",
    author: "Sandra Morales",
    publishedAt: "2024-01-07",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop",
    readTime: 6,
    views: 34200,
    likes: 567,
    featured: false,
    trending: true,
    tags: ["apple", "iphone", "tecnología"],
  },
  {
    id: "10",
    title: "Cannes 2024: Pedro Almodóvar Compite por la Palma de Oro",
    excerpt:
      "El director español presenta su nueva película protagonizada por Tilda Swinton en el festival más prestigioso.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "entretenimiento",
    author: "Isabella Ruiz",
    publishedAt: "2024-01-06",
    imageUrl:
      "https://images.unsplash.com/photo-1489599485607-39ef5d6003e6?w=800&h=400&fit=crop",
    readTime: 4,
    views: 28900,
    likes: 423,
    featured: false,
    trending: false,
    tags: ["cine", "cannes", "almodóvar"],
  },
  {
    id: "11",
    title: "Guía de Viaje 2024: Los 10 Destinos Más Sostenibles del Mundo",
    excerpt:
      "Descubre lugares increíbles que priorizan el turismo responsable y la conservación ambiental.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "estilo-de-vida",
    author: "Diego Herrera",
    publishedAt: "2024-01-05",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    readTime: 9,
    views: 19800,
    likes: 345,
    featured: false,
    trending: true,
    tags: ["viajes", "sostenibilidad", "turismo"],
  },
  {
    id: "12",
    title: "Crisis Energética Global: Europa Busca Alternativas al Gas Ruso",
    excerpt:
      "Análisis de las estrategias europeas para diversificar sus fuentes de energía ante la crisis geopolítica.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    category: "sociedad",
    author: "Fernando Castro",
    publishedAt: "2024-01-04",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop",
    readTime: 11,
    views: 56700,
    likes: 789,
    featured: false,
    trending: true,
    tags: ["energía", "europa", "geopolítica"],
  },
];

export const socialPosts = [
  {
    id: "1",
    platform: "twitter",
    author: "@TechNews_ES",
    content:
      "🚀 ¡La IA está transformando todo! Nuestro último artículo explora cómo las empresas están adoptando estas tecnologías.",
    timestamp: "2h",
    likes: 45,
    shares: 12,
  },
  {
    id: "2",
    platform: "instagram",
    author: "@lifestyle_mag",
    content:
      "✨ Las tendencias de bienestar que no puedes perderte este 2024. Swipe para descubrir más ⬅️",
    timestamp: "4h",
    likes: 156,
    shares: 23,
  },
  {
    id: "3",
    platform: "facebook",
    author: "Deportes Hoy",
    content:
      "⚽ Los estadios del futuro ya están aquí. Tecnología 5G, realidad aumentada y mucho más.",
    timestamp: "6h",
    likes: 89,
    shares: 34,
  },
];

export const breakingNews = [
  "🔴 ÚLTIMO MOMENTO: Nueva tecnología de fusión nuclear alcanza récord histórico",
  "⚡ DEPORTES: Real Madrid anuncia fichaje millonario para la próxima temporada",
  "🏛️ POLÍTICA: Congreso aprueba reforma histórica en votación cerrada",
  "💻 TECH: OpenAI lanza nueva versión de GPT con capacidades revolucionarias",
  "🎬 ENTRETENIMIENTO: Festival de Cannes anuncia películas en competencia oficial",
];

export const editorsPicks = [
  {
    id: "e1",
    title:
      "El Renacimiento de la Energía Nuclear: ¿La Solución al Cambio Climático?",
    excerpt:
      "Nuevas tecnologías de reactores modulares pequeños prometen energía limpia y segura para el futuro.",
    category: "ciencia",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop",
    author: "Dr. Elena Martínez",
    readTime: 12,
  },
  {
    id: "e2",
    title: "La Revolución del Gaming: Realidad Virtual vs Realidad Aumentada",
    excerpt:
      "Análisis profundo de las tecnologías inmersivas que están redefiniendo la industria del entretenimiento.",
    category: "tech",
    imageUrl:
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=300&fit=crop",
    author: "Carlos Mendoza",
    readTime: 8,
  },
  {
    id: "e3",
    title: "Mindfulness Urbano: Encontrar la Paz en la Ciudad Moderna",
    excerpt:
      "Técnicas y espacios para mantener el equilibrio mental en entornos urbanos cada vez más acelerados.",
    category: "estilo-de-vida",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop",
    author: "Ana Sofía Torres",
    readTime: 6,
  },
];

export const videoContent = [
  {
    id: "v1",
    title: "Así se Construye un Estadio Inteligente",
    thumbnail:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=225&fit=crop",
    duration: "4:32",
    views: "125K",
    category: "deportes",
  },
  {
    id: "v2",
    title: "El Futuro de la Inteligencia Artificial",
    thumbnail:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
    duration: "7:18",
    views: "203K",
    category: "tech",
  },
  {
    id: "v3",
    title: "Descubrimiento: Terapia Génica Revolucionaria",
    thumbnail:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop",
    duration: "6:45",
    views: "89K",
    category: "ciencia",
  },
];

export const liveUpdates = [
  {
    id: "l1",
    time: "14:32",
    title: "Bolsas europeas abren con ganancias moderadas",
    type: "economia",
  },
  {
    id: "l2",
    time: "14:15",
    title: "Nuevo récord en producción de energía solar en España",
    type: "ciencia",
  },
  {
    id: "l3",
    time: "13:58",
    title: "Apple anuncia conferencia de desarrolladores para marzo",
    type: "tech",
  },
  {
    id: "l4",
    time: "13:42",
    title: "Liga española confirma nuevas medidas de fair play financiero",
    type: "deportes",
  },
];

export const polls = [
  {
    id: "p1",
    question: "¿Cuál crees que será la tecnología más importante en 2024?",
    options: [
      { id: "opt1", text: "Inteligencia Artificial", votes: 45 },
      { id: "opt2", text: "Realidad Virtual", votes: 23 },
      { id: "opt3", text: "Blockchain", votes: 18 },
      { id: "opt4", text: "Computación Cuántica", votes: 14 },
    ],
    totalVotes: 1247,
  },
];

export const liveScores = [
  {
    id: "s1",
    league: "LaLiga",
    status: "LIVE",
    minute: "67'",
    homeTeam: {
      name: "Real Madrid",
      shortName: "RMA",
      logo: "⚪",
      score: 2,
    },
    awayTeam: {
      name: "Barcelona",
      shortName: "BAR",
      logo: "🔵",
      score: 1,
    },
    venue: "Santiago Bernabéu",
  },
  {
    id: "s2",
    league: "Premier League",
    status: "LIVE",
    minute: "45+2'",
    homeTeam: {
      name: "Manchester United",
      shortName: "MUN",
      logo: "🔴",
      score: 0,
    },
    awayTeam: {
      name: "Liverpool",
      shortName: "LIV",
      logo: "🔴",
      score: 1,
    },
    venue: "Old Trafford",
  },
  {
    id: "s3",
    league: "Champions League",
    status: "FINISHED",
    minute: "FT",
    homeTeam: {
      name: "Bayern Munich",
      shortName: "BAY",
      logo: "🔴",
      score: 3,
    },
    awayTeam: {
      name: "PSG",
      shortName: "PSG",
      logo: "🔵",
      score: 2,
    },
    venue: "Allianz Arena",
  },
  {
    id: "s4",
    league: "Serie A",
    status: "19:45",
    minute: "",
    homeTeam: {
      name: "Juventus",
      shortName: "JUV",
      logo: "⚫",
      score: null,
    },
    awayTeam: {
      name: "AC Milan",
      shortName: "MIL",
      logo: "🔴",
      score: null,
    },
    venue: "Allianz Stadium",
  },
];
