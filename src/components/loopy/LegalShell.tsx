import type { CSSProperties, ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Bottom";

export function legalHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

const DOCS = [
  { to: "/terminos", title: "Términos de uso" },
  { to: "/privacidad", title: "Política de privacidad" },
  { to: "/soporte", title: "Ayuda y contacto" },
] as const;

export function LegalShell({ chip, children, crumb = true }: { chip?: string; children: ReactNode; crumb?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const others = DOCS.filter((d) => d.to !== path);
  const isDoc = others.length < DOCS.length;
  return (
    <>
      <Nav />
      <main id="contenido" className="px-4 py-12 sm:px-6 sm:py-16">
        <article className="legal-doc mx-auto max-w-[680px]">
          <nav aria-label="Ruta" className="volver mb-6 flex flex-wrap items-center gap-2 text-base print:hidden">
            <Link to="/">← Loopy</Link>
            {crumb && (
              <>
                <span aria-hidden className="text-muted-foreground">/</span>
                <Link to="/legal">Legal</Link>
              </>
            )}
          </nav>
          {chip && (
            <span
              className="legal-chip sticker sticker-sun inline-block px-3 py-1.5 text-sm"
              style={{ "--rot": "-2deg" } as CSSProperties}
            >
              {chip}
            </span>
          )}
          {children}
          {isDoc && (
            <nav aria-label="Legal" className="mt-14 flex flex-wrap gap-3 border-t border-border pt-8 print:hidden">
              {others.map((d) => (
                <Link key={d.to} to={d.to} className="sticker press inline-flex px-4 py-2 text-base !no-underline" style={{ color: "var(--sticker-ink)" }}>
                  {d.title}
                </Link>
              ))}
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
