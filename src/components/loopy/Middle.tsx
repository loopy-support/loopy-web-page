import { sfx } from "@/lib/sound";
import { useEffect, useState, type CSSProperties } from "react";
import { Flame, Zap } from "lucide-react";
import { loopyHappy, loopySleepy, loopyWaving, screenAmigos, screenPerfil } from "@/lib/assets";
import { burstFrom } from "@/lib/confetti";
import { Eyebrow, H2, Lead, PhoneFrame, Reveal, Section, useInView } from "./primitives";

type H = "ok" | "warn" | "stop";
const HEALTH: Record<H, { label: string; reason: string; img: string; alt: string; filled: number; seg: string; soft: string; text: string }> = {
  ok: { label: "Al día", reason: "Al día con el ritmo", img: loopyHappy, alt: "Loopy feliz", filled: 7, seg: "bg-ok", soft: "bg-ok-soft", text: "text-ok-text" },
  warn: { label: "Sin rumbo", reason: "Faltó el check-in del lunes", img: loopyWaving, alt: "Loopy saludando", filled: 5, seg: "bg-warn", soft: "bg-warn-soft", text: "text-warn-text" },
  stop: { label: "Detenido", reason: "Sin check-ins desde el 12 oct", img: loopySleepy, alt: "Loopy con sueño", filled: 2, seg: "bg-stop", soft: "bg-stop-soft", text: "text-stop-text" },
};

export function Health() {
  const [h, setH] = useState<H>("ok");
  const [comeback, setComeback] = useState(false);
  const s = HEALTH[h];
  const pick = (n: H) => {
    if (h === "stop" && n === "ok") sfx.chime();
    else sfx.click();
    setComeback(h === "stop" && n === "ok");
    setH(n);
  };
  return (
    <Section className="bg-surface">
      <Reveal className="text-center">
        <Eyebrow>Salud del proyecto</Eyebrow>
        <H2>¿Cómo va? Lo sabes de un vistazo.</H2>
        <Lead className="mx-auto">La salud no es un porcentaje: es un estado y una frase que te dice por qué.</Lead>
      </Reveal>

      <Reveal delay={120} className="mx-auto mt-12 max-w-2xl">
        <div role="radiogroup" aria-label="Estado del proyecto" className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {(Object.keys(HEALTH) as H[]).map((k, i) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={h === k}
              onClick={() => pick(k)}
              className={`sticker press flex items-center gap-2 px-3.5 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base ${h === k ? "sticker-sun" : ""}`}
              style={{ "--rot": `${(i - 1) * 2}deg` } as CSSProperties}
            >
              <span className={`h-3 w-3 rounded-full ${HEALTH[k].seg}`} aria-hidden />
              {HEALTH[k].label}
            </button>
          ))}
        </div>

        <div className="relative mt-10 grid items-center gap-6 sm:grid-cols-[1fr_200px]">
          <div className={`card-loopy relative border-l-[10px] p-6 transition-colors ${s.soft}`} style={{ borderLeftColor: `var(--${h})` }}>
            <div className="flex items-center justify-between gap-3">
              <p className="display text-2xl">🏃 Correr 10K</p>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-peach text-lg font-extrabold text-sun-ink" aria-label="Integrante M">
                M
              </span>
            </div>
            <div className="mt-5 flex gap-1.5" aria-hidden>
              {Array.from({ length: 7 }, (_, i) => (
                <span key={i} className={`h-3 flex-1 rounded-full transition-colors ${i < s.filled ? s.seg : "bg-border"}`} />
              ))}
            </div>
            <p className={`mt-4 flex items-center gap-2 font-extrabold ${s.text}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${s.seg}`} aria-hidden />
              {s.label} · <span className="font-bold">{s.reason}</span>
            </p>
            {comeback && (
              <span
                className="sticker sticker-sun anim-pop absolute -top-5 right-4 px-3 py-1.5 text-sm"
                style={{ "--rot": "4deg" } as CSSProperties}
                role="status"
              >
                Detenido → Al día · Remontada +40 XP
              </span>
            )}
          </div>
          <img
            key={h}
            src={s.img}
            alt={s.alt}
            className={`anim-pop mx-auto w-[180px] ${h === "stop" ? "anim-breathe" : ""}`}
          />
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">Los días libres nunca cuentan como falta.</p>
      </Reveal>
    </Section>
  );
}

