# Animation Optimization Plan
**Date Created:** 2026-06-27  
**Status:** In Progress  
**Priority:** High - UX Performance & Visual Polish

---

## Executive Summary

This plan addresses animation timing issues across 6 key pages and introduces unique, cohesive animation patterns that reinforce the Dockside brand while improving perceived performance. The primary issues are:

1. **Quality-Safety page:** Fade-in animations triggering too late (82-84% viewport) - need earlier trigger (65%) and faster timing
2. **Lack of unique animations:** All pages use generic stagger/fade patterns - need distinctive animations per page
3. **Inconsistent timing:** Delays and durations vary without clear hierarchy

---

## Pages in Scope

1. **Home** (`/`)
2. **Equipment Fleet** (`/equipment-fleet`)
3. **Quality & Safety** (`/quality-safety`)
4. **Projects** (`/projects`)
5. **Downloads** (`/downloads`)
6. **Contact** (`/contact`)

---

## Current Animation Issues

### Quality-Safety Page (PRIMARY ISSUE)
- **Problem:** Fade-in animations trigger at 82-84% viewport threshold
- **Symptom:** Content appears late in scroll, feels sluggish
- **Impact:** Users miss smooth entrance animations, perceived lag
- **Solution:** 
  - Reduce `amount` from 0.5 to 0.25 (triggers at 25% viewport visibility)
  - Reduce delays from 0.18-0.25s to 0.05-0.08s
  - Reduce timeout from 120ms to 50ms for GSAP ScrollTrigger

**Files to modify:**
- `src/app/(site)/quality-safety/page.tsx` - Framer Motion viewport/delays
- `src/components/motion/LuxuryScroll.tsx` - GSAP ScrollTrigger timing
- `src/app/(site)/quality-safety/CertificateGrid.tsx` - Lightbox animation duration

---

## Unique Animation Strategy Per Page

### 1. HOME PAGE (`/`)
**Theme:** Commanding Entrance + Progressive Revelation

**Animation Pattern:**
- Hero: Split-text reveal with staggered character animations
- Stats (TrustSystems): Number count-up with fade-in from bottom
- About Section: Image slide-in from left, text from right (parallax offset)
- Services: Card scale-up on scroll with icon rotation
- Projects: Masonry grid with staggered tile reveal
- CTA: Pulse effect on button with attention-grabbing glow

**Key Principle:** Build confidence through scale and authority. Animations emphasize solidity.

**Implementation Details:**
- Use SVG text for hero title splits
- Implement `useInView()` trigger points at 20% viewport
- Parallax offset: image moves 20px relative to text
- Service cards: scale from 0.95 to 1 with 60ms stagger
- Project grid: reveal bottom-to-top in columns

---

### 2. EQUIPMENT FLEET PAGE (`/equipment-fleet`)
**Theme:** Industrial Movement + Mechanical Precision

**Animation Pattern:**
- Page hero: Sliding entrance from left with underline accent
- Equipment cards: Rotate 3D entrance with depth (perspective)
- Badge: Pulse/scale effect on hover
- Image hover: Subtle zoom + tilt effect (follow cursor)
- Spec rows: Staggered slide-in from left (1 by 1)

**Key Principle:** Convey motion and capacity. Animations suggest heavy machinery in action.

**Implementation Details:**
- Hero uses `scaleX` entrance from 0 to 1 with 0.3s duration
- Cards use `rotateY` 3D entrance (90° → 0°) over 0.5s
- Badge pulse: keyframe animation with opacity scale
- Specs stagger: each row offset by 40ms
- Hover tilt: `rotate3d(1, 1, 0, 8deg)` on mouse move

---

### 3. QUALITY & SAFETY PAGE (`/quality-safety`) ⚠️ PRIORITY FIX
**Theme:** Assurance + Systematic Control

**Animation Pattern:**
- Hero: Fade-in + subtle lift (translateY from 12px to 0)
- Certificate grid: **Fast stagger** (items appear immediately as user scrolls near them)
- Process timeline: Vertical line draw + step badges slide-in
- Stats: Circular progress indicators animate from 0% to target
- Certifications: Flip card effect (3D rotation)

**Key Principle:** Trust through clarity. Animations should feel inevitable and organized.

