import { useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

type RevealSpec = {
  selector: string
  from: gsap.TweenVars
  to: gsap.TweenVars
  start?: string
}

const ANIMATABLE_SELECTORS = [
  ".hero-reveal",
  ".hero-media",
  ".features-text",
  ".features-card-left",
  ".features-card-right",
  ".how-intro",
  ".how-generated",
  ".how-pill-left",
  ".how-pill-right",
  ".how-step-left",
  ".how-step-right",
  ".screenshots-reveal",
  ".shots-scale",
  ".shots-item",
  ".shots-thumbs",
  ".shots-thumb",
  ".pricing-reveal",
  ".faq-reveal",
]

function markAnimated(elements: HTMLElement[]) {
  elements.forEach((el) => {
    el.dataset.animated = "true"
  })
}

function filterNotAnimated(elements: HTMLElement[]) {
  return elements.filter((el) => el.dataset.animated !== "true")
}

export function useLandingAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set(ANIMATABLE_SELECTORS, { autoAlpha: 1, clearProps: "transform" })
        return
      }

      const isMobile = window.matchMedia("(max-width: 640px)").matches
      const ySmall = isMobile ? 10 : 16
      const xSmall = isMobile ? 16 : 24
      const durationFast = isMobile ? 0.45 : 0.6
      const durationMed = isMobile ? 0.55 : 0.7

      const specs: RevealSpec[] = [
        {
          selector: ".features-text",
          from: { autoAlpha: 0, y: ySmall },
          to: { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out" },
        },
        {
          selector: ".features-card-left",
          from: { autoAlpha: 0, x: -xSmall },
          to: {
            autoAlpha: 1,
            x: 0,
            duration: durationMed,
            ease: "power2.out",
            stagger: 0.06,
            onComplete: function () {
              gsap.to(this.targets(), { scale: 1.01, duration: 0.15, yoyo: true, repeat: 1 })
            },
          },
        },
        {
          selector: ".features-card-right",
          from: { autoAlpha: 0, x: xSmall },
          to: {
            autoAlpha: 1,
            x: 0,
            duration: durationMed,
            ease: "power2.out",
            stagger: 0.06,
            onComplete: function () {
              gsap.to(this.targets(), { scale: 1.01, duration: 0.15, yoyo: true, repeat: 1 })
            },
          },
        },
        {
          selector: ".how-intro",
          from: { autoAlpha: 0, y: ySmall },
          to: { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out" },
        },
        {
          selector: ".how-generated",
          from: { autoAlpha: 0, y: ySmall },
          to: { autoAlpha: 1, y: 0, duration: durationMed, ease: "power2.out" },
        },
        {
          selector: ".how-pill-left",
          from: { autoAlpha: 0, x: -xSmall },
          to: { autoAlpha: 1, x: 0, duration: durationFast, ease: "power2.out", stagger: 0.06 },
        },
        {
          selector: ".how-pill-right",
          from: { autoAlpha: 0, x: xSmall },
          to: { autoAlpha: 1, x: 0, duration: durationFast, ease: "power2.out", stagger: 0.06 },
        },
        {
          selector: ".how-step-left",
          from: { autoAlpha: 0, x: -xSmall },
          to: { autoAlpha: 1, x: 0, duration: durationMed, ease: "power2.out", stagger: 0.08 },
        },
        {
          selector: ".how-step-right",
          from: { autoAlpha: 0, x: xSmall },
          to: { autoAlpha: 1, x: 0, duration: durationMed, ease: "power2.out", stagger: 0.08 },
        },
        {
          selector: ".screenshots-reveal",
          from: { autoAlpha: 0, y: ySmall },
          to: { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out", stagger: 0.08 },
          start: isMobile ? "top 85%" : "top 80%",
        },
        {
          selector: ".shots-scale",
          from: { autoAlpha: 0, y: 12, scale: 0.96 },
          to: { autoAlpha: 1, y: 0, scale: 1, duration: durationMed, ease: "power2.out" },
          start: isMobile ? "top 85%" : "top 80%",
        },
        {
          selector: ".shots-item",
          from: { autoAlpha: 0, y: 10 },
          to: { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out", stagger: 0.06 },
          start: isMobile ? "top 85%" : "top 80%",
        },
        {
          selector: ".shots-thumbs",
          from: { autoAlpha: 0, y: 10 },
          to: { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out", delay: 0.1 },
        },
        {
          selector: ".shots-thumb",
          from: { autoAlpha: 0 },
          to: { autoAlpha: 1, duration: 0.35, ease: "power2.out", stagger: 0.04 },
        },
        {
          selector: ".pricing-reveal",
          from: { autoAlpha: 0, y: ySmall },
          to: { autoAlpha: 1, y: 0, duration: durationMed, ease: "power2.out", stagger: 0.08 },
        },
        {
          selector: ".faq-reveal",
          from: { autoAlpha: 0, y: ySmall },
          to: { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out", stagger: 0.08 },
        },
      ]

      const revealBatch = (spec: RevealSpec) => {
        const elements = gsap.utils.toArray<HTMLElement>(spec.selector)
        if (!elements.length) return
        gsap.set(elements, spec.from)
        ScrollTrigger.batch(elements, {
          start: spec.start ?? "top 85%",
          once: true,
          onEnter: (batch) => {
            const targets = filterNotAnimated(batch as HTMLElement[])
            if (!targets.length) return
            gsap.to(targets, {
              ...spec.to,
              onComplete: () => markAnimated(targets),
            })
          },
        })
      }

      // HERO - entrance on load
      gsap.fromTo(
        ".hero-reveal",
        { autoAlpha: 0, y: ySmall },
        {
          autoAlpha: 1,
          y: 0,
          duration: durationMed,
          ease: "power2.out",
          stagger: 0.08,
          onComplete: () => markAnimated(gsap.utils.toArray<HTMLElement>(".hero-reveal")),
        }
      )

      gsap.fromTo(
        ".hero-media",
        { autoAlpha: 0, y: ySmall },
        {
          autoAlpha: 1,
          y: 0,
          duration: durationMed,
          ease: "power2.out",
          delay: 0.1,
          onComplete: () => markAnimated(gsap.utils.toArray<HTMLElement>(".hero-media")),
        }
      )

      if (!isMobile) {
        gsap.to(".hero-media .absolute", {
          scale: 1.03,
          duration: 6,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        })
      }

      specs.forEach(revealBatch)

      const handleNavigate = (event: Event) => {
        const custom = event as CustomEvent<{ id: string }>
        if (!custom.detail?.id) return
        const section = document.getElementById(custom.detail.id)
        if (!section) return

        specs.forEach((spec) => {
          const elements = Array.from(
            section.querySelectorAll<HTMLElement>(spec.selector)
          )
          const pending = filterNotAnimated(elements)
          if (!pending.length) return
          gsap.set(pending, spec.from)
          gsap.to(pending, {
            ...spec.to,
            onComplete: () => markAnimated(pending),
          })
        })
      }

      window.addEventListener("landing:navigate", handleNavigate)
      const refreshOnHash = () => ScrollTrigger.refresh()
      window.addEventListener("hashchange", refreshOnHash)

      return () => {
        window.removeEventListener("landing:navigate", handleNavigate)
        window.removeEventListener("hashchange", refreshOnHash)
      }
    })

    return () => ctx.revert()
  }, [])
}
