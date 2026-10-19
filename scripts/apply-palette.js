const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Replace the top comment and :root tokens
const oldRootRegex = /\/\* =+[\s\S]*?Visual Identity System: Obsidian[\s\S]*?:root\s*\{[\s\S]*?\n\}/;

const newRoot = `/* ==========================================================================
   HOTEL WALLFLOWER - KOTA, RAJASTHAN
   Website Color Palette: The Perfect White & Gold Palette
   - Pure White (#FFFFFF): Main background · Clean sections
   - Warm Ivory (#FAF8F3): Alternate background · Cards
   - Soft Beige (#F2E9DA): Subtle section backgrounds · Borders
   - Champagne Gold (#E7C98E): Primary accent · Buttons · Icons
   - Classic Gold (#D4AF37): Highlights · Premium details
   - Dark Goldenrod (#B8860B): Hover states · Strong gold accents
   - Typography Pairing: Cormorant Garamond & DM Sans
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

/* --- Hotel Wallflower Perfect White & Gold Luxury Design Tokens --- */
:root {
  /* User Defined Website Color Palette */
  --color-white: #FFFFFF;
  --color-ivory: #FAF8F3;
  --color-beige: #F2E9DA;
  --color-champagne: #E7C98E;
  --color-gold: #D4AF37;
  --color-dark-gold: #B8860B;

  --color-text: #24211D;
  --color-muted: #6B6256;
  --color-border: #E8E2D8;

  /* Core Visual Identity Tokens mapped to White & Gold */
  --white: var(--color-white);
  --ivory: var(--color-ivory);
  --obsidian: var(--color-white);
  --charcoal: var(--color-ivory);
  --muted-grey: var(--color-muted);
  --stone: var(--color-muted);
  --oxblood: var(--color-dark-gold);

  /* Surfaces & Backgrounds */
  --bg-dark-base: var(--color-white);
  --bg-deep: var(--color-ivory);
  --bg-surface: var(--color-white);
  --bg-card: var(--color-ivory);
  --bg-primary: var(--color-white);
  --bg-secondary: var(--color-beige);
  --bg-tertiary: var(--color-ivory);
  --surface-card: var(--color-ivory);
  
  /* Borders */
  --border-thin: 1px solid var(--color-border);
  --border-subtle: var(--color-border);
  --border-light: rgba(212, 175, 55, 0.25);
  --border-gold: rgba(212, 175, 55, 0.45);
  --border-charcoal: var(--color-border);

  /* Glassmorphism & Translucency */
  --glass-blur-sm: blur(8px);
  --glass-blur-md: blur(14px);
  --glass-blur-lg: blur(20px);
  --glass-blur-xl: blur(28px);
  --glass-base: rgba(255, 255, 255, 0.92);
  --glass-surface: var(--color-ivory);
  --glass-surface-hover: var(--color-beige);
  --glass-elevated: var(--color-white);
  --glass-card: var(--color-ivory);
  --glass-card-hover: var(--color-beige);
  --glass-input: var(--color-white);
  --glass-input-focus: var(--color-white);

  /* Glass Borders */
  --glass-border-subtle: var(--color-border);
  --glass-border: var(--color-border);
  --glass-border-light: rgba(231, 201, 142, 0.5);
  --glass-border-gold: rgba(212, 175, 55, 0.45);
  --glass-border-gold-hover: var(--color-gold);

  /* Accents */
  --gold-primary: var(--color-gold);
  --gold-rich: var(--color-gold);
  --gold-dark: var(--color-dark-gold);
  --gold-light: var(--color-champagne);
  --gold-glow: rgba(212, 175, 55, 0.25);
  --gold-gradient: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-gold) 50%, var(--color-dark-gold) 100%);
  --gold-gradient-hover: linear-gradient(135deg, var(--color-white) 0%, var(--color-champagne) 40%, var(--color-gold) 100%);
  --gold-glass: rgba(255, 255, 255, 0.94);

  /* Typography Colors */
  --text-main: var(--color-text);
  --text-white: var(--color-text);
  --text-muted: var(--color-muted);
  --text-stone: var(--color-muted);
  --text-light: var(--color-muted);
  --text-gold: var(--color-dark-gold);
  --text-oxblood: var(--color-dark-gold);

  /* Compatibility Aliases */
  --navy-dark: var(--color-text);
  --navy-deep: var(--color-beige);
  --navy-rich: var(--color-ivory);

  /* Shadows (Warm Luxury Ambient) */
  --shadow-sm: 0 2px 8px rgba(184, 134, 11, 0.06);
  --shadow-md: 0 6px 20px rgba(184, 134, 11, 0.1);
  --shadow-lg: 0 14px 40px rgba(184, 134, 11, 0.14);
  --shadow-glass: 0 10px 30px rgba(36, 33, 29, 0.06);
  --shadow-glass-hover: 0 14px 38px rgba(212, 175, 55, 0.18);
  --shadow-gold: 0 6px 24px rgba(212, 175, 55, 0.35);

  /* Typography Pairing */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: var(--font-display);
  --font-cormorant: var(--font-display);
  --font-dm: var(--font-sans);
  --font-accent: var(--font-display);
  --font-body: var(--font-sans);

  /* Transitions */
  --transition-fast: 0.18s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  /* Layout & Geometry */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  --container-max: 1240px;
  --nav-height: 72px;
}`;

