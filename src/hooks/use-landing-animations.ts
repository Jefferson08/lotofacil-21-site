import { useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function useLandingAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReduced()) {
        gsap.set(
          [
            ".hero-reveal",
            ".hero-media",
            ".features-text",
            ".features-card-left",
            ".features-card-right",
            ".how-step-left",
            ".how-step-right",
            ".screenshots-reveal",
            ".pricing-reveal",
            ".faq-reveal",
          ],
          { autoAlpha: 1, clearProps: "transform" }
        )
        return
      }

      const isMobile = window.matchMedia("(max-width: 640px)").matches
      const ySmall = isMobile ? 10 : 16
      const xSmall = isMobile ? 16 : 24
      const durationFast = isMobile ? 0.45 : 0.6
      const durationMed = isMobile ? 0.55 : 0.7

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

      // FEATURES
      ScrollTrigger.batch(".features-text", {
        start: "top 85%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, y: ySmall },
            { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out" }
          )
        },
      })

      ScrollTrigger.batch(".features-card-left", {
        start: "top 85%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, x: -xSmall },
            {
              autoAlpha: 1,
              x: 0,
              duration: durationMed,
              ease: "power2.out",
              stagger: 0.06,
              onComplete: () => {
                gsap.to(els, { scale: 1.01, duration: 0.15, yoyo: true, repeat: 1 })
              },
            }
          )
        },
      })

      ScrollTrigger.batch(".features-card-right", {
        start: "top 85%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, x: xSmall },
            {
              autoAlpha: 1,
              x: 0,
              duration: durationMed,
              ease: "power2.out",
              stagger: 0.06,
              onComplete: () => {
                gsap.to(els, { scale: 1.01, duration: 0.15, yoyo: true, repeat: 1 })
              },
            }
          )
        },
      })

      // COMO FUNCIONA (steps)
      ScrollTrigger.batch(".how-step-left", {
        start: "top 85%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, x: -xSmall },
            { autoAlpha: 1, x: 0, duration: durationMed, ease: "power2.out", stagger: 0.08 }
          )
        },
      })

      ScrollTrigger.batch(".how-step-right", {
        start: "top 85%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, x: xSmall },
            { autoAlpha: 1, x: 0, duration: durationMed, ease: "power2.out", stagger: 0.08 }
          )
        },
      })

      // SCREENSHOTS
      ScrollTrigger.batch(".screenshots-reveal", {
        start: isMobile ? "top 85%" : "top 80%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, y: ySmall },
            { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out", stagger: 0.08 }
          )
        },
      })

      // PREÇO
      ScrollTrigger.batch(".pricing-reveal", {
        start: "top 85%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, y: ySmall },
            { autoAlpha: 1, y: 0, duration: durationMed, ease: "power2.out", stagger: 0.08 }
          )
        },
      })

      // FAQ
      ScrollTrigger.batch(".faq-reveal", {
        start: "top 85%",
        once: true,
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { autoAlpha: 0, y: ySmall },
            { autoAlpha: 1, y: 0, duration: durationFast, ease: "power2.out", stagger: 0.08 }
          )
        },
      })

      const refreshOnHash = () => ScrollTrigger.refresh()
      window.addEventListener("hashchange", refreshOnHash)

      return () => {
        window.removeEventListener("hashchange", refreshOnHash)
      }
    })

    return () => ctx.revert()
  }, [])
}
