#!/bin/bash
# get emscripten
# Get the emsdk repo
git clone https://github.com/emscripten-core/emsdk.git

# Enter that directory
cd emsdk

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes .emscripten file)
./emsdk activate latest

# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh

cd ../


# get geant
cd ./geant4/source
wget -c https://geant4-data.web.cern.ch/releases/geant4.10.04.p03.tar.gz -O - | tar -xz
# native
cd ../native
rm -rf ./geant4.10.04.p03-build/* ./geant4.10.04.p03-install/*
mkdir -p ./geant4.10.04.p03-build ./geant4.10.04.p03-install

cd geant4.10.04.p03-build/

cmake -DCMAKE_INSTALL_PREFIX=../geant4.10.04.p03-install \
    -DGEANT4_USE_SYSTEM_EXPAT=OFF \
    -DBUILD_STATIC_LIBS=ON \
    -DGEANT4_BUILD_STORE_TRAJECTORY=OFF \
    -DBUILD_SHARED_LIBS=OFF \
    -DGEANT4_INSTALL_DATA=ON ../../source/geant4.10.04.p03

make -j
make install

# wasm
cd ../wasm
rm -rf ./geant4.10.04.p03-build/* ./geant4.10.04.p03-install/*
mkdir -p ./geant4.10.04.p03-build ./geant4.10.04.p03-install

cd geant4.10.04.p03-build/

emcmake cmake -DCMAKE_INSTALL_PREFIX=../geant4.10.04.p03-install \
    -DGEANT4_USE_SYSTEM_EXPAT=OFF \
    -DBUILD_STATIC_LIBS=ON \
    -DGEANT4_BUILD_STORE_TRAJECTORY=OFF \
    -DBUILD_SHARED_LIBS=OFF \
    -DGEANT4_INSTALL_DATA=ON ../../source/geant4.10.04.p03

emmake make -j
emmake make install

