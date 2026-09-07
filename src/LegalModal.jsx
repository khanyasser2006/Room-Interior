import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Printer, Lock, Scale, CheckCircle2 } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy', studioName = 'AURA ARCHITECTURAL ATELIER' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'privacy' or 'terms'

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d0d] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden text-[#F3F2EE]"
        data-lenis-prevent="true"
      >
        {/* Modal Header */}
        <div className="px-6 sm:px-10 py-6 border-b border-white/10 flex items-center justify-between bg-[#111111]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-luxury-accent/10 border border-luxury-accent/20 flex items-center justify-center text-luxury-accent">
              {activeTab === 'privacy' ? <ShieldCheck size={20} /> : <FileText size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-luxury-accent">
                <span>LEGAL & COMPLIANCE</span>
                <span>&bull;</span>
                <span>OCTOBER 2026 EDITION</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-white font-light">
                {activeTab === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms of Architectural Commission'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono tracking-wider text-white/70 hover:text-white transition-all border border-white/5"
              title="Print Document"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all border border-white/5"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 sm:px-10 pt-4 pb-2 border-b border-white/5 flex gap-4 bg-[#0d0d0d] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-1 text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'privacy'
                ? 'border-luxury-accent text-luxury-accent font-semibold'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Lock size={13} />
            Privacy Policy (GDPR / CCPA)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-1 text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'terms'
                ? 'border-luxury-accent text-luxury-accent font-semibold'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Scale size={13} />
            Terms of Service & Commission
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-8 text-sm font-light text-white/80 leading-relaxed custom-scrollbar">
          {activeTab === 'privacy' ? (
            /* ================= PRIVACY POLICY ================= */
            <div className="space-y-8">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/70 space-y-2">
                <div className="text-luxury-accent font-mono uppercase tracking-wider font-semibold">
                  Client Discretion & Confidentiality Commitment
                </div>
                <p>
                  {studioName} upholds the highest standards of discretion. We recognize that residential floor plans, private property coordinates, high-resolution interior photography, and commission budgets constitute sensitive personal information. We never sell, rent, or trade your data.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">1.0</span> Data Controller & Scope
                </h3>
                <p>
                  This Privacy Policy applies to personal data collected through the {studioName} digital platform, private atelier consultations, and ongoing architectural commission communications across our studios in Tokyo, New York, Milan, and Paris.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">2.0</span> Information We Collect
                </h3>
                <ul className="space-y-2 pl-4 list-disc marker:text-luxury-accent text-white/70">
                  <li><strong>Commission Inquiries:</strong> Full name, primary email address, telephone contact, project geographic location, approximate scale (m²), projected timeline, and architectural brief.</li>
                  <li><strong>Client Account Authentication:</strong> Login credentials hashed with salted BCrypt (work factor 12) and session identifiers stored securely in <code className="text-luxury-accent bg-white/5 px-1 py-0.5 rounded">HttpOnly; SameSite=Strict</code> cookies.</li>
                  <li><strong>Technical & Telemetry Data:</strong> IP address, browser type, and anonymous access logs used exclusively for security rate-limiting and DDoS mitigation.</li>
                  <li><strong>Uploaded Architectural Media:</strong> When clients or team members upload drawings or reference photography, all binary files are automatically inspected and stripped of EXIF GPS coordinates and camera metadata before storage.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">3.0</span> Legal Basis & Purpose of Processing
                </h3>
                <p>
                  We process personal data under the following lawful bases:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#141414] border border-white/5">
                    <div className="text-xs font-mono uppercase text-luxury-accent mb-1">Contractual Necessity</div>
                    <p className="text-xs text-white/60">Evaluating project feasibility, preparing architectural proposals, and executing turnkey spatial commissions.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#141414] border border-white/5">
                    <div className="text-xs font-mono uppercase text-luxury-accent mb-1">Legitimate Interests</div>
                    <p className="text-xs text-white/60">Protecting atelier infrastructure against malicious bot spam, credential stuffing, and unauthorized access.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">4.0</span> Security Safeguards & Encryption
                </h3>
                <p>
                  All data in transit is protected using modern <strong>TLS 1.3 encryption</strong> with strict HTTP Strict Transport Security (HSTS). Data at rest is encrypted using <strong>AES-256</strong>. Our backend architecture utilizes server-side parameterized queries (Entity Framework Core) preventing SQL injection vulnerabilities.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">5.0</span> Your Rights (GDPR, CCPA & Global Protections)
                </h3>
                <p>
                  Regardless of your country of residence, you maintain the following guaranteed rights:
                </p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-luxury-accent text-white/70">
                  <li><strong>Right to Access:</strong> Request a copy of all personal records and commission records held by the atelier.</li>
                  <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request complete deletion of your account and inquiry data.</li>
                  <li><strong>Right to Rectification:</strong> Update inaccurate contact or project information.</li>
                  <li><strong>Non-Discrimination:</strong> We never alter pricing or service quality based on the exercise of privacy rights.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">6.0</span> Data Protection Officer Contact
                </h3>
                <p>
                  For data requests, NDA requests, or questions regarding our privacy architecture, contact our Data Protection Officer directly at:
                </p>
                <div className="p-4 rounded-xl bg-[#141414] border border-white/5 font-mono text-xs text-luxury-accent">
                  Email: privacy@aura-design.com &bull; Data Protection Office, AURA Atelier, Tokyo & Milan
                </div>
              </section>
            </div>
          ) : (
            /* ================= TERMS OF SERVICE ================= */
            <div className="space-y-8">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-white/70 space-y-2">
                <div className="text-luxury-accent font-mono uppercase tracking-wider font-semibold">
                  Architectural Atelier Engagement Terms
                </div>
                <p>
                  These Terms of Service govern all commissions, digital consultations, and architectural contracts entered into with {studioName}. By engaging our atelier or submitting a project brief, you agree to these terms.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">1.0</span> Scope of Atelier Services
                </h3>
                <p>
                  {studioName} provides comprehensive interior architecture, spatial planning, 3D volume studies, bespoke millwork engineering, artisanal quarry material curation, and turnkey site supervision. Each commission is executed under a detailed Master Services Agreement (MSA) specific to the property.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">2.0</span> Intellectual Property & Architectural Drawings
                </h3>
                <p>
                  All architectural drawings, 3D visualizations, bespoke millwork schematics, and material specifications authored by {studioName} remain the exclusive intellectual property of the atelier.
                </p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-luxury-accent text-white/70">
                  <li>Clients receive an irrevocable, perpetual, non-exclusive license to execute the design strictly within the designated property address.</li>
                  <li>Duplication or resale of architectural blueprints for alternate real estate developments without written consent is strictly prohibited.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">3.0</span> Natural Material Tolerances & Variations
                </h3>
                <p>
                  Our work incorporates authentic, un-altered natural stone (Silver Travertine, Calacatta marble), solid hardwoods (Yakisugi charred cedar, smoked European oak), and hand-patinated metals. 
                </p>
                <div className="p-4 rounded-xl bg-[#141414] border border-white/5 text-xs text-white/70">
                  <div className="text-luxury-accent font-mono uppercase mb-1">Authenticity Notice</div>
                  Natural variations in grain, geological banding, veining, and organic aging are hallmarks of authentic luxury materials and do not constitute structural or aesthetic defects.
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">4.0</span> Mutual Non-Disclosure & Confidentiality
                </h3>
                <p>
                  Both parties agree to treat all commercial terms, financial budgets, security floor plans, and private residential locations as confidential. The atelier will not publish photography of completed private residences without the client's express written approval.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">5.0</span> Governing Law & Dispute Resolution
                </h3>
                <p>
                  Unless specified otherwise in an individual project commission agreement, disputes shall be resolved through binding international commercial arbitration under the rules of the International Chamber of Commerce (ICC) in Tokyo, Milan, or New York.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="font-serif text-lg text-white flex items-center gap-2">
                  <span className="text-luxury-accent font-mono text-xs">6.0</span> Inquiries & Official Notices
                </h3>
                <p>
                  Legal and commission notices should be addressed in writing to:
                </p>
                <div className="p-4 rounded-xl bg-[#141414] border border-white/5 font-mono text-xs text-luxury-accent">
                  AURA Architectural Atelier &bull; Legal Counsel &bull; legal@aura-design.com
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-10 py-5 border-t border-white/10 bg-[#111111]/90 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-[11px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 size={13} className="text-luxury-accent" />
            <span>Compliant with GDPR, CCPA, APPI & International Architectural Standards</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-luxury-accent text-[#0a0a0a] font-semibold text-xs font-mono uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-luxury-accent/10"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
}
