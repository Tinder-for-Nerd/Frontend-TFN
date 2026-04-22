# Tutor Website Template - Implementation-Ready UI Guidance

Tutor Website Template must feel calm, trustworthy, and conversion-focused, helping buyers, teams, and decision-makers understand the education offer quickly and act without friction.

## Context and goals

- Product/brand: Tutor Website Template.
- Product surface: marketing site.
- Primary job: explain the offer, build credibility, and drive a clear action.
- Secondary job: support inquiry, booking, or lead capture without adding visual noise.
- Design intent: clean, functional, implementation-oriented, with system consistency taking priority over local visual exceptions.
- Assumption: the brand context is inferred from the provided template brief; final photography, claims, and CTAs should be validated against the live business before launch.

## Design tokens and foundations

### Foundation tokens

| Token | Value | Usage rule |
|---|---:|---|
| `font.family.primary` | `Madefor` | Use for all headings, labels, and body text. |
| `font.family.stack` | `Madefor, Helvetica Neue, Helvetica, Arial, メイリオ, meiryo, ヒラギノ角ゴ pro w3, hiragino kaku gothic pro, sans-serif` | Use as the full fallback stack. Do not swap in a second brand font. |
| `font.size.base` | `16px` | Base size for body copy and controls. |
| `font.size.xs` | `16px` | Smallest approved text size on marketing pages. |
| `font.weight.base` | `400` | Default body weight. |
| `font.lineHeight.base` | `24px` | Default line height for readable body copy. |
| `color.text.primary` | `#20303c` | Main body text, headings, and labels on light surfaces. |
| `color.text.secondary` | `#0000ee` | Link text and secondary emphasis. |
| `color.text.tertiary` | `#ffffff` | Text on dark or filled action surfaces. |
| `color.text.inverse` | `#4d33de` | Accent text, active states, and emphasis chips. |
| `color.surface.base` | `#000000` | Dark base surface for footer, utility bands, or high-contrast sections. |
| `color.surface.muted` | `#f9fafa` | Main page background and neutral cards. |
| `color.surface.raised` | `#161616` | Elevated dark panels and overlays. |
| `space.1` | `24px` | Minimum intra-component spacing. |
| `space.2` | `27px` | Card grouping and section internal spacing. |
| `space.3` | `40px` | Major section separation and hero-to-body spacing. |
| `radius.xs` | `6px` | Small interactive controls and subtle chips. |
| `motion.duration.instant` | `200ms` | Hover, focus, active, and loading transitions. |

### Semantic token rules

- Components must use semantic tokens such as `color.text.primary`, `color.surface.muted`, and `space.2`, not hard-coded hex values or ad hoc spacing.
- Any derived token such as `color.focus.ring`, `color.border.default`, `color.action.primary`, `color.action.secondary`, or `color.feedback.error` must be defined in the token layer before implementation and reused everywhere.
- The design system should keep spacing on the `24px / 27px / 40px` rhythm. If a tighter value is needed, define a token alias first instead of inlining a one-off number.
- Typography should remain on the same family stack. Do not introduce alternate display fonts or decorative scripts.
- Interactive motion should stay within `motion.duration.instant` for ordinary state changes. Longer transitions should be rare and purposeful.
- Contrast-safe error and status tokens must be defined explicitly before shipping. Do not rely on low-contrast red or gray status text.

### Density and layout budget

- The default marketing page must keep visible primary links to a maximum of 4 and visible buttons to a maximum of 3 within the main route view.
- The header should stay simple: brand, up to 4 navigation links, and at most 1 primary CTA.
- If more actions are needed, secondary actions should move into the footer or a collapsed menu rather than increasing top-level clutter.
- Content sections should prefer broad whitespace and short blocks over dense multi-column text on desktop.

## Component-level rules

### 1) Page shell and header navigation

- Anatomy: brand lockup, up to 4 nav links, one primary CTA, optional utility link, and a content shell that keeps the page centered and readable.
- Variants: sticky desktop header, condensed mobile header, and inverse header for dark bands.
- States: default, hover, focus-visible, active, disabled, loading, and error must be defined for every interactive header item.
- Behavior: keyboard users must tab from brand to navigation to CTA in visual order; pointer users should get clear hover feedback; touch users must have large tap targets.
- Focus rules: focus-visible must be obvious on all links and buttons in the header; do not remove focus outlines without replacing them with a stronger visible ring.
- Overflow handling: long nav labels should be shortened or moved to a collapsed menu before they wrap awkwardly. Do not let the header exceed one row on desktop.
- Empty-state handling: if a nav item is unavailable, hide it rather than leaving a dead control in place.
- Responsive behavior: collapse the header before the content width becomes cramped; on mobile, preserve brand visibility and make the CTA the most obvious action.

### 2) Primary button

