import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Check, 
  X, 
  Layers, 
  FolderGit2, 
  Home, 
  Info, 
  Briefcase, 
  Box, 
  Wrench, 
  MessageSquare, 
  Users, 
  Settings, 
  Download, 
  Upload, 
  Search,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Eye,
  AlertCircle,
  Image as ImageIcon
} from 'lucide-react';
import { saveCmsData, resetCmsData, loadCmsData } from './cmsStore';
import { mediaApi } from './services/api';

function ImageDropzone({ value, onChange, label = "Featured Photography", presets = [] }) {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, etc.)');
      return;
    }
    
    setIsUploading(true);
    try {
      const url = await mediaApi.uploadImage(file);
      onChange(url);
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-mono uppercase tracking-widest text-white/60 flex items-center gap-2">
          <ImageIcon size={13} className="text-luxury-accent" />
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[10px] font-mono text-luxury-accent/80 hover:text-luxury-accent uppercase tracking-wider"
        >
          {showUrlInput ? 'Hide URL input' : 'Paste Direct URL'}
        </button>
      </div>

      {showUrlInput && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or /images/project.jpg"
          className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:border-luxury-accent focus:outline-none mb-2"
        />
      )}

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden ${
          isDragging 
            ? 'border-luxury-accent bg-luxury-accent/15 scale-[1.01]' 
            : value 
              ? 'border-white/20 hover:border-luxury-accent/50 bg-[#141414]' 
              : 'border-white/10 hover:border-luxury-accent/40 hover:bg-[#161616] bg-[#121212]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        {isUploading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-luxury-accent border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-luxury-accent uppercase tracking-widest">Sanitizing & Uploading...</span>
          </div>
        ) : value ? (
          <div className="relative w-full aspect-[16/9] max-h-60 rounded-xl overflow-hidden group/img">
            <img 
              src={value} 
              alt="Uploaded Preview" 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
              <span className="px-4 py-2 rounded-full bg-luxury-accent text-[#0a0a0a] font-mono text-xs uppercase tracking-widest font-semibold shadow-lg flex items-center gap-2">
                <Upload size={13} /> Click or Drop to Replace
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                className="px-3 py-1.5 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={12} /> Remove Image
              </button>
            </div>
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-luxury-accent uppercase border border-white/10 flex items-center gap-1.5">
              <Check size={12} /> Ready
            </div>
          </div>
        ) : (
          <div className="py-6 px-4 flex flex-col items-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 transition-transform ${
              isDragging ? 'scale-110 bg-luxury-accent text-[#0a0a0a]' : 'bg-white/5 text-luxury-accent border border-white/10 group-hover:scale-105'
            }`}>
              <Upload size={22} />
            </div>
            <div className="text-sm font-medium text-white mb-1">
              {isDragging ? 'Drop Image Here' : 'Drag & Drop Image Here'}
            </div>
            <div className="text-xs text-white/50 mb-2.5">
              or <span className="text-luxury-accent underline font-mono">browse file from device</span>
            </div>
            <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
              PNG, JPG, WEBP, SVG • Auto-Optimized & EXIF Stripped
            </div>
          </div>
        )}
      </div>

      {/* Preset thumbnails quick selection */}
      {presets.length > 0 && (
        <div className="pt-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Or select from studio archive presets:</div>
          <div className="flex flex-wrap gap-2.5">
            {presets.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange(preset)}
                className={`relative w-16 h-11 rounded-lg overflow-hidden border transition-all ${
                  value === preset ? 'border-luxury-accent ring-2 ring-luxury-accent/30 scale-105' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
              >
                <img src={preset} alt="preset" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage({ onNavigateHome, onNavigatePage }) {
  const [cms, setCms] = useState(() => loadCmsData());
  const [activeTab, setActiveTab] = useState('overview'); // overview, home, about, projects, materials, services, inquiries, users, settings
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [editingProject, setEditingProject] = useState(null); // null or project object
  const [isNewProject, setIsNewProject] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isNewMaterial, setIsNewMaterial] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isNewFaq, setIsNewFaq] = useState(false);
  const [viewingInquiry, setViewingInquiry] = useState(null);

  // Registered users state
  const [usersList, setUsersList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aura_users') || '[]');
    } catch {
      return [];
    }
  });

  // Save current state
  const handleSave = () => {
    saveCmsData(cms);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Factory Reset
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all website content back to factory atelier defaults? This will overwrite custom edits.')) {
      const def = resetCmsData();
      setCms(def);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  // Export JSON Backup
  const handleExport = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(cms, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `aura_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        saveCmsData(parsed);
        setCms(parsed);
        alert('CMS configuration imported successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  // ================= PROJECT CRUD =================
  const handleSaveProject = (projectData) => {
    let updatedProjects;
    if (isNewProject) {
      const newProj = {
        ...projectData,
        id: projectData.id || `proj-${Date.now()}`
      };
      updatedProjects = [newProj, ...cms.projects];
    } else {
      updatedProjects = cms.projects.map(p => p.id === projectData.id ? projectData : p);
    }
    const updatedCms = { ...cms, projects: updatedProjects };
    setCms(updatedCms);
    saveCmsData(updatedCms);
    setEditingProject(null);
    setIsNewProject(false);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Delete this project from the portfolio?')) {
      const updatedProjects = cms.projects.filter(p => p.id !== id);
      const updatedCms = { ...cms, projects: updatedProjects };
      setCms(updatedCms);
      saveCmsData(updatedCms);
    }
  };

  // ================= MATERIAL CRUD =================
  const handleSaveMaterial = (matData) => {
    let updatedMaterials;
    if (isNewMaterial) {
      const newMat = {
        ...matData,
        id: matData.id || `mat-${Date.now()}`
      };
      updatedMaterials = [newMat, ...cms.materials];
    } else {
      updatedMaterials = cms.materials.map(m => m.id === matData.id ? matData : m);
    }
    const updatedCms = { ...cms, materials: updatedMaterials };
    setCms(updatedCms);
    saveCmsData(updatedCms);
    setEditingMaterial(null);
    setIsNewMaterial(false);
  };

  const handleDeleteMaterial = (id) => {
    if (window.confirm('Delete this material from the archive?')) {
      const updatedMaterials = cms.materials.filter(m => m.id !== id);
      const updatedCms = { ...cms, materials: updatedMaterials };
      setCms(updatedCms);
      saveCmsData(updatedCms);
    }
  };

  // ================= FAQ CRUD =================
  const handleSaveFaq = (faqData) => {
    let updatedFaqs;
    if (isNewFaq) {
      const newFaq = {
        ...faqData,
        id: faqData.id || `faq-${Date.now()}`
      };
      updatedFaqs = [...cms.services.faqs, newFaq];
    } else {
      updatedFaqs = cms.services.faqs.map(f => f.id === faqData.id ? faqData : f);
    }
    const updatedCms = {
      ...cms,
      services: { ...cms.services, faqs: updatedFaqs }
    };
    setCms(updatedCms);
    saveCmsData(updatedCms);
    setEditingFaq(null);
    setIsNewFaq(false);
  };

  const handleDeleteFaq = (id) => {
    const updatedFaqs = cms.services.faqs.filter(f => f.id !== id);
    const updatedCms = {
      ...cms,
      services: { ...cms.services, faqs: updatedFaqs }
    };
    setCms(updatedCms);
    saveCmsData(updatedCms);
  };

  // ================= INQUIRIES CRUD =================
  const handleUpdateInquiryStatus = (id, status) => {
    const updatedInquiries = (cms.inquiries || []).map(inq => 
      inq.id === id ? { ...inq, status } : inq
    );
    const updatedCms = { ...cms, inquiries: updatedInquiries };
    setCms(updatedCms);
    saveCmsData(updatedCms);
  };

  const handleDeleteInquiry = (id) => {
    if (window.confirm('Delete this inquiry record?')) {
      const updatedInquiries = (cms.inquiries || []).filter(inq => inq.id !== id);
      const updatedCms = { ...cms, inquiries: updatedInquiries };
      setCms(updatedCms);
      saveCmsData(updatedCms);
      if (viewingInquiry?.id === id) setViewingInquiry(null);
    }
  };

  // ================= USERS CRUD =================
  const handleDeleteUser = (email) => {
    if (window.confirm(`Delete client account (${email})?`)) {
      const updated = usersList.filter(u => u.email !== email);
      setUsersList(updated);
      localStorage.setItem('aura_users', JSON.stringify(updated));
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGridIcon },
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'about', label: 'About Page', icon: Info },
    { id: 'projects', label: `Projects (${cms.projects.length})`, icon: Briefcase },
    { id: 'materials', label: `Materials (${cms.materials.length})`, icon: Box },
    { id: 'services', label: 'Services & FAQs', icon: Wrench },
    { id: 'inquiries', label: `Inquiries (${(cms.inquiries || []).length})`, icon: MessageSquare },
    { id: 'users', label: `Registered Users (${usersList.length})`, icon: Users },
    { id: 'settings', label: 'Settings & Backup', icon: Settings },
  ];

  function LayoutGridIcon(props) {
    return <Layers {...props} />;
  }

  return (
    <div className="min-h-screen bg-[#070707] text-[#F3F2EE] font-sans antialiased flex flex-col">
      
      {/* ================= TOP CMS HEADER ================= */}
      <header className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={onNavigateHome}
            className="font-serif text-2xl tracking-widest text-white hover:text-luxury-accent transition-colors flex items-center gap-3"
          >
            <span>AURA</span>
            <span className="text-[10px] font-mono tracking-widest uppercase bg-luxury-accent/20 text-luxury-accent border border-luxury-accent/30 px-2.5 py-0.5 rounded-full">
              CMS SUITE
            </span>
          </button>
        </div>

        {/* Global Save & Actions */}
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 animate-fadeIn">
              <Check size={14} /> Saved & Synced
            </span>
          )}

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all shadow-lg shadow-luxury-accent/10"
          >
            <Save size={14} />
            Save All
          </button>

          <button
            onClick={onNavigateHome}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            <ExternalLink size={14} />
            Live Site
          </button>
        </div>
      </header>

      {/* ================= MAIN CMS BODY ================= */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* ================= SIDEBAR NAVIGATION ================= */}
        <aside className="w-full md:w-64 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/5 p-4 lg:p-6 shrink-0">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 px-3">
            CONTROL SECTIONS
          </div>
          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active 
                      ? 'bg-luxury-accent/15 text-luxury-accent border border-luxury-accent/30 font-semibold' 
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-luxury-accent" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/5 px-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">QUICK ACCESS</div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onNavigatePage && onNavigatePage('projects')}
                className="text-left text-xs text-white/50 hover:text-luxury-accent transition-colors"
              >
                &rarr; View Projects Page
              </button>
              <button 
                onClick={() => onNavigatePage && onNavigatePage('materials')}
                className="text-left text-xs text-white/50 hover:text-luxury-accent transition-colors"
              >
                &rarr; View Materials Page
              </button>
              <button 
                onClick={() => onNavigatePage && onNavigatePage('services')}
                className="text-left text-xs text-white/50 hover:text-luxury-accent transition-colors"
              >
                &rarr; View Services Page
              </button>
            </div>
          </div>
        </aside>

        {/* ================= CONTENT VIEWPORT ================= */}
        <main className="flex-1 p-6 lg:p-12 max-w-7xl">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-fadeIn">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">Atelier CMS Control Center</h1>
                <p className="text-sm text-white/50 font-light">
                  Manage all editorial copy, portfolio case studies, architectural materials, service offerings, and incoming client inquiries.
                </p>
              </div>

              {/* Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-6 rounded-2xl bg-[#111111] border border-white/5">
                  <div className="text-2xl font-serif text-luxury-accent mb-1">{cms.projects.length}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50">Projects</div>
                </div>
                <div className="p-6 rounded-2xl bg-[#111111] border border-white/5">
                  <div className="text-2xl font-serif text-luxury-accent mb-1">{cms.materials.length}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50">Materials</div>
                </div>
                <div className="p-6 rounded-2xl bg-[#111111] border border-white/5">
                  <div className="text-2xl font-serif text-luxury-accent mb-1">{(cms.inquiries || []).length}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50">Inquiries</div>
                </div>
                <div className="p-6 rounded-2xl bg-[#111111] border border-white/5">
                  <div className="text-2xl font-serif text-luxury-accent mb-1">{usersList.length}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/50">Registered Users</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  onClick={() => {
                    setIsNewProject(true);
                    setEditingProject({
                      id: '',
                      title: '',
                      subtitle: '',
                      location: '',
                      year: '2026',
                      area: '',
                      category: 'Residential',
                      image: '/images/obsidian.jpg',
                      tagline: '',
                      narrative: '',
                      highlights: ['Custom Millwork', 'Travertine Slabs']
                    });
                    setActiveTab('projects');
                  }}
                  className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-luxury-accent/10 to-transparent border border-luxury-accent/20 hover:border-luxury-accent transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-luxury-accent/20 flex items-center justify-center text-luxury-accent">
                      <Plus size={20} />
                    </div>
                    <ArrowUpRight size={16} className="text-luxury-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="font-serif text-lg text-white mb-1">Add New Project</h3>
                  <p className="text-xs text-white/50 font-light">Create a new residential case study with high-res photos.</p>
                </div>

                <div 
                  onClick={() => setActiveTab('inquiries')}
                  className="group cursor-pointer p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70">
                      <MessageSquare size={18} />
                    </div>
                    <ArrowUpRight size={16} className="text-white/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="font-serif text-lg text-white mb-1">Review Leads</h3>
                  <p className="text-xs text-white/50 font-light">View submissions from the Start a Project modal.</p>
                </div>

                <div 
                  onClick={() => setActiveTab('home')}
                  className="group cursor-pointer p-6 rounded-2xl bg-[#111111] border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70">
                      <Edit3 size={18} />
                    </div>
                    <ArrowUpRight size={16} className="text-white/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="font-serif text-lg text-white mb-1">Edit Home Headlines</h3>
                  <p className="text-xs text-white/50 font-light">Update hero sequences, studio quotes, and testimonials.</p>
                </div>
              </div>

              {/* Recent Inquiries List */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-xl text-white">Recent Client Inquiries</h3>
                  <button onClick={() => setActiveTab('inquiries')} className="text-xs font-mono uppercase tracking-widest text-luxury-accent hover:underline">
                    View All ({ (cms.inquiries || []).length }) &rarr;
                  </button>
                </div>
                {(cms.inquiries || []).length === 0 ? (
                  <p className="text-xs text-white/40 font-light">No client inquiries received yet.</p>
                ) : (
                  <div className="space-y-3">
                    {(cms.inquiries || []).slice(0, 3).map(inq => (
                      <div key={inq.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">{inq.name}</div>
                          <div className="text-xs text-white/40">{inq.email} &bull; {inq.location}</div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full ${
                            inq.status === 'New' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-white/5 text-white/60'
                          }`}>
                            {inq.status}
                          </span>
                          <div className="text-[10px] font-mono text-white/30 mt-1">{inq.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: HOME PAGE CMS */}
          {activeTab === 'home' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">Home Page Editor</h1>
                  <p className="text-xs text-white/50">Edit hero captions, philosophy statements, and testimonials.</p>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all">
                  <Save size={14} /> Save Section
                </button>
              </div>

              {/* Hero Sequence Titles */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-luxury-accent flex items-center gap-2">
                  <Sparkles size={18} /> Hero Scroll Sequence Titles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Phase 1 Title</label>
                    <input 
                      type="text" 
                      value={cms.home.heroTitle1} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, heroTitle1: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Phase 1 Subtitle</label>
                    <input 
                      type="text" 
                      value={cms.home.heroSubtitle1} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, heroSubtitle1: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Phase 2 Title</label>
                    <input 
                      type="text" 
                      value={cms.home.heroTitle2} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, heroTitle2: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Phase 2 Subtitle</label>
                    <input 
                      type="text" 
                      value={cms.home.heroSubtitle2} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, heroSubtitle2: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Phase 3 Title</label>
                    <input 
                      type="text" 
                      value={cms.home.heroTitle3} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, heroTitle3: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Phase 3 Subtitle</label>
                    <input 
                      type="text" 
                      value={cms.home.heroSubtitle3} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, heroSubtitle3: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Philosophy Statement */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Philosophy & Statement</h3>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Main Heading</label>
                  <textarea 
                    rows={2}
                    value={cms.home.philosophyHeading} 
                    onChange={e => setCms({ ...cms, home: { ...cms.home, philosophyHeading: e.target.value } })}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Paragraph 1</label>
                    <textarea 
                      rows={4}
                      value={cms.home.philosophyBody1} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, philosophyBody1: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Paragraph 2</label>
                    <textarea 
                      rows={4}
                      value={cms.home.philosophyBody2} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, philosophyBody2: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Client Testimonial */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Client Testimonial</h3>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Quote</label>
                  <textarea 
                    rows={3}
                    value={cms.home.testimonialQuote} 
                    onChange={e => setCms({ ...cms, home: { ...cms.home, testimonialQuote: e.target.value } })}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Author Name</label>
                    <input 
                      type="text" 
                      value={cms.home.testimonialAuthor} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, testimonialAuthor: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Location / Role</label>
                    <input 
                      type="text" 
                      value={cms.home.testimonialRole} 
                      onChange={e => setCms({ ...cms, home: { ...cms.home, testimonialRole: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Awards & Press Recognition */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white">Awards & Press Recognition</h3>
                    <p className="text-xs text-white/50">Edit the prestigious accolades and publications shown on the homepage.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(cms.home.awards || [])];
                      updated.push({ title: 'New Award', subtitle: 'Architecture Prize 2026' });
                      setCms({ ...cms, home: { ...cms.home, awards: updated } });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-luxury-accent text-xs font-mono uppercase tracking-wider"
                  >
                    <Plus size={14} /> Add Award
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(cms.home.awards || []).map((award, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#161616] border border-white/5 space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = cms.home.awards.filter((_, i) => i !== idx);
                          setCms({ ...cms, home: { ...cms.home, awards: updated } });
                        }}
                        className="absolute top-3 right-3 p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Award"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Award Title</label>
                        <input
                          type="text"
                          value={award.title}
                          onChange={(e) => {
                            const updated = [...cms.home.awards];
                            updated[idx].title = e.target.value;
                            setCms({ ...cms, home: { ...cms.home, awards: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-luxury-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Subtitle / Category</label>
                        <input
                          type="text"
                          value={award.subtitle}
                          onChange={(e) => {
                            const updated = [...cms.home.awards];
                            updated[idx].subtitle = e.target.value;
                            setCms({ ...cms, home: { ...cms.home, awards: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:border-luxury-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT PAGE CMS */}
          {activeTab === 'about' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">About Page Editor</h1>
                  <p className="text-xs text-white/50">Edit studio manifesto, key metrics, atelier photo, leadership team, and design principles.</p>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all">
                  <Save size={14} /> Save Section
                </button>
              </div>

              {/* Hero & Manifesto */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Hero & Manifesto</h3>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Headline</label>
                  <input 
                    type="text" 
                    value={cms.about.heroHeading} 
                    onChange={e => setCms({ ...cms, about: { ...cms.about, heroHeading: e.target.value } })}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Manifesto Quote</label>
                  <textarea 
                    rows={3}
                    value={cms.about.manifestoQuote} 
                    onChange={e => setCms({ ...cms, about: { ...cms.about, manifestoQuote: e.target.value } })}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Hero Key Metrics / Stats */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Hero Key Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(cms.about.stats || []).map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#161616] border border-white/5 space-y-2">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-luxury-accent">Stat #{idx + 1}</label>
                      <input 
                        type="text"
                        placeholder="Value (e.g. 14+)"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...(cms.about.stats || [])];
                          updated[idx].value = e.target.value;
                          setCms({ ...cms, about: { ...cms.about, stats: updated } });
                        }}
                        className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-luxury-accent focus:outline-none"
                      />
                      <input 
                        type="text"
                        placeholder="Label"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...(cms.about.stats || [])];
                          updated[idx].label = e.target.value;
                          setCms({ ...cms, about: { ...cms.about, stats: updated } });
                        }}
                        className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:border-luxury-accent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Atelier Showcase Image */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Atelier Editorial Image</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Caption / Title</label>
                    <input 
                      type="text" 
                      value={cms.about.atelierTitle || ''} 
                      onChange={e => setCms({ ...cms, about: { ...cms.about, atelierTitle: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Atelier Photography</label>
                    <ImageDropzone 
                      value={cms.about.atelierImage || '/images/atelier_studio.jpg'}
                      onChange={(img) => setCms({ ...cms, about: { ...cms.about, atelierImage: img } })}
                    />
                  </div>
                </div>
              </div>

              {/* 4 Design Principles */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Design Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(cms.about.principles || []).map((p, idx) => (
                    <div key={p.id || idx} className="p-5 rounded-xl bg-[#161616] border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-luxury-accent font-semibold">{p.num}</span>
                      </div>
                      <input 
                        type="text"
                        value={p.title}
                        onChange={e => {
                          const updated = [...cms.about.principles];
                          updated[idx].title = e.target.value;
                          setCms({ ...cms, about: { ...cms.about, principles: updated } });
                        }}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-luxury-accent focus:outline-none"
                      />
                      <textarea 
                        rows={3}
                        value={p.desc}
                        onChange={e => {
                          const updated = [...cms.about.principles];
                          updated[idx].desc = e.target.value;
                          setCms({ ...cms, about: { ...cms.about, principles: updated } });
                        }}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:border-luxury-accent focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership Team */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-white">Leadership & Founding Partners</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(cms.about.leadership || [])];
                      updated.push({
                        name: 'New Partner',
                        role: 'Design Principal',
                        location: 'Tokyo Atelier',
                        bio: 'Architectural specialist with extensive international experience.'
                      });
                      setCms({ ...cms, about: { ...cms.about, leadership: updated } });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-luxury-accent text-xs font-mono uppercase tracking-wider"
                  >
                    <Plus size={14} /> Add Partner
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(cms.about.leadership || []).map((leader, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-[#161616] border border-white/5 space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = cms.about.leadership.filter((_, i) => i !== idx);
                          setCms({ ...cms, about: { ...cms.about, leadership: updated } });
                        }}
                        className="absolute top-3 right-3 p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Partner"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={leader.name}
                          onChange={(e) => {
                            const updated = [...cms.about.leadership];
                            updated[idx].name = e.target.value;
                            setCms({ ...cms, about: { ...cms.about, leadership: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-serif focus:border-luxury-accent focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Role</label>
                          <input 
                            type="text" 
                            value={leader.role}
                            onChange={(e) => {
                              const updated = [...cms.about.leadership];
                              updated[idx].role = e.target.value;
                              setCms({ ...cms, about: { ...cms.about, leadership: updated } });
                            }}
                            className="w-full bg-[#202020] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-luxury-accent focus:border-luxury-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Location</label>
                          <input 
                            type="text" 
                            value={leader.location}
                            onChange={(e) => {
                              const updated = [...cms.about.leadership];
                              updated[idx].location = e.target.value;
                              setCms({ ...cms, about: { ...cms.about, leadership: updated } });
                            }}
                            className="w-full bg-[#202020] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white/60 focus:border-luxury-accent focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Biography</label>
                        <textarea 
                          rows={3}
                          value={leader.bio}
                          onChange={(e) => {
                            const updated = [...cms.about.leadership];
                            updated[idx].bio = e.target.value;
                            setCms({ ...cms, about: { ...cms.about, leadership: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:border-luxury-accent focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Step Process */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">4-Phase Architectural Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(cms.about.processSteps || []).map((step, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-[#161616] border border-white/5 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-luxury-accent font-semibold">{step.step}</span>
                        <input 
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const updated = [...(cms.about.processSteps || [])];
                            updated[idx].title = e.target.value;
                            setCms({ ...cms, about: { ...cms.about, processSteps: updated } });
                          }}
                          className="flex-1 bg-[#202020] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:border-luxury-accent focus:outline-none font-serif"
                        />
                      </div>
                      <textarea 
                        rows={3}
                        value={step.desc}
                        onChange={(e) => {
                          const updated = [...(cms.about.processSteps || [])];
                          updated[idx].desc = e.target.value;
                          setCms({ ...cms, about: { ...cms.about, processSteps: updated } });
                        }}
                        className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:border-luxury-accent focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PROJECTS CRUD */}
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">Portfolio Projects CRUD</h1>
                  <p className="text-xs text-white/50">Add, edit, reorder, or delete residential case studies.</p>
                </div>
                <button
                  onClick={() => {
                    setIsNewProject(true);
                    setEditingProject({
                      id: `proj-${Date.now()}`,
                      title: '',
                      subtitle: '',
                      location: '',
                      year: '2026',
                      area: '',
                      category: 'Residential',
                      image: '/images/obsidian.jpg',
                      tagline: '',
                      narrative: '',
                      highlights: ['Custom Stone Hearth', 'Fluted Wall Panels']
                    });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all shadow-lg"
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>

              {/* Projects Table / Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cms.projects.map((proj) => (
                  <div key={proj.id} className="group rounded-2xl bg-[#111111] border border-white/10 overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] w-full relative bg-[#181818]">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded-full text-[10px] font-mono text-luxury-accent uppercase">
                          {proj.category}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-full text-[10px] font-mono text-white/80">
                          {proj.location}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-serif text-xl text-white mb-1">{proj.title}</h3>
                        <p className="text-xs text-luxury-accent font-mono mb-3">{proj.subtitle}</p>
                        <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed mb-4">{proj.tagline}</p>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {(proj.highlights || []).map((h, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                      <span className="text-[11px] font-mono text-white/40">{proj.year} &bull; {proj.area}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsNewProject(false);
                            setEditingProject({ ...proj });
                          }}
                          className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-luxury-accent hover:bg-white/10 transition-all"
                          title="Edit Project"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Delete Project"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MATERIALS CRUD */}
          {activeTab === 'materials' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">Materials Archive CRUD</h1>
                  <p className="text-xs text-white/50">Manage quarried stone, charred timbers, living metals, and tactile textiles.</p>
                </div>
                <button
                  onClick={() => {
                    setIsNewMaterial(true);
                    setEditingMaterial({
                      id: `mat-${Date.now()}`,
                      title: '',
                      category: 'Quarried Stone',
                      origin: 'Tivoli, Italy',
                      texture: 'Honed Matte Surface',
                      lifespan: '100+ Year Heritage',
                      acoustic: 'Naturally Sound Dampening',
                      image: '/images/mat_travertine.jpg',
                      tagline: '',
                      description: '',
                      applications: ['Custom Slabs', 'Monolithic Hearth'],
                      provenance: ''
                    });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all shadow-lg"
                >
                  <Plus size={16} /> Add Material
                </button>
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cms.materials.map((mat) => (
                  <div key={mat.id} className="rounded-2xl bg-[#111111] border border-white/10 overflow-hidden flex flex-col justify-between">
                    <div className="p-6">
                      <div className="flex items-start gap-5 mb-5">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#181818]">
                          <img src={mat.image} alt={mat.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-luxury-accent">{mat.category}</div>
                          <h3 className="font-serif text-xl text-white mb-1">{mat.title}</h3>
                          <div className="text-xs text-white/40">{mat.origin} &bull; {mat.texture}</div>
                        </div>
                      </div>

                      <p className="text-xs text-white/60 font-light leading-relaxed mb-4">{mat.tagline}</p>

                      <div className="space-y-1.5 text-xs text-white/50 border-t border-white/5 pt-4">
                        <div><strong className="text-white/70 font-mono text-[10px] uppercase">Lifespan:</strong> {mat.lifespan}</div>
                        <div><strong className="text-white/70 font-mono text-[10px] uppercase">Acoustics:</strong> {mat.acoustic}</div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                      <span className="text-[10px] font-mono text-white/30 uppercase">ID: {mat.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsNewMaterial(false);
                            setEditingMaterial({ ...mat });
                          }}
                          className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-luxury-accent hover:bg-white/10 transition-all"
                          title="Edit Material"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteMaterial(mat.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Delete Material"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SERVICES & FAQS CRUD */}
          {activeTab === 'services' && (
            <div className="space-y-10 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">Services & FAQ Editor</h1>
                  <p className="text-xs text-white/50">Edit 4 core disciplines, craft workshop showcase, 4-phase framework, and FAQ accordion.</p>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all">
                  <Save size={14} /> Save Section
                </button>
              </div>

              {/* 4 Core Disciplines */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">4 Core Architectural Disciplines</h3>
                <div className="space-y-6">
                  {(cms.services.disciplines || []).map((d, idx) => (
                    <div key={d.id || idx} className="p-6 rounded-xl bg-[#161616] border border-white/5 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-luxury-accent font-bold">{d.num}</span>
                        <input 
                          type="text"
                          value={d.title}
                          onChange={e => {
                            const updated = [...cms.services.disciplines];
                            updated[idx].title = e.target.value;
                            setCms({ ...cms, services: { ...cms.services, disciplines: updated } });
                          }}
                          className="flex-1 bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-serif focus:border-luxury-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Subtitle / Tagline</label>
                        <input 
                          type="text"
                          value={d.tagline || d.subtitle || ''}
                          onChange={e => {
                            const updated = [...cms.services.disciplines];
                            updated[idx].tagline = e.target.value;
                            setCms({ ...cms, services: { ...cms.services, disciplines: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-luxury-accent focus:border-luxury-accent focus:outline-none"
                        />
                      </div>
                      <textarea 
                        rows={2}
                        value={d.description || d.desc || ''}
                        onChange={e => {
                          const updated = [...cms.services.disciplines];
                          updated[idx].description = e.target.value;
                          updated[idx].desc = e.target.value;
                          setCms({ ...cms, services: { ...cms.services, disciplines: updated } });
                        }}
                        className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:border-luxury-accent focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Craft Workshop Showcase */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Craft Workshop Showcase</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(cms.services.craftShowcase || []).map((craft, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-[#161616] border border-white/5 space-y-4">
                      <div className="text-xs font-mono uppercase tracking-widest text-luxury-accent">
                        Workshop Showcase #{idx + 1}
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Category Tag</label>
                        <input
                          type="text"
                          value={craft.tag}
                          onChange={(e) => {
                            const updated = [...(cms.services.craftShowcase || [])];
                            updated[idx].tag = e.target.value;
                            setCms({ ...cms, services: { ...cms.services, craftShowcase: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-luxury-accent focus:border-luxury-accent focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Title</label>
                        <input
                          type="text"
                          value={craft.title}
                          onChange={(e) => {
                            const updated = [...(cms.services.craftShowcase || [])];
                            updated[idx].title = e.target.value;
                            setCms({ ...cms, services: { ...cms.services, craftShowcase: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-serif focus:border-luxury-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Workshop Photography</label>
                        <ImageDropzone
                          value={craft.image}
                          onChange={(img) => {
                            const updated = [...(cms.services.craftShowcase || [])];
                            updated[idx].image = img;
                            setCms({ ...cms, services: { ...cms.services, craftShowcase: updated } });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={craft.desc}
                          onChange={(e) => {
                            const updated = [...(cms.services.craftShowcase || [])];
                            updated[idx].desc = e.target.value;
                            setCms({ ...cms, services: { ...cms.services, craftShowcase: updated } });
                          }}
                          className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:border-luxury-accent focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-Phase Delivery Framework */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">4-Phase Project Delivery Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(cms.services.phases || []).map((ph, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#161616] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-luxury-accent">{ph.phase}</span>
                        <input
                          type="text"
                          placeholder="Duration"
                          value={ph.duration}
                          onChange={(e) => {
                            const updated = [...(cms.services.phases || [])];
                            updated[idx].duration = e.target.value;
                            setCms({ ...cms, services: { ...cms.services, phases: updated } });
                          }}
                          className="w-24 bg-[#202020] border border-white/10 rounded px-2 py-0.5 text-[10px] font-mono text-white/60 focus:border-luxury-accent focus:outline-none text-right"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Title"
                        value={ph.title}
                        onChange={(e) => {
                          const updated = [...(cms.services.phases || [])];
                          updated[idx].title = e.target.value;
                          setCms({ ...cms, services: { ...cms.services, phases: updated } });
                        }}
                        className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white font-serif focus:border-luxury-accent focus:outline-none"
                      />
                      <textarea
                        rows={3}
                        placeholder="Description"
                        value={ph.desc}
                        onChange={(e) => {
                          const updated = [...(cms.services.phases || [])];
                          updated[idx].desc = e.target.value;
                          setCms({ ...cms, services: { ...cms.services, phases: updated } });
                        }}
                        className="w-full bg-[#202020] border border-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white/70 focus:border-luxury-accent focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs CRUD */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-white">Interactive FAQs CRUD</h3>
                  <button
                    onClick={() => {
                      setIsNewFaq(true);
                      setEditingFaq({ id: `faq-${Date.now()}`, q: '', a: '' });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-luxury-accent text-xs font-mono uppercase tracking-wider"
                  >
                    <Plus size={14} /> Add FAQ
                  </button>
                </div>

                <div className="space-y-4">
                  {(cms.services.faqs || []).map((faq) => (
                    <div key={faq.id} className="p-5 rounded-xl bg-[#161616] border border-white/5 flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="text-sm font-medium text-white">{faq.q}</div>
                        <div className="text-xs text-white/60 font-light leading-relaxed">{faq.a}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setIsNewFaq(false);
                            setEditingFaq({ ...faq });
                          }}
                          className="p-1.5 rounded bg-white/5 text-white/60 hover:text-white"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CLIENT INQUIRIES & LEADS */}
          {activeTab === 'inquiries' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">Incoming Client Inquiries</h1>
                  <p className="text-xs text-white/50">Manage submitted commissions from the Start a Project modal.</p>
                </div>
                <button
                  onClick={() => {
                    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(cms.inquiries || [], null, 2))}`;
                    const a = document.createElement('a');
                    a.href = jsonString;
                    a.download = `leads_${Date.now()}.json`;
                    a.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white"
                >
                  <Download size={14} /> Export Leads
                </button>
              </div>

              {(cms.inquiries || []).length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#111111] border border-white/5">
                  <p className="text-sm text-white/40 font-light">No client inquiries found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(cms.inquiries || []).map((inq) => (
                    <div key={inq.id} className="p-6 rounded-2xl bg-[#111111] border border-white/5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-serif text-lg text-white">{inq.name}</h3>
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                              className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                                inq.status === 'New' 
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : inq.status === 'In Review'
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              }`}
                            >
                              <option value="New" className="bg-[#111111] text-white">New</option>
                              <option value="In Review" className="bg-[#111111] text-white">In Review</option>
                              <option value="Contacted" className="bg-[#111111] text-white">Contacted</option>
                              <option value="Completed" className="bg-[#111111] text-white">Completed</option>
                            </select>
                          </div>
                          <div className="text-xs text-white/50 mt-1">
                            {inq.email} &bull; {inq.location} &bull; {inq.size}
                          </div>
                        </div>

                        <div className="text-xs font-mono text-white/40">
                          {inq.date ? inq.date.substring(0, 10) : 'Recent'}
                        </div>
                      </div>

                      {inq.message && (
                        <div className="p-4 rounded-xl bg-[#161616] text-xs text-white/80 font-light leading-relaxed">
                          {inq.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">Registered Accounts</h1>
                  <p className="text-xs text-white/50">Client profiles created via the Register portal.</p>
                </div>
              </div>

              {usersList.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#111111] border border-white/5">
                  <p className="text-sm text-white/40 font-light">No client accounts registered yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {usersList.map((user, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-luxury-accent/20 flex items-center justify-center text-luxury-accent font-serif text-sm">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{user.firstName} {user.lastName}</div>
                          <div className="text-xs text-white/40 font-mono">{user.email} {user.phone && `• ${user.phone}`} {user.location && `• ${user.location}`}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-white/30">{user.createdAt ? user.createdAt.substring(0, 10) : 'Active'}</span>
                        <button
                          onClick={() => handleDeleteUser(user.email)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl text-white mb-1">Studio Global Settings</h1>
                  <p className="text-xs text-white/50">Manage branding, footer contacts, studio addresses, and content backups.</p>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all">
                  <Save size={14} /> Save Settings
                </button>
              </div>

              {/* Branding & Contacts */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Branding & Direct Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Studio Name</label>
                    <input 
                      type="text" 
                      value={cms.settings?.studioName || ''} 
                      onChange={e => setCms({ ...cms, settings: { ...cms.settings, studioName: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Contact Email</label>
                    <input 
                      type="email" 
                      value={cms.settings?.contactEmail || ''} 
                      onChange={e => setCms({ ...cms, settings: { ...cms.settings, contactEmail: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Contact Phone</label>
                    <input 
                      type="text" 
                      value={cms.settings?.contactPhone || ''} 
                      onChange={e => setCms({ ...cms, settings: { ...cms.settings, contactPhone: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Global Tagline</label>
                    <input 
                      type="text" 
                      value={cms.settings?.tagline || ''} 
                      onChange={e => setCms({ ...cms, settings: { ...cms.settings, tagline: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Instagram Handle / URL</label>
                    <input 
                      type="text" 
                      value={cms.settings?.instagram || ''} 
                      onChange={e => setCms({ ...cms, settings: { ...cms.settings, instagram: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Pinterest Handle / URL</label>
                    <input 
                      type="text" 
                      value={cms.settings?.pinterest || ''} 
                      onChange={e => setCms({ ...cms, settings: { ...cms.settings, pinterest: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">LinkedIn Handle / URL</label>
                    <input 
                      type="text" 
                      value={cms.settings?.linkedin || ''} 
                      onChange={e => setCms({ ...cms, settings: { ...cms.settings, linkedin: e.target.value } })}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-luxury-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Studios List */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-white">Global Studio Locations</h3>
                    <p className="text-xs text-white/50">Locations displayed in the footer and contact sections.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(cms.settings?.studios || [])];
                      updated.push('New Studio City');
                      setCms({ ...cms, settings: { ...cms.settings, studios: updated } });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-luxury-accent text-xs font-mono uppercase tracking-wider"
                  >
                    <Plus size={14} /> Add Studio
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(cms.settings?.studios || []).map((studio, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#161616] border border-white/5">
                      <input 
                        type="text" 
                        value={studio}
                        onChange={(e) => {
                          const updated = [...(cms.settings?.studios || [])];
                          updated[idx] = e.target.value;
                          setCms({ ...cms, settings: { ...cms.settings, studios: updated } });
                        }}
                        className="flex-1 bg-transparent text-sm text-white focus:outline-none font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (cms.settings?.studios || []).filter((_, i) => i !== idx);
                          setCms({ ...cms, settings: { ...cms.settings, studios: updated } });
                        }}
                        className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backup / Restore */}
              <div className="p-8 rounded-2xl bg-[#111111] border border-white/5 space-y-6">
                <h3 className="font-serif text-xl text-white">Data Backup & Export</h3>
                <p className="text-xs text-white/60 font-light max-w-lg leading-relaxed">
                  Download a full JSON snapshot of all your edited pages, custom projects, materials, and inquiry leads. You can restore this at any time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-luxury-accent text-[#0a0a0a] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-white transition-all"
                  >
                    <Download size={14} /> Export JSON Backup
                  </button>

                  <label className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#181818] border border-white/10 text-xs font-mono uppercase tracking-widest text-white/80 hover:border-white/30 cursor-pointer transition-all">
                    <Upload size={14} /> Import Backup File
                    <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <AlertCircle size={20} />
                  <h3 className="font-serif text-xl">Reset to Atelier Defaults</h3>
                </div>
                <p className="text-xs text-white/60 font-light max-w-lg leading-relaxed">
                  This will discard all local changes and restore the default 5 luxury residences, 4 macro materials, services framework, and original copywriting.
                </p>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-mono uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  <RotateCcw size={14} /> Reset Factory Content
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= EDIT / CREATE PROJECT MODAL ================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#111111] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl my-8">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-3xl text-white mb-2">
              {isNewProject ? 'Add New Residence' : `Edit ${editingProject.title}`}
            </h2>
            <p className="text-xs text-white/50 mb-8 font-light">
              Configure project parameters, high-res photography, and architectural highlights.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveProject(editingProject); }} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="e.g. The Obsidian Residence"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Subtitle / Material Palette</label>
                  <input
                    type="text"
                    value={editingProject.subtitle}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    placeholder="e.g. Warm Travertine Stone & Smoked Oak"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Penthouses">Penthouses</option>
                    <option value="Boutique & Dining">Boutique & Dining</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Location</label>
                  <input
                    type="text"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    placeholder="e.g. Roppongi, Tokyo"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Year</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    placeholder="2025"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Area / Dimensions</label>
                <input
                  type="text"
                  value={editingProject.area}
                  onChange={(e) => setEditingProject({ ...editingProject, area: e.target.value })}
                  placeholder="e.g. 620 m² (6,670 sq ft)"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                />
              </div>

              {/* Drag and Drop Image Uploader */}
              <ImageDropzone 
                value={editingProject.image}
                onChange={(img) => setEditingProject({ ...editingProject, image: img })}
                label="Residence Photography (Drag & Drop)"
                presets={[
                  '/images/obsidian.jpg', 
                  '/images/aether.jpg', 
                  '/images/project_como.jpg', 
                  '/images/project_aspen.jpg', 
                  '/images/kyoto.jpg'
                ]}
              />

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Tagline (Short Preview Copy)</label>
                <textarea
                  rows={2}
                  value={editingProject.tagline}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  placeholder="A calm, modern penthouse designed with dark wood, soft stone, and panoramic city views."
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Full Case Study Narrative</label>
                <textarea
                  rows={4}
                  value={editingProject.narrative}
                  onChange={(e) => setEditingProject({ ...editingProject, narrative: e.target.value })}
                  placeholder="Detailed architectural story and material composition..."
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Highlights (Comma separated)</label>
                <input
                  type="text"
                  value={(editingProject.highlights || []).join(', ')}
                  onChange={(e) => setEditingProject({ 
                    ...editingProject, 
                    highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                  })}
                  placeholder="Custom Fluted Panels, Concealed Ambient Lighting, Natural Stone Fireplace"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-luxury-accent text-[#0a0a0a] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-xl shadow-luxury-accent/20 flex items-center justify-center gap-2"
                >
                  <Save size={14} /> Save Residence
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-6 py-4 rounded-xl bg-[#181818] text-white/70 text-xs font-mono uppercase tracking-widest hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT / CREATE MATERIAL MODAL ================= */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#111111] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl my-8">
            <button
              onClick={() => setEditingMaterial(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-3xl text-white mb-2">
              {isNewMaterial ? 'Add Material Spec' : `Edit ${editingMaterial.title}`}
            </h2>
            <p className="text-xs text-white/50 mb-8 font-light">
              Configure macro texture details, lifespan metrics, and provenance notes.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveMaterial(editingMaterial); }} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Material Name</label>
                  <input
                    type="text"
                    required
                    value={editingMaterial.title}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
                    placeholder="e.g. Silver Travertine Stone"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Category</label>
                  <select
                    value={editingMaterial.category}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value })}
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  >
                    <option value="Quarried Stone">Quarried Stone</option>
                    <option value="Organic Timber">Organic Timber</option>
                    <option value="Warm Metals">Warm Metals</option>
                    <option value="Tactile Textiles">Tactile Textiles</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Origin</label>
                  <input
                    type="text"
                    value={editingMaterial.origin}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, origin: e.target.value })}
                    placeholder="Tivoli Quarries, Italy"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Texture Finish</label>
                  <input
                    type="text"
                    value={editingMaterial.texture}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, texture: e.target.value })}
                    placeholder="Honed Matte Surface"
                    className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Drag and Drop Material Texture Uploader */}
              <ImageDropzone 
                value={editingMaterial.image}
                onChange={(img) => setEditingMaterial({ ...editingMaterial, image: img })}
                label="Material Macro Texture (Drag & Drop)"
                presets={[
                  '/images/mat_travertine.jpg', 
                  '/images/mat_yakisugi.jpg', 
                  '/images/mat_bronze.jpg', 
                  '/images/mat_boucle.jpg'
                ]}
              />

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Tagline</label>
                <input
                  type="text"
                  value={editingMaterial.tagline}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, tagline: e.target.value })}
                  placeholder="Short one-line description"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-luxury-accent text-[#0a0a0a] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-xl shadow-luxury-accent/20 flex items-center justify-center gap-2"
                >
                  <Save size={14} /> Save Material
                </button>
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)}
                  className="px-6 py-4 rounded-xl bg-[#181818] text-white/70 text-xs font-mono uppercase tracking-widest hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT / CREATE FAQ MODAL ================= */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#111111] p-8 rounded-3xl border border-white/10 shadow-2xl">
            <button
              onClick={() => setEditingFaq(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>

            <h3 className="font-serif text-2xl text-white mb-6">
              {isNewFaq ? 'New FAQ Item' : 'Edit FAQ Item'}
            </h3>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveFaq(editingFaq); }} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.q}
                  onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
                  placeholder="e.g. What scale of projects does AURA undertake?"
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-white/50 mb-2">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.a}
                  onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
                  placeholder="Detailed architectural answer..."
                  className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-luxury-accent focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-luxury-accent text-[#0a0a0a] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg"
                >
                  Save FAQ
                </button>
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-5 py-3.5 rounded-xl bg-[#181818] text-white/70 text-xs font-mono uppercase"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