**Implementation Details:**
- **CRITICAL FIX:** Set viewport `amount: 0.25` (was 0.5)
- **CRITICAL FIX:** Set delays to 0.05-0.08s (was 0.18-0.25s)
- **CRITICAL FIX:** GSAP timeout to 50ms (was 120ms)
- Hero lift: `initial={{ y: 12, opacity: 0 }}` → `y: 0, opacity: 1`
- Timeline: SVG line animation with `strokeDashoffset`
- Certificate cards: Quick fade-in (0.15s duration, not 0.25s)
- Progress bars: Animated from 0 to target value

---

### 4. PROJECTS PAGE (`/projects`)
**Theme:** Portfolio Showcase + Scale Demonstration

**Animation Pattern:**
- Hero: Gradient text reveal with animated underline
- Metrics cards: Count-up numbers with icon entrance
- Project filter buttons: Smooth background transition on active state
- Grid items: Staggered fade + scale with hover lift
- Image hover: Overlay gradient fade with stat popup

**Key Principle:** Highlight capability and scale. Animations draw focus to metrics and portfolio depth.

**Implementation Details:**
- Gradient text: Use CSS mask animation for character reveal
- Metrics: Sequential count-up (each staggered 150ms)
- Filter buttons: `background` color transition over 0.2s
- Grid items: Fade from 0, scale from 0.96, stagger 60ms
- Hover: Item lifts 8px with shadow growth, overlay fades in
- Numbers: React CountUp component with number formatter

---

### 5. DOWNLOADS PAGE (`/downloads`)
**Theme:** Organized Access + Efficient Retrieval

**Animation Pattern:**
- Page hero: Breadcrumb-style progressive reveal
- Download groups: Accordion expand/collapse with smooth height transition
- File list items: Fade-in on group open with staggered offsets
- Download button: Icon rotation + text slide on hover
- Category icons: Color shift on hover

**Key Principle:** Usability first. Animations guide users through content hierarchy.

**Implementation Details:**
- Hero: Sequential word reveal from left
- Groups: `height: auto` transition (use Framer Layout animation)
- File items: Staggered fade-in (150ms per item) when group opens
- Download button: Icon `rotate(360deg)` on hover, text `translateX(4px)`
- Icons: `color` transition to brand red on hover (0.2s)
- Accordion: State managed with `isOpen` boolean

---

### 6. CONTACT PAGE (`/contact`)
**Theme:** Invitation + Approachability

**Animation Pattern:**
- Hero: Centered title with animated bottom border
- Form inputs: Focus state with underline expand animation
- Contact reason buttons: Radio button animate to filled state
- Form sections: Progressive reveal as user scrolls (intersection observer)
- Map embed: Fade-in with slight parallax on scroll
- Reasons cards: Hover scale + icon rotate

**Key Principle:** Conversational and welcoming. Animations reduce friction and encourage engagement.

**Implementation Details:**
- Hero title: Bottom border `scaleX` from 0 to 1
- Form inputs: Focus underline expands from center outward
- Radio buttons: Circle fills with checkmark animate in
- Form sections: Reveal at 20% viewport with 0.3s stagger
- Map: Parallax `translateY` based on scroll position
- Reason cards: Scale from 0.98 on hover, icon rotates 45°

---

## Implementation Roadmap

### Phase 1: Fix Quality-Safety (URGENT)
**Duration:** 30 min

1. **Update `src/app/(site)/quality-safety/page.tsx`**
   - Lines 206, 214-215: Reduce delays from 0.18/0.25 to 0.05/0.08
   - Lines 478, 493: Reduce viewport `amount` from 0.5 to 0.25

2. **Update `src/components/motion/LuxuryScroll.tsx`**
   - Line 48: Change start from "top 84%" to "top 65%"
   - Line 63: Change start from "top 82%" to "top 65%"
   - Line 71: Reduce timeout from 120 to 50

3. **Update `src/app/(site)/quality-safety/CertificateGrid.tsx`**
   - Line 168: Reduce transition duration from 0.25 to 0.15

4. **Test:** Scroll quality-safety page, verify animations trigger early

---

### Phase 2: Home Page Unique Animations
**Duration:** 2-3 hours
**Tasks:**
- [ ] Create SVG text-reveal component for hero
- [ ] Implement count-up animation for stats
- [ ] Add parallax effect to about section images
- [ ] Style card scale animations for services
- [ ] Implement masonry reveal for projects grid
- [ ] Add CTA button pulse effect

