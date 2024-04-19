def create_input(xBin, yBin, zBin, beamOn):
    return f"""
/process/em/verbose 0
/control/verbose 0
/run/verbose 0
/event/verbose 0
/tracking/verbose 0
/process/verbose 0

/run/printProgress -1

/score/create/boxMesh boxMesh
/score/mesh/boxSize 50. 50. 50. mm
/score/mesh/nBin {xBin} {yBin} {zBin}
/score/quantity/energyDeposit eDep

/score/close

/run/initialize

/gps/particle proton
/gps/energy 60 MeV
/gps/direction 0. 0. 1.
/gps/position 0. 0. -2 cm
/gps/pos/type Beam
/gps/pos/radius 0. mm
/gps/pos/sigma_x 1 mm
/gps/pos/sigma_y 1 mm
/gps/ang/type beam2d

/run/beamOn {beamOn}

/score/dumpQuantityToFile boxMesh eDep eDep.txt
"""


def save_input_file(content, folder):
    with open(f"{folder}exampleB1.in", "w") as f:
        f.write(content)
