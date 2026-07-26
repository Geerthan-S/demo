import type { ProjectStatus } from "@prisma/client";

export type ProjectView = {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientType?: string | null;
  clientLogo?: string | null;
  featuredImage: string;
  gallery: string[];
  location: string;
  area?: string;
  scopeOfWork: string;
  timeline: string;
  projectValue: string;
  yearsAssociated?: string | null;
  projectCount?: string | null;
  contractValue?: string | null;
  status: ProjectStatus;
  servicesUsed: string[];
  industry: string;
  summary: string;
  keyAchievements?: string[];
  completedAt?: Date | string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  featured: boolean;
  testimonial?: {
    quote: string;
    personName: string;
    designation: string;
    company: string;
    avatar?: string | null;
  } | null;
};

export type ClientView = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  industry?: string | null;
  website?: string | null;
  testimonial?: string | null;
  featured: boolean;
};

export const industrialImages = {
  hero:
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85",
  structure:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85",
  site:
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=85",
  crane:
    "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1600&q=85",
  safety:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85",
  highRise:
    "https://images.pexels.com/photos/18162494/pexels-photo-18162494.jpeg?auto=compress&cs=tinysrgb&w=1800",
  roadwork:
    "https://images.pexels.com/photos/4390530/pexels-photo-4390530.jpeg?auto=compress&cs=tinysrgb&w=1800",
  planning:
    "https://images.pexels.com/photos/3862384/pexels-photo-3862384.jpeg?auto=compress&cs=tinysrgb&w=1600",
  foundation:
    "https://images.pexels.com/photos/11580364/pexels-photo-11580364.jpeg?auto=compress&cs=tinysrgb&w=1800",
  concreteDetail:
    "https://images.pexels.com/photos/19216761/pexels-photo-19216761.jpeg?auto=compress&cs=tinysrgb&w=1600",
  warehouse:
    "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=2000",
  logistics:
    "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1800",
  machinery:
    "https://images.pexels.com/photos/162568/oil-pump-jack-sunset-clouds-silhouette-162568.jpeg?auto=compress&cs=tinysrgb&w=1800",
  heroCinematic:
    "/dockside-hero-construction.png",
  aboutHero:
    "/hero-image/about.png",
  servicesHero:
    "/services-reference/hd-services-hero.jpg",
  projectsHero:
    "/hero-image/projects.png",
  warehouseDusk:
    "https://images.pexels.com/photos/236705/pexels-photo-236705.jpeg?auto=compress&cs=tinysrgb&w=1800",
  logisticsAerial:
    "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1800",
  industrialCampus:
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1800",
  steelExecution:
    "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1800",
  interiors:
    "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&w=1800",
  residential:
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1800",
  careersHero:
    "https://images.pexels.com/photos/3862388/pexels-photo-3862388.jpeg?auto=compress&cs=tinysrgb&w=1800",
};

export const homeReferenceImages = {
  hero: "/home-reference/hero-steel-frame-cranes.jpg",
  about: "/home-reference/about-site-supervision.jpg",
  industries: {
    manufacturing: "/home-reference/industry-manufacturing.jpg",
    warehousing: "/home-reference/industry-warehousing.jpg",
    logistics: "/home-reference/industry-logistics.jpg",
    commercial: "/home-reference/industry-commercial.jpg",
    utilities: "/home-reference/industry-utilities-substation.jpg",
    industrialParks: "/home-reference/industry-industrial-parks.jpg",
    infrastructure: "/home-reference/industry-infrastructure.jpg",
    institutional: "/home-reference/industry-institutional-campus.jpg",
  },
  projects: {
    whirlpool: "/home-reference/project-whirlpool-facility.jpg",
    lodha: "/home-reference/project-lodha-industrial-park.jpg",
    adani: "/home-reference/project-adani-logistics.jpg",
    chennaiOne: "/home-reference/project-chennai-one-sez.jpg",
  },
};

export const servicesReferenceImages = {
  hero: "/services-reference/hd-services-hero.jpg",
  civilConstruction: "/services-reference/hd-civil-construction.jpg",
  civilStructure: "/services-reference/hd-civil-structure.jpg",
  roadHighways: "/services-reference/hd-road-highways.jpg",
  railwayWorks: "/services-reference/hd-railway-works-v2.jpg",
  railwayBridge: "/services-reference/hd-railway-bridge.jpg",
  electricalWorks: "/services-reference/hd-electrical-works.jpg",
  electricalSubstation: "/services-reference/hd-electrical-substation.jpg",
  industrialProjects: "/services-reference/hd-industrial-projects.jpg",
  industrialWarehouse: "/services-reference/hd-industrial-warehouse.jpg",
  projectManagement: "/services-reference/hd-project-management.jpg",
  projectEngineers: "/services-reference/hd-project-engineers.jpg",
  commercialSite: "/services-reference/hd-commercial-site.jpg",
  waterInfrastructure: "/home-reference/industry-utilities.jpg",
  roadSafetyTraffic: "/home-reference/industry-infrastructure.jpg",
};

