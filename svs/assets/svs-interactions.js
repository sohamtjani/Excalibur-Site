(function () {
  document.documentElement.classList.add('js');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.experience-reveal').forEach(function (element) { revealObserver.observe(element); });

  document.querySelectorAll('.experience-page button, .experience-subpage button').forEach(function (button) {
    button.addEventListener('pointermove', function (event) {
      var bounds = button.getBoundingClientRect();
      button.style.setProperty('--button-x', (event.clientX - bounds.left) + 'px');
      button.style.setProperty('--button-y', (event.clientY - bounds.top) + 'px');
    });
    button.addEventListener('pointerleave', function () {
      button.style.removeProperty('--button-x');
      button.style.removeProperty('--button-y');
    });
  });

  document.querySelectorAll('.experience-week').forEach(function (card) {
    function flipCard() {
      var isFlipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(isFlipped));
    }
    card.addEventListener('click', flipCard);
    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        flipCard();
      }
    });
  });

  document.querySelectorAll('.experience-faq-item').forEach(function (item) {
    var button = item.querySelector('button');
    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.experience-faq-item').forEach(function (current) {
        current.classList.remove('is-open');
        current.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}());
