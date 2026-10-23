import { sfx } from "@/lib/sound";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { loopyCheering, loopyHappy, screenHoy } from "@/lib/assets";
import { burstFrom } from "@/lib/confetti";
import { Eyebrow, H2, Lead, PhoneFrame, Reveal, Section } from "./primitives";

const QUESTIONS = [
  "¿Cuál es el siguiente paso más pequeño que puedes dar?",
  "Si mañana tuvieras media hora para el proyecto, ¿en qué la usarías?",
  "¿Por qué te importa este proyecto?",
  "¿Qué salió mejor de lo que esperabas esta semana?",
  "¿En qué te vendría bien una mano?",
];

type Mode = "idle" | "write" | "ask" | "done";
const THRESHOLD = 100;

export function HoyDemo() {
  const [mode, setMode] = useState<Mode>("idle");
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [fly, setFly] = useState<0 | 1 | -1>(0);
  const [thinking, setThinking] = useState(false);
  const [q, setQ] = useState(0);
  const [line, setLine] = useState("Terminé la introducción");
  const [answer, setAnswer] = useState("");
  const startX = useRef<number | null>(null);
  const celebRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const think = () => {
    setThinking(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setThinking(false), 900);
  };

  const commit = (dir: 1 | -1) => {
    sfx.whoosh();
    setFly(dir);
    window.setTimeout(() => {
      setFly(0);
      setDx(0);
      setMode(dir > 0 ? "write" : "ask");
      if (dir < 0) think();
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }, 280);
  };

  const finish = () => {
    setMode("done");
    sfx.chime();
    window.setTimeout(() => burstFrom(celebRef.current, 50), 60);
  };

  const reset = () => {
    sfx.click();
    setMode("idle");
    setLine("Terminé la introducción");
    setAnswer("");
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (mode !== "idle") return;
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    setDx(e.clientX - startX.current);
  };
  const onUp = () => {
    if (startX.current === null) return;
    startX.current = null;
    setDragging(false);
    if (dx > THRESHOLD) commit(1);
    else if (dx < -THRESHOLD) commit(-1);
    else {
      if (Math.abs(dx) > 20) sfx.boing();
      setDx(0);
    }
  };

  const transform = fly
    ? `translateX(${fly * 130}%) rotate(${fly * 22}deg)`
    : `translateX(${dx}px) rotate(${dx / 16 - 3}deg)`;
  const ask = mode === "ask";

  return (
    <Section id="hoy" className="bg-paper">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>La tarjeta del día</Eyebrow>
          <H2>Desliza y listo.</H2>
          <Lead>
            La app abre en Hoy. Desliza a la derecha para contar lo que avanzaste, o a la izquierda y Loopy te hace una pregunta. Toca la
            tarjeta y entras al proyecto.
          </Lead>
          <div className="mt-10 hidden lg:block">
            <PhoneFrame src={screenHoy} alt="Pantalla Hoy de la app Loopy con la tarjeta ¿Cómo vas hoy?" tilt={-3} />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto max-w-[400px] pt-14" aria-live="polite">
            <div aria-hidden className="absolute inset-x-6 top-20 h-[300px] rotate-[5deg] rounded-[28px] bg-peach shadow-[var(--shadow-card)]" />
            <div
              role="group"
              aria-label="Tarjeta de demostración: arrástrala o usa los botones"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              className={`relative min-h-[320px] touch-pan-y select-none rounded-[28px] border-[2.5px] border-sticker-ink p-6 text-sun-ink shadow-[0_4px_0_var(--sticker-ink)] ${
                ask ? "bg-sun" : "bg-lavender"
              } ${mode === "idle" ? "cursor-grab active:cursor-grabbing" : ""}`}
              style={{
                transform,
                transition: dragging ? "none" : "transform .45s var(--spring), background-color .3s",
              }}
            >
              {ask && (
                <img
                  src={loopyHappy}
                  alt="Loopy feliz asomándose"
                  className="anim-pop pointer-events-none absolute -top-[86px] right-6 w-[120px]"
                />
              )}
              <span className="inline-block rounded-full bg-sticker px-3 py-1 text-sm font-extrabold">📚 Tesis de magíster</span>

              {mode === "idle" && (
                <>
                  <p className="mt-6 text-sm font-bold opacity-75">Hoy te toca check-in</p>
                  <p className="display mt-1 text-5xl">¿Cómo vas hoy?</p>
                  <p className="mt-10 text-sm font-bold opacity-70">Arrástrala a un lado →</p>
                </>
              )}

              {mode === "write" && (
                <form
                  className="mt-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    finish();
                  }}
                >
                  <label htmlFor="demo-line" className="display block text-4xl">
                    ¿Qué avanzaste?
                  </label>
                  <input
                    id="demo-line"
                    ref={inputRef}
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                    placeholder="Cuéntalo en una línea…"
                    className="mt-5 w-full rounded-[20px] border-2 border-sticker-ink bg-sticker px-4 py-3 text-base font-semibold placeholder:text-sun-ink/60"
                  />
                  <button type="submit" className="sticker sticker-ink press mt-4 px-6 py-2.5">
                    Avancé
                  </button>
                </form>
              )}

              {mode === "ask" && (
                <div className="mt-6">
                  {thinking ? (
                    <p className="display text-3xl">Pensando una pregunta…</p>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        finish();
                      }}
                    >
                      <p className="display text-2xl sm:text-3xl">{QUESTIONS[q]}</p>
                      <button
                        type="button"
                        className="sticker press mt-4 px-4 py-1.5 text-sm"
                        style={{ "--rot": "-2deg" } as CSSProperties}
                        onClick={() => {
                          sfx.click();
                          setQ((q + 1) % QUESTIONS.length);
                          think();
                        }}
                      >
                        Otra pregunta
                      </button>
                      <label htmlFor="demo-answer" className="mt-5 block text-sm font-extrabold">
                        Tu respuesta
                      </label>
                      <input
                        id="demo-answer"
                        ref={inputRef}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="mt-1 w-full rounded-[20px] border-2 border-sticker-ink bg-sticker px-4 py-3 text-base font-semibold"
                      />
                      <button type="submit" className="sticker sticker-ink press mt-4 px-6 py-2.5">
                        Guardar
                      </button>
                    </form>
                  )}
                </div>
              )}

              {mode === "done" && (
                <div ref={celebRef} className="on-sun anim-pop absolute inset-0 flex flex-col items-center justify-center rounded-[26px] p-6 text-center">
                  <img src={loopyCheering} alt="Loopy celebrando con los brazos arriba" className="w-[150px]" />
                  <p className="mt-1 text-lg font-extrabold">Check-in listo</p>
                  <p className="display tnum text-6xl">+10 XP</p>
                  <p className="mt-1 font-bold">Es tuyo y nunca baja.</p>
                  <button type="button" autoFocus className="sticker press mt-4 px-5 py-2" onClick={reset}>
                    Otra vez
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={mode !== "idle"}
                onClick={() => commit(-1)}
                className="sticker sticker-sun press px-4 py-2 text-sm disabled:opacity-50"
                style={{ "--rot": "-2deg" } as CSSProperties}
              >
                ‹ Pregúntame, Loopy
              </button>
              <button
                type="button"
                disabled={mode !== "idle"}
                onClick={() => commit(1)}
                className="sticker press px-4 py-2 text-sm disabled:opacity-50"
                style={{ "--rot": "2deg" } as CSSProperties}
              >
                Escribo yo ›
              </button>
            </div>
            {mode !== "idle" && mode !== "done" && (
              <button type="button" onClick={reset} className="mt-3 text-sm font-bold text-muted-foreground underline">
                Volver a la tarjeta
              </button>
            )}
            <p className="mt-6 text-sm text-muted-foreground">Hoy es opcional: no cuenta como falta.</p>
            <p className="text-sm text-muted-foreground">Los días que no elegiste son libres.</p>
          </div>
        </Reveal>
        <div className="lg:hidden">
          <PhoneFrame src={screenHoy} alt="Pantalla Hoy de la app Loopy con la tarjeta ¿Cómo vas hoy?" tilt={-3} />
        </div>
      </div>
    </Section>
  );
}
