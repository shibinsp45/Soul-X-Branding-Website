
Goal
- Stop the runtime crashes/blank screen coming from React Three Fiber’s `applyProps` when Lovable-injected `data-lov-*` attributes are applied to Three.js instances.
- Keep the galaxy background + shooting stars (with occasional “bursts”) working, and respect `prefers-reduced-motion`.
- Make the page resilient: even if WebGL or R3F fails, the landing page must still render.

What’s actually happening (step-by-step diagnosis)
1) Lovable injects attributes like `data-lov-path`, `data-lov-id`, etc into JSX elements for editing.
2) In React Three Fiber, any prop containing `-` is treated as a nested path:  
   `data-lov-path` ⇒ `instance.data.lov.path`
3) R3F then walks that path using `keys.reduce((acc, k) => acc[k], instance)`.
4) The error `Cannot read properties of undefined (reading 'path')` means that at some point in that walk, the intermediate object (`instance.data` or `instance.data.lov`) is `undefined`, so `undefined["path"]` crashes.
5) The current patch tries to add a `data` getter to a few Three.js prototypes, but it can still fail if:
   - The object being patched isn’t using the same `three` module instance as the one R3F uses (duplicate `three` copies).
   - A prototype already has a `data` property descriptor, so the patch skips it, and that existing `data` doesn’t contain `lov`.
   - An object that receives `data-lov-*` isn’t covered by the patched prototypes.

Implementation plan (in the order I’ll execute)
A) Make the “data.lov” protection truly robust (fixes both “lov” and “path” crashes)
1) Replace the current “define .data only if missing” patch with a wrapper patch that:
   - Works even if `data` already exists on the prototype (do not early-return).
   - Preserves any existing getter/setter by delegating to it, but always ensures:
     - `data` is an object
     - `data.lov` exists
2) Implement `data.lov` as a deep auto-vivifying Proxy:
   - Any access like `data.lov.path.anything.more` will never throw; missing nodes become objects automatically.
   - This makes *all* `data-lov-*` paths safe, not just the ones we’ve seen.
3) Expand patch coverage beyond the current four prototypes:
   - Patch `THREE.EventDispatcher.prototype` if present (many Three classes derive from it), and keep the existing ones (`Object3D`, `Material`, `BufferGeometry`, `Texture`).
   - If needed, include `THREE.BufferAttribute.prototype` (some geometries/attributes may be targets depending on drei internals).
4) Ensure the patch runs before the `<Canvas>` mounts (top-level of module is fine as it is today).

B) Ensure there is only one `three` in the bundle (prevents “patched a different THREE than R3F uses”)
1) Update `vite.config.ts` to dedupe:
   - `three`
   - `@react-three/fiber`
   - `@react-three/drei`
   - (keep the existing `react` / `react-dom` dedupe you already have)
2) Verify there are no aliases pulling in a second copy of `three` (if there are, unify them).

C) Prevent blank screens: add a safe fallback when WebGL/R3F fails
1) Add a small React Error Boundary around `GalaxyBackground` usage so if anything inside Canvas throws, the rest of the hero still renders.
   - Where: wrap the `<GalaxyBackground />` inside `Hero.tsx` (or wrap inside `GalaxyBackground.tsx`—Hero is usually the best place so the error boundary doesn’t remount the whole page).
2) Provide a lightweight fallback UI:
   - A static gradient background + subtle CSS noise/overlay (or reuse an existing image like `Header-background.webp`) in dark mode.
   - This ensures “has_blank_screen: true” becomes “false” even if WebGL breaks.

D) Make GalaxyBackground mount only when needed (reduces crash surface + improves performance)
1) Currently `hidden dark:block` only hides via CSS; it still mounts Canvas and can crash.
2) Add a real runtime gate:
   - Detect whether the document is currently in dark mode (`document.documentElement.classList.contains("dark")`)
   - Watch for theme changes via a `MutationObserver` (since your ThemeToggle updates the `dark` class directly)
   - Only render `<Canvas>` when dark mode is active
3) Add a “WebGL supported” check:
   - If WebGL isn’t supported, render the same fallback (no Canvas).

E) Complete the “occasional bursts” shooting-star feature (while keeping motion accessibility)
1) Keep current streak lines, but add bursts on a subset of stars when they finish (e.g., 20–30% of stars):
   - When a star reaches the end, spawn a burst: small set of particles expanding outward with quick fade (0.3–0.6s).
2) Respect reduced motion:
   - If `prefers-reduced-motion: reduce`, disable both streaks and bursts entirely.
3) Performance refinement (recommended while we’re here, to avoid new “issues”):
   - Avoid calling `setStars` every frame (React rerender at 60fps can be heavy).
   - Store star/burst simulation in refs and only trigger React state when arrays change (spawn/despawn), or switch to a single `Points` with a buffer attribute updated in `useFrame`.

Validation checklist (what I will verify in Preview after implementing)
- No runtime error on `/` in both light and dark mode.
- Toggling theme to dark does not crash and shows galaxy background.
- With reduced motion enabled at OS level:
  - Galaxy can render (static), but shooting stars/bursts do not animate.
- If I force an error inside GalaxyBackground (temporary test), the hero still renders and shows fallback background instead of blank screen.
- No WebGL context creation in light mode (Canvas should not mount).

Risk/Trade-offs
- The Proxy-based approach is intentionally defensive. It’s the most reliable way to prevent dashed-prop traversal crashes caused by externally injected attributes.
- Dedupe changes in Vite are important; without them, any prototype patch can be applied to the “wrong” `three` copy and silently fail.

Files I expect to touch in implementation
- `src/components/GalaxyBackground.tsx`
  - Replace/upgrade the patch to Proxy-based + broader coverage
  - Add dark-mode gating + WebGL fallback logic (if placed here)
  - Add burst effect and (optionally) ref-based animation for performance
- `src/components/Hero.tsx`
  - Add ErrorBoundary wrapper and fallback UI
- `vite.config.ts`
  - Add `resolve.dedupe` entries for `three` and R3F packages

Non-interactive “next feature” ideas (after everything is stable)
- Add a “Performance” toggle in settings that reduces star count / disables bursts on low-end devices
- Add subtle mouse-parallax camera drift (disabled under reduced motion)
- Add a “Night sky” color palette control (primary/nebula colors)
