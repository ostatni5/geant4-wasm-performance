# Performance of Geant4 in WebAssembly

Project for testing performance of Geant4 compiled to WebAssembly.

Output of simulation in browser is displayed in console.

## Scripts

Run scripts from  the root of repository.

Downloads and installs `emscripten` and `Geant`:

```sh
buildGeant.sh
```

Builds test example:

```sh
buildExample.sh
```

Starts simple http server to host WebAssembly example:

```sh
hostExample.sh
```

Navigate to `http://127.0.0.1:5500/example/web/shell_minimal_worker.html`.

## Dependencies

Project tested on:

- Linux Ubuntu 20.04
- gcc 9.4.0
- emscripten 3.1.28
- Geant 10.04.p03
- Python 3.8.10
