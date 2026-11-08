const CONTENT = {
  hero: {
    // Slajdy = wszystkie zdjęcia z contents/carousel/ (kolejność wg nazwy pliku — prefiks 01-, 02-, …).
    slides:   "contents/carousel/manifest.json",
    slideAlt: "Sesja zdjęciowa",
    // Opcjonalne kadrowanie pojedynczych slajdów, po nazwie pliku (po zmianie nazwy popraw też tutaj).
    slideOptions: {
      "04-065A1909.jpg": { objectPosition: "center 25%" }
    },
    heading:    "Fotograf Szczecin",
    subheading: "Szukasz doświadczonego fotografa na terenie Szczecina i okolic?<br><b>Świetnie trafiłaś!</b>",
    ctaLabel:   "Zapytaj o sesję"
  },
  about: {
    tag:      "O mnie",
    heading:  "Wanessa Kistela",
    paragraphs: [
      "Cześć, mam na imię <b>Wanessa</b> i jestem profesjonalnym fotografem. Specjalizuję się w fotografii <b>rodzinnej i wizerunkowej</b>. Realizuję zlecenia w Szczecinie, województwie zachodniopomorskim i na terenie całej Polski.",
      "Jeśli na myśl o stanięciu przed obiektywem czujesz lekki stres - mam dla Ciebie dobrą wiadomość: <b>ze mną nie musisz umieć pozować</b>.",
      "Najbardziej cenię sobie luźną, <b>swobodną atmosferę</b>. Moje sesje przypominają bardziej spotkanie z koleżanką niż sztywny plan zdjęciowy. Dbam o to, aby od pierwszych minut zeszło z Ciebie całe napięcie. Bez wymuszonych uśmiechów, bez sztucznych póz i bez presji czasu.",
    ],
    // name: "Wanessa Kistela"
    photoAlt: "Wanessa Kistela — fotograf"
  },
  // Zdjęcie w sekcjach „O mnie” i „Kontakt” — pierwsze (alfabetycznie) zdjęcie z contents/photo_of_me/.
  // Po podmianie/zmianie nazwy pliku uruchom `node scripts/generate-photo-manifests.js`.
  photoOfMe: "contents/photo_of_me/manifest.json",
  portfolio: {
    tag:      "Portfolio",
    heading:  "Chwile, które zostają na zawsze",
    sub:      "Każda sesja to osobna historia. Oto kilka z nich.",
    // Wszystkie zdjęcia z contents/landing-portfolio/ (bez podfolderów — schowaj zbędne do _ukryte/).
    photos:   "contents/landing-portfolio/manifest.json",
    photoAlt: "Sesja"
  },
  opinions: {
    tag:     "Opinie",
    heading: "Opinie zadowolonych klientów",
    // Zdjęcia z contents/opinions/ przypisywane po kolei (wg nazwy pliku): 1. zdjęcie → 1. opinia itd.
    photos:  "contents/opinions/manifest.json",
    items: [
      {
        name:    "Paulina",
        session: "Sesja wizerunkowa",
        quote:   "Bardzo długo szukałam fotografa takiego jak Wanessa. Nie boi się próbować nowych rzeczy, jest bardzo otwarta i cudownie ciepła osobowością. Wyniki przeszły moje oczekiwania. To była przyjemność, naprawdę podbiła moje serce wspaniałą pracą."
      },
      {
        name:    "Katarzyna",
        session: "Sesja biznesowa",
        quote:   "Profesjonalizm na każdym kroku. Wanessa potrafiła mnie rozluźnić i sprawić, że czułam się swobodnie przed obiektywem. Zdjęcia do portfolio wyglądają fantastycznie — dostałam mnóstwo komplementów od klientów i współpracowników."
      },
      {
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
    photoAlt: "Wanessa Kistela",
    location: { label: "Gdzie mnie znajdziesz?", value: "Szczecin" },
    phone:    { label: "Numer kontaktowy",        value: "880 150 066" },
    email:    { label: "Adres email",             value: "wanessa.kistela1@gmail.com" },
    insta:    { label: "Instagram",               handle: "wanessa.kistela", href: "https://instagram.com/wanessa.kistela" },
    fb:       { label: "Facebook",                handle: "Wanessa Kistela", href: "https://www.facebook.com/share/1F47gd4sz9/?mibextid=wwXIfr" },
    tiktok:   { label: "TikTok",                  handle: "@wanessa.kistela", href: "https://www.tiktok.com/@wanessa.kistela?_r=1&_t=ZN-99RhrrdCKEo" },
    youtube:  { label: "YouTube",                 handle: "@wanessa7714",     href: "https://youtube.com/@wanessa7714?si=_mjtmiZ2K6JQTGPv" }
  },
  logo:   "contents/logo/manifest.json",
  footer: "© 2026 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

// Lista zdjęć z manifest.json folderu (generuje go scripts/generate-photo-manifests.js).
const loadPhotos=url=>fetch(url).then(r=>r.json()).then(d=>d.photos).catch(()=>[]);

/* ── LOGO ── */
loadPhotos(C.logo).then(p=>{ if(p.length) document.querySelector('nav .logo img').src=p[0]; });

/* ── HERO CAROUSEL ── */
const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');
document.getElementById('hHero').innerHTML = C.hero.heading;
document.getElementById('hSub').innerHTML  = C.hero.subheading;
document.getElementById('hCta').textContent  = C.hero.ctaLabel;

let cur=0, n=0, allDots=[];
function goTo(x){
  if(!n) return;
  cur=(x+n)%n;
  track.style.transform=`translateX(-${cur*100}%)`;
  allDots.forEach((d,i)=>d.classList.toggle('active',i===cur));
}
document.getElementById('prev').onclick=()=>goTo(cur-1);
document.getElementById('next').onclick=()=>goTo(cur+1);
setInterval(()=>goTo(cur+1),3000);
loadPhotos(C.hero.slides).then(photos=>{
  photos.forEach((src,i)=>{
    const opt=C.hero.slideOptions[src.split('/').pop()]||{};
    track.innerHTML += `<div class="carousel-slide"><img src="${src}" alt="${C.hero.slideAlt} ${i+1}" style="object-position:${opt.objectPosition||'center center'}"><div class="slide-overlay"></div></div>`;
    dotsEl.innerHTML += `<div class="dot${i===0?' active':''}" data-i="${i}"></div>`;
  });
  n=photos.length;
  allDots=document.querySelectorAll('.dot');
  allDots.forEach(d=>d.addEventListener('click',()=>goTo(+d.dataset.i)));
});

/* ── ABOUT ── */
document.getElementById('aTag').textContent=C.about.tag;
document.getElementById('aHead').textContent=C.about.heading;
document.getElementById('aSig').textContent=C.about.name;
const pa=document.getElementById('aPara');
C.about.paragraphs.forEach(t=>pa.innerHTML+=`<p>${t}</p>`);

/* ── PHOTO OF ME (about + contact) ── */
document.getElementById('aImg').alt=C.about.photoAlt;
document.getElementById('cImg').alt=C.contact.photoAlt;
loadPhotos(C.photoOfMe).then(p=>{
  if(p.length) document.querySelectorAll('.photo-of-me').forEach(img=>img.src=p[0]);
});

/* ── PORTFOLIO ── */
document.getElementById('pTag').textContent=C.portfolio.tag;
document.getElementById('pHead').textContent=C.portfolio.heading;
document.getElementById('pSub').textContent=C.portfolio.sub;
const pg=document.getElementById('pGrid');
loadPhotos(C.portfolio.photos).then(photos=>{
  photos.forEach((src,i)=>{
    const d=['','delay-1','delay-2'][i%3];
    pg.innerHTML+=`<div class="p-item reveal ${d}"><img src="${src}" alt="${C.portfolio.photoAlt} ${i+1}"><div class="p-overlay"></div></div>`;
  });
  pg.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
});

/* ── OPINIONS ── */
document.getElementById('opTag').textContent=C.opinions.tag;
document.getElementById('opHead').textContent=C.opinions.heading;
const opTrack=document.getElementById('opTrack');
const opDotsEl=document.getElementById('opDots');
C.opinions.items.forEach((o,i)=>{
  opTrack.innerHTML+=`<div class="opinion-slide">
    <div class="opinion-photo"><img alt="${o.name}"></div>
    <div class="opinion-body">
      <p class="opinion-name">${o.name}</p>
      <p class="opinion-session">${o.session}</p>
      <p class="opinion-quote">${o.quote}</p>
    </div>
  </div>`;
  opDotsEl.innerHTML+=`<button class="op-dot${i===0?' active':''}" data-i="${i}"></button>`;
});
loadPhotos(C.opinions.photos).then(photos=>{
  opTrack.querySelectorAll('.opinion-photo img').forEach((img,i)=>{ if(photos[i]) img.src=photos[i]; });
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
  </div>
  <div class="c-item">
    <div class="c-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 8h2V5h-2c-2.21 0-4 1.79-4 4v2H9v3h2v7h3v-7h2.5l.5-3H14v-2c0-.55.45-1 1-1z" fill="currentColor" stroke="none"/>
      </svg>
    </div>
    <div class="c-item-text">
      <p class="c-label">${C.contact.fb.label}</p>
      <a class="c-value" href="${C.contact.fb.href}" target="_blank">${C.contact.fb.handle}</a>
    </div>
  </div>
  <div class="c-item">
    <div class="c-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16.5 3c.4 1.9 1.6 3.3 3.5 3.7v2.9c-1.3 0-2.5-.4-3.5-1.1v6.4c0 3-2.4 5.4-5.4 5.4S5.7 17.9 5.7 14.9c0-3 2.4-5.4 5.4-5.4.3 0 .6 0 .9.1v2.9c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.6 2.5 2.6 2.6-1.1 2.6-2.6V3h3.8z" fill="currentColor" stroke="none"/>
      </svg>
    </div>
    <div class="c-item-text">
      <p class="c-label">${C.contact.tiktok.label}</p>
      <a class="c-value" href="${C.contact.tiktok.href}" target="_blank">${C.contact.tiktok.handle}</a>
    </div>
  </div>
  <div class="c-item">
    <div class="c-icon-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="4" ry="4"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/>
      </svg>
    </div>
    <div class="c-item-text">
      <p class="c-label">${C.contact.youtube.label}</p>
      <a class="c-value" href="${C.contact.youtube.href}" target="_blank">${C.contact.youtube.handle}</a>
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
