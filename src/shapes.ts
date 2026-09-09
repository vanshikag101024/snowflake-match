import { ShapeType, CrystalDefinition } from './types';

export interface EnhancedCrystalDef extends CrystalDefinition {
  gemSvg: string;
  fallingSvg: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
}

export const CRYSTAL_DEFINITIONS: Record<ShapeType, EnhancedCrystalDef> = {
  star: {
    id: 'star',
    title: 'Star Gem',
    cssClass: 'from-sky-500 via-blue-600 to-indigo-700',
    borderClass: 'border-sky-300',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.75)',
    hotkey: '1',
    badgeBg: 'bg-cyan-100',
    badgeText: 'text-sky-950',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="starGemFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#0284c7" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#0369a1" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 92,26 80,90 20,90 8,26" fill="url(#starGemFacet)" stroke="#e0f2fe" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,14 84,30 74,82 26,82 16,30" fill="none" stroke="#bae6fd" stroke-width="1.2" stroke-opacity="0.6"/>
      <g stroke="#ffffff" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="26" x2="50" y2="74"/>
        <line x1="26" y1="38" x2="74" y2="62"/>
        <line x1="26" y1="62" x2="74" y2="38"/>
      </g>
      <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round">
        <polyline points="44,32 50,26 56,32" fill="none"/>
        <polyline points="44,68 50,74 56,68" fill="none"/>
        <polyline points="32,36 26,38 30,44" fill="none"/>
        <polyline points="68,64 74,62 70,56" fill="none"/>
        <polyline points="30,56 26,62 32,64" fill="none"/>
        <polyline points="70,44 74,38 68,36" fill="none"/>
      </g>
      <polygon points="50,42 58,50 50,58 42,50" fill="#ffffff"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl">
      <defs>
        <filter id="starIceGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffffff" flood-opacity="0.85"/>
        </filter>
      </defs>
      <g filter="url(#starIceGlow)">
        <circle cx="50" cy="50" r="46" fill="#ffffff" fill-opacity="0.08"/>
        <g stroke="#ffffff" stroke-width="4.5" stroke-linecap="round">
          <line x1="50" y1="8" x2="50" y2="92"/>
          <line x1="14" y1="29" x2="86" y2="71"/>
          <line x1="14" y1="71" x2="86" y2="29"/>
        </g>
        <g stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none">
          <polyline points="42,18 50,10 58,18"/>
          <polyline points="42,82 50,90 58,82"/>
          <polyline points="22,25 15,30 20,37"/>
          <polyline points="78,75 85,70 80,63"/>
          <polyline points="20,63 15,70 22,75"/>
          <polyline points="80,37 85,30 78,25"/>
          <polyline points="44,28 50,22 56,28"/>
          <polyline points="44,72 50,78 56,72"/>
          <polyline points="30,35 25,39 29,45"/>
          <polyline points="70,65 75,61 71,55"/>
          <polyline points="29,55 25,61 30,65"/>
          <polyline points="71,45 75,39 70,35"/>
        </g>
        <circle cx="50" cy="50" r="13" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <polygon points="50,42 58,50 50,58 42,50" fill="#ffffff"/>
      </g>
    </svg>`
  },
  flower: {
    id: 'flower',
    title: 'Flower Gem',
    cssClass: 'from-fuchsia-500 via-purple-600 to-indigo-700',
    borderClass: 'border-fuchsia-300',
    color: '#d946ef',
    glowColor: 'rgba(217, 70, 239, 0.75)',
    hotkey: '2',
    badgeBg: 'bg-fuchsia-100',
    badgeText: 'text-purple-950',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="flowerGemFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e879f9" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#c026d3" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#9333ea" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 88,28 88,72 50,94 12,72 12,28" fill="url(#flowerGemFacet)" stroke="#fae8ff" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,14 80,32 80,68 50,86 20,68 20,32" fill="none" stroke="#f5d0fe" stroke-width="1.2" stroke-opacity="0.6"/>
      <g stroke="#ffffff" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="26" x2="50" y2="74"/>
        <line x1="26" y1="36" x2="74" y2="64"/>
        <line x1="26" y1="64" x2="74" y2="36"/>
      </g>
      <circle cx="50" cy="24" r="5" fill="#ffffff"/>
      <circle cx="50" cy="76" r="5" fill="#ffffff"/>
      <circle cx="24" cy="35" r="5" fill="#ffffff"/>
      <circle cx="76" cy="65" r="5" fill="#ffffff"/>
      <circle cx="24" cy="65" r="5" fill="#ffffff"/>
    <circle cx="76" cy="35" r="5" fill="#ffffff"/>
      <circle cx="50" cy="50" r="9" fill="#ffffff"/>
      <circle cx="50" cy="50" r="4.5" fill="#c026d3"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl">
      <defs>
        <filter id="flowerIceGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffffff" flood-opacity="0.85"/>
        </filter>
      </defs>
      <g filter="url(#flowerIceGlow)">
        <circle cx="50" cy="50" r="46" fill="#ffffff" fill-opacity="0.08"/>
        <g stroke="#ffffff" stroke-width="4" stroke-linecap="round">
          <line x1="50" y1="12" x2="50" y2="88"/>
          <line x1="17" y1="31" x2="83" y2="69"/>
          <line x1="17" y1="69" x2="83" y2="31"/>
        </g>
        <circle cx="50" cy="12" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="50" cy="88" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="17" cy="31" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="83" cy="69" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="17" cy="69" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="83" cy="31" r="7" fill="#ffffff" stroke="#ffffff" stroke-width="1.8"/>
        <circle cx="50" cy="30" r="4.5" fill="#ffffff"/>
        <circle cx="50" cy="70" r="4.5" fill="#ffffff"/>
        <circle cx="33" cy="40" r="4.5" fill="#ffffff"/>
        <circle cx="67" cy="60" r="4.5" fill="#ffffff"/>
        <circle cx="33" cy="60" r="4.5" fill="#ffffff"/>
        <circle cx="67" cy="40" r="4.5" fill="#ffffff"/>
        <circle cx="50" cy="50" r="14" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <circle cx="50" cy="50" r="6" fill="#ffffff"/>
      </g>
    </svg>`
  },
  needle: {
    id: 'needle',
    title: 'Needle Gem',
    cssClass: 'from-emerald-400 via-teal-500 to-emerald-700',
    borderClass: 'border-emerald-300',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.75)',
    hotkey: '3',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-950',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="needleGemFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34d399" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#059669" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#047857" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <polygon points="50,6 88,32 72,94 28,94 12,32" fill="url(#needleGemFacet)" stroke="#d1fae5" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,14 78,36 66,86 34,86 22,36" fill="none" stroke="#a7f3d0" stroke-width="1.2" stroke-opacity="0.6"/>
      <g stroke="#ffffff" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="20" x2="50" y2="80"/>
        <line x1="28" y1="50" x2="72" y2="50"/>
      </g>
      <g stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none">
        <polyline points="44,28 50,20 56,28"/>
        <polyline points="44,72 50,80 56,72"/>
        <polyline points="36,44 28,50 36,56"/>
        <polyline points="64,44 72,50 64,56"/>
        <polyline points="42,42 50,34 58,42"/>
        <polyline points="42,58 50,66 58,58"/>
      </g>
      <polygon points="50,44 56,50 50,56 44,50" fill="#ffffff"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-xl">
      <defs>
        <filter id="needleIceGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffffff" flood-opacity="0.85"/>
        </filter>
      </defs>
      <g filter="url(#needleIceGlow)">
        <circle cx="50" cy="50" r="46" fill="#ffffff" fill-opacity="0.08"/>
        <g stroke="#ffffff" stroke-width="4.5" stroke-linecap="round">
          <line x1="50" y1="8" x2="50" y2="92"/>
          <line x1="18" y1="50" x2="82" y2="50"/>
        </g>
        <g stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none">
          <polyline points="40,20 50,8 60,20"/>
          <polyline points="40,80 50,92 60,80"/>
          <polyline points="30,40 18,50 30,60"/>
          <polyline points="70,40 82,50 70,60"/>
          <polyline points="42,32 50,24 58,32"/>
          <polyline points="42,68 50,76 58,68"/>
          <polyline points="38,42 30,50 38,58"/>
          <polyline points="62,42 70,50 62,58"/>
          <polyline points="44,40 50,34 56,40"/>
          <polyline points="44,60 50,66 56,60"/>
        </g>
        <polygon points="50,38 62,50 50,62 38,50" fill="none" stroke="#ffffff" stroke-width="2.5"/>
        <polygon points="50,44 56,50 50,56 44,50" fill="#ffffff"/>
      </g>
    </svg>`
  }
  };

CRYSTAL_DEFINITIONS.star.svg = CRYSTAL_DEFINITIONS.star.gemSvg;
CRYSTAL_DEFINITIONS.flower.svg = CRYSTAL_DEFINITIONS.flower.gemSvg;
CRYSTAL_DEFINITIONS.needle.svg = CRYSTAL_DEFINITIONS.needle.gemSvg;

export const SHAPE_KEYS: ShapeType[] = ['star', 'flower', 'needle'];

export function shuffleSlots(currentOrder: ShapeType[]): ShapeType[] {
  const available = [...currentOrder];
  let shuffled: ShapeType[];
  let attempts = 0;
  do {
    shuffled = [...available].sort(() => Math.random() - 0.5);
    attempts++;
  } while (shuffled.every((val, idx) => val === currentOrder[idx]) && attempts < 10);
  return shuffled;
  }