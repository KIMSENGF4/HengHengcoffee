/* ==========================================================================
   Coffee Shop — site logic
   You normally don't need to edit this file. Change js/data.js instead.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const riel = (n) => n.toLocaleString("en-US") + "៛";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ------------------------------------------------------------------
     1. Fill in shop details from SHOP (data.js)
     ------------------------------------------------------------------ */
  const links = {
    phone: "tel:" + SHOP.phoneLink,
    telegram: "https://t.me/" + SHOP.telegram,
    facebook: SHOP.facebook,
    map: SHOP.mapLink,
    instagram: SHOP.instagram,
  };
  $$("[data-shop]").forEach((el) => {
    const v = SHOP[el.dataset.shop];
    if (v) el.textContent = v;
  });
  $$("[data-shop-link]").forEach((el) => {
    const v = links[el.dataset.shopLink];
    if (v) el.href = v;
  });
  if (SHOP.mapEmbed) $("#map").src = SHOP.mapEmbed;
  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     2. Drink cup drawing (SVG). Used when a menu item has no photo.
     ------------------------------------------------------------------ */
  let uid = 0;

  function icedCup(item) {
    const id = "c" + uid++;
    const top = 40, bottom = 136, full = bottom - top;
    let y = bottom, layers = "";
    item.layers.forEach(([color, h]) => {
      const lh = h * full;
      y -= lh;
      layers += `<rect x="0" y="${y.toFixed(1)}" width="100" height="${(lh + 0.6).toFixed(1)}" fill="${color}"/>`;
    });

    let extras = "";
    if (item.top === "cream") {
      extras += `<path d="M0 ${top} H100 V${top + 14} Q90 ${top + 20} 80 ${top + 14} T60 ${top + 14} T40 ${top + 14} T20 ${top + 14} T0 ${top + 14}Z" fill="#fffaf2"/>`;
    }
    if (item.top === "foam") {
      extras += `<rect x="0" y="${top}" width="100" height="12" fill="#f4e6d2"/>`;
    }
    if (item.extra === "pearls") {
      extras += `<path d="M30 ${top + 6} q6 30 -2 60 M50 ${top + 4} q-6 34 4 64 M70 ${top + 6} q5 30 -4 62" stroke="#7a4420" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>`;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 7; c++) {
          const cx = 24 + c * 8.5 + (r % 2 ? 4 : 0);
          const cy = bottom - 6 - r * 8;
          if (cx < 80) extras += `<circle cx="${cx}" cy="${cy}" r="4.2" fill="#2a1508"/><circle cx="${cx - 1.3}" cy="${cy - 1.3}" r="1.1" fill="#fff" opacity=".35"/>`;
        }
      }
    }
    if (item.extra === "bubbles") {
      [[30, 70, 2.2], [62, 58, 1.6], [44, 96, 2.6], [70, 88, 1.8], [36, 118, 1.6], [58, 112, 2.2]].forEach(([cx, cy, r]) => {
        extras += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="1" opacity=".8"/>`;
      });
    }
    if (item.extra === "lemon") {
      extras += `<g transform="translate(38 62) rotate(-15)"><circle r="14" fill="#f6dc3d"/><circle r="11.5" fill="#fff6a3"/>` +
        [0, 60, 120, 180, 240, 300].map((a) => `<line x1="0" y1="0" x2="${(11 * Math.cos(a * Math.PI / 180)).toFixed(1)}" y2="${(11 * Math.sin(a * Math.PI / 180)).toFixed(1)}" stroke="#f6dc3d" stroke-width="1.5"/>`).join("") +
        `</g>`;
    }

    // ice cubes (not for frappes with whip / blended drinks)
    let ice = "";
    if (item.top !== "whip") {
      [[22, 44, -12], [48, 42, 8], [64, 52, -6], [30, 62, 14]].forEach(([x, yy, a]) => {
        ice += `<rect x="${x}" y="${yy}" width="15" height="15" rx="3" transform="rotate(${a} ${x + 7} ${yy + 7})" fill="#fff" opacity=".28" stroke="#fff" stroke-opacity=".5"/>`;
      });
    }

    const initials = SHOP.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const whip = item.top === "whip"
      ? `<path d="M18 34 Q14 22 26 20 Q24 10 38 10 Q42 0 54 4 Q66 2 66 12 Q80 10 78 22 Q88 24 82 34Z" fill="#fffaf3" stroke="#eadfd0" stroke-width="1"/>
         <path d="M28 22 q8 -6 18 0 q8 6 18 -2" stroke="${item.layers[0][0]}" stroke-width="2.5" fill="none" opacity=".7" stroke-linecap="round"/>`
      : "";

    return `<svg viewBox="0 0 100 140" role="img" aria-label="${esc(item.en)}">
      <defs><clipPath id="${id}"><path d="M16 34 H84 L74.5 131 Q74 136 69 136 H31 Q26 136 25.5 131 Z"/></clipPath></defs>
      <line x1="62" y1="-6" x2="56" y2="60" stroke="#c8873e" stroke-width="5" stroke-linecap="round"/>
      ${whip}
      <path d="M18 31 Q20 14 50 13 Q80 14 82 31Z" fill="#fff" opacity="${item.top === "whip" ? 0.25 : 0.55}" stroke="#d9cfc4" stroke-width="1"/>
      <g clip-path="url(#${id})">
        <rect x="0" y="0" width="100" height="140" fill="#fff" opacity=".35"/>
        ${layers}${extras}${ice}
        <circle cx="50" cy="90" r="10" fill="none" stroke="#fff" stroke-width="1.4" opacity=".75"/>
        <text x="50" y="93.5" text-anchor="middle" font-family="Playfair Display, serif" font-weight="700" font-size="9" fill="#fff" opacity=".9">${esc(initials)}</text>
        <path d="M22 36 L30 134 L35 134 L28 36Z" fill="#fff" opacity=".28"/>
      </g>
      <path d="M16 34 H84 L74.5 131 Q74 136 69 136 H31 Q26 136 25.5 131 Z" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.5"/>
      <rect x="12" y="29" width="76" height="6" rx="3" fill="#f3eee8" stroke="#d9cfc4" stroke-width="1"/>
    </svg>`;
  }

  function hotCup(item) {
    const color = item.layers[0][0];
    let art = "";
    if (item.top === "foam") {
      art = `<path d="M50 80 C42 74 40 68 46 66 C49 65 50 68 50 69 C50 68 51 65 54 66 C60 68 58 74 50 80Z" fill="#fbefdc"/>
             <ellipse cx="50" cy="73" rx="22" ry="5" fill="none" stroke="#fbefdc" stroke-width="1.2" opacity=".6"/>`;
    } else if (item.top === "cream") {
      art = `<ellipse cx="50" cy="73" rx="24" ry="6" fill="#f3e3cc"/>` +
        [[44, 72], [52, 71], [58, 74], [47, 75], [55, 76], [40, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" fill="#6b3e1f"/>`).join("");
    }
    return `<svg viewBox="0 0 100 140" role="img" aria-label="${esc(item.en)}">
      <path d="M38 52 q-6 -10 0 -18 q6 -8 0 -18 M50 50 q-6 -10 0 -18 q6 -8 0 -18 M62 52 q-6 -10 0 -18 q6 -8 0 -18" stroke="#c9b8a8" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="50" cy="124" rx="46" ry="9" fill="#f5f0ea" stroke="#ddd3c8"/>
      <ellipse cx="50" cy="122" rx="28" ry="4" fill="#e8e0d6"/>
      <path d="M80 80 q16 -2 16 12 q0 14 -20 16" fill="none" stroke="#fff" stroke-width="7"/>
      <path d="M80 80 q16 -2 16 12 q0 14 -20 16" fill="none" stroke="#e2d8cc" stroke-width="1" transform="translate(0 3)"/>
      <path d="M16 72 H84 Q84 112 62 120 H38 Q16 112 16 72Z" fill="#fff" stroke="#e2d8cc" stroke-width="1.2"/>
      <ellipse cx="50" cy="72" rx="34" ry="8" fill="#fff" stroke="#e2d8cc" stroke-width="1.2"/>
      <ellipse cx="50" cy="73" rx="30" ry="6.5" fill="${color}"/>
      ${art}
      <path d="M22 80 Q24 104 36 114" stroke="#f1ebe4" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  function drinkVisual(item) {
    if (item.image) return `<img class="drink-photo" src="${esc(item.image)}" alt="${esc(item.en)}" loading="lazy">`;
    return `<div class="cup">${item.hot ? hotCup(item) : icedCup(item)}</div>`;
  }

  /* ------------------------------------------------------------------
     3. Render: Most Popular, Menu, Toppings, Sugar levels
     ------------------------------------------------------------------ */
  MENU.forEach((item, i) => (item.id = i));

  $("#popularList").innerHTML = MENU.filter((m) => m.popular).slice(0, 8).map((m) => `
    <article class="pop-card reveal" style="--glow:${m.layers[m.layers.length - 1][0]}">
      <div class="pop-card__img">${drinkVisual(m)}</div>
      <h3 class="pop-card__kh">${esc(m.kh)}</h3>
      <p class="pop-card__en">${esc(m.en)}</p>
      <p class="pop-card__zh zh">${esc(m.zh || "")}</p>
      <div class="pop-card__row">
        <span class="price">${riel(m.price)}</span>
        <button class="add-btn" data-add="${m.id}" aria-label="Add ${esc(m.en)} to order">+</button>
      </div>
    </article>`).join("");

  let activeCat = "all";
  let query = "";

  $("#tabs").innerHTML = CATEGORIES.map((c) => `
    <button class="tab${c.id === "all" ? " is-active" : ""}" role="tab" data-cat="${c.id}" aria-selected="${c.id === "all"}">
      ${esc(c.en)}<small>${esc(c.kh)}</small><small class="zh">${esc(c.zh || "")}</small>
    </button>`).join("");

  function renderMenu() {
    const q = query.trim().toLowerCase();
    const list = MENU.filter((m) =>
      (activeCat === "all" || m.cat === activeCat) &&
      (!q || m.en.toLowerCase().includes(q) || m.kh.includes(q) || (m.zh || "").includes(q)));

    $("#menuGrid").innerHTML = list.map((m, i) => `
      <article class="menu-card" style="animation-delay:${Math.min(i, 12) * 35}ms">
        <div class="menu-card__img">${drinkVisual(m)}</div>
        <div>
          <h3 class="menu-card__kh">${esc(m.kh)}</h3>
          <p class="menu-card__en">${esc(m.en)}</p>
          <p class="menu-card__zh"><span class="zh">${esc(m.zh || "")}</span>${m.popular ? '<span class="badge">Best</span>' : ""}${m.hot ? '<span class="badge badge--hot">Hot</span>' : ""}</p>
          <div class="menu-card__row">
            <span class="price">${riel(m.price)}</span>
            <button class="add-btn" data-add="${m.id}" aria-label="Add ${esc(m.en)} to order">+</button>
          </div>
        </div>
      </article>`).join("");
    $("#menuEmpty").hidden = list.length > 0;
  }
  renderMenu();

  $("#tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    activeCat = btn.dataset.cat;
    $$(".tab").forEach((t) => {
      const on = t === btn;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on);
    });
    renderMenu();
  });
  $("#search").addEventListener("input", (e) => { query = e.target.value; renderMenu(); });

  $("#toppingList").innerHTML = TOPPINGS.map((t) =>
    `<li><span class="kh">${esc(t.kh)}</span> · ${esc(t.en)} · <span class="zh">${esc(t.zh || "")}</span> <b>+${riel(t.price)}</b></li>`).join("");
  $("#sugarPills").innerHTML = SUGAR_LEVELS.map((s) => `<span>${s}</span>`).join("");
  $("#cartSugar").innerHTML = SUGAR_LEVELS.map((s) => `<option${s === "50%" ? " selected" : ""}>${s}</option>`).join("");

  /* ------------------------------------------------------------------
     4. Order basket (saved in the browser)
     ------------------------------------------------------------------ */
  const STORE_KEY = "coffee-order";
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (_) { cart = {}; }

  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (_) {} };
  const cartLines = () => Object.entries(cart)
    .map(([id, qty]) => ({ item: MENU[id], qty }))
    .filter((l) => l.item && l.qty > 0);
  const cartTotal = () => cartLines().reduce((sum, l) => sum + l.item.price * l.qty, 0);

  function renderCart() {
    const lines = cartLines();
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const badge = $("#cartCount");
    badge.textContent = count;
    $("#cartTotal").textContent = riel(cartTotal());
    $("#sendOrder").disabled = count === 0;

    $("#cartItems").innerHTML = lines.length
      ? lines.map(({ item, qty }) => `
        <div class="cart-item">
          <div class="cart-item__img">${drinkVisual(item)}</div>
          <div>
            <div class="cart-item__name">${esc(item.en)}<small>${esc(item.kh)} · <span class="zh">${esc(item.zh || "")}</span></small></div>
            <div class="cart-item__price">${riel(item.price * qty)}</div>
          </div>
          <div class="qty">
            <button data-dec="${item.id}" aria-label="Remove one">−</button>
            <span>${qty}</span>
            <button data-add="${item.id}" aria-label="Add one">+</button>
          </div>
        </div>`).join("")
      : `<div class="drawer__empty"><span>☕</span>Your order is empty.<br>Tap <b>+</b> on any drink to add it.</div>`;
  }
  renderCart();

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-show"), 2200);
  }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    const dec = e.target.closest("[data-dec]");
    if (add) {
      const id = add.dataset.add;
      cart[id] = (cart[id] || 0) + 1;
      save(); renderCart();
      const badge = $("#cartCount");
      badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
      if (!add.closest(".drawer")) toast(`Added ${MENU[id].en} ✓`);
    }
    if (dec) {
      const id = dec.dataset.dec;
      cart[id] = (cart[id] || 0) - 1;
      if (cart[id] <= 0) delete cart[id];
      save(); renderCart();
    }
  });

  // drawer open / close
  const drawer = $("#drawer"), backdrop = $("#backdrop");
  function openDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    $("#cartClose").focus();
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }
  $("#cartOpen").addEventListener("click", openDrawer);
  $("#cartClose").addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_) {}
      ta.remove();
      return ok;
    }
  }

  // Order bot link: t.me/<bot>?start=o<sugar>_<item>x<qty>_...  (Telegram allows 64 characters)
  function botOrderLink() {
    if (!SHOP.telegramBot) return null;
    const sugar = Math.max(0, SUGAR_LEVELS.indexOf($("#cartSugar").value));
    const payload = "o" + sugar + Object.entries(cart).filter(([, q]) => q > 0).map(([id, q]) => `_${id}x${q}`).join("");
    return payload.length <= 64 ? `https://t.me/${SHOP.telegramBot}?start=${payload}` : null;
  }
  if (SHOP.telegramBot) $(".drawer__hint").textContent = "Telegram opens with your order ready. Just confirm it there.";

  $("#sendOrder").addEventListener("click", async () => {
    const lines = cartLines();
    if (!lines.length) return;
    const botLink = botOrderLink();
    if (botLink) {
      const win = window.open(botLink, "_blank");
      if (win) win.opener = null; else location.href = botLink;
      return;
    }
    const note = $("#cartNote").value.trim();
    const text = [
      `Hello ${SHOP.name}! I'd like to order: / សូមកម្មង់ / 我要点单:`,
      ...lines.map(({ item, qty }) => `• ${qty} × ${item.en} (${item.kh}${item.zh ? " / " + item.zh : ""}) — ${riel(item.price * qty)}`),
      `Sugar / កម្រិតស្ករ / 甜度: ${$("#cartSugar").value}`,
      note ? `Note / ចំណាំ / 备注: ${note}` : "",
      `Total / សរុប / 合计: ${riel(cartTotal())}`,
    ].filter(Boolean).join("\n");

    // open Telegram first (inside the click) so pop-up blockers allow it
    const win = window.open(links.telegram, "_blank");
    if (win) win.opener = null;
    const copied = await copyText(text);
    toast(copied ? "Order copied. Paste it in Telegram ✓" : "Telegram opened. Please type your order.");
    if (!win) location.href = links.telegram;
  });

  /* ------------------------------------------------------------------
     5. Contact form → opens the visitor's email app
     ------------------------------------------------------------------ */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent(`Message from ${f.name.value}`);
    const body = encodeURIComponent(f.message.value);
    location.href = `mailto:${SHOP.email}?subject=${subject}&body=${body}`;
  });

  /* ------------------------------------------------------------------
     6. Navbar: background on scroll, mobile menu, active link
     ------------------------------------------------------------------ */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger"), navLinks = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        $$("a", navLinks).forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach((s) => sectionObserver.observe(s));

    /* 7. Reveal-on-scroll animation */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObserver.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach((el) => revealObserver.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();
