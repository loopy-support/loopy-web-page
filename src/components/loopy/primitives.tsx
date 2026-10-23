import { sfx } from "@/lib/sound";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { toast } from "sonner";
import { APP_STORE_URL } from "@/config";
import { burstFrom } from "@/lib/confetti";

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  className = "",
  tilt = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  tilt?: number;
}) {
  return (
    <div
      className={`relative mx-auto w-[240px] rounded-[48px] bg-bezel p-[10px] shadow-[0_24px_50px_-18px_rgba(22,22,22,.45)] sm:w-[270px] ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <img src={src} alt={alt} loading="lazy" width={1206} height={2622} className="block h-auto w-full rounded-[38px]" />
    </div>
  );
}

export function Eyebrow({ children, rot = -2 }: { children: ReactNode; rot?: number }) {
  return (
    <span className="sticker sticker-sun inline-block px-4 py-1.5 text-sm" style={{ "--rot": `${rot}deg` } as CSSProperties}>
      {children}
    </span>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`display mt-4 text-4xl text-balance sm:text-5xl lg:text-6xl ${className}`}>{children}</h2>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mt-4 max-w-xl text-lg text-muted-foreground sm:text-[19px] ${className}`}>{children}</p>;
}

export function ConfettiDashes({ className = "" }: { className?: string }) {
  const dashes = [
    ["8%", "12%", 30, "bg-pink"],
    ["86%", "8%", -20, "bg-aqua"],
    ["92%", "60%", 45, "bg-sun"],
    ["4%", "70%", -40, "bg-aqua"],
    ["20%", "90%", 15, "bg-pink"],
    ["70%", "92%", -60, "bg-sun"],
    ["50%", "2%", 70, "bg-pink"],
  ] as const;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {dashes.map(([l, t, r, c], i) => (
        <span key={i} className={`absolute h-[6px] w-6 rounded-full ${c}`} style={{ left: l, top: t, transform: `rotate(${r}deg)` }} />
      ))}
    </div>
  );
}

export function StoreCTA({ className = "", rot = -1.5 }: { className?: string; rot?: number }) {
  const style = { "--rot": `${rot}deg` } as CSSProperties;
  const cls = `sticker sticker-ink press inline-flex items-center gap-2 px-6 py-3.5 text-base sm:text-lg ${className}`;
  if (APP_STORE_URL) {
    return (
      <a href={APP_STORE_URL} className={cls} style={style}>
        Descargar en el App Store
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      style={style}
      onClick={(e) => {
        burstFrom(e.currentTarget, 40);
        sfx.chime();
        toast("¡Ya casi! Muy pronto en el App Store.");
      }}
    >
      Próximamente en el App Store
    </button>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-4 py-20 sm:px-6 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
