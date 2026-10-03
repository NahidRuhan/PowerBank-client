# Design System: PowerBank ⚡

> Single source of truth for all frontend design decisions. Every component, page, and interaction must conform to this document.

---

## 1. Visual Theme & Atmosphere

**Density:** 6/10 — Dashboard Balanced. Dense enough to show real operational data, airy enough to avoid cognitive overload. Control room meets modern SaaS.

**Variance:** 5/10 — Structured Offset. Clean grid-based layouts with subtle asymmetric touches in hero sections and feature highlights. Data tables and infrastructure views stay predictable; overview cards use deliberate size variation.

**Motion:** 5/10 — Fluid CSS. Meaningful transitions on state changes, staggered list reveals, smooth page transitions. No cinematic choreography — this is a utility tool, not a portfolio.

**Atmosphere:** A precise, engineered interface that feels like an advanced power grid control system reimagined by the Linear design team. Clean surfaces, sharp hierarchy, and real-time operational awareness. The aesthetic says "mission-critical infrastructure" — not "startup landing page."

---

## 2. Color Palette & Roles

### Light Mode (Default)

| Token | Name | Hex | Role |
|-------|------|-----|------|
| `--canvas` | Snow Surface | `#FAFAFA` | Page background |
| `--surface` | Pure White | `#FFFFFF` | Card, container, modal fill |
| `--surface-raised` | Warm Mist | `#F5F5F5` | Sidebar, secondary panels |
| `--ink-primary` | Charcoal Ink | `#18181B` | Primary text (Zinc-950) |
| `--ink-secondary` | Muted Steel | `#71717A` | Secondary text, metadata (Zinc-500) |
| `--ink-tertiary` | Pale Slate | `#A1A1AA` | Placeholder text, disabled (Zinc-400) |
| `--border` | Whisper Edge | `#E4E4E7` | Card borders, dividers (Zinc-200) |
| `--border-subtle` | Ghost Line | `#F4F4F5` | Table row separators (Zinc-100) |
| `--accent` | Electric Emerald | `#10B981` | Primary CTA, active states, success — **the single accent** |
| `--accent-hover` | Deep Emerald | `#059669` | Hover state for accent |
| `--accent-muted` | Emerald Wash | `#D1FAE5` | Badge backgrounds, subtle accent tint |
| `--danger` | Signal Red | `#EF4444` | Destructive actions, FAULT status |
| `--danger-muted` | Rose Wash | `#FEE2E2` | Error badge backgrounds |
| `--warning` | Amber Signal | `#F59E0B` | LOAD_SHED status, overdue bills |
| `--warning-muted` | Amber Wash | `#FEF3C7` | Warning badge backgrounds |
| `--info` | Steel Blue | `#3B82F6` | MAINTENANCE status, info badges |
| `--info-muted` | Blue Wash | `#DBEAFE` | Info badge backgrounds |

### Dark Mode

| Token | Name | Hex | Role |
|-------|------|-----|------|
| `--canvas` | Deep Carbon | `#09090B` | Page background (Zinc-950) |
| `--surface` | Onyx Panel | `#18181B` | Card, container fill (Zinc-900) |
| `--surface-raised` | Slate Layer | `#27272A` | Sidebar, secondary panels (Zinc-800) |
| `--ink-primary` | Bone White | `#FAFAFA` | Primary text |
| `--ink-secondary` | Cool Ash | `#A1A1AA` | Secondary text |
| `--ink-tertiary` | Dark Slate | `#52525B` | Placeholder, disabled |
| `--border` | Carbon Line | `#27272A` | Card borders (Zinc-800) |
| `--border-subtle` | Shadow Line | `#1C1C1E` | Table separators |

> **Accent colors remain identical** in dark mode for brand consistency.

### Status Color Mapping (Domain-Specific)

