import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import { 
  ArrowUpRight, 
  ArrowLeft,
  Sparkles, 
  Layers, 
  Check, 
  ShieldCheck, 
  Sliders, 
  Send,
  MapPin,
  Clock,
  Feather,
  Flame,
  Volume2,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ALL_MATERIALS = [
  {
    id: 'travertine',
    title: 'Silver Travertine Stone',
    category: 'Quarried Stone',
    origin: 'Tivoli Quarries, Italy',
    texture: 'Honed Matte Surface',
    lifespan: '100+ Year Heritage',
    acoustic: 'Naturally Sound Dampening',
    image: '/images/mat_travertine.jpg',
    tagline: 'A classic Italian stone with linear silver striations that gently catches changing sunlight.',
    description: 'Extracted from the thermal water quarries of Tivoli outside Rome, our silver travertine is cross-cut to reveal organic horizontal mineral layers. Finished with a velvety honed surface, it feels cool and soothing to the touch while radiating subtle warmth when bathed in low evening lighting.',
    applications: ['Monolithic Fireplace Surrounds', 'Floating Bathroom Vanities', 'Zero-Threshold Flooring Slabs', 'Custom Coffee Tables'],
    provenance: 'Directly sourced from a fourth-generation family-owned quarry in Tivoli, selected slab-by-slab for consistent grain harmony.'
  },
  {
    id: 'yakisugi',
    title: 'Japanese Charred Cedar (Yakisugi)',
    category: 'Organic Timber',
    origin: 'Okayama Prefecture, Japan',
    texture: 'Deep Charred Alligator Scale',
    lifespan: '80+ Year Natural Durability',
    acoustic: 'High Absorption Baffle',
    image: '/images/mat_yakisugi.jpg',
    tagline: 'Traditional Japanese flame-treated cedar that provides deep charcoal tones and velvety tactile depth.',
    description: 'Yakisugi is an ancient Japanese woodworking method where solid cedar planks are gently flame-treated. The surface carbonizes into an iridescent, deep-charcoal texture that naturally resists insects, moisture, and aging without chemical sealants.',
    applications: ['Concealed Storage Walls', 'Pivot Door Portals', 'Acoustic Ceiling Slats', 'Dining Room Feature Paneling'],
    provenance: 'Hand-crafted by master timber artisans in Okayama using sustainably harvested Japanese Sugi cedar.'
  },
  {
    id: 'bronze',
    title: 'Hand-Brushed Warm Bronze',
    category: 'Warm Metals',
    origin: 'Florence & Milan Ateliers, Italy',
    texture: 'Hand-Waxed Satin Finish',
    lifespan: 'Living Metal (Ages with Touch)',
    acoustic: 'Solid Resonance',
    image: '/images/mat_bronze.jpg',
    tagline: 'A bespoke warm metal that develops deep amber character and unique luster over years of touch.',
    description: 'Unlike lacquered metals that look artificial, our solid bronze alloys are hand-brushed with directional grit and sealed only with beeswax. Everyday touch gradually deepens the patina, creating an evolving surface that records the life of your home.',
    applications: ['Custom Architectural Handles', 'Concealed Kitchen Trims', 'Pendant Lighting Armatures', 'Door Reveal Profiles'],
    provenance: 'Poured in historic foundries in Lombardy and hand-finished by master metalworkers in Florence.'
  },
  {
    id: 'boucle',
    title: 'Tactile Bouclé Wool Weave',
    category: 'Tactile Textiles',
    origin: 'Biella Wool Mills, Northern Italy',
    texture: 'Rich Looped Yarn Texture',
    lifespan: 'Heavy-Duty Domestic Wear',
    acoustic: 'Optimal Echo Reduction',
    image: '/images/mat_boucle.jpg',
    tagline: 'Heavy natural wool loops creating inviting softness, warm texture, and quiet acoustics.',
    description: 'Woven on slow shuttle looms in the foothills of the Italian Alps, this heavyweight bouclé combines pure virgin wool with natural linen. The rich, nubby texture catches soft ambient light and provides superior acoustic softness for peaceful living areas.',
    applications: ['Custom Curved Sectionals', 'Low Lounge Armchairs', 'Padded Acoustic Headboards', 'Custom Ottomans'],
    provenance: 'Spun from chemical-free undyed wool in Biella, celebrating the natural variations of genuine organic fiber.'
  }
];

export default function MaterialsPage({ 
  materialsData = ALL_MATERIALS,
  settingsData,
  onNavigateHome, 
  onNavigateAbout, 
  onNavigateProjects, 
  onNavigateServices, 
  onNavigateLogin,
  loggedInUser,
  onLogout,
  onOpenInquiry,
  onOpenLegal
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [timezones, setTimezones] = useState({ tokyo: '', ny: '', london: '' });

  useEffect(() => {
    // Scroll to top immediately on mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.materials-hero-eyebrow', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        clearProps: 'all'
      })
      .from('.materials-hero-title', {
        y: 60,
        opacity: 0,
        duration: 1.0,
        clearProps: 'all'
      }, '-=0.4')
      .from('.materials-hero-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.6')
      .from('.material-card-item', {
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
  }, [activeCategory]);

  const categories = ['All', 'Quarried Stone', 'Organic Timber', 'Warm Metals', 'Tactile Textiles'];

  const matList = materialsData || ALL_MATERIALS;
  const filtered = activeCategory === 'All'
    ? matList
    : matList.filter(m => m.category === activeCategory);

  return (
    <div className="page-enter-fade relative w-full min-h-screen bg-[#070707] text-[#F3F2EE] font-sans antialiased overflow-x-hidden">
      
      {/* ================= STICKY TOP NAVIGATION ================= */}
      <Navbar 
        currentPage="materials"
        loggedInUser={loggedInUser}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateProjects={onNavigateProjects}
        onNavigateMaterials={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
          className="materials-hero-eyebrow group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-luxury-accent transition-colors mb-8"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </button>

        <div className="materials-hero-eyebrow flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
          <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
          <span>PROVENANCE & CRAFT</span>
        </div>

        <h1 className="materials-hero-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.92] tracking-tight mb-8">
          <span>Honest Textures &</span> <br />
          <span className="italic text-luxury-accent font-normal">Living Materials</span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between pt-8 border-t border-white/10 gap-8">
          <p className="materials-hero-desc max-w-2xl text-lg text-white/80 font-light leading-relaxed">
            We curate genuine natural materials from independent Italian quarries, sustainable Japanese cedar forests, and heritage alpine foundries that age with grace.
          </p>

          <div className="materials-hero-desc flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-luxury-accent text-[#0a0a0a] font-semibold shadow-lg shadow-luxury-accent/20' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ================= COMPREHENSIVE MATERIAL CARDS GRID ================= */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((mat) => (
            <div 
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className="material-card-item group cursor-pointer bg-[#101010] rounded-3xl overflow-hidden border border-white/5 hover:border-luxury-accent/50 transition-all duration-500 flex flex-col justify-between shadow-2xl luxury-card-hover"
            >
              <div>
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#181818]">
                  <img 
                    src={mat.image} 
                    alt={mat.title}
                    className="w-full h-full object-cover luxury-img-zoom"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-luxury-accent">
                      {mat.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-luxury-accent group-hover:text-[#0a0a0a] transition-all">
                    <ArrowUpRight size={15} />
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-white/40 mb-2">
                    <MapPin size={12} className="text-luxury-accent" />
                    <span>{mat.origin}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 group-hover:text-luxury-accent transition-colors">
                    {mat.title}
                  </h3>
                  <p className="text-xs font-mono text-luxury-accent mb-4">
                    {mat.texture}
                  </p>
                  <p className="text-sm text-white/60 font-light leading-relaxed mb-6 line-clamp-2">
                    {mat.tagline}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5 text-xs text-white/50">
                    <div><strong className="text-white/70 font-mono text-[10px] uppercase">Lifespan:</strong> {mat.lifespan}</div>
                    <div><strong className="text-white/70 font-mono text-[10px] uppercase">Acoustics:</strong> {mat.acoustic}</div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2">
                <div className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-luxury-accent group-hover:text-[#0a0a0a] transition-all text-xs font-mono uppercase tracking-widest text-center text-white/70">
                  Inspect Material & Sourcing
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= MATERIAL DETAIL INSPECTION MODAL ================= */}
      {selectedMaterial && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-2xl animate-fadeIn overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div className="relative w-full max-w-3xl bg-[#111111] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={20} />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-luxury-accent mb-2">
              {selectedMaterial.category} &bull; {selectedMaterial.origin}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-2">{selectedMaterial.title}</h2>
            <p className="text-xs font-mono text-luxury-accent mb-6">{selectedMaterial.texture}</p>

            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-[#181818]">
              <img src={selectedMaterial.image} alt={selectedMaterial.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6 text-sm text-white/80 font-light leading-relaxed">
              <p>{selectedMaterial.description}</p>
              
              {selectedMaterial.provenance && (
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-luxury-accent mb-2">PROVENANCE & QUARRYING:</div>
                  <p className="text-xs text-white/70">{selectedMaterial.provenance}</p>
                </div>
              )}

              {selectedMaterial.applications && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/50 mb-3">RECOMMENDED RESIDENTIAL APPLICATIONS:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterial.applications.map((app, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-mono text-white/70 border border-white/5">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedMaterial(null);
                  onOpenInquiry();
                }}
                className="w-full py-4 rounded-xl bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-luxury-accent/20 flex items-center justify-center gap-2"
              >
                Request Material Sample Kit <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-[#161616] via-[#101010] to-[#0a0a0a] border border-luxury-accent/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-accent/15 rounded-full blur-[140px] pointer-events-none" />
          
          <span className="text-xs font-mono uppercase tracking-mega-wide text-luxury-accent mb-4 inline-block">
            MATERIAL CURATION
          </span>
          
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light mb-6">
            Experience Our <br />
            <span className="italic text-luxury-accent">Material Library</span>
          </h2>
          
          <p className="text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10">
            We curate bespoke physical sample boxes tailored to your residential concept—featuring cut stone, smoked oak veneers, and living bronze swatches.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={onOpenInquiry}
              className="px-10 py-5 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-luxury-accent/20 flex items-center gap-3"
            >
              Request Material Sample Kit <ArrowUpRight size={16} />
            </button>
            <button
              onClick={onNavigateHome}
              className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-xs uppercase tracking-widest font-mono"
            >
              Return to Home
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER WITH LIVE WORLD CLOCKS ================= */}
      <footer className="bg-[#050505] border-t border-white/10 px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <div className="font-serif text-4xl tracking-widest text-white mb-6">
                {settingsData?.studioName ? settingsData.studioName.split(' ')[0] : 'AURA'}
              </div>
              <p className="text-sm text-white/60 font-light max-w-sm leading-relaxed mb-8">
                {settingsData?.tagline || 'Interior architecture and material curation studios operating in Tokyo, New York, and Milan.'}
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
                <li><button onClick={onNavigateProjects} className="hover:text-white transition-colors">Projects Portfolio</button></li>
                <li><button onClick={() => onNavigateServices?.()} className="hover:text-white transition-colors">Services</button></li>
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
