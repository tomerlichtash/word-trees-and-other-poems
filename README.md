# Word Trees and Other Poems
## Experiments in Visual Poetry, Web Publication and Text Visualisation

A free web book of nine visual poems, each drawn as an interactive [Google Charts word tree](https://developers.google.com/chart/interactive/docs/gallery/wordtree). Type any word from a poem into the box above its tree to re-root the tree on that word.

Live: https://wordtrees.tomerlichtash.com

---
### Run

No build, no dependencies. Open `index.html` in a browser, or serve the folder:

```
$ python3 -m http.server 8000
```

### Files

- `index.html` — shell, nav, page templates, inline icons
- `app.js` — hash router (`#/`, `#/toc`, `#/poem/N`, `#/end`, `#/random`) and word-tree drawing
- `poems.js` — the poems. Add one: append `{ title, lines }` to `POEMS`
- `assets/main.css` — compiled once from the original Sass, now hand-edited
- `404.html` — redirects old `/poemN/`, `/toc`, `/end` URLs to hash routes

Deployed by GitHub Pages from the repo root on `main`.

---
### Stack

* Google Charts (word tree)
* Google Fonts (Assistant, Gloria Hallelujah, Miriam Libre)
* Normalize CSS (baked into `main.css`)

---
### Icons

#### Simple Icons ([demo](https://simpleicons.org/), [repo](https://github.com/danleech/simple-icons), [license](https://github.com/danleech/simple-icons/blob/develop/LICENSE.md))

* Facebook
* Twitter
* Instagram
* LinkedIn
* Github

#### The Noun Project ([site](https://thenounproject.com/), [license](https://creativecommons.org/licenses/by/3.0/))

* [Random](https://thenounproject.com/search/?q=random&creator=32263&i=1030511) by [mikicon](https://thenounproject.com/mikicon/)
* [Document](https://thenounproject.com/term/document/83985/) by [Ayesha Rana](https://thenounproject.com/ayesha%20rana/)
* [Share](https://thenounproject.com/search/?q=share&creator=1971447&i=871485) by [Aya Sofya](https://thenounproject.com/ayasofya/)
* [Creative Commons](https://thenounproject.com/search/?q=creative%20commons&i=70967) by [Austin Condiff](https://thenounproject.com/acondiff/)
* [Files](https://thenounproject.com/search/?q=pages&i=1014541) &amp; [Info](https://thenounproject.com/search/?q=information&i=1014238) by [Genius Icons](https://thenounproject.com/rajappar29/)
* [Diary](https://thenounproject.com/search/?q=book&creator=1777682&i=621463) by [Karthik Srinivas](https://thenounproject.com/aathis/)
