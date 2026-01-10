import './Testimonials.css'

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX, USA',
    rating: 5,
    quote:
      "The built-in fan is amazing! My baby stays cool even in the Texas heat. Best purchase ever for our beach trips!",
  },
  {
    name: 'Michael R.',
    location: 'San Diego, CA, USA',
    rating: 5,
    quote:
      "We use it as a mini pool for our toddler and the fan keeps him comfortable. Such a clever design! Highly recommend to all parents.",
  },
  {
    name: 'Jennifer L.',
    location: 'Denver, CO, USA',
    rating: 4,
    quote:
      "The fan feature is a game-changer! My daughter loves playing in it. The only reason for 4 stars is I wish the battery lasted a bit longer.",
  },
  {
    name: 'David K.',
    location: 'Miami, FL, USA',
    rating: 5,
    quote:
      "In Florida's heat, the integrated fan is essential! We fill the bottom with water and our baby has his own little pool with a breeze. Genius!",
  },
  {
    name: 'Emily T.',
    location: 'Seattle, WA, USA',
    rating: 5,
    quote:
      "Perfect for summer days! The fan has 3 speeds and keeps my little one cool. We use the pool feature every weekend. So happy with this purchase!",
  },
  {
    name: 'James W.',
    location: 'Phoenix, AZ, USA',
    rating: 4,
    quote:
      "The fan is super quiet and the pool feature is fantastic! My twins love it. Great quality and easy to clean.",
  },
  {
    name: 'Lisa P.',
    location: 'Los Angeles, CA, USA',
    rating: 5,
    quote:
      "I was skeptical about the fan but it's incredible! The USB-C charging is so convenient. The pool holds water perfectly for splashing fun!",
  },
  {
    name: 'Mark S.',
    location: 'Houston, TX, USA',
    rating: 5,
    quote:
      "Best baby tent on the market! The fan keeps my daughter cool during our backyard playtime. The pool feature is a bonus we use daily!",
  },
  {
    name: 'Amanda C.',
    location: 'Orlando, FL, USA',
    rating: 4,
    quote:
      "Love the fan and pool combo! Perfect for Florida weather. My son spends hours in it. Worth every penny!",
  },
  {
    name: 'Chris B.',
    location: 'Atlanta, GA, USA',
    rating: 5,
    quote:
      "The rechargeable fan is so powerful! We use the pool feature at the beach and in our backyard. Our baby absolutely loves it!",
  },
  {
    name: 'Rachel H.',
    location: 'Dallas, TX, USA',
    rating: 5,
    quote:
      "Finally a tent with a fan! The pool function is amazing for hot days. My toddler asks for it every day. 100% recommend!",
  },
  {
    name: 'Tom N.',
    location: 'Las Vegas, NV, USA',
    rating: 5,
    quote:
      "In Vegas heat, this tent is a lifesaver! The fan works great and the pool keeps my baby entertained for hours. Best gift we received!",
  },
]

function StarRating({ rating }) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? 'star--filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function Testimonials() {
  // Double the testimonials for infinite scroll effect
  const doubledTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <div className="section-title">
          <h2>What Parents Are Saying</h2>
          <p>
            Join thousands of happy families who trust GlowByParis for their
            outdoor adventures.
          </p>
        </div>

        {/* Global Rating */}
        <div className="testimonials__rating">
          <div className="testimonials__rating-score">4.9</div>
          <div className="testimonials__rating-info">
            <div className="testimonials__rating-stars">
              <span className="star star--filled">★</span>
              <span className="star star--filled">★</span>
              <span className="star star--filled">★</span>
              <span className="star star--filled">★</span>
              <span className="star star--filled">★</span>
            </div>
            <div className="testimonials__rating-count">Based on 2,460 reviews</div>
          </div>
        </div>
      </div>

      {/* Infinite Slider */}
      <div className="testimonials__slider">
        <div className="testimonials__track">
          {doubledTestimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <StarRating rating={testimonial.rating} />
              <blockquote className="testimonial-card__quote">
                "{testimonial.quote}"
              </blockquote>
              <div className="testimonial-card__author">
                <span className="testimonial-card__name">{testimonial.name}</span>
                <span className="testimonial-card__location">
                  {testimonial.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
