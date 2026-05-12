import { useRef, useState, useEffect } from 'react'
import './TentSection.css'

const videos = [
  {
    src: '/videos/folding_tent.mp4',
    title: 'How To Fold The Tent',
    subtitle: 'Fold it back into its compact carry bag in under 10 seconds.',
    duration: 'Fold',
    poster: '/images/folding_poster.jpg',
  },
  {
    src: '/videos/presentation.mov',
    title: 'Product Presentation',
    subtitle: 'A full walk-through of the GlowByParis baby tent and its innovations.',
    duration: 'Overview',
    poster: '/images/presentation_poster.jpg',
  },
  {
    src: '/videos/insert_fan.MP4',
    title: 'How To Insert The Fan',
    subtitle: 'Click the solar fan into place in one easy motion.',
    duration: 'Setup',
    poster: '/images/insert_fan_poster.jpg',
  },
  {
    src: '/videos/close_window.MP4',
    title: 'How To Close The Window',
    subtitle: 'Close the rear window for nap time or breezy weather.',
    duration: 'Window',
    poster: '/images/close_window_poster.jpg',
  },
]

const galleryImages = [
  { src: '/images/2.png', alt: 'Baby playing inside the GlowByParis beach tent with fan and mini pool' },
  { src: '/images/6.png', alt: 'Play time and nap time mode of the GlowByParis tent' },
  { src: '/images/12.png', alt: 'UPF 50+ UV protection shielding baby from the sun' },
  { src: '/images/11.jpg', alt: 'Baby splashing in the mini pool with beach tools in side pockets' },
  { src: '/images/1.png', alt: '1 second pop-up design — lightweight and easy to carry' },
  { src: '/images/13.png', alt: 'Full packing list — tent, solar fan, charging cable and pegs' },
]

function VideoCard({ video, index }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play()
      setIsPlaying(true)
    } else {
      el.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    const nextMuted = !isMuted
    el.muted = nextMuted
    setIsMuted(nextMuted)
  }

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const onEnd = () => setIsPlaying(false)
    el.addEventListener('ended', onEnd)
    return () => el.removeEventListener('ended', onEnd)
  }, [])

  return (
    <div className={`video-card ${isPlaying ? 'video-card--playing' : ''}`}>
      <div className="video-card__media" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="video-card__video"
          poster={video.poster}
          playsInline
          preload="metadata"
          muted={isMuted}
        >
          <source src={video.src} />
          Your browser does not support the video tag.
        </video>

        <button
          className="video-card__play"
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          className="video-card__mute"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          type="button"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        <span className="video-card__chip">
          Ch. 0{index + 1} · {video.duration}
        </span>
      </div>

      <div className="video-card__body">
        <h3 className="video-card__title">{video.title}</h3>
        <p className="video-card__subtitle">{video.subtitle}</p>
      </div>
    </div>
  )
}

function TentSection() {
  return (
    <>
      {/* Video showcase */}
      <section id="videos" className="videos section">
        <div className="container">
          <div className="videos__header">
            <span className="videos__eyebrow">See It In Action</span>
            <h2 className="videos__title">
              Set-Up in <span className="gradient-text">Seconds.</span>
            </h2>
            <p className="videos__subtitle">
              Watch how effortless it is to pop open the tent, insert the solar fan,
              close the window for a nap, and fold everything back in under 10 seconds.
            </p>
          </div>

          <div className="videos__grid">
            {videos.map((video, index) => (
              <VideoCard key={video.src} video={video} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="tent" className="gallery section">
        <div className="container">
          <div className="gallery__header">
            <span className="gallery__eyebrow">Gallery</span>
            <h2 className="gallery__title">
              Built For <span className="gradient-text">Real Adventures.</span>
            </h2>
            <p className="gallery__subtitle">
              From beach days to backyard naps — see why parents everywhere love
              GlowByParis.
            </p>
          </div>

          <div className="gallery__grid">
            {galleryImages.map((image, index) => (
              <figure
                key={index}
                className={`gallery__item gallery__item--${index + 1}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption className="gallery__caption">{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TentSection
