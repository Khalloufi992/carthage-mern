# CARTHAGE LUXURY

**Carthage Luxury** is a Tunisian luxury fashion e-commerce platform built with the MERN stack. Born in the Medina of Tunis, the brand presents Haute Couture and ready-to-wear collections with an Art Deco editorial aesthetic — Obsidian, Gold, and Bone palette.

---

## Live Preview

```
http://localhost:5173
```

Start the frontend dev server:

```bash
cd frontend
npm run dev
```

---

## Features

| Feature | Status |
|---|---|
| Home — cinematic hero, marquee, editorial product grid | ✅ |
| Collection page — season filters (AH / Été), category filters | ✅ |
| Add to cart with size selector + visual feedback | ✅ |
| Cart — quantity controls, remove items, promo code UI | ✅ |
| 3-step Checkout — shipping form, payment method, confirmation | ✅ |
| User Auth — register / login / logout with localStorage persistence | ✅ |
| Lookbook — 4 editorial looks, alternating layout, add-to-cart per look | ✅ |
| L'Atelier — factory story, process steps, stats | ✅ |
| Orders history page | ✅ |
| Responsive — mobile drawer nav, stacked layouts | ✅ |
| Tunisian Dinar (DT) pricing | ✅ |

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, marquee, philosophy, product grid, atelier CTA |
| `/products` | Collection | Season + category filters, 8 products (AH + Été) |
| `/cart` | Le Panier | Cart items, qty controls, order summary |
| `/checkout` | Finaliser | 3-step checkout flow — shipping → payment → confirm |
| `/login` | Connexion | Login / Register with auth context |
| `/orders` | Mes Commandes | Order history with status badges |
| `/atelier` | L'Atelier | Factory story, 4-step process, stats pillars |
| `/lookbook` | Lookbook | 4 editorial looks with add-to-cart |

---

## Project Structure

```
mern-ecommerce/
├── frontend/                    # React / Vite frontend
│   ├── public/
│   │   ├── hero_coat.jpg        # Hero background image
│   │   ├── product_jacket.jpg   # Product images (×4)
│   │   ├── product_dress.jpg
│   │   ├── product_trousers.jpg
│   │   ├── product_coat_2.jpg
│   │   └── tunis_atelier.jpg    # Atelier & auth page image
│   └── src/
│       ├── context/
│       │   ├── CartContext.jsx  # Global cart state
│       │   └── AuthContext.jsx  # Global auth state + localStorage
│       ├── components/
│       │   └── Navbar.jsx       # Nav with cart badge + user dropdown
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Products.jsx
│       │   ├── Cart.jsx
│       │   ├── Checkout.jsx     # 3-step checkout
│       │   ├── Login.jsx
│       │   ├── Orders.jsx
│       │   ├── Atelier.jsx
│       │   └── Lookbook.jsx
│       ├── App.jsx              # Router + providers
│       ├── index.css            # Full design system (~4100 lines)
│       └── main.jsx
└── backend/                     # Express / MongoDB (not yet connected)
```

---

## Collections

### Automne — Hiver 2026
| # | Name | Price (DT) | Category |
|---|---|---|---|
| 001 | Le Manteau Noir | 8,500 | Outerwear |
| 002 | Robe du Soir | 12,500 | Evening |
| 003 | Le Pantalon | 4,400 | Tailoring |
| 004 | Manteau Camel | 10,800 | Outerwear |

### Été 2026
| # | Name | Price (DT) | Category |
|---|---|---|---|
| 005 | La Veste Ivoire | 5,800 | Tailoring |
| 006 | Robe Médina | 9,200 | Evening |
| 007 | Le Short Tailleur | 3,200 | Tailoring |
| 008 | Manteau de Bain | 6,400 | Outerwear |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Frontend only

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Full stack (when backend is ready)

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev   # → http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev   # → http://localhost:5173
```

---

## Brand Identity

- **Name:** CARTHAGE LUXURY
- **Tagline:** Haute Couture · Tunis
- **Founded:** Médina de Tunis, 2018
- **Palette:** Obsidian `#0D0C0A` · Gold `#C9A96E` · Bone `#F5F0E8`
- **Fonts:** Playfair Display (display) · Jost (sans) · Cormorant Garamond (editorial)

---

## License

Private — All rights reserved · Carthage Luxury © 2026
