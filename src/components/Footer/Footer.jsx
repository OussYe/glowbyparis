import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <a href="#hero" className="footer__logo" onClick={(e) => scrollToSection(e, 'hero')}>
              GlowByParis
            </a>
            <p className="footer__tagline">
              Protecting your little ones, one adventure at a time.
            </p>
          </div>

          <div className="footer__links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#tent" onClick={(e) => scrollToSection(e, 'tent')}>
                  Our Tent
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4>Contact Us</h4>
            <a href="mailto:contact@glowbyparis.com" className="footer__email">
              contact@glowbyparis.com
            </a>
          </div>

        </div>

        <div className="footer__bottom">
          <p>© {currentYear} GlowByParis - All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
