import { withBase } from "@/lib/utils";
import { type CSSProperties } from "react";
import { BellRing, Cloud, FileText, Lock, Mic, MoonStar, Smartphone, Sparkles, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { highFive, loopyCheering, screenProyectos, wordmark } from "@/lib/assets";
import { ConfettiDashes, Eyebrow, H2, Lead, PhoneFrame, Reveal, Section, StoreCTA } from "./primitives";

const TEAM = [
  "Enlaces de un solo uso — cada enlace sirve para una sola persona.",
  "Hasta 8 personas por proyecto.",
  "Diario del equipo — todos ven lo que avanzó cada uno.",
  "Ustedes deciden cuándo cuenta el día: alguien del equipo, al menos la mitad o todo el equipo.",
];
const TINTS = ["bg-aqua", "bg-pink", "bg-lime", "bg-violet"];

export function Teams() {
  return (
    <Section id="equipos">
      <Reveal className="text-center">
        <Eyebrow>En equipo</Eyebrow>
        <H2 className="mx-auto max-w-4xl">Crea un proyecto, invita a tu grupo y avancen juntos.</H2>
      </Reveal>
      <Reveal delay={100} className="relative mx-auto mt-10 max-w-3xl">
        <ConfettiDashes />
        <img src={highFive} alt="Dos Loopys chocando las manos" width={2400} height={1354} loading="lazy" className="relative h-auto w-full" />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {TEAM.map((t, i) => (
          <Reveal key={t} delay={i * 80}>
            <p
              className={`sticker wobble rounded-[20px] px-5 py-4 text-base text-sun-ink ${TINTS[i]}`}
              style={{ "--rot": `${i % 2 ? 1.5 : -1.5}deg` } as CSSProperties}
            >
              {t}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1fr_auto]">
        <Reveal className="card-loopy h-full p-7">
          <p className="text-sm font-extrabold text-muted-foreground">Solo</p>
          <p className="display mt-2 text-5xl">Gratis</p>
          <p className="mt-4 text-lg">Todo para tus proyectos: preguntas de Loopy, tablero, salud, rachas, XP, amigos y recordatorios.</p>
        </Reveal>
        <Reveal delay={100} className="on-sun h-full rounded-[28px] border-[2.5px] border-sticker-ink p-7 shadow-[0_4px_0_var(--sticker-ink)]">
          <p className="text-sm font-extrabold">Loopy Groups</p>
          <p className="display mt-2 text-4xl">Suscripción mensual</p>
          <p className="mt-4 text-lg">
            Para quien organiza. Las personas que invitas participan gratis. Se renueva cada mes; cancela cuando quieras en el App Store.
          </p>
          <p className="mt-4 text-sm font-bold">El precio aparece en el App Store.</p>
        </Reveal>
        <Reveal delay={200}>
          <PhoneFrame src={screenProyectos} alt="Pantalla Proyectos de la app Loopy con la salud de cada proyecto" tilt={4} className="!w-[220px]" />
        </Reveal>
      </div>
    </Section>
  );
}

const PRIVACY = [
  { icon: Lock, t: "Sin publicidad ni rastreo", b: "Loopy no tiene publicidad, no te rastrea y no usa servicios de analítica de terceros." },
  {
    icon: Cloud,
    t: "Sin cuenta ni contraseña",
    b: "No pedimos correo ni contraseña. Tus proyectos, check-ins y notas se guardan en tu iPhone y en tu iCloud. Nosotros no podemos leerlos.",
  },
  {
    icon: Sparkles,
    t: "Apple Intelligence, en tu iPhone",
    b: "Las preguntas de Loopy y la lectura de tu pauta usan Apple Intelligence en tu iPhone. Sin Apple Intelligence, la app funciona a mano.",
  },
];
const EXTRAS = [
  { icon: BellRing, t: "Recordatorio solo los días que te toca" },
  { icon: Mic, t: "Dicta tu check-in" },
  { icon: Zap, t: "«Hacer check-in» desde Siri o el botón de acción" },
  { icon: MoonStar, t: "Modo oscuro" },
];

export function Privacy() {
  return (
    <Section className="bg-surface">
      <Reveal className="text-center">
        <Eyebrow>Privacidad</Eyebrow>
        <H2>Lo tuyo se queda contigo.</H2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PRIVACY.map(({ icon: I, t, b }, i) => (
          <Reveal key={t} delay={i * 100} className="card-loopy p-7">
            <span className="relative grid h-14 w-14 place-items-center rounded-[20px] bg-sun text-sun-ink">
              {i === 2 ? <Smartphone size={28} strokeWidth={2} aria-hidden /> : <I size={28} strokeWidth={2} aria-hidden />}
              {i === 2 && <Sparkles size={14} strokeWidth={2.5} aria-hidden className="absolute" />}
            </span>
            <h3 className="display mt-5 text-2xl">{t}</h3>
            <p className="mt-2 text-muted-foreground">{b}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={100} className="mt-8 flex flex-col gap-4 rounded-[28px] border-[2.5px] border-dashed border-foreground/30 bg-card p-7 sm:flex-row sm:items-center">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-lavender text-sun-ink">
          <FileText size={28} aria-hidden />
        </span>
        <div>
          <h3 className="display text-2xl">Tengo una pauta</h3>
          <p className="mt-1 text-muted-foreground">Adjunta un PDF o pega el enunciado: Loopy sugiere nombre, resultado y fechas. Todo es editable.</p>
        </div>
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EXTRAS.map(({ icon: I, t }) => (
          <li key={t} className="flex items-center gap-3 font-bold">
            <I size={22} strokeWidth={2.25} aria-hidden className="shrink-0" />
            {t}
          </li>
        ))}
      </ul>
    </Section>
  );
}

const FAQ: [string, string][] = [
  ["¿Loopy es gratis?", "Tus proyectos solos son gratis, con todo incluido. Para colaborar en equipo, quien organiza activa Loopy Groups, una suscripción mensual. Las personas que invita participan gratis."],
  ["¿En qué dispositivos funciona?", "En iPhone con iOS 26 o posterior. La app está en español. No hay versión para Android, iPad ni web."],
  ["¿Necesito Apple Intelligence?", "No. Con Apple Intelligence, Loopy escribe preguntas pensadas para tu proyecto y lee tu pauta en tu iPhone. Sin ella, usa sus propias preguntas y completas el proyecto a mano."],
  ["¿Qué pasa si un día no hago check-in?", "Solo cuentan los días que elegiste. Si te tocaba y no escribiste, el proyecto pasa a Sin rumbo y tu racha vuelve a empezar. Tu XP nunca baja, y los días libres no cuentan como falta."],
  ["¿Abrir la app cuenta para la racha?", "No. Solo cuenta escribir: tu propia línea o tu respuesta a la pregunta de Loopy."],
  ["¿Quién ve lo que escribo?", "Lo que escribes en un proyecto en equipo lo ve solo ese equipo. Tus proyectos solos son solo tuyos. Tu racha y tu XP son visibles en Loopy solo si activas tu perfil social."],
  ["¿Cuántas personas caben en un equipo?", "Hasta 8 por proyecto: quien organiza y 7 más. Cada enlace de invitación sirve para una sola persona."],
  ["¿Necesito crear una cuenta?", "No. Loopy usa tu iCloud. Sin iCloud, tus proyectos solos funcionan, pero quedan solo en ese iPhone."],
  ["¿Cómo borro mis datos?", "Desde la app, en Ajustes › Borrar mi cuenta."],
  ["¿Desde qué edad se puede usar?", "Loopy es para personas mayores de 18 años."],
];

export function Faq() {
  return (
    <Section id="preguntas">
      <Reveal className="text-center">
        <Eyebrow>Preguntas</Eyebrow>
        <H2>Preguntas frecuentes</H2>
      </Reveal>
      <Reveal delay={100} className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="card-loopy border-none px-6">
              <AccordionTrigger className="text-left text-lg font-extrabold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

export function FinalCta() {
  return (
    <section className="on-sun relative mt-10 overflow-hidden px-4 pt-24 pb-24 text-center sm:px-6">
      <svg aria-hidden className="absolute inset-x-0 top-0 h-10 w-full" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          d="M0 0 H1200 V18 L1150 30 L1100 14 L1040 32 L980 16 L920 28 L860 12 L800 30 L740 18 L680 34 L620 14 L560 28 L500 12 L440 32 L380 16 L320 30 L260 14 L200 32 L140 16 L80 30 L0 16 Z"
          fill="var(--background)"
        />
      </svg>
      <ConfettiDashes />
      <img src={loopyCheering} alt="Loopy celebrando con los brazos arriba" width={1600} height={1371} loading="lazy" className="anim-bounce-soft relative mx-auto w-[200px] sm:w-[240px]" />
      <h2 className="display relative mt-4 text-5xl sm:text-7xl">Avanza un poco cada día.</h2>
      <p className="relative mt-4 text-xl font-bold">Solo o en equipo.</p>
      <div className="relative mt-8">
        <StoreCTA rot={1.5} />
      </div>
    </section>
  );
}

export function Footer() {
  const link = "rounded-md font-bold underline-offset-4 hover:underline";
  return (
    <footer className="print:hidden border-t border-border px-4 py-14 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <img src={wordmark} alt="Loopy" className="h-20 w-auto -rotate-3 drop-shadow-[0_2px_0_var(--sticker-ink)]" loading="lazy" />
          <p className="mt-4 font-bold">Que ningún proyecto se detenga.</p>
        </div>
        <ul className="flex flex-col gap-3">
          <li><a className={link} href={withBase("/terminos")}>Términos de uso</a></li>
          <li><a className={link} href={withBase("/privacidad")}>Política de privacidad</a></li>
          <li><a className={link} href={withBase("/soporte")}>Ayuda y contacto</a></li>
          <li><a className={link} href={withBase("/legal")}>Legal</a></li>
        </ul>
        <div>
          <a className={link} href="mailto:loopy.support.app@gmail.com">loopy.support.app@gmail.com</a>
          <p className="mt-1 text-sm text-muted-foreground">Respondemos en menos de 24 horas.</p>
          <p className="mt-6 text-sm text-muted-foreground">© 2026 Loopy</p>
        </div>
      </div>
    </footer>
  );
}
