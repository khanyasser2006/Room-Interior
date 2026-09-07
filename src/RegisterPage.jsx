import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone,
  MapPin,
  Check
} from 'lucide-react';
import { authApi, sanitizeText } from './services/api';

export default function RegisterPage({ onNavigateHome, onNavigateLogin, onOpenLegal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    website_hp: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Honeypot check for bots
    if (formData.website_hp) {
      setSuccess(true);
      return;
    }

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('Please agree to the terms to continue.');
      return;
    }

    const payload = {
      firstName: sanitizeText(formData.firstName.trim()),
      lastName: sanitizeText(formData.lastName.trim()),
      email: sanitizeText(formData.email.trim().toLowerCase()),
      phone: sanitizeText(formData.phone.trim()),
      location: sanitizeText(formData.location.trim()),
      password: formData.password
    };

    try {
      await authApi.register(payload);
      setSuccess(true);
      setTimeout(() => {
        onNavigateLogin();
      }, 1800);
    } catch (err) {
      // Local fallback
      const users = JSON.parse(localStorage.getItem('aura_users') || '[]');
      const exists = users.find(u => u.email === payload.email);
      if (exists) {
        setError('An account with this email already exists. Please sign in.');
        return;
      }

      users.push({
        ...payload,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('aura_users', JSON.stringify(users));

      setSuccess(true);
      setTimeout(() => {
        onNavigateLogin();
      }, 1800);
    }
  };

  return (
    <div className="page-enter-fade relative w-full min-h-screen bg-[#070707] text-[#F3F2EE] font-sans antialiased overflow-x-hidden flex">
      
      {/* Left Panel — Branding & Visual */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#111111] to-[#070707]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-accent/10 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-luxury-accent/5 rounded-full blur-[180px] pointer-events-none" />

        {/* Top — Logo */}
        <div className="relative z-10">
          <button 
            onClick={onNavigateHome}
            className="font-serif text-3xl tracking-widest text-white hover:text-luxury-accent transition-colors"
          >
            AURA
          </button>
          <p className="text-xs font-mono uppercase tracking-mega-wide text-white/40 mt-2">
            Architectural Atelier
          </p>
        </div>

        {/* Center — Messaging */}
        <div className="relative z-10">
          <h2 className="font-serif text-5xl xl:text-6xl font-light text-white leading-[1.1] mb-6">
            Join Our <br />
            <span className="italic text-luxury-accent">Private Circle</span>
          </h2>
          <p className="text-base text-white/60 font-light leading-relaxed max-w-md">
            Create your personal account to save project ideas, request material samples, and begin your architectural transformation with our team.
          </p>
        </div>

        {/* Bottom — Trust Indicators */}
        <div className="relative z-10 flex gap-12">
          <div>
            <div className="font-serif text-3xl text-luxury-accent">140+</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">Residences Delivered</div>
          </div>
          <div>
            <div className="font-serif text-3xl text-luxury-accent">12</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">Countries Served</div>
          </div>
          <div>
            <div className="font-serif text-3xl text-luxury-accent">18yr</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">Design Heritage</div>
          </div>
        </div>
      </div>

      {/* Right Panel — Registration Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 sm:px-12 py-16 lg:py-0">
        <div className="w-full max-w-xl">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">
            <button 
              onClick={onNavigateHome}
              className="font-serif text-2xl tracking-widest text-white hover:text-luxury-accent transition-colors"
            >
              AURA
            </button>
          </div>

          {/* Back Button */}
          <button 
            onClick={onNavigateHome}
            className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-luxury-accent transition-colors mb-10"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Form Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 text-xs tracking-mega-wide uppercase text-luxury-accent mb-3">
              <span className="w-8 h-[1px] bg-luxury-accent inline-block" />
              CREATE YOUR ACCOUNT
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-white font-light mb-3">
              Register
            </h1>
            <p className="text-sm text-white/50 font-light">
              Already have an account?{' '}
              <button onClick={onNavigateLogin} className="text-luxury-accent hover:underline font-medium">
                Sign in here
              </button>
            </p>
          </div>

          {/* Success State */}
          {success ? (
            <div className="p-8 rounded-2xl bg-luxury-accent/10 border border-luxury-accent/30 text-center">
              <div className="w-16 h-16 rounded-full bg-luxury-accent/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-luxury-accent" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">Account Created</h3>
              <p className="text-sm text-white/60 font-light">
                Redirecting you to sign in...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Invisible Honeypot */}
              <input 
                type="text" 
                name="website_hp" 
                value={formData.website_hp} 
                onChange={(e) => handleChange('website_hp', e.target.value)} 
                style={{ display: 'none' }} 
                tabIndex="-1" 
                autoComplete="off" 
                aria-hidden="true" 
              />

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    First Name <span className="text-luxury-accent">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      placeholder="Alexander"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Last Name <span className="text-luxury-accent">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      placeholder="Harrison"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                  Email Address <span className="text-luxury-accent">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Location Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="New York, Tokyo, London..."
                      className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Password <span className="text-luxury-accent">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-11 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">
                    Confirm Password <span className="text-luxury-accent">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type={showConfirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-11 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-luxury-accent transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <button 
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                    agreed 
                      ? 'bg-luxury-accent border-luxury-accent' 
                      : 'border-white/20 bg-transparent hover:border-white/40'
                  }`}
                  aria-label="Agree to terms and privacy policy"
                >
                  {agreed && <Check size={14} className="text-[#0a0a0a]" />}
                </button>
                <span className="text-xs text-white/50 font-light leading-relaxed">
                  I agree to AURA's{' '}
                  <button 
                    type="button" 
                    onClick={() => onOpenLegal?.('terms')} 
                    className="text-luxury-accent hover:underline font-medium"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button 
                    type="button" 
                    onClick={() => onOpenLegal?.('privacy')} 
                    className="text-luxury-accent hover:underline font-medium"
                  >
                    Privacy Policy
                  </button>
                </span>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 font-light">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-luxury-accent text-[#0a0a0a] font-semibold text-xs tracking-widest uppercase hover:bg-white hover:scale-[1.02] transition-all shadow-xl shadow-luxury-accent/20 flex items-center justify-center gap-2"
              >
                Create Account <ArrowUpRight size={14} />
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
              &copy; 2026 AURA Architectural Atelier
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
