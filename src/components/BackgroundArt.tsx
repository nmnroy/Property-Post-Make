import { BRAND } from '../lib/brand';

export function BackgroundArt() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.18] flex items-end justify-center" 
      style={{ 
        color: BRAND.colors.ink,
        WebkitMaskImage: 'linear-gradient(to right, black 0%, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.25) 75%, black 100%)',
        maskImage: 'linear-gradient(to right, black 0%, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.25) 75%, black 100%)'
      }}
    >
      <svg 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice" 
        className="w-[120vw] h-full min-w-[1500px] -ml-[10vw] scale-110 md:scale-125 origin-bottom"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground Line */}
        <line x1="0" y1="950" x2="1920" y2="950" stroke="currentColor" strokeWidth="2" />

        {/* Tree Left */}
        <g className="tree-left">
          <line x1="300" y1="950" x2="300" y2="700" stroke="currentColor" strokeWidth="4" />
          <path d="M 220 720 C 200 650, 300 600, 320 620 C 350 550, 420 620, 400 680 C 450 720, 380 780, 320 760 C 250 800, 200 750, 220 720 Z" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* Left Block (Garage / Entrance) */}
        <rect x="450" y="650" width="350" height="300" stroke="currentColor" strokeWidth="2" />
        <rect x="520" y="750" width="120" height="200" stroke="currentColor" strokeWidth="2" />
        {/* Garage Door Lines */}
        <line x1="520" y1="780" x2="640" y2="780" stroke="currentColor" strokeWidth="1" />
        <line x1="520" y1="810" x2="640" y2="810" stroke="currentColor" strokeWidth="1" />
        <line x1="520" y1="840" x2="640" y2="840" stroke="currentColor" strokeWidth="1" />
        <line x1="520" y1="870" x2="640" y2="870" stroke="currentColor" strokeWidth="1" />
        <line x1="520" y1="900" x2="640" y2="900" stroke="currentColor" strokeWidth="1" />
        <line x1="520" y1="930" x2="640" y2="930" stroke="currentColor" strokeWidth="1" />
        
        {/* Entrance Door */}
        <rect x="680" y="700" width="80" height="250" stroke="currentColor" strokeWidth="2" />
        <circle cx="740" cy="820" r="4" stroke="currentColor" strokeWidth="2" />

        {/* Main Central Block (Two stories) */}
        <rect x="750" y="450" width="550" height="500" stroke="currentColor" strokeWidth="2" />
        {/* Flat Overhanging Roof */}
        <line x1="720" y1="450" x2="1330" y2="450" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
        
        {/* Large Window Grid - Ground Floor */}
        <rect x="800" y="700" width="450" height="250" stroke="currentColor" strokeWidth="2" />
        <line x1="800" y1="825" x2="1250" y2="825" stroke="currentColor" strokeWidth="1" />
        <line x1="950" y1="700" x2="950" y2="950" stroke="currentColor" strokeWidth="2" />
        <line x1="1100" y1="700" x2="1100" y2="950" stroke="currentColor" strokeWidth="2" />
        
        {/* Large Window Grid - First Floor */}
        <rect x="800" y="500" width="450" height="150" stroke="currentColor" strokeWidth="2" />
        <line x1="950" y1="500" x2="950" y2="650" stroke="currentColor" strokeWidth="2" />
        <line x1="1100" y1="500" x2="1100" y2="650" stroke="currentColor" strokeWidth="2" />
        
        {/* Floor separator line */}
        <line x1="750" y1="675" x2="1300" y2="675" stroke="currentColor" strokeWidth="2" />

        {/* Right Wing (Pitched Roof) */}
        <polygon points="1250,550 1450,400 1650,550 1650,950 1250,950" stroke="currentColor" strokeWidth="2" />
        {/* Pitched Roof Overhang */}
        <line x1="1220" y1="575" x2="1450" y2="390" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <line x1="1450" y1="390" x2="1680" y2="575" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
        {/* Right Wing Windows */}
        <rect x="1350" y="650" width="200" height="300" stroke="currentColor" strokeWidth="2" />
        <line x1="1350" y1="800" x2="1550" y2="800" stroke="currentColor" strokeWidth="1" />
        <line x1="1450" y1="650" x2="1450" y2="950" stroke="currentColor" strokeWidth="2" />

        {/* Tree Right */}
        <g className="tree-right">
          <line x1="1750" y1="950" x2="1750" y2="800" stroke="currentColor" strokeWidth="3" />
          <polygon points="1750,600 1650,850 1850,850" stroke="currentColor" strokeWidth="2" />
          <polygon points="1750,700 1680,900 1820,900" stroke="currentColor" strokeWidth="2" />
        </g>
        
        {/* Additional minimal lines for texture */}
        <line x1="150" y1="950" x2="200" y2="950" stroke="currentColor" strokeWidth="4" />
        <line x1="1800" y1="950" x2="1880" y2="950" stroke="currentColor" strokeWidth="4" />

      </svg>
    </div>
  );
}
