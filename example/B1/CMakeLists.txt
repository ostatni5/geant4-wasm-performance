# $Id$

#----------------------------------------------------------------------------
# Setup the project
cmake_minimum_required(VERSION 2.6 FATAL_ERROR)
project(B1)

#----------------------------------------------------------------------------
# Find Geant4 package, activating all available UI and Vis drivers by default
# You can set WITH_GEANT4_UIVIS to OFF via the command line or ccmake/cmake-gui
# to build a batch mode only executable
#
option(WITH_GEANT4_UIVIS "Build example with Geant4 UI and Vis drivers" OFF)
if(WITH_GEANT4_UIVIS)
  find_package(Geant4 REQUIRED ui_all vis_all)
else()
  find_package(Geant4 REQUIRED)
endif()

#----------------------------------------------------------------------------
# Setup Geant4 include directories and compile definitions
# Setup include directory for this project
#
include(${Geant4_USE_FILE})
include_directories(${PROJECT_SOURCE_DIR}/include)


#----------------------------------------------------------------------------
# Locate sources and headers for this project
# NB: headers are included so they will show up in IDEs
#
file(GLOB sources ${PROJECT_SOURCE_DIR}/src/*.cc)
file(GLOB headers ${PROJECT_SOURCE_DIR}/include/*.hh)

#----------------------------------------------------------------------------
# Add the executable, and link it to the Geant4 libraries
#
add_executable(exampleB1 exampleB1.cc ${sources} ${headers})
target_link_libraries(exampleB1 ${Geant4_LIBRARIES})

#----------------------------------------------------------------------------
# WASM

if(EMSCRIPTEN)
  set_target_properties(exampleB1 PROPERTIES
    LINK_FLAGS "-s TOTAL_MEMORY=270MB -s WASM=1 \
    --use-preload-cache \
    --pre-js ../../setup_env.js \
    --preload-file ../../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4ENSDFSTATE2.2@/data/G4ENSDFSTATE2.2 \
    --preload-file ../../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/PhotonEvaporation5.2@/data/PhotonEvaporation5.2 \
    --preload-file ../../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4EMLOW7.3/brem_SB@/data/G4EMLOW7.3/brem_SB \
    --preload-file ../../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4EMLOW7.3/livermore/phot_epics2014@/data/G4EMLOW7.3/livermore/phot_epics2014 \
    --preload-file ../../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4EMLOW7.3/livermore/rayl@/data/G4EMLOW7.3/livermore/rayl \
    --preload-file ../../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4SAIDDATA1.1@/data/G4SAIDDATA1.1 \
    --preload-file ../../../../geant4/wasm/geant4.10.04.p03/install/share/Geant4-10.4.3/data/G4NEUTRONXS1.4@/data/G4NEUTRONXS1.4 \
    -lembind "
    )

  SET(CMAKE_EXECUTABLE_SUFFIX ".js")
endif()


#----------------------------------------------------------------------------
# Copy all scripts to the build directory, i.e. the directory in which we
# build B1. This is so that we can run the executable directly because it
# relies on these scripts being in the current working directory.
#
set(EXAMPLEB1_SCRIPTS
  exampleB1.in
  g4geom.txt
  )

foreach(_script ${EXAMPLEB1_SCRIPTS})
  configure_file(
    ${PROJECT_SOURCE_DIR}/${_script}
    ${PROJECT_BINARY_DIR}/${_script}
    COPYONLY
    )
endforeach()

#----------------------------------------------------------------------------
# For internal Geant4 use - but has no effect if you build this
# example standalone
#
add_custom_target(B1 DEPENDS exampleB1)

#----------------------------------------------------------------------------
# Install the executable to 'bin' directory under CMAKE_INSTALL_PREFIX
#
install(TARGETS exampleB1 DESTINATION bin)



