import { Link } from 'react-router-dom'
import { Banknote, Mail, MapPin, Phone } from 'lucide-react'
import { categories } from '../../data/products'
import { STORE_NAME } from '../../data/site'
import './Footer.css'

// Clicking a link to the page you are already on does not trigger a new navigation,
// so scroll up here too; otherwise the user stays at the footer and sees no change.
const scrollToTop = () => window.scrollTo({ top: 0 })

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main container">
        <div className="footer__col">
          <h3>Shop</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link onClick={scrollToTop} to={`/products?category=${category.id}`}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>My Shopping</h3>
          <ul>
            <li>
              <Link onClick={scrollToTop} to="/products">All Products</Link>
            </li>
            <li>
              <Link onClick={scrollToTop} to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link onClick={scrollToTop} to="/cart">Shopping Cart</Link>
            </li>
            <li>
              <Link onClick={scrollToTop} to="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Contact</h3>
          <ul className="footer__contact">
            <li>
              <MapPin size={16} /> Beirut, Lebanon
            </li>
            <li>
              <Phone size={16} /> +961 1 000 000
            </li>
            <li>
              <Mail size={16} /> hello@darliving.example
            </li>
          </ul>
        </div>

        <div className="footer__col footer__col--social">
          <h3>Social media</h3>
          <div className="footer__social">
            <a href="#" aria-label="Facebook" className="footer__social-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="footer__social-link">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="X" className="footer__social-link">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner container">
          <p>
            Copyright © {new Date().getFullYear()}, {STORE_NAME}. All Rights Reserved.
          </p>
          <p className="footer__payment">
            <Banknote size={20} /> Cash on Delivery
          </p>
        </div>
      </div>
    </footer>
  )
}
