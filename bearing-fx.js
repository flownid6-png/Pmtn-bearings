(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isHome = document.body.classList.contains('home');
  const isAbout = document.body.classList.contains('about');
  const decoratedPage = isHome || isAbout;
  const symbol = '<svg class="bearing-icon" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><use href="#pm-bearing"></use></svg>';
  const svg = (cls='') => `<svg class="${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><use href="#pm-bearing"></use></svg>`;

  // Other static pages use the same transition. Give their bearing icon the same reusable symbol.
  if (!document.getElementById('pm-bearing')) {
    document.body.insertAdjacentHTML('afterbegin', `<svg class="bearing-sprite" aria-hidden="true"><defs><radialGradient id="bearing-steel" cx="32%" cy="25%"><stop offset="0" stop-color="#fff"/><stop offset=".34" stop-color="#dfe5e8"/><stop offset=".72" stop-color="#86929a"/><stop offset="1" stop-color="#344352"/></radialGradient><linearGradient id="bearing-race" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dce1e4"/><stop offset=".48" stop-color="#697782"/><stop offset=".72" stop-color="#e8ecee"/><stop offset="1" stop-color="#65727e"/></linearGradient><symbol id="pm-bearing" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="none" stroke="url(#bearing-race)" stroke-width="11"/><circle cx="60" cy="60" r="45" fill="none" stroke="#d59d36" stroke-width="1.5"/><circle cx="60" cy="60" r="37" fill="none" stroke="url(#bearing-race)" stroke-width="4"/><circle cx="60" cy="60" r="25" fill="none" stroke="#d59d36" stroke-width="1.5"/><circle cx="60" cy="60" r="17" fill="none" stroke="url(#bearing-race)" stroke-width="5"/><g fill="url(#bearing-steel)" stroke="#596773" stroke-width="1"><circle cx="60" cy="17" r="5.2"/><circle cx="85.3" cy="25.2" r="5.2"/><circle cx="101" cy="46.8" r="5.2"/><circle cx="96.4" cy="73.6" r="5.2"/><circle cx="73.2" cy="96.8" r="5.2"/><circle cx="46.8" cy="96.8" r="5.2"/><circle cx="23.6" cy="73.6" r="5.2"/><circle cx="19" cy="46.8" r="5.2"/><circle cx="34.7" cy="25.2" r="5.2"/><circle cx="60" cy="103" r="5.2"/></g><circle cx="60" cy="60" r="49" fill="none" stroke="#fff" stroke-opacity=".34"/></symbol></defs></svg>`);
  }

  // A dismissed popup should stay closed for this visit, then be eligible on the next homepage visit.
  if (isHome) { try { sessionStorage.removeItem('premach-enquiry-dismissed'); } catch (_) {} }

  // Keep primary quote CTA aligned with the approved wording without changing the shared shell logic.
  const headerCta = decoratedPage ? document.querySelector('.nav-cta') : null;
  if (headerCta) { headerCta.href = 'https://wa.me/919999210808?text=Hello%20Premach%2C%20I%20need%20a%20quote%20for%20'; headerCta.innerHTML = 'Get a quote on WhatsApp <span aria-hidden="true">↗</span>'; }
  const footerLine = decoratedPage ? document.querySelector('.footer-bottom span:nth-child(2)') : null;
  if (footerLine) footerLine.textContent = 'PMTN and URB bearings, shafts and linear parts. Delhi, since 2016.';

  // Replace the legacy three-dimensional hero artwork with a quiet line-art bearing, without touching slider code.
  const hero = document.querySelector('body.home .hero');
  const slides = hero ? [...hero.querySelectorAll('.slide')] : [];
  const dots = hero ? [...hero.querySelectorAll('.slider-dot')] : [];
  const count = document.getElementById('slide-current');
  const heroImages = ["url('assets/hero/hero-01.png')", "url('assets/hero/hero-02.png')", "url('assets/hero/hero-03.png')"];
  const prev = hero?.querySelector('.slider-prev');
  const next = hero?.querySelector('.slider-next');
  let activeSlide = 0;
  let slideTimer;
  if (hero && slides.length) {
    const showSlide = index => {
      activeSlide = (index + slides.length) % slides.length;
      slides.forEach((slide,i) => slide.classList.toggle('is-active',i===activeSlide));
      dots.forEach((dot,i) => { dot.classList.toggle('is-active',i===activeSlide); dot.setAttribute('aria-pressed',String(i===activeSlide)); });
      if (count) count.textContent = `0${activeSlide+1}`;
      hero.style.setProperty('--hero-image',heroImages[activeSlide]);
      hero.classList.remove('is-changing'); requestAnimationFrame(()=>hero.classList.add('is-changing'));
    };
    const restartSlides = () => { clearInterval(slideTimer); if(!reduced) slideTimer=setInterval(()=>showSlide(activeSlide+1),4800); };
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{showSlide(i);restartSlides();}));
    prev?.addEventListener('click',()=>{showSlide(activeSlide-1);restartSlides();});
    next?.addEventListener('click',()=>{showSlide(activeSlide+1);restartSlides();});
    let startX=null;
    hero.addEventListener('pointerdown',e=>{if(!e.target.closest('a,button'))startX=e.clientX;});
    hero.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;if(Math.abs(dx)>48)showSlide(activeSlide+(dx<0?1:-1));startX=null;restartSlides();});
    hero.addEventListener('mouseenter',()=>clearInterval(slideTimer));
    hero.addEventListener('mouseleave',restartSlides);
    hero.addEventListener('focusin',()=>clearInterval(slideTimer));
    hero.addEventListener('focusout',restartSlides);
    showSlide(0);restartSlides();
  }
  const art = hero?.querySelector('.hero-art');
  if (art) {
    const balls = Array.from({length:12},(_,i)=>{const a=(Math.PI*2*i/12)-Math.PI/2,x=310+Math.cos(a)*176,y=310+Math.sin(a)*176;return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16"/>`;}).join('');
    art.innerHTML = `<svg class="hero-bearing-line-art" viewBox="0 0 620 620" aria-hidden="true"><g class="hero-bearing-rotation" fill="none" stroke="#d6b36b" stroke-width="2"><circle cx="310" cy="310" r="278"/><circle cx="310" cy="310" r="244" stroke="#b8c5d1" stroke-width="9"/><circle cx="310" cy="310" r="200"/><circle cx="310" cy="310" r="155" stroke="#b8c5d1" stroke-width="12"/><circle cx="310" cy="310" r="112"/><circle cx="310" cy="310" r="84" stroke="#b8c5d1" stroke-width="10"/><g fill="#101f36">${balls}</g></g></svg>`;
    if (!reduced) {
      hero.addEventListener('pointermove',e=>{if(innerWidth<701)return;const r=hero.getBoundingClientRect(),x=((e.clientX-r.left)/r.width-.5)*24,y=((e.clientY-r.top)/r.height-.5)*24;art.style.setProperty('--parallax-x',`${x}px`);art.style.setProperty('--parallax-y',`${y}px`);},{passive:true});
      hero.addEventListener('pointerleave',()=>{art.style.setProperty('--parallax-x','0px');art.style.setProperty('--parallax-y','0px');});
      const slides=hero.querySelector('.slides');
      if(slides)new MutationObserver(()=>{art.classList.add('is-slide-change');setTimeout(()=>art.classList.remove('is-slide-change'),650);}).observe(slides,{subtree:true,attributes:true,attributeFilter:['class']});
    }
  }

  // Opening animation replaces only the old curtain presentation.
  const intro=document.getElementById('bearing-intro');
  if(intro){
    const oldOverflow=document.body.style.overflow;
    let finished=false;
    const finish=()=>{if(finished)return;finished=true;intro.classList.remove('is-opening');intro.classList.add('is-done');document.body.style.overflow=oldOverflow;document.documentElement.classList.remove('bearing-intro-playing');};
    if(reduced){finish();}
    else{
      document.documentElement.classList.add('bearing-intro-playing');document.body.style.overflow='hidden';
      requestAnimationFrame(()=>intro.classList.add('is-opening'));
      const timer=setTimeout(finish,2380);
      intro.addEventListener('click',()=>{clearTimeout(timer);finish();},{once:true});
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!finished){clearTimeout(timer);finish();}},{once:false});
    }
  }

  // One reusable decorative bearing is added to cards and section breaks.
  document.querySelectorAll('body.home .brand-panel').forEach(card=>{if(!card.querySelector('.brand-bearing-corner'))card.insertAdjacentHTML('beforeend',`<span class="brand-bearing-corner">${symbol}</span>`);});
  document.querySelectorAll('body.home .product-card').forEach(card=>{if(!card.querySelector('.product-bearing-hover'))card.insertAdjacentHTML('afterbegin',`<span class="product-bearing-hover">${symbol}</span>`);});
  document.querySelectorAll('body.home .products-section,body.home .industries-section,body.home .how-order-section,body.home .testimonials-section,body.home .enquiry-section').forEach(section=>{
    if(!section.previousElementSibling?.classList.contains('bearing-divider'))section.insertAdjacentHTML('beforebegin',`<div class="bearing-divider reveal" aria-hidden="true">${symbol}</div>`);
  });
  const steps=document.querySelector('.order-steps');
  if(steps){steps.insertAdjacentHTML('afterbegin',`<span class="order-rolling-bearing" aria-hidden="true">${symbol}</span>`);steps.querySelectorAll('article>span').forEach(el=>{el.classList.add('step-number-ring');el.insertAdjacentHTML('beforeend',symbol);});}
  document.querySelectorAll('.timeline-track article').forEach(el=>el.insertAdjacentHTML('afterbegin',`<span class="timeline-bearing-node" aria-hidden="true">${symbol}</span>`));

  // Scroll progress and back-to-top control.
  if (decoratedPage) {
    const scrollButton=document.createElement('button');scrollButton.type='button';scrollButton.className='bearing-scroll-top';scrollButton.setAttribute('aria-label','Back to top');scrollButton.innerHTML=`<svg class="scroll-progress" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21"/><circle cx="24" cy="24" r="21"/></svg>${symbol}`;document.body.append(scrollButton);
    scrollButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'auto':'smooth'}));
    const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight,p=max>0?Math.min(1,scrollY/max):0;scrollButton.querySelector('.scroll-progress circle:last-child').style.strokeDashoffset=String(132*(1-p));scrollButton.querySelector('.bearing-icon').style.transform=`rotate(${p*360}deg)`;};
    window.addEventListener('scroll',updateProgress,{passive:true});window.addEventListener('resize',updateProgress);updateProgress();
  }

  // Observe only the new decorative nodes; the shared reveal observer continues to own existing content.
  if('IntersectionObserver'in window&&!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.bearing-divider,.timeline-track article,.about-timeline,.order-steps').forEach(el=>observer.observe(el));}else document.querySelectorAll('.bearing-divider,.timeline-track article,.about-timeline,.order-steps').forEach(el=>el.classList.add('is-visible'));
})();
