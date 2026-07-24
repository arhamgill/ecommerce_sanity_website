# Full-Stack E-Commerce Platform with Next.js 15, Sanity Studio & Stripe

A modern, high-performance full-stack e-commerce application built with **Next.js 15 (App Router)**, **React 19**, **Sanity CMS v3**, **Stripe Payments**, **Clerk Authentication**, and **Zustand**. 

This platform features real-time live content updates from Sanity CMS, an embedded Sanity Studio for full content management, automated order handling via Stripe Webhooks, Clerk user authentication, persistent shopping cart state, and responsive UI components styled with Tailwind CSS v4 and Framer Motion.

---

## Key Features

### 1. Embedded Sanity Studio (`/studio`)
- Integrated Sanity Studio accessible directly at `/studio` within the Next.js application.
- Complete content lifecycle management for products, product categories, order records, and promotional sales banners.
- Custom workspace structure configured with custom document groupings for streamlined store management.

### 2. Sanity Live Editing & Real-Time Content Updates
- Powered by `next-sanity/live` and Sanity Live Content API (`sanityFetch` and `<SanityLive />`).
- **Instant Preview & Live Editing**: Price updates, product additions, stock changes, and promotional banners modified in Sanity Studio reflect instantly on the live storefront without manual page refreshes or re-builds.

### 3. Stripe Integration & Checkout Server Actions
- Secure checkout workflows using the **Stripe Checkout API** powered by Next.js Server Actions (`createCheckoutSession`).
- Supports multi-item cart purchases, price verification, currency formatting (USD), promotional discount codes, and user metadata tracking (Clerk user ID, order number, customer email).

### 4. Automated Stripe Webhook Order Handling (`/webhook`)
- Dedicated API endpoint listening for `checkout.session.completed` webhook events from Stripe.
- Automatically creates persistent, structured order documents in Sanity CMS (`orderType`) complete with item references, total pricing, discount amounts, payment intent IDs, and order status tracking (`pending`, `paid`, `shipped`).

### 5. Clerk Authentication & Customer Profiles
- Authentication managed via **Clerk** (`@clerk/nextjs`) supporting social logins and email/password access.
- User profile integration attached to shopping sessions and order records.

### 6. Customer Order History (`/orders`)
- Dedicated customer order portal displaying previous purchases.
- Queries Sanity CMS in real-time for orders matching the authenticated user's Clerk ID.
- Displays order status, item line breakdowns with images, transaction reference codes, dates, and discounts applied.

### 7. Persistent Zustand Shopping Cart
- Client-side shopping basket state managed via **Zustand** with local storage persistence (`persist`).
- Add to cart, remove items, adjust quantities, calculate sub-totals dynamically, and preserve items across page reloads.

### 8. Dynamic Search & Category Filtering
- Instant server-side search page (`/search?query=...`) filtering products by title and description.
- Interactive category selector component (`CategorySelector`) for quick product filtering by category slugs (`/category/[slug]`).

### 9. Dynamic Promotional & Sales Banner System
- Sanity-backed sales engine (`salesType`) supporting custom coupon codes, discount percentages, titles, and descriptions.
- Reactive promotional banner component (`BlackFridayBanner`) that automatically renders active promotions on the store home page.

---

## Tech Stack

