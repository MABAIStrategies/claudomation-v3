/**
 * Ornate Decorative Elements
 *
 * Medieval manuscript-style decorations for the fantasy book theme.
 * Reusable SVG components for borders, flourishes, and illuminations.
 */

// Corner flourishes for page decoration
export function CornerFlourish({ position = 'top-left', className = '' }: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const transforms = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  };

  return (
    <svg
      className={`absolute w-24 h-24 opacity-40 pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      style={{
        transform: transforms[position],
        [position.includes('top') ? 'top' : 'bottom']: '0',
        [position.includes('left') ? 'left' : 'right']: '0',
      }}
    >
      <defs>
        <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F6E7C1" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>

      {/* Ornate corner decoration */}
      <path
        d="M0,0 Q20,0 30,10 T50,30 Q55,35 60,35 L70,35 Q75,35 75,40 L75,50 Q75,55 70,55 L60,55 Q55,55 50,60 T30,80 Q20,90 0,90 Z"
        fill={`url(#goldGrad-${position})`}
        stroke="#8B7355"
        strokeWidth="0.5"
      />

      {/* Decorative filigree */}
      <path
        d="M15,15 Q25,20 35,15 M15,25 Q20,30 25,25 M35,25 Q40,30 45,25"
        stroke="#8B7355"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* Dots */}
      <circle cx="20" cy="20" r="1.5" fill="#8B7355"/>
      <circle cx="30" cy="30" r="1.5" fill="#8B7355"/>
      <circle cx="40" cy="40" r="1.5" fill="#8B7355"/>
    </svg>
  );
}

