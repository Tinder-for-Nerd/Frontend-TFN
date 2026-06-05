import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsBar from './components/StatsBar'
import FeaturedFounders from './components/FeaturedFounders'
import Features from './components/Features'
import UpcomingEvents from './components/UpcomingEvents'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturedFounders />
        <Features />
        <UpcomingEvents />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default App
