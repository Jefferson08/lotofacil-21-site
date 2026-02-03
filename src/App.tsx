import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Features } from "@/components/sections/Features"
import { Screenshots } from "@/components/sections/Screenshots"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Pricing } from "@/components/sections/Pricing"
import { FAQ } from "@/components/sections/FAQ"

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Screenshots />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
