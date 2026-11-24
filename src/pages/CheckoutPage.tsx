import { useState } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from '../components/checkout/CheckoutForm'
import OrderConfirmation from '../components/checkout/OrderConfirmation'
import OrderSummary from '../components/checkout/OrderSummary'
import { useCart } from '../context/CartContext'
import type { CheckoutFormData } from '../schemas/checkoutSchema'
import type { Order } from '../types'
import { generateOrderReference } from '../utils/orderReference'
import './CheckoutPage.css'

function ShoppingBagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)

  const placeOrder = (delivery: CheckoutFormData) => {
    // Capture an independent order snapshot before clearCart removes the live cart.
    const orderItems = items.map(({ product, quantity }) => ({
      product: { ...product },
      quantity,
    }))
    const deliveryFee = 0
    const order: Order = {
      reference: generateOrderReference(),
      items: orderItems,
      delivery,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      createdAt: new Date().toISOString(),
    }

    setPlacedOrder(order)
    clearCart()
  }

  if (placedOrder) {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__container">
          <OrderConfirmation order={placedOrder} />
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container checkout-page__container">
          <section className="checkout-card empty-checkout">
            <span className="empty-checkout__icon">
              <ShoppingBagIcon />
            </span>
            <p className="checkout-card__eyebrow">Nothing to review yet</p>
            <h1>Your cart is empty</h1>
            <p>Your cart is empty, add products before checking out</p>
            <Link className="btn btn--accent empty-checkout__action" to="/products">
              Browse Products
            </Link>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-page__container">
        <header className="checkout-page__header">
          <p className="checkout-card__eyebrow">Secure checkout</p>
          <h1>Complete your order</h1>
          <p>Enter your delivery information and review your items.</p>
        </header>

        <div className="checkout-page__layout">
          <CheckoutForm onSubmit={placeOrder} />
          <aside className="checkout-page__summary">
            <OrderSummary items={items} subtotal={subtotal} />
            <p className="checkout-page__delivery-note">
              Free delivery across Lebanon
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
