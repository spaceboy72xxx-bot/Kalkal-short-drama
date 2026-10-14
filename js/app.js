K
KALKAL
PWA
Complete Organized Code

⎙
Copy file
⌕
Filter files…
⌂
root

<>
index.html
162L

{}
manifest.json
65L

JS
sw.js
93L

Md
README.md
109L
◐
css

#
css/style.css
463L
◑
js

JS
js/data.js
93L

JS
js/app.js
300L
Deploy checklist
• Copy all 8 files to repo root
• Keep css/ and js/ folders
• Enable Pages → main / root
• Test manifest + sw.js
js/app.js
javascript
Copy
/**
 * KALKAL – App Logic
 * ==================
 * Handles:
 *  - Rendering vertical feed from KALKAL_DRAMAS
 *  - IntersectionObserver for autoplay
 *  - Like / Share interactions
 *  - Progress bar
 *  - PWA install prompt (shared)
 *  - Swipe / keyboard navigation
 * 
 * No framework, vanilla JS, production-ready.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  DOM REFERENCES                                                    */
  /* ------------------------------------------------------------------ */
  const feedEl = document.getElementById('feed');
  const progressBar = document.getElementById('progressBar');
  const toastEl = document.getElementById('toast');
  const toastText = document.getElementById('toastText');

  if (!feedEl) return;

  /* ------------------------------------------------------------------ */
  /*  STATE                                                             */
  /* ------------------------------------------------------------------ */
  let currentIndex = 0;
  let observer = null;
  let likedSet = new Set(JSON.parse(localStorage.getItem('kalkal_liked') || '[]'));

  /* ------------------------------------------------------------------ */
  /*  HELPERS                                                           */
  /* ------------------------------------------------------------------ */

  /**
   * Show a small toast message.
   * @param {string} message
   */
  function showToast(message) {
    toastText.textContent = message;
    toastEl.classList.remove('hidden');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 2200);
  }

  /**
   * Format likes: 12453 -> 12.4K
   * @param {number} n
   */
  function formatCount(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return String(n);
  }

  /**
   * Persist liked videos.
   */
  function saveLikes() {
    localStorage.setItem('kalkal_liked', JSON.stringify([...likedSet]));
  }

  /* ------------------------------------------------------------------ */
  /*  RENDER FEED                                                       */
  /* ------------------------------------------------------------------ */

  function renderFeed() {
    feedEl.innerHTML = '';

    KALKAL_DRAMAS.forEach((drama, index) => {
      const card = document.createElement('article');
      card.className = 'drama-card';
      card.dataset.index = String(index);
      card.dataset.id = drama.id;

      card.innerHTML = `
        <video
          class="drama-card__video"
          playsinline
          muted
          loop
          preload="metadata"
          poster="${drama.thumbnail}"
        >
          <source src="${drama.src}" type="video/mp4" />
        </video>

        <div class="drama-card__overlay">
          <div class="drama-card__meta">
            <h2>${drama.title}</h2>
            <p>${drama.description}</p>
            <p style="margin-top:8px; opacity:0.7">${drama.tags.join(' ')}</p>
          </div>
        </div>

        <div class="drama-card__actions">
          <button class="action-btn action-btn--like" data-action="like" aria-label="Like">
            <span class="action-btn__circle">${likedSet.has(drama.id) ? '♥' : '♡'}</span>
            <span class="action-btn__label">${formatCount(drama.likes + (likedSet.has(drama.id) ? 1 : 0))}</span>
          </button>

          <button class="action-btn" data-action="share" aria-label="Share">
            <span class="action-btn__circle">↗</span>
            <span class="action-btn__label">${formatCount(drama.shares)}</span>
          </button>

          <button class="action-btn" data-action="next" aria-label="Next">
            <span class="action-btn__circle">⌄</span>
            <span class="action-btn__label">Next</span>
          </button>
        </div>
      `;

      // Bind actions
      const likeBtn = card.querySelector('[data-action="like"]');
      likeBtn.addEventListener('click', () => handleLike(drama, likeBtn));

      const shareBtn = card.querySelector('[data-action="share"]');
      shareBtn.addEventListener('click', () => handleShare(drama));

      const nextBtn = card.querySelector('[data-action="next"]');
      nextBtn.addEventListener('click', () => scrollToIndex(index + 1));

      feedEl.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------ */
  /*  INTERACTIONS                                                      */
  /* ------------------------------------------------------------------ */

  function handleLike(drama, btnEl) {
    const isLiked = likedSet.has(drama.id);

    if (isLiked) {
      likedSet.delete(drama.id);
      showToast('Inalis sa likes');
    } else {
      likedSet.add(drama.id);
      showToast('Na-like mo! Salamat');
    }

    saveLikes();

    // Update UI
    const circle = btnEl.querySelector('.action-btn__circle');
    const label = btnEl.querySelector('.action-btn__label');

    circle.textContent = likedSet.has(drama.id) ? '♥' : '♡';
    label.textContent = formatCount(drama.likes + (likedSet.has(drama.id) ? 1 : 0));

    // Animate
    circle.style.animation = 'likePop 0.35s var(--ease-out)';
    setTimeout(() => (circle.style.animation = ''), 350);
  }

  async function handleShare(drama) {
    const shareData = {
      title: 'KALKAL - ' + drama.title,
      text: drama.description,
      url: window.location.href + '#' + drama.id
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast('Na-share!');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        showToast('Link kinopya');
      } else {
        showToast('Hindi ma-share sa device na ito');
      }
    } catch (err) {
      // User cancelled share sheet – ignore
      console.log('Share cancelled', err);
    }
  }

  function scrollToIndex(index) {
    if (index < 0 || index >= KALKAL_DRAMAS.length) return;
    const target = feedEl.querySelector(`[data-index="${index}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  /* ------------------------------------------------------------------ */
  /*  AUTOPLAY OBSERVER                                                 */
  /* ------------------------------------------------------------------ */

  function setupObserver() {
    const options = {
      root: feedEl,
      threshold: 0.7
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video');
        const idx = Number(entry.target.dataset.index);

        if (!video) return;

        if (entry.isIntersecting) {
          currentIndex = idx;
          video.play().catch(() => {});
          updateProgress(0);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, options);

    feedEl.querySelectorAll('.drama-card').forEach((card) => {
      observer.observe(card);

      // Progress tracking for active video
      const video = card.querySelector('video');
      if (video) {
        video.addEventListener('timeupdate', () => {
          if (Number(card.dataset.index) === currentIndex) {
            const pct = (video.currentTime / video.duration) * 100;
            updateProgress(pct);
          }
        });
      }
    });
  }

  function updateProgress(percent) {
    if (progressBar) progressBar.style.width = percent + '%';
  }

  /* ------------------------------------------------------------------ */
  /*  KEYBOARD & TOUCH                                                  */
  /* ------------------------------------------------------------------ */

  function setupKeys() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scrollToIndex(currentIndex + 1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToIndex(currentIndex - 1);
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  PWA INSTALL (shared with landing)                                 */
  /* ------------------------------------------------------------------ */

  function setupInstallPrompt() {
    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      console.log('KALKAL: PWA install ready');
    });

    // Optional: expose for UI
    window.KALKAL_getInstallPrompt = () => deferredPrompt;
  }

  /* ------------------------------------------------------------------ */
  /*  INIT                                                              */
  /* ------------------------------------------------------------------ */

  function init() {
    renderFeed();
    setupObserver();
    setupKeys();
    setupInstallPrompt();

    // Deep link handling
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const idx = KALKAL_DRAMAS.findIndex((d) => d.id === hash);
      if (idx >= 0) setTimeout(() => scrollToIndex(idx), 300);
    }

    console.log('KALKAL App ready —', KALKAL_DRAMAS.length, 'dramas');
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
