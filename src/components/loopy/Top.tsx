import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Flame } from "lucide-react";
import { loopyWaving, screenHoy } from "@/lib/assets";
import { reducedMotion } from "@/lib/confetti";
import { Eyebrow, H2, PhoneFrame, Reveal, Section, StoreCTA } from "./primitives";

export function Hero() {
  const floats: { label: React.ReactNode; cls: string; rot: number; delay: string; yellow?: boolean }[] = [
    { label: "¿Cómo vas hoy?", cls: "left-0 top-[8%] sm:-left-8", rot: -5, delay: "0s" },
    { label: "+10 XP", cls: "right-0 top-[4%] sm:-right-4", rot: 6, delay: "1.2s", yellow: true },
    {
      label: (
        <>
          <span className="h-2.5 w-2.5 rounded-full bg-ok" aria-hidden /> Al día
        </>
      ),
      cls: "-left-2 top-[52%] sm:-left-14",
      rot: 3,
      delay: "2s",
    },
    {
      label: (
        <>
          <Flame size={16} strokeWidth={2.5} aria-hidden /> Racha de 7 días
        </>
      ),
      cls: "right-0 top-[44%] sm:-right-12",
      rot: -3,
      delay: "0.6s",
      yellow: true,
    },
    { label: "Hoy te toca check-in", cls: "left-[12%] bottom-[2%]", rot: 2, delay: "1.6s" },
  ];
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-10 pb-20 sm:px-6 sm:pt-16 sm:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <Eyebrow>Para tus proyectos, solo o en equipo</Eyebrow>
          <h1 className="display mt-6 text-5xl text-balance sm:text-6xl lg:text-7xl">¡Que ningún proyecto se detenga!</h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground sm:text-xl">
            Loopy te pregunta cómo vas los días que tú eliges. Una línea al día, un loop a la vez.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <StoreCTA />
            <a href="#como-funciona" className="rounded-xl px-1 text-base font-extrabold underline decoration-[3px] underline-offset-[6px] decoration-sun">
              Mira cómo funciona ↓
            </a>
          </div>
          <p className="mt-6 text-sm font-semibold text-muted-foreground">Para iPhone · En español · Tus proyectos solos son gratis</p>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-[460px] py-6">
          <div aria-hidden className="blob absolute inset-x-2 inset-y-8 sm:-inset-x-6" />
          <img
            src={loopyWaving}
            alt="Loopy saludando"
            width={1600}
            height={1371}
            className="anim-bob absolute -top-2 left-1/2 z-0 w-[150px] -translate-x-[95%] sm:w-[180px]"
          />
          <div className="relative z-10 pt-16">
            <PhoneFrame src={screenHoy} alt="Pantalla Hoy de la app Loopy con la tarjeta ¿Cómo vas hoy?" tilt={4} />
          </div>
          {floats.map((f, i) => (
            <span
              key={i}
              className={`anim-drift absolute z-20 ${f.cls}`}
              style={{ "--delay": f.delay } as CSSProperties}
            >
              <span
                className={`sticker wobble inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm ${f.yellow ? "sticker-sun" : ""}`}
                style={{ "--rot": `${f.rot}deg` } as CSSProperties}
              >
                {f.label}
              </span>
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const CHIPS = ["📚 Tesis · Capítulo 3", "🏃 Correr 10K", "🌱 Huerto en balcones", "🎸 Aprender guitarra", "🎙️ Podcast Sobremesa"];
const TINTS = ["bg-lavender", "bg-peach", "bg-mint", "bg-pink", "bg-lime"];

export function Ticker() {
  const row = [...CHIPS, ...CHIPS];
  return (
    <section aria-label="Proyectos de ejemplo" className="overflow-hidden border-y border-border bg-surface py-10">
      <p className="mb-6 text-center text-sm font-extrabold text-muted-foreground">¿Tus metas se quedan a medias?</p>
      <div className="relative">
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-rope" />
        <ul className="anim-marquee relative flex w-max gap-10 px-5 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          {row.map((c, i) => (
            <li
              key={i}
              aria-hidden={i >= CHIPS.length}
              className={`sticker shrink-0 whitespace-nowrap px-5 py-2.5 text-base text-sun-ink ${TINTS[i % TINTS.length]} ${i >= CHIPS.length ? "motion-reduce:hidden" : ""}`}
              style={{ "--rot": `${i % 2 ? 2 : -2}deg` } as CSSProperties}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  ["Elige tu rumbo y tu ritmo", "Ponle nombre, elige qué días le das y, si quieres, una fecha de entrega. Son tres preguntas."],
  ["Un check-in rápido", "Esos días Loopy te pregunta cómo va. Escribes una línea o le pides una pregunta."],
  ["Tu racha crece", "Cada check-in suma una casilla a tu camino, +10 XP y un día más de racha."],
];

export function Steps() {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return setP(1);
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <Section id="como-funciona">
      <Reveal className="text-center">
        <Eyebrow>Cómo funciona</Eyebrow>
        <H2>Tres pasos. Un loop a la vez.</H2>
      </Reveal>
      <ol ref={ref} className="relative mx-auto mt-16 flex max-w-3xl flex-col gap-14">
        {STEPS.map(([t, b], i) => {
          const lit = p * (STEPS.length - 1) >= i - 0.02;
          return (
            <li key={t} className="relative flex gap-6 sm:gap-10">
              {i < STEPS.length - 1 && (
                <div aria-hidden className="absolute top-16 left-0 w-16" style={{ height: "calc(100% - 0.5rem)" }}>
                <svg
                  className="block h-full w-full overflow-visible"
                  viewBox="0 0 64 100"
                  preserveAspectRatio="none"
                  style={{ clipPath: `inset(-4px -4px ${(1 - Math.min(1, Math.max(0, p * (STEPS.length - 1) - i))) * 100}% -4px)` }}
                >
                  <path
                    d={i % 2 ? "M32 0 C 64 30, 0 70, 32 100" : "M32 0 C 0 30, 64 70, 32 100"}
                    fill="none"
                    stroke="var(--rope)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                </div>
              )}
              <span
                className={`sticker relative z-10 grid h-16 w-16 shrink-0 place-items-center text-2xl tnum transition-colors ${lit ? "sticker-sun anim-pop" : ""}`}
                style={{ "--rot": `${i % 2 ? 4 : -4}deg` } as CSSProperties}
              >
                {i + 1}
              </span>
              <Reveal delay={i * 120} className="card-loopy flex-1 p-6 sm:p-8">
                <h3 className="display text-2xl sm:text-3xl">{t}</h3>
                <p className="mt-2 text-lg text-muted-foreground">{b}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
