export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  publishedAt: string;
  imageUrl: string;
  imageCaption?: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
  trending: boolean;
  tags: string[];
  metaDescription?: string;
  metaKeywords?: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  verified?: boolean;
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
    content: `
      <p>En una fría noche de noviembre en el Santiago Bernabéu, más de 80,000 espectadores fueron testigos de algo mucho más grande que un clásico entre Real Madrid y Barcelona. Era una ventana al futuro del deporte. Mientras Messi y Mbappé se enfrentaban sobre el césped, la tecnología experimentaba el futuro del deporte. Mientras los jugadores se enfrentaban sobre el césped, la verdadera revolución sucedía en las gradas, en los móviles de los aficionados y en los centros de datos que alimentan la nueva era del entretenimiento deportivo.</p>
      
      <h2>📱 Lo Que Revolucionó en este Artículo</h2>
      
      <ul>
        <li>🚀 <strong>Tecnología en los estadios</strong> revolucionó las experiencias de entretenimiento del aficionado</li>
        <li>🎯 <strong>Los aficionados modernos</strong> que conocen las estadísticas más avanzadas</li>
        <li>📊 <strong>Ejemplos reales de implementación</strong> en venues emblemáticos</li>
        <li>🔮 <strong>El futuro de los estadios inteligentes</strong> y las nuevas experiencias</li>
      </ul>
      
      <h2>🚀 5G: La Infraestructura que lo Hace Posible</h2>
      
      <p>La verdadera revolución comenzó con el despliegue masivo de redes 5G en estadios deportivos. Con velocidades de hasta 10 gigabits por segundo, la latencia se redujo a menos de 1 milisegundo, lo cual permite una interacción casi instantánea entre dispositivos. Con velocidades que alcanzan los <strong>10 Gbps</strong> y latencias menores a <strong>1ms</strong>, se abre un mundo de posibilidades:</p>
      
      <blockquote>
        <p><strong>50% de los espectadores</strong> utilizan actualmente aplicaciones interactivas durante eventos deportivos, y se espera que esta cifra alcance el <strong>85% en 2025</strong>.</p>
      </blockquote>

      <h3>Capacidades Revolucionarias del 5G en Estadios:</h3>
      
      <ul>
        <li><strong>Realidad Aumentada en Tiempo Real:</strong> Los espectadores pueden ver superposiciones digitales con información detallada de jugadores, estadísticas en vivo y repeticiones desde múltiples ángulos directamente en sus dispositivos.</li>
        <li><strong>Interactividad Social Masiva:</strong> Participación en encuestas, juegos y experiencias colaborativas con otros espectadores sin comprometer la conectividad.</li>
        <li><strong>Streaming Multi-Ángulo:</strong> Acceso a 6 ángulos diferentes de cámara desde dispositivos personales sin buffering.</li>
        <li><strong>Traducción Instantánea:</strong> Comentarios en tiempo real en más de 40 idiomas.</li>
      </ul>

      <h2>🧠 Inteligencia Artificial: El Cerebro del Estadio Inteligente</h2>
      
      <p>Los sistemas de IA procesan más de <strong>2.5 millones de puntos de datos por partido</strong>, desde la velocidad de cada jugador hasta patrones de movimiento de la multitud, creando una matriz de experiencias personalizadas. Esta tecnología está redefiniendo la manera en que experimentamos los deportes.</p>
      
      <p>El <strong>57% de los estadios</strong> más avanzados ya utilizan algoritmos de machine learning que pueden predecir con un <strong>78% de precisión</strong> cuál será la siguiente jugada más importante, mejorando significativamente la experiencia del espectador.</p>

      <blockquote>
        <p>"No estamos simplemente digitalizando el deporte; estamos creando una nueva dimensión de entretenimiento donde cada aficionado se convierte en analista, comentarista y protagonista de su propia experiencia." - Dr. Elena Martín, MIT Sports Technology Lab</p>
      </blockquote>

      <h2>🌟 El Futuro es Ahora</h2>
      
      <p>Varios estadios pioneros ya han implementado estas tecnologías con resultados impresionantes. El aumento en la satisfacción de los espectadores y el engagement durante los eventos ha sido notable.</p>
      
      <p>La próxima fase incluirá la integración de inteligencia artificial para predicciones más precisas y experiencias aún más personalizadas. El deporte del futuro será más interactivo, más inmersivo y más emocionante que nunca.</p>
    `,
    category: "deportes",
    author: "María González",
    authorBio:
      "Periodista especializada en tecnología deportiva con más de 10 años de experiencia cubriendo innovaciones en estadios y análisis deportivo.",
    authorAvatar: "MG",
    publishedAt: "2024-01-15",
    imageUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop",
    imageCaption:
      "En una fría noche de noviembre en el Santiago Bernabéu, más de 80,000 espectadores fueron testigos de algo mucho más grande que un clásico entre Real Madrid y Barcelona.",
    readTime: 5,
    views: 12500,
    likes: 234,
    featured: true,
    trending: true,
    tags: ["fútbol", "tecnología", "estadios"],
    metaDescription:
      "Descubre cómo la tecnología 5G, IA y realidad aumentada están revolucionando los estadios de fútbol modernos y transformando la experiencia de los aficionados.",
    metaKeywords: [
      "estadios inteligentes",
      "tecnología deportiva",
      "5G fútbol",
      "realidad aumentada deportes",
      "IA deportes",
    ],
  },
  {
    id: "2",
    title:
      "Inteligencia Artificial: El Nuevo Motor de la Innovación Empresarial",
    excerpt:
      "Las empresas adoptan IA para optimizar procesos, mejorar la experiencia del cliente y crear nuevos modelos de negocio.",
    content: `
      <p>La inteligencia artificial ha dejado de ser una promesa futurista para convertirse en el motor principal de la transformación empresarial en 2024. Las compañías que han adoptado estas tecnologías reportan incrementos del <strong>40% en productividad</strong> y <strong>25% en satisfacción del cliente</strong>.</p>
      
      <h2>🏢 Transformación en Todos los Sectores</h2>
      
      <p>Desde startups hasta multinacionales, la IA está redefiniendo la manera en que operan las empresas modernas. Los casos de uso van desde chatbots inteligentes hasta sistemas de predicción de demanda que optimizan cadenas de suministro globales.</p>
      
      <h3>Sectores Líderes en Adopción:</h3>
      
      <ul>
        <li><strong>Servicios Financieros:</strong> Detección de fraudes en tiempo real y asesoramiento financiero personalizado</li>
        <li><strong>Retail:</strong> Personalización de experiencias de compra y gestión inteligente de inventarios</li>
        <li><strong>Salud:</strong> Diagnósticos asistidos por IA y desarrollo acelerado de medicamentos</li>
        <li><strong>Manufactura:</strong> Mantenimiento predictivo y optimización de procesos productivos</li>
      </ul>
      
      <blockquote>
        <p>"La IA no reemplaza a los humanos, los potencia. Estamos viendo cómo equipos pequeños logran resultados que antes requerían departamentos enteros." - Sarah Chen, CEO de TechVentures</p>
      </blockquote>
      
      <h2>📊 ROI Comprobado</h2>
      
      <p>Las empresas que han invertido en IA durante los últimos dos años muestran un retorno de inversión promedio del <strong>300%</strong>. Los beneficios más significativos se observan en:</p>
      
      <ul>
        <li>Reducción de costos operativos (35%)</li>
        <li>Mejora en toma de decisiones (42%)</li>
        <li>Aceleración de procesos (58%)</li>
        <li>Innovación en productos y servicios (29%)</li>
      </ul>
      
      <h2>🚀 El Futuro Está Aquí</h2>
      
      <p>Con el avance de modelos de lenguaje como GPT-4 y Claude, y la democratización de herramientas de IA, esperamos ver una adopción aún más acelerada en 2024. Las empresas que no se adapten correo el riesgo de quedarse atrás en un mercado cada vez más competitivo.</p>
    `,
    category: "tech",
    author: "Carlos Rodríguez",
    authorBio:
      "Consultor en transformación digital y especialista en implementación de IA empresarial. Ha asesorado a más de 200 empresas en su proceso de digitalización.",
    authorAvatar: "CR",
    publishedAt: "2024-01-14",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    imageCaption:
      "La inteligencia artificial está transformando la manera en que las empresas operan y toman decisiones estratégicas.",
    readTime: 8,
    views: 18750,
    likes: 456,
    featured: true,
    trending: true,
    tags: ["IA", "empresas", "innovación"],
    metaDescription:
      "Análisis completo sobre cómo la inteligencia artificial está revolucionando las empresas modernas y generando ROI significativo en todos los sectores.",
    metaKeywords: [
      "inteligencia artificial empresarial",
      "IA negocios",
      "transformación digital",
      "ROI inteligencia artificial",
      "automatización empresarial",
    ],
  },
  {
    id: "3",
    title:
      "Descubrimiento Revolucionario: Nueva Terapia Génica para el Alzheimer",
    excerpt:
      "Científicos desarrollan una innovadora terapia que podría cambiar el tratamiento de enfermedades neurodegenerativas.",
    content: `
      <p>Un equipo internacional de investigadores ha logrado un avance sin precedentes en el tratamiento del Alzheimer. La nueva terapia génica, desarrollada durante cinco años de investigación, ha mostrado resultados prometedores en ensayos clínicos, con una <strong>mejora del 60% en función cognitiva</strong> en pacientes en etapas tempranas de la enfermedad.</p>
      
      <h2>🧬 La Ciencia Detrás del Breakthrough</h2>
      
      <p>La terapia utiliza vectores virales modificados para entregar genes correctivos directamente a las neuronas afectadas. Este enfoque innovador permite reparar los mecanismos celulares dañados que causan la acumulación de proteínas tóxicas características del Alzheimer.</p>
      
      <h3>Mecanismo de Acción:</h3>
      
      <ul>
        <li><strong>Entrega Dirigida:</strong> Vectores AAV (virus adenoasociados) modificados transportan genes terapéuticos</li>
        <li><strong>Reparación Celular:</strong> Los genes introducidos codifican enzimas que eliminan placas amiloides</li>
        <li><strong>Neuroprotección:</strong> Factores de crecimiento sintéticos protegen neuronas sanas</li>
        <li><strong>Regeneración:</strong> Estimulación de neurogénesis en el hipocampo</li>
      </ul>
      
      <blockquote>
        <p>"Este tratamiento no solo detiene la progresión de la enfermedad, sino que en muchos casos logra revertir el daño neurológico existente. Es un cambio de paradigma completo." - Dr. Michael Zhang, Instituto Nacional de Neurología</p>
      </blockquote>
      
      <h2>📈 Resultados de Ensayos Clínicos</h2>
      
      <p>Los ensayos de Fase II, realizados con 240 pacientes durante 18 meses, mostraron resultados extraordinarios:</p>
      
      <ul>
        <li>60% mejora en función cognitiva</li>
        <li>45% reducción en pérdida de memoria</li>
        <li>80% de pacientes mantuvieron independencia funcional</li>
        <li>Efectos adversos mínimos (< 5% de pacientes)</li>
      </ul>
      
      <h2>🌍 Implicaciones Globales</h2>
      
      <p>Con más de 55 millones de personas afectadas por demencia globalmente, y costos anuales superiores al billón de dólares, esta terapia podría representar no solo un avance médico, sino también una revolución económica y social.</p>
      
      <p>Los ensayos de Fase III comenzarán en seis países este año, con expectativas de aprobación regulatoria para 2026.</p>
    `,
    category: "ciencia",
    author: "Dr. Ana Martín",
    authorBio:
      "Neuróloga y investigadora especializada en enfermedades neurodegenerativas. Directora del Centro de Investigación en Alzheimer de Barcelona.",
    authorAvatar: "AM",
    publishedAt: "2024-01-13",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    imageCaption:
      "Investigadores trabajando en el desarrollo de la revolucionaria terapia génica para el tratamiento del Alzheimer.",
    readTime: 6,
    views: 9875,
    likes: 312,
    featured: true,
    trending: false,
    tags: ["medicina", "alzheimer", "terapia génica"],
    metaDescription:
      "Descubre el revolucionario tratamiento de terapia génica que está mostrando resultados prometedores contra el Alzheimer y otras enfermedades neurodegenerativas.",
    metaKeywords: [
      "terapia génica alzheimer",
      "tratamiento alzheimer",
      "investigación neurológica",
      "medicina regenerativa",
      "ensayos clínicos",
    ],
  },
  {
    id: "4",
    title:
      "Netflix Presenta su Estrategia para 2024: Contenido Local y Tecnología",
    excerpt:
      "La plataforma apuesta por producciones regionales y nuevas tecnologías inmersivas para mantener su liderazgo.",
    content: `
      <p>Netflix ha revelado su estrategia más ambiciosa hasta la fecha para 2024, combinando una fuerte apuesta por el contenido local con tecnologías inmersivas que prometen revolucionar la manera en que consumimos entretenimiento. La compañía planea invertir <strong>$17 mil millones</strong> en contenido original, con un 60% destinado a producciones no anglófonas.</p>
      
      <h2>🌍 Contenido Local: La Nueva Frontera</h2>
      
      <p>La estrategia de localización de Netflix ha demostrado ser extraordinariamente exitosa. Series como "Squid Game", "Money Heist" y "Dark" han probado que el contenido local puede tener apelo global cuando se combina con narrativas universales y alta calidad de producción.</p>
      
      <h3>Inversiones Regionales Destacadas:</h3>
      
      <ul>
        <li><strong>España y Latinoamérica:</strong> $2.5 mil millones para 150 producciones</li>
        <li><strong>Corea del Sur:</strong> $1.8 mil millones tras el éxito de K-dramas</li>
        <li><strong>India:</strong> $1.2 mil millones en contenido en 12 idiomas locales</li>
        <li><strong>África:</strong> $500 millones para desarrollar talentos emergentes</li>
      </ul>
      
      <blockquote>
        <p>"El futuro del entretenimiento es glocal: pensamiento global con ejecución local. Nuestros datos muestran que las audiencias anhelan historias auténticas de sus culturas, pero con valores universales." - Ted Sarandos, Co-CEO de Netflix</p>
      </blockquote>
      
      <h2>🥽 Tecnología Inmersiva: Más Allá de la Pantalla</h2>
      
      <p>Netflix está experimentando con tecnologías de realidad virtual y realidad aumentada para crear experiencias completamente nuevas. Los usuarios podrán "entrar" en sus series favoritas y vivir las historias desde perspectivas únicas.</p>
      
      <h3>Innovaciones Tecnológicas:</h3>
      
      <ul>
        <li><strong>Netflix VR:</strong> Experiencias inmersivas para seleccionar series originales</li>
        <li><strong>Audio Espacial:</strong> Sonido 360° para todas las producciones premium</li>
        <li><strong>IA Personalizada:</strong> Algoritmos que adaptan el contenido en tiempo real</li>
        <li><strong>Gaming Integrado:</strong> Juegos basados en series populares dentro de la plataforma</li>
      </ul>
      
      <h2>📊 Impacto en la Industria</h2>
      
      <p>Esta estrategia posiciona a Netflix no solo como un servicio de streaming, sino como un ecosistema de entretenimiento completo. Los analistas predicen que estas iniciativas podrían aumentar el tiempo de engagement promedio en un <strong>45%</strong> y reducir la cancelación de suscripciones en un <strong>30%</strong>.</p>
      
      <p>La competencia ya está respondiendo: Disney+ ha anunciado inversiones similares en contenido local, mientras que Amazon Prime Video expande su oferta de experiencias interactivas.</p>
    `,
    category: "entretenimiento",
    author: "Luis Fernández",
    authorBio:
      "Periodista especializado en industria del entretenimiento y análisis de plataformas digitales. Corresponsal en Los Ángeles para medios hispanos.",
    authorAvatar: "LF",
    publishedAt: "2024-01-12",
    imageUrl:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=400&fit=crop",
    imageCaption:
      "Netflix apuesta fuerte por el contenido local y las tecnologías inmersivas para mantener su posición de liderazgo en el streaming.",
    readTime: 4,
    views: 15200,
    likes: 389,
    featured: true,
    trending: true,
    tags: ["netflix", "streaming", "entretenimiento"],
    metaDescription:
      "Análisis completo de la nueva estrategia de Netflix para 2024: inversión masiva en contenido local y tecnologías inmersivas como VR y gaming.",
    metaKeywords: [
      "Netflix 2024",
      "contenido local streaming",
      "realidad virtual entretenimiento",
      "estrategia Netflix",
      "tecnología inmersiva",
    ],
  },
  {
    id: "5",
    title: "Tendencias de Bienestar 2024: Mindfulness y Vida Sostenible",
    excerpt:
      "Exploramos las principales tendencias que definirán el bienestar personal y ambiental en el nuevo año.",
    content: `
      <p>El 2024 marca un punto de inflexión en la búsqueda del bienestar integral. Las tendencias emergentes van más allá del fitness tradicional para abrazar un enfoque holístico que combina salud mental, sostenibilidad ambiental y tecnología consciente. Más del <strong>78% de los millennials</strong> priorizan ahora el bienestar sobre el éxito profesional tradicional.</p>
      
      <h2>🧘‍♀️ Mindfulness Tecnológico: Equilibrio Digital</h2>
      
      <p>La paradoja de nuestra era digital ha dado lugar a una nueva categoría de bienestar: el mindfulness tecnológico. Las personas buscan formas de mantener conexiones digitales significativas mientras protegen su salud mental.</p>
      
      <h3>Prácticas Emergentes:</h3>
      
      <ul>
        <li><strong>Digital Detox Programado:</strong> Desconexión planificada de 4-6 horas diarias</li>
        <li><strong>Meditación Asistida por IA:</strong> Apps que adaptan sesiones según el estado emocional</li>
        <li><strong>Espacios Tech-Free:</strong> Hogares con zonas libres de dispositivos</li>
        <li><strong>Consumo Consciente:</strong> Curaduría intencional de contenido digital</li>
      </ul>
      
      <blockquote>
        <p>"No se trata de rechazar la tecnología, sino de desarrollar una relación más consciente e intencional con ella. El objetivo es que la tecnología nos sirva, no que nosotros sirvamos a la tecnología." - Dr. Cal Newport, autor de 'Digital Minimalism'</p>
      </blockquote>
      
      <h2>🌱 Sostenibilidad Personal: Micro-Acciones, Macro-Impacto</h2>
      
      <p>La sostenibilidad se ha personalizado. Las personas adoptan cambios pequeños pero consistentes que, colectivamente, generan impactos significativos. El <strong>45% de los consumidores</strong> está dispuesto a pagar hasta 20% más por productos sostenibles.</p>
      
      <h3>Tendencias Sostenibles Populares:</h3>
      
      <ul>
        <li><strong>Alimentación Planetaria:</strong> Dietas que consideran el impacto ambiental</li>
        <li><strong>Moda Circular:</strong> Intercambio, reparación y upcycling de ropa</li>
        <li><strong>Transporte Multimodal:</strong> Combinación inteligente de medios de transporte</li>
        <li><strong>Hogares Regenerativos:</strong> Espacios que generan más energía de la que consumen</li>
      </ul>
      
      <h2>💡 Bienestar Comunitario: Conexiones Reales</h2>
      
      <p>La soledad epidémica ha impulsado un retorno a las conexiones comunitarias auténticas. Los "círculos de bienestar" y las "comunidades de propósito" están floreciendo en ciudades de todo el mundo.</p>
      
      <p>Estudios muestran que las personas con conexiones comunitarias fuertes tienen un <strong>50% menos probabilidades</strong> de experimentar ansiedad y depresión, lo que ha llevado a empresas y gobiernos a invertir en infraestructura social.</p>
      
      <h2>🔮 El Futuro del Bienestar</h2>
      
      <p>2024 será recordado como el año en que el bienestar dejó de ser un lujo para convertirse en una necesidad fundamental. La integración de tecnología consciente, sostenibilidad y comunidad está creando un nuevo paradigma de vida que prioriza la calidad sobre la cantidad en todos los aspectos de la experiencia humana.</p>
    `,
    category: "estilo-de-vida",
    author: "Carmen Silva",
    authorBio:
      "Coach de bienestar integral y consultora en sostenibilidad personal. Fundadora del movimiento 'Vida Consciente' con más de 500K seguidores.",
    authorAvatar: "CS",
    publishedAt: "2024-01-11",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
    imageCaption:
      "Las tendencias de bienestar 2024 combinan mindfulness, sostenibilidad y conexión comunitaria para crear un enfoque holístico de la vida moderna.",
    readTime: 7,
    views: 8456,
    likes: 178,
    featured: false,
    trending: true,
    tags: ["bienestar", "sostenibilidad", "mindfulness"],
    metaDescription:
      "Descubre las principales tendencias de bienestar para 2024: desde mindfulness tecnológico hasta sostenibilidad personal y bienestar comunitario.",
    metaKeywords: [
      "bienestar 2024",
      "mindfulness digital",
      "vida sostenible",
      "bienestar comunitario",
      "tendencias wellness",
    ],
  },
  {
    id: "6",
    title: "Elecciones 2024: Análisis de las Propuestas Económicas",
    excerpt:
      "Un repaso detallado de los planes económicos de los principales candidatos y su impacto potencial.",
    content: `
      <p>A medida que se acercan las elecciones más decisivas de la década, los planes económicos de los candidatos principales revelan visiones radicalmente diferentes sobre el futuro del país. Con una inflación del <strong>3.2%</strong> y un desempleo del <strong>6.8%</strong>, las propuestas económicas se han convertido en el factor determinante para millones de votantes.</p>
      
      <h2>📊 Análisis Comparativo de Propuestas</h2>
      
      <p>Los tres candidatos principales han presentado planes que abordan diferentes aspectos de la recuperación económica post-pandemia, cada uno con enfoques distintos sobre el papel del estado en la economía.</p>
      
      <h3>Propuestas de Política Fiscal:</h3>
      
      <ul>
        <li><strong>Candidato A:</strong> Reducción de impuestos corporativos del 25% al 20%, aumento de inversión en infraestructura ($2 billones)</li>
        <li><strong>Candidato B:</strong> Impuesto a la riqueza del 2% anual, programas sociales expandidos ($1.5 billones)</li>
        <li><strong>Candidato C:</strong> Reforma tributaria integral, incentivos para empresas verdes ($800 mil millones)</li>
      </ul>
      
      <blockquote>
        <p>"La economía post-COVID requiere un equilibrio delicado entre estímulo fiscal y responsabilidad presupuestaria. Las decisiones de 2024 definirán la próxima década." - Janet Mitchell, Economista Principal del Brookings Institution</p>
      </blockquote>
      
      <h2>🏭 Impacto en Sectores Clave</h2>
      
      <p>Las diferentes propuestas tendrán efectos variados en sectores específicos de la economía:</p>
      
      <h3>Tecnología y Innovación:</h3>
      <ul>
        <li>Inversión en I+D: Entre $200-500 mil millones según candidato</li>
        <li>Regulación de Big Tech: Desde libertad total hasta fragmentación forzosa</li>
        <li>Educación STEM: Programas de $50-150 mil millones</li>
      </ul>
      
      <h3>Energía y Medio Ambiente:</h3>
      <ul>
        <li>Transición verde: $500 mil millones a $2 billones en 10 años</li>
        <li>Subsidios petroleros: Desde eliminación total hasta mantenimiento</li>
        <li>Empleos verdes: Proyecciones de 2-8 millones de nuevos empleos</li>
      </ul>
      
      <h2>💼 Análisis de Viabilidad</h2>
      
      <p>Los economistas han evaluado la factibilidad de cada propuesta considerando el contexto político actual y las limitaciones presupuestarias. Las proyecciones muestran escenarios diversos:</p>
      
      <ul>
        <li><strong>Escenario Optimista:</strong> Crecimiento del PIB del 4-6% anual</li>
        <li><strong>Escenario Realista:</strong> Crecimiento del PIB del 2-3% anual</li>
        <li><strong>Escenario Pesimista:</strong> Estancamiento o recesión leve</li>
      </ul>
      
      <h2>🗳️ Implicaciones para los Votantes</h2>
      
      <p>Más allá de las cifras macroeconómicas, cada propuesta tendrá impactos directos en la vida diaria de los ciudadanos. Las familias de clase media, los jóvenes profesionales y los jubilados se verán afectados de manera diferente según qué plan se implemente.</p>
      
      <p>La decisión de noviembre no solo determinará el rumbo económico inmediato, sino que establecerá las bases para la competitividad del país en la economía global de las próximas décadas.</p>
    `,
    category: "sociedad",
    author: "Roberto Vega",
    authorBio:
      "Economista político y analista especializado en política fiscal. Ex-asesor del Tesoro Nacional y columnista regular en Financial Times.",
    authorAvatar: "RV",
    publishedAt: "2024-01-10",
    imageUrl:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop",
    imageCaption:
      "Las propuestas económicas de los candidatos presentan visiones contrastantes sobre el futuro fiscal y económico del país.",
    readTime: 10,
    views: 22100,
    likes: 567,
    featured: false,
    trending: true,
    tags: ["política", "economía", "elecciones"],
    metaDescription:
      "Análisis detallado de las propuestas económicas de los principales candidatos electorales y su impacto potencial en diferentes sectores.",
    metaKeywords: [
      "elecciones 2024",
      "propuestas económicas",
      "política fiscal",
      "análisis electoral",
      "economía política",
    ],
  },
  {
    id: "7",
    title: "Champions League: Barcelona Avanza a Cuartos con Goleada Histórica",
    excerpt:
      "El equipo catalán se impuso 4-1 al PSG en una noche mágica en el Camp Nou que pasará a la historia.",
    content: `
      <p>En una noche que quedará grabada para siempre en la memoria culé, el FC Barcelona logró una remontada épica ante el Paris Saint-Germain para clasificar a los cuartos de final de la Champions League. Con un marcador global de 5-4, los catalanes demostraron una vez más por qué el Camp Nou es considerado uno de los estadios más intimidantes de Europa.</p>
      
      <h2>⚽ La Remontada Perfecta</h2>
      
      <p>Tras perder 3-1 en la ida en París, pocos daban esperanzas al Barcelona. Sin embargo, la historia del fútbol nos ha enseñado que en este deporte todo es posible, especialmente cuando se combina talento, pasión y el apoyo incondicional de 99,000 espectadores.</p>
      
      <h3>Cronología de la Goleada:</h3>
      
      <ul>
        <li><strong>Minuto 23:</strong> Lewandowski abre el marcador tras asistencia de Pedri</li>
        <li><strong>Minuto 35:</strong> Gavi empata el global con un golazo desde fuera del área</li>
        <li><strong>Minuto 58:</strong> Raphinha pone el 3-0 tras jugada colectiva espectacular</li>
        <li><strong>Minuto 71:</strong> Mbappé descontaba para el PSG (3-1)</li>
        <li><strong>Minuto 88:</strong> Ansu Fati sella la clasificación con el 4-1 definitivo</li>
      </ul>
      
      <blockquote>
        <p>"Esta noche hemos demostrado que el espíritu del Barcelona nunca muere. Cuando jugamos con esta intensidad y esta pasión, somos capaces de vencer a cualquier rival." - Xavi Hernández, entrenador del FC Barcelona</p>
      </blockquote>
      
      <h2>📊 Estadísticas del Partido</h2>
      
      <p>Los números reflejan la superioridad total del Barcelona durante los 90 minutos:</p>
      
      <ul>
        <li><strong>Posesión:</strong> Barcelona 68% - PSG 32%</li>
        <li><strong>Tiros a puerta:</strong> Barcelona 12 - PSG 4</li>
        <li><strong>Corners:</strong> Barcelona 8 - PSG 2</li>
        <li><strong>Faltas cometidas:</strong> Barcelona 11 - PSG 18</li>
        <li><strong>Precisión de pases:</strong> Barcelona 91% - PSG 78%</li>
      </ul>
      
      <h2>🌟 Figuras del Partido</h2>
      
      <p>Varios jugadores brillaron en esta noche histórica, pero tres nombres destacan por encima del resto:</p>
      
      <h3>Pedri - El Arquitecto (9.5/10)</h3>
      <p>El mediocampista canario dirigió el juego con una maestría extraordinaria. Sus 3 asistencias y 127 pases completados (94% de precisión) fueron fundamentales para el triunfo.</p>
      
      <h3>Robert Lewandowski - El Finalizador (9.2/10)</h3>
      <p>El delantero polaco demostró por qué es considerado uno de los mejores goleadores del mundo. Su gol y su presencia constante en el área fueron decisivos.</p>
      
      <h3>Gavi - La Energía Pura (9.0/10)</h3>
      <p>A sus 19 años, el sevillano jugó como un veterano. Su gol desde 25 metros y su despliegue físico fueron espectaculares.</p>
      
      <h2>🏆 Próximos Rivales</h2>
      
      <p>Con esta clasificación, el Barcelona se enfrentará en cuartos de final al ganador del Manchester City vs. Borussia Dortmund. Los culés han demostrado que pueden competir con cualquier equipo cuando están en su mejor nivel.</p>
      
      <p>La remontada ante el PSG no solo significa una clasificación; representa el renacimiento de un club que ha pasado por momentos difíciles y ahora vuelve a soñar con la decimoquinta Copa de Europa.</p>
    `,
    category: "deportes",
    author: "Miguel Santos",
    authorBio:
      "Periodista deportivo especializado en fútbol europeo. Corresponsal en Barcelona desde 2010 y autor de 'Las Noches Mágicas del Camp Nou'.",
    authorAvatar: "MS",
    publishedAt: "2024-01-09",
    imageUrl:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    imageCaption:
      "Los jugadores del Barcelona celebran la clasificación a cuartos de final tras una noche histórica en el Camp Nou.",
    readTime: 5,
    views: 45600,
    likes: 892,
    featured: false,
    trending: true,
    tags: ["fútbol", "champions", "barcelona"],
    metaDescription:
      "Revive la épica remontada del Barcelona ante el PSG que los llevó a cuartos de final de la Champions League en una noche histórica.",
    metaKeywords: [
      "Barcelona PSG",
      "Champions League",
      "remontada Barcelona",
      "Camp Nou",
      "cuartos final Champions",
    ],
  },
  {
    id: "8",
    title: "Revolución en el Espacio: SpaceX Completa Primera Misión a Marte",
    excerpt:
      "La nave Starship logra aterrizar exitosamente en el planeta rojo, marcando un hito en la exploración espacial.",
    content: `
      <p>En un momento histórico para la humanidad, la nave Starship de SpaceX completó exitosamente el primer aterrizaje tripulado en Marte después de un viaje de siete meses. Los cuatro astronautas a bordo se han convertido en los primeros humanos en pisar suelo marciano, abriendo una nueva era en la exploración espacial.</p>
      
      <h2>🚀 La Misión Artemis-Mars</h2>
      
      <p>La misión, denominada Artemis-Mars, despegó desde la Luna en abril de 2023 utilizando la Luna como estación de reabastecimiento. Esta estrategia innovadora redujo significativamente los costos y riesgos asociados con una misión directa desde la Tierra.</p>
      
      <h3>Datos de la Misión:</h3>
      
      <ul>
        <li><strong>Duración del viaje:</strong> 7 meses y 12 días</li>
        <li><strong>Distancia recorrida:</strong> 487 millones de kilómetros</li>
        <li><strong>Tripulación:</strong> 4 astronautas (2 NASA, 1 ESA, 1 SpaceX)</li>
        <li><strong>Peso de la nave:</strong> 1,200 toneladas totalmente cargada</li>
        <li><strong>Combustible utilizado:</strong> Metano líquido y oxígeno (producido in situ)</li>
      </ul>
      
      <blockquote>
        <p>"Hoy no solo hemos llegado a Marte, hemos demostrado que la humanidad puede convertirse en una especie multiplanetaria. Este es el primer paso hacia la colonización sostenible del sistema solar." - Elon Musk, CEO de SpaceX</p>
      </blockquote>
      
      <h2>🔬 Descubrimientos Científicos Iniciales</h2>
      
      <p>En las primeras 48 horas en la superficie marciana, la tripulación ha realizado varios descubrimientos preliminares que podrían revolucionar nuestra comprensión del planeta rojo:</p>
      
      <h3>Hallazgos Destacados:</h3>
      
      <ul>
        <li><strong>Agua Subsuperficial:</strong> Depósitos de hielo a solo 30 cm de profundidad</li>
        <li><strong>Actividad Geológica:</strong> Evidencia de actividad volcánica reciente (< 10,000 años)</li>
        <li><strong>Composición Atmosférica:</strong> Concentraciones de metano mayores a las esperadas</li>
        <li><strong>Posibles Biosignaturas:</strong> Estructuras microscópicas que requieren análisis adicional</li>
      </ul>
      
      <h2>🏗️ Establecimiento de Base Alpha</h2>
      
      <p>Los astronautas han comenzado el establecimiento de "Base Alpha", la primera estación permanente humana en Marte. La base, diseñada para albergar hasta 12 personas, utilizará recursos locales para la producción de agua, oxígeno y combustible.</p>
      
      <h3>Sistemas de la Base:</h3>
      
      <ul>
        <li><strong>Generación de Energía:</strong> Paneles solares de alta eficiencia + reactor nuclear pequeño</li>
        <li><strong>Producción de Agua:</strong> Extracción de hielo subterráneo + reciclaje al 99%</li>
        <li><strong>Fabricación de Oxígeno:</strong> Procesamiento de CO2 atmosférico mediante MOXIE</li>
        <li><strong>Producción de Combustible:</strong> Síntesis de metano a partir de recursos locales</li>
      </ul>
      
      <h2>🌍 Impacto en la Tierra</h2>
      
      <p>Este logro histórico no solo representa un avance en la exploración espacial, sino que también tiene implicaciones profundas para la vida en la Tierra. Las tecnologías desarrolladas para esta misión ya están siendo aplicadas en sectores como energía renovable, agricultura vertical y sistemas de reciclaje avanzado.</p>
      
      <p>La próxima ventana de lanzamiento hacia Marte está programada para 2026, con una misión que llevará 8 astronautas adicionales y equipos para expandir Base Alpha. El objetivo es establecer una colonia permanente de 100 personas para 2030.</p>
    `,
    category: "ciencia",
    author: "Dr. Patricia López",
    authorBio:
      "Astrofísica y especialista en exploración espacial. Ex-ingeniera de NASA y consultora principal para misiones a Marte.",
    authorAvatar: "PL",
    publishedAt: "2024-01-08",
    imageUrl:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=400&fit=crop",
    imageCaption:
      "La nave Starship de SpaceX momentos antes del aterrizaje histórico en la superficie marciana.",
    readTime: 8,
    views: 78300,
    likes: 1245,
    featured: true,
    trending: false,
    tags: ["espacio", "marte", "spacex"],
    metaDescription:
      "Cobertura completa del histórico aterrizaje de SpaceX en Marte y el establecimiento de la primera base humana permanente en el planeta rojo.",
    metaKeywords: [
      "SpaceX Marte",
      "primera misión Marte",
      "Base Alpha Marte",
      "colonización Marte",
      "Starship aterrizaje",
    ],
  },
  {
    id: "9",
    title:
      "iPhone 16 Pro: Todo lo que Sabemos Sobre el Próximo Flagship de Apple",
    excerpt:
      "Filtraciones revelan características revolucionarias del próximo smartphone que llegará en septiembre.",
    content: `
      <p>Las filtraciones sobre el iPhone 16 Pro han alcanzado un nivel de detalle sin precedentes, revelando que Apple está preparando el lanzamiento más ambicioso de su historia. Con mejoras revolucionarias en <strong>inteligencia artificial</strong>, <strong>fotografía computacional</strong> y <strong>eficiencia energética</strong>, el dispositivo promete redefinir una vez más el estándar de los smartphones premium.</p>
      
      <h2>📱 Diseño y Display: Evolución Elegante</h2>
      
      <p>El iPhone 16 Pro mantendrá la línea de diseño premium pero introducirá mejoras sutiles pero significativas que mejorarán tanto la funcionalidad como la estética del dispositivo.</p>
      
      <h3>Especificaciones de Pantalla:</h3>
      
      <ul>
        <li><strong>Tamaño:</strong> 6.3" (Pro) y 6.9" (Pro Max) con marcos aún más delgados</li>
        <li><strong>Tecnología:</strong> OLED LTPO de quinta generación con refresh rate adaptativo 1-120Hz</li>
        <li><strong>Brillo:</strong> Pico de 2,500 nits para visibilidad exterior mejorada</li>
        <li><strong>Resolución:</strong> 460 PPI con nueva tecnología de sub-píxeles</li>
        <li><strong>Always-On Display:</strong> Versión 3.0 con widgets interactivos</li>
      </ul>
      
      <blockquote>
        <p>"El iPhone 16 Pro no es solo una evolución incremental; representa un salto generacional en lo que un smartphone puede hacer por sus usuarios." - Tim Cook, CEO de Apple (filtración de reunión interna)</p>
      </blockquote>
      
      <h2>🧠 Apple Intelligence: IA Nativa Revolucionaria</h2>
      
      <p>La característica más revolucionaria del iPhone 16 Pro será "Apple Intelligence", un sistema de IA completamente integrado que funciona localmente en el dispositivo, garantizando privacidad total mientras ofrece capacidades sin precedentes.</p>
      
      <h3>Capacidades de Apple Intelligence:</h3>
      
      <ul>
        <li><strong>Asistente Personal Avanzado:</strong> Comprensión contextual de rutinas y predicción de necesidades</li>
        <li><strong>Traducción Universal:</strong> Tiempo real en 40+ idiomas con conversaciones naturales</li>
        <li><strong>Edición Fotográfica IA:</strong> Manipulación de imágenes con comandos de voz natural</li>
        <li><strong>Síntesis de Información:</strong> Resúmenes automáticos de emails, mensajes y documentos</li>
        <li><strong>Creación de Contenido:</strong> Generación de texto, imágenes y videos personalizados</li>
      </ul>
      
      <h2>📸 Sistema de Cámara: Fotografía Computacional Extrema</h2>
      
      <p>El nuevo sistema de cámara combinará hardware de vanguardia con algoritmos de IA para ofrecer capacidades fotográficas que rivalizan con equipos profesionales.</p>
      
      <h3>Especificaciones de Cámara:</h3>
      
      <ul>
        <li><strong>Sensor Principal:</strong> 50MP con píxeles de 1.8μm y estabilización sensor-shift</li>
        <li><strong>Teleobjetivo:</strong> 12MP con zoom óptico 6x y zoom digital 25x mejorado por IA</li>
        <li><strong>Ultra Wide:</strong> 16MP con macro mejorado y corrección de distorsión automática</li>
        <li><strong>Nuevo Sensor:</strong> Cámara dedicada para captura de profundidad y realidad aumentada</li>
        <li><strong>Video:</strong> 8K a 30fps con estabilización cinematográfica</li>
      </ul>
      
      <h2>⚡ Rendimiento y Batería: Eficiencia Extrema</h2>
      
      <p>El chip A18 Pro, fabricado en proceso de 3nm de segunda generación, promete un aumento del <strong>35% en rendimiento</strong> y <strong>25% en eficiencia energética</strong> comparado con la generación anterior.</p>
      
      <ul>
        <li><strong>CPU:</strong> 8 núcleos (4 Performance + 4 Efficiency) con arquitectura ARM v9</li>
        <li><strong>GPU:</strong> 8 núcleos con soporte para ray tracing en tiempo real</li>
        <li><strong>Neural Engine:</strong> 20 núcleos capaces de 45 TOPS para IA local</li>
        <li><strong>Batería:</strong> Hasta 32 horas de reproducción de video con carga rápida 35W</li>
      </ul>
      
      <h2>💰 Precios y Disponibilidad</h2>
      
      <p>Según las filtraciones más recientes, Apple mantendrá una estrategia de precios agresiva para competir en un mercado cada vez más saturado:</p>
      
      <ul>
        <li><strong>iPhone 16 Pro (256GB):</strong> $1,199 USD</li>
        <li><strong>iPhone 16 Pro (512GB):</strong> $1,399 USD</li>
        <li><strong>iPhone 16 Pro Max (256GB):</strong> $1,399 USD</li>
        <li><strong>iPhone 16 Pro Max (1TB):</strong> $1,799 USD</li>
      </ul>
      
      <p>El lanzamiento está confirmado para septiembre de 2024, con pre-orders comenzando una semana después del evento de presentación. Apple espera superar las 100 millones de unidades vendidas en el primer año.</p>
    `,
    category: "tech",
    author: "Sandra Morales",
    authorBio:
      "Analista senior de tecnología móvil con 15 años de experiencia cubriendo lanzamientos de Apple. Editora en TechCrunch y consultora para Counterpoint Research.",
    authorAvatar: "SM",
    publishedAt: "2024-01-07",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop",
    imageCaption:
      "Render conceptual del iPhone 16 Pro basado en las filtraciones más recientes sobre diseño y características.",
    readTime: 6,
    views: 34200,
    likes: 567,
    featured: false,
    trending: true,
    tags: ["apple", "iphone", "tecnología"],
    metaDescription:
      "Análisis completo de las filtraciones del iPhone 16 Pro: Apple Intelligence, cámara revolucionaria, chip A18 Pro y precios esperados.",
    metaKeywords: [
      "iPhone 16 Pro",
      "Apple Intelligence",
      "filtraciones iPhone",
      "A18 Pro chip",
      "cámara iPhone 16",
    ],
  },
  {
    id: "10",
    title: "Cannes 2024: Pedro Almodóvar Compite por la Palma de Oro",
    excerpt:
      "El director español presenta su nueva película protagonizada por Tilda Swinton en el festival más prestigioso.",
    content: `
      <p>El Festival de Cannes 2024 ha recibido con los brazos abiertos el regreso de Pedro Almodóvar a la competencia oficial. Su nueva película, "La Voz Humana Extendida", protagonizada por Tilda Swinton y Penélope Cruz, se presenta como una de las favoritas para llevarse la codiciada <strong>Palma de Oro</strong> en una edición que celebra el cine de autor frente a las superproducciones comerciales.</p>
      
      <h2>🎬 "La Voz Humana Extendida": Arte y Tecnología</h2>
      
      <p>La nueva obra de Almodóvar es una adaptación libre de la obra teatral de Jean Cocteau, pero transportada al mundo digital contemporáneo. La película explora las relaciones humanas mediadas por la tecnología, un tema profundamente relevante en la era post-pandemia.</p>
      
      <h3>Elementos Distintivos del Film:</h3>
      
      <ul>
        <li><strong>Narrativa Experimental:</strong> Estructura no lineal que refleja la fragmentación digital</li>
        <li><strong>Diseño Visual:</strong> Colaboración con artistas digitales para crear mundos visuales únicos</li>
        <li><strong>Banda Sonora:</strong> Composición original de Alberto Iglesias mezclada con sonidos sintéticos</li>
        <li><strong>Actuaciones:</strong> Tilda Swinton en un tour de force interpretativo de 90 minutos</li>
        <li><strong>Fotografía:</strong> Uso revolucionario de cámaras virtuales y realidad aumentada</li>
      </ul>
      
      <blockquote>
        <p>"No estoy haciendo una película sobre la tecnología, sino sobre cómo la tecnología nos está cambiando como seres humanos. Es una reflexión sobre la soledad conectada de nuestra época." - Pedro Almodóvar</p>
      </blockquote>
      
      <h2>🌟 Competencia Excepcional</h2>
      
      <p>La competencia oficial de Cannes 2024 presenta un nivel de calidad excepcional, con directores consagrados y nuevos talentos compitiendo por el máximo galardón del festival.</p>
      
      <h3>Películas Destacadas en Competencia:</h3>
      
      <ul>
        <li><strong>Denis Villeneuve (Canadá):</strong> "Dune: Mesías" - La esperada secuela épica</li>
        <li><strong>Chloé Zhao (China/USA):</strong> "Nomadland 2: The Return" - Continuación de su obra maestra</li>
        <li><strong>Bong Joon-ho (Corea del Sur):</strong> "Mickey 17" - Thriller de ciencia ficción con Robert Pattinson</li>
        <li><strong>Céline Sciamma (Francia):</strong> "Tomboy Revisited" - Drama coming-of-age</li>
        <li><strong>Ari Aster (USA):</strong> "Disappointment Blvd." - Horror psicológico con Joaquin Phoenix</li>
      </ul>
      
      <h2>🏆 Pronósticos y Expectativas</h2>
      
      <p>Los críticos especializados han comenzado a especular sobre los posibles ganadores. Almodóvar, que ya ganó la Palma de Oro en 1999 con "Todo Sobre Mi Madre", parte como uno de los favoritos junto a Villeneuve y Bong Joon-ho.</p>
      
      <h3>Análisis de Expectativas:</h3>
      
      <ul>
        <li><strong>Almodóvar:</strong> 25% - Favorito por trayectoria y temática actual</li>
        <li><strong>Villeneuve:</strong> 20% - "Dune" fue muy bien recibida anteriormente</li>
        <li><strong>Bong Joon-ho:</strong> 18% - El éxito de "Parasites" sigue pesando</li>
        <li><strong>Zhao:</strong> 15% - Directora en ascenso con visión única</li>
        <li><strong>Otros:</strong> 22% - El festival siempre reserva sorpresas</li>
      </ul>
      
      <h2>🎭 Impacto Cultural y Comercial</h2>
      
      <p>Más allá de los premios, Cannes 2024 se perfila como un evento crucial para la industria cinematográfica. En un momento donde las plataformas digitales dominan el consumo de contenido, el festival reafirma la importancia del cine de autor y la experiencia cinematográfica colectiva.</p>
      
      <p>Las ventas internacionales ya muestran números record, con distribuidores pujando agresivamente por los derechos de las películas más destacadas. "La Voz Humana Extendida" ya tiene compradores confirmados en 15 países antes incluso de su estreno mundial.</p>
      
      <h2>📅 Calendario de Premiación</h2>
      
      <p>La ceremonia de clausura y entrega de premios está programada para el 25 de mayo, con una gala que promete ser una de las más memorables de los últimos años. La presencia confirmada de estrellas internacionales y el regreso de la alfombra roja a su máximo esplendor marcan el retorno definitivo de Cannes tras años de limitaciones.</p>
    `,
    category: "entretenimiento",
    author: "Isabella Ruiz",
    authorBio:
      "Crítica de cine especializada en festivales internacionales. Corresponsal en Cannes desde 2015 y autora de 'El Cine de Autor en la Era Digital'.",
    authorAvatar: "IR",
    publishedAt: "2024-01-06",
    imageUrl:
      "https://images.unsplash.com/photo-1489599485607-39ef5d6003e6?w=800&h=400&fit=crop",
    imageCaption:
      "Pedro Almodóvar durante la presentación de 'La Voz Humana Extendida' en la conferencia de prensa oficial de Cannes 2024.",
    readTime: 4,
    views: 28900,
    likes: 423,
    featured: false,
    trending: false,
    tags: ["cine", "cannes", "almodóvar"],
    metaDescription:
      "Cobertura completa de la participación de Pedro Almodóvar en Cannes 2024 con 'La Voz Humana Extendida' y análisis de la competencia por la Palma de Oro.",
    metaKeywords: [
      "Cannes 2024",
      "Pedro Almodóvar",
      "Palma de Oro",
      "festival cine",
      "Tilda Swinton",
    ],
  },
  {
    id: "11",
    title: "Guía de Viaje 2024: Los 10 Destinos Más Sostenibles del Mundo",
    excerpt:
      "Descubre lugares increíbles que priorizan el turismo responsable y la conservación ambiental.",
    content: `
      <p>El turismo sostenible ha evolucionado de ser una tendencia nicho a convertirse en el estándar de oro para los viajeros conscientes de 2024. Con el <strong>72% de los viajeros</strong> priorizando destinos eco-friendly, hemos seleccionado los 10 lugares que mejor combinan experiencias extraordinarias con prácticas ambientales responsables.</p>
      
      <h2>🌍 Criterios de Sostenibilidad</h2>
      
      <p>Nuestro ranking considera múltiples factores que van más allá del simple marketing verde, evaluando el impacto real en las comunidades locales y el medio ambiente.</p>
      
      <h3>Factores Evaluados:</h3>
      
      <ul>
        <li><strong>Conservación Ambiental:</strong> Protección de ecosistemas y biodiversidad</li>
        <li><strong>Impacto Comunitario:</strong> Beneficios económicos para poblaciones locales</li>
        <li><strong>Gestión de Residuos:</strong> Sistemas circulares y cero residuos</li>
        <li><strong>Energía Renovable:</strong> Porcentaje de energía limpia utilizada</li>
        <li><strong>Transporte Sostenible:</strong> Opciones de movilidad con bajo impacto</li>
        <li><strong>Certificaciones:</strong> Reconocimientos internacionales de sostenibilidad</li>
      </ul>
      
      <h2>🏆 Top 10 Destinos Sostenibles</h2>
      
      <h3>1. Costa Rica - El Pionero de la Sostenibilidad</h3>
      <p>Con el <strong>99% de su energía</strong> proveniente de fuentes renovables y el 25% de su territorio protegido, Costa Rica lidera en turismo sostenible. Sus lodges eco-friendly en Manuel Antonio y Monteverde ofrecen experiencias inmersivas sin comprometer el ecosistema.</p>
      
      <h3>2. Noruega - Tecnología Verde en la Naturaleza</h3>
      <p>Los fiordos noruegos combinan belleza natural con innovación tecnológica. El 100% de los ferries turísticos son eléctricos, y los hoteles utilizan energía hidroeléctrica renovable. Los avistamientos de auroras boreales se realizan con mínimo impacto lumínico.</p>
      
      <h3>3. Bhután - Carbono Negativo y Felicidad Nacional</h3>
      <p>El único país carbono-negativo del mundo ofrece turismo de "alto valor, bajo impacto". Con cuotas estrictas de visitantes y una tasa de turismo sostenible, Bhután preserva su cultura mientras genera ingresos responsables.</p>
      
      <blockquote>
        <p>"El turismo sostenible no es sobre limitaciones, sino sobre crear experiencias más profundas y significativas que beneficien tanto al viajero como al destino." - Dr. Taleb Rifai, ex-Secretario General de la OMT</p>
      </blockquote>
      
      <h3>4. Nueva Zelanda - Regeneración Activa</h3>
      <p>El programa "Tiaki Promise" compromete a visitantes con la conservación activa. Los turistas pueden participar en proyectos de reforestación y conservación marina mientras disfrutan de paisajes únicos.</p>
      
      <h3>5. Islandia - Energía Geotérmica y Turismo Responsable</h3>
      <p>El 100% de la energía proviene de fuentes renovables (geotérmica e hidroeléctrica). Los tours a glaciares incluyen educación sobre cambio climático y los hoteles utilizan sistemas de calefacción geotérmica.</p>
      
      <h2>🌱 Tendencias Emergentes</h2>
      
      <p>El turismo sostenible está evolucionando hacia conceptos más avanzados:</p>
      
      <h3>Turismo Regenerativo:</h3>
      <ul>
        <li><strong>Restauración Activa:</strong> Viajes que mejoran el destino</li>
        <li><strong>Volunturismo Científico:</strong> Participación en investigación</li>
        <li><strong>Compensación Local:</strong> Proyectos de impacto directo</li>
      </ul>
      
      <h3>Tecnología Verde:</h3>
      <ul>
        <li><strong>Apps de Huella de Carbono:</strong> Tracking en tiempo real</li>
        <li><strong>Blockchain para Transparencia:</strong> Verificación de prácticas sostenibles</li>
        <li><strong>IA para Optimización:</strong> Rutas eficientes y gestión de flujos</li>
      </ul>
      
      <h2>✈️ Cómo Viajar de Forma Sostenible</h2>
      
      <p>Independientemente del destino, existen prácticas que todo viajero consciente puede adoptar:</p>
      
      <ul>
        <li><strong>Planificación:</strong> Estancias más largas para reducir vuelos</li>
        <li><strong>Alojamiento:</strong> Hoteles con certificaciones verdes verificadas</li>
        <li><strong>Transporte Local:</strong> Priorizar opciones públicas y activas</li>
        <li><strong>Consumo:</strong> Productos locales y artesanías auténticas</li>
        <li><strong>Respeto Cultural:</strong> Educación previa sobre costumbres locales</li>
      </ul>
      
      <h2>📊 Impacto del Turismo Sostenible</h2>
      
      <p>Los destinos que han adoptado modelos sostenibles muestran resultados impresionantes:</p>
      
      <ul>
        <li><strong>Ingresos:</strong> 23% mayor gasto promedio por turista</li>
        <li><strong>Satisfacción:</strong> 89% de viajeros reportan experiencias más memorables</li>
        <li><strong>Retorno:</strong> 67% mayor probabilidad de visitas repetidas</li>
        <li><strong>Conservación:</strong> 40% mejora en indicadores ambientales</li>
      </ul>
      
      <p>El futuro del turismo es sostenible, y los destinos que abrazan esta filosofía no solo preservan su belleza natural y cultural, sino que la potencian para las generaciones futuras.</p>
    `,
    category: "estilo-de-vida",
    author: "Diego Herrera",
    authorBio:
      "Experto en turismo sostenible y consultor de la OMT. Ha visitado más de 80 países evaluando prácticas de turismo responsable y regenerativo.",
    authorAvatar: "DH",
    publishedAt: "2024-01-05",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    imageCaption:
      "Los fiordos noruegos representan el equilibrio perfecto entre turismo de alta calidad y sostenibilidad ambiental.",
    readTime: 9,
    views: 19800,
    likes: 345,
    featured: false,
    trending: true,
    tags: ["viajes", "sostenibilidad", "turismo"],
    metaDescription:
      "Guía completa de los destinos más sostenibles de 2024: países que combinan experiencias increíbles con prácticas ambientales responsables.",
    metaKeywords: [
      "turismo sostenible",
      "viajes ecológicos",
      "destinos verdes",
      "turismo responsable",
      "viajes conscientes",
    ],
  },
  {
    id: "12",
    title: "Crisis Energética Global: Europa Busca Alternativas al Gas Ruso",
    excerpt:
      "Análisis de las estrategias europeas para diversificar sus fuentes de energía ante la crisis geopolítica.",
    content: `
      <p>La crisis energética que atraviesa Europa ha acelerado una transformación sin precedentes en la matriz energética continental. Con la reducción drástica de las importaciones de gas ruso, los países europeos han implementado estrategias emergentes que van desde alianzas energéticas innovadoras hasta una aceleración masiva de la transición hacia energías renovables.</p>
      
      <h2>⚡ La Nueva Realidad Energética</h2>
      
      <p>En menos de dos años, Europa ha reducido su dependencia del gas ruso del <strong>45% al 8%</strong>, un logro considerado imposible por muchos analistas. Esta transformación ha requerido medidas excepcionales y ha redefinido el panorama energético global.</p>
      
      <h3>Datos Clave de la Transición:</h3>
      
      <ul>
        <li><strong>Reducción de Dependencia:</strong> Del 155 bcm en 2021 a 12 bcm en 2024</li>
        <li><strong>Nuevos Proveedores:</strong> Noruega (+40%), Estados Unidos (+60%), Qatar (+80%)</li>
        <li><strong>Capacidad de GNL:</strong> Incremento del 250% en terminales de regasificación</li>
        <li><strong>Energías Renovables:</strong> Crecimiento del 35% en capacidad instalada</li>
        <li><strong>Eficiencia Energética:</strong> Reducción del 15% en consumo total</li>
      </ul>
      
      <blockquote>
        <p>"Esta crisis nos ha obligado a acelerar una transición que era inevitable. Europa emerge más fuerte, más independiente y más sostenible." - Ursula von der Leyen, Presidenta de la Comisión Europea</p>
      </blockquote>
      
      <h2>🌍 Estrategias Nacionales Diferenciadas</h2>
      
      <p>Cada país europeo ha desarrollado estrategias específicas basadas en sus recursos naturales, ubicación geográfica y capacidades industriales:</p>
      
      <h3>Alemania - El Gigante en Transición:</h3>
      <ul>
        <li><strong>Energiewende Acelerado:</strong> €200 mil millones en energías renovables</li>
        <li><strong>Hidrógeno Verde:</strong> 40GW de capacidad de electrólisis para 2030</li>
        <li><strong>GNL Estratégico:</strong> 5 nuevas terminales operativas en tiempo récord</li>
        <li><strong>Eficiencia Industrial:</strong> Reconversión de procesos energo-intensivos</li>
      </ul>
      
      <h3>Francia - Nuclear y Renovables:</h3>
      <ul>
        <li><strong>Renacimiento Nuclear:</strong> 6 nuevos reactores EPR en construcción</li>
        <li><strong>Energía Eólica Marina:</strong> 15GW de capacidad offshore para 2030</li>
        <li><strong>Interconexiones:</strong> Refuerzo de conexiones con Reino Unido y España</li>
      </ul>
      
      <h3>España - Hub Energético del Sur:</h3>
      <ul>
        <li><strong>Corredor Mediterráneo:</strong> Proyecto H2Med para transporte de hidrógeno</li>
        <li><strong>Solar Fotovoltaica:</strong> 20GW adicionales en los próximos 3 años</li>
        <li><strong>Almacenamiento:</strong> Mayor capacidad de baterías de Europa para 2025</li>
      </ul>
      
      <h2>💰 Impacto Económico y Social</h2>
      
      <p>La transición energética ha tenido efectos profundos en la economía y sociedad europeas, creando tanto oportunidades como desafíos:</p>
      
      <h3>Efectos Positivos:</h3>
      
      <ul>
        <li><strong>Empleo Verde:</strong> 2.4 millones de nuevos trabajos en sector renovable</li>
        <li><strong>Innovación Tecnológica:</strong> €150 mil millones en I+D energético</li>
        <li><strong>Independencia Estratégica:</strong> Reducción de vulnerabilidades geopolíticas</li>
        <li><strong>Liderazgo Global:</strong> Europa como referente en transición energética</li>
      </ul>
      
      <h3>Desafíos Persistentes:</h3>
      
      <ul>
        <li><strong>Costos de Transición:</strong> Aumento temporal de precios energéticos</li>
        <li><strong>Pobreza Energética:</strong> 15% de hogares en situación vulnerable</li>
        <li><strong>Competitividad Industrial:</strong> Presión sobre sectores energo-intensivos</li>
        <li><strong>Infraestructura:</strong> Necesidad de modernización masiva de redes</li>
      </ul>
      
      <h2>🔮 Escenarios Futuros</h2>
      
      <p>Los analistas energéticos contemplan tres escenarios principales para Europa en los próximos cinco años:</p>
      
      <h3>Escenario Optimista (40% probabilidad):</h3>
      <p>Autonomía energética del 80% para 2030, precios estables, liderazgo tecnológico global en energías limpias.</p>
      
      <h3>Escenario Base (45% probabilidad):</h3>
      <p>Diversificación exitosa con autonomía del 65%, algunos desafíos de integración, competitividad recuperada gradualmente.</p>
      
      <h3>Escenario Pesimista (15% probabilidad):</h3>
      <p>Problemas de suministro recurrentes, alta volatilidad de precios, pérdida de competitividad industrial.</p>
      
      <h2>🌱 Lecciones para el Mundo</h2>
      
      <p>La experiencia europea está siendo estudiada globalmente como modelo de respuesta a crisis energéticas. Países como Japón, Corea del Sur y Australia han adoptado elementos del "modelo europeo" para acelerar sus propias transiciones energéticas.</p>
      
      <p>La crisis que parecía una catástrofe se ha convertido en catalizador de la mayor transformación energética de la historia, demostrando que la necesidad y la voluntad política pueden acelerar cambios que parecían imposibles.</p>
    `,
    category: "sociedad",
    author: "Fernando Castro",
    authorBio:
      "Analista de política energética europea con 20 años de experiencia. Ex-asesor de la Agencia Internacional de Energía y consultor para gobiernos europeos.",
    authorAvatar: "FC",
    publishedAt: "2024-01-04",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop",
    imageCaption:
      "Parque eólico offshore en el Mar del Norte, símbolo de la nueva estrategia energética europea hacia la independencia y sostenibilidad.",
    readTime: 11,
    views: 56700,
    likes: 789,
    featured: false,
    trending: true,
    tags: ["energía", "europa", "geopolítica"],
    metaDescription:
      "Análisis profundo de la crisis energética europea y las estrategias de diversificación que están redefiniendo el panorama energético continental.",
    metaKeywords: [
      "crisis energética Europa",
      "gas ruso alternativas",
      "transición energética",
      "independencia energética",
      "renovables Europa",
    ],
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

export const mockComments: Comment[] = [
  // Comments for Article 1 (Sports Technology)
  {
    id: "c1-1",
    articleId: "1",
    author: "Carlos Mendoza",
    content:
      "Excelente artículo. Muy bien explicado el impacto de estas tecnologías en el deporte moderno. ¿Sabéis cuándo llegará el 5G al Wanda Metropolitano?",
    timestamp: "Hace 2 horas",
    likes: 12,
    verified: false,
  },
  {
    id: "c1-2",
    articleId: "1",
    author: "Miguel Santos",
    content:
      "Me parece increíble cómo la tecnología está transformando la experiencia en los estadios. El año pasado estuve en el Camp Nou y ya se nota la diferencia con las aplicaciones.",
    timestamp: "Hace 3 horas",
    likes: 8,
    verified: false,
  },
  {
    id: "c1-3",
    articleId: "1",
    author: "Ana García",
    content:
      "Como desarrolladora que trabaja en sport-tech, puedo confirmar que esto es solo el comienzo. La IA va a revolucionar completamente cómo entendemos el deporte.",
    timestamp: "Hace 5 horas",
    likes: 15,
    verified: true,
  },
  {
    id: "c1-4",
    articleId: "1",
    author: "Roberto Fernández",
    content:
      "¡Fascinante! Me encanta ver cómo la tecnología mejora la experiencia del aficionado. ¿Creéis que esto llegará también a estadios de Segunda División?",
    timestamp: "Hace 6 horas",
    likes: 6,
    verified: false,
  },

  // Comments for Article 2 (AI Business)
  {
    id: "c2-1",
    articleId: "2",
    author: "Laura Martín",
    content:
      "En nuestra empresa implementamos IA hace 6 meses y los resultados han sido espectaculares. La productividad aumentó un 40% tal como menciona el artículo.",
    timestamp: "Hace 1 hora",
    likes: 23,
    verified: true,
  },
  {
    id: "c2-2",
    articleId: "2",
    author: "David Chen",
    content:
      "Como CEO de una startup, puedo confirmar que la IA es fundamental. Sin embargo, hay que tener cuidado con la implementación y la formación del equipo.",
    timestamp: "Hace 4 horas",
    likes: 18,
    verified: true,
  },
  {
    id: "c2-3",
    articleId: "2",
    author: "Sandra López",
    content:
      "Muy buen análisis sobre el ROI. ¿Podrías hacer un artículo específico sobre qué tipo de IA implementar según el tamaño de la empresa?",
    timestamp: "Hace 7 horas",
    likes: 11,
    verified: false,
  },

  // Comments for Article 3 (Alzheimer Research)
  {
    id: "c3-1",
    articleId: "3",
    author: "Dr. Elena Vega",
    content:
      "Como neuróloga, estoy muy emocionada con estos avances. Los resultados de los ensayos son realmente prometedores. ¿Cuándo comenzarán los ensayos en España?",
    timestamp: "Hace 30 minutos",
    likes: 34,
    verified: true,
  },
  {
    id: "c3-2",
    articleId: "3",
    author: "Carmen Ruiz",
    content:
      "Mi padre sufre de Alzheimer y esto nos da mucha esperanza. Gracias por explicarlo de manera tan clara y accesible.",
    timestamp: "Hace 2 horas",
    likes: 28,
    verified: false,
  },
  {
    id: "c3-3",
    articleId: "3",
    author: "Jorge Navarro",
    content:
      "Increíble avance científico. ¿Sabéis si esta terapia también podría funcionar para otras enfermedades neurodegenerativas como el Parkinson?",
    timestamp: "Hace 5 horas",
    likes: 14,
    verified: false,
  },

  // Comments for Article 4 (Netflix Strategy)
  {
    id: "c4-1",
    articleId: "4",
    author: "Marta Silva",
    content:
      "Me parece genial que Netflix apueste por contenido local. Las series españolas están teniendo mucho éxito internacional.",
    timestamp: "Hace 1 hora",
    likes: 16,
    verified: false,
  },
  {
    id: "c4-2",
    articleId: "4",
    author: "Pablo Herrera",
    content:
      "La realidad virtual en series suena increíble. ¿Cuándo podremos probarlo? ¿Necesitaremos equipos especiales?",
    timestamp: "Hace 3 horas",
    likes: 9,
    verified: false,
  },
  {
    id: "c4-3",
    articleId: "4",
    author: "Isabella Torres",
    content:
      "Como productora audiovisual, veo que la competencia está forzando a todas las plataformas a innovar. Excelente análisis del mercado.",
    timestamp: "Hace 6 horas",
    likes: 12,
    verified: true,
  },

  // Comments for Article 5 (Wellness Trends)
  {
    id: "c5-1",
    articleId: "5",
    author: "Sofía Morales",
    content:
      "Practico mindfulness digital desde el año pasado y la diferencia es notable. Recomiendo empezar poco a poco con desconexiones de 2 horas.",
    timestamp: "Hace 45 minutos",
    likes: 21,
    verified: false,
  },
  {
    id: "c5-2",
    articleId: "5",
    author: "Diego Castillo",
    content:
      "Me encanta el concepto de 'círculos de bienestar'. ¿Hay alguna manera de encontrar comunidades así en Madrid?",
    timestamp: "Hace 2 horas",
    likes: 13,
    verified: false,
  },
  {
    id: "c5-3",
    articleId: "5",
    author: "Andrea Molina",
    content:
      "Como coach de bienestar, confirmo que la demanda de este tipo de servicios ha crecido exponencialmente. La gente busca equilibrio real.",
    timestamp: "Hace 4 horas",
    likes: 17,
    verified: true,
  },

  // Comments for Article 6 (Politics/Economics)
  {
    id: "c6-1",
    articleId: "6",
    author: "Fernando Costa",
    content:
      "Análisis muy equilibrado de las propuestas. Me ayuda a entender mejor las diferencias entre candidatos desde una perspectiva económica.",
    timestamp: "Hace 1 hora",
    likes: 31,
    verified: false,
  },
  {
    id: "c6-2",
    articleId: "6",
    author: "Patricia Jiménez",
    content:
      "Como economista, aprecio que se incluyan datos concretos y proyecciones realistas. Falta mencionar el impacto en las PYMES.",
    timestamp: "Hace 3 horas",
    likes: 24,
    verified: true,
  },
  {
    id: "c6-3",
    articleId: "6",
    author: "Ricardo Valdez",
    content:
      "¿Podrías hacer un análisis similar sobre las propuestas de política exterior? Me interesa ver cómo afectarían al comercio internacional.",
    timestamp: "Hace 5 horas",
    likes: 19,
    verified: false,
  },

  // Comments for Article 7 (Barcelona Champions)
  {
    id: "c7-1",
    articleId: "7",
    author: "Marc Puig",
    content:
      "¡Qué noche más increíble! Estuve en el Camp Nou y la atmósfera era única. Pedri jugó como un veterano de 30 años.",
    timestamp: "Hace 30 minutos",
    likes: 45,
    verified: false,
  },
  {
    id: "c7-2",
    articleId: "7",
    author: "Carla Sánchez",
    content:
      "Como periodista deportiva, debo decir que fue una de las remontadas más épicas que he visto. Las estadísticas no mienten: dominación total.",
    timestamp: "Hace 2 horas",
    likes: 38,
    verified: true,
  },
  {
    id: "c7-3",
    articleId: "7",
    author: "Jordi Ramos",
    content:
      "Lewandowski demostró por qué es uno de los mejores delanteros del mundo. Ese primer gol cambió todo el partido.",
    timestamp: "Hace 4 horas",
    likes: 22,
    verified: false,
  },

  // Comments for Article 8 (SpaceX Mars)
  {
    id: "c8-1",
    articleId: "8",
    author: "Dr. Alberto Ruiz",
    content:
      "Como astrofísico, este momento histórico me emociona profundamente. La humanidad acaba de dar el paso más importante hacia convertirnos en una especie multiplanetaria.",
    timestamp: "Hace 15 minutos",
    likes: 67,
    verified: true,
  },
  {
    id: "c8-2",
    articleId: "8",
    author: "María Fernández",
    content:
      "¡Increíble! Mi hija de 8 años vio el aterrizaje en directo y ahora quiere ser astronauta. Momentos así inspiran a las nuevas generaciones.",
    timestamp: "Hace 1 hora",
    likes: 42,
    verified: false,
  },
  {
    id: "c8-3",
    articleId: "8",
    author: "Carlos Mendoza",
    content:
      "Los datos sobre la Base Alpha son fascinantes. ¿Cómo van a manejar las tormentas de polvo marcianas? ¿Está previsto en el diseño?",
    timestamp: "Hace 3 horas",
    likes: 29,
    verified: false,
  },

  // Comments for Article 9 (iPhone 16 Pro)
  {
    id: "c9-1",
    articleId: "9",
    author: "Alejandro Tech",
    content:
      "Apple Intelligence suena prometedor, pero espero que realmente funcione de forma local como prometen. La privacidad es fundamental.",
    timestamp: "Hace 1 hora",
    likes: 33,
    verified: true,
  },
  {
    id: "c9-2",
    articleId: "9",
    author: "Natalia Gómez",
    content:
      "Como fotógrafa profesional, las mejoras en la cámara me tienen muy intrigada. Si realmente rivalizan con equipos profesionales, será un game changer.",
    timestamp: "Hace 2 horas",
    likes: 27,
    verified: true,
  },
  {
    id: "c9-3",
    articleId: "9",
    author: "Rubén Martín",
    content:
      "Los precios se mantienen igual que el año pasado, eso está bien. Pero con tanta competencia, Apple necesita innovar más allá del hardware.",
    timestamp: "Hace 4 horas",
    likes: 18,
    verified: false,
  },

  // Comments for Article 10 (Cannes Almodóvar)
  {
    id: "c10-1",
    articleId: "10",
    author: "Luisa Herrero",
    content:
      "Almodóvar siempre consigue sorprender. El tema de la soledad conectada es muy actual y necesario. Espero que gane la Palma de Oro.",
    timestamp: "Hace 2 horas",
    likes: 25,
    verified: false,
  },
  {
    id: "c10-2",
    articleId: "10",
    author: "Pablo Cinematográfico",
    content:
      "Como crítico de cine, creo que esta película podría ser la obra maestra de Almodóvar. La colaboración con Tilda Swinton promete mucho.",
    timestamp: "Hace 4 horas",
    likes: 31,
    verified: true,
  },
  {
    id: "c10-3",
    articleId: "10",
    author: "Cristina Velasco",
    content:
      "La competencia está muy reñida este año en Cannes. Villeneuve y Bong Joon-ho también tienen películas muy fuertes.",
    timestamp: "Hace 6 horas",
    likes: 14,
    verified: false,
  },

  // Comments for Article 11 (Sustainable Travel)
  {
    id: "c11-1",
    articleId: "11",
    author: "Elena Viajera",
    content:
      "Acabo de regresar de Costa Rica siguiendo principios de turismo sostenible. La experiencia fue mucho más enriquecedora que un viaje tradicional.",
    timestamp: "Hace 1 hora",
    likes: 19,
    verified: false,
  },
  {
    id: "c11-2",
    articleId: "11",
    author: "Marcos Eco",
    content:
      "Como guía de turismo sostenible, agradezco que se difunda esta información. El turismo regenerativo es el futuro del sector.",
    timestamp: "Hace 3 horas",
    likes: 22,
    verified: true,
  },
  {
    id: "c11-3",
    articleId: "11",
    author: "Carmen Aventura",
    content:
      "¿Podrías recomendar agencias especializadas en turismo sostenible? Me interesa Bhután pero no sé cómo organizarlo responsablemente.",
    timestamp: "Hace 5 horas",
    likes: 16,
    verified: false,
  },

  // Comments for Article 12 (Energy Crisis)
  {
    id: "c12-1",
    articleId: "12",
    author: "Ingeniero Verde",
    content:
      "Trabajo en el sector energético y puedo confirmar que la transformación ha sido increíble. En 18 meses hemos logrado lo que parecía imposible.",
    timestamp: "Hace 45 minutos",
    likes: 41,
    verified: true,
  },
  {
    id: "c12-2",
    articleId: "12",
    author: "Teresa Renovable",
    content:
      "Como investigadora en energías renovables, me emociona ver cómo la crisis se ha convertido en oportunidad. Europa lidera la transición mundial.",
    timestamp: "Hace 2 horas",
    likes: 35,
    verified: true,
  },
  {
    id: "c12-3",
    articleId: "12",
    author: "Antonio Economista",
    content:
      "El análisis económico es muy completo. ¿Cómo veis el impacto a largo plazo en la competitividad industrial europea?",
    timestamp: "Hace 4 horas",
    likes: 26,
    verified: false,
  },
];

// Helper function to get comments for a specific article
export const getCommentsForArticle = (articleId: string): Comment[] => {
  return mockComments.filter((comment) => comment.articleId === articleId);
};
