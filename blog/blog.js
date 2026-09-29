/* 由 tools/build_blog.py 生成 */
(function(){var r=document.documentElement,b=document.getElementById('schemeBtn');function sync(){var ink=r.getAttribute('data-scheme')==='ink';b.innerHTML=ink?'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>':'<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>'}b.addEventListener('click',function(){var n=r.getAttribute('data-scheme')==='ink'?'light':'ink';r.setAttribute('data-scheme',n);try{localStorage.setItem('jpy-scheme',n)}catch(e){}sync()});sync();})();
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.activeElement&&document.activeElement.closest('.menu'))document.activeElement.blur()});
/* 本页目录：按 section 自动生成 + 滚动高亮 */
(function(){var box=document.getElementById('tocList');if(!box)return;
 var secs=Array.prototype.slice.call(document.querySelectorAll('.section[id]'));
 secs.forEach(function(s){var h=s.querySelector('.sec-title')||s.querySelector('h2');
   var t=h?h.textContent.trim():s.id;t=t.replace(/^[^\p{L}\p{N}]+/u,'');
   box.insertAdjacentHTML('beforeend','<li><a href="#'+s.id+'">'+t+'</a></li>')});
 var links=Array.prototype.slice.call(box.querySelectorAll('a'));
 if(RM)return;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
   links.forEach(function(a){a.classList.toggle('current',a.getAttribute('href')==='#'+e.target.id)})})},
   {rootMargin:'-45% 0px -50% 0px'});
 secs.forEach(function(s){io.observe(s)});
})();

/* 博客主页：主题矩阵筛选 + 列/卡片联动 + 数字滚动 */
(function(){var mx=document.getElementById('mx');if(!mx)return;
 var SHOT=/[?&]shot/.test(location.search),list=document.getElementById('biList'),cnt=document.getElementById('biCount'),empty=document.getElementById('biEmpty');
 var rows=[].slice.call(mx.querySelectorAll('.mx-row')),cols=[].slice.call(mx.querySelectorAll('.mx-col')),cards=[].slice.call(list.querySelectorAll('.bc'));
 function apply(k){rows.forEach(function(r){r.setAttribute('aria-pressed',r.dataset.k===k?'true':'false')});
  var n=0;[cols,cards].forEach(function(g){g.forEach(function(el){var hit=!k||el.dataset.t.indexOf(k)>-1;el.classList.toggle('out',!hit);if(hit&&g===cards)n++})});
  mx.classList.toggle('filtered',!!k);list.classList.toggle('filtered',!!k);
  cnt.textContent=n+' / '+cards.length;empty.hidden=n>0;
  var u=new URL(location.href);k?u.searchParams.set('t',k):u.searchParams.delete('t');history.replaceState(null,'',u)}
 rows.forEach(function(r){r.addEventListener('click',function(){apply(r.getAttribute('aria-pressed')==='true'?null:r.dataset.k)})});
 document.getElementById('biReset').addEventListener('click',function(){apply(null)});
 function hl(d,on){cols.concat(cards).forEach(function(el){if(el.dataset.d===d)el.classList.toggle('hl',on)})}
 cols.concat(cards).forEach(function(el){el.addEventListener('mouseenter',function(){hl(el.dataset.d,true)});el.addEventListener('mouseleave',function(){hl(el.dataset.d,false)})});
 var q=new URLSearchParams(location.search).get('t');if(q&&rows.some(function(r){return r.dataset.k===q}))apply(q);
 if(RM||SHOT)return;
 mx.classList.add('js-anim');
 new IntersectionObserver(function(es,o){if(!es[0].isIntersecting)return;o.disconnect();
   cols.forEach(function(c,i){setTimeout(function(){c.querySelector('.mx-bar').style.transform='scaleY(1)'},i*60)})},{threshold:.3}).observe(mx);
 [].slice.call(document.querySelectorAll('.bi-stats dd')).forEach(function(el){var to=+el.dataset.n,t0=performance.now();
   (function f(t){var k=Math.min(1,(t-t0)/600);el.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)});
})();

