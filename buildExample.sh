cd ./example/B1

build_native () {
    rm -rf ./build/native/*
    mkdir -p ./build/native 

    cd ./build/native

    source ../../../../geant4/native/geant4.10.04.p03/install/bin/geant4.sh 
    cmake -DGeant4_DIR=../../../../geant4/native/geant4.10.04.p03/install/lib/Geant4-10.4.3 -DCMAKE_INSTALL_PREFIX=./install ../../
    make -j

    cd ../../
}

build_native_multithread () {
    rm -rf ./build/native-multithread/*
    mkdir -p ./build/native-multithread 

    cd ./build/native-multithread

    source ../../../../geant4/native-multithread/geant4.10.04.p03/install/bin/geant4.sh 
    cmake -DGeant4_DIR=../../../../geant4/native-multithread/geant4.10.04.p03/install/lib/Geant4-10.4.3 -DCMAKE_INSTALL_PREFIX=./install -DGEANT4_BUILD_MULTITHREADED=ON ../../
    make -j

    cd ../../
}

build_wasm () {
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

build_native & 
build_wasm & 
build_native_multithread &
wait

cd ../../
