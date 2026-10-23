import { sfx } from "@/lib/sound";
import { useRef, useState, type CSSProperties } from "react";
import { Flag, Flame } from "lucide-react";
import { screenTablero } from "@/lib/assets";
import { burstFrom } from "@/lib/confetti";
import { Eyebrow, H2, Lead, PhoneFrame, Reveal, Section } from "./primitives";

const DAYS = ["mar 6", "vie 9", "mar 13", "vie 16", "mar 20", "vie 23", "mar 27", "vie 30", "mar 3", "vie 6", "mar 10", "vie 13"];
const TODAY = 5;
const LINES = ["Grabamos el episodio 4", "Hoy corrí 5 km", "Terminé la introducción"];

export function Board() {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const todayRef = useRef<HTMLButtonElement>(null);
  const streak = TODAY + (checked ? 1 : 0);

  const rows = [0, 1, 2].map((r) => {
    const idx = [0, 1, 2, 3].map((c) => r * 4 + c);
    return r % 2 ? idx.reverse() : idx;
  });

  return (
    <Section id="tablero">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Tu proyecto</Eyebrow>
          <H2>Tu proyecto, como un camino.</H2>
          <Lead>
            Cada casilla es un día de check-in. El camino sube desde donde empezaste hasta la meta. Toca una casilla para ver lo que
            escribieron ese día.
          </Lead>
          <div className="mt-10">
            <PhoneFrame src={screenTablero} alt="Pantalla del tablero de un proyecto en Loopy, con el camino de casillas" tilt={-3} />
          </div>
        </Reveal>

        <Reveal delay={120} className="card-loopy relative mx-auto w-full max-w-[440px] p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-extrabold">
              <Flag size={16} strokeWidth={2.5} aria-hidden /> La meta
            </span>
            <span className="sticker sticker-sun flex items-center gap-1 px-3 py-1 text-sm tnum" aria-label={`Racha: ${streak}`}>
              <Flame size={15} strokeWidth={2.5} aria-hidden /> {streak}
            </span>
          </div>
          <p className="mt-4 text-xs font-extrabold text-muted-foreground">Lo que viene</p>
          <div className="mt-2 flex flex-col-reverse gap-3">
            {rows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-4 gap-3">
                {row.map((i) => {
                  const done = i < TODAY || (i === TODAY && checked);
                  const isToday = i === TODAY;
                  const [wd, n] = (DAYS[i] ?? "").split(" ");
                  return (
                    <div key={i} className="relative">
                      {isToday && (
                        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-sticker-ink px-2 py-0.5 text-[11px] font-extrabold text-sticker">
                          Hoy
                        </span>
                      )}
                      <button
                        type="button"
                        ref={isToday ? todayRef : undefined}
                        disabled={!done}
                        aria-label={`${DAYS[i]}${done ? ", check-in hecho. Ver lo que escribieron" : isToday ? ", hoy" : ", lo que viene"}`}
                        onClick={() => {
                          sfx.tick();
                          setOpen(open === i ? null : i);
                        }}
                        className={`flex aspect-square w-full flex-col items-center justify-center rounded-[16px] transition-transform ${
                          done
                            ? `border-[2.5px] border-sticker-ink bg-sun text-sun-ink shadow-[0_3px_0_var(--sticker-ink)] hover:-translate-y-0.5 ${isToday ? "anim-pop" : ""}`
                            : isToday
                              ? "border-[2.5px] border-sticker-ink bg-sticker text-sun-ink"
                              : "border-2 border-dashed border-muted-foreground/50 text-muted-foreground"
                        }`}
                      >
                        <span className="text-[11px] font-bold">{wd}</span>
                        <span className="tnum text-xl">{n}</span>
                      </button>
                      {open === i && done && (
                        <div
                          role="status"
                          className="sticker anim-pop absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[180px] -translate-x-1/2 rounded-[14px] px-3 py-2 text-sm"
                        >
                          {LINES[i % LINES.length]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs font-extrabold text-muted-foreground">Aquí empezó</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={checked}
              onClick={() => {
                setChecked(true);
                sfx.pop();
                window.setTimeout(sfx.chime, 120);
                window.setTimeout(() => burstFrom(todayRef.current, 36), 40);
              }}
              className="sticker sticker-ink press px-5 py-2.5 disabled:opacity-60"
            >
              Hacer check-in
            </button>
            {checked && (
              <span className="sticker sticker-sun anim-pop px-3 py-1.5 text-sm" style={{ "--rot": "-4deg" } as CSSProperties}>
                ¡Listo por hoy!
              </span>
            )}
            {checked && (
              <button type="button" className="text-sm font-bold text-muted-foreground underline" onClick={() => setChecked(false)}>
                Reiniciar
              </button>
            )}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">Cada check-in suma una casilla a tu camino.</p>
        </Reveal>
      </div>
    </Section>
  );
}
