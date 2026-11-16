(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isHomePage = document.body.classList.contains('home');
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.slider-dot')];
  const current = document.getElementById('slide-current');
  const hero = document.querySelector('.hero');
  const heroPrev = document.querySelector('.slider-prev');
  const heroNext = document.querySelector('.slider-next');
  const heroImages = ["url('assets/hero/hero-01.png')", "url('assets/hero/hero-02.png')", "url('assets/hero/hero-03.png')"];
  let active = 0;
  let timer;
  if (hero && slides.length && !isHomePage) {
    function showSlide(index) {
      active = index;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-pressed', String(i === index));
      });
      if (current) current.textContent = `0${index + 1}`;
      hero.style.setProperty('--hero-image', heroImages[index]);
      hero.classList.remove('is-changing');
      requestAnimationFrame(() => hero.classList.add('is-changing'));
    }
    function restartTimer() {
      window.clearInterval(timer);
      if (!reducedMotion.matches) timer = window.setInterval(() => showSlide((active + 1) % slides.length), 4800);
    }
    dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); restartTimer(); }));
    heroPrev?.addEventListener('click', () => { showSlide((active - 1 + slides.length) % slides.length); restartTimer(); });
    heroNext?.addEventListener('click', () => { showSlide((active + 1) % slides.length); restartTimer(); });
    let swipeStart = null;
    hero.addEventListener('pointerdown', event => { if (!event.target.closest('a,button')) swipeStart = event.clientX; });
    hero.addEventListener('pointerup', event => {
      if (swipeStart === null) return;
      const delta = event.clientX - swipeStart;
      if (Math.abs(delta) > 48) showSlide((active + (delta < 0 ? 1 : -1) + slides.length) % slides.length);
      swipeStart = null;
      restartTimer();
    });
    hero.addEventListener('mouseenter', () => window.clearInterval(timer));
    hero.addEventListener('mouseleave', restartTimer);
    reducedMotion.addEventListener?.('change', restartTimer);
    showSlide(0);
    restartTimer();
  }

  function wireScroller(rootSelector, laneSelector, prevSelector, nextSelector, autoAdvance = false) {
    const root = document.querySelector(rootSelector);
    const lane = root?.querySelector(laneSelector);
    if (!root || !lane) return;
    const move = direction => {
      const item = lane.children[0];
      const step = item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(lane).gap || 0) : lane.clientWidth;
      const max = lane.scrollWidth - lane.clientWidth;
      if (direction > 0 && lane.scrollLeft >= max - 4) lane.scrollTo({ left: 0, behavior: 'smooth' });
      else if (direction < 0 && lane.scrollLeft <= 4) lane.scrollTo({ left: max, behavior: 'smooth' });
      else lane.scrollBy({ left: step * direction, behavior: 'smooth' });
    };
    root.querySelector(prevSelector)?.addEventListener('click', () => move(-1));
    root.querySelector(nextSelector)?.addEventListener('click', () => move(1));
    if (autoAdvance && !reducedMotion.matches) {
      let timer = window.setInterval(() => move(1), 5200);
      root.addEventListener('mouseenter', () => window.clearInterval(timer));
      root.addEventListener('mouseleave', () => { timer = window.setInterval(() => move(1), 5200); });
      root.addEventListener('focusin', () => window.clearInterval(timer));
      root.addEventListener('focusout', () => { timer = window.setInterval(() => move(1), 5200); });
    }
  }
  if (isHomePage) {
    wireScroller('.highlight-carousel', '.highlights-inner', '.highlight-prev', '.highlight-next');
    wireScroller('.industry-carousel', '.industry-grid', '.industry-prev', '.industry-next', true);
  }

  const popup = isHomePage ? document.getElementById('enquiry-overlay') : null;
  if (popup) {
    let alreadyDismissed = false;
    try { alreadyDismissed = sessionStorage.getItem('premach-enquiry-dismissed') === 'yes'; } catch (_) {}
    if (!alreadyDismissed) window.setTimeout(() => { popup.hidden = false; popup.classList.add('is-visible'); }, 10000);
    const dismissPopup = () => {
      popup.classList.remove('is-visible');
      popup.hidden = true;
      try { sessionStorage.setItem('premach-enquiry-dismissed', 'yes'); } catch (_) {}
    };
    popup.querySelector('.popup-close')?.addEventListener('click', dismissPopup);
    popup.querySelector('.enquiry-scrim')?.addEventListener('click', dismissPopup);
    popup.querySelector('.popup-cta')?.addEventListener('click', dismissPopup);
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !popup.hidden) dismissPopup(); });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const detailTitle = document.getElementById('detail-title');
  if (detailTitle) {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand') || 'PMTN';
    const category = params.get('category') || 'Product range';
    const item = params.get('item') || 'Industrial product';
    detailTitle.textContent = item;
    document.getElementById('detail-brand').textContent = brand;
    document.getElementById('detail-category').textContent = category;
    document.getElementById('detail-description').textContent = `${item} from the ${brand} ${category} range. Contact Premach to confirm the exact model, specification and availability for your requirement.`;
    document.title = `${item} | ${brand} | Premach Transmission`;
  }
  const formElement = document.getElementById('enquiry-form');
  if (isHomePage && formElement) formElement.addEventListener('submit', event => {
    event.preventDefault();
    if (!formElement.reportValidity()) return;
    const form = new FormData(event.currentTarget);
    const lines = [
      'Hello Premach, I would like a quote.',
      `Name: ${String(form.get('name') || '').trim()}`,
      `Product/category: ${String(form.get('product') || 'Not selected').trim()}`,
      `Bearing number / size: ${String(form.get('bearing-number') || 'Not provided').trim()}`,
      `Country: ${String(form.get('country') || 'Not provided').trim()}`,
      `Requirement: ${String(form.get('message') || '').trim()}`
    ];
    const whatsappUrl = `https://wa.me/919999210808?text=${encodeURIComponent(lines.join('\n'))}`;
    document.getElementById('form-note').textContent = 'Your enquiry is ready in WhatsApp. Review it and send it there.';
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
})();