- Anatomy: label, optional leading icon, optional trailing icon, and consistent internal padding.
- Variants: primary filled CTA, secondary outlined CTA, and text-style utility button.
- States: default, hover, focus-visible, active, disabled, loading, and error.
- Default: use the strongest action token for the background and `color.text.tertiary` for the label.
- Hover: should feel slightly elevated and more confident without changing the button size.
- Focus-visible: must show a ring that is visible against both light and dark surfaces.
- Active: should compress or shift by one step to indicate press without layout jump.
- Disabled: must be visibly muted, non-interactive, and removed from the tab order.
- Loading: must preserve width and keep the layout stable; use a spinner or progress label but do not replace the button with a different-sized element.
- Error: if the action fails, the button should remain available and the error must be explained in adjacent helper text or an error banner; do not encode error only in button color.
- Keyboard, pointer, touch: Enter and Space must activate the button; pointer hover must not be the only cue; touch targets must be at least 44 by 44 px.
- Overflow handling: if a label wraps to more than two lines, shorten the label instead of allowing a tall button stack.
- Empty-state handling: if there is no valid action, render a disabled button only when needed and explain why.

### 3) Text link

- Anatomy: inline text, optional underline, optional icon, and optional active marker.
- Variants: body link, nav link, footer link, and utility link.
- States: default, hover, focus-visible, active, disabled, loading, and error.
- Default: links must be visually distinct from body copy and should remain unmistakable in low-glance contexts.
- Hover: should reinforce the link with a visible underline or weight change rather than a color-only shift.
- Focus-visible: must be at least as visible as hover and must not disappear into the background.
- Active: should show a clear pressed or current-state indication, especially in navigation.
- Disabled: should not look like a normal clickable link; use muted text plus explanatory copy if a destination is not available.
- Loading: if a link is being resolved in an async module, show a skeleton or progress state rather than a dead tap target.
- Error: broken destinations must not ship as links; replace them with a fallback message or hide them.
- Keyboard, pointer, touch: Enter must activate; pointer users should receive visible hover feedback; touch targets should be padded enough to avoid mis-taps.
- Overflow handling: long link text should wrap naturally in body copy, but navigation labels should be shortened before they become multi-line on desktop.
- Empty-state handling: empty link groups should collapse cleanly instead of leaving blank space.

### 4) Form fields and submission areas

- Anatomy: label, control, helper text, error text, and submit action.
- Variants: text input, email input, textarea, select, checkbox, and grouped consent area.
- States: default, hover, focus-visible, active, disabled, loading, and error.
- Default: label and control should be clearly separated and easy to scan.
- Hover: should subtly reinforce the border or surface without changing the input height.
- Focus-visible: must be strong, immediate, and easy to distinguish from default borders.
- Active: should feel responsive while typing or selecting.
- Disabled: must be readable but obviously inactive.
- Loading: during submission, fields may be disabled while the submit action shows progress.
- Error: must be associated with the field using `aria-describedby` and `aria-invalid`; the error message must be visible without relying on color alone.
- Keyboard, pointer, touch: Tab must move through fields in logical order; Enter must submit single-line forms; Space must toggle checkboxes; touch targets must be generous and not rely on precision.
- Overflow handling: helper and error text should wrap; textarea content should scroll internally after a sensible maximum height instead of pushing the page apart.
- Empty-state handling: a blank required field should show helper guidance on blur or on submit, not a generic failure message.
- Responsive behavior: stack fields vertically on small screens and preserve full-width controls.

### 5) Marketing cards and callout panels

- Anatomy: optional eyebrow, headline, supporting text, media area or stat, and optional CTA.
- Variants: feature card, testimonial card, stat card, program card, and callout panel.
- States: default, hover, focus-visible, active, disabled, loading, and error.
- Default: cards should sit cleanly on `color.surface.muted` or `color.surface.raised` with consistent radius and spacing.
- Hover: interactive cards may lift slightly or reveal a low-motion accent, but the card must not resize or shift the grid.
- Focus-visible: clickable cards must show a visible focus ring and be reachable by keyboard.
- Active: should indicate press clearly when the full card is interactive.
- Disabled: must be clearly non-interactive and visually quieter than active cards.
- Loading: use skeletons for headlines, copy, and media blocks.
- Error: if data is unavailable, render a neutral fallback card with a short explanation and one clear CTA.
- Keyboard, pointer, touch: if the entire card is interactive, the full card area must be clickable and keyboard reachable; pointer hover should not be required to discover the action.
- Overflow handling: title text should clamp to 2 lines and body text to 3 lines; if content is longer, move it to a detail view rather than clipping it.
- Empty-state handling: empty testimonial or stats zones should show one concise message and one route-forwarding CTA.
- Responsive behavior: use a 3-up layout on wide screens, then reduce to 2-up and 1-up as space narrows; do not let cards become unreadably narrow.

### 6) Footer and utility links

- Anatomy: compact brand note, 4-link groups, legal links, and a small utility action area.
- Variants: light footer, dark footer, and reduced footer for short pages.
- States: default, hover, focus-visible, active, disabled, loading, and error.
- Keyboard, pointer, touch: same link behavior rules apply; links must be easy to tab through and easy to tap.
- Overflow handling: groups should stack into columns on desktop and flatten into a single column on mobile if needed.
- Empty-state handling: if a group has no valid links, remove the group entirely.
- Responsive behavior: keep the footer readable without becoming a second navigation bar.

## Accessibility requirements and testable acceptance criteria

