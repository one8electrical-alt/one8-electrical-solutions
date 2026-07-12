# ONE8 ELECTRICAL SOLUTIONS - Corporate Website

Professional, premium, modern, responsive, bilingual, and SEO-friendly corporate website for **ONE8 ELECTRICAL SOLUTIONS**.

Designed with rich glassmorphism, responsive mega menus, English/Hindi language translation engine, theme selection caching (dark/light), interactive forms, custom vector branding, and Animate On Scroll (AOS) libraries.

## Company Details
* **Company Name:** ONE8 ELECTRICAL SOLUTIONS
* **Tagline:** "Professional Electrical Services with Quality, Safety & Trust"
* **Owner:** Hanuman Yadav
* **Phone:** +91 9828970722
* **Email:** one8electrical@gmail.com
* **Address:** Raholi Road, Gunsi, Newai, Tonk, Rajasthan, India - 304021

---

## File Structure
```text
ONE8-ELECTRICAL-SOLUTIONS/
│
├── index.html              # Main Home page with Hero, Stats, Testimonials, FAQ
├── about.html              # About Hanuman Yadav, Mission, Vision, Core Values
├── services.html           # Full Grid directory of all 18 Corporate Services
├── gallery.html            # Category-Filtered Gallery with lightbox viewer
├── contact.html            # Office details, Google Maps & validator Contact Form
├── quote.html              # Estimated quote request form with client-side checks
├── style.css               # Core styling system, custom CSS grids, dark mode settings
├── robots.txt              # Crawler instructions
├── sitemap.xml             # XML sitemap index
├── vercel.json             # Vercel deployment configuration
├── netlify.toml            # Netlify deployment configuration
├── favicon.svg             # Vector site favicon (Electric Blue & Yellow)
├── favicon.ico             # High-color multi-res browser favicon
├── apple-touch-icon.png    # Mobile home screen launcher icon
├── social-preview.png      # Social sharing og:image preview (1200x630)
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions static pages autodeploy pipeline
│
├── css/
│   └── responsive.css      # Media query fixes for mobile, tablet, and desktops
│
├── js/
│   ├── i18n.js             # Bilingual dictionary configuration & text mapping engine
│   ├── main.js             # Navigation triggers, sticky layouts, theme toggle
│   ├── animation.js        # Statistics countup, tagline typing, AOS trigger
│   ├── gallery.js          # Category filter arrays, lightbox navigation slides
│   └── form.js             # Localized error warnings, form caches, confirmation modals
│
└── assets/
    ├── logos/
    │   ├── logo.svg        # Standard brand logo (Electric Blue & Yellow, dark navy text)
    │   ├── logo-light.svg  # Light background optimized logo
    │   └── logo-dark.svg   # Dark background optimized logo (white text)
    ├── images/
    │   └── hero-bg.svg     # Technical schematic blueprint backdrop for Hero
    └── gallery/
        ├── industrial.svg
        ├── residential.svg
        ├── commercial.svg
        ├── solar.svg
        ├── automation.svg
        └── panels.svg
```

---

## Technical Highlights
1. **Premium Corporate Design**: Influenced by Schneider, Siemens, and ABB UI palettes (Deep Navy background, electric blue elements, white text, and electric yellow/gold highlights).
2. **Dynamic Bilingual Engine**: Built a lightweight client-side translation engine in [js/i18n.js](js/i18n.js) that maps elements with `data-i18n` and `data-i18n-placeholder` attributes. Language preference persists across pages via `localStorage`.
3. **Call & WhatsApp Integrations**: Linked call-to-action buttons to native dialer `tel:+919828970722` and configured WhatsApp floating actions to open chats with pre-filled message parameters.
4. **Standalone Vector Assets**: All images, mocks, and logos are SVGs, ensuring maximum sharpness, absolute responsiveness, and extremely fast loading speeds.
5. **Clean Code & Validation**: Zero framework dependencies (no heavy Bootstrap/jQuery overhead). Integrated an automated integrity test ([scratch/validate_site.js](scratch/validate_site.js)) to check broken links and asset presence.
6. **Form Validation**: Indian-phone format (`[6-9]\d{9}`) and email regex pattern checking, adapting warning highlights in English or Hindi depending on active locale choice.

---

## Local Development & Deployment
* Simply open `index.html` in any web browser to view, or launch a local web server (e.g., VS Code Live Server).
* The project is fully configured and ready for automated static hosting. Push this repository to deploy automatically:
  * **Vercel**: Handled via [vercel.json](vercel.json).
  * **Netlify**: Configured via [netlify.toml](netlify.toml).
  * **GitHub Pages**: Automates deployment on branch push using [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