if (oldRootRegex.test(css)) {
  css = css.replace(oldRootRegex, newRoot);
  console.log('Replaced :root definitions successfully.');
} else {
  console.error('Could not match old :root definition.');
}

// 2. Replace body background
const oldBodyRegex = /body\s*\{[\s\S]*?font-family:\s*var\(--font-dm\);[\s\S]*?background-color:\s*var\(--obsidian\);[\s\S]*?min-height:\s*100vh;\s*\}/;
const newBody = `body {
  font-family: var(--font-dm);
  background-color: var(--color-white);
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(231, 201, 142, 0.08) 0%, transparent 45%),
    radial-gradient(circle at 85% 15%, rgba(212, 175, 55, 0.06) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(242, 233, 218, 0.5) 0%, transparent 60%),
    radial-gradient(circle at 15% 85%, rgba(231, 201, 142, 0.06) 0%, transparent 45%),
    radial-gradient(circle at 85% 85%, rgba(212, 175, 55, 0.05) 0%, transparent 45%),
    linear-gradient(180deg, var(--color-white) 0%, var(--color-ivory) 50%, var(--color-white) 100%);
  background-attachment: fixed;
  background-size: cover;
  color: var(--color-text);
  line-height: 1.65;
  overflow-x: hidden;
  min-height: 100vh;
}`;

if (oldBodyRegex.test(css)) {
  css = css.replace(oldBodyRegex, newBody);
  console.log('Replaced body styles successfully.');
} else {
  console.error('Could not match old body definition.');
}

