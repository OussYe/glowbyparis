import './FanFeature.css'

function FanFeature() {
  return (
    <section className="fan-feature">
      <div className="container">
        <div className="fan-feature__badge">
          <span>Exclusive Feature</span>
        </div>
        <h2 className="fan-feature__title">
          Built-in Rechargeable Fan
        </h2>
        <p className="fan-feature__subtitle">
          Keep your baby cool and comfortable with our innovative integrated fan system
        </p>

        <div className="fan-feature__content">
          <div className="fan-feature__image-main">
            <img
              src="/images/img7.png"
              alt="GlowByParis baby tent with built-in fan visible at the top"
              loading="lazy"
            />
            <div className="fan-feature__image-badge">
              <span>Fan Included</span>
            </div>
          </div>

          <div className="fan-feature__details">
            <div className="fan-feature__image-detail">
              <img
                src="/images/img8.png"
                alt="Close-up of the rechargeable fan with digital battery display"
                loading="lazy"
              />
            </div>

            <div className="fan-feature__specs">
              <div className="fan-feature__spec">
                <div className="fan-feature__spec-icon">🔋</div>
                <div className="fan-feature__spec-text">
                  <h4>USB-C Rechargeable</h4>
                  <p>Digital battery indicator shows charge level</p>
                </div>
              </div>

              <div className="fan-feature__spec">
                <div className="fan-feature__spec-icon">💨</div>
                <div className="fan-feature__spec-text">
                  <h4>3 Speed Settings</h4>
                  <p>Adjustable airflow for perfect comfort</p>
                </div>
              </div>

              <div className="fan-feature__spec">
                <div className="fan-feature__spec-icon">🔇</div>
                <div className="fan-feature__spec-text">
                  <h4>Whisper Quiet</h4>
                  <p>Won't disturb your baby's nap time</p>
                </div>
              </div>

              <div className="fan-feature__spec">
                <div className="fan-feature__spec-icon">⏱️</div>
                <div className="fan-feature__spec-text">
                  <h4>Long Battery Life</h4>
                  <p>Hours of cooling on a single charge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FanFeature
