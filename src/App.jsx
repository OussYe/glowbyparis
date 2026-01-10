import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import FanFeature from './components/FanFeature/FanFeature'
import TentSection from './components/TentSection/TentSection'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <FanFeature />
        <TentSection />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
