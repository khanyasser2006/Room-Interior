import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 195;

export default function HeroSequence({ homeData }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const framesRef = useRef(new Array(TOTAL_FRAMES));
  const frameIndexRef = useRef({ current: 0 });

  useEffect(() => {
    let isActive = true;

    // Load first frame immediately to paint canvas without delay
    fetch('/cabinet_frames_600fps/frame_001.jpg')
      .then(res => res.blob())
      .then(blob => createImageBitmap(blob))
      .then(bitmap => {
        if (isActive) {
          framesRef.current[0] = bitmap;
          setLoadedCount(1);
        }
      })
      .catch(console.error);

    // Parallel batch loader for all remaining frames
    const loadAllFrames = async () => {
      const batchSize = 30;
      for (let i = 1; i <= TOTAL_FRAMES; i += batchSize) {
        if (!isActive) break;
        const batchPromises = [];
        for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES + 1); j++) {
          const frameNum = String(j).padStart(3, '0');
          const promise = fetch(`/cabinet_frames_600fps/frame_${frameNum}.jpg`)
            .then(res => {
              if (!res.ok) throw new Error(`Frame ${frameNum} missing`);
              return res.blob();
            })
            .then(blob => createImageBitmap(blob))
            .then(bitmap => {
              if (isActive) {
                framesRef.current[j - 1] = bitmap;
                setLoadedCount(prev => prev + 1);
              }
            })
            .catch(() => {});
          batchPromises.push(promise);
        }
        await Promise.all(batchPromises);
      }
      if (isActive) {
        setIsReady(true);
      }
    };

    loadAllFrames();

    return () => {
      isActive = false;
      framesRef.current.forEach(bmp => {
        if (bmp && typeof bmp.close === 'function') bmp.close();
      });
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;

    const render = () => {
      const idx = Math.min(Math.max(0, frameIndexRef.current.current | 0), TOTAL_FRAMES - 1);
      // Fallback to first loaded frame if target frame isn't yet ready
      const img = framesRef.current[idx] || framesRef.current[0];

      if (img && ctx) {
        const cw = canvas.width | 0;
        const ch = canvas.height | 0;

        const ir = img.width / img.height;
        const cr = cw / ch;

        let dw = cw;
        let dh = ch;
        let dx = 0;
        let dy = 0;

        if (cr > ir) {
          dh = (cw / ir) | 0;
          dy = ((ch - dh) / 2) | 0;
        } else {
          dw = (ch * ir) | 0;
          dx = ((cw - dw) / 2) | 0;
        }

        ctx.drawImage(img, dx, dy, dw, dh);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = (window.innerWidth * Math.min(window.devicePixelRatio, 2)) | 0;
      canvas.height = (window.innerHeight * Math.min(window.devicePixelRatio, 2)) | 0;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    // GSAP ScrollTrigger Sequence with Multi-Phase Isolated Overlay Animations
    const ctxTimeline = gsap.context(() => {
      // Set initial visibility states strictly
      gsap.set(text1Ref.current, { autoAlpha: 1, y: 0 });
      gsap.set(text2Ref.current, { autoAlpha: 0, y: 40 });
      gsap.set(text3Ref.current, { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1, // Ultra-smooth scrub
          invalidateOnRefresh: true,
        }
      });

      // 1. Frame progression across total scroll
      tl.to(frameIndexRef.current, {
        current: TOTAL_FRAMES - 1,
        ease: 'none',
        duration: 1,
      }, 0);

      // 2. Title 1: "Spatial Elegance" (Visible at top, fades out from 0.15 to 0.26)
      if (text1Ref.current) {
        tl.to(text1Ref.current, {
          autoAlpha: 0,
          y: -40,
          ease: 'power2.inOut',
          duration: 0.11,
        }, 0.15);
      }

      // 3. Title 2: "The Beauty of Natural Materials" (Fades in at 0.35, stays, fades out at 0.60)
      if (text2Ref.current) {
        tl.fromTo(text2Ref.current, 
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.10 },
          0.35
        ).to(text2Ref.current, {
          autoAlpha: 0,
          y: -40,
          ease: 'power2.in',
          duration: 0.10,
        }, 0.58);
      }

      // 4. Title 3: "Open Views & Peaceful Spaces" (Fades in at 0.70, stays, fades out at 0.92)
      if (text3Ref.current) {
        tl.fromTo(text3Ref.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.10 },
          0.70
        ).to(text3Ref.current, {
          autoAlpha: 0,
          y: -30,
          ease: 'power2.in',
          duration: 0.08,
        }, 0.90);
      }
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ctxTimeline.revert();
    };
  }, []);

  const progressPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#070707] overflow-hidden select-none">
      {/* 60fps Decoupled Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover pointer-events-none"
      />

      {/* Subtle Vignette & Cinema Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-transparent to-luxury-950/40 pointer-events-none" />

      {/* Section 01: Initial Reveal */}
      <div 
        ref={text1Ref} 
        className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 pointer-events-none z-20"
      >
        <div className="max-w-4xl text-white">
          <h1 className="font-serif text-6xl sm:text-7xl md:text-9xl leading-[0.88] tracking-tight mb-6">
            {homeData?.heroTitle1 ? (
              <span>{homeData.heroTitle1}</span>
            ) : (
              <>
                Spatial <br />
                <span className="italic font-light text-luxury-accent">Elegance</span>
              </>
            )}
          </h1>
          <p className="max-w-lg text-base md:text-lg text-white/80 font-light font-sans leading-relaxed">
            {homeData?.heroSubtitle1 || 'We design calm, timeless interiors shaped by natural light, warm materials, and clean architecture. Every room is crafted with purpose and refined beauty.'}
          </p>
        </div>
      </div>

      {/* Section 02: Materiality Reveal */}
      <div 
        ref={text2Ref} 
        className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-24 pointer-events-none z-20 opacity-0"
      >
        <div className="max-w-2xl text-white">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl leading-tight mb-6">
            {homeData?.heroTitle2 ? (
              <span>{homeData.heroTitle2}</span>
            ) : (
              <>
                The Beauty of <br />
                <span className="italic text-white/90">Natural Materials</span>
              </>
            )}
          </h2>
          <p className="text-base md:text-xl text-white/80 font-light font-sans leading-relaxed">
            {homeData?.heroSubtitle2 || 'Removing clutter to focus on clean lines, warm textures, and natural daylight throughout the day.'}
          </p>
        </div>
      </div>

      {/* Section 03: Open Views Reveal */}
      <div 
        ref={text3Ref} 
        className="absolute inset-0 flex flex-col justify-end p-8 md:p-24 pointer-events-none z-20 opacity-0"
      >
        <div className="max-w-3xl text-white ml-auto text-right">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-8xl leading-none mb-6">
            {homeData?.heroTitle3 ? (
              <span>{homeData.heroTitle3}</span>
            ) : (
              <>
                Open Views & <br />
                <span className="italic text-luxury-accent">Peaceful Spaces</span>
              </>
            )}
          </h2>
          <p className="text-base md:text-lg text-white/80 font-light font-sans max-w-lg ml-auto leading-relaxed">
            {homeData?.heroSubtitle3 || 'Custom interior architecture designed to frame beautiful views and bring comfort into your everyday life.'}
          </p>
        </div>
      </div>
    </div>
  );
}
