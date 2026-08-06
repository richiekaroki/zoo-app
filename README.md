# Wam Zoo

Wildlife conservation web app — real animals, real data, real conservation impact.

**Live:** [zoo-app-nu.vercel.app](https://zoo-app-nu.vercel.app)

## Tech Stack

- **Frontend:** Vue 3 + Vue Router
- **Styling:** Bootstrap 5.3.3 (tree-shaked) + custom design system
- **Backend:** Firebase (Firestore, Auth)
- **Deployment:** Vercel (with serverless API)
- **Fonts:** DM Serif Display + Outfit
- **Icons:** Font Awesome 6.7.2

## Quick Start

```bash
git clone https://github.com/richiekaroki/zoo-app.git
cd zoo-app
npm install
npm run serve
```

Open `http://localhost:8080`.

## Project Structure

```
zoo-app/
├── api/
│   └── contact.js            # Serverless contact form (rate-limited)
├── public/
│   ├── 404.html              # Custom 404 page
│   ├── robots.txt            # Search engine directives
│   ├── sitemap.xml           # XML sitemap
│   └── site.webmanifest      # PWA manifest
├── src/
│   ├── assets/css/
│   │   ├── design-system.css # Tokens, dark mode, transitions
│   │   └── _bootstrap.scss   # Selective Bootstrap imports
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Hero, Welcome, Breadcrumb
│   │   ├── animals/          # AnimalList, AnimalDetail, AnimalCarousel
│   │   ├── auth/             # UserLogin, NewRegister
│   │   └── admin/            # AdminDashboard
│   ├── composables/          # useDarkMode
│   ├── data/
│   │   └── animals.js        # Centralized animal data
│   ├── firebase/             # Firebase config
│   ├── router/               # Vue Router
│   ├── services/             # API services (API Ninjas, Unsplash)
│   └── views/                # Pages (Home, About, Animals, Conservation, Contact, Services)
└── vue.config.js
```

## Features

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, featured animals, trust signals |
| Animals | `/animals` | Browse all species with search, filter, sort |
| Animal Detail | `/animals/:name` | Habitat, facts, conservation status |
| Conservation | `/conservation` | Threatened species, programs, impact stats |
| About | `/about` | Mission, team, carousel |
| Contact | `/contact` | Form with rate-limiting |
| Services | `/services` | Zoo services and programs |

### UX
- **Dark mode** — full support across all components
- **Mobile nav** — slide-in drawer with focus trap, scroll lock
- **Back-to-top** — floating button after 400px scroll
- **Welcome banner** — dismissible, localStorage remembers
- **Filter/sort** — by conservation status and name severity

### SEO
- Per-page meta tags via `@vueuse/head`
- JSON-LD structured data (Organization, Animal)
- Open Graph + Twitter Card meta
- Canonical URLs, sitemap.xml, robots.txt

### Accessibility
- Skip-to-content link
- `aria-current="page"` on active nav
- `role="alert"` on form errors
- Focus trap in mobile nav drawer
- `prefers-reduced-motion` support

### Security
- Rate-limited contact form (3/hour via Vercel serverless)
- Server-side validation
- Firebase Admin SDK for Firestore writes

### Performance
- Bootstrap tree-shaked (74% CSS reduction: 300KB → 78KB)
- Selective SCSS imports (14 modules)
- `<picture>` with responsive srcsets
- Lazy-loaded images
- Singleton dark mode listener

## API Keys

Get your keys and add them to `.env`:

```
VUE_APP_API_NINJAS_KEY=your_key_here
VUE_APP_UNSPLASH_KEY=your_key_here
```

### Serverless Environment Variables (Vercel)

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
```

## Development

```bash
npm run serve        # Dev server
npm run build        # Production build
npm run lint         # Lint
```

## License

MIT
