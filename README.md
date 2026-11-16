# Premach Transmission website

Responsive static website project using HTML, CSS and JavaScript, with no build step or package installation.

## Preview

Open `index.html` in a modern browser, or run `py -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Pages and files

- `index.html` is the homepage. Product, industry and testimonial copy is present as HTML, so key page content does not depend on JavaScript rendering.
- `products.html` lists PMTN and URB brands, bearing and linear categories, and links to individual product-family pages.
- `pmtn-*.html` and `urb-*.html` are standalone product-family pages with category descriptions, enquiry links and generated illustrative visuals. Pages with model codes show the complete code lists extracted from the client PDFs.
- `assets/data/product-models.json` contains the model-code lists used to create the static PMTN and URB catalog pages.
- `gallery.html` is a separate gallery of the seven client-supplied warehouse and packaging photos. Those photos are not used on the homepage or product-family pages.
- `product-detail.html` remains as a reusable fallback detail view for older query-string links.
- `industries.html` contains static SEO-friendly application content for rolling mills, pressure mining, printing and packaging, and gym equipment manufacturing.
- `about-us.html` contains the expanded company story, vision, leadership and document notes. No founder or director portraits are shown; Late Shri Mohinder Kapila's name is highlighted. The warehouse mockup has been removed from this page.
- `site-shell.js` builds the shared header, product/industry dropdowns, footer and fixed WhatsApp/Call/Enquiry stack.
- `script.js` controls the swipeable hero, highlights and industry carousels, enquiry prompt, menu interactions, scroll reveals, and the email-preparing enquiry form.
- `styles.css` contains responsive layouts, the brief curtain-style opening reveal, subtle motion, reduced-motion handling and image sizing rules.

## Supplied logos and imagery

- `assets/logos/premach-transmission.svg` is the official header logo.
- `assets/logos/premach-white.svg` is the supplied white Premach logo used in the dark footer.
- `assets/logos/pmtn.png` (the latest supplied PMTN mark) and `assets/logos/urb.png` are the supplied brand logos.
- `assets/logos/whatsapp-mark.png` is the supplied WhatsApp mark used in the floating contact rail and footer.
- `assets/gallery/` contains the seven original client-supplied stock and packaging photos, placed only on `gallery.html`.
- `assets/products/generated/` contains AI-generated illustrative product images used on product-family pages. Captions identify them as illustrative and say they may not depict the exact model or configuration. Replace each file with a confirmed client product photo when available.
- `assets/hero/hero-01.png` to `hero-03.png` are illustrative hero photos.
- `assets/products/photos/` has individual illustrative product photos, displayed with `object-fit: contain` so the artwork is not stretched. Replace these files with client photos while keeping filenames.
- `assets/industries/industry-category-grid.png` contains illustrative industry photos used as cropped visual backgrounds. Replace with approved photography when available.
- The original product image sheet remains at `assets/products/product-category-grid.png`.

## Search visibility

Page titles, descriptions, headings, product/industry copy, internal links, and Organization structured data are in the page HTML. `robots.txt` allows crawling. A production canonical URL and sitemap need the final domain; after publishing, submit that sitemap in Google Search Console and verify the site. Search placement is not guaranteed by on-page changes alone.

## Product and enquiry notes

Product model, specification and availability still need confirmation by Premach. The PMTN PDF contains 251 unique listed codes; the URB PDF contains 233 entries with one repeated code, giving 232 unique codes. The codes are grouped on family pages by their visible numeric series. Product categories without a model list in the PDFs are clearly marked for enquiry; no model codes were inferred for them. The supplied shaft range says `1m–100m`; its unit and meaning are not verified. The enquiry form prepares a WhatsApp message for review and sending; it does not submit automatically.

The four testimonial names, ratings and wording are retained as supplied in `index.html`. Confirm that the reviews and displayed names are approved for publication before launch.

## Replacing imagery

Keep existing filenames when replacing imagery so page references remain valid. Replace client gallery photographs in `assets/gallery/` with approved JPG/PNG files while keeping the same filenames. Replace an AI product visual under `assets/products/generated/` with the confirmed category photo using the existing filename; its page caption should then be updated to remove the AI-illustrative note. For the PMTN logo, use a transparent PNG with the full mark inside the canvas; the display uses `object-fit: contain` to avoid clipping. The WhatsApp image can be replaced at `assets/logos/whatsapp-mark.png`.
