import { useEffect, useRef, useState } from 'react'
import './Hero.css'

function Hero() {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    // Ensure autoplay kicks in on mount (mobile browsers require muted + playsInline)
    const tryPlay = () => {
      el.play().catch(() => {
        /* ignore autoplay rejection */
      })
    }
    if (el.readyState >= 2) {
      tryPlay()
    } else {
      el.addEventListener('loadeddata', tryPlay, { once: true })
    }
  }, [])

  const toggleMute = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setIsMuted(el.muted)
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      {/* Ambient background */}
      <div className="hero__backdrop">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__pill">
            <span className="hero__pill-dot" />
            New · 2026 Edition · 4-in-1 Baby Tent
          </div>

          <h1 className="hero__title">
            Fold It Back In{' '}
            <span className="hero__title-accent">10 Seconds.</span>
          </h1>

          <p className="hero__subtitle">
            The first pop-up baby tent with a built-in <strong>solar fan</strong>,
            a <strong>mini splash pool</strong>, <strong>UPF 50+</strong>{' '}
            protection and smart pockets — and the easiest folding system on the
            market. Watch it, do it, done.
          </p>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">1s</span>
              <span className="hero__stat-label">Pop-Up</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">UPF 50+</span>
              <span className="hero__stat-label">UV Shield</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">3</span>
              <span className="hero__stat-label">Fan Speeds</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">4★</span>
              <span className="hero__stat-label">Wind Pegs</span>
            </div>
          </div>

          <div className="hero__cta">
            <a
              href="#innovation"
              className="btn btn-primary hero__btn"
              onClick={(e) => scrollToSection(e, 'innovation')}
            >
              Discover the Innovation
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                width="18"
                height="18"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#videos"
              className="btn btn-outline hero__btn"
              onClick={(e) => scrollToSection(e, 'videos')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M8 5v14l11-7z" />
              </svg>
              See All Tutorials
            </a>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span className="hero__trust-text">
              <strong>4.9/5</strong> · Loved by <strong>2,460+</strong> parents worldwide
            </span>
          </div>
        </div>

        {/* Visual showcase: live folding demo video */}
        <div className="hero__visual">
          <div className="hero__video-frame">
            <video
              ref={videoRef}
              className="hero__video"
              src="/videos/folding_tent.mov"
              poster="/images/folding_poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            <div className="hero__video-topbar">
              <span className="hero__video-chip">
                <span className="hero__video-chip-dot" />
                Live Demo · Folding
              </span>
              <button
                type="button"
                className="hero__video-mute"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" opacity="0.4" />
                    <path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="hero__video-caption">
              <strong>How to fold the tent</strong>
              <small>No struggle. Under 10 seconds.</small>
            </div>

            <div className="hero__badge hero__badge--top">
              <span className="hero__badge-icon">☀️</span>
              <div>
                <strong>Solar Powered</strong>
                <small>USB-C backup</small>
              </div>
            </div>
            <div className="hero__badge hero__badge--bottom">
              <span className="hero__badge-icon">🌊</span>
              <div>
                <strong>Mini Pool</strong>
                <small>Safe splash zone</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
