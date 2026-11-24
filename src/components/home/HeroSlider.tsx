import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides } from '../../data/site'

const SLIDE_DURATION = 6000

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const count = heroSlides.length

  // Auto-advance; restarts the timer whenever the slide changes (also after a manual click)
  useEffect(() => {
    const timer = setTimeout(() => setIndex((current) => (current + 1) % count), SLIDE_DURATION)
    return () => clearTimeout(timer)
  }, [index, count])

  const goTo = (next: number) => setIndex((next + count) % count)

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Promotions">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.title}
          className={`hero__slide ${i === index ? 'hero__slide--active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={i !== index}
        >
          <div className="hero__content container">
            <p className="hero__eyebrow">{slide.eyebrow}</p>
            <h1 className="hero__title">
              {slide.title} <span>{slide.highlight}</span>
            </h1>
            <p className="hero__text">{slide.text}</p>
            <Link to={slide.link} className="btn btn--accent hero__cta" tabIndex={i === index ? 0 : -1}>
              {slide.cta} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      ))}

      <button className="hero__arrow hero__arrow--prev" onClick={() => goTo(index - 1)} aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={() => goTo(index + 1)} aria-label="Next slide">
        <ChevronRight size={22} />
      </button>

      <div className="hero__progress">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.title}
            className={`hero__dot ${i === index ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
