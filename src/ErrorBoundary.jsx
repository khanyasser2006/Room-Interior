import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AURA Production Error Boundary caught an exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#070707] text-[#F3F2EE] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-[#111111] p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-luxury-accent/10 border border-luxury-accent/30 text-luxury-accent flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={24} />
            </div>
            
            <div className="text-xs font-mono tracking-mega-wide uppercase text-luxury-accent mb-2">
              AURA ATELIER
            </div>
            
            <h1 className="font-serif text-3xl text-white mb-3 font-light">
              Experience Interrupted
            </h1>
            
            <p className="text-xs text-white/60 font-light leading-relaxed mb-8">
              We encountered an unexpected rendering condition. Click below to return to the atelier home.
            </p>
            
            <button
              onClick={this.handleReset}
              className="w-full py-4 rounded-xl bg-luxury-accent text-[#070707] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> Return to Atelier
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
