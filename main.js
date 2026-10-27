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

  // Abierto / cerrado (martes a domingo 07:00 a 23:00, lunes cerrado; hora de Buenos Aires)
  var OPEN = 7 * 60, CLOSE = 23 * 60;
  var fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  });

  function updateStatus() {
    var parts = fmt.formatToParts(new Date());
    var h = 0, m = 0, day = '';
    parts.forEach(function (p) {
      if (p.type === 'hour') h = parseInt(p.value, 10);
      if (p.type === 'minute') m = parseInt(p.value, 10);
      if (p.type === 'weekday') day = p.value;
    });
    var mins = h * 60 + m;
    var monday = day === 'Mon';
    var open = !monday && mins >= OPEN && mins < CLOSE;
    var closedText = monday ? 'Cerrado hoy · abre mañana 07:00' : 'Cerrado · abre ' + (day === 'Sun' && mins >= CLOSE ? 'el martes ' : '') + '07:00';
    document.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-open', open);
      el.querySelector('[data-status-text]').textContent = open ? 'Abierto ahora' : closedText;
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  // Año del footer
  document.getElementById('year').textContent = new Date().getFullYear();
})();
