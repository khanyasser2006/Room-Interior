// AURA Atelier Central Persistent CMS Store
import { ALL_PROJECTS } from './ProjectsPage';
import { ALL_MATERIALS } from './MaterialsPage';

export const DEFAULT_CMS_DATA = {
  // ================= HOME PAGE CONTENT =================
  home: {
    heroTitle1: 'TIMELESS LUXURY',
    heroSubtitle1: 'ARCHITECTURAL RESIDENCES FOR CONTEMPORARY LIVING',
    heroTitle2: 'ORGANIC MATERIALS',
    heroSubtitle2: 'NATURAL STONE, SMOKED TIMBERS & LIVING BRONZE',
    heroTitle3: 'SPATIAL HARMONY',
    heroSubtitle3: 'POETRY IN LIGHT, SHADOW & PURE PROPORTION',
    
    philosophyTag: 'STUDIO PHILOSOPHY',
    philosophyHeading: 'We create calm, purposeful sanctuaries designed around natural light, pure volume, and honest materials.',
    philosophyBody1: 'True luxury is not about excess ornamentation. It is the feeling of calm when morning sunlight washes across a textured travertine wall, or when custom smoked oak cabinets glide shut with zero sound.',
    philosophyBody2: 'Every private residence we design is custom tailored to our clients\' daily rituals — creating enduring spaces that grow more beautiful with time.',
    
    stats: [
      { value: '140+', label: 'Residences Crafted' },
      { value: '12', label: 'Countries Over The World' },
      { value: '100%', label: 'Turnkey Delivery' },
      { value: '18yr', label: 'Architectural Heritage' }
    ],

    materialityTag: 'NATURAL MATERIALS & CRAFT',
    materialityHeading: 'Honest Textures & Master Joinery',
    materialityText: 'We curate timeless natural materials sourced from independent Italian quarries, sustainable Japanese timber forests, and heritage alpine foundries.',

    servicesTag: 'COMPREHENSIVE CAPABILITIES',
    servicesHeading: 'From Raw Space to Finished Sanctuary',
    servicesText: 'A complete, white-glove architectural practice managing every stage of residential transformation.',

    testimonialQuote: 'AURA completely transformed how our family experiences our home. The interplay of morning light, quiet acoustics, and natural travertine feels like living inside a private retreat.',
    testimonialAuthor: 'Julian & Elena Vance',
    testimonialRole: 'Penthouse Residence &bull; Tribeca, New York',

    ctaHeading: 'Ready to Transform Your Home?',
    ctaText: 'We collaborate closely with homeowners to create beautiful, comfortable, and personalized spaces. Let’s discuss your vision.',

    awards: [
      { id: 'aw-1', title: 'Awwwards', sub: 'Site of the Month' },
      { id: 'aw-2', title: 'Architectural Digest', sub: 'Featured Design Studio' },
      { id: 'aw-3', title: 'Frame Awards', sub: 'Best Residential Interior' },
      { id: 'aw-4', title: 'Wallpaper* Magazine', sub: 'Design Awards Winner' }
    ]
  },

  // ================= ABOUT PAGE CONTENT =================
  about: {
    heroTag: 'STUDIO MANIFESTO & PHILOSOPHY',
    heroHeading: 'Shaping spaces that foster peace, warmth, and enduring beauty.',
    manifestoQuote: 'Founded in 2018, AURA is an international interior architecture studio with creative ateliers in Tokyo, New York, and Milan. We collaborate with discerning homeowners and developers to design private residences, penthouses, and hospitality spaces that combine calm architectural clarity with honest material richness.',
    
    stats: [
      { id: 'as-1', value: '$140M+', label: 'Completed Value' },
      { id: 'as-2', value: '16', label: 'Design Awards' },
      { id: 'as-3', value: '03', label: 'Global Studios' },
      { id: 'as-4', value: '100%', label: 'Custom Craft' }
    ],

    atelierImage: '/images/atelier_studio.jpg',
    atelierTitle: 'Where material research meets structural precision.',

    principles: [
      {
        id: 'p1',
        num: '01',
        title: 'Natural Light & Shadow',
        desc: 'We shape rooms around natural sunlight. Deep window reveals, soft cove illumination, and textured surfaces create an ever-shifting sense of warmth from sunrise to nightfall.'
      },
      {
        id: 'p2',
        num: '02',
        title: 'Honest Material Textures',
        desc: 'We use genuine natural materials — unfilled Roman travertine, flame-treated Japanese cedar, and unlacquered bronze — that age gracefully with everyday touch.'
      },
      {
        id: 'p3',
        num: '03',
        title: 'Calm Spatial Flow',
        desc: 'By eliminating clutter, aligning sightlines, and concealing everyday storage, our open floor plans create an effortless sense of calm throughout the residence.'
      },
      {
        id: 'p4',
        num: '04',
        title: 'Meticulous Millwork & Craft',
        desc: 'Every cabinet, shadowline baseboard, and concealed pivot door is custom engineered to millimeter precision by master artisan joiners.'
      }
    ],

    leadership: [
      {
        id: 'lead-1',
        name: 'Kenzo Takahashi',
        role: 'Principal Architect & Spatial Director',
        location: 'Tokyo Atelier',
        bio: 'Trained at the University of Tokyo and Swiss Federal Institute of Technology. Specializes in minimal spatial flow, chiaroscuro lighting, and seamless indoor-outdoor Japanese gardens.'
      },
      {
        id: 'lead-2',
        name: 'Elena Rossi',
        role: 'Head of Materiality & Millwork',
        location: 'Milan Atelier',
        bio: 'Master of Architecture from Politecnico di Milano. Directs our natural quarry sourcing across Italy and oversees bespoke joinery engineering with heritage cabinetmakers.'
      },
      {
        id: 'lead-3',
        name: 'Julian Hayes',
        role: 'Managing Director & Construction Lead',
        location: 'New York Atelier',
        bio: 'Over two decades delivering complex residential architecture in Manhattan, Aspen, and London. Ensures zero-tolerance construction precision and turnkey delivery.'
      }
    ],

    processSteps: [
      {
        id: 'step-1',
        step: '01',
        title: 'Discovery & Spatial Vision',
        desc: 'We meet to understand your lifestyle, daily routines, functional needs, and architectural preferences. We assess your property’s light, proportions, and structural possibilities.'
      },
      {
        id: 'step-2',
        step: '02',
        title: 'Architectural Concept & 3D Study',
        desc: 'We develop detailed spatial plans, volume models, and curated material boards. You experience how every room, sightline, and lighting fixture connects before construction begins.'
      },
      {
        id: 'step-3',
        step: '03',
        title: 'Custom Millwork & Precision Specs',
        desc: 'Our architects draw every zero-tolerance cabinet, concealed pivot door, and custom bathroom stone detail with full engineering specifications.'
      },
      {
        id: 'step-4',
        step: '04',
        title: 'Turnkey Build & White-Glove Styling',
        desc: 'We supervise construction on-site, manage artisan fabricators, install custom furnishings, and calibrate lighting so you step into a fully completed, move-in-ready home.'
      }
    ],

    milestones: [
      {
        id: 'm1',
        year: '2008',
        title: 'Atelier Founded in Tokyo',
        desc: 'Founded in Minato-ku by architectural director Kenjiro Mori, focusing on bespoke residential transformations blending Japanese craft with clean minimalism.'
      },
      {
        id: 'm2',
        year: '2014',
        title: 'New York Studio Opening',
        desc: 'Expanded to SoHo, Manhattan, bringing calm material palettes and bespoke spatial engineering to high-rise penthouses and historic cast-iron lofts.'
      },
      {
        id: 'm3',
        year: '2019',
        title: 'Milan Design Laboratory',
        desc: 'Opened our material research atelier in Brera, Milan, partnering with fourth-generation stone quarries and bronze artisans across Northern Italy.'
      },
      {
        id: 'm4',
        year: '2026',
        title: 'Global Turnkey Practice',
        desc: 'Over 140 luxury residential commissions delivered across 12 countries, recognized globally for uncompromised material honesty and calm architectural restraint.'
      }
    ],

    studios: [
      { city: 'Tokyo', address: 'Minato-ku, Roppongi 4-12-8', phone: '+81 (0)3 5400 8820' },
      { city: 'New York', address: '484 Broome Street, SoHo', phone: '+1 (212) 890 3340' },
      { city: 'Milan', address: 'Via Solferino 18, Brera', phone: '+39 02 8739 1200' },
      { city: 'Paris', address: '228 Rue Saint-Honoré, 1er', phone: '+33 (0)1 4268 9000' }
    ]
  },

  // ================= PROJECTS DATA (Full CRUD) =================
  projects: ALL_PROJECTS,

  // ================= MATERIALS DATA (Full CRUD) =================
  materials: ALL_MATERIALS,

  // ================= SERVICES DATA (Full CRUD) =================
  services: {
    disciplines: [
      {
        id: 'arch',
        num: '01',
        title: 'Interior Architecture & Space Planning',
        subtitle: 'Structural Layouts, Open Volumes & Fluid Room Flow',
        desc: 'We completely rethink existing residential layouts to maximize panoramic views, daylight capture, and comfortable circulation between living zones.',
        deliverables: [
          '3D Spatial Volume & Daylight Flow Studies',
          'Complete Demolition & Structural Architectural Plans',
          'Acoustic Wall Calibrations & Pocket Door Systems',
          'Permit Documentation & Building Board Approvals'
        ],
        tags: ['Structural Flow', 'Sunlight Paths', 'Acoustic Comfort'],
        image: '/images/service_architecture.jpg'
      },
      {
        id: 'millwork',
        num: '02',
        title: 'Custom Millwork & Precision Joinery',
        subtitle: 'Bespoke Cabinetry, Hidden Portals & Architectural Paneling',
        desc: 'Every cabinet, hidden pivot door, walk-in dressing suite, and kitchen island is custom designed and fabricated by master woodworkers.',
        deliverables: [
          'Millimeter-Precision Shop Drawing Packages',
          'Zero-Tolerance Wall Paneling with Shadowline Reveals',
          'Integrated Concealed Storage & Appliance Wall Units',
          'Solid Timber Sourcing & Flitch-Matched Veneers'
        ],
        tags: ['Zero-Tolerance', 'Concealed Joinery', 'Smoked Oak'],
        image: '/images/service_millwork.jpg'
      },
      {
        id: 'lighting',
        num: '03',
        title: 'Lighting Design & Smart Environment',
        subtitle: 'Indirect Cove Illumination, Warm Dimming & Smart Scenes',
        desc: 'We engineer glare-free, layered illumination schemes with concealed fixtures, warm-dimming channels, and intuitive smart scene keypads.',
        deliverables: [
          'Day-to-Night Multi-Scene Lighting Plans',
          'Concealed Architectural Cove & Millwork Illumination',
          'Lutron / KNX Smart Home Control Integration',
          'Custom Hand-Blown Glass & Bronze Pendant Fixtures'
        ],
        tags: ['Layered Lighting', 'Glare-Free', 'Smart Automation'],
        image: '/images/obsidian.jpg'
      },
      {
        id: 'ffne',
        num: '04',
        title: 'Bespoke Furniture, Textiles & Fine Art',
        subtitle: 'Curated Designer Furnishings, Custom Upholstery & Styling',
        desc: 'We curate and manufacture custom furniture, hand-knotted organic wool rugs, imported bouclé draperies, and collector-grade artwork.',
        deliverables: [
          'Custom Curved Sofas & Solid Stone Dining Tables',
          'Imported Natural Wool Bouclé & Linen Upholstery',
          'Private Art Advisory & Gallery Acquisition',
          'White-Glove Placement, Steam-Styling & Move-In Setup'
        ],
        tags: ['Custom Furniture', 'Italian Bouclé', 'Art Advisory'],
        image: '/images/aether.jpg'
      }
    ],

    craftShowcase: [
      {
        id: 'cs-1',
        tag: 'PRECISION MILLWORK CRAFT',
        title: 'Zero-Tolerance Joinery Ateliers',
        desc: 'We collaborate with heritage cabinetmakers in Japan and Italy who hand-finish each timber panel, hidden pivot door, and bespoke wardrobe system.',
        image: '/images/service_millwork.jpg'
      },
      {
        id: 'cs-2',
        tag: 'COLLABORATIVE ARCHITECTURE',
        title: 'Detailed Spatial Consultation',
        desc: 'We review floor plans and physical volume models with you at every stage, ensuring the final architecture reflects your habits and design vision.',
        image: '/images/service_architecture.jpg'
      }
    ],

    phases: [
      {
        id: 'ph1',
        phase: 'Phase 01',
        duration: 'Weeks 1 – 3',
        title: 'Discovery & Spatial Brief',
        desc: 'We analyze your lifestyle rituals, catalog required storage, inspect site architecture, and establish clear material aspirations and budgets.'
      },
      {
        id: 'ph2',
        phase: 'Phase 02',
        duration: 'Weeks 4 – 8',
        title: 'Architectural Concept & 3D Study',
        desc: 'We develop detailed spatial plans, volume models, and physical material palettes. You walk through 3D perspectives to experience your future home before building begins.'
      },
      {
        id: 'ph3',
        phase: 'Phase 03',
        duration: 'Weeks 9 – 14',
        title: 'Technical Specs & Millwork Engineering',
        desc: 'Our architects draw every zero-tolerance cabinet, concealed pivot door, stone detail, and lighting layout with complete engineering documentation for master contractors.'
      },
      {
        id: 'ph4',
        phase: 'Phase 04',
        duration: 'Weeks 15 – 30+',
        title: 'Turnkey Construction & White-Glove Handover',
        desc: 'We manage construction quality on-site, coordinate artisan joiners, install bespoke furnishings, calibrate lighting scenes, and hand over a fully finished, move-in-ready sanctuary.'
      }
    ],

    faqs: [
      {
        id: 'faq1',
        q: 'What scale of projects does AURA undertake?',
        a: 'We specialize in comprehensive private residential penthouses, full-floor apartments, townhouses, contemporary villas, and bespoke private dining spaces starting from 250 m² (2,700 sq ft) upward.'
      },
      {
        id: 'faq2',
        q: 'Do you manage projects internationally outside Japan?',
        a: 'Yes. Our three permanent ateliers in Tokyo, New York, and Milan regularly oversee luxury projects throughout North America, Europe, the UK, Japan, and the Asia-Pacific region.'
      },
      {
        id: 'faq3',
        q: 'Can we work with our own preferred general contractor?',
        a: 'Absolutely. We provide complete technical architectural drawing packages and regularly partner with client-appointed builders while providing rigorous weekly on-site architectural oversight.'
      },
      {
        id: 'faq4',
        q: 'How are design and management fees structured?',
        a: 'We operate on a transparent, milestone-based architectural fee structure determined by project square meterage and scope complexity, ensuring total financial clarity from day one.'
      }
    ]
  },

  // ================= INCOMING LEADS / INQUIRIES =================
  inquiries: [
    {
      id: 'inq-101',
      name: 'Alexander Sterling',
      email: 'a.sterling@sterlingcapital.com',
      location: 'Minato-ku, Tokyo',
      size: 'Over 600 m² (Full Residence / Estate)',
      message: 'Looking to commission full turnkey interior architecture and custom millwork for our newly acquired penthouse duplex overlooking Tokyo Tower.',
      date: '2026-08-18 14:22',
      status: 'New'
    },
    {
      id: 'inq-102',
      name: 'Charlotte Dubois',
      email: 'c.dubois@luxeglobal.fr',
      location: 'SoHo, New York',
      size: '300 - 600 m² (Townhouse / Penthouse)',
      message: 'Renovating a historic cast-iron loft. Interested in warm travertine stone accents, concealed kitchen storage, and custom bouclé furnishings.',
      date: '2026-08-17 09:45',
      status: 'In Review'
    }
  ],

  // ================= SETTINGS =================
  settings: {
    studioName: 'AURA Architectural Atelier',
    tagline: 'Interior architecture and turnkey delivery studios operating in Tokyo, New York, and Milan.',
    contactEmail: 'hello@aura-design.com',
    contactPhone: '+81 (0)3 5400 8820',
    instagram: 'https://instagram.com/aura.atelier',
    pinterest: 'https://pinterest.com/aura_interiors',
    linkedin: 'https://linkedin.com/company/aura-architectural-atelier',
    studios: [
      'Minato-ku, Tokyo',
      'SoHo, New York',
      'Brera, Milan',
      'Rue Saint-Honoré, Paris'
    ]
  }
};

