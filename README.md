# 🧩 km-test-template — Universal TypeScript Package Template

A **complete TypeScript package template** designed for building packages that run seamlessly across **Node.js**, **Bun**, and **modern browsers**.  
This template outputs **CJS**, **ESM**, **plain JS**, and **TypeScript types**, and is fully compatible with tools like **Vite**, **Webpack**, and **Bun**.

Built with:
- ⚙️ **TypeScript** — for strong typing and developer productivity  
- 📦 **tsup** — for fast, zero-config bundling  
- 🚀 **Bun** — for blazing-fast local builds and dev runtime

## 📦 Features

- ✅ Supports **CommonJS (CJS)**, **ES Modules (ESM)**, and **plain JS** builds  
- ✅ Includes **type declarations (.d.ts)** for all formats  
- ✅ Works in **Node.js**, **Browser**, and **Bun**  
- ✅ Auto build scripts (`bun run build`)  
- ✅ Clean **exports map** with correct order (no warnings)  
- ✅ Ready for **NPM publishing**

---

## 📁 Repository Structure

Here’s the **exact structure** of your repository:

```
km-test-template
 ┣ build
 ┃ ┣ cjs
 ┃ ┃ ┣ index.cjs          # CommonJS build output for Node (require)
 ┃ ┃ ┣ index.cjs.map      # Source map for CJS build (debugging support)
 ┃ ┃ ┗ index.d.ts         # Type declarations for CJS
 ┃ ┣ esm
 ┃ ┃ ┣ index.d.mts        # Type declarations for ESM (.mjs)
 ┃ ┃ ┣ index.mjs          # ES Module build output (modern JS import/export)
 ┃ ┃ ┗ index.mjs.map      # Source map for ESM build
 ┃ ┣ js
 ┃ ┃ ┣ index.d.mts        # Type declarations for JS fallback build
 ┃ ┃ ┣ index.js           # Universal plain JS build (used as fallback / default)
 ┃ ┃ ┗ index.js.map       # Source map for JS build
 ┃ ┗ types
 ┃ ┃ ┣ lib
 ┃ ┃ ┃ ┣ example
 ┃ ┃ ┃ ┃ ┗ index.d.ts     # Type declarations for src/lib/example/
 ┃ ┃ ┃ ┗ index.d.ts       # Type declarations for src/lib/
 ┃ ┃ ┗ index.d.ts         # Root type declarations entry
 ┣ src
 ┃ ┣ assets
 ┃ ┃ ┣ images
 ┃ ┃ ┃ ┗ logo.svg         # Example asset (nested image)
 ┃ ┃ ┗ logo.svg           # Direct asset (root-level logo)
 ┃ ┣ lib
 ┃ ┃ ┣ example
 ┃ ┃ ┃ ┗ index.ts         # Example library module (TypeScript source)
 ┃ ┃ ┗ index.ts           # Library entry module
 ┃ ┗ index.ts              # Main entry point (exported as package root)
 ┣ .gitignore              # Git ignored files and folders
 ┣ .prettierrc             # Prettier code formatting config
 ┣ .release-it.json        # Automated versioning and release config
 ┣ bun.lock                # Bun package manager lockfile
 ┣ LICENSE                 # MIT License file
 ┣ package-lock.json       # NPM lockfile (if used)
 ┣ package.example.json    # Example config reference for package setup
 ┣ package.json            # Main project metadata and exports configuration
 ┣ README.md               # Project documentation
 ┣ tsconfig.json           # TypeScript compiler options
 ┗ tsup.config.ts          # TSUP build configuration
```

---

## 🧱 The `exports` Section Explained

The `"exports"` field in `package.json` defines **which files are exposed** and **how different environments resolve them**.

Your configuration:

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

## 🔢 Priority and Meaning of `"."` Entry Conditions

The `"."` entry defines the **main package entry point**, and the order determines which file is used by different environments.  
Below is the priority and behavior explained in detail:

### **1️⃣ bun**
- Used only when running in the **Bun runtime**.
- Points directly to your **TypeScript source file** (`./src/index.ts`).
- Ideal for development since Bun supports native TypeScript.
- **Usage:**
  ```ts
  import myLib from "km-test-template";
  // Bun will load src/index.ts directly
  ```

