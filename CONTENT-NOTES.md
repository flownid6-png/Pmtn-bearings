# Premach Transmission catalogue — release notes

## Scope and build

The project was copied to `outputs/premach-backup-v4` before the updates. The source remains a static HTML/CSS/JavaScript site. Catalog styles and behavior are in `catalog.css` and `catalog.js`; `tools/build_catalog.py` generates the catalog pages and data using Python's standard library. The existing `styles.css`, `script.js`, `bearing-fx.css` and `bearing-fx.js` were not changed.

## Catalog and enquiry changes

- Removed individual model pages and every model-page sitemap entry. Model records now link to their family page and full-code filter.
- The catalog contains PMTN 251 models and URB 232 models across the listed families. Each suffix variant remains a separate entry; the enquiry panel carries the full designation.
- `assets/data/catalog.json` is the catalog source. The build generates `assets/data/catalog-data.js` for direct offline use; the finder does not fetch data over the network.
- Finder results support partial code search. If a numeric query has no exact substring match, closest digit-order matches are labeled as such. A query with no matches offers an enquiry for the typed number.
- Family pages provide Cards, Table and Chart views, shared filters, sorting, series and full-code hash filters, multi-select, and brand cross-links where the same code is listed for both brands.
- Model selection and enquiry-first buttons open the reusable enquiry panel with WhatsApp, email and call actions. No form data is sent automatically.
- Added “and much more” enquiry actions to the requested product lists, dropdown and footer. The 29412 gallery item opens the Spherical Roller Thrust Bearings family filtered to `29412`.

## Product copy and source data

- Model suffixes are reproduced as printed, including unusual suffix spellings; they are not decoded unless supported by the source catalog.
- Codes shown without a suffix in the supplied PDFs (including PMTN 294xx, 512xx, 320xx, 322xx and 323xx entries) remain without a suffix.
- Bore values are derived from the last two digits multiplied by 5 mm for the listed 22xxx, 23xxx, 24xxx, 32xxx and 294xx families. The 512xx thrust ball exceptions are 51201 = 12 mm, 51202 = 15 mm and 51203 = 17 mm. These values are labeled Bore (d).
- No OD, width, weight, price, stock or availability values are invented. Confirm exact specifications and availability with Premach.
- Industry associations describe common applications, not named customers.
- Generic generated category visuals are not photographs of specific model numbers. Replace them with verified product photography when available. Supplied stock, packaging and warehouse photos are used in the gallery. The 29412M packaging photo links to the 29412 family listing.
- Founder portrait placeholders and person-initial graphics have been removed from About; no founder portrait is displayed.

## Before launch

Replace `https://pmtnbearings.com` with the production domain in canonical, Open Graph, structured-data and sitemap URLs if the production domain differs. Verify industry associations and any certificates or authorisation documents before publishing them. Keep product specifications limited to verified source data.

## QA

- `tools/check_links.py`: zero broken internal links, anchors or local assets.
- `tools/check_codes.py`: PMTN 251 and URB 232; no missing suffixes in displayed model designations or `data-code` values.
- `qa-v5/` contains before/after browser screenshots and the browser-check report. The checks cover local-file and local HTTP use, finder/enquiry actions, the family views, deep links, responsive widths and horizontal overflow.
- `index.html` changes are limited to homepage brand cards. `about-us.html` changes are limited to product-list wording and the spacing between gallery/products links.

## v6 catalogue update notes

