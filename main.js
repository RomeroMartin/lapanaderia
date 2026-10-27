(function () {
  'use strict';

  // Menú mobile
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav-mob');

  function setMenu(open) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  }

  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  // Abierto / cerrado (07:00 a 20:30, hora de Buenos Aires)
  var OPEN = 7 * 60, CLOSE = 20 * 60 + 30;
  var fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  });

  function updateStatus() {
    var parts = fmt.formatToParts(new Date());
    var h = 0, m = 0;
    parts.forEach(function (p) {
      if (p.type === 'hour') h = parseInt(p.value, 10);
      if (p.type === 'minute') m = parseInt(p.value, 10);
    });
    var mins = h * 60 + m;
    var open = mins >= OPEN && mins < CLOSE;
    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', open);
      el.querySelector('[data-status-text]').textContent = open ? 'Abierto ahora' : 'Cerrado · abre 07:00';
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  // Año del footer
  document.getElementById('year').textContent = new Date().getFullYear();
})();
