# 🧱 km-test-template

A **universal TypeScript package starter** template — designed to build packages that work seamlessly in **Node.js server environments** and **browser-based applications** (via modern bundlers like Vite, Webpack, or Bun).

This template uses **TSUP** and **Bun** for ultra-fast TypeScript builds and generates multiple module formats (`.js`, `.cjs`, `.mjs`) with TypeScript definitions, ready for both **Node** and **browser** use.

---

## 🚀 Features

- ✅ **Full TypeScript support** — automatic `.d.ts` generation  
- ✅ **Multiple build targets**  
  - `build/js/` → universal JavaScript (`.js`)  
  - `build/cjs/` → CommonJS (`.cjs`) for Node  
  - `build/esm/` → ES Module (`.mjs`) for browsers & modern Node  
- ✅ **Asset management** — copy static files from `src/assets` to `build/assets`  
- ✅ **Ready for Bun, Node, and Browser**  
- ✅ **Preconfigured build & publish scripts**  
- ✅ **Release automation** using `release-it`  
- ✅ **Prettier formatting ready**
 
---

## 📦 Installation

You can use this template as a base for creating new npm packages.

```bash
git clone https://github.com/komeilm76/km-test-template.git
cd km-test-template
bun install
