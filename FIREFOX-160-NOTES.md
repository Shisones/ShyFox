# ShyFox on Firefox 160 / Nova — change log

`chrome/` is the live working copy of the theme, `user.js` the prefs that go
with it, and `sidebery-settings.json` the matching Sidebery import. The notes
below are the Firefox 160/156 compatibility work applied on top of ShyFox 3.8.

Everything below is already applied in `chrome/`. Re-apply these changes if
you ever replace `chrome/` with a fresh ShyFox download.

## Firefox 156+ compatibility (the big ones)

1. **`chromehidden` was removed in Firefox 156.**
   ShyFox used `[chromehidden=""]` to mean "a normal window". Once the
   attribute was gone the test inverted and `#navigator-toolbox` was hidden,
   which removed the entire UI. All seven occurrences are now:

   - `[chromehidden=""]` → `:not([popup-window], [chromehidden~="toolbar"])`
   - `:not([chromehidden=""])` → `[popup-window], [chromehidden~="toolbar"]`

2. **Boolean XUL attributes are empty, not `"true"`.**
   Replaced `[collapsed="true"]`, `[disabled="true"]`, `[inactive="true"]`,
   `[hidden="true"]` and `[inFullscreen="true"]` with presence selectors
   (`[collapsed]`, `[disabled]`, `[inactive]`, `[hidden]`, `[inFullscreen]`).

3. **Nova renamed theme variables.** Added fallbacks:

   - `--toolbar-bgcolor` → `--toolbar-background-color`
   - `--arrowpanel-background` → `--panel-background-color`
   - `--toolbarbutton-hover-background` → `--toolbarbutton-background-color-hover`
   - `--toolbar-color` → `--toolbar-text-color`
   - `--toolbar-start-end-padding` → `--toolbar-padding-inline`
   - `--arrowpanel-menuitem-border-radius` → `--panel-menuitem-border-radius`

4. **Nova URL bar is a `<moz-urlbar>` custom element.** Ids became classes:
   `#urlbar-background` → `.urlbar-background`,
   `#urlbar-input` → `.urlbar-input`,
   `#urlbar-input-container` → `.urlbar-input-container`.
   The old `[breakout][breakout-extend]` state no longer exists; the floating
   search now uses `[focused]`/`[open]` and moves `.urlbar-background` and
   `.urlbar-input-container` instead of the whole element so Nova's anchored
   results popover follows.

5. **`#appcontent` was removed.** Content backgrounds now use
   `.browserStack`/`.browserContainer`; fullscreen borders use
   `#tabbrowser-tabpanels browser`.

6. **Native vertical tabs / new sidebar.** `user.js` sets
   `sidebar.verticalTabs=false` and `sidebar.revamp=false`. `shy-nova.css`
   additionally hides `#sidebar-container`, `#sidebar-launcher-splitter` and
   `#vertical-tabs`, and force-shows `#TabsToolbar` if Firefox collapses it.

7. **Sidebar position detection.** `[style*="order: 2/4"]` never matched;
   it now uses the `[sidebar-positionend]` attribute Firefox sets itself.

8. **Nova draws a 1px top/left border on `.browserContainer`.** That doubled
   the content border on the top and left. `shy-nova.css` removes it, leaving
   exactly the 1px `#tabbrowser-tabbox` border on all four sides.

9. **`browser.newtabpage.activity-stream.nova.enabled=false`** in `user.js`
   keeps the old new-tab DOM that ShyFox's `userContent.css` targets.

## Sidebery / white flash / sidebar edges

- `user.js` forces
  `layout.css.prefers-color-scheme.content-override=0` so content pages use
  dark colours.
- `user.js` sets the official blank-content background:
  `browser.display.background_color=#23222b` and
  `browser.display.use_system_colors=false`. That is the layer that flashed
  white before a page/sidebar had painted.
- The Sidebery page uses `html { background-color:Canvas }` (dark because of
  the forced content colour scheme) with `margin/padding:0`; `--general-margin`
  is `0` so the panel background fills all the way to the sidebar border
  (no gap). The panel's own theme background is left alone (do not force it,
  or the sidebar loses its colour).
- The panel backing is `var(--pp-col)` on `#sidebar`, the browser stack and
  `#sidebar-box` (shown/hover only). The box is transparent in the hidden
  resting state, so its off-screen ledge never paints the panel colour. The
  box's `background-color` is excluded from the slide transition, so the
  backing is opaque on the very first frame (no white first-paint flash).
- `#sidebar-box` has no border/outline in any state; the 1px border showed as
  a line at its right edge (it sits `--panel-hide-ldg` inside the content).
- `--pp-col` falls back to `tomato`, and `about:blank` is hardcoded `tomato`,
  so a blank/unresolved surface is obvious instead of looking white.
- `#sidebar-box` padding is forced to `0`; Nova's `padding-inline-start`
  caused the visible gap between the Sidebery background and the border.
- `#sidebar-box` border is disabled in the resting state; the hover state
  restores the original theme `--outline`/`--shadow`, so the border colours
  are the original ones.
- `@-moz-document url("about:blank")` and the `webext-panels.xhtml` wrapper
  use `Canvas` to avoid a white first paint.
- The hidden sidebar opens with `left` measured from `--left-margin` (not
  `--top-margin`), so its gap from the content border is equal on the top and
  on the left.
- The bookmarks toolbar follows the theme: transparent at rest and
  `var(--bg-col)` when the hidden panel is shown.

## Small layout/polish fixes

- Indication bars on hidden panels all use `--hide-bar-size`
  (`calc(var(--margin) - 6px)`, ≈5px) — same thickness on left/right/top.
- `--outline` is back to the original theme mapping
  `var(--panel-background-color, var(--arrowpanel-background))`, so content
  and sidebar border colours match the theme again. The top/left thickness
  problem was a separate Nova `.browserContainer` 1px border; that is removed
  in `shy-nova.css` so `#tabbrowser-tabbox` is exactly 1px on all four sides.
- Status panel (`Ctrl` link status) and menubar both use `--margin / 2`
  spacing:
  - menubar: top and left = `--top/left-margin + --margin/2`
  - status panel: bottom and left = `--margin/2` inside the content border
- Menubar is `width:fit-content` and expands (`max-height:none`) while active.
- Right-hand toolbar: every button (menu, unified extensions, downloads and
  any other toolbarbutton in `#TabsToolbar-customization-target`) uses the
  same 45×40 hit box and 32×32 highlight/icon box, so their icons and
  padding line up exactly.
- All chrome/content scrollbars are hidden (`scrollbar-width:none`).
- Nova results popover is opaque (`--tb-col`), has the theme border/radius and
  no backdrop-filter so page text cannot show through the recommendation rows.
- Floating search: 50px bar at `20vh`/18vw/64vw, 28px icons and search-mode
  button vertically centred, opaque panel background, theme outline/shadow,
  left-aligned input text, dimmed content behind.

## Manual steps after a restart

These are extension settings, not CSS:

1. Restart Firefox fully. `userChrome.css`, `userContent.css` and `user.js`
   are only read at startup.
2. Userchrome Toggle Extended → enable Styles 1–3 (sidebar/toolbar/navbar
   hidden) and leave Style 4 (clean mode) off. Enable
   “Allow multiple styles to be active together”.
3. Sidebery → Settings → Import → `sidebery-settings.json`.

If a white flash ever comes back, check these three in order:
- Sidebery `html`/`#root` background (it must not resolve a Firefox chrome
  variable inside the extension document; use the literal dark colour),
- `#sidebar-box` padding (must be 0),
- the `webext-panels.xhtml` / `about:blank` backgrounds.
