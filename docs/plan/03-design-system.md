# 03 · Design system

ParentPath is used by stressed parents, sometimes in conflict, sometimes in danger, often on a phone. The look must be **calm, trustworthy and quietly warm**: closer to a good banking or health app than a social app. It should never feel playful about conflict. The wireframes (`docs/wireframes`) set the layout and content; this file sets the visual finish. Where they differ, this file wins on style and the wireframes win on content and structure.

## 1. Brand

- **Name:** ParentPath. **Logo files:** `assets/brand/` → copy to `src/assets/brand/`.
  - `logo.svg`: full logo for light backgrounds; `logo-on-dark.svg`; `logo-mark.svg`: app icon / small spaces; `favicon.svg`.
  - Meaning: two paths (the parents: white and apricot) meeting beneath one point (the child).
- Generate the PWA icons (192, 512, maskable) and `apple-touch-icon.png` from `logo-mark.svg`.
- Tone of voice: plain, short, neutral and kind. Never blaming. "Your co-parent hasn't answered yet" rather than "No response!". Exact texts come from the manual.

## 2. Color tokens

Define these as CSS custom properties in `src/styles/tokens.scss` and map them into the Angular Material M3 theme (primary = teal, tertiary = apricot, error = danger).

| Token | Hex | Use |
|---|---|---|
| `--pp-primary-700` | `#0B4A52` | Hover/pressed on primary, headings on tinted panels |
| `--pp-primary-600` | `#0E5A63` | **Brand color**: primary buttons, active nav, links |
| `--pp-primary-500` | `#127380` | Focus ring, charts |
| `--pp-primary-100` | `#D5ECEC` | Selected rows, active nav background |
| `--pp-primary-50` | `#EAF5F4` | Tinted panels, info cards |
| `--pp-accent-500` | `#F4A582` | Apricot accent: illustration, logo, highlights (never text) |
| `--pp-accent-700` | `#B4532F` | Accent text/icons on white (4.5:1) |
| `--pp-accent-50` | `#FDF0E9` | Warm callouts (tone-check panel background) |
| `--pp-ink` | `#16232E` | Main text |
| `--pp-ink-2` | `#4E5966` | Secondary text |
| `--pp-ink-3` | `#6B7580` | Hints, placeholders (check contrast on each background) |
| `--pp-border` | `#D9DDE1` | Borders, dividers |
| `--pp-surface` | `#FFFFFF` | Cards, dialogs |
| `--pp-bg` | `#F5F6F3` | Page background (warm off-white) |
| `--pp-success` / bg | `#1E7B4F` / `#E5F4EC` | Paid, approved, delivered |
| `--pp-warning` / bg | `#8A5A00` / `#FFF4DE` | Pending, due soon, disputed |
| `--pp-danger` / bg | `#B3261E` / `#FCE8E6` | Errors, declined, overdue |
| `--pp-info` / bg | `#234E8C` / `#E6ECF6` | Neutral notices, agency data labels |

**Calendar and "who" colors** (always paired with a text label or icon, never color alone):

| Who | Fill | Text/border |
|---|---|---|
| You | `#D5ECEC` | `#0B4A52` |
| Co-parent | `#FBE3D6` | `#8F3E1F` |
| Shared / both | `#E3E6F7` | `#2F3A8F` |
| Agency item (CSS) | `#E6ECF6` | `#234E8C` with an "Agency" label |

Safety Mode's **Exit now** button: solid `--pp-danger`, white text, always in the same top-bar spot.

Dark mode is not required for the first release. Use tokens everywhere so it can be added later.

## 3. Typography

- **Public Sans** (Google Fonts, free, designed for public-service clarity) for everything; weights 400/500/600/700. Fallback `'Segoe UI', system-ui, sans-serif`. Enable `font-variant-numeric: tabular-nums` for money, dates and tables.
- Scale (desktop / mobile): Display 32/26 · H1 28/24 · H2 22/20 · H3 18/17 · Body 16/16 · Small 14 · Caption 12. Line height 1.5 for body, 1.25 for headings. Body text is never smaller than 16 px on mobile (also prevents iOS zoom on inputs).
- Money: `$1,234.50` with the currency sign; negative balances in words ("You owe $40.00"), not only red.

