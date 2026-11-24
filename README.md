# Dar Living: React + TypeScript E-Commerce Website

**Dar Living** ("Home & Living") is a responsive online furniture store built with React and TypeScript. Visitors can browse furniture, carpets and outdoor pieces, search and filter the catalogue, save favourites to a wishlist, manage a shopping cart and complete a simulated checkout.

The whole application runs in the browser: there is no backend, database, login or real payment. Products are stored in a TypeScript file, and the cart and wishlist are saved in `localStorage` so they survive a page refresh.

## Features

- [x] **Home page:** header with logo, category menu, search and live cart / wishlist counts; promotional hero slider; product categories; featured products (Offers, Best Sellers, New Arrivals); collection banners; footer
- [x] **Products page:** responsive product grid; search by name; filter by category and price range; sort by price (low to high / high to low); "no products match" message; add to cart and add / remove from wishlist on every card
- [x] **Shopping cart:** increase / decrease quantities, remove items, clear the cart, automatic subtotal and total, empty-cart message, Continue Shopping and Proceed to Checkout buttons, saved after refresh
- [x] **Wishlist:** add and remove products, no duplicates, move products to the cart, empty-wishlist message, saved after refresh, no account needed
- [x] **Checkout:** delivery form validated with Zod, errors shown next to each field, checkout blocked when the cart is empty, order confirmation with a generated order reference and order summary; the cart is cleared and the wishlist is kept
- [x] **Responsive design:** desktop, tablet and mobile (hamburger menu, stacked layouts)
- [x] **404 page** for unknown URLs

## Technologies

| Technology | Used for |
|---|---|
| React 19 + TypeScript | Components and type-safe code |
| Vite | Development server and production build |
| React Router 7 | Navigation between all pages, URL search parameters for product filters |
| Context API + custom hooks | Shared cart and wishlist state (`useCart`, `useWishlist`, `useLocalStorage`) |
| Reducer function | Cart updates (add, remove, increase, decrease, clear) |
| localStorage | Keeping the cart and wishlist after a refresh |
| Zod | Checkout form validation |
| lucide-react | Icons |
| Vitest + React Testing Library | Automated tests |

## Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/mmk119/React-Ecommerce-Project.git
cd React-Ecommerce-Project
npm install
npm run dev
```

Open the link printed in the terminal (usually http://localhost:5173). Product photos load from Unsplash, so an internet connection is needed to see the images.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm test` | Run the automated tests in watch mode (`npm test -- --run` to run once) |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |

## Automated tests

All tests are in `src/tests/` and pass with `npm test -- --run`.

| Test file | What it checks |
|---|---|
| `productFiltering.test.tsx` | **Required test 1:** searching, category and price filters, and sorting return the expected products |
| `cart.test.tsx` | **Required test 2:** adding a product updates the cart, quantities and totals correctly, and the cart is restored after a remount |
| `checkoutValidation.test.tsx` | **Required test 3:** submitting an invalid checkout form shows the right errors, and checkout is blocked when the cart is empty |
| `wishlist.test.tsx` | Wishlist toggling, no duplicates, move to cart |
| `productCategories.test.tsx` | Category navigation and header search combined with filters |
| `App.test.tsx` | Home page and 404 routing |

## Team

| Member | Contributions |
|---|---|
| Mohammad Kassem | Project setup and shared TypeScript types, Home page (hero, categories, featured products, banners), Header, Footer, product card, product catalogue, global design |
| Louay Abou Merhi | Shopping cart and wishlist (context, reducer, `useLocalStorage`), Cart page, Wishlist page, catalog category and search updates |
| Jeneen Abou Laila | Checkout page (form, Zod validation, order summary, confirmation, order reference), Products page (search, filters, sorting) and the product filtering test |

## Project structure

```
src/
├── components/
│   ├── checkout/      CheckoutForm, OrderSummary, OrderConfirmation
│   ├── home/          Home page sections (hero, categories, featured products, …)
│   ├── layout/        Header, Footer, Layout, BackToTop
│   └── product/       ProductCard, ProductGrid
├── context/           CartContext, WishlistContext
├── data/              products.ts (catalogue), site.ts (home page content)
├── hooks/             useLocalStorage
├── pages/             Home, Products, Cart, Wishlist, Checkout, NotFound
├── schemas/           checkoutSchema (Zod)
├── tests/             test setup and automated tests
├── types/             shared TypeScript types
└── utils/             formatPrice, filterProducts, orderReference, image
```

## Git workflow

- `main`: final, stable version (no direct pushes)
- `dev`: integration branch
- `feature/mohammad`, `feature/louay`, `feature/JeneenBranch`: one branch per developer, merged into `dev` through pull requests reviewed by a teammate

## Credits

Product and interior photos from [Unsplash](https://unsplash.com), used under the [Unsplash License](https://unsplash.com/license). The design is inspired by furniture retail websites; the store name, branding, products and text are our own.
