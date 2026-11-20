import { Link } from 'react-router-dom'
import { Headphones, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { STORE_NAME, welcomeCircles } from '../../data/site'

const features = [
  { icon: Truck, title: 'Free Delivery', text: 'Across all of Lebanon' },
  { icon: ShieldCheck, title: '2-Year Warranty', text: 'On every furniture piece' },
  { icon: Wrench, title: 'After-Sales Service', text: 'Assembly and repairs' },
  { icon: Headphones, title: 'Customer Support', text: 'Here 7 days a week' },
]

export default function WelcomeSection() {
  return (
    <>
      <section className="section section--soft welcome">
        <div className="container">
          <h2 className="section-title">Welcome To {STORE_NAME}</h2>
          <p className="section-subtitle">
            Furniture, carpets and décor for every room of your home, chosen for comfort and built to last.
          </p>
          <div className="welcome__circles">
            {welcomeCircles.map((circle) => (
              <Link key={circle.label} to={`/products?category=${circle.category}`} className="welcome__circle">
                <img src={circle.image} alt="" loading="lazy" />
                <span>{circle.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__grid container">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="feature">
              <span className="feature__icon">
                <Icon size={30} strokeWidth={1.5} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
