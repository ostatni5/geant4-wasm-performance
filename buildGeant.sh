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

cd ..


# constant variables
GEANT4_COMPILE_PARAMS="-DCMAKE_INSTALL_PREFIX=../install \
        -DGEANT4_USE_SYSTEM_EXPAT=OFF \
        -DBUILD_STATIC_LIBS=ON \
        -DGEANT4_BUILD_STORE_TRAJECTORY=OFF \
        -DBUILD_SHARED_LIBS=OFF \
        -DGEANT4_INSTALL_DATA=ON ../../../source/geant4.10.04.p03"
 # $1 - download flag default true
DOWNLOAD=${1:-true}
# functions

# function for getting geant4
# $1 - url
function get_geant4 {

    # create catalog if it doesn't exist
    mkdir -p ./source
    cd ./source

    # get geant
    wget -c $1 -O - | tar -xz

    cd ..
}

# function for building geant4
# $1 - build type
# $2 - compiler
function compile_geant4 {

    # create catalog if it doesn't exist
    mkdir -p ./$1
    cd ./$1

    # create catalog for build and install
    rm -rf ./geant4.10.04.p03/build/* ./geant4.10.04.p03/install/*
    mkdir -p ./geant4.10.04.p03 ./geant4.10.04.p03/build ./geant4.10.04.p03/install

    # go to build catalog
    cd geant4.10.04.p03/build/

    # check if compiler is cmake or emcmake
    if [ $2 = "cmake" ]; then
        cmake ${GEANT4_COMPILE_PARAMS}

        # run make
        make -j
        make install
    elif [ $2 = "emcmake" ]; then
        emcmake cmake ${GEANT4_COMPILE_PARAMS}
        
        # run make
        emmake make -j
        emmake make install
    fi  
    
    cd ../../../
}

mkdir -p ./geant4
cd ./geant4

get geant
if [ $DOWNLOAD = true ]; then
    get_geant4 "https://geant4-data.web.cern.ch/releases/geant4.10.04.p03.tar.gz"
fi

# native
compile_geant4 "native" "cmake"

# wasm
compile_geant4 "wasm" "emcmake"

cd ..