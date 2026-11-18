(()=>{
  const start=()=>{
    if(document.documentElement.dataset.sustainoEffects)return;
    document.documentElement.dataset.sustainoEffects='1';
    const css=document.createElement('style');
    css.textContent=`
      @media (prefers-reduced-motion:no-preference){
        main>section,.page>section,.shell>section,.industry-card,.card,.product-card{opacity:0;transform:translateY(18px);transition:opacity .72s ease,transform .72s cubic-bezier(.2,.8,.2,1)}
        .sustaino-in{opacity:1!important;transform:none!important}
        .product-card img,.industry-card img,.quick-card img{transition:transform .5s cubic-bezier(.2,.8,.2,1),filter .5s ease}
        .product-card:hover img,.industry-card:hover img,.quick-card:hover img{transform:translateY(-7px) scale(1.035);filter:drop-shadow(0 16px 14px #173c2820)}
        .sustaino-nav{animation:sustainoNav .7s ease both}@keyframes sustainoNav{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
      }
      .sustaino-contact{margin:74px auto 0;width:min(1240px,88vw);background:#173c28;color:#f7f3ea;padding:48px clamp(24px,5vw,68px);display:grid;grid-template-columns:.9fr 1.1fr;gap:42px;position:relative;overflow:hidden}
      .sustaino-contact:before{content:'';position:absolute;width:280px;height:280px;border:1px solid #a3b17c88;border-radius:50%;right:-90px;top:-150px;box-shadow:0 0 0 34px #a3b17c18,0 0 0 68px #a3b17c0d}
      .sustaino-contact>*{position:relative;z-index:1}.sustaino-contact-kicker{font:700 10px Arial,sans-serif;letter-spacing:.18em;color:#cbd5a8}.sustaino-contact h2{font:400 clamp(38px,4.5vw,62px)/.95 Georgia,serif;letter-spacing:-.045em;margin:15px 0}.sustaino-contact p{max-width:390px;color:#e5e6da;margin:0}.sustaino-contact form{display:grid;grid-template-columns:1fr 1fr;gap:12px}.sustaino-contact label{font:700 9px Arial,sans-serif;letter-spacing:.13em;color:#dce1c6;display:grid;gap:6px}.sustaino-contact label.full{grid-column:1/-1}.sustaino-contact input,.sustaino-contact select,.sustaino-contact textarea{width:100%;background:#fffdf9;color:#173c28;border:0;padding:13px;font:14px Arial,sans-serif;border-radius:0}.sustaino-contact textarea{min-height:82px;resize:vertical}.sustaino-contact button{justify-self:start;border:1px solid #dce1c6;background:#dce1c6;color:#173c28;padding:13px 18px;font:700 10px Arial,sans-serif;letter-spacing:.14em;cursor:pointer}.sustaino-contact small{grid-column:1/-1;color:#dce1c6;font-size:11px;line-height:1.4}@media(max-width:760px){.sustaino-contact{width:calc(100% - 40px);grid-template-columns:1fr;padding:34px 24px}.sustaino-contact form{grid-template-columns:1fr}.sustaino-contact label.full{grid-column:auto}}
    `;
    document.head.appendChild(css);
    const targets=[...document.querySelectorAll('main>section,.page>section,.shell>section,.industry-card,.card,.product-card')];
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('sustaino-in');observer.unobserve(entry.target)}}),{threshold:.12});targets.forEach((el,i)=>{el.style.transitionDelay=Math.min(i*45,180)+'ms';observer.observe(el)});
    if(!document.querySelector('.sustaino-contact')){
      const block=document.createElement('section');block.className='sustaino-contact';block.innerHTML=`<div><div class="sustaino-contact-kicker">BUSINESS ENQUIRY</div><h2>Let’s find the right packaging.</h2><p>Tell us a little about your service. When you are ready, continue to our LINE account to speak with Sustaino Packaging TH.</p></div><form id="sustaino-enquiry"><label>YOU ARE A<select name="type"><option>Restaurant / café</option><option>Hotel / caterer</option><option>Retail / distributor</option><option>Corporate / event</option><option>Individual</option><option>Other</option></select></label><label>YOUR NAME<input name="name" required placeholder="Full name"></label><label>PHONE<input name="phone" inputmode="tel" placeholder="Phone number"></label><label>EMAIL<input name="email" type="email" required placeholder="you@email.com"></label><label class="full">WHAT DO YOU NEED?<textarea name="message" placeholder="Products, quantities, delivery requirements…"></textarea></label><button type="submit">CONTINUE TO LINE →</button><small>Your details stay on your device until you choose to contact us on LINE.</small></form>`;
      const footer=document.querySelector('footer');(footer?footer.parentNode:document.body).insertBefore(block,footer||null);
      block.querySelector('form').addEventListener('submit',e=>{e.preventDefault();window.open('https://line.me/R/ti/p/@879ftbvg','_blank','noopener')});
    }
    if(document.querySelector('[data-enquiry-item]')){
      const basketStyle=document.createElement('style');basketStyle.textContent='.sustaino-basket{position:fixed;z-index:120;right:24px;bottom:24px;background:#173c28;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:14px;box-shadow:0 18px 35px #173c283d;font:700 10px Arial,sans-serif;letter-spacing:.12em}.sustaino-basket button{border:1px solid #dce1c6;background:#dce1c6;color:#173c28;padding:10px 12px;font:700 9px Arial,sans-serif;letter-spacing:.12em;cursor:pointer}.add-enquiry{display:inline-flex;align-items:center;margin-top:17px;border:1px solid #173c28;background:transparent;color:#173c28;padding:11px 13px;font:700 10px Arial,sans-serif;letter-spacing:.12em;cursor:pointer}.add-enquiry.added{background:#173c28;color:#fff}@media(max-width:700px){.sustaino-basket{left:16px;right:16px;bottom:14px;justify-content:space-between}}';document.head.appendChild(basketStyle);
      const key='sustaino-enquiry-items';let items=[];try{items=JSON.parse(sessionStorage.getItem(key)||'[]')}catch(e){};
      const bar=document.createElement('div');bar.className='sustaino-basket';document.body.appendChild(bar);
      const render=()=>{bar.innerHTML='<span>'+items.length+' ITEM'+(items.length===1?'':'S')+' IN ENQUIRY</span><button type="button">SEND ENQUIRY →</button>';bar.querySelector('button').onclick=()=>document.querySelector('.sustaino-contact')?.scrollIntoView({behavior:'smooth',block:'start'})};
      render();document.querySelectorAll('[data-enquiry-item]').forEach(btn=>{const item=btn.dataset.enquiryItem;if(items.includes(item)){btn.classList.add('added');btn.textContent='ADDED TO ENQUIRY ✓'}btn.addEventListener('click',()=>{if(!items.includes(item)){items.push(item);sessionStorage.setItem(key,JSON.stringify(items));btn.classList.add('added');btn.textContent='ADDED TO ENQUIRY ✓';render()}})});
    }

  };
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