All accessibility rules below must be testable in implementation.

| Requirement | Pass if | Fail if |
|---|---|---|
| Keyboard navigation | Every interactive element is reachable by Tab in visual order and there is no keyboard trap. | Any control is skipped, unreachable, or traps focus. |
| Focus visibility | Every interactive element shows a visible focus ring in keyboard mode and in forced-colors mode. | Focus is hidden, faint, or only visible on hover. |
| Contrast | Text and meaningful icons meet WCAG 2.2 AA contrast. | Body text, labels, or CTA text fall below AA. |
| Target size | Buttons, checkboxes, and links used as actions are at least 44 by 44 px or have equivalent spacing. | Touch targets are too small or crowded. |
| Screen reader naming | All buttons, links, inputs, and icons with meaning have descriptive accessible names. | Labels are ambiguous, empty, or icon-only. |
| Form errors | Invalid fields expose `aria-invalid`, connect error text via `aria-describedby`, and announce errors in a live region when appropriate. | Errors are only color-based or not announced. |
| Reduced motion | `prefers-reduced-motion: reduce` disables non-essential transitions and animations. | Motion continues at full strength when the user asks for reduced motion. |
| Responsive scaling | The layout works at 320 px wide and at 400% zoom without horizontal scrolling caused by the core layout. | Content overlaps, clips, or forces the user to scroll sideways. |
| Landmarks | The page has a clear header, main region, and footer or equivalent landmarks. | The page structure is not exposed to assistive technology. |
| State clarity | Disabled, loading, and error states are visibly distinct from default and hover states. | Users cannot tell whether an element is available or failed. |

Implementation checks:

- Must verify tab order with a keyboard-only pass.
- Must verify visible focus in light and dark sections.
- Must verify contrast with automated tooling and a manual spot check.
- Must verify touch behavior on a narrow mobile viewport.
- Must verify reduced-motion behavior with the operating system preference enabled.
- Must verify error messaging without relying on color alone.

## Content and tone standards with examples

The tone should be concise, confident, and implementation-focused. Write for buyers, teams, and decision-makers who want to understand the offer quickly.

### Copy rules

- Headlines should state the outcome clearly.
- Subheads should explain what the site helps the user do.
- CTA labels should use a verb and a specific noun or outcome.
- Supporting copy should be short and concrete.
- Error text should explain the fix, not just the problem.
- Avoid fluffy or vague marketing language.

### Examples

| Purpose | Good | Avoid |
|---|---|---|
| Hero headline | `Find the right tutor team faster.` | `Welcome to our amazing platform.` |
| Primary CTA | `Book a free intro call` | `Click here` |
| Secondary CTA | `View tutoring plans` | `Learn more` |
| Support text | `Compare programs, pricing, and schedules in one place.` | `We help you succeed.` |
| Error copy | `Enter a valid email address to continue.` | `Something went wrong.` |
| Trust copy | `Built for families, schools, and growing teams.` | `Perfect for everyone.` |

### Tone constraints

- Should sound organized, calm, and reliable.
- Should avoid jargon unless it is directly relevant to the offer.
- Should favor specific outcomes over hype.
- Must not use ambiguous labels for actions or navigation.

## Anti-patterns and prohibited implementations

- Must not use low-contrast text, hidden focus indicators, or color-only state cues.
- Must not introduce one-off spacing or typography exceptions outside the token system.
- Must not use generic action labels such as `Click here`, `Submit`, or `Learn more` when a more specific action is available.
- Must not allow the header, hero, and footer to turn into a crowded link farm.
- Must not ship cards or buttons with mismatched heights, arbitrary radii, or inconsistent spacing.
- Must not clip long copy, hide overflow without a fallback, or let content overlap adjacent sections.
- Must not rely on autoplay media, distracting motion loops, or decorative effects that obscure the content.
- Must not leave disabled, loading, or error states undefined.
- Must not keep dead links, placeholder actions, or unlabeled icons in the final marketing site.
- Must not let navigation or forms become unusable at small screen widths or under zoom.

## QA checklist

- [ ] Token mapping is implemented with semantic names only.
- [ ] The page respects the 4-link and 3-button density budget.
- [ ] All interactive components define default, hover, focus-visible, active, disabled, loading, and error states.
- [ ] Keyboard-only navigation works from top to bottom without traps.
- [ ] Focus-visible styling is clearly visible on every interactive element.
- [ ] Text and icon contrast passes WCAG 2.2 AA.
- [ ] Buttons, links, and checkboxes meet touch target expectations.
- [ ] Long headlines, body copy, and labels wrap or clamp without overflow bugs.
- [ ] Empty states and unavailable states have a clear fallback message and next step.
- [ ] Reduced-motion preference removes non-essential animation.
- [ ] Forms announce errors and connect them to the relevant inputs.
- [ ] The layout remains stable at 320 px wide, at tablet widths, and at 400% zoom.
- [ ] No ambiguous CTA labels or dead links remain in the final site.
- [ ] The final visual system uses one consistent font stack and one spacing rhythm.
- [ ] The implementation matches the provided brand palette and does not add ad hoc colors.
