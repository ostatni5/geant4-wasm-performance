// $Id$
//
/// \file B1DetectorConstructionTxt.cc
/// \brief Implementation of the B1DetectorConstructionTxt class

#include "G4tgbVolumeMgr.hh"
#include "B1DetectorConstructionTxt.hh"
#include "G4tgrMessenger.hh"

//....oooOO0OOooo........oooOO0OOooo........oooOO0OOooo........oooOO0OOooo......
B1DetectorConstructionTxt::B1DetectorConstructionTxt()
{ 
  fMessenger = new G4tgrMessenger;
}

//....oooOO0OOooo........oooOO0OOooo........oooOO0OOooo........oooOO0OOooo......
B1DetectorConstructionTxt::~B1DetectorConstructionTxt()
{
  delete fMessenger;
}

//....oooOO0OOooo........oooOO0OOooo........oooOO0OOooo........oooOO0OOooo......
G4VPhysicalVolume* B1DetectorConstructionTxt::Construct()
{
  //------------------------------------------------ 
  // Define one or several text files containing the geometry description
  //------------------------------------------------ 
  G4String filename = "g4geom.txt";
  G4tgbVolumeMgr* volmgr = G4tgbVolumeMgr::GetInstance();
  volmgr->AddTextFile(filename);

  //------------------------------------------------ 
  // Read the text files and construct the GEANT4 geometry
  //------------------------------------------------ 
  G4VPhysicalVolume* physiWorld = volmgr->ReadAndConstructDetector();

  return physiWorld;
}
