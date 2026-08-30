import { BRAND } from '../lib/brand';

export type BrandVariant = keyof typeof BRAND.colors;

export interface LogoProps {
  size?: number;
  variant?: BrandVariant;
  className?: string;
}

export function Logo({ size = 40, variant = 'clay', className = '' }: LogoProps) {
  const color = BRAND.colors[variant];
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract 'N' / Rooftop Arrow */}
      {/* Left stroke leaning right */}
      <polygon points="12,40 26,10 34,10 20,40" fill={color} />
      {/* Right stroke leaning left, with slight opacity for overlay effect */}
      <polygon points="26,10 40,40 32,40 18,10" fill={color} opacity="0.85" />
    </svg>
  );
}

export function Wordmark({ size = 40, variant = 'clay', className = '' }: LogoProps) {
  const color = BRAND.colors[variant];
  const scale = size / 40;
  
  return (
    <div className={`flex flex-col justify-center ${className}`} style={{ color }}>
      <span 
        className="font-bold tracking-[0.2em] leading-none" 
        style={{ fontSize: `${18 * scale}px` }}
      >
        NAMAN
      </span>
      <span 
        className="font-thin tracking-[0.3em] leading-tight mt-1" 
        style={{ fontSize: `${9 * scale}px`, opacity: 0.8 }}
      >
        ESTATES
      </span>
    </div>
  );
}
