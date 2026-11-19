// userchrome.css usercontent.css activate
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// disable new sidebar
user_pref("sidebar.revamp", false);

// ShyFox uses Sidebery on the legacy sidebar; native vertical tabs collapse
// #TabsToolbar (the right-hand toolbar) and add the new sidebar to #browser.
user_pref("sidebar.verticalTabs", false);

// keep the old new-tab layout that ShyFox's userContent.css is written for
user_pref("browser.newtabpage.activity-stream.nova.enabled", false);

// Floating search is enabled with the Nova-compatible implementation in
// chrome/ShyFox/shy-floating-search.css.
user_pref("shyfox.disable.floating.search", false);

// Force a dark background in the content viewer itself. This is what paints
// before a page (or the Sidebery sidebar) has loaded its own background, and
// is the official pref for the blank-page colour.
user_pref("browser.display.background_color", "#2b2a33");
user_pref("browser.display.use_system_colors", false);

// Sidebery ships a light-dark() background based on the content colour scheme.
// Force content to dark so its initial page is #333 instead of a white flash.
user_pref("layout.css.prefers-color-scheme.content-override", 0);

// allow the ShyFox extensions (Sidebery, Userchrome Toggle Extended) that are
// placed in the profile's extensions/ folder to load
user_pref("extensions.autoDisableScopes", 0);
user_pref("extensions.enabledScopes", 15);

// Fill SVG Color
user_pref("svg.context-properties.content.enabled", true);

// CSS's `:has()` selector 
user_pref("layout.css.has-selector.enabled", true);

// Integrated calculator at urlbar
user_pref("browser.urlbar.suggest.calculator", true);

// Integrated unit convertor at urlbar
user_pref("browser.urlbar.unitConversion.enabled", true);

// Trim  URL
user_pref("browser.urlbar.trimHttps", true);
user_pref("browser.urlbar.trimURLs", true);

// GTK rounded corners
user_pref("widget.gtk.rounded-bottom-corners.enabled", true);

// Who is bogus? (fixes Sidebery tab dragging on Linux)
user_pref("widget.gtk.ignore-bogus-leave-notify", 1);
