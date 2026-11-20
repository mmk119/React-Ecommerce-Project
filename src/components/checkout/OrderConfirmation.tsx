import { Link } from 'react-router-dom'
import type { Order } from '../../types'
import OrderSummary from './OrderSummary'

interface OrderConfirmationProps {
  order: Order
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.6 2.6L16.5 9" />
    </svg>
  )
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const { delivery } = order

  return (
    <div className="order-confirmation">
      <section className="checkout-card order-confirmation__hero">
        <span className="order-confirmation__icon">
          <CheckCircleIcon />
        </span>
        <p className="checkout-card__eyebrow">Order confirmed</p>
        <h1>Thank you, {delivery.fullName}! Your order has been placed.</h1>
        <p>
          Your order reference is <strong>{order.reference}</strong>
        </p>
      </section>

      <div className="order-confirmation__grid">
        <OrderSummary
          items={order.items}
          subtotal={order.subtotal}
          deliveryFee={order.deliveryFee}
        />

        <section className="checkout-card delivery-summary" aria-labelledby="delivery-summary-heading">
          <p className="checkout-card__eyebrow">Where it is going</p>
          <h2 id="delivery-summary-heading">Delivery details</h2>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{delivery.fullName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{delivery.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{delivery.phone}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>
                {delivery.address}, {delivery.city}
              </dd>
            </div>
            {delivery.notes && (
              <div>
                <dt>Notes</dt>
                <dd>{delivery.notes}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      <Link className="btn btn--accent order-confirmation__action" to="/products">
        Continue Shopping
      </Link>
    </div>
  )
}
