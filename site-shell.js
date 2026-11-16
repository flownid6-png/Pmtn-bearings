(() => {
  const root = document.documentElement;
  if (root.classList.contains('font-loading') && !document.body.classList.contains('home') && document.fonts) {
    let fontGateTimer;
    const ready = Promise.allSettled([
      document.fonts.load('400 16px "DM Sans"'),
      document.fonts.load('700 16px "DM Sans"'),
      document.fonts.load('700 32px Manrope'),
      document.fonts.load('800 32px Manrope')
    ]);
    Promise.race([ready, new Promise(resolve => { fontGateTimer = setTimeout(resolve, 1800); })]).then(() => {
      clearTimeout(fontGateTimer);
      root.classList.remove('font-loading');
    });
  } else root.classList.remove('font-loading');

  const whatsapp = '<img class="whatsapp-logo-icon" src="assets/logos/whatsapp-mark.png" alt="" aria-hidden="true">';
  const phone = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.8 15.8 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.6.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.9 17.9 0 0 1 3 4a1 1 0 0 1 1-1h3.4a1 1 0 0 1 1 1c0 1.2.2 2.5.6 3.6a1 1 0 0 1-.2 1l-2.2 2.2Z"/></svg>';
  const mail = '<svg viewBox="0 0 24 24" aria-hidden="true" style="fill:none"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>';
  const catalog = {
    PMTN: {
      Bearings: ['Ball Bearings', 'Spherical Roller Bearings', 'Cylindrical Roller Bearings', 'Taper Roller Bearings', 'Four-Row Taper Roller Bearings', 'Four-Row Cylindrical Roller Bearings', 'Spherical Roller Thrust Bearings', 'Thrust Ball Bearings'],
      Shafts: ['Shafts'],
      'Linear Range': ['Linear Bearings', 'Linear Blocks', 'Linear Rails (HGR Rails)'],
      Machines: ['Bearing Heating Machine']
    },
    URB: {
      Bearings: ['Spherical Roller Bearings', 'Cylindrical Roller Bearings', 'Ball Bearings', 'Taper Roller Bearings']
    }
  };
  const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const detailRoutes = {"PMTN|Ball Bearings": "pmtn-ball-bearings.html", "PMTN|Spherical Roller Bearings": "pmtn-spherical-roller-bearings.html", "PMTN|Cylindrical Roller Bearings": "pmtn-cylindrical-roller-bearings.html", "PMTN|Four-Row Taper Roller Bearings": "pmtn-four-row-taper-bearings.html", "PMTN|Four-Row Cylindrical Roller Bearings": "pmtn-four-row-cylindrical-roller-bearings.html", "PMTN|Taper Roller Bearings": "pmtn-taper-roller-bearings.html", "PMTN|Spherical Roller Thrust Bearings": "pmtn-thrust-bearings.html#series=294xx", "PMTN|Thrust Ball Bearings": "pmtn-thrust-bearings.html#series=512xx", "PMTN|Shafts": "pmtn-shafts.html", "PMTN|Linear Bearings": "pmtn-linear-bearings.html", "PMTN|Linear Blocks": "pmtn-linear-blocks.html", "PMTN|Linear Rails": "pmtn-linear-rails.html", "PMTN|Linear Rails (HGR Rails)": "pmtn-linear-rails.html", "PMTN|Bearing Heating Machine": "pmtn-bearing-heating-machine.html", "URB|Spherical Roller Bearings": "urb-spherical-roller-bearings.html", "URB|Cylindrical Roller Bearings": "urb-cylindrical-roller-bearings.html", "URB|Ball Bearings": "urb-ball-bearings.html", "URB|Taper Roller Bearings": "urb-taper-roller-bearings.html"};
  const moreProductsLink = document.body.classList.contains('catalog')
    ? '<a href="#more-products" data-enquiry-more>and much more</a>'
    : '<a href="https://wa.me/919999210808?text=Hello%20Premach%2C%20I%20need%20a%20product%20that%20is%20not%20listed%20on%20the%20website%3A%20">and much more</a>';
  const detailUrl = (brand, category, item) => detailRoutes[`${brand}|${item}`] || `product-detail.html?brand=${encodeURIComponent(brand)}&category=${encodeURIComponent(category)}&item=${encodeURIComponent(item)}`;
  const categoryMenu = (brand, category) => {
    const key = `${slug(brand)}-${slug(category)}`;
    const items = catalog[brand][category].map(item => `<a href="${detailUrl(brand, category, item)}">${item}</a>`).join('');
    return `<div class="dropdown-category"><a href="products.html#${key}">${category}</a><button class="submenu-toggle" type="button" aria-label="Show ${brand} ${category} product types" aria-expanded="false">›</button><div class="submenu-panel">${items}</div></div>`;
  };
  const brandMenu = Object.entries(catalog).map(([brand, categories]) => {
    const key = slug(brand);
    return `<div class="dropdown-brand"><a data-brand="${brand}" href="products.html#${key}">${brand}</a><button class="submenu-toggle" type="button" aria-label="Show ${brand} categories" aria-expanded="false">›</button><div class="submenu-panel">${Object.keys(categories).map(category => categoryMenu(brand, category)).join('')}</div></div>`;
  }).join('');
  const productMenu = `<div class="nav-dropdown"><a href="products.html">Products</a><button class="dropdown-toggle" type="button" aria-label="Show product brands" aria-expanded="false">⌄</button><div class="dropdown-panel">${brandMenu}${moreProductsLink}</div></div>`;
  const industriesMenu = '<div class="nav-dropdown"><a href="industries.html">Industries</a><button class="dropdown-toggle" type="button" aria-label="Show industries" aria-expanded="false">⌄</button><div class="dropdown-panel"><a href="industry-rolling-mills.html">Rolling Mills</a><a href="industry-mining-mineral-processing.html">Mining &amp; Mineral Processing</a><a href="industry-printing-packaging.html">Printing &amp; Packaging</a><a href="industry-gym-equipment-manufacturing.html">Gym Equipment Manufacturing</a><a href="industry-steel-plants.html">Steel Plants</a><a href="industry-cement-plants.html">Cement Plants</a><a href="industry-power-plants.html">Power Plants</a><a href="industry-paper-pulp-mills.html">Paper &amp; Pulp Mills</a><a href="industry-conveyors-material-handling.html">Conveyors &amp; Material Handling</a><a href="industry-crushers-screening-equipment.html">Crushers &amp; Screening Equipment</a><a href="industry-agriculture-machinery.html">Agriculture Machinery</a><a href="industry-machine-tools-automation.html">Machine Tools &amp; Automation</a><a href="industry-wire-rod-mills.html">Wire &amp; Rod Mills</a><a href="industry-tube-wire-straightening.html">Tube &amp; Wire Straightening</a><a href="industry-cable-manufacturing.html">Cable Manufacturing</a></div></div>';
  const header = `<header class="site-header" id="top"><div class="container nav-wrap"><a class="brand-lockup" href="index.html" aria-label="Premach Transmission home"><img src="assets/logos/premach-transmission.svg" alt="Premach Transmission"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation"><span></span><span></span></button><nav class="primary-nav" id="primary-nav" aria-label="Main navigation"><a href="index.html">Home</a><a href="about-us.html">About Us</a>${productMenu}${industriesMenu}<a href="gallery.html">Gallery</a></nav><a class="button button-small nav-cta" href="https://wa.me/919999210808?text=Hello%20Premach%2C%20I%20need%20a%20quote%20for%20" target="_blank" rel="noopener">Get a quote on WhatsApp <span aria-hidden="true">↗</span></a></div></header>`;
    const footer = `<footer class="site-footer"><div class="container"><div class="footer-main"><div class="footer-about"><a class="footer-logo" href="index.html" aria-label="Premach Transmission home"><img src="assets/logos/premach-white.svg" alt="Premach Transmission"></a><p>Bearings, shafts and linear motion categories for industrial requirements.</p><div class="footer-social"><a href="https://wa.me/919999210808" aria-label="WhatsApp Premach" target="_blank" rel="noopener">${whatsapp}</a><a href="mailto:info@pmtnbearings.com" aria-label="Email Premach">${mail}</a><a href="tel:+919999210808" aria-label="Call Premach">${phone}</a></div></div><div class="footer-col"><h3>Explore</h3><a href="about-us.html">About us</a><a href="index.html#brands">Our brands</a><a href="products.html">Product categories</a><a href="industries.html">Industries</a><a href="gallery.html">Gallery</a><a href="industry-rolling-mills.html">Rolling Mills</a><a href="industry-mining-mineral-processing.html">Mining &amp; Mineral Processing</a><a href="industry-printing-packaging.html">Printing &amp; Packaging</a><a href="industry-gym-equipment-manufacturing.html">Gym Equipment Manufacturing</a><a href="industry-wire-rod-mills.html">Wire &amp; Rod Mills</a><a href="industry-tube-wire-straightening.html">Tube &amp; Wire Straightening</a><a href="industry-cable-manufacturing.html">Cable Manufacturing</a></div><div class="footer-col"><h3>Product range</h3><div class="footer-brand-heading" data-brand="PMTN">PMTN product range</div><a href="pmtn-ball-bearings.html">Ball Bearings</a><a href="pmtn-spherical-roller-bearings.html">Spherical Roller Bearings</a><a href="pmtn-cylindrical-roller-bearings.html">Cylindrical Roller Bearings</a><a href="pmtn-taper-roller-bearings.html">Taper Roller Bearings</a><a href="pmtn-four-row-taper-bearings.html">Four-Row Taper Roller Bearings</a><a href="pmtn-four-row-cylindrical-roller-bearings.html">Four-Row Cylindrical Roller Bearings</a><a href="pmtn-thrust-bearings.html#series=294xx">Spherical Roller Thrust Bearings</a><a href="pmtn-thrust-bearings.html#series=512xx">Thrust Ball Bearings</a><a href="pmtn-shafts.html">Shafts · 6–80 mm</a><a href="pmtn-linear-bearings.html">Linear Bearings</a><a href="pmtn-linear-blocks.html">Linear Blocks</a><a href="pmtn-linear-rails.html">Linear Rails</a><a href="pmtn-sc-linear-bearings.html">SC Linear Bearings</a><a href="pmtn-hw-linear-guideway-blocks.html">HW Linear Guideway Blocks</a><a href="pmtn-bearing-heating-machine.html">Bearing Heating Machine</a><div class="footer-brand-heading" data-brand="URB">URB product range</div><a class="urb-product-link" href="urb-spherical-roller-bearings.html">Spherical Roller Bearings</a><a class="urb-product-link" href="urb-cylindrical-roller-bearings.html">Cylindrical Roller Bearings</a><a class="urb-product-link" href="urb-ball-bearings.html">Ball Bearings</a><a class="urb-product-link" href="urb-taper-roller-bearings.html">Taper Roller Bearings</a>${moreProductsLink}</div><div class="footer-col footer-contact"><h3>Contact</h3><a href="tel:+919999210808">+91 99992 10808</a><a href="mailto:info@pmtnbearings.com">info@pmtnbearings.com</a><p>2373/234A, Second Floor, Gopinath Building, Shardhanand Marg, Behind G.B Road, Delhi-110006</p><small>GSTIN/UIN: 07AARFP8348K1ZE</small></div></div><div class="footer-bottom"><span>© <span id="year"></span> Premach Transmission</span><span>Product details and availability should be confirmed with our team.</span><a href="index.html#top">Back to top ↑</a></div></div></footer><aside class="quick-contact" aria-label="Quick contact"><a class="quick-action quick-whatsapp" href="https://wa.me/919999210808" target="_blank" rel="noopener" aria-label="WhatsApp Premach"><span class="quick-icon">${whatsapp}</span><span class="quick-label">WhatsApp</span></a><a class="quick-action quick-call" href="tel:+919999210808" aria-label="Call Premach"><span class="quick-icon">${phone}</span><span class="quick-label">Call us</span></a><a class="quick-action quick-enquiry" href="index.html#enquiry" aria-label="Send an enquiry"><span class="quick-icon">${mail}</span><span class="quick-label">Enquiry</span></a></aside>`;
  // Clear any legacy/duplicate floating contact rail before rendering the single shared rail.
  document.querySelectorAll('.quick-contact').forEach(element => element.remove());
  document.getElementById('site-header').innerHTML = header;
  document.getElementById('site-footer').innerHTML = footer;

  // Keep the shared navigation interactive on every page, including catalog pages.
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('.dropdown-toggle').forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      const parent = button.closest('.nav-dropdown');
      const open = parent.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    }));
    nav.querySelectorAll('.submenu-toggle').forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const parent = button.closest('.dropdown-category, .dropdown-brand');
      const open = parent.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    }));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }
})();