function useCount(target: number, go: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(target);
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, target]);
  return v;
}
const dots = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const REWARDS: [string, number][] = [
  ["Check-in a tiempo", 10],
  ["Semana al día", 50],
  ["Constante en equipo", 30],
  ["Remontada", 40],
  ["Hito cumplido", 100],
  ["Proyecto terminado", 300],
];

export function Rewards() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const streak = useCount(34, inView);
  const xp = useCount(3620, inView);
  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow>Recompensas</Eyebrow>
            <H2>Rachas justas. XP que nunca baja.</H2>
            <Lead>
              Solo cuentan los días que elegiste: un día libre nunca rompe tu racha. Y tu XP es tuyo: las recompensas salen de lo que haces,
              nunca de abrir la app.
            </Lead>
          </Reveal>
          <div ref={ref} className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="card-loopy p-4 sm:p-5">
              <p className="flex items-center gap-1.5 text-sm font-extrabold text-muted-foreground">
                <Flame size={16} aria-hidden /> Racha
              </p>
              <p className="display tnum mt-1 whitespace-nowrap text-3xl sm:text-5xl">{streak} días</p>
            </div>
            <div className="card-loopy p-4 sm:p-5">
              <p className="flex items-center gap-1.5 text-sm font-extrabold text-muted-foreground">
                <Zap size={16} aria-hidden /> Experiencia
              </p>
              <p className="display tnum mt-1 whitespace-nowrap text-3xl sm:text-5xl">{dots(xp)} XP</p>
            </div>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-5">
            {REWARDS.map(([n, x], i) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={(e) => {
                    burstFrom(e.currentTarget, 18);
                    sfx.pop();
                  }}
                  className={`sticker press wobble px-4 py-2 text-[15px] ${i % 3 === 1 ? "sticker-sun" : ""}`}
                  style={{ "--rot": `${[-4, 3, -2, 4, -3, 2][i]}deg` } as CSSProperties}
                >
                  {n} <span className="tnum">+{x}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Reveal delay={150}>
          <PhoneFrame src={screenPerfil} alt="Tarjeta de perfil de la app Loopy con racha de 34 días y 3.620 XP" tilt={3} />
        </Reveal>
      </div>
    </Section>
  );
}

export function Friends() {
  const [msg, setMsg] = useState(false);
  const [shake, setShake] = useState(0);
  return (
    <Section id="amigos" className="bg-paper">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="lg:order-2">
          <Eyebrow>Amigos</Eyebrow>
          <H2>Todo es mejor juntos.</H2>
          <Lead>Ve la racha de tus amigos y dense ánimo. Sin rankings ni competencia: tus amigos aparecen por nombre, no por puntos.</Lead>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              key={shake}
              type="button"
              onClick={() => {
                sfx.boing();
                setMsg(true);
                setShake((s) => s + 1);
              }}
              className={`sticker press bg-muted px-4 py-2 text-sm text-muted-foreground opacity-80 ${shake ? "anim-shake" : ""}`}
              style={{ "--rot": "-2deg", borderStyle: "dashed" } as CSSProperties}
            >
              Ordenar por puntos
            </button>
            <span role="status" className="min-h-[1.5em]">
              {msg && (
                <span className="sticker sticker-sun anim-pop inline-block px-3 py-1.5 text-sm" style={{ "--rot": "3deg" } as CSSProperties}>
                  Aquí nadie compite.
                </span>
              )}
            </span>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Tu perfil social está apagado hasta que tú lo actives.</p>
        </Reveal>
        <Reveal delay={120} className="lg:order-1">
          <PhoneFrame src={screenAmigos} alt="Pantalla Amigos de la app Loopy con las rachas de tus amigos" tilt={-3} />
        </Reveal>
      </div>
    </Section>
  );
}
