# Performance of Geant4 in WebAssembly 

Project for testing performance of Geant4 in WebAssembly. 

## Dependecies

Project tested on:
- Linux Ubuntu 20.04
- gcc 9.4.0 
- emscripten 3.1.28
- Geant 10.04.p03
- Python 3.8.10

## Scripts

Run scripts from root of repository

Downloads and installs `emscripten` and `Geant`:
```
buildGeant.sh
```

Builds test example:
```
buildExample.sh
```

Starts simple http server to host WebAssembly example:
```
hostExample.sh
```

