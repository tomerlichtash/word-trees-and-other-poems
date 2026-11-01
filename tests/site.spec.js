// Characterization tests: what the book must do regardless of how it is built.
// Run against Jekyll output:  SITE_DIR=docs npx playwright test
// Run against plain site:     MODE=hash npx playwright test
const { test, expect } = require('@playwright/test');

const HASH = process.env.MODE === 'hash';
const POEMS = [
  ['oriented', 20], ['such', 12], ['poem', 15], ['poem', 8], ['line', 9],
  ['object', 20], ['let', 7], ['line', 8], ['poem', 21],
];

// URL to open, and what an href pointing at a route must end with.
const go = {
  cover: '/',
  toc: HASH ? '/#/toc' : '/toc.html',
  end: HASH ? '/#/end' : '/end.html',
  poem: n => (HASH ? `/#/poem/${n}` : `/poem${n}/`),
};
const href = {
  cover: HASH ? /#\/$/ : /\.com\/?$/,
  toc: HASH ? /#\/toc$/ : /\/toc$/,
  end: HASH ? /#\/end$/ : /\/end$/,
  poem: n => (HASH ? new RegExp(`#/poem/${n}$`) : new RegExp(`/poem${n}/?$`)),
};

// Google Charts draws the root word with the largest font.
async function expectRoot(container, word) {
  const texts = container.locator('svg text');
  await expect(texts.first()).toBeVisible();
  const sizes = await texts.evaluateAll(els => els.map(t => [t.textContent, parseFloat(t.getAttribute('font-size') || t.style.fontSize || 0)]));
  const max = Math.max(...sizes.map(s => s[1]));
  expect(sizes.filter(s => s[1] === max).map(s => s[0])).toContain(word);
}

test('front cover', async ({ page }) => {
  await page.goto(go.cover);
  await expect(page).toHaveTitle('Word Trees and Other Poems / Tomer Lichtash');
  await expect(page.locator('.site-header .site-title')).toContainText('Word Trees');
  await expect(page.locator('.page.front-cover .header .author-name')).toHaveText('Tomer Lichtash');
  await expect(page.locator('#primary-nav .menu.left li[data-active=true]')).toHaveClass(/home/);
  await expect(page.locator('#primary-nav .menu.right .next a')).toHaveAttribute('href', href.toc);
  await expect(page.locator('#primary-nav .menu.right .prev')).toHaveCount(0);
  await expectRoot(page.locator('#front-cover-visual'), 'book');
});

test('table of contents', async ({ page }) => {
  await page.goto(go.toc);
  await expect(page).toHaveTitle('Word Trees / Table of Contents');
  await expect(page.locator('#primary-nav .menu.left li[data-active=true]')).toHaveClass(/toc/);
  const entries = page.locator('.page.toc .toc-entry a');
  await expect(entries).toHaveText(POEMS.map(p => p[0]));
  for (let i = 0; i < POEMS.length; i++) await expect(entries.nth(i)).toHaveAttribute('href', href.poem(i + 1));
  await expect(page.locator('#primary-nav .menu.right .prev a')).toHaveAttribute('href', href.cover);
  await expect(page.locator('#primary-nav .menu.right .next a')).toHaveAttribute('href', href.poem(1));
  await expect(page.locator('.page.moto blockquote')).toContainText('Word Tree');
});

for (const [i, [title, lineCount]] of POEMS.entries()) {
  const n = i + 1;
  test(`poem ${n}: ${title}`, async ({ page }) => {
    await page.goto(go.poem(n));
    await expect(page).toHaveTitle(`Word Trees / ${title}`);
    await expect(page.locator('.page.word-tree-poem .page-index')).toHaveText(String(n));
    await expect(page.locator('#word-tree-input')).toHaveValue(title);
    await expect(page.locator('.original-poem-text p')).toHaveCount(lineCount);
    await expect(page.locator('#primary-nav .page-index-preview .caption')).toContainText(`Page ${n}/9`);
    await expect(page.locator('#primary-nav .menu.right .prev a')).toHaveAttribute('href', n === 1 ? href.toc : href.poem(n - 1));
    await expect(page.locator('#primary-nav .menu.right .next a')).toHaveAttribute('href', n === 9 ? href.end : href.poem(n + 1));
    await expect(page.locator('.inner-page-nav-prev a')).toHaveAttribute('href', n === 1 ? href.toc : href.poem(n - 1));
    await expect(page.locator('.inner-page-nav-next a')).toHaveAttribute('href', n === 9 ? href.end : href.poem(n + 1));
    await expectRoot(page.locator('.word-tree'), title);
  });
}

test('typing a word re-roots the tree', async ({ page }) => {
  await page.goto(go.poem(1));
  await expectRoot(page.locator('.word-tree'), 'oriented');
  await page.locator('#word-tree-input').fill('poem');
  await page.locator('#word-tree-input').press('Enter');
  await page.locator('#word-tree-input').blur();
  await expect(async () => expectRoot(page.locator('.word-tree'), 'poem')).toPass();
});

