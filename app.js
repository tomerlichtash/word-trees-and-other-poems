// Hash router + Google Charts word tree. Routes: #/  #/toc  #/poem/N  #/end  #/random
const SITE = 'Word Trees';
const chartsReady = google.charts.load('current', { packages: ['wordtree'] });

function drawWordTree(el, word, lines, maxFontSize, color) {
  const rows = [['childLabel', 'size', { role: 'style' }]].concat(lines.map(l => [l, 10, color]));
  chartsReady.then(() => {
    new google.visualization.WordTree(el).draw(google.visualization.arrayToDataTable(rows), {
      backgroundColor: '#fff',
      maxFontSize,
      fontName: 'Miriam Libre',
      wordtree: { format: 'implicit', type: 'double', word }
    });
  });
}

function tpl(id) {
  return document.getElementById(id).content.cloneNode(true);
}

// Top-right Previous / Next links, plus "Page N/9" badge on poems.
function menuRight(prev, next, poem, n) {
  let h = '';
  if (poem) h += `<li class="page-index-preview" data-active="true"><a href="#/poem/${n}" title="Page ${n}/${POEMS.length} — ${poem.title}"><div class="icon page">${document.getElementById('tpl-page-icon').innerHTML}</div><span class="caption">Page ${n}/${POEMS.length} — <strong>${poem.title}</strong></span></a></li>`;
  if (prev) h += `<li class="prev"><a href="${prev}">Previous</a></li>`;
  if (next) h += `<li class="next"><a href="${next}">Next</a></li>`;
  document.getElementById('menu-right').innerHTML = h;
}

function render() {
  const path = location.hash.replace(/^#/, '') || '/';
  const view = document.getElementById('view');
  const m = path.match(/^\/poem\/(\d+)$/);
  let route = path, title = SITE + ' and Other Poems / Tomer Lichtash', frag;

  if (path === '/random') {
    location.replace('#/poem/' + (1 + Math.floor(Math.random() * POEMS.length)));
    return;
  }
  if (m && POEMS[m[1] - 1]) {
    const n = Number(m[1]), poem = POEMS[n - 1];
    frag = tpl('tpl-poem');
    frag.querySelector('[data-slot=order]').textContent = n;
    frag.querySelector('[data-slot=text]').innerHTML = (poem.text || poem.lines).map(l => `<p>${l}</p>`).join('');
    frag.querySelector('[data-nav=prev]').href = n === 1 ? '#/toc' : `#/poem/${n - 1}`;
    frag.querySelector('[data-nav=next]').href = n === POEMS.length ? '#/end' : `#/poem/${n + 1}`;
    const input = frag.getElementById('word-tree-input');
    input.value = poem.title;
    const tree = frag.getElementById('word-tree');
    input.addEventListener('change', () => drawWordTree(tree, (input.value || poem.title).toLowerCase(), poem.lines, 15, '#064aef'));
    drawWordTree(tree, poem.title, poem.lines, 15, '#064aef');
    menuRight(n === 1 ? '#/toc' : `#/poem/${n - 1}`, n === POEMS.length ? '#/end' : `#/poem/${n + 1}`, poem, n);
    title = `${SITE} / ${poem.title}`;
    route = '/poem';
  } else if (path === '/toc') {
    frag = tpl('tpl-toc');
    frag.getElementById('toc-list').innerHTML = POEMS.map((p, i) => `<li class="toc-entry"><a href="#/poem/${i + 1}">${p.title}</a></li>`).join('');
    menuRight('#/', '#/poem/1');
    title = `${SITE} / Table of Contents`;
  } else if (path === '/end') {
    frag = tpl('tpl-end');
    menuRight(`#/poem/${POEMS.length}`, null);
    title = `${SITE} / Back Cover`;
  } else {
    frag = tpl('tpl-cover');
    drawWordTree(frag.getElementById('front-cover-visual'), COVER.word, COVER.lines, 24, '#5d87ec');
    menuRight(null, '#/toc');
    route = '/';
  }

  view.replaceChildren(frag);
  document.title = title;
  document.querySelectorAll('#primary-nav .menu.left li').forEach(li => li.dataset.route === route ? li.setAttribute('data-active', 'true') : li.removeAttribute('data-active'));
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
