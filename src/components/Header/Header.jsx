import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__container">
        <a
          href="#hero"
          className="header__logo"
          onClick={(e) => scrollToSection(e, 'hero')}
        >
          <span className="header__logo-mark" aria-hidden="true">
            <svg viewBox="0 0 100 100" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="22" r="8" />
              <line x1="50" y1="30" x2="50" y2="80" />
              <line x1="34" y1="42" x2="66" y2="42" />
              <path d="M26 60 C26 76, 42 82, 50 80" />
              <path d="M74 60 C74 76, 58 82, 50 80" />
              <line x1="18" y1="56" x2="32" y2="62" />
              <line x1="82" y1="56" x2="68" y2="62" />
            </svg>
          </span>
          <span className="header__logo-text">
            Glow<span className="header__logo-accent">ByParis</span>
          </span>
        </a>

        <button
          className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li>
              <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>
                Home
              </a>
            </li>
            <li>
              <a
                href="#innovation"
                onClick={(e) => scrollToSection(e, 'innovation')}
              >
                Innovation
              </a>
            </li>
            <li>
              <a href="#videos" onClick={(e) => scrollToSection(e, 'videos')}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#tent" onClick={(e) => scrollToSection(e, 'tent')}>
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                onClick={(e) => scrollToSection(e, 'testimonials')}
              >
                Reviews
              </a>
            </li>
          </ul>
          <a
            href="#contact"
            className="btn btn-primary header__cta"
            onClick={(e) => scrollToSection(e, 'contact')}
          >
            Contact
          </a>
        </nav>

        {isMenuOpen && createPortal(
          <div
            className="header__overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />,
          document.body
        )}
      </div>
    </header>
  )
}

export default Header
