import './TentSection.css'

const features = [
  {
    icon: '🌀',
    title: 'Built-in Fan',
    description: 'USB-C rechargeable fan with 3 speed settings keeps your baby cool and comfortable.',
  },
  {
    icon: '☀️',
    title: 'UPF 50+ Protection',
    description: 'Blocks 98% of harmful UV rays to keep your baby safe from the sun.',
  },
  {
    icon: '⚡',
    title: 'Ultra Portable',
    description: 'Sets up in 30 seconds with our innovative pop-up design. Packs flat for easy storage.',
  },
  {
    icon: '🏖️',
    title: 'Multi-Use Design',
    description: 'Perfect for the beach, park, backyard, camping trips, or anywhere adventure takes you.',
  },
  {
    icon: '🌬️',
    title: 'Breathable Mesh',
    description: 'Fine mesh windows keep bugs out while allowing fresh air to circulate.',
  },
  {
    icon: '🪶',
    title: 'Lightweight',
    description: 'Weighs under 3 lbs - light enough to toss in your diaper bag or stroller.',
  },
]

const galleryImages = [
  {
    src: '/images/img2.png',
    alt: 'GlowByParis baby tent - perfect for beach and outdoor use',
  },
  {
    src: '/images/img3.png',
    alt: 'GlowByParis portable baby tent with UV protection',
  },
  {
    src: '/images/img4.png',
    alt: 'GlowByParis baby tent setup in outdoor environment',
  },
  {
    src: '/images/img5.png',
    alt: 'GlowByParis baby tent - lightweight and portable design',
  },
  {
    src: '/images/img6.png',
    alt: 'GlowByParis baby tent - easy to use and carry',
  },
]

function TentSection() {
  return (
    <section id="tent" className="tent-section section">
      <div className="container">
        <div className="section-title">
          <h2>Why Parents Love GlowByParis</h2>
          <p>
            Designed with your baby's comfort and safety in mind, our tent
            makes outdoor adventures worry-free.
          </p>
        </div>

        <div className="tent-section__features">
          {features.map((feature, index) => (
            <div key={index} className="feature-card card">
              <span className="feature-card__icon">{feature.icon}</span>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="tent-section__gallery">
          <h3 className="tent-section__gallery-title">See It in Action</h3>
          <div className="tent-section__gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="tent-section__gallery-item">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="tent-section__video">
          <h3 className="tent-section__video-title">Watch How to Fold the Tent</h3>
          <div className="tent-section__video-wrapper">
            <a
              href="https://www.amazon.com/vdp/0c8e4fd1e5294e809c284433bb4af4bf?product=B0C4NN1JP6&ref=cm_sw_cp_r_ib_dt_2eOGgLPIO5QfA"
              target="_blank"
              rel="noopener noreferrer"
              className="tent-section__video-link"
            >
              <img
                src="/images/img1.png"
                alt="Watch how to fold the GlowByParis baby tent"
                className="tent-section__video-thumbnail"
              />
              <div className="tent-section__video-play">
                <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="tent-section__video-caption">Click to watch on Amazon</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TentSection
