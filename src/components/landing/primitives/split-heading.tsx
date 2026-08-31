import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  delay?: number;
  id?: string;
}

export function SplitHeading({
  as = "h2",
  children,
  className = "",
  delay = 0,
  id,
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const split = new SplitType(el, { types: "lines,words", tagName: "span" });

    gsap.set(split.words, {
      yPercent: 110,
      opacity: 0,
      filter: "blur(8px)",
    });

    const tween = gsap.to(split.words, {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.035,
      delay,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [children, delay]);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      id={id}
      className={`overflow-hidden text-balance leading-[1.04] sm:leading-[1.02] tracking-[-0.02em] ${className}`}
    >
      {children}
    </Tag>
  );
}
