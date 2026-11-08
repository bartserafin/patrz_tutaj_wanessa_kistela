const CONTENT = {
  tag:     "Portfolio — Video",
  heading: "Chwile, które zostają na zawsze",
  sub:     "Filmy z moich sesji i kulis — prosto z moich social mediów.",
  back:    "← Wróć do Portfolio",
  socials: [
    { label: "YouTube",  handle: "@wanessa7714",     href: "https://youtube.com/@wanessa7714?si=_mjtmiZ2K6JQTGPv" },
    { label: "TikTok",   handle: "@wanessa.kistela", href: "https://www.tiktok.com/@wanessa.kistela?_r=1&_t=ZN-99RhrrdCKEo" },
    { label: "Facebook", handle: "Wanessa Kistela",  href: "https://www.facebook.com/share/1F47gd4sz9/?mibextid=wwXIfr" }
  ],
  // Lista filmów jest w pliku contents/portfolio/video/videos.json — edytuj tam, nie tutaj.
  // Wklej link do konkretnego filmu (nie do profilu), platforma rozpoznawana jest automatycznie:
  //   YouTube:  https://www.youtube.com/watch?v=ID · https://youtu.be/ID · https://www.youtube.com/shorts/ID
  //   TikTok:   https://www.tiktok.com/@wanessa.kistela/video/ID
  //   Facebook: https://www.facebook.com/.../videos/ID · https://www.facebook.com/reel/ID
  videos: "contents/portfolio/video/videos.json",
  empty:  "Filmy pojawią się tu już wkrótce. Tymczasem zajrzyj na moje profile!",
  logo:   "contents/logo/manifest.json",
  footer: "© 2026 Wanessa Kistela — wszelkie prawa zastrzeżone"
};

const C = CONTENT;

/* ── LOGO ── */
fetch(C.logo)
  .then(r => r.json())
  .then(data => { if (data.photos.length) document.querySelector('nav .logo img').src = data.photos[0]; })
  .catch(() => {});

/* ── HEADER ── */
document.getElementById('pBack').textContent = C.back;
document.getElementById('pTag').textContent  = C.tag;
document.getElementById('pHead').textContent = C.heading;
document.getElementById('pSub').textContent  = C.sub;
document.getElementById('foot').innerHTML    = `<a href="regulamin.html">${C.footer}</a>`;

/* ── SOCIAL LINKS ── */
const ICONS = {
  YouTube:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4" ry="4"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>',
  TikTok:   '<svg viewBox="0 0 24 24"><path d="M16.5 3c.4 1.9 1.6 3.3 3.5 3.7v2.9c-1.3 0-2.5-.4-3.5-1.1v6.4c0 3-2.4 5.4-5.4 5.4S5.7 17.9 5.7 14.9c0-3 2.4-5.4 5.4-5.4.3 0 .6 0 .9.1v2.9c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.6 2.5 2.6 2.6-1.1 2.6-2.6V3h3.8z" fill="currentColor"/></svg>',
  Facebook: '<svg viewBox="0 0 24 24"><path d="M15 8h2V5h-2c-2.21 0-4 1.79-4 4v2H9v3h2v7h3v-7h2.5l.5-3H14v-2c0-.55.45-1 1-1z" fill="currentColor"/></svg>'
};
document.getElementById('socials').innerHTML = C.socials.map(s => `
  <a class="social-btn" href="${s.href}" target="_blank" rel="noopener">
    ${ICONS[s.label] || ''}
    <span><b>${s.label}</b>${s.handle}</span>
  </a>`).join('');

/* ── VIDEO GRID ── */
// Zamienia link do filmu na adres do osadzenia w <iframe>; vertical = format pionowy (9:16).
function toEmbed(url) {
  let m;
  if ((m = url.match(/youtube\.com\/shorts\/([\w-]+)/)))
    return { src: `https://www.youtube-nocookie.com/embed/${m[1]}`, vertical: true };
  if ((m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)))
    return { src: `https://www.youtube-nocookie.com/embed/${m[1]}`, vertical: false };
  if ((m = url.match(/tiktok\.com\/.*\/video\/(\d+)/)))
    return { src: `https://www.tiktok.com/player/v1/${m[1]}?controls=1&progress_bar=1&play_button=1&volume_control=1&fullscreen_button=1&description=0&music_info=0&rel=0&native_context_menu=0`, vertical: true };
  if (/facebook\.com|fb\.watch/.test(url))
    return { src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`, vertical: /\/reel\//.test(url) };
  return null;
}

const grid = document.getElementById('grid');
function renderVideos(videos) {
  const embeds = videos.map(v => ({ ...v, embed: toEmbed(v.url || '') })).filter(v => v.embed);
  if (!embeds.length) {
    grid.innerHTML = `<p class="video-empty reveal">${C.empty}</p>`;
  }
  embeds.forEach((v, i) => {
    const d = ['', 'delay-1', 'delay-2'][i % 3];
    grid.innerHTML += `
      <figure class="video-tile reveal ${d}${v.embed.vertical ? ' vertical' : ''}">
        <div class="video-frame">
          <iframe src="${v.embed.src}" title="${v.title || 'Film'}" loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>
        ${v.title ? `<figcaption>${v.title}</figcaption>` : ''}
      </figure>`;
  });
  grid.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}
fetch(C.videos)
  .then(r => r.json())
  .then(data => renderVideos(data.videos || []))
  .catch(err => {
    // Najczęstsza przyczyna: błąd składni w videos.json (np. przecinek po ostatnim filmie).
    console.error(`Nie udało się wczytać ${C.videos}:`, err);
    renderVideos([]);
  });

/* ── MOBILE NAV ── */
const mobileNav = document.getElementById('mobile-nav');
document.getElementById('nav-burger').onclick = () => mobileNav.classList.add('open');
document.getElementById('mobile-nav-close').onclick = () => mobileNav.classList.remove('open');
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ── NAV SHADOW ── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.boxShadow =
    window.scrollY > 20 ? '0 2px 24px rgba(74,30,107,.09)' : 'none';
});

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting);
  visible.forEach((e, i) => {
    e.target.style.transitionDelay = `${i * 0.07}s`;
    e.target.classList.add('v');
    ro.unobserve(e.target);
  });
}, { threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
