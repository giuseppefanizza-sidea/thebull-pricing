/**
 * Engineering Hero — Animation Orchestrator
 * Staggered entrance sequence (~2s total)
 * Respects prefers-reduced-motion
 */
(function () {
  'use strict';

  // Bail if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ease = [0.2, 0, 0, 1];
  const easeOut = [0.0, 0, 0.2, 1];

  // Utility: animate with Web Animations API
  function animate(el, keyframes, options) {
    if (!el) return null;
    return el.animate(keyframes, {
      duration: options.duration || 600,
      delay: options.delay || 0,
      easing: options.easing || 'cubic-bezier(0.2, 0, 0, 1)',
      fill: 'forwards',
      ...options,
    });
  }

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.eng-hero');
    if (!hero) return;

    // 1. Grid lines fade in (delay 0, duration 400ms)
    const grid = hero.querySelector('.eng-hero__grid');
    if (grid) {
      animate(grid, [
        { opacity: 0 },
        { opacity: 1 }
      ], { duration: 400, delay: 0 });
    }

    // 2. Headline reveals line by line (delay 200ms, staggered 120ms each)
    const lines = hero.querySelectorAll('.eng-hero__headline .line');
    lines.forEach(function (line, i) {
      animate(line, [
        { opacity: 0, transform: 'translateY(30px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 600, delay: 200 + (i * 120), easing: 'cubic-bezier(0, 0, 0.2, 1)' });
    });

    // Eyebrow (before headline, delay 100ms)
    const eyebrow = hero.querySelector('.eng-hero__eyebrow');
    if (eyebrow) {
      animate(eyebrow, [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 500, delay: 100 });
    }

    // Subtitle (delay 600ms)
    const sub = hero.querySelector('.eng-hero__sub');
    if (sub) {
      animate(sub, [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 600, delay: 600 });
    }

    // 3. Scale bar draws top to bottom (delay 300ms, duration 900ms)
    const scaleLine = hero.querySelector('.eng-hero__scale-bar-line');
    if (scaleLine) {
      animate(scaleLine, [
        { transform: 'scaleY(0)', opacity: 0.7 },
        { transform: 'scaleY(1)', opacity: 0.7 }
      ], { duration: 900, delay: 300, easing: 'cubic-bezier(0, 0, 0.2, 1)' });
    }

    // Scale ticks stagger in
    const scaleTicks = hero.querySelector('.eng-hero__scale-bar-ticks');
    if (scaleTicks) {
      animate(scaleTicks, [
        { opacity: 0 },
        { opacity: 1 }
      ], { duration: 400, delay: 1100 });
    }

    // 4. Image fades in with scale(1.05 → 1.0) (delay 400ms)
    const img = hero.querySelector('.eng-hero__img');
    if (img) {
      animate(img, [
        { opacity: 0, transform: 'scale(1.05)' },
        { opacity: 0.65, transform: 'scale(1.0)' }
      ], { duration: 1200, delay: 400, easing: 'cubic-bezier(0, 0, 0.2, 1)' });
    }

    // 5. Dimension annotations draw in (delay 800ms)
    const dimensionLines = hero.querySelectorAll('.eng-hero__dimension-line');
    dimensionLines.forEach(function (line, i) {
      const length = line.getTotalLength ? line.getTotalLength() : 100;
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;
      animate(line, [
        { strokeDashoffset: length },
        { strokeDashoffset: 0 }
      ], { duration: 700, delay: 800 + (i * 150), easing: 'cubic-bezier(0, 0, 0.2, 1)' });
    });

    // Dimension text fade
    const dimensionTexts = hero.querySelectorAll('.eng-hero__dimension-text');
    dimensionTexts.forEach(function (text, i) {
      animate(text, [
        { opacity: 0 },
        { opacity: 0.85 }
      ], { duration: 400, delay: 1000 + (i * 150) });
    });

    // 6. Corner crosshairs spring in (delay 1000ms)
    const crosshairs = hero.querySelectorAll('.eng-hero__crosshair');
    crosshairs.forEach(function (ch, i) {
      animate(ch, [
        { opacity: 0, transform: 'scale(0)' },
        { opacity: 1, transform: 'scale(1.15)' },
        { opacity: 0.8, transform: 'scale(1)' }
      ], { duration: 500, delay: 1000 + (i * 80), easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    });

    // 7. Coordinate readout types in (delay 1200ms)
    const coordsEl = hero.querySelector('.eng-hero__coords');
    if (coordsEl) {
      const text = coordsEl.getAttribute('data-text') || 'X: 45.234  Y: 12.891  Z: 0.000';
      coordsEl.innerHTML = '';
      const chars = text.split('');
      chars.forEach(function (char, i) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        coordsEl.appendChild(span);

        animate(span, [
          { opacity: 0 },
          { opacity: 0.8 }
        ], { duration: 50, delay: 1200 + (i * 35) });
      });
    }

    // 8. CTAs slide up with fade (delay 1000ms)
    const actions = hero.querySelector('.eng-hero__actions');
    if (actions) {
      animate(actions, [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 600, delay: 1000, easing: 'cubic-bezier(0, 0, 0.2, 1)' });
    }

    // Technical labels
    const techLabels = hero.querySelectorAll('.eng-hero__tech-label');
    techLabels.forEach(function (label, i) {
      animate(label, [
        { opacity: 0 },
        { opacity: 1 }
      ], { duration: 500, delay: 1400 + (i * 200) });
    });
  });
})();
