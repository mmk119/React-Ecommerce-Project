import type { Category } from '../types'
import { unsplash } from '../utils/image'

// Brand: change the store name in one place
export const STORE_NAME = 'Dar Living'
export const STORE_TAGLINE = 'Home & Living'

export interface HeroSlide {
  image: string
  eyebrow: string
  title: string
  highlight: string
  text: string
  cta: string
  link: string
}

export const heroSlides: HeroSlide[] = [
  {
    image: unsplash('1729811985748-9e248b1517d8', 1920),
    eyebrow: 'Winter Collection',
    title: 'Warm Up',
    highlight: 'Your Home',
    text: 'Up to 30% off sofas, sectionals and armchairs.',
    cta: 'Shop Living Rooms',
    link: '/products?category=living-room',
  },
  {
    image: unsplash('1765862835193-3c37388a409e', 1920),
    eyebrow: 'New Season',
    title: 'Sleep in',
    highlight: 'Pure Comfort',
    text: 'Beds and bedroom sets designed for better nights.',
    cta: 'Shop Bedrooms',
    link: '/products?category=bedroom',
  },
  {
    image: unsplash('1773578978637-c9771e7a9913', 1920),
    eyebrow: 'Free Delivery',
    title: 'Gather Around',
    highlight: 'The Table',
    text: 'Dining sets for every family size, delivered free.',
    cta: 'Shop Dining',
    link: '/products?category=dining',
  },
]

export interface CollectionBanner {
  title: string
  image: string
  category: Category
}

export const collectionBanners: CollectionBanner[] = [
  { title: 'Carpet Collection', image: unsplash('1572123979839-3749e9973aba', 1200), category: 'carpets' },
  { title: 'Living Rooms', image: unsplash('1653340513561-3ef95d9e4d94', 1200), category: 'living-room' },
]

export const welcomeCircles = [
  { label: 'Modern', image: unsplash('1771287490608-adf31ca18f6e', 400), category: 'living-room' },
  { label: 'Classic', image: unsplash('1767159601823-96d0295344ce', 400), category: 'carpets' },
  { label: 'Outdoor', image: unsplash('1769502963760-ea942f2d1fe7', 400), category: 'outdoor' },
] satisfies { label: string; image: string; category: Category }[]

export const stats = [
  { value: '30+', label: 'Handpicked Products' },
  { value: '6', label: 'Home Collections' },
  { value: '2 Years', label: 'Warranty on Furniture' },
  { value: '48h', label: 'Delivery in Beirut' },
]

export interface Article {
  date: { day: string; month: string }
  title: string
  excerpt: string
  image: string
  category: Category
}

export const articles: Article[] = [
  {
    date: { day: '12', month: 'Nov' },
    title: 'Creating an Outdoor Space You Will Use All Year',
    excerpt: 'Weather-proof materials, layered lighting and a few cushions turn any balcony into a second living room.',
    image: unsplash('1766603636772-52b1273c655d', 800),
    category: 'outdoor',
  },
  {
    date: { day: '28', month: 'Oct' },
    title: 'How to Choose the Right Dining Table Size',
    excerpt: 'Leave at least 90 cm around the table and plan 60 cm of width per guest. Here is how to measure.',
    image: unsplash('1636138388621-258a72ecb07e', 800),
    category: 'dining',
  },
  {
    date: { day: '09', month: 'Oct' },
    title: 'Neutral Bedrooms: Calm Colours for Better Sleep',
    excerpt: 'Soft beige, warm white and natural wood create a bedroom that helps you switch off at night.',
    image: unsplash('1750420556288-d0e32a6f517b', 800),
    category: 'bedroom',
  },
]
