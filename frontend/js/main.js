const API_BASE = ""; // e.g. "http://localhost:3000/api/" once the backend is ready
const R = document.body.dataset.root || "";
const PAGE = document.body.dataset.page;
const NAV = [["Home","index.html","home"],["Classmates","pages/students.html","students"],["Events","pages/events.html","events"],["Awards","pages/awards.html","awards"],["Memories","pages/memories.html","memories"],["Contact","pages/contact.html","contact"]];

document.getElementById("site-header").innerHTML = `<header><div class="wrap">
 <a class="logo" href="${R}index.html"><img src="${R}images/istech-icon.png" alt="" width="40" height="40"><span>IS<b>Tech '29</b></span></a>
 <nav id="nav">${NAV.map(n=>`<a href="${R}${n[1]}" class="${n[2]===PAGE?"on":""}">${n[0]}</a>`).join("")}</nav>
 <div class="tools"><button class="circ" id="theme" aria-label="Toggle theme">☀</button>
 <button class="circ burger" id="burger" aria-label="Menu">☰</button></div></div></header>`;
document.getElementById("site-footer").innerHTML = `<footer><div class="wrap"><span><b>ISTech '29</b> · IST Batch 2025–2029 · Our Students. Our Achievements. Our Events. Our Memories.</span><span>Aklan State University</span></div></footer>`;

/* theme */
const root = document.documentElement;
root.dataset.theme = localStorage.getItem("ist-theme") || "dark";
const tb = document.getElementById("theme");
const setIcon = () => tb.textContent = root.dataset.theme === "dark" ? "☀" : "🌙";
setIcon();
tb.onclick = () => { root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"; localStorage.setItem("ist-theme", root.dataset.theme); setIcon(); };
document.getElementById("burger").onclick = () => document.getElementById("nav").classList.toggle("open");

/* data: uses backend if API_BASE is set, otherwise sample data */
async function load(key){
  if (API_BASE) { try { const r = await fetch(API_BASE + key); if (r.ok) return r.json(); } catch(e){} }
  return DATA[key];
}

/* helpers */
const hue = i => 205 + (i * 23) % 60;
const grad = i => `background-image:linear-gradient(135deg,hsl(${hue(i)} 60% 34%),hsl(${hue(i)+25} 65% 17%))`;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const initials = n => n.split(/\s+/).map(w => w[0]).slice(0,2).join("").toUpperCase();
const face = it => it.emoji || initials(it.name || it.title);
const cover = it => { const f = it.photo || (it.photos && it.photos[0]); return typeof f === "string" ? f : (f && f.src) || ""; };
/* image paths in data.js are written from the site root; pages/ files need "../" in front */
const U = u => /^([a-z]+:)?\/\/|^data:|^\//i.test(u) ? u : R + u;
const layer = (url, cls = "ph on") => url ? `<i class="${cls}" style="background-image:url(&quot;${esc(U(url))}&quot;)"></i>` : "";
const ageOf = s => { if (!s.birthday || /^\d{2}-\d{2}$/.test(s.birthday)) return s.age || "—";
  const b = new Date(s.birthday), n = new Date(); let a = n.getFullYear() - b.getFullYear();
  const m = n.getMonth() - b.getMonth(); if (m < 0 || (m === 0 && n.getDate() < b.getDate())) a--; return a; };
const fmtDate = d => !d ? "—" : /^\d{2}-\d{2}$/.test(d) ? new Date("2000-" + d + "T00:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric"}) : new Date(d + "T00:00:00").toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
const isPerson = k => k === "students" || k === "officers";
const titles = it => [it.position, it.role].filter(Boolean).join(" · ");
const info = it => [ageOf(it) === "—" ? "" : `Age ${ageOf(it)}`, it.nickname ? `“${it.nickname}”` : it.location || ""].filter(Boolean).join(" · ");
/* people: position/role on the first line, age + nickname on the second (same card for officers and classmates) */
const sub = (it, kind) => isPerson(kind) ? [titles(it), info(it)].filter(Boolean).map(esc).join("<br>") : esc(`${it.date || ""}${it.desc ? " · " + it.desc : ""}`);
/* people keep the same colour on every page (so one person = one namecard) */
const gi = (it, i) => typeof it.num === "number" ? it.num : i;

