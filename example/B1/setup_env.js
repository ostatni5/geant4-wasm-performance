Module.arguments = ['exampleB1.in'];
Module.preRun.push(function () {
    ENV.G4LEDATA = '/data/G4EMLOW7.3';
    ENV.G4LEVELGAMMADATA = '/data/PhotonEvaporation5.2';
    ENV.G4NEUTRONXSDATA = '/data/G4NEUTRONXS1.4';
    ENV.G4ENSDFSTATEDATA = '/data/G4ENSDFSTATE2.2';
    ENV.G4SAIDXSDATA = '/data/G4SAIDDATA1.1';
});