export const projectReferenceImages = {
  whirlpool: homeReferenceImages.projects.whirlpool,
  lodha: homeReferenceImages.projects.lodha,
  adani: homeReferenceImages.projects.adani,
  chennaiOne: homeReferenceImages.projects.chennaiOne,
  stateHighway: homeReferenceImages.industries.infrastructure,
  manufacturingPlant: homeReferenceImages.industries.manufacturing,
  governmentCollege: homeReferenceImages.industries.institutional,
  waterSupply: homeReferenceImages.industries.utilities,
};

export type ServiceCategory = {
  title: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  overview: string;
  deliverables: string[];
  process: string[];
  benefits: string[];
  gallery: string[];
  proof: string;
  faqs: Array<{ question: string; answer: string }>;
};

export const serviceCategories = [
  {
    title: "Civil Construction",
    slug: "civil-construction",
    image: servicesReferenceImages.civilConstruction,
    shortDescription: "Residential, commercial and industrial construction works.",
    description:
      "Residential, commercial and industrial civil works delivered with disciplined site execution, quality checks and clear handover documentation.",
    overview:
      "Civil construction is the backbone of Dockside's delivery capability. The team manages residential, commercial and industrial scopes through drawing review, site planning, material coordination, RCC and structural execution, masonry, finishing interfaces and systematic quality control.",
    deliverables: [
      "Residential building and structural works",
      "Commercial and campus civil works",
      "Industrial civil works, RCC and structural interfaces",
      "Foundations, masonry, concrete, finishing and site development",
    ],
    process: [
      "Review drawings, site constraints, BOQ and execution sequence",
      "Plan manpower, materials, safety controls and milestone reporting",
      "Execute foundation, RCC, masonry, structural and finishing interfaces",
      "Close snags, submit quality records and hand over the completed scope",
    ],
    benefits: [
      "One civil partner for residential, commercial and industrial works",
      "Experienced supervision across core site activities",
      "Better coordination between structure, services and finishes",
      "Documented execution for long-term asset reliability",
    ],
    gallery: [
      servicesReferenceImages.civilConstruction,
      servicesReferenceImages.civilStructure,
      servicesReferenceImages.commercialSite,
    ],
    proof:
      "Suited for owners who need dependable civil execution across buildings, infrastructure interfaces and industrial facilities without losing control of quality, schedule or site coordination.",
    faqs: [
      {
        question: "What types of civil construction can Dockside handle?",
        answer:
          "Dockside supports residential, commercial and industrial civil works, including foundations, RCC, masonry, structural interfaces, site development and finishing coordination.",
      },
      {
        question: "Can civil works be coordinated with electrical, drainage and utility scopes?",
        answer:
          "Yes. Civil execution can be coordinated with electrical, water, drainage, road and industrial utility requirements so the final asset is practical to operate and maintain.",
      },
    ],
  },
  {
    title: "Road & Highways",
    slug: "road-highways",
    image: servicesReferenceImages.roadHighways,
    shortDescription: "Road construction and infrastructure development.",
    description:
      "BT and CC roads, access roads, strengthening works and supporting infrastructure development for public, industrial and campus movement.",
    overview:
      "Road and highway work requires durable preparation, accurate levels, drainage awareness and dependable surface execution. Dockside handles BT roads, CC roads, strengthening, renewal, internal access roads and infrastructure development connected to public works, logistics parks and industrial campuses.",
    deliverables: [
      "BT road formation, renewal and strengthening",
      "CC roads, access roads and internal campus roads",
      "Shoulder works, culvert interfaces and road drainage support",
      "Infrastructure development for public and industrial movement",
    ],
    process: [
      "Assess alignment, levels, subgrade condition and movement requirements",
      "Plan earthwork, base layers, drainage interfaces and traffic-safe execution",
      "Execute BT or CC pavement works with compaction and quality checks",
      "Complete shoulders, markings, protection works and final inspection",
    ],
    benefits: [
      "Built for movement, durability and maintainability",
      "Useful for public roads, industrial parks and site access networks",
      "Drainage-aware execution reduces future pavement failures",
      "Clear sequencing for live-site and public-interface conditions",
    ],
    gallery: [
      servicesReferenceImages.roadHighways,
      servicesReferenceImages.civilStructure,
      servicesReferenceImages.commercialSite,
    ],
    proof:
      "Relevant to PWD and DRDA-style scopes, industrial access roads, logistics parks and campus infrastructure where dependable pavement performance matters.",
    faqs: [
      {
        question: "Does Dockside handle both BT and CC road works?",
        answer:
          "Yes. Dockside supports BT road work, CC road work, strengthening, renewal, access roads and related infrastructure development.",
      },
      {
        question: "Can road works include drainage and culvert coordination?",
        answer:
          "Yes. Road works can be coordinated with culverts, storm water drains, shoulders, site levels and other civil infrastructure interfaces.",
      },
    ],
  },
  {
    title: "Railway Works",
    slug: "railway-works",
    image: servicesReferenceImages.railwayWorks,
    shortDescription: "Railway siding and supporting infrastructure.",
    description:
      "Railway siding and related infrastructure works supported by civil execution, drainage coordination, access planning and safety-aware site control.",
    overview:
      "Railway-related construction needs disciplined coordination around levels, access, movement paths and safety controls. Dockside supports railway siding, allied civil works, approach infrastructure, drainage interfaces and supporting facilities required around rail-connected industrial or logistics assets.",
    deliverables: [
      "Railway siding support works",
      "Approach roads and allied civil infrastructure",
      "Drainage, culvert and water-flow coordination around rail assets",
      "Utility, access and safety interfaces for rail-linked facilities",
    ],
    process: [
      "Review siding scope, drawings, levels, access and site restrictions",
      "Coordinate civil works with rail-aligned safety and movement requirements",
      "Execute earthwork, concrete, drainage and supporting infrastructure works",
      "Complete inspection, documentation and handover for related assets",
    ],
    benefits: [
      "Practical support for rail-connected industrial and logistics projects",
      "Civil execution aligned with access, drainage and movement needs",
      "Safety-aware planning for constrained infrastructure environments",
      "Useful coordination between rail siding and surrounding site works",
    ],
    gallery: [
      servicesReferenceImages.railwayWorks,
      servicesReferenceImages.railwayBridge,
      servicesReferenceImages.roadHighways,
    ],
    proof:
      "Suited for clients who need siding support and surrounding infrastructure works planned with the same discipline as industrial civil delivery.",
    faqs: [
      {
        question: "What does Railway Works include?",
        answer:
          "It includes railway siding support, allied civil infrastructure, access roads, drainage interfaces, culverts, utilities and other related works around rail-linked sites.",
      },
      {
        question: "Can Dockside coordinate railway-related work with industrial site development?",
        answer:
          "Yes. Railway-related infrastructure can be coordinated with industrial yards, logistics movement, site roads, drainage and utility works.",
      },
    ],
  },
  {
    title: "Electrical Works",
    slug: "electrical-works",
    image: servicesReferenceImages.electricalWorks,
    shortDescription: "HT/LT electrical installations and utility systems.",
    description:
      "HT and LT installations, utility coordination, electrical infrastructure and site power interfaces for industrial and civil projects.",
    overview:
      "Electrical works must be planned with safety, access, load requirements and civil interfaces in mind. Dockside supports HT/LT installations, electrical utility coordination, cable routing support, equipment interfaces and related site infrastructure so power systems are integrated with the built asset.",
    deliverables: [
      "HT and LT installation support",
      "Electrical utility infrastructure and civil interfaces",
      "Cable trench, equipment access and service coordination",
      "Industrial power support, lighting and facility electrical works",
    ],
    process: [
      "Review electrical scope, load needs, drawings and site access",
      "Coordinate civil, safety, utility and equipment interface requirements",
      "Execute installation support, routing, protection and connected civil works",
      "Assist inspection, testing readiness and handover documentation",
    ],
    benefits: [
      "Electrical works coordinated with civil execution instead of isolated later",
      "Useful for industrial, commercial and utility-heavy environments",
      "Improved safety, maintainability and inspection readiness",
      "Clear interface management between services and structure",
    ],
    gallery: [
      servicesReferenceImages.electricalWorks,
      servicesReferenceImages.electricalSubstation,
      servicesReferenceImages.projectEngineers,
    ],
    proof:
      "Aligned with industrial facility works where civil, electrical and utility coordination must happen without disrupting site safety or future operations.",
    faqs: [
      {
        question: "Does Dockside handle HT/LT electrical works?",
        answer:
          "Yes. Dockside supports HT/LT installations, electrical utility interfaces and related civil coordination for construction and industrial projects.",
      },
      {
        question: "Can electrical works be integrated with civil construction?",
        answer:
          "Yes. Electrical scopes can be coordinated with trenches, foundations, equipment access, road crossings, drainage interfaces and building works.",
      },
    ],
  },
  {
    title: "Industrial Projects",
    slug: "industrial-projects",
    image: servicesReferenceImages.industrialProjects,
    shortDescription: "Factories, warehouses and industrial developments.",
    description:
      "Warehouses, factories, production-support buildings, renovations and industrial utility interfaces delivered for active and large-format sites.",
    overview:
      "Industrial projects are one of Dockside's strongest delivery areas. The company supports warehouses, factories, production-support facilities, renovations, RCC and structural works, utility buildings and site infrastructure with a practical focus on safety, uptime and long-term maintainability.",
    deliverables: [
      "Warehouses, factories and production-support buildings",
      "Industrial renovations and facility improvements",
      "RCC, structural and utility-linked civil works",
      "Logistics parks, yards and industrial campus infrastructure",
    ],
    process: [
      "Map operational constraints, site access, utilities and safety needs",
      "Plan methods, procurement, manpower, permits and reporting rhythm",
      "Execute civil, structural, renovation and utility-linked site works",
      "Phase handovers, close snags and provide completion documentation",
    ],
    benefits: [
      "Experience inside active industrial environments",
      "Strong fit for warehouses, factories and logistics infrastructure",
      "Practical coordination of civil, electrical, drainage and safety scopes",
      "Delivery discipline suited to repeat industrial clients",
    ],
    gallery: [
      servicesReferenceImages.industrialProjects,
      servicesReferenceImages.industrialWarehouse,
      servicesReferenceImages.commercialSite,
    ],
    proof:
      "Seen across repeat industrial works for production-support buildings, renovations, fire hydrant interfaces, mezzanine floors and large logistics infrastructure.",
    faqs: [
      {
        question: "Can Dockside work inside active factories and industrial sites?",
        answer:
          "Yes. Dockside has experience with active production-support environments, phased renovations, utility interfaces and industrial civil works.",
      },
      {
        question: "What industrial project types are supported?",
        answer:
          "Dockside supports warehouses, factories, utility buildings, RCC structures, structural works, renovations, logistics infrastructure and industrial campus development.",
      },
    ],
  },
  {
    title: "Project Management",
    slug: "project-management",
    image: servicesReferenceImages.projectManagement,
    shortDescription: "Planning, execution and consultancy services.",
    description:
      "Planning, execution management and consultancy support that helps owners control scope, schedule, coordination, reporting and handover.",
    overview:
      "Project management gives owners a structured path from idea to execution. Dockside supports planning, execution coordination, consultant and vendor alignment, schedule tracking, documentation, quality checkpoints and handover readiness for construction and infrastructure projects.",
    deliverables: [
      "Project planning, execution strategy and scope coordination",
      "Consultancy support for BOQ, drawings and constructability review",
      "Vendor, site team and stakeholder coordination",
      "Progress reporting, quality checks and handover documentation",
    ],
    process: [
      "Define scope, stakeholders, constraints, approvals and execution goals",
      "Build schedule, procurement plan, reporting rhythm and quality gates",
      "Coordinate daily site execution, risks, changes and milestone tracking",
      "Drive closeout, documentation, snag closure and owner handover",
    ],
    benefits: [
      "Clearer control over scope, cost, timeline and site decisions",
      "Better coordination between civil, electrical, drainage and safety teams",
      "Useful for owners who need execution leadership and consultancy",
      "Reduces surprises through reporting and structured decision-making",
    ],
    gallery: [
      servicesReferenceImages.projectManagement,
      servicesReferenceImages.projectEngineers,
      servicesReferenceImages.civilConstruction,
    ],
    proof:
      "Useful when a client needs Dockside's engineering, commercial and site-execution discipline applied not only as a contractor, but as a project delivery partner.",
    faqs: [
      {
        question: "What does Project Management cover?",
        answer:
          "It covers planning, execution coordination, consultancy, schedule monitoring, vendor alignment, documentation, quality checkpoints and handover support.",
      },
      {
        question: "Can Dockside advise before construction starts?",
        answer:
          "Yes. Dockside can support scope review, constructability inputs, BOQ coordination, site planning and execution strategy before work begins.",
      },
    ],
  },
  {
    title: "Water Infrastructure & Drainage Works",
    slug: "water-infrastructure-drainage-works",
    image: servicesReferenceImages.waterInfrastructure,
    shortDescription: "Storm water drains, culverts and drainage infrastructure.",
    description:
      "Storm water drains, culverts, drainage systems and water management infrastructure delivered with civil execution discipline.",
    overview:
      "Water infrastructure and drainage works protect roads, campuses, industrial facilities and public assets from long-term operational risk. Dockside supports storm water drains, culverts, water-flow management, drainage corridors, utility crossings and connected civil works with practical planning, levels coordination and accountable quality checks.",
    deliverables: [
      "Storm water drains and drainage network construction",
      "Culverts, cross-drainage works and water-flow interfaces",
      "Water management infrastructure for roads, campuses and industrial sites",
      "Earthwork, concrete, protection works and handover documentation",
    ],
    process: [
      "Review catchment, levels, outfall points, drawings and site constraints",
      "Plan earthwork, shuttering, concrete, access and water-diversion controls",
      "Execute drains, culverts, protection works and connected civil interfaces",
      "Inspect flow paths, close quality records and hand over maintainable assets",
    ],
    benefits: [
      "Reduces waterlogging, pavement damage and site-operational disruption",
      "Supports roads, industrial campuses and public infrastructure assets",
      "Improves long-term maintainability through level-aware execution",
      "Coordinates drainage with civil, road, railway and utility interfaces",
    ],
    gallery: [
      servicesReferenceImages.waterInfrastructure,
      servicesReferenceImages.civilStructure,
      servicesReferenceImages.roadHighways,
    ],
    proof:
      "Built for owners who need drainage systems and water infrastructure delivered as durable civil assets, not isolated add-ons after road or site work is complete.",
    faqs: [
      {
        question: "What does Water Infrastructure & Drainage Works include?",
        answer:
          "It includes storm water drains, culverts, drainage systems, cross-drainage works, water-flow management and related civil infrastructure.",
      },
      {
        question: "Can drainage works be coordinated with roads and industrial sites?",
        answer:
          "Yes. Dockside coordinates drainage with road levels, site access, industrial utilities, culverts and surrounding civil works so the final system is maintainable.",
      },
    ],
  },
  {
    title: "Road Safety & Traffic Management Systems",
    slug: "road-safety-traffic-management-systems",
    image: servicesReferenceImages.roadSafetyTraffic,
    shortDescription: "Road safety equipment, signage, barriers and traffic control solutions.",
    description:
      "Road safety equipment, barriers, signage, markings and traffic control solutions for safer movement corridors.",
    overview:
      "Road safety and traffic management systems help infrastructure owners convert finished roads and campuses into safer, more legible movement environments. Dockside supports signage, road markings, barriers, traffic control equipment, site circulation planning and safety interfaces connected to roads, industrial campuses and public infrastructure.",
    deliverables: [
      "Road safety signage, caution boards and traffic control devices",
      "Crash barriers, guardrails, delineators and movement protection systems",
      "Road markings, lane guidance and campus circulation support",
      "Safety interface coordination for roads, highways and industrial access",
    ],
    process: [
      "Review movement patterns, risk points, drawings and safety requirements",
      "Plan signage, barriers, markings and traffic-control installation sequence",
      "Install equipment with access, visibility and durability checks",
      "Validate site readiness, safety visibility and handover documentation",
    ],
    benefits: [
      "Improves road-user guidance and operating safety",
      "Supports highways, campus roads, logistics parks and public works",
      "Reduces ambiguity at junctions, curves, access points and work zones",
      "Connects traffic safety decisions with road and civil execution",
    ],
    gallery: [
      servicesReferenceImages.roadSafetyTraffic,
      servicesReferenceImages.roadHighways,
      servicesReferenceImages.projectEngineers,
    ],
    proof:
      "Suited for owners who need road safety equipment and traffic management systems integrated into infrastructure delivery with practical site controls.",
    faqs: [
      {
        question: "What does Road Safety & Traffic Management Systems include?",
        answer:
          "It includes road safety equipment, barriers, signage, markings, traffic control devices, access guidance and safety interfaces for road and campus movement.",
      },
      {
        question: "Can safety systems be delivered with road construction works?",
        answer:
          "Yes. Dockside can coordinate signage, markings, barriers and traffic management systems with road construction, campus access and industrial movement requirements.",
      },
    ],
  },
] satisfies ServiceCategory[];

