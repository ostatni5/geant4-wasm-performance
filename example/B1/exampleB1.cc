#include "B1DetectorConstruction.hh"
#include "B1DetectorConstructionTxt.hh"
#include "B1ActionInitialization.hh"

#ifdef G4MULTITHREADED
#include "G4MTRunManager.hh"
#else
#include "G4RunManager.hh"
#endif
#include "G4ScoringManager.hh"

#include "G4UImanager.hh"
#include "QBBC.hh"

#include "G4VisExecutive.hh"
#include "G4UIExecutive.hh"

#include "Randomize.hh"

#ifdef __EMSCRIPTEN__
#include <emscripten/bind.h>
#include <emscripten.h>
#endif

#include <chrono>

#ifdef G4MULTITHREADED
G4MTRunManager *runManager;
#else
G4RunManager *runManager;
#endif

G4UImanager *UImanager;

void init(long seed, int nThreads = 1)
{
#ifdef __EMSCRIPTEN__
  EM_ASM(

      // const out = console.log;
      // FS.trackingDelegate['onOpenFile'] = function(path, flags) {
      //   out('Opened "' + path + '" with flags ' + flags);
      //   self.dependecyArray.add(path);
      // };

      // FS.trackingDelegate['onCloseFile'] = function(path) {
      //   out('Closed ' + path);
      // };

  );
#endif
  G4cout << "setTheEngine" << G4endl;
  // Choose the Random engine
  G4Random::setTheEngine(new CLHEP::RanecuEngine);

  // Seed the random number generator manually
  G4cout << "Initialising with seed: " << seed << G4endl;
  G4Random::setTheSeed(seed);
  G4cout << "Initialised seed: " << G4Random::getTheSeed() << G4endl;

  G4cout << "new runManager" << G4endl;
// Construct the default run manager
#ifdef G4MULTITHREADED
  runManager = new G4MTRunManager;
  runManager->SetNumberOfThreads(nThreads);
#else
  runManager = new G4RunManager;
#endif

  // Activate command-based scorer
  G4ScoringManager::GetScoringManager();

  G4cout << "SetUserInitialization" << G4endl;
  // Detector construction
  runManager->SetUserInitialization(new B1DetectorConstructionTxt());

  G4cout << "physicsList" << G4endl;
  // Physics list
  G4VModularPhysicsList *physicsList = new QBBC;
  physicsList->SetVerboseLevel(0);
  runManager->SetUserInitialization(physicsList);

  G4cout << "B1ActionInitialization" << G4endl;
  // User action initialization
  runManager->SetUserInitialization(new B1ActionInitialization());

  G4cout << "UImanager" << G4endl;
  // Get the pointer to the User Interface manager
  UImanager = G4UImanager::GetUIpointer();
}

void run(std::string name)
{

  G4cout << "ApplyCommand" << G4endl;
  // batch mode
  G4String command = "/control/execute ";
  G4String fileName = name;

#ifdef __EMSCRIPTEN__
  EM_ASM(
      console.time("Simulation run");
      self.startTime = performance.now(););
#endif

  auto t1 = std::chrono::high_resolution_clock::now();

  UImanager->ApplyCommand(command + fileName);

  auto t2 = std::chrono::high_resolution_clock::now();

  std::chrono::duration<double, std::milli> ms_double = t2 - t1;

  G4cout << ms_double.count() << "ms\n";

#ifdef __EMSCRIPTEN__
  EM_ASM(
      console.timeEnd("Simulation run");
      self.endTime = performance.now();
      self.fullTime = self.endTime - self.startTime;
      console.log(fullTime));
#endif

  // write time to file
  std::ofstream myfile;
  myfile.open("time.txt");
  myfile << ms_double.count();
  myfile.close();
}

void clear()
{
  // Job termination
  // Free the store: user actions, physics_list and detector_description are
  // owned and deleted by the run manager, so they should not be deleted
  // in the main() program !
  G4cout << "delte" << G4endl;
  delete runManager;
  G4cout << "runManager" << G4endl;
}

#ifndef __EMSCRIPTEN__
int main(int argc, char **argv)
{
  std::string name = argv[1] ? argv[1] : "exampleB1.in";
  long seed = argv[2] ? std::stol(argv[2]) : 1234;
  int nThreads = argv[3] ? std::stol(argv[3]) : 1;
  init(seed, nThreads);
  run(name);
  clear();
}
#endif

#ifdef __EMSCRIPTEN__
EMSCRIPTEN_BINDINGS(my_module)
{
  emscripten::function("init", &init);
  emscripten::function("run", &run);
  emscripten::function("clear", &clear);
}
#endif

//....oooOO0OOooo........oooOO0OOooo........oooOO0OOooo........oooOO0OOooo.....
