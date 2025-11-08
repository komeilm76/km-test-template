# 🧩 km-test-template

A **universal TypeScript package template** designed for building libraries that work seamlessly across **Node.js**, **Bun**, and **Browser** environments.  
It supports **CJS**, **ESM**, and **plain JS** outputs — built using [`tsup`](https://github.com/egoist/tsup) and [`TypeScript`](https://www.typescriptlang.org/).

---

## 📦 Features

- ✅ Supports **CommonJS (CJS)**, **ES Modules (ESM)**, and **plain JS** builds  
- ✅ Includes **type declarations (.d.ts)** for all formats  
- ✅ Works in **Node.js**, **Browser**, and **Bun**  
- ✅ Auto build scripts (`bun run build`)  
- ✅ Clean **exports map** with correct order (no warnings)  
- ✅ Ready for **NPM publishing**

---

## 📂 Directory Structure

```
├── src/
│   ├── index.ts              # Main source file
│   └── assets/               # Static assets
│
├── build/
│   ├── js/                   # Plain JS (default)
│   ├── esm/                  # ESM output (.mjs)
│   ├── cjs/                  # CommonJS output (.cjs)
│   └── types/                # TypeScript declarations
│
├── package.json
└── tsup.config.ts
```

---

## 🚀 Usage

### **1️⃣ Node.js (require syntax)**

```js
// CommonJS import
const myLib = require("km-test-template");
```

or directly:

```js
const myLib = require("km-test-template/cjs");
```

---

### **2️⃣ Node.js or Browser with ES Modules**

```js
// ESM import
import myLib from "km-test-template";
```

or explicitly from the ESM entry:

```js
import myLib from "km-test-template/esm";
```

---

### **3️⃣ Bun Runtime**

```ts
// Bun supports TypeScript directly
import myLib from "km-test-template";
```

Or even import the source directly for fast dev:

```ts
import myLib from "km-test-template/src/index.ts";
```

---

## 🧱 Exports Configuration Explained

This package uses a detailed `"exports"` map to make it compatible with multiple runtimes and tools.  
Here’s the exact structure (from your `package.json`):

```jsonc
"exports": {
  ".": {
    "bun": "./src/index.ts",
    "node": "./build/js/index.js",
    "types": "./build/types/index.d.ts",
    "require": "./build/cjs/index.cjs",
    "import": "./build/esm/index.mjs",
    "default": "./build/js/index.js"
  },
  "./esm": {
    "types": "./build/esm/index.d.mts",
    "import": "./build/esm/index.mjs"
  },
  "./js": {
    "types": "./build/js/index.d.mts",
    "default": "./build/js/index.js"
  },
  "./cjs": {
    "types": "./build/cjs/index.d.ts",
    "require": "./build/cjs/index.cjs"
  },
  "./assets/*": "./src/assets/*"
}
```

---

### 🧠 How Exports Ordering Works

> **Important:** Order in the `exports` object **matters** — Node reads conditions **top-down**.

- `"types"` must always come **before** runtime conditions like `"import"`, `"require"`, or `"default"`.  
  Otherwise, you’ll see this warning:
  ```
  The condition "types" here will never be used as it comes after "default"
  ```
- `"require"` → used when importing via `require()` (CommonJS)
- `"import"` → used when importing via `import` (ESM)
- `"default"` → fallback if runtime cannot determine the type
- `"bun"` → Bun runtime directly uses this field for optimized dev imports
- `"node"` → Node-specific optimized fallback

Correct order example (used in this package):

```jsonc
{
  "types": "./build/types/index.d.ts",
  "require": "./build/cjs/index.cjs",
  "import": "./build/esm/index.mjs",
  "default": "./build/js/index.js"
}
```

✅ This order **prevents all warnings** from Node, Bun, and `tsup`.

---

## 🏗️ Build Commands

| Command | Description |
|----------|--------------|
| `bun run dev` | Run source directly (watch mode) |
| `bun run build:types` | Generate `.d.ts` files using TypeScript |
| `bun run build:tsup` | Build all JS/ESM/CJS outputs using tsup |
| `bun run build` | Clean full build (types + bundles) |
| `bun run auto-release` | Format, build, and release automatically |
| `bun run publish-directly` | Publish package directly to npm (public) |

---

## ⚙️ TSUP Config Overview

> You can find your `tsup.config.ts` file in the project root.

This configuration builds **three separate outputs**:

- `build/js` → for browser and Node (plain `.js`)
- `build/esm` → modern ES module `.mjs`
- `build/cjs` → Node/CommonJS `.cjs`
- `build/types` → Type definitions `.d.ts`

It also has a **separate copy-assets config** that moves static files from `src/assets` → `build/assets`.

---

## 🌎 Compatibility Matrix

| Environment | Format | Entry Path | Description |
|--------------|---------|-------------|--------------|
| Node.js | `.cjs` | `km-test-template/cjs` | CommonJS format |
| Browser (ESM) | `.mjs` | `km-test-template/esm` | ES Module format |
| Bun | `.ts` | `km-test-template/src` | Uses Bun’s TS support |
| Any (fallback) | `.js` | `km-test-template/js` | Universal JS build |

---

## 🪶 Publishing Notes

- Always run `bun run build` before publishing  
- All build artifacts go to `build/`  
- The `"files"` field ensures only clean builds are published  
- Versioning and releasing handled via [`release-it`](https://github.com/release-it/release-it)

---

## 🧩 Example Import (Multi-Format Test)

```js
// ✅ Node.js (CommonJS)
const { myFunction } = require("km-test-template");

// ✅ Node.js (ESM)
import { myFunction } from "km-test-template";

// ✅ Bun (direct TypeScript import)
import { myFunction } from "km-test-template/src/index.ts";

// ✅ Browser
import { myFunction } from "km-test-template/esm/index.mjs";
```

---

## 📖 License

**MIT License** © 2025 — Created by **Komeil Mohammadian**

---

## 💡 Notes

- The package is tested to build and run **without warnings**.
- The exports map follows **Node’s conditional exports spec**.
- Type declarations are resolved automatically by TypeScript.

---

**Enjoy your clean, warning-free universal package template! 🚀**