| Status | Color Token | Usage |
|--------|-------------|-------|
| `ENERGIZED` | `--accent` (Emerald) | Feeder online, active power |
| `LOAD_SHED` | `--warning` (Amber) | Planned outage in effect |
| `FAULT` | `--danger` (Red) | Unexpected outage, critical |
| `MAINTENANCE` | `--info` (Blue) | Planned maintenance |
| `CRITICAL` priority | `--danger` (Red) | Hospital zones, critical areas |
| `HIGH` priority | `--warning` (Amber) | High-priority areas |
| `MEDIUM` priority | `--info` (Blue) | Standard areas |
| `LOW` priority | `--ink-tertiary` (Slate) | Low-priority areas |
| `PAID` | `--accent` (Emerald) | Bill paid |
| `UNPAID` | `--ink-secondary` (Steel) | Bill pending |
| `OVERDUE` | `--danger` (Red) | Bill overdue |
| `SUCCEEDED` | `--accent` (Emerald) | Payment success |
| `PENDING` | `--warning` (Amber) | Payment processing |
| `FAILED` | `--danger` (Red) | Payment failed |
| `REFUNDED` | `--info` (Blue) | Payment refunded |
| `SCHEDULED` | `--info` (Blue) | Upcoming schedule |
| `ACTIVE` | `--warning` (Amber) | Schedule in progress |
| `COMPLETED` | `--accent` (Emerald) | Schedule completed |
| `CANCELLED` | `--ink-tertiary` (Slate) | Schedule cancelled |
| `REPORTED` | `--danger` (Red) | New incident |
| `ACKNOWLEDGED` | `--warning` (Amber) | Incident seen |
| `IN_PROGRESS` | `--info` (Blue) | Repair in progress |
| `RESOLVED` | `--accent` (Emerald) | Incident fixed |

### Constraints

- **Maximum 1 accent color.** Emerald is it. No secondary accent.
- **No purple, no neon.** The AI Purple/Blue aesthetic is banned.
- **No pure black** (`#000000`). Use Zinc-950 (`#09090B`) for dark mode.
- **Consistent gray scale.** Zinc family only. No warm/cool gray mixing.
- **Saturation < 80%** for accent. `#10B981` sits at ~72%.

---

## 3. Typography Rules

### Font Stack

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Display** | `Geist` | `system-ui, sans-serif` | H1, H2, hero headlines, page titles |
| **Body** | `Geist` | `system-ui, sans-serif` | Paragraphs, descriptions, form labels |
| **Mono** | `Geist Mono` | `ui-monospace, monospace` | MW values, meter numbers, timestamps, IDs, code |

### Type Scale

| Level | Class | Weight | Tracking | Usage |
|-------|-------|--------|----------|-------|
| H1 (Page Title) | `text-2xl md:text-3xl` | `font-semibold` (600) | `tracking-tight` | Page headlines: "Infrastructure", "Schedules" |
| H2 (Section) | `text-xl md:text-2xl` | `font-semibold` (600) | `tracking-tight` | Section headers within pages |
| H3 (Card Title) | `text-lg` | `font-medium` (500) | `tracking-normal` | Card titles, dialog headers |
| H4 (Sub-section) | `text-base` | `font-medium` (500) | `tracking-normal` | Subsection labels, table group headers |
| Body | `text-sm` | `font-normal` (400) | `tracking-normal` | Default text, table cells, form values |
| Caption | `text-xs` | `font-normal` (400) | `tracking-normal` | Metadata, timestamps, helper text |
| Label | `text-xs` | `font-medium` (500) | `tracking-wide` + `uppercase` | Form labels, badge text, eyebrow tags |
| Metric | `text-3xl md:text-4xl` | `font-semibold` (600) | `tracking-tighter` + `font-mono` | Dashboard KPI numbers (47, 150 MW) |

### Rules

- **All numerical data** (MW, customer counts, bill amounts, BDT values) must use `font-mono` (Geist Mono)
- **Body text** max-width: `max-w-[65ch]` — never wider
- **No Inter.** Geist is the only sans-serif.
- **No serif fonts.** This is a dashboard/software UI. Serif is banned.
- **Line height:** Body uses `leading-relaxed` (1.625). Headlines use `leading-tight` (1.25).

---

## 4. Component Stylings

### Buttons

| Variant | Style | Usage |
|---------|-------|-------|
| **Primary** | `bg-accent text-white rounded-lg px-4 py-2 font-medium` | Main CTAs: "Create Schedule", "Pay Bill" |
| **Secondary** | `bg-transparent border border-border text-ink-primary rounded-lg px-4 py-2` | Secondary actions: "Cancel", "Edit" |
| **Ghost** | `bg-transparent text-ink-secondary hover:bg-surface-raised rounded-lg px-4 py-2` | Tertiary: filters, minor actions |
| **Destructive** | `bg-danger text-white rounded-lg px-4 py-2` | "Delete Zone", "Remove User" |
| **Icon** | `w-9 h-9 rounded-lg flex items-center justify-center hover:bg-surface-raised` | Toolbar icons, action menus |

- **Active feedback:** `active:scale-[0.98]` — tactile press, 1px translate
- **No neon glows.** No `box-shadow` glows on hover.
- **Focus ring:** `focus-visible:ring-2 ring-accent/50 ring-offset-2`
- **Disabled:** `opacity-50 pointer-events-none`
- **Border radius:** `rounded-lg` (8px) for all buttons. Never pill/full-round.

