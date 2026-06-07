import Cursor from './components/Cursor'
import Background from './components/Background'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import SocialRail from './components/SocialRail'
import Hero from './components/Hero'
import About from './components/About'
import WhatIDo from './components/WhatIDo'
import Experience from './components/Experience'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Background />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <SocialRail />

      <main className="relative">
        <Hero />
        <About />
        <WhatIDo />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
