export interface Board {
  id: string;
  number: string;
  name: string;
  category: string;
  slug: string;
  description: string;
  waveType: string;
  level: string;
  sizes: string;
  volume: string;
  fins: string;
  tail: string;
  rocker: string;
  price: number;
  tags: string[];
  /** Pico de surf de Florianópolis associado ao modelo (usado no detalhe do card). */
  spot: string;
  coordinates: string;
  mainImage: string;
  thumbImage: string;
  /** Fotos adicionais para exibir como álbum (a primeira imagem é a mainImage). */
  gallery?: string[];
  whatsappMessage: string;
  bgWord: string;
}

export const boards: Board[] = [
  {
    id: "fish",
    number: "01",
    name: "Dark Rabbit",
    category: "Fish",
    slug: "fish",
    description: "A Dark Rabbit é o modelo de alta performance da marca, desenvolvido para surfistas que buscam extrair o máximo do seu surf. Desenvolvida com base nos conceitos mais atuais de design de pranchas, ela reúne linhas refinadas, equilíbrio e precisão para oferecer resposta rápida, velocidade e controle em condições de alto desempenho. Cada detalhe foi pensado para potencializar o surf, transformando conhecimento, experiência e tecnologia em uma prancha capaz de acompanhar os surfistas mais exigentes.",
    waveType: "Pequenas a Médias",
    level: "Intermediário",
    sizes: "5'4\" — 6'0\"",
    volume: "32 — 42 L",
    fins: "Twin / Quad",
    tail: "Fish / Swallow",
    rocker: "Flat / Baixo",
    price: 2490,
    tags: ["Pequenas a Médias", "Intermediário", "Velocidade", "Flow"],
    spot: "Joaquina",
    coordinates: "27°37'S / 48°27'W",
    mainImage: "/boards/dark-rabbit/dark-rabbit.png",
    thumbImage: "/boards/dark-rabbit/dark-rabbit-thumb.webp",
    gallery: [
      "/boards/dark-rabbit/dark-rabbit.png",
      "/boards/dark-rabbit/dark-rabbit-1.jpg",
      "/boards/dark-rabbit/dark-rabbit-2.jpg",
      "/boards/dark-rabbit/dark-rabbit-3.jpg",
      "/boards/dark-rabbit/dark-rabbit-4.jpg",
    ],
    whatsappMessage: "Olá, tenho interesse no modelo Fish (Dark Rabbit) da JP Surf Boards.",
    bgWord: "FISH"
  },
  {
    id: "step-up",
    number: "02",
    name: "Black Buffalo",
    category: "Step Up",
    slug: "step-up",
    description: "A Black Buffalo vem conquistando nossos clientes cada vez mais. Com um rocker mais suave, um fundo single to double finalizando com um V-bottom, ela é rápida e muito direcionável. O outline mais parabólico traz muita remada e conforto. Resumindo, é uma ótima opção para o surf do dia a dia, agradando surfistas de todos os níveis.",
    waveType: "Grandes e Pesadas",
    level: "Avançado",
    sizes: "6'4\" — 7'0\"",
    volume: "34 — 45 L",
    fins: "Tri-fin / Quad (FCS II)",
    tail: "Pin / Round Pin",
    rocker: "Acentuado",
    price: 2490,
    tags: ["Grandes e Pesadas", "Avançado", "Potência / Controle"],
    spot: "Praia do Santinho",
    coordinates: "27°28'S / 48°22'W",
    mainImage: "/boards/black-buffalo/black-buffalo.png",
    thumbImage: "/boards/black-buffalo/black-buffalo-thumb.webp",
    gallery: [
      "/boards/black-buffalo/black-buffalo.png",
      "/boards/black-buffalo/black-buffalo-1.jpg",
      "/boards/black-buffalo/black-buffalo-2.jpg",
      "/boards/black-buffalo/black-buffalo-3.jpg",
      "/boards/black-buffalo/black-buffalo-4.jpg",
    ],
    whatsappMessage: "Olá, tenho interesse no modelo Step Up (Black Buffalo) da JP Surf Boards.",
    bgWord: "STEP"
  },
  {
    id: "bus-driver",
    number: "03",
    name: "Bus Driver",
    category: "Daily Driver",
    slug: "bus-driver",
    description: "A Bus Driver foi criada para fazer das ondas pequenas grandes sessões. Um modelo que une velocidade, fluidez e diversão, pensado para extrair o máximo das marolas sem abrir mão da performance. Uma prancha versátil, intuitiva e pronta para colocar um sorriso no rosto em qualquer condição.",
    waveType: "Pequenas a Médias",
    level: "Intermediário / Avançado",
    sizes: "5'8\" — 6'2\"",
    volume: "27 — 35 L",
    fins: "Tri-fin (FCS II / Futures)",
    tail: "Squash / Round",
    rocker: "Moderado",
    price: 2490,
    tags: ["Pequenas a Médias", "Intermediário", "Avançado", "Daily Driver"],
    spot: "Barra da Lagoa",
    coordinates: "27°34'S / 48°25'W",
    mainImage: "/boards/bus-driver/bus-driver.png",
    thumbImage: "/boards/bus-driver/bus-driver-thumb.webp",
    gallery: [
      "/boards/bus-driver/bus-driver.png",
      "/boards/bus-driver/bus-driver-1.jpg",
      "/boards/bus-driver/bus-driver-2.jpg",
    ],
    whatsappMessage: "Olá, tenho interesse no modelo Bus Driver da JP Surf Boards.",
    bgWord: "BUS"
  },
  {
    id: "custom",
    number: "04",
    name: "Phantom Shark",
    category: "Heavy Water",
    slug: "custom",
    description: "A Phantom Shark foi desenvolvida para quem busca uma abordagem diferente dentro do surf de alta performance. Com um design que foge dos padrões tradicionais, ela combina excelente capacidade de remada, muita velocidade e um surf extremamente confortável. Geralmente utilizada na configuração quadriquilha, é um modelo versátil que entrega confiança e diversão para surfistas de todos os níveis, sem abrir mão da performance.",
    waveType: "Grandes e Perigosas",
    level: "Avançado / Expert",
    sizes: "7'0\" — 8'0\"",
    volume: "42 — 58 L",
    fins: "Tri-fin (FCS II / Futures)",
    tail: "Pin Tail",
    rocker: "Extremo",
    price: 2490,
    tags: ["Grandes e Perigosas", "Expert", "Gun", "Tubo"],
    spot: "Lagoinha do Leste",
    coordinates: "27°46'S / 48°31'W",
    mainImage: "/boards/phantom-shark/phantom-shark.png",
    thumbImage: "/boards/phantom-shark/phantom-shark-thumb.webp",
    gallery: [
      "/boards/phantom-shark/phantom-shark.png",
      "/boards/phantom-shark/phantom-shark-1.jpg",
      "/boards/phantom-shark/phantom-shark-2.jpg",
    ],
    whatsappMessage: "Olá, tenho interesse no modelo Heavy Water (Phantom Shark) da JP Surf Boards.",
    bgWord: "GUN"
  },
  {
    id: "longboard",
    number: "05",
    name: "Skeletton Bird",
    category: "Longboard",
    slug: "longboard",
    description: "A Skeletton Bird nasceu inspirada na Dark Rabbit, trazendo o DNA da alta performance em uma proposta mais acessível e versátil. Desenvolvida para surfistas em evolução, do nível intermediário ao avançado, ou para quem busca manter um surf de performance com mais conforto, ela oferece excelente remada, facilidade na entrada das ondas e uma resposta consistente. Um modelo que equilibra performance e usabilidade, permitindo evoluir sem abrir mão da confiança em cada sessão.",
    waveType: "Suaves a Médias",
    level: "Todos os Níveis",
    sizes: "9'0\" — 9'6\"",
    volume: "70 — 90 L",
    fins: "Single Fin + Side Bites",
    tail: "Round / Pintail",
    rocker: "Clássico / Suave",
    price: 2490,
    tags: ["Suaves a Médias", "Todos os Níveis", "Noseriding", "Estilo Clássico"],
    spot: "Praia do Campeche",
    coordinates: "27°40'S / 48°28'W",
    mainImage: "/boards/skeletton-bird/skeletton-bird.png",
    thumbImage: "/boards/skeletton-bird/skeletton-bird-thumb.webp",
    gallery: [
      "/boards/skeletton-bird/skeletton-bird.png",
      "/boards/skeletton-bird/skeletton-bird-1.jpg",
      "/boards/skeletton-bird/skeletton-bird-2.jpg",
      "/boards/skeletton-bird/skeletton-bird-3.jpg",
      "/boards/skeletton-bird/skeletton-bird-4.jpg",
    ],
    whatsappMessage: "Olá, tenho interesse no modelo Longboard (Skeletton Bird) da JP Surf Boards.",
    bgWord: "LONG"
  },
  {
    id: "performance",
    number: "06",
    name: "Double Viper",
    category: "Biquilha Performance",
    slug: "performance",
    description: "A Double Viper é uma biquilha desenvolvida para unir velocidade e performance. Seu rocker moderado favorece a aceleração, enquanto o fundo — com transição de single concave para double concave, finalizando com um V-bottom bem acentuado — proporciona uma prancha solta, responsiva e com trocas de borda rápidas e precisas.",
    waveType: "Pequenas a Médias",
    level: "Intermediário / Avançado",
    sizes: "5'8\" — 6'4\"",
    volume: "26 — 36 L",
    fins: "Biquilha / Twin (FCS II)",
    tail: "Swallow / Crescent",
    rocker: "Moderado",
    price: 2490,
    tags: ["Pequenas a Médias", "Biquilha", "Velocidade", "Performance"],
    spot: "Rio Tavares — Pico da Cruz",
    coordinates: "27°39'S / 48°30'W",
    mainImage: "/boards/double-viper/double-viper.png",
    thumbImage: "/boards/double-viper/double-viper.png",
    gallery: [
      "/boards/double-viper/double-viper.png",
      "/boards/double-viper/double-viper-1.jpg",
      "/boards/double-viper/double-viper-2.jpg",
      "/boards/double-viper/double-viper-3.jpg",
      "/boards/double-viper/double-viper-4.jpg",
    ],
    whatsappMessage: "Olá, tenho interesse no modelo Performance (Double Viper) da JP Surf Boards.",
    bgWord: "PERF"
  },
  {
    id: "funboard",
    number: "07",
    name: "Wasabi",
    category: "Funboard",
    slug: "funboard",
    description: "A Wasabi é a nossa interpretação da fish clássica, desenvolvida para proporcionar um surf fluido, solto e cheio de estilo. Com excelente remada e muita velocidade natural, ela desliza com facilidade sobre as ondas, privilegiando linhas amplas e uma sensação única de liberdade. Indicada para surfistas de todos os níveis.",
    waveType: "Ondas Variadas",
    level: "Iniciante Avançado / Intermediário",
    sizes: "6'6\" — 7'6\"",
    volume: "45 — 65 L",
    fins: "Tri-fin (FCS II)",
    tail: "Round / Squash",
    rocker: "Suave / Médio",
    price: 2490,
    tags: ["Ondas Variadas", "Iniciante Avan.", "Progressão"],
    spot: "Praia Mole",
    coordinates: "27°36'S / 48°26'W",
    mainImage: "/boards/wasabi/wasabi.png",
    thumbImage: "/boards/wasabi/wasabi-thumb.webp",
    gallery: [
      "/boards/wasabi/wasabi.png",
      "/boards/wasabi/wasabi-1.jpg",
      "/boards/wasabi/wasabi-2.jpg",
      "/boards/wasabi/wasabi-3.jpg",
      "/boards/wasabi/wasabi-4.jpg",
    ],
    whatsappMessage: "Olá, tenho interesse no modelo Funboard (Wasabi) da JP Surf Boards.",
    bgWord: "FUN"
  }
];
