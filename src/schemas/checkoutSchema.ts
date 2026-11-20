import { z } from 'zod'

export const lebaneseCities = [
  'Beirut',
  'Tripoli',
  'Sidon',
  'Tyre',
  'Jounieh',
  'Zahle',
  'Byblos',
  'Baalbek',
  'Nabatieh',
  'Aley',
] as const

const phonePattern = /^(?:\+961|0)?\d{7,8}$/

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(3, 'Please enter your full name'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, 'Please enter a valid phone number'),
  address: z
    .string()
    .trim()
    .min(5, 'Please enter your delivery address'),
  city: z.enum(lebaneseCities, { error: 'Please select a city' }),
  notes: z
    .string()
    .trim()
    .max(200, 'Notes must be 200 characters or fewer')
    .optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
