emcc main.cpp -o build/index.js -O3 \
    -sMODULARIZE=1 \
    -sEXPORT_NAME="createModule" \
    -sENVIRONMENT=web \
    -sMINIMAL_RUNTIME=2 \
    -sEXPORT_KEEPALIVE=1 \
    -sALLOW_MEMORY_GROWTH \
    -sGL_SUPPORT_AUTOMATIC_ENABLE_EXTENSIONS=0 \
    -sGL_SUPPORT_SIMPLE_ENABLE_EXTENSIONS=0 \
    -sMINIMAL_RUNTIME_STREAMING_WASM_INSTANTIATION=1 \
    -sERROR_ON_UNDEFINED_SYMBOLS=0 \
    -sINVOKE_RUN=0 \

arch -x86_64 g++ main.cpp -o build/index -O3 -std=c++11
# psrecord ./build/index --log a.log --plot a.png >> /dev/null
