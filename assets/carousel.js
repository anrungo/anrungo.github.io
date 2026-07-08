// Theme-agnostic carousel: prev/next, indicator dots, touch swipe, keyboard.
// Markup contract (any theme can style these classes/data-attrs freely):
//   <div class="carousel" data-carousel>
//     <div class="carousel__track" data-track>
//        <div class="carousel__slide">...</div> x N
//     </div>
//     <button data-prev>  <button data-next>
//     <div class="carousel__dots" data-dots></div>
//   </div>
(function () {
  function init(root) {
    const track = root.querySelector('[data-track]');
    const slides = Array.from(track.children);
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const dotsWrap = root.querySelector('[data-dots]');
    let index = 0;

    // Build dots
    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.className = 'carousel__dot';
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
      return b;
    });

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(' + -index * 100 + '%)';
      dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
      slides.forEach((s, si) => s.setAttribute('aria-hidden', si === index ? 'false' : 'true'));
    }

    prev && prev.addEventListener('click', () => go(index - 1));
    next && next.addEventListener('click', () => go(index + 1));

    // Keyboard
    root.tabIndex = 0;
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    });

    // Touch swipe
    let startX = null;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    go(0);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-carousel]').forEach(init);
  });
})();
