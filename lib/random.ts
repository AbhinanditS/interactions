export type SeedInput = number | string;
export type RandomSource = () => number;

function hashSeed(seed: SeedInput): number {
  const seedText = String(seed);
  let h = 1779033703 ^ seedText.length;

  for (let i = 0; i < seedText.length; i += 1) {
    h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }

  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  h ^= h >>> 16;

  return h >>> 0;
}

export function createSeededRandom(seed: SeedInput): RandomSource {
  let state = hashSeed(seed);

  return () => {
    // Mulberry32-style 32-bit PRNG: fast, deterministic, and suitable for mock data generation.
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
