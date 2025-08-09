
import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  className = '', 
  prefix = '', 
  suffix = '',
  duration = 2000 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    setIsAnimating(true);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Enhanced easing function with more dramatic bounce effect
      const easeOutElastic = (t: number) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
          ? 0
          : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      };

      const easedProgress = easeOutElastic(progress);
      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span 
      className={`${className} ${isAnimating ? 'animate-pulse' : ''} transform transition-all duration-500 hover:scale-110 cursor-default relative inline-block`}
      style={{
        textShadow: '0 8px 16px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
      }}
    >
      {/* Glow effect behind the number */}
      <span 
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-30 animate-pulse"
        style={{
          transform: 'scale(1.2)',
          zIndex: -1
        }}
      />
      
      {prefix}
      <span className="font-mono tracking-wider relative z-10 animate-fade-in">
        {displayValue.toFixed(2)}
      </span>
      {suffix}
      
      {/* Sparkle effects */}
      {isAnimating && (
        <>
          <span className="absolute -top-2 -right-1 text-yellow-400 animate-ping text-sm">✨</span>
          <span className="absolute -bottom-1 -left-2 text-blue-400 animate-pulse text-xs">💫</span>
        </>
      )}
    </span>
  );
};
