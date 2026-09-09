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
    title: 'Star',
    cssClass: 'bg-slate-900/80 hover:bg-slate-800',
    borderClass: 'border-slate-800',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    hotkey: '1',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-slate-300',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-sky-400">
      <g stroke="currentColor" stroke-width="4.5" stroke-linecap="round" fill="none">
        <line x1="50" y1="12" x2="50" y2="88"/>
        <line x1="17" y1="31" x2="83" y2="69"/>
        <line x1="17" y1="69" x2="83" y2="31"/>
        <polyline points="44,22 50,14 56,22"/>
        <polyline points="44,78 50,86 56,78"/>
        <polyline points="24,28 18,32 24,40"/>
        <polyline points="76,60 82,68 76,72"/>
        <polyline points="24,60 18,68 24,72"/>
        <polyline points="76,28 82,32 76,40"/>
      </g>
      <circle cx="50" cy="50" r="7" fill="currentColor"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-sky-300">
      <g stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="15" y1="30" x2="85" y2="70"/>
        <line x1="15" y1="70" x2="85" y2="30"/>
        <polyline points="43,20 50,12 57,20"/>
        <polyline points="43,80 50,88 57,80"/>
        <polyline points="23,27 17,31 23,39"/>
        <polyline points="77,61 83,69 77,73"/>
        <polyline points="23,61 17,69 23,73"/>
        <polyline points="77,27 83,31 77,39"/>
      </g>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>`
  },
  flower: {
    id: 'flower',
    title: 'Flower',
    cssClass: 'bg-slate-900/80 hover:bg-slate-800',
    borderClass: 'border-slate-800',
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.4)',
    hotkey: '2',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-slate-300',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-indigo-400">
      <g stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none">
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
      <circle cx="50" cy="50" r="9" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-indigo-300">
      <g stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none">
        <line x1="50" y1="14" x2="50" y2="86"/>
        <line x1="19" y1="32" x2="81" y2="68"/>
        <line x1="19" y1="68" x2="81" y2="32"/>
      </g>
      <circle cx="50" cy="14" r="6" fill="currentColor"/>
      <circle cx="50" cy="86" r="6" fill="currentColor"/>
      <circle cx="19" cy="32" r="6" fill="currentColor"/>
      <circle cx="81" cy="68" r="6" fill="currentColor"/>
      <circle cx="19" cy="68" r="6" fill="currentColor"/>
      <circle cx="81" cy="32" r="6" fill="currentColor"/>
      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`
  },
  needle: {
    id: 'needle',
    title: 'Needle',
    cssClass: 'bg-slate-900/80 hover:bg-slate-800',
    borderClass: 'border-slate-800',
    color: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    hotkey: '3',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-slate-300',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-emerald-400">
      <g stroke="currentColor" stroke-width="4.5" stroke-linecap="round" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="18" y1="50" x2="82" y2="50"/>
        <polyline points="41,22 50,12 59,22"/>
        <polyline points="41,78 50,88 59,78"/>
        <polyline points="28,41 18,50 28,59"/>
        <polyline points="72,41 82,50 72,59"/>
        <polyline points="43,38 50,30 57,38"/>
        <polyline points="43,62 50,70 57,62"/>
      </g>
      <polygon points="50,42 58,50 50,58 42,50" fill="currentColor"/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-emerald-300">
      <g stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none">
        <line x1="50" y1="10" x2="50" y2="90"/>
        <line x1="18" y1="50" x2="82" y2="50"/>
        <polyline points="41,22 50,12 59,22"/>
        <polyline points="41,78 50,88 59,78"/>
        <polyline points="28,41 18,50 28,59"/>
        <polyline points="72,41 82,50 72,59"/>
        <polyline points="43,38 50,30 57,38"/>
        <polyline points="43,62 50,70 57,62"/>
      </g>
      <polygon points="50,42 58,50 50,58 42,50" fill="currentColor"/>
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