const CMS_STORAGE_KEY = 'aura_cms_data_v1';

// Load CMS Data with fallback to defaults
export function loadCmsData() {
  try {
    const saved = localStorage.getItem(CMS_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(DEFAULT_CMS_DATA));
      return DEFAULT_CMS_DATA;
    }
    const parsed = JSON.parse(saved);
    return {
      ...DEFAULT_CMS_DATA,
      ...parsed,
      home: { 
        ...DEFAULT_CMS_DATA.home, 
        ...(parsed.home || {}),
        awards: Array.isArray(parsed.home?.awards) ? parsed.home.awards : DEFAULT_CMS_DATA.home.awards
      },
      about: { 
        ...DEFAULT_CMS_DATA.about, 
        ...(parsed.about || {}),
        stats: Array.isArray(parsed.about?.stats) ? parsed.about.stats : DEFAULT_CMS_DATA.about.stats,
        leadership: Array.isArray(parsed.about?.leadership) ? parsed.about.leadership : DEFAULT_CMS_DATA.about.leadership,
        processSteps: Array.isArray(parsed.about?.processSteps) ? parsed.about.processSteps : DEFAULT_CMS_DATA.about.processSteps
      },
      services: { 
        ...DEFAULT_CMS_DATA.services, 
        ...(parsed.services || {}),
        craftShowcase: Array.isArray(parsed.services?.craftShowcase) ? parsed.services.craftShowcase : DEFAULT_CMS_DATA.services.craftShowcase,
        disciplines: Array.isArray(parsed.services?.disciplines) ? parsed.services.disciplines : DEFAULT_CMS_DATA.services.disciplines,
        phases: Array.isArray(parsed.services?.phases) ? parsed.services.phases : DEFAULT_CMS_DATA.services.phases,
        faqs: Array.isArray(parsed.services?.faqs) ? parsed.services.faqs : DEFAULT_CMS_DATA.services.faqs
      },
      settings: { ...DEFAULT_CMS_DATA.settings, ...(parsed.settings || {}) },
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_CMS_DATA.projects,
      materials: Array.isArray(parsed.materials) ? parsed.materials : DEFAULT_CMS_DATA.materials,
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : DEFAULT_CMS_DATA.inquiries
    };
  } catch (err) {
    console.error('Failed to load CMS data from localStorage:', err);
    return DEFAULT_CMS_DATA;
  }
}

// Save CMS Data to localStorage and dispatch event
export function saveCmsData(data) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('aura_cms_updated', { detail: data }));
    return true;
  } catch (err) {
    console.error('Failed to save CMS data:', err);
    return false;
  }
}

// Reset CMS Data to default factory content
export function resetCmsData() {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(DEFAULT_CMS_DATA));
    window.dispatchEvent(new CustomEvent('aura_cms_updated', { detail: DEFAULT_CMS_DATA }));
    return DEFAULT_CMS_DATA;
  } catch (err) {
    console.error('Failed to reset CMS data:', err);
    return DEFAULT_CMS_DATA;
  }
}

// Add a new inquiry from the client contact modal
export function recordNewInquiry(inquiry) {
  const current = loadCmsData();
  const newEntry = {
    id: `inq-${Date.now()}`,
    name: inquiry.name || 'Anonymous Client',
    email: inquiry.email || 'No email provided',
    location: inquiry.location || 'Not specified',
    size: inquiry.size || '300 - 600 m²',
    message: inquiry.message || '',
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'New'
  };
  const updated = {
    ...current,
    inquiries: [newEntry, ...(current.inquiries || [])]
  };
  saveCmsData(updated);
  return newEntry;
}
