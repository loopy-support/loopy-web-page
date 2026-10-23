const COLORS = ["#FFB8CF", "#A9E8C8", "#FFE38F"];

export function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function burst(x: number, y: number, count = 30) {
  if (typeof document === "undefined" || reducedMotion()) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    const c = COLORS[i % COLORS.length];
    Object.assign(el.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${10 + Math.random() * 8}px`,
      height: "5px",
      borderRadius: "5px",
      background: c,
      pointerEvents: "none",
      zIndex: "9999",
    });
    document.body.appendChild(el);
    const a = Math.random() * Math.PI * 2;
    const d = 60 + Math.random() * 140;
    const r = Math.random() * 360;
    const anim = el.animate(
      [
        { transform: `translate(-50%,-50%) rotate(${r}deg)`, opacity: 1 },
        {
          transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 90}px) rotate(${r + 420}deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 600, easing: "cubic-bezier(.2,.8,.3,1)" },
    );
    anim.onfinish = () => el.remove();
  }
}

export function burstFrom(el: Element | null, count?: number) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, count);
}
