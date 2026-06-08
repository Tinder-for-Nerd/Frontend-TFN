# Design System Strategy: The Academic Luminary

## 1. Overview & Creative North Star
The design system is built upon the "Academic Luminary" creative north star. Moving away from the rigid, boxed layouts of traditional educational platforms, this system treats the digital interface as a sophisticated editorial space. It combines the authority of a prestigious institution with the fluid, light-filled energy of modern digital learning.

By leveraging intentional asymmetry, high-contrast typography, and a "layered paper" philosophy, the design system avoids the common "template" aesthetic. It emphasizes breathing room, sophisticated color transitions, and an editorial hierarchy that guides the student through their learning journey with elegance and clarity.

## 2. Colors: Depth and Soul
The palette is rooted in professional deep blues (`secondary_fixed`: #111A3E) and vibrant action blues (`primary`: #0044C9), creating a sense of trust and kinetic energy.

*   **The "No-Line" Rule:** To achieve a premium look, designers are prohibited from using 1px solid borders to define layout sections. Contrast must be achieved through background shifts. For example, a card utilizing `surface_container_lowest` (#ffffff) should sit on a background of `surface_container_low` (#F1F4F9).
*   **Surface Hierarchy & Nesting:** View the UI as a physical stack. The base is `surface` (#F7F9FF). Important functional blocks should "lift" or "sink" using the tier scale:
    *   **Level 0 (Base):** `surface`
    *   **Level 1 (Subtle Inset):** `surface_container_low`
    *   **Level 2 (Active Cards):** `surface_container_lowest`
*   **The "Glass & Gradient" Rule:** Use Glassmorphism for floating navigation and temporary overlays. Apply a backdrop-blur (12px–20px) to `surface_container` with 80% opacity to let content bleed through beautifully.
*   **Signature Textures:** Main CTAs and Hero backgrounds should never be flat. Use a subtle linear gradient (135°) from `primary` (#0044C9) to `primary_container` (#0059FF) to add a luminous, professional "soul" to the interface.

## 3. Typography: The Editorial Voice
The system uses a pairing of **Plus Jakarta Sans** for high-impact display and **Inter** for functional reading.

*   **Display & Headlines (Plus Jakarta Sans):** These are the "Editorial Voice." Large scales (`display-lg`: 3.5rem) with tight letter-spacing (-2%) create an authoritative, modern presence.
*   **Body & Labels (Inter):** These are the "Functional Voice." Inter provides exceptional legibility at smaller scales. `body-lg` (1rem) is the standard for long-form educational content to ensure a comfortable reading rhythm.
*   **Hierarchy Strategy:** Use `tertiary` (#A70125) in `label-md` for uppercase "Category" or "Pre-header" tags to create a rhythmic break in the blue-heavy color flow, signaling important metadata.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are largely replaced by tonal shifts and ambient light.

*   **The Layering Principle:** Instead of shadows, use the transition from `surface_container_low` to `surface_container_lowest` to create a soft, natural lift.
*   **Ambient Shadows:** When a true "floating" state is required (e.g., a hovered course card), use a diffused shadow: `y-12, blur-24, color: on_surface @ 6%`. This mimics natural light rather than a harsh digital offset.
*   **The "Ghost Border" Fallback:** For inputs or cards requiring high definition, use a "Ghost Border": `outline_variant` (#C3C5D9) at 20% opacity. Never use 100% opaque borders.
*   **Glassmorphism:** Apply a 1px "inner glow" border of `surface_container_lowest` at 30% opacity to glass elements to define their edges without adding weight.

## 5. Components: Refined Interaction

### Buttons
*   **Primary:** Rounded `md` (0.75rem), using the signature `primary` to `primary_container` gradient. No border. Text in `on_primary` (#FFFFFF).
*   **Secondary:** `surface_container_high` background with `on_secondary_container` text. This provides a "soft" alternative that doesn't compete with the primary action.
*   **Tertiary/Ghost:** No background. `primary` text with a subtle underline appearing only on hover.

### Cards & Lists
*   **Card Style:** Use `xl` (1.5rem) rounded corners. Content should be separated by whitespace (using the 24px/32px spacing scale) rather than divider lines.
*   **Course Lists:** Use a vertical tonal shift. Each list item should be `surface` on a `surface_container_low` parent, separated by 12px of margin to create "gaps" that reveal the background.

### Input Fields
*   **Style:** `surface_container_lowest` background with a `sm` (0.25rem) corner radius.
*   **States:** On focus, transition the background to `white` and add a 2px `primary_fixed` (#DCE1FF) outer glow (not a solid border).

### Chips & Badges
*   **Selection Chips:** Use `primary_fixed` background with `on_primary_fixed` text for a soft, high-legibility look that feels modern and approachable.

## 6. Do's and Don'ts

### Do
*   **DO** use asymmetric layouts. Place images slightly off-center or overlapping container boundaries to create an editorial feel.
*   **DO** use `secondary_fixed` (#111A3E) for footer backgrounds to ground the design with a sense of "Institutional Authority."
*   **DO** prioritize generous white space. If a layout feels crowded, increase the `surface` gaps rather than adding lines.

### Don'ts
*   **DON'T** use 1px solid black or high-contrast grey borders for any reason.
*   **DON'T** use standard "drop shadows" with 20% or higher opacity.
*   **DON'T** mix the rounded corner scales within a single component group; keep buttons at `md` and cards at `xl` for a consistent visual rhythm.
*   **DON'T** use `error` (#BA1A1A) for anything other than critical alerts. For "Warning" or "Highlight," use `tertiary` (#A70125).