/*
 * Hero parallax — drives background-position-y on scroll.
 * Speed 0 = moves with content (no parallax), 1 = fully fixed (like background-attachment:fixed).
 */
(function () {
  var SPEED = 0.4; // fraction of scroll offset applied to background

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function update() {
    var hero = document.querySelector('.hero-modern');
    if (!hero || isMobile()) return;

    var rect   = hero.getBoundingClientRect();
    var heroH  = hero.offsetHeight;
    // scrollY when the hero's top aligns with the viewport top
    var offset = window.scrollY + rect.top;

    // vertical shift: starts at 0 when hero is in view, drifts as user scrolls
    var shift = (window.scrollY - offset) * SPEED;
    hero.style.backgroundPositionY = 'calc(50% + ' + shift + 'px)';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
})();