export const technicalCapabilities = [
  "BT and CC Roads",
  "Railway Siding Infrastructure",
  "HT/LT Installations",
  "Industrial Warehouses and Factories",
  "Project Planning and Consultancy",
  "RCC and Structural Works",
  "Site Development and Land Grading",
  "Industrial Utilities",
];

export const technicalCapabilityCards = [
  {
    title: "BT & CC Road Execution",
    meta: "Road infrastructure",
    text: "Formation, strengthening, renewal and concrete pavement works supported by levels, compaction and drainage-aware execution.",
  },
  {
    title: "Railway Siding Support",
    meta: "Rail-linked infrastructure",
    text: "Civil and allied infrastructure support around siding, access, drainage, utility and movement requirements.",
  },
  {
    title: "HT/LT Utility Coordination",
    meta: "Electrical works",
    text: "Electrical installations and utility interfaces coordinated with civil works, safety access and operating requirements.",
  },
  {
    title: "Industrial Facility Works",
    meta: "Factories and warehouses",
    text: "Warehouses, factories, production-support spaces, renovations and industrial utility works delivered with site discipline.",
  },
];

export const services = serviceCategories.map((service) => service.title);

export const industries = [
  "Industrial manufacturing",
  "Commercial campuses",
  "Residential developments",
  "Logistics parks",
  "Warehousing",
  "Public infrastructure",
  "Government infrastructure",
  "Institutional infrastructure",
];

