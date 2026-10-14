# KALKAL — Maikling Drama, Malalim na Kwento

> TikTok-style PWA para sa Pinoy short drama. 9:16 vertical swipe, offline-ready, gawang Pinoy.

Live repo: **spaceboy72xxx-bot/Kalkal-short-drama**

---

## ✨ Ano ito?

KALKAL ay isang Progressive Web App na parang TikTok pero para sa maikling drama (short drama). 

- **Vertical feed** – snap scroll, 100dvh per card, autoplay via IntersectionObserver
- **PWA** – install to home screen, offline shell via service worker
- **Tagalog-first** – lahat ng title at description nasa Tagalog
- **Walang framework** – vanilla HTML/CSS/JS para mabilis i-deploy sa GitHub Pages

---

## 📁 Structure

```
/ (root)
├── index.html        # Landing page – hero, features, install CTA
├── app.html          # Main app – TikTok style player
├── css/
│   └── style.css     # Complete organized stylesheet
├── js/
│   ├── data.js       # 6 sample dramas (Tagalog titles)
│   └── app.js        # Feed logic, likes, share, progress
├── manifest.json     # PWA manifest
├── sw.js             # Service worker (cache-first shell)
└── icons/            # PWA icons 72-512
```

---

__PH_3__

__PH_4__

```bash
git clone https://github.com/spaceboy72xxx-bot/Kalkal-short-drama.git
cd Kalkal-short-drama

__PH_5__
__PH_6__

git add .
git commit -m "feat: complete KALKAL PWA - organized code"
git push origin main
```

__PH_7__

1. Punta sa **Settings > Pages** sa GitHub repo
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Save – hintayin 1-2 min

Ang site mo ay nasa: `https://spaceboy72xxx-bot.github.io/Kalkal-short-drama/`

__PH_8__

- Buksan sa Chrome Android > Menu > **Add to Home Screen**
- Sa iOS Safari > Share > **Add to Home Screen**
- Check sa DevTools > Application > Manifest

---

__PH_9__

```css
--bg: #09090B
--surface: #18181B
--text: #FAFAFA
--accent: #FF2D55
--font-sans: Geist
--font-mono: Geist Mono
```

---

__PH_10__

```bash
__PH_11__
npx serve .
__PH_12__
python -m http.server 8000
```

Buksan `http://localhost:8000`

---

## 📌 TODO (next)

- [ ] Tunay na video CDN (Cloudflare R2)
- [ ] Like persistence via Supabase
- [ ] Comments / reactions
- [ ] Admin uploader

---

## License

MIT – Gawang Pinas, para sa Pinas. 🇵🇭
