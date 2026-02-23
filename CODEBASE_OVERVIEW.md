# Codebase Overview

This repository contains a lightweight browser-side templating library distributed under two public APIs:

- `weblate` (legacy API)
- `jlate`/`jl` (newer API and package identity)

## Layout

- `jlate/JLate.js`: primary readable source for the `jlate` API.
- `jlate/weblate.js`: parallel API that exposes the older `weblate` namespace.
- `jlate/*.min.js`: minified build artifacts for browser consumption.
- `test_project/`: manual playground showcasing templating, dropdown rendering, custom tags, URL helpers, and currency formatting.
- `README.md`: quick install and usage snippets.

## Runtime model

Both APIs follow the same runtime flow:

1. Select DOM nodes with a CSS selector (`jlate(selector)` / `weblate(selector)` / `$$`).
2. Call `.jlate(data)` or `.weblate(data)` (or `.on("jlate"|"weblate", data, cb)`).
3. The library inspects each matched node's `type` attribute:
   - `template`: fetch template file from `src` and render with Lodash `_.template`.
   - `select`: transform placeholder element into a native `<select>` with generated `<option>` nodes.
4. Optional helpers are available for custom tags (`*.import(...)`), URL query parsing (`*.url.searchKey(...)`), simple DOM utilities (`hide`, `attr`), and number string formatting (`toCurrency` prototype extension).

## Notable design characteristics

- Browser-only implementation (uses `document`, `fetch`, DOM mutation APIs directly).
- Lodash is a hard dependency at runtime (template compilation and collection iteration).
- No explicit build/test automation in `package.json`.
- Large behavior overlap between `weblate.js` and `JLate.js`, suggesting the newer file evolved from the older one.

## Differences between `weblate` and `jlate`

While mostly equivalent, there are subtle rendering differences:

- In `weblate`, template and custom-tag expansion replaces host nodes (`afterend` + `remove`).
- In `jlate`, main template rendering and custom-tag expansion insert content inside existing nodes (`beforeend` / `innerHTML = ""` pattern), preserving the host element.

These differences can affect CSS selectors, event delegation, and expected DOM structure in consumer apps.
