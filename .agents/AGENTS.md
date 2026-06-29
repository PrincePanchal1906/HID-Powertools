# Unified Mobile-First Design System

From this point forward, the entire project must follow a single, unified Mobile-First Design System. Every existing and future component must automatically follow these standards without requiring explicit prompts.

## Core Philosophy
- Design the website like a premium modern ecommerce application.
- Reference quality: Apple, Amazon, Shopify, Stripe, Linear, Nike, Nothing.
- Every page should feel intentionally designed.
- Never simply make desktop responsive. Design mobile first.

## Mobile First Rules
- Every component must be designed for mobile before tablet and desktop.
- Desktop is only a progressive enhancement.
- Never squeeze desktop layouts into mobile.
- Do not only make components responsive. Create dedicated mobile layouts whenever the desktop composition does not translate well to smaller screens.

## Layout
- Consistent horizontal padding and vertical spacing.
- Equal alignment and proper content hierarchy.
- No wasted space or oversized sections. Every section should feel balanced.

## Cards
- All cards should follow one design language: same border radius, shadow philosophy, hover behavior (desktop only), spacing, typography scale, and icon sizing.
- Do not create different card styles unless there is a very strong reason.

## Buttons
- Comfortable touch targets.
- Consistent heights, border radius, typography, and spacing.

## Icons
- Icons should remain visually consistent.
- Avoid oversized icons.
- Maintain one icon sizing system across the project.

## Typography
- Create one typography scale.
- Maintain consistent heading sizes, paragraph sizes, labels, and captions.
- Avoid random font sizes.

## Section Height
- Avoid oversized sections.
- Each section should communicate its purpose efficiently.
- Reduce unnecessary whitespace. Use spacing intentionally.

## Mobile UX
- Comfortable one-hand usage.
- No horizontal scrolling, clipped text, overflow, tiny buttons, excessive spacing, or cramped spacing.

## Lists
- Whenever possible, prefer: horizontal cards, compact layouts, small grids, and efficient information density.
- Avoid unnecessarily tall layouts.

## Performance
- Performance is always more important than visual effects.
- Server Components first, minimal Client Components.
- Native browser features, minimal JavaScript.
- CSS over JavaScript whenever possible.
- Smooth scrolling, no scroll jank, no unnecessary animations.

## Consistency & Auto-Refactoring
- Before completing any feature, compare it against the rest of the website.
- If something looks inconsistent, automatically refactor it. Do not wait for user instruction.

## Responsive Review
- Every completed page must be reviewed at: 375px, 390px, 430px, Tablet, Desktop.
- Automatically fix inconsistencies.

## Final Quality Check
Before considering any page complete, verify:
- Premium UI & UX
- Mobile-first & Responsive
- Accessibility & Performance
- Design consistency
- Clean architecture & Reusable components
- Improve any part automatically if it feels inconsistent with the overall design system.