// 3. Replace .btn-gold styles
const oldBtnGoldRegex = /\.btn-gold\s*\{[\s\S]*?border:\s*1px solid #FFFFFF !important;\s*\}\s*\.btn-gold:hover\s*\{[\s\S]*?color:\s*#000000 !important;\s*\}/;
const newBtnGold = `.btn-gold {
  background: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-gold) 50%, var(--color-dark-gold) 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 4px 18px rgba(212, 175, 55, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3) !important;
  border: 1px solid var(--color-gold) !important;
}

.btn-gold:hover {
  background: linear-gradient(135deg, var(--color-dark-gold) 0%, #996F08 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(184, 134, 11, 0.45) !important;
  color: #FFFFFF !important;
  border-color: var(--color-dark-gold) !important;
}`;

if (oldBtnGoldRegex.test(css)) {
  css = css.replace(oldBtnGoldRegex, newBtnGold);
  console.log('Replaced .btn-gold styles.');
}

// 4. Update Floating Glass Dock colors
const oldDockRegex = /\.floating-glass-dock\s*\{[\s\S]*?will-change:\s*transform;\s*\}\s*\.floating-glass-dock:hover\s*\{[\s\S]*?inset 0 1px 2px rgba\(255, 255, 255, 0\.35\);\s*\}/;
const newDock = `.floating-glass-dock {
  position: fixed;
  top: 50%;
  left: 24px;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 18px 10px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  box-shadow: 0 16px 40px rgba(184, 134, 11, 0.12), 0 2px 10px rgba(36, 33, 29, 0.06);
  transition: all var(--transition-normal);
  will-change: transform;
}

.floating-glass-dock:hover {
  background: var(--color-white);
  border-color: var(--color-champagne);
  box-shadow: 0 20px 50px rgba(184, 134, 11, 0.18), 0 0 20px rgba(212, 175, 55, 0.15);
}`;

if (oldDockRegex.test(css)) {
  css = css.replace(oldDockRegex, newDock);
  console.log('Replaced .floating-glass-dock.');
}

// 5. Update Dock items & crest
css = css.replace(/background:\s*rgba\(18, 18, 18, 0\.9\);[\s\S]*?border:\s*1px solid rgba\(244, 242, 237, 0\.25\);/g, 'background: var(--color-ivory); color: var(--color-text); border: 1px solid var(--color-champagne);');
css = css.replace(/border-color:\s*var\(--ivory\);\s*box-shadow:\s*0 0 24px rgba\(244, 242, 237, 0\.4\);/g, 'border-color: var(--color-gold); box-shadow: 0 0 20px rgba(212, 175, 55, 0.35);');
css = css.replace(/background:\s*rgba\(255, 255, 255, 0\.18\);\s*margin:\s*2px 0;/g, 'background: var(--color-border); margin: 2px 0;');
css = css.replace(/color:\s*rgba\(255, 255, 255, 0\.72\);\s*background:\s*transparent;/g, 'color: var(--color-muted); background: transparent;');

// Dock item hover / active
css = css.replace(/\.dock-item:hover\s*\{[\s\S]*?box-shadow:\s*0 0 20px rgba\(255, 255, 255, 0\.25\);\s*\}/g, `.dock-item:hover {
  color: var(--color-dark-gold);
  background: var(--color-ivory);
  border-color: var(--color-champagne);
  transform: scale(1.14);
  box-shadow: 0 4px 16px rgba(184, 134, 11, 0.12);
}`);

css = css.replace(/\.dock-item\.active\s*\{[\s\S]*?inset 0 1px 1px #FFFFFF !important;\s*\}\s*\.dock-item\.active svg\s*\{[\s\S]*?stroke:\s*#000000 !important;\s*\}/g, `.dock-item.active {
  color: #FFFFFF !important;
  background: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-gold) 100%) !important;
  border-color: var(--color-gold) !important;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5) !important;
}

.dock-item.active svg {
  stroke: #FFFFFF !important;
}`);

// Dock tooltips
css = css.replace(/background:\s*rgba\(14, 14, 14, 0\.94\);[\s\S]*?border:\s*1px solid rgba\(255, 255, 255, 0\.24\);\s*color:\s*#FFFFFF;/g, 'background: var(--color-white); border: 1px solid var(--color-border); color: var(--color-text);');

// 6. Minimal Header styling
css = css.replace(/background-color:\s*rgba\(11, 11, 11, 0\.96\);[\s\S]*?border-bottom:\s*1px solid rgba\(184, 180, 172, 0\.16\);[\s\S]*?box-shadow:\s*0 2px 10px rgba\(0, 0, 0, 0\.5\);/g, 'background-color: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--color-border); box-shadow: 0 4px 20px rgba(184, 134, 11, 0.08);');
css = css.replace(/color:\s*var\(--ivory\);\s*text-transform:\s*uppercase;\s*transition:\s*color 0\.2s ease;\s*\}\s*\.header-wordmark:hover/g, 'color: var(--color-text); text-transform: uppercase; transition: color 0.2s ease; }\n.header-wordmark:hover');
css = css.replace(/\.header-wordmark:hover \.wordmark-text,\s*\.header-wordmark:focus-visible \.wordmark-text\s*\{\s*color:\s*var\(--white\);\s*\}/g, '.header-wordmark:hover .wordmark-text, .header-wordmark:focus-visible .wordmark-text { color: var(--color-dark-gold); }');
css = css.replace(/\.header-nav \.nav-link:hover,\s*\.header-nav \.nav-link:focus-visible\s*\{\s*color:\s*var\(--ivory\);\s*\}/g, '.header-nav .nav-link:hover, .header-nav .nav-link:focus-visible { color: var(--color-dark-gold); }');
css = css.replace(/\.header-nav \.nav-link\.active::after\s*\{[\s\S]*?background-color:\s*var\(--ivory\);\s*\}/g, '.header-nav .nav-link.active::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background-color: var(--color-gold); }');

// .btn-book-stay
css = css.replace(/\.btn-book-stay\s*\{[\s\S]*?white-space:\s*nowrap;\s*\}\s*\.btn-book-stay:hover[\s\S]*?border-color:\s*var\(--ivory\);\s*\}/g, `.btn-book-stay {
  font-family: var(--font-sans);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #FFFFFF;
  background: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-gold) 50%, var(--color-dark-gold) 100%);
  border: 1px solid var(--color-gold);
  border-radius: 4px;
  padding: 10px 22px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  outline: none;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
}

