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
  ChevronDown,
  Compass,
  Wrench,
  Sun,
  Sofa
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage({ 
  servicesData,
  settingsData,
  onNavigateHome, 
  onNavigateAbout, 
  onNavigateProjects, 
  onNavigateMaterials, 
  onNavigateServices, 
  onNavigateLogin,
  loggedInUser,
  onLogout,
  onOpenInquiry,
  onOpenLegal
}) {
  const [openFaq, setOpenFaq] = useState(null);
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

      tl.from('.services-hero-eyebrow', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        clearProps: 'all'
      })
      .from('.services-hero-title', {
        y: 60,
        opacity: 0,
        duration: 1.0,
        clearProps: 'all'
      }, '-=0.4')
      .from('.services-hero-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all'
      }, '-=0.6')
      .from('.service-discipline-card', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        clearProps: 'all'
      }, '-=0.4');

      // 2. Scroll Sections with ScrollTrigger
      const sections = [
        { id: '#services-craft', cardClass: '.services-craft-card' },
        { id: '#services-phases', cardClass: '.services-phase-card' },
        { id: '#services-faq', cardClass: '.services-faq-card' }
      ];

      sections.forEach(({ id, cardClass }) => {
        const sec = document.querySelector(id);
        if (!sec) return;

        gsap.from(sec.querySelectorAll('.services-sec-heading'), {
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

  const defaultDisciplines = [
    {
      num: '01',
      icon: Compass,
      title: 'Interior Architecture & Space Planning',
      tagline: 'Sculpting room proportions, flow, and sightlines for effortless daily living.',
      description: 'We restructure your home’s floor plan from the core. We analyze natural light trajectories, remove unnecessary partitions, elevate ceiling heights, and create a logical, calm flow connecting every living space.',
      deliverables: [
        '3D Spatial Volume & Light Studies',
        'Full Architectural CAD Drawing Sets',
        'Structural & Municipal Permit Drawings',
        'Room-by-Room Flow & Sightline Schedules'
      ]
    },
    {
      num: '02',
      icon: Wrench,
      title: 'Custom Millwork & Cabinetry Engineering',
      tagline: 'Zero-tolerance built-in joinery, hidden doors, and monolithic stone islands.',
      description: 'Every cabinet, concealed pivot door, and bathroom vanity is custom-engineered to the millimeter. We eliminate visual clutter by integrating concealed appliances, soft-close pocket panels, and seamless stone sinks.',
      deliverables: [
        '1:1 Millwork Shop Fabrication Drawings',
        'Custom Hardware & Bronze Trim Specs',
        'Natural Stone Quarry Slab Selection',
        'On-Site Joinery Installation Supervision'
      ]
    },
    {
      num: '03',
      icon: Sun,
      title: 'Architectural Lighting & Acoustic Design',
      tagline: 'Warm layered illumination and acoustic serenity engineered into walls and ceilings.',
      description: 'Lighting transforms a room’s atmosphere. We develop layered circadian lighting schemes (2700K to 2200K) using hidden cove lights, anti-glare downlights, and warm accent spots, paired with micro-perforated acoustic timber baffles.',
      deliverables: [
        'Photometric Lux & Glare Calculations',
        'Smart Lighting (Lutron / KNX) Scene Programming',
        'Concealed Architectural Cove Details',
        'Sound Isolation & Acoustic Attenuation Plans'
      ]
    },
    {
      num: '04',
      icon: Sofa,
      title: 'Furniture Sourcing, FF&E & White-Glove Styling',
      tagline: 'Curating collectible design pieces, bespoke rugs, and move-in-ready styling.',
      description: 'We hand-select bespoke designer furniture, custom wool & silk rugs, handcrafted ceramics, and fine art that complement your architecture. Our team manages international procurement, shipping, and white-glove unboxing.',
      deliverables: [
        'Curated FF&E Procurement Matrix',
        'Custom Upholstery & Fabric Sourcing',
        'International Freight & Customs Handling',
        'Complete White-Glove Move-In Styling'
      ]
    }
  ];

  const defaultCraftShowcase = [
    {
      image: '/images/service_millwork.jpg',
      tag: 'PRECISION MILLWORK CRAFT',
      title: 'Zero-Tolerance Joinery Ateliers',
      desc: 'We collaborate with heritage cabinetmakers in Japan and Italy who hand-finish each timber panel, hidden pivot door, and bespoke wardrobe system.'
    },
    {
      image: '/images/service_architecture.jpg',
      tag: 'COLLABORATIVE ARCHITECTURE',
      title: 'Detailed Spatial Consultation',
      desc: 'We review floor plans and physical volume models with you at every stage, ensuring the final architecture reflects your habits and design vision.'
    }
  ];

  const defaultPhases = [
    {
      phase: 'Phase 01',
      duration: 'Weeks 1 – 3',
      title: 'Vision, Brief & Feasibility',
      desc: 'We meet with you to review your property, daily rituals, functional requirements, timeline, and aesthetic preferences. We evaluate structural and daylight potential.'
    },
    {
      phase: 'Phase 02',
      duration: 'Weeks 4 – 8',
      title: 'Architectural Concept & 3D Study',
      desc: 'We develop detailed spatial plans, volume models, and physical material palettes. You walk through 3D perspectives to experience your future home before building begins.'
    },
    {
      phase: 'Phase 03',
      duration: 'Weeks 9 – 14',
      title: 'Technical Specs & Millwork Engineering',
      desc: 'Our architects draw every zero-tolerance cabinet, concealed pivot door, stone detail, and lighting layout with complete engineering documentation for master contractors.'
    },
    {
      phase: 'Phase 04',
      duration: 'Weeks 15 – 30+',
      title: 'Turnkey Construction & White-Glove Handover',
      desc: 'We manage construction quality on-site, coordinate artisan joiners, install bespoke furnishings, calibrate lighting scenes, and hand over a fully finished, move-in-ready sanctuary.'
    }
  ];

  const defaultFaqs = [
    {
      q: 'What scale of projects does AURA undertake?',
      a: 'We specialize in comprehensive private residential penthouses, full-floor apartments, townhouses, contemporary villas, and bespoke private dining spaces starting from 250 m² (2,700 sq ft) upward.'
    },
    {
      q: 'Do you manage projects internationally outside Japan?',
      a: 'Yes. Our three permanent ateliers in Tokyo, New York, and Milan regularly oversee luxury projects throughout North America, Europe, the UK, Japan, and the Asia-Pacific region.'
    },
    {
      q: 'Can we work with our own preferred general contractor?',
      a: 'Absolutely. We provide complete technical architectural drawing packages and regularly partner with client-appointed builders while providing rigorous weekly on-site architectural oversight.'
    },
    {
      q: 'How are design and management fees structured?',
      a: 'We operate on a transparent, milestone-based architectural fee structure determined by project square meterage and scope complexity, ensuring total financial clarity from day one.'
    }
  ];

  const currentDisciplines = servicesData?.disciplines?.length ? servicesData.disciplines : defaultDisciplines;
  const currentCraftShowcase = servicesData?.craftShowcase?.length ? servicesData.craftShowcase : defaultCraftShowcase;
  const currentPhases = servicesData?.phases?.length ? servicesData.phases : defaultPhases;
  const currentFaqs = servicesData?.faqs?.length ? servicesData.faqs : defaultFaqs;

  return (
    <div className="page-enter-fade relative w-full min-h-screen bg-[#070707] text-[#F3F2EE] font-sans antialiased overflow-x-hidden">
      
      {/* ================= STICKY TOP NAVIGATION ================= */}
      <Navbar 
        currentPage="services"
        loggedInUser={loggedInUser}
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateProjects={onNavigateProjects}
        onNavigateMaterials={onNavigateMaterials}
        onNavigateServices={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateLogin={onNavigateLogin}
        onLogout={onLogout}
        onNavigateSection={() => {}}
        onOpenInquiry={onOpenInquiry}
      />

      {/* ================= HERO HEADER ================= */}
      <header className="relative pt-44 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        <button 
          onClick={onNavigateHome}
          className="services-hero-eyebrow group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-luxury-accent transition-colors mb-8"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </button>

        <div className="services-hero-eyebrow flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
          <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
          <span>{servicesData?.servicesTag || 'COMPREHENSIVE DESIGN & EXECUTION'}</span>
        </div>

        <h1 className="services-hero-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-[0.92] tracking-tight mb-8">
          {servicesData?.servicesHeading ? (
            <span>{servicesData.servicesHeading}</span>
          ) : (
            <>
              <span>Architectural Services &</span> <br />
              <span className="italic text-luxury-accent font-normal">Turnkey Delivery</span>
            </>
          )}
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between pt-8 border-t border-white/10 gap-8">
          <p className="services-hero-desc max-w-2xl text-lg text-white/80 font-light leading-relaxed">
            {servicesData?.servicesText || 'From initial spatial restructuring and municipal permits to bespoke millwork engineering, circadian lighting design, and move-in styling—we manage the entire architectural journey with obsessive attention to detail.'}
          </p>

          <button 
            onClick={onOpenInquiry}
            className="services-hero-desc px-8 py-4 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-luxury-accent/20 flex items-center gap-3 self-start md:self-auto shrink-0 luxury-button-hover"
          >
            Start Project Inquiry <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      {/* ================= 4 CORE DISCIPLINES GRID ================= */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {currentDisciplines.map((disc, idx) => {
            const Icon = disc.icon || [Compass, Wrench, Sun, Sofa][idx % 4] || Sparkles;
            return (
              <div 
                key={disc.id || disc.num || idx}
                className="service-discipline-card group bg-[#111111] rounded-3xl p-8 md:p-12 border border-white/10 hover:border-luxury-accent/50 transition-all duration-500 flex flex-col justify-between shadow-2xl luxury-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-4xl text-luxury-accent/70 group-hover:text-luxury-accent transition-colors">
                      {disc.num || `0${idx + 1}`}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-luxury-accent group-hover:bg-luxury-accent group-hover:text-[#0a0a0a] transition-all">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3 group-hover:text-luxury-accent transition-colors">
                    {disc.title}
                  </h3>
                  <p className="text-xs font-mono tracking-wider text-luxury-accent mb-4">
                    {disc.tagline || disc.subtitle}
                  </p>
                  <p className="text-sm text-white/70 font-light leading-relaxed mb-8">
                    {disc.description || disc.desc}
                  </p>
                </div>

                {disc.deliverables && (
                  <div className="pt-6 border-t border-white/5">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-3">KEY DELIVERABLES:</div>
                    <ul className="space-y-2">
                      {disc.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-white/80 font-light">
                          <Check size={14} className="text-luxury-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* ================= EDITORIAL CRAFT SHOWCASE ================= */}
      <section id="services-craft" className="bg-[#0b0b0b] py-28 px-6 md:px-20 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {currentCraftShowcase.map((craft, idx) => (
              <div key={craft.id || idx} className="services-craft-card group rounded-3xl overflow-hidden bg-[#141414] border border-white/10 luxury-card-hover">
                <div className="overflow-hidden">
                  <img 
                    src={craft.image} 
                    alt={craft.title}
                    className="w-full aspect-[16/10] object-cover luxury-img-zoom"
                  />
                </div>
                <div className="p-8">
                  <div className="text-xs font-mono tracking-widest text-luxury-accent uppercase mb-2">{craft.tag}</div>
                  <h4 className="font-serif text-2xl text-white mb-2">{craft.title}</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {craft.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4-PHASE DELIVERY FRAMEWORK ================= */}
      <section id="services-phases" className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="services-sec-heading flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4">
          <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
          <span>OUR PROJECT DELIVERY METHOD</span>
        </div>
        <h2 className="services-sec-heading font-serif text-4xl sm:text-6xl text-white font-light mb-16">
          <span>A Transparent Four-Stage</span> <br />
          <span className="italic text-luxury-accent">Project Journey</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentPhases.map((ph, idx) => (
            <div 
              key={ph.id || idx} 
              className="services-phase-card p-8 rounded-2xl bg-white/[0.02] border border-white/5 relative flex flex-col justify-between luxury-card-hover"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase text-luxury-accent mb-4">
                  <span>{ph.phase}</span>
                  <span className="text-white/40">{ph.duration}</span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">{ph.title}</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                  {ph.desc}
                </p>
              </div>
              <div className="w-full h-[1px] bg-luxury-accent/30 mt-4" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQS ACCORDION ================= */}
      <section id="services-faq" className="bg-[#0a0a0a] py-28 px-6 md:px-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="services-sec-heading text-xs font-mono uppercase tracking-mega-wide text-luxury-accent mb-3">COMMON QUESTIONS</div>
            <h2 className="services-sec-heading font-serif text-4xl sm:text-5xl text-white font-light">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {currentFaqs.map((faq, idx) => (
              <div 
                key={faq.id || idx}
                className="services-faq-card rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-serif text-xl sm:text-2xl text-white">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-luxury-accent transition-transform duration-300 shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 sm:px-8 pb-8 text-sm text-white/70 font-light leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="p-12 md:p-20 rounded-3xl bg-gradient-to-br from-[#161616] via-[#101010] to-[#0a0a0a] border border-luxury-accent/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-accent/15 rounded-full blur-[140px] pointer-events-none" />
          
          <span className="text-xs font-mono uppercase tracking-mega-wide text-luxury-accent mb-4 inline-block">
            INITIAL CONSULTATION
          </span>
          
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light mb-6">
            Begin Your Architectural <br />
            <span className="italic text-luxury-accent">Transformation</span>
          </h2>
          
          <p className="text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed mb-10">
            Tell us about your property and goals. Our partners will prepare a tailored scope and feasibility overview.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={onOpenInquiry}
              className="px-10 py-5 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-luxury-accent/20 flex items-center gap-3"
            >
              Commission A Project <ArrowUpRight size={16} />
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
                {settingsData?.tagline || 'Interior architecture and turnkey delivery studios operating in Tokyo, New York, and Milan.'}
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
                <li><button onClick={onNavigateMaterials} className="hover:text-white transition-colors">Materials Archive</button></li>
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
