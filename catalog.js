(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = (s, root=document) => root.querySelector(s);
  const qa = (s, root=document) => [...root.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = v => String(v || '').toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,'');
  const wa = t => `https://wa.me/919999210808?text=${encodeURIComponent(t)}`;
  const data = Array.isArray(window.PM_CATALOG) ? window.PM_CATALOG : [];

  // Reusable enquiry dialog. It only prepares links and never sends form data itself.
  const dialog = document.createElement('dialog');
  dialog.className='enquiry-dialog';
  dialog.setAttribute('aria-labelledby','enquiry-title');
  dialog.innerHTML='<div class="enquiry-panel"><button type="button" class="enquiry-close" aria-label="Close enquiry">×</button><p class="cat-kicker">PRODUCT ENQUIRY</p><h2 id="enquiry-title"><img class="urb-logo enquiry-urb-logo" src="assets/logos/urb.png" alt="URB" width="44" height="30" hidden>Ask Premach about this product</h2><p class="enquiry-summary"></p><label>Quantity <input name="quantity" placeholder="e.g. 2" inputmode="numeric"></label><label>Country <input name="country" placeholder="Your country"></label><label>Message <textarea name="message" rows="3" placeholder="Application or other details"></textarea></label><div class="enquiry-actions"><a class="enquiry-whatsapp" target="_blank" rel="noopener">Send on WhatsApp</a><a class="enquiry-email">Email us</a><a href="tel:+919999210808">Call</a></div></div>';
  document.body.append(dialog);
  let activeItems=[];
  const summary=q('.enquiry-summary',dialog), quantity=q('[name=quantity]',dialog), country=q('[name=country]',dialog), message=q('[name=message]',dialog);
  const buildText=()=>{
    const codes=activeItems.map(x=>x.code).filter(Boolean);
    const lead=codes.length===1 ? `Hello Premach, I need a quote for ${activeItems[0].brand} ${codes[0]}.` : codes.length ? `Hello Premach, I need a quote for these products: ${codes.map((code,i)=>`${activeItems[i]?.brand || 'PMTN'} ${code}`).join(', ')}.` : (message.value.trim() || 'Hello Premach, I need a product that is not listed on the website:');
    return `${lead} Quantity: ${quantity.value.trim() || '__'}. Country: ${country.value.trim() || '__'}.${message.value.trim() ? ` Message: ${message.value.trim()}` : ''}`;
  };
  const updateLinks=()=>{const text=buildText();q('.enquiry-whatsapp',dialog).href=wa(text);q('.enquiry-email',dialog).href=`mailto:info@pmtnbearings.com?subject=${encodeURIComponent('Product enquiry - Premach Transmission')}&body=${encodeURIComponent(text)}`;};
  const openEnquiry=(items,extra='')=>{
    activeItems=items.length?items:[{brand:'PMTN',family:'Product enquiry',code:''}];
    const hasUrb=activeItems.some(x=>x.brand==='URB');
    dialog.classList.toggle('brand-urb',hasUrb);
    q('.enquiry-urb-logo',dialog).hidden=!hasUrb;
    const codes=activeItems.map(x=>x.code).filter(Boolean);
    summary.textContent=activeItems.map(x=>[x.brand,x.family,x.code].filter(Boolean).join(' · ')).join(' | ');
    quantity.value='';country.value='';message.value=extra;
    updateLinks();
    if(!dialog.open) dialog.showModal();
    quantity.focus();
  };
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  q('.enquiry-close',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{activeItems=[];});
  dialog.addEventListener('input',updateLinks);
  dialog.addEventListener('keydown',e=>{
    if(e.key!=='Tab')return;
    const focusables=qa('a[href],input,textarea,button:not([disabled])',dialog).filter(x=>x.offsetParent!==null);
    if(!focusables.length)return;
    if(e.shiftKey&&document.activeElement===focusables[0]){e.preventDefault();focusables.at(-1).focus();}
    else if(!e.shiftKey&&document.activeElement===focusables.at(-1)){e.preventDefault();focusables[0].focus();}
  });
  const itemFrom=el=>({brand:el.dataset.brand||'PMTN',family:el.dataset.family||'',code:el.dataset.code||''});

  // Offline-capable finder, fed directly by catalog-data.js.
  qa('[data-catalog-search]').forEach(input=>{
    const wrap=input.closest('.finder-wrap'), results=q('[data-finder-results]',wrap), clear=q('[data-finder-clear]',wrap);
    const render=()=>{
      const raw=input.value.trim(), term=norm(raw);
      if(!term){wrap.classList.remove('has-results');results.innerHTML='';return;}
      let found=data.filter(x=>norm(x.code).includes(term)).slice(0,80);
      let closest=false;
      if(!found.length&&/^\d+$/.test(term)){
        found=data.filter(x=>{let digits=String(x.code).replace(/\D/g,'');for(const digit of term){const at=digits.indexOf(digit);if(at<0)return false;digits=digits.slice(at+1);}return true;}).slice(0,80);
        closest=found.length>0;
      }
      if(!found.length){results.innerHTML=`<button class="finder-empty finder-not-listed" type="button" data-enquiry-typed="${esc(raw)}">Not listed? Enquire for “${esc(raw)}”</button>`;wrap.classList.add('has-results');return;}
      const groups=new Map();found.forEach(x=>{const k=`${x.brand} · ${x.familyName}`;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(x);});
      results.innerHTML=(closest?`<p class="finder-match-note">Closest number matches for “${esc(raw)}”</p>`:'')+[...groups].map(([title,items])=>{const brand=items[0]?.brand||'PMTN';return `<section class="finder-group" data-brand="${esc(brand)}"><h3>${brand==='URB'?'<img class="urb-logo" src="assets/logos/urb.png" alt="URB" width="30" height="20"> ':''}${esc(title)}</h3>${items.map(x=>`<button type="button" class="finder-result" data-enquire-model data-code="${esc(x.code)}" data-brand="${esc(x.brand)}" data-family="${esc(x.familyName)}"><b>${esc(x.code)}</b><small>${esc(x.familyName)}</small><em>${esc(x.boreMm)} mm</em></button>`).join('')}</section>`}).join('');
      wrap.classList.add('has-results');
    };
    input.addEventListener('input',render);input.addEventListener('focus',render);
    input.addEventListener('keydown',e=>{if(e.key==='Escape'){wrap.classList.remove('has-results');results.innerHTML='';}});
    clear?.addEventListener('click',()=>{input.value='';results.innerHTML='';wrap.classList.remove('has-results');input.focus();});
    document.addEventListener('click',e=>{if(!wrap.contains(e.target))wrap.classList.remove('has-results');});
  });

  // Shared filters and Cards/Table/Chart views for model families.
  const modelGrid=q('[data-model-grid]');
  if(modelGrid){
    const cards=qa('.model-card',modelGrid);
    cards.filter(card=>card.dataset.brand==='URB').forEach(card=>{const heading=q('h3',card);if(heading&&!heading.querySelector('.urb-logo'))heading.insertAdjacentHTML('afterbegin','<img class="urb-logo model-urb-logo" src="assets/logos/urb.png" alt="URB" width="30" height="20"> ');});
    const records=cards.map(card=>{const source=data.find(x=>x.code===card.dataset.code&&x.brand===card.dataset.brand);return {brand:card.dataset.brand,familyName:card.dataset.family,code:card.dataset.code,number:card.dataset.code.split(' ')[0],suffix:card.dataset.code.split(' ').slice(1).join(' '),series:card.dataset.series,boreMm:Number(card.dataset.bore),designation:card.dataset.design,taperedBore:card.dataset.taper==='true',clearance:card.dataset.clearance,otherBrandUrl:source?.otherBrandUrl,card};});
    const input=q('[data-model-filter]'), count=q('[data-result-count]'), empty=q('[data-empty]'), toolbar=q('.filter-toolbar');
    const design=q('[data-filter-design]'), taper=q('[data-filter-taper]'), clearance=q('[data-filter-clearance]'), bore=q('[data-filter-bore]');
    const tableTarget=q('[data-table-view]'), chartTarget=q('[data-chart-view]');
    const selection=new Map();let activeSeries='', view='table',sortKey='series',sortDirection=1,rowLimit=200,cardLimit=24;
    try{view=localStorage.getItem('pm-catalog-view')||'table';}catch(_){view='table';}
    const hashParts=()=>{const raw=location.hash.slice(1),params=new URLSearchParams(raw);return {series:params.get('series')||'',q:params.get('q')||''};};
    const hash=hashParts();activeSeries=hash.series;
    if(hash.q&&input) input.value=hash.q;
    const matches=()=>{const term=norm(input?.value),d=design?.value||'',c=clearance?.value||'',b=bore?.value||'';return records.filter(x=>{
      const okTerm=!term||norm(x.code).includes(term),okSeries=!activeSeries||x.series===activeSeries,okDesign=!d||x.design===d,okTaper=!taper?.checked||x.taperedBore,okClear=!c||x.clearance===c;
      const okBore=!b||(b==='small'?x.boreMm<=50:b==='medium'?x.boreMm>50&&x.boreMm<=100:x.boreMm>100);
      return okTerm&&okSeries&&okDesign&&okTaper&&okClear&&okBore;
    });};
    const selectedToggle=()=>{const bar=q('[data-select-bar]'),label=q('[data-selected-count]');if(label)label.textContent=`${selection.size} selected`;if(bar)bar.hidden=!selection.size;};
    const tableHTML=(items,total=items.length)=>{
      items=[...items].sort((a,b)=>{const av=a[sortKey],bv=b[sortKey];const cmp=typeof av==='number'?av-bv:String(av||'').localeCompare(String(bv||''),undefined,{numeric:true,sensitivity:'base'});return cmp*sortDirection;});
      const groups=new Map();items.forEach(x=>{if(!groups.has(x.series))groups.set(x.series,[]);groups.get(x.series).push(x);});
      const renderRows=arr=>arr.map(x=>`<tr data-row-code="${esc(x.code)}"><td><input type="checkbox" aria-label="Select ${esc(x.code)}" data-select-code="${esc(x.code)}" ${selection.has(x.code)?'checked':''}></td><td><button type="button" class="table-code" data-enquire-model data-code="${esc(x.code)}" data-brand="${esc(x.brand)}" data-family="${esc(x.familyName)}">${esc(x.code)}</button></td><td>${esc(x.series)}</td><td>${x.boreMm}</td><td>${esc(x.designation||'—')}</td><td>${x.taperedBore?'K':''}</td><td>${esc(x.clearance||'—')}</td><td>${x.otherBrandUrl?`<a class="cross-brand ${x.brand==='PMTN'?'brand-urb-tag':''}" data-brand="${x.brand==='PMTN'?'URB':'PMTN'}" href="${esc(x.otherBrandUrl)}">${x.brand==='PMTN'?'<img class="urb-logo" src="assets/logos/urb.png" alt="URB" width="24" height="16"> ':''}Also in ${x.brand==='PMTN'?'URB':'PMTN'}</a>`:'—'}</td><td><button type="button" data-enquire-model data-code="${esc(x.code)}" data-brand="${esc(x.brand)}" data-family="${esc(x.familyName)}">Enquire</button></td></tr>`).join('');
      const half=matchMedia('(min-width:1200px)').matches?Math.ceil(items.length/2):items.length;
      const cols=matchMedia('(min-width:1200px)').matches?[items.slice(0,half),items.slice(half)]:[items];
      return `<div class="catalog-table-halves">${cols.map(col=>`<div class="catalog-table-scroll"><table class="catalog-table"><thead><tr><th>Select</th><th data-sort="code">Model</th><th data-sort="series">Series</th><th data-sort="boreMm">Bore</th><th>Design</th><th>Taper</th><th>Clearance</th><th>Also in</th><th></th></tr></thead><tbody>${[...groups].map(([series,arr])=>`<tr class="table-series"><th colspan="9">Series ${esc(series)} · ${arr.length} models</th></tr>${renderRows(arr)}`).join('')}</tbody></table></div>`).join('')}</div>${total>items.length?`<button type="button" class="show-more" data-table-more>Load next 200 models</button>`:''}`;
    };
    const chartHTML=items=>{
      const groups=new Map();items.forEach(x=>{if(!groups.has(x.series))groups.set(x.series,[]);groups.get(x.series).push(x);});
      return [...groups].map(([series,arr])=>{
        const suffixed=arr.some(x=>x.suffix);
        if(!suffixed)return `<section class="chart-series"><h3>Series ${esc(series)} · ${arr.length} models</h3><div class="compact-model-grid">${arr.map(x=>`<button type="button" class="chart-plain-code" data-enquire-model data-code="${esc(x.code)}" data-brand="${esc(x.brand)}" data-family="${esc(x.familyName)}">${esc(x.code)} <small>${x.boreMm} mm</small></button>`).join('')}</div></section>`;
        const variants=[...new Set(arr.map(x=>x.suffix||'—'))].sort();const byNum=new Map();arr.forEach(x=>{if(!byNum.has(x.number))byNum.set(x.number,[]);byNum.get(x.number).push(x);});
        return `<section class="chart-series"><h3>Series ${esc(series)} · ${arr.length} models</h3><p class="chart-hint">Gold dot = listed model. Tap a dot to enquire.</p><div class="chart-scroll"><table class="chart-table"><thead><tr><th>Base number · bore</th>${variants.map(v=>`<th>${esc(v)}</th>`).join('')}</tr></thead><tbody>${[...byNum].map(([num,entries])=>`<tr><th>${esc(num)} · ${entries[0].boreMm} mm</th>${variants.map(variant=>{const x=entries.find(item=>(item.suffix||'—')===variant);return `<td>${x?`<input type="checkbox" data-select-code="${esc(x.code)}" aria-label="Select ${esc(x.code)}" ${selection.has(x.code)?'checked':''}><button class="chart-dot" type="button" title="${esc(x.code)}" aria-label="Enquire about ${esc(x.code)}" data-enquire-model data-code="${esc(x.code)}" data-brand="${esc(x.brand)}" data-family="${esc(x.familyName)}">●</button>`:'<span class="chart-missing">—</span>'}</td>`}).join('')}</tr>`).join('')}</tbody></table></div></section>`;
      }).join('');
    };
    const render=()=>{
      const found=matches();
      const showAll=Boolean(input?.value||activeSeries||design?.value||taper?.checked||clearance?.value||bore?.value);
      cards.forEach((card,index)=>{card.hidden=view!=='cards'||(!showAll&&index>=cardLimit);});
      const showMore=q('[data-show-more]');if(showMore)showMore.hidden=view!=='cards'||showAll||found.length<=cardLimit;
      if(tableTarget){tableTarget.hidden=view!=='table';tableTarget.innerHTML=view==='table'?tableHTML(found.slice(0,rowLimit),found.length):'';}
      if(chartTarget){chartTarget.hidden=view!=='chart';chartTarget.innerHTML=view==='chart'?chartHTML(found):'';}
      modelGrid.hidden=view!=='cards';
      if(count)count.textContent=`${found.length} model${found.length===1?'':'s'}`;
      if(empty)empty.hidden=found.length>0;
      qa('[data-view]').forEach(b=>b.classList.toggle('is-active',b.dataset.view===view));
      qa('[data-series-filter]').forEach(b=>b.classList.toggle('is-active',b.dataset.seriesFilter===activeSeries));
      selectedToggle();
    };
    const setView=v=>{view=v;try{localStorage.setItem('pm-catalog-view',view);}catch(_){}render();};
    document.addEventListener('click',e=>{
      const vb=e.target.closest('[data-view]');if(vb){setView(vb.dataset.view);return;}
      const sort=e.target.closest('[data-sort]');if(sort){const key=sort.dataset.sort;if(sortKey===key)sortDirection*=-1;else{sortKey=key;sortDirection=1;}render();return;}
      if(e.target.closest('[data-table-more]')){rowLimit+=200;render();return;}
      if(e.target.closest('[data-show-more]')){cardLimit+=24;render();return;}
      const sb=e.target.closest('[data-series-filter]');if(sb){activeSeries=activeSeries===sb.dataset.seriesFilter?'':sb.dataset.seriesFilter;history.replaceState(null,'',activeSeries?`#series=${encodeURIComponent(activeSeries)}`:location.pathname+location.search);render();return;}
      if(e.target.closest('[data-mobile-filter]'))toolbar?.classList.toggle('filters-open');
      if(e.target.closest('[data-clear-filters]')){if(input)input.value='';if(design)design.value='';if(clearance)clearance.value='';if(bore)bore.value='';if(taper)taper.checked=false;activeSeries='';history.replaceState(null,'',location.pathname+location.search);render();}
      if(e.target.closest('[data-open-selected]'))openEnquiry([...selection.values()]);
      if(e.target.closest('[data-clear-selected]')){selection.clear();render();}
    });
    [input,design,taper,clearance,bore].filter(Boolean).forEach(el=>el.addEventListener('input',render));
    document.addEventListener('change',e=>{const cb=e.target.closest('[data-select-code]');if(!cb)return;const code=cb.dataset.selectCode,record=data.find(x=>x.code===code);if(cb.checked){if(record)selection.set(code,{brand:record.brand,family:record.familyName,code});else selection.set(code,{brand:'PMTN',family:'',code});}else selection.delete(code);selectedToggle();});
    document.addEventListener('click',e=>{if(toolbar?.classList.contains('filters-open')&&!e.target.closest('.filter-toolbar'))toolbar.classList.remove('filters-open');});
    if(activeSeries||hash.q)requestAnimationFrame(()=>q('#models')?.scrollIntoView({block:'start',behavior:reduceMotion?'auto':'smooth'}));
    render();
  }

  // All model cards, finder results and enquiry-first CTAs use the same panel.
  document.addEventListener('click',e=>{
    const more=e.target.closest('[data-enquiry-more]');
    if(more){e.preventDefault();openEnquiry([],'Hello Premach, I need a product that is not listed on the website: ');return;}
    const typed=e.target.closest('[data-enquiry-typed]');
    if(typed){openEnquiry([] ,`Hello Premach, please help me identify ${typed.dataset.enquiryTyped}.`);return;}
    const target=e.target.closest('[data-enquire-model],[data-open-enquiry]');
    if(target){if(target.matches('a'))e.preventDefault();const diameter=target.dataset.shaftDiameter;const family=target.dataset.family||'';const extra=diameter?`Hello Premach, I need PMTN Shafts, diameter ${diameter} mm. Please share length options and price.`:family==='Shafts'?'Shaft diameters are 6 mm to 80 mm. Please share the diameter, length and quantity.':'';openEnquiry([itemFrom(target)],extra);}
  });
  document.addEventListener('keydown',e=>{const target=e.target.closest('[data-enquire-model]');if(target&&(e.key==='Enter'||e.key===' ')){if(target.tagName!=='BUTTON'){e.preventDefault();openEnquiry([itemFrom(target)]);}}});
  document.addEventListener('click',e=>{const row=e.target.closest('[data-row-code]');if(row&&!e.target.closest('button,input,a')){const record=data.find(x=>x.code===row.dataset.rowCode);if(record)openEnquiry([{brand:record.brand,family:record.familyName,code:record.code}]);}});

  qa('[data-urb-spec-filter]').forEach(input=>input.addEventListener('input',()=>{
    const term=norm(input.value);
    qa('[data-urb-spec-row]').forEach(row=>{row.hidden=!!term&&!norm(row.dataset.designation||'').includes(term);});
  }));
  if(document.body.classList.contains('brand-urb'))qa('.urb-spec-group h3,.chart-series h3,.model-card h3').forEach(heading=>{if(!heading.querySelector('.urb-logo'))heading.insertAdjacentHTML('afterbegin','<img class="urb-logo" src="assets/logos/urb.png" alt="URB" width="30" height="20"> ');});

  // Counters, gallery filters and lightbox.
  const counters=qa('[data-count-up]');
  const countUp=el=>{const n=Number(el.dataset.countUp);if(!Number.isFinite(n)||el.dataset.counted)return;el.dataset.counted='true';if(reduceMotion){el.textContent=String(n);return;}const start=performance.now();const frame=t=>{const p=Math.min(1,(t-start)/650);el.textContent=String(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(frame);};requestAnimationFrame(frame);};
  if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){countUp(x.target);observer.unobserve(x.target);}}),{threshold:.4});counters.forEach(x=>observer.observe(x));}else counters.forEach(countUp);
  const gallery=qa('.gallery-tile'),lightbox=q('[data-lightbox]');
  if(gallery.length&&lightbox){const visible=()=>gallery.filter(x=>!x.hidden);let current=0;const img=q('[data-lightbox-image]',lightbox),caption=q('[data-lightbox-caption]',lightbox);const set=i=>{const xs=visible();if(!xs.length)return;current=(i+xs.length)%xs.length;const source=q('img',xs[current]);img.src=source.dataset.fullSrc||source.src;img.alt=source.alt;caption.textContent=source.alt;};const open=i=>{set(i);lightbox.hidden=false;document.body.style.overflow='hidden';q('.lightbox-close',lightbox)?.focus();};const close=()=>{lightbox.hidden=true;document.body.style.overflow='';};gallery.forEach((tile,i)=>q('.gallery-thumb',tile)?.addEventListener('click',()=>open(visible().indexOf(tile))));q('.lightbox-close',lightbox)?.addEventListener('click',close);q('.lightbox-prev',lightbox)?.addEventListener('click',()=>set(current-1));q('.lightbox-next',lightbox)?.addEventListener('click',()=>set(current+1));lightbox.addEventListener('click',e=>{if(e.target===lightbox)close();});document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')set(current-1);if(e.key==='ArrowRight')set(current+1);});qa('[data-gallery-filter]').forEach(b=>b.addEventListener('click',()=>{qa('[data-gallery-filter]').forEach(x=>x.classList.toggle('is-active',x===b));gallery.forEach(x=>x.hidden=b.dataset.galleryFilter!=='all'&&x.dataset.brand!==b.dataset.galleryFilter&&x.dataset.kind!==b.dataset.galleryFilter);}));}
  qa('.cat-section>.cat-shell').forEach(shell=>{if(shell.querySelector('.section-topline h2, .cat-kicker')){const marker=document.createElement('span');marker.className='section-bearing';marker.setAttribute('aria-hidden','true');marker.innerHTML='<svg class="cat-bearing" viewBox="0 0 120 120"><use href="#pm-bearing"></use></svg>';shell.prepend(marker);}});
})();
