import { useEffect, useRef, useState } from 'react'
import './Hero.css'

function HeroVideo({ src, poster, onEnded }) {
  const videoRef = useRef(null)
  const frameRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const hideTimerRef = useRef(null)
  const isDragging = useRef(false)
  const progressRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const onEndedRef = useRef(onEnded)
  useEffect(() => { onEndedRef.current = onEnded }, [onEnded])

  const getSeekTime = (clientX) => {
    const el = videoRef.current
    const bar = progressRef.current
    if (!el || !bar) return null
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return ratio * (el.duration || 0)
  }

  useEffect(() => {
    const getX = (e) => e.touches?.[0]?.clientX ?? e.changedTouches?.[0]?.clientX ?? e.clientX
    const onMove = (e) => {
      if (!isDragging.current) return
      if (e.cancelable) e.preventDefault()
      const time = getSeekTime(getX(e))
      if (time !== null) videoRef.current.currentTime = time
    }
    const onUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      setDragging(false)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('touchmove', onMove, { passive: false })
    document.addEventListener('touchend', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend', onUp)
    }
  }, [])

  useEffect(() => {
    const onFsChange = () => {
      const el = document.fullscreenElement || document.webkitFullscreenElement
      setIsFullscreen(Boolean(el && (el === frameRef.current || el === videoRef.current)))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
    }
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    el.muted = true
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
    const onEnded = () => onEndedRef.current?.()

    el.addEventListener('timeupdate', onTimeUpdate)
    el.addEventListener('loadedmetadata', onMetadata)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnded)

    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate)
      el.removeEventListener('loadedmetadata', onMetadata)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnded)
    }
  }, [])

  const revealControls = () => {
    setShowControls(true)
    clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setShowControls(false), 2500)
  }

  const handleFrameClick = (e) => {
    togglePlay(e)
    revealControls()
  }

  const togglePlay = (e) => {
    e?.stopPropagation()
    const el = videoRef.current
    if (!el) return
    if (el.paused) el.play()
    else el.pause()
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    const nextMuted = !isMuted
    el.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const toggleFullscreen = (e) => {
    e.stopPropagation()
    const frame = frameRef.current
    const video = videoRef.current
    if (!frame || !video) return
    const isFs = document.fullscreenElement || document.webkitFullscreenElement
    if (isFs) {
      ;(document.exitFullscreen || document.webkitExitFullscreen).call(document).catch(() => {})
    } else if (frame.requestFullscreen) {
      frame.requestFullscreen().catch(() => {})
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen()
    }
  }

  const seek = (e, seconds) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + seconds))
  }

  const handleProgressStart = (e) => {
    e.stopPropagation()
    isDragging.current = true
    setDragging(true)
    const clientX = e.touches?.[0]?.clientX ?? e.clientX
    const time = getSeekTime(clientX)
    if (time !== null) videoRef.current.currentTime = time
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  }

  return (
    <div
      className={`hero__video-frame ${isPlaying ? 'hero__video-frame--playing' : ''}`}
      ref={frameRef}
      onMouseMove={revealControls}
      onMouseEnter={revealControls}
      onMouseLeave={() => {
        clearTimeout(hideTimerRef.current)
        setShowControls(false)
      }}
      onClick={handleFrameClick}
      onTouchStart={revealControls}
    >
      <video
        ref={videoRef}
        className="hero__video"
        src={src}
        poster={poster}
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
      />

      <div className={`hero__vc${showControls ? ' hero__vc--visible' : ''}`}>
        <div
          className={`hero__vc-progress${dragging ? ' hero__vc-progress--dragging' : ''}`}
          ref={progressRef}
          onMouseDown={handleProgressStart}
          onTouchStart={handleProgressStart}
        >
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
              onClick={toggleMute}
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16.5 12c0-1.77-.77-3.36-2-4.44v8.88c1.23-1.08 2-2.67 2-4.44z" opacity=".3" />
                  <path d="M19 12c0 2.76-1.12 5.26-2.93 7.07l-1.41-1.41A8.96 8.96 0 0 0 17 12c0-1.95-.7-3.74-1.83-5.16L16.5 5.56C18.3 7.12 19 9.47 19 12z" />
                  <path d="M4 9v6h4l5 5V4L8 9H4zm9.5 1.5L11 10.5V13l2.5-1.5z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16.5 12c0-1.77-.77-3.36-2-4.44v8.88c1.23-1.08 2-2.67 2-4.44z" />
                  <path d="M4 9v6h4l5 5V4L8 9H4zm9.5 1.5L11 10.5V13l2.5-1.5z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="hero__vc-btn hero__vc-btn--fullscreen"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Quitter le plein écran' : 'Agrandir'}
            >
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M6 16H4v4h4v-2H6v-2zm0-8h2V6h2V4H4v4h2zm12 8h-2v2h-2v2h4v-4zm-2-8h2V4h-4v2h2v2z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M4 10V4h6V2H2v8h2zm16-8h-6v2h4v4h2V2zm0 16v6h-6v-2h4v-4h2zm-16 6h6v-2H4v-4H2v6h2z" />
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
  )
}

