

source ./geant4/native-multithread/geant4.10.04.p03/install/bin/geant4.sh 

source ./.venv/bin/activate

cd ./test_python

python3 test.py --verbose true --test "firefox"

# chromium native
