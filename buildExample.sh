cd ./example/B1
MODE=${1:-"both"}
NATIVE=false
WASM=false
echo "Build mode: $MODE"
if [ "$MODE" = "native" ] || [ "$MODE" = "both" ]; then
    NATIVE=true
fi
if [ "$MODE" = "wasm" ] || [ "$MODE" = "both" ]; then
    WASM=true
fi


function build_native {

    # delete old compilaton
    rm -rf ./build/native/*
    mkdir -p ./build/native 
    
    cd ./build/native

    source ../../../../geant4/native/geant4.10.04.p03/install/bin/geant4.sh 
    cmake -DGeant4_DIR=../../../../geant4/native/geant4.10.04.p03/install/lib/Geant4-10.4.3 ../../
    make -j

    cd ../../
}

function build_wasm {

    # delete old compilaton
    rm -rf ./build/wasm/*
    mkdir -p ./build/wasm 

    cd ./build/wasm

    Geant4_DIR=../../../../geant4/wasm/geant4.10.04.p03/install/lib/Geant4-10.4.3
    Geant4_DIR_ABS="$(dirname $(readlink -e $Geant4_DIR))/$(basename $Geant4_DIR)"

    source ../../../../emsdk/emsdk_env.sh
    source ../../../../geant4/wasm/geant4.10.04.p03/install/bin/geant4.sh
    emcmake cmake -DGeant4_DIR=$Geant4_DIR_ABS ../../
    emmake make -j

    cd ../../
}

if [ $NATIVE = true ]; then
    build_native
fi

if [ $WASM = true ]; then
    build_wasm
fi

cd ../../