/* clickable cards */
const card = kind => (it, i) => `<button type="button" class="card${isPerson(kind) ? " sq" : ""}" data-i="${i}"><div class="img" style="${grad(isPerson(kind) ? gi(it, i) : i)}"><span>${esc(face(it))}</span>${layer(cover(it))}</div><div class="body"><h3>${esc(it.name || it.title)}</h3><small>${sub(it, kind)}</small>${it.type ? `<span class="tag">${esc(it.type)}</span>` : ""}</div></button>`;

const dlg = document.createElement("dialog");
document.body.append(dlg);
dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
new MutationObserver(() => { document.documentElement.style.overflow = dlg.open ? "hidden" : ""; }).observe(dlg, {attributes: true, attributeFilter: ["open"]});
const closeBtn = () => `<button class="circ m-close" type="button" aria-label="Close">✕</button>`;
const wireClose = () => { dlg.querySelector(".m-close").onclick = () => dlg.close(); };

/* classmate -> landscape ID card */
function openID(it, i){
  dlg.className = "id"; dlg.onkeydown = null;
  const hobbies = Array.isArray(it.hobbies) ? it.hobbies : String(it.hobbies || "").split(",").map(h => h.trim()).filter(Boolean);
  dlg.innerHTML = `${closeBtn()}
   <div class="id-top"><img src="${R}images/istech-icon.png" alt="" width="40" height="40"><div><b>ISTech '29</b><small>IST Batch 2025–2029 · Aklan State University</small></div></div>
   <div class="id-main">
    <div class="id-photo" style="${grad(gi(it, i))}"><span>${esc(face(it))}</span>${layer(it.photo)}</div>
    <div class="id-info"><h2>${esc(it.name)}</h2><p class="id-role">${[it.position ? esc(it.position) + " · IST Batch Officer" : "", it.role ? esc(it.role) : ""].filter(Boolean).join(" · ") || "Classmate · Instructional Systems Technology"}</p>
     <dl class="m">${[["Nickname", it.nickname], ["Age", ageOf(it)], ["Birthday", fmtDate(it.birthday)], ["Location", it.location]].filter(r => r[1]).map(r => `<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl></div>
   </div>
   <div class="id-more">
    <div><h4>Motto</h4><p class="id-motto">${it.motto ? "“" + esc(it.motto) + "”" : "—"}</p></div>
    <div><h4>Hobbies</h4><div class="hobbies">${hobbies.length ? hobbies.map(h => `<span class="hb">${esc(h)}</span>`).join("") : "—"}</div></div>
   </div>`;
  wireClose(); dlg.showModal();
}

/* event / award / memory -> photo book (each photo can have its own title + description and a download button) */
const norm = p => typeof p === "string" ? {src: p} : (p || {});
const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function openBook(it, i){
  const raw = it.photos && it.photos.length ? it.photos : (it.photo ? [it.photo] : []);
  const pics = raw.map(norm), n = Math.max(pics.length, 1); let k = 0, ratio = "16 / 10";
  dlg.className = "book";
  dlg.innerHTML = `${closeBtn()}
   <div class="bk-stage"><span class="bk-ph">${esc(face(it))}</span><i class="ph bk-img"></i>
    <button type="button" class="bk-nav prev" aria-label="Previous photo">‹</button>
    <button type="button" class="bk-nav next" aria-label="Next photo">›</button>
    <span class="bk-count"></span></div>
   <div class="bk-cap"><div class="bk-txt"><h3></h3><p></p></div>
    <a class="dl" href="#" download hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14"/></svg>Download</a></div>
   <div class="bk-thumbs">${Array.from({length:n},(_, j) => `<button type="button" class="bk-t" data-j="${j}" aria-label="Photo ${j+1}" style="${grad(i + j)}">${layer((pics[j] || {}).src)}</button>`).join("")}</div>
   <div class="m-body"><h2>${esc(it.title)}</h2>${it.desc ? `<p class="m-desc">${esc(it.desc)}</p>` : ""}
   <dl class="m"><dt>Date</dt><dd>${esc(it.date || "—")}</dd><dt>Type</dt><dd>${esc(it.type || "—")}</dd><dt>Photos</dt><dd>${pics.length || 0}</dd></dl></div>`;
  const stage = dlg.querySelector(".bk-stage"), img = dlg.querySelector(".bk-img"), count = dlg.querySelector(".bk-count"),
        thumbs = [...dlg.querySelectorAll(".bk-t")], capT = dlg.querySelector(".bk-txt h3"), capP = dlg.querySelector(".bk-txt p"), dl = dlg.querySelector(".dl");
  const go = j => { k = (j + n) % n; const pic = pics[k] || {};
    stage.style.cssText = `${grad(i + k)};aspect-ratio:${ratio}`;
    img.classList.remove("on"); img.style.backgroundImage = pic.src ? `url("${U(pic.src)}")` : "none"; void img.offsetWidth; img.classList.add("on");
    count.textContent = `${k + 1} / ${n}`;
    thumbs.forEach((t, x) => t.classList.toggle("on", x === k));
    thumbs[k].scrollIntoView({block:"nearest", inline:"center"});
    capT.textContent = pic.title || it.title; capP.textContent = pic.desc || ""; capP.hidden = !pic.desc;
    dl.hidden = true;
    if (pic.src) { const ext = (pic.src.match(/\.\w{2,4}$/) || [".jpg"])[0], mine = k, t = new Image();
      dl.href = U(pic.src); dl.download = `${slug(pic.title || it.title)}-${k + 1}${ext}`;
      t.onload = () => { if (mine !== k) return; dl.hidden = false;
        ratio = `${t.naturalWidth} / ${t.naturalHeight}`; stage.style.aspectRatio = ratio; }; t.src = U(pic.src); } };
  /* same-site files download directly; files on another site (e.g. Supabase) are fetched first so they still download */
  dl.onclick = async e => { const u = new URL(dl.href, location.href);
    if (u.protocol === "file:" || u.origin === location.origin) return;
    e.preventDefault();
    try { const b = await (await fetch(u)).blob(), a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = dl.download; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 3000); }
    catch (_) { window.open(u, "_blank", "noopener"); } };
  dlg.querySelector(".prev").onclick = () => go(k - 1);
  dlg.querySelector(".next").onclick = () => go(k + 1);
  thumbs.forEach(t => t.onclick = () => go(+t.dataset.j));
  if (n < 2) dlg.querySelectorAll(".bk-nav").forEach(b => b.hidden = true);
  dlg.onkeydown = e => { if (e.key === "ArrowLeft") go(k - 1); if (e.key === "ArrowRight") go(k + 1); };
  wireClose(); dlg.showModal(); go(0);
}

function draw(id, items, kind, wide){
  const el = document.getElementById(id); if (!el) return;
  el.className = "row" + (wide ? " wide" : "");
  el.innerHTML = items.length ? items.map(card(kind)).join("") : `<p class="empty">Nothing found.</p>`;
  el.onclick = e => { const b = e.target.closest("button.card"); if (!b) return; const it = items[+b.dataset.i], i = +b.dataset.i;
    isPerson(kind) ? openID(it, i) : openBook(it, i); };
}

/* hero: a deck of class photos that shuffles like playing cards (top card flicks out and slides to the back) */
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const preload = urls => Promise.all(urls.map(u => new Promise(r => { const im = new Image(); im.onload = () => r(u); im.onerror = () => r(null); im.src = u; }))).then(a => a.filter(Boolean));
const SHUFFLE_MS = 1000;   // one shuffle every 1 second (change this number to speed up or slow down)
async function startHero(){
  const fan = document.getElementById("fan");
  fan.style.setProperty("--shuf", Math.round(SHUFFLE_MS * 0.7) + "ms");
  const photos = shuffle(await load("photos"));   // different order on every visit
  const K = Math.min(Math.max(photos.length, 3), 8);
  fan.innerHTML = Array.from({length: K}, (_, i) => `<div class="pc" data-p="${i}" style="${grad(i)}"><span>🎓</span></div>`).join("");
  /* cards show right away; photos fade in as they finish loading (missing files are skipped) */
  preload(photos).then(ok => { if (ok.length) [...fan.children].forEach((el, i) => el.insertAdjacentHTML("beforeend", layer(ok[i % ok.length]))); });
  fan.tabIndex = 0; fan.setAttribute("role", "button"); fan.setAttribute("aria-label", "Shuffle class photos");
  const order = [...fan.children]; let busy = false;
  const shuffleOnce = () => { if (busy) return; busy = true;
    const top = order[0]; top.classList.add("fly");
    order.forEach((el, i) => { if (i) el.dataset.p = i - 1; });
    setTimeout(() => { top.classList.remove("fly"); top.dataset.p = K - 1; order.push(order.shift()); busy = false; }, Math.round(SHUFFLE_MS * 0.7)); };
  fan.addEventListener("click", shuffleOnce);
  fan.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); shuffleOnce(); } });
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!calm) {
    /* cards lean toward the mouse only while it is over the pictures */
    const set = (x, y) => { fan.style.setProperty("--mx", x); fan.style.setProperty("--my", y); };
    fan.addEventListener("mousemove", e => {
      if (!e.target.closest(".pc")) return set(0, 0);
      const r = fan.getBoundingClientRect(), cl = v => Math.max(-1, Math.min(1, v));
      set(cl((e.clientX - (r.left + r.width / 2)) / (r.width * 0.5)), cl((e.clientY - (r.top + r.height / 2)) / (r.height * 0.5)));
    });
    fan.addEventListener("mouseleave", () => set(0, 0));
    setInterval(() => { if (!document.hidden) shuffleOnce(); }, SHUFFLE_MS);
  }
}

/* newest first: by date (year or full YYYY-MM-DD); same date -> the one added later in data.js comes first */
const newest = a => a.map((x, i) => [x, i]).sort((p, q) => String(q[0].date).localeCompare(String(p[0].date)) || q[1] - p[1]).map(p => p[0]);

/* pages */
const people = (page, key, kind) => async () => {
  const all = await load(key), q = document.getElementById("q");
  const run = () => { const t = q.value.toLowerCase();
    draw("list", all.filter(s => (s.name + " " + (s.nickname || "") + " " + (s.position || "") + " " + (s.role || "") + " " + (s.location || "")).toLowerCase().includes(t)), kind); };
  q.oninput = run; run();
};
(async () => {
  if (PAGE === "home") {
    startHero();
    const [ev, aw, me, st, of] = await Promise.all(["events","awards","memories","students","officers"].map(load));
    draw("row-officers", of, "officers");
    const recent = newest([...ev, ...aw, ...me]).slice(0, 6);
    draw("row-happenings", recent, "happenings", true);
    document.getElementById("stat").textContent = st.length + " classmates";
  }
  if (PAGE === "students") people(PAGE, "students", "students")();
  if (PAGE === "officers") people(PAGE, "officers", "officers")();
  if (PAGE === "happenings") {
    const [ev, aw, me] = await Promise.all(["events","awards","memories"].map(load));
    const all = [...ev.map(x => ({...x, cat:"Events"})), ...aw.map(x => ({...x, cat:"Awards"})), ...me.map(x => ({...x, cat:"Memories"}))];
    all.splice(0, all.length, ...newest(all));
    const q = document.getElementById("q"), chips = document.getElementById("chips"); let cat = "All";
    chips.innerHTML = ["All","Events","Awards","Memories"].map(c => `<button type="button" class="chip ${c==="All"?"on":""}">${c}</button>`).join("");
    const run = () => draw("list", all.filter(i => (cat === "All" || i.cat === cat) && i.title.toLowerCase().includes(q.value.toLowerCase())), "happenings", true);
    q.oninput = run;
    chips.onclick = e => { if (!e.target.classList.contains("chip")) return; cat = e.target.textContent;
      chips.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === e.target)); run(); };
    run();
  }
  if (["events","awards","memories"].includes(PAGE)) {
    const all = newest(await load(PAGE)), q = document.getElementById("q");
    const run = () => draw("list", all.filter(i => i.title.toLowerCase().includes(q.value.toLowerCase())), PAGE, true);
    q.oninput = run; run();
  }
  if (PAGE === "contact") {
    const MAIL = "geoffreyjheanne0521@gmail.com";
    const ENDPOINT = ""; // optional: paste a Formspree/Web3Forms URL here to send straight to the inbox with no email app
    const f = document.getElementById("cform"), note = document.getElementById("cnote");
    f.onsubmit = async e => { e.preventDefault(); const d = new FormData(f);
      const subject = d.get("subject") || "ISTech '29 website";
      const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
      const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(MAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (ENDPOINT) { try { const r = await fetch(ENDPOINT, {method:"POST", headers:{Accept:"application/json"}, body:d});
        if (r.ok) { f.innerHTML = `<p class="note">Message sent. Thank you!</p>`; return; } } catch (_) {} }
      window.open(gmail, "_blank", "noopener"); note.hidden = false; };
  }
})();

/* page transitions: content fades out on link click, new page slides in (CSS handles the entrance) */
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || a.target || a.hasAttribute("download") || e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const u = new URL(a.href, location.href);
    if (u.protocol !== location.protocol || (u.protocol !== "file:" && u.origin !== location.origin)) return;
    if (u.pathname === location.pathname && u.search === location.search) return;
    e.preventDefault();
    document.body.classList.add("leaving");
    setTimeout(() => { location.href = a.href; }, 90);
  });
  window.addEventListener("pageshow", e => { if (e.persisted) document.body.classList.remove("leaving"); });
}
