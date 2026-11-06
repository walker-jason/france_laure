const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const fallbackImages = [
  'salon-01.jpg','salon-02.jpg','salon-03.jpg','salon-04.jpg',
  'salon-05.jpg','salon-06.jpg','salon-07.jpg','salon-08.jpg'
];
function imagePath(index) { return `assets/images/${fallbackImages[index % fallbackImages.length]}`; }

window.addEventListener('load', () => {
  setTimeout(() => $('.loader')?.classList.add('done'), 450);
  document.body.classList.remove('loading');
});
document.body.classList.add('loading');

$$('[data-image]').forEach(img => {
  const path = imagePath(Number(img.dataset.image));
  img.src = path;
  img.addEventListener('error', () => {
    img.style.opacity = '0';
    img.closest('.photo-frame,.gallery-item')?.classList.add('image-missing');
  }, {once:true});
  img.addEventListener('load', () => img.classList.add('loaded'), {once:true});
});

const header = $('.site-header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 35);
window.addEventListener('scroll', updateHeader, {passive:true}); updateHeader();

const menuButton = $('.menu-toggle'), nav = $('.main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
});
$$('.main-nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const heroImage = $('.hero-image');
let ticking = false;
window.addEventListener('scroll', () => {
  if(!ticking){ requestAnimationFrame(() => {
    if(window.innerWidth > 760 && window.scrollY < window.innerHeight) heroImage.style.transform = `translateY(${window.scrollY * .18}px) scale(1.04)`;
    ticking = false;
  }); ticking = true; }
}, {passive:true});

const serviceData = {
  femmes: [
    ['Coupe & brushing','Un style adapté à votre visage et à votre mouvement naturel.'],
    ['Brushing','Une mise en forme soignée pour une finition élégante.'],
    ['Coiffure personnalisée','Une réalisation adaptée à l’occasion et à vos envies.']
  ],
  hommes: [
    ['Coupe homme','Une coupe nette et personnalisée selon votre style.'],
    ['Coupe & finition','Un travail soigné jusque dans les détails.'],
    ['Conseil coiffure','Un accompagnement pour trouver votre style.']
  ],
  couleur: [
    ['Coloration','Des nuances choisies selon votre base et vos envies.'],
    ['Balayage & mèches','Des reflets et de la dimension pour votre chevelure.'],
    ['Diagnostic couleur','Un échange préalable pour définir le résultat souhaité.']
  ],
  soins: [
    ['Soin capillaire','Un rituel adapté aux besoins de vos cheveux.'],
    ['Diagnostic cheveux','Un temps d’échange pour cibler vos besoins.'],
    ['Conseil entretien','Les bons gestes pour prolonger votre résultat.']
  ]
};
const panel = $('#service-panel');
$$('.tab').forEach(tab => tab.addEventListener('click', () => {
  if(tab.classList.contains('active')) return;
  $$('.tab').forEach(t => {t.classList.remove('active');t.setAttribute('aria-selected','false');});
  tab.classList.add('active'); tab.setAttribute('aria-selected','true');
  panel.classList.add('changing');
  setTimeout(() => {
    panel.innerHTML = serviceData[tab.dataset.tab].map(([title,desc]) =>
      `<div class="service-row"><div><h3>${title}</h3><p>${desc}</p></div><span class="service-time">SUR CONSULTATION</span><a href="#contact" aria-label="Demander un rendez-vous pour ${title}">↗</a></div>`
    ).join('');
    panel.classList.remove('changing');
  }, 220);
}));

const galleryImages = fallbackImages.map(imagePath);
let galleryIndex = 0;
const lightbox = $('.lightbox'), lightboxImage = $('.lightbox img');
function showImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[galleryIndex];
}
$$('[data-gallery]').forEach(item => item.addEventListener('click', () => {
  showImage(Number(item.dataset.gallery)); lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
$('.lightbox-close').addEventListener('click',closeLightbox);
$('.lightbox-prev').addEventListener('click',()=>showImage(galleryIndex-1));
$('.lightbox-next').addEventListener('click',()=>showImage(galleryIndex+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});

let reviewIndex = 0;
const reviews = $$('.review');
function showReview(index) {
  reviewIndex = (index + reviews.length) % reviews.length;
  reviews.forEach((r,i)=>r.classList.toggle('active',i===reviewIndex));
  $('#review-count').textContent = `0${reviewIndex+1} / 0${reviews.length}`;
}
$('#review-prev').addEventListener('click',()=>showReview(reviewIndex-1));
$('#review-next').addEventListener('click',()=>showReview(reviewIndex+1));

const day = new Date().getDay();
const today = $(`#hours-list [data-day="${day}"]`);
today?.classList.add('today');
$('#year').textContent = new Date().getFullYear();

const bookingModal = $('.booking-modal');
$$('.nav-cta').forEach(link => link.addEventListener('click', e => {
  // Keep the page navigation as a useful fallback; booking dialog is available from CTA.
  e.preventDefault(); bookingModal.classList.add('open'); bookingModal.setAttribute('aria-hidden','false');
}));
$('.booking-close').addEventListener('click',()=>{bookingModal.classList.remove('open');bookingModal.setAttribute('aria-hidden','true');});
bookingModal.addEventListener('click',e=>{if(e.target===bookingModal){bookingModal.classList.remove('open');bookingModal.setAttribute('aria-hidden','true');}});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeLightbox();bookingModal.classList.remove('open');bookingModal.setAttribute('aria-hidden','true');}
  if(lightbox.classList.contains('open') && e.key==='ArrowRight') showImage(galleryIndex+1);
  if(lightbox.classList.contains('open') && e.key==='ArrowLeft') showImage(galleryIndex-1);
});
