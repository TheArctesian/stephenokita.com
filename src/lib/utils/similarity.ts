/**
 * Visitor similarity — the "who are you most like?" engine behind the /meta
 * page. Given the current visitor's coarse traits and a population of other
 * visitors (sourced from PostHog persons), it ranks the nearest neighbours and
 * estimates how rare the visitor's combination of signals is.
 *
 * Pure logic only — no I/O. Feed it vectors built from PostHog event properties.
 */

export interface VisitorVector {
  browser: string | null;
  os: string | null;
  device: string | null;
  city: string | null;
  country: string | null;
  timezone: string | null;
  language: string | null;
  screen: string | null; // bucketed "1700×1000"
}

/** Per-signal weight — higher means more identifying. */
const WEIGHTS: Record<keyof VisitorVector, number> = {
  city: 3,
  timezone: 2,
  language: 1.5,
  country: 1.5,
  screen: 1.5,
  browser: 1,
  os: 1,
  device: 0.5,
};

const FEATURES = Object.keys(WEIGHTS) as (keyof VisitorVector)[];

/** Human label for each signal, used in the breakdown. */
export const SIGNAL_LABELS: Record<keyof VisitorVector, string> = {
  city: 'city',
  timezone: 'timezone',
  language: 'language',
  country: 'country',
  screen: 'screen size',
  browser: 'browser',
  os: 'OS',
  device: 'device',
};

/** Bucket raw screen dimensions to the nearest 100px so near-matches count. */
export function screenBucket(width: unknown, height: unknown): string | null {
  const w = Number(width);
  const h = Number(height);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
  const round = (n: number) => Math.round(n / 100) * 100;
  return `${round(w)}×${round(h)}`;
}

export interface PairScore {
  score: number; // 0..1, share of the visitor's identifying weight that matches
  matched: (keyof VisitorVector)[];
}

/** Score one neighbour against the visitor over their shared, present signals. */
export function scorePair(visitor: VisitorVector, other: VisitorVector): PairScore {
  let present = 0;
  let hit = 0;
  const matched: (keyof VisitorVector)[] = [];
  for (const f of FEATURES) {
    const v = visitor[f];
    if (v == null || v === '') continue; // only weigh signals the visitor has
    present += WEIGHTS[f];
    if (other[f] != null && other[f] === v) {
      hit += WEIGHTS[f];
      matched.push(f);
    }
  }
  return { score: present > 0 ? hit / present : 0, matched };
}

export interface Neighbour extends VisitorVector {
  score: number;
  matched: (keyof VisitorVector)[];
}

/** Rank the population by similarity to the visitor, best first. */
export function rankNeighbours(
  visitor: VisitorVector,
  population: VisitorVector[],
  k = 3,
): Neighbour[] {
  return population
    .map((p) => {
      const { score, matched } = scorePair(visitor, p);
      return { ...p, score, matched };
    })
    .filter((n) => n.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export interface SignalRarity {
  feature: keyof VisitorVector;
  label: string;
  value: string;
  sharedBy: number; // how many of the population share this value
}

export interface Rarity {
  populationSize: number;
  /** People who share the visitor's whole high-signal combination. */
  twinCount: number;
  /** "1 in oneInN" — population ÷ (twinCount + the visitor themselves). */
  oneInN: number;
  bits: number; // log2(oneInN)
  breakdown: SignalRarity[];
}

/** How distinctive is this visitor among the population? */
export function computeRarity(visitor: VisitorVector, population: VisitorVector[]): Rarity {
  const breakdown: SignalRarity[] = [];
  for (const f of FEATURES) {
    const v = visitor[f];
    if (v == null || v === '') continue;
    const sharedBy = population.filter((p) => p[f] === v).length;
    breakdown.push({ feature: f, label: SIGNAL_LABELS[f], value: v, sharedBy });
  }

  // Twins: share every signal the visitor exposes.
  const twinCount = population.filter((p) =>
    breakdown.every((b) => p[b.feature] === b.value),
  ).length;

  const populationSize = population.length;
  // +1 counts the visitor themselves, so a unique visitor reads "1 in N+1".
  const oneInN = (populationSize + 1) / (twinCount + 1);
  const bits = Math.log2(Math.max(oneInN, 1));

  // Most-identifying signals first.
  breakdown.sort((a, b) => a.sharedBy - b.sharedBy);

  return { populationSize, twinCount, oneInN, bits, breakdown };
}
