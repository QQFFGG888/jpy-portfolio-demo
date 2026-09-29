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

