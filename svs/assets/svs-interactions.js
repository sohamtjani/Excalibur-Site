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

  var scheduleUrl = 'https://calendar.app.google/vzdbUVXQreSSxLEa8';
  var scheduleModal;
  var lastScheduleTrigger;

  function createScheduleModal() {
    if (scheduleModal) return scheduleModal;

    scheduleModal = document.createElement('div');
    scheduleModal.className = 'svs-schedule-modal';
    scheduleModal.hidden = true;
    scheduleModal.setAttribute('aria-hidden', 'true');
    scheduleModal.innerHTML = '<div class="svs-schedule-backdrop" data-svs-schedule-close></div>' +
      '<section class="svs-schedule-dialog" role="dialog" aria-modal="true" aria-labelledby="svs-schedule-title">' +
        '<button class="svs-schedule-close" type="button" aria-label="Close scheduling window" data-svs-schedule-close>&times;</button>' +
        '<div class="svs-schedule-copy"><p class="v1-kicker">START WITH THE WORK</p><h2 id="svs-schedule-title">Book a free fit call.</h2><p>Choose a time to talk through the student, the direction, and whether SVS is the right fit.</p></div>' +
        '<div class="svs-schedule-action"><p>Use the calendar to choose a time that works for you.</p><a class="experience-apply experience-apply-large" href="' + scheduleUrl + '" target="_blank" rel="noopener noreferrer">Open the scheduling page <span aria-hidden="true">↗</span></a><small>The scheduling page will open in a new tab.</small></div>' +
      '</section>';
    document.body.appendChild(scheduleModal);

    scheduleModal.querySelectorAll('[data-svs-schedule-close]').forEach(function (element) {
      element.addEventListener('click', closeScheduleModal);
    });
    return scheduleModal;
  }

  function openScheduleModal(event, trigger) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    lastScheduleTrigger = trigger || event.currentTarget;
    var modal = createScheduleModal();
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('svs-schedule-open');
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    modal.querySelector('.svs-schedule-close').focus();
  }

  function closeScheduleModal() {
    if (!scheduleModal) return;
    scheduleModal.classList.remove('is-open');
    scheduleModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('svs-schedule-open');
    window.setTimeout(function () { if (scheduleModal) scheduleModal.hidden = true; }, 220);
    if (lastScheduleTrigger) lastScheduleTrigger.focus();
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-svs-schedule]');
    if (trigger) openScheduleModal(event, trigger);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeScheduleModal();
  });
}());
