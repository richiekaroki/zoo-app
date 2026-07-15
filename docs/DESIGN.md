# Zoo App Design System

## Design Direction

**Living Archive** — nature magazine meets museum-quality typography. Clean, editorial, warm.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-forest` | `#1B4332` | Primary brand, navbar, hero gradient |
| `--color-forest-dark` | `#0F2B1F` | Headers, text emphasis |
| `--color-gold` | `#C67B5C` | CTAs, accents, links |
| `--color-gold-dark` | `#A5624A` | Hover states |
| `--color-gold-light` | `#D4956E` | Light accents |
| `--color-cream` | `#FAF6F0` | Page backgrounds |
| `--color-charcoal` | `#2D2D2D` | Body text |
| `--color-warm-gray` | `#6B6B6B` | Secondary text |

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display | DM Serif Display | 400 | clamp(2rem, 5vw, 4.5rem) |
| Body | Outfit | 300-600 | 0.875rem - 1.125rem |
| Nav | Outfit | 500 | 0.875rem |
| Small | Outfit | 400 | 0.75rem - 0.875rem |

## Spacing Scale

`--space-1` (0.25rem) → `--space-16` (4rem)

## Border Radius

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 20px
- `--radius-full`: 9999px

## Shadows

- `--shadow-xs`: 0 1px 2px rgba(0,0,0,0.04)
- `--shadow-sm`: 0 2px 8px rgba(0,0,0,0.06)
- `--shadow-md`: 0 4px 16px rgba(0,0,0,0.08)
- `--shadow-lg`: 0 8px 32px rgba(0,0,0,0.1)
- `--shadow-xl`: 0 16px 48px rgba(0,0,0,0.12)
- Warm variants: `--shadow-warm-sm/md/lg/xl`

## Transitions

- `--transition-fast`: 150ms ease
- `--transition-base`: 250ms ease
- `--transition-slow`: 350ms ease
- `--transition-spring`: 500ms cubic-bezier(0.34, 1.56, 0.64, 1)

## Component Patterns

### Buttons
- `.btn-primary`: Forest green background, white text
- `.btn-secondary`: White background, forest border
- `.btn-gold`: Gold background, white text (CTAs)
- `.btn-outline-white`: Transparent, white border (hero)

### Cards
- White background, `--radius-xl`, `--shadow-sm`
- Hover: `translateY(-4px)`, `--shadow-lg`
- Image cover with rounded corners

### Forms
- Input: 48px height, `--radius-md`, `--color-cream` background
- Focus: 2px forest green ring
- Labels: 0.875rem, font-weight 600

### Navbar
- Glassmorphism on scroll (backdrop-blur)
- Mobile: slide-in panel from right
- Desktop: horizontal nav with gold underline on active

## Project Structure

```
src/
├── components/
│   ├── layout/      → Navbar, Footer, Hero
│   ├── animals/     → AnimalList, AnimalDetail, AnimalCarousel
│   ├── auth/        → UserLogin, NewRegister
│   └── admin/       → AdminDashboard
├── views/           → Page components (routed)
├── firebase/        → Firebase config
├── router/          → Vue Router config
├── services/        → API services
└── assets/css/      → Design system, transitions
```

## Animation Classes

- `stagger-item`: AOS fade-up with sequential delays
- `fade-in`, `fade-in-left`, `fade-in-right`: Entry animations
- `scale-in`: Scale from 0.95
- `slide-up`, `slide-down`: Vertical slides
- `skeleton`: Loading placeholder pulse

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: ≥ 992px

## Accessibility

- Skip-to-content link
- Focus visible rings
- Semantic HTML (nav, main, section, article)
- ARIA labels on interactive elements
- Reduced motion support via `prefers-reduced-motion`
