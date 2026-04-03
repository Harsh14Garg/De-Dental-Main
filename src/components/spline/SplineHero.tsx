import { useCallback, useState } from 'react';
import SplineScene from './SplineScene';

interface SplineHeroProps {
  scene: string;
  className?: string;
  interactive?: boolean;
  opacity?: number;
}

export default function SplineHero({ scene, className = '', interactive = true, opacity = 0.55 }: SplineHeroProps) {
  const [ready, setReady] = useState(false);
  const handleLoad = useCallback(() => setReady(true), []);

  return (
    <div
      className={className}
      style={{
        position: 'absolute', inset: 0, zIndex: 1,
        pointerEvents: interactive ? 'auto' : 'none',
        opacity: ready ? opacity : 0,
        transition: 'opacity 1.2s ease-in-out',
      }}
    >
      <SplineScene scene={scene} onLoad={handleLoad} className="w-full h-full" showLoader={false}
        style={{ position: 'absolute', inset: 0 }}
      />
    </div>
  );
}
