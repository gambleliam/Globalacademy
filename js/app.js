/* Global Supplements Academy — single-page demo app (no build step). */
(function () {
  "use strict";

  const { brands, courses } = window.ACADEMY;
  const app = document.getElementById("app");
  const STORE_KEY = "gsa.progress.v1";

  /* ------------------------------------------------------------------ */
  /* Progress storage (browser only — swap for an API/LMS later)        */
  /* ------------------------------------------------------------------ */
  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || { courses: {}, name: "" };
    } catch (e) {
      return { courses: {}, name: "" };
    }
  }
  let state = load();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
    updateNavCount();
  }
  function modState(cid, mid) {
    return (state.courses[cid] && state.courses[cid][mid]) || {};
  }
  function setMod(cid, mid, patch) {
    state.courses[cid] = state.courses[cid] || {};
    state.courses[cid][mid] = Object.assign({}, state.courses[cid][mid], patch, { at: Date.now() });
    save();
  }
  function courseProgress(c) {
    const done = c.modules.filter((m) => modState(c.id, m.id).done).length;
    return { done, total: c.modules.length, pct: Math.round((done / c.modules.length) * 100), complete: done === c.modules.length };
  }
  function completedAt(c) {
    return Math.max(...c.modules.map((m) => modState(c.id, m.id).at || 0));
  }
  function quizScore(c) {
    const q = c.modules.find((m) => m.type === "quiz");
    return q ? modState(c.id, q.id).score : undefined;
  }

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  const byId = (id) => courses.find((c) => c.id === id);
  const brandCourses = (b) => courses.filter((c) => c.brand === b);
  const typeLabel = { video: "Video", presentation: "Presentation", quiz: "Quiz" };

  const I = {
    video: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    presentation: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></svg>',
    quiz: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><circle cx="12" cy="17.3" r=".6" fill="currentColor"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    cross: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    layers: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
    level: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="14" width="4" height="7" rx="1"/><rect x="10" y="9" width="4" height="12" rx="1"/><rect x="17" y="4" width="4" height="17" rx="1"/></svg>',
    arrowR: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowL: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    pause: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    award: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg>',
    book: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></svg>',
    bulb: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  };

  // Decorative brand art for covers
  function art(brand, cls) {
    cls = cls || "art";
    if (brand === "naf") {
      // horseshoe + stars
      return `<svg class="${cls}" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <path d="M52 42v62a48 48 0 0 0 96 0V42" stroke="#b8975a" stroke-width="24" stroke-linecap="round"/>
        <g fill="#111">${[60, 86, 112].map((y) => `<circle cx="52" cy="${y}" r="3.5"/><circle cx="148" cy="${y}" r="3.5"/>`).join("")}</g>
        <g fill="#d4b97f">${[0, 1, 2, 3, 4].map((i) => star(48 + i * 26, 182, i === 2 ? 9 : 6.5)).join("")}</g>
      </svg>`;
    }
    if (brand === "nvc") {
      return `<svg class="${cls}" viewBox="0 0 200 200" aria-hidden="true">
        <g fill="#27243e" opacity=".9">
          <ellipse cx="100" cy="128" rx="42" ry="36"/>
          <ellipse cx="50" cy="82" rx="16" ry="21" transform="rotate(-22 50 82)"/>
          <ellipse cx="82" cy="54" rx="16" ry="22" transform="rotate(-8 82 54)"/>
          <ellipse cx="120" cy="54" rx="16" ry="22" transform="rotate(8 120 54)"/>
          <ellipse cx="152" cy="82" rx="16" ry="21" transform="rotate(22 152 82)"/>
        </g></svg>`;
    }
    return `<svg class="${cls}" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g transform="rotate(-35 100 100)">
        <rect x="40" y="72" width="120" height="56" rx="28" fill="#ffffff" opacity=".95"/>
        <path d="M100 72h32a28 28 0 0 1 0 56h-32z" fill="#2563eb"/>
      </g>
      <g fill="#93c0ff"><rect x="140" y="20" width="12" height="40" rx="3"/><rect x="126" y="34" width="40" height="12" rx="3"/></g>
      <circle cx="40" cy="170" r="8" fill="#93c0ff" opacity=".6"/><circle cx="62" cy="182" r="4" fill="#93c0ff" opacity=".6"/>
    </svg>`;
  }
  function star(cx, cy, r) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = (Math.PI / 5) * i - Math.PI / 2;
      const rr = i % 2 ? r * 0.45 : r;
      pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
    }
    return `<polygon points="${pts.join(" ")}"/>`;
  }

  function toast(msg) {
    const t = document.getElementById("toast");
    t.innerHTML = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2600);
  }

  function setBrand(b) {
    document.body.dataset.brand = b || "gs";
  }
  function setNav(key) {
    document.querySelectorAll(".main-nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === key));
  }
  function updateNavCount() {
    const n = courses.filter((c) => courseProgress(c).complete).length;
    const el = document.getElementById("nav-count");
    if (el) { el.textContent = n; el.title = `${n} course(s) completed`; }
  }

  /* ------------------------------------------------------------------ */
  /* Shared UI pieces                                                    */
  /* ------------------------------------------------------------------ */
  function courseCard(c) {
    const b = brands[c.brand];
    const p = courseProgress(c);
    const alt = c.id === "nvc-golden" ? " alt" : "";
    const chipLogo = c.brand === "nvc" ? "assets/logos/nvc-logo.png" : b.logo;
    return `<a class="course-card" href="#/course/${c.id}">
      <div class="cover ${c.brand}${alt}">
        <span class="brand-chip"><img src="${chipLogo}" alt="${esc(b.fullName)}"></span>
        ${art(c.brand)}
        <span class="tag">${esc(c.level)}</span>
      </div>
      <div class="body">
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.summary)}</p>
        <div class="meta">
          <span>${I.clock} ${c.minutes} min</span>
          <span>${I.layers} ${c.modules.length} modules</span>
          <span>${esc(b.species)}</span>
        </div>
        <div class="progress"><i style="width:${p.pct}%"></i></div>
        <div class="progress-label"><span>${p.complete ? "Completed" : p.done ? "In progress" : "Not started"}</span><span>${p.pct}%</span></div>
      </div>
    </a>`;
  }

  /* ------------------------------------------------------------------ */
  /* Views                                                               */
  /* ------------------------------------------------------------------ */
  function viewHome() {
    setBrand("gs");
    setNav("home");
    const totalMods = courses.reduce((n, c) => n + c.modules.length, 0);
    const totalQs = courses.reduce((n, c) => n + c.modules.filter((m) => m.type === "quiz").reduce((k, m) => k + m.questions.length, 0), 0);
    const inProg = courses.filter((c) => { const p = courseProgress(c); return p.done && !p.complete; });
    const featured = [courses[0], courses[2], courses[4]];

    app.innerHTML = `
      <section class="hero">
        <div class="wrap">
          <div>
            <div class="eyebrow" style="color:#7fd3f7">Global Supplements Academy</div>
            <h1>Know our products. <em>Inside out.</em></h1>
            <p class="lead">Short videos, expert presentations and knowledge checks covering NAF, Natural VetCare and NutriLabs — built for retailers, veterinary teams and owners.</p>
            <div class="cta-row">
              <a class="btn" href="#/course/${inProg[0] ? inProg[0].id : courses[0].id}">${inProg[0] ? "Continue learning" : "Start learning"} ${I.arrowR}</a>
              <a class="btn secondary" href="#brands">Explore the brands</a>
            </div>
            <div class="hero-stats">
              <div><strong>3</strong>Brands</div>
              <div><strong>${courses.length}</strong>Courses</div>
              <div><strong>${totalMods}</strong>Learning modules</div>
              <div><strong>${totalQs}</strong>Quiz questions</div>
            </div>
          </div>
          <div class="hero-card" aria-hidden="true">
            ${[
              ["video", "#b8975a", "Inside the equine joint", "NAF · Video · 6:40", 72],
              ["presentation", "#4fbc84", "The Happy Tummy Toolkit", "NVC · Presentation · 5 slides", 40],
              ["quiz", "#2563eb", "Gastric protection assessment", "NutriLabs · Quiz · 5 questions", 15],
            ].map(([t, col, title, sub, pct]) => `
              <div class="mini"><div class="ic" style="background:${col};color:#fff">${I[t]}</div>
                <div style="flex:1"><b>${title}</b><span>${sub}</span><div class="bar"><i style="width:${pct}%"></i></div></div></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="block" id="brands">
        <div class="wrap">
          <div class="section-head">
            <div><div class="eyebrow">Our family of brands</div><h2>Choose a brand to start</h2></div>
            <p>Each brand has its own learning hub with courses tailored to the animals and customers it serves.</p>
          </div>
          <div class="brand-grid">
            ${Object.values(brands).map((b) => `
              <a class="brand-card ${b.id}" href="#/brand/${b.id}">
                <div class="top">
                  ${b.id === "nvc" ? '<span class="blob" style="width:110px;height:110px;background:#4fbc84;right:-50px;bottom:-60px"></span><span class="blob" style="width:54px;height:54px;background:#fec140;left:24px;top:18px"></span><span class="blob" style="width:26px;height:26px;background:#9d71af;left:28px;bottom:22px"></span>' : ""}
                  <img src="${b.logo}" alt="${esc(b.fullName)}">
                </div>
                <div class="body">
                  <div class="species">${esc(b.species)}</div>
                  <h3>${esc(b.fullName)}</h3>
                  <p>${esc(b.intro)}</p>
                  <div class="go">${brandCourses(b.id).length} courses ${I.arrowR}</div>
                </div>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <section class="block tint">
        <div class="wrap">
          <div class="section-head">
            <div><div class="eyebrow">Featured</div><h2>Popular courses</h2></div>
            <a class="btn dark small" href="#/my-learning">View my learning ${I.arrowR}</a>
          </div>
          <div class="course-grid">${featured.map(courseCard).join("")}</div>
        </div>
      </section>

      <section class="block">
        <div class="wrap">
          <div class="section-head">
            <div><div class="eyebrow">How it works</div><h2>Learn in four simple steps</h2></div>
          </div>
          <div class="steps">
            <div class="step"><div class="num">${I.video}</div><h4>Watch</h4><p>Short, focused videos introduce each topic and product.</p></div>
            <div class="step"><div class="num">${I.presentation}</div><h4>Explore</h4><p>Click through presentations at your own pace — perfect for team training.</p></div>
            <div class="step"><div class="num">${I.quiz}</div><h4>Test</h4><p>Multiple-choice quizzes with instant feedback and explanations.</p></div>
            <div class="step"><div class="num">${I.award}</div><h4>Certify</h4><p>Pass with 80% or more to unlock a printable certificate.</p></div>
          </div>
        </div>
      </section>`;
  }

  function viewBrand(bid) {
    const b = brands[bid];
    if (!b) return viewNotFound();
    setBrand(bid);
    setNav(bid);
    const list = brandCourses(bid);
    const done = list.filter((c) => courseProgress(c).complete).length;
    app.innerHTML = `
      <section class="brand-hero ${bid}">
        <div class="wrap">
          <div>
            <div class="crumbs"><a href="#/">Academy</a> / ${esc(b.fullName)}</div>
            ${bid === "naf" ? '<div class="stars">★ ★ ★ ★ ★</div>' : ""}
            <div class="eyebrow">${esc(b.species)} · ${esc(b.tagline)}</div>
            <h1>${esc(b.fullName)} Academy</h1>
            <p>${esc(b.intro)}</p>
            <p style="font-size:.95rem;margin-top:18px"><strong>${done}/${list.length}</strong> courses completed</p>
          </div>
          <div class="logo-tile"><img src="${b.logo}" alt="${esc(b.fullName)}"></div>
        </div>
      </section>
      <section class="block">
        <div class="wrap">
          <div class="section-head">
            <div><div class="eyebrow">Courses</div><h2>${esc(b.name)} learning paths</h2></div>
            <p>Visit <a href="${b.site}" target="_blank" rel="noopener">${esc(b.site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, ""))}</a> for the full product range.</p>
          </div>
          <div class="course-grid">${list.map(courseCard).join("")}</div>
        </div>
      </section>`;
  }

  function courseSidebar(c, currentMid) {
    const b = brands[c.brand];
    const p = courseProgress(c);
    return `<aside class="course-side">
      <div class="head">
        <div class="eyebrow">${esc(b.fullName)}</div>
        <h2>${esc(c.title)}</h2>
        <div class="progress"><i style="width:${p.pct}%"></i></div>
        <div class="progress-label"><span>${p.done} of ${p.total} complete</span><span>${p.pct}%</span></div>
      </div>
      <ul class="module-list">
        <li><a href="#/course/${c.id}" class="${!currentMid ? "current" : ""}">
          <span class="ic">${I.book}</span><span class="t"><span>Start here</span><b>Course overview</b></span></a></li>
        ${c.modules.map((m, i) => {
          const st = modState(c.id, m.id);
          return `<li class="${st.done ? "done" : ""}"><a href="#/course/${c.id}/${m.id}" class="${m.id === currentMid ? "current" : ""}">
            <span class="ic">${st.done ? I.check : I[m.type]}</span>
            <span class="t"><span>${i + 1}. ${typeLabel[m.type]}</span><b>${esc(m.title)}</b></span>
          </a></li>`;
        }).join("")}
      </ul>
      <div class="cert-link">${p.complete
        ? `<a class="btn small" href="#/certificate/${c.id}">${I.award} View certificate</a>`
        : `<span class="muted" style="font-size:.82rem;display:flex;gap:8px;align-items:center">${I.award} Complete all modules to earn your certificate</span>`}</div>
    </aside>`;
  }

  function moduleNav(c, idx) {
    const prev = idx > 0 ? `#/course/${c.id}/${c.modules[idx - 1].id}` : `#/course/${c.id}`;
    const next = idx < c.modules.length - 1 ? `#/course/${c.id}/${c.modules[idx + 1].id}` : null;
    return `<div class="module-nav">
      <a class="btn secondary small" href="${prev}">${I.arrowL} Previous</a>
      ${next ? `<a class="btn dark small" href="${next}">Next: ${esc(c.modules[idx + 1].title)} ${I.arrowR}</a>`
             : courseProgress(c).complete ? `<a class="btn small" href="#/certificate/${c.id}">${I.award} Get certificate</a>` : ""}
    </div>`;
  }

  function viewCourse(cid, mid) {
    const c = byId(cid);
    if (!c) return viewNotFound();
    const b = brands[c.brand];
    setBrand(c.brand);
    setNav(c.brand);

    const idx = mid ? c.modules.findIndex((m) => m.id === mid) : -1;
    if (mid && idx < 0) return viewNotFound();
    const m = c.modules[idx];

    let panel;
    if (!m) {
      const p = courseProgress(c);
      const first = c.modules.find((x) => !modState(c.id, x.id).done) || c.modules[0];
      panel = `
        <div class="crumbs"><a href="#/">Academy</a> / <a href="#/brand/${b.id}">${esc(b.fullName)}</a> / ${esc(c.title)}</div>
        <div class="eyebrow">${esc(c.level)} course</div>
        <h1>${esc(c.title)}</h1>
        <p style="font-size:1.1rem" class="muted">${esc(c.summary)}</p>
        <div class="overview-grid">
          <div><small>Duration</small><b>${c.minutes} minutes</b></div>
          <div><small>Modules</small><b>${c.modules.map((x) => typeLabel[x.type]).join(" · ")}</b></div>
          <div><small>Pass mark</small><b>${Math.round((c.modules.find((x) => x.type === "quiz") || { passMark: 0.8 }).passMark * 100)}%</b></div>
        </div>
        <div class="overview-card">
          <h3 style="text-transform:none;letter-spacing:0">Who is this for?</h3>
          <p class="muted">${esc(c.audience)}</p>
          <h3 style="text-transform:none;letter-spacing:0;margin-top:18px">What you'll cover</h3>
          <ol style="margin:0;padding-left:20px">${c.modules.map((x) => `<li style="margin-bottom:6px"><b>${typeLabel[x.type]}:</b> ${esc(x.title)}</li>`).join("")}</ol>
        </div>
        <div style="margin-top:26px">
          <a class="btn" href="#/course/${c.id}/${first.id}">${p.complete ? "Review course" : p.done ? "Continue" : "Start course"} ${I.arrowR}</a>
        </div>`;
    } else {
      panel = `
        <div class="crumbs"><a href="#/">Academy</a> / <a href="#/brand/${b.id}">${esc(b.fullName)}</a> / <a href="#/course/${c.id}">${esc(c.title)}</a></div>
        <div class="type-line"><span class="eyebrow">Module ${idx + 1} of ${c.modules.length} · ${typeLabel[m.type]}</span></div>
        <h1>${esc(m.title)}</h1>
        <div id="module-body"></div>
        ${moduleNav(c, idx)}`;
    }

    app.innerHTML = `<div class="wrap"><div class="course-layout">${courseSidebar(c, mid)}<div class="module-panel">${panel}</div></div></div>`;

    if (m) {
      const host = document.getElementById("module-body");
      if (m.type === "video") renderVideo(host, c, m, idx);
      if (m.type === "presentation") renderDeck(host, c, m, idx);
      if (m.type === "quiz") renderQuiz(host, c, m, idx);
    }
  }

  function refreshCourseChrome(c, mid, idx) {
    const side = document.querySelector(".course-side");
    if (side) side.outerHTML = courseSidebar(c, mid);
    const nav = document.querySelector(".module-nav");
    if (nav) nav.outerHTML = moduleNav(c, idx);
  }

  function markDone(c, m, idx, extra) {
    const was = modState(c.id, m.id).done;
    const wasComplete = courseProgress(c).complete;
    setMod(c.id, m.id, Object.assign({ done: true }, extra || {}));
    refreshCourseChrome(c, m.id, idx);
    if (!wasComplete && courseProgress(c).complete) {
      toast(`${I.award} Course complete — your certificate is ready!`);
    } else if (!was) {
      toast(`${I.check} ${typeLabel[m.type]} complete`);
    }
  }

  /* ---------- Video ---------- */
  function renderVideo(host, c, m, idx) {
    const done = modState(c.id, m.id).done;
    let player;
    if (m.youtubeId) {
      player = `<div class="player"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.youtubeId)}?rel=0" title="${esc(m.title)}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
    } else if (m.src) {
      player = `<div class="player"><video controls preload="metadata" src="${esc(m.src)}"></video></div>`;
    } else {
      player = `<div class="player" id="mock-player">
        <div class="poster ${c.brand}">
          ${art(c.brand)}
          <div style="position:relative">
            <button class="play" aria-label="Play video">${I.video.replace(/18/g, "34")}</button>
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.duration)} · Demo placeholder — your product video goes here</p>
          </div>
        </div>
        <span class="demo-note">Demo video</span>
      </div>`;
    }

    host.innerHTML = `
      ${player}
      <div class="keypoints">
        <div><h3 style="text-transform:none;letter-spacing:0">About this video</h3><p class="muted">${esc(m.summary)}</p>
          ${m.youtubeId || m.src ? `<button class="btn small dark" id="mark-watched" ${done ? "disabled" : ""}>${I.check} ${done ? "Watched" : "Mark as watched"}</button>` : ""}
        </div>
        <div><h3 style="text-transform:none;letter-spacing:0">Key points</h3><ul>${m.keyPoints.map((k) => `<li>${I.check}<span>${esc(k)}</span></li>`).join("")}</ul></div>
      </div>
      ${done ? `<div class="notice">${I.check} You've watched this video.</div>` : ""}`;

    const mark = document.getElementById("mark-watched");
    if (mark) mark.onclick = () => { markDone(c, m, idx); renderVideo(host, c, m, idx); };

    const mock = document.getElementById("mock-player");
    if (!mock) return;
    const [mm, ss] = m.duration.split(":").map(Number);
    const total = mm * 60 + ss;
    const SIM_MS = 7000; // simulated playback length for the demo
    const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    mock.querySelector(".play").onclick = () => {
      mock.innerHTML = `
        <div class="poster ${c.brand}">${art(c.brand)}</div>
        <div class="playing-vis"><div style="text-align:center"><div class="eq"><i></i><i></i><i></i><i></i><i></i></div><p style="margin-top:14px;color:rgba(255,255,255,.75)">Now playing: ${esc(m.title)}</p></div></div>
        <span class="demo-note">Demo playback</span>
        <div class="controls"><button aria-label="Pause" id="pp">${I.pause}</button><span id="tm">0:00</span><div class="track"><i></i></div><span>${esc(m.duration)}</span></div>`;
      const bar = mock.querySelector(".track i");
      const tm = mock.querySelector("#tm");
      const pp = mock.querySelector("#pp");
      let elapsed = 0, last = performance.now(), paused = false, raf;
      pp.onclick = () => { paused = !paused; pp.innerHTML = paused ? I.video : I.pause; mock.querySelector(".eq").style.visibility = paused ? "hidden" : ""; last = performance.now(); };
      const tick = (now) => {
        if (!document.body.contains(mock)) return cancelAnimationFrame(raf);
        if (!paused) elapsed += now - last;
        last = now;
        const f = Math.min(1, elapsed / SIM_MS);
        bar.style.width = f * 100 + "%";
        tm.textContent = fmt(f * total);
        if (f < 1) raf = requestAnimationFrame(tick);
        else { markDone(c, m, idx); renderVideo(host, c, m, idx); }
      };
      raf = requestAnimationFrame(tick);
    };
  }

  /* ---------- Presentation ---------- */
  function renderDeck(host, c, m, idx) {
    const b = brands[c.brand];
    const logo = c.brand === "nvc" ? "assets/logos/nvc-logo.png" : b.logo;
    const slides = [{ title: true, heading: m.title, body: `${b.fullName} Academy · ${c.title}` }].concat(m.slides);
    let i = 0;

    function slideHtml(s, n) {
      if (s.title) {
        return `<div class="slide title-slide">
          <span class="slide-brand"><img src="${c.brand === "nvc" ? "assets/logos/nvc-logo-white.png" : b.logo}" alt=""></span>
          <div style="position:relative;z-index:1"><div class="eyebrow" style="margin-bottom:12px">Presentation</div><h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p></div>
          <span class="slide-num">${n + 1} / ${slides.length}</span></div>`;
      }
      return `<div class="slide">
        <span class="stripe"></span>
        <span class="slide-brand"><img src="${c.brand === "naf" || c.brand === "nutrilabs" ? "assets/logos/gs-logo.png" : logo}" alt=""></span>
        <h2>${esc(s.heading)}</h2>
        ${s.body ? `<p>${esc(s.body)}</p>` : ""}
        ${s.bullets ? `<ul>${s.bullets.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${s.stat ? `<div class="stat"><b>${esc(s.stat.value)}</b><span>${esc(s.stat.label)}</span></div>` : ""}
        <span class="slide-num">${n + 1} / ${slides.length}</span></div>`;
    }

    function draw() {
      host.innerHTML = `
        <div class="deck" tabindex="0" aria-label="Presentation, use arrow keys to navigate">
          ${slideHtml(slides[i], i)}
          <div class="deck-bar">
            <button class="icon-btn" id="prev" aria-label="Previous slide" ${i === 0 ? "disabled" : ""}>${I.arrowL}</button>
            <div class="dots">${slides.map((_, k) => `<button class="${k === i ? "on" : ""}" data-k="${k}" aria-label="Slide ${k + 1}"></button>`).join("")}</div>
            <button class="icon-btn" id="next" aria-label="Next slide" ${i === slides.length - 1 ? "disabled" : ""}>${I.arrowR}</button>
          </div>
        </div>
        <div class="hint">Tip: use ← → arrow keys to move between slides</div>
        ${modState(c.id, m.id).done ? `<div class="notice">${I.check} You've viewed every slide in this presentation.</div>` : ""}`;
      host.querySelector("#prev").onclick = () => go(i - 1);
      host.querySelector("#next").onclick = () => go(i + 1);
      host.querySelectorAll(".dots button").forEach((d) => (d.onclick = () => go(+d.dataset.k)));
    }
    function go(n) {
      i = Math.max(0, Math.min(slides.length - 1, n));
      if (i === slides.length - 1 && !modState(c.id, m.id).done) markDone(c, m, idx);
      draw();
    }
    const onKey = (e) => {
      if (!document.body.contains(host)) return document.removeEventListener("keydown", onKey);
      if (e.target.closest && e.target.closest("input, textarea")) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    document.addEventListener("keydown", onKey);
    draw();
  }

  /* ---------- Quiz ---------- */
  function renderQuiz(host, c, m, idx) {
    const prev = modState(c.id, m.id);
    let qi = 0;
    let answers = [];
    let started = false;

    function intro() {
      host.innerHTML = `<div class="quiz">
        <p style="font-size:1.05rem">${m.questions.length} multiple-choice questions. You'll see the correct answer and an explanation after each one. Score <b>${Math.round(m.passMark * 100)}%</b> or more to pass.</p>
        ${prev.best != null ? `<div class="notice" style="${prev.done ? "" : "background:var(--bad-tint);color:#8a2323"}">${prev.done ? I.check : I.cross} Your best score so far: ${prev.best}% ${prev.done ? "— passed" : "— not yet passed"}</div>` : ""}
        <div class="quiz-actions" style="justify-content:flex-start"><button class="btn" id="start">${prev.best != null ? "Retake quiz" : "Start quiz"} ${I.arrowR}</button></div>
      </div>`;
      host.querySelector("#start").onclick = () => { started = true; qi = 0; answers = []; question(); };
    }

    function question() {
      const q = m.questions[qi];
      const a = answers[qi];
      const answered = a != null;
      host.innerHTML = `<div class="quiz">
        <div class="quiz-top"><span>Question ${qi + 1} of ${m.questions.length}</span><span>${answers.filter((x, k) => x === m.questions[k].answer).length} correct so far</span></div>
        <div class="progress" style="margin:0 0 22px"><i style="width:${(qi / m.questions.length) * 100}%;background:var(--primary)"></i></div>
        <div class="q">${esc(q.q)}</div>
        <div class="options" role="radiogroup">
          ${q.options.map((o, k) => {
            let cls = "";
            if (answered && k === q.answer) cls = "correct";
            else if (answered && k === a) cls = "wrong";
            return `<button class="option ${cls}" data-k="${k}" ${answered ? "disabled" : ""} role="radio" aria-checked="${a === k}">
              <span class="letter">${answered && k === q.answer ? I.check : answered && k === a ? I.cross : "ABCD"[k]}</span><span>${esc(o)}</span></button>`;
          }).join("")}
        </div>
        ${answered ? `<div class="explain">${I.bulb}<div><b>${a === q.answer ? "Correct!" : "Not quite."}</b>${esc(q.explain)}</div></div>
          <div class="quiz-actions"><button class="btn dark" id="nextq">${qi === m.questions.length - 1 ? "See results" : "Next question"} ${I.arrowR}</button></div>` : ""}
      </div>`;
      host.querySelectorAll(".option").forEach((btn) => {
        btn.onclick = () => { answers[qi] = +btn.dataset.k; question(); };
      });
      const nx = host.querySelector("#nextq");
      if (nx) { nx.onclick = () => { if (qi < m.questions.length - 1) { qi++; question(); } else results(); }; nx.focus(); }
    }

    function results() {
      const correct = answers.filter((x, k) => x === m.questions[k].answer).length;
      const pct = Math.round((correct / m.questions.length) * 100);
      const passed = pct >= m.passMark * 100;
      const best = Math.max(pct, prev.best || 0);
      if (passed) markDone(c, m, idx, { score: best, best });
      else setMod(c.id, m.id, { best, done: !!prev.done });
      Object.assign(prev, modState(c.id, m.id));
      const R = 70, C = 2 * Math.PI * R;
      const col = passed ? "var(--ok)" : "var(--bad)";
      const nextMod = c.modules[idx + 1];
      window.scrollTo({ top: Math.max(0, document.querySelector(".module-panel").offsetTop - 90), behavior: "smooth" });
      host.innerHTML = `<div class="quiz"><div class="result">
        <div class="ring">
          <svg width="160" height="160"><circle cx="80" cy="80" r="${R}" stroke="var(--line)" stroke-width="12" fill="none"/>
          <circle cx="80" cy="80" r="${R}" stroke="${col}" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" id="arc"/></svg>
          <div class="val">${pct}%</div>
        </div>
        <h2>${passed ? "Well done — you passed!" : "Not quite there yet"}</h2>
        <p class="muted">You answered ${correct} of ${m.questions.length} correctly. ${passed ? "" : `You need ${Math.round(m.passMark * 100)}% to pass — review the explanations and try again.`}</p>
        <div class="actions">
          <button class="btn secondary" id="retry">Retake quiz</button>
          ${passed && courseProgress(c).complete ? `<a class="btn" href="#/certificate/${c.id}">${I.award} Get your certificate</a>`
            : passed && nextMod ? `<a class="btn" href="#/course/${c.id}/${nextMod.id}">Continue ${I.arrowR}</a>`
            : passed ? `<a class="btn" href="#/course/${c.id}">Back to course</a>` : ""}
        </div>
        <div class="review"><h3 style="text-transform:none;letter-spacing:0;font-size:1.05rem">Your answers</h3><ol>
          ${m.questions.map((q, k) => `<li><b style="color:${answers[k] === q.answer ? "var(--ok)" : "var(--bad)"}">${answers[k] === q.answer ? "✓" : "✗"}</b> ${esc(q.q)} <span class="muted">— ${esc(q.options[q.answer])}</span></li>`).join("")}
        </ol></div>
      </div></div>`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const arc = host.querySelector("#arc");
        if (arc) { arc.style.transition = "stroke-dashoffset 1s ease"; arc.style.strokeDashoffset = C * (1 - pct / 100); }
      }));
      host.querySelector("#retry").onclick = () => { qi = 0; answers = []; question(); };
      if (!passed) toast(`${I.cross} ${pct}% — have another go!`);
    }

    intro();
  }

  /* ---------- My learning ---------- */
  function viewLearning() {
    setBrand("gs");
    setNav("learning");
    const started = courses.filter((c) => courseProgress(c).done > 0);
    const completed = courses.filter((c) => courseProgress(c).complete);
    const modsDone = courses.reduce((n, c) => n + courseProgress(c).done, 0);
    const scores = completed.map(quizScore).filter((x) => x != null);
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    const medal = { naf: "linear-gradient(135deg,#d4b97f,#8f6f35)", nvc: "linear-gradient(135deg,#4fbc84,#2f9a64)", nutrilabs: "linear-gradient(135deg,#2563eb,#0a3c74)" };

    app.innerHTML = `
      <section class="dash-head"><div class="wrap">
        <div class="eyebrow">Your dashboard</div>
        <h1 style="font-size:2.2rem">${state.name ? `Welcome back, ${esc(state.name.split(" ")[0])}` : "My learning"}</h1>
        <p class="muted">Track your progress across every Global Supplements brand.</p>
        <div class="dash-stats">
          <div><b>${completed.length}/${courses.length}</b><span>Courses completed</span></div>
          <div><b>${modsDone}</b><span>Modules finished</span></div>
          <div><b>${avg != null ? avg + "%" : "–"}</b><span>Average quiz score</span></div>
          <div><b>${completed.length}</b><span>Certificates earned</span></div>
        </div>
      </div></section>
      <section class="block" style="padding-top:48px">
        <div class="wrap">
          <div class="section-head"><div><h2>Certificates</h2></div></div>
          ${completed.length ? `<div class="badges">${completed.map((c) => `
            <a class="badge-item" href="#/certificate/${c.id}"><span class="medal" style="background:${medal[c.brand]}">${I.award}</span>
              <span><b>${esc(c.title)}</b><small>${esc(brands[c.brand].fullName)} · ${quizScore(c) != null ? quizScore(c) + "%" : ""}</small></span></a>`).join("")}</div>`
            : `<div class="empty">Complete a course to earn your first certificate.</div>`}

          <div class="section-head" style="margin-top:56px"><div><h2>${started.length ? "Your courses" : "Recommended for you"}</h2></div></div>
          <div class="course-grid">${(started.length ? started : courses.slice(0, 3)).map(courseCard).join("")}</div>

          ${started.length && started.length < courses.length ? `
            <div class="section-head" style="margin-top:56px"><div><h2>Explore more</h2></div></div>
            <div class="course-grid">${courses.filter((c) => !started.includes(c)).map(courseCard).join("")}</div>` : ""}
        </div>
      </section>`;
  }

  /* ---------- Certificate ---------- */
  function viewCertificate(cid) {
    const c = byId(cid);
    if (!c) return viewNotFound();
    const b = brands[c.brand];
    setBrand(c.brand);
    setNav("learning");
    const p = courseProgress(c);
    if (!p.complete) {
      app.innerHTML = `<div class="wrap" style="padding:80px 24px;text-align:center">
        <h1>Certificate locked</h1><p class="muted">Complete all ${p.total} modules of <b>${esc(c.title)}</b> to unlock this certificate. You've done ${p.done} so far.</p>
        <a class="btn" href="#/course/${c.id}">Go to course ${I.arrowR}</a></div>`;
      return;
    }
    const date = new Date(completedAt(c)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const certId = "GSA-" + (c.id + completedAt(c)).split("").reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7).toString(36).toUpperCase().slice(0, 8);
    const brandLogo = b.logoOnDark ? `<span class="dark-tile"><img src="${b.logo}" alt="${esc(b.fullName)}"></span>` : `<img src="${b.logo}" alt="${esc(b.fullName)}">`;
    app.innerHTML = `<div class="wrap cert-wrap">
      <div class="crumbs"><a href="#/my-learning">My learning</a> / Certificate</div>
      <div class="certificate">
        <div class="logos"><img src="assets/logos/gs-logo.png" alt="Global Supplements">${brandLogo}</div>
        <div class="eyebrow">Global Supplements Academy</div>
        <h1>Certificate of Completion</h1>
        <p class="muted" style="margin:0">This certifies that</p>
        <div class="name" id="cert-name">${esc(state.name || "Your Name")}</div>
        <p class="muted" style="margin:0 0 6px">has successfully completed</p>
        <div class="course">${esc(c.title)}</div>
        <div class="foot">
          <div><b>${date}</b>Date completed</div>
          <div><b>${quizScore(c) != null ? quizScore(c) + "%" : "Pass"}</b>Assessment score</div>
          <div><b>${certId}</b>Certificate ID</div>
        </div>
      </div>
      <div class="cert-tools">
        <label class="sr-only" for="nm">Your name</label>
        <input id="nm" placeholder="Type your name for the certificate" value="${esc(state.name)}">
        <button class="btn" id="print">Print / save as PDF</button>
      </div>
    </div>`;
    const nm = document.getElementById("nm");
    nm.oninput = () => {
      state.name = nm.value.trim();
      document.getElementById("cert-name").textContent = state.name || "Your Name";
      save();
    };
    document.getElementById("print").onclick = () => window.print();
  }

  function viewNotFound() {
    setBrand("gs");
    setNav("");
    app.innerHTML = `<div class="wrap" style="padding:100px 24px;text-align:center"><h1>Page not found</h1><p class="muted">That page doesn't exist in the demo.</p><a class="btn" href="#/">Back to the Academy</a></div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Router                                                              */
  /* ------------------------------------------------------------------ */
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    if (h === "brands") { if (!document.getElementById("brands")) { viewHome(); } document.getElementById("brands").scrollIntoView(); return; }
    const parts = h.split("/").filter(Boolean);
    window.scrollTo(0, 0);
    document.getElementById("main-nav").classList.remove("open");
    if (!parts.length) viewHome();
    else if (parts[0] === "brand") viewBrand(parts[1]);
    else if (parts[0] === "course") viewCourse(parts[1], parts[2]);
    else if (parts[0] === "my-learning") viewLearning();
    else if (parts[0] === "certificate") viewCertificate(parts[1]);
    else viewNotFound();
    updateNavCount();
  }

  window.addEventListener("hashchange", route);
  document.querySelector(".nav-toggle").addEventListener("click", (e) => {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
  document.querySelector("[data-reset]").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Reset all demo progress in this browser?")) {
      state = { courses: {}, name: "" };
      save();
      location.hash = "#/";
      route();
      toast("Demo progress reset");
    }
  });
  route();
})();