### **2️⃣ node**
- Used when executing inside **Node.js runtime**.
- Points to the **JS build** in `build/js/index.js`.
- Helps Node or bundlers identify the best JavaScript file for universal runtime usage.
- **Usage:**
  ```js
  import myLib from "km-test-template";
  // Loads build/js/index.js under Node
  ```

### **3️⃣ types**
- Used by **TypeScript and editors** to find `.d.ts` type definitions.
- Always points to `./build/types/index.d.ts`.
- Ensures autocompletion, linting, and type checking works everywhere.
- **Used automatically** — no import required.

### **4️⃣ require**
- Used when your package is imported via **CommonJS (require)** syntax.
- Points to the compiled `.cjs` version in `build/cjs/index.cjs`.
- Enables compatibility with older Node.js modules or tools.
- **Usage:**
  ```js
  const myLib = require("km-test-template");
  ```

### **5️⃣ import**
- Used for **ES Module (ESM)** imports with the `import` keyword.
- Points to `build/esm/index.mjs`, a modern ESM build.
- **Usage:**
  ```js
  import myLib from "km-test-template";
  ```

### **6️⃣ default**
- Fallback option used when the environment doesn’t match any of the above.
- Points again to `build/js/index.js` (universal JS build).
- Acts as the last safety net for any runtime or bundler.

---

## 🧠 Why Order Matters

Node.js resolves conditions **top-to-bottom**.  
If `"types"` or `"default"` are placed after `"import"` or `"require"`, Node will **ignore them** and emit warnings like:

```
[WARNING] The condition "types" here will never be used as it comes after "default"
```

✅ Your current order is perfectly correct and warning-free:

```
1. bun
2. node
3. types
4. require
5. import
6. default
```

This ensures:
- **Types are correctly read**
- **No warning messages appear**
- **Each environment (Node, Bun, Browser) picks the correct format**

---

## 🏗️ Build Outputs Overview

Your build creates multiple formats for full compatibility:

| Folder | Format | Extension | Target Environment | Notes |
|--------|---------|------------|--------------------|-------|
| `/build/js/` | Plain JavaScript | `.js` | Browser & Node | Universal fallback |
| `/build/esm/` | ES Module | `.mjs` | Modern Browser, ESM Node | For `import` syntax |
| `/build/cjs/` | CommonJS | `.cjs` | Node.js legacy | For `require()` syntax |
| `/build/types/` | Type Declarations | `.d.ts` | TypeScript & IDEs | Used automatically |

---

## 🧩 Example Imports

### **CommonJS (Node.js)**

```js
const myLib = require("km-test-template");
```

### **ESM (Node.js or Browser)**

```js
import myLib from "km-test-template";
```

### **Bun (TypeScript)**

```ts
import myLib from "km-test-template";
// Loads TypeScript source directly
```

### **Explicit Entry Imports**

```js
import myLibCJS from "km-test-template/cjs";
import myLibESM from "km-test-template/esm";
import myLibJS from "km-test-template/js";
```

---

## ⚙️ Build Commands

| Command | Description |
|----------|--------------|
| `bun run dev` | Runs in watch mode using Bun |
| `bun run build:types` | Generates `.d.ts` type declarations |
| `bun run build:tsup` | Builds all formats via `tsup` |
| `bun run build` | Runs both TypeScript + tsup builds |
| `bun run publish-directly` | Publishes directly to npm |
| `bun run auto-release` | Formats, builds, and releases automatically |

---

## 🧾 Publishing Notes

- Run `bun run build` before `npm publish`  
- Only `/build`, `/src`, `LICENSE`, and `README.md` are included in the npm package (defined in `"files"`)
- `"exports"` ensures compatibility with Node 18+, Bun, and modern bundlers

---

## 📖 License

**MIT License** © 2025 — Created by **Komeil Mohammadian**

---

### ✅ Summary

- The `exports` map ensures **maximum runtime compatibility**
- The order eliminates **Node warnings**
- All build outputs are **typed and mapped**
- Works across **Node, Bun, Browser, and build tools**

---

**Enjoy your clean, professional, and universal TypeScript package template 🚀**
