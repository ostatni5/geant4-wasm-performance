source ../../../emsdk/emsdk_env.sh
emcc main.cpp -o index.html -pthread  -sALLOW_MEMORY_GROWTH -sPTHREAD_POOL_SIZE=2 -sPROXY_TO_PTHREAD \
    --preload-file 10@test.txt