### Cards

- Use cards **only** when elevation communicates hierarchy (dashboard stats, infrastructure detail)
- `bg-surface rounded-xl border border-border p-6`
- Shadow: `shadow-[0_1px_3px_rgba(0,0,0,0.04)]` — barely visible, tinted to background
- **High-density views** (tables, lists): Replace cards with `border-t` dividers and negative space
- **No card wrapping for table rows.** Data tables use flat rows with `divide-y`.

### Forms & Inputs

- Label **above** input, always. No floating labels.
- Input: `h-10 rounded-lg border border-border bg-surface px-3 text-sm`
- Focus: `focus:border-accent focus:ring-1 focus:ring-accent/30`
- Error: `border-danger` with error text `text-danger text-xs mt-1` below input
- Helper text: `text-ink-tertiary text-xs mt-1` below input
- Gap between label and input: `gap-1.5`
- Gap between form fields: `gap-4`

### Tables

- Header: `bg-surface-raised text-xs font-medium text-ink-secondary uppercase tracking-wider`
- Row: `border-b border-border-subtle hover:bg-surface-raised/50 transition-colors`
- Cell padding: `px-4 py-3`
- Sortable columns: caret icon, accent-colored when active
- **Pagination** at bottom: simple "Page X of Y" with prev/next buttons

### Badges / Status Pills

- Rounded: `rounded-full px-2.5 py-0.5 text-xs font-medium`
- Use `{status-muted-bg}` + `{status-color}` text
- Example: ENERGIZED → `bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400`
- Example: FAULT → `bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400`

### Modals / Dialogs

- Overlay: `bg-black/50 backdrop-blur-sm`
- Panel: `bg-surface rounded-2xl border border-border shadow-xl max-w-lg w-full p-6`
- Stagger-animate content items on open

### Sidebar Navigation

- Width: `w-64` (256px), collapsible to `w-16` (64px) icon-only
- Background: `bg-surface-raised`
- Active item: `bg-accent/10 text-accent font-medium border-l-2 border-accent`
- Hover: `hover:bg-surface`
- Section labels: `text-xs font-medium text-ink-tertiary uppercase tracking-wider px-4 mt-6 mb-2`

### Loading States

- **Skeleton loaders** matching exact layout dimensions. No circular spinners.
- Shimmer effect: `animate-pulse bg-surface-raised rounded`
- Table skeletons: match column widths with rectangular pulses
- Card skeletons: match card dimensions

### Empty States

- Composed illustrations with `text-ink-tertiary`
- Action hint: "No schedules found. Create your first schedule."
- Never just "No data" text.

### Toast / Notifications

- Position: bottom-right
- Style: `bg-surface border border-border rounded-xl shadow-lg p-4`
- Auto-dismiss: 5 seconds
- Types: success (emerald left border), error (red), info (blue), warning (amber)

---

## 5. Layout Principles

### Grid System

- **Page container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Dashboard grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` for stat cards
- **Content area:** Sidebar (fixed) + main content (scrollable)
- CSS Grid over Flexbox math — never use `calc()` percentage hacks

### Spacing Scale

| Context | Value |
|---------|-------|
| Page top padding | `pt-6 md:pt-8` |
| Section gap | `gap-8` |
| Card internal padding | `p-6` |
| Between card title and content | `gap-4` |
| Between form fields | `gap-4` |
| Table cell padding | `px-4 py-3` |
| Sidebar section gap | `gap-1` (between nav items) |

### Viewport Rules

- **Mobile-first collapse** below 768px: All multi-column → single column
- **No horizontal scroll** on mobile — critical failure if present
- **Full-height:** `min-h-[100dvh]` — never `h-screen` (iOS Safari jump bug)
- **Touch targets:** All interactive elements minimum `44px` height
- **Typography scaling:** Headlines via `clamp()`. Body minimum `14px` / `text-sm`

### Page Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (fixed w-64)  │  Main Content (flex-1)      │
│                       │                             │
│ ┌─ Logo ────────────┐ │ ┌─ Page Header ───────────┐ │
│ │ PowerBank ⚡      │ │ │ Title    [+ Create Btn] │ │
│ └───────────────────┘ │ └─────────────────────────┘ │
│                       │                             │
│ ┌─ Navigation ──────┐ │ ┌─ Content Area ──────────┐ │
│ │ Dashboard         │ │ │                         │ │
│ │ Infrastructure  ▸ │ │ │  (Tables, Cards, Forms) │ │
│ │ Schedules         │ │ │                         │ │
│ │ Incidents         │ │ └─────────────────────────┘ │
│ │ Billing           │ │                             │
│ │ ─────────────     │ │                             │
│ │ Admin           ▸ │ │                             │
│ └───────────────────┘ │                             │
│                       │                             │
│ ┌─ User Menu ───────┐ │                             │
│ │ Avatar  Name  ▸   │ │                             │
│ └───────────────────┘ │                             │
└─────────────────────────────────────────────────────┘
```