**Files to create/modify:**
- `src/components/motion/TextReveal.tsx` (new)
- `src/app/(site)/page.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/ui/CountUp.tsx` (if not exists)

---

### Phase 3: Equipment Fleet Unique Animations
**Duration:** 1.5-2 hours
**Tasks:**
- [ ] Implement 3D rotate entrance for cards
- [ ] Add cursor-follow tilt effect to images
- [ ] Create badge pulse keyframe animation
- [ ] Stagger spec row reveal
- [ ] Test hover interactions on mobile (disable 3D if needed)

**Files to create/modify:**
- `src/components/motion/Card3DEntrance.tsx` (new)
- `src/app/(site)/equipment-fleet/page.tsx`

---

### Phase 4: Projects Page Unique Animations
**Duration:** 1.5-2 hours
**Tasks:**
- [ ] Implement gradient text reveal
- [ ] Add animated underline to hero
- [ ] Create count-up component for metrics
- [ ] Animate filter button active state
- [ ] Implement grid stagger with hover lift
- [ ] Add overlay gradient on image hover

**Files to create/modify:**
- `src/components/sections/Projects.tsx`
- `src/components/projects-filter-grid.tsx`

---

### Phase 5: Downloads Page Animations
**Duration:** 1 hour
**Tasks:**
- [ ] Create accordion component with smooth height transition
- [ ] Implement file item stagger on expand
- [ ] Add download button icon rotation
- [ ] Style category icon color transitions

**Files to create/modify:**
- `src/components/ui/Accordion.tsx` (if not exists)
- `src/app/(site)/downloads/page.tsx`

---

### Phase 6: Contact Page Animations
**Duration:** 1.5 hours
**Tasks:**
- [ ] Animate form input focus underline
- [ ] Create radio button fill animation
- [ ] Implement form section progressive reveal
- [ ] Add map parallax effect
- [ ] Style reason card hover effects

**Files to create/modify:**
- `src/app/(site)/contact/page.tsx`
- `src/components/ui/FormInput.tsx` (update)

---

## Animation Timing Standards

All animations should follow these timing guidelines:

| Animation Type | Duration | Delay | Easing |
|---|---|---|---|
| Quick interactions (button, hover) | 0.15-0.2s | 0ms | `[0.22, 1, 0.36, 1]` |
| Section reveal on scroll | 0.3-0.5s | 0.05-0.1s | `[0.22, 1, 0.36, 1]` |
| Stagger (per item) | - | 40-60ms | - |
| Count-up numbers | 1-2s | 0ms | `easeOut` |
| Modal/dialog | 0.15-0.25s | 0ms | `[0.22, 1, 0.36, 1]` |
| Form interactions | 0.2-0.3s | 0ms | `[0.22, 1, 0.36, 1]` |

**Easing:** Default to cubic-bezier `[0.22, 1, 0.36, 1]` for smoothness

---

## Testing Checklist

- [ ] **Desktop (1920px):** All animations play smoothly on scroll
- [ ] **Tablet (768px):** Animations scale appropriately, no jank
- [ ] **Mobile (375px):** 3D animations disabled, stagger reduced to 30ms
- [ ] **Performance:** Lighthouse > 85 for all pages
- [ ] **Accessibility:** Animations respect `prefers-reduced-motion`
- [ ] **Cross-browser:** Firefox, Chrome, Safari, Edge
- [ ] **Network:** Animations smooth on 4G throttle

---

## Fallback: Reduced Motion

Add to all animation components:

```tsx
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

// Reduce/disable animations if true
if (prefersReducedMotion) {
  return <div>{children}</div>; // No animation variant
}
```

---

## Success Metrics

- ✅ Quality-safety animations trigger 30% earlier
- ✅ No animation jank (60fps consistent)
- ✅ Each page has distinctive animation personality
- ✅ Lighthouse performance > 85
- ✅ Mobile animations optimized (no heavy 3D)
- ✅ All animations respect reduced-motion preference

---

## Notes

- **Phase 1 is critical** — start there for immediate UX improvement
- Consider creating reusable motion components as you implement (e.g., `TextReveal`, `CountUp`, `Card3D`)
- Test animations on real devices, not just browser DevTools
- Monitor Core Web Vitals after each phase
- Consider using Framer Motion for consistency across React components
