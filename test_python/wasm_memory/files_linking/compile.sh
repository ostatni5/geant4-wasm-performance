emcc main.cpp -o index.html --proxy-to-worker -sALLOW_MEMORY_GROWTH --preload-file ../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4ENSDFSTATE2.2@/data/G4ENSDFSTATE2.2 \
    --preload-file ../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/PhotonEvaporation5.2@/data/PhotonEvaporation5.2 \
    --preload-file ../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4EMLOW7.3/brem_SB@/data/G4EMLOW7.3/brem_SB \
    --preload-file ../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4EMLOW7.3/livermore/phot_epics2014@/data/G4EMLOW7.3/livermore/phot_epics2014 \
    --preload-file ../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4EMLOW7.3/livermore/rayl@/data/G4EMLOW7.3/livermore/rayl \
    --preload-file ../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4SAIDDATA1.1@/data/G4SAIDDATA1.1 \
    --preload-file ../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4NEUTRONXS1.4@/data/G4NEUTRONXS1.4