Mobile: Sidebar collapses to hamburger overlay.

---

## 6. Motion & Interaction

### Transition Defaults

- **Standard:** `transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]`
- **Spring physics** (Framer Motion): `type: "spring", stiffness: 300, damping: 30` — responsive, not bouncy
- **No linear easing.** No `ease-in-out` on UI elements.

### Page Transitions

- Fade + slight upward translate: `opacity 0→1, translateY 8px→0` over 300ms
- Use Framer Motion `AnimatePresence` + `motion.div` for route transitions

### List/Table Reveals

- Stagger children: `staggerChildren: 0.03` — fast cascade, not slow waterfall
- Each row: fade up from `opacity-0 y-4` to `opacity-1 y-0`

### Interactive Feedback

- Hover: `scale-[1.01]` on cards, `bg-surface-raised` on rows
- Active: `scale-[0.98]` — physical press simulation
- Focus: ring animation, not just color change
- Loading spinner in buttons: Replace text with `Loader2` icon spinning

### Animation Rules

- Animate **only** `transform` and `opacity`. Never `top`, `left`, `width`, `height`.
- `will-change: transform` only on actively animating elements
- `backdrop-blur` only on fixed/sticky elements (modals, navbar). Never on scrolling content.
- Grain/noise filters: fixed `pointer-events-none` pseudo-element only
- Isolate CPU-heavy animations in their own `'use client'` leaf components

---

## 7. Anti-Patterns (Banned)

### Visual

- No emojis in UI text or alt attributes
- No pure black (`#000000`) — use Zinc-950
- No purple/neon accents or gradients
- No neon outer glow shadows
- No oversaturated colors
- No gradient text on headers
- No custom mouse cursors
- No overlapping/stacking elements

### Typography

- No Inter font
- No serif fonts (this is a dashboard)
- No oversized screaming H1s — control hierarchy with weight + color
- No lorem ipsum — use realistic Bangladeshi area names and data

### Layout

- No centered hero sections for dashboard views
- No 3-column equal card layouts — use varied grid sizing
- No `h-screen` — use `min-h-[100dvh]`
- No horizontal scroll on mobile
- No `calc()` flexbox hacks — use CSS Grid

### Content

- No generic names: "John Doe", "Acme Corp" — use realistic names like "Rafiq Hossain", "Pallabi Block-C"
- No fake round numbers: `99.9%`, `50%` — use organic data: `47.2%`, `38.7 MW`
- No AI copywriting: "Seamless", "Elevate", "Next-Gen", "Unleash"
- No filler text: "Scroll to explore", "Swipe down", bouncing arrows
- No broken image URLs — use `picsum.photos` or SVG avatar generators
- No circular loading spinners — use skeleton shimmer

### Framework

- No `useState` for continuous animations — use Framer Motion `useMotionValue`
- No `window.addEventListener('scroll')` — use IntersectionObserver or Framer `whileInView`
- `shadcn/ui` must be customized — never used in default state
- No arbitrary `z-index` spam — reserve for system layers only

---

## 8. Iconography

- **Icon library:** Phosphor Icons (Light weight) — `@phosphor-icons/react`
- **Stroke width:** Consistently `1.5` across entire app
- **Size standard:** `w-5 h-5` for inline, `w-4 h-4` for compact/table, `w-6 h-6` for navigation
- **Color:** Inherit from parent text color. Accent-colored only for active states.

---

## 9. Responsive Breakpoints

| Breakpoint | Value | Layout |
|------------|-------|--------|
| Default | `< 640px` | Single column, no sidebar, hamburger nav |
| `sm` | `640px` | Minor adjustments |
| `md` | `768px` | 2-column grids, sidebar appears |
| `lg` | `1024px` | 3-4 column dashboard grids, full sidebar |
| `xl` | `1280px` | Max content width, comfortable spacing |

---

## 10. Accessibility

- All interactive elements: visible focus indicators (`focus-visible:ring-2`)
- Color is never the only differentiator — always pair with icons or text labels
- Touch targets: minimum 44px
- Form errors: both color + text + aria attributes
- Sufficient color contrast: WCAG AA minimum (4.5:1 for body text)
- `prefers-reduced-motion`: disable stagger animations, keep instant transitions
- Screen reader support: proper `aria-label`, `role`, `aria-live` for toasts
