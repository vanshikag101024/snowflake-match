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
    title: 'Nexus Star',
    cssClass: 'bg-slate-900 hover:bg-slate-800',
    borderClass: 'border-sky-500',
    color: '#0284c7',
    glowColor: '#0284c7',
    hotkey: '1',
    badgeBg: 'bg-sky-500',
    badgeText: 'text-white',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-sky-400">
      <g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="15" y1="30" x2="85" y2="70"/>
        <line x1="15" y1="70" x2="85" y2="30"/>
        <polyline points="44,22 50,14 56,22"/>
        <polyline points="44,78 50,86 56,78"/>
        <polygon points="50,40 60,50 50,60 40,50" fill="#0284c7"/>
      </g>
      <circle cx="50" cy="50" r="7" fill="#38bdf8"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-white">
      <g stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="15" y1="30" x2="85" y2="70"/>
        <line x1="15" y1="70" x2="85" y2="30"/>
        <polyline points="43,20 50,12 57,20"/>
        <polyline points="43,80 50,88 57,80"/>
        <polygon points="50,38 62,50 50,62 38,50" fill="#ffffff" fill-opacity="0.6"/>
      </g>
      <circle cx="50" cy="50" r="8" fill="#ffffff"/>
    </svg>`
  },
  flower: {
    id: 'flower',
    title: 'Frost Blossom',
    cssClass: 'bg-slate-900 hover:bg-slate-800',
    borderClass: 'border-purple-500',
    color: '#a855f7',
    glowColor: '#a855f7',
    hotkey: '2',
    badgeBg: 'bg-purple-500',
    badgeText: 'text-white',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-purple-400">
      <g stroke="currentColor" stroke-width="4.5" stroke-linecap="round" fill="none">
        <line x1="50" y1="16" x2="50" y2="84"/>
        <line x1="21" y1="33" x2="79" y2="67"/>
        <line x1="21" y1="67" x2="79" y2="33"/>
      </g>
      <circle cx="50" cy="16" r="6" fill="currentColor"/>
      <circle cx="50" cy="84" r="6" fill="currentColor"/>
      <circle cx="21" cy="33" r="6" fill="currentColor"/>
      <circle cx="79" cy="67" r="6" fill="currentColor"/>
      <circle cx="21" cy="67" r="6" fill="currentColor"/>
      <circle cx="79" cy="33" r="6" fill="currentColor"/>
      <circle cx="50" cy="50" r="14" fill="#c084fc" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-white">
      <g stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none">
        <line x1="50" y1="14" x2="50" y2="86"/>
        <line x1="19" y1="32" x2="81" y2="68"/>
        <line x1="19" y1="68" x2="81" y2="32"/>
      </g>
      <circle cx="50" cy="14" r="6" fill="#ffffff"/>
      <circle cx="50" cy="86" r="6" fill="#ffffff"/>
      <circle cx="19" cy="32" r="6" fill="#ffffff"/>
      <circle cx="81" cy="68" r="6" fill="#ffffff"/>
      <circle cx="19" cy="68" r="6" fill="#ffffff"/>
      <circle cx="81" cy="32" r="6" fill="#ffffff"/>
      <circle cx="50" cy="50" r="15" fill="#ffffff" fill-opacity="0.6" stroke="#ffffff" stroke-width="3"/>
    </svg>`
  },
  needle: {
    id: 'needle',
    title: 'Crystal Prism',
    cssClass: 'bg-slate-900 hover:bg-slate-800',
    borderClass: 'border-emerald-500',
    color: '#10b981',
    glowColor: '#10b981',
    hotkey: '3',
    badgeBg: 'bg-emerald-500',
    badgeText: 'text-white',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-emerald-400">
      <g stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="18" y1="50" x2="82" y2="50"/>
        <polyline points="41,22 50,12 59,22"/>
        <polyline points="41,78 50,88 59,78"/>
        <polyline points="28,41 18,50 28,59"/>
        <polyline points="72,41 82,50 72,59"/>
      </g>
      <polygon points="50,34 66,50 50,66 34,50" fill="#059669" stroke="currentColor" stroke-width="2"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-white">
      <g stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="18" y1="50" x2="82" y2="50"/>
        <polyline points="41,22 50,12 59,22"/>
        <polyline points="41,78 50,88 59,78"/>
        <polyline points="28,41 18,50 28,59"/>
        <polyline points="72,41 82,50 72,59"/>
      </g>
      <polygon points="50,34 66,50 50,66 34,50" fill="#ffffff" fill-opacity="0.6" stroke="#ffffff" stroke-width="2"/>
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