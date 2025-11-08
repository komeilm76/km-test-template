# **KM-TEST_TEMPLATE**

Build comfortable For browser (support using inside: vite, vue, angular , react); build path: build/browser
Build comfortable For nodejs (support using inside: nodejs express , adonise , ... serverside packages); build path: build/serverJs
Build comfortable For bun,deno (support using inside: typescript server languages ); build path: build/serverTs. in this build i dont want js files , i want ts files in bundle
Build just types. build path: build/types. in this build i dont want js files , i want *.d.ts files.
I have a ./src/assets folder , after build , copy contents of this address inside build/assets. use tsup => publicDir option
entryPoints: ["./src/index.ts"];
im using bun.

with tsup create a tsup.config.ts comfortable with my description.
i dont want package.json. just make a tsup.config.ts exactly comfortable with my description.
write clean and write hints as comments above of every where needed , write everythings without skip somethings.
