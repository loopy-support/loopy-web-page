// Tiny synthesized sounds (Web Audio, no files). Only played from user actions.
let ctx: AudioContext | null = null;
const KEY = "loopy-sound";

export function soundOn() {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}
export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable */
  }
}

function ac() {
  if (typeof window === "undefined" || !soundOn()) return null;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, dur: number, opts: { type?: OscillatorType; to?: number; delay?: number; vol?: number } = {}) {
  const a = ac();
  if (!a) return;
  const t = a.currentTime + (opts.delay ?? 0);
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = opts.type ?? "sine";
  o.frequency.setValueAtTime(freq, t);
  if (opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.vol ?? 0.18, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export const sfx = {
  click: () => tone(660, 0.06, { type: "triangle", vol: 0.12 }),
  tick: () => tone(1200, 0.04, { type: "square", vol: 0.05 }),
  pop: () => tone(420, 0.12, { to: 900, vol: 0.2 }),
  whoosh: () => tone(900, 0.22, { type: "triangle", to: 180, vol: 0.1 }),
  boing: () => tone(220, 0.35, { type: "triangle", to: 110, vol: 0.18 }),
  chime: () => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.25, { type: "triangle", delay: i * 0.08, vol: 0.14 }));
  },
};