- The three appended industry mappings (Wire & Rod Mills, Tube & Wire Straightening, Cable Manufacturing) were supplied in the brief. Other family-to-industry mappings in `assets/data/industries.json` are presented as commonly used applications and need Premach's confirmation before being treated as application recommendations.
- PMTN spherical roller codes `23068 CAC3` and `23068 CAC3W33` both remain because the appendix explicitly requires keeping both. PMTN spherical roller count: 184; these are distinct full designations.
- PMTN spherical roller thrust codes include the `M` suffix exactly on the 16 listed designations. `29414`, `29422`, `29430` and `29438` remain unsuffixed. Thrust ball bearings are a separate 29-model family.
- PMTN ball codes: 6040, 6044 and 6048. PMTN cylindrical code: NJ244 M. Total PMTN unique codes: 260. URB spherical roller codes: 232.
- Product family images are separate generated WebP assets (1200×800); original PNG versions of the five source images were retained. Three additional URB family images were generated to keep URB Ball, Cylindrical Roller and Taper Roller pages visually distinct.
- Four-Row Taper and Four-Row Cylindrical pages remain enquiry-first because no model numbers were supplied for either family. SC and HW model arrays are intentionally empty until numbers are provided.
- Bearing heating machine KVA values are quote options, not bearing designations. Performance times are reproduced as approximate examples as supplied.
- No rolling-mill gearbox codes 20140–20164 MBW33C3 were added; the brief explicitly excluded them.
- No LM shaft size list or interpretation of those codes is published.
- Generated visuals are product illustrations; they do not assert a particular manufacturer's exact geometry. Replace them with approved product photography if a precise visual match is required.

## v7 catalogue and homepage update notes

- Homepage product cutouts use transparent PNG assets: `assets/products/generated/pmtn-brand-bearing-cutout.png` and `urb-brand-bearing-cutout.png`. They sit over the existing brand-card artwork without the previous opaque photo background.
- Added image cards and direct links for all 15 industries to the homepage. The 11 newly supplied category illustrations are generated visual references; the existing first four category photos remain in place. `assets/data/industries.json` assigns each detail page its own image.
- SC linear bearing options are represented within Linear Bearings; HW guideway blocks are represented within Linear Blocks. Removed them from separate product cards and navigation. Former URLs now redirect to the consolidated ranges; the public sitemap no longer lists those separate pages.
- Consolidated URB brochure model designations into `urb-metallurgical-bearings.html`: 7 spherical roller, 31 cylindrical roller, and 22 roller-support designations, transcribed from the supplied 4-page scanned brochure. They are presented as brochure references and open a product enquiry; dimensions and suitability should be confirmed against the source catalogue and specific machine.
- The URB brochure describes metallurgical bearings for high loads, high temperatures, and high shock, and shows hot strip mill, wire mill, straightening roller, and cold pilger mill applications.
- The distributor certificate printed in the brochure is dated 20 July 2023 and says validity through 1 July 2024. It was not republished as current proof of authorization.
- Bearing Heating Machine now shows its machine image once. Model options and the specification table follow the hero before the enquiry form; the unrelated package-photo strip was removed from that page.

## v8 URB catalogue integration

- Copied the full site to `premach-backup-before-urb-fix` before changes.
- Integrated the seven URB spherical bearing rows into `urb-spherical-roller-bearings.html`; integrated all 31 cylindrical-bearing rows and 20 roller-support rows (22 distinct designations) into `urb-cylindrical-roller-bearings.html`. Printed decimal commas, blank cells and designations are retained. Every displayed model opens the existing enquiry panel; tables scroll horizontally and keep their first column in view.
- The separate `urb-metallurgical-bearings.html` page was removed, with its product-card, About Us, footer and sitemap references removed. Its replacement catalogue content lives in the existing URB product pages.
- Added URB spherical and cylindrical families to rolling mills, steel plants, wire and rod mills, and tube and wire straightening industry pages. Fact-check status for every industry-family pair is in `FACTCHECK-INDUSTRIES.md`; uncertain relationships remain cautious and require product-fit confirmation.
- Homepage brand-card changes are limited to the inline brand-card styles and PMTN/URB card markup in `index.html`: removed the faded background treatment and duplicate cutout, kept one transparent PNG product cutout per card, reserved a separate row for it, and removed the old standalone catalogue link.
- Source data: 7 spherical, 31 cylindrical and 22 roller-support designations added (60 total). The URB product-model source now contains 292 unique designations. `tools/check_urb_data.py` compares the rendered pages with the transcribed Appendix A2/model lists.
- Owner follow-up: confirm the unusual spherical bearing model/dimension combinations against the manufacturer’s current catalogue. The brochure validity date is expired; no certificate/contact block or brochure photos were republished. No new product images were generated.

- Needs owner confirmation: the certificate validity date printed in the URB brochure is 1 July 2024 (expired); the brochure's extra contact numbers, including one that appears to have only nine digits, remain unpublished.
