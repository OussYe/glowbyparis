import { useEffect, useRef, useState } from 'react'
import './Hero.css'

function Hero() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const hideTimerRef = useRef(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const tryPlay = () => el.play().catch(() => {})
    if (el.readyState >= 2) tryPlay()
    else el.addEventListener('loadeddata', tryPlay, { once: true })

    const onTimeUpdate = () => {
      setCurrentTime(el.currentTime)
      setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0)
    }
    const onMetadata = () => setDuration(el.duration)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('loadedmetadata', onMetadata)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)

    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('loadedmetadata', onMetadata)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
    }
  }, [])

  const revealControls = () => {
    setShowControls(true)
    clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setShowControls(false), 2500)
  }

  const handleFrameClick = () => {
    revealControls()
  }

  const togglePlay = (e) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    if (el.paused) el.play()
    else el.pause()
  }

  const seek = (e, seconds) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + seconds))
  }

  const handleProgressClick = (e) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    el.currentTime = ((e.clientX - rect.left) / rect.width) * (el.duration || 0)
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
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

        <div className="hero__visual">
          <div
            className="hero__video-frame"
            onMouseMove={revealControls}
            onMouseEnter={revealControls}
            onMouseLeave={() => { clearTimeout(hideTimerRef.current); setShowControls(false) }}
            onClick={handleFrameClick}
          >
            <video
              ref={videoRef}
              className="hero__video"
              src="/videos/folding_tent.MP4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />

            <div className={`hero__vc${showControls ? ' hero__vc--visible' : ''}`}>
              <div className="hero__vc-progress" onClick={handleProgressClick}>
                <div className="hero__vc-bar" style={{ width: `${progress}%` }} />
                <div className="hero__vc-thumb" style={{ left: `${progress}%` }} />
              </div>
              <div className="hero__vc-row">
                <div className="hero__vc-left">
                  <button
                    type="button"
                    className="hero__vc-btn"
                    onClick={(e) => seek(e, -10)}
                    aria-label="Reculer 10 secondes"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                    <span className="hero__vc-skip-n">10</span>
                  </button>

                  <button
                    type="button"
                    className="hero__vc-btn hero__vc-btn--play"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Lecture'}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    type="button"
                    className="hero__vc-btn"
                    onClick={(e) => seek(e, 10)}
                    aria-label="Avancer 10 secondes"
                  >
                    <span className="hero__vc-skip-n">10</span>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 5V1l5 5-5 5V7C8.69 7 6 9.69 6 13s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                    </svg>
                  </button>
                </div>

                <span className="hero__vc-time">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