const VIDEOS = [
  {
    src: '/videos/Marine_two_parts.mp4',
    poster: '/images/folding_poster.jpg',
    title: 'Fold the tent using the zipper (easiest way)',
    subtitle: 'Glowby Paris',
  },
  {
    src: '/videos/Marine_full.mp4',
    poster: '/images/folding_poster.jpg',
    title: 'Fold the tent without using the zipper',
    subtitle: 'Glowby Paris',
  },
  {
    src: '/videos/Pink_two_parts.mp4',
    poster: '/images/folding_poster.jpg',
    title: 'Fold the tent using the zipper (easiest way)',
    subtitle: 'Glowby Paris',
  },
  {
    src: '/videos/Pink_Full.mp4',
    poster: '/images/folding_poster.jpg',
    title: 'Fold the tent without using the zipper',
    subtitle: 'Glowby Paris',
  },
]

const CIRCUMFERENCE = 2 * Math.PI * 26

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(null)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (nextIndex === null) return
    if (countdown <= 0) {
      setActiveIndex(nextIndex)
      setNextIndex(null)
      setCountdown(5)
      return
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, nextIndex])

  const handleVideoEnded = () => {
    setNextIndex((activeIndex + 1) % VIDEOS.length)
    setCountdown(5)
  }

  const playNow = () => {
    setActiveIndex(nextIndex)
    setNextIndex(null)
    setCountdown(5)
  }

  const cancelNext = () => {
    setNextIndex(null)
    setCountdown(5)
  }

  const selectVideo = (i) => {
    setActiveIndex(i)
    setNextIndex(null)
    setCountdown(5)
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

      <div className="hero__visual">
        <div className="hero__amazon-layout">
          <div className="hero__amazon-player">
            {nextIndex !== null ? (
              <div className="hero__video-frame">
                <video
                  src={`${VIDEOS[nextIndex].src}#t=0.001`}
                  muted
                  playsInline
                  preload="metadata"
                  className="hero__video"
                />
                <div className="hero__next-overlay">
                  <p className="hero__next-label">Up next</p>
                  <p className="hero__next-title">{VIDEOS[nextIndex].title}</p>
                  <div className="hero__next-countdown">
                    <svg viewBox="0 0 60 60" className="hero__next-ring">
                      <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                      <circle
                        cx="30" cy="30" r="26"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE * (1 - countdown / 5)}
                        transform="rotate(-90 30 30)"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                      />
                    </svg>
                    <span className="hero__next-number">{countdown}</span>
                  </div>
                  <div className="hero__next-actions">
                    <button className="hero__next-btn hero__next-btn--play" onClick={playNow}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play now
                    </button>
                    <button className="hero__next-btn" onClick={cancelNext}>Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <HeroVideo
                key={VIDEOS[activeIndex].src}
                src={VIDEOS[activeIndex].src}
                poster={VIDEOS[activeIndex].poster}
                onEnded={handleVideoEnded}
              />
            )}
          </div>

          <div className="hero__amazon-sidebar">
            <p className="hero__amazon-sidebar-title">Videos for this product</p>
            <ul className="hero__amazon-list">
              {VIDEOS.map((video, i) => (
                <li
                  key={video.src}
                  className={`hero__amazon-item${i === activeIndex ? ' hero__amazon-item--active' : ''}${i === nextIndex ? ' hero__amazon-item--next' : ''}`}
                  onClick={() => selectVideo(i)}
                >
                  <div className="hero__amazon-thumb">
                    <video
                      src={`${video.src}#t=0.001`}
                      muted
                      preload="metadata"
                      className="hero__amazon-thumb-video"
                    />
                    {i === activeIndex ? (
                      <div className="hero__amazon-badge hero__amazon-badge--playing">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="9" height="9">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Now playing
                      </div>
                    ) : (
                      <div className="hero__amazon-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="9" height="9">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="hero__amazon-item-info">
                    <p className="hero__amazon-item-title">{video.title}</p>
                    <p className="hero__amazon-item-sub">{video.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__pill">
            <span className="hero__pill-dot" />
            New · 2026 Edition · 4-in-1 Baby Tent
          </div>

          <h1 className="hero__title">
            Fold It Back In <span className="hero__title-accent">10 Seconds.</span>
          </h1>

          <p className="hero__subtitle">
            The first pop-up baby tent with a built-in <strong>solar fan</strong>,
            a <strong>mini splash pool</strong>, <strong>UPF 50+</strong> protection
            and smart pockets — and the easiest folding system on the market.
            Watch it, do it, done.
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
      </div>
    </section>
  )
}

export default Hero
