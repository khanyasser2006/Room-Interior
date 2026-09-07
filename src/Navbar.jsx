import React from 'react';
import { ArrowUpRight, User, LogOut } from 'lucide-react';

export default function Navbar({ 
  currentPage = 'home', 
  isVisible = true,
  loggedInUser = null,
  onNavigateHome, 
  onNavigateAbout, 
  onNavigateProjects, 
  onNavigateMaterials,
  onNavigateServices,
  onNavigateLogin,
  onLogout,
  onNavigateSection,
  onOpenInquiry 
}) {
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-5 flex justify-between items-center bg-[#070707]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isVisible 
        ? 'translate-y-0 opacity-100 pointer-events-auto' 
        : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      
      {/* Brand Logo */}
      <div className="flex items-center">
        <button 
          onClick={onNavigateHome}
          className="font-serif text-2xl md:text-3xl tracking-widest text-white hover:text-luxury-accent transition-colors"
        >
          AURA
        </button>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-xs tracking-mega-wide font-medium text-white/70">
        {[
          { id: 'home', label: 'HOME', action: onNavigateHome },
          { id: 'about', label: 'ABOUT', action: onNavigateAbout },
          { id: 'projects', label: 'PROJECTS', action: onNavigateProjects },
          { id: 'materials', label: 'MATERIALS', action: onNavigateMaterials || (() => onNavigateSection?.('materiality')) },
          { id: 'services', label: 'SERVICES', action: onNavigateServices || (() => onNavigateSection?.('services')) },
        ].map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button 
              key={item.id}
              onClick={item.action}
              className={`group/navlink relative py-1 flex items-center transition-colors ${
                isActive 
                  ? 'text-luxury-accent font-semibold' 
                  : 'hover:text-luxury-accent text-white/70'
              }`}
            >
              <span>{item.label}</span>
              <span className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-luxury-accent transition-transform duration-300 origin-left ease-out ${
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover/navlink:scale-x-100'
              }`} />
            </button>
          );
        })}
      </div>

      {/* Right — Auth + CTA */}
      <div className="flex items-center gap-3">

        {/* Login / User Avatar */}
        {loggedInUser ? (
          <div className="group relative">
            <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:border-luxury-accent/40 transition-all">
              <div className="w-7 h-7 rounded-full bg-luxury-accent/20 flex items-center justify-center text-luxury-accent font-serif text-xs">
                {loggedInUser.firstName?.[0]}{loggedInUser.lastName?.[0]}
              </div>
              <span className="hidden sm:inline text-xs text-white/70 font-light tracking-wide">
                {loggedInUser.firstName}
              </span>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl bg-[#111111] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl z-50">
              <div className="px-4 py-3 border-b border-white/5">
                <div className="text-xs text-white font-medium">{loggedInUser.firstName} {loggedInUser.lastName}</div>
                <div className="text-[10px] text-white/40 font-mono truncate mt-0.5">{loggedInUser.email}</div>
              </div>
              <button 
                onClick={onLogout}
                className="w-full px-4 py-2.5 text-left text-xs text-white/60 hover:text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={onNavigateLogin}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-xs tracking-widest uppercase text-white/60 hover:text-luxury-accent border border-white/10 hover:border-luxury-accent/30 transition-all"
          >
            <User size={14} />
            Sign In
          </button>
        )}

        {/* Start a Project CTA */}
        <button 
          onClick={onOpenInquiry}
          className="group relative px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase overflow-hidden border border-luxury-accent/50 text-luxury-accent transition-all duration-500 hover:border-luxury-accent hover:text-[#0a0a0a]"
        >
          <span className="absolute inset-0 bg-luxury-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 flex items-center gap-2">
            START A PROJECT
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </nav>
  );
}
