import { useEffect, useRef, ReactNode, CSSProperties } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function ScrollReveal({ children, direction = 'up', delay = 0, className = '', style }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const classMap = {
      up: 'reveal',
      left: 'reveal-left',
      right: 'reveal-right',
      scale: 'reveal-scale',
    };

    el.classList.add(classMap[direction]);
    if (delay) el.style.transitionDelay = `${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
