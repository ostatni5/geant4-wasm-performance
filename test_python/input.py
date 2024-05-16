def create_input(xBin=1, yBin=1, zBin=1, beamOn=1, particle="proton"):
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

/gps/particle {particle}
/gps/energy 60 MeV
/gps/direction 0. 0. 1.
/gps/position 0. 0. -2 cm
/gps/pos/type Beam
/gps/pos/radius 0.5 cm
/gps/pos/sigma_x 0.5 cm
/gps/pos/sigma_y 0.5 cm
/gps/ang/type beam2d

/run/beamOn {beamOn}

/score/dumpQuantityToFile boxMesh eDep eDep.txt
"""


def save_input_file(content, folder):
    with open(f"{folder}exampleB1.in", "w") as f:
        f.write(content)
