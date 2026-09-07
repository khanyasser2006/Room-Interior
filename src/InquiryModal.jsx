import React from 'react';
import { X, Send } from 'lucide-react';

export default function InquiryModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#111111] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl overflow-hidden" data-lenis-prevent="true">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-2">
          <span className="w-6 h-[1px] bg-luxury-accent inline-block" />
          GET IN TOUCH
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2">Start Your Project</h3>
        <p className="text-xs text-white/60 font-light mb-8">
          Tell us about your home and what you are looking to create. We will get back to you within 24 hours.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Honeypot field for invisible anti-bot protection */}
          <input 
            type="text" 
            name="website_hp" 
            style={{ display: 'none' }} 
            tabIndex="-1" 
            autoComplete="off" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Your Name</label>
              <input 
                type="text" 
                name="name"
                required 
                placeholder="e.g. Alex Harrison"
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                required 
                placeholder="alex@example.com"
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Project Location</label>
              <input 
                type="text" 
                name="location"
                placeholder="e.g. Tokyo, New York, London"
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Estimated Size</label>
              <select name="scale" className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-luxury-accent transition-colors">
                <option value="Under 300 m² (Apartment / Flat)">Under 300 m² (Apartment / Flat)</option>
                <option value="300 - 600 m² (Townhouse / Penthouse)">300 - 600 m² (Townhouse / Penthouse)</option>
                <option value="Over 600 m² (Full Residence / Estate)">Over 600 m² (Full Residence / Estate)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Tell Us About Your Project</label>
            <textarea 
              rows={3} 
              name="message"
              placeholder="Share a brief overview of your timeline, space, and style preferences..."
              className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors resize-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 rounded-xl bg-luxury-accent text-[#0a0a0a] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-xl shadow-luxury-accent/10 flex items-center justify-center gap-2"
          >
            Send Inquiry <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
