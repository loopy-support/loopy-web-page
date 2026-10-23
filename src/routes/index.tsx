import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/loopy/Nav";
import { Hero, Steps, Ticker } from "@/components/loopy/Top";
import { HoyDemo } from "@/components/loopy/HoyDemo";
import { Board } from "@/components/loopy/Board";
import { Friends, Health, Rewards } from "@/components/loopy/Middle";
import { Faq, FinalCta, Footer, Privacy, Teams } from "@/components/loopy/Bottom";

const TITLE = "Loopy · Que ningún proyecto se detenga";
const DESC =
  "Loopy te pregunta cómo vas los días que tú eliges. Una línea al día para que ningún proyecto se detenga, solo o en equipo. Para iPhone.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#contenido"
        className="sticker sticker-sun fixed top-3 left-3 z-[60] -translate-y-24 px-4 py-2 focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Hero />
        <Ticker />
        <Steps />
        <HoyDemo />
        <Board />
        <Health />
        <Rewards />
        <Friends />
        <Teams />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
