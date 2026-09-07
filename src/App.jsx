import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSequence from './HeroSequence';
import ProjectDetailModal from './ProjectDetailModal';
import AboutPage from './AboutPage';
import ProjectsPage, { ALL_PROJECTS } from './ProjectsPage';
import MaterialsPage from './MaterialsPage';
import ServicesPage from './ServicesPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AdminPage from './AdminPage';
import Navbar from './Navbar';
import SeoManager from './SeoManager';
import InquiryModal from './InquiryModal';
import LegalModal from './LegalModal';
import { loadCmsData, recordNewInquiry } from './cmsStore';
import { inquiryApi, sanitizeText } from './services/api';
import { 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Sliders, 
  ChevronRight, 
  Send,
  X,
  Volume2,
  VolumeX,
  Clock,
  MessageSquare
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = ALL_PROJECTS;

const MATERIALS = [
  {
    title: 'Silver Travertine Stone',
    origin: 'Tivoli, Italy',
    texture: 'Honed Matte Surface',
    desc: 'A classic natural Italian stone with subtle horizontal textures that reflect soft indoor lighting beautifully.'
  },
  {
    title: 'Yakisugi Charred Cedar',
    origin: 'Okayama, Japan',
    texture: 'Carbonized Deep Relief',
    desc: 'Traditional Japanese charred cedar wood that adds warmth, texture, and natural durability to interior spaces.'
  },
  {
    title: 'Hand-Finished Bronze',
    origin: 'Milan, Italy',
    texture: 'Hand-Waxed Brushed Luster',
    desc: 'Custom hand-finished bronze that develops a subtle, graceful patina over time.'
  },
  {
    title: 'Textured Bouclé Fabric',
    origin: 'Lyon, France',
    texture: 'Heavy Wool & Linen Weave',
    desc: 'Soft, high-comfort natural upholstery fabric with a tactile texture that makes living spaces feel calm and inviting.'
  }
];

const SERVICES = [
  {
    num: '01',
    name: 'Spatial Planning & Architecture',
    desc: 'Custom interior layouts, ceiling design, and spatial restructuring designed for modern luxury living.'
  },
  {
    num: '02',
    name: 'Custom Cabinetry & Joinery',
    desc: 'Bespoke built-in storage, fluted walls, and kitchen islands crafted from natural materials.'
  },
  {
    num: '03',
    name: 'Lighting & Atmosphere Design',
    desc: 'Layered warm lighting schemes (2700K) and acoustic planning for quiet, comfortable rooms.'
  },
  {
    num: '04',
    name: 'Turnkey Project Delivery',
    desc: 'Complete project management, from concept design to final furnishing and move-in setup.'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'projects' | 'materials' | 'services' | 'login' | 'register' | 'admin'
  const [cms, setCms] = useState(() => loadCmsData());
  const [activeCategory, setActiveCategory] = useState('All');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, tab: 'privacy' });
  const [selectedDetailProject, setSelectedDetailProject] = useState(null);
  const [activeProject, setActiveProject] = useState(ALL_PROJECTS[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [timezones, setTimezones] = useState({ tokyo: '', ny: '', london: '' });
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem('aura_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const lenisRef = useRef(null);

  const openLegal = (tab = 'privacy') => {
    setLegalModalState({ isOpen: true, tab });
  };

  // Sync CMS updates dynamically across tabs / sessions
  useEffect(() => {
    const handleCmsUpdate = (e) => {
      if (e.detail) {
        setCms(e.detail);
      } else {
        setCms(loadCmsData());
      }
    };
    window.addEventListener('aura_cms_updated', handleCmsUpdate);
    return () => window.removeEventListener('aura_cms_updated', handleCmsUpdate);
  }, []);

  // Lenis Smooth Scroll Engine + GSAP Sync
  useEffect(() => {
    if (currentPage !== 'home') return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Navbar visibility controller: strictly hide during hero video, reveal only below it
    const handleScrollUpdate = (scrollY) => {
      const heroThreshold = window.innerHeight * 3.1;
      setShowNav(scrollY >= heroThreshold);
    };

    lenis.on('scroll', (e) => {
      handleScrollUpdate(e.scroll);
    });

    const onNativeScroll = () => {
      handleScrollUpdate(window.scrollY);
    };
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    // Initial check
    handleScrollUpdate(window.scrollY);

    // Live World Clock interval
    const updateTimes = () => {
      const now = new Date();
      setTimezones({
        tokyo: new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now),
        ny: new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now),
        london: new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now),
      });
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      window.removeEventListener('scroll', onNativeScroll);
      clearInterval(timer);
    };
  }, [currentPage]);

  // Pause Lenis on background window when modal is open so mouse wheel scrolls modal freely
  useEffect(() => {
    if (selectedDetailProject || inquiryOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedDetailProject, inquiryOpen]);

  // Robust Hardware-Accelerated Reveal System (IntersectionObserver + GSAP)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const revealElements = document.querySelectorAll(
      '.home-reveal-eyebrow, .home-reveal-title, .home-reveal-desc, .home-reveal-card'
    );

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.75,
                ease: 'power3.out',
                clearProps: 'all'
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -30px 0px', threshold: 0.05 }
      );

      revealElements.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 24 });
        observer.observe(el);
      });

      // Absolute Safety Fallback: ensure all elements are 100% visible after 1.5s
      const safetyTimer = setTimeout(() => {
        revealElements.forEach((el) => {
          gsap.to(el, { opacity: 1, y: 0, x: 0, duration: 0.4, clearProps: 'all' });
        });
      }, 1500);

      return () => {
        observer.disconnect();
        clearTimeout(safetyTimer);
      };
    } else {
      // Fallback for environments without IntersectionObserver
      revealElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }, [currentPage, activeCategory]);

  const currentProjectList = cms.projects && cms.projects.length > 0 ? cms.projects : ALL_PROJECTS;
  const filteredProjects = activeCategory === 'All' 
    ? currentProjectList 
    : currentProjectList.filter(p => p.category === activeCategory);

  // Instant Scroll-to-Top Navigation Helper
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    lenisRef.current?.scrollTo(0, { immediate: true });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('aura_current_user');
    setLoggedInUser(null);
    navigateTo('home');
  };

  if (currentPage === 'admin') {
    return (
      <>
        <SeoManager currentPage="admin" />
        <AdminPage 
          onNavigateHome={() => navigateTo('home')}
          onNavigatePage={(pg) => navigateTo(pg)}
        />
      </>
    );
  }

  if (currentPage === 'login') {
    return (
      <>
        <SeoManager currentPage="login" />
        <LoginPage 
          onNavigateHome={() => navigateTo('home')}
          onNavigateRegister={() => navigateTo('register')}
          onNavigateAdmin={() => navigateTo('admin')}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            navigateTo('home');
          }}
        />
      </>
    );
  }

  if (currentPage === 'register') {
    return (
      <>
        <SeoManager currentPage="register" />
        <RegisterPage 
          onNavigateHome={() => navigateTo('home')}
          onNavigateLogin={() => navigateTo('login')}
          onOpenLegal={openLegal}
        />
        <LegalModal 
          isOpen={legalModalState.isOpen} 
          initialTab={legalModalState.tab} 
          onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))} 
          studioName={cms.settings?.studioName} 
        />
      </>
    );
  }

  // Handle Inquiry Modal Form Submit with Honeypot & Input Sanitization
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const honeypot = formData.get('website_hp');
    if (honeypot) {
      // Bot detected via honeypot field, silently ignore
      setInquiryOpen(false);
      return;
    }

    const inquiryData = {
      name: sanitizeText(formData.get('name') || ''),
      email: sanitizeText(formData.get('email') || ''),
      phone: sanitizeText(formData.get('phone') || ''),
      location: sanitizeText(formData.get('location') || ''),
      scale: sanitizeText(formData.get('scale') || '300 - 600 m²'),
      timeline: sanitizeText(formData.get('timeline') || 'Within 6 Months'),
      message: sanitizeText(formData.get('message') || ''),
      website_hp: honeypot
    };

    try {
      await inquiryApi.submitInquiry(inquiryData);
      setInquiryOpen(false);
      alert('Thank you! Your project inquiry has been securely received. Our partners will contact you shortly.');
    } catch (err) {
      alert(`Inquiry Submission: ${err.message}`);
    }
  };

  if (currentPage === 'about') {
    return (
      <>
        <SeoManager currentPage="about" />
        <AboutPage 
          aboutData={cms.about}
          settingsData={cms.settings}
          onNavigateHome={() => navigateTo('home')}
          onNavigateProjects={() => navigateTo('projects')}
          onNavigateMaterials={() => navigateTo('materials')}
          onNavigateServices={() => navigateTo('services')}
          onNavigateLogin={() => navigateTo('login')}
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
          onNavigateSection={(secId) => {
            navigateTo('home');
            setTimeout(() => {
              document.getElementById(secId)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenLegal={openLegal}
        />

        {/* Project Inquiry Modal */}
        <InquiryModal 
          isOpen={inquiryOpen} 
          onClose={() => setInquiryOpen(false)} 
          onSubmit={handleInquirySubmit} 
        />

        {/* Legal Modal */}
        <LegalModal 
          isOpen={legalModalState.isOpen} 
          initialTab={legalModalState.tab} 
          onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))} 
          studioName={cms.settings?.studioName} 
        />
      </>
    );
  }

  if (currentPage === 'projects') {
    return (
      <>
        <SeoManager currentPage="projects" selectedProject={selectedDetailProject} />
        <ProjectsPage 
          projectsData={cms.projects}
          settingsData={cms.settings}
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateMaterials={() => navigateTo('materials')}
          onNavigateServices={() => navigateTo('services')}
          onNavigateLogin={() => navigateTo('login')}
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenProjectDetail={(proj) => setSelectedDetailProject(proj)}
          onOpenLegal={openLegal}
        />

        {/* Project Detail Modal */}
        {selectedDetailProject && (
          <ProjectDetailModal 
            project={selectedDetailProject}
            onClose={() => setSelectedDetailProject(null)}
            onOpenInquiry={() => setInquiryOpen(true)}
          />
        )}

        {/* Project Inquiry Modal */}
        <InquiryModal 
          isOpen={inquiryOpen} 
          onClose={() => setInquiryOpen(false)} 
          onSubmit={handleInquirySubmit} 
        />

        {/* Legal Modal */}
        <LegalModal 
          isOpen={legalModalState.isOpen} 
          initialTab={legalModalState.tab} 
          onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))} 
          studioName={cms.settings?.studioName} 
        />
      </>
    );
  }

  if (currentPage === 'materials') {
    return (
      <>
        <SeoManager currentPage="materials" />
        <MaterialsPage 
          materialsData={cms.materials}
          settingsData={cms.settings}
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateProjects={() => navigateTo('projects')}
          onNavigateServices={() => navigateTo('services')}
          onNavigateLogin={() => navigateTo('login')}
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenLegal={openLegal}
        />

        {/* Project Inquiry Modal */}
        <InquiryModal 
          isOpen={inquiryOpen} 
          onClose={() => setInquiryOpen(false)} 
          onSubmit={handleInquirySubmit} 
        />

        {/* Legal Modal */}
        <LegalModal 
          isOpen={legalModalState.isOpen} 
          initialTab={legalModalState.tab} 
          onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))} 
          studioName={cms.settings?.studioName} 
        />
      </>
    );
  }

  if (currentPage === 'services') {
    return (
      <>
        <SeoManager currentPage="services" />
        <ServicesPage 
          servicesData={cms.services}
          settingsData={cms.settings}
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateProjects={() => navigateTo('projects')}
          onNavigateMaterials={() => navigateTo('materials')}
          onNavigateServices={() => navigateTo('services')}
          onNavigateLogin={() => navigateTo('login')}
          loggedInUser={loggedInUser}
          onLogout={handleLogout}
          onOpenInquiry={() => setInquiryOpen(true)}
          onOpenLegal={openLegal}
        />

        {/* Project Inquiry Modal */}
        <InquiryModal 
          isOpen={inquiryOpen} 
          onClose={() => setInquiryOpen(false)} 
          onSubmit={handleInquirySubmit} 
        />

        {/* Legal Modal */}
        <LegalModal 
          isOpen={legalModalState.isOpen} 
          initialTab={legalModalState.tab} 
          onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))} 
          studioName={cms.settings?.studioName} 
        />
      </>
    );
  }

  return (
    <div className="relative w-full bg-[#0a0a0a] text-[#F3F2EE] font-sans antialiased overflow-x-hidden">
      <SeoManager currentPage="home" selectedProject={selectedDetailProject} />
      
      {/* ================= UNIFIED TOP NAVIGATION (Reveals only after scrolling past hero video) ================= */}
      <Navbar 
        currentPage="home"
        isVisible={showNav}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateProjects={() => navigateTo('projects')}
        onNavigateMaterials={() => navigateTo('materials')}
        onNavigateServices={() => navigateTo('services')}
        onNavigateLogin={() => navigateTo('login')}
        loggedInUser={loggedInUser}
        onLogout={handleLogout}
        onNavigateSection={(secId) => {
          document.getElementById(secId)?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      {/* ================= HERO SCROLL VIDEO CANVAS ================= */}
      <HeroSequence homeData={cms.home} />

      {/* ================= SECTION: PHILOSOPHY ================= */}
      <section id="philosophy" className="relative z-10 bg-[#0a0a0a] pt-32 pb-40 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4 home-reveal-eyebrow">
                <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
                <span>{cms.home?.philosophyTag || 'OUR DESIGN APPROACH'}</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-tight font-light home-reveal-title">
                {cms.home?.philosophyHeading ? (
                  <span>{cms.home.philosophyHeading}</span>
                ) : (
                  <>
                    <span>Designing Spaces</span> <br />
                    <span className="italic text-luxury-accent font-normal">For Modern Living</span>
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-white/70 font-light mt-6 md:mt-0 leading-relaxed home-reveal-desc">
              {cms.home?.philosophyBody1 || 'True luxury is about creating calm, comfortable spaces with high-quality natural materials, smart layouts, and beautiful lighting.'}
            </p>
          </div>

          {/* Large Quote / Manifesto */}
          <div className="p-8 md:p-16 rounded-2xl bg-[#101010] border border-white/5 relative overflow-hidden mb-24 luxury-card-hover home-reveal-card">
            <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white/90 leading-relaxed font-light">
                  {cms.home?.testimonialQuote ? `“${cms.home.testimonialQuote}”` : '“A great home should feel peaceful the moment you step inside. We create timeless spaces built with quality craftsmanship that lasts for generations.”'}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-luxury-accent" />
                  <span className="text-xs tracking-widest uppercase font-mono text-luxury-accent">
                    {cms.home?.testimonialAuthor ? `${cms.home.testimonialAuthor.toUpperCase()} • ${cms.home.testimonialRole || 'CLIENT'}` : 'AURA DESIGN DIRECTORS • TOKYO / MILAN'}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-4 grid grid-cols-2 gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
                {(cms.home?.stats || [
                  { value: '140+', label: 'Residences Crafted' },
                  { value: '12', label: 'Countries Over The World' },
                  { value: '100%', label: 'Turnkey Delivery' },
                  { value: '18yr', label: 'Architectural Heritage' }
                ]).map((stat, i) => (
                  <div key={i} className="group">
                    <div className="font-serif text-4xl md:text-5xl text-luxury-accent mb-1 transition-transform group-hover:scale-105 duration-300">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: FEATURED PROJECTS ================= */}
      <section id="projects" className="relative z-10 bg-[#070707] py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4 home-reveal-eyebrow">
                <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
                <span>FEATURED RESIDENCES</span>
              </div>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light home-reveal-title">
                Selected Interior <span className="italic text-luxury-accent">Projects</span>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 home-reveal-desc">
              {['All', 'Residential', 'Penthouses', 'Boutique & Dining'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
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

          {/* Featured Project — Full Width Hero Card */}
          <div 
            className="group cursor-pointer mb-12 luxury-card-hover rounded-2xl home-reveal-card" 
            onClick={() => setSelectedDetailProject(filteredProjects[0] || currentProjectList[0])}
          >
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[#141414] border border-white/10 shadow-2xl">
              <img 
                src={filteredProjects[0]?.image || currentProjectList[0]?.image} 
                alt={filteredProjects[0]?.title}
                className="w-full h-full object-cover luxury-img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Floating Meta Details */}
              <div className="absolute top-6 left-6 flex gap-3">
                <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest text-luxury-accent uppercase border border-white/10">
                  {filteredProjects[0]?.location}
                </span>
                <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest text-white/80 uppercase border border-white/10">
                  {filteredProjects[0]?.area}
                </span>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2 group-hover:text-luxury-accent transition-colors">
                    {filteredProjects[0]?.title}
                  </h3>
                  <p className="text-sm text-white/70 font-light max-w-md">
                    {filteredProjects[0]?.subtitle}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-luxury-accent group-hover:translate-x-2 transition-transform">
                  View Project Details <ArrowUpRight size={16} />
                </div>
              </div>
            </div>

            {/* Highlights pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              {(filteredProjects[0]?.highlights || []).map((h, i) => (
                <span key={i} className="text-xs px-3 py-1 bg-white/5 rounded border border-white/5 text-white/60">
                  &bull; {h}
                </span>
              ))}
            </div>
          </div>

          {/* Remaining Projects — Uniform Grid, Side by Side */}
          {filteredProjects.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
              {filteredProjects.slice(1).map((proj) => (
                <div 
                  key={proj.id} 
                  onClick={() => setSelectedDetailProject(proj)}
                  className="group cursor-pointer bg-[#111111] p-5 rounded-2xl border border-white/5 hover:border-luxury-accent/30 transition-all duration-500 luxury-card-hover home-reveal-card"
                >
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden mb-5 relative bg-[#181818]">
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover luxury-img-zoom"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-luxury-accent uppercase">
                      {proj.year}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-luxury-accent mb-1">
                    {proj.location} &bull; {proj.category}
                  </div>
                  <h4 className="font-serif text-xl text-white group-hover:text-luxury-accent transition-colors mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed">
                    {proj.tagline}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ================= SECTION: MATERIAL ALCHEMY ================= */}
      <section id="materiality" className="relative z-10 bg-[#0a0a0a] py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4 home-reveal-eyebrow">
              <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
              <span>{cms.home?.materialityTag || 'NATURAL MATERIALS & CRAFT'}</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight home-reveal-title">
              {cms.home?.materialityHeading ? (
                <span>{cms.home.materialityHeading}</span>
              ) : (
                <>
                  <span>Quality Materials</span> <br />
                  <span className="italic text-luxury-accent font-normal">Built to Last</span>
                </>
              )}
            </h2>
            <p className="text-white/70 font-light text-base md:text-lg mt-6 leading-relaxed home-reveal-desc">
              {cms.home?.materialityText || 'We carefully select premium natural stone, solid timber, and custom metals from trusted artisans worldwide to bring warmth, texture, and lasting character into your home.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(cms.materials || ALL_MATERIALS).slice(0, 4).map((mat, i) => (
              <div 
                key={mat.id || i} 
                onClick={() => {
                  setCurrentPage('materials');
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }}
                className="group relative bg-[#111111] p-8 rounded-2xl border border-white/5 hover:border-luxury-accent/50 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between cursor-pointer luxury-card-hover home-reveal-card"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-accent/5 rounded-full blur-2xl group-hover:bg-luxury-accent/15 transition-all" />
                
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-luxury-accent/70 uppercase block mb-6">
                    [ {mat.category ? mat.category.toUpperCase() : 'MATERIAL'} ]
                  </span>
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-luxury-accent transition-colors">
                    {mat.title}
                  </h3>
                  <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">
                    {mat.origin} &bull; {mat.texture}
                  </div>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {mat.tagline || mat.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 font-mono uppercase tracking-widest group-hover:text-luxury-accent transition-colors">
                  <span>Material Details</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION: SERVICES ================= */}
      <section id="services" className="relative z-10 bg-[#070707] py-32 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
            <div>
              <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-4 home-reveal-eyebrow">
                <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
                <span>{cms.home?.servicesTag || 'OUR SERVICES'}</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light home-reveal-title">
                {cms.home?.servicesHeading ? (
                  <span>{cms.home.servicesHeading}</span>
                ) : (
                  <>
                    Complete <span className="italic text-luxury-accent">Design & Build</span>
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-md text-sm text-white/60 font-light mt-6 md:mt-0 home-reveal-desc">
              {cms.home?.servicesText || 'From initial layout planning and construction to custom furniture design and final setup, we manage every step of your project with care.'}
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {(cms.services?.disciplines || SERVICES).map((srv, idx) => (
              <div 
                key={srv.id || srv.num || idx}
                onClick={() => {
                  setCurrentPage('services');
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                }}
                className="group py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer hover:bg-white/[0.02] px-6 rounded-xl transition-all duration-300 home-reveal-card"
              >
                <div className="lg:col-span-2 font-mono text-xl text-luxury-accent">
                  {srv.num || `0${idx + 1}`}
                </div>
                <div className="lg:col-span-5 font-serif text-3xl md:text-4xl text-white group-hover:text-luxury-accent transition-colors">
                  {srv.title || srv.name}
                </div>
                <div className="lg:col-span-4 text-sm text-white/60 font-light leading-relaxed">
                  {srv.desc || srv.description || srv.subtitle || 'Complete bespoke architectural design and precision execution.'}
                </div>
                <div className="lg:col-span-1 flex justify-end">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-luxury-accent group-hover:text-luxury-accent group-hover:rotate-45 transition-all">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION: RECOGNITION & PRESS ================= */}
      <section id="awards-section" className="relative z-10 bg-[#0a0a0a] py-24 px-6 md:px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-8 home-reveal-eyebrow">
            <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
            <span>AWARDS & RECOGNITION</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {(cms.home?.awards || [
              { title: 'Awwwards', sub: 'Site of the Month' },
              { title: 'Architectural Digest', sub: 'Featured Design Studio' },
              { title: 'Frame Awards', sub: 'Best Residential Interior' },
              { title: 'Wallpaper* Magazine', sub: 'Design Awards Winner' }
            ]).map((award, i) => (
              <div 
                key={award.id || i} 
                className="p-8 rounded-xl bg-[#121212] border border-white/5 luxury-card-hover home-reveal-card"
              >
                <div className="font-serif text-xl text-white mb-1">{award.title}</div>
                <div className="text-xs text-luxury-accent font-mono uppercase tracking-widest">{award.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INQUIRY CTA BANNER ================= */}
      <section id="cta-section" className="relative z-10 bg-[#070707] py-32 px-6 md:px-20 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-accent/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs tracking-mega-wide uppercase font-mono text-luxury-accent mb-6 inline-block home-reveal-eyebrow">
            START YOUR PROJECT
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light mb-8 leading-none home-reveal-title">
            {cms.home?.ctaHeading ? (
              <span>{cms.home.ctaHeading}</span>
            ) : (
              <>
                <span>Let Us Design</span> <br />
                <span className="italic text-luxury-accent">Your Dream Home</span>
              </>
            )}
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed mb-12 home-reveal-desc">
            {cms.home?.ctaText || 'We collaborate closely with homeowners to create beautiful, comfortable, and personalized spaces. Let’s discuss your vision.'}
          </p>
          <button 
            onClick={() => setInquiryOpen(true)}
            className="px-10 py-5 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-luxury-accent/20 flex items-center gap-3 mx-auto luxury-button-hover home-reveal-card"
          >
            Schedule a Consultation
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* ================= FOOTER WITH WORLD CLOCKS ================= */}
      <footer className="relative z-10 bg-[#050505] border-t border-white/10 px-6 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
            {/* Monogram Brand */}
            <div className="lg:col-span-4">
              <div className="font-serif text-4xl tracking-widest text-white mb-6">
                {cms.settings?.studioName ? cms.settings.studioName.split(' ')[0] : 'AURA'}
              </div>
              <p className="text-sm text-white/60 font-light max-w-sm leading-relaxed mb-8">
                {cms.settings?.tagline || 'Interior architecture and design studios operating in Tokyo, New York, and Milan.'}
              </p>
              
              {/* Live World Clocks */}
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

            {/* Navigation Columns */}
            <div className="lg:col-span-2 lg:col-start-6">
              <div className="text-xs font-mono tracking-widest uppercase text-luxury-accent mb-6">EXPLORE</div>
              <ul className="space-y-4 text-xs font-light text-white/60 tracking-wider">
                <li><button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">About Our Studio</button></li>
                <li><button onClick={() => navigateTo('projects')} className="hover:text-white transition-colors">Portfolio Archive</button></li>
                <li><button onClick={() => navigateTo('materials')} className="hover:text-white transition-colors">Materials & Provenance</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-white transition-colors">Architectural Services</button></li>
                <li><button onClick={() => navigateTo(loggedInUser ? 'home' : 'login')} className="text-luxury-accent hover:underline transition-colors">{loggedInUser ? `Client Portal (${loggedInUser.firstName})` : 'Client Sign In / Register'}</button></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="text-xs font-mono tracking-widest uppercase text-luxury-accent mb-6">STUDIOS</div>
              <ul className="space-y-4 text-xs font-light text-white/60 tracking-wider">
                {(cms.settings?.studios || [
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
              <div className="text-sm font-serif text-white mb-2">{cms.settings?.contactEmail || 'hello@aura-design.com'}</div>
              <div className="text-xs font-mono text-white/50 mb-6">{cms.settings?.contactPhone || '+81 (0)3 5400 8820'}</div>
              <div className="flex gap-4 text-xs font-mono uppercase tracking-widest text-luxury-accent">
                {cms.settings?.instagram && (
                  <a href={cms.settings.instagram.startsWith('http') ? cms.settings.instagram : `https://instagram.com/${cms.settings.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
                )}
                &bull;
                {cms.settings?.pinterest && (
                  <a href={cms.settings.pinterest.startsWith('http') ? cms.settings.pinterest : `https://pinterest.com/${cms.settings.pinterest}`} target="_blank" rel="noopener noreferrer" className="hover:underline">Pinterest</a>
                )}
                &bull;
                {cms.settings?.linkedin && (
                  <a href={cms.settings.linkedin.startsWith('http') ? cms.settings.linkedin : `https://linkedin.com/${cms.settings.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                )}
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-white/30 uppercase tracking-widest gap-4">
            <div>&copy; {new Date().getFullYear()} {cms.settings?.studioName ? cms.settings.studioName.toUpperCase() : 'AURA ARCHITECTURAL ATELIER'}. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <button onClick={() => openLegal('privacy')} className="hover:text-white transition-colors">PRIVACY POLICY</button>
              <button onClick={() => openLegal('terms')} className="hover:text-white transition-colors">TERMS OF SERVICE</button>
            </div>
          </div>

        </div>
      </footer>

      {/* ================= PROJECT INQUIRY MODAL ================= */}
      <InquiryModal 
        isOpen={inquiryOpen} 
        onClose={() => setInquiryOpen(false)} 
        onSubmit={handleInquirySubmit} 
      />

      {/* ================= LEGAL & COMPLIANCE MODAL ================= */}
      <LegalModal 
        isOpen={legalModalState.isOpen} 
        initialTab={legalModalState.tab} 
        onClose={() => setLegalModalState(prev => ({ ...prev, isOpen: false }))} 
        studioName={cms.settings?.studioName} 
      />

      {/* ================= ARCHITECTURAL PROJECT DETAIL MODAL ================= */}
      {selectedDetailProject && (
        <ProjectDetailModal 
          project={selectedDetailProject}
          onClose={() => setSelectedDetailProject(null)}
          onOpenInquiry={() => setInquiryOpen(true)}
        />
      )}

    </div>
  );
}
