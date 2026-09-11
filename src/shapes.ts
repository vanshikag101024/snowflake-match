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
    title: '3-Point Flake',
    cssClass: 'bg-white hover:bg-sky-50',
    borderClass: 'border-sky-600',
    color: '#0284c7',
    glowColor: '#0284c7',
    hotkey: '1',
    badgeBg: 'bg-sky-600',
    badgeText: 'text-white',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-sky-600">
      <path fill="currentColor" d="
        M44 44 h12 v12 h-12 z
        M44 14 h12 v30 h-12 z
        M40 8 h20 v6 h-20 z
        M18 64 h28 v12 h-28 z
        M10 72 h12 v16 h-12 z
        M54 64 h28 v12 h-28 z
        M78 72 h12 v16 h-12 z
      "/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-slate-900">
      <path fill="#0f172a" d="
        M44 44 h12 v12 h-12 z
        M44 14 h12 v30 h-12 z
        M40 8 h20 v6 h-20 z
        M18 64 h28 v12 h-28 z
        M10 72 h12 v16 h-12 z
        M54 64 h28 v12 h-28 z
        M78 72 h12 v16 h-12 z
      "/>
    </svg>`
  },
  flower: {
    id: 'flower',
    title: '4-Point Flake',
    cssClass: 'bg-white hover:bg-purple-50',
    borderClass: 'border-purple-600',
    color: '#9333ea',
    glowColor: '#9333ea',
    hotkey: '2',
    badgeBg: 'bg-purple-600',
    badgeText: 'text-white',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-purple-600">
      <path fill="currentColor" d="
        M44 44 h12 v12 h-12 z
        M44 10 h12 v34 h-12 z
        M40 6 h20 v4 h-20 z
        M44 56 h12 v34 h-12 z
        M40 90 h20 v4 h-20 z
        M10 44 h34 v12 h-34 z
        M6 40 h4 v20 h-4 z
        M56 44 h34 v12 h-34 z
        M90 40 h4 v20 h-4 z
      "/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-slate-900">
      <path fill="#0f172a" d="
        M44 44 h12 v12 h-12 z
        M44 10 h12 v34 h-12 z
        M40 6 h20 v4 h-20 z
        M44 56 h12 v34 h-12 z
        M40 90 h20 v4 h-20 z
        M10 44 h34 v12 h-34 z
        M6 40 h4 v20 h-4 z
        M56 44 h34 v12 h-34 z
        M90 40 h4 v20 h-4 z
      "/>
    </svg>`
  },
  needle: {
    id: 'needle',
    title: '5-Point Flake',
    cssClass: 'bg-white hover:bg-emerald-50',
    borderClass: 'border-emerald-600',
    color: '#059669',
    glowColor: '#059669',
    hotkey: '3',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    gemSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-emerald-600">
      <path fill="currentColor" d="
        M44 44 h12 v12 h-12 z
        M44 10 h12 v34 h-12 z
        M40 6 h20 v4 h-20 z
        M14 30 h30 v12 h-30 z
        M8 26 h6 v20 h-6 z
        M56 30 h30 v12 h-30 z
        M86 26 h6 v20 h-6 z
        M20 70 h24 v12 h-24 z
        M12 78 h8 v12 h-8 z
        M56 70 h24 v12 h-24 z
        M80 78 h8 v12 h-8 z
      "/>
    </svg>`,
    svg: '',
    fallingSvg: `<svg viewBox="0 0 100 100" class="w-full h-full text-slate-900">
      <path fill="#0f172a" d="
        M44 44 h12 v12 h-12 z
        M44 10 h12 v34 h-12 z
        M40 6 h20 v4 h-20 z
        M14 30 h30 v12 h-30 z
        M8 26 h6 v20 h-6 z
        M56 30 h30 v12 h-30 z
        M86 26 h6 v20 h-6 z
        M20 70 h24 v12 h-24 z
        M12 78 h8 v12 h-8 z
        M56 70 h24 v12 h-24 z
        M80 78 h8 v12 h-8 z
      "/>
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