import { useState, useEffect } from 'react'
import './Hero.css'

const images = [
  '/images/img1.png',
  '/images/img2.png',
  '/images/img3.png',
  '/images/img4.png',
  '/images/img5.png',
  '/images/img6.png',
]

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      {/* Background Slider */}
      <div className="hero__slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="container hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
            Protect Your Little One <span>Outdoors</span>
          </h1>
          <p className="hero__subtitle">
            The ultimate portable baby tent with UPF 50+ sun protection and a
            built-in rechargeable fan for maximum comfort. Keep your little one
            cool and protected on beach days, park adventures, and backyard fun.
          </p>
          <div className="hero__cta">
            <a
              href="#tent"
              className="btn btn-primary"
              onClick={(e) => scrollToSection(e, 'tent')}
            >
              Discover Our Tent
            </a>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="hero__indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`hero__indicator ${index === currentSlide ? 'hero__indicator--active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
