# Ascent Learning — Personalized Tutoring

A complete, four-page static website based on Personalized Tutoring Website.pdf.
Plain HTML, CSS, and JavaScript; no framework, dependencies, build step, or externally hosted assets.

## Open and edit
Open index.html in any current browser. All pages and assets use relative paths and also work when uploaded to a host. Edit copy directly in the four HTML files, shared styles in css/style.css, and interactions in js/script.js.

The partials folder provides reusable header/footer source markup. These are deliberately embedded in each page rather than fetched at runtime so navigation works from disk, without JavaScript, and for search engines. After editing a partial, copy it into all four HTML pages, preserving each page's aria-current="page" on its active navigation link. No build tools are needed.

## Connect a custom domain
1. Upload index.html, about.html, services.html, contact.html, css/ and js/ to your static host's public document root. Include images/ if adding your own assets. README.md and partials/ do not need to be public.
2. Add your custom domain in the hosting account. Copy the DNS record values supplied by that host into your domain registrar's DNS settings. Exact values depend on the host and domain; none are invented here.
3. Enable HTTPS and choose the primary www or non-www address, redirecting the alternative in the host's settings.
4. Add the final absolute canonical URL and og:url to each HTML head, using its actual page path. Unique titles, descriptions, semantic headings and viewport settings are already included. No placeholder domain is embedded.
5. Optionally add a sitemap.xml with all four final absolute page URLs and submit it to your search engine webmaster tools.
6. Visit every page on the real domain and verify phone, email and consultation links.

## Contact form — connection still required
The form is intentionally validation-only until connected. It does not send or store details, claim a message was sent, or require a backend to render. Users can immediately use the working email and telephone links.

To activate submissions, set FORM_ENDPOINT in js/script.js to an HTTPS service endpoint that accepts JSON POST requests. Set up the recipient, allowed origin/CORS, server-side validation, spam protection, retention and appropriate privacy text in that service. Keep API secrets on the server. Adapt the fetch payload to your provider if it requires a different format. The button and disclosure automatically change when the endpoint is configured. Success is displayed only on a 2xx response; failed requests preserve the form fields. Test actual message delivery before launch.

## Content and assets
All substantive tutoring copy, service topics, qualifications, process steps, six service areas, FAQs and contact details are from the supplied PDF. Formatting and typographic punctuation have been normalized. Additional interface labels explain navigation and form behavior. No prices, testimonials, credentials or availability claims were invented. Optional image instructions are in images/assets/README.txt; no fake portrait is included.

## Accessibility and responsive behavior
Semantic landmarks; skip link; visible focus indicators; descriptive form labels and inline validation; live submission status; mobile navigation with expanded state and Escape handling; native keyboard-accessible FAQ disclosures; reduced-motion support; responsive card and column layouts. Essential content and navigation work without JavaScript. Smooth scrolling respects reduced-motion preferences.

## Ascent Learning branding
The company name is Ascent Learning. Aarushi’s biography, qualifications and contact details remain as supplied. The transparent PNG logo is used in every header and footer. Its master file and usage notes are in images/assets/.