## 4. Spacing, shape, elevation

- 4 px base grid: 4, 8, 12, 16, 24, 32, 48, 64.
- Radius: 8 px inputs/buttons, 12 px cards, 16 px dialogs, 999 px chips.
- Cards: white, 1 px `--pp-border`, shadow `0 1px 2px rgb(22 35 46 / 6%)`; no heavy shadows.
- Content max width 1200 px; forms max 640 px; reading text max 72 characters.

## 5. Layout and responsiveness

| Width | Navigation | Layout |
|---|---|---|
| ≥ 1024 px (desktop) | Left sidebar 248 px with logo, the 12 menu items from manual §2.1, icons + labels | Top bar: household name + Linked/Solo chip, time zone, user menu, Exit now (Safety Mode) |
| 600–1023 px (tablet) | Collapsible icon rail (72 px) that expands on tap | Two-column screens become one column where needed |
| < 600 px (phone) | **Bottom navigation** with 5 items: Home, Messages, Calendar, Expenses, More (More opens the rest as a sheet) | Top bar shows logo mark, household chip, user avatar, Exit now. Primary action as a full-width button at the bottom of forms |

Rules:
- No horizontal page scroll at 320 px and up. Test 375, 768, 1280.
- Tables turn into **stacked cards** below 768 px (shared `data-list` component does both).
- Dialogs become full-screen sheets below 600 px.
- Touch targets at least 44 × 44 px. Inputs 48 px tall.
- Messages screen on desktop: thread list + open thread side by side; on phone: list → thread as separate screens with a back button.
- Use `env(safe-area-inset-*)` so the bottom nav clears the iPhone home bar.

## 6. Components (Angular Material, themed)

- **Buttons:** one filled primary per view; outlined secondary; text buttons for tertiary; destructive actions use the danger color and always open the standard confirm dialog.
- **Forms:** outlined fields, label above input text, helper text below, error text with icon. Validate on blur and on submit; show the module's ERR text exactly.
- **Status chips:** Pending (warning), Approved/Paid/Delivered (success), Declined/Overdue/Failed (danger), Draft/Archived (neutral), Disputed (warning + icon).
- **Empty states:** small line illustration in teal/apricot, one sentence, the main action button.
- **Loading:** skeletons shaped like the content, not spinners (spinner only inside buttons).
- **Errors:** inline error card with "Try again"; full error page ACC-SCR-21 for unexpected failures.
- **Record labels:** messages show "Sent [date time]", "Delivered", "Read [time]" in small secondary text; messages can never show edit/delete actions.
- **Private vs shared:** a lock icon + "Private" chip on private items, everywhere.
- **Tone-check panel** (MSG-SCR-03): warm apricot-tinted card labelled "Only you can see this", highlights in `--pp-accent-50` with a dotted underline.
- **Held message** (MSG-06): neutral grey card, shield icon, "Message held", reason, "Show message" button.
- **Test mode badge:** small neutral chip "Test mode" with a flask icon on every screen element served by a simulator (SMS sent, payment status, agency values). Never alarming, always visible.
- **Icons:** Material Symbols Rounded, 20/24 px, always with a text label or `aria-label`.
- **Charts** (compliance, balance): calm, flat, labelled directly; use the who-colors.

## 7. Motion

150–200 ms ease-out for menus, sheets and toasts. No bouncing or celebration. Respect `prefers-reduced-motion`.

## 8. Accessibility checklist (every screen)

Visible focus ring (2 px `--pp-primary-500` + 2 px offset) · logical heading order · labels on every field · error messages linked with `aria-describedby` · contrast ≥ 4.5:1 for text, 3:1 for UI · status never by color alone · keyboard path through every flow · `lang="en"` · skip-to-content link · live region for toasts and new messages.

## 9. Public pages

Sign-in, sign-up, verification page, safety resources, help and share-link pages use a simple header (logo, Safety resources, Help, Sign in) and a centered card on a soft `--pp-primary-50` → `--pp-bg` background. The sign-in page can include a short reassurance line ("Private, secure and built for court-ready records"). The **public verification page** should look official and sober: no marketing.
