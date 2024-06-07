emcc main.cpp -o index.html -O3 \
    -sENVIRONMENT=web,worker \
    -sALLOW_MEMORY_GROWTH \
    -sGL_SUPPORT_AUTOMATIC_ENABLE_EXTENSIONS=0 \
    -sGL_SUPPORT_SIMPLE_ENABLE_EXTENSIONS=0 \
    -sMINIMAL_RUNTIME_STREAMING_WASM_INSTANTIATION=1 \
    -sERROR_ON_UNDEFINED_SYMBOLS=0 \
    --memoryprofiler \

# arch -x86_64 g++ main.cpp -o build/index -O3 -std=c++11
# psrecord ./build/index --log a.log --plot a.png >> /dev/null
