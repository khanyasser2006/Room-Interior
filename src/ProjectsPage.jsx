import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import { 
  ArrowUpRight, 
  ArrowLeft,
  Sparkles, 
  Compass, 
  Check, 
  Layers, 
  Sliders, 
  ShieldCheck,
  Send,
  MapPin,
  Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ALL_PROJECTS = [
  {
    id: 'obsidian',
    title: 'The Obsidian Residence',
    subtitle: 'Warm Travertine Stone & Smoked Oak',
    location: 'Roppongi, Tokyo',
    year: '2025',
    area: '620 m² (6,670 sq ft)',
    category: 'Residential',
    image: '/images/obsidian.jpg',
    tagline: 'A calm, modern penthouse designed with dark wood, soft stone, and panoramic city views.',
    narrative: 'Designed as a quiet sanctuary above Tokyo’s bustling skyline, The Obsidian Residence balances clean modern architecture with warm, natural materials. Custom fluted concrete walls soften incoming daylight, while hand-finished silver travertine stone anchors the spacious double-height living room.',
    highlights: ['Custom Fluted Wall Panels', 'Concealed Ambient Lighting', 'Natural Stone Fireplace']
  },
  {
    id: 'aether',
    title: 'Aether Sky Penthouse',
    subtitle: 'Curved Furniture, Architectural Columns & Warm Oak',
    location: 'Tribeca, New York',
    year: '2026',
    area: '480 m² (5,160 sq ft)',
    category: 'Penthouses',
    image: '/images/aether.jpg',
    tagline: 'An open, sunlit loft with soft curved furniture, warm oak, and floor-to-ceiling windows.',
    narrative: 'A bright, spacious penthouse in lower Manhattan featuring expressive structural columns and continuous panoramic glass. The design combines soft textured fabrics with smooth concrete floors and custom warm bronze accents.',
    highlights: ['Curved Bouclé Sectional Sofa', 'Smooth Polished Concrete Floors', 'Custom Warm Bronze Fixtures']
  },
  {
    id: 'como',
    title: 'Villa Lumina on Lake Como',
    subtitle: 'Italian Travertine, Bronze Framing & Sunset Glass',
    location: 'Bellagio, Lake Como',
    year: '2025',
    area: '780 m² (8,400 sq ft)',
    category: 'Residential',
    image: '/images/project_como.jpg',
    tagline: 'A modern waterfront villa framing panoramic alpine lake vistas with open travertine terraces.',
    narrative: 'Perched along the historic shoreline of Lake Como, Villa Lumina seamlessly dissolves the boundary between indoors and the water. Expansive Italian travertine terraces step down to an infinity reflection pool, sheltered by thin-profile bronze glass frames.',
    highlights: ['Honed Tivoli Travertine Terraces', 'Zero-Threshold Sliding Glass', 'Monolithic Stone Outdoor Hearth']
  },
  {
    id: 'aspen',
    title: 'The Alpine Monolith',
    subtitle: 'Charred Cedar, Rough Stone & Mountain Views',
    location: 'Aspen, Colorado',
    year: '2026',
    area: '540 m² (5,810 sq ft)',
    category: 'Penthouses',
    image: '/images/project_aspen.jpg',
    tagline: 'A warm mountain residence combining dark timber with grand double-height glass.',
    narrative: 'Framed against the dramatic snow-covered peaks of the Rocky Mountains, this alpine residence pairs robust charred cedar facades with a towering natural quarry stone fireplace and warm Douglas fir roof beams.',
    highlights: ['Double-Height Timber Beams', 'Quarried Stone Fireplace', 'Heated Outdoor Viewing Terrace']
  },
  {
    id: 'kyoto',
    title: 'Kyoto Pavilion & Dining',
    subtitle: 'Charred Timber & Warm Amber Lighting',
    location: 'Higashiyama, Kyoto',
    year: '2025',
    area: '340 m² (3,660 sq ft)',
    category: 'Boutique & Dining',
    image: '/images/kyoto.jpg',
    tagline: 'A serene dining space inspired by Japanese craft, natural timber, and warm ambient light.',
    narrative: 'Set next to a quiet garden in Kyoto, this private dining space blends traditional Japanese charred cedar with a solid live-edge walnut dining table and soft, handcrafted lighting.',
    highlights: ['Traditional Charred Cedar Walls', 'Solid Walnut Dining Table', 'Handcrafted Glass Lighting']
  }
];

export default function ProjectsPage({ 
  projectsData = ALL_PROJECTS,
  settingsData,
  onNavigateHome, 
  onNavigateAbout, 
  onNavigateMaterials, 
  onNavigateServices, 
  onNavigateLogin,
  loggedInUser,
  onLogout,
  onOpenInquiry, 
  onOpenProjectDetail,
  onOpenLegal
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [timezones, setTimezones] = useState({ tokyo: '', ny: '', london: '' });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.projects-hero-eyebrow', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        clearProps: 'all'
      })
      .from('.projects-hero-title', {
        y: 60,
        opacity: 0,
        duration: 1.0,
        clearProps: 'all'
      }, '-=0.4')
      .from('.projects-hero-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.6')
      .from('.project-card-item', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        clearProps: 'all'
      }, '-=0.4');
    });

    const updateTimes = () => {
      const now = new Date();
      setTimezones({
        tokyo: new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now),
        ny: new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now),
        london: new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now),
      });
    };
    updateTimes();
    const clockTimer = setInterval(updateTimes, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(clockTimer);
      ctx.revert();
    };
  }, []);

  const categories = ['All', 'Residential', 'Penthouses', 'Boutique & Dining'];

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <div className="page-enter-fade relative w-full min-h-screen bg-[#070707] text-[#F3F2EE] font-sans antialiased overflow-x-hidden">
      
      {/* ================= STICKY TOP NAVIGATION ================= */}
      <Navbar 
        currentPage="projects"
        loggedInUser={loggedInUser}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateProjects={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateMaterials={onNavigateMaterials}
        onNavigateServices={onNavigateServices}
        onNavigateLogin={onNavigateLogin}
        onLogout={onLogout}
        onNavigateSection={() => {}}
        onOpenInquiry={onOpenInquiry}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative pt-44 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        <button 
          onClick={onNavigateHome}
          className="projects-hero-eyebrow group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-luxury-accent transition-colors mb-8"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </button>

        <div className="projects-hero-eyebrow flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
          <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
          <span>PORTFOLIO & ARCHIVE</span>
        </div>

        <h1 className="projects-hero-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.92] tracking-tight mb-8">
          <span>Architectural</span> <br />
          <span className="italic text-luxury-accent font-normal">Residences</span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between pt-8 border-t border-white/10 gap-8">
          <p className="projects-hero-desc max-w-2xl text-lg text-white/80 font-light leading-relaxed">
            A curated archive of bespoke private residences, sky penthouses, and bespoke hospitality spaces crafted with natural materials and timeless spatial harmony.
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-luxury-accent text-[#0a0a0a] font-semibold shadow-lg shadow-luxury-accent/20'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ================= PROJECTS GRID ================= */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => onOpenProjectDetail(project)}
              className="project-card-item group cursor-pointer bg-[#101010] rounded-3xl overflow-hidden border border-white/5 hover:border-luxury-accent/50 transition-all duration-500 flex flex-col justify-between shadow-2xl luxury-card-hover"
            >
              <div>
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#181818]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover luxury-img-zoom"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-luxury-accent">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-luxury-accent group-hover:text-[#0a0a0a] transition-all">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-white/40 mb-2">
                    <MapPin size={12} className="text-luxury-accent" />
                    <span>{project.location}</span> &bull; <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 group-hover:text-luxury-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-luxury-accent mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-sm text-white/60 font-light leading-relaxed mb-6 line-clamp-2">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.highlights?.map((hl, i) => (
                      <span key={i} className="text-[10px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-md">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2">
                <div className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-luxury-accent group-hover:text-[#0a0a0a] transition-all text-xs font-mono uppercase tracking-widest text-center text-white/70">
                  Explore Project & Full Specs
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-[#161616] via-[#101010] to-[#0a0a0a] border border-luxury-accent/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-accent/15 rounded-full blur-[140px] pointer-events-none" />
          
          <span className="text-xs font-mono uppercase tracking-mega-wide text-luxury-accent mb-4 inline-block">
            COMMISSION INQUIRY
          </span>
          
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light mb-6">
            Ready to Design <br />
            <span className="italic text-luxury-accent">Your Next Home?</span>
          </h2>
          
          <p className="text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Every project begins with a personal conversation. Contact our team to schedule an initial spatial consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={onOpenInquiry}
              className="px-10 py-5 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-luxury-accent/20 flex items-center gap-3"
            >
              Start Project Inquiry <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#050505] border-t border-white/10 px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <div className="font-serif text-4xl tracking-widest text-white mb-6">
                {settingsData?.studioName ? settingsData.studioName.split(' ')[0] : 'AURA'}
              </div>
              <p className="text-sm text-white/60 font-light max-w-sm leading-relaxed mb-8">
                {settingsData?.tagline || 'Interior architecture and design studios operating in Tokyo, New York, and Milan.'}
              </p>
              
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">TOKYO</div>
                  <div className="font-mono text-xs text-luxury-accent mt-1">{timezones.tokyo || '19:55:00'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">NEW YORK</div>
                  <div className="font-mono text-xs text-luxury-accent mt-1">{timezones.ny || '06:55:00'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">LONDON</div>
                  <div className="font-mono text-xs text-luxury-accent mt-1">{timezones.london || '11:55:00'}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:col-start-6">
              <div className="text-xs font-mono tracking-widest uppercase text-luxury-accent mb-6">EXPLORE</div>
              <ul className="space-y-4 text-xs font-light text-white/60 tracking-wider">
                <li><button onClick={onNavigateHome} className="hover:text-white transition-colors">Home Page</button></li>
                <li><button onClick={onNavigateAbout} className="hover:text-white transition-colors">About Our Studio</button></li>
                <li><button onClick={onNavigateMaterials} className="hover:text-white transition-colors">Materials Archive</button></li>
                <li><button onClick={onNavigateServices} className="hover:text-white transition-colors">Services</button></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="text-xs font-mono tracking-widest uppercase text-luxury-accent mb-6">STUDIOS</div>
              <ul className="space-y-4 text-xs font-light text-white/60 tracking-wider">
                {(settingsData?.studios || [
                  'Minato-ku, Tokyo',
                  'SoHo, New York',
                  'Brera, Milan',
                  'Rue Saint-Honoré, Paris'
                ]).map((studio, idx) => (
                  <li key={idx}>{studio}</li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="text-xs font-mono tracking-widest uppercase text-luxury-accent mb-6">CONTACT US</div>
              <div className="text-sm font-serif text-white mb-2">{settingsData?.contactEmail || 'hello@aura-design.com'}</div>
              <div className="text-xs font-mono text-white/50 mb-6">{settingsData?.contactPhone || '+81 (0)3 5400 8820'}</div>
              <div className="flex gap-4 text-xs font-mono uppercase tracking-widest text-luxury-accent">
                {settingsData?.instagram && (
                  <a href={settingsData.instagram.startsWith('http') ? settingsData.instagram : `https://instagram.com/${settingsData.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                )}
                &bull;
                {settingsData?.pinterest && (
                  <a href={settingsData.pinterest.startsWith('http') ? settingsData.pinterest : `https://pinterest.com/${settingsData.pinterest}`} target="_blank" rel="noopener noreferrer" className="hover:underline">Pinterest</a>
                )}
                &bull;
                {settingsData?.linkedin && (
                  <a href={settingsData.linkedin.startsWith('http') ? settingsData.linkedin : `https://linkedin.com/${settingsData.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                )}
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-white/30 uppercase tracking-widest gap-4">
            <div>&copy; {new Date().getFullYear()} {settingsData?.studioName ? settingsData.studioName.toUpperCase() : 'AURA ARCHITECTURAL ATELIER'}. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <button onClick={() => onOpenLegal?.('privacy')} className="hover:text-white transition-colors">PRIVACY POLICY</button>
              <button onClick={() => onOpenLegal?.('terms')} className="hover:text-white transition-colors">TERMS OF SERVICE</button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