export const industryCards = [
  {
    title: "Industrial Manufacturing",
    text: "Production-support buildings, utility interfaces, active-facility upgrades and repeat industrial civil works.",
  },
  {
    title: "Commercial Development",
    text: "Campus development, business infrastructure, shell works and operating-ready commercial environments.",
  },
  {
    title: "Logistics Parks",
    text: "Large-format grading, roads, drainage, warehouses and industrial movement infrastructure.",
  },
  {
    title: "Government Infrastructure",
    text: "Public works, roads, drainage, safety interfaces and accountable delivery for civic assets.",
  },
  {
    title: "Residential Development",
    text: "Homes, villas, residential developments and renovation-led scopes managed with professional controls.",
  },
  {
    title: "Institutional Projects",
    text: "Educational, healthcare and civic-use environments that require durable planning and controlled execution.",
  },
];

export const certificationCertificates = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System",
    certificateNo: "QT-56856/1025",
    image: "/certificates/iso-9001-quality-management-system.jpg",
  },
  {
    code: "ISO 14001:2015",
    title: "Environmental Management System",
    certificateNo: "ET-56857/1025",
    image: "/certificates/iso-14001-environmental-management-system.jpg",
  },
  {
    code: "ISO 45001:2018",
    title: "Occupational Health & Safety Management System",
    certificateNo: "HT-56858/1025",
    image: "/certificates/iso-45001-occupational-health-and-safety-management-system.jpg",
  },
];