// Illuminated capital letter for chapter starts
export function IlluminatedCapital({ letter }: { letter: string }) {
  return (
    <div className="float-left mr-3 mb-2">
      <svg width="80" height="80" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="capGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ornate background square */}
        <rect x="10" y="10" width="80" height="80" rx="8"
              fill="url(#capGold)" stroke="#78350f" strokeWidth="2"/>

        {/* Inner decorative border */}
        <rect x="15" y="15" width="70" height="70" rx="6"
              fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2 2"/>

        {/* Letter */}
        <text x="50" y="70" textAnchor="middle"
              className="font-serif font-bold fill-amber-950"
              fontSize="48" filter="url(#goldGlow)">
          {letter}
        </text>

        {/* Decorative flourishes */}
        <path d="M20,25 Q25,20 30,25" stroke="#78350f" strokeWidth="1.5" fill="none"/>
        <path d="M70,75 Q75,80 80,75" stroke="#78350f" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

// Ornate divider line
export function OrnateDivider({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-full h-8 ${className}`} viewBox="0 0 400 30" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0"/>
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="1"/>
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Main line */}
      <line x1="0" y1="15" x2="400" y2="15" stroke="url(#divGrad)" strokeWidth="2"/>

      {/* Center ornament */}
      <g transform="translate(200, 15)">
        <circle cx="0" cy="0" r="8" fill="#D4AF37" stroke="#8B7355" strokeWidth="1"/>
        <circle cx="0" cy="0" r="5" fill="#F6E7C1" stroke="#8B7355" strokeWidth="0.5"/>
        <path d="M-15,0 L-10,0 M10,0 L15,0" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
      </g>

      {/* Side flourishes */}
      <path d="M50,15 Q55,10 60,15 Q55,20 50,15" fill="#D4AF37" opacity="0.6"/>
      <path d="M350,15 Q345,10 340,15 Q345,20 350,15" fill="#D4AF37" opacity="0.6"/>
    </svg>
  );
}

// Page number with ornate frame
export function OrnatePageNumber({ number }: { number: number }) {
  return (
    <div className="flex items-center justify-center">
      <svg width="60" height="40" viewBox="0 0 60 40">
        <defs>
          <filter id="pageNumGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Frame */}
        <rect x="10" y="5" width="40" height="30" rx="4"
              fill="#F6E7C1" stroke="#8B7355" strokeWidth="1.5"/>

        {/* Corner decorations */}
        <circle cx="12" cy="7" r="1" fill="#D4AF37"/>
        <circle cx="48" cy="7" r="1" fill="#D4AF37"/>
        <circle cx="12" cy="33" r="1" fill="#D4AF37"/>
        <circle cx="48" cy="33" r="1" fill="#D4AF37"/>

        {/* Page number */}
        <text x="30" y="27" textAnchor="middle"
              className="font-serif font-bold fill-amber-900"
              fontSize="16" filter="url(#pageNumGlow)">
          {number}
        </text>
      </svg>
    </div>
  );
}

// Wax seal decoration
export function WaxSeal({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 100 100">
      <defs>
        <radialGradient id="waxGrad">
          <stop offset="0%" stopColor="#DC2626"/>
          <stop offset="70%" stopColor="#B91C1C"/>
          <stop offset="100%" stopColor="#7F1D1D"/>
        </radialGradient>
      </defs>

      {/* Wax blob */}
      <circle cx="50" cy="50" r="40" fill="url(#waxGrad)" opacity="0.9"/>

      {/* Irregular edges */}
      <path d="M50,10 Q60,15 65,20 Q75,25 80,35 Q85,45 85,50 Q85,60 80,65 Q75,75 65,80 Q55,85 50,90 Q40,85 30,80 Q20,75 15,65 Q10,55 10,50 Q10,40 15,30 Q20,20 30,15 Q40,10 50,10"
            fill="url(#waxGrad)" opacity="0.7"/>

      {/* Seal impression - MAB monogram */}
      <text x="50" y="60" textAnchor="middle"
            className="font-serif font-bold fill-amber-100"
            fontSize="24">
        MAB
      </text>

      {/* Texture dots */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * 18) * Math.PI / 180;
        const r = 25 + Math.random() * 10;
        const x = 50 + r * Math.cos(angle);
        const y = 50 + r * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="0.5" fill="#000" opacity="0.2"/>;
      })}
    </svg>
  );
}

// Ribbon banner for titles
export function RibbonBanner({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg className="w-full h-20" viewBox="0 0 400 80" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626"/>
            <stop offset="50%" stopColor="#B91C1C"/>
            <stop offset="100%" stopColor="#991B1B"/>
          </linearGradient>
          <filter id="ribbonShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Main ribbon */}
        <path d="M50,15 L350,15 L370,40 L350,65 L50,65 L30,40 Z"
              fill="url(#ribbonGrad)"
              stroke="#7F1D1D"
              strokeWidth="2"
              filter="url(#ribbonShadow)"/>

        {/* Ribbon tails */}
        <path d="M50,15 L30,10 L20,40 L30,40 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1"/>
        <path d="M50,65 L30,70 L20,40 L30,40 Z" fill="#7F1D1D" stroke="#7F1D1D" strokeWidth="1"/>
        <path d="M350,15 L370,10 L380,40 L370,40 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1"/>
        <path d="M350,65 L370,70 L380,40 L370,40 Z" fill="#7F1D1D" stroke="#7F1D1D" strokeWidth="1"/>

        {/* Highlight */}
        <path d="M55,20 L345,20 L360,40 L345,60 L55,60"
              fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.4"/>

        {/* Text */}
        <text x="200" y="48" textAnchor="middle"
              className="font-serif font-bold fill-amber-50"
              fontSize="20">
          {text}
        </text>
      </svg>
    </div>
  );
}

// Scroll edge for pages
export function ScrollEdge({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <svg
      className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} w-8 h-full`}
      viewBox="0 0 30 400"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`scrollEdge-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={side === 'left' ? '#78350f' : '#D4AF37'}/>
          <stop offset="50%" stopColor="#B45309"/>
          <stop offset="100%" stopColor={side === 'left' ? '#D4AF37' : '#78350f'}/>
        </linearGradient>
      </defs>

      {/* Rolled edge */}
      <path
        d={side === 'left'
          ? "M0,0 Q10,0 15,5 L15,395 Q10,400 0,400 Z"
          : "M30,0 Q20,0 15,5 L15,395 Q20,400 30,400 Z"}
        fill={`url(#scrollEdge-${side})`}
      />

      {/* Shadow */}
      <path
        d={side === 'left'
          ? "M15,5 L15,395 L20,400 L20,0 Z"
          : "M15,5 L15,395 L10,400 L10,0 Z"}
        fill="#000"
        opacity="0.1"
      />
    </svg>
  );
}
