import { Heart, ShoppingCart } from 'lucide-react'
import type { Product } from '../../types'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { getCategoryLabel } from '../../data/products'
import { formatPrice } from '../../utils/formatPrice'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const saved = isInWishlist(product.id)
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />

        {discount > 0 && (
          <>
            <span className="product-card__ribbon">Save {discount}%</span>
            <span className="product-card__badge">Sale</span>
          </>
        )}

        <button
          className={`product-card__wish ${saved ? 'product-card__wish--active' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={saved}
        >
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{getCategoryLabel(product.category)}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">
          <span className="product-card__price-now">{formatPrice(product.price)}</span>
          {product.oldPrice && <s className="product-card__price-old">{formatPrice(product.oldPrice)}</s>}
        </p>
        <button className="btn btn--dark product-card__cart" onClick={() => addToCart(product)}>
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </article>
  )
}
