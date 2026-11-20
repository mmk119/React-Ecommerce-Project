import { useState, type FormEvent } from 'react'
import {
  checkoutSchema,
  lebaneseCities,
  type CheckoutFormData,
} from '../../schemas/checkoutSchema'
import './CheckoutForm.css'

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
}

type CheckoutField = keyof CheckoutFormData
type FormValues = Record<CheckoutField, string>
type FormErrors = Partial<Record<CheckoutField, string>>

const initialValues: FormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  notes: '',
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const updateField = (field: CheckoutField, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors

      const nextErrors = { ...currentErrors }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // safeParse keeps validation failures in the form instead of throwing.
    const result = checkoutSchema.safeParse(values)
    if (!result.success) {
      const nextErrors: FormErrors = {}

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as CheckoutField
        if (field && !nextErrors[field]) nextErrors[field] = issue.message
      })

      setErrors(nextErrors)
      return
    }

    setErrors({})
    onSubmit(result.data)
  }

  const fieldErrorProps = (field: CheckoutField) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  return (
    <section className="checkout-card checkout-form-card" aria-labelledby="delivery-heading">
      <div className="checkout-card__heading">
        <span className="checkout-card__step" aria-hidden="true">
          1
        </span>
        <div>
          <p className="checkout-card__eyebrow">Shipping information</p>
          <h2 id="delivery-heading">Delivery details</h2>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <div className="checkout-form__field checkout-form__field--full">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            {...fieldErrorProps('fullName')}
          />
          {errors.fullName && (
            <p className="checkout-form__error" id="fullName-error">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="checkout-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            {...fieldErrorProps('email')}
          />
          {errors.email && (
            <p className="checkout-form__error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="checkout-form__field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 71123456"
            value={values.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            {...fieldErrorProps('phone')}
          />
          {errors.phone && (
            <p className="checkout-form__error" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="checkout-form__field checkout-form__field--full">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder="Building, street and floor"
            value={values.address}
            onChange={(event) => updateField('address', event.target.value)}
            {...fieldErrorProps('address')}
          />
          {errors.address && (
            <p className="checkout-form__error" id="address-error">
              {errors.address}
            </p>
          )}
        </div>

        <div className="checkout-form__field checkout-form__field--full">
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => updateField('city', event.target.value)}
            {...fieldErrorProps('city')}
          >
            <option value="">Select your city</option>
            {lebaneseCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="checkout-form__error" id="city-error">
              {errors.city}
            </p>
          )}
        </div>

        <div className="checkout-form__field checkout-form__field--full">
          <div className="checkout-form__label-row">
            <label htmlFor="notes">Delivery notes</label>
            <span>Optional</span>
          </div>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={200}
            placeholder="Access instructions or a preferred delivery time"
            value={values.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            {...fieldErrorProps('notes')}
          />
          <div className="checkout-form__field-footer">
            {errors.notes ? (
              <p className="checkout-form__error" id="notes-error">
                {errors.notes}
              </p>
            ) : (
              <span />
            )}
            <span className="checkout-form__count">{values.notes.length}/200</span>
          </div>
        </div>

        <button className="btn btn--accent checkout-form__submit" type="submit">
          Place Order
        </button>
      </form>
    </section>
  )
}
