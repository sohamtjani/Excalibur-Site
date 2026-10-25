(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const slides = Array.from(carousel.querySelectorAll('.hd-slide'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  const status = carousel.querySelector('[data-carousel-status]');
  let current = 0;

  function setSlide(index, shouldFocus) {
    current = (index + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === current);
      slide.setAttribute('aria-hidden', slideIndex === current ? 'false' : 'true');
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    status.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    if (shouldFocus) viewport.focus({ preventScroll: true });
  }

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', function () { setSlide(current - 1, false); });
  carousel.querySelector('[data-carousel-next]').addEventListener('click', function () { setSlide(current + 1, false); });
  dots.forEach(function (dot, index) { dot.addEventListener('click', function () { setSlide(index, false); }); });
  viewport.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') { event.preventDefault(); setSlide(current - 1, true); }
    if (event.key === 'ArrowRight') { event.preventDefault(); setSlide(current + 1, true); }
  });

  let startX = 0;
  viewport.addEventListener('touchstart', function (event) { startX = event.changedTouches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', function (event) {
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) > 40) setSlide(current + (distance < 0 ? 1 : -1), false);
  }, { passive: true });

  setSlide(0, false);
})();
