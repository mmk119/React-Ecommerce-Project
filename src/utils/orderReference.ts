export function generateOrderReference(): string {
  const today = new Date()
  const date = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('')
  const randomDigits = Math.floor(Math.random() * 10_000)
    .toString()
    .padStart(4, '0')

  return `DL-${date}-${randomDigits}`
}
