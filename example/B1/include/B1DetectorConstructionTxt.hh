// $Id$
//
/// \file B1DetectorConstructionTxt.hh
/// \brief Definition of the B1DetectorConstructionTxt class


#ifndef B1DetectorConstructionTxt_HH
#define B1DetectorConstructionTxt_HH

#include "globals.hh"
#include "G4VUserDetectorConstruction.hh"

class G4tgrMessenger;

/// Detector construction class using text geometry file

class B1DetectorConstructionTxt : public G4VUserDetectorConstruction
{
  public:

    B1DetectorConstructionTxt();
   ~B1DetectorConstructionTxt();

    G4VPhysicalVolume* Construct();

  private:

    G4tgrMessenger* fMessenger;
};

#endif
