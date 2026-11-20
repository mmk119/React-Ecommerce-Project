import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CheckoutForm from '../components/checkout/CheckoutForm'
import CheckoutPage from '../pages/CheckoutPage'
import { renderWithProviders } from './test-utils'

describe('CheckoutForm validation', () => {
  it('shows required field errors and does not submit an empty form', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Place Order' }))

    expect(screen.getByText('Please enter your full name')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument()
    expect(screen.getByText('Please enter your delivery address')).toBeInTheDocument()
    expect(screen.getByText('Please select a city')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows errors for an invalid email and phone number', async () => {
    const user = userEvent.setup()
    render(<CheckoutForm onSubmit={vi.fn()} />)

    await user.type(screen.getByLabelText('Email'), 'jeneen@invalid')
    await user.type(screen.getByLabelText('Phone'), '123')
    await user.click(screen.getByRole('button', { name: 'Place Order' }))

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument()
  })

  it('submits trimmed valid delivery information once', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CheckoutForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Full name'), '  Jeneen Abolaila  ')
    await user.type(screen.getByLabelText('Email'), '  jeneen@example.com  ')
    await user.type(screen.getByLabelText('Phone'), '71123456')
    await user.type(screen.getByLabelText('Address'), '  Hamra Street, Building 4  ')
    await user.selectOptions(screen.getByLabelText('City'), 'Beirut')
    await user.type(screen.getByLabelText('Delivery notes'), '  Call on arrival  ')
    await user.click(screen.getByRole('button', { name: 'Place Order' }))

    expect(screen.queryByText('Please enter your full name')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
    expect(screen.queryByText('Please enter a valid phone number')).not.toBeInTheDocument()
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      fullName: 'Jeneen Abolaila',
      email: 'jeneen@example.com',
      phone: '71123456',
      address: 'Hamra Street, Building 4',
      city: 'Beirut',
      notes: 'Call on arrival',
    })
  })
})

describe('CheckoutPage', () => {
  it('blocks checkout when the cart is empty', () => {
    renderWithProviders(<CheckoutPage />, '/checkout')

    expect(
      screen.getByText('Your cart is empty, add products before checking out'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Place Order' })).not.toBeInTheDocument()
  })
})
