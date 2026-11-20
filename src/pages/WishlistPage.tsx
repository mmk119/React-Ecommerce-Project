import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { getCategoryLabel } from '../data/products'
import { formatPrice } from '../utils/formatPrice'
import '../components/product/ProductCard.css'
import './WishlistPage.css'

export default function WishlistPage() {
  const { items, wishlistCount, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <section className="section section--soft wishlist-page" aria-labelledby="wishlist-title">
      <div className="container">
        <h1 className="section-title" id="wishlist-title">My Wishlist</h1>
        <p className="wishlist-page__count">{wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}</p>

        {items.length === 0 ? (
          <div className="wishlist-page__empty">
            <Heart size={40} aria-hidden="true" />
            <h2>Your wishlist is empty</h2>
            <Link className="btn btn--accent" to="/products">Start Shopping</Link>
          </div>
        ) : (
          <div className="wishlist-page__grid">
            {items.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-card__media">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <button
                    className="product-card__wish"
                    type="button"
                    aria-label={`Remove ${product.name} from wishlist`}
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
                <div className="product-card__body">
                  <p className="product-card__category">{getCategoryLabel(product.category)}</p>
                  <h2 className="product-card__name">{product.name}</h2>
                  <p className="product-card__price">
                    <span className="product-card__price-now">{formatPrice(product.price)}</span>
                    {product.oldPrice !== undefined && (
                      <s className="product-card__price-old">{formatPrice(product.oldPrice)}</s>
                    )}
                  </p>
                  <button
                    className="btn btn--dark product-card__cart"
                    type="button"
                    onClick={() => {
                      addToCart(product)
                      removeFromWishlist(product.id)
                    }}
                  >
                    <ShoppingCart size={16} aria-hidden="true" /> Move to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
