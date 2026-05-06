import './FanFeature.css'

const innovations = [
  {
    id: 'fan',
    eyebrow: 'Exclusive · Patented',
    title: 'Solar + USB-C Rechargeable Fan',
    description:
      "The world's first pop-up baby tent with an integrated solar fan. Three speeds, whisper-quiet motor, and a digital battery display. Always cool — even during the longest beach days.",
    bullets: [
      'Solar panel charges while you play',
      'USB-C backup for cloudy days',
      '3 speeds · silent operation',
      'Digital battery indicator',
    ],
    image: '/images/15.png',
    align: 'right',
  },
  {
    id: 'pool',
    eyebrow: 'Splash & Play',
    title: 'Built-in Mini Splash Pool',
    description:
      'Dig a small hole in the sand, fill with water, and instantly turn the tent floor into a safe, shaded baby pool. Let your little one splash and play — shielded from the sun and bugs.',
    bullets: [
      'Watertight sealed pool floor',
      'Use at beach or in the yard',
      'Shaded from harmful UV rays',
      'Drains and folds dry in seconds',
    ],
    image: '/images/11.jpg',
    align: 'left',
  },
  {
    id: 'uv',
    eyebrow: 'Safety First',
    title: 'UPF 50+ — Blocks 98% of UV Rays',
    description:
      'Premium UPF 50+ certified fabric keeps your baby protected from harmful UV rays. Breathable mesh, fine enough to keep bugs out while letting fresh air flow in.',
    bullets: [
      'Certified UPF 50+ fabric',
      'Blocks 98% of UVA/UVB',
      'Breathable anti-bug mesh',
      'Water-resistant coating',
    ],
    image: '/images/12.png',
    align: 'right',
  },
  {
    id: 'popup',
    eyebrow: '1-Second Setup',
    title: 'Pop-Up & Fold Away',
    description:
      'No poles, no struggle. Toss it in the air and it opens in exactly one second. Twist, fold and it packs flat into its own carry bag — lighter than a diaper bag.',
    bullets: [
      '1-second instant pop-up',
      'Folds in under 10 seconds',
      'Compact carry bag included',
      'Lightweight & travel-ready',
    ],
    image: '/images/5.png',
    align: 'left',
  },
  {
    id: 'pockets',
    eyebrow: 'Smart Storage',
    title: 'Interior Pockets & Pop-Open Window',
    description:
      'Built-in storage pockets keep toys, sunscreen and beach tools tidy. The roll-up rear window gives you airflow and visibility — closes instantly for naps.',
    bullets: [
      'Multiple interior pockets',
      'Roll-up rear window',
      'Zippered front door',
      'Dark-mode for cozy naps',
    ],
    image: '/images/3.png',
    align: 'right',
  },
  {
    id: 'windproof',
    eyebrow: 'All-Weather Ready',
    title: 'Windproof · 4 Reinforced Pegs',
    description:
      'Stays firmly in place, even on breezy beach days. Four heavy-duty sand pegs and reinforced straps anchor the tent securely so you can focus on what matters.',
    bullets: [
      '4 reinforced anchor pegs',
      'Storm-resistant straps',
      'Stable on sand & grass',
      'Reliable in strong breeze',
    ],
    image: '/images/14.png',
    align: 'left',
  },
]

function FanFeature() {
  return (
    <section id="innovation" className="innovation section">
      <div className="container">
        <div className="innovation__header">
          <span className="innovation__eyebrow">The 4-in-1 Innovation</span>
          <h2 className="innovation__title">
            One Tent.{' '}
            <span className="gradient-text">Every Parenting Problem, Solved.</span>
          </h2>
          <p className="innovation__subtitle">
            We rethought the baby beach tent from the ground up. Six thoughtful
            innovations designed to keep your baby cool, safe and happy — wherever
            the day takes you.
          </p>
        </div>

        <div className="innovation__list">
          {innovations.map((item, index) => (
            <article
              key={item.id}
              className={`innovation__row innovation__row--${item.align}`}
            >
              <div className="innovation__media">
                <div className="innovation__media-frame">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <span className="innovation__media-number">
                  0{index + 1}
                </span>
              </div>

              <div className="innovation__body">
                <span className="innovation__eyebrow-small">{item.eyebrow}</span>
                <h3 className="innovation__row-title">{item.title}</h3>
                <p className="innovation__row-text">{item.description}</p>
                <ul className="innovation__bullets">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="innovation__bullet">
                      <svg
                        className="innovation__check"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline
                          points="20 6 9 17 4 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FanFeature
