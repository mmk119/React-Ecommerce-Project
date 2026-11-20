import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getCategoryLabel } from '../data/products'
import { formatPrice } from '../utils/formatPrice'
import './CartPage.css'

export default function CartPage() {
  const { items, cartCount, subtotal, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

  return (
    <section className="section section--soft cart-page" aria-labelledby="cart-title">
      <div className="container">
        <h1 className="section-title" id="cart-title">Shopping Cart</h1>
        <p className="cart-page__count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>

        {items.length === 0 ? (
          <div className="cart-page__empty">
            <ShoppingCart size={40} aria-hidden="true" />
            <h2>Your cart is empty</h2>
            <Link className="btn btn--accent" to="/products">Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-page__layout">
            <div>
              <ul className="cart-page__items" aria-label="Cart items">
                {items.map(({ product, quantity }) => (
                  <li className="cart-page__item" key={product.id}>
                    <div className="cart-page__product">
                      <img src={product.image} alt="" loading="lazy" />
                      <div>
                        <h2>{product.name}</h2>
                        <p>{getCategoryLabel(product.category)}</p>
                        <p>{formatPrice(product.price)} each</p>
                      </div>
                    </div>
                    <div className="cart-page__quantity" role="group" aria-label={`Quantity for ${product.name}`}>
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        disabled={quantity === 1}
                        onClick={() => decreaseQuantity(product.id)}
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <output aria-label={`Quantity of ${product.name}`}>{quantity}</output>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => increaseQuantity(product.id)}
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <strong className="cart-page__line-total">{formatPrice(product.price * quantity)}</strong>
                    <button
                      className="cart-page__remove"
                      type="button"
                      aria-label={`Remove ${product.name} from cart`}
                      onClick={() => removeFromCart(product.id)}
                    >
                      <Trash2 size={18} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-page__actions">
                <Link className="btn btn--dark" to="/products">Continue Shopping</Link>
                <button className="btn btn--muted" type="button" onClick={clearCart}>Clear cart</button>
              </div>
            </div>
            <aside className="cart-page__summary" aria-labelledby="cart-summary-title">
              <h2 id="cart-summary-title">Order Summary</h2>
              <dl>
                <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div><dt>Delivery</dt><dd>Free</dd></div>
                <div className="cart-page__total"><dt>Total</dt><dd>{formatPrice(subtotal)}</dd></div>
              </dl>
              <Link className="btn btn--accent" to="/checkout">
                Proceed to Checkout <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
