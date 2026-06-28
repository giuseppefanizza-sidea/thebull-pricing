/**
 * Mobile Menu — Toggle interaction
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const close = menu ? menu.querySelector('.mobile-menu__close') : null;
    const links = menu ? menu.querySelectorAll('.mobile-menu__nav a') : [];

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      close && close.focus();
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      toggle.focus();
    }

    toggle.addEventListener('click', openMenu);
    close && close.addEventListener('click', closeMenu);

    // Close on nav link click (anchor navigation)
    links.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });
})();
