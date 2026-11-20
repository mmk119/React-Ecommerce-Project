import type { CartItem } from '../../types'
import { formatPrice } from '../../utils/formatPrice'

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  deliveryFee?: number
  title?: string
}

export default function OrderSummary({
  items,
  subtotal,
  deliveryFee = 0,
  title = 'Order summary',
}: OrderSummaryProps) {
  const total = subtotal + deliveryFee

  return (
    <section className="checkout-card order-summary" aria-labelledby="order-summary-heading">
      <div className="order-summary__heading">
        <div>
          <p className="checkout-card__eyebrow">Your selection</p>
          <h2 id="order-summary-heading">{title}</h2>
        </div>
        <span className="order-summary__count">
          {items.reduce((count, item) => count + item.quantity, 0)} items
        </span>
      </div>

      <ul className="order-summary__items">
        {items.map(({ product, quantity }) => (
          <li className="order-summary__item" key={product.id}>
            <div className="order-summary__image-wrap">
              <img src={product.image} alt={product.name} />
              <span aria-label={`Quantity ${quantity}`}>{quantity}</span>
            </div>
            <div className="order-summary__item-details">
              <h3>{product.name}</h3>
              <p>
                {quantity} × {formatPrice(product.price)}
              </p>
            </div>
            <strong>{formatPrice(product.price * quantity)}</strong>
          </li>
        ))}
      </ul>

      <dl className="order-summary__totals">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd className={deliveryFee === 0 ? 'order-summary__free' : undefined}>
            {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
          </dd>
        </div>
        <div className="order-summary__total">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
    </section>
  )
}
