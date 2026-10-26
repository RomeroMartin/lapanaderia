// Visor a pantalla completa para la carta y las fotos del playroom.
// Cada enlace con data-viewer="grupo" abre el visor en su posición dentro del grupo.
(function () {
  'use strict';

  var links = Array.prototype.slice.call(document.querySelectorAll('[data-viewer]'));
  if (!links.length) return;

  var ARROW_L = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  var ARROW_R = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  var el = document.createElement('div');
  el.className = 'viewer';
  el.hidden = true;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.innerHTML =
    '<div class="viewer-bar">' +
      '<div><span class="viewer-title"></span><span class="viewer-count" aria-live="polite"></span></div>' +
      '<button type="button" class="viewer-close" aria-label="Cerrar visor">' + CLOSE + '</button>' +
    '</div>' +
    '<div class="viewer-stage"><img alt=""></div>' +
    '<p class="viewer-hint"></p>' +
    '<div class="viewer-strip"></div>' +
    '<div class="viewer-nav">' +
      '<button type="button" data-prev>' + ARROW_L + 'Anterior</button>' +
      '<button type="button" data-next>Siguiente' + ARROW_R + '</button>' +
    '</div>';
  document.body.appendChild(el);

  var title = el.querySelector('.viewer-title');
  var count = el.querySelector('.viewer-count');
  var stage = el.querySelector('.viewer-stage');
  var img = stage.querySelector('img');
  var hint = el.querySelector('.viewer-hint');
  var strip = el.querySelector('.viewer-strip');
  var prev = el.querySelector('[data-prev]');
  var next = el.querySelector('[data-next]');
  var closeBtn = el.querySelector('.viewer-close');

  var group = [];
  var index = 0;
  var opener = null;
  var unit = 'Página';

  function load(i) {
    index = Math.max(0, Math.min(group.length - 1, i));
    var a = group[index];
    el.classList.remove('is-zoomed');
    stage.scrollTo(0, 0);
    img.src = a.getAttribute('href');
    var thumb = a.querySelector('img');
    img.alt = thumb ? thumb.alt : unit + ' ' + (index + 1);
    count.textContent = unit + ' ' + (index + 1) + ' de ' + group.length;
    prev.disabled = index === 0;
    next.disabled = index === group.length - 1;
    Array.prototype.forEach.call(strip.children, function (b, k) {
      if (k === index) {
        b.setAttribute('aria-current', 'true');
        if (b.scrollIntoView) b.scrollIntoView({ block: 'nearest', inline: 'center' });
      } else {
        b.removeAttribute('aria-current');
      }
    });
    [index - 1, index + 1].forEach(function (k) {
      if (group[k]) new Image().src = group[k].getAttribute('href');
    });
  }

  function open(a) {
    var name = a.getAttribute('data-viewer');
    group = links.filter(function (l) { return l.getAttribute('data-viewer') === name; });
    unit = a.getAttribute('data-viewer-unit') || 'Página';
    var plural = unit === 'Foto' ? 'foto' : 'página';
    el.setAttribute('aria-label', 'Visor de ' + (unit === 'Foto' ? 'fotos' : 'la carta'));
    title.textContent = a.getAttribute('data-viewer-title') || '';
    var touch = window.matchMedia('(pointer: coarse)').matches;
    hint.textContent = touch
      ? 'Deslizá para pasar de ' + plural + ' · pellizcá para hacer zoom'
      : 'Usá las flechas del teclado para pasar de ' + plural + ' · doble clic para hacer zoom';
    strip.innerHTML = '';
    group.forEach(function (_, k) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = k + 1;
      b.setAttribute('aria-label', 'Ir a la ' + plural + ' ' + (k + 1));
      b.addEventListener('click', function () { load(k); });
      strip.appendChild(b);
    });
    opener = a;
    el.hidden = false;
    document.body.classList.add('viewer-open');
    load(group.indexOf(a));
    closeBtn.focus();
  }

  function close() {
    el.hidden = true;
    document.body.classList.remove('viewer-open');
    img.removeAttribute('src');
    if (opener && opener.focus) opener.focus();
  }

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      open(a);
    });
  });

  closeBtn.addEventListener('click', close);
  prev.addEventListener('click', function () { load(index - 1); });
  next.addEventListener('click', function () { load(index + 1); });
  img.addEventListener('dblclick', function () { el.classList.toggle('is-zoomed'); });
  img.addEventListener('click', function () {
    if (window.matchMedia('(pointer: fine)').matches) el.classList.toggle('is-zoomed');
  });

  document.addEventListener('keydown', function (e) {
    if (el.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowLeft') { load(index - 1); return; }
    if (e.key === 'ArrowRight') { load(index + 1); return; }
    if (e.key === 'Tab') {
      var f = el.querySelectorAll('button:not(:disabled)');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Deslizar para cambiar de página (se ignora con zoom nativo o del visor)
  var x0 = null, y0 = 0;
  stage.addEventListener('touchstart', function (e) {
    x0 = e.touches.length === 1 ? e.touches[0].clientX : null;
    y0 = e.touches.length === 1 ? e.touches[0].clientY : 0;
  }, { passive: true });
  stage.addEventListener('touchend', function (e) {
    if (x0 === null || el.classList.contains('is-zoomed')) return;
    if (window.visualViewport && window.visualViewport.scale > 1.05) return;
    var dx = e.changedTouches[0].clientX - x0;
    var dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) load(index + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
