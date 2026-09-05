const CONTENT = {
  hero: {
    slides: [
      { img: "logo/Patrz (1).jpg", alt: "Patrz tutaj logo" },
      { img: "carousel/065A1592-2.jpg", alt: "Sesja produktu" },
      { img: "carousel/065A3264.jpg", alt: "Sesja kawa" },
      { img: "carousel/065A3320.jpg", alt: "Sesja studyjna" },
      { img: "carousel/065A1909.jpg", alt: "Sesja domowa", objectPosition: "center 25%" }
    ],
    heading:    "Fotograf Szczecin",
    subheading: "Szukasz doświadczonego fotografa na terenie Szczecina i okolic?<br><b>Świetnie trafiłaś!</b>",
    ctaLabel:   "Zarezerwuj sesję"
  },
  about: {
    tag:      "O mnie",
    heading:  "Wanessa Kistela",
    paragraphs: [
      "Jestem fotografką, która wykonuje profesjonalne zdjęcia na terenie Szczecina.",
      "Specjalizuję się w indywidualnych sesjach wizerunkowych i rodzinnych.",
      "Bez względu na rodzaj zdjęć i ich przeznaczenie, stawiam na niebanalne i kreatywne rozwiązania, by efekt każdej sesji zdjęciowej był nie tylko na najwyższym poziomie, ale także zachwycił i pozostawił w pamięci na długo. Każdą sesję traktuję indywidualnie, słucham potrzeb i dbam o to, żeby efekt końcowy był czymś, do czego będziecie wracać z uśmiechem.",
    ],
    // name: "Wanessa Kistela"
  },
  portfolio: {
    tag:      "Portfolio",
    heading:  "Chwile, które zostają na zawsze",
    sub:      "Każda sesja to osobna historia. Oto kilka z nich.",
    photos: [
    //   { img: "portfolio/065A0652-2.jpg", alt: "Sesja 1" },
    //   { img: "portfolio/065A0900.jpg", alt: "Sesja 2" },
      { img: "portfolio/065A1207-2.jpg", alt: "Sesja 3" },
    //   { img: "portfolio/065A1313.jpg", alt: "Sesja 4" },
      { img: "portfolio/065A1508.jpg", alt: "Sesja 5" },
    //   { img: "portfolio/065A1592-2.jpg", alt: "Sesja 6" },
    //   { img: "portfolio/065A1678-2.jpg", alt: "Sesja 7" },
      { img: "portfolio/065A1775.jpg", alt: "Sesja 8" },
    //   { img: "portfolio/065A1909.jpg", alt: "Sesja 9" },
      { img: "portfolio/065A1952.jpg", alt: "Sesja 10" },
    //   { img: "portfolio/065A2591.jpg", alt: "Sesja 11" },
      { img: "portfolio/065A3196.jpg", alt: "Sesja 12" },
    //   { img: "portfolio/065A3264.jpg", alt: "Sesja 13" },
    //   { img: "portfolio/065A3320.jpg", alt: "Sesja 14" },
      { img: "portfolio/065A3482.jpg", alt: "Sesja 15" },
      { img: "portfolio/065A4632-2.jpg", alt: "Sesja 16" },
      { img: "portfolio/065A5517.jpg", alt: "Sesja 17" },
      { img: "portfolio/065A6129-2.jpg", alt: "Sesja 18" }
    ]
  },
  opinions: {
    tag:     "Opinie",
    heading: "Opinie zadowolonych klientów",
    items: [
      {
        img:     "opinions/065A3196.jpg",
        name:    "Paulina",
        session: "Sesja wizerunkowa",
        quote:   "Bardzo długo szukałam fotografa takiego jak Wanessa. Nie boi się próbować nowych rzeczy, jest bardzo otwarta i cudownie ciepła osobowością. Wyniki przeszły moje oczekiwania. To była przyjemność, naprawdę podbiła moje serce wspaniałą pracą."
      },
      {
        img:     "opinions/065A3482.jpg",
        name:    "Katarzyna",
        session: "Sesja biznesowa",
        quote:   "Profesjonalizm na każdym kroku. Wanessa potrafiła mnie rozluźnić i sprawić, że czułam się swobodnie przed obiektywem. Zdjęcia do portfolio wyglądają fantastycznie — dostałam mnóstwo komplementów od klientów i współpracowników."
      },
      {
        img:     "opinions/065A4632-2.jpg",
        name:    "Marta & Tomasz",
        session: "Sesja rodzinna",
        quote:   "Każde zdjęcie opowiada historię — pełne emocji, naturalności i piękna. Wanessa doskonale wyczuwa chwilę i potrafi uchwycić to, co najważniejsze. To wspomnienia, do których będziemy wracać przez całe życie."
      }
    ]
  },
  contact: {
    tag:      "Kontakt",
    heading:  "Każda sesja zaczyna się od rozmowy i kawy.",
    sub:      "Napisz do mnie i razem stworzymy coś pięknego.",
    location: { label: "Gdzie mnie znajdziesz?", value: "Szczecin" },
    phone:    { label: "Numer kontaktowy",        value: "880 150 066" },
    email:    { label: "Adres email",             value: "wanessa.kistela1@gmail.com" },
    insta:    { label: "Instagram",               handle: "wanessa.kistela", href: "https://instagram.com/wanessa.kistela" }
  },
  footer: "© 2026 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

/* ── HERO CAROUSEL ── */
const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');
C.hero.slides.forEach((s,i) => {
  track.innerHTML += `<div class="carousel-slide"><img src="${s.img}" alt="${s.alt}" style="object-position:${s.objectPosition||'center center'}"><div class="slide-overlay"></div></div>`;
  dotsEl.innerHTML += `<div class="dot${i===0?' active':''}" data-i="${i}"></div>`;
});
document.getElementById('hHero').innerHTML = C.hero.heading;
document.getElementById('hSub').innerHTML  = C.hero.subheading;
document.getElementById('hCta').textContent  = C.hero.ctaLabel;

let cur=0;
const n=C.hero.slides.length;
const allDots=document.querySelectorAll('.dot');
function goTo(x){
  cur=(x+n)%n;
  track.style.transform=`translateX(-${cur*100}%)`;
  allDots.forEach((d,i)=>d.classList.toggle('active',i===cur));
}
document.getElementById('prev').onclick=()=>goTo(cur-1);
document.getElementById('next').onclick=()=>goTo(cur+1);
allDots.forEach(d=>d.addEventListener('click',()=>goTo(+d.dataset.i)));
setInterval(()=>goTo(cur+1),3000);

/* ── ABOUT ── */
document.getElementById('aTag').textContent=C.about.tag;
document.getElementById('aHead').textContent=C.about.heading;
document.getElementById('aSig').textContent=C.about.name;
const pa=document.getElementById('aPara');
C.about.paragraphs.forEach(t=>pa.innerHTML+=`<p>${t}</p>`);

/* ── PORTFOLIO ── */
document.getElementById('pTag').textContent=C.portfolio.tag;
document.getElementById('pHead').textContent=C.portfolio.heading;
document.getElementById('pSub').textContent=C.portfolio.sub;
const pg=document.getElementById('pGrid');
C.portfolio.photos.forEach((p,i)=>{
  const d=['','delay-1','delay-2'][i%3];
  pg.innerHTML+=`<div class="p-item reveal ${d}"><img src="${p.img}" alt="${p.alt}"><div class="p-overlay"></div></div>`;
});

/* ── OPINIONS ── */
document.getElementById('opTag').textContent=C.opinions.tag;
document.getElementById('opHead').textContent=C.opinions.heading;
const opTrack=document.getElementById('opTrack');
const opDotsEl=document.getElementById('opDots');
C.opinions.items.forEach((o,i)=>{
  opTrack.innerHTML+=`<div class="opinion-slide">
    <div class="opinion-photo"><img src="${o.img}" alt="${o.name}"></div>
    <div class="opinion-body">
      <p class="opinion-name">${o.name}</p>
      <p class="opinion-session">${o.session}</p>
      <p class="opinion-quote">${o.quote}</p>
    </div>
  </div>`;
  opDotsEl.innerHTML+=`<button class="op-dot${i===0?' active':''}" data-i="${i}"></button>`;
});
let opCur=0;
const opN=C.opinions.items.length;
const opDotBtns=document.querySelectorAll('.op-dot');
function opGoTo(x){
  opCur=(x+opN)%opN;
  opTrack.style.transform=`translateX(-${opCur*100}%)`;
  opDotBtns.forEach((d,i)=>d.classList.toggle('active',i===opCur));
}
document.getElementById('opPrev').onclick=()=>opGoTo(opCur-1);
document.getElementById('opNext').onclick=()=>opGoTo(opCur+1);
opDotBtns.forEach(d=>d.addEventListener('click',()=>opGoTo(+d.dataset.i)));

/* ── CONTACT ── */
document.getElementById('cTag').textContent=C.contact.tag;
document.getElementById('cHead').textContent=C.contact.heading;
document.getElementById('cSub').textContent=C.contact.sub;
document.getElementById('cDet').innerHTML=`
  <div class="c-item">
    <div class="c-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
      </svg>
    </div>
    <div class="c-item-text">
      <p class="c-label">${C.contact.location.label}</p>
      <p class="c-value">${C.contact.location.value}</p>
    </div>
  </div>
  <div class="c-item">
    <div class="c-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    </div>
    <div class="c-item-text">
      <p class="c-label">${C.contact.phone.label}</p>
      <p class="c-value">${C.contact.phone.value}</p>
    </div>
  </div>
  <div class="c-item">
    <div class="c-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    </div>
    <div class="c-item-text">
      <p class="c-label">${C.contact.email.label}</p>
      <a class="c-value" href="mailto:${C.contact.email.value}">${C.contact.email.value}</a>
    </div>
  </div>
  <div class="c-item">
    <div class="c-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    </div>
    <div class="c-item-text">
      <p class="c-label">${C.contact.insta.label}</p>
      <a class="c-value" href="${C.contact.insta.href}" target="_blank">${C.contact.insta.handle}</a>
    </div>
  </div>`;

/* ── FOOTER ── */
document.getElementById('foot').innerHTML=`<a href="regulamin.html">${C.footer}</a>`;

/* ── MOBILE NAV ── */
const mobileNav = document.getElementById('mobile-nav');
document.getElementById('nav-burger').onclick = () => mobileNav.classList.add('open');
document.getElementById('mobile-nav-close').onclick = () => mobileNav.classList.remove('open');
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ── NAV SHADOW ON SCROLL ── */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.boxShadow=
    window.scrollY>20?'0 2px 24px rgba(74,30,107,.09)':'none';
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('v');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
