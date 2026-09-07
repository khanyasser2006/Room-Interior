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

export default function AboutPage({ 
  aboutData,
  settingsData,
  onNavigateHome, 
  onNavigateProjects, 
  onNavigateMaterials, 
  onNavigateServices, 
  onNavigateLogin,
  loggedInUser,
  onLogout,
  onNavigateSection, 
  onOpenInquiry,
  onOpenLegal
}) {
  const [timezones, setTimezones] = useState({ tokyo: '', ny: '', london: '' });

  useEffect(() => {
    // Scroll to top immediately on mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const ctx = gsap.context(() => {
      // 1. Hero Page Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.about-hero-eyebrow', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        clearProps: 'all'
      })
      .from('.about-hero-title', {
        y: 60,
        opacity: 0,
        duration: 1.0,
        clearProps: 'all'
      }, '-=0.4')
      .from('.about-hero-manifesto', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.6')
      .from('.about-hero-stats', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.6')
      .from('.about-atelier-photo', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        clearProps: 'all'
      }, '-=0.5');

      // 2. Scroll Sections with ScrollTrigger
      const sections = [
        { id: '#about-principles', cardClass: '.about-principle-card' },
        { id: '#about-leadership', cardClass: '.about-leader-card' },
        { id: '#about-process', cardClass: '.about-process-card' }
      ];

      sections.forEach(({ id, cardClass }) => {
        const sec = document.querySelector(id);
        if (!sec) return;

        gsap.from(sec.querySelectorAll('.about-sec-heading'), {
          y: 45,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        gsap.from(sec.querySelectorAll(cardClass), {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sec,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      });
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

  const defaultPrinciples = [
    {
      num: '01',
      title: 'Natural Light & Shadow',
      desc: 'We shape rooms around natural sunlight. Deep window reveals, soft cove illumination, and textured surfaces create an ever-shifting sense of warmth from sunrise to nightfall.'
    },
    {
      num: '02',
      title: 'Honest Material Textures',
      desc: 'We avoid artificial imitations. Every project features genuine quarried travertine stone, solid grain timber, and living bronze that develop rich patina and character over decades.'
    },
    {
      num: '03',
      title: 'Acoustic & Sensory Serenity',
      desc: 'True comfort is silent. We integrate micro-perforated acoustic timber baffles and concealed insulation into walls and ceilings to shield your home from outside metropolitan noise.'
    },
    {
      num: '04',
      title: 'Designed Around Your Rituals',
      desc: 'We do not impose a standard layout. Every floor plan, concealed storage wall, and lighting scene is customized to elevate how you cook, unwind, entertain, and rest.'
    }
  ];

  const defaultLeadership = [
    {
      name: 'Kenzo Takahashi',
      role: 'Principal Architect & Spatial Director',
      location: 'Tokyo Atelier',
      bio: 'Trained at the University of Tokyo and Swiss Federal Institute of Technology. Specializes in minimal spatial flow, chiaroscuro lighting, and seamless indoor-outdoor Japanese gardens.'
    },
    {
      name: 'Elena Rossi',
      role: 'Head of Materiality & Millwork',
      location: 'Milan Atelier',
      bio: 'Master of Architecture from Politecnico di Milano. Directs our natural quarry sourcing across Italy and oversees bespoke joinery engineering with heritage cabinetmakers.'
    },
    {
      name: 'Julian Hayes',
      role: 'Managing Director & Construction Lead',
      location: 'New York Atelier',
      bio: 'Over two decades delivering complex residential architecture in Manhattan, Aspen, and London. Ensures zero-tolerance construction precision and turnkey delivery.'
    }
  ];

  const defaultProcessSteps = [
    {
      step: '01',
      title: 'Discovery & Spatial Vision',
      desc: 'We meet to understand your lifestyle, daily routines, functional needs, and architectural preferences. We assess your property’s light, proportions, and structural possibilities.'
    },
    {
      step: '02',
      title: 'Architectural Concept & 3D Study',
      desc: 'We develop detailed spatial plans, volume models, and curated material boards. You experience how every room, sightline, and lighting fixture connects before construction begins.'
    },
    {
      step: '03',
      title: 'Custom Millwork & Precision Specs',
      desc: 'Our architects draw every zero-tolerance cabinet, concealed pivot door, and custom bathroom stone detail with full engineering specifications.'
    },
    {
      step: '04',
      title: 'Turnkey Build & White-Glove Styling',
      desc: 'We supervise construction on-site, manage artisan fabricators, install custom furnishings, and calibrate lighting so you step into a fully completed, move-in-ready home.'
    }
  ];

  const currentPrinciples = aboutData?.principles?.length ? aboutData.principles : defaultPrinciples;
  const currentLeadership = aboutData?.leadership?.length ? aboutData.leadership : defaultLeadership;
  const currentProcess = aboutData?.processSteps?.length ? aboutData.processSteps : defaultProcessSteps;
  const currentStats = aboutData?.stats?.length ? aboutData.stats : [
    { value: '$140M+', label: 'Completed Value' },
    { value: '16', label: 'Design Awards' },
    { value: '03', label: 'Global Studios' },
    { value: '100%', label: 'Custom Craft' }
  ];

  return (
    <div className="page-enter-fade relative w-full min-h-screen bg-[#070707] text-[#F3F2EE] font-sans antialiased overflow-x-hidden">
      
      {/* ================= STICKY TOP NAVIGATION ================= */}
      <Navbar 
        currentPage="about"
        loggedInUser={loggedInUser}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateProjects={onNavigateProjects}
        onNavigateMaterials={onNavigateMaterials}
        onNavigateServices={onNavigateServices}
        onNavigateLogin={onNavigateLogin}
        onLogout={onLogout}
        onNavigateSection={onNavigateSection}
        onOpenInquiry={onOpenInquiry}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative pt-44 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <button 
          onClick={onNavigateHome}
          className="about-hero-eyebrow group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-luxury-accent transition-colors mb-8"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </button>

        <div className="about-hero-eyebrow flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
          <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
          <span>{aboutData?.heroTag || 'ABOUT AURA ATELIER'}</span>
        </div>

        <h1 className="about-hero-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.92] tracking-tight mb-8">
          {aboutData?.heroHeading ? (
            <span>{aboutData.heroHeading}</span>
          ) : (
            <>
              <span>Designing Spaces</span> <br />
              <span className="italic text-luxury-accent font-normal">Of Quiet Permanence</span>
            </>
          )}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6 border-t border-white/10">
          <p className="about-hero-manifesto lg:col-span-8 text-lg sm:text-xl text-white/80 font-light leading-relaxed">
            {aboutData?.manifestoQuote || 'Founded in 2018, AURA is an international interior architecture studio with creative ateliers in Tokyo, New York, and Milan. We collaborate with discerning homeowners and developers to design private residences, penthouses, and hospitality spaces that combine calm architectural clarity with honest material richness.'}
          </p>

          <div className="about-hero-stats lg:col-span-4 grid grid-cols-2 gap-6 bg-[#111111] p-6 rounded-2xl border border-white/5 luxury-card-hover">
            {currentStats.map((stat, idx) => (
              <div key={stat.id || idx}>
                <div className="font-serif text-3xl text-luxury-accent mb-1">{stat.value}</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ================= STUDIO ATELIER PHOTOGRAPHY ================= */}
      <section className="px-6 md:px-20 max-w-7xl mx-auto mb-32">
        <div className="about-atelier-photo relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#141414] border border-white/10 shadow-2xl">
          <img 
            src={aboutData?.atelierImage || '/images/atelier_studio.jpg'} 
            alt="AURA Design Studio Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-luxury-accent mb-1">
                OUR WORKING ATELIER
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-white">
                {aboutData?.atelierTitle || 'Where material research meets structural precision.'}
              </div>
            </div>
            <span className="text-xs font-mono tracking-widest text-white/60 uppercase px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              Tokyo &bull; Milan &bull; New York
            </span>
          </div>
        </div>
      </section>

      {/* ================= OUR 4 DESIGN PRINCIPLES ================= */}
      <section id="about-principles" className="bg-[#0a0a0a] py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-20">
            <div className="about-sec-heading flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
              <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
              <span>OUR PHILOSOPHY</span>
            </div>
            <h2 className="about-sec-heading font-serif text-4xl sm:text-6xl md:text-7xl font-light">
              <span>Four Principles of</span> <br />
              <span className="italic text-luxury-accent font-normal">Thoughtful Design</span>
            </h2>
            <p className="about-sec-heading text-white/70 font-light text-base sm:text-lg mt-6 leading-relaxed">
              We believe a home should feel calming, intuitive, and enduring. These four commitments guide every room we draw and every material we select.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentPrinciples.map((p, idx) => (
              <div 
                key={p.id || p.num || idx}
                className="about-principle-card p-8 md:p-12 rounded-3xl bg-[#111111] border border-white/5 hover:border-luxury-accent/40 transition-all group luxury-card-hover"
              >
                <div className="font-mono text-2xl text-luxury-accent mb-6 flex items-center justify-between">
                  <span>{p.num || `0${idx + 1}`}</span>
                  <div className="w-8 h-8 rounded-full bg-luxury-accent/10 flex items-center justify-center text-luxury-accent text-xs">
                    <Sparkles size={14} />
                  </div>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-4 group-hover:text-luxury-accent transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= STUDIO LEADERSHIP ================= */}
      <section id="about-leadership" className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="about-sec-heading flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
              <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
              <span>STUDIO PARTNERS</span>
            </div>
            <h2 className="about-sec-heading font-serif text-4xl sm:text-6xl md:text-7xl font-light">
              Architectural <span className="italic text-luxury-accent">Leadership</span>
            </h2>
          </div>
          <p className="about-sec-heading max-w-md text-sm text-white/60 font-light">
            Each project is led directly by one of our three founding partners, ensuring personal dedication from initial sketch to move-in day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentLeadership.map((leader, i) => (
            <div 
              key={leader.id || i} 
              className="about-leader-card p-8 rounded-3xl bg-[#101010] border border-white/5 hover:border-luxury-accent/30 transition-all flex flex-col justify-between luxury-card-hover"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-luxury-accent mb-4">
                  <MapPin size={12} />
                  <span>{leader.location}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1">{leader.name}</h3>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">
                  {leader.role}
                </div>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-6">
                  {leader.bio}
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-luxury-accent uppercase tracking-widest flex items-center gap-2">
                <span>Direct Oversight</span> &bull; <span>100% Bespoke</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR 4-STEP PROCESS ================= */}
      <section id="about-process" className="bg-[#0a0a0a] py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-20">
            <div className="about-sec-heading flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
              <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
              <span>HOW WE WORK</span>
            </div>
            <h2 className="about-sec-heading font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight">
              <span>A Seamless,</span> <br />
              <span className="italic text-luxury-accent font-normal">Transparent Process</span>
            </h2>
            <p className="about-sec-heading text-white/70 font-light text-base sm:text-lg mt-6 leading-relaxed">
              We manage all phases—from municipal permits and structural engineering to custom joinery fabrication and fine art procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProcess.map((step, idx) => (
              <div 
                key={step.id || step.step || idx}
                className="about-process-card p-8 rounded-3xl bg-[#111111] border border-white/5 hover:border-luxury-accent/30 transition-all flex flex-col justify-between luxury-card-hover"
              >
                <div>
                  <div className="font-mono text-3xl text-luxury-accent mb-6 font-light">
                    {step.step || `0${idx + 1}`}
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  <Check size={12} className="text-luxury-accent" />
                  <span>Phase Milestone</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-[#161616] via-[#101010] to-[#0a0a0a] border border-luxury-accent/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-accent/15 rounded-full blur-[140px] pointer-events-none" />
          
          <span className="text-xs font-mono uppercase tracking-mega-wide text-luxury-accent mb-4 inline-block">
            COMMISSION INQUIRY
          </span>
          
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light mb-6">
            Ready to Design <br />
            <span className="italic text-luxury-accent">Your Dream Home?</span>
          </h2>
          
          <p className="text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Let’s discuss your vision, space parameters, and timeline. Our partners will prepare a tailored consultation for your property.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={onOpenInquiry}
              className="px-10 py-5 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-luxury-accent/20 flex items-center gap-3"
            >
              Schedule a Consultation <ArrowUpRight size={16} />
            </button>
            <button
              onClick={onNavigateHome}
              className="px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-xs uppercase tracking-widest font-mono"
            >
              Back to Home
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
                <li><button onClick={onNavigateProjects} className="hover:text-white transition-colors">Portfolio Archive</button></li>
                <li><button onClick={onNavigateMaterials} className="hover:text-white transition-colors">Materials & Provenance</button></li>
                <li><button onClick={onNavigateServices} className="hover:text-white transition-colors">Architectural Services</button></li>
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