export const certifications = [
  ...certificationCertificates,
  {
    code: "Scope",
    title:
      "Roads, buildings, interior designing, project management consultancy, plumbing, piping, electrification, GIS mapping, survey, fabrication, earth moving, structural and piling engineering works.",
  },
];

export const companyMilestones = [
  {
    title: "Foundation and systems",
    meta: "Growth journey",
    text: "Built around engineering leadership, site supervision and accountable project coordination.",
  },
  {
    title: "Repeat industrial execution",
    meta: "Whirlpool program",
    text: "20+ repeat works completed across warehouse, lab, utility, mezzanine, civil, electrical and interior scopes.",
  },
  {
    title: "Large-format infrastructure",
    meta: "Lodha Industrial Park",
    text: "INR 5000+ Lakhs (INR 50+ Crores) earthwork, grading, site development and common area development program.",
  },
  {
    title: "Multi-sector project proof",
    meta: "Current scale",
    text: "Active and completed work across logistics, commercial campus development, industrial utilities and public infrastructure.",
  },
];

export const leadershipProfiles = [
  {
    title: "Ms. Kalaimakalle Alice",
    meta: "Managing Director",
    text:
      "Leads company direction, client value creation and operational quality with a focus on disciplined growth.",
    items: ["Enterprise governance", "Quality culture", "Client relationships"],
  },
  {
    title: "Ms. Viviya Reddy",
    meta: "Director - Technical",
    text:
      "Civil engineering professional focused on project execution, design coordination and technical delivery control.",
    items: ["Project execution", "Design coordination", "Engineering management"],
  },
  {
    title: "Mr. Sravan Reddy",
    meta: "Director - Projects",
    text:
      "Construction professional focused on execution strategy, project management, cost optimization and delivery timelines.",
    items: ["Project management", "Industrial infrastructure", "Cost control"],
  },
  {
    title: "Mr. R. Senthamizhselvan",
    meta: "Director - Engineering & Strategy",
    text:
      "Structural engineering and infrastructure development professional guiding technical decisions and strategic project growth.",
    items: ["Engineering strategy", "Structural works", "Quality control"],
  },
];