| Domain | Technology / Library |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/) |
| **Content Management** | [Sanity CMS v3](https://www.sanity.io/) (`next-sanity`, embedded Studio, Vision Plugin) |
| **Payments** | [Stripe Node SDK](https://stripe.com/) & Stripe Checkout API |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs`) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) with `persist` middleware |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), Radix UI, Framer Motion, Lucide React Icons |
| **Language** | [TypeScript](https://www.typescriptlang.org/) with Sanity Typegen |

---

## Project Structure

```text
ecommerce_sanity_website/
├── actions/                      # Server actions (Stripe Checkout creation)
│   └── createCheckoutSession.ts
├── app/                          # Next.js App Router
│   ├── (store)/                  # Storefront routes layout group
│   │   ├── category/[slug]/      # Category product listing pages
│   │   ├── my-cart/              # Shopping cart drawer/page & checkout trigger
│   │   ├── orders/               # Customer order history dashboard
│   │   ├── product/[id]/         # Product detail pages
│   │   ├── search/               # Product search page
│   │   ├── success/              # Post-checkout confirmation page
│   │   ├── webhook/              # Stripe webhook handler endpoint
│   │   ├── layout.tsx            # Store root layout with Clerk Provider & Header
│   │   └── page.tsx              # Store homepage (Products view & Banners)
│   ├── studio/                   # Embedded Sanity Studio route
│   │   └── [[...tool]]/          # Sanity Studio route handler
│   ├── globals.css               # Tailwind CSS imports & global styles
│   └── layout.tsx                # Root layout with SanityLive visual editing
├── components/                   # Shared UI components
│   ├── AddToBasketButton.tsx     # Client-side basket modifier button
│   ├── BlackFridayBanner.tsx     # Promotional sales banner component
│   ├── CategorySelector.tsx      # Category dropdown/popover component
│   ├── Header.tsx                # Navigation header with search bar, cart, & auth
│   ├── ProductsGrid.tsx          # Animated product grid container
│   ├── ProductThumbnail.tsx     # Product card item component
│   └── ProductsView.tsx          # Combined view for categories & products grid
├── lib/                          # Utility & configuration helpers
│   ├── imageUrl.ts               # Sanity image URL builder helper
│   ├── stripe.ts                 # Stripe client instance initialization
│   └── utils.ts                  # Classnames merger helper (`cn`)
├── sanity/                       # Sanity CMS configurations & schemas
│   ├── lib/                      # Sanity client & live fetch queries
│   │   ├── backendClient.ts      # Server-side write client (Sanity API token)
│   │   ├── client.ts             # Client-side read client
│   │   ├── live.ts               # SanityLive setup & defineSanityFetch
│   │   ├── categories/           # Category GROQ queries
│   │   ├── orders/               # Order GROQ queries
│   │   ├── products/             # Product GROQ queries
│   │   └── sales/                # Sales GROQ queries
│   ├── schemaTypes/              # Sanity content type schemas
│   │   ├── categoryType.ts
│   │   ├── orderType.ts
│   │   ├── productType.ts
│   │   ├── salesType.ts
│   │   └── blockContentType.ts
│   ├── env.ts                    # Sanity environment variable validator
│   └── structure.ts              # Sanity Studio custom desk structure
├── store/                        # Zustand state management
│   └── store.ts                  # Cart state store with persistent local storage
├── sanity.cli.ts                 # Sanity CLI configuration
├── sanity.config.ts              # Sanity Studio workspace configuration
└── package.json                  # Dependencies & scripts
```

---

## Environment Variables Setup

Create a `.env.local` file in the root directory of your project and populate it with the following environment variables:

```env
# Sanity CMS Credentials
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_write_api_token
SANITY_API_READ_TOKEN=your_sanity_read_api_token

# Clerk Authentication Credentials
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe Credentials
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or yarn/pnpm/bun
- A [Sanity.io](https://www.sanity.io/) account & project
- A [Stripe](https://stripe.com/) account (Test mode)
- A [Clerk](https://clerk.com/) account

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/arhamgill/ecommerce_sanity_website.git
cd ecommerce_sanity_website
npm install
```

### 3. Run Development Server
Start the Next.js development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the store.

### 4. Access Embedded Sanity Studio
Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to access the embedded Sanity Studio. Log in with your Sanity credentials to begin adding products, categories, sales banners, and inspecting orders.

### 5. Local Stripe Webhook Testing
To test Stripe checkout completions and order creation locally, use the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/webhook
```

Copy the webhook signing secret printed by the terminal (starts with `whsec_`) and set it as `STRIPE_WEBHOOK_SECRET` in your `.env.local` file.

### 6. Sanity Type Generation
Extract schemas and generate TypeScript types for your Sanity queries:

```bash
npm run typegen
```

---

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production optimization.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint code quality checks.
- `npm run typegen`: Extracts Sanity schema and generates TypeScript definitions.

---

## License

This project is licensed under the MIT License.