test('back cover', async ({ page }) => {
  await page.goto(go.end);
  await expect(page).toHaveTitle('Word Trees / Back Cover');
  await expect(page.locator('#primary-nav .menu.left li[data-active=true]')).toHaveClass(/end/);
  await expect(page.locator('.page.back-cover .summary')).toContainText('No actual trees were harmed');
  await expect(page.locator('.author .name')).toHaveText('Tomer Lichtash');
  await expect(page.locator('.author .social a')).toHaveCount(5);
  await expect(page.locator('.barcode .serial')).toHaveText('3-14159265359');
  await expect(page.locator('#primary-nav .menu.right .prev a')).toHaveAttribute('href', href.poem(9));
  await expect(page.locator('#primary-nav .menu.right .next')).toHaveCount(0);
  await expect(page.locator('.inner-page-nav-prev a')).toHaveAttribute('href', href.poem(9));
});

test('random goes to a poem', async ({ page }) => {
  await page.goto(go.cover);
  if (HASH) {
    await page.locator('#primary-nav .random a').click();
    await expect(page).toHaveURL(/#\/poem\/[1-9]$/);
  } else {
    await expect(page.locator('#primary-nav .random a')).toHaveAttribute('href', /\/poem[1-9]$/);
  }
});

test('shared chrome on every page', async ({ page }) => {
  for (const url of [go.cover, go.toc, go.poem(5), go.end]) {
    await page.goto(url);
    await expect(page.locator('#primary-nav .menu.left li')).toHaveCount(4);
    await expect(page.locator('#social-bar .share-button a')).toHaveCount(2);
    await expect(page.locator('.footer .license-type a')).toHaveAttribute('href', /creativecommons/);
    await expect(page.locator('.footer .author-name a')).toHaveText('Tomer Lichtash');
  }
});

// Real clicks through the book. Jekyll output links to the production domain, so serve those from localhost.
test.describe('navigation by clicking', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.route('https://wordtrees.tomerlichtash.com/**', async route => {
      const local = route.request().url().replace('https://wordtrees.tomerlichtash.com', baseURL);
      const r = await page.request.get(local.replace(/\/(toc|end)$/, '/$1.html'));
      await route.fulfill({ status: r.status(), headers: { 'content-type': r.headers()['content-type'] || 'text/html' }, body: await r.body() });
    });
  });

  const isPoem = n => (HASH ? new RegExp(`#/poem/${n}$`) : new RegExp(`/poem${n}/?$`));

  test('Next walks cover → toc → poems 1-9 → end; Previous walks back', async ({ page }) => {
    await page.goto(go.cover);
    await page.locator('#primary-nav .menu.right .next a').click();
    await expect(page).toHaveTitle('Word Trees / Table of Contents');
    for (let n = 1; n <= 9; n++) {
      await page.locator('#primary-nav .menu.right .next a').click();
      await expect(page).toHaveURL(isPoem(n));
      await expect(page.locator('.page-index')).toHaveText(String(n));
    }
    await page.locator('#primary-nav .menu.right .next a').click();
    await expect(page).toHaveTitle('Word Trees / Back Cover');
    for (let n = 9; n >= 1; n--) {
      await page.locator('#primary-nav .menu.right .prev a').click();
      await expect(page).toHaveURL(isPoem(n));
    }
    await page.locator('#primary-nav .menu.right .prev a').click();
    await expect(page).toHaveTitle('Word Trees / Table of Contents');
    await page.locator('#primary-nav .menu.right .prev a').click();
    await expect(page).toHaveTitle('Word Trees and Other Poems / Tomer Lichtash');
  });

  test('side chevrons, TOC entries, top menu', async ({ page }) => {
    await page.goto(go.toc);
    await page.locator('.page.toc .toc-entry a').nth(4).click();
    await expect(page).toHaveURL(isPoem(5));
    await page.locator('.inner-page-nav-next a').click();
    await expect(page).toHaveURL(isPoem(6));
    await page.locator('.inner-page-nav-prev a').click();
    await expect(page).toHaveURL(isPoem(5));
    await page.locator('#primary-nav .menu.left .end a').click();
    await expect(page).toHaveTitle('Word Trees / Back Cover');
    await page.locator('#primary-nav .menu.left .toc a').click();
    await expect(page).toHaveTitle('Word Trees / Table of Contents');
    await page.locator('#primary-nav .menu.left .home a').click();
    await expect(page).toHaveTitle('Word Trees and Other Poems / Tomer Lichtash');
    await page.locator('.site-header .site-title a').click();
    await expect(page).toHaveTitle('Word Trees and Other Poems / Tomer Lichtash');
  });

  test('browser back and forward', async ({ page }) => {
    await page.goto(go.poem(2));
    await page.locator('#primary-nav .menu.right .next a').click();
    await expect(page).toHaveURL(isPoem(3));
    await page.goBack();
    await expect(page).toHaveURL(isPoem(2));
    await expect(page.locator('.page-index')).toHaveText('2');
    await page.goForward();
    await expect(page).toHaveURL(isPoem(3));
    await expect(page.locator('.page-index')).toHaveText('3');
  });
});
