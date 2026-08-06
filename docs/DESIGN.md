# Wam Zoo Design System

## Design Direction

**Living Archive** — nature magazine meets museum-quality typography. Clean, editorial, warm.

## Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-forest` | `#1B4332` | `#2d6a4f` | Primary brand, buttons |
| `--color-forest-dark` | `#0D2A1C` | `#f5f0e1` | Headers, text emphasis |
| `--color-forest-light` | `#2d6a4f` | `#40916c` | Hover states |
| `--color-gold` | `#C67B5C` | `#e07a5f` | CTAs, accents, links |
| `--color-gold-light` | `#D4956E` | `#f0a68a` | Light accents |
| `--color-sand` | `#F5F0E1` | `#1a1a1a` | Section backgrounds |
| `--color-cream` | `#FAF6F0` | `#121212` | Page backgrounds |
| `--color-ivory` | `#FDFBF7` | `#1e1e1e` | Card backgrounds |
| `--color-charcoal` | `#2D3436` | `#e0e0e0` | Body text |
| `--color-warm-gray` | `#6B6B5C` | `#999999` | Secondary text |
| `--color-light-border` | `#e2ddd0` | `#333333` | Borders |

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | DM Serif Display | 400 | `clamp(2rem, 5vw, 4.5rem)` |
| Body | Outfit | 300-600 | 0.875rem - 1.125rem |
| Nav | Outfit | 500 | 0.875rem |
| Small | Outfit | 400 | 0.75rem - 0.875rem |

## Spacing Scale

```
--space-1:  0.25rem    --space-12: 3rem
--space-2:  0.5rem     --space-16: 4rem
--space-3:  0.75rem    --space-20: 5rem
--space-4:  1rem       --space-24: 6rem
--space-6:  1.5rem     --space-32: 8rem
--space-8:  2rem
--space-10: 2.5rem
```

## Border Radius

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 20px
- `--radius-full`: 9999px

## Shadows

| Token | Value |
|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.04)` |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.06)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.08)` |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.1)` |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.12)` |
| Warm variants | `--shadow-warm-sm/md/lg/xl` |

## Transitions

- `--transition-fast`: 150ms ease
- `--transition-base`: 250ms ease
- `--transition-slow`: 350ms ease
- `--transition-spring`: 500ms cubic-bezier(0.34, 1.56, 0.64, 1)

## Dark Mode

Implemented via `[data-theme="dark"]` attribute selector.

**Strategy:**
- Tokens invert at `:root` level (forest → light, cream → dark)
- Components use tokens, not hardcoded values
- `useDarkMode()` composable manages state with singleton guard
- localStorage persistence

**Key inversions:**
- Backgrounds: light → dark
- Text: dark → light
- Borders: light → transparent
- Shadows: light mode → dark mode variants

## Component Patterns

### Navbar
- Fixed position, `var(--nav-height)` offset (72px)
- **Default:** Dark green semi-transparent `rgba(13,42,28,0.85)` with blur
- **Scrolled:** Light beige 98% opacity, subtle shadow
- Mobile: slide-in drawer with focus trap, body scroll lock
- `aria-current="page"` on active link

### Buttons
- `.btn-primary`: Forest green, white text, 44px min height
- `.btn-gold`: Gold, white text (CTAs)
- `.btn-outline-white`: Transparent, white border (hero)
- All touch targets ≥44px

### Cards
- White background, `--radius-xl`, `--shadow-sm`
- Hover: `translateY(-4px)`, `--shadow-lg`
- Image: `aspect-ratio: 4/3` (animals) or `16/9` (featured)
- Tap feedback on mobile via `@media (hover: none)`

### Forms
- Input: 48px height, `--radius-md`, `--color-cream` background
- Focus: 2px forest green ring
- `role="alert"` on validation errors
- `aria-live="polite"` on submit buttons

### Animal Carousel
- Bootstrap Carousel with 8s/6s intervals
- Keyboard accessible: Tab, Escape, Arrow keys
- Focus pauses autoplay
- Hidden prev/next buttons (`tabindex="-1"`, `aria-hidden="true"`)
- Dot indicators only

### Filter/Sort (AnimalList)
- Status filter dropdown (All/Endangered/Vulnerable/Near Threatened/Least Concern)
- Sort by name (alphabetical) or status (severity order)
- Works with search query

## Project Structure

```
src/
├── assets/css/
│   ├── design-system.css     # Tokens, dark mode, utilities
│   └── _bootstrap.scss       # Selective imports (14 modules)
├── components/
│   ├── layout/               # Navbar, Footer, Hero, Welcome, Breadcrumb, Toast
│   ├── animals/              # AnimalList, AnimalDetail, AnimalCarousel
│   ├── auth/                 # UserLogin, NewRegister
│   └── admin/                # AdminDashboard
├── composables/              # useDarkMode (singleton)
├── data/
│   └── animals.js            # Centralized animal data
├── firebase/                 # Firebase config
├── router/                   # Vue Router (7 routes)
├── services/                 # API services (Ninjas, Unsplash)
├── views/                    # Pages
└── App.vue                   # Error boundary, back-to-top
```

## Animation Classes

- `stagger-item`: AOS fade-up with sequential delays
- `fade-in`, `fade-in-left`, `fade-in-right`: Entry animations
- `scale-in`: Scale from 0.95
- `slide-up`, `slide-down`: Vertical slides
- `skeleton`: Loading placeholder pulse
- `v-scroll-reveal`: Vue directive for scroll-triggered animations

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `< 480px` | Mobile compact: smaller fonts, stacked grids |
| `< 768px` | Mobile: single column, drawer nav |
| `768px - 991px` | Tablet: 2-column grids |
| `≥ 992px` | Desktop: full nav, 3-4 column grids |

## Accessibility

- Skip-to-content link
- Focus visible rings on all interactive elements
- Semantic HTML (nav, main, section, article)
- ARIA labels on interactive elements
- `aria-current="page"` on active nav links
- `role="alert"` on form validation errors
- `aria-live="polite"` on dynamic content
- Focus trap in mobile nav drawer
- Reduced motion support via `prefers-reduced-motion`
- 44px minimum touch targets

## Files

| File | Purpose |
|------|---------|
| `public/404.html` | Custom 404 page (noindex) |
| `public/robots.txt` | Search engine directives |
| `public/sitemap.xml` | XML sitemap (6 routes) |
| `public/site.webmanifest` | PWA manifest |
| `api/contact.js` | Rate-limited serverless endpoint |