export const employeeBenefits = [
  {
    title: "Training Programs",
    text: "Site orientation, safety practices, documentation discipline and construction-method learning.",
  },
  {
    title: "Career Growth Path",
    text: "Clear movement from site execution support into planning, QA, safety and project responsibility.",
  },
  {
    title: "Site Learning Opportunities",
    text: "Exposure to industrial facilities, logistics infrastructure, commercial campuses and public works.",
  },
  {
    title: "Engineering Development Programs",
    text: "Mentoring around drawings, quantities, method statements, inspections and handover records.",
  },
];

export const seedClients: ClientView[] = [
  {
    id: "client-1",
    name: "Whirlpool of India Ltd",
    slug: "whirlpool-of-india",
    logoUrl: "/client-logos/whirlpool.svg",
    industry: "Industrial manufacturing",
    testimonial:
      "20+ projects including warehouse construction, packaging labs, fire hydrant pipelines and civil works.",
    featured: true,
  },
  {
    id: "client-2",
    name: "Public Works Department, Puducherry",
    slug: "pwd-puducherry",
    logoUrl: "/client-logos/pwd-puducherry.png",
    industry: "Public infrastructure",
    testimonial:
      "15+ projects including road strengthening, renewal, BT and CC road formation, drainage and infrastructure works.",
    featured: true,
  },
  {
    id: "client-tn-drda",
    name: "Tamil Nadu DRDA",
    slug: "tamil-nadu-drda",
    logoUrl: "/client-logos/tnrd.gif",
    industry: "Public sector infrastructure",
    testimonial:
      "12+ projects including rural road formation, check dams, and block-level infrastructure works.",
    featured: true,
  },
  {
    id: "client-tahdco",
    name: "Tamil Nadu Adi Dravidar Housing & Development Corporation",
    slug: "tahdco",
    logoUrl: "/client-logos/tahdco.png",
    industry: "Public housing & development",
    testimonial:
      "10+ projects including road formation, concrete pavement and infrastructure development.",
    featured: true,
  },
  {
    id: "client-3",
    name: "Lodha Industrial Park",
    slug: "lodha-industrial-park",
    logoUrl: "/client-logos/lodha.png",
    industry: "Logistics parks",
    testimonial:
      "Large-scale grading, earthwork, land development, and common-area infrastructure works.",
    featured: true,
  },
  {
    id: "client-4",
    name: "Adani Logistics Limited",
    slug: "adani-logistics-limited",
    logoUrl: "/client-logos/adani.svg",
    industry: "Logistics",
    testimonial:
      "Ongoing civil, RCC, drainage networks, and structural works for logistics infrastructure.",
    featured: true,
  },
  {
    id: "client-5",
    name: "Chennai One IT SEZ",
    slug: "chennai-one-it-sez",
    logoUrl: "/client-logos/chennai-one.jpg",
    industry: "Commercial campus",
    testimonial:
      "Early-stage land development, soil filling, site preparation, and survey works.",
    featured: true,
  },
  {
    id: "client-6",
    name: "Anabond Limited",
    slug: "anabond-limited",
    logoUrl: "/client-logos/anabond.svg",
    industry: "Industrial manufacturing",
    testimonial:
      "Industrial facility civil works, utility building structures, and shop floor renovations.",
    featured: true,
  },
  {
    id: "client-7",
    name: "Akshaya Patra Foundation",
    slug: "akshaya-patra-foundation",
    logoUrl: "/client-logos/akshaya-patra.png",
    industry: "Institutional infrastructure",
    testimonial:
      "Institutional kitchen facilities, civil structural execution, and campus infrastructure works.",
    featured: true,
  },
  {
    id: "client-8",
    name: "Godrej Consumer Products Ltd",
    slug: "godrej-consumer-products",
    logoUrl: "/client-logos/godrej-consumer-products.jpg",
    industry: "FMCG manufacturing",
    testimonial:
      "Industrial civil works, factory expansion building works, and structural coordination.",
    featured: true,
  },
];