.btn-book-stay:hover,
.btn-book-stay:focus-visible {
  background: linear-gradient(135deg, var(--color-dark-gold) 0%, #996F08 100%);
  color: #FFFFFF;
  border-color: var(--color-dark-gold);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(184, 134, 11, 0.4);
}`);

// 7. Sticky Booking Bar
css = css.replace(/\.sticky-booking-bar\s*\{[\s\S]*?box-shadow:\s*0 -2px 14px rgba\(0, 0, 0, 0\.65\);\s*\}/g, `.sticky-booking-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  max-height: 56px;
  z-index: 90;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -4px 20px rgba(184, 134, 11, 0.1);
}`);

css = css.replace(/background:\s*#C6A15B;\s*color:\s*#0B0B0B;\s*border:\s*1px solid #C6A15B;\s*height:\s*38px;/g, 'background: linear-gradient(135deg, var(--color-champagne) 0%, var(--color-gold) 100%); color: #FFFFFF; border: 1px solid var(--color-gold); height: 38px;');
css = css.replace(/\.btn-bar-reserve:hover\s*\{[\s\S]*?box-shadow:\s*0 0 20px rgba\(198, 161, 91, 0\.45\);\s*\}/g, `.btn-bar-reserve:hover {
  background: var(--color-dark-gold);
  border-color: var(--color-dark-gold);
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 4px 18px rgba(184, 134, 11, 0.4);
}`);

// 8. Storytelling Green Section conversion to White & Gold
css = css.replace(/background-color:\s*#0D2318;/g, 'background-color: var(--color-ivory);');
css = css.replace(/radial-gradient\(circle at 68% 48%,\s*#163a28 0%,\s*#0D2318 68%,\s*#081710 100%\)/g, 'radial-gradient(circle at 68% 48%, rgba(231, 201, 142, 0.22) 0%, var(--color-ivory) 65%, var(--color-beige) 100%)');
css = css.replace(/background:\s*#08140E;/g, 'background: var(--color-white);');
css = css.replace(/border:\s*1px solid rgba\(255, 255, 255, 0\.08\);/g, 'border: 1px solid var(--color-border);');

// Diamond frame styling
css = css.replace(/background:\s*#08140E;\s*border:\s*1px solid rgba\(255, 255, 255, 0\.2\);\s*overflow:\s*hidden;\s*box-shadow:\s*0 30px 70px rgba\(0, 0, 0, 0\.85\),\s*0 0 35px rgba\(255, 255, 255, 0\.08\);/g, 'background: var(--color-white); border: 2px solid var(--color-champagne); overflow: hidden; box-shadow: 0 25px 60px rgba(184, 134, 11, 0.15), 0 0 25px rgba(212, 175, 55, 0.12);');

// Story title & paragraph text on light background
css = css.replace(/color:\s*#FFFFFF !important;\s*margin:\s*0 0 24px;\s*letter-spacing:\s*-0\.01em;\s*text-shadow:\s*0 4px 20px rgba\(0, 0, 0, 0\.45\);/g, 'color: var(--color-text) !important; margin: 0 0 24px; letter-spacing: -0.01em; text-shadow: none;');
css = css.replace(/color:\s*rgba\(255, 255, 255, 0\.98\) !important;\s*margin:\s*0 0 34px;\s*max-width:\s*620px;\s*text-shadow:\s*0 2px 14px rgba\(0, 0, 0, 0\.4\);/g, 'color: var(--color-text) !important; margin: 0 0 34px; max-width: 620px; text-shadow: none;');
css = css.replace(/color:\s*#F4F2ED !important;\s*font-weight:\s*700 !important;/g, 'color: var(--color-dark-gold) !important; font-weight: 700 !important;');

// 9. Section 02 Lookbook
css = css.replace(/radial-gradient\(circle at 50% 50%,\s*#151515 0%,\s*#0B0B0B 75%,\s*#050505 100%\)/g, 'radial-gradient(circle at 50% 50%, var(--color-white) 0%, var(--color-ivory) 75%, var(--color-beige) 100%)');
css = css.replace(/opacity:\s*0\.06;\s*\/\*\s*Exact user requirement\s*\*\/[\s\S]*?color:\s*#FFFFFF;/g, 'opacity: 0.08; color: var(--color-gold);');

// 10. Rooms Glider Section
css = css.replace(/background:\s*#0A0A0A;\s*border-top:\s*1px solid rgba\(184, 180, 172, 0\.12\);\s*border-bottom:\s*1px solid rgba\(184, 180, 172, 0\.12\);/g, 'background: var(--color-white); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);');
css = css.replace(/background:\s*radial-gradient\(circle at 80% 20%,\s*rgba\(198, 161, 91, 0\.05\) 0%,\s*transparent 60%\),\s*radial-gradient\(circle at 10% 80%,\s*rgba\(20, 20, 20, 0\.95\) 0%,\s*#0A0A0A 100%\);/g, 'background: radial-gradient(circle at 80% 20%, rgba(231, 201, 142, 0.12) 0%, transparent 60%), radial-gradient(circle at 10% 80%, var(--color-ivory) 0%, var(--color-white) 100%);');
css = css.replace(/background:\s*rgba\(18, 18, 18, 0\.75\);\s*border:\s*1px solid rgba\(198, 161, 91, 0\.22\);/g, 'background: rgba(255, 255, 255, 0.92); border: 1px solid var(--color-border);');
css = css.replace(/background:\s*#0E0E0E;\s*border:\s*1px solid rgba\(198, 161, 91, 0\.2\);\s*box-shadow:\s*0 20px 60px rgba\(0, 0, 0, 0\.6\);/g, 'background: var(--color-white); border: 1px solid var(--color-border); box-shadow: 0 15px 45px rgba(184, 134, 11, 0.1);');

// 11. Attached Semi Menu
css = css.replace(/background:\s*rgba\(14, 14, 14, 0\.84\);\s*border:\s*1px solid rgba\(198, 161, 91, 0\.3\);\s*border-left:\s*2px solid #C6A15B;/g, 'background: var(--color-ivory); border: 1px solid var(--color-border); border-left: 3px solid var(--color-gold); box-shadow: -10px 20px 50px rgba(184, 134, 11, 0.1), 0 4px 16px rgba(36, 33, 29, 0.05);');
css = css.replace(/background:\s*rgba\(10, 10, 10, 0\.55\);\s*border:\s*1px solid rgba\(184, 180, 172, 0\.1\);/g, 'background: var(--color-white); border: 1px solid var(--color-border);');
css = css.replace(/background:\s*rgba\(22, 22, 22, 0\.6\);\s*border:\s*1px solid rgba\(198, 161, 91, 0\.22\);/g, 'background: var(--color-white); border: 1px solid var(--color-border);');

// 12. Final Invitation Section
css = css.replace(/background:\s*var\(--charcoal\);\s*border:\s*1px solid rgba\(184, 180, 172, 0\.18\);[\s\S]*?box-shadow:\s*0 24px 60px rgba\(0, 0, 0, 0\.9\);/g, 'background: var(--color-white); border: 1px solid var(--color-border); padding: clamp(48px, 8vw, 84px) clamp(24px, 6vw, 64px); text-align: center; box-shadow: 0 20px 60px rgba(184, 134, 11, 0.12);');

// Write the updated CSS file
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/style.css with White & Gold theme!');
