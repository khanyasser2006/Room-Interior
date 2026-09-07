import React, { useEffect, useRef } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowUpRight, 
  Check, 
  Sparkles, 
  Compass, 
  Layers, 
  Sliders, 
  Maximize2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function ProjectDetailModal({ project, onClose, onOpenInquiry }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Focus modal container on mount
    modalRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  // Project Gallery images
  const gallery = [
    {
      src: project.image,
      title: 'Double-Height Living Room & Stone Fireplace',
      desc: 'Floor-to-ceiling panoramic glass windows with a custom natural stone fireplace and warm ambient lighting.'
    },
    {
      src: project.id === 'obsidian' ? '/images/obsidian_kitchen.jpg' : '/images/aether.jpg',
      title: 'Modern Kitchen & Black Marble Island',
      desc: 'Natural black marble waterfall island paired with warm fluted oak cabinets and premium built-in appliances.'
    },
    {
      src: project.id === 'obsidian' ? '/images/obsidian_bedroom.jpg' : '/images/kyoto.jpg',
      title: 'Master Bedroom Suite & Skyline Views',
      desc: 'Textured fluted feature wall with a custom bouclé bed, warm wooden flooring, and evening city views.'
    }
  ];

  const spacesBreakdown = [
    { name: 'Grand Living Room', size: '180 m² (1,940 sq ft)', height: '6.2m Ceiling', finish: 'Silver Travertine Stone & Fluted Walls' },
    { name: 'Modern Kitchen & Dining', size: '65 m² (700 sq ft)', height: '3.4m Ceiling', finish: 'Black Marble & Smoked Oak Cabinets' },
    { name: 'Primary Master Suite', size: '140 m² (1,500 sq ft)', height: '3.6m Ceiling', finish: 'Custom Bouclé & Built-in Wardrobes' },
    { name: 'Private Spa & Bathroom', size: '55 m² (590 sq ft)', height: '3.4m Ceiling', finish: 'Natural Slate & Japanese Hinoki Wood' },
    { name: 'Sky Terrace & Lounge', size: '180 m² (1,940 sq ft)', height: 'Outdoor', finish: 'Natural Wood Decking & Custom Planters' }
  ];

  const furnishings = [
    { piece: 'Custom Travertine Coffee Table', designer: 'AURA Custom Design', origin: 'Italian Natural Stone' },
    { piece: 'Classic Heritage Armchairs', designer: 'Pierre Jeanneret Style', origin: 'Solid Teak & Natural Cane' },
    { piece: 'Minimalist Brass Pendant Light', designer: 'Designer Luminaire', origin: 'Custom Warm Suspension' },
    { piece: 'Modular Curved Sectional Sofa', designer: 'Articulated Lounge Series', origin: 'Charcoal Textured Velvet' }
  ];

  return (
    <div 
      ref={modalRef}
      tabIndex={0}
      data-lenis-prevent="true"
      className="page-enter-fade fixed inset-0 z-50 overflow-y-auto bg-[#070707] text-[#F3F2EE] font-sans antialiased outline-none overscroll-contain"
    >
      
      {/* ================= STICKY TOP NAV BAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-5 flex justify-between items-center bg-[#070707]/80 backdrop-blur-xl border-b border-white/10">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-luxury-accent transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-wider text-white hidden sm:inline">{project.title}</span>
          <span className="text-[11px] font-mono tracking-widest text-luxury-accent uppercase px-3 py-1 bg-white/5 rounded-full border border-white/10">
            {project.category}
          </span>
        </div>

        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-luxury-accent/60 hover:bg-luxury-accent/10 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-luxury-accent transition-all"
        >
          <span>CLOSE</span>
          <X size={14} />
        </button>
      </header>

      {/* ================= FULL-BLEED MONUMENTAL HERO ================= */}
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col justify-end p-8 md:p-20 pt-32 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/40 to-black/30" />
        
        <div className="relative z-10 max-w-6xl">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest text-luxury-accent uppercase mb-4">
            <span>PROJECT CASE STUDY</span>
            <span>&bull;</span>
            <span>{project.location}</span>
            <span>&bull;</span>
            <span>{project.area}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] tracking-tight mb-6">
            {project.title}
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl text-luxury-accent max-w-3xl mb-8 leading-snug">
            "{project.subtitle}"
          </p>

          <p className="max-w-2xl text-base md:text-lg text-white/80 font-light leading-relaxed">
            {project.narrative || project.tagline}
          </p>
        </div>

        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50">
          <span>SCROLL TO VIEW CASE STUDY</span>
          <ChevronDown size={14} className="animate-bounce text-luxury-accent" />
        </div>
      </section>

      {/* ================= EXECUTIVE SPEC MATRIX ================= */}
      <section className="relative z-10 bg-[#070707] border-y border-white/10 px-6 md:px-20 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">LOCATION</div>
            <div className="font-serif text-xl text-white">{project.location}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">TOTAL AREA</div>
            <div className="font-serif text-xl text-white">{project.area}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">YEAR COMPLETED</div>
            <div className="font-serif text-xl text-white">{project.year}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">SERVICE</div>
            <div className="font-serif text-xl text-white">Full Interior Design & Build</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">PROJECT TYPE</div>
            <div className="font-serif text-xl text-luxury-accent">{project.category}</div>
          </div>
        </div>
      </section>

      {/* ================= DETAILED ARCHITECTURAL DOSSIER ================= */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-24">
        
        {/* Design Story & Goals */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent">
              <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
              THE DESIGN STORY
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light leading-tight">
              A calm, modern home designed around natural light and skyline views.
            </h2>
            
            <p className="text-white/70 font-light text-base md:text-lg leading-relaxed">
              Designed for a private homeowner, the goal was to transform this top-floor space into a warm, peaceful home that offers a quiet escape from the city while framing panoramic skyline views.
            </p>

            <p className="text-white/60 font-light text-base leading-relaxed">
              The layout flows naturally from a warm, wood-paneled entrance into a spacious double-height living room featuring custom fluted wall panels and a solid natural stone fireplace.
            </p>

            <div className="p-8 rounded-2xl bg-[#111111] border-l-2 border-luxury-accent">
              <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
                “We focused on creating an open, welcoming atmosphere where every material feels pleasant to the touch and every room feels naturally bright throughout the day.”
              </p>
              <div className="text-xs font-mono tracking-widest uppercase text-luxury-accent">
                &mdash; AURA DESIGN TEAM
              </div>
            </div>
          </div>

          {/* Project Specifications Sheet */}
          <div className="lg:col-span-5 bg-[#111111] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="font-serif text-2xl text-white mb-6 flex items-center justify-between">
              <span>Project Details</span>
              <Sparkles size={18} className="text-luxury-accent" />
            </h3>

            <div className="space-y-4 divide-y divide-white/5 text-xs font-sans">
              <div className="pt-4 flex justify-between items-start gap-4">
                <span className="text-white/40 uppercase font-mono">Scope of Work</span>
                <span className="text-white font-medium text-right">Complete Interior Architecture & Furnishing</span>
              </div>
              <div className="pt-4 flex justify-between items-start gap-4">
                <span className="text-white/40 uppercase font-mono">Custom Features</span>
                <span className="text-white font-medium text-right">Fluted Wall Panels & Built-in Cabinetry</span>
              </div>
              <div className="pt-4 flex justify-between items-start gap-4">
                <span className="text-white/40 uppercase font-mono">Smart Lighting</span>
                <span className="text-white font-medium text-right">Automated Dimmable Warm LED System</span>
              </div>
              <div className="pt-4 flex justify-between items-start gap-4">
                <span className="text-white/40 uppercase font-mono">Sound Insulation</span>
                <span className="text-white font-medium text-right">Acoustic Wood Ceiling & Wall Panels</span>
              </div>
              <div className="pt-4 flex justify-between items-start gap-4">
                <span className="text-white/40 uppercase font-mono">Climate Control</span>
                <span className="text-white font-medium text-right">Concealed Quiet Air Conditioning</span>
              </div>
              <div className="pt-4 flex justify-between items-start gap-4">
                <span className="text-white/40 uppercase font-mono">Project Duration</span>
                <span className="text-white font-medium text-right">18 Months (Design to Move-in)</span>
              </div>
            </div>

            <button 
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="w-full mt-8 py-4 rounded-xl bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              Inquire About Similar Space <ArrowUpRight size={14} />
            </button>
          </div>

        </section>

        {/* ================= MULTI-ROOM PHOTOGRAPHIC TOUR ================= */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
                <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
                ROOM WALKTHROUGH
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl text-white font-light">
                Explore The <span className="italic text-luxury-accent">Spaces</span>
              </h2>
            </div>
            <p className="text-sm text-white/50 font-mono uppercase tracking-widest">
              3 EXHIBITED ROOM PERSPECTIVES
            </p>
          </div>

          <div className="space-y-20">
            {gallery.map((item, idx) => (
              <div key={idx} className="group bg-[#101010] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-[#181818]">
                  <img 
                    src={item.src} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-luxury-accent uppercase">
                    ROOM 0{idx + 1}
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 group-hover:text-luxury-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-xs font-mono tracking-widest uppercase text-luxury-accent flex items-center gap-2">
                    <span>High Resolution Photo</span>
                    <Sparkles size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SPATIAL SCHEDULE TABLE ================= */}
        <section className="mb-32">
          <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-6">
            <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
            ROOM SIZES & LAYOUT
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-light mb-12">
            Space <span className="italic text-luxury-accent">Dimensions</span>
          </h2>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {spacesBreakdown.map((sp, i) => (
              <div key={i} className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center hover:bg-white/[0.02] px-4 rounded-xl transition-colors">
                <div className="sm:col-span-4 font-serif text-xl text-white">
                  {sp.name}
                </div>
                <div className="sm:col-span-2 font-mono text-sm text-luxury-accent">
                  {sp.size}
                </div>
                <div className="sm:col-span-2 font-mono text-xs text-white/50">
                  {sp.height}
                </div>
                <div className="sm:col-span-4 text-xs text-white/60 font-light text-right sm:text-left">
                  {sp.finish}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CURATED OBJECT & FURNITURE MATRIX ================= */}
        <section className="mb-32">
          <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-6">
            <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
            FURNITURE & LIGHTING
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl text-white font-light mb-12">
            Selected <span className="italic text-luxury-accent">Furniture Pieces</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {furnishings.map((furn, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-luxury-accent/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-luxury-accent mb-3">
                    [ ITEM / 0{i + 1} ]
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2">{furn.piece}</h3>
                  <p className="text-xs text-white/60 font-light mb-4">Style: {furn.designer}</p>
                </div>
                <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
                  Material / Finish: {furn.origin}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BOTTOM ENGAGEMENT CTA ================= */}
        <section className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-[#161616] via-[#101010] to-[#0a0a0a] border border-luxury-accent/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-accent/15 rounded-full blur-[120px] pointer-events-none" />
          
          <span className="text-xs font-mono uppercase tracking-mega-wide text-luxury-accent mb-4 inline-block">
            START YOUR PROJECT
          </span>
          
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light mb-6">
            Ready to Design <br />
            <span className="italic text-luxury-accent">Your Next Space?</span>
          </h2>
          
          <p className="text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Every project starts with an initial consultation to understand your lifestyle, aesthetic goals, and timeline. Contact our design team to get started.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="px-10 py-5 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-luxury-accent/20 flex items-center gap-3"
            >
              Start a Project Inquiry <ArrowUpRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-xs uppercase tracking-widest font-mono"
            >
              Back to All Projects
            </button>
          </div>
        </section>

      </main>

      {/* ================= MODAL FOOTER ================= */}
      <footer className="border-t border-white/10 px-6 md:px-20 py-12 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-white/40 uppercase tracking-widest">
        <div>&copy; 2026 AURA ARCHITECTURAL ATELIER</div>
        <div className="mt-4 sm:mt-0 text-luxury-accent">TOKYO / NEW YORK / MILAN</div>
      </footer>

    </div>
  );
}