export const clientLogos = seedClients.map((client) => client.name.toUpperCase());

export const faqs = [
  {
    question: "Can Dockside support large industrial and infrastructure scopes?",
    answer:
      "Yes. Dockside is positioned for industrial, commercial and public-sector construction, including civil works, utilities, site development, RCC, structural works, drainage and facility upgrades.",
  },
  {
    question: "How is project communication handled?",
    answer:
      "Each serious enquiry is routed to the appropriate engineering, commercial or project delivery team so scope, budget, site context and schedule can be reviewed with accountability.",
  },
  {
    question: "Which ISO systems does Dockside operate under?",
    answer:
      "Dockside operates under ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 management systems for quality, environmental responsibility and occupational health and safety.",
  },
  {
    question: "Which core services are offered?",
    answer:
      "The core service lines are Civil Construction, Road & Highways, Railway Works, Electrical Works, Industrial Projects, Project Management, Water Infrastructure & Drainage Works and Road Safety & Traffic Management Systems.",
  },
];

export const seedProjects: ProjectView[] = [
  {
    id: "seed-1",
    title: "Whirlpool Industrial Works Program",
    slug: "whirlpool-industrial-works-program",
    clientName: "Whirlpool of India Ltd",
    clientType: "Private Sector",
    clientLogo: "/client-logos/whirlpool.svg",
    featuredImage: projectReferenceImages.whirlpool,
    gallery: [projectReferenceImages.whirlpool, homeReferenceImages.industries.warehousing, industrialImages.site],
    location: "Puducherry",
    area: "250,000 Sq.ft",
    scopeOfWork:
      "Warehouse and packaging lab construction, reliability lab renovation, fire hydrant pipeline work, mezzanine floor construction, civil, electrical and interior works.",
    timeline: "20+ works completed in the last 5 years",
    projectValue: "INR 400+ Lakhs",
    status: "COMPLETED",
    servicesUsed: ["Industrial Projects", "Civil Construction", "Electrical Works", "Project Management"],
    industry: "Industrial manufacturing",
    summary:
      "A multi-scope industrial execution program covering production support buildings, renovation, utilities and civil-electrical works.",
    seoTitle: "Whirlpool Puducherry Industrial Works",
    seoDescription:
      "Dockside Constructions industrial works program for Whirlpool of India Ltd in Puducherry.",
    featured: true,
    completedAt: "2018-06-15T00:00:00.000Z",
    testimonial: {
      quote:
        "DCPL's repeat industrial works show reliable site discipline, coordinated execution and practical engineering management.",
      personName: "Client Project Team",
      designation: "Industrial Works",
      company: "Whirlpool of India Ltd",
    },
  },
  {
    id: "seed-2",
    title: "Lodha Industrial Park - Chennai",
    slug: "lodha-industrial-park-chennai",
    clientName: "Lodha Industrial Park",
    clientType: "Private Sector",
    clientLogo: "/client-logos/lodha.png",
    featuredImage: projectReferenceImages.lodha,
    gallery: [projectReferenceImages.lodha, homeReferenceImages.industries.industrialParks, industrialImages.foundation],
    location: "Eichoor, Chennai",
    area: "500,000 Sq.ft",
    scopeOfWork:
      "Earthwork, land grading, material supply, site development and common area development works.",
    timeline: "Program delivery",
    projectValue: "INR 5000+ Lakhs (INR 50+ Crores)",
    status: "COMPLETED",
    servicesUsed: ["Civil Construction", "Road & Highways", "Project Management"],
    industry: "Logistics parks",
    summary:
      "Large-format industrial park development with land grading, site development and common infrastructure scope.",
    seoTitle: "Lodha Industrial Park Chennai Case Study",
    seoDescription:
      "Earthwork, land grading and site development works by Dockside Constructions at Lodha Industrial Park Chennai.",
    featured: true,
    completedAt: "2020-11-20T00:00:00.000Z",
    testimonial: {
      quote:
        "The works required reliable equipment deployment, grading discipline and common infrastructure coordination at scale.",
      personName: "Project Controls Team",
      designation: "Industrial Park Development",
      company: "Lodha Industrial Park",
    },
  },
  {
    id: "seed-3",
    title: "Adani Logistics Civil & Structural Works",
    slug: "adani-logistics-civil-structural-works",
    clientName: "Adani Logistics Limited",
    clientType: "Private Sector",
    clientLogo: "/client-logos/adani.svg",
    featuredImage: projectReferenceImages.adani,
    gallery: [projectReferenceImages.adani, homeReferenceImages.industries.logistics, industrialImages.crane],
    location: "Malur, Karnataka",
    area: "300,000 Sq.ft",
    scopeOfWork:
      "Miscellaneous civil works, RCC works, drainage and structural works.",
    timeline: "Ongoing",
    projectValue: "INR 10 Crores",
    status: "IN_PROGRESS",
    servicesUsed: ["Industrial Projects", "Civil Construction", "Project Management"],
    industry: "Logistics",
    summary:
      "Ongoing civil, RCC, drainage and structural works for logistics infrastructure in Karnataka.",
    seoTitle: "Adani Logistics Malur Civil Works",
    seoDescription:
      "Ongoing civil, RCC, drainage and structural works by Dockside Constructions for Adani Logistics Limited in Malur, Karnataka.",
    featured: true,
    completedAt: "2023-04-10T00:00:00.000Z",
    testimonial: null,
  },
  {
    id: "seed-4",
    title: "Chennai One IT SEZ Land Development",
    slug: "chennai-one-it-sez-land-development",
    clientName: "Chennai One IT SEZ",
    clientType: "Private Sector",
    clientLogo: "/client-logos/chennai-one.jpg",
    featuredImage: projectReferenceImages.chennaiOne,
    gallery: [projectReferenceImages.chennaiOne, homeReferenceImages.industries.commercial, industrialImages.structure],
    location: "Mandra City Project, Chennai",
    area: "200,000 Sq.ft",
    scopeOfWork:
      "Large-scale land development, soil filling, site preparation, DGPS and survey works.",
    timeline: "Ongoing",
    projectValue: "INR 300+ Crores (Overall Project Value)",
    status: "IN_PROGRESS",
    servicesUsed: ["Civil Construction", "Road & Highways", "Project Management"],
    industry: "Commercial campus",
    summary:
      "Large-scale campus land development and site preparation scope for a major Chennai commercial development.",
    seoTitle: "Chennai One IT SEZ Land Development",
    seoDescription:
      "Large-scale land development, soil filling and site preparation works by Dockside Constructions at Chennai One IT SEZ.",
    featured: true,
    completedAt: "2025-01-30T00:00:00.000Z",
    testimonial: null,
  },
];
