import { withBase } from "@/lib/utils";
import { setSoundOn, sfx, soundOn } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { wordmark } from "@/lib/assets";

export const NAV = [
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "hoy", label: "Hoy" },
  { id: "tablero", label: "Tablero" },
  { id: "amigos", label: "Amigos" },
  { id: "equipos", label: "Equipos" },
  { id: "preguntas", label: "Preguntas" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    sfx.click();
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("loopy-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="sticker press wobble grid h-10 w-10 place-items-center"
      style={{ "--rot": "-4deg" } as CSSProperties}
    >
      {dark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
    </button>
  );
}

function SoundToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => setOn(soundOn()), []);
  return (
    <button
      type="button"
      onClick={() => {
        const next = !on;
        setOn(next);
        setSoundOn(next);
        if (next) sfx.pop();
      }}
      aria-label={on ? "Silenciar sonidos" : "Activar sonidos"}
      aria-pressed={!on}
      className="sticker press wobble grid h-10 w-10 place-items-center"
      style={{ "--rot": "3deg" } as CSSProperties}
    >
      {on ? <Volume2 size={18} strokeWidth={2.5} /> : <VolumeX size={18} strokeWidth={2.5} />}
    </button>
  );
}

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [onLegal, setOnLegal] = useState(false);
  useEffect(() => setOnLegal(["/legal", "/terminos", "/privacidad", "/soporte"].map(withBase).includes(window.location.pathname.replace(/\/$/, ""))), []);
  const barRef = useRef<HTMLUListElement>(null);
  const [geo, setGeo] = useState<{ x1: number; x2: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let cur: string | null = null;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      const bar = barRef.current;
      if (!bar) return;
      const b = bar.getBoundingClientRect();
      const li = active ? bar.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
      if (!li) return setGeo({ x1: -1, x2: -1, w: b.width, h: b.height });
      const r = li.getBoundingClientRect();
      setGeo({ x1: r.left - b.left - 4, x2: r.right - b.left + 4, w: b.width, h: b.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  let d = "";
  if (geo) {
    const y = geo.h - 3;
    const t = 3;
    const r = (y - t) / 2;
    d =
      geo.x1 < 0
        ? `M 2 ${y} H ${geo.w - 2}`
        : `M 2 ${y} H ${geo.x2 - r} A ${r} ${r} 0 0 0 ${geo.x2 - r} ${t} H ${geo.x1 + r} A ${r} ${r} 0 0 0 ${geo.x1 + r} ${y} H ${geo.w - 2}`;
  }

  return (
    <header className="print:hidden sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href={withBase("/")} aria-label="Loopy, ir al inicio" className="shrink-0">
          <img src={wordmark} alt="Loopy" width={1600} height={1013} className="h-14 w-auto -rotate-3 drop-shadow-[0_2px_0_var(--sticker-ink)] transition-transform hover:rotate-2" />
        </a>

        <ul ref={barRef} className="relative hidden h-11 items-center gap-1 lg:flex">
          {geo && (
            <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <path
                className="rope-path"
                d={d}
                style={{ d: `path("${d}")` } as CSSProperties}
                fill="none"
                stroke="var(--rope)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={geo.x1 < 0 ? 0.25 : 1}
              />
            </svg>
          )}
          {NAV.map((n) => (
            <li key={n.id} data-id={n.id}>
              <a
                href={`/#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className="relative block px-3.5 py-2 text-[15px] font-extrabold"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href={withBase("/legal")} aria-current={onLegal ? "page" : undefined} className={`relative block rounded-full px-3.5 py-2 text-[15px] font-extrabold ${onLegal ? "bg-[var(--sun)] text-[var(--sun-ink)]" : ""}`}>
              Legal
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2.5">
          <SoundToggle />
          <ThemeToggle />
          <span className="sticker sticker-sun hidden px-3 py-1.5 text-xs sm:inline-block" style={{ "--rot": "3deg" } as CSSProperties}>
            Próximamente
          </span>
          <button
            type="button"
            className="sticker press grid h-10 w-10 place-items-center lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => {
              sfx.click();
              setOpen(true);
            }}
          >
            <Menu size={20} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menú" className="fixed inset-0 z-50 flex h-dvh flex-col bg-background px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={wordmark} alt="Loopy" className="h-11 w-auto -rotate-3" />
            <button
              type="button"
              autoFocus
              className="sticker press grid h-10 w-10 place-items-center"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          <ul className="mt-10 flex flex-col gap-3">
            {NAV.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`/#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="sticker press block px-6 py-4 text-2xl"
                  style={{ "--rot": `${i % 2 ? 1.5 : -1.5}deg` } as CSSProperties}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={withBase("/legal")}
                onClick={() => setOpen(false)}
                className="sticker press block px-6 py-4 text-2xl"
                style={{ "--rot": "-1.5deg" } as CSSProperties}
              >
                Legal
              </a>
            </li>
          </ul>
          <span className="sticker sticker-sun mt-8 self-start px-4 py-2 text-sm">Próximamente</span>
        </div>
      )}
    </header>
  );
}
