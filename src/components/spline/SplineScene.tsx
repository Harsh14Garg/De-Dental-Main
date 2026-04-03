"use client";
import { useRef, useState, useEffect } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (app: any) => void;
  showLoader?: boolean;
  style?: React.CSSProperties;
}

function SplineLoader() {
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
        <div className="spline-loader-ring" />
        <span style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--color-text-muted)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
          Loading 3D Scene…
        </span>
      </div>
    </div>
  );
}

export default function SplineScene({ scene, className = '', onLoad, showLoader = true, style }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let terminated = false;

    async function init() {
      if (!canvasRef.current) return;
      try {
        const { Application } = await import('@splinetool/runtime');
        if (terminated) return;
        const app = new Application(canvasRef.current);
        appRef.current = app;
        await app.load(scene);
        if (terminated) { app.dispose(); return; }
        setIsLoaded(true);
        onLoad?.(app);
      } catch (err) {
        console.error('Spline error:', err);
        if (!terminated) setIsError(true);
      }
    }

    init();
    return () => {
      terminated = true;
      try { appRef.current?.dispose(); } catch (_) {}
      appRef.current = null;
    };
  }, [scene]);

  return (
    <div
      className={`spline-container ${className}`}
      style={{ ...style, position:'relative', overflow:'hidden', width:'100%', height:'100%' }}
    >
      {showLoader && !isLoaded && !isError && <SplineLoader />}
      {isError && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <p style={{ color:'var(--color-brand-primary)', fontWeight:700, fontSize:'0.875rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>
            3D unavailable — WebGL required
          </p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: isLoaded ? 'block' : 'none',
          width: '100%', height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </div>
  );
}
