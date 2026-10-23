import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { LegalShell, legalHead } from "@/components/loopy/LegalShell";
import { loopyHappy } from "@/lib/assets";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/legal")({
  head: () =>
    legalHead(
      "Loopy · Legal",
      "Términos de uso, política de privacidad y ayuda y contacto de Loopy.",
      "/legal",
    ),
  component: LegalHub,
});

const DOCS = [
  { to: "/terminos", title: "Términos de uso", line: "Versión 2 · Vigente desde el 20 de octubre de 2026" },
  { to: "/privacidad", title: "Política de privacidad", line: "Vigente desde el 22 de octubre de 2026" },
  { to: "/soporte", title: "Ayuda y contacto", line: "Respondemos en menos de 24 horas." },
] as const;

function LegalHub() {
  return (
    <LegalShell crumb={false}>
      <div className="flex items-center gap-4">
        <h1>Legal</h1>
        <img src={loopyHappy} alt="" aria-hidden width={72} height={72} className="h-16 w-auto print:hidden" />
      </div>
      <ul className="!my-8 !list-none !pl-0 grid gap-4">
        {DOCS.map((d, i) => (
          <li key={d.to} className="!m-0 !p-0">
            <Link
              to={d.to}
              className="sticker press group flex items-center gap-4 px-6 py-5 !no-underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--legal-link)]"
              style={{ "--rot": `${i % 2 ? 0.4 : -0.4}deg`, color: "var(--sticker-ink)" } as CSSProperties}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-extrabold">{d.title}</span>
                <span className="mt-1 block text-base font-semibold opacity-75">{d.line}</span>
              </span>
              <ArrowRight aria-hidden size={22} strokeWidth={2.75} className="shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </li>
        ))}
      </ul>
    </LegalShell>
  );
}
