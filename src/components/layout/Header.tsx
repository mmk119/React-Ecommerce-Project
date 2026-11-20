import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingCart, Truck, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { categories } from '../../data/products'
import { STORE_NAME, STORE_TAGLINE } from '../../data/site'
import './Header.css'

export default function Header() {
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  // Header turns solid once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent only at the top of the home page, over the hero image
  const transparent = pathname === '/' && !scrolled && !menuOpen && !searchOpen

  function closeMenus() {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault()
    const term = query.trim()
    closeMenus()
    navigate(term ? `/products?search=${encodeURIComponent(term)}` : '/products')
  }

  return (
    <header className={`header ${transparent ? 'header--transparent' : ''}`}>
      <div className="header__top container">
        <div className="header__left">
          <button
            className="header__menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="header__delivery">
            <Truck size={18} /> Free delivery across Lebanon
          </span>
        </div>

        <Link to="/" className="header__logo" onClick={closeMenus}>
          <span className="header__logo-name">{STORE_NAME}</span>
          <span className="header__logo-tagline">{STORE_TAGLINE}</span>
        </Link>

        <div className="header__actions">
          <button className="header__action" onClick={() => setSearchOpen((open) => !open)}>
            <Search size={24} />
            <span className="header__action-label">Search</span>
          </button>
          <Link to="/wishlist" className="header__action" onClick={closeMenus}>
            <span className="header__icon-wrap">
              <Heart size={24} />
              <span className="header__badge" aria-label={`${wishlistCount} items in wishlist`}>
                {wishlistCount}
              </span>
            </span>
            <span className="header__action-label">Wishlist</span>
          </Link>
          <Link to="/cart" className="header__action" onClick={closeMenus}>
            <span className="header__icon-wrap">
              <ShoppingCart size={24} />
              <span className="header__badge" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            </span>
            <span className="header__action-label">Cart</span>
          </Link>
        </div>
      </div>

      <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`} aria-label="Main navigation">
        <div className="header__nav-inner container">
          <NavLink to="/" end onClick={closeMenus}>
            Home
          </NavLink>
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${category.id}`} onClick={closeMenus}>
              {category.label}
            </Link>
          ))}
          <NavLink to="/products" onClick={closeMenus} className="header__shop-all">
            Shop All <span className="header__pill">Sale</span>
          </NavLink>
        </div>
      </nav>

      {searchOpen && (
        <form className="header__search container" onSubmit={handleSearch} role="search">
          <label htmlFor="header-search" className="visually-hidden">
            Search products
          </label>
          <input
            id="header-search"
            type="search"
            placeholder="Search here..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn--accent">
            <Search size={18} /> Search
          </button>
        </form>
      )}
    </header>
  )
}
