// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'index.data';
      var REMOTE_PACKAGE_BASE = 'index.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus'](`Downloading data... (${loaded}/${total})`);
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "data", true, true);
Module['FS_createPath']("/data", "G4EMLOW7.3", true, true);
Module['FS_createPath']("/data/G4EMLOW7.3", "brem_SB", true, true);
Module['FS_createPath']("/data/G4EMLOW7.3", "livermore", true, true);
Module['FS_createPath']("/data/G4EMLOW7.3/livermore", "phot_epics2014", true, true);
Module['FS_createPath']("/data/G4EMLOW7.3/livermore", "rayl", true, true);
Module['FS_createPath']("/data", "G4ENSDFSTATE2.2", true, true);
Module['FS_createPath']("/data", "G4NEUTRONXS1.4", true, true);
Module['FS_createPath']("/data", "G4SAIDDATA1.1", true, true);
Module['FS_createPath']("/data", "PhotonEvaporation5.2", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_index.data');

      };
      Module['addRunDependency']('datafile_index.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/data/G4EMLOW7.3/brem_SB/br1", "start": 0, "end": 22565}, {"filename": "/data/G4EMLOW7.3/brem_SB/br10", "start": 22565, "end": 45130}, {"filename": "/data/G4EMLOW7.3/brem_SB/br100", "start": 45130, "end": 48417}, {"filename": "/data/G4EMLOW7.3/brem_SB/br11", "start": 48417, "end": 70982}, {"filename": "/data/G4EMLOW7.3/brem_SB/br12", "start": 70982, "end": 93547}, {"filename": "/data/G4EMLOW7.3/brem_SB/br13", "start": 93547, "end": 116112}, {"filename": "/data/G4EMLOW7.3/brem_SB/br14", "start": 116112, "end": 138677}, {"filename": "/data/G4EMLOW7.3/brem_SB/br15", "start": 138677, "end": 161242}, {"filename": "/data/G4EMLOW7.3/brem_SB/br16", "start": 161242, "end": 183807}, {"filename": "/data/G4EMLOW7.3/brem_SB/br17", "start": 183807, "end": 206372}, {"filename": "/data/G4EMLOW7.3/brem_SB/br18", "start": 206372, "end": 228937}, {"filename": "/data/G4EMLOW7.3/brem_SB/br19", "start": 228937, "end": 251502}, {"filename": "/data/G4EMLOW7.3/brem_SB/br2", "start": 251502, "end": 274067}, {"filename": "/data/G4EMLOW7.3/brem_SB/br20", "start": 274067, "end": 296632}, {"filename": "/data/G4EMLOW7.3/brem_SB/br21", "start": 296632, "end": 319197}, {"filename": "/data/G4EMLOW7.3/brem_SB/br22", "start": 319197, "end": 341762}, {"filename": "/data/G4EMLOW7.3/brem_SB/br23", "start": 341762, "end": 364327}, {"filename": "/data/G4EMLOW7.3/brem_SB/br24", "start": 364327, "end": 386892}, {"filename": "/data/G4EMLOW7.3/brem_SB/br25", "start": 386892, "end": 409457}, {"filename": "/data/G4EMLOW7.3/brem_SB/br26", "start": 409457, "end": 432022}, {"filename": "/data/G4EMLOW7.3/brem_SB/br27", "start": 432022, "end": 454587}, {"filename": "/data/G4EMLOW7.3/brem_SB/br28", "start": 454587, "end": 477152}, {"filename": "/data/G4EMLOW7.3/brem_SB/br29", "start": 477152, "end": 499717}, {"filename": "/data/G4EMLOW7.3/brem_SB/br3", "start": 499717, "end": 522282}, {"filename": "/data/G4EMLOW7.3/brem_SB/br30", "start": 522282, "end": 544847}, {"filename": "/data/G4EMLOW7.3/brem_SB/br31", "start": 544847, "end": 567412}, {"filename": "/data/G4EMLOW7.3/brem_SB/br32", "start": 567412, "end": 589977}, {"filename": "/data/G4EMLOW7.3/brem_SB/br33", "start": 589977, "end": 612542}, {"filename": "/data/G4EMLOW7.3/brem_SB/br34", "start": 612542, "end": 635107}, {"filename": "/data/G4EMLOW7.3/brem_SB/br35", "start": 635107, "end": 657672}, {"filename": "/data/G4EMLOW7.3/brem_SB/br36", "start": 657672, "end": 680237}, {"filename": "/data/G4EMLOW7.3/brem_SB/br37", "start": 680237, "end": 702802}, {"filename": "/data/G4EMLOW7.3/brem_SB/br38", "start": 702802, "end": 725367}, {"filename": "/data/G4EMLOW7.3/brem_SB/br39", "start": 725367, "end": 747932}, {"filename": "/data/G4EMLOW7.3/brem_SB/br4", "start": 747932, "end": 770497}, {"filename": "/data/G4EMLOW7.3/brem_SB/br40", "start": 770497, "end": 793062}, {"filename": "/data/G4EMLOW7.3/brem_SB/br41", "start": 793062, "end": 815627}, {"filename": "/data/G4EMLOW7.3/brem_SB/br42", "start": 815627, "end": 838192}, {"filename": "/data/G4EMLOW7.3/brem_SB/br43", "start": 838192, "end": 860757}, {"filename": "/data/G4EMLOW7.3/brem_SB/br44", "start": 860757, "end": 883322}, {"filename": "/data/G4EMLOW7.3/brem_SB/br45", "start": 883322, "end": 905887}, {"filename": "/data/G4EMLOW7.3/brem_SB/br46", "start": 905887, "end": 928452}, {"filename": "/data/G4EMLOW7.3/brem_SB/br47", "start": 928452, "end": 951017}, {"filename": "/data/G4EMLOW7.3/brem_SB/br48", "start": 951017, "end": 973582}, {"filename": "/data/G4EMLOW7.3/brem_SB/br49", "start": 973582, "end": 996147}, {"filename": "/data/G4EMLOW7.3/brem_SB/br5", "start": 996147, "end": 1018712}, {"filename": "/data/G4EMLOW7.3/brem_SB/br50", "start": 1018712, "end": 1041277}, {"filename": "/data/G4EMLOW7.3/brem_SB/br51", "start": 1041277, "end": 1063842}, {"filename": "/data/G4EMLOW7.3/brem_SB/br52", "start": 1063842, "end": 1086407}, {"filename": "/data/G4EMLOW7.3/brem_SB/br53", "start": 1086407, "end": 1108972}, {"filename": "/data/G4EMLOW7.3/brem_SB/br54", "start": 1108972, "end": 1131537}, {"filename": "/data/G4EMLOW7.3/brem_SB/br55", "start": 1131537, "end": 1154102}, {"filename": "/data/G4EMLOW7.3/brem_SB/br56", "start": 1154102, "end": 1176667}, {"filename": "/data/G4EMLOW7.3/brem_SB/br57", "start": 1176667, "end": 1199232}, {"filename": "/data/G4EMLOW7.3/brem_SB/br58", "start": 1199232, "end": 1221797}, {"filename": "/data/G4EMLOW7.3/brem_SB/br59", "start": 1221797, "end": 1244362}, {"filename": "/data/G4EMLOW7.3/brem_SB/br6", "start": 1244362, "end": 1266927}, {"filename": "/data/G4EMLOW7.3/brem_SB/br60", "start": 1266927, "end": 1289492}, {"filename": "/data/G4EMLOW7.3/brem_SB/br61", "start": 1289492, "end": 1312057}, {"filename": "/data/G4EMLOW7.3/brem_SB/br62", "start": 1312057, "end": 1334622}, {"filename": "/data/G4EMLOW7.3/brem_SB/br63", "start": 1334622, "end": 1357187}, {"filename": "/data/G4EMLOW7.3/brem_SB/br64", "start": 1357187, "end": 1379752}, {"filename": "/data/G4EMLOW7.3/brem_SB/br65", "start": 1379752, "end": 1402317}, {"filename": "/data/G4EMLOW7.3/brem_SB/br66", "start": 1402317, "end": 1424882}, {"filename": "/data/G4EMLOW7.3/brem_SB/br67", "start": 1424882, "end": 1447447}, {"filename": "/data/G4EMLOW7.3/brem_SB/br68", "start": 1447447, "end": 1470012}, {"filename": "/data/G4EMLOW7.3/brem_SB/br69", "start": 1470012, "end": 1492577}, {"filename": "/data/G4EMLOW7.3/brem_SB/br7", "start": 1492577, "end": 1515142}, {"filename": "/data/G4EMLOW7.3/brem_SB/br70", "start": 1515142, "end": 1537707}, {"filename": "/data/G4EMLOW7.3/brem_SB/br71", "start": 1537707, "end": 1560272}, {"filename": "/data/G4EMLOW7.3/brem_SB/br72", "start": 1560272, "end": 1582837}, {"filename": "/data/G4EMLOW7.3/brem_SB/br73", "start": 1582837, "end": 1605402}, {"filename": "/data/G4EMLOW7.3/brem_SB/br74", "start": 1605402, "end": 1627967}, {"filename": "/data/G4EMLOW7.3/brem_SB/br75", "start": 1627967, "end": 1650532}, {"filename": "/data/G4EMLOW7.3/brem_SB/br76", "start": 1650532, "end": 1673097}, {"filename": "/data/G4EMLOW7.3/brem_SB/br77", "start": 1673097, "end": 1695662}, {"filename": "/data/G4EMLOW7.3/brem_SB/br78", "start": 1695662, "end": 1718227}, {"filename": "/data/G4EMLOW7.3/brem_SB/br79", "start": 1718227, "end": 1740792}, {"filename": "/data/G4EMLOW7.3/brem_SB/br8", "start": 1740792, "end": 1763357}, {"filename": "/data/G4EMLOW7.3/brem_SB/br80", "start": 1763357, "end": 1785922}, {"filename": "/data/G4EMLOW7.3/brem_SB/br81", "start": 1785922, "end": 1808487}, {"filename": "/data/G4EMLOW7.3/brem_SB/br82", "start": 1808487, "end": 1831052}, {"filename": "/data/G4EMLOW7.3/brem_SB/br83", "start": 1831052, "end": 1853617}, {"filename": "/data/G4EMLOW7.3/brem_SB/br84", "start": 1853617, "end": 1876182}, {"filename": "/data/G4EMLOW7.3/brem_SB/br85", "start": 1876182, "end": 1898747}, {"filename": "/data/G4EMLOW7.3/brem_SB/br86", "start": 1898747, "end": 1921312}, {"filename": "/data/G4EMLOW7.3/brem_SB/br87", "start": 1921312, "end": 1943877}, {"filename": "/data/G4EMLOW7.3/brem_SB/br88", "start": 1943877, "end": 1966442}, {"filename": "/data/G4EMLOW7.3/brem_SB/br89", "start": 1966442, "end": 1989007}, {"filename": "/data/G4EMLOW7.3/brem_SB/br9", "start": 1989007, "end": 2011572}, {"filename": "/data/G4EMLOW7.3/brem_SB/br90", "start": 2011572, "end": 2034137}, {"filename": "/data/G4EMLOW7.3/brem_SB/br91", "start": 2034137, "end": 2056702}, {"filename": "/data/G4EMLOW7.3/brem_SB/br92", "start": 2056702, "end": 2079267}, {"filename": "/data/G4EMLOW7.3/brem_SB/br93", "start": 2079267, "end": 2101481}, {"filename": "/data/G4EMLOW7.3/brem_SB/br94", "start": 2101481, "end": 2123695}, {"filename": "/data/G4EMLOW7.3/brem_SB/br95", "start": 2123695, "end": 2145909}, {"filename": "/data/G4EMLOW7.3/brem_SB/br96", "start": 2145909, "end": 2168123}, {"filename": "/data/G4EMLOW7.3/brem_SB/br97", "start": 2168123, "end": 2190337}, {"filename": "/data/G4EMLOW7.3/brem_SB/br98", "start": 2190337, "end": 2212551}, {"filename": "/data/G4EMLOW7.3/brem_SB/br99", "start": 2212551, "end": 2234765}, {"filename": "/data/G4EMLOW7.3/brem_SB/el1", "start": 2234765, "end": 2238039}, {"filename": "/data/G4EMLOW7.3/brem_SB/el10", "start": 2238039, "end": 2241327}, {"filename": "/data/G4EMLOW7.3/brem_SB/el100", "start": 2241327, "end": 2244614}, {"filename": "/data/G4EMLOW7.3/brem_SB/el11", "start": 2244614, "end": 2247893}, {"filename": "/data/G4EMLOW7.3/brem_SB/el12", "start": 2247893, "end": 2251180}, {"filename": "/data/G4EMLOW7.3/brem_SB/el13", "start": 2251180, "end": 2254466}, {"filename": "/data/G4EMLOW7.3/brem_SB/el14", "start": 2254466, "end": 2257747}, {"filename": "/data/G4EMLOW7.3/brem_SB/el15", "start": 2257747, "end": 2261033}, {"filename": "/data/G4EMLOW7.3/brem_SB/el16", "start": 2261033, "end": 2264310}, {"filename": "/data/G4EMLOW7.3/brem_SB/el17", "start": 2264310, "end": 2267585}, {"filename": "/data/G4EMLOW7.3/brem_SB/el18", "start": 2267585, "end": 2270860}, {"filename": "/data/G4EMLOW7.3/brem_SB/el19", "start": 2270860, "end": 2274143}, {"filename": "/data/G4EMLOW7.3/brem_SB/el2", "start": 2274143, "end": 2277408}, {"filename": "/data/G4EMLOW7.3/brem_SB/el20", "start": 2277408, "end": 2280674}, {"filename": "/data/G4EMLOW7.3/brem_SB/el21", "start": 2280674, "end": 2283965}, {"filename": "/data/G4EMLOW7.3/brem_SB/el22", "start": 2283965, "end": 2287249}, {"filename": "/data/G4EMLOW7.3/brem_SB/el23", "start": 2287249, "end": 2290552}, {"filename": "/data/G4EMLOW7.3/brem_SB/el24", "start": 2290552, "end": 2293832}, {"filename": "/data/G4EMLOW7.3/brem_SB/el25", "start": 2293832, "end": 2297109}, {"filename": "/data/G4EMLOW7.3/brem_SB/el26", "start": 2297109, "end": 2300401}, {"filename": "/data/G4EMLOW7.3/brem_SB/el27", "start": 2300401, "end": 2303680}, {"filename": "/data/G4EMLOW7.3/brem_SB/el28", "start": 2303680, "end": 2306963}, {"filename": "/data/G4EMLOW7.3/brem_SB/el29", "start": 2306963, "end": 2310258}, {"filename": "/data/G4EMLOW7.3/brem_SB/el3", "start": 2310258, "end": 2313524}, {"filename": "/data/G4EMLOW7.3/brem_SB/el30", "start": 2313524, "end": 2316802}, {"filename": "/data/G4EMLOW7.3/brem_SB/el31", "start": 2316802, "end": 2320090}, {"filename": "/data/G4EMLOW7.3/brem_SB/el32", "start": 2320090, "end": 2323361}, {"filename": "/data/G4EMLOW7.3/brem_SB/el33", "start": 2323361, "end": 2326645}, {"filename": "/data/G4EMLOW7.3/brem_SB/el34", "start": 2326645, "end": 2329931}, {"filename": "/data/G4EMLOW7.3/brem_SB/el35", "start": 2329931, "end": 2333211}, {"filename": "/data/G4EMLOW7.3/brem_SB/el36", "start": 2333211, "end": 2336502}, {"filename": "/data/G4EMLOW7.3/brem_SB/el37", "start": 2336502, "end": 2339777}, {"filename": "/data/G4EMLOW7.3/brem_SB/el38", "start": 2339777, "end": 2343052}, {"filename": "/data/G4EMLOW7.3/brem_SB/el39", "start": 2343052, "end": 2346332}, {"filename": "/data/G4EMLOW7.3/brem_SB/el4", "start": 2346332, "end": 2349602}, {"filename": "/data/G4EMLOW7.3/brem_SB/el40", "start": 2349602, "end": 2352881}, {"filename": "/data/G4EMLOW7.3/brem_SB/el41", "start": 2352881, "end": 2356157}, {"filename": "/data/G4EMLOW7.3/brem_SB/el42", "start": 2356157, "end": 2359438}, {"filename": "/data/G4EMLOW7.3/brem_SB/el43", "start": 2359438, "end": 2362712}, {"filename": "/data/G4EMLOW7.3/brem_SB/el44", "start": 2362712, "end": 2365988}, {"filename": "/data/G4EMLOW7.3/brem_SB/el45", "start": 2365988, "end": 2369280}, {"filename": "/data/G4EMLOW7.3/brem_SB/el46", "start": 2369280, "end": 2372563}, {"filename": "/data/G4EMLOW7.3/brem_SB/el47", "start": 2372563, "end": 2375851}, {"filename": "/data/G4EMLOW7.3/brem_SB/el48", "start": 2375851, "end": 2379111}, {"filename": "/data/G4EMLOW7.3/brem_SB/el49", "start": 2379111, "end": 2382392}, {"filename": "/data/G4EMLOW7.3/brem_SB/el5", "start": 2382392, "end": 2385670}, {"filename": "/data/G4EMLOW7.3/brem_SB/el50", "start": 2385670, "end": 2388956}, {"filename": "/data/G4EMLOW7.3/brem_SB/el51", "start": 2388956, "end": 2392249}, {"filename": "/data/G4EMLOW7.3/brem_SB/el52", "start": 2392249, "end": 2395521}, {"filename": "/data/G4EMLOW7.3/brem_SB/el53", "start": 2395521, "end": 2398804}, {"filename": "/data/G4EMLOW7.3/brem_SB/el54", "start": 2398804, "end": 2402085}, {"filename": "/data/G4EMLOW7.3/brem_SB/el55", "start": 2402085, "end": 2405369}, {"filename": "/data/G4EMLOW7.3/brem_SB/el56", "start": 2405369, "end": 2408641}, {"filename": "/data/G4EMLOW7.3/brem_SB/el57", "start": 2408641, "end": 2411915}, {"filename": "/data/G4EMLOW7.3/brem_SB/el58", "start": 2411915, "end": 2415199}, {"filename": "/data/G4EMLOW7.3/brem_SB/el59", "start": 2415199, "end": 2418498}, {"filename": "/data/G4EMLOW7.3/brem_SB/el6", "start": 2418498, "end": 2421776}, {"filename": "/data/G4EMLOW7.3/brem_SB/el60", "start": 2421776, "end": 2425063}, {"filename": "/data/G4EMLOW7.3/brem_SB/el61", "start": 2425063, "end": 2428344}, {"filename": "/data/G4EMLOW7.3/brem_SB/el62", "start": 2428344, "end": 2431636}, {"filename": "/data/G4EMLOW7.3/brem_SB/el63", "start": 2431636, "end": 2434920}, {"filename": "/data/G4EMLOW7.3/brem_SB/el64", "start": 2434920, "end": 2438201}, {"filename": "/data/G4EMLOW7.3/brem_SB/el65", "start": 2438201, "end": 2441491}, {"filename": "/data/G4EMLOW7.3/brem_SB/el66", "start": 2441491, "end": 2444783}, {"filename": "/data/G4EMLOW7.3/brem_SB/el67", "start": 2444783, "end": 2448067}, {"filename": "/data/G4EMLOW7.3/brem_SB/el68", "start": 2448067, "end": 2451340}, {"filename": "/data/G4EMLOW7.3/brem_SB/el69", "start": 2451340, "end": 2454629}, {"filename": "/data/G4EMLOW7.3/brem_SB/el7", "start": 2454629, "end": 2457910}, {"filename": "/data/G4EMLOW7.3/brem_SB/el70", "start": 2457910, "end": 2461196}, {"filename": "/data/G4EMLOW7.3/brem_SB/el71", "start": 2461196, "end": 2464467}, {"filename": "/data/G4EMLOW7.3/brem_SB/el72", "start": 2464467, "end": 2467755}, {"filename": "/data/G4EMLOW7.3/brem_SB/el73", "start": 2467755, "end": 2471045}, {"filename": "/data/G4EMLOW7.3/brem_SB/el74", "start": 2471045, "end": 2474330}, {"filename": "/data/G4EMLOW7.3/brem_SB/el75", "start": 2474330, "end": 2477594}, {"filename": "/data/G4EMLOW7.3/brem_SB/el76", "start": 2477594, "end": 2480865}, {"filename": "/data/G4EMLOW7.3/brem_SB/el77", "start": 2480865, "end": 2484141}, {"filename": "/data/G4EMLOW7.3/brem_SB/el78", "start": 2484141, "end": 2487425}, {"filename": "/data/G4EMLOW7.3/brem_SB/el79", "start": 2487425, "end": 2490713}, {"filename": "/data/G4EMLOW7.3/brem_SB/el8", "start": 2490713, "end": 2493986}, {"filename": "/data/G4EMLOW7.3/brem_SB/el80", "start": 2493986, "end": 2497275}, {"filename": "/data/G4EMLOW7.3/brem_SB/el81", "start": 2497275, "end": 2500576}, {"filename": "/data/G4EMLOW7.3/brem_SB/el82", "start": 2500576, "end": 2503846}, {"filename": "/data/G4EMLOW7.3/brem_SB/el83", "start": 2503846, "end": 2507122}, {"filename": "/data/G4EMLOW7.3/brem_SB/el84", "start": 2507122, "end": 2510406}, {"filename": "/data/G4EMLOW7.3/brem_SB/el85", "start": 2510406, "end": 2513690}, {"filename": "/data/G4EMLOW7.3/brem_SB/el86", "start": 2513690, "end": 2516965}, {"filename": "/data/G4EMLOW7.3/brem_SB/el87", "start": 2516965, "end": 2520251}, {"filename": "/data/G4EMLOW7.3/brem_SB/el88", "start": 2520251, "end": 2523531}, {"filename": "/data/G4EMLOW7.3/brem_SB/el89", "start": 2523531, "end": 2526813}, {"filename": "/data/G4EMLOW7.3/brem_SB/el9", "start": 2526813, "end": 2530091}, {"filename": "/data/G4EMLOW7.3/brem_SB/el90", "start": 2530091, "end": 2533367}, {"filename": "/data/G4EMLOW7.3/brem_SB/el91", "start": 2533367, "end": 2536645}, {"filename": "/data/G4EMLOW7.3/brem_SB/el92", "start": 2536645, "end": 2539928}, {"filename": "/data/G4EMLOW7.3/brem_SB/el93", "start": 2539928, "end": 2543212}, {"filename": "/data/G4EMLOW7.3/brem_SB/el94", "start": 2543212, "end": 2546484}, {"filename": "/data/G4EMLOW7.3/brem_SB/el95", "start": 2546484, "end": 2549767}, {"filename": "/data/G4EMLOW7.3/brem_SB/el96", "start": 2549767, "end": 2553057}, {"filename": "/data/G4EMLOW7.3/brem_SB/el97", "start": 2553057, "end": 2556339}, {"filename": "/data/G4EMLOW7.3/brem_SB/el98", "start": 2556339, "end": 2559623}, {"filename": "/data/G4EMLOW7.3/brem_SB/el99", "start": 2559623, "end": 2562910}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-1.dat", "start": 2562910, "end": 2563513}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-10.dat", "start": 2563513, "end": 2564912}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-100.dat", "start": 2564912, "end": 2564965}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-11.dat", "start": 2564965, "end": 2566334}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-12.dat", "start": 2566334, "end": 2567391}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-13.dat", "start": 2567391, "end": 2568868}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-14.dat", "start": 2568868, "end": 2570423}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-15.dat", "start": 2570423, "end": 2571377}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-16.dat", "start": 2571377, "end": 2572246}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-17.dat", "start": 2572246, "end": 2573181}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-18.dat", "start": 2573181, "end": 2573807}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-19.dat", "start": 2573807, "end": 2574598}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-2.dat", "start": 2574598, "end": 2575436}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-20.dat", "start": 2575436, "end": 2575925}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-21.dat", "start": 2575925, "end": 2576562}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-22.dat", "start": 2576562, "end": 2577077}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-23.dat", "start": 2577077, "end": 2577336}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-24.dat", "start": 2577336, "end": 2577444}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-25.dat", "start": 2577444, "end": 2577510}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-26.dat", "start": 2577510, "end": 2577576}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-27.dat", "start": 2577576, "end": 2577642}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-28.dat", "start": 2577642, "end": 2577704}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-29.dat", "start": 2577704, "end": 2577770}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-3.dat", "start": 2577770, "end": 2579190}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-30.dat", "start": 2579190, "end": 2579365}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-31.dat", "start": 2579365, "end": 2579444}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-32.dat", "start": 2579444, "end": 2579582}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-33.dat", "start": 2579582, "end": 2579681}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-34.dat", "start": 2579681, "end": 2579761}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-35.dat", "start": 2579761, "end": 2579841}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-36.dat", "start": 2579841, "end": 2579916}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-37.dat", "start": 2579916, "end": 2579998}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-38.dat", "start": 2579998, "end": 2580080}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-39.dat", "start": 2580080, "end": 2580192}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-4.dat", "start": 2580192, "end": 2581400}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-40.dat", "start": 2581400, "end": 2581499}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-41.dat", "start": 2581499, "end": 2581618}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-42.dat", "start": 2581618, "end": 2581709}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-43.dat", "start": 2581709, "end": 2581796}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-44.dat", "start": 2581796, "end": 2581873}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-45.dat", "start": 2581873, "end": 2581965}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-46.dat", "start": 2581965, "end": 2582038}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-47.dat", "start": 2582038, "end": 2582131}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-48.dat", "start": 2582131, "end": 2582236}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-49.dat", "start": 2582236, "end": 2582328}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-5.dat", "start": 2582328, "end": 2584309}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-50.dat", "start": 2584309, "end": 2584376}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-51.dat", "start": 2584376, "end": 2584490}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-52.dat", "start": 2584490, "end": 2584621}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-53.dat", "start": 2584621, "end": 2584732}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-54.dat", "start": 2584732, "end": 2584826}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-55.dat", "start": 2584826, "end": 2584898}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-56.dat", "start": 2584898, "end": 2585012}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-57.dat", "start": 2585012, "end": 2585087}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-58.dat", "start": 2585087, "end": 2585181}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-59.dat", "start": 2585181, "end": 2585266}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-6.dat", "start": 2585266, "end": 2586848}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-60.dat", "start": 2586848, "end": 2586901}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-61.dat", "start": 2586901, "end": 2586955}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-62.dat", "start": 2586955, "end": 2587009}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-63.dat", "start": 2587009, "end": 2587062}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-64.dat", "start": 2587062, "end": 2587116}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-65.dat", "start": 2587116, "end": 2587174}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-66.dat", "start": 2587174, "end": 2587232}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-67.dat", "start": 2587232, "end": 2587292}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-68.dat", "start": 2587292, "end": 2587352}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-69.dat", "start": 2587352, "end": 2587406}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-7.dat", "start": 2587406, "end": 2588996}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-70.dat", "start": 2588996, "end": 2589052}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-71.dat", "start": 2589052, "end": 2589112}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-72.dat", "start": 2589112, "end": 2590502}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-73.dat", "start": 2590502, "end": 2591876}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-74.dat", "start": 2591876, "end": 2593050}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-75.dat", "start": 2593050, "end": 2593107}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-76.dat", "start": 2593107, "end": 2593165}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-77.dat", "start": 2593165, "end": 2593223}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-78.dat", "start": 2593223, "end": 2593281}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-79.dat", "start": 2593281, "end": 2593335}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-8.dat", "start": 2593335, "end": 2594860}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-80.dat", "start": 2594860, "end": 2594918}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-81.dat", "start": 2594918, "end": 2594976}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-82.dat", "start": 2594976, "end": 2595968}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-83.dat", "start": 2595968, "end": 2597200}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-84.dat", "start": 2597200, "end": 2598262}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-85.dat", "start": 2598262, "end": 2599362}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-86.dat", "start": 2599362, "end": 2600378}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-87.dat", "start": 2600378, "end": 2601342}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-88.dat", "start": 2601342, "end": 2601396}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-89.dat", "start": 2601396, "end": 2602323}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-9.dat", "start": 2602323, "end": 2603735}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-90.dat", "start": 2603735, "end": 2604773}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-91.dat", "start": 2604773, "end": 2605746}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-92.dat", "start": 2605746, "end": 2606709}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-93.dat", "start": 2606709, "end": 2606761}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-94.dat", "start": 2606761, "end": 2606815}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-95.dat", "start": 2606815, "end": 2606862}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-96.dat", "start": 2606862, "end": 2606916}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-97.dat", "start": 2606916, "end": 2606969}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-98.dat", "start": 2606969, "end": 2607023}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-cs-99.dat", "start": 2607023, "end": 2607077}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-1.dat", "start": 2607077, "end": 2607171}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-10.dat", "start": 2607171, "end": 2607515}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-100.dat", "start": 2607515, "end": 2609126}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-11.dat", "start": 2609126, "end": 2609551}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-12.dat", "start": 2609551, "end": 2609976}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-13.dat", "start": 2609976, "end": 2610563}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-14.dat", "start": 2610563, "end": 2611151}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-15.dat", "start": 2611151, "end": 2611740}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-16.dat", "start": 2611740, "end": 2612311}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-17.dat", "start": 2612311, "end": 2612890}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-18.dat", "start": 2612890, "end": 2613462}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-19.dat", "start": 2613462, "end": 2614112}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-2.dat", "start": 2614112, "end": 2614207}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-20.dat", "start": 2614207, "end": 2614849}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-21.dat", "start": 2614849, "end": 2615643}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-22.dat", "start": 2615643, "end": 2616444}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-23.dat", "start": 2616444, "end": 2617238}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-24.dat", "start": 2617238, "end": 2618036}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-25.dat", "start": 2618036, "end": 2618832}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-26.dat", "start": 2618832, "end": 2619622}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-27.dat", "start": 2619622, "end": 2620406}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-28.dat", "start": 2620406, "end": 2621191}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-29.dat", "start": 2621191, "end": 2621960}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-3.dat", "start": 2621960, "end": 2622137}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-30.dat", "start": 2622137, "end": 2622905}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-31.dat", "start": 2622905, "end": 2623816}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-32.dat", "start": 2623816, "end": 2624729}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-33.dat", "start": 2624729, "end": 2625645}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-34.dat", "start": 2625645, "end": 2626560}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-35.dat", "start": 2626560, "end": 2627479}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-36.dat", "start": 2627479, "end": 2628392}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-37.dat", "start": 2628392, "end": 2629354}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-38.dat", "start": 2629354, "end": 2630325}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-39.dat", "start": 2630325, "end": 2631426}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-4.dat", "start": 2631426, "end": 2631603}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-40.dat", "start": 2631603, "end": 2632709}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-41.dat", "start": 2632709, "end": 2633808}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-42.dat", "start": 2633808, "end": 2634895}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-43.dat", "start": 2634895, "end": 2635993}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-44.dat", "start": 2635993, "end": 2637095}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-45.dat", "start": 2637095, "end": 2638177}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-46.dat", "start": 2638177, "end": 2639188}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-47.dat", "start": 2639188, "end": 2640271}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-48.dat", "start": 2640271, "end": 2641350}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-49.dat", "start": 2641350, "end": 2642563}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-5.dat", "start": 2642563, "end": 2642907}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-50.dat", "start": 2642907, "end": 2644117}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-51.dat", "start": 2644117, "end": 2645334}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-52.dat", "start": 2645334, "end": 2646549}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-53.dat", "start": 2646549, "end": 2647759}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-54.dat", "start": 2647759, "end": 2648973}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-55.dat", "start": 2648973, "end": 2650259}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-56.dat", "start": 2650259, "end": 2651539}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-57.dat", "start": 2651539, "end": 2652962}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-58.dat", "start": 2652962, "end": 2654359}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-59.dat", "start": 2654359, "end": 2655765}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-6.dat", "start": 2655765, "end": 2656106}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-60.dat", "start": 2656106, "end": 2657467}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-61.dat", "start": 2657467, "end": 2658824}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-62.dat", "start": 2658824, "end": 2660180}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-63.dat", "start": 2660180, "end": 2661515}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-64.dat", "start": 2661515, "end": 2662989}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-65.dat", "start": 2662989, "end": 2664334}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-66.dat", "start": 2664334, "end": 2665680}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-67.dat", "start": 2665680, "end": 2667019}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-68.dat", "start": 2667019, "end": 2668360}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-69.dat", "start": 2668360, "end": 2669678}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-7.dat", "start": 2669678, "end": 2670018}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-70.dat", "start": 2670018, "end": 2671353}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-71.dat", "start": 2671353, "end": 2672788}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-72.dat", "start": 2672788, "end": 2674216}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-73.dat", "start": 2674216, "end": 2675644}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-74.dat", "start": 2675644, "end": 2677065}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-75.dat", "start": 2677065, "end": 2678499}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-76.dat", "start": 2678499, "end": 2679914}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-77.dat", "start": 2679914, "end": 2681257}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-78.dat", "start": 2681257, "end": 2682650}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-79.dat", "start": 2682650, "end": 2684048}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-8.dat", "start": 2684048, "end": 2684393}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-80.dat", "start": 2684393, "end": 2685809}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-81.dat", "start": 2685809, "end": 2687339}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-82.dat", "start": 2687339, "end": 2688815}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-83.dat", "start": 2688815, "end": 2690325}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-84.dat", "start": 2690325, "end": 2691829}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-85.dat", "start": 2691829, "end": 2693326}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-86.dat", "start": 2693326, "end": 2694821}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-87.dat", "start": 2694821, "end": 2696366}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-88.dat", "start": 2696366, "end": 2697934}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-89.dat", "start": 2697934, "end": 2699606}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-9.dat", "start": 2699606, "end": 2699949}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-90.dat", "start": 2699949, "end": 2701588}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-91.dat", "start": 2701588, "end": 2703354}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-92.dat", "start": 2703354, "end": 2705121}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-93.dat", "start": 2705121, "end": 2706893}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-94.dat", "start": 2706893, "end": 2708538}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-95.dat", "start": 2708538, "end": 2710184}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-96.dat", "start": 2710184, "end": 2711910}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-97.dat", "start": 2711910, "end": 2713643}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-98.dat", "start": 2713643, "end": 2715263}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-high-99.dat", "start": 2715263, "end": 2716887}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-1.dat", "start": 2716887, "end": 2716887}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-10.dat", "start": 2716887, "end": 2720042}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-100.dat", "start": 2720042, "end": 2741878}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-11.dat", "start": 2741878, "end": 2748787}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-12.dat", "start": 2748787, "end": 2755243}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-13.dat", "start": 2755243, "end": 2764834}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-14.dat", "start": 2764834, "end": 2773329}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-15.dat", "start": 2773329, "end": 2781036}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-16.dat", "start": 2781036, "end": 2788242}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-17.dat", "start": 2788242, "end": 2795996}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-18.dat", "start": 2795996, "end": 2802921}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-19.dat", "start": 2802921, "end": 2812249}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-2.dat", "start": 2812249, "end": 2812249}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-20.dat", "start": 2812249, "end": 2821012}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-21.dat", "start": 2821012, "end": 2832013}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-22.dat", "start": 2832013, "end": 2843072}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-23.dat", "start": 2843072, "end": 2854052}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-24.dat", "start": 2854052, "end": 2864553}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-25.dat", "start": 2864553, "end": 2875418}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-26.dat", "start": 2875418, "end": 2886676}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-27.dat", "start": 2886676, "end": 2897308}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-28.dat", "start": 2897308, "end": 2908655}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-29.dat", "start": 2908655, "end": 2919420}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-3.dat", "start": 2919420, "end": 2920218}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-30.dat", "start": 2920218, "end": 2931083}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-31.dat", "start": 2931083, "end": 2944279}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-32.dat", "start": 2944279, "end": 2957006}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-33.dat", "start": 2957006, "end": 2969195}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-34.dat", "start": 2969195, "end": 2981487}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-35.dat", "start": 2981487, "end": 2993460}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-36.dat", "start": 2993460, "end": 3005602}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-37.dat", "start": 3005602, "end": 3018175}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-38.dat", "start": 3018175, "end": 3029771}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-39.dat", "start": 3029771, "end": 3045244}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-4.dat", "start": 3045244, "end": 3046194}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-40.dat", "start": 3046194, "end": 3061121}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-41.dat", "start": 3061121, "end": 3076930}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-42.dat", "start": 3076930, "end": 3092653}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-43.dat", "start": 3092653, "end": 3107195}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-44.dat", "start": 3107195, "end": 3122422}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-45.dat", "start": 3122422, "end": 3138562}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-46.dat", "start": 3138562, "end": 3151944}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-47.dat", "start": 3151944, "end": 3168094}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-48.dat", "start": 3168094, "end": 3184209}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-49.dat", "start": 3184209, "end": 3202380}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-5.dat", "start": 3202380, "end": 3204446}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-50.dat", "start": 3204446, "end": 3221127}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-51.dat", "start": 3221127, "end": 3237636}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-52.dat", "start": 3237636, "end": 3252945}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-53.dat", "start": 3252945, "end": 3268483}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-54.dat", "start": 3268483, "end": 3282865}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-55.dat", "start": 3282865, "end": 3297263}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-56.dat", "start": 3297263, "end": 3310591}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-57.dat", "start": 3310591, "end": 3326829}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-58.dat", "start": 3326829, "end": 3342738}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-59.dat", "start": 3342738, "end": 3358493}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-6.dat", "start": 3358493, "end": 3360902}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-60.dat", "start": 3360902, "end": 3376192}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-61.dat", "start": 3376192, "end": 3391392}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-62.dat", "start": 3391392, "end": 3406528}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-63.dat", "start": 3406528, "end": 3421667}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-64.dat", "start": 3421667, "end": 3439324}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-65.dat", "start": 3439324, "end": 3454290}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-66.dat", "start": 3454290, "end": 3469196}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-67.dat", "start": 3469196, "end": 3484128}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-68.dat", "start": 3484128, "end": 3499429}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-69.dat", "start": 3499429, "end": 3514786}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-7.dat", "start": 3514786, "end": 3517220}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-70.dat", "start": 3517220, "end": 3532942}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-71.dat", "start": 3532942, "end": 3550081}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-72.dat", "start": 3550081, "end": 3567134}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-73.dat", "start": 3567134, "end": 3583971}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-74.dat", "start": 3583971, "end": 3601120}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-75.dat", "start": 3601120, "end": 3617597}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-76.dat", "start": 3617597, "end": 3634206}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-77.dat", "start": 3634206, "end": 3649820}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-78.dat", "start": 3649820, "end": 3666421}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-79.dat", "start": 3666421, "end": 3683201}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-8.dat", "start": 3683201, "end": 3686224}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-80.dat", "start": 3686224, "end": 3703235}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-81.dat", "start": 3703235, "end": 3722047}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-82.dat", "start": 3722047, "end": 3740686}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-83.dat", "start": 3740686, "end": 3759106}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-84.dat", "start": 3759106, "end": 3777897}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-85.dat", "start": 3777897, "end": 3796279}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-86.dat", "start": 3796279, "end": 3814406}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-87.dat", "start": 3814406, "end": 3832947}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-88.dat", "start": 3832947, "end": 3848976}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-89.dat", "start": 3848976, "end": 3867392}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-9.dat", "start": 3867392, "end": 3870463}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-90.dat", "start": 3870463, "end": 3889754}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-91.dat", "start": 3889754, "end": 3912252}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-92.dat", "start": 3912252, "end": 3935272}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-93.dat", "start": 3935272, "end": 3957846}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-94.dat", "start": 3957846, "end": 3978408}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-95.dat", "start": 3978408, "end": 3999394}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-96.dat", "start": 3999394, "end": 4022384}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-97.dat", "start": 4022384, "end": 4045709}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-98.dat", "start": 4045709, "end": 4067601}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-le-cs-99.dat", "start": 4067601, "end": 4089763}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-1.dat", "start": 4089763, "end": 4089862}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-10.dat", "start": 4089862, "end": 4090203}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-100.dat", "start": 4090203, "end": 4091965}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-11.dat", "start": 4091965, "end": 4092368}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-12.dat", "start": 4092368, "end": 4092774}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-13.dat", "start": 4092774, "end": 4093336}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-14.dat", "start": 4093336, "end": 4093909}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-15.dat", "start": 4093909, "end": 4094474}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-16.dat", "start": 4094474, "end": 4095043}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-17.dat", "start": 4095043, "end": 4095592}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-18.dat", "start": 4095592, "end": 4096138}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-19.dat", "start": 4096138, "end": 4096756}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-2.dat", "start": 4096756, "end": 4096855}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-20.dat", "start": 4096855, "end": 4097468}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-21.dat", "start": 4097468, "end": 4098234}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-22.dat", "start": 4098234, "end": 4099008}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-23.dat", "start": 4099008, "end": 4099771}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-24.dat", "start": 4099771, "end": 4100538}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-25.dat", "start": 4100538, "end": 4101308}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-26.dat", "start": 4101308, "end": 4102084}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-27.dat", "start": 4102084, "end": 4102859}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-28.dat", "start": 4102859, "end": 4103610}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-29.dat", "start": 4103610, "end": 4104357}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-3.dat", "start": 4104357, "end": 4104535}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-30.dat", "start": 4104535, "end": 4105273}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-31.dat", "start": 4105273, "end": 4106152}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-32.dat", "start": 4106152, "end": 4107038}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-33.dat", "start": 4107038, "end": 4107919}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-34.dat", "start": 4107919, "end": 4108800}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-35.dat", "start": 4108800, "end": 4109683}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-36.dat", "start": 4109683, "end": 4110569}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-37.dat", "start": 4110569, "end": 4111525}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-38.dat", "start": 4111525, "end": 4112482}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-39.dat", "start": 4112482, "end": 4113577}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-4.dat", "start": 4113577, "end": 4113760}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-40.dat", "start": 4113760, "end": 4114846}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-41.dat", "start": 4114846, "end": 4115935}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-42.dat", "start": 4115935, "end": 4117014}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-43.dat", "start": 4117014, "end": 4118097}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-44.dat", "start": 4118097, "end": 4119183}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-45.dat", "start": 4119183, "end": 4120267}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-46.dat", "start": 4120267, "end": 4121289}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-47.dat", "start": 4121289, "end": 4122386}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-48.dat", "start": 4122386, "end": 4123494}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-49.dat", "start": 4123494, "end": 4124739}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-5.dat", "start": 4124739, "end": 4125086}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-50.dat", "start": 4125086, "end": 4126335}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-51.dat", "start": 4126335, "end": 4127583}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-52.dat", "start": 4127583, "end": 4128833}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-53.dat", "start": 4128833, "end": 4130082}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-54.dat", "start": 4130082, "end": 4131326}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-55.dat", "start": 4131326, "end": 4132632}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-56.dat", "start": 4132632, "end": 4133915}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-57.dat", "start": 4133915, "end": 4135341}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-58.dat", "start": 4135341, "end": 4136765}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-59.dat", "start": 4136765, "end": 4138189}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-6.dat", "start": 4138189, "end": 4138533}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-60.dat", "start": 4138533, "end": 4139912}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-61.dat", "start": 4139912, "end": 4141300}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-62.dat", "start": 4141300, "end": 4142678}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-63.dat", "start": 4142678, "end": 4144059}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-64.dat", "start": 4144059, "end": 4145575}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-65.dat", "start": 4145575, "end": 4146937}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-66.dat", "start": 4146937, "end": 4148300}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-67.dat", "start": 4148300, "end": 4149668}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-68.dat", "start": 4149668, "end": 4151033}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-69.dat", "start": 4151033, "end": 4152393}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-7.dat", "start": 4152393, "end": 4152732}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-70.dat", "start": 4152732, "end": 4154093}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-71.dat", "start": 4154093, "end": 4155596}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-72.dat", "start": 4155596, "end": 4157071}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-73.dat", "start": 4157071, "end": 4158529}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-74.dat", "start": 4158529, "end": 4159963}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-75.dat", "start": 4159963, "end": 4161457}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-76.dat", "start": 4161457, "end": 4162930}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-77.dat", "start": 4162930, "end": 4164338}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-78.dat", "start": 4164338, "end": 4165827}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-79.dat", "start": 4165827, "end": 4167293}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-8.dat", "start": 4167293, "end": 4167634}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-80.dat", "start": 4167634, "end": 4169111}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-81.dat", "start": 4169111, "end": 4170688}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-82.dat", "start": 4170688, "end": 4172265}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-83.dat", "start": 4172265, "end": 4173804}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-84.dat", "start": 4173804, "end": 4175342}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-85.dat", "start": 4175342, "end": 4176919}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-86.dat", "start": 4176919, "end": 4178499}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-87.dat", "start": 4178499, "end": 4180140}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-88.dat", "start": 4180140, "end": 4181767}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-89.dat", "start": 4181767, "end": 4183542}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-9.dat", "start": 4183542, "end": 4183874}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-90.dat", "start": 4183874, "end": 4185601}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-91.dat", "start": 4185601, "end": 4187470}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-92.dat", "start": 4187470, "end": 4189321}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-93.dat", "start": 4189321, "end": 4191253}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-94.dat", "start": 4191253, "end": 4193060}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-95.dat", "start": 4193060, "end": 4194808}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-96.dat", "start": 4194808, "end": 4196721}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-97.dat", "start": 4196721, "end": 4198594}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-98.dat", "start": 4198594, "end": 4200355}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-low-99.dat", "start": 4200355, "end": 4202108}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-1.dat", "start": 4202108, "end": 4202795}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-10.dat", "start": 4202795, "end": 4208625}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-100.dat", "start": 4208625, "end": 4247647}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-11.dat", "start": 4247647, "end": 4258008}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-12.dat", "start": 4258008, "end": 4267793}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-13.dat", "start": 4267793, "end": 4281910}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-14.dat", "start": 4281910, "end": 4295616}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-15.dat", "start": 4295616, "end": 4307628}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-16.dat", "start": 4307628, "end": 4319100}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-17.dat", "start": 4319100, "end": 4330512}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-18.dat", "start": 4330512, "end": 4341693}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-19.dat", "start": 4341693, "end": 4355144}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-2.dat", "start": 4355144, "end": 4356065}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-20.dat", "start": 4356065, "end": 4368583}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-21.dat", "start": 4368583, "end": 4384760}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-22.dat", "start": 4384760, "end": 4400907}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-23.dat", "start": 4400907, "end": 4416998}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-24.dat", "start": 4416998, "end": 4433762}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-25.dat", "start": 4433762, "end": 4449542}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-26.dat", "start": 4449542, "end": 4465455}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-27.dat", "start": 4465455, "end": 4481081}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-28.dat", "start": 4481081, "end": 4496679}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-29.dat", "start": 4496679, "end": 4512465}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-3.dat", "start": 4512465, "end": 4514875}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-30.dat", "start": 4514875, "end": 4530496}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-31.dat", "start": 4530496, "end": 4550012}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-32.dat", "start": 4550012, "end": 4569231}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-33.dat", "start": 4569231, "end": 4587682}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-34.dat", "start": 4587682, "end": 4606278}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-35.dat", "start": 4606278, "end": 4624073}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-36.dat", "start": 4624073, "end": 4641896}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-37.dat", "start": 4641896, "end": 4660415}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-38.dat", "start": 4660415, "end": 4677783}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-39.dat", "start": 4677783, "end": 4702062}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-4.dat", "start": 4702062, "end": 4704527}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-40.dat", "start": 4704527, "end": 4728270}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-41.dat", "start": 4728270, "end": 4752357}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-42.dat", "start": 4752357, "end": 4776566}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-43.dat", "start": 4776566, "end": 4799954}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-44.dat", "start": 4799954, "end": 4823443}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-45.dat", "start": 4823443, "end": 4847051}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-46.dat", "start": 4847051, "end": 4867333}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-47.dat", "start": 4867333, "end": 4890533}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-48.dat", "start": 4890533, "end": 4914091}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-49.dat", "start": 4914091, "end": 4941217}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-5.dat", "start": 4941217, "end": 4946226}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-50.dat", "start": 4946226, "end": 4971467}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-51.dat", "start": 4971467, "end": 4996081}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-52.dat", "start": 4996081, "end": 5019996}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-53.dat", "start": 5019996, "end": 5043043}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-54.dat", "start": 5043043, "end": 5064676}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-55.dat", "start": 5064676, "end": 5087021}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-56.dat", "start": 5087021, "end": 5108331}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-57.dat", "start": 5108331, "end": 5135111}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-58.dat", "start": 5135111, "end": 5160224}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-59.dat", "start": 5160224, "end": 5185210}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-6.dat", "start": 5185210, "end": 5190337}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-60.dat", "start": 5190337, "end": 5217039}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-61.dat", "start": 5217039, "end": 5244089}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-62.dat", "start": 5244089, "end": 5270711}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-63.dat", "start": 5270711, "end": 5297256}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-64.dat", "start": 5297256, "end": 5329931}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-65.dat", "start": 5329931, "end": 5356684}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-66.dat", "start": 5356684, "end": 5382752}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-67.dat", "start": 5382752, "end": 5408824}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-68.dat", "start": 5408824, "end": 5435758}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-69.dat", "start": 5435758, "end": 5462604}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-7.dat", "start": 5462604, "end": 5467806}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-70.dat", "start": 5467806, "end": 5495059}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-71.dat", "start": 5495059, "end": 5527462}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-72.dat", "start": 5527462, "end": 5560669}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-73.dat", "start": 5560669, "end": 5593531}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-74.dat", "start": 5593531, "end": 5626024}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-75.dat", "start": 5626024, "end": 5657071}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-76.dat", "start": 5657071, "end": 5687869}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-77.dat", "start": 5687869, "end": 5716605}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-78.dat", "start": 5716605, "end": 5747073}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-79.dat", "start": 5747073, "end": 5777692}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-8.dat", "start": 5777692, "end": 5783189}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-80.dat", "start": 5783189, "end": 5813983}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-81.dat", "start": 5813983, "end": 5848065}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-82.dat", "start": 5848065, "end": 5883233}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-83.dat", "start": 5883233, "end": 5917060}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-84.dat", "start": 5917060, "end": 5950637}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-85.dat", "start": 5950637, "end": 5983883}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-86.dat", "start": 5983883, "end": 6016498}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-87.dat", "start": 6016498, "end": 6050052}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-88.dat", "start": 6050052, "end": 6080559}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-89.dat", "start": 6080559, "end": 6117919}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-9.dat", "start": 6117919, "end": 6123596}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-90.dat", "start": 6123596, "end": 6160584}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-91.dat", "start": 6160584, "end": 6206048}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-92.dat", "start": 6206048, "end": 6250778}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-93.dat", "start": 6250778, "end": 6294797}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-94.dat", "start": 6294797, "end": 6333069}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-95.dat", "start": 6333069, "end": 6371309}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-96.dat", "start": 6371309, "end": 6414646}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-97.dat", "start": 6414646, "end": 6458522}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-98.dat", "start": 6458522, "end": 6497310}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/pe-ss-cs-99.dat", "start": 6497310, "end": 6536641}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/sum_high.dat", "start": 6536641, "end": 6563175}, {"filename": "/data/G4EMLOW7.3/livermore/phot_epics2014/sum_low.dat", "start": 6563175, "end": 6576675}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/README", "start": 6576675, "end": 6577281}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/convertCS.C", "start": 6577281, "end": 6578697}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/convertFF.C", "start": 6578697, "end": 6579953}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-1.dat", "start": 6579953, "end": 6589165}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-10.dat", "start": 6589165, "end": 6600405}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-100.dat", "start": 6600405, "end": 6640299}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-11.dat", "start": 6640299, "end": 6655543}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-12.dat", "start": 6655543, "end": 6669591}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-13.dat", "start": 6669591, "end": 6692531}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-14.dat", "start": 6692531, "end": 6713573}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-15.dat", "start": 6713573, "end": 6732405}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-16.dat", "start": 6732405, "end": 6750015}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-17.dat", "start": 6750015, "end": 6766793}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-18.dat", "start": 6766793, "end": 6781777}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-19.dat", "start": 6781777, "end": 6800999}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-2.dat", "start": 6800999, "end": 6809379}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-20.dat", "start": 6809379, "end": 6829537}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-21.dat", "start": 6829537, "end": 6851593}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-22.dat", "start": 6851593, "end": 6873649}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-23.dat", "start": 6873649, "end": 6894925}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-24.dat", "start": 6894925, "end": 6915863}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-25.dat", "start": 6915863, "end": 6939089}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-26.dat", "start": 6939089, "end": 6962289}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-27.dat", "start": 6962289, "end": 6985177}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-28.dat", "start": 6985177, "end": 7007727}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-29.dat", "start": 7007727, "end": 7029133}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-3.dat", "start": 7029133, "end": 7042037}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-30.dat", "start": 7042037, "end": 7062325}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-31.dat", "start": 7062325, "end": 7093041}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-32.dat", "start": 7093041, "end": 7121443}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-33.dat", "start": 7121443, "end": 7147165}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-34.dat", "start": 7147165, "end": 7170755}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-35.dat", "start": 7170755, "end": 7193461}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-36.dat", "start": 7193461, "end": 7211617}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-37.dat", "start": 7211617, "end": 7234271}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-38.dat", "start": 7234271, "end": 7256899}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-39.dat", "start": 7256899, "end": 7279917}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-4.dat", "start": 7279917, "end": 7292197}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-40.dat", "start": 7292197, "end": 7315839}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-41.dat", "start": 7315839, "end": 7339169}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-42.dat", "start": 7339169, "end": 7366401}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-43.dat", "start": 7366401, "end": 7394075}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-44.dat", "start": 7394075, "end": 7421749}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-45.dat", "start": 7421749, "end": 7450437}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-46.dat", "start": 7450437, "end": 7472077}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-47.dat", "start": 7472077, "end": 7499803}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-48.dat", "start": 7499803, "end": 7525291}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-49.dat", "start": 7525291, "end": 7563963}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-5.dat", "start": 7563963, "end": 7579519}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-50.dat", "start": 7579519, "end": 7614603}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-51.dat", "start": 7614603, "end": 7646151}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-52.dat", "start": 7646151, "end": 7675203}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-53.dat", "start": 7675203, "end": 7702279}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-54.dat", "start": 7702279, "end": 7725791}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-55.dat", "start": 7725791, "end": 7754635}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-56.dat", "start": 7754635, "end": 7784675}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-57.dat", "start": 7784675, "end": 7814611}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-58.dat", "start": 7814611, "end": 7846393}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-59.dat", "start": 7846393, "end": 7877889}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-6.dat", "start": 7877889, "end": 7894173}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-60.dat", "start": 7894173, "end": 7924707}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-61.dat", "start": 7924707, "end": 7956125}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-62.dat", "start": 7956125, "end": 7989311}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-63.dat", "start": 7989311, "end": 8023199}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-64.dat", "start": 8023199, "end": 8058647}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-65.dat", "start": 8058647, "end": 8093367}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-66.dat", "start": 8093367, "end": 8129257}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-67.dat", "start": 8129257, "end": 8164445}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-68.dat", "start": 8164445, "end": 8196773}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-69.dat", "start": 8196773, "end": 8230739}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-7.dat", "start": 8230739, "end": 8247595}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-70.dat", "start": 8247595, "end": 8279377}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-71.dat", "start": 8279377, "end": 8314825}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-72.dat", "start": 8314825, "end": 8349077}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-73.dat", "start": 8349077, "end": 8379247}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-74.dat", "start": 8379247, "end": 8404943}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-75.dat", "start": 8404943, "end": 8433995}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-76.dat", "start": 8433995, "end": 8462215}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-77.dat", "start": 8462215, "end": 8488719}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-78.dat", "start": 8488719, "end": 8518759}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-79.dat", "start": 8518759, "end": 8547421}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-8.dat", "start": 8547421, "end": 8564095}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-80.dat", "start": 8564095, "end": 8592835}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-81.dat", "start": 8592835, "end": 8635667}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-82.dat", "start": 8635667, "end": 8677797}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-83.dat", "start": 8677797, "end": 8714909}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-84.dat", "start": 8714909, "end": 8749161}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-85.dat", "start": 8749161, "end": 8780761}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-86.dat", "start": 8780761, "end": 8808799}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-87.dat", "start": 8808799, "end": 8843831}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-88.dat", "start": 8843831, "end": 8880943}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-89.dat", "start": 8880943, "end": 8921799}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-9.dat", "start": 8921799, "end": 8936445}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-90.dat", "start": 8936445, "end": 8975013}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-91.dat", "start": 8975013, "end": 9014699}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-92.dat", "start": 9014699, "end": 9056621}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-93.dat", "start": 9056621, "end": 9098335}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-94.dat", "start": 9098335, "end": 9134901}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-95.dat", "start": 9134901, "end": 9172455}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-96.dat", "start": 9172455, "end": 9218563}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-97.dat", "start": 9218563, "end": 9260615}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-98.dat", "start": 9260615, "end": 9300483}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-cs-99.dat", "start": 9300483, "end": 9339675}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-1.dat", "start": 9339675, "end": 9342047}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-10.dat", "start": 9342047, "end": 9346293}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-100.dat", "start": 9346293, "end": 9349785}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-11.dat", "start": 9349785, "end": 9354239}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-12.dat", "start": 9354239, "end": 9358511}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-13.dat", "start": 9358511, "end": 9362419}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-14.dat", "start": 9362419, "end": 9366431}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-15.dat", "start": 9366431, "end": 9370339}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-16.dat", "start": 9370339, "end": 9374221}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-17.dat", "start": 9374221, "end": 9378207}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-18.dat", "start": 9378207, "end": 9381985}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-19.dat", "start": 9381985, "end": 9385919}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-2.dat", "start": 9385919, "end": 9389255}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-20.dat", "start": 9389255, "end": 9393215}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-21.dat", "start": 9393215, "end": 9397019}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-22.dat", "start": 9397019, "end": 9400849}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-23.dat", "start": 9400849, "end": 9404653}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-24.dat", "start": 9404653, "end": 9408639}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-25.dat", "start": 9408639, "end": 9412495}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-26.dat", "start": 9412495, "end": 9416429}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-27.dat", "start": 9416429, "end": 9420311}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-28.dat", "start": 9420311, "end": 9424401}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-29.dat", "start": 9424401, "end": 9428335}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-3.dat", "start": 9428335, "end": 9431801}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-30.dat", "start": 9431801, "end": 9435761}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-31.dat", "start": 9435761, "end": 9439669}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-32.dat", "start": 9439669, "end": 9443629}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-33.dat", "start": 9443629, "end": 9447563}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-34.dat", "start": 9447563, "end": 9451549}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-35.dat", "start": 9451549, "end": 9455483}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-36.dat", "start": 9455483, "end": 9459183}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-37.dat", "start": 9459183, "end": 9462935}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-38.dat", "start": 9462935, "end": 9466713}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-39.dat", "start": 9466713, "end": 9470491}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-4.dat", "start": 9470491, "end": 9474009}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-40.dat", "start": 9474009, "end": 9478021}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-41.dat", "start": 9478021, "end": 9482085}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-42.dat", "start": 9482085, "end": 9486019}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-43.dat", "start": 9486019, "end": 9489875}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-44.dat", "start": 9489875, "end": 9493627}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-45.dat", "start": 9493627, "end": 9497379}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-46.dat", "start": 9497379, "end": 9501183}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-47.dat", "start": 9501183, "end": 9504987}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-48.dat", "start": 9504987, "end": 9508843}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-49.dat", "start": 9508843, "end": 9512725}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-5.dat", "start": 9512725, "end": 9516165}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-50.dat", "start": 9516165, "end": 9519865}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-51.dat", "start": 9519865, "end": 9523513}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-52.dat", "start": 9523513, "end": 9527213}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-53.dat", "start": 9527213, "end": 9531043}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-54.dat", "start": 9531043, "end": 9534873}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-55.dat", "start": 9534873, "end": 9538573}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-56.dat", "start": 9538573, "end": 9542351}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-57.dat", "start": 9542351, "end": 9546311}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-58.dat", "start": 9546311, "end": 9550245}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-59.dat", "start": 9550245, "end": 9554049}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-6.dat", "start": 9554049, "end": 9557671}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-60.dat", "start": 9557671, "end": 9561345}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-61.dat", "start": 9561345, "end": 9565331}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-62.dat", "start": 9565331, "end": 9569317}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-63.dat", "start": 9569317, "end": 9573069}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-64.dat", "start": 9573069, "end": 9576977}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-65.dat", "start": 9576977, "end": 9580807}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-66.dat", "start": 9580807, "end": 9584507}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-67.dat", "start": 9584507, "end": 9588467}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-68.dat", "start": 9588467, "end": 9592193}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-69.dat", "start": 9592193, "end": 9596049}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-7.dat", "start": 9596049, "end": 9600165}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-70.dat", "start": 9600165, "end": 9604151}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-71.dat", "start": 9604151, "end": 9607955}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-72.dat", "start": 9607955, "end": 9611785}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-73.dat", "start": 9611785, "end": 9615667}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-74.dat", "start": 9615667, "end": 9619523}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-75.dat", "start": 9619523, "end": 9623301}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-76.dat", "start": 9623301, "end": 9626923}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-77.dat", "start": 9626923, "end": 9630467}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-78.dat", "start": 9630467, "end": 9633959}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-79.dat", "start": 9633959, "end": 9637399}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-8.dat", "start": 9637399, "end": 9641567}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-80.dat", "start": 9641567, "end": 9645137}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-81.dat", "start": 9645137, "end": 9648837}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-82.dat", "start": 9648837, "end": 9652433}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-83.dat", "start": 9652433, "end": 9656159}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-84.dat", "start": 9656159, "end": 9659807}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-85.dat", "start": 9659807, "end": 9663611}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-86.dat", "start": 9663611, "end": 9667207}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-87.dat", "start": 9667207, "end": 9670803}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-88.dat", "start": 9670803, "end": 9674373}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-89.dat", "start": 9674373, "end": 9677891}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-9.dat", "start": 9677891, "end": 9682267}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-90.dat", "start": 9682267, "end": 9685837}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-91.dat", "start": 9685837, "end": 9689355}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-92.dat", "start": 9689355, "end": 9693029}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-93.dat", "start": 9693029, "end": 9696573}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-94.dat", "start": 9696573, "end": 9700169}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-95.dat", "start": 9700169, "end": 9703687}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-96.dat", "start": 9703687, "end": 9707205}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-97.dat", "start": 9707205, "end": 9710697}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-98.dat", "start": 9710697, "end": 9714241}, {"filename": "/data/G4EMLOW7.3/livermore/rayl/re-ff-99.dat", "start": 9714241, "end": 9717785}, {"filename": "/data/G4ENSDFSTATE2.2/ENSDFSTATE.dat", "start": 9717785, "end": 11503625}, {"filename": "/data/G4ENSDFSTATE2.2/History", "start": 11503625, "end": 11505101}, {"filename": "/data/G4ENSDFSTATE2.2/README", "start": 11505101, "end": 11505537}, {"filename": "/data/G4NEUTRONXS1.4/History", "start": 11505537, "end": 11506018}, {"filename": "/data/G4NEUTRONXS1.4/README", "start": 11506018, "end": 11506565}, {"filename": "/data/G4NEUTRONXS1.4/cap1", "start": 11506565, "end": 11510106}, {"filename": "/data/G4NEUTRONXS1.4/cap10", "start": 11510106, "end": 11513626}, {"filename": "/data/G4NEUTRONXS1.4/cap11", "start": 11513626, "end": 11541274}, {"filename": "/data/G4NEUTRONXS1.4/cap12", "start": 11541274, "end": 11568641}, {"filename": "/data/G4NEUTRONXS1.4/cap13", "start": 11568641, "end": 11595995}, {"filename": "/data/G4NEUTRONXS1.4/cap14", "start": 11595995, "end": 11624203}, {"filename": "/data/G4NEUTRONXS1.4/cap14_28", "start": 11624203, "end": 11652407}, {"filename": "/data/G4NEUTRONXS1.4/cap14_29", "start": 11652407, "end": 11680594}, {"filename": "/data/G4NEUTRONXS1.4/cap14_30", "start": 11680594, "end": 11708659}, {"filename": "/data/G4NEUTRONXS1.4/cap15", "start": 11708659, "end": 11736858}, {"filename": "/data/G4NEUTRONXS1.4/cap16", "start": 11736858, "end": 11764607}, {"filename": "/data/G4NEUTRONXS1.4/cap17", "start": 11764607, "end": 11792649}, {"filename": "/data/G4NEUTRONXS1.4/cap18", "start": 11792649, "end": 11820410}, {"filename": "/data/G4NEUTRONXS1.4/cap18_36", "start": 11820410, "end": 11848149}, {"filename": "/data/G4NEUTRONXS1.4/cap18_40", "start": 11848149, "end": 11875896}, {"filename": "/data/G4NEUTRONXS1.4/cap19", "start": 11875896, "end": 11903243}, {"filename": "/data/G4NEUTRONXS1.4/cap2", "start": 11903243, "end": 11905188}, {"filename": "/data/G4NEUTRONXS1.4/cap20", "start": 11905188, "end": 11932557}, {"filename": "/data/G4NEUTRONXS1.4/cap20_40", "start": 11932557, "end": 11959907}, {"filename": "/data/G4NEUTRONXS1.4/cap20_42", "start": 11959907, "end": 11987276}, {"filename": "/data/G4NEUTRONXS1.4/cap20_43", "start": 11987276, "end": 12014642}, {"filename": "/data/G4NEUTRONXS1.4/cap20_44", "start": 12014642, "end": 12041996}, {"filename": "/data/G4NEUTRONXS1.4/cap20_48", "start": 12041996, "end": 12069361}, {"filename": "/data/G4NEUTRONXS1.4/cap21", "start": 12069361, "end": 12097107}, {"filename": "/data/G4NEUTRONXS1.4/cap22", "start": 12097107, "end": 12124873}, {"filename": "/data/G4NEUTRONXS1.4/cap23", "start": 12124873, "end": 12152627}, {"filename": "/data/G4NEUTRONXS1.4/cap24", "start": 12152627, "end": 12179999}, {"filename": "/data/G4NEUTRONXS1.4/cap25", "start": 12179999, "end": 12207991}, {"filename": "/data/G4NEUTRONXS1.4/cap26", "start": 12207991, "end": 12235746}, {"filename": "/data/G4NEUTRONXS1.4/cap26_54", "start": 12235746, "end": 12263453}, {"filename": "/data/G4NEUTRONXS1.4/cap26_56", "start": 12263453, "end": 12291219}, {"filename": "/data/G4NEUTRONXS1.4/cap26_57", "start": 12291219, "end": 12318948}, {"filename": "/data/G4NEUTRONXS1.4/cap26_58", "start": 12318948, "end": 12346651}, {"filename": "/data/G4NEUTRONXS1.4/cap27", "start": 12346651, "end": 12374612}, {"filename": "/data/G4NEUTRONXS1.4/cap28", "start": 12374612, "end": 12401990}, {"filename": "/data/G4NEUTRONXS1.4/cap28_58", "start": 12401990, "end": 12429155}, {"filename": "/data/G4NEUTRONXS1.4/cap28_60", "start": 12429155, "end": 12456500}, {"filename": "/data/G4NEUTRONXS1.4/cap28_61", "start": 12456500, "end": 12483867}, {"filename": "/data/G4NEUTRONXS1.4/cap28_62", "start": 12483867, "end": 12511219}, {"filename": "/data/G4NEUTRONXS1.4/cap28_64", "start": 12511219, "end": 12538583}, {"filename": "/data/G4NEUTRONXS1.4/cap29", "start": 12538583, "end": 12566598}, {"filename": "/data/G4NEUTRONXS1.4/cap29_63", "start": 12566598, "end": 12594624}, {"filename": "/data/G4NEUTRONXS1.4/cap29_65", "start": 12594624, "end": 12622650}, {"filename": "/data/G4NEUTRONXS1.4/cap3", "start": 12622650, "end": 12626181}, {"filename": "/data/G4NEUTRONXS1.4/cap30", "start": 12626181, "end": 12654190}, {"filename": "/data/G4NEUTRONXS1.4/cap30_64", "start": 12654190, "end": 12682215}, {"filename": "/data/G4NEUTRONXS1.4/cap30_66", "start": 12682215, "end": 12710249}, {"filename": "/data/G4NEUTRONXS1.4/cap30_67", "start": 12710249, "end": 12738271}, {"filename": "/data/G4NEUTRONXS1.4/cap30_68", "start": 12738271, "end": 12766280}, {"filename": "/data/G4NEUTRONXS1.4/cap30_70", "start": 12766280, "end": 12794271}, {"filename": "/data/G4NEUTRONXS1.4/cap31", "start": 12794271, "end": 12822295}, {"filename": "/data/G4NEUTRONXS1.4/cap32", "start": 12822295, "end": 12850312}, {"filename": "/data/G4NEUTRONXS1.4/cap32_70", "start": 12850312, "end": 12878323}, {"filename": "/data/G4NEUTRONXS1.4/cap32_72", "start": 12878323, "end": 12906350}, {"filename": "/data/G4NEUTRONXS1.4/cap32_73", "start": 12906350, "end": 12934384}, {"filename": "/data/G4NEUTRONXS1.4/cap32_74", "start": 12934384, "end": 12962412}, {"filename": "/data/G4NEUTRONXS1.4/cap32_76", "start": 12962412, "end": 12990426}, {"filename": "/data/G4NEUTRONXS1.4/cap33", "start": 12990426, "end": 13018422}, {"filename": "/data/G4NEUTRONXS1.4/cap34", "start": 13018422, "end": 13046449}, {"filename": "/data/G4NEUTRONXS1.4/cap35", "start": 13046449, "end": 13074492}, {"filename": "/data/G4NEUTRONXS1.4/cap36", "start": 13074492, "end": 13102512}, {"filename": "/data/G4NEUTRONXS1.4/cap37", "start": 13102512, "end": 13130544}, {"filename": "/data/G4NEUTRONXS1.4/cap38", "start": 13130544, "end": 13158315}, {"filename": "/data/G4NEUTRONXS1.4/cap39", "start": 13158315, "end": 13186086}, {"filename": "/data/G4NEUTRONXS1.4/cap3_6", "start": 13186086, "end": 13189618}, {"filename": "/data/G4NEUTRONXS1.4/cap3_7", "start": 13189618, "end": 13193157}, {"filename": "/data/G4NEUTRONXS1.4/cap4", "start": 13193157, "end": 13196703}, {"filename": "/data/G4NEUTRONXS1.4/cap40", "start": 13196703, "end": 13224458}, {"filename": "/data/G4NEUTRONXS1.4/cap40_90", "start": 13224458, "end": 13252234}, {"filename": "/data/G4NEUTRONXS1.4/cap40_91", "start": 13252234, "end": 13279996}, {"filename": "/data/G4NEUTRONXS1.4/cap40_92", "start": 13279996, "end": 13307751}, {"filename": "/data/G4NEUTRONXS1.4/cap40_94", "start": 13307751, "end": 13335491}, {"filename": "/data/G4NEUTRONXS1.4/cap40_96", "start": 13335491, "end": 13363237}, {"filename": "/data/G4NEUTRONXS1.4/cap41", "start": 13363237, "end": 13391269}, {"filename": "/data/G4NEUTRONXS1.4/cap42", "start": 13391269, "end": 13419294}, {"filename": "/data/G4NEUTRONXS1.4/cap43", "start": 13419294, "end": 13447513}, {"filename": "/data/G4NEUTRONXS1.4/cap44", "start": 13447513, "end": 13475733}, {"filename": "/data/G4NEUTRONXS1.4/cap45", "start": 13475733, "end": 13503746}, {"filename": "/data/G4NEUTRONXS1.4/cap46", "start": 13503746, "end": 13531973}, {"filename": "/data/G4NEUTRONXS1.4/cap47", "start": 13531973, "end": 13560163}, {"filename": "/data/G4NEUTRONXS1.4/cap47_107", "start": 13560163, "end": 13588387}, {"filename": "/data/G4NEUTRONXS1.4/cap47_109", "start": 13588387, "end": 13616607}, {"filename": "/data/G4NEUTRONXS1.4/cap48", "start": 13616607, "end": 13644832}, {"filename": "/data/G4NEUTRONXS1.4/cap48_106", "start": 13644832, "end": 13673037}, {"filename": "/data/G4NEUTRONXS1.4/cap48_108", "start": 13673037, "end": 13701240}, {"filename": "/data/G4NEUTRONXS1.4/cap48_110", "start": 13701240, "end": 13729451}, {"filename": "/data/G4NEUTRONXS1.4/cap48_111", "start": 13729451, "end": 13757678}, {"filename": "/data/G4NEUTRONXS1.4/cap48_112", "start": 13757678, "end": 13785857}, {"filename": "/data/G4NEUTRONXS1.4/cap48_113", "start": 13785857, "end": 13813879}, {"filename": "/data/G4NEUTRONXS1.4/cap48_114", "start": 13813879, "end": 13842079}, {"filename": "/data/G4NEUTRONXS1.4/cap48_116", "start": 13842079, "end": 13870257}, {"filename": "/data/G4NEUTRONXS1.4/cap49", "start": 13870257, "end": 13898476}, {"filename": "/data/G4NEUTRONXS1.4/cap5", "start": 13898476, "end": 13901864}, {"filename": "/data/G4NEUTRONXS1.4/cap50", "start": 13901864, "end": 13930092}, {"filename": "/data/G4NEUTRONXS1.4/cap50_112", "start": 13930092, "end": 13958286}, {"filename": "/data/G4NEUTRONXS1.4/cap50_114", "start": 13958286, "end": 13986495}, {"filename": "/data/G4NEUTRONXS1.4/cap50_115", "start": 13986495, "end": 14014696}, {"filename": "/data/G4NEUTRONXS1.4/cap50_116", "start": 14014696, "end": 14042908}, {"filename": "/data/G4NEUTRONXS1.4/cap50_117", "start": 14042908, "end": 14071103}, {"filename": "/data/G4NEUTRONXS1.4/cap50_118", "start": 14071103, "end": 14099321}, {"filename": "/data/G4NEUTRONXS1.4/cap50_119", "start": 14099321, "end": 14127524}, {"filename": "/data/G4NEUTRONXS1.4/cap50_120", "start": 14127524, "end": 14155759}, {"filename": "/data/G4NEUTRONXS1.4/cap50_122", "start": 14155759, "end": 14183985}, {"filename": "/data/G4NEUTRONXS1.4/cap50_124", "start": 14183985, "end": 14212202}, {"filename": "/data/G4NEUTRONXS1.4/cap51", "start": 14212202, "end": 14240420}, {"filename": "/data/G4NEUTRONXS1.4/cap52", "start": 14240420, "end": 14268639}, {"filename": "/data/G4NEUTRONXS1.4/cap53", "start": 14268639, "end": 14296856}, {"filename": "/data/G4NEUTRONXS1.4/cap54", "start": 14296856, "end": 14325063}, {"filename": "/data/G4NEUTRONXS1.4/cap55", "start": 14325063, "end": 14353261}, {"filename": "/data/G4NEUTRONXS1.4/cap56", "start": 14353261, "end": 14381283}, {"filename": "/data/G4NEUTRONXS1.4/cap57", "start": 14381283, "end": 14409246}, {"filename": "/data/G4NEUTRONXS1.4/cap58", "start": 14409246, "end": 14437453}, {"filename": "/data/G4NEUTRONXS1.4/cap59", "start": 14437453, "end": 14465215}, {"filename": "/data/G4NEUTRONXS1.4/cap5_10", "start": 14465215, "end": 14467370}, {"filename": "/data/G4NEUTRONXS1.4/cap5_11", "start": 14467370, "end": 14470743}, {"filename": "/data/G4NEUTRONXS1.4/cap6", "start": 14470743, "end": 14474278}, {"filename": "/data/G4NEUTRONXS1.4/cap60", "start": 14474278, "end": 14502498}, {"filename": "/data/G4NEUTRONXS1.4/cap61", "start": 14502498, "end": 14530242}, {"filename": "/data/G4NEUTRONXS1.4/cap62", "start": 14530242, "end": 14558458}, {"filename": "/data/G4NEUTRONXS1.4/cap63", "start": 14558458, "end": 14586689}, {"filename": "/data/G4NEUTRONXS1.4/cap64", "start": 14586689, "end": 14614901}, {"filename": "/data/G4NEUTRONXS1.4/cap65", "start": 14614901, "end": 14642631}, {"filename": "/data/G4NEUTRONXS1.4/cap66", "start": 14642631, "end": 14670666}, {"filename": "/data/G4NEUTRONXS1.4/cap67", "start": 14670666, "end": 14698425}, {"filename": "/data/G4NEUTRONXS1.4/cap68", "start": 14698425, "end": 14726640}, {"filename": "/data/G4NEUTRONXS1.4/cap69", "start": 14726640, "end": 14754845}, {"filename": "/data/G4NEUTRONXS1.4/cap6_12", "start": 14754845, "end": 14758388}, {"filename": "/data/G4NEUTRONXS1.4/cap6_13", "start": 14758388, "end": 14761927}, {"filename": "/data/G4NEUTRONXS1.4/cap7", "start": 14761927, "end": 14765484}, {"filename": "/data/G4NEUTRONXS1.4/cap70", "start": 14765484, "end": 14793711}, {"filename": "/data/G4NEUTRONXS1.4/cap71", "start": 14793711, "end": 14821915}, {"filename": "/data/G4NEUTRONXS1.4/cap72", "start": 14821915, "end": 14850128}, {"filename": "/data/G4NEUTRONXS1.4/cap73", "start": 14850128, "end": 14878338}, {"filename": "/data/G4NEUTRONXS1.4/cap74", "start": 14878338, "end": 14906570}, {"filename": "/data/G4NEUTRONXS1.4/cap74_180", "start": 14906570, "end": 14934771}, {"filename": "/data/G4NEUTRONXS1.4/cap74_182", "start": 14934771, "end": 14962977}, {"filename": "/data/G4NEUTRONXS1.4/cap74_183", "start": 14962977, "end": 14991192}, {"filename": "/data/G4NEUTRONXS1.4/cap74_184", "start": 14991192, "end": 15019381}, {"filename": "/data/G4NEUTRONXS1.4/cap74_186", "start": 15019381, "end": 15047597}, {"filename": "/data/G4NEUTRONXS1.4/cap75", "start": 15047597, "end": 15075818}, {"filename": "/data/G4NEUTRONXS1.4/cap76", "start": 15075818, "end": 15104019}, {"filename": "/data/G4NEUTRONXS1.4/cap77", "start": 15104019, "end": 15132245}, {"filename": "/data/G4NEUTRONXS1.4/cap78", "start": 15132245, "end": 15160446}, {"filename": "/data/G4NEUTRONXS1.4/cap79", "start": 15160446, "end": 15188644}, {"filename": "/data/G4NEUTRONXS1.4/cap7_14", "start": 15188644, "end": 15192184}, {"filename": "/data/G4NEUTRONXS1.4/cap7_15", "start": 15192184, "end": 15195718}, {"filename": "/data/G4NEUTRONXS1.4/cap8", "start": 15195718, "end": 15199268}, {"filename": "/data/G4NEUTRONXS1.4/cap80", "start": 15199268, "end": 15227489}, {"filename": "/data/G4NEUTRONXS1.4/cap81", "start": 15227489, "end": 15255244}, {"filename": "/data/G4NEUTRONXS1.4/cap82", "start": 15255244, "end": 15283006}, {"filename": "/data/G4NEUTRONXS1.4/cap82_204", "start": 15283006, "end": 15310763}, {"filename": "/data/G4NEUTRONXS1.4/cap82_206", "start": 15310763, "end": 15338519}, {"filename": "/data/G4NEUTRONXS1.4/cap82_207", "start": 15338519, "end": 15366284}, {"filename": "/data/G4NEUTRONXS1.4/cap82_208", "start": 15366284, "end": 15394036}, {"filename": "/data/G4NEUTRONXS1.4/cap83", "start": 15394036, "end": 15421663}, {"filename": "/data/G4NEUTRONXS1.4/cap84", "start": 15421663, "end": 15449290}, {"filename": "/data/G4NEUTRONXS1.4/cap85", "start": 15449290, "end": 15476917}, {"filename": "/data/G4NEUTRONXS1.4/cap86", "start": 15476917, "end": 15505123}, {"filename": "/data/G4NEUTRONXS1.4/cap87", "start": 15505123, "end": 15533329}, {"filename": "/data/G4NEUTRONXS1.4/cap88", "start": 15533329, "end": 15561531}, {"filename": "/data/G4NEUTRONXS1.4/cap89", "start": 15561531, "end": 15589745}, {"filename": "/data/G4NEUTRONXS1.4/cap8_16", "start": 15589745, "end": 15593082}, {"filename": "/data/G4NEUTRONXS1.4/cap8_18", "start": 15593082, "end": 15596622}, {"filename": "/data/G4NEUTRONXS1.4/cap9", "start": 15596622, "end": 15600054}, {"filename": "/data/G4NEUTRONXS1.4/cap90", "start": 15600054, "end": 15628021}, {"filename": "/data/G4NEUTRONXS1.4/cap91", "start": 15628021, "end": 15656227}, {"filename": "/data/G4NEUTRONXS1.4/cap92", "start": 15656227, "end": 15684444}, {"filename": "/data/G4NEUTRONXS1.4/cap92_235", "start": 15684444, "end": 15712649}, {"filename": "/data/G4NEUTRONXS1.4/cap92_238", "start": 15712649, "end": 15740853}, {"filename": "/data/G4NEUTRONXS1.4/elast1", "start": 15740853, "end": 15743563}, {"filename": "/data/G4NEUTRONXS1.4/elast10", "start": 15743563, "end": 15746351}, {"filename": "/data/G4NEUTRONXS1.4/elast11", "start": 15746351, "end": 15753159}, {"filename": "/data/G4NEUTRONXS1.4/elast12", "start": 15753159, "end": 15759856}, {"filename": "/data/G4NEUTRONXS1.4/elast13", "start": 15759856, "end": 15766515}, {"filename": "/data/G4NEUTRONXS1.4/elast14", "start": 15766515, "end": 15773204}, {"filename": "/data/G4NEUTRONXS1.4/elast15", "start": 15773204, "end": 15779749}, {"filename": "/data/G4NEUTRONXS1.4/elast16", "start": 15779749, "end": 15786509}, {"filename": "/data/G4NEUTRONXS1.4/elast17", "start": 15786509, "end": 15793403}, {"filename": "/data/G4NEUTRONXS1.4/elast18", "start": 15793403, "end": 15800152}, {"filename": "/data/G4NEUTRONXS1.4/elast19", "start": 15800152, "end": 15807044}, {"filename": "/data/G4NEUTRONXS1.4/elast2", "start": 15807044, "end": 15809720}, {"filename": "/data/G4NEUTRONXS1.4/elast20", "start": 15809720, "end": 15816460}, {"filename": "/data/G4NEUTRONXS1.4/elast21", "start": 15816460, "end": 15823292}, {"filename": "/data/G4NEUTRONXS1.4/elast22", "start": 15823292, "end": 15830133}, {"filename": "/data/G4NEUTRONXS1.4/elast23", "start": 15830133, "end": 15836967}, {"filename": "/data/G4NEUTRONXS1.4/elast24", "start": 15836967, "end": 15843803}, {"filename": "/data/G4NEUTRONXS1.4/elast25", "start": 15843803, "end": 15850685}, {"filename": "/data/G4NEUTRONXS1.4/elast26", "start": 15850685, "end": 15857511}, {"filename": "/data/G4NEUTRONXS1.4/elast27", "start": 15857511, "end": 15864396}, {"filename": "/data/G4NEUTRONXS1.4/elast28", "start": 15864396, "end": 15871225}, {"filename": "/data/G4NEUTRONXS1.4/elast29", "start": 15871225, "end": 15878029}, {"filename": "/data/G4NEUTRONXS1.4/elast3", "start": 15878029, "end": 15880726}, {"filename": "/data/G4NEUTRONXS1.4/elast30", "start": 15880726, "end": 15887613}, {"filename": "/data/G4NEUTRONXS1.4/elast31", "start": 15887613, "end": 15894499}, {"filename": "/data/G4NEUTRONXS1.4/elast32", "start": 15894499, "end": 15901384}, {"filename": "/data/G4NEUTRONXS1.4/elast33", "start": 15901384, "end": 15908269}, {"filename": "/data/G4NEUTRONXS1.4/elast34", "start": 15908269, "end": 15915165}, {"filename": "/data/G4NEUTRONXS1.4/elast35", "start": 15915165, "end": 15922054}, {"filename": "/data/G4NEUTRONXS1.4/elast36", "start": 15922054, "end": 15928935}, {"filename": "/data/G4NEUTRONXS1.4/elast37", "start": 15928935, "end": 15935826}, {"filename": "/data/G4NEUTRONXS1.4/elast38", "start": 15935826, "end": 15942663}, {"filename": "/data/G4NEUTRONXS1.4/elast39", "start": 15942663, "end": 15949497}, {"filename": "/data/G4NEUTRONXS1.4/elast4", "start": 15949497, "end": 15952152}, {"filename": "/data/G4NEUTRONXS1.4/elast40", "start": 15952152, "end": 15958993}, {"filename": "/data/G4NEUTRONXS1.4/elast41", "start": 15958993, "end": 15965824}, {"filename": "/data/G4NEUTRONXS1.4/elast42", "start": 15965824, "end": 15972702}, {"filename": "/data/G4NEUTRONXS1.4/elast43", "start": 15972702, "end": 15979647}, {"filename": "/data/G4NEUTRONXS1.4/elast44", "start": 15979647, "end": 15986595}, {"filename": "/data/G4NEUTRONXS1.4/elast45", "start": 15986595, "end": 15993535}, {"filename": "/data/G4NEUTRONXS1.4/elast46", "start": 15993535, "end": 16000481}, {"filename": "/data/G4NEUTRONXS1.4/elast47", "start": 16000481, "end": 16007420}, {"filename": "/data/G4NEUTRONXS1.4/elast48", "start": 16007420, "end": 16014362}, {"filename": "/data/G4NEUTRONXS1.4/elast49", "start": 16014362, "end": 16021314}, {"filename": "/data/G4NEUTRONXS1.4/elast5", "start": 16021314, "end": 16024013}, {"filename": "/data/G4NEUTRONXS1.4/elast50", "start": 16024013, "end": 16030956}, {"filename": "/data/G4NEUTRONXS1.4/elast51", "start": 16030956, "end": 16037906}, {"filename": "/data/G4NEUTRONXS1.4/elast52", "start": 16037906, "end": 16044852}, {"filename": "/data/G4NEUTRONXS1.4/elast53", "start": 16044852, "end": 16051735}, {"filename": "/data/G4NEUTRONXS1.4/elast54", "start": 16051735, "end": 16058682}, {"filename": "/data/G4NEUTRONXS1.4/elast55", "start": 16058682, "end": 16065618}, {"filename": "/data/G4NEUTRONXS1.4/elast56", "start": 16065618, "end": 16072516}, {"filename": "/data/G4NEUTRONXS1.4/elast57", "start": 16072516, "end": 16079458}, {"filename": "/data/G4NEUTRONXS1.4/elast58", "start": 16079458, "end": 16086287}, {"filename": "/data/G4NEUTRONXS1.4/elast59", "start": 16086287, "end": 16093121}, {"filename": "/data/G4NEUTRONXS1.4/elast6", "start": 16093121, "end": 16095819}, {"filename": "/data/G4NEUTRONXS1.4/elast60", "start": 16095819, "end": 16102764}, {"filename": "/data/G4NEUTRONXS1.4/elast61", "start": 16102764, "end": 16109593}, {"filename": "/data/G4NEUTRONXS1.4/elast62", "start": 16109593, "end": 16116539}, {"filename": "/data/G4NEUTRONXS1.4/elast63", "start": 16116539, "end": 16123479}, {"filename": "/data/G4NEUTRONXS1.4/elast64", "start": 16123479, "end": 16130418}, {"filename": "/data/G4NEUTRONXS1.4/elast65", "start": 16130418, "end": 16137253}, {"filename": "/data/G4NEUTRONXS1.4/elast66", "start": 16137253, "end": 16144145}, {"filename": "/data/G4NEUTRONXS1.4/elast67", "start": 16144145, "end": 16150965}, {"filename": "/data/G4NEUTRONXS1.4/elast68", "start": 16150965, "end": 16157911}, {"filename": "/data/G4NEUTRONXS1.4/elast69", "start": 16157911, "end": 16164857}, {"filename": "/data/G4NEUTRONXS1.4/elast7", "start": 16164857, "end": 16167583}, {"filename": "/data/G4NEUTRONXS1.4/elast70", "start": 16167583, "end": 16174533}, {"filename": "/data/G4NEUTRONXS1.4/elast71", "start": 16174533, "end": 16181477}, {"filename": "/data/G4NEUTRONXS1.4/elast72", "start": 16181477, "end": 16188421}, {"filename": "/data/G4NEUTRONXS1.4/elast73", "start": 16188421, "end": 16195365}, {"filename": "/data/G4NEUTRONXS1.4/elast74", "start": 16195365, "end": 16202268}, {"filename": "/data/G4NEUTRONXS1.4/elast75", "start": 16202268, "end": 16209204}, {"filename": "/data/G4NEUTRONXS1.4/elast76", "start": 16209204, "end": 16216145}, {"filename": "/data/G4NEUTRONXS1.4/elast77", "start": 16216145, "end": 16223089}, {"filename": "/data/G4NEUTRONXS1.4/elast78", "start": 16223089, "end": 16230036}, {"filename": "/data/G4NEUTRONXS1.4/elast79", "start": 16230036, "end": 16236982}, {"filename": "/data/G4NEUTRONXS1.4/elast8", "start": 16236982, "end": 16239670}, {"filename": "/data/G4NEUTRONXS1.4/elast80", "start": 16239670, "end": 16246603}, {"filename": "/data/G4NEUTRONXS1.4/elast81", "start": 16246603, "end": 16253438}, {"filename": "/data/G4NEUTRONXS1.4/elast82", "start": 16253438, "end": 16260204}, {"filename": "/data/G4NEUTRONXS1.4/elast83", "start": 16260204, "end": 16267031}, {"filename": "/data/G4NEUTRONXS1.4/elast84", "start": 16267031, "end": 16273858}, {"filename": "/data/G4NEUTRONXS1.4/elast85", "start": 16273858, "end": 16280689}, {"filename": "/data/G4NEUTRONXS1.4/elast86", "start": 16280689, "end": 16287530}, {"filename": "/data/G4NEUTRONXS1.4/elast87", "start": 16287530, "end": 16294366}, {"filename": "/data/G4NEUTRONXS1.4/elast88", "start": 16294366, "end": 16301248}, {"filename": "/data/G4NEUTRONXS1.4/elast89", "start": 16301248, "end": 16308194}, {"filename": "/data/G4NEUTRONXS1.4/elast9", "start": 16308194, "end": 16310892}, {"filename": "/data/G4NEUTRONXS1.4/elast90", "start": 16310892, "end": 16317785}, {"filename": "/data/G4NEUTRONXS1.4/elast91", "start": 16317785, "end": 16324650}, {"filename": "/data/G4NEUTRONXS1.4/elast92", "start": 16324650, "end": 16331584}, {"filename": "/data/G4NEUTRONXS1.4/inelast1", "start": 16331584, "end": 16334220}, {"filename": "/data/G4NEUTRONXS1.4/inelast10", "start": 16334220, "end": 16337002}, {"filename": "/data/G4NEUTRONXS1.4/inelast11", "start": 16337002, "end": 16342184}, {"filename": "/data/G4NEUTRONXS1.4/inelast12", "start": 16342184, "end": 16347457}, {"filename": "/data/G4NEUTRONXS1.4/inelast13", "start": 16347457, "end": 16352641}, {"filename": "/data/G4NEUTRONXS1.4/inelast14", "start": 16352641, "end": 16357802}, {"filename": "/data/G4NEUTRONXS1.4/inelast14_28", "start": 16357802, "end": 16359200}, {"filename": "/data/G4NEUTRONXS1.4/inelast14_29", "start": 16359200, "end": 16360762}, {"filename": "/data/G4NEUTRONXS1.4/inelast14_30", "start": 16360762, "end": 16362025}, {"filename": "/data/G4NEUTRONXS1.4/inelast15", "start": 16362025, "end": 16367207}, {"filename": "/data/G4NEUTRONXS1.4/inelast16", "start": 16367207, "end": 16372756}, {"filename": "/data/G4NEUTRONXS1.4/inelast17", "start": 16372756, "end": 16378311}, {"filename": "/data/G4NEUTRONXS1.4/inelast18", "start": 16378311, "end": 16383307}, {"filename": "/data/G4NEUTRONXS1.4/inelast18_36", "start": 16383307, "end": 16385140}, {"filename": "/data/G4NEUTRONXS1.4/inelast18_40", "start": 16385140, "end": 16386459}, {"filename": "/data/G4NEUTRONXS1.4/inelast19", "start": 16386459, "end": 16392002}, {"filename": "/data/G4NEUTRONXS1.4/inelast2", "start": 16392002, "end": 16394500}, {"filename": "/data/G4NEUTRONXS1.4/inelast20", "start": 16394500, "end": 16399750}, {"filename": "/data/G4NEUTRONXS1.4/inelast20_40", "start": 16399750, "end": 16402100}, {"filename": "/data/G4NEUTRONXS1.4/inelast20_42", "start": 16402100, "end": 16403560}, {"filename": "/data/G4NEUTRONXS1.4/inelast20_43", "start": 16403560, "end": 16405903}, {"filename": "/data/G4NEUTRONXS1.4/inelast20_44", "start": 16405903, "end": 16407230}, {"filename": "/data/G4NEUTRONXS1.4/inelast20_48", "start": 16407230, "end": 16408030}, {"filename": "/data/G4NEUTRONXS1.4/inelast21", "start": 16408030, "end": 16413316}, {"filename": "/data/G4NEUTRONXS1.4/inelast22", "start": 16413316, "end": 16417970}, {"filename": "/data/G4NEUTRONXS1.4/inelast23", "start": 16417970, "end": 16423247}, {"filename": "/data/G4NEUTRONXS1.4/inelast24", "start": 16423247, "end": 16428502}, {"filename": "/data/G4NEUTRONXS1.4/inelast25", "start": 16428502, "end": 16433774}, {"filename": "/data/G4NEUTRONXS1.4/inelast26", "start": 16433774, "end": 16438977}, {"filename": "/data/G4NEUTRONXS1.4/inelast26_54", "start": 16438977, "end": 16440276}, {"filename": "/data/G4NEUTRONXS1.4/inelast26_56", "start": 16440276, "end": 16441508}, {"filename": "/data/G4NEUTRONXS1.4/inelast26_57", "start": 16441508, "end": 16444285}, {"filename": "/data/G4NEUTRONXS1.4/inelast26_58", "start": 16444285, "end": 16445516}, {"filename": "/data/G4NEUTRONXS1.4/inelast27", "start": 16445516, "end": 16450768}, {"filename": "/data/G4NEUTRONXS1.4/inelast28", "start": 16450768, "end": 16456067}, {"filename": "/data/G4NEUTRONXS1.4/inelast28_58", "start": 16456067, "end": 16457739}, {"filename": "/data/G4NEUTRONXS1.4/inelast28_60", "start": 16457739, "end": 16460120}, {"filename": "/data/G4NEUTRONXS1.4/inelast28_61", "start": 16460120, "end": 16462582}, {"filename": "/data/G4NEUTRONXS1.4/inelast28_62", "start": 16462582, "end": 16463878}, {"filename": "/data/G4NEUTRONXS1.4/inelast28_64", "start": 16463878, "end": 16465110}, {"filename": "/data/G4NEUTRONXS1.4/inelast29", "start": 16465110, "end": 16470282}, {"filename": "/data/G4NEUTRONXS1.4/inelast29_63", "start": 16470282, "end": 16472051}, {"filename": "/data/G4NEUTRONXS1.4/inelast29_65", "start": 16472051, "end": 16473812}, {"filename": "/data/G4NEUTRONXS1.4/inelast3", "start": 16473812, "end": 16476595}, {"filename": "/data/G4NEUTRONXS1.4/inelast30", "start": 16476595, "end": 16481864}, {"filename": "/data/G4NEUTRONXS1.4/inelast30_64", "start": 16481864, "end": 16483946}, {"filename": "/data/G4NEUTRONXS1.4/inelast30_66", "start": 16483946, "end": 16485642}, {"filename": "/data/G4NEUTRONXS1.4/inelast30_67", "start": 16485642, "end": 16487726}, {"filename": "/data/G4NEUTRONXS1.4/inelast30_68", "start": 16487726, "end": 16489422}, {"filename": "/data/G4NEUTRONXS1.4/inelast30_70", "start": 16489422, "end": 16491088}, {"filename": "/data/G4NEUTRONXS1.4/inelast31", "start": 16491088, "end": 16496282}, {"filename": "/data/G4NEUTRONXS1.4/inelast32", "start": 16496282, "end": 16501601}, {"filename": "/data/G4NEUTRONXS1.4/inelast32_70", "start": 16501601, "end": 16504237}, {"filename": "/data/G4NEUTRONXS1.4/inelast32_72", "start": 16504237, "end": 16505641}, {"filename": "/data/G4NEUTRONXS1.4/inelast32_73", "start": 16505641, "end": 16508285}, {"filename": "/data/G4NEUTRONXS1.4/inelast32_74", "start": 16508285, "end": 16509757}, {"filename": "/data/G4NEUTRONXS1.4/inelast32_76", "start": 16509757, "end": 16511261}, {"filename": "/data/G4NEUTRONXS1.4/inelast33", "start": 16511261, "end": 16516037}, {"filename": "/data/G4NEUTRONXS1.4/inelast34", "start": 16516037, "end": 16520586}, {"filename": "/data/G4NEUTRONXS1.4/inelast35", "start": 16520586, "end": 16525828}, {"filename": "/data/G4NEUTRONXS1.4/inelast36", "start": 16525828, "end": 16531108}, {"filename": "/data/G4NEUTRONXS1.4/inelast37", "start": 16531108, "end": 16536392}, {"filename": "/data/G4NEUTRONXS1.4/inelast38", "start": 16536392, "end": 16541131}, {"filename": "/data/G4NEUTRONXS1.4/inelast39", "start": 16541131, "end": 16545501}, {"filename": "/data/G4NEUTRONXS1.4/inelast3_6", "start": 16545501, "end": 16547539}, {"filename": "/data/G4NEUTRONXS1.4/inelast3_7", "start": 16547539, "end": 16548022}, {"filename": "/data/G4NEUTRONXS1.4/inelast4", "start": 16548022, "end": 16550157}, {"filename": "/data/G4NEUTRONXS1.4/inelast40", "start": 16550157, "end": 16554524}, {"filename": "/data/G4NEUTRONXS1.4/inelast40_90", "start": 16554524, "end": 16555822}, {"filename": "/data/G4NEUTRONXS1.4/inelast40_91", "start": 16555822, "end": 16557253}, {"filename": "/data/G4NEUTRONXS1.4/inelast40_92", "start": 16557253, "end": 16558687}, {"filename": "/data/G4NEUTRONXS1.4/inelast40_94", "start": 16558687, "end": 16560123}, {"filename": "/data/G4NEUTRONXS1.4/inelast40_96", "start": 16560123, "end": 16561326}, {"filename": "/data/G4NEUTRONXS1.4/inelast41", "start": 16561326, "end": 16566651}, {"filename": "/data/G4NEUTRONXS1.4/inelast42", "start": 16566651, "end": 16571917}, {"filename": "/data/G4NEUTRONXS1.4/inelast43", "start": 16571917, "end": 16577200}, {"filename": "/data/G4NEUTRONXS1.4/inelast44", "start": 16577200, "end": 16582492}, {"filename": "/data/G4NEUTRONXS1.4/inelast45", "start": 16582492, "end": 16587777}, {"filename": "/data/G4NEUTRONXS1.4/inelast46", "start": 16587777, "end": 16593071}, {"filename": "/data/G4NEUTRONXS1.4/inelast47", "start": 16593071, "end": 16598353}, {"filename": "/data/G4NEUTRONXS1.4/inelast47_107", "start": 16598353, "end": 16600709}, {"filename": "/data/G4NEUTRONXS1.4/inelast47_109", "start": 16600709, "end": 16603064}, {"filename": "/data/G4NEUTRONXS1.4/inelast48", "start": 16603064, "end": 16608202}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_106", "start": 16608202, "end": 16610319}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_108", "start": 16610319, "end": 16611950}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_110", "start": 16611950, "end": 16613541}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_111", "start": 16613541, "end": 16615607}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_112", "start": 16615607, "end": 16617719}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_113", "start": 16617719, "end": 16619752}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_114", "start": 16619752, "end": 16621448}, {"filename": "/data/G4NEUTRONXS1.4/inelast48_116", "start": 16621448, "end": 16623176}, {"filename": "/data/G4NEUTRONXS1.4/inelast49", "start": 16623176, "end": 16627857}, {"filename": "/data/G4NEUTRONXS1.4/inelast5", "start": 16627857, "end": 16630638}, {"filename": "/data/G4NEUTRONXS1.4/inelast50", "start": 16630638, "end": 16635704}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_112", "start": 16635704, "end": 16636810}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_114", "start": 16636810, "end": 16637911}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_115", "start": 16637911, "end": 16639386}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_116", "start": 16639386, "end": 16640488}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_117", "start": 16640488, "end": 16642403}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_118", "start": 16642403, "end": 16643512}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_119", "start": 16643512, "end": 16646196}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_120", "start": 16646196, "end": 16647338}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_122", "start": 16647338, "end": 16648477}, {"filename": "/data/G4NEUTRONXS1.4/inelast50_124", "start": 16648477, "end": 16649618}, {"filename": "/data/G4NEUTRONXS1.4/inelast51", "start": 16649618, "end": 16654492}, {"filename": "/data/G4NEUTRONXS1.4/inelast52", "start": 16654492, "end": 16659944}, {"filename": "/data/G4NEUTRONXS1.4/inelast53", "start": 16659944, "end": 16665243}, {"filename": "/data/G4NEUTRONXS1.4/inelast54", "start": 16665243, "end": 16670561}, {"filename": "/data/G4NEUTRONXS1.4/inelast55", "start": 16670561, "end": 16675839}, {"filename": "/data/G4NEUTRONXS1.4/inelast56", "start": 16675839, "end": 16680058}, {"filename": "/data/G4NEUTRONXS1.4/inelast57", "start": 16680058, "end": 16685342}, {"filename": "/data/G4NEUTRONXS1.4/inelast58", "start": 16685342, "end": 16689519}, {"filename": "/data/G4NEUTRONXS1.4/inelast59", "start": 16689519, "end": 16693377}, {"filename": "/data/G4NEUTRONXS1.4/inelast5_10", "start": 16693377, "end": 16695422}, {"filename": "/data/G4NEUTRONXS1.4/inelast5_11", "start": 16695422, "end": 16695770}, {"filename": "/data/G4NEUTRONXS1.4/inelast6", "start": 16695770, "end": 16698271}, {"filename": "/data/G4NEUTRONXS1.4/inelast60", "start": 16698271, "end": 16703820}, {"filename": "/data/G4NEUTRONXS1.4/inelast61", "start": 16703820, "end": 16709088}, {"filename": "/data/G4NEUTRONXS1.4/inelast62", "start": 16709088, "end": 16714635}, {"filename": "/data/G4NEUTRONXS1.4/inelast63", "start": 16714635, "end": 16717797}, {"filename": "/data/G4NEUTRONXS1.4/inelast64", "start": 16717797, "end": 16723344}, {"filename": "/data/G4NEUTRONXS1.4/inelast65", "start": 16723344, "end": 16728648}, {"filename": "/data/G4NEUTRONXS1.4/inelast66", "start": 16728648, "end": 16732358}, {"filename": "/data/G4NEUTRONXS1.4/inelast67", "start": 16732358, "end": 16737567}, {"filename": "/data/G4NEUTRONXS1.4/inelast68", "start": 16737567, "end": 16742854}, {"filename": "/data/G4NEUTRONXS1.4/inelast69", "start": 16742854, "end": 16748145}, {"filename": "/data/G4NEUTRONXS1.4/inelast6_12", "start": 16748145, "end": 16748597}, {"filename": "/data/G4NEUTRONXS1.4/inelast6_13", "start": 16748597, "end": 16749047}, {"filename": "/data/G4NEUTRONXS1.4/inelast7", "start": 16749047, "end": 16751800}, {"filename": "/data/G4NEUTRONXS1.4/inelast70", "start": 16751800, "end": 16757079}, {"filename": "/data/G4NEUTRONXS1.4/inelast71", "start": 16757079, "end": 16762358}, {"filename": "/data/G4NEUTRONXS1.4/inelast72", "start": 16762358, "end": 16767648}, {"filename": "/data/G4NEUTRONXS1.4/inelast73", "start": 16767648, "end": 16772968}, {"filename": "/data/G4NEUTRONXS1.4/inelast74", "start": 16772968, "end": 16778175}, {"filename": "/data/G4NEUTRONXS1.4/inelast74_180", "start": 16778175, "end": 16780421}, {"filename": "/data/G4NEUTRONXS1.4/inelast74_182", "start": 16780421, "end": 16782669}, {"filename": "/data/G4NEUTRONXS1.4/inelast74_183", "start": 16782669, "end": 16785229}, {"filename": "/data/G4NEUTRONXS1.4/inelast74_184", "start": 16785229, "end": 16787404}, {"filename": "/data/G4NEUTRONXS1.4/inelast74_186", "start": 16787404, "end": 16789551}, {"filename": "/data/G4NEUTRONXS1.4/inelast75", "start": 16789551, "end": 16794534}, {"filename": "/data/G4NEUTRONXS1.4/inelast76", "start": 16794534, "end": 16799733}, {"filename": "/data/G4NEUTRONXS1.4/inelast77", "start": 16799733, "end": 16804158}, {"filename": "/data/G4NEUTRONXS1.4/inelast78", "start": 16804158, "end": 16809417}, {"filename": "/data/G4NEUTRONXS1.4/inelast79", "start": 16809417, "end": 16814694}, {"filename": "/data/G4NEUTRONXS1.4/inelast7_14", "start": 16814694, "end": 16816731}, {"filename": "/data/G4NEUTRONXS1.4/inelast7_15", "start": 16816731, "end": 16816971}, {"filename": "/data/G4NEUTRONXS1.4/inelast8", "start": 16816971, "end": 16819741}, {"filename": "/data/G4NEUTRONXS1.4/inelast80", "start": 16819741, "end": 16825087}, {"filename": "/data/G4NEUTRONXS1.4/inelast81", "start": 16825087, "end": 16830016}, {"filename": "/data/G4NEUTRONXS1.4/inelast82", "start": 16830016, "end": 16835102}, {"filename": "/data/G4NEUTRONXS1.4/inelast82_204", "start": 16835102, "end": 16836938}, {"filename": "/data/G4NEUTRONXS1.4/inelast82_206", "start": 16836938, "end": 16838724}, {"filename": "/data/G4NEUTRONXS1.4/inelast82_207", "start": 16838724, "end": 16840559}, {"filename": "/data/G4NEUTRONXS1.4/inelast82_208", "start": 16840559, "end": 16841651}, {"filename": "/data/G4NEUTRONXS1.4/inelast83", "start": 16841651, "end": 16846911}, {"filename": "/data/G4NEUTRONXS1.4/inelast84", "start": 16846911, "end": 16852171}, {"filename": "/data/G4NEUTRONXS1.4/inelast85", "start": 16852171, "end": 16857435}, {"filename": "/data/G4NEUTRONXS1.4/inelast86", "start": 16857435, "end": 16861575}, {"filename": "/data/G4NEUTRONXS1.4/inelast87", "start": 16861575, "end": 16866898}, {"filename": "/data/G4NEUTRONXS1.4/inelast88", "start": 16866898, "end": 16872188}, {"filename": "/data/G4NEUTRONXS1.4/inelast89", "start": 16872188, "end": 16875285}, {"filename": "/data/G4NEUTRONXS1.4/inelast8_16", "start": 16875285, "end": 16875594}, {"filename": "/data/G4NEUTRONXS1.4/inelast8_18", "start": 16875594, "end": 16877629}, {"filename": "/data/G4NEUTRONXS1.4/inelast9", "start": 16877629, "end": 16880278}, {"filename": "/data/G4NEUTRONXS1.4/inelast90", "start": 16880278, "end": 16885538}, {"filename": "/data/G4NEUTRONXS1.4/inelast91", "start": 16885538, "end": 16890851}, {"filename": "/data/G4NEUTRONXS1.4/inelast92", "start": 16890851, "end": 16894894}, {"filename": "/data/G4NEUTRONXS1.4/inelast92_235", "start": 16894894, "end": 16897098}, {"filename": "/data/G4NEUTRONXS1.4/inelast92_238", "start": 16897098, "end": 16898925}, {"filename": "/data/G4SAIDDATA1.1/History", "start": 16898925, "end": 16899284}, {"filename": "/data/G4SAIDDATA1.1/README_Eta", "start": 16899284, "end": 16899689}, {"filename": "/data/G4SAIDDATA1.1/README_Etap", "start": 16899689, "end": 16900125}, {"filename": "/data/G4SAIDDATA1.1/README_NN", "start": 16900125, "end": 16900632}, {"filename": "/data/G4SAIDDATA1.1/README_gN", "start": 16900632, "end": 16901118}, {"filename": "/data/G4SAIDDATA1.1/README_piN", "start": 16901118, "end": 16901660}, {"filename": "/data/G4SAIDDATA1.1/gn_pi-p.dat", "start": 16901660, "end": 16908096}, {"filename": "/data/G4SAIDDATA1.1/gn_pi0n.dat", "start": 16908096, "end": 16914693}, {"filename": "/data/G4SAIDDATA1.1/gp_etap.dat", "start": 16914693, "end": 16920370}, {"filename": "/data/G4SAIDDATA1.1/gp_etapp.dat", "start": 16920370, "end": 16924577}, {"filename": "/data/G4SAIDDATA1.1/gp_pi+n.dat", "start": 16924577, "end": 16930852}, {"filename": "/data/G4SAIDDATA1.1/gp_pi0p.dat", "start": 16930852, "end": 16937449}, {"filename": "/data/G4SAIDDATA1.1/np_el.dat", "start": 16937449, "end": 16942055}, {"filename": "/data/G4SAIDDATA1.1/np_in.dat", "start": 16942055, "end": 16945313}, {"filename": "/data/G4SAIDDATA1.1/pie.dat", "start": 16945313, "end": 16946524}, {"filename": "/data/G4SAIDDATA1.1/pim_el.dat", "start": 16946524, "end": 16955640}, {"filename": "/data/G4SAIDDATA1.1/pim_in.dat", "start": 16955640, "end": 16964404}, {"filename": "/data/G4SAIDDATA1.1/pin.dat", "start": 16964404, "end": 16969443}, {"filename": "/data/G4SAIDDATA1.1/pip_el.dat", "start": 16969443, "end": 16977805}, {"filename": "/data/G4SAIDDATA1.1/pip_in.dat", "start": 16977805, "end": 16985489}, {"filename": "/data/G4SAIDDATA1.1/pp_el.dat", "start": 16985489, "end": 16995362}, {"filename": "/data/G4SAIDDATA1.1/pp_in.dat", "start": 16995362, "end": 17003900}, {"filename": "/data/PhotonEvaporation5.2/History", "start": 17003900, "end": 17008869}, {"filename": "/data/PhotonEvaporation5.2/README-LevelGammaData", "start": 17008869, "end": 17011753}, {"filename": "/data/PhotonEvaporation5.2/z1.a1", "start": 17011753, "end": 17011792}, {"filename": "/data/PhotonEvaporation5.2/z1.a2", "start": 17011792, "end": 17011831}, {"filename": "/data/PhotonEvaporation5.2/z1.a3", "start": 17011831, "end": 17011870}, {"filename": "/data/PhotonEvaporation5.2/z1.a4", "start": 17011870, "end": 17012026}, {"filename": "/data/PhotonEvaporation5.2/z1.a5", "start": 17012026, "end": 17012065}, {"filename": "/data/PhotonEvaporation5.2/z1.a6", "start": 17012065, "end": 17012104}, {"filename": "/data/PhotonEvaporation5.2/z10.a16", "start": 17012104, "end": 17012182}, {"filename": "/data/PhotonEvaporation5.2/z10.a17", "start": 17012182, "end": 17012221}, {"filename": "/data/PhotonEvaporation5.2/z10.a18", "start": 17012221, "end": 17013819}, {"filename": "/data/PhotonEvaporation5.2/z10.a19", "start": 17013819, "end": 17019714}, {"filename": "/data/PhotonEvaporation5.2/z10.a20", "start": 17019714, "end": 17037809}, {"filename": "/data/PhotonEvaporation5.2/z10.a21", "start": 17037809, "end": 17057320}, {"filename": "/data/PhotonEvaporation5.2/z10.a22", "start": 17057320, "end": 17077376}, {"filename": "/data/PhotonEvaporation5.2/z10.a23", "start": 17077376, "end": 17082409}, {"filename": "/data/PhotonEvaporation5.2/z10.a24", "start": 17082409, "end": 17085870}, {"filename": "/data/PhotonEvaporation5.2/z10.a25", "start": 17085870, "end": 17086605}, {"filename": "/data/PhotonEvaporation5.2/z10.a26", "start": 17086605, "end": 17087105}, {"filename": "/data/PhotonEvaporation5.2/z10.a27", "start": 17087105, "end": 17087466}, {"filename": "/data/PhotonEvaporation5.2/z10.a28", "start": 17087466, "end": 17088192}, {"filename": "/data/PhotonEvaporation5.2/z10.a29", "start": 17088192, "end": 17088792}, {"filename": "/data/PhotonEvaporation5.2/z10.a30", "start": 17088792, "end": 17089205}, {"filename": "/data/PhotonEvaporation5.2/z100.a241", "start": 17089205, "end": 17089244}, {"filename": "/data/PhotonEvaporation5.2/z100.a242", "start": 17089244, "end": 17089283}, {"filename": "/data/PhotonEvaporation5.2/z100.a243", "start": 17089283, "end": 17089322}, {"filename": "/data/PhotonEvaporation5.2/z100.a244", "start": 17089322, "end": 17089361}, {"filename": "/data/PhotonEvaporation5.2/z100.a245", "start": 17089361, "end": 17089400}, {"filename": "/data/PhotonEvaporation5.2/z100.a246", "start": 17089400, "end": 17089478}, {"filename": "/data/PhotonEvaporation5.2/z100.a247", "start": 17089478, "end": 17089555}, {"filename": "/data/PhotonEvaporation5.2/z100.a248", "start": 17089555, "end": 17091316}, {"filename": "/data/PhotonEvaporation5.2/z100.a249", "start": 17091316, "end": 17092812}, {"filename": "/data/PhotonEvaporation5.2/z100.a250", "start": 17092812, "end": 17092929}, {"filename": "/data/PhotonEvaporation5.2/z100.a251", "start": 17092929, "end": 17094729}, {"filename": "/data/PhotonEvaporation5.2/z100.a252", "start": 17094729, "end": 17094807}, {"filename": "/data/PhotonEvaporation5.2/z100.a253", "start": 17094807, "end": 17096973}, {"filename": "/data/PhotonEvaporation5.2/z100.a254", "start": 17096973, "end": 17098352}, {"filename": "/data/PhotonEvaporation5.2/z100.a255", "start": 17098352, "end": 17098913}, {"filename": "/data/PhotonEvaporation5.2/z100.a256", "start": 17098913, "end": 17107001}, {"filename": "/data/PhotonEvaporation5.2/z100.a257", "start": 17107001, "end": 17107040}, {"filename": "/data/PhotonEvaporation5.2/z100.a258", "start": 17107040, "end": 17107079}, {"filename": "/data/PhotonEvaporation5.2/z100.a259", "start": 17107079, "end": 17107118}, {"filename": "/data/PhotonEvaporation5.2/z101.a245", "start": 17107118, "end": 17107196}, {"filename": "/data/PhotonEvaporation5.2/z101.a246", "start": 17107196, "end": 17107313}, {"filename": "/data/PhotonEvaporation5.2/z101.a247", "start": 17107313, "end": 17107352}, {"filename": "/data/PhotonEvaporation5.2/z101.a248", "start": 17107352, "end": 17107430}, {"filename": "/data/PhotonEvaporation5.2/z101.a249", "start": 17107430, "end": 17107547}, {"filename": "/data/PhotonEvaporation5.2/z101.a250", "start": 17107547, "end": 17107664}, {"filename": "/data/PhotonEvaporation5.2/z101.a251", "start": 17107664, "end": 17109538}, {"filename": "/data/PhotonEvaporation5.2/z101.a252", "start": 17109538, "end": 17109811}, {"filename": "/data/PhotonEvaporation5.2/z101.a253", "start": 17109811, "end": 17109928}, {"filename": "/data/PhotonEvaporation5.2/z101.a254", "start": 17109928, "end": 17110201}, {"filename": "/data/PhotonEvaporation5.2/z101.a255", "start": 17110201, "end": 17110279}, {"filename": "/data/PhotonEvaporation5.2/z101.a256", "start": 17110279, "end": 17110357}, {"filename": "/data/PhotonEvaporation5.2/z101.a257", "start": 17110357, "end": 17110396}, {"filename": "/data/PhotonEvaporation5.2/z101.a258", "start": 17110396, "end": 17110474}, {"filename": "/data/PhotonEvaporation5.2/z101.a259", "start": 17110474, "end": 17110552}, {"filename": "/data/PhotonEvaporation5.2/z101.a260", "start": 17110552, "end": 17110591}, {"filename": "/data/PhotonEvaporation5.2/z102.a248", "start": 17110591, "end": 17110630}, {"filename": "/data/PhotonEvaporation5.2/z102.a250", "start": 17110630, "end": 17110708}, {"filename": "/data/PhotonEvaporation5.2/z102.a251", "start": 17110708, "end": 17111668}, {"filename": "/data/PhotonEvaporation5.2/z102.a252", "start": 17111668, "end": 17113577}, {"filename": "/data/PhotonEvaporation5.2/z102.a253", "start": 17113577, "end": 17122312}, {"filename": "/data/PhotonEvaporation5.2/z102.a254", "start": 17122312, "end": 17124260}, {"filename": "/data/PhotonEvaporation5.2/z102.a255", "start": 17124260, "end": 17124377}, {"filename": "/data/PhotonEvaporation5.2/z102.a256", "start": 17124377, "end": 17124416}, {"filename": "/data/PhotonEvaporation5.2/z102.a257", "start": 17124416, "end": 17124494}, {"filename": "/data/PhotonEvaporation5.2/z102.a258", "start": 17124494, "end": 17124533}, {"filename": "/data/PhotonEvaporation5.2/z102.a259", "start": 17124533, "end": 17124572}, {"filename": "/data/PhotonEvaporation5.2/z102.a260", "start": 17124572, "end": 17124611}, {"filename": "/data/PhotonEvaporation5.2/z102.a262", "start": 17124611, "end": 17124650}, {"filename": "/data/PhotonEvaporation5.2/z103.a252", "start": 17124650, "end": 17124806}, {"filename": "/data/PhotonEvaporation5.2/z103.a253", "start": 17124806, "end": 17124923}, {"filename": "/data/PhotonEvaporation5.2/z103.a254", "start": 17124923, "end": 17125157}, {"filename": "/data/PhotonEvaporation5.2/z103.a255", "start": 17125157, "end": 17130956}, {"filename": "/data/PhotonEvaporation5.2/z103.a256", "start": 17130956, "end": 17131112}, {"filename": "/data/PhotonEvaporation5.2/z103.a257", "start": 17131112, "end": 17131190}, {"filename": "/data/PhotonEvaporation5.2/z103.a258", "start": 17131190, "end": 17131346}, {"filename": "/data/PhotonEvaporation5.2/z103.a259", "start": 17131346, "end": 17131424}, {"filename": "/data/PhotonEvaporation5.2/z103.a260", "start": 17131424, "end": 17131463}, {"filename": "/data/PhotonEvaporation5.2/z103.a261", "start": 17131463, "end": 17131502}, {"filename": "/data/PhotonEvaporation5.2/z103.a262", "start": 17131502, "end": 17131541}, {"filename": "/data/PhotonEvaporation5.2/z103.a266", "start": 17131541, "end": 17131580}, {"filename": "/data/PhotonEvaporation5.2/z104.a253", "start": 17131580, "end": 17131697}, {"filename": "/data/PhotonEvaporation5.2/z104.a254", "start": 17131697, "end": 17131736}, {"filename": "/data/PhotonEvaporation5.2/z104.a255", "start": 17131736, "end": 17131940}, {"filename": "/data/PhotonEvaporation5.2/z104.a256", "start": 17131940, "end": 17134153}, {"filename": "/data/PhotonEvaporation5.2/z104.a257", "start": 17134153, "end": 17136602}, {"filename": "/data/PhotonEvaporation5.2/z104.a258", "start": 17136602, "end": 17136641}, {"filename": "/data/PhotonEvaporation5.2/z104.a259", "start": 17136641, "end": 17136758}, {"filename": "/data/PhotonEvaporation5.2/z104.a260", "start": 17136758, "end": 17136797}, {"filename": "/data/PhotonEvaporation5.2/z104.a261", "start": 17136797, "end": 17136914}, {"filename": "/data/PhotonEvaporation5.2/z104.a262", "start": 17136914, "end": 17136992}, {"filename": "/data/PhotonEvaporation5.2/z104.a263", "start": 17136992, "end": 17137031}, {"filename": "/data/PhotonEvaporation5.2/z104.a265", "start": 17137031, "end": 17137070}, {"filename": "/data/PhotonEvaporation5.2/z105.a255", "start": 17137070, "end": 17137109}, {"filename": "/data/PhotonEvaporation5.2/z105.a256", "start": 17137109, "end": 17137148}, {"filename": "/data/PhotonEvaporation5.2/z105.a257", "start": 17137148, "end": 17138083}, {"filename": "/data/PhotonEvaporation5.2/z105.a258", "start": 17138083, "end": 17138590}, {"filename": "/data/PhotonEvaporation5.2/z105.a259", "start": 17138590, "end": 17138629}, {"filename": "/data/PhotonEvaporation5.2/z105.a260", "start": 17138629, "end": 17138746}, {"filename": "/data/PhotonEvaporation5.2/z105.a261", "start": 17138746, "end": 17138785}, {"filename": "/data/PhotonEvaporation5.2/z105.a262", "start": 17138785, "end": 17138863}, {"filename": "/data/PhotonEvaporation5.2/z105.a263", "start": 17138863, "end": 17138902}, {"filename": "/data/PhotonEvaporation5.2/z105.a266", "start": 17138902, "end": 17138980}, {"filename": "/data/PhotonEvaporation5.2/z105.a270", "start": 17138980, "end": 17139058}, {"filename": "/data/PhotonEvaporation5.2/z106.a258", "start": 17139058, "end": 17139097}, {"filename": "/data/PhotonEvaporation5.2/z106.a259", "start": 17139097, "end": 17139136}, {"filename": "/data/PhotonEvaporation5.2/z106.a260", "start": 17139136, "end": 17139175}, {"filename": "/data/PhotonEvaporation5.2/z106.a261", "start": 17139175, "end": 17139448}, {"filename": "/data/PhotonEvaporation5.2/z106.a262", "start": 17139448, "end": 17139487}, {"filename": "/data/PhotonEvaporation5.2/z106.a263", "start": 17139487, "end": 17139643}, {"filename": "/data/PhotonEvaporation5.2/z106.a264", "start": 17139643, "end": 17139682}, {"filename": "/data/PhotonEvaporation5.2/z106.a265", "start": 17139682, "end": 17139838}, {"filename": "/data/PhotonEvaporation5.2/z106.a266", "start": 17139838, "end": 17139877}, {"filename": "/data/PhotonEvaporation5.2/z106.a269", "start": 17139877, "end": 17139916}, {"filename": "/data/PhotonEvaporation5.2/z107.a260", "start": 17139916, "end": 17139955}, {"filename": "/data/PhotonEvaporation5.2/z107.a261", "start": 17139955, "end": 17139994}, {"filename": "/data/PhotonEvaporation5.2/z107.a262", "start": 17139994, "end": 17140111}, {"filename": "/data/PhotonEvaporation5.2/z107.a263", "start": 17140111, "end": 17140150}, {"filename": "/data/PhotonEvaporation5.2/z107.a264", "start": 17140150, "end": 17140267}, {"filename": "/data/PhotonEvaporation5.2/z107.a265", "start": 17140267, "end": 17140306}, {"filename": "/data/PhotonEvaporation5.2/z107.a267", "start": 17140306, "end": 17140384}, {"filename": "/data/PhotonEvaporation5.2/z107.a270", "start": 17140384, "end": 17140462}, {"filename": "/data/PhotonEvaporation5.2/z107.a274", "start": 17140462, "end": 17140540}, {"filename": "/data/PhotonEvaporation5.2/z108.a263", "start": 17140540, "end": 17140579}, {"filename": "/data/PhotonEvaporation5.2/z108.a264", "start": 17140579, "end": 17140618}, {"filename": "/data/PhotonEvaporation5.2/z108.a265", "start": 17140618, "end": 17140735}, {"filename": "/data/PhotonEvaporation5.2/z108.a266", "start": 17140735, "end": 17140852}, {"filename": "/data/PhotonEvaporation5.2/z108.a267", "start": 17140852, "end": 17140969}, {"filename": "/data/PhotonEvaporation5.2/z108.a269", "start": 17140969, "end": 17141047}, {"filename": "/data/PhotonEvaporation5.2/z108.a273", "start": 17141047, "end": 17141086}, {"filename": "/data/PhotonEvaporation5.2/z108.a277", "start": 17141086, "end": 17141164}, {"filename": "/data/PhotonEvaporation5.2/z109.a266", "start": 17141164, "end": 17141242}, {"filename": "/data/PhotonEvaporation5.2/z109.a268", "start": 17141242, "end": 17141320}, {"filename": "/data/PhotonEvaporation5.2/z109.a274", "start": 17141320, "end": 17141398}, {"filename": "/data/PhotonEvaporation5.2/z109.a277", "start": 17141398, "end": 17141437}, {"filename": "/data/PhotonEvaporation5.2/z109.a278", "start": 17141437, "end": 17141515}, {"filename": "/data/PhotonEvaporation5.2/z11.a20", "start": 17141515, "end": 17142490}, {"filename": "/data/PhotonEvaporation5.2/z11.a21", "start": 17142490, "end": 17148538}, {"filename": "/data/PhotonEvaporation5.2/z11.a22", "start": 17148538, "end": 17189218}, {"filename": "/data/PhotonEvaporation5.2/z11.a23", "start": 17189218, "end": 17261611}, {"filename": "/data/PhotonEvaporation5.2/z11.a24", "start": 17261611, "end": 17301096}, {"filename": "/data/PhotonEvaporation5.2/z11.a25", "start": 17301096, "end": 17305381}, {"filename": "/data/PhotonEvaporation5.2/z11.a26", "start": 17305381, "end": 17306800}, {"filename": "/data/PhotonEvaporation5.2/z11.a27", "start": 17306800, "end": 17312324}, {"filename": "/data/PhotonEvaporation5.2/z11.a28", "start": 17312324, "end": 17314191}, {"filename": "/data/PhotonEvaporation5.2/z11.a29", "start": 17314191, "end": 17315140}, {"filename": "/data/PhotonEvaporation5.2/z11.a30", "start": 17315140, "end": 17316645}, {"filename": "/data/PhotonEvaporation5.2/z11.a31", "start": 17316645, "end": 17317058}, {"filename": "/data/PhotonEvaporation5.2/z11.a32", "start": 17317058, "end": 17317184}, {"filename": "/data/PhotonEvaporation5.2/z11.a33", "start": 17317184, "end": 17317597}, {"filename": "/data/PhotonEvaporation5.2/z11.a34", "start": 17317597, "end": 17317636}, {"filename": "/data/PhotonEvaporation5.2/z11.a35", "start": 17317636, "end": 17317675}, {"filename": "/data/PhotonEvaporation5.2/z11.a37", "start": 17317675, "end": 17317714}, {"filename": "/data/PhotonEvaporation5.2/z110.a269", "start": 17317714, "end": 17317792}, {"filename": "/data/PhotonEvaporation5.2/z110.a271", "start": 17317792, "end": 17317870}, {"filename": "/data/PhotonEvaporation5.2/z110.a273", "start": 17317870, "end": 17317948}, {"filename": "/data/PhotonEvaporation5.2/z110.a277", "start": 17317948, "end": 17317987}, {"filename": "/data/PhotonEvaporation5.2/z111.a272", "start": 17317987, "end": 17318065}, {"filename": "/data/PhotonEvaporation5.2/z111.a278", "start": 17318065, "end": 17318143}, {"filename": "/data/PhotonEvaporation5.2/z111.a281", "start": 17318143, "end": 17318221}, {"filename": "/data/PhotonEvaporation5.2/z111.a282", "start": 17318221, "end": 17318299}, {"filename": "/data/PhotonEvaporation5.2/z112.a277", "start": 17318299, "end": 17318338}, {"filename": "/data/PhotonEvaporation5.2/z112.a281", "start": 17318338, "end": 17318377}, {"filename": "/data/PhotonEvaporation5.2/z113.a282", "start": 17318377, "end": 17318455}, {"filename": "/data/PhotonEvaporation5.2/z113.a285", "start": 17318455, "end": 17318572}, {"filename": "/data/PhotonEvaporation5.2/z113.a286", "start": 17318572, "end": 17318650}, {"filename": "/data/PhotonEvaporation5.2/z115.a289", "start": 17318650, "end": 17318728}, {"filename": "/data/PhotonEvaporation5.2/z115.a290", "start": 17318728, "end": 17318806}, {"filename": "/data/PhotonEvaporation5.2/z117.a293", "start": 17318806, "end": 17318884}, {"filename": "/data/PhotonEvaporation5.2/z117.a294", "start": 17318884, "end": 17318962}, {"filename": "/data/PhotonEvaporation5.2/z12.a19", "start": 17318962, "end": 17319157}, {"filename": "/data/PhotonEvaporation5.2/z12.a20", "start": 17319157, "end": 17319196}, {"filename": "/data/PhotonEvaporation5.2/z12.a21", "start": 17319196, "end": 17320054}, {"filename": "/data/PhotonEvaporation5.2/z12.a22", "start": 17320054, "end": 17325666}, {"filename": "/data/PhotonEvaporation5.2/z12.a23", "start": 17325666, "end": 17334082}, {"filename": "/data/PhotonEvaporation5.2/z12.a24", "start": 17334082, "end": 17390512}, {"filename": "/data/PhotonEvaporation5.2/z12.a25", "start": 17390512, "end": 17428165}, {"filename": "/data/PhotonEvaporation5.2/z12.a26", "start": 17428165, "end": 17468553}, {"filename": "/data/PhotonEvaporation5.2/z12.a27", "start": 17468553, "end": 17481042}, {"filename": "/data/PhotonEvaporation5.2/z12.a28", "start": 17481042, "end": 17487185}, {"filename": "/data/PhotonEvaporation5.2/z12.a29", "start": 17487185, "end": 17489043}, {"filename": "/data/PhotonEvaporation5.2/z12.a30", "start": 17489043, "end": 17491973}, {"filename": "/data/PhotonEvaporation5.2/z12.a31", "start": 17491973, "end": 17495784}, {"filename": "/data/PhotonEvaporation5.2/z12.a32", "start": 17495784, "end": 17498529}, {"filename": "/data/PhotonEvaporation5.2/z12.a33", "start": 17498529, "end": 17499590}, {"filename": "/data/PhotonEvaporation5.2/z12.a34", "start": 17499590, "end": 17500003}, {"filename": "/data/PhotonEvaporation5.2/z12.a35", "start": 17500003, "end": 17500381}, {"filename": "/data/PhotonEvaporation5.2/z12.a36", "start": 17500381, "end": 17500607}, {"filename": "/data/PhotonEvaporation5.2/z12.a37", "start": 17500607, "end": 17500646}, {"filename": "/data/PhotonEvaporation5.2/z12.a38", "start": 17500646, "end": 17501059}, {"filename": "/data/PhotonEvaporation5.2/z12.a40", "start": 17501059, "end": 17501098}, {"filename": "/data/PhotonEvaporation5.2/z13.a21", "start": 17501098, "end": 17501137}, {"filename": "/data/PhotonEvaporation5.2/z13.a22", "start": 17501137, "end": 17501254}, {"filename": "/data/PhotonEvaporation5.2/z13.a23", "start": 17501254, "end": 17501714}, {"filename": "/data/PhotonEvaporation5.2/z13.a24", "start": 17501714, "end": 17503851}, {"filename": "/data/PhotonEvaporation5.2/z13.a25", "start": 17503851, "end": 17512719}, {"filename": "/data/PhotonEvaporation5.2/z13.a26", "start": 17512719, "end": 17594579}, {"filename": "/data/PhotonEvaporation5.2/z13.a27", "start": 17594579, "end": 17642209}, {"filename": "/data/PhotonEvaporation5.2/z13.a28", "start": 17642209, "end": 17674905}, {"filename": "/data/PhotonEvaporation5.2/z13.a29", "start": 17674905, "end": 17689475}, {"filename": "/data/PhotonEvaporation5.2/z13.a30", "start": 17689475, "end": 17693133}, {"filename": "/data/PhotonEvaporation5.2/z13.a31", "start": 17693133, "end": 17695952}, {"filename": "/data/PhotonEvaporation5.2/z13.a32", "start": 17695952, "end": 17697405}, {"filename": "/data/PhotonEvaporation5.2/z13.a33", "start": 17697405, "end": 17699414}, {"filename": "/data/PhotonEvaporation5.2/z13.a34", "start": 17699414, "end": 17699640}, {"filename": "/data/PhotonEvaporation5.2/z13.a35", "start": 17699640, "end": 17699766}, {"filename": "/data/PhotonEvaporation5.2/z13.a36", "start": 17699766, "end": 17699805}, {"filename": "/data/PhotonEvaporation5.2/z13.a37", "start": 17699805, "end": 17699844}, {"filename": "/data/PhotonEvaporation5.2/z13.a38", "start": 17699844, "end": 17699883}, {"filename": "/data/PhotonEvaporation5.2/z13.a39", "start": 17699883, "end": 17699922}, {"filename": "/data/PhotonEvaporation5.2/z13.a40", "start": 17699922, "end": 17699961}, {"filename": "/data/PhotonEvaporation5.2/z13.a41", "start": 17699961, "end": 17700000}, {"filename": "/data/PhotonEvaporation5.2/z13.a42", "start": 17700000, "end": 17700039}, {"filename": "/data/PhotonEvaporation5.2/z14.a22", "start": 17700039, "end": 17700078}, {"filename": "/data/PhotonEvaporation5.2/z14.a23", "start": 17700078, "end": 17700117}, {"filename": "/data/PhotonEvaporation5.2/z14.a24", "start": 17700117, "end": 17700234}, {"filename": "/data/PhotonEvaporation5.2/z14.a26", "start": 17700234, "end": 17708618}, {"filename": "/data/PhotonEvaporation5.2/z14.a27", "start": 17708618, "end": 17722808}, {"filename": "/data/PhotonEvaporation5.2/z14.a28", "start": 17722808, "end": 17758772}, {"filename": "/data/PhotonEvaporation5.2/z14.a29", "start": 17758772, "end": 17785581}, {"filename": "/data/PhotonEvaporation5.2/z14.a30", "start": 17785581, "end": 17845110}, {"filename": "/data/PhotonEvaporation5.2/z14.a31", "start": 17845110, "end": 17855009}, {"filename": "/data/PhotonEvaporation5.2/z14.a32", "start": 17855009, "end": 17860524}, {"filename": "/data/PhotonEvaporation5.2/z14.a33", "start": 17860524, "end": 17861911}, {"filename": "/data/PhotonEvaporation5.2/z14.a34", "start": 17861911, "end": 17863629}, {"filename": "/data/PhotonEvaporation5.2/z14.a35", "start": 17863629, "end": 17864837}, {"filename": "/data/PhotonEvaporation5.2/z14.a36", "start": 17864837, "end": 17865437}, {"filename": "/data/PhotonEvaporation5.2/z14.a37", "start": 17865437, "end": 17865563}, {"filename": "/data/PhotonEvaporation5.2/z14.a38", "start": 17865563, "end": 17865789}, {"filename": "/data/PhotonEvaporation5.2/z14.a39", "start": 17865789, "end": 17865828}, {"filename": "/data/PhotonEvaporation5.2/z14.a40", "start": 17865828, "end": 17866228}, {"filename": "/data/PhotonEvaporation5.2/z14.a41", "start": 17866228, "end": 17866267}, {"filename": "/data/PhotonEvaporation5.2/z14.a42", "start": 17866267, "end": 17866493}, {"filename": "/data/PhotonEvaporation5.2/z14.a43", "start": 17866493, "end": 17866532}, {"filename": "/data/PhotonEvaporation5.2/z14.a44", "start": 17866532, "end": 17866571}, {"filename": "/data/PhotonEvaporation5.2/z15.a25", "start": 17866571, "end": 17866610}, {"filename": "/data/PhotonEvaporation5.2/z15.a26", "start": 17866610, "end": 17866649}, {"filename": "/data/PhotonEvaporation5.2/z15.a27", "start": 17866649, "end": 17866992}, {"filename": "/data/PhotonEvaporation5.2/z15.a28", "start": 17866992, "end": 17869607}, {"filename": "/data/PhotonEvaporation5.2/z15.a29", "start": 17869607, "end": 17877200}, {"filename": "/data/PhotonEvaporation5.2/z15.a30", "start": 17877200, "end": 17942188}, {"filename": "/data/PhotonEvaporation5.2/z15.a31", "start": 17942188, "end": 18114766}, {"filename": "/data/PhotonEvaporation5.2/z15.a32", "start": 18114766, "end": 18150515}, {"filename": "/data/PhotonEvaporation5.2/z15.a33", "start": 18150515, "end": 18164179}, {"filename": "/data/PhotonEvaporation5.2/z15.a34", "start": 18164179, "end": 18172144}, {"filename": "/data/PhotonEvaporation5.2/z15.a35", "start": 18172144, "end": 18175245}, {"filename": "/data/PhotonEvaporation5.2/z15.a36", "start": 18175245, "end": 18176467}, {"filename": "/data/PhotonEvaporation5.2/z15.a37", "start": 18176467, "end": 18177741}, {"filename": "/data/PhotonEvaporation5.2/z15.a38", "start": 18177741, "end": 18177780}, {"filename": "/data/PhotonEvaporation5.2/z15.a39", "start": 18177780, "end": 18178428}, {"filename": "/data/PhotonEvaporation5.2/z15.a40", "start": 18178428, "end": 18178467}, {"filename": "/data/PhotonEvaporation5.2/z15.a41", "start": 18178467, "end": 18179363}, {"filename": "/data/PhotonEvaporation5.2/z15.a42", "start": 18179363, "end": 18179402}, {"filename": "/data/PhotonEvaporation5.2/z15.a43", "start": 18179402, "end": 18179628}, {"filename": "/data/PhotonEvaporation5.2/z15.a44", "start": 18179628, "end": 18179667}, {"filename": "/data/PhotonEvaporation5.2/z15.a45", "start": 18179667, "end": 18179706}, {"filename": "/data/PhotonEvaporation5.2/z15.a46", "start": 18179706, "end": 18179745}, {"filename": "/data/PhotonEvaporation5.2/z16.a27", "start": 18179745, "end": 18179784}, {"filename": "/data/PhotonEvaporation5.2/z16.a28", "start": 18179784, "end": 18180010}, {"filename": "/data/PhotonEvaporation5.2/z16.a29", "start": 18180010, "end": 18180688}, {"filename": "/data/PhotonEvaporation5.2/z16.a30", "start": 18180688, "end": 18182533}, {"filename": "/data/PhotonEvaporation5.2/z16.a31", "start": 18182533, "end": 18194199}, {"filename": "/data/PhotonEvaporation5.2/z16.a32", "start": 18194199, "end": 18311474}, {"filename": "/data/PhotonEvaporation5.2/z16.a33", "start": 18311474, "end": 18352731}, {"filename": "/data/PhotonEvaporation5.2/z16.a34", "start": 18352731, "end": 18412312}, {"filename": "/data/PhotonEvaporation5.2/z16.a35", "start": 18412312, "end": 18434539}, {"filename": "/data/PhotonEvaporation5.2/z16.a36", "start": 18434539, "end": 18440325}, {"filename": "/data/PhotonEvaporation5.2/z16.a37", "start": 18440325, "end": 18444105}, {"filename": "/data/PhotonEvaporation5.2/z16.a38", "start": 18444105, "end": 18445822}, {"filename": "/data/PhotonEvaporation5.2/z16.a39", "start": 18445822, "end": 18445900}, {"filename": "/data/PhotonEvaporation5.2/z16.a40", "start": 18445900, "end": 18447610}, {"filename": "/data/PhotonEvaporation5.2/z16.a41", "start": 18447610, "end": 18447823}, {"filename": "/data/PhotonEvaporation5.2/z16.a42", "start": 18447823, "end": 18448049}, {"filename": "/data/PhotonEvaporation5.2/z16.a43", "start": 18448049, "end": 18448362}, {"filename": "/data/PhotonEvaporation5.2/z16.a44", "start": 18448362, "end": 18450041}, {"filename": "/data/PhotonEvaporation5.2/z16.a45", "start": 18450041, "end": 18450080}, {"filename": "/data/PhotonEvaporation5.2/z16.a46", "start": 18450080, "end": 18450306}, {"filename": "/data/PhotonEvaporation5.2/z16.a48", "start": 18450306, "end": 18450345}, {"filename": "/data/PhotonEvaporation5.2/z17.a29", "start": 18450345, "end": 18450384}, {"filename": "/data/PhotonEvaporation5.2/z17.a30", "start": 18450384, "end": 18450423}, {"filename": "/data/PhotonEvaporation5.2/z17.a31", "start": 18450423, "end": 18451203}, {"filename": "/data/PhotonEvaporation5.2/z17.a32", "start": 18451203, "end": 18455257}, {"filename": "/data/PhotonEvaporation5.2/z17.a33", "start": 18455257, "end": 18470350}, {"filename": "/data/PhotonEvaporation5.2/z17.a34", "start": 18470350, "end": 18576328}, {"filename": "/data/PhotonEvaporation5.2/z17.a35", "start": 18576328, "end": 18699628}, {"filename": "/data/PhotonEvaporation5.2/z17.a36", "start": 18699628, "end": 18759502}, {"filename": "/data/PhotonEvaporation5.2/z17.a37", "start": 18759502, "end": 18863029}, {"filename": "/data/PhotonEvaporation5.2/z17.a38", "start": 18863029, "end": 18871630}, {"filename": "/data/PhotonEvaporation5.2/z17.a39", "start": 18871630, "end": 18876823}, {"filename": "/data/PhotonEvaporation5.2/z17.a40", "start": 18876823, "end": 18880864}, {"filename": "/data/PhotonEvaporation5.2/z17.a41", "start": 18880864, "end": 18881651}, {"filename": "/data/PhotonEvaporation5.2/z17.a42", "start": 18881651, "end": 18883415}, {"filename": "/data/PhotonEvaporation5.2/z17.a43", "start": 18883415, "end": 18883802}, {"filename": "/data/PhotonEvaporation5.2/z17.a44", "start": 18883802, "end": 18884028}, {"filename": "/data/PhotonEvaporation5.2/z17.a45", "start": 18884028, "end": 18884428}, {"filename": "/data/PhotonEvaporation5.2/z17.a46", "start": 18884428, "end": 18884959}, {"filename": "/data/PhotonEvaporation5.2/z17.a47", "start": 18884959, "end": 18884998}, {"filename": "/data/PhotonEvaporation5.2/z17.a48", "start": 18884998, "end": 18885037}, {"filename": "/data/PhotonEvaporation5.2/z17.a50", "start": 18885037, "end": 18885076}, {"filename": "/data/PhotonEvaporation5.2/z17.a51", "start": 18885076, "end": 18885115}, {"filename": "/data/PhotonEvaporation5.2/z18.a31", "start": 18885115, "end": 18885154}, {"filename": "/data/PhotonEvaporation5.2/z18.a32", "start": 18885154, "end": 18885458}, {"filename": "/data/PhotonEvaporation5.2/z18.a33", "start": 18885458, "end": 18887398}, {"filename": "/data/PhotonEvaporation5.2/z18.a34", "start": 18887398, "end": 18889872}, {"filename": "/data/PhotonEvaporation5.2/z18.a35", "start": 18889872, "end": 18896903}, {"filename": "/data/PhotonEvaporation5.2/z18.a36", "start": 18896903, "end": 19010901}, {"filename": "/data/PhotonEvaporation5.2/z18.a37", "start": 19010901, "end": 19028127}, {"filename": "/data/PhotonEvaporation5.2/z18.a38", "start": 19028127, "end": 19238851}, {"filename": "/data/PhotonEvaporation5.2/z18.a39", "start": 19238851, "end": 19250671}, {"filename": "/data/PhotonEvaporation5.2/z18.a40", "start": 19250671, "end": 19282731}, {"filename": "/data/PhotonEvaporation5.2/z18.a41", "start": 19282731, "end": 19292747}, {"filename": "/data/PhotonEvaporation5.2/z18.a42", "start": 19292747, "end": 19298166}, {"filename": "/data/PhotonEvaporation5.2/z18.a43", "start": 19298166, "end": 19299903}, {"filename": "/data/PhotonEvaporation5.2/z18.a44", "start": 19299903, "end": 19301899}, {"filename": "/data/PhotonEvaporation5.2/z18.a45", "start": 19301899, "end": 19303795}, {"filename": "/data/PhotonEvaporation5.2/z18.a46", "start": 19303795, "end": 19304021}, {"filename": "/data/PhotonEvaporation5.2/z18.a47", "start": 19304021, "end": 19304372}, {"filename": "/data/PhotonEvaporation5.2/z18.a48", "start": 19304372, "end": 19305307}, {"filename": "/data/PhotonEvaporation5.2/z18.a49", "start": 19305307, "end": 19305346}, {"filename": "/data/PhotonEvaporation5.2/z18.a50", "start": 19305346, "end": 19305385}, {"filename": "/data/PhotonEvaporation5.2/z18.a51", "start": 19305385, "end": 19305424}, {"filename": "/data/PhotonEvaporation5.2/z18.a52", "start": 19305424, "end": 19305463}, {"filename": "/data/PhotonEvaporation5.2/z18.a53", "start": 19305463, "end": 19305502}, {"filename": "/data/PhotonEvaporation5.2/z19.a35", "start": 19305502, "end": 19306048}, {"filename": "/data/PhotonEvaporation5.2/z19.a36", "start": 19306048, "end": 19307646}, {"filename": "/data/PhotonEvaporation5.2/z19.a37", "start": 19307646, "end": 19317795}, {"filename": "/data/PhotonEvaporation5.2/z19.a38", "start": 19317795, "end": 19330919}, {"filename": "/data/PhotonEvaporation5.2/z19.a39", "start": 19330919, "end": 19396353}, {"filename": "/data/PhotonEvaporation5.2/z19.a40", "start": 19396353, "end": 19439793}, {"filename": "/data/PhotonEvaporation5.2/z19.a41", "start": 19439793, "end": 19509408}, {"filename": "/data/PhotonEvaporation5.2/z19.a42", "start": 19509408, "end": 19575808}, {"filename": "/data/PhotonEvaporation5.2/z19.a43", "start": 19575808, "end": 19583546}, {"filename": "/data/PhotonEvaporation5.2/z19.a44", "start": 19583546, "end": 19586231}, {"filename": "/data/PhotonEvaporation5.2/z19.a45", "start": 19586231, "end": 19589504}, {"filename": "/data/PhotonEvaporation5.2/z19.a46", "start": 19589504, "end": 19591164}, {"filename": "/data/PhotonEvaporation5.2/z19.a47", "start": 19591164, "end": 19593810}, {"filename": "/data/PhotonEvaporation5.2/z19.a48", "start": 19593810, "end": 19594405}, {"filename": "/data/PhotonEvaporation5.2/z19.a49", "start": 19594405, "end": 19595527}, {"filename": "/data/PhotonEvaporation5.2/z19.a50", "start": 19595527, "end": 19595923}, {"filename": "/data/PhotonEvaporation5.2/z19.a51", "start": 19595923, "end": 19595962}, {"filename": "/data/PhotonEvaporation5.2/z19.a52", "start": 19595962, "end": 19596001}, {"filename": "/data/PhotonEvaporation5.2/z19.a53", "start": 19596001, "end": 19596040}, {"filename": "/data/PhotonEvaporation5.2/z19.a54", "start": 19596040, "end": 19596079}, {"filename": "/data/PhotonEvaporation5.2/z19.a55", "start": 19596079, "end": 19596118}, {"filename": "/data/PhotonEvaporation5.2/z19.a56", "start": 19596118, "end": 19596157}, {"filename": "/data/PhotonEvaporation5.2/z2.a10", "start": 19596157, "end": 19596274}, {"filename": "/data/PhotonEvaporation5.2/z2.a3", "start": 19596274, "end": 19596313}, {"filename": "/data/PhotonEvaporation5.2/z2.a4", "start": 19596313, "end": 19596937}, {"filename": "/data/PhotonEvaporation5.2/z2.a5", "start": 19596937, "end": 19596976}, {"filename": "/data/PhotonEvaporation5.2/z2.a6", "start": 19596976, "end": 19597288}, {"filename": "/data/PhotonEvaporation5.2/z2.a7", "start": 19597288, "end": 19597405}, {"filename": "/data/PhotonEvaporation5.2/z2.a8", "start": 19597405, "end": 19597600}, {"filename": "/data/PhotonEvaporation5.2/z2.a9", "start": 19597600, "end": 19597834}, {"filename": "/data/PhotonEvaporation5.2/z20.a35", "start": 19597834, "end": 19597873}, {"filename": "/data/PhotonEvaporation5.2/z20.a36", "start": 19597873, "end": 19598099}, {"filename": "/data/PhotonEvaporation5.2/z20.a37", "start": 19598099, "end": 19599891}, {"filename": "/data/PhotonEvaporation5.2/z20.a38", "start": 19599891, "end": 19601980}, {"filename": "/data/PhotonEvaporation5.2/z20.a39", "start": 19601980, "end": 19608811}, {"filename": "/data/PhotonEvaporation5.2/z20.a40", "start": 19608811, "end": 19697153}, {"filename": "/data/PhotonEvaporation5.2/z20.a41", "start": 19697153, "end": 19722689}, {"filename": "/data/PhotonEvaporation5.2/z20.a42", "start": 19722689, "end": 19764371}, {"filename": "/data/PhotonEvaporation5.2/z20.a43", "start": 19764371, "end": 19788588}, {"filename": "/data/PhotonEvaporation5.2/z20.a44", "start": 19788588, "end": 19823825}, {"filename": "/data/PhotonEvaporation5.2/z20.a45", "start": 19823825, "end": 19836437}, {"filename": "/data/PhotonEvaporation5.2/z20.a46", "start": 19836437, "end": 19841170}, {"filename": "/data/PhotonEvaporation5.2/z20.a47", "start": 19841170, "end": 19848807}, {"filename": "/data/PhotonEvaporation5.2/z20.a48", "start": 19848807, "end": 19871110}, {"filename": "/data/PhotonEvaporation5.2/z20.a49", "start": 19871110, "end": 19875862}, {"filename": "/data/PhotonEvaporation5.2/z20.a50", "start": 19875862, "end": 19880217}, {"filename": "/data/PhotonEvaporation5.2/z20.a51", "start": 19880217, "end": 19881059}, {"filename": "/data/PhotonEvaporation5.2/z20.a52", "start": 19881059, "end": 19881480}, {"filename": "/data/PhotonEvaporation5.2/z20.a53", "start": 19881480, "end": 19881893}, {"filename": "/data/PhotonEvaporation5.2/z20.a54", "start": 19881893, "end": 19882306}, {"filename": "/data/PhotonEvaporation5.2/z20.a55", "start": 19882306, "end": 19882345}, {"filename": "/data/PhotonEvaporation5.2/z20.a56", "start": 19882345, "end": 19882384}, {"filename": "/data/PhotonEvaporation5.2/z20.a57", "start": 19882384, "end": 19882423}, {"filename": "/data/PhotonEvaporation5.2/z20.a58", "start": 19882423, "end": 19882462}, {"filename": "/data/PhotonEvaporation5.2/z21.a39", "start": 19882462, "end": 19882579}, {"filename": "/data/PhotonEvaporation5.2/z21.a40", "start": 19882579, "end": 19884217}, {"filename": "/data/PhotonEvaporation5.2/z21.a41", "start": 19884217, "end": 19906248}, {"filename": "/data/PhotonEvaporation5.2/z21.a42", "start": 19906248, "end": 19920637}, {"filename": "/data/PhotonEvaporation5.2/z21.a43", "start": 19920637, "end": 19945880}, {"filename": "/data/PhotonEvaporation5.2/z21.a44", "start": 19945880, "end": 19965688}, {"filename": "/data/PhotonEvaporation5.2/z21.a45", "start": 19965688, "end": 20021756}, {"filename": "/data/PhotonEvaporation5.2/z21.a46", "start": 20021756, "end": 20063961}, {"filename": "/data/PhotonEvaporation5.2/z21.a47", "start": 20063961, "end": 20080440}, {"filename": "/data/PhotonEvaporation5.2/z21.a48", "start": 20080440, "end": 20089545}, {"filename": "/data/PhotonEvaporation5.2/z21.a49", "start": 20089545, "end": 20106129}, {"filename": "/data/PhotonEvaporation5.2/z21.a50", "start": 20106129, "end": 20108897}, {"filename": "/data/PhotonEvaporation5.2/z21.a51", "start": 20108897, "end": 20112521}, {"filename": "/data/PhotonEvaporation5.2/z21.a52", "start": 20112521, "end": 20113243}, {"filename": "/data/PhotonEvaporation5.2/z21.a53", "start": 20113243, "end": 20114365}, {"filename": "/data/PhotonEvaporation5.2/z21.a54", "start": 20114365, "end": 20114778}, {"filename": "/data/PhotonEvaporation5.2/z21.a55", "start": 20114778, "end": 20114817}, {"filename": "/data/PhotonEvaporation5.2/z21.a56", "start": 20114817, "end": 20115752}, {"filename": "/data/PhotonEvaporation5.2/z21.a57", "start": 20115752, "end": 20115791}, {"filename": "/data/PhotonEvaporation5.2/z21.a58", "start": 20115791, "end": 20115830}, {"filename": "/data/PhotonEvaporation5.2/z21.a59", "start": 20115830, "end": 20115869}, {"filename": "/data/PhotonEvaporation5.2/z21.a61", "start": 20115869, "end": 20115908}, {"filename": "/data/PhotonEvaporation5.2/z22.a39", "start": 20115908, "end": 20115947}, {"filename": "/data/PhotonEvaporation5.2/z22.a40", "start": 20115947, "end": 20115986}, {"filename": "/data/PhotonEvaporation5.2/z22.a41", "start": 20115986, "end": 20116025}, {"filename": "/data/PhotonEvaporation5.2/z22.a42", "start": 20116025, "end": 20118505}, {"filename": "/data/PhotonEvaporation5.2/z22.a43", "start": 20118505, "end": 20119865}, {"filename": "/data/PhotonEvaporation5.2/z22.a44", "start": 20119865, "end": 20146747}, {"filename": "/data/PhotonEvaporation5.2/z22.a45", "start": 20146747, "end": 20158919}, {"filename": "/data/PhotonEvaporation5.2/z22.a46", "start": 20158919, "end": 20181944}, {"filename": "/data/PhotonEvaporation5.2/z22.a47", "start": 20181944, "end": 20201498}, {"filename": "/data/PhotonEvaporation5.2/z22.a48", "start": 20201498, "end": 20253277}, {"filename": "/data/PhotonEvaporation5.2/z22.a49", "start": 20253277, "end": 20268990}, {"filename": "/data/PhotonEvaporation5.2/z22.a50", "start": 20268990, "end": 20291123}, {"filename": "/data/PhotonEvaporation5.2/z22.a51", "start": 20291123, "end": 20297747}, {"filename": "/data/PhotonEvaporation5.2/z22.a52", "start": 20297747, "end": 20302262}, {"filename": "/data/PhotonEvaporation5.2/z22.a53", "start": 20302262, "end": 20304698}, {"filename": "/data/PhotonEvaporation5.2/z22.a54", "start": 20304698, "end": 20307173}, {"filename": "/data/PhotonEvaporation5.2/z22.a55", "start": 20307173, "end": 20308669}, {"filename": "/data/PhotonEvaporation5.2/z22.a56", "start": 20308669, "end": 20309356}, {"filename": "/data/PhotonEvaporation5.2/z22.a57", "start": 20309356, "end": 20309395}, {"filename": "/data/PhotonEvaporation5.2/z22.a58", "start": 20309395, "end": 20310169}, {"filename": "/data/PhotonEvaporation5.2/z22.a59", "start": 20310169, "end": 20310208}, {"filename": "/data/PhotonEvaporation5.2/z22.a60", "start": 20310208, "end": 20310247}, {"filename": "/data/PhotonEvaporation5.2/z22.a61", "start": 20310247, "end": 20310286}, {"filename": "/data/PhotonEvaporation5.2/z22.a62", "start": 20310286, "end": 20310325}, {"filename": "/data/PhotonEvaporation5.2/z22.a63", "start": 20310325, "end": 20310364}, {"filename": "/data/PhotonEvaporation5.2/z23.a42", "start": 20310364, "end": 20310403}, {"filename": "/data/PhotonEvaporation5.2/z23.a43", "start": 20310403, "end": 20310481}, {"filename": "/data/PhotonEvaporation5.2/z23.a44", "start": 20310481, "end": 20310559}, {"filename": "/data/PhotonEvaporation5.2/z23.a45", "start": 20310559, "end": 20315927}, {"filename": "/data/PhotonEvaporation5.2/z23.a46", "start": 20315927, "end": 20330730}, {"filename": "/data/PhotonEvaporation5.2/z23.a47", "start": 20330730, "end": 20392467}, {"filename": "/data/PhotonEvaporation5.2/z23.a48", "start": 20392467, "end": 20421337}, {"filename": "/data/PhotonEvaporation5.2/z23.a49", "start": 20421337, "end": 20496614}, {"filename": "/data/PhotonEvaporation5.2/z23.a50", "start": 20496614, "end": 20516261}, {"filename": "/data/PhotonEvaporation5.2/z23.a51", "start": 20516261, "end": 20579689}, {"filename": "/data/PhotonEvaporation5.2/z23.a52", "start": 20579689, "end": 20606655}, {"filename": "/data/PhotonEvaporation5.2/z23.a53", "start": 20606655, "end": 20612257}, {"filename": "/data/PhotonEvaporation5.2/z23.a54", "start": 20612257, "end": 20613972}, {"filename": "/data/PhotonEvaporation5.2/z23.a55", "start": 20613972, "end": 20614590}, {"filename": "/data/PhotonEvaporation5.2/z23.a56", "start": 20614590, "end": 20614629}, {"filename": "/data/PhotonEvaporation5.2/z23.a57", "start": 20614629, "end": 20615569}, {"filename": "/data/PhotonEvaporation5.2/z23.a58", "start": 20615569, "end": 20615695}, {"filename": "/data/PhotonEvaporation5.2/z23.a59", "start": 20615695, "end": 20615734}, {"filename": "/data/PhotonEvaporation5.2/z23.a60", "start": 20615734, "end": 20616225}, {"filename": "/data/PhotonEvaporation5.2/z23.a61", "start": 20616225, "end": 20616264}, {"filename": "/data/PhotonEvaporation5.2/z23.a62", "start": 20616264, "end": 20616303}, {"filename": "/data/PhotonEvaporation5.2/z23.a63", "start": 20616303, "end": 20616342}, {"filename": "/data/PhotonEvaporation5.2/z23.a64", "start": 20616342, "end": 20616468}, {"filename": "/data/PhotonEvaporation5.2/z23.a65", "start": 20616468, "end": 20616507}, {"filename": "/data/PhotonEvaporation5.2/z23.a66", "start": 20616507, "end": 20616546}, {"filename": "/data/PhotonEvaporation5.2/z24.a42", "start": 20616546, "end": 20616585}, {"filename": "/data/PhotonEvaporation5.2/z24.a43", "start": 20616585, "end": 20616624}, {"filename": "/data/PhotonEvaporation5.2/z24.a44", "start": 20616624, "end": 20616663}, {"filename": "/data/PhotonEvaporation5.2/z24.a45", "start": 20616663, "end": 20616928}, {"filename": "/data/PhotonEvaporation5.2/z24.a46", "start": 20616928, "end": 20620034}, {"filename": "/data/PhotonEvaporation5.2/z24.a47", "start": 20620034, "end": 20625366}, {"filename": "/data/PhotonEvaporation5.2/z24.a48", "start": 20625366, "end": 20634420}, {"filename": "/data/PhotonEvaporation5.2/z24.a49", "start": 20634420, "end": 20661882}, {"filename": "/data/PhotonEvaporation5.2/z24.a50", "start": 20661882, "end": 20682172}, {"filename": "/data/PhotonEvaporation5.2/z24.a51", "start": 20682172, "end": 20715270}, {"filename": "/data/PhotonEvaporation5.2/z24.a52", "start": 20715270, "end": 20737828}, {"filename": "/data/PhotonEvaporation5.2/z24.a53", "start": 20737828, "end": 20756073}, {"filename": "/data/PhotonEvaporation5.2/z24.a54", "start": 20756073, "end": 20777077}, {"filename": "/data/PhotonEvaporation5.2/z24.a55", "start": 20777077, "end": 20787362}, {"filename": "/data/PhotonEvaporation5.2/z24.a56", "start": 20787362, "end": 20790229}, {"filename": "/data/PhotonEvaporation5.2/z24.a57", "start": 20790229, "end": 20793914}, {"filename": "/data/PhotonEvaporation5.2/z24.a58", "start": 20793914, "end": 20796028}, {"filename": "/data/PhotonEvaporation5.2/z24.a59", "start": 20796028, "end": 20796628}, {"filename": "/data/PhotonEvaporation5.2/z24.a60", "start": 20796628, "end": 20797776}, {"filename": "/data/PhotonEvaporation5.2/z24.a61", "start": 20797776, "end": 20798507}, {"filename": "/data/PhotonEvaporation5.2/z24.a62", "start": 20798507, "end": 20798920}, {"filename": "/data/PhotonEvaporation5.2/z24.a63", "start": 20798920, "end": 20798959}, {"filename": "/data/PhotonEvaporation5.2/z24.a64", "start": 20798959, "end": 20799372}, {"filename": "/data/PhotonEvaporation5.2/z24.a65", "start": 20799372, "end": 20799411}, {"filename": "/data/PhotonEvaporation5.2/z24.a66", "start": 20799411, "end": 20799450}, {"filename": "/data/PhotonEvaporation5.2/z24.a68", "start": 20799450, "end": 20799489}, {"filename": "/data/PhotonEvaporation5.2/z25.a44", "start": 20799489, "end": 20799528}, {"filename": "/data/PhotonEvaporation5.2/z25.a46", "start": 20799528, "end": 20799606}, {"filename": "/data/PhotonEvaporation5.2/z25.a47", "start": 20799606, "end": 20799684}, {"filename": "/data/PhotonEvaporation5.2/z25.a48", "start": 20799684, "end": 20803011}, {"filename": "/data/PhotonEvaporation5.2/z25.a49", "start": 20803011, "end": 20804625}, {"filename": "/data/PhotonEvaporation5.2/z25.a50", "start": 20804625, "end": 20813807}, {"filename": "/data/PhotonEvaporation5.2/z25.a51", "start": 20813807, "end": 20928923}, {"filename": "/data/PhotonEvaporation5.2/z25.a52", "start": 20928923, "end": 20944070}, {"filename": "/data/PhotonEvaporation5.2/z25.a53", "start": 20944070, "end": 21083242}, {"filename": "/data/PhotonEvaporation5.2/z25.a54", "start": 21083242, "end": 21110726}, {"filename": "/data/PhotonEvaporation5.2/z25.a55", "start": 21110726, "end": 21183212}, {"filename": "/data/PhotonEvaporation5.2/z25.a56", "start": 21183212, "end": 21203738}, {"filename": "/data/PhotonEvaporation5.2/z25.a57", "start": 21203738, "end": 21209074}, {"filename": "/data/PhotonEvaporation5.2/z25.a58", "start": 21209074, "end": 21216551}, {"filename": "/data/PhotonEvaporation5.2/z25.a59", "start": 21216551, "end": 21216803}, {"filename": "/data/PhotonEvaporation5.2/z25.a60", "start": 21216803, "end": 21223102}, {"filename": "/data/PhotonEvaporation5.2/z25.a61", "start": 21223102, "end": 21224433}, {"filename": "/data/PhotonEvaporation5.2/z25.a62", "start": 21224433, "end": 21225594}, {"filename": "/data/PhotonEvaporation5.2/z25.a63", "start": 21225594, "end": 21225633}, {"filename": "/data/PhotonEvaporation5.2/z25.a64", "start": 21225633, "end": 21226233}, {"filename": "/data/PhotonEvaporation5.2/z25.a65", "start": 21226233, "end": 21226272}, {"filename": "/data/PhotonEvaporation5.2/z25.a66", "start": 21226272, "end": 21226311}, {"filename": "/data/PhotonEvaporation5.2/z25.a67", "start": 21226311, "end": 21226350}, {"filename": "/data/PhotonEvaporation5.2/z25.a68", "start": 21226350, "end": 21226389}, {"filename": "/data/PhotonEvaporation5.2/z25.a69", "start": 21226389, "end": 21226428}, {"filename": "/data/PhotonEvaporation5.2/z25.a70", "start": 21226428, "end": 21226467}, {"filename": "/data/PhotonEvaporation5.2/z25.a71", "start": 21226467, "end": 21226506}, {"filename": "/data/PhotonEvaporation5.2/z26.a45", "start": 21226506, "end": 21226545}, {"filename": "/data/PhotonEvaporation5.2/z26.a46", "start": 21226545, "end": 21226584}, {"filename": "/data/PhotonEvaporation5.2/z26.a47", "start": 21226584, "end": 21226623}, {"filename": "/data/PhotonEvaporation5.2/z26.a48", "start": 21226623, "end": 21226662}, {"filename": "/data/PhotonEvaporation5.2/z26.a49", "start": 21226662, "end": 21226875}, {"filename": "/data/PhotonEvaporation5.2/z26.a50", "start": 21226875, "end": 21228262}, {"filename": "/data/PhotonEvaporation5.2/z26.a51", "start": 21228262, "end": 21230906}, {"filename": "/data/PhotonEvaporation5.2/z26.a52", "start": 21230906, "end": 21238436}, {"filename": "/data/PhotonEvaporation5.2/z26.a53", "start": 21238436, "end": 21255491}, {"filename": "/data/PhotonEvaporation5.2/z26.a54", "start": 21255491, "end": 21279874}, {"filename": "/data/PhotonEvaporation5.2/z26.a55", "start": 21279874, "end": 21297642}, {"filename": "/data/PhotonEvaporation5.2/z26.a56", "start": 21297642, "end": 21355795}, {"filename": "/data/PhotonEvaporation5.2/z26.a57", "start": 21355795, "end": 21389295}, {"filename": "/data/PhotonEvaporation5.2/z26.a58", "start": 21389295, "end": 21419662}, {"filename": "/data/PhotonEvaporation5.2/z26.a59", "start": 21419662, "end": 21428540}, {"filename": "/data/PhotonEvaporation5.2/z26.a60", "start": 21428540, "end": 21443341}, {"filename": "/data/PhotonEvaporation5.2/z26.a61", "start": 21443341, "end": 21444002}, {"filename": "/data/PhotonEvaporation5.2/z26.a62", "start": 21444002, "end": 21448670}, {"filename": "/data/PhotonEvaporation5.2/z26.a63", "start": 21448670, "end": 21449309}, {"filename": "/data/PhotonEvaporation5.2/z26.a64", "start": 21449309, "end": 21453181}, {"filename": "/data/PhotonEvaporation5.2/z26.a65", "start": 21453181, "end": 21453955}, {"filename": "/data/PhotonEvaporation5.2/z26.a66", "start": 21453955, "end": 21454368}, {"filename": "/data/PhotonEvaporation5.2/z26.a67", "start": 21454368, "end": 21454929}, {"filename": "/data/PhotonEvaporation5.2/z26.a68", "start": 21454929, "end": 21455342}, {"filename": "/data/PhotonEvaporation5.2/z26.a69", "start": 21455342, "end": 21455381}, {"filename": "/data/PhotonEvaporation5.2/z26.a70", "start": 21455381, "end": 21455420}, {"filename": "/data/PhotonEvaporation5.2/z26.a71", "start": 21455420, "end": 21455459}, {"filename": "/data/PhotonEvaporation5.2/z26.a72", "start": 21455459, "end": 21455498}, {"filename": "/data/PhotonEvaporation5.2/z26.a73", "start": 21455498, "end": 21455537}, {"filename": "/data/PhotonEvaporation5.2/z26.a74", "start": 21455537, "end": 21455576}, {"filename": "/data/PhotonEvaporation5.2/z27.a50", "start": 21455576, "end": 21455654}, {"filename": "/data/PhotonEvaporation5.2/z27.a51", "start": 21455654, "end": 21455693}, {"filename": "/data/PhotonEvaporation5.2/z27.a52", "start": 21455693, "end": 21455771}, {"filename": "/data/PhotonEvaporation5.2/z27.a53", "start": 21455771, "end": 21457119}, {"filename": "/data/PhotonEvaporation5.2/z27.a54", "start": 21457119, "end": 21470462}, {"filename": "/data/PhotonEvaporation5.2/z27.a55", "start": 21470462, "end": 21585295}, {"filename": "/data/PhotonEvaporation5.2/z27.a56", "start": 21585295, "end": 21598587}, {"filename": "/data/PhotonEvaporation5.2/z27.a57", "start": 21598587, "end": 21620387}, {"filename": "/data/PhotonEvaporation5.2/z27.a58", "start": 21620387, "end": 21653123}, {"filename": "/data/PhotonEvaporation5.2/z27.a59", "start": 21653123, "end": 21678386}, {"filename": "/data/PhotonEvaporation5.2/z27.a60", "start": 21678386, "end": 21707724}, {"filename": "/data/PhotonEvaporation5.2/z27.a61", "start": 21707724, "end": 21718628}, {"filename": "/data/PhotonEvaporation5.2/z27.a62", "start": 21718628, "end": 21720810}, {"filename": "/data/PhotonEvaporation5.2/z27.a63", "start": 21720810, "end": 21727889}, {"filename": "/data/PhotonEvaporation5.2/z27.a64", "start": 21727889, "end": 21730369}, {"filename": "/data/PhotonEvaporation5.2/z27.a65", "start": 21730369, "end": 21734841}, {"filename": "/data/PhotonEvaporation5.2/z27.a66", "start": 21734841, "end": 21735241}, {"filename": "/data/PhotonEvaporation5.2/z27.a67", "start": 21735241, "end": 21735280}, {"filename": "/data/PhotonEvaporation5.2/z27.a68", "start": 21735280, "end": 21736916}, {"filename": "/data/PhotonEvaporation5.2/z27.a69", "start": 21736916, "end": 21736955}, {"filename": "/data/PhotonEvaporation5.2/z27.a70", "start": 21736955, "end": 21737033}, {"filename": "/data/PhotonEvaporation5.2/z27.a71", "start": 21737033, "end": 21737072}, {"filename": "/data/PhotonEvaporation5.2/z27.a72", "start": 21737072, "end": 21737111}, {"filename": "/data/PhotonEvaporation5.2/z27.a73", "start": 21737111, "end": 21737150}, {"filename": "/data/PhotonEvaporation5.2/z27.a74", "start": 21737150, "end": 21737189}, {"filename": "/data/PhotonEvaporation5.2/z27.a75", "start": 21737189, "end": 21737228}, {"filename": "/data/PhotonEvaporation5.2/z27.a76", "start": 21737228, "end": 21737267}, {"filename": "/data/PhotonEvaporation5.2/z28.a48", "start": 21737267, "end": 21737306}, {"filename": "/data/PhotonEvaporation5.2/z28.a49", "start": 21737306, "end": 21737345}, {"filename": "/data/PhotonEvaporation5.2/z28.a50", "start": 21737345, "end": 21737384}, {"filename": "/data/PhotonEvaporation5.2/z28.a51", "start": 21737384, "end": 21737423}, {"filename": "/data/PhotonEvaporation5.2/z28.a52", "start": 21737423, "end": 21738023}, {"filename": "/data/PhotonEvaporation5.2/z28.a53", "start": 21738023, "end": 21738436}, {"filename": "/data/PhotonEvaporation5.2/z28.a54", "start": 21738436, "end": 21739597}, {"filename": "/data/PhotonEvaporation5.2/z28.a55", "start": 21739597, "end": 21741086}, {"filename": "/data/PhotonEvaporation5.2/z28.a56", "start": 21741086, "end": 21753838}, {"filename": "/data/PhotonEvaporation5.2/z28.a57", "start": 21753838, "end": 21765918}, {"filename": "/data/PhotonEvaporation5.2/z28.a58", "start": 21765918, "end": 21839267}, {"filename": "/data/PhotonEvaporation5.2/z28.a59", "start": 21839267, "end": 21890158}, {"filename": "/data/PhotonEvaporation5.2/z28.a60", "start": 21890158, "end": 21981628}, {"filename": "/data/PhotonEvaporation5.2/z28.a61", "start": 21981628, "end": 22015508}, {"filename": "/data/PhotonEvaporation5.2/z28.a62", "start": 22015508, "end": 22042932}, {"filename": "/data/PhotonEvaporation5.2/z28.a63", "start": 22042932, "end": 22050591}, {"filename": "/data/PhotonEvaporation5.2/z28.a64", "start": 22050591, "end": 22064648}, {"filename": "/data/PhotonEvaporation5.2/z28.a65", "start": 22064648, "end": 22073386}, {"filename": "/data/PhotonEvaporation5.2/z28.a66", "start": 22073386, "end": 22077554}, {"filename": "/data/PhotonEvaporation5.2/z28.a67", "start": 22077554, "end": 22078349}, {"filename": "/data/PhotonEvaporation5.2/z28.a68", "start": 22078349, "end": 22082077}, {"filename": "/data/PhotonEvaporation5.2/z28.a69", "start": 22082077, "end": 22083808}, {"filename": "/data/PhotonEvaporation5.2/z28.a70", "start": 22083808, "end": 22085304}, {"filename": "/data/PhotonEvaporation5.2/z28.a71", "start": 22085304, "end": 22086278}, {"filename": "/data/PhotonEvaporation5.2/z28.a72", "start": 22086278, "end": 22087065}, {"filename": "/data/PhotonEvaporation5.2/z28.a73", "start": 22087065, "end": 22087104}, {"filename": "/data/PhotonEvaporation5.2/z28.a74", "start": 22087104, "end": 22087517}, {"filename": "/data/PhotonEvaporation5.2/z28.a75", "start": 22087517, "end": 22087556}, {"filename": "/data/PhotonEvaporation5.2/z28.a76", "start": 22087556, "end": 22088343}, {"filename": "/data/PhotonEvaporation5.2/z28.a77", "start": 22088343, "end": 22088382}, {"filename": "/data/PhotonEvaporation5.2/z28.a78", "start": 22088382, "end": 22088421}, {"filename": "/data/PhotonEvaporation5.2/z28.a79", "start": 22088421, "end": 22088460}, {"filename": "/data/PhotonEvaporation5.2/z29.a53", "start": 22088460, "end": 22088499}, {"filename": "/data/PhotonEvaporation5.2/z29.a54", "start": 22088499, "end": 22088538}, {"filename": "/data/PhotonEvaporation5.2/z29.a55", "start": 22088538, "end": 22088577}, {"filename": "/data/PhotonEvaporation5.2/z29.a56", "start": 22088577, "end": 22088616}, {"filename": "/data/PhotonEvaporation5.2/z29.a57", "start": 22088616, "end": 22089411}, {"filename": "/data/PhotonEvaporation5.2/z29.a58", "start": 22089411, "end": 22102453}, {"filename": "/data/PhotonEvaporation5.2/z29.a59", "start": 22102453, "end": 22182666}, {"filename": "/data/PhotonEvaporation5.2/z29.a60", "start": 22182666, "end": 22196089}, {"filename": "/data/PhotonEvaporation5.2/z29.a61", "start": 22196089, "end": 22221171}, {"filename": "/data/PhotonEvaporation5.2/z29.a62", "start": 22221171, "end": 22254662}, {"filename": "/data/PhotonEvaporation5.2/z29.a63", "start": 22254662, "end": 22305099}, {"filename": "/data/PhotonEvaporation5.2/z29.a64", "start": 22305099, "end": 22346963}, {"filename": "/data/PhotonEvaporation5.2/z29.a65", "start": 22346963, "end": 22369443}, {"filename": "/data/PhotonEvaporation5.2/z29.a66", "start": 22369443, "end": 22400367}, {"filename": "/data/PhotonEvaporation5.2/z29.a67", "start": 22400367, "end": 22403972}, {"filename": "/data/PhotonEvaporation5.2/z29.a68", "start": 22403972, "end": 22405936}, {"filename": "/data/PhotonEvaporation5.2/z29.a69", "start": 22405936, "end": 22411265}, {"filename": "/data/PhotonEvaporation5.2/z29.a70", "start": 22411265, "end": 22414367}, {"filename": "/data/PhotonEvaporation5.2/z29.a71", "start": 22414367, "end": 22419557}, {"filename": "/data/PhotonEvaporation5.2/z29.a72", "start": 22419557, "end": 22422412}, {"filename": "/data/PhotonEvaporation5.2/z29.a73", "start": 22422412, "end": 22424043}, {"filename": "/data/PhotonEvaporation5.2/z29.a74", "start": 22424043, "end": 22424082}, {"filename": "/data/PhotonEvaporation5.2/z29.a75", "start": 22424082, "end": 22424643}, {"filename": "/data/PhotonEvaporation5.2/z29.a76", "start": 22424643, "end": 22424760}, {"filename": "/data/PhotonEvaporation5.2/z29.a77", "start": 22424760, "end": 22424799}, {"filename": "/data/PhotonEvaporation5.2/z29.a78", "start": 22424799, "end": 22424838}, {"filename": "/data/PhotonEvaporation5.2/z29.a79", "start": 22424838, "end": 22424877}, {"filename": "/data/PhotonEvaporation5.2/z29.a80", "start": 22424877, "end": 22424916}, {"filename": "/data/PhotonEvaporation5.2/z29.a81", "start": 22424916, "end": 22424955}, {"filename": "/data/PhotonEvaporation5.2/z29.a82", "start": 22424955, "end": 22424994}, {"filename": "/data/PhotonEvaporation5.2/z3.a10", "start": 22424994, "end": 22425462}, {"filename": "/data/PhotonEvaporation5.2/z3.a11", "start": 22425462, "end": 22425735}, {"filename": "/data/PhotonEvaporation5.2/z3.a4", "start": 22425735, "end": 22425891}, {"filename": "/data/PhotonEvaporation5.2/z3.a5", "start": 22425891, "end": 22425930}, {"filename": "/data/PhotonEvaporation5.2/z3.a6", "start": 22425930, "end": 22426668}, {"filename": "/data/PhotonEvaporation5.2/z3.a7", "start": 22426668, "end": 22427254}, {"filename": "/data/PhotonEvaporation5.2/z3.a8", "start": 22427254, "end": 22427779}, {"filename": "/data/PhotonEvaporation5.2/z3.a9", "start": 22427779, "end": 22428139}, {"filename": "/data/PhotonEvaporation5.2/z30.a54", "start": 22428139, "end": 22428178}, {"filename": "/data/PhotonEvaporation5.2/z30.a55", "start": 22428178, "end": 22428217}, {"filename": "/data/PhotonEvaporation5.2/z30.a56", "start": 22428217, "end": 22428256}, {"filename": "/data/PhotonEvaporation5.2/z30.a57", "start": 22428256, "end": 22428295}, {"filename": "/data/PhotonEvaporation5.2/z30.a58", "start": 22428295, "end": 22430087}, {"filename": "/data/PhotonEvaporation5.2/z30.a59", "start": 22430087, "end": 22431522}, {"filename": "/data/PhotonEvaporation5.2/z30.a60", "start": 22431522, "end": 22440211}, {"filename": "/data/PhotonEvaporation5.2/z30.a61", "start": 22440211, "end": 22448279}, {"filename": "/data/PhotonEvaporation5.2/z30.a62", "start": 22448279, "end": 22486148}, {"filename": "/data/PhotonEvaporation5.2/z30.a63", "start": 22486148, "end": 22502999}, {"filename": "/data/PhotonEvaporation5.2/z30.a64", "start": 22502999, "end": 22539274}, {"filename": "/data/PhotonEvaporation5.2/z30.a65", "start": 22539274, "end": 22569175}, {"filename": "/data/PhotonEvaporation5.2/z30.a66", "start": 22569175, "end": 22603579}, {"filename": "/data/PhotonEvaporation5.2/z30.a67", "start": 22603579, "end": 22625269}, {"filename": "/data/PhotonEvaporation5.2/z30.a68", "start": 22625269, "end": 22651100}, {"filename": "/data/PhotonEvaporation5.2/z30.a69", "start": 22651100, "end": 22658771}, {"filename": "/data/PhotonEvaporation5.2/z30.a70", "start": 22658771, "end": 22668370}, {"filename": "/data/PhotonEvaporation5.2/z30.a71", "start": 22668370, "end": 22676256}, {"filename": "/data/PhotonEvaporation5.2/z30.a72", "start": 22676256, "end": 22681878}, {"filename": "/data/PhotonEvaporation5.2/z30.a73", "start": 22681878, "end": 22682678}, {"filename": "/data/PhotonEvaporation5.2/z30.a74", "start": 22682678, "end": 22685472}, {"filename": "/data/PhotonEvaporation5.2/z30.a75", "start": 22685472, "end": 22698168}, {"filename": "/data/PhotonEvaporation5.2/z30.a76", "start": 22698168, "end": 22699347}, {"filename": "/data/PhotonEvaporation5.2/z30.a77", "start": 22699347, "end": 22704871}, {"filename": "/data/PhotonEvaporation5.2/z30.a78", "start": 22704871, "end": 22705845}, {"filename": "/data/PhotonEvaporation5.2/z30.a79", "start": 22705845, "end": 22706819}, {"filename": "/data/PhotonEvaporation5.2/z30.a80", "start": 22706819, "end": 22707045}, {"filename": "/data/PhotonEvaporation5.2/z30.a81", "start": 22707045, "end": 22707084}, {"filename": "/data/PhotonEvaporation5.2/z30.a82", "start": 22707084, "end": 22707123}, {"filename": "/data/PhotonEvaporation5.2/z30.a83", "start": 22707123, "end": 22707162}, {"filename": "/data/PhotonEvaporation5.2/z30.a84", "start": 22707162, "end": 22707201}, {"filename": "/data/PhotonEvaporation5.2/z30.a85", "start": 22707201, "end": 22707240}, {"filename": "/data/PhotonEvaporation5.2/z31.a60", "start": 22707240, "end": 22707279}, {"filename": "/data/PhotonEvaporation5.2/z31.a61", "start": 22707279, "end": 22708105}, {"filename": "/data/PhotonEvaporation5.2/z31.a62", "start": 22708105, "end": 22710307}, {"filename": "/data/PhotonEvaporation5.2/z31.a63", "start": 22710307, "end": 22715545}, {"filename": "/data/PhotonEvaporation5.2/z31.a64", "start": 22715545, "end": 22726824}, {"filename": "/data/PhotonEvaporation5.2/z31.a65", "start": 22726824, "end": 22746857}, {"filename": "/data/PhotonEvaporation5.2/z31.a66", "start": 22746857, "end": 22770775}, {"filename": "/data/PhotonEvaporation5.2/z31.a67", "start": 22770775, "end": 22799888}, {"filename": "/data/PhotonEvaporation5.2/z31.a68", "start": 22799888, "end": 22824691}, {"filename": "/data/PhotonEvaporation5.2/z31.a69", "start": 22824691, "end": 22843777}, {"filename": "/data/PhotonEvaporation5.2/z31.a70", "start": 22843777, "end": 22857063}, {"filename": "/data/PhotonEvaporation5.2/z31.a71", "start": 22857063, "end": 22875448}, {"filename": "/data/PhotonEvaporation5.2/z31.a72", "start": 22875448, "end": 22884801}, {"filename": "/data/PhotonEvaporation5.2/z31.a73", "start": 22884801, "end": 22888378}, {"filename": "/data/PhotonEvaporation5.2/z31.a74", "start": 22888378, "end": 22893362}, {"filename": "/data/PhotonEvaporation5.2/z31.a75", "start": 22893362, "end": 22904772}, {"filename": "/data/PhotonEvaporation5.2/z31.a76", "start": 22904772, "end": 22911953}, {"filename": "/data/PhotonEvaporation5.2/z31.a77", "start": 22911953, "end": 22921895}, {"filename": "/data/PhotonEvaporation5.2/z31.a78", "start": 22921895, "end": 22930546}, {"filename": "/data/PhotonEvaporation5.2/z31.a79", "start": 22930546, "end": 22933022}, {"filename": "/data/PhotonEvaporation5.2/z31.a80", "start": 22933022, "end": 22940203}, {"filename": "/data/PhotonEvaporation5.2/z31.a81", "start": 22940203, "end": 22940890}, {"filename": "/data/PhotonEvaporation5.2/z31.a82", "start": 22940890, "end": 22940929}, {"filename": "/data/PhotonEvaporation5.2/z31.a83", "start": 22940929, "end": 22940968}, {"filename": "/data/PhotonEvaporation5.2/z31.a84", "start": 22940968, "end": 22941046}, {"filename": "/data/PhotonEvaporation5.2/z31.a85", "start": 22941046, "end": 22941085}, {"filename": "/data/PhotonEvaporation5.2/z31.a86", "start": 22941085, "end": 22941124}, {"filename": "/data/PhotonEvaporation5.2/z31.a87", "start": 22941124, "end": 22941163}, {"filename": "/data/PhotonEvaporation5.2/z32.a60", "start": 22941163, "end": 22941202}, {"filename": "/data/PhotonEvaporation5.2/z32.a61", "start": 22941202, "end": 22941241}, {"filename": "/data/PhotonEvaporation5.2/z32.a62", "start": 22941241, "end": 22941454}, {"filename": "/data/PhotonEvaporation5.2/z32.a63", "start": 22941454, "end": 22941493}, {"filename": "/data/PhotonEvaporation5.2/z32.a64", "start": 22941493, "end": 22945360}, {"filename": "/data/PhotonEvaporation5.2/z32.a65", "start": 22945360, "end": 22954265}, {"filename": "/data/PhotonEvaporation5.2/z32.a66", "start": 22954265, "end": 22973656}, {"filename": "/data/PhotonEvaporation5.2/z32.a67", "start": 22973656, "end": 22979661}, {"filename": "/data/PhotonEvaporation5.2/z32.a68", "start": 22979661, "end": 23022738}, {"filename": "/data/PhotonEvaporation5.2/z32.a69", "start": 23022738, "end": 23076347}, {"filename": "/data/PhotonEvaporation5.2/z32.a70", "start": 23076347, "end": 23096885}, {"filename": "/data/PhotonEvaporation5.2/z32.a71", "start": 23096885, "end": 23136541}, {"filename": "/data/PhotonEvaporation5.2/z32.a72", "start": 23136541, "end": 23163940}, {"filename": "/data/PhotonEvaporation5.2/z32.a73", "start": 23163940, "end": 23180012}, {"filename": "/data/PhotonEvaporation5.2/z32.a74", "start": 23180012, "end": 23230221}, {"filename": "/data/PhotonEvaporation5.2/z32.a75", "start": 23230221, "end": 23255572}, {"filename": "/data/PhotonEvaporation5.2/z32.a76", "start": 23255572, "end": 23271008}, {"filename": "/data/PhotonEvaporation5.2/z32.a77", "start": 23271008, "end": 23285151}, {"filename": "/data/PhotonEvaporation5.2/z32.a78", "start": 23285151, "end": 23291296}, {"filename": "/data/PhotonEvaporation5.2/z32.a79", "start": 23291296, "end": 23302364}, {"filename": "/data/PhotonEvaporation5.2/z32.a80", "start": 23302364, "end": 23306900}, {"filename": "/data/PhotonEvaporation5.2/z32.a81", "start": 23306900, "end": 23318503}, {"filename": "/data/PhotonEvaporation5.2/z32.a82", "start": 23318503, "end": 23320826}, {"filename": "/data/PhotonEvaporation5.2/z32.a83", "start": 23320826, "end": 23321848}, {"filename": "/data/PhotonEvaporation5.2/z32.a84", "start": 23321848, "end": 23322348}, {"filename": "/data/PhotonEvaporation5.2/z32.a85", "start": 23322348, "end": 23323392}, {"filename": "/data/PhotonEvaporation5.2/z32.a86", "start": 23323392, "end": 23323618}, {"filename": "/data/PhotonEvaporation5.2/z32.a87", "start": 23323618, "end": 23323657}, {"filename": "/data/PhotonEvaporation5.2/z32.a88", "start": 23323657, "end": 23323696}, {"filename": "/data/PhotonEvaporation5.2/z32.a89", "start": 23323696, "end": 23323735}, {"filename": "/data/PhotonEvaporation5.2/z32.a90", "start": 23323735, "end": 23323774}, {"filename": "/data/PhotonEvaporation5.2/z33.a63", "start": 23323774, "end": 23323813}, {"filename": "/data/PhotonEvaporation5.2/z33.a64", "start": 23323813, "end": 23323852}, {"filename": "/data/PhotonEvaporation5.2/z33.a65", "start": 23323852, "end": 23323930}, {"filename": "/data/PhotonEvaporation5.2/z33.a66", "start": 23323930, "end": 23326296}, {"filename": "/data/PhotonEvaporation5.2/z33.a67", "start": 23326296, "end": 23329528}, {"filename": "/data/PhotonEvaporation5.2/z33.a68", "start": 23329528, "end": 23342283}, {"filename": "/data/PhotonEvaporation5.2/z33.a69", "start": 23342283, "end": 23372928}, {"filename": "/data/PhotonEvaporation5.2/z33.a70", "start": 23372928, "end": 23391931}, {"filename": "/data/PhotonEvaporation5.2/z33.a71", "start": 23391931, "end": 23412710}, {"filename": "/data/PhotonEvaporation5.2/z33.a72", "start": 23412710, "end": 23437436}, {"filename": "/data/PhotonEvaporation5.2/z33.a73", "start": 23437436, "end": 23469403}, {"filename": "/data/PhotonEvaporation5.2/z33.a74", "start": 23469403, "end": 23496657}, {"filename": "/data/PhotonEvaporation5.2/z33.a75", "start": 23496657, "end": 23529978}, {"filename": "/data/PhotonEvaporation5.2/z33.a76", "start": 23529978, "end": 23553957}, {"filename": "/data/PhotonEvaporation5.2/z33.a77", "start": 23553957, "end": 23584654}, {"filename": "/data/PhotonEvaporation5.2/z33.a78", "start": 23584654, "end": 23589683}, {"filename": "/data/PhotonEvaporation5.2/z33.a79", "start": 23589683, "end": 23593857}, {"filename": "/data/PhotonEvaporation5.2/z33.a80", "start": 23593857, "end": 23595782}, {"filename": "/data/PhotonEvaporation5.2/z33.a81", "start": 23595782, "end": 23604813}, {"filename": "/data/PhotonEvaporation5.2/z33.a82", "start": 23604813, "end": 23605464}, {"filename": "/data/PhotonEvaporation5.2/z33.a83", "start": 23605464, "end": 23609104}, {"filename": "/data/PhotonEvaporation5.2/z33.a84", "start": 23609104, "end": 23609578}, {"filename": "/data/PhotonEvaporation5.2/z33.a85", "start": 23609578, "end": 23609617}, {"filename": "/data/PhotonEvaporation5.2/z33.a86", "start": 23609617, "end": 23609656}, {"filename": "/data/PhotonEvaporation5.2/z33.a87", "start": 23609656, "end": 23609695}, {"filename": "/data/PhotonEvaporation5.2/z33.a88", "start": 23609695, "end": 23609734}, {"filename": "/data/PhotonEvaporation5.2/z33.a89", "start": 23609734, "end": 23609773}, {"filename": "/data/PhotonEvaporation5.2/z33.a90", "start": 23609773, "end": 23609812}, {"filename": "/data/PhotonEvaporation5.2/z33.a91", "start": 23609812, "end": 23609851}, {"filename": "/data/PhotonEvaporation5.2/z33.a92", "start": 23609851, "end": 23609890}, {"filename": "/data/PhotonEvaporation5.2/z34.a64", "start": 23609890, "end": 23609929}, {"filename": "/data/PhotonEvaporation5.2/z34.a65", "start": 23609929, "end": 23609968}, {"filename": "/data/PhotonEvaporation5.2/z34.a66", "start": 23609968, "end": 23610194}, {"filename": "/data/PhotonEvaporation5.2/z34.a67", "start": 23610194, "end": 23610233}, {"filename": "/data/PhotonEvaporation5.2/z34.a68", "start": 23610233, "end": 23614348}, {"filename": "/data/PhotonEvaporation5.2/z34.a69", "start": 23614348, "end": 23632286}, {"filename": "/data/PhotonEvaporation5.2/z34.a70", "start": 23632286, "end": 23646222}, {"filename": "/data/PhotonEvaporation5.2/z34.a71", "start": 23646222, "end": 23651455}, {"filename": "/data/PhotonEvaporation5.2/z34.a72", "start": 23651455, "end": 23662806}, {"filename": "/data/PhotonEvaporation5.2/z34.a73", "start": 23662806, "end": 23684304}, {"filename": "/data/PhotonEvaporation5.2/z34.a74", "start": 23684304, "end": 23713896}, {"filename": "/data/PhotonEvaporation5.2/z34.a75", "start": 23713896, "end": 23752549}, {"filename": "/data/PhotonEvaporation5.2/z34.a76", "start": 23752549, "end": 23781178}, {"filename": "/data/PhotonEvaporation5.2/z34.a77", "start": 23781178, "end": 23861809}, {"filename": "/data/PhotonEvaporation5.2/z34.a78", "start": 23861809, "end": 23899783}, {"filename": "/data/PhotonEvaporation5.2/z34.a79", "start": 23899783, "end": 23916481}, {"filename": "/data/PhotonEvaporation5.2/z34.a80", "start": 23916481, "end": 23932200}, {"filename": "/data/PhotonEvaporation5.2/z34.a81", "start": 23932200, "end": 23944951}, {"filename": "/data/PhotonEvaporation5.2/z34.a82", "start": 23944951, "end": 23951788}, {"filename": "/data/PhotonEvaporation5.2/z34.a83", "start": 23951788, "end": 23959088}, {"filename": "/data/PhotonEvaporation5.2/z34.a84", "start": 23959088, "end": 23965554}, {"filename": "/data/PhotonEvaporation5.2/z34.a85", "start": 23965554, "end": 23970863}, {"filename": "/data/PhotonEvaporation5.2/z34.a86", "start": 23970863, "end": 23971772}, {"filename": "/data/PhotonEvaporation5.2/z34.a87", "start": 23971772, "end": 23971811}, {"filename": "/data/PhotonEvaporation5.2/z34.a88", "start": 23971811, "end": 23971850}, {"filename": "/data/PhotonEvaporation5.2/z34.a89", "start": 23971850, "end": 23971889}, {"filename": "/data/PhotonEvaporation5.2/z34.a90", "start": 23971889, "end": 23971928}, {"filename": "/data/PhotonEvaporation5.2/z34.a91", "start": 23971928, "end": 23971967}, {"filename": "/data/PhotonEvaporation5.2/z34.a92", "start": 23971967, "end": 23972006}, {"filename": "/data/PhotonEvaporation5.2/z34.a93", "start": 23972006, "end": 23972045}, {"filename": "/data/PhotonEvaporation5.2/z34.a94", "start": 23972045, "end": 23972084}, {"filename": "/data/PhotonEvaporation5.2/z34.a95", "start": 23972084, "end": 23972123}, {"filename": "/data/PhotonEvaporation5.2/z35.a69", "start": 23972123, "end": 23972201}, {"filename": "/data/PhotonEvaporation5.2/z35.a70", "start": 23972201, "end": 23978464}, {"filename": "/data/PhotonEvaporation5.2/z35.a71", "start": 23978464, "end": 23996248}, {"filename": "/data/PhotonEvaporation5.2/z35.a72", "start": 23996248, "end": 24026282}, {"filename": "/data/PhotonEvaporation5.2/z35.a73", "start": 24026282, "end": 24044168}, {"filename": "/data/PhotonEvaporation5.2/z35.a74", "start": 24044168, "end": 24076410}, {"filename": "/data/PhotonEvaporation5.2/z35.a75", "start": 24076410, "end": 24104493}, {"filename": "/data/PhotonEvaporation5.2/z35.a76", "start": 24104493, "end": 24124700}, {"filename": "/data/PhotonEvaporation5.2/z35.a77", "start": 24124700, "end": 24147517}, {"filename": "/data/PhotonEvaporation5.2/z35.a78", "start": 24147517, "end": 24159928}, {"filename": "/data/PhotonEvaporation5.2/z35.a79", "start": 24159928, "end": 24194588}, {"filename": "/data/PhotonEvaporation5.2/z35.a80", "start": 24194588, "end": 24229404}, {"filename": "/data/PhotonEvaporation5.2/z35.a81", "start": 24229404, "end": 24243847}, {"filename": "/data/PhotonEvaporation5.2/z35.a82", "start": 24243847, "end": 24256607}, {"filename": "/data/PhotonEvaporation5.2/z35.a83", "start": 24256607, "end": 24276302}, {"filename": "/data/PhotonEvaporation5.2/z35.a84", "start": 24276302, "end": 24278320}, {"filename": "/data/PhotonEvaporation5.2/z35.a85", "start": 24278320, "end": 24287558}, {"filename": "/data/PhotonEvaporation5.2/z35.a86", "start": 24287558, "end": 24293088}, {"filename": "/data/PhotonEvaporation5.2/z35.a87", "start": 24293088, "end": 24294215}, {"filename": "/data/PhotonEvaporation5.2/z35.a88", "start": 24294215, "end": 24295638}, {"filename": "/data/PhotonEvaporation5.2/z35.a89", "start": 24295638, "end": 24295677}, {"filename": "/data/PhotonEvaporation5.2/z35.a90", "start": 24295677, "end": 24295716}, {"filename": "/data/PhotonEvaporation5.2/z35.a91", "start": 24295716, "end": 24295755}, {"filename": "/data/PhotonEvaporation5.2/z35.a92", "start": 24295755, "end": 24295833}, {"filename": "/data/PhotonEvaporation5.2/z35.a93", "start": 24295833, "end": 24295872}, {"filename": "/data/PhotonEvaporation5.2/z35.a94", "start": 24295872, "end": 24295911}, {"filename": "/data/PhotonEvaporation5.2/z35.a95", "start": 24295911, "end": 24295950}, {"filename": "/data/PhotonEvaporation5.2/z35.a96", "start": 24295950, "end": 24295989}, {"filename": "/data/PhotonEvaporation5.2/z35.a97", "start": 24295989, "end": 24296028}, {"filename": "/data/PhotonEvaporation5.2/z35.a98", "start": 24296028, "end": 24296067}, {"filename": "/data/PhotonEvaporation5.2/z36.a100", "start": 24296067, "end": 24296106}, {"filename": "/data/PhotonEvaporation5.2/z36.a101", "start": 24296106, "end": 24296145}, {"filename": "/data/PhotonEvaporation5.2/z36.a69", "start": 24296145, "end": 24296184}, {"filename": "/data/PhotonEvaporation5.2/z36.a70", "start": 24296184, "end": 24296223}, {"filename": "/data/PhotonEvaporation5.2/z36.a71", "start": 24296223, "end": 24296262}, {"filename": "/data/PhotonEvaporation5.2/z36.a72", "start": 24296262, "end": 24303569}, {"filename": "/data/PhotonEvaporation5.2/z36.a73", "start": 24303569, "end": 24314799}, {"filename": "/data/PhotonEvaporation5.2/z36.a74", "start": 24314799, "end": 24329502}, {"filename": "/data/PhotonEvaporation5.2/z36.a75", "start": 24329502, "end": 24365871}, {"filename": "/data/PhotonEvaporation5.2/z36.a76", "start": 24365871, "end": 24378108}, {"filename": "/data/PhotonEvaporation5.2/z36.a77", "start": 24378108, "end": 24399792}, {"filename": "/data/PhotonEvaporation5.2/z36.a78", "start": 24399792, "end": 24431745}, {"filename": "/data/PhotonEvaporation5.2/z36.a79", "start": 24431745, "end": 24470342}, {"filename": "/data/PhotonEvaporation5.2/z36.a80", "start": 24470342, "end": 24485370}, {"filename": "/data/PhotonEvaporation5.2/z36.a81", "start": 24485370, "end": 24513804}, {"filename": "/data/PhotonEvaporation5.2/z36.a82", "start": 24513804, "end": 24535440}, {"filename": "/data/PhotonEvaporation5.2/z36.a83", "start": 24535440, "end": 24551102}, {"filename": "/data/PhotonEvaporation5.2/z36.a84", "start": 24551102, "end": 24569549}, {"filename": "/data/PhotonEvaporation5.2/z36.a85", "start": 24569549, "end": 24585975}, {"filename": "/data/PhotonEvaporation5.2/z36.a86", "start": 24585975, "end": 24598197}, {"filename": "/data/PhotonEvaporation5.2/z36.a87", "start": 24598197, "end": 24626023}, {"filename": "/data/PhotonEvaporation5.2/z36.a88", "start": 24626023, "end": 24641704}, {"filename": "/data/PhotonEvaporation5.2/z36.a89", "start": 24641704, "end": 24648410}, {"filename": "/data/PhotonEvaporation5.2/z36.a90", "start": 24648410, "end": 24652179}, {"filename": "/data/PhotonEvaporation5.2/z36.a91", "start": 24652179, "end": 24655048}, {"filename": "/data/PhotonEvaporation5.2/z36.a92", "start": 24655048, "end": 24662037}, {"filename": "/data/PhotonEvaporation5.2/z36.a93", "start": 24662037, "end": 24664112}, {"filename": "/data/PhotonEvaporation5.2/z36.a94", "start": 24664112, "end": 24664612}, {"filename": "/data/PhotonEvaporation5.2/z36.a95", "start": 24664612, "end": 24665025}, {"filename": "/data/PhotonEvaporation5.2/z36.a96", "start": 24665025, "end": 24665251}, {"filename": "/data/PhotonEvaporation5.2/z36.a97", "start": 24665251, "end": 24665290}, {"filename": "/data/PhotonEvaporation5.2/z36.a98", "start": 24665290, "end": 24665329}, {"filename": "/data/PhotonEvaporation5.2/z36.a99", "start": 24665329, "end": 24665368}, {"filename": "/data/PhotonEvaporation5.2/z37.a100", "start": 24665368, "end": 24665446}, {"filename": "/data/PhotonEvaporation5.2/z37.a101", "start": 24665446, "end": 24665485}, {"filename": "/data/PhotonEvaporation5.2/z37.a102", "start": 24665485, "end": 24665524}, {"filename": "/data/PhotonEvaporation5.2/z37.a103", "start": 24665524, "end": 24665563}, {"filename": "/data/PhotonEvaporation5.2/z37.a73", "start": 24665563, "end": 24665641}, {"filename": "/data/PhotonEvaporation5.2/z37.a74", "start": 24665641, "end": 24670151}, {"filename": "/data/PhotonEvaporation5.2/z37.a75", "start": 24670151, "end": 24679789}, {"filename": "/data/PhotonEvaporation5.2/z37.a76", "start": 24679789, "end": 24686585}, {"filename": "/data/PhotonEvaporation5.2/z37.a77", "start": 24686585, "end": 24709605}, {"filename": "/data/PhotonEvaporation5.2/z37.a78", "start": 24709605, "end": 24727831}, {"filename": "/data/PhotonEvaporation5.2/z37.a79", "start": 24727831, "end": 24748549}, {"filename": "/data/PhotonEvaporation5.2/z37.a80", "start": 24748549, "end": 24766932}, {"filename": "/data/PhotonEvaporation5.2/z37.a81", "start": 24766932, "end": 24796268}, {"filename": "/data/PhotonEvaporation5.2/z37.a82", "start": 24796268, "end": 24809494}, {"filename": "/data/PhotonEvaporation5.2/z37.a83", "start": 24809494, "end": 24842464}, {"filename": "/data/PhotonEvaporation5.2/z37.a84", "start": 24842464, "end": 24857266}, {"filename": "/data/PhotonEvaporation5.2/z37.a85", "start": 24857266, "end": 24879711}, {"filename": "/data/PhotonEvaporation5.2/z37.a86", "start": 24879711, "end": 24891259}, {"filename": "/data/PhotonEvaporation5.2/z37.a87", "start": 24891259, "end": 24898725}, {"filename": "/data/PhotonEvaporation5.2/z37.a88", "start": 24898725, "end": 24912468}, {"filename": "/data/PhotonEvaporation5.2/z37.a89", "start": 24912468, "end": 24949650}, {"filename": "/data/PhotonEvaporation5.2/z37.a90", "start": 24949650, "end": 24957306}, {"filename": "/data/PhotonEvaporation5.2/z37.a91", "start": 24957306, "end": 24972150}, {"filename": "/data/PhotonEvaporation5.2/z37.a92", "start": 24972150, "end": 24981281}, {"filename": "/data/PhotonEvaporation5.2/z37.a93", "start": 24981281, "end": 24997767}, {"filename": "/data/PhotonEvaporation5.2/z37.a94", "start": 24997767, "end": 25003102}, {"filename": "/data/PhotonEvaporation5.2/z37.a95", "start": 25003102, "end": 25003498}, {"filename": "/data/PhotonEvaporation5.2/z37.a96", "start": 25003498, "end": 25007101}, {"filename": "/data/PhotonEvaporation5.2/z37.a97", "start": 25007101, "end": 25007140}, {"filename": "/data/PhotonEvaporation5.2/z37.a98", "start": 25007140, "end": 25007218}, {"filename": "/data/PhotonEvaporation5.2/z37.a99", "start": 25007218, "end": 25007257}, {"filename": "/data/PhotonEvaporation5.2/z38.a100", "start": 25007257, "end": 25012562}, {"filename": "/data/PhotonEvaporation5.2/z38.a101", "start": 25012562, "end": 25014067}, {"filename": "/data/PhotonEvaporation5.2/z38.a102", "start": 25014067, "end": 25014293}, {"filename": "/data/PhotonEvaporation5.2/z38.a103", "start": 25014293, "end": 25014332}, {"filename": "/data/PhotonEvaporation5.2/z38.a104", "start": 25014332, "end": 25014371}, {"filename": "/data/PhotonEvaporation5.2/z38.a105", "start": 25014371, "end": 25014410}, {"filename": "/data/PhotonEvaporation5.2/z38.a106", "start": 25014410, "end": 25014449}, {"filename": "/data/PhotonEvaporation5.2/z38.a107", "start": 25014449, "end": 25014488}, {"filename": "/data/PhotonEvaporation5.2/z38.a73", "start": 25014488, "end": 25014527}, {"filename": "/data/PhotonEvaporation5.2/z38.a74", "start": 25014527, "end": 25014940}, {"filename": "/data/PhotonEvaporation5.2/z38.a75", "start": 25014940, "end": 25014979}, {"filename": "/data/PhotonEvaporation5.2/z38.a76", "start": 25014979, "end": 25017262}, {"filename": "/data/PhotonEvaporation5.2/z38.a77", "start": 25017262, "end": 25025949}, {"filename": "/data/PhotonEvaporation5.2/z38.a78", "start": 25025949, "end": 25034853}, {"filename": "/data/PhotonEvaporation5.2/z38.a79", "start": 25034853, "end": 25041779}, {"filename": "/data/PhotonEvaporation5.2/z38.a80", "start": 25041779, "end": 25060160}, {"filename": "/data/PhotonEvaporation5.2/z38.a81", "start": 25060160, "end": 25087854}, {"filename": "/data/PhotonEvaporation5.2/z38.a82", "start": 25087854, "end": 25111154}, {"filename": "/data/PhotonEvaporation5.2/z38.a83", "start": 25111154, "end": 25137075}, {"filename": "/data/PhotonEvaporation5.2/z38.a84", "start": 25137075, "end": 25151123}, {"filename": "/data/PhotonEvaporation5.2/z38.a85", "start": 25151123, "end": 25183642}, {"filename": "/data/PhotonEvaporation5.2/z38.a86", "start": 25183642, "end": 25209736}, {"filename": "/data/PhotonEvaporation5.2/z38.a87", "start": 25209736, "end": 25256397}, {"filename": "/data/PhotonEvaporation5.2/z38.a88", "start": 25256397, "end": 25319066}, {"filename": "/data/PhotonEvaporation5.2/z38.a89", "start": 25319066, "end": 25339650}, {"filename": "/data/PhotonEvaporation5.2/z38.a90", "start": 25339650, "end": 25352726}, {"filename": "/data/PhotonEvaporation5.2/z38.a91", "start": 25352726, "end": 25366637}, {"filename": "/data/PhotonEvaporation5.2/z38.a92", "start": 25366637, "end": 25374822}, {"filename": "/data/PhotonEvaporation5.2/z38.a93", "start": 25374822, "end": 25399563}, {"filename": "/data/PhotonEvaporation5.2/z38.a94", "start": 25399563, "end": 25412531}, {"filename": "/data/PhotonEvaporation5.2/z38.a95", "start": 25412531, "end": 25436700}, {"filename": "/data/PhotonEvaporation5.2/z38.a96", "start": 25436700, "end": 25447614}, {"filename": "/data/PhotonEvaporation5.2/z38.a97", "start": 25447614, "end": 25463992}, {"filename": "/data/PhotonEvaporation5.2/z38.a98", "start": 25463992, "end": 25470476}, {"filename": "/data/PhotonEvaporation5.2/z38.a99", "start": 25470476, "end": 25475894}, {"filename": "/data/PhotonEvaporation5.2/z39.a100", "start": 25475894, "end": 25482311}, {"filename": "/data/PhotonEvaporation5.2/z39.a101", "start": 25482311, "end": 25498155}, {"filename": "/data/PhotonEvaporation5.2/z39.a102", "start": 25498155, "end": 25499975}, {"filename": "/data/PhotonEvaporation5.2/z39.a103", "start": 25499975, "end": 25500014}, {"filename": "/data/PhotonEvaporation5.2/z39.a104", "start": 25500014, "end": 25500053}, {"filename": "/data/PhotonEvaporation5.2/z39.a105", "start": 25500053, "end": 25500092}, {"filename": "/data/PhotonEvaporation5.2/z39.a106", "start": 25500092, "end": 25500131}, {"filename": "/data/PhotonEvaporation5.2/z39.a107", "start": 25500131, "end": 25500170}, {"filename": "/data/PhotonEvaporation5.2/z39.a108", "start": 25500170, "end": 25500209}, {"filename": "/data/PhotonEvaporation5.2/z39.a109", "start": 25500209, "end": 25500248}, {"filename": "/data/PhotonEvaporation5.2/z39.a76", "start": 25500248, "end": 25500287}, {"filename": "/data/PhotonEvaporation5.2/z39.a77", "start": 25500287, "end": 25500326}, {"filename": "/data/PhotonEvaporation5.2/z39.a78", "start": 25500326, "end": 25500778}, {"filename": "/data/PhotonEvaporation5.2/z39.a79", "start": 25500778, "end": 25503614}, {"filename": "/data/PhotonEvaporation5.2/z39.a80", "start": 25503614, "end": 25520233}, {"filename": "/data/PhotonEvaporation5.2/z39.a81", "start": 25520233, "end": 25548338}, {"filename": "/data/PhotonEvaporation5.2/z39.a82", "start": 25548338, "end": 25563722}, {"filename": "/data/PhotonEvaporation5.2/z39.a83", "start": 25563722, "end": 25592711}, {"filename": "/data/PhotonEvaporation5.2/z39.a84", "start": 25592711, "end": 25612845}, {"filename": "/data/PhotonEvaporation5.2/z39.a85", "start": 25612845, "end": 25636959}, {"filename": "/data/PhotonEvaporation5.2/z39.a86", "start": 25636959, "end": 25650398}, {"filename": "/data/PhotonEvaporation5.2/z39.a87", "start": 25650398, "end": 25674166}, {"filename": "/data/PhotonEvaporation5.2/z39.a88", "start": 25674166, "end": 25686749}, {"filename": "/data/PhotonEvaporation5.2/z39.a89", "start": 25686749, "end": 25731189}, {"filename": "/data/PhotonEvaporation5.2/z39.a90", "start": 25731189, "end": 25781764}, {"filename": "/data/PhotonEvaporation5.2/z39.a91", "start": 25781764, "end": 25792838}, {"filename": "/data/PhotonEvaporation5.2/z39.a92", "start": 25792838, "end": 25794720}, {"filename": "/data/PhotonEvaporation5.2/z39.a93", "start": 25794720, "end": 25810491}, {"filename": "/data/PhotonEvaporation5.2/z39.a94", "start": 25810491, "end": 25813817}, {"filename": "/data/PhotonEvaporation5.2/z39.a95", "start": 25813817, "end": 25829059}, {"filename": "/data/PhotonEvaporation5.2/z39.a96", "start": 25829059, "end": 25831291}, {"filename": "/data/PhotonEvaporation5.2/z39.a97", "start": 25831291, "end": 25838261}, {"filename": "/data/PhotonEvaporation5.2/z39.a98", "start": 25838261, "end": 25847331}, {"filename": "/data/PhotonEvaporation5.2/z39.a99", "start": 25847331, "end": 25863405}, {"filename": "/data/PhotonEvaporation5.2/z4.a10", "start": 25863405, "end": 25865628}, {"filename": "/data/PhotonEvaporation5.2/z4.a11", "start": 25865628, "end": 25867002}, {"filename": "/data/PhotonEvaporation5.2/z4.a12", "start": 25867002, "end": 25867197}, {"filename": "/data/PhotonEvaporation5.2/z4.a13", "start": 25867197, "end": 25867236}, {"filename": "/data/PhotonEvaporation5.2/z4.a14", "start": 25867236, "end": 25867275}, {"filename": "/data/PhotonEvaporation5.2/z4.a5", "start": 25867275, "end": 25867314}, {"filename": "/data/PhotonEvaporation5.2/z4.a6", "start": 25867314, "end": 25867509}, {"filename": "/data/PhotonEvaporation5.2/z4.a7", "start": 25867509, "end": 25867908}, {"filename": "/data/PhotonEvaporation5.2/z4.a8", "start": 25867908, "end": 25869864}, {"filename": "/data/PhotonEvaporation5.2/z4.a9", "start": 25869864, "end": 25872207}, {"filename": "/data/PhotonEvaporation5.2/z40.a100", "start": 25872207, "end": 25887081}, {"filename": "/data/PhotonEvaporation5.2/z40.a101", "start": 25887081, "end": 25902581}, {"filename": "/data/PhotonEvaporation5.2/z40.a102", "start": 25902581, "end": 25914270}, {"filename": "/data/PhotonEvaporation5.2/z40.a103", "start": 25914270, "end": 25917924}, {"filename": "/data/PhotonEvaporation5.2/z40.a104", "start": 25917924, "end": 25919272}, {"filename": "/data/PhotonEvaporation5.2/z40.a105", "start": 25919272, "end": 25919311}, {"filename": "/data/PhotonEvaporation5.2/z40.a106", "start": 25919311, "end": 25919911}, {"filename": "/data/PhotonEvaporation5.2/z40.a107", "start": 25919911, "end": 25919950}, {"filename": "/data/PhotonEvaporation5.2/z40.a108", "start": 25919950, "end": 25920363}, {"filename": "/data/PhotonEvaporation5.2/z40.a109", "start": 25920363, "end": 25920402}, {"filename": "/data/PhotonEvaporation5.2/z40.a110", "start": 25920402, "end": 25920441}, {"filename": "/data/PhotonEvaporation5.2/z40.a111", "start": 25920441, "end": 25920480}, {"filename": "/data/PhotonEvaporation5.2/z40.a112", "start": 25920480, "end": 25920519}, {"filename": "/data/PhotonEvaporation5.2/z40.a78", "start": 25920519, "end": 25920558}, {"filename": "/data/PhotonEvaporation5.2/z40.a79", "start": 25920558, "end": 25920597}, {"filename": "/data/PhotonEvaporation5.2/z40.a80", "start": 25920597, "end": 25921571}, {"filename": "/data/PhotonEvaporation5.2/z40.a81", "start": 25921571, "end": 25931201}, {"filename": "/data/PhotonEvaporation5.2/z40.a82", "start": 25931201, "end": 25943093}, {"filename": "/data/PhotonEvaporation5.2/z40.a83", "start": 25943093, "end": 25967017}, {"filename": "/data/PhotonEvaporation5.2/z40.a84", "start": 25967017, "end": 25987498}, {"filename": "/data/PhotonEvaporation5.2/z40.a85", "start": 25987498, "end": 26000714}, {"filename": "/data/PhotonEvaporation5.2/z40.a86", "start": 26000714, "end": 26026060}, {"filename": "/data/PhotonEvaporation5.2/z40.a87", "start": 26026060, "end": 26037245}, {"filename": "/data/PhotonEvaporation5.2/z40.a88", "start": 26037245, "end": 26058996}, {"filename": "/data/PhotonEvaporation5.2/z40.a89", "start": 26058996, "end": 26083297}, {"filename": "/data/PhotonEvaporation5.2/z40.a90", "start": 26083297, "end": 26107666}, {"filename": "/data/PhotonEvaporation5.2/z40.a91", "start": 26107666, "end": 26134384}, {"filename": "/data/PhotonEvaporation5.2/z40.a92", "start": 26134384, "end": 26160006}, {"filename": "/data/PhotonEvaporation5.2/z40.a93", "start": 26160006, "end": 26169168}, {"filename": "/data/PhotonEvaporation5.2/z40.a94", "start": 26169168, "end": 26179681}, {"filename": "/data/PhotonEvaporation5.2/z40.a95", "start": 26179681, "end": 26195886}, {"filename": "/data/PhotonEvaporation5.2/z40.a96", "start": 26195886, "end": 26217722}, {"filename": "/data/PhotonEvaporation5.2/z40.a97", "start": 26217722, "end": 26229226}, {"filename": "/data/PhotonEvaporation5.2/z40.a98", "start": 26229226, "end": 26240127}, {"filename": "/data/PhotonEvaporation5.2/z40.a99", "start": 26240127, "end": 26262681}, {"filename": "/data/PhotonEvaporation5.2/z41.a100", "start": 26262681, "end": 26266105}, {"filename": "/data/PhotonEvaporation5.2/z41.a101", "start": 26266105, "end": 26281268}, {"filename": "/data/PhotonEvaporation5.2/z41.a102", "start": 26281268, "end": 26292377}, {"filename": "/data/PhotonEvaporation5.2/z41.a103", "start": 26292377, "end": 26304209}, {"filename": "/data/PhotonEvaporation5.2/z41.a104", "start": 26304209, "end": 26305671}, {"filename": "/data/PhotonEvaporation5.2/z41.a105", "start": 26305671, "end": 26307237}, {"filename": "/data/PhotonEvaporation5.2/z41.a106", "start": 26307237, "end": 26307276}, {"filename": "/data/PhotonEvaporation5.2/z41.a107", "start": 26307276, "end": 26307315}, {"filename": "/data/PhotonEvaporation5.2/z41.a108", "start": 26307315, "end": 26307354}, {"filename": "/data/PhotonEvaporation5.2/z41.a109", "start": 26307354, "end": 26307393}, {"filename": "/data/PhotonEvaporation5.2/z41.a110", "start": 26307393, "end": 26307432}, {"filename": "/data/PhotonEvaporation5.2/z41.a111", "start": 26307432, "end": 26307471}, {"filename": "/data/PhotonEvaporation5.2/z41.a112", "start": 26307471, "end": 26307510}, {"filename": "/data/PhotonEvaporation5.2/z41.a113", "start": 26307510, "end": 26307549}, {"filename": "/data/PhotonEvaporation5.2/z41.a114", "start": 26307549, "end": 26307588}, {"filename": "/data/PhotonEvaporation5.2/z41.a81", "start": 26307588, "end": 26307627}, {"filename": "/data/PhotonEvaporation5.2/z41.a82", "start": 26307627, "end": 26308227}, {"filename": "/data/PhotonEvaporation5.2/z41.a83", "start": 26308227, "end": 26310058}, {"filename": "/data/PhotonEvaporation5.2/z41.a84", "start": 26310058, "end": 26320730}, {"filename": "/data/PhotonEvaporation5.2/z41.a85", "start": 26320730, "end": 26327990}, {"filename": "/data/PhotonEvaporation5.2/z41.a86", "start": 26327990, "end": 26346362}, {"filename": "/data/PhotonEvaporation5.2/z41.a87", "start": 26346362, "end": 26368218}, {"filename": "/data/PhotonEvaporation5.2/z41.a88", "start": 26368218, "end": 26377811}, {"filename": "/data/PhotonEvaporation5.2/z41.a89", "start": 26377811, "end": 26384428}, {"filename": "/data/PhotonEvaporation5.2/z41.a90", "start": 26384428, "end": 26392150}, {"filename": "/data/PhotonEvaporation5.2/z41.a91", "start": 26392150, "end": 26409345}, {"filename": "/data/PhotonEvaporation5.2/z41.a92", "start": 26409345, "end": 26423451}, {"filename": "/data/PhotonEvaporation5.2/z41.a93", "start": 26423451, "end": 26451211}, {"filename": "/data/PhotonEvaporation5.2/z41.a94", "start": 26451211, "end": 26482054}, {"filename": "/data/PhotonEvaporation5.2/z41.a95", "start": 26482054, "end": 26488515}, {"filename": "/data/PhotonEvaporation5.2/z41.a96", "start": 26488515, "end": 26492258}, {"filename": "/data/PhotonEvaporation5.2/z41.a97", "start": 26492258, "end": 26498703}, {"filename": "/data/PhotonEvaporation5.2/z41.a98", "start": 26498703, "end": 26499366}, {"filename": "/data/PhotonEvaporation5.2/z41.a99", "start": 26499366, "end": 26504882}, {"filename": "/data/PhotonEvaporation5.2/z42.a100", "start": 26504882, "end": 26528085}, {"filename": "/data/PhotonEvaporation5.2/z42.a101", "start": 26528085, "end": 26549930}, {"filename": "/data/PhotonEvaporation5.2/z42.a102", "start": 26549930, "end": 26560136}, {"filename": "/data/PhotonEvaporation5.2/z42.a103", "start": 26560136, "end": 26570731}, {"filename": "/data/PhotonEvaporation5.2/z42.a104", "start": 26570731, "end": 26590929}, {"filename": "/data/PhotonEvaporation5.2/z42.a105", "start": 26590929, "end": 26597682}, {"filename": "/data/PhotonEvaporation5.2/z42.a106", "start": 26597682, "end": 26623743}, {"filename": "/data/PhotonEvaporation5.2/z42.a107", "start": 26623743, "end": 26631617}, {"filename": "/data/PhotonEvaporation5.2/z42.a108", "start": 26631617, "end": 26641859}, {"filename": "/data/PhotonEvaporation5.2/z42.a109", "start": 26641859, "end": 26643168}, {"filename": "/data/PhotonEvaporation5.2/z42.a110", "start": 26643168, "end": 26645334}, {"filename": "/data/PhotonEvaporation5.2/z42.a111", "start": 26645334, "end": 26645373}, {"filename": "/data/PhotonEvaporation5.2/z42.a112", "start": 26645373, "end": 26645412}, {"filename": "/data/PhotonEvaporation5.2/z42.a113", "start": 26645412, "end": 26645451}, {"filename": "/data/PhotonEvaporation5.2/z42.a114", "start": 26645451, "end": 26645490}, {"filename": "/data/PhotonEvaporation5.2/z42.a115", "start": 26645490, "end": 26645529}, {"filename": "/data/PhotonEvaporation5.2/z42.a116", "start": 26645529, "end": 26645568}, {"filename": "/data/PhotonEvaporation5.2/z42.a117", "start": 26645568, "end": 26645607}, {"filename": "/data/PhotonEvaporation5.2/z42.a83", "start": 26645607, "end": 26645646}, {"filename": "/data/PhotonEvaporation5.2/z42.a84", "start": 26645646, "end": 26646620}, {"filename": "/data/PhotonEvaporation5.2/z42.a85", "start": 26646620, "end": 26649673}, {"filename": "/data/PhotonEvaporation5.2/z42.a86", "start": 26649673, "end": 26656262}, {"filename": "/data/PhotonEvaporation5.2/z42.a87", "start": 26656262, "end": 26661474}, {"filename": "/data/PhotonEvaporation5.2/z42.a88", "start": 26661474, "end": 26676961}, {"filename": "/data/PhotonEvaporation5.2/z42.a89", "start": 26676961, "end": 26684186}, {"filename": "/data/PhotonEvaporation5.2/z42.a90", "start": 26684186, "end": 26700348}, {"filename": "/data/PhotonEvaporation5.2/z42.a91", "start": 26700348, "end": 26714713}, {"filename": "/data/PhotonEvaporation5.2/z42.a92", "start": 26714713, "end": 26745438}, {"filename": "/data/PhotonEvaporation5.2/z42.a93", "start": 26745438, "end": 26777166}, {"filename": "/data/PhotonEvaporation5.2/z42.a94", "start": 26777166, "end": 26804865}, {"filename": "/data/PhotonEvaporation5.2/z42.a95", "start": 26804865, "end": 26825446}, {"filename": "/data/PhotonEvaporation5.2/z42.a96", "start": 26825446, "end": 26858996}, {"filename": "/data/PhotonEvaporation5.2/z42.a97", "start": 26858996, "end": 26878859}, {"filename": "/data/PhotonEvaporation5.2/z42.a98", "start": 26878859, "end": 26923470}, {"filename": "/data/PhotonEvaporation5.2/z42.a99", "start": 26923470, "end": 26951928}, {"filename": "/data/PhotonEvaporation5.2/z43.a100", "start": 26951928, "end": 26973421}, {"filename": "/data/PhotonEvaporation5.2/z43.a101", "start": 26973421, "end": 27002503}, {"filename": "/data/PhotonEvaporation5.2/z43.a102", "start": 27002503, "end": 27004562}, {"filename": "/data/PhotonEvaporation5.2/z43.a103", "start": 27004562, "end": 27014541}, {"filename": "/data/PhotonEvaporation5.2/z43.a104", "start": 27014541, "end": 27018349}, {"filename": "/data/PhotonEvaporation5.2/z43.a105", "start": 27018349, "end": 27029357}, {"filename": "/data/PhotonEvaporation5.2/z43.a106", "start": 27029357, "end": 27035028}, {"filename": "/data/PhotonEvaporation5.2/z43.a107", "start": 27035028, "end": 27045466}, {"filename": "/data/PhotonEvaporation5.2/z43.a108", "start": 27045466, "end": 27051306}, {"filename": "/data/PhotonEvaporation5.2/z43.a109", "start": 27051306, "end": 27057749}, {"filename": "/data/PhotonEvaporation5.2/z43.a110", "start": 27057749, "end": 27061822}, {"filename": "/data/PhotonEvaporation5.2/z43.a111", "start": 27061822, "end": 27065463}, {"filename": "/data/PhotonEvaporation5.2/z43.a112", "start": 27065463, "end": 27065876}, {"filename": "/data/PhotonEvaporation5.2/z43.a113", "start": 27065876, "end": 27065915}, {"filename": "/data/PhotonEvaporation5.2/z43.a114", "start": 27065915, "end": 27066032}, {"filename": "/data/PhotonEvaporation5.2/z43.a115", "start": 27066032, "end": 27066071}, {"filename": "/data/PhotonEvaporation5.2/z43.a116", "start": 27066071, "end": 27066110}, {"filename": "/data/PhotonEvaporation5.2/z43.a117", "start": 27066110, "end": 27066149}, {"filename": "/data/PhotonEvaporation5.2/z43.a118", "start": 27066149, "end": 27066188}, {"filename": "/data/PhotonEvaporation5.2/z43.a119", "start": 27066188, "end": 27066227}, {"filename": "/data/PhotonEvaporation5.2/z43.a120", "start": 27066227, "end": 27066266}, {"filename": "/data/PhotonEvaporation5.2/z43.a85", "start": 27066266, "end": 27066305}, {"filename": "/data/PhotonEvaporation5.2/z43.a86", "start": 27066305, "end": 27067040}, {"filename": "/data/PhotonEvaporation5.2/z43.a87", "start": 27067040, "end": 27067453}, {"filename": "/data/PhotonEvaporation5.2/z43.a88", "start": 27067453, "end": 27068614}, {"filename": "/data/PhotonEvaporation5.2/z43.a89", "start": 27068614, "end": 27079606}, {"filename": "/data/PhotonEvaporation5.2/z43.a90", "start": 27079606, "end": 27094271}, {"filename": "/data/PhotonEvaporation5.2/z43.a91", "start": 27094271, "end": 27114511}, {"filename": "/data/PhotonEvaporation5.2/z43.a92", "start": 27114511, "end": 27124008}, {"filename": "/data/PhotonEvaporation5.2/z43.a93", "start": 27124008, "end": 27142001}, {"filename": "/data/PhotonEvaporation5.2/z43.a94", "start": 27142001, "end": 27164826}, {"filename": "/data/PhotonEvaporation5.2/z43.a95", "start": 27164826, "end": 27194665}, {"filename": "/data/PhotonEvaporation5.2/z43.a96", "start": 27194665, "end": 27227244}, {"filename": "/data/PhotonEvaporation5.2/z43.a97", "start": 27227244, "end": 27267635}, {"filename": "/data/PhotonEvaporation5.2/z43.a98", "start": 27267635, "end": 27280385}, {"filename": "/data/PhotonEvaporation5.2/z43.a99", "start": 27280385, "end": 27308400}, {"filename": "/data/PhotonEvaporation5.2/z44.a100", "start": 27308400, "end": 27366863}, {"filename": "/data/PhotonEvaporation5.2/z44.a101", "start": 27366863, "end": 27387232}, {"filename": "/data/PhotonEvaporation5.2/z44.a102", "start": 27387232, "end": 27410007}, {"filename": "/data/PhotonEvaporation5.2/z44.a103", "start": 27410007, "end": 27435895}, {"filename": "/data/PhotonEvaporation5.2/z44.a104", "start": 27435895, "end": 27451437}, {"filename": "/data/PhotonEvaporation5.2/z44.a105", "start": 27451437, "end": 27469628}, {"filename": "/data/PhotonEvaporation5.2/z44.a106", "start": 27469628, "end": 27479418}, {"filename": "/data/PhotonEvaporation5.2/z44.a107", "start": 27479418, "end": 27492942}, {"filename": "/data/PhotonEvaporation5.2/z44.a108", "start": 27492942, "end": 27505652}, {"filename": "/data/PhotonEvaporation5.2/z44.a109", "start": 27505652, "end": 27512270}, {"filename": "/data/PhotonEvaporation5.2/z44.a110", "start": 27512270, "end": 27536279}, {"filename": "/data/PhotonEvaporation5.2/z44.a111", "start": 27536279, "end": 27550438}, {"filename": "/data/PhotonEvaporation5.2/z44.a112", "start": 27550438, "end": 27569694}, {"filename": "/data/PhotonEvaporation5.2/z44.a113", "start": 27569694, "end": 27573396}, {"filename": "/data/PhotonEvaporation5.2/z44.a114", "start": 27573396, "end": 27578159}, {"filename": "/data/PhotonEvaporation5.2/z44.a115", "start": 27578159, "end": 27578471}, {"filename": "/data/PhotonEvaporation5.2/z44.a116", "start": 27578471, "end": 27581764}, {"filename": "/data/PhotonEvaporation5.2/z44.a117", "start": 27581764, "end": 27581803}, {"filename": "/data/PhotonEvaporation5.2/z44.a118", "start": 27581803, "end": 27583260}, {"filename": "/data/PhotonEvaporation5.2/z44.a119", "start": 27583260, "end": 27583299}, {"filename": "/data/PhotonEvaporation5.2/z44.a120", "start": 27583299, "end": 27583338}, {"filename": "/data/PhotonEvaporation5.2/z44.a121", "start": 27583338, "end": 27583377}, {"filename": "/data/PhotonEvaporation5.2/z44.a122", "start": 27583377, "end": 27583416}, {"filename": "/data/PhotonEvaporation5.2/z44.a123", "start": 27583416, "end": 27583455}, {"filename": "/data/PhotonEvaporation5.2/z44.a124", "start": 27583455, "end": 27583494}, {"filename": "/data/PhotonEvaporation5.2/z44.a88", "start": 27583494, "end": 27584281}, {"filename": "/data/PhotonEvaporation5.2/z44.a89", "start": 27584281, "end": 27585799}, {"filename": "/data/PhotonEvaporation5.2/z44.a90", "start": 27585799, "end": 27587521}, {"filename": "/data/PhotonEvaporation5.2/z44.a91", "start": 27587521, "end": 27598645}, {"filename": "/data/PhotonEvaporation5.2/z44.a92", "start": 27598645, "end": 27605818}, {"filename": "/data/PhotonEvaporation5.2/z44.a93", "start": 27605818, "end": 27615404}, {"filename": "/data/PhotonEvaporation5.2/z44.a94", "start": 27615404, "end": 27636429}, {"filename": "/data/PhotonEvaporation5.2/z44.a95", "start": 27636429, "end": 27651929}, {"filename": "/data/PhotonEvaporation5.2/z44.a96", "start": 27651929, "end": 27679026}, {"filename": "/data/PhotonEvaporation5.2/z44.a97", "start": 27679026, "end": 27711399}, {"filename": "/data/PhotonEvaporation5.2/z44.a98", "start": 27711399, "end": 27726220}, {"filename": "/data/PhotonEvaporation5.2/z44.a99", "start": 27726220, "end": 27757479}, {"filename": "/data/PhotonEvaporation5.2/z45.a100", "start": 27757479, "end": 27774544}, {"filename": "/data/PhotonEvaporation5.2/z45.a101", "start": 27774544, "end": 27802880}, {"filename": "/data/PhotonEvaporation5.2/z45.a102", "start": 27802880, "end": 27829919}, {"filename": "/data/PhotonEvaporation5.2/z45.a103", "start": 27829919, "end": 27860576}, {"filename": "/data/PhotonEvaporation5.2/z45.a104", "start": 27860576, "end": 27910283}, {"filename": "/data/PhotonEvaporation5.2/z45.a105", "start": 27910283, "end": 27942766}, {"filename": "/data/PhotonEvaporation5.2/z45.a106", "start": 27942766, "end": 27950884}, {"filename": "/data/PhotonEvaporation5.2/z45.a107", "start": 27950884, "end": 27974648}, {"filename": "/data/PhotonEvaporation5.2/z45.a108", "start": 27974648, "end": 27977758}, {"filename": "/data/PhotonEvaporation5.2/z45.a109", "start": 27977758, "end": 28007314}, {"filename": "/data/PhotonEvaporation5.2/z45.a110", "start": 28007314, "end": 28010490}, {"filename": "/data/PhotonEvaporation5.2/z45.a111", "start": 28010490, "end": 28027988}, {"filename": "/data/PhotonEvaporation5.2/z45.a112", "start": 28027988, "end": 28033935}, {"filename": "/data/PhotonEvaporation5.2/z45.a113", "start": 28033935, "end": 28051638}, {"filename": "/data/PhotonEvaporation5.2/z45.a114", "start": 28051638, "end": 28055840}, {"filename": "/data/PhotonEvaporation5.2/z45.a115", "start": 28055840, "end": 28063128}, {"filename": "/data/PhotonEvaporation5.2/z45.a116", "start": 28063128, "end": 28063206}, {"filename": "/data/PhotonEvaporation5.2/z45.a117", "start": 28063206, "end": 28063245}, {"filename": "/data/PhotonEvaporation5.2/z45.a118", "start": 28063245, "end": 28063323}, {"filename": "/data/PhotonEvaporation5.2/z45.a119", "start": 28063323, "end": 28063362}, {"filename": "/data/PhotonEvaporation5.2/z45.a120", "start": 28063362, "end": 28063575}, {"filename": "/data/PhotonEvaporation5.2/z45.a121", "start": 28063575, "end": 28063614}, {"filename": "/data/PhotonEvaporation5.2/z45.a122", "start": 28063614, "end": 28063827}, {"filename": "/data/PhotonEvaporation5.2/z45.a123", "start": 28063827, "end": 28063866}, {"filename": "/data/PhotonEvaporation5.2/z45.a124", "start": 28063866, "end": 28063905}, {"filename": "/data/PhotonEvaporation5.2/z45.a125", "start": 28063905, "end": 28063944}, {"filename": "/data/PhotonEvaporation5.2/z45.a126", "start": 28063944, "end": 28063983}, {"filename": "/data/PhotonEvaporation5.2/z45.a90", "start": 28063983, "end": 28064022}, {"filename": "/data/PhotonEvaporation5.2/z45.a91", "start": 28064022, "end": 28066775}, {"filename": "/data/PhotonEvaporation5.2/z45.a92", "start": 28066775, "end": 28069068}, {"filename": "/data/PhotonEvaporation5.2/z45.a93", "start": 28069068, "end": 28075888}, {"filename": "/data/PhotonEvaporation5.2/z45.a94", "start": 28075888, "end": 28084944}, {"filename": "/data/PhotonEvaporation5.2/z45.a95", "start": 28084944, "end": 28095014}, {"filename": "/data/PhotonEvaporation5.2/z45.a96", "start": 28095014, "end": 28104521}, {"filename": "/data/PhotonEvaporation5.2/z45.a97", "start": 28104521, "end": 28122442}, {"filename": "/data/PhotonEvaporation5.2/z45.a98", "start": 28122442, "end": 28130494}, {"filename": "/data/PhotonEvaporation5.2/z45.a99", "start": 28130494, "end": 28148783}, {"filename": "/data/PhotonEvaporation5.2/z46.a100", "start": 28148783, "end": 28169908}, {"filename": "/data/PhotonEvaporation5.2/z46.a101", "start": 28169908, "end": 28185718}, {"filename": "/data/PhotonEvaporation5.2/z46.a102", "start": 28185718, "end": 28209339}, {"filename": "/data/PhotonEvaporation5.2/z46.a103", "start": 28209339, "end": 28242331}, {"filename": "/data/PhotonEvaporation5.2/z46.a104", "start": 28242331, "end": 28272141}, {"filename": "/data/PhotonEvaporation5.2/z46.a105", "start": 28272141, "end": 28302092}, {"filename": "/data/PhotonEvaporation5.2/z46.a106", "start": 28302092, "end": 28336156}, {"filename": "/data/PhotonEvaporation5.2/z46.a107", "start": 28336156, "end": 28351148}, {"filename": "/data/PhotonEvaporation5.2/z46.a108", "start": 28351148, "end": 28371363}, {"filename": "/data/PhotonEvaporation5.2/z46.a109", "start": 28371363, "end": 28392848}, {"filename": "/data/PhotonEvaporation5.2/z46.a110", "start": 28392848, "end": 28424727}, {"filename": "/data/PhotonEvaporation5.2/z46.a111", "start": 28424727, "end": 28430764}, {"filename": "/data/PhotonEvaporation5.2/z46.a112", "start": 28430764, "end": 28455919}, {"filename": "/data/PhotonEvaporation5.2/z46.a113", "start": 28455919, "end": 28464585}, {"filename": "/data/PhotonEvaporation5.2/z46.a114", "start": 28464585, "end": 28481306}, {"filename": "/data/PhotonEvaporation5.2/z46.a115", "start": 28481306, "end": 28485878}, {"filename": "/data/PhotonEvaporation5.2/z46.a116", "start": 28485878, "end": 28496693}, {"filename": "/data/PhotonEvaporation5.2/z46.a117", "start": 28496693, "end": 28499133}, {"filename": "/data/PhotonEvaporation5.2/z46.a118", "start": 28499133, "end": 28503161}, {"filename": "/data/PhotonEvaporation5.2/z46.a119", "start": 28503161, "end": 28503200}, {"filename": "/data/PhotonEvaporation5.2/z46.a120", "start": 28503200, "end": 28504161}, {"filename": "/data/PhotonEvaporation5.2/z46.a121", "start": 28504161, "end": 28504287}, {"filename": "/data/PhotonEvaporation5.2/z46.a122", "start": 28504287, "end": 28504700}, {"filename": "/data/PhotonEvaporation5.2/z46.a123", "start": 28504700, "end": 28504739}, {"filename": "/data/PhotonEvaporation5.2/z46.a124", "start": 28504739, "end": 28505278}, {"filename": "/data/PhotonEvaporation5.2/z46.a125", "start": 28505278, "end": 28505317}, {"filename": "/data/PhotonEvaporation5.2/z46.a126", "start": 28505317, "end": 28506252}, {"filename": "/data/PhotonEvaporation5.2/z46.a128", "start": 28506252, "end": 28507039}, {"filename": "/data/PhotonEvaporation5.2/z46.a91", "start": 28507039, "end": 28507078}, {"filename": "/data/PhotonEvaporation5.2/z46.a92", "start": 28507078, "end": 28507678}, {"filename": "/data/PhotonEvaporation5.2/z46.a93", "start": 28507678, "end": 28510484}, {"filename": "/data/PhotonEvaporation5.2/z46.a94", "start": 28510484, "end": 28513859}, {"filename": "/data/PhotonEvaporation5.2/z46.a95", "start": 28513859, "end": 28521855}, {"filename": "/data/PhotonEvaporation5.2/z46.a96", "start": 28521855, "end": 28524804}, {"filename": "/data/PhotonEvaporation5.2/z46.a97", "start": 28524804, "end": 28612425}, {"filename": "/data/PhotonEvaporation5.2/z46.a98", "start": 28612425, "end": 28649405}, {"filename": "/data/PhotonEvaporation5.2/z46.a99", "start": 28649405, "end": 28662954}, {"filename": "/data/PhotonEvaporation5.2/z47.a100", "start": 28662954, "end": 28678277}, {"filename": "/data/PhotonEvaporation5.2/z47.a101", "start": 28678277, "end": 28702028}, {"filename": "/data/PhotonEvaporation5.2/z47.a102", "start": 28702028, "end": 28716027}, {"filename": "/data/PhotonEvaporation5.2/z47.a103", "start": 28716027, "end": 28748965}, {"filename": "/data/PhotonEvaporation5.2/z47.a104", "start": 28748965, "end": 28768582}, {"filename": "/data/PhotonEvaporation5.2/z47.a105", "start": 28768582, "end": 28826079}, {"filename": "/data/PhotonEvaporation5.2/z47.a106", "start": 28826079, "end": 28858929}, {"filename": "/data/PhotonEvaporation5.2/z47.a107", "start": 28858929, "end": 28884163}, {"filename": "/data/PhotonEvaporation5.2/z47.a108", "start": 28884163, "end": 28944818}, {"filename": "/data/PhotonEvaporation5.2/z47.a109", "start": 28944818, "end": 28956996}, {"filename": "/data/PhotonEvaporation5.2/z47.a110", "start": 28956996, "end": 28986877}, {"filename": "/data/PhotonEvaporation5.2/z47.a111", "start": 28986877, "end": 29015624}, {"filename": "/data/PhotonEvaporation5.2/z47.a112", "start": 29015624, "end": 29017533}, {"filename": "/data/PhotonEvaporation5.2/z47.a113", "start": 29017533, "end": 29021841}, {"filename": "/data/PhotonEvaporation5.2/z47.a114", "start": 29021841, "end": 29024414}, {"filename": "/data/PhotonEvaporation5.2/z47.a115", "start": 29024414, "end": 29033916}, {"filename": "/data/PhotonEvaporation5.2/z47.a116", "start": 29033916, "end": 29037722}, {"filename": "/data/PhotonEvaporation5.2/z47.a117", "start": 29037722, "end": 29038470}, {"filename": "/data/PhotonEvaporation5.2/z47.a118", "start": 29038470, "end": 29042795}, {"filename": "/data/PhotonEvaporation5.2/z47.a119", "start": 29042795, "end": 29043421}, {"filename": "/data/PhotonEvaporation5.2/z47.a120", "start": 29043421, "end": 29043995}, {"filename": "/data/PhotonEvaporation5.2/z47.a121", "start": 29043995, "end": 29044034}, {"filename": "/data/PhotonEvaporation5.2/z47.a122", "start": 29044034, "end": 29044151}, {"filename": "/data/PhotonEvaporation5.2/z47.a123", "start": 29044151, "end": 29044190}, {"filename": "/data/PhotonEvaporation5.2/z47.a124", "start": 29044190, "end": 29044268}, {"filename": "/data/PhotonEvaporation5.2/z47.a125", "start": 29044268, "end": 29044424}, {"filename": "/data/PhotonEvaporation5.2/z47.a126", "start": 29044424, "end": 29044463}, {"filename": "/data/PhotonEvaporation5.2/z47.a127", "start": 29044463, "end": 29044502}, {"filename": "/data/PhotonEvaporation5.2/z47.a128", "start": 29044502, "end": 29044541}, {"filename": "/data/PhotonEvaporation5.2/z47.a129", "start": 29044541, "end": 29044619}, {"filename": "/data/PhotonEvaporation5.2/z47.a93", "start": 29044619, "end": 29044658}, {"filename": "/data/PhotonEvaporation5.2/z47.a94", "start": 29044658, "end": 29044775}, {"filename": "/data/PhotonEvaporation5.2/z47.a95", "start": 29044775, "end": 29047393}, {"filename": "/data/PhotonEvaporation5.2/z47.a96", "start": 29047393, "end": 29047549}, {"filename": "/data/PhotonEvaporation5.2/z47.a97", "start": 29047549, "end": 29048789}, {"filename": "/data/PhotonEvaporation5.2/z47.a98", "start": 29048789, "end": 29052457}, {"filename": "/data/PhotonEvaporation5.2/z47.a99", "start": 29052457, "end": 29056986}, {"filename": "/data/PhotonEvaporation5.2/z48.a100", "start": 29056986, "end": 29061298}, {"filename": "/data/PhotonEvaporation5.2/z48.a101", "start": 29061298, "end": 29068665}, {"filename": "/data/PhotonEvaporation5.2/z48.a102", "start": 29068665, "end": 29109836}, {"filename": "/data/PhotonEvaporation5.2/z48.a103", "start": 29109836, "end": 29126707}, {"filename": "/data/PhotonEvaporation5.2/z48.a104", "start": 29126707, "end": 29146531}, {"filename": "/data/PhotonEvaporation5.2/z48.a105", "start": 29146531, "end": 29166585}, {"filename": "/data/PhotonEvaporation5.2/z48.a106", "start": 29166585, "end": 29196748}, {"filename": "/data/PhotonEvaporation5.2/z48.a107", "start": 29196748, "end": 29230444}, {"filename": "/data/PhotonEvaporation5.2/z48.a108", "start": 29230444, "end": 29322589}, {"filename": "/data/PhotonEvaporation5.2/z48.a109", "start": 29322589, "end": 29362352}, {"filename": "/data/PhotonEvaporation5.2/z48.a110", "start": 29362352, "end": 29426120}, {"filename": "/data/PhotonEvaporation5.2/z48.a111", "start": 29426120, "end": 29465860}, {"filename": "/data/PhotonEvaporation5.2/z48.a112", "start": 29465860, "end": 29552490}, {"filename": "/data/PhotonEvaporation5.2/z48.a113", "start": 29552490, "end": 29594911}, {"filename": "/data/PhotonEvaporation5.2/z48.a114", "start": 29594911, "end": 29644305}, {"filename": "/data/PhotonEvaporation5.2/z48.a115", "start": 29644305, "end": 29659611}, {"filename": "/data/PhotonEvaporation5.2/z48.a116", "start": 29659611, "end": 29697917}, {"filename": "/data/PhotonEvaporation5.2/z48.a117", "start": 29697917, "end": 29711477}, {"filename": "/data/PhotonEvaporation5.2/z48.a118", "start": 29711477, "end": 29717186}, {"filename": "/data/PhotonEvaporation5.2/z48.a119", "start": 29717186, "end": 29729417}, {"filename": "/data/PhotonEvaporation5.2/z48.a120", "start": 29729417, "end": 29733110}, {"filename": "/data/PhotonEvaporation5.2/z48.a121", "start": 29733110, "end": 29745124}, {"filename": "/data/PhotonEvaporation5.2/z48.a122", "start": 29745124, "end": 29747934}, {"filename": "/data/PhotonEvaporation5.2/z48.a123", "start": 29747934, "end": 29753141}, {"filename": "/data/PhotonEvaporation5.2/z48.a124", "start": 29753141, "end": 29756965}, {"filename": "/data/PhotonEvaporation5.2/z48.a125", "start": 29756965, "end": 29758091}, {"filename": "/data/PhotonEvaporation5.2/z48.a126", "start": 29758091, "end": 29758987}, {"filename": "/data/PhotonEvaporation5.2/z48.a127", "start": 29758987, "end": 29759852}, {"filename": "/data/PhotonEvaporation5.2/z48.a128", "start": 29759852, "end": 29760265}, {"filename": "/data/PhotonEvaporation5.2/z48.a129", "start": 29760265, "end": 29761052}, {"filename": "/data/PhotonEvaporation5.2/z48.a130", "start": 29761052, "end": 29761839}, {"filename": "/data/PhotonEvaporation5.2/z48.a131", "start": 29761839, "end": 29761878}, {"filename": "/data/PhotonEvaporation5.2/z48.a132", "start": 29761878, "end": 29761917}, {"filename": "/data/PhotonEvaporation5.2/z48.a133", "start": 29761917, "end": 29761956}, {"filename": "/data/PhotonEvaporation5.2/z48.a96", "start": 29761956, "end": 29761995}, {"filename": "/data/PhotonEvaporation5.2/z48.a97", "start": 29761995, "end": 29762034}, {"filename": "/data/PhotonEvaporation5.2/z48.a98", "start": 29762034, "end": 29762821}, {"filename": "/data/PhotonEvaporation5.2/z48.a99", "start": 29762821, "end": 29765853}, {"filename": "/data/PhotonEvaporation5.2/z49.a100", "start": 29765853, "end": 29766866}, {"filename": "/data/PhotonEvaporation5.2/z49.a101", "start": 29766866, "end": 29768301}, {"filename": "/data/PhotonEvaporation5.2/z49.a102", "start": 29768301, "end": 29780509}, {"filename": "/data/PhotonEvaporation5.2/z49.a103", "start": 29780509, "end": 29784756}, {"filename": "/data/PhotonEvaporation5.2/z49.a104", "start": 29784756, "end": 29793391}, {"filename": "/data/PhotonEvaporation5.2/z49.a105", "start": 29793391, "end": 29814427}, {"filename": "/data/PhotonEvaporation5.2/z49.a106", "start": 29814427, "end": 29822693}, {"filename": "/data/PhotonEvaporation5.2/z49.a107", "start": 29822693, "end": 29833342}, {"filename": "/data/PhotonEvaporation5.2/z49.a108", "start": 29833342, "end": 29865821}, {"filename": "/data/PhotonEvaporation5.2/z49.a109", "start": 29865821, "end": 29890057}, {"filename": "/data/PhotonEvaporation5.2/z49.a110", "start": 29890057, "end": 29932841}, {"filename": "/data/PhotonEvaporation5.2/z49.a111", "start": 29932841, "end": 29990849}, {"filename": "/data/PhotonEvaporation5.2/z49.a112", "start": 29990849, "end": 30021972}, {"filename": "/data/PhotonEvaporation5.2/z49.a113", "start": 30021972, "end": 30048017}, {"filename": "/data/PhotonEvaporation5.2/z49.a114", "start": 30048017, "end": 30080922}, {"filename": "/data/PhotonEvaporation5.2/z49.a115", "start": 30080922, "end": 30098874}, {"filename": "/data/PhotonEvaporation5.2/z49.a116", "start": 30098874, "end": 30119112}, {"filename": "/data/PhotonEvaporation5.2/z49.a117", "start": 30119112, "end": 30146521}, {"filename": "/data/PhotonEvaporation5.2/z49.a118", "start": 30146521, "end": 30147410}, {"filename": "/data/PhotonEvaporation5.2/z49.a119", "start": 30147410, "end": 30167288}, {"filename": "/data/PhotonEvaporation5.2/z49.a120", "start": 30167288, "end": 30167405}, {"filename": "/data/PhotonEvaporation5.2/z49.a121", "start": 30167405, "end": 30186741}, {"filename": "/data/PhotonEvaporation5.2/z49.a122", "start": 30186741, "end": 30187326}, {"filename": "/data/PhotonEvaporation5.2/z49.a123", "start": 30187326, "end": 30197288}, {"filename": "/data/PhotonEvaporation5.2/z49.a124", "start": 30197288, "end": 30198192}, {"filename": "/data/PhotonEvaporation5.2/z49.a125", "start": 30198192, "end": 30206061}, {"filename": "/data/PhotonEvaporation5.2/z49.a126", "start": 30206061, "end": 30206953}, {"filename": "/data/PhotonEvaporation5.2/z49.a127", "start": 30206953, "end": 30209641}, {"filename": "/data/PhotonEvaporation5.2/z49.a128", "start": 30209641, "end": 30210511}, {"filename": "/data/PhotonEvaporation5.2/z49.a129", "start": 30210511, "end": 30214100}, {"filename": "/data/PhotonEvaporation5.2/z49.a130", "start": 30214100, "end": 30216627}, {"filename": "/data/PhotonEvaporation5.2/z49.a131", "start": 30216627, "end": 30216822}, {"filename": "/data/PhotonEvaporation5.2/z49.a132", "start": 30216822, "end": 30217173}, {"filename": "/data/PhotonEvaporation5.2/z49.a133", "start": 30217173, "end": 30217251}, {"filename": "/data/PhotonEvaporation5.2/z49.a134", "start": 30217251, "end": 30217290}, {"filename": "/data/PhotonEvaporation5.2/z49.a135", "start": 30217290, "end": 30217329}, {"filename": "/data/PhotonEvaporation5.2/z49.a98", "start": 30217329, "end": 30217446}, {"filename": "/data/PhotonEvaporation5.2/z49.a99", "start": 30217446, "end": 30217485}, {"filename": "/data/PhotonEvaporation5.2/z5.a10", "start": 30217485, "end": 30224796}, {"filename": "/data/PhotonEvaporation5.2/z5.a11", "start": 30224796, "end": 30229491}, {"filename": "/data/PhotonEvaporation5.2/z5.a12", "start": 30229491, "end": 30232477}, {"filename": "/data/PhotonEvaporation5.2/z5.a13", "start": 30232477, "end": 30233710}, {"filename": "/data/PhotonEvaporation5.2/z5.a14", "start": 30233710, "end": 30233983}, {"filename": "/data/PhotonEvaporation5.2/z5.a15", "start": 30233983, "end": 30234022}, {"filename": "/data/PhotonEvaporation5.2/z5.a16", "start": 30234022, "end": 30234061}, {"filename": "/data/PhotonEvaporation5.2/z5.a17", "start": 30234061, "end": 30234100}, {"filename": "/data/PhotonEvaporation5.2/z5.a7", "start": 30234100, "end": 30234139}, {"filename": "/data/PhotonEvaporation5.2/z5.a8", "start": 30234139, "end": 30234630}, {"filename": "/data/PhotonEvaporation5.2/z5.a9", "start": 30234630, "end": 30235776}, {"filename": "/data/PhotonEvaporation5.2/z50.a100", "start": 30235776, "end": 30235815}, {"filename": "/data/PhotonEvaporation5.2/z50.a101", "start": 30235815, "end": 30236041}, {"filename": "/data/PhotonEvaporation5.2/z50.a102", "start": 30236041, "end": 30236532}, {"filename": "/data/PhotonEvaporation5.2/z50.a103", "start": 30236532, "end": 30237102}, {"filename": "/data/PhotonEvaporation5.2/z50.a104", "start": 30237102, "end": 30240334}, {"filename": "/data/PhotonEvaporation5.2/z50.a105", "start": 30240334, "end": 30247855}, {"filename": "/data/PhotonEvaporation5.2/z50.a106", "start": 30247855, "end": 30257507}, {"filename": "/data/PhotonEvaporation5.2/z50.a107", "start": 30257507, "end": 30264127}, {"filename": "/data/PhotonEvaporation5.2/z50.a108", "start": 30264127, "end": 30292670}, {"filename": "/data/PhotonEvaporation5.2/z50.a109", "start": 30292670, "end": 30316154}, {"filename": "/data/PhotonEvaporation5.2/z50.a110", "start": 30316154, "end": 30334139}, {"filename": "/data/PhotonEvaporation5.2/z50.a111", "start": 30334139, "end": 30351078}, {"filename": "/data/PhotonEvaporation5.2/z50.a112", "start": 30351078, "end": 30385461}, {"filename": "/data/PhotonEvaporation5.2/z50.a113", "start": 30385461, "end": 30417913}, {"filename": "/data/PhotonEvaporation5.2/z50.a114", "start": 30417913, "end": 30472135}, {"filename": "/data/PhotonEvaporation5.2/z50.a115", "start": 30472135, "end": 30512324}, {"filename": "/data/PhotonEvaporation5.2/z50.a116", "start": 30512324, "end": 30574896}, {"filename": "/data/PhotonEvaporation5.2/z50.a117", "start": 30574896, "end": 30588694}, {"filename": "/data/PhotonEvaporation5.2/z50.a118", "start": 30588694, "end": 30610457}, {"filename": "/data/PhotonEvaporation5.2/z50.a119", "start": 30610457, "end": 30623668}, {"filename": "/data/PhotonEvaporation5.2/z50.a120", "start": 30623668, "end": 30646445}, {"filename": "/data/PhotonEvaporation5.2/z50.a121", "start": 30646445, "end": 30657978}, {"filename": "/data/PhotonEvaporation5.2/z50.a122", "start": 30657978, "end": 30680065}, {"filename": "/data/PhotonEvaporation5.2/z50.a123", "start": 30680065, "end": 30689761}, {"filename": "/data/PhotonEvaporation5.2/z50.a124", "start": 30689761, "end": 30719798}, {"filename": "/data/PhotonEvaporation5.2/z50.a125", "start": 30719798, "end": 30728143}, {"filename": "/data/PhotonEvaporation5.2/z50.a126", "start": 30728143, "end": 30738994}, {"filename": "/data/PhotonEvaporation5.2/z50.a127", "start": 30738994, "end": 30753962}, {"filename": "/data/PhotonEvaporation5.2/z50.a128", "start": 30753962, "end": 30764012}, {"filename": "/data/PhotonEvaporation5.2/z50.a129", "start": 30764012, "end": 30776078}, {"filename": "/data/PhotonEvaporation5.2/z50.a130", "start": 30776078, "end": 30781677}, {"filename": "/data/PhotonEvaporation5.2/z50.a131", "start": 30781677, "end": 30788294}, {"filename": "/data/PhotonEvaporation5.2/z50.a132", "start": 30788294, "end": 30795138}, {"filename": "/data/PhotonEvaporation5.2/z50.a133", "start": 30795138, "end": 30795855}, {"filename": "/data/PhotonEvaporation5.2/z50.a134", "start": 30795855, "end": 30796442}, {"filename": "/data/PhotonEvaporation5.2/z50.a135", "start": 30796442, "end": 30796481}, {"filename": "/data/PhotonEvaporation5.2/z50.a136", "start": 30796481, "end": 30797081}, {"filename": "/data/PhotonEvaporation5.2/z50.a137", "start": 30797081, "end": 30797120}, {"filename": "/data/PhotonEvaporation5.2/z50.a138", "start": 30797120, "end": 30797720}, {"filename": "/data/PhotonEvaporation5.2/z51.a104", "start": 30797720, "end": 30797759}, {"filename": "/data/PhotonEvaporation5.2/z51.a105", "start": 30797759, "end": 30799007}, {"filename": "/data/PhotonEvaporation5.2/z51.a106", "start": 30799007, "end": 30804967}, {"filename": "/data/PhotonEvaporation5.2/z51.a107", "start": 30804967, "end": 30818232}, {"filename": "/data/PhotonEvaporation5.2/z51.a108", "start": 30818232, "end": 30838332}, {"filename": "/data/PhotonEvaporation5.2/z51.a109", "start": 30838332, "end": 30852647}, {"filename": "/data/PhotonEvaporation5.2/z51.a110", "start": 30852647, "end": 30867281}, {"filename": "/data/PhotonEvaporation5.2/z51.a111", "start": 30867281, "end": 30892229}, {"filename": "/data/PhotonEvaporation5.2/z51.a112", "start": 30892229, "end": 30927336}, {"filename": "/data/PhotonEvaporation5.2/z51.a113", "start": 30927336, "end": 30942838}, {"filename": "/data/PhotonEvaporation5.2/z51.a114", "start": 30942838, "end": 30972965}, {"filename": "/data/PhotonEvaporation5.2/z51.a115", "start": 30972965, "end": 30992624}, {"filename": "/data/PhotonEvaporation5.2/z51.a116", "start": 30992624, "end": 31014864}, {"filename": "/data/PhotonEvaporation5.2/z51.a117", "start": 31014864, "end": 31039007}, {"filename": "/data/PhotonEvaporation5.2/z51.a118", "start": 31039007, "end": 31062591}, {"filename": "/data/PhotonEvaporation5.2/z51.a119", "start": 31062591, "end": 31086545}, {"filename": "/data/PhotonEvaporation5.2/z51.a120", "start": 31086545, "end": 31095713}, {"filename": "/data/PhotonEvaporation5.2/z51.a121", "start": 31095713, "end": 31121561}, {"filename": "/data/PhotonEvaporation5.2/z51.a122", "start": 31121561, "end": 31138381}, {"filename": "/data/PhotonEvaporation5.2/z51.a123", "start": 31138381, "end": 31146786}, {"filename": "/data/PhotonEvaporation5.2/z51.a124", "start": 31146786, "end": 31165921}, {"filename": "/data/PhotonEvaporation5.2/z51.a125", "start": 31165921, "end": 31179472}, {"filename": "/data/PhotonEvaporation5.2/z51.a126", "start": 31179472, "end": 31180890}, {"filename": "/data/PhotonEvaporation5.2/z51.a127", "start": 31180890, "end": 31201860}, {"filename": "/data/PhotonEvaporation5.2/z51.a128", "start": 31201860, "end": 31203687}, {"filename": "/data/PhotonEvaporation5.2/z51.a129", "start": 31203687, "end": 31221195}, {"filename": "/data/PhotonEvaporation5.2/z51.a130", "start": 31221195, "end": 31231734}, {"filename": "/data/PhotonEvaporation5.2/z51.a131", "start": 31231734, "end": 31243501}, {"filename": "/data/PhotonEvaporation5.2/z51.a132", "start": 31243501, "end": 31249278}, {"filename": "/data/PhotonEvaporation5.2/z51.a133", "start": 31249278, "end": 31260518}, {"filename": "/data/PhotonEvaporation5.2/z51.a134", "start": 31260518, "end": 31268349}, {"filename": "/data/PhotonEvaporation5.2/z51.a135", "start": 31268349, "end": 31275338}, {"filename": "/data/PhotonEvaporation5.2/z51.a136", "start": 31275338, "end": 31275416}, {"filename": "/data/PhotonEvaporation5.2/z51.a137", "start": 31275416, "end": 31275455}, {"filename": "/data/PhotonEvaporation5.2/z51.a138", "start": 31275455, "end": 31275533}, {"filename": "/data/PhotonEvaporation5.2/z51.a139", "start": 31275533, "end": 31275572}, {"filename": "/data/PhotonEvaporation5.2/z51.a140", "start": 31275572, "end": 31275611}, {"filename": "/data/PhotonEvaporation5.2/z52.a105", "start": 31275611, "end": 31275837}, {"filename": "/data/PhotonEvaporation5.2/z52.a106", "start": 31275837, "end": 31276811}, {"filename": "/data/PhotonEvaporation5.2/z52.a107", "start": 31276811, "end": 31277172}, {"filename": "/data/PhotonEvaporation5.2/z52.a108", "start": 31277172, "end": 31281465}, {"filename": "/data/PhotonEvaporation5.2/z52.a109", "start": 31281465, "end": 31292792}, {"filename": "/data/PhotonEvaporation5.2/z52.a110", "start": 31292792, "end": 31329368}, {"filename": "/data/PhotonEvaporation5.2/z52.a111", "start": 31329368, "end": 31339695}, {"filename": "/data/PhotonEvaporation5.2/z52.a112", "start": 31339695, "end": 31367585}, {"filename": "/data/PhotonEvaporation5.2/z52.a113", "start": 31367585, "end": 31372706}, {"filename": "/data/PhotonEvaporation5.2/z52.a114", "start": 31372706, "end": 31392536}, {"filename": "/data/PhotonEvaporation5.2/z52.a115", "start": 31392536, "end": 31409491}, {"filename": "/data/PhotonEvaporation5.2/z52.a116", "start": 31409491, "end": 31427450}, {"filename": "/data/PhotonEvaporation5.2/z52.a117", "start": 31427450, "end": 31446570}, {"filename": "/data/PhotonEvaporation5.2/z52.a118", "start": 31446570, "end": 31463026}, {"filename": "/data/PhotonEvaporation5.2/z52.a119", "start": 31463026, "end": 31499683}, {"filename": "/data/PhotonEvaporation5.2/z52.a120", "start": 31499683, "end": 31516559}, {"filename": "/data/PhotonEvaporation5.2/z52.a121", "start": 31516559, "end": 31549627}, {"filename": "/data/PhotonEvaporation5.2/z52.a122", "start": 31549627, "end": 31588668}, {"filename": "/data/PhotonEvaporation5.2/z52.a123", "start": 31588668, "end": 31626939}, {"filename": "/data/PhotonEvaporation5.2/z52.a124", "start": 31626939, "end": 31714140}, {"filename": "/data/PhotonEvaporation5.2/z52.a125", "start": 31714140, "end": 31788895}, {"filename": "/data/PhotonEvaporation5.2/z52.a126", "start": 31788895, "end": 31803948}, {"filename": "/data/PhotonEvaporation5.2/z52.a127", "start": 31803948, "end": 31884413}, {"filename": "/data/PhotonEvaporation5.2/z52.a128", "start": 31884413, "end": 31902644}, {"filename": "/data/PhotonEvaporation5.2/z52.a129", "start": 31902644, "end": 31963221}, {"filename": "/data/PhotonEvaporation5.2/z52.a130", "start": 31963221, "end": 31979128}, {"filename": "/data/PhotonEvaporation5.2/z52.a131", "start": 31979128, "end": 32043569}, {"filename": "/data/PhotonEvaporation5.2/z52.a132", "start": 32043569, "end": 32064973}, {"filename": "/data/PhotonEvaporation5.2/z52.a133", "start": 32064973, "end": 32074540}, {"filename": "/data/PhotonEvaporation5.2/z52.a134", "start": 32074540, "end": 32081939}, {"filename": "/data/PhotonEvaporation5.2/z52.a135", "start": 32081939, "end": 32096352}, {"filename": "/data/PhotonEvaporation5.2/z52.a136", "start": 32096352, "end": 32099397}, {"filename": "/data/PhotonEvaporation5.2/z52.a137", "start": 32099397, "end": 32102277}, {"filename": "/data/PhotonEvaporation5.2/z52.a138", "start": 32102277, "end": 32103386}, {"filename": "/data/PhotonEvaporation5.2/z52.a139", "start": 32103386, "end": 32103860}, {"filename": "/data/PhotonEvaporation5.2/z52.a140", "start": 32103860, "end": 32103899}, {"filename": "/data/PhotonEvaporation5.2/z52.a142", "start": 32103899, "end": 32103938}, {"filename": "/data/PhotonEvaporation5.2/z52.a143", "start": 32103938, "end": 32103977}, {"filename": "/data/PhotonEvaporation5.2/z53.a108", "start": 32103977, "end": 32104016}, {"filename": "/data/PhotonEvaporation5.2/z53.a109", "start": 32104016, "end": 32105364}, {"filename": "/data/PhotonEvaporation5.2/z53.a110", "start": 32105364, "end": 32108748}, {"filename": "/data/PhotonEvaporation5.2/z53.a111", "start": 32108748, "end": 32115637}, {"filename": "/data/PhotonEvaporation5.2/z53.a112", "start": 32115637, "end": 32121514}, {"filename": "/data/PhotonEvaporation5.2/z53.a113", "start": 32121514, "end": 32158893}, {"filename": "/data/PhotonEvaporation5.2/z53.a114", "start": 32158893, "end": 32164067}, {"filename": "/data/PhotonEvaporation5.2/z53.a115", "start": 32164067, "end": 32177938}, {"filename": "/data/PhotonEvaporation5.2/z53.a116", "start": 32177938, "end": 32194482}, {"filename": "/data/PhotonEvaporation5.2/z53.a117", "start": 32194482, "end": 32236932}, {"filename": "/data/PhotonEvaporation5.2/z53.a118", "start": 32236932, "end": 32240473}, {"filename": "/data/PhotonEvaporation5.2/z53.a119", "start": 32240473, "end": 32286595}, {"filename": "/data/PhotonEvaporation5.2/z53.a120", "start": 32286595, "end": 32320050}, {"filename": "/data/PhotonEvaporation5.2/z53.a121", "start": 32320050, "end": 32354046}, {"filename": "/data/PhotonEvaporation5.2/z53.a122", "start": 32354046, "end": 32377124}, {"filename": "/data/PhotonEvaporation5.2/z53.a123", "start": 32377124, "end": 32402312}, {"filename": "/data/PhotonEvaporation5.2/z53.a124", "start": 32402312, "end": 32427224}, {"filename": "/data/PhotonEvaporation5.2/z53.a125", "start": 32427224, "end": 32443874}, {"filename": "/data/PhotonEvaporation5.2/z53.a126", "start": 32443874, "end": 32455175}, {"filename": "/data/PhotonEvaporation5.2/z53.a127", "start": 32455175, "end": 32469835}, {"filename": "/data/PhotonEvaporation5.2/z53.a128", "start": 32469835, "end": 32503574}, {"filename": "/data/PhotonEvaporation5.2/z53.a129", "start": 32503574, "end": 32518346}, {"filename": "/data/PhotonEvaporation5.2/z53.a130", "start": 32518346, "end": 32536800}, {"filename": "/data/PhotonEvaporation5.2/z53.a131", "start": 32536800, "end": 32561509}, {"filename": "/data/PhotonEvaporation5.2/z53.a132", "start": 32561509, "end": 32562631}, {"filename": "/data/PhotonEvaporation5.2/z53.a133", "start": 32562631, "end": 32614884}, {"filename": "/data/PhotonEvaporation5.2/z53.a134", "start": 32614884, "end": 32618566}, {"filename": "/data/PhotonEvaporation5.2/z53.a135", "start": 32618566, "end": 32626956}, {"filename": "/data/PhotonEvaporation5.2/z53.a136", "start": 32626956, "end": 32631263}, {"filename": "/data/PhotonEvaporation5.2/z53.a137", "start": 32631263, "end": 32635400}, {"filename": "/data/PhotonEvaporation5.2/z53.a138", "start": 32635400, "end": 32635439}, {"filename": "/data/PhotonEvaporation5.2/z53.a139", "start": 32635439, "end": 32638223}, {"filename": "/data/PhotonEvaporation5.2/z53.a140", "start": 32638223, "end": 32638262}, {"filename": "/data/PhotonEvaporation5.2/z53.a141", "start": 32638262, "end": 32638301}, {"filename": "/data/PhotonEvaporation5.2/z53.a142", "start": 32638301, "end": 32638340}, {"filename": "/data/PhotonEvaporation5.2/z53.a143", "start": 32638340, "end": 32638379}, {"filename": "/data/PhotonEvaporation5.2/z53.a144", "start": 32638379, "end": 32638457}, {"filename": "/data/PhotonEvaporation5.2/z53.a145", "start": 32638457, "end": 32638496}, {"filename": "/data/PhotonEvaporation5.2/z54.a109", "start": 32638496, "end": 32638535}, {"filename": "/data/PhotonEvaporation5.2/z54.a110", "start": 32638535, "end": 32639135}, {"filename": "/data/PhotonEvaporation5.2/z54.a111", "start": 32639135, "end": 32639174}, {"filename": "/data/PhotonEvaporation5.2/z54.a112", "start": 32639174, "end": 32641653}, {"filename": "/data/PhotonEvaporation5.2/z54.a113", "start": 32641653, "end": 32654488}, {"filename": "/data/PhotonEvaporation5.2/z54.a114", "start": 32654488, "end": 32672535}, {"filename": "/data/PhotonEvaporation5.2/z54.a115", "start": 32672535, "end": 32678741}, {"filename": "/data/PhotonEvaporation5.2/z54.a116", "start": 32678741, "end": 32702246}, {"filename": "/data/PhotonEvaporation5.2/z54.a117", "start": 32702246, "end": 32735367}, {"filename": "/data/PhotonEvaporation5.2/z54.a118", "start": 32735367, "end": 32747233}, {"filename": "/data/PhotonEvaporation5.2/z54.a119", "start": 32747233, "end": 32788146}, {"filename": "/data/PhotonEvaporation5.2/z54.a120", "start": 32788146, "end": 32828040}, {"filename": "/data/PhotonEvaporation5.2/z54.a121", "start": 32828040, "end": 32855470}, {"filename": "/data/PhotonEvaporation5.2/z54.a122", "start": 32855470, "end": 32878904}, {"filename": "/data/PhotonEvaporation5.2/z54.a123", "start": 32878904, "end": 32916596}, {"filename": "/data/PhotonEvaporation5.2/z54.a124", "start": 32916596, "end": 32963325}, {"filename": "/data/PhotonEvaporation5.2/z54.a125", "start": 32963325, "end": 33047100}, {"filename": "/data/PhotonEvaporation5.2/z54.a126", "start": 33047100, "end": 33085304}, {"filename": "/data/PhotonEvaporation5.2/z54.a127", "start": 33085304, "end": 33113169}, {"filename": "/data/PhotonEvaporation5.2/z54.a128", "start": 33113169, "end": 33146294}, {"filename": "/data/PhotonEvaporation5.2/z54.a129", "start": 33146294, "end": 33165166}, {"filename": "/data/PhotonEvaporation5.2/z54.a130", "start": 33165166, "end": 33186367}, {"filename": "/data/PhotonEvaporation5.2/z54.a131", "start": 33186367, "end": 33196997}, {"filename": "/data/PhotonEvaporation5.2/z54.a132", "start": 33196997, "end": 33224992}, {"filename": "/data/PhotonEvaporation5.2/z54.a133", "start": 33224992, "end": 33234903}, {"filename": "/data/PhotonEvaporation5.2/z54.a134", "start": 33234903, "end": 33244329}, {"filename": "/data/PhotonEvaporation5.2/z54.a135", "start": 33244329, "end": 33258367}, {"filename": "/data/PhotonEvaporation5.2/z54.a136", "start": 33258367, "end": 33275267}, {"filename": "/data/PhotonEvaporation5.2/z54.a137", "start": 33275267, "end": 33296458}, {"filename": "/data/PhotonEvaporation5.2/z54.a138", "start": 33296458, "end": 33306951}, {"filename": "/data/PhotonEvaporation5.2/z54.a139", "start": 33306951, "end": 33318849}, {"filename": "/data/PhotonEvaporation5.2/z54.a140", "start": 33318849, "end": 33324584}, {"filename": "/data/PhotonEvaporation5.2/z54.a141", "start": 33324584, "end": 33328925}, {"filename": "/data/PhotonEvaporation5.2/z54.a142", "start": 33328925, "end": 33333154}, {"filename": "/data/PhotonEvaporation5.2/z54.a143", "start": 33333154, "end": 33334085}, {"filename": "/data/PhotonEvaporation5.2/z54.a144", "start": 33334085, "end": 33335059}, {"filename": "/data/PhotonEvaporation5.2/z54.a145", "start": 33335059, "end": 33335098}, {"filename": "/data/PhotonEvaporation5.2/z54.a146", "start": 33335098, "end": 33335137}, {"filename": "/data/PhotonEvaporation5.2/z54.a147", "start": 33335137, "end": 33335176}, {"filename": "/data/PhotonEvaporation5.2/z54.a148", "start": 33335176, "end": 33335215}, {"filename": "/data/PhotonEvaporation5.2/z55.a112", "start": 33335215, "end": 33335641}, {"filename": "/data/PhotonEvaporation5.2/z55.a113", "start": 33335641, "end": 33338516}, {"filename": "/data/PhotonEvaporation5.2/z55.a114", "start": 33338516, "end": 33340399}, {"filename": "/data/PhotonEvaporation5.2/z55.a115", "start": 33340399, "end": 33340438}, {"filename": "/data/PhotonEvaporation5.2/z55.a116", "start": 33340438, "end": 33345048}, {"filename": "/data/PhotonEvaporation5.2/z55.a117", "start": 33345048, "end": 33356439}, {"filename": "/data/PhotonEvaporation5.2/z55.a118", "start": 33356439, "end": 33356517}, {"filename": "/data/PhotonEvaporation5.2/z55.a119", "start": 33356517, "end": 33359162}, {"filename": "/data/PhotonEvaporation5.2/z55.a120", "start": 33359162, "end": 33374896}, {"filename": "/data/PhotonEvaporation5.2/z55.a121", "start": 33374896, "end": 33384774}, {"filename": "/data/PhotonEvaporation5.2/z55.a122", "start": 33384774, "end": 33402359}, {"filename": "/data/PhotonEvaporation5.2/z55.a123", "start": 33402359, "end": 33420718}, {"filename": "/data/PhotonEvaporation5.2/z55.a124", "start": 33420718, "end": 33461611}, {"filename": "/data/PhotonEvaporation5.2/z55.a125", "start": 33461611, "end": 33479888}, {"filename": "/data/PhotonEvaporation5.2/z55.a126", "start": 33479888, "end": 33496056}, {"filename": "/data/PhotonEvaporation5.2/z55.a127", "start": 33496056, "end": 33516595}, {"filename": "/data/PhotonEvaporation5.2/z55.a128", "start": 33516595, "end": 33529185}, {"filename": "/data/PhotonEvaporation5.2/z55.a129", "start": 33529185, "end": 33565517}, {"filename": "/data/PhotonEvaporation5.2/z55.a130", "start": 33565517, "end": 33575598}, {"filename": "/data/PhotonEvaporation5.2/z55.a131", "start": 33575598, "end": 33607868}, {"filename": "/data/PhotonEvaporation5.2/z55.a132", "start": 33607868, "end": 33623102}, {"filename": "/data/PhotonEvaporation5.2/z55.a133", "start": 33623102, "end": 33632420}, {"filename": "/data/PhotonEvaporation5.2/z55.a134", "start": 33632420, "end": 33676474}, {"filename": "/data/PhotonEvaporation5.2/z55.a135", "start": 33676474, "end": 33678267}, {"filename": "/data/PhotonEvaporation5.2/z55.a136", "start": 33678267, "end": 33678345}, {"filename": "/data/PhotonEvaporation5.2/z55.a137", "start": 33678345, "end": 33688058}, {"filename": "/data/PhotonEvaporation5.2/z55.a138", "start": 33688058, "end": 33700393}, {"filename": "/data/PhotonEvaporation5.2/z55.a139", "start": 33700393, "end": 33716562}, {"filename": "/data/PhotonEvaporation5.2/z55.a140", "start": 33716562, "end": 33731557}, {"filename": "/data/PhotonEvaporation5.2/z55.a141", "start": 33731557, "end": 33745758}, {"filename": "/data/PhotonEvaporation5.2/z55.a142", "start": 33745758, "end": 33757252}, {"filename": "/data/PhotonEvaporation5.2/z55.a143", "start": 33757252, "end": 33764282}, {"filename": "/data/PhotonEvaporation5.2/z55.a144", "start": 33764282, "end": 33765495}, {"filename": "/data/PhotonEvaporation5.2/z55.a145", "start": 33765495, "end": 33766339}, {"filename": "/data/PhotonEvaporation5.2/z55.a146", "start": 33766339, "end": 33766378}, {"filename": "/data/PhotonEvaporation5.2/z55.a147", "start": 33766378, "end": 33766417}, {"filename": "/data/PhotonEvaporation5.2/z55.a148", "start": 33766417, "end": 33766456}, {"filename": "/data/PhotonEvaporation5.2/z55.a149", "start": 33766456, "end": 33766495}, {"filename": "/data/PhotonEvaporation5.2/z55.a150", "start": 33766495, "end": 33766534}, {"filename": "/data/PhotonEvaporation5.2/z55.a151", "start": 33766534, "end": 33766573}, {"filename": "/data/PhotonEvaporation5.2/z56.a114", "start": 33766573, "end": 33766612}, {"filename": "/data/PhotonEvaporation5.2/z56.a115", "start": 33766612, "end": 33766651}, {"filename": "/data/PhotonEvaporation5.2/z56.a116", "start": 33766651, "end": 33766690}, {"filename": "/data/PhotonEvaporation5.2/z56.a117", "start": 33766690, "end": 33766729}, {"filename": "/data/PhotonEvaporation5.2/z56.a118", "start": 33766729, "end": 33770243}, {"filename": "/data/PhotonEvaporation5.2/z56.a119", "start": 33770243, "end": 33781449}, {"filename": "/data/PhotonEvaporation5.2/z56.a120", "start": 33781449, "end": 33789182}, {"filename": "/data/PhotonEvaporation5.2/z56.a121", "start": 33789182, "end": 33801341}, {"filename": "/data/PhotonEvaporation5.2/z56.a122", "start": 33801341, "end": 33818374}, {"filename": "/data/PhotonEvaporation5.2/z56.a123", "start": 33818374, "end": 33832509}, {"filename": "/data/PhotonEvaporation5.2/z56.a124", "start": 33832509, "end": 33855813}, {"filename": "/data/PhotonEvaporation5.2/z56.a125", "start": 33855813, "end": 33870859}, {"filename": "/data/PhotonEvaporation5.2/z56.a126", "start": 33870859, "end": 33901645}, {"filename": "/data/PhotonEvaporation5.2/z56.a127", "start": 33901645, "end": 33940204}, {"filename": "/data/PhotonEvaporation5.2/z56.a128", "start": 33940204, "end": 33973878}, {"filename": "/data/PhotonEvaporation5.2/z56.a129", "start": 33973878, "end": 34011019}, {"filename": "/data/PhotonEvaporation5.2/z56.a130", "start": 34011019, "end": 34031376}, {"filename": "/data/PhotonEvaporation5.2/z56.a131", "start": 34031376, "end": 34065066}, {"filename": "/data/PhotonEvaporation5.2/z56.a132", "start": 34065066, "end": 34133544}, {"filename": "/data/PhotonEvaporation5.2/z56.a133", "start": 34133544, "end": 34177670}, {"filename": "/data/PhotonEvaporation5.2/z56.a134", "start": 34177670, "end": 34205489}, {"filename": "/data/PhotonEvaporation5.2/z56.a135", "start": 34205489, "end": 34228884}, {"filename": "/data/PhotonEvaporation5.2/z56.a136", "start": 34228884, "end": 34246463}, {"filename": "/data/PhotonEvaporation5.2/z56.a137", "start": 34246463, "end": 34263187}, {"filename": "/data/PhotonEvaporation5.2/z56.a138", "start": 34263187, "end": 34293045}, {"filename": "/data/PhotonEvaporation5.2/z56.a139", "start": 34293045, "end": 34318240}, {"filename": "/data/PhotonEvaporation5.2/z56.a140", "start": 34318240, "end": 34348101}, {"filename": "/data/PhotonEvaporation5.2/z56.a141", "start": 34348101, "end": 34366750}, {"filename": "/data/PhotonEvaporation5.2/z56.a142", "start": 34366750, "end": 34374684}, {"filename": "/data/PhotonEvaporation5.2/z56.a143", "start": 34374684, "end": 34388577}, {"filename": "/data/PhotonEvaporation5.2/z56.a144", "start": 34388577, "end": 34398333}, {"filename": "/data/PhotonEvaporation5.2/z56.a145", "start": 34398333, "end": 34416966}, {"filename": "/data/PhotonEvaporation5.2/z56.a146", "start": 34416966, "end": 34428191}, {"filename": "/data/PhotonEvaporation5.2/z56.a147", "start": 34428191, "end": 34438646}, {"filename": "/data/PhotonEvaporation5.2/z56.a148", "start": 34438646, "end": 34442126}, {"filename": "/data/PhotonEvaporation5.2/z56.a149", "start": 34442126, "end": 34442165}, {"filename": "/data/PhotonEvaporation5.2/z56.a150", "start": 34442165, "end": 34442204}, {"filename": "/data/PhotonEvaporation5.2/z56.a151", "start": 34442204, "end": 34442243}, {"filename": "/data/PhotonEvaporation5.2/z56.a152", "start": 34442243, "end": 34442282}, {"filename": "/data/PhotonEvaporation5.2/z57.a117", "start": 34442282, "end": 34442360}, {"filename": "/data/PhotonEvaporation5.2/z57.a120", "start": 34442360, "end": 34442438}, {"filename": "/data/PhotonEvaporation5.2/z57.a121", "start": 34442438, "end": 34447292}, {"filename": "/data/PhotonEvaporation5.2/z57.a122", "start": 34447292, "end": 34447331}, {"filename": "/data/PhotonEvaporation5.2/z57.a123", "start": 34447331, "end": 34470153}, {"filename": "/data/PhotonEvaporation5.2/z57.a124", "start": 34470153, "end": 34489885}, {"filename": "/data/PhotonEvaporation5.2/z57.a125", "start": 34489885, "end": 34507530}, {"filename": "/data/PhotonEvaporation5.2/z57.a126", "start": 34507530, "end": 34517979}, {"filename": "/data/PhotonEvaporation5.2/z57.a127", "start": 34517979, "end": 34549952}, {"filename": "/data/PhotonEvaporation5.2/z57.a128", "start": 34549952, "end": 34570273}, {"filename": "/data/PhotonEvaporation5.2/z57.a129", "start": 34570273, "end": 34614679}, {"filename": "/data/PhotonEvaporation5.2/z57.a130", "start": 34614679, "end": 34643987}, {"filename": "/data/PhotonEvaporation5.2/z57.a131", "start": 34643987, "end": 34681226}, {"filename": "/data/PhotonEvaporation5.2/z57.a132", "start": 34681226, "end": 34704039}, {"filename": "/data/PhotonEvaporation5.2/z57.a133", "start": 34704039, "end": 34762964}, {"filename": "/data/PhotonEvaporation5.2/z57.a134", "start": 34762964, "end": 34791761}, {"filename": "/data/PhotonEvaporation5.2/z57.a135", "start": 34791761, "end": 34818267}, {"filename": "/data/PhotonEvaporation5.2/z57.a136", "start": 34818267, "end": 34829935}, {"filename": "/data/PhotonEvaporation5.2/z57.a137", "start": 34829935, "end": 34847893}, {"filename": "/data/PhotonEvaporation5.2/z57.a138", "start": 34847893, "end": 34859206}, {"filename": "/data/PhotonEvaporation5.2/z57.a139", "start": 34859206, "end": 34873059}, {"filename": "/data/PhotonEvaporation5.2/z57.a140", "start": 34873059, "end": 34926231}, {"filename": "/data/PhotonEvaporation5.2/z57.a141", "start": 34926231, "end": 34935274}, {"filename": "/data/PhotonEvaporation5.2/z57.a142", "start": 34935274, "end": 34944930}, {"filename": "/data/PhotonEvaporation5.2/z57.a143", "start": 34944930, "end": 34963783}, {"filename": "/data/PhotonEvaporation5.2/z57.a144", "start": 34963783, "end": 34975165}, {"filename": "/data/PhotonEvaporation5.2/z57.a145", "start": 34975165, "end": 34987424}, {"filename": "/data/PhotonEvaporation5.2/z57.a146", "start": 34987424, "end": 35006371}, {"filename": "/data/PhotonEvaporation5.2/z57.a147", "start": 35006371, "end": 35024659}, {"filename": "/data/PhotonEvaporation5.2/z57.a148", "start": 35024659, "end": 35032481}, {"filename": "/data/PhotonEvaporation5.2/z57.a149", "start": 35032481, "end": 35033734}, {"filename": "/data/PhotonEvaporation5.2/z57.a150", "start": 35033734, "end": 35033773}, {"filename": "/data/PhotonEvaporation5.2/z57.a151", "start": 35033773, "end": 35033812}, {"filename": "/data/PhotonEvaporation5.2/z57.a152", "start": 35033812, "end": 35033851}, {"filename": "/data/PhotonEvaporation5.2/z57.a153", "start": 35033851, "end": 35033890}, {"filename": "/data/PhotonEvaporation5.2/z58.a121", "start": 35033890, "end": 35033929}, {"filename": "/data/PhotonEvaporation5.2/z58.a122", "start": 35033929, "end": 35034577}, {"filename": "/data/PhotonEvaporation5.2/z58.a123", "start": 35034577, "end": 35037595}, {"filename": "/data/PhotonEvaporation5.2/z58.a124", "start": 35037595, "end": 35043793}, {"filename": "/data/PhotonEvaporation5.2/z58.a125", "start": 35043793, "end": 35065293}, {"filename": "/data/PhotonEvaporation5.2/z58.a126", "start": 35065293, "end": 35074710}, {"filename": "/data/PhotonEvaporation5.2/z58.a127", "start": 35074710, "end": 35085577}, {"filename": "/data/PhotonEvaporation5.2/z58.a128", "start": 35085577, "end": 35113505}, {"filename": "/data/PhotonEvaporation5.2/z58.a129", "start": 35113505, "end": 35139529}, {"filename": "/data/PhotonEvaporation5.2/z58.a130", "start": 35139529, "end": 35168705}, {"filename": "/data/PhotonEvaporation5.2/z58.a131", "start": 35168705, "end": 35210244}, {"filename": "/data/PhotonEvaporation5.2/z58.a132", "start": 35210244, "end": 35259101}, {"filename": "/data/PhotonEvaporation5.2/z58.a133", "start": 35259101, "end": 35293039}, {"filename": "/data/PhotonEvaporation5.2/z58.a134", "start": 35293039, "end": 35324746}, {"filename": "/data/PhotonEvaporation5.2/z58.a135", "start": 35324746, "end": 35345275}, {"filename": "/data/PhotonEvaporation5.2/z58.a136", "start": 35345275, "end": 35362732}, {"filename": "/data/PhotonEvaporation5.2/z58.a137", "start": 35362732, "end": 35382726}, {"filename": "/data/PhotonEvaporation5.2/z58.a138", "start": 35382726, "end": 35396363}, {"filename": "/data/PhotonEvaporation5.2/z58.a139", "start": 35396363, "end": 35402506}, {"filename": "/data/PhotonEvaporation5.2/z58.a140", "start": 35402506, "end": 35419048}, {"filename": "/data/PhotonEvaporation5.2/z58.a141", "start": 35419048, "end": 35430895}, {"filename": "/data/PhotonEvaporation5.2/z58.a142", "start": 35430895, "end": 35467293}, {"filename": "/data/PhotonEvaporation5.2/z58.a143", "start": 35467293, "end": 35480799}, {"filename": "/data/PhotonEvaporation5.2/z58.a144", "start": 35480799, "end": 35500161}, {"filename": "/data/PhotonEvaporation5.2/z58.a145", "start": 35500161, "end": 35509340}, {"filename": "/data/PhotonEvaporation5.2/z58.a146", "start": 35509340, "end": 35537689}, {"filename": "/data/PhotonEvaporation5.2/z58.a147", "start": 35537689, "end": 35545480}, {"filename": "/data/PhotonEvaporation5.2/z58.a148", "start": 35545480, "end": 35559494}, {"filename": "/data/PhotonEvaporation5.2/z58.a149", "start": 35559494, "end": 35569454}, {"filename": "/data/PhotonEvaporation5.2/z58.a150", "start": 35569454, "end": 35577194}, {"filename": "/data/PhotonEvaporation5.2/z58.a151", "start": 35577194, "end": 35580639}, {"filename": "/data/PhotonEvaporation5.2/z58.a152", "start": 35580639, "end": 35583810}, {"filename": "/data/PhotonEvaporation5.2/z58.a153", "start": 35583810, "end": 35583849}, {"filename": "/data/PhotonEvaporation5.2/z58.a154", "start": 35583849, "end": 35583888}, {"filename": "/data/PhotonEvaporation5.2/z58.a155", "start": 35583888, "end": 35583927}, {"filename": "/data/PhotonEvaporation5.2/z59.a121", "start": 35583927, "end": 35583966}, {"filename": "/data/PhotonEvaporation5.2/z59.a124", "start": 35583966, "end": 35584005}, {"filename": "/data/PhotonEvaporation5.2/z59.a125", "start": 35584005, "end": 35596996}, {"filename": "/data/PhotonEvaporation5.2/z59.a126", "start": 35596996, "end": 35604865}, {"filename": "/data/PhotonEvaporation5.2/z59.a127", "start": 35604865, "end": 35610824}, {"filename": "/data/PhotonEvaporation5.2/z59.a128", "start": 35610824, "end": 35622264}, {"filename": "/data/PhotonEvaporation5.2/z59.a129", "start": 35622264, "end": 35635657}, {"filename": "/data/PhotonEvaporation5.2/z59.a130", "start": 35635657, "end": 35672623}, {"filename": "/data/PhotonEvaporation5.2/z59.a131", "start": 35672623, "end": 35692484}, {"filename": "/data/PhotonEvaporation5.2/z59.a132", "start": 35692484, "end": 35718403}, {"filename": "/data/PhotonEvaporation5.2/z59.a133", "start": 35718403, "end": 35773240}, {"filename": "/data/PhotonEvaporation5.2/z59.a134", "start": 35773240, "end": 35796807}, {"filename": "/data/PhotonEvaporation5.2/z59.a135", "start": 35796807, "end": 35816554}, {"filename": "/data/PhotonEvaporation5.2/z59.a136", "start": 35816554, "end": 35836992}, {"filename": "/data/PhotonEvaporation5.2/z59.a137", "start": 35836992, "end": 35856610}, {"filename": "/data/PhotonEvaporation5.2/z59.a138", "start": 35856610, "end": 35863646}, {"filename": "/data/PhotonEvaporation5.2/z59.a139", "start": 35863646, "end": 35879300}, {"filename": "/data/PhotonEvaporation5.2/z59.a140", "start": 35879300, "end": 35890697}, {"filename": "/data/PhotonEvaporation5.2/z59.a141", "start": 35890697, "end": 35949095}, {"filename": "/data/PhotonEvaporation5.2/z59.a142", "start": 35949095, "end": 35966208}, {"filename": "/data/PhotonEvaporation5.2/z59.a143", "start": 35966208, "end": 35974074}, {"filename": "/data/PhotonEvaporation5.2/z59.a144", "start": 35974074, "end": 35975305}, {"filename": "/data/PhotonEvaporation5.2/z59.a145", "start": 35975305, "end": 35983615}, {"filename": "/data/PhotonEvaporation5.2/z59.a146", "start": 35983615, "end": 35986874}, {"filename": "/data/PhotonEvaporation5.2/z59.a147", "start": 35986874, "end": 36005402}, {"filename": "/data/PhotonEvaporation5.2/z59.a148", "start": 36005402, "end": 36011833}, {"filename": "/data/PhotonEvaporation5.2/z59.a149", "start": 36011833, "end": 36014398}, {"filename": "/data/PhotonEvaporation5.2/z59.a150", "start": 36014398, "end": 36015068}, {"filename": "/data/PhotonEvaporation5.2/z59.a151", "start": 36015068, "end": 36017517}, {"filename": "/data/PhotonEvaporation5.2/z59.a152", "start": 36017517, "end": 36021116}, {"filename": "/data/PhotonEvaporation5.2/z59.a153", "start": 36021116, "end": 36021155}, {"filename": "/data/PhotonEvaporation5.2/z59.a154", "start": 36021155, "end": 36021194}, {"filename": "/data/PhotonEvaporation5.2/z59.a155", "start": 36021194, "end": 36021233}, {"filename": "/data/PhotonEvaporation5.2/z6.a10", "start": 36021233, "end": 36021693}, {"filename": "/data/PhotonEvaporation5.2/z6.a11", "start": 36021693, "end": 36029188}, {"filename": "/data/PhotonEvaporation5.2/z6.a12", "start": 36029188, "end": 36032444}, {"filename": "/data/PhotonEvaporation5.2/z6.a13", "start": 36032444, "end": 36036563}, {"filename": "/data/PhotonEvaporation5.2/z6.a14", "start": 36036563, "end": 36039533}, {"filename": "/data/PhotonEvaporation5.2/z6.a15", "start": 36039533, "end": 36040890}, {"filename": "/data/PhotonEvaporation5.2/z6.a16", "start": 36040890, "end": 36041655}, {"filename": "/data/PhotonEvaporation5.2/z6.a17", "start": 36041655, "end": 36041733}, {"filename": "/data/PhotonEvaporation5.2/z6.a18", "start": 36041733, "end": 36041811}, {"filename": "/data/PhotonEvaporation5.2/z6.a20", "start": 36041811, "end": 36041850}, {"filename": "/data/PhotonEvaporation5.2/z6.a22", "start": 36041850, "end": 36041889}, {"filename": "/data/PhotonEvaporation5.2/z6.a8", "start": 36041889, "end": 36041928}, {"filename": "/data/PhotonEvaporation5.2/z6.a9", "start": 36041928, "end": 36042084}, {"filename": "/data/PhotonEvaporation5.2/z60.a125", "start": 36042084, "end": 36042123}, {"filename": "/data/PhotonEvaporation5.2/z60.a126", "start": 36042123, "end": 36042162}, {"filename": "/data/PhotonEvaporation5.2/z60.a127", "start": 36042162, "end": 36042201}, {"filename": "/data/PhotonEvaporation5.2/z60.a128", "start": 36042201, "end": 36043362}, {"filename": "/data/PhotonEvaporation5.2/z60.a129", "start": 36043362, "end": 36068656}, {"filename": "/data/PhotonEvaporation5.2/z60.a130", "start": 36068656, "end": 36078295}, {"filename": "/data/PhotonEvaporation5.2/z60.a131", "start": 36078295, "end": 36095160}, {"filename": "/data/PhotonEvaporation5.2/z60.a132", "start": 36095160, "end": 36119786}, {"filename": "/data/PhotonEvaporation5.2/z60.a133", "start": 36119786, "end": 36172623}, {"filename": "/data/PhotonEvaporation5.2/z60.a134", "start": 36172623, "end": 36204663}, {"filename": "/data/PhotonEvaporation5.2/z60.a135", "start": 36204663, "end": 36227193}, {"filename": "/data/PhotonEvaporation5.2/z60.a136", "start": 36227193, "end": 36263846}, {"filename": "/data/PhotonEvaporation5.2/z60.a137", "start": 36263846, "end": 36299705}, {"filename": "/data/PhotonEvaporation5.2/z60.a138", "start": 36299705, "end": 36315840}, {"filename": "/data/PhotonEvaporation5.2/z60.a139", "start": 36315840, "end": 36322224}, {"filename": "/data/PhotonEvaporation5.2/z60.a140", "start": 36322224, "end": 36361218}, {"filename": "/data/PhotonEvaporation5.2/z60.a141", "start": 36361218, "end": 36379099}, {"filename": "/data/PhotonEvaporation5.2/z60.a142", "start": 36379099, "end": 36418442}, {"filename": "/data/PhotonEvaporation5.2/z60.a143", "start": 36418442, "end": 36468725}, {"filename": "/data/PhotonEvaporation5.2/z60.a144", "start": 36468725, "end": 36512711}, {"filename": "/data/PhotonEvaporation5.2/z60.a145", "start": 36512711, "end": 36539398}, {"filename": "/data/PhotonEvaporation5.2/z60.a146", "start": 36539398, "end": 36585462}, {"filename": "/data/PhotonEvaporation5.2/z60.a147", "start": 36585462, "end": 36609237}, {"filename": "/data/PhotonEvaporation5.2/z60.a148", "start": 36609237, "end": 36626951}, {"filename": "/data/PhotonEvaporation5.2/z60.a149", "start": 36626951, "end": 36643059}, {"filename": "/data/PhotonEvaporation5.2/z60.a150", "start": 36643059, "end": 36661170}, {"filename": "/data/PhotonEvaporation5.2/z60.a151", "start": 36661170, "end": 36681058}, {"filename": "/data/PhotonEvaporation5.2/z60.a152", "start": 36681058, "end": 36698161}, {"filename": "/data/PhotonEvaporation5.2/z60.a153", "start": 36698161, "end": 36703007}, {"filename": "/data/PhotonEvaporation5.2/z60.a154", "start": 36703007, "end": 36707569}, {"filename": "/data/PhotonEvaporation5.2/z60.a155", "start": 36707569, "end": 36707608}, {"filename": "/data/PhotonEvaporation5.2/z60.a156", "start": 36707608, "end": 36712010}, {"filename": "/data/PhotonEvaporation5.2/z60.a157", "start": 36712010, "end": 36712049}, {"filename": "/data/PhotonEvaporation5.2/z60.a158", "start": 36712049, "end": 36712088}, {"filename": "/data/PhotonEvaporation5.2/z60.a159", "start": 36712088, "end": 36712127}, {"filename": "/data/PhotonEvaporation5.2/z60.a160", "start": 36712127, "end": 36712166}, {"filename": "/data/PhotonEvaporation5.2/z60.a161", "start": 36712166, "end": 36712205}, {"filename": "/data/PhotonEvaporation5.2/z61.a128", "start": 36712205, "end": 36712244}, {"filename": "/data/PhotonEvaporation5.2/z61.a129", "start": 36712244, "end": 36712283}, {"filename": "/data/PhotonEvaporation5.2/z61.a130", "start": 36712283, "end": 36712322}, {"filename": "/data/PhotonEvaporation5.2/z61.a131", "start": 36712322, "end": 36714044}, {"filename": "/data/PhotonEvaporation5.2/z61.a132", "start": 36714044, "end": 36720995}, {"filename": "/data/PhotonEvaporation5.2/z61.a133", "start": 36720995, "end": 36741636}, {"filename": "/data/PhotonEvaporation5.2/z61.a134", "start": 36741636, "end": 36752333}, {"filename": "/data/PhotonEvaporation5.2/z61.a135", "start": 36752333, "end": 36761903}, {"filename": "/data/PhotonEvaporation5.2/z61.a136", "start": 36761903, "end": 36781873}, {"filename": "/data/PhotonEvaporation5.2/z61.a137", "start": 36781873, "end": 36790090}, {"filename": "/data/PhotonEvaporation5.2/z61.a138", "start": 36790090, "end": 36801145}, {"filename": "/data/PhotonEvaporation5.2/z61.a139", "start": 36801145, "end": 36812114}, {"filename": "/data/PhotonEvaporation5.2/z61.a140", "start": 36812114, "end": 36828314}, {"filename": "/data/PhotonEvaporation5.2/z61.a141", "start": 36828314, "end": 36847394}, {"filename": "/data/PhotonEvaporation5.2/z61.a142", "start": 36847394, "end": 36858232}, {"filename": "/data/PhotonEvaporation5.2/z61.a143", "start": 36858232, "end": 36872481}, {"filename": "/data/PhotonEvaporation5.2/z61.a144", "start": 36872481, "end": 36885916}, {"filename": "/data/PhotonEvaporation5.2/z61.a145", "start": 36885916, "end": 36902725}, {"filename": "/data/PhotonEvaporation5.2/z61.a146", "start": 36902725, "end": 36915382}, {"filename": "/data/PhotonEvaporation5.2/z61.a147", "start": 36915382, "end": 36942959}, {"filename": "/data/PhotonEvaporation5.2/z61.a148", "start": 36942959, "end": 36949963}, {"filename": "/data/PhotonEvaporation5.2/z61.a149", "start": 36949963, "end": 36987680}, {"filename": "/data/PhotonEvaporation5.2/z61.a150", "start": 36987680, "end": 36991355}, {"filename": "/data/PhotonEvaporation5.2/z61.a151", "start": 36991355, "end": 37061503}, {"filename": "/data/PhotonEvaporation5.2/z61.a152", "start": 37061503, "end": 37067268}, {"filename": "/data/PhotonEvaporation5.2/z61.a153", "start": 37067268, "end": 37079605}, {"filename": "/data/PhotonEvaporation5.2/z61.a154", "start": 37079605, "end": 37087960}, {"filename": "/data/PhotonEvaporation5.2/z61.a155", "start": 37087960, "end": 37094487}, {"filename": "/data/PhotonEvaporation5.2/z61.a156", "start": 37094487, "end": 37096118}, {"filename": "/data/PhotonEvaporation5.2/z61.a157", "start": 37096118, "end": 37096157}, {"filename": "/data/PhotonEvaporation5.2/z61.a158", "start": 37096157, "end": 37096196}, {"filename": "/data/PhotonEvaporation5.2/z61.a159", "start": 37096196, "end": 37096235}, {"filename": "/data/PhotonEvaporation5.2/z61.a160", "start": 37096235, "end": 37096274}, {"filename": "/data/PhotonEvaporation5.2/z61.a161", "start": 37096274, "end": 37096313}, {"filename": "/data/PhotonEvaporation5.2/z61.a162", "start": 37096313, "end": 37096352}, {"filename": "/data/PhotonEvaporation5.2/z61.a163", "start": 37096352, "end": 37096391}, {"filename": "/data/PhotonEvaporation5.2/z62.a129", "start": 37096391, "end": 37096430}, {"filename": "/data/PhotonEvaporation5.2/z62.a130", "start": 37096430, "end": 37096656}, {"filename": "/data/PhotonEvaporation5.2/z62.a131", "start": 37096656, "end": 37096695}, {"filename": "/data/PhotonEvaporation5.2/z62.a132", "start": 37096695, "end": 37098230}, {"filename": "/data/PhotonEvaporation5.2/z62.a133", "start": 37098230, "end": 37113728}, {"filename": "/data/PhotonEvaporation5.2/z62.a134", "start": 37113728, "end": 37114889}, {"filename": "/data/PhotonEvaporation5.2/z62.a135", "start": 37114889, "end": 37122072}, {"filename": "/data/PhotonEvaporation5.2/z62.a136", "start": 37122072, "end": 37139336}, {"filename": "/data/PhotonEvaporation5.2/z62.a137", "start": 37139336, "end": 37149779}, {"filename": "/data/PhotonEvaporation5.2/z62.a138", "start": 37149779, "end": 37167212}, {"filename": "/data/PhotonEvaporation5.2/z62.a139", "start": 37167212, "end": 37185609}, {"filename": "/data/PhotonEvaporation5.2/z62.a140", "start": 37185609, "end": 37194546}, {"filename": "/data/PhotonEvaporation5.2/z62.a141", "start": 37194546, "end": 37209526}, {"filename": "/data/PhotonEvaporation5.2/z62.a142", "start": 37209526, "end": 37223967}, {"filename": "/data/PhotonEvaporation5.2/z62.a143", "start": 37223967, "end": 37244425}, {"filename": "/data/PhotonEvaporation5.2/z62.a144", "start": 37244425, "end": 37273190}, {"filename": "/data/PhotonEvaporation5.2/z62.a145", "start": 37273190, "end": 37302501}, {"filename": "/data/PhotonEvaporation5.2/z62.a146", "start": 37302501, "end": 37358521}, {"filename": "/data/PhotonEvaporation5.2/z62.a147", "start": 37358521, "end": 37380271}, {"filename": "/data/PhotonEvaporation5.2/z62.a148", "start": 37380271, "end": 37460901}, {"filename": "/data/PhotonEvaporation5.2/z62.a149", "start": 37460901, "end": 37489751}, {"filename": "/data/PhotonEvaporation5.2/z62.a150", "start": 37489751, "end": 37543795}, {"filename": "/data/PhotonEvaporation5.2/z62.a151", "start": 37543795, "end": 37644627}, {"filename": "/data/PhotonEvaporation5.2/z62.a152", "start": 37644627, "end": 37728026}, {"filename": "/data/PhotonEvaporation5.2/z62.a153", "start": 37728026, "end": 37765549}, {"filename": "/data/PhotonEvaporation5.2/z62.a154", "start": 37765549, "end": 37803111}, {"filename": "/data/PhotonEvaporation5.2/z62.a155", "start": 37803111, "end": 37822600}, {"filename": "/data/PhotonEvaporation5.2/z62.a156", "start": 37822600, "end": 37832366}, {"filename": "/data/PhotonEvaporation5.2/z62.a157", "start": 37832366, "end": 37837168}, {"filename": "/data/PhotonEvaporation5.2/z62.a158", "start": 37837168, "end": 37839412}, {"filename": "/data/PhotonEvaporation5.2/z62.a159", "start": 37839412, "end": 37843814}, {"filename": "/data/PhotonEvaporation5.2/z62.a160", "start": 37843814, "end": 37845162}, {"filename": "/data/PhotonEvaporation5.2/z62.a161", "start": 37845162, "end": 37845201}, {"filename": "/data/PhotonEvaporation5.2/z62.a162", "start": 37845201, "end": 37845240}, {"filename": "/data/PhotonEvaporation5.2/z62.a163", "start": 37845240, "end": 37845279}, {"filename": "/data/PhotonEvaporation5.2/z62.a164", "start": 37845279, "end": 37846401}, {"filename": "/data/PhotonEvaporation5.2/z62.a165", "start": 37846401, "end": 37846440}, {"filename": "/data/PhotonEvaporation5.2/z63.a130", "start": 37846440, "end": 37846479}, {"filename": "/data/PhotonEvaporation5.2/z63.a131", "start": 37846479, "end": 37846518}, {"filename": "/data/PhotonEvaporation5.2/z63.a132", "start": 37846518, "end": 37846557}, {"filename": "/data/PhotonEvaporation5.2/z63.a134", "start": 37846557, "end": 37846596}, {"filename": "/data/PhotonEvaporation5.2/z63.a135", "start": 37846596, "end": 37846635}, {"filename": "/data/PhotonEvaporation5.2/z63.a136", "start": 37846635, "end": 37846752}, {"filename": "/data/PhotonEvaporation5.2/z63.a137", "start": 37846752, "end": 37848100}, {"filename": "/data/PhotonEvaporation5.2/z63.a138", "start": 37848100, "end": 37862570}, {"filename": "/data/PhotonEvaporation5.2/z63.a139", "start": 37862570, "end": 37875067}, {"filename": "/data/PhotonEvaporation5.2/z63.a140", "start": 37875067, "end": 37892233}, {"filename": "/data/PhotonEvaporation5.2/z63.a141", "start": 37892233, "end": 37909476}, {"filename": "/data/PhotonEvaporation5.2/z63.a142", "start": 37909476, "end": 37934016}, {"filename": "/data/PhotonEvaporation5.2/z63.a143", "start": 37934016, "end": 37971669}, {"filename": "/data/PhotonEvaporation5.2/z63.a144", "start": 37971669, "end": 37992456}, {"filename": "/data/PhotonEvaporation5.2/z63.a145", "start": 37992456, "end": 38058588}, {"filename": "/data/PhotonEvaporation5.2/z63.a146", "start": 38058588, "end": 38065804}, {"filename": "/data/PhotonEvaporation5.2/z63.a147", "start": 38065804, "end": 38106746}, {"filename": "/data/PhotonEvaporation5.2/z63.a148", "start": 38106746, "end": 38126805}, {"filename": "/data/PhotonEvaporation5.2/z63.a149", "start": 38126805, "end": 38156854}, {"filename": "/data/PhotonEvaporation5.2/z63.a150", "start": 38156854, "end": 38177036}, {"filename": "/data/PhotonEvaporation5.2/z63.a151", "start": 38177036, "end": 38214467}, {"filename": "/data/PhotonEvaporation5.2/z63.a152", "start": 38214467, "end": 38345522}, {"filename": "/data/PhotonEvaporation5.2/z63.a153", "start": 38345522, "end": 38383688}, {"filename": "/data/PhotonEvaporation5.2/z63.a154", "start": 38383688, "end": 38471183}, {"filename": "/data/PhotonEvaporation5.2/z63.a155", "start": 38471183, "end": 38503629}, {"filename": "/data/PhotonEvaporation5.2/z63.a156", "start": 38503629, "end": 38514684}, {"filename": "/data/PhotonEvaporation5.2/z63.a157", "start": 38514684, "end": 38519607}, {"filename": "/data/PhotonEvaporation5.2/z63.a158", "start": 38519607, "end": 38519646}, {"filename": "/data/PhotonEvaporation5.2/z63.a159", "start": 38519646, "end": 38523262}, {"filename": "/data/PhotonEvaporation5.2/z63.a160", "start": 38523262, "end": 38523301}, {"filename": "/data/PhotonEvaporation5.2/z63.a161", "start": 38523301, "end": 38523340}, {"filename": "/data/PhotonEvaporation5.2/z63.a162", "start": 38523340, "end": 38523379}, {"filename": "/data/PhotonEvaporation5.2/z63.a163", "start": 38523379, "end": 38523418}, {"filename": "/data/PhotonEvaporation5.2/z63.a164", "start": 38523418, "end": 38523457}, {"filename": "/data/PhotonEvaporation5.2/z63.a165", "start": 38523457, "end": 38523496}, {"filename": "/data/PhotonEvaporation5.2/z63.a166", "start": 38523496, "end": 38523535}, {"filename": "/data/PhotonEvaporation5.2/z63.a167", "start": 38523535, "end": 38523574}, {"filename": "/data/PhotonEvaporation5.2/z64.a134", "start": 38523574, "end": 38523652}, {"filename": "/data/PhotonEvaporation5.2/z64.a135", "start": 38523652, "end": 38523691}, {"filename": "/data/PhotonEvaporation5.2/z64.a136", "start": 38523691, "end": 38523730}, {"filename": "/data/PhotonEvaporation5.2/z64.a137", "start": 38523730, "end": 38523769}, {"filename": "/data/PhotonEvaporation5.2/z64.a138", "start": 38523769, "end": 38531646}, {"filename": "/data/PhotonEvaporation5.2/z64.a139", "start": 38531646, "end": 38539600}, {"filename": "/data/PhotonEvaporation5.2/z64.a140", "start": 38539600, "end": 38544332}, {"filename": "/data/PhotonEvaporation5.2/z64.a141", "start": 38544332, "end": 38559822}, {"filename": "/data/PhotonEvaporation5.2/z64.a142", "start": 38559822, "end": 38588698}, {"filename": "/data/PhotonEvaporation5.2/z64.a143", "start": 38588698, "end": 38611354}, {"filename": "/data/PhotonEvaporation5.2/z64.a144", "start": 38611354, "end": 38638070}, {"filename": "/data/PhotonEvaporation5.2/z64.a145", "start": 38638070, "end": 38658674}, {"filename": "/data/PhotonEvaporation5.2/z64.a146", "start": 38658674, "end": 38686125}, {"filename": "/data/PhotonEvaporation5.2/z64.a147", "start": 38686125, "end": 38728074}, {"filename": "/data/PhotonEvaporation5.2/z64.a148", "start": 38728074, "end": 38778117}, {"filename": "/data/PhotonEvaporation5.2/z64.a149", "start": 38778117, "end": 38857370}, {"filename": "/data/PhotonEvaporation5.2/z64.a150", "start": 38857370, "end": 38919209}, {"filename": "/data/PhotonEvaporation5.2/z64.a151", "start": 38919209, "end": 38988427}, {"filename": "/data/PhotonEvaporation5.2/z64.a152", "start": 38988427, "end": 39077138}, {"filename": "/data/PhotonEvaporation5.2/z64.a153", "start": 39077138, "end": 39194339}, {"filename": "/data/PhotonEvaporation5.2/z64.a154", "start": 39194339, "end": 39287173}, {"filename": "/data/PhotonEvaporation5.2/z64.a155", "start": 39287173, "end": 39357098}, {"filename": "/data/PhotonEvaporation5.2/z64.a156", "start": 39357098, "end": 39460472}, {"filename": "/data/PhotonEvaporation5.2/z64.a157", "start": 39460472, "end": 39506418}, {"filename": "/data/PhotonEvaporation5.2/z64.a158", "start": 39506418, "end": 39568820}, {"filename": "/data/PhotonEvaporation5.2/z64.a159", "start": 39568820, "end": 39595548}, {"filename": "/data/PhotonEvaporation5.2/z64.a160", "start": 39595548, "end": 39626336}, {"filename": "/data/PhotonEvaporation5.2/z64.a161", "start": 39626336, "end": 39629544}, {"filename": "/data/PhotonEvaporation5.2/z64.a162", "start": 39629544, "end": 39631586}, {"filename": "/data/PhotonEvaporation5.2/z64.a163", "start": 39631586, "end": 39631625}, {"filename": "/data/PhotonEvaporation5.2/z64.a164", "start": 39631625, "end": 39632973}, {"filename": "/data/PhotonEvaporation5.2/z64.a165", "start": 39632973, "end": 39633012}, {"filename": "/data/PhotonEvaporation5.2/z64.a166", "start": 39633012, "end": 39636362}, {"filename": "/data/PhotonEvaporation5.2/z64.a167", "start": 39636362, "end": 39636401}, {"filename": "/data/PhotonEvaporation5.2/z64.a168", "start": 39636401, "end": 39636440}, {"filename": "/data/PhotonEvaporation5.2/z64.a169", "start": 39636440, "end": 39636479}, {"filename": "/data/PhotonEvaporation5.2/z65.a135", "start": 39636479, "end": 39636518}, {"filename": "/data/PhotonEvaporation5.2/z65.a138", "start": 39636518, "end": 39636596}, {"filename": "/data/PhotonEvaporation5.2/z65.a139", "start": 39636596, "end": 39636635}, {"filename": "/data/PhotonEvaporation5.2/z65.a140", "start": 39636635, "end": 39639619}, {"filename": "/data/PhotonEvaporation5.2/z65.a141", "start": 39639619, "end": 39641419}, {"filename": "/data/PhotonEvaporation5.2/z65.a142", "start": 39641419, "end": 39648623}, {"filename": "/data/PhotonEvaporation5.2/z65.a143", "start": 39648623, "end": 39675629}, {"filename": "/data/PhotonEvaporation5.2/z65.a144", "start": 39675629, "end": 39681141}, {"filename": "/data/PhotonEvaporation5.2/z65.a145", "start": 39681141, "end": 39692984}, {"filename": "/data/PhotonEvaporation5.2/z65.a146", "start": 39692984, "end": 39700173}, {"filename": "/data/PhotonEvaporation5.2/z65.a147", "start": 39700173, "end": 39736479}, {"filename": "/data/PhotonEvaporation5.2/z65.a148", "start": 39736479, "end": 39753680}, {"filename": "/data/PhotonEvaporation5.2/z65.a149", "start": 39753680, "end": 39794569}, {"filename": "/data/PhotonEvaporation5.2/z65.a150", "start": 39794569, "end": 39813361}, {"filename": "/data/PhotonEvaporation5.2/z65.a151", "start": 39813361, "end": 39868108}, {"filename": "/data/PhotonEvaporation5.2/z65.a152", "start": 39868108, "end": 39889009}, {"filename": "/data/PhotonEvaporation5.2/z65.a153", "start": 39889009, "end": 39954544}, {"filename": "/data/PhotonEvaporation5.2/z65.a154", "start": 39954544, "end": 39966271}, {"filename": "/data/PhotonEvaporation5.2/z65.a155", "start": 39966271, "end": 40023336}, {"filename": "/data/PhotonEvaporation5.2/z65.a156", "start": 40023336, "end": 40033326}, {"filename": "/data/PhotonEvaporation5.2/z65.a157", "start": 40033326, "end": 40072076}, {"filename": "/data/PhotonEvaporation5.2/z65.a158", "start": 40072076, "end": 40077191}, {"filename": "/data/PhotonEvaporation5.2/z65.a159", "start": 40077191, "end": 40091544}, {"filename": "/data/PhotonEvaporation5.2/z65.a160", "start": 40091544, "end": 40114803}, {"filename": "/data/PhotonEvaporation5.2/z65.a161", "start": 40114803, "end": 40126071}, {"filename": "/data/PhotonEvaporation5.2/z65.a162", "start": 40126071, "end": 40127162}, {"filename": "/data/PhotonEvaporation5.2/z65.a163", "start": 40127162, "end": 40128893}, {"filename": "/data/PhotonEvaporation5.2/z65.a164", "start": 40128893, "end": 40128932}, {"filename": "/data/PhotonEvaporation5.2/z65.a165", "start": 40128932, "end": 40128971}, {"filename": "/data/PhotonEvaporation5.2/z65.a166", "start": 40128971, "end": 40129454}, {"filename": "/data/PhotonEvaporation5.2/z65.a167", "start": 40129454, "end": 40129493}, {"filename": "/data/PhotonEvaporation5.2/z65.a168", "start": 40129493, "end": 40129532}, {"filename": "/data/PhotonEvaporation5.2/z65.a169", "start": 40129532, "end": 40129571}, {"filename": "/data/PhotonEvaporation5.2/z65.a170", "start": 40129571, "end": 40129610}, {"filename": "/data/PhotonEvaporation5.2/z65.a171", "start": 40129610, "end": 40129649}, {"filename": "/data/PhotonEvaporation5.2/z66.a139", "start": 40129649, "end": 40129688}, {"filename": "/data/PhotonEvaporation5.2/z66.a140", "start": 40129688, "end": 40130662}, {"filename": "/data/PhotonEvaporation5.2/z66.a141", "start": 40130662, "end": 40130701}, {"filename": "/data/PhotonEvaporation5.2/z66.a142", "start": 40130701, "end": 40131662}, {"filename": "/data/PhotonEvaporation5.2/z66.a143", "start": 40131662, "end": 40148788}, {"filename": "/data/PhotonEvaporation5.2/z66.a144", "start": 40148788, "end": 40150445}, {"filename": "/data/PhotonEvaporation5.2/z66.a145", "start": 40150445, "end": 40152872}, {"filename": "/data/PhotonEvaporation5.2/z66.a146", "start": 40152872, "end": 40156326}, {"filename": "/data/PhotonEvaporation5.2/z66.a147", "start": 40156326, "end": 40161581}, {"filename": "/data/PhotonEvaporation5.2/z66.a148", "start": 40161581, "end": 40171868}, {"filename": "/data/PhotonEvaporation5.2/z66.a149", "start": 40171868, "end": 40184531}, {"filename": "/data/PhotonEvaporation5.2/z66.a150", "start": 40184531, "end": 40314187}, {"filename": "/data/PhotonEvaporation5.2/z66.a151", "start": 40314187, "end": 40336731}, {"filename": "/data/PhotonEvaporation5.2/z66.a152", "start": 40336731, "end": 40379826}, {"filename": "/data/PhotonEvaporation5.2/z66.a153", "start": 40379826, "end": 40416682}, {"filename": "/data/PhotonEvaporation5.2/z66.a154", "start": 40416682, "end": 40477196}, {"filename": "/data/PhotonEvaporation5.2/z66.a155", "start": 40477196, "end": 40522597}, {"filename": "/data/PhotonEvaporation5.2/z66.a156", "start": 40522597, "end": 40608620}, {"filename": "/data/PhotonEvaporation5.2/z66.a157", "start": 40608620, "end": 40640592}, {"filename": "/data/PhotonEvaporation5.2/z66.a158", "start": 40640592, "end": 40672787}, {"filename": "/data/PhotonEvaporation5.2/z66.a159", "start": 40672787, "end": 40704999}, {"filename": "/data/PhotonEvaporation5.2/z66.a160", "start": 40704999, "end": 40837005}, {"filename": "/data/PhotonEvaporation5.2/z66.a161", "start": 40837005, "end": 40890280}, {"filename": "/data/PhotonEvaporation5.2/z66.a162", "start": 40890280, "end": 40968585}, {"filename": "/data/PhotonEvaporation5.2/z66.a163", "start": 40968585, "end": 41059629}, {"filename": "/data/PhotonEvaporation5.2/z66.a164", "start": 41059629, "end": 41102065}, {"filename": "/data/PhotonEvaporation5.2/z66.a165", "start": 41102065, "end": 41158604}, {"filename": "/data/PhotonEvaporation5.2/z66.a166", "start": 41158604, "end": 41164130}, {"filename": "/data/PhotonEvaporation5.2/z66.a167", "start": 41164130, "end": 41164730}, {"filename": "/data/PhotonEvaporation5.2/z66.a168", "start": 41164730, "end": 41165930}, {"filename": "/data/PhotonEvaporation5.2/z66.a169", "start": 41165930, "end": 41165969}, {"filename": "/data/PhotonEvaporation5.2/z66.a170", "start": 41165969, "end": 41166382}, {"filename": "/data/PhotonEvaporation5.2/z66.a171", "start": 41166382, "end": 41166421}, {"filename": "/data/PhotonEvaporation5.2/z66.a172", "start": 41166421, "end": 41166460}, {"filename": "/data/PhotonEvaporation5.2/z66.a173", "start": 41166460, "end": 41166499}, {"filename": "/data/PhotonEvaporation5.2/z67.a140", "start": 41166499, "end": 41166538}, {"filename": "/data/PhotonEvaporation5.2/z67.a141", "start": 41166538, "end": 41169530}, {"filename": "/data/PhotonEvaporation5.2/z67.a142", "start": 41169530, "end": 41169569}, {"filename": "/data/PhotonEvaporation5.2/z67.a143", "start": 41169569, "end": 41169795}, {"filename": "/data/PhotonEvaporation5.2/z67.a144", "start": 41169795, "end": 41172896}, {"filename": "/data/PhotonEvaporation5.2/z67.a145", "start": 41172896, "end": 41173683}, {"filename": "/data/PhotonEvaporation5.2/z67.a146", "start": 41173683, "end": 41173722}, {"filename": "/data/PhotonEvaporation5.2/z67.a147", "start": 41173722, "end": 41192130}, {"filename": "/data/PhotonEvaporation5.2/z67.a148", "start": 41192130, "end": 41195279}, {"filename": "/data/PhotonEvaporation5.2/z67.a149", "start": 41195279, "end": 41208665}, {"filename": "/data/PhotonEvaporation5.2/z67.a150", "start": 41208665, "end": 41215174}, {"filename": "/data/PhotonEvaporation5.2/z67.a151", "start": 41215174, "end": 41224908}, {"filename": "/data/PhotonEvaporation5.2/z67.a152", "start": 41224908, "end": 41238737}, {"filename": "/data/PhotonEvaporation5.2/z67.a153", "start": 41238737, "end": 41257033}, {"filename": "/data/PhotonEvaporation5.2/z67.a154", "start": 41257033, "end": 41263310}, {"filename": "/data/PhotonEvaporation5.2/z67.a155", "start": 41263310, "end": 41278358}, {"filename": "/data/PhotonEvaporation5.2/z67.a156", "start": 41278358, "end": 41310035}, {"filename": "/data/PhotonEvaporation5.2/z67.a157", "start": 41310035, "end": 41379315}, {"filename": "/data/PhotonEvaporation5.2/z67.a158", "start": 41379315, "end": 41415293}, {"filename": "/data/PhotonEvaporation5.2/z67.a159", "start": 41415293, "end": 41443291}, {"filename": "/data/PhotonEvaporation5.2/z67.a160", "start": 41443291, "end": 41465895}, {"filename": "/data/PhotonEvaporation5.2/z67.a161", "start": 41465895, "end": 41513910}, {"filename": "/data/PhotonEvaporation5.2/z67.a162", "start": 41513910, "end": 41538064}, {"filename": "/data/PhotonEvaporation5.2/z67.a163", "start": 41538064, "end": 41559436}, {"filename": "/data/PhotonEvaporation5.2/z67.a164", "start": 41559436, "end": 41563021}, {"filename": "/data/PhotonEvaporation5.2/z67.a165", "start": 41563021, "end": 41619696}, {"filename": "/data/PhotonEvaporation5.2/z67.a166", "start": 41619696, "end": 41696608}, {"filename": "/data/PhotonEvaporation5.2/z67.a167", "start": 41696608, "end": 41700104}, {"filename": "/data/PhotonEvaporation5.2/z67.a168", "start": 41700104, "end": 41701522}, {"filename": "/data/PhotonEvaporation5.2/z67.a169", "start": 41701522, "end": 41702879}, {"filename": "/data/PhotonEvaporation5.2/z67.a170", "start": 41702879, "end": 41702957}, {"filename": "/data/PhotonEvaporation5.2/z67.a171", "start": 41702957, "end": 41702996}, {"filename": "/data/PhotonEvaporation5.2/z67.a172", "start": 41702996, "end": 41703035}, {"filename": "/data/PhotonEvaporation5.2/z67.a173", "start": 41703035, "end": 41703074}, {"filename": "/data/PhotonEvaporation5.2/z67.a174", "start": 41703074, "end": 41703113}, {"filename": "/data/PhotonEvaporation5.2/z67.a175", "start": 41703113, "end": 41703152}, {"filename": "/data/PhotonEvaporation5.2/z68.a143", "start": 41703152, "end": 41703191}, {"filename": "/data/PhotonEvaporation5.2/z68.a144", "start": 41703191, "end": 41703417}, {"filename": "/data/PhotonEvaporation5.2/z68.a145", "start": 41703417, "end": 41703573}, {"filename": "/data/PhotonEvaporation5.2/z68.a146", "start": 41703573, "end": 41703612}, {"filename": "/data/PhotonEvaporation5.2/z68.a147", "start": 41703612, "end": 41705308}, {"filename": "/data/PhotonEvaporation5.2/z68.a148", "start": 41705308, "end": 41713410}, {"filename": "/data/PhotonEvaporation5.2/z68.a149", "start": 41713410, "end": 41716407}, {"filename": "/data/PhotonEvaporation5.2/z68.a150", "start": 41716407, "end": 41721862}, {"filename": "/data/PhotonEvaporation5.2/z68.a151", "start": 41721862, "end": 41735301}, {"filename": "/data/PhotonEvaporation5.2/z68.a152", "start": 41735301, "end": 41746083}, {"filename": "/data/PhotonEvaporation5.2/z68.a153", "start": 41746083, "end": 41754744}, {"filename": "/data/PhotonEvaporation5.2/z68.a154", "start": 41754744, "end": 41769260}, {"filename": "/data/PhotonEvaporation5.2/z68.a155", "start": 41769260, "end": 41793561}, {"filename": "/data/PhotonEvaporation5.2/z68.a156", "start": 41793561, "end": 41833854}, {"filename": "/data/PhotonEvaporation5.2/z68.a157", "start": 41833854, "end": 41869309}, {"filename": "/data/PhotonEvaporation5.2/z68.a158", "start": 41869309, "end": 41906733}, {"filename": "/data/PhotonEvaporation5.2/z68.a159", "start": 41906733, "end": 41957983}, {"filename": "/data/PhotonEvaporation5.2/z68.a160", "start": 41957983, "end": 42001957}, {"filename": "/data/PhotonEvaporation5.2/z68.a161", "start": 42001957, "end": 42034269}, {"filename": "/data/PhotonEvaporation5.2/z68.a162", "start": 42034269, "end": 42067916}, {"filename": "/data/PhotonEvaporation5.2/z68.a163", "start": 42067916, "end": 42186622}, {"filename": "/data/PhotonEvaporation5.2/z68.a164", "start": 42186622, "end": 42243041}, {"filename": "/data/PhotonEvaporation5.2/z68.a165", "start": 42243041, "end": 42271045}, {"filename": "/data/PhotonEvaporation5.2/z68.a166", "start": 42271045, "end": 42331634}, {"filename": "/data/PhotonEvaporation5.2/z68.a167", "start": 42331634, "end": 42369241}, {"filename": "/data/PhotonEvaporation5.2/z68.a168", "start": 42369241, "end": 42517999}, {"filename": "/data/PhotonEvaporation5.2/z68.a169", "start": 42517999, "end": 42538556}, {"filename": "/data/PhotonEvaporation5.2/z68.a170", "start": 42538556, "end": 42585324}, {"filename": "/data/PhotonEvaporation5.2/z68.a171", "start": 42585324, "end": 42593282}, {"filename": "/data/PhotonEvaporation5.2/z68.a172", "start": 42593282, "end": 42596392}, {"filename": "/data/PhotonEvaporation5.2/z68.a173", "start": 42596392, "end": 42596431}, {"filename": "/data/PhotonEvaporation5.2/z68.a174", "start": 42596431, "end": 42596470}, {"filename": "/data/PhotonEvaporation5.2/z68.a175", "start": 42596470, "end": 42596509}, {"filename": "/data/PhotonEvaporation5.2/z68.a176", "start": 42596509, "end": 42596548}, {"filename": "/data/PhotonEvaporation5.2/z68.a177", "start": 42596548, "end": 42596587}, {"filename": "/data/PhotonEvaporation5.2/z69.a144", "start": 42596587, "end": 42596626}, {"filename": "/data/PhotonEvaporation5.2/z69.a145", "start": 42596626, "end": 42597600}, {"filename": "/data/PhotonEvaporation5.2/z69.a146", "start": 42597600, "end": 42597678}, {"filename": "/data/PhotonEvaporation5.2/z69.a147", "start": 42597678, "end": 42599413}, {"filename": "/data/PhotonEvaporation5.2/z69.a148", "start": 42599413, "end": 42599491}, {"filename": "/data/PhotonEvaporation5.2/z69.a149", "start": 42599491, "end": 42599530}, {"filename": "/data/PhotonEvaporation5.2/z69.a150", "start": 42599530, "end": 42601096}, {"filename": "/data/PhotonEvaporation5.2/z69.a151", "start": 42601096, "end": 42604036}, {"filename": "/data/PhotonEvaporation5.2/z69.a152", "start": 42604036, "end": 42608368}, {"filename": "/data/PhotonEvaporation5.2/z69.a153", "start": 42608368, "end": 42618888}, {"filename": "/data/PhotonEvaporation5.2/z69.a154", "start": 42618888, "end": 42625922}, {"filename": "/data/PhotonEvaporation5.2/z69.a155", "start": 42625922, "end": 42626883}, {"filename": "/data/PhotonEvaporation5.2/z69.a156", "start": 42626883, "end": 42629440}, {"filename": "/data/PhotonEvaporation5.2/z69.a157", "start": 42629440, "end": 42647695}, {"filename": "/data/PhotonEvaporation5.2/z69.a158", "start": 42647695, "end": 42657366}, {"filename": "/data/PhotonEvaporation5.2/z69.a159", "start": 42657366, "end": 42678400}, {"filename": "/data/PhotonEvaporation5.2/z69.a160", "start": 42678400, "end": 42696523}, {"filename": "/data/PhotonEvaporation5.2/z69.a161", "start": 42696523, "end": 42722869}, {"filename": "/data/PhotonEvaporation5.2/z69.a162", "start": 42722869, "end": 42774279}, {"filename": "/data/PhotonEvaporation5.2/z69.a163", "start": 42774279, "end": 42816273}, {"filename": "/data/PhotonEvaporation5.2/z69.a164", "start": 42816273, "end": 42865653}, {"filename": "/data/PhotonEvaporation5.2/z69.a165", "start": 42865653, "end": 42919389}, {"filename": "/data/PhotonEvaporation5.2/z69.a166", "start": 42919389, "end": 42990830}, {"filename": "/data/PhotonEvaporation5.2/z69.a167", "start": 42990830, "end": 43043012}, {"filename": "/data/PhotonEvaporation5.2/z69.a168", "start": 43043012, "end": 43072873}, {"filename": "/data/PhotonEvaporation5.2/z69.a169", "start": 43072873, "end": 43104120}, {"filename": "/data/PhotonEvaporation5.2/z69.a170", "start": 43104120, "end": 43180877}, {"filename": "/data/PhotonEvaporation5.2/z69.a171", "start": 43180877, "end": 43197379}, {"filename": "/data/PhotonEvaporation5.2/z69.a172", "start": 43197379, "end": 43204337}, {"filename": "/data/PhotonEvaporation5.2/z69.a173", "start": 43204337, "end": 43207143}, {"filename": "/data/PhotonEvaporation5.2/z69.a174", "start": 43207143, "end": 43208383}, {"filename": "/data/PhotonEvaporation5.2/z69.a175", "start": 43208383, "end": 43210763}, {"filename": "/data/PhotonEvaporation5.2/z69.a176", "start": 43210763, "end": 43210802}, {"filename": "/data/PhotonEvaporation5.2/z69.a177", "start": 43210802, "end": 43210880}, {"filename": "/data/PhotonEvaporation5.2/z69.a178", "start": 43210880, "end": 43210919}, {"filename": "/data/PhotonEvaporation5.2/z69.a179", "start": 43210919, "end": 43210958}, {"filename": "/data/PhotonEvaporation5.2/z7.a10", "start": 43210958, "end": 43211036}, {"filename": "/data/PhotonEvaporation5.2/z7.a11", "start": 43211036, "end": 43211348}, {"filename": "/data/PhotonEvaporation5.2/z7.a12", "start": 43211348, "end": 43212089}, {"filename": "/data/PhotonEvaporation5.2/z7.a13", "start": 43212089, "end": 43215123}, {"filename": "/data/PhotonEvaporation5.2/z7.a14", "start": 43215123, "end": 43227915}, {"filename": "/data/PhotonEvaporation5.2/z7.a15", "start": 43227915, "end": 43249350}, {"filename": "/data/PhotonEvaporation5.2/z7.a16", "start": 43249350, "end": 43252516}, {"filename": "/data/PhotonEvaporation5.2/z7.a17", "start": 43252516, "end": 43259049}, {"filename": "/data/PhotonEvaporation5.2/z7.a18", "start": 43259049, "end": 43260693}, {"filename": "/data/PhotonEvaporation5.2/z7.a19", "start": 43260693, "end": 43260927}, {"filename": "/data/PhotonEvaporation5.2/z7.a20", "start": 43260927, "end": 43260966}, {"filename": "/data/PhotonEvaporation5.2/z7.a21", "start": 43260966, "end": 43262532}, {"filename": "/data/PhotonEvaporation5.2/z7.a22", "start": 43262532, "end": 43262571}, {"filename": "/data/PhotonEvaporation5.2/z7.a23", "start": 43262571, "end": 43262610}, {"filename": "/data/PhotonEvaporation5.2/z7.a24", "start": 43262610, "end": 43262649}, {"filename": "/data/PhotonEvaporation5.2/z70.a149", "start": 43262649, "end": 43262688}, {"filename": "/data/PhotonEvaporation5.2/z70.a150", "start": 43262688, "end": 43262727}, {"filename": "/data/PhotonEvaporation5.2/z70.a151", "start": 43262727, "end": 43263888}, {"filename": "/data/PhotonEvaporation5.2/z70.a152", "start": 43263888, "end": 43265049}, {"filename": "/data/PhotonEvaporation5.2/z70.a153", "start": 43265049, "end": 43269233}, {"filename": "/data/PhotonEvaporation5.2/z70.a154", "start": 43269233, "end": 43273352}, {"filename": "/data/PhotonEvaporation5.2/z70.a155", "start": 43273352, "end": 43274226}, {"filename": "/data/PhotonEvaporation5.2/z70.a156", "start": 43274226, "end": 43278919}, {"filename": "/data/PhotonEvaporation5.2/z70.a157", "start": 43278919, "end": 43282334}, {"filename": "/data/PhotonEvaporation5.2/z70.a158", "start": 43282334, "end": 43294286}, {"filename": "/data/PhotonEvaporation5.2/z70.a159", "start": 43294286, "end": 43303328}, {"filename": "/data/PhotonEvaporation5.2/z70.a160", "start": 43303328, "end": 43322675}, {"filename": "/data/PhotonEvaporation5.2/z70.a161", "start": 43322675, "end": 43338076}, {"filename": "/data/PhotonEvaporation5.2/z70.a162", "start": 43338076, "end": 43361087}, {"filename": "/data/PhotonEvaporation5.2/z70.a163", "start": 43361087, "end": 43372132}, {"filename": "/data/PhotonEvaporation5.2/z70.a164", "start": 43372132, "end": 43407065}, {"filename": "/data/PhotonEvaporation5.2/z70.a165", "start": 43407065, "end": 43424024}, {"filename": "/data/PhotonEvaporation5.2/z70.a166", "start": 43424024, "end": 43460071}, {"filename": "/data/PhotonEvaporation5.2/z70.a167", "start": 43460071, "end": 43521534}, {"filename": "/data/PhotonEvaporation5.2/z70.a168", "start": 43521534, "end": 43575740}, {"filename": "/data/PhotonEvaporation5.2/z70.a169", "start": 43575740, "end": 43661366}, {"filename": "/data/PhotonEvaporation5.2/z70.a170", "start": 43661366, "end": 43776151}, {"filename": "/data/PhotonEvaporation5.2/z70.a171", "start": 43776151, "end": 43816130}, {"filename": "/data/PhotonEvaporation5.2/z70.a172", "start": 43816130, "end": 43889687}, {"filename": "/data/PhotonEvaporation5.2/z70.a173", "start": 43889687, "end": 43901690}, {"filename": "/data/PhotonEvaporation5.2/z70.a174", "start": 43901690, "end": 43936194}, {"filename": "/data/PhotonEvaporation5.2/z70.a175", "start": 43936194, "end": 43969861}, {"filename": "/data/PhotonEvaporation5.2/z70.a176", "start": 43969861, "end": 43988456}, {"filename": "/data/PhotonEvaporation5.2/z70.a177", "start": 43988456, "end": 44008631}, {"filename": "/data/PhotonEvaporation5.2/z70.a178", "start": 44008631, "end": 44010798}, {"filename": "/data/PhotonEvaporation5.2/z70.a179", "start": 44010798, "end": 44010837}, {"filename": "/data/PhotonEvaporation5.2/z70.a180", "start": 44010837, "end": 44010876}, {"filename": "/data/PhotonEvaporation5.2/z70.a181", "start": 44010876, "end": 44010915}, {"filename": "/data/PhotonEvaporation5.2/z71.a150", "start": 44010915, "end": 44010993}, {"filename": "/data/PhotonEvaporation5.2/z71.a151", "start": 44010993, "end": 44012802}, {"filename": "/data/PhotonEvaporation5.2/z71.a152", "start": 44012802, "end": 44012841}, {"filename": "/data/PhotonEvaporation5.2/z71.a153", "start": 44012841, "end": 44015155}, {"filename": "/data/PhotonEvaporation5.2/z71.a154", "start": 44015155, "end": 44018982}, {"filename": "/data/PhotonEvaporation5.2/z71.a155", "start": 44018982, "end": 44020743}, {"filename": "/data/PhotonEvaporation5.2/z71.a156", "start": 44020743, "end": 44022978}, {"filename": "/data/PhotonEvaporation5.2/z71.a157", "start": 44022978, "end": 44029677}, {"filename": "/data/PhotonEvaporation5.2/z71.a158", "start": 44029677, "end": 44029716}, {"filename": "/data/PhotonEvaporation5.2/z71.a159", "start": 44029716, "end": 44039669}, {"filename": "/data/PhotonEvaporation5.2/z71.a160", "start": 44039669, "end": 44046986}, {"filename": "/data/PhotonEvaporation5.2/z71.a161", "start": 44046986, "end": 44090845}, {"filename": "/data/PhotonEvaporation5.2/z71.a162", "start": 44090845, "end": 44104640}, {"filename": "/data/PhotonEvaporation5.2/z71.a163", "start": 44104640, "end": 44180362}, {"filename": "/data/PhotonEvaporation5.2/z71.a164", "start": 44180362, "end": 44231163}, {"filename": "/data/PhotonEvaporation5.2/z71.a165", "start": 44231163, "end": 44284441}, {"filename": "/data/PhotonEvaporation5.2/z71.a166", "start": 44284441, "end": 44305165}, {"filename": "/data/PhotonEvaporation5.2/z71.a167", "start": 44305165, "end": 44353052}, {"filename": "/data/PhotonEvaporation5.2/z71.a168", "start": 44353052, "end": 44386459}, {"filename": "/data/PhotonEvaporation5.2/z71.a169", "start": 44386459, "end": 44418009}, {"filename": "/data/PhotonEvaporation5.2/z71.a170", "start": 44418009, "end": 44479437}, {"filename": "/data/PhotonEvaporation5.2/z71.a171", "start": 44479437, "end": 44537086}, {"filename": "/data/PhotonEvaporation5.2/z71.a172", "start": 44537086, "end": 44542642}, {"filename": "/data/PhotonEvaporation5.2/z71.a173", "start": 44542642, "end": 44568580}, {"filename": "/data/PhotonEvaporation5.2/z71.a174", "start": 44568580, "end": 44594583}, {"filename": "/data/PhotonEvaporation5.2/z71.a175", "start": 44594583, "end": 44618629}, {"filename": "/data/PhotonEvaporation5.2/z71.a176", "start": 44618629, "end": 44677789}, {"filename": "/data/PhotonEvaporation5.2/z71.a177", "start": 44677789, "end": 44734729}, {"filename": "/data/PhotonEvaporation5.2/z71.a178", "start": 44734729, "end": 44736772}, {"filename": "/data/PhotonEvaporation5.2/z71.a179", "start": 44736772, "end": 44739913}, {"filename": "/data/PhotonEvaporation5.2/z71.a180", "start": 44739913, "end": 44743032}, {"filename": "/data/PhotonEvaporation5.2/z71.a181", "start": 44743032, "end": 44743071}, {"filename": "/data/PhotonEvaporation5.2/z71.a182", "start": 44743071, "end": 44743110}, {"filename": "/data/PhotonEvaporation5.2/z71.a183", "start": 44743110, "end": 44743149}, {"filename": "/data/PhotonEvaporation5.2/z71.a184", "start": 44743149, "end": 44743188}, {"filename": "/data/PhotonEvaporation5.2/z72.a153", "start": 44743188, "end": 44743227}, {"filename": "/data/PhotonEvaporation5.2/z72.a154", "start": 44743227, "end": 44744335}, {"filename": "/data/PhotonEvaporation5.2/z72.a155", "start": 44744335, "end": 44744374}, {"filename": "/data/PhotonEvaporation5.2/z72.a156", "start": 44744374, "end": 44748001}, {"filename": "/data/PhotonEvaporation5.2/z72.a157", "start": 44748001, "end": 44752864}, {"filename": "/data/PhotonEvaporation5.2/z72.a158", "start": 44752864, "end": 44759471}, {"filename": "/data/PhotonEvaporation5.2/z72.a159", "start": 44759471, "end": 44761715}, {"filename": "/data/PhotonEvaporation5.2/z72.a160", "start": 44761715, "end": 44767356}, {"filename": "/data/PhotonEvaporation5.2/z72.a161", "start": 44767356, "end": 44773946}, {"filename": "/data/PhotonEvaporation5.2/z72.a162", "start": 44773946, "end": 44785037}, {"filename": "/data/PhotonEvaporation5.2/z72.a163", "start": 44785037, "end": 44804359}, {"filename": "/data/PhotonEvaporation5.2/z72.a164", "start": 44804359, "end": 44813281}, {"filename": "/data/PhotonEvaporation5.2/z72.a165", "start": 44813281, "end": 44829713}, {"filename": "/data/PhotonEvaporation5.2/z72.a166", "start": 44829713, "end": 44873669}, {"filename": "/data/PhotonEvaporation5.2/z72.a167", "start": 44873669, "end": 44891281}, {"filename": "/data/PhotonEvaporation5.2/z72.a168", "start": 44891281, "end": 44956124}, {"filename": "/data/PhotonEvaporation5.2/z72.a169", "start": 44956124, "end": 44997684}, {"filename": "/data/PhotonEvaporation5.2/z72.a170", "start": 44997684, "end": 45025211}, {"filename": "/data/PhotonEvaporation5.2/z72.a171", "start": 45025211, "end": 45065612}, {"filename": "/data/PhotonEvaporation5.2/z72.a172", "start": 45065612, "end": 45092170}, {"filename": "/data/PhotonEvaporation5.2/z72.a173", "start": 45092170, "end": 45135180}, {"filename": "/data/PhotonEvaporation5.2/z72.a174", "start": 45135180, "end": 45203640}, {"filename": "/data/PhotonEvaporation5.2/z72.a175", "start": 45203640, "end": 45260682}, {"filename": "/data/PhotonEvaporation5.2/z72.a176", "start": 45260682, "end": 45325967}, {"filename": "/data/PhotonEvaporation5.2/z72.a177", "start": 45325967, "end": 45363133}, {"filename": "/data/PhotonEvaporation5.2/z72.a178", "start": 45363133, "end": 45433118}, {"filename": "/data/PhotonEvaporation5.2/z72.a179", "start": 45433118, "end": 45512077}, {"filename": "/data/PhotonEvaporation5.2/z72.a180", "start": 45512077, "end": 45561666}, {"filename": "/data/PhotonEvaporation5.2/z72.a181", "start": 45561666, "end": 45617814}, {"filename": "/data/PhotonEvaporation5.2/z72.a182", "start": 45617814, "end": 45622610}, {"filename": "/data/PhotonEvaporation5.2/z72.a183", "start": 45622610, "end": 45624942}, {"filename": "/data/PhotonEvaporation5.2/z72.a184", "start": 45624942, "end": 45626064}, {"filename": "/data/PhotonEvaporation5.2/z72.a185", "start": 45626064, "end": 45626103}, {"filename": "/data/PhotonEvaporation5.2/z72.a186", "start": 45626103, "end": 45626142}, {"filename": "/data/PhotonEvaporation5.2/z72.a187", "start": 45626142, "end": 45626181}, {"filename": "/data/PhotonEvaporation5.2/z72.a188", "start": 45626181, "end": 45626220}, {"filename": "/data/PhotonEvaporation5.2/z72.a189", "start": 45626220, "end": 45626259}, {"filename": "/data/PhotonEvaporation5.2/z73.a155", "start": 45626259, "end": 45626337}, {"filename": "/data/PhotonEvaporation5.2/z73.a156", "start": 45626337, "end": 45626415}, {"filename": "/data/PhotonEvaporation5.2/z73.a157", "start": 45626415, "end": 45626532}, {"filename": "/data/PhotonEvaporation5.2/z73.a158", "start": 45626532, "end": 45626610}, {"filename": "/data/PhotonEvaporation5.2/z73.a159", "start": 45626610, "end": 45626949}, {"filename": "/data/PhotonEvaporation5.2/z73.a160", "start": 45626949, "end": 45627027}, {"filename": "/data/PhotonEvaporation5.2/z73.a161", "start": 45627027, "end": 45643363}, {"filename": "/data/PhotonEvaporation5.2/z73.a162", "start": 45643363, "end": 45643402}, {"filename": "/data/PhotonEvaporation5.2/z73.a163", "start": 45643402, "end": 45655533}, {"filename": "/data/PhotonEvaporation5.2/z73.a164", "start": 45655533, "end": 45660319}, {"filename": "/data/PhotonEvaporation5.2/z73.a165", "start": 45660319, "end": 45666962}, {"filename": "/data/PhotonEvaporation5.2/z73.a166", "start": 45666962, "end": 45673109}, {"filename": "/data/PhotonEvaporation5.2/z73.a167", "start": 45673109, "end": 45737101}, {"filename": "/data/PhotonEvaporation5.2/z73.a168", "start": 45737101, "end": 45749478}, {"filename": "/data/PhotonEvaporation5.2/z73.a169", "start": 45749478, "end": 45801417}, {"filename": "/data/PhotonEvaporation5.2/z73.a170", "start": 45801417, "end": 45816260}, {"filename": "/data/PhotonEvaporation5.2/z73.a171", "start": 45816260, "end": 45836026}, {"filename": "/data/PhotonEvaporation5.2/z73.a172", "start": 45836026, "end": 45848068}, {"filename": "/data/PhotonEvaporation5.2/z73.a173", "start": 45848068, "end": 45865451}, {"filename": "/data/PhotonEvaporation5.2/z73.a174", "start": 45865451, "end": 45899935}, {"filename": "/data/PhotonEvaporation5.2/z73.a175", "start": 45899935, "end": 45929179}, {"filename": "/data/PhotonEvaporation5.2/z73.a176", "start": 45929179, "end": 45962694}, {"filename": "/data/PhotonEvaporation5.2/z73.a177", "start": 45962694, "end": 46024961}, {"filename": "/data/PhotonEvaporation5.2/z73.a178", "start": 46024961, "end": 46059752}, {"filename": "/data/PhotonEvaporation5.2/z73.a179", "start": 46059752, "end": 46092428}, {"filename": "/data/PhotonEvaporation5.2/z73.a180", "start": 46092428, "end": 46152465}, {"filename": "/data/PhotonEvaporation5.2/z73.a181", "start": 46152465, "end": 46175875}, {"filename": "/data/PhotonEvaporation5.2/z73.a182", "start": 46175875, "end": 46223659}, {"filename": "/data/PhotonEvaporation5.2/z73.a183", "start": 46223659, "end": 46227511}, {"filename": "/data/PhotonEvaporation5.2/z73.a184", "start": 46227511, "end": 46228672}, {"filename": "/data/PhotonEvaporation5.2/z73.a185", "start": 46228672, "end": 46231314}, {"filename": "/data/PhotonEvaporation5.2/z73.a186", "start": 46231314, "end": 46231353}, {"filename": "/data/PhotonEvaporation5.2/z73.a187", "start": 46231353, "end": 46231392}, {"filename": "/data/PhotonEvaporation5.2/z73.a188", "start": 46231392, "end": 46231470}, {"filename": "/data/PhotonEvaporation5.2/z73.a189", "start": 46231470, "end": 46231509}, {"filename": "/data/PhotonEvaporation5.2/z73.a190", "start": 46231509, "end": 46231674}, {"filename": "/data/PhotonEvaporation5.2/z73.a191", "start": 46231674, "end": 46231713}, {"filename": "/data/PhotonEvaporation5.2/z73.a192", "start": 46231713, "end": 46231752}, {"filename": "/data/PhotonEvaporation5.2/z74.a158", "start": 46231752, "end": 46231830}, {"filename": "/data/PhotonEvaporation5.2/z74.a159", "start": 46231830, "end": 46231869}, {"filename": "/data/PhotonEvaporation5.2/z74.a160", "start": 46231869, "end": 46234152}, {"filename": "/data/PhotonEvaporation5.2/z74.a161", "start": 46234152, "end": 46234191}, {"filename": "/data/PhotonEvaporation5.2/z74.a162", "start": 46234191, "end": 46234417}, {"filename": "/data/PhotonEvaporation5.2/z74.a163", "start": 46234417, "end": 46240458}, {"filename": "/data/PhotonEvaporation5.2/z74.a164", "start": 46240458, "end": 46243302}, {"filename": "/data/PhotonEvaporation5.2/z74.a165", "start": 46243302, "end": 46250004}, {"filename": "/data/PhotonEvaporation5.2/z74.a166", "start": 46250004, "end": 46257902}, {"filename": "/data/PhotonEvaporation5.2/z74.a167", "start": 46257902, "end": 46267918}, {"filename": "/data/PhotonEvaporation5.2/z74.a168", "start": 46267918, "end": 46281158}, {"filename": "/data/PhotonEvaporation5.2/z74.a169", "start": 46281158, "end": 46288116}, {"filename": "/data/PhotonEvaporation5.2/z74.a170", "start": 46288116, "end": 46302548}, {"filename": "/data/PhotonEvaporation5.2/z74.a171", "start": 46302548, "end": 46321665}, {"filename": "/data/PhotonEvaporation5.2/z74.a172", "start": 46321665, "end": 46332791}, {"filename": "/data/PhotonEvaporation5.2/z74.a173", "start": 46332791, "end": 46342125}, {"filename": "/data/PhotonEvaporation5.2/z74.a174", "start": 46342125, "end": 46348667}, {"filename": "/data/PhotonEvaporation5.2/z74.a175", "start": 46348667, "end": 46359411}, {"filename": "/data/PhotonEvaporation5.2/z74.a176", "start": 46359411, "end": 46385999}, {"filename": "/data/PhotonEvaporation5.2/z74.a177", "start": 46385999, "end": 46432793}, {"filename": "/data/PhotonEvaporation5.2/z74.a178", "start": 46432793, "end": 46510390}, {"filename": "/data/PhotonEvaporation5.2/z74.a179", "start": 46510390, "end": 46574692}, {"filename": "/data/PhotonEvaporation5.2/z74.a180", "start": 46574692, "end": 46605924}, {"filename": "/data/PhotonEvaporation5.2/z74.a181", "start": 46605924, "end": 46632720}, {"filename": "/data/PhotonEvaporation5.2/z74.a182", "start": 46632720, "end": 46681793}, {"filename": "/data/PhotonEvaporation5.2/z74.a183", "start": 46681793, "end": 46708209}, {"filename": "/data/PhotonEvaporation5.2/z74.a184", "start": 46708209, "end": 46753171}, {"filename": "/data/PhotonEvaporation5.2/z74.a185", "start": 46753171, "end": 46862588}, {"filename": "/data/PhotonEvaporation5.2/z74.a186", "start": 46862588, "end": 46885595}, {"filename": "/data/PhotonEvaporation5.2/z74.a187", "start": 46885595, "end": 47005637}, {"filename": "/data/PhotonEvaporation5.2/z74.a188", "start": 47005637, "end": 47009668}, {"filename": "/data/PhotonEvaporation5.2/z74.a189", "start": 47009668, "end": 47009707}, {"filename": "/data/PhotonEvaporation5.2/z74.a190", "start": 47009707, "end": 47010868}, {"filename": "/data/PhotonEvaporation5.2/z74.a192", "start": 47010868, "end": 47011094}, {"filename": "/data/PhotonEvaporation5.2/z74.a193", "start": 47011094, "end": 47011133}, {"filename": "/data/PhotonEvaporation5.2/z74.a194", "start": 47011133, "end": 47011172}, {"filename": "/data/PhotonEvaporation5.2/z75.a159", "start": 47011172, "end": 47011250}, {"filename": "/data/PhotonEvaporation5.2/z75.a160", "start": 47011250, "end": 47011289}, {"filename": "/data/PhotonEvaporation5.2/z75.a161", "start": 47011289, "end": 47016295}, {"filename": "/data/PhotonEvaporation5.2/z75.a162", "start": 47016295, "end": 47016373}, {"filename": "/data/PhotonEvaporation5.2/z75.a163", "start": 47016373, "end": 47016451}, {"filename": "/data/PhotonEvaporation5.2/z75.a164", "start": 47016451, "end": 47016490}, {"filename": "/data/PhotonEvaporation5.2/z75.a165", "start": 47016490, "end": 47016568}, {"filename": "/data/PhotonEvaporation5.2/z75.a166", "start": 47016568, "end": 47018112}, {"filename": "/data/PhotonEvaporation5.2/z75.a167", "start": 47018112, "end": 47018377}, {"filename": "/data/PhotonEvaporation5.2/z75.a168", "start": 47018377, "end": 47018964}, {"filename": "/data/PhotonEvaporation5.2/z75.a169", "start": 47018964, "end": 47030062}, {"filename": "/data/PhotonEvaporation5.2/z75.a170", "start": 47030062, "end": 47031545}, {"filename": "/data/PhotonEvaporation5.2/z75.a171", "start": 47031545, "end": 47055641}, {"filename": "/data/PhotonEvaporation5.2/z75.a172", "start": 47055641, "end": 47056737}, {"filename": "/data/PhotonEvaporation5.2/z75.a173", "start": 47056737, "end": 47075234}, {"filename": "/data/PhotonEvaporation5.2/z75.a174", "start": 47075234, "end": 47080178}, {"filename": "/data/PhotonEvaporation5.2/z75.a175", "start": 47080178, "end": 47106523}, {"filename": "/data/PhotonEvaporation5.2/z75.a176", "start": 47106523, "end": 47137402}, {"filename": "/data/PhotonEvaporation5.2/z75.a177", "start": 47137402, "end": 47204422}, {"filename": "/data/PhotonEvaporation5.2/z75.a178", "start": 47204422, "end": 47224133}, {"filename": "/data/PhotonEvaporation5.2/z75.a179", "start": 47224133, "end": 47259318}, {"filename": "/data/PhotonEvaporation5.2/z75.a180", "start": 47259318, "end": 47290202}, {"filename": "/data/PhotonEvaporation5.2/z75.a181", "start": 47290202, "end": 47336542}, {"filename": "/data/PhotonEvaporation5.2/z75.a182", "start": 47336542, "end": 47357319}, {"filename": "/data/PhotonEvaporation5.2/z75.a183", "start": 47357319, "end": 47379806}, {"filename": "/data/PhotonEvaporation5.2/z75.a184", "start": 47379806, "end": 47408664}, {"filename": "/data/PhotonEvaporation5.2/z75.a185", "start": 47408664, "end": 47418749}, {"filename": "/data/PhotonEvaporation5.2/z75.a186", "start": 47418749, "end": 47440976}, {"filename": "/data/PhotonEvaporation5.2/z75.a187", "start": 47440976, "end": 47462579}, {"filename": "/data/PhotonEvaporation5.2/z75.a188", "start": 47462579, "end": 47475810}, {"filename": "/data/PhotonEvaporation5.2/z75.a189", "start": 47475810, "end": 47477003}, {"filename": "/data/PhotonEvaporation5.2/z75.a190", "start": 47477003, "end": 47477642}, {"filename": "/data/PhotonEvaporation5.2/z75.a191", "start": 47477642, "end": 47479202}, {"filename": "/data/PhotonEvaporation5.2/z75.a192", "start": 47479202, "end": 47479601}, {"filename": "/data/PhotonEvaporation5.2/z75.a193", "start": 47479601, "end": 47479679}, {"filename": "/data/PhotonEvaporation5.2/z75.a194", "start": 47479679, "end": 47479835}, {"filename": "/data/PhotonEvaporation5.2/z75.a195", "start": 47479835, "end": 47479874}, {"filename": "/data/PhotonEvaporation5.2/z75.a196", "start": 47479874, "end": 47479952}, {"filename": "/data/PhotonEvaporation5.2/z75.a198", "start": 47479952, "end": 47479991}, {"filename": "/data/PhotonEvaporation5.2/z76.a161", "start": 47479991, "end": 47480030}, {"filename": "/data/PhotonEvaporation5.2/z76.a162", "start": 47480030, "end": 47480817}, {"filename": "/data/PhotonEvaporation5.2/z76.a163", "start": 47480817, "end": 47480856}, {"filename": "/data/PhotonEvaporation5.2/z76.a164", "start": 47480856, "end": 47481830}, {"filename": "/data/PhotonEvaporation5.2/z76.a165", "start": 47481830, "end": 47483052}, {"filename": "/data/PhotonEvaporation5.2/z76.a166", "start": 47483052, "end": 47485579}, {"filename": "/data/PhotonEvaporation5.2/z76.a167", "start": 47485579, "end": 47489637}, {"filename": "/data/PhotonEvaporation5.2/z76.a168", "start": 47489637, "end": 47495061}, {"filename": "/data/PhotonEvaporation5.2/z76.a169", "start": 47495061, "end": 47498266}, {"filename": "/data/PhotonEvaporation5.2/z76.a170", "start": 47498266, "end": 47503133}, {"filename": "/data/PhotonEvaporation5.2/z76.a171", "start": 47503133, "end": 47517513}, {"filename": "/data/PhotonEvaporation5.2/z76.a172", "start": 47517513, "end": 47534582}, {"filename": "/data/PhotonEvaporation5.2/z76.a173", "start": 47534582, "end": 47547735}, {"filename": "/data/PhotonEvaporation5.2/z76.a174", "start": 47547735, "end": 47562812}, {"filename": "/data/PhotonEvaporation5.2/z76.a175", "start": 47562812, "end": 47579696}, {"filename": "/data/PhotonEvaporation5.2/z76.a176", "start": 47579696, "end": 47593979}, {"filename": "/data/PhotonEvaporation5.2/z76.a177", "start": 47593979, "end": 47608229}, {"filename": "/data/PhotonEvaporation5.2/z76.a178", "start": 47608229, "end": 47624398}, {"filename": "/data/PhotonEvaporation5.2/z76.a179", "start": 47624398, "end": 47657227}, {"filename": "/data/PhotonEvaporation5.2/z76.a180", "start": 47657227, "end": 47700875}, {"filename": "/data/PhotonEvaporation5.2/z76.a181", "start": 47700875, "end": 47756260}, {"filename": "/data/PhotonEvaporation5.2/z76.a182", "start": 47756260, "end": 47801995}, {"filename": "/data/PhotonEvaporation5.2/z76.a183", "start": 47801995, "end": 47832372}, {"filename": "/data/PhotonEvaporation5.2/z76.a184", "start": 47832372, "end": 47892105}, {"filename": "/data/PhotonEvaporation5.2/z76.a185", "start": 47892105, "end": 47941596}, {"filename": "/data/PhotonEvaporation5.2/z76.a186", "start": 47941596, "end": 47980291}, {"filename": "/data/PhotonEvaporation5.2/z76.a187", "start": 47980291, "end": 47998636}, {"filename": "/data/PhotonEvaporation5.2/z76.a188", "start": 47998636, "end": 48031914}, {"filename": "/data/PhotonEvaporation5.2/z76.a189", "start": 48031914, "end": 48063311}, {"filename": "/data/PhotonEvaporation5.2/z76.a190", "start": 48063311, "end": 48102856}, {"filename": "/data/PhotonEvaporation5.2/z76.a191", "start": 48102856, "end": 48128873}, {"filename": "/data/PhotonEvaporation5.2/z76.a192", "start": 48128873, "end": 48153058}, {"filename": "/data/PhotonEvaporation5.2/z76.a193", "start": 48153058, "end": 48163858}, {"filename": "/data/PhotonEvaporation5.2/z76.a194", "start": 48163858, "end": 48165635}, {"filename": "/data/PhotonEvaporation5.2/z76.a195", "start": 48165635, "end": 48165974}, {"filename": "/data/PhotonEvaporation5.2/z76.a196", "start": 48165974, "end": 48166091}, {"filename": "/data/PhotonEvaporation5.2/z76.a197", "start": 48166091, "end": 48166169}, {"filename": "/data/PhotonEvaporation5.2/z76.a198", "start": 48166169, "end": 48167972}, {"filename": "/data/PhotonEvaporation5.2/z76.a199", "start": 48167972, "end": 48168011}, {"filename": "/data/PhotonEvaporation5.2/z76.a200", "start": 48168011, "end": 48168050}, {"filename": "/data/PhotonEvaporation5.2/z76.a201", "start": 48168050, "end": 48168089}, {"filename": "/data/PhotonEvaporation5.2/z76.a202", "start": 48168089, "end": 48168128}, {"filename": "/data/PhotonEvaporation5.2/z77.a164", "start": 48168128, "end": 48168206}, {"filename": "/data/PhotonEvaporation5.2/z77.a165", "start": 48168206, "end": 48168284}, {"filename": "/data/PhotonEvaporation5.2/z77.a166", "start": 48168284, "end": 48168362}, {"filename": "/data/PhotonEvaporation5.2/z77.a167", "start": 48168362, "end": 48168440}, {"filename": "/data/PhotonEvaporation5.2/z77.a168", "start": 48168440, "end": 48168605}, {"filename": "/data/PhotonEvaporation5.2/z77.a169", "start": 48168605, "end": 48175034}, {"filename": "/data/PhotonEvaporation5.2/z77.a170", "start": 48175034, "end": 48177335}, {"filename": "/data/PhotonEvaporation5.2/z77.a171", "start": 48177335, "end": 48184551}, {"filename": "/data/PhotonEvaporation5.2/z77.a172", "start": 48184551, "end": 48184855}, {"filename": "/data/PhotonEvaporation5.2/z77.a173", "start": 48184855, "end": 48193890}, {"filename": "/data/PhotonEvaporation5.2/z77.a174", "start": 48193890, "end": 48193968}, {"filename": "/data/PhotonEvaporation5.2/z77.a175", "start": 48193968, "end": 48206022}, {"filename": "/data/PhotonEvaporation5.2/z77.a176", "start": 48206022, "end": 48235633}, {"filename": "/data/PhotonEvaporation5.2/z77.a177", "start": 48235633, "end": 48267550}, {"filename": "/data/PhotonEvaporation5.2/z77.a178", "start": 48267550, "end": 48323709}, {"filename": "/data/PhotonEvaporation5.2/z77.a179", "start": 48323709, "end": 48345595}, {"filename": "/data/PhotonEvaporation5.2/z77.a180", "start": 48345595, "end": 48358862}, {"filename": "/data/PhotonEvaporation5.2/z77.a181", "start": 48358862, "end": 48409461}, {"filename": "/data/PhotonEvaporation5.2/z77.a182", "start": 48409461, "end": 48433338}, {"filename": "/data/PhotonEvaporation5.2/z77.a183", "start": 48433338, "end": 48443391}, {"filename": "/data/PhotonEvaporation5.2/z77.a184", "start": 48443391, "end": 48465571}, {"filename": "/data/PhotonEvaporation5.2/z77.a185", "start": 48465571, "end": 48488016}, {"filename": "/data/PhotonEvaporation5.2/z77.a186", "start": 48488016, "end": 48517708}, {"filename": "/data/PhotonEvaporation5.2/z77.a187", "start": 48517708, "end": 48542203}, {"filename": "/data/PhotonEvaporation5.2/z77.a188", "start": 48542203, "end": 48547515}, {"filename": "/data/PhotonEvaporation5.2/z77.a189", "start": 48547515, "end": 48575390}, {"filename": "/data/PhotonEvaporation5.2/z77.a190", "start": 48575390, "end": 48595080}, {"filename": "/data/PhotonEvaporation5.2/z77.a191", "start": 48595080, "end": 48615698}, {"filename": "/data/PhotonEvaporation5.2/z77.a192", "start": 48615698, "end": 48653175}, {"filename": "/data/PhotonEvaporation5.2/z77.a193", "start": 48653175, "end": 48679253}, {"filename": "/data/PhotonEvaporation5.2/z77.a194", "start": 48679253, "end": 48712304}, {"filename": "/data/PhotonEvaporation5.2/z77.a195", "start": 48712304, "end": 48718112}, {"filename": "/data/PhotonEvaporation5.2/z77.a196", "start": 48718112, "end": 48718834}, {"filename": "/data/PhotonEvaporation5.2/z77.a197", "start": 48718834, "end": 48719770}, {"filename": "/data/PhotonEvaporation5.2/z77.a198", "start": 48719770, "end": 48719896}, {"filename": "/data/PhotonEvaporation5.2/z77.a199", "start": 48719896, "end": 48720052}, {"filename": "/data/PhotonEvaporation5.2/z77.a200", "start": 48720052, "end": 48720091}, {"filename": "/data/PhotonEvaporation5.2/z77.a201", "start": 48720091, "end": 48720130}, {"filename": "/data/PhotonEvaporation5.2/z77.a202", "start": 48720130, "end": 48720169}, {"filename": "/data/PhotonEvaporation5.2/z77.a203", "start": 48720169, "end": 48720208}, {"filename": "/data/PhotonEvaporation5.2/z77.a204", "start": 48720208, "end": 48720247}, {"filename": "/data/PhotonEvaporation5.2/z78.a166", "start": 48720247, "end": 48720286}, {"filename": "/data/PhotonEvaporation5.2/z78.a167", "start": 48720286, "end": 48720325}, {"filename": "/data/PhotonEvaporation5.2/z78.a168", "start": 48720325, "end": 48721186}, {"filename": "/data/PhotonEvaporation5.2/z78.a169", "start": 48721186, "end": 48721451}, {"filename": "/data/PhotonEvaporation5.2/z78.a170", "start": 48721451, "end": 48721938}, {"filename": "/data/PhotonEvaporation5.2/z78.a171", "start": 48721938, "end": 48723373}, {"filename": "/data/PhotonEvaporation5.2/z78.a172", "start": 48723373, "end": 48725913}, {"filename": "/data/PhotonEvaporation5.2/z78.a173", "start": 48725913, "end": 48727300}, {"filename": "/data/PhotonEvaporation5.2/z78.a174", "start": 48727300, "end": 48728996}, {"filename": "/data/PhotonEvaporation5.2/z78.a175", "start": 48728996, "end": 48732362}, {"filename": "/data/PhotonEvaporation5.2/z78.a176", "start": 48732362, "end": 48739017}, {"filename": "/data/PhotonEvaporation5.2/z78.a177", "start": 48739017, "end": 48752737}, {"filename": "/data/PhotonEvaporation5.2/z78.a178", "start": 48752737, "end": 48762007}, {"filename": "/data/PhotonEvaporation5.2/z78.a179", "start": 48762007, "end": 48775243}, {"filename": "/data/PhotonEvaporation5.2/z78.a180", "start": 48775243, "end": 48798122}, {"filename": "/data/PhotonEvaporation5.2/z78.a181", "start": 48798122, "end": 48845215}, {"filename": "/data/PhotonEvaporation5.2/z78.a182", "start": 48845215, "end": 48870043}, {"filename": "/data/PhotonEvaporation5.2/z78.a183", "start": 48870043, "end": 48900367}, {"filename": "/data/PhotonEvaporation5.2/z78.a184", "start": 48900367, "end": 48944052}, {"filename": "/data/PhotonEvaporation5.2/z78.a185", "start": 48944052, "end": 49015571}, {"filename": "/data/PhotonEvaporation5.2/z78.a186", "start": 49015571, "end": 49045051}, {"filename": "/data/PhotonEvaporation5.2/z78.a187", "start": 49045051, "end": 49090286}, {"filename": "/data/PhotonEvaporation5.2/z78.a188", "start": 49090286, "end": 49105277}, {"filename": "/data/PhotonEvaporation5.2/z78.a189", "start": 49105277, "end": 49118737}, {"filename": "/data/PhotonEvaporation5.2/z78.a190", "start": 49118737, "end": 49137093}, {"filename": "/data/PhotonEvaporation5.2/z78.a191", "start": 49137093, "end": 49165617}, {"filename": "/data/PhotonEvaporation5.2/z78.a192", "start": 49165617, "end": 49228628}, {"filename": "/data/PhotonEvaporation5.2/z78.a193", "start": 49228628, "end": 49242181}, {"filename": "/data/PhotonEvaporation5.2/z78.a194", "start": 49242181, "end": 49281347}, {"filename": "/data/PhotonEvaporation5.2/z78.a195", "start": 49281347, "end": 49304667}, {"filename": "/data/PhotonEvaporation5.2/z78.a196", "start": 49304667, "end": 49350172}, {"filename": "/data/PhotonEvaporation5.2/z78.a197", "start": 49350172, "end": 49357366}, {"filename": "/data/PhotonEvaporation5.2/z78.a198", "start": 49357366, "end": 49365865}, {"filename": "/data/PhotonEvaporation5.2/z78.a199", "start": 49365865, "end": 49368805}, {"filename": "/data/PhotonEvaporation5.2/z78.a200", "start": 49368805, "end": 49374109}, {"filename": "/data/PhotonEvaporation5.2/z78.a201", "start": 49374109, "end": 49374748}, {"filename": "/data/PhotonEvaporation5.2/z78.a202", "start": 49374748, "end": 49375348}, {"filename": "/data/PhotonEvaporation5.2/z78.a203", "start": 49375348, "end": 49375387}, {"filename": "/data/PhotonEvaporation5.2/z78.a204", "start": 49375387, "end": 49376361}, {"filename": "/data/PhotonEvaporation5.2/z78.a205", "start": 49376361, "end": 49376400}, {"filename": "/data/PhotonEvaporation5.2/z79.a170", "start": 49376400, "end": 49376478}, {"filename": "/data/PhotonEvaporation5.2/z79.a171", "start": 49376478, "end": 49376556}, {"filename": "/data/PhotonEvaporation5.2/z79.a172", "start": 49376556, "end": 49377291}, {"filename": "/data/PhotonEvaporation5.2/z79.a173", "start": 49377291, "end": 49377717}, {"filename": "/data/PhotonEvaporation5.2/z79.a174", "start": 49377717, "end": 49377756}, {"filename": "/data/PhotonEvaporation5.2/z79.a175", "start": 49377756, "end": 49380039}, {"filename": "/data/PhotonEvaporation5.2/z79.a176", "start": 49380039, "end": 49382562}, {"filename": "/data/PhotonEvaporation5.2/z79.a177", "start": 49382562, "end": 49389843}, {"filename": "/data/PhotonEvaporation5.2/z79.a178", "start": 49389843, "end": 49389882}, {"filename": "/data/PhotonEvaporation5.2/z79.a179", "start": 49389882, "end": 49396618}, {"filename": "/data/PhotonEvaporation5.2/z79.a180", "start": 49396618, "end": 49396657}, {"filename": "/data/PhotonEvaporation5.2/z79.a181", "start": 49396657, "end": 49409659}, {"filename": "/data/PhotonEvaporation5.2/z79.a182", "start": 49409659, "end": 49423715}, {"filename": "/data/PhotonEvaporation5.2/z79.a183", "start": 49423715, "end": 49435621}, {"filename": "/data/PhotonEvaporation5.2/z79.a184", "start": 49435621, "end": 49470315}, {"filename": "/data/PhotonEvaporation5.2/z79.a185", "start": 49470315, "end": 49490974}, {"filename": "/data/PhotonEvaporation5.2/z79.a186", "start": 49490974, "end": 49508385}, {"filename": "/data/PhotonEvaporation5.2/z79.a187", "start": 49508385, "end": 49594833}, {"filename": "/data/PhotonEvaporation5.2/z79.a188", "start": 49594833, "end": 49607331}, {"filename": "/data/PhotonEvaporation5.2/z79.a189", "start": 49607331, "end": 49678771}, {"filename": "/data/PhotonEvaporation5.2/z79.a190", "start": 49678771, "end": 49691644}, {"filename": "/data/PhotonEvaporation5.2/z79.a191", "start": 49691644, "end": 49722511}, {"filename": "/data/PhotonEvaporation5.2/z79.a192", "start": 49722511, "end": 49732691}, {"filename": "/data/PhotonEvaporation5.2/z79.a193", "start": 49732691, "end": 49768989}, {"filename": "/data/PhotonEvaporation5.2/z79.a194", "start": 49768989, "end": 49774600}, {"filename": "/data/PhotonEvaporation5.2/z79.a195", "start": 49774600, "end": 49791594}, {"filename": "/data/PhotonEvaporation5.2/z79.a196", "start": 49791594, "end": 49866774}, {"filename": "/data/PhotonEvaporation5.2/z79.a197", "start": 49866774, "end": 49874166}, {"filename": "/data/PhotonEvaporation5.2/z79.a198", "start": 49874166, "end": 50008618}, {"filename": "/data/PhotonEvaporation5.2/z79.a199", "start": 50008618, "end": 50018054}, {"filename": "/data/PhotonEvaporation5.2/z79.a200", "start": 50018054, "end": 50020058}, {"filename": "/data/PhotonEvaporation5.2/z79.a201", "start": 50020058, "end": 50020925}, {"filename": "/data/PhotonEvaporation5.2/z79.a202", "start": 50020925, "end": 50020964}, {"filename": "/data/PhotonEvaporation5.2/z79.a203", "start": 50020964, "end": 50021471}, {"filename": "/data/PhotonEvaporation5.2/z79.a204", "start": 50021471, "end": 50021549}, {"filename": "/data/PhotonEvaporation5.2/z79.a205", "start": 50021549, "end": 50021588}, {"filename": "/data/PhotonEvaporation5.2/z79.a206", "start": 50021588, "end": 50021627}, {"filename": "/data/PhotonEvaporation5.2/z79.a207", "start": 50021627, "end": 50021666}, {"filename": "/data/PhotonEvaporation5.2/z79.a208", "start": 50021666, "end": 50021705}, {"filename": "/data/PhotonEvaporation5.2/z79.a209", "start": 50021705, "end": 50021744}, {"filename": "/data/PhotonEvaporation5.2/z79.a210", "start": 50021744, "end": 50021783}, {"filename": "/data/PhotonEvaporation5.2/z8.a12", "start": 50021783, "end": 50021822}, {"filename": "/data/PhotonEvaporation5.2/z8.a13", "start": 50021822, "end": 50021978}, {"filename": "/data/PhotonEvaporation5.2/z8.a14", "start": 50021978, "end": 50022680}, {"filename": "/data/PhotonEvaporation5.2/z8.a15", "start": 50022680, "end": 50033023}, {"filename": "/data/PhotonEvaporation5.2/z8.a16", "start": 50033023, "end": 50043009}, {"filename": "/data/PhotonEvaporation5.2/z8.a17", "start": 50043009, "end": 50048399}, {"filename": "/data/PhotonEvaporation5.2/z8.a18", "start": 50048399, "end": 50062944}, {"filename": "/data/PhotonEvaporation5.2/z8.a19", "start": 50062944, "end": 50066617}, {"filename": "/data/PhotonEvaporation5.2/z8.a20", "start": 50066617, "end": 50067976}, {"filename": "/data/PhotonEvaporation5.2/z8.a21", "start": 50067976, "end": 50068750}, {"filename": "/data/PhotonEvaporation5.2/z8.a22", "start": 50068750, "end": 50070207}, {"filename": "/data/PhotonEvaporation5.2/z8.a23", "start": 50070207, "end": 50070246}, {"filename": "/data/PhotonEvaporation5.2/z8.a24", "start": 50070246, "end": 50070402}, {"filename": "/data/PhotonEvaporation5.2/z8.a26", "start": 50070402, "end": 50070519}, {"filename": "/data/PhotonEvaporation5.2/z80.a171", "start": 50070519, "end": 50070558}, {"filename": "/data/PhotonEvaporation5.2/z80.a172", "start": 50070558, "end": 50071158}, {"filename": "/data/PhotonEvaporation5.2/z80.a173", "start": 50071158, "end": 50071197}, {"filename": "/data/PhotonEvaporation5.2/z80.a174", "start": 50071197, "end": 50071236}, {"filename": "/data/PhotonEvaporation5.2/z80.a175", "start": 50071236, "end": 50072397}, {"filename": "/data/PhotonEvaporation5.2/z80.a176", "start": 50072397, "end": 50073545}, {"filename": "/data/PhotonEvaporation5.2/z80.a177", "start": 50073545, "end": 50074145}, {"filename": "/data/PhotonEvaporation5.2/z80.a178", "start": 50074145, "end": 50079708}, {"filename": "/data/PhotonEvaporation5.2/z80.a179", "start": 50079708, "end": 50091500}, {"filename": "/data/PhotonEvaporation5.2/z80.a180", "start": 50091500, "end": 50099690}, {"filename": "/data/PhotonEvaporation5.2/z80.a181", "start": 50099690, "end": 50107310}, {"filename": "/data/PhotonEvaporation5.2/z80.a182", "start": 50107310, "end": 50114058}, {"filename": "/data/PhotonEvaporation5.2/z80.a183", "start": 50114058, "end": 50123602}, {"filename": "/data/PhotonEvaporation5.2/z80.a184", "start": 50123602, "end": 50138623}, {"filename": "/data/PhotonEvaporation5.2/z80.a185", "start": 50138623, "end": 50146032}, {"filename": "/data/PhotonEvaporation5.2/z80.a186", "start": 50146032, "end": 50167122}, {"filename": "/data/PhotonEvaporation5.2/z80.a187", "start": 50167122, "end": 50174035}, {"filename": "/data/PhotonEvaporation5.2/z80.a188", "start": 50174035, "end": 50194177}, {"filename": "/data/PhotonEvaporation5.2/z80.a189", "start": 50194177, "end": 50205214}, {"filename": "/data/PhotonEvaporation5.2/z80.a190", "start": 50205214, "end": 50241489}, {"filename": "/data/PhotonEvaporation5.2/z80.a191", "start": 50241489, "end": 50275549}, {"filename": "/data/PhotonEvaporation5.2/z80.a192", "start": 50275549, "end": 50308436}, {"filename": "/data/PhotonEvaporation5.2/z80.a193", "start": 50308436, "end": 50357527}, {"filename": "/data/PhotonEvaporation5.2/z80.a194", "start": 50357527, "end": 50387444}, {"filename": "/data/PhotonEvaporation5.2/z80.a195", "start": 50387444, "end": 50438176}, {"filename": "/data/PhotonEvaporation5.2/z80.a196", "start": 50438176, "end": 50456123}, {"filename": "/data/PhotonEvaporation5.2/z80.a197", "start": 50456123, "end": 50475306}, {"filename": "/data/PhotonEvaporation5.2/z80.a198", "start": 50475306, "end": 50496929}, {"filename": "/data/PhotonEvaporation5.2/z80.a199", "start": 50496929, "end": 50507608}, {"filename": "/data/PhotonEvaporation5.2/z80.a200", "start": 50507608, "end": 50578961}, {"filename": "/data/PhotonEvaporation5.2/z80.a201", "start": 50578961, "end": 50586273}, {"filename": "/data/PhotonEvaporation5.2/z80.a202", "start": 50586273, "end": 50603723}, {"filename": "/data/PhotonEvaporation5.2/z80.a203", "start": 50603723, "end": 50608533}, {"filename": "/data/PhotonEvaporation5.2/z80.a204", "start": 50608533, "end": 50617870}, {"filename": "/data/PhotonEvaporation5.2/z80.a205", "start": 50617870, "end": 50623371}, {"filename": "/data/PhotonEvaporation5.2/z80.a206", "start": 50623371, "end": 50625811}, {"filename": "/data/PhotonEvaporation5.2/z80.a207", "start": 50625811, "end": 50625850}, {"filename": "/data/PhotonEvaporation5.2/z80.a208", "start": 50625850, "end": 50626536}, {"filename": "/data/PhotonEvaporation5.2/z80.a209", "start": 50626536, "end": 50626575}, {"filename": "/data/PhotonEvaporation5.2/z80.a210", "start": 50626575, "end": 50627635}, {"filename": "/data/PhotonEvaporation5.2/z80.a211", "start": 50627635, "end": 50627674}, {"filename": "/data/PhotonEvaporation5.2/z80.a212", "start": 50627674, "end": 50627713}, {"filename": "/data/PhotonEvaporation5.2/z80.a213", "start": 50627713, "end": 50627752}, {"filename": "/data/PhotonEvaporation5.2/z80.a214", "start": 50627752, "end": 50627791}, {"filename": "/data/PhotonEvaporation5.2/z80.a215", "start": 50627791, "end": 50627830}, {"filename": "/data/PhotonEvaporation5.2/z80.a216", "start": 50627830, "end": 50627869}, {"filename": "/data/PhotonEvaporation5.2/z81.a176", "start": 50627869, "end": 50627908}, {"filename": "/data/PhotonEvaporation5.2/z81.a177", "start": 50627908, "end": 50627986}, {"filename": "/data/PhotonEvaporation5.2/z81.a178", "start": 50627986, "end": 50628025}, {"filename": "/data/PhotonEvaporation5.2/z81.a179", "start": 50628025, "end": 50628103}, {"filename": "/data/PhotonEvaporation5.2/z81.a180", "start": 50628103, "end": 50628142}, {"filename": "/data/PhotonEvaporation5.2/z81.a181", "start": 50628142, "end": 50634352}, {"filename": "/data/PhotonEvaporation5.2/z81.a182", "start": 50634352, "end": 50634830}, {"filename": "/data/PhotonEvaporation5.2/z81.a183", "start": 50634830, "end": 50636965}, {"filename": "/data/PhotonEvaporation5.2/z81.a184", "start": 50636965, "end": 50637817}, {"filename": "/data/PhotonEvaporation5.2/z81.a185", "start": 50637817, "end": 50641744}, {"filename": "/data/PhotonEvaporation5.2/z81.a186", "start": 50641744, "end": 50642822}, {"filename": "/data/PhotonEvaporation5.2/z81.a187", "start": 50642822, "end": 50651256}, {"filename": "/data/PhotonEvaporation5.2/z81.a188", "start": 50651256, "end": 50652682}, {"filename": "/data/PhotonEvaporation5.2/z81.a189", "start": 50652682, "end": 50676618}, {"filename": "/data/PhotonEvaporation5.2/z81.a190", "start": 50676618, "end": 50681872}, {"filename": "/data/PhotonEvaporation5.2/z81.a191", "start": 50681872, "end": 50701502}, {"filename": "/data/PhotonEvaporation5.2/z81.a192", "start": 50701502, "end": 50722491}, {"filename": "/data/PhotonEvaporation5.2/z81.a193", "start": 50722491, "end": 50747004}, {"filename": "/data/PhotonEvaporation5.2/z81.a194", "start": 50747004, "end": 50771134}, {"filename": "/data/PhotonEvaporation5.2/z81.a195", "start": 50771134, "end": 50787397}, {"filename": "/data/PhotonEvaporation5.2/z81.a196", "start": 50787397, "end": 50796088}, {"filename": "/data/PhotonEvaporation5.2/z81.a197", "start": 50796088, "end": 50815445}, {"filename": "/data/PhotonEvaporation5.2/z81.a198", "start": 50815445, "end": 50828701}, {"filename": "/data/PhotonEvaporation5.2/z81.a199", "start": 50828701, "end": 50837493}, {"filename": "/data/PhotonEvaporation5.2/z81.a200", "start": 50837493, "end": 50844528}, {"filename": "/data/PhotonEvaporation5.2/z81.a201", "start": 50844528, "end": 50857781}, {"filename": "/data/PhotonEvaporation5.2/z81.a202", "start": 50857781, "end": 50861407}, {"filename": "/data/PhotonEvaporation5.2/z81.a203", "start": 50861407, "end": 50877918}, {"filename": "/data/PhotonEvaporation5.2/z81.a204", "start": 50877918, "end": 50897737}, {"filename": "/data/PhotonEvaporation5.2/z81.a205", "start": 50897737, "end": 50917310}, {"filename": "/data/PhotonEvaporation5.2/z81.a206", "start": 50917310, "end": 50925460}, {"filename": "/data/PhotonEvaporation5.2/z81.a207", "start": 50925460, "end": 50931743}, {"filename": "/data/PhotonEvaporation5.2/z81.a208", "start": 50931743, "end": 50936215}, {"filename": "/data/PhotonEvaporation5.2/z81.a209", "start": 50936215, "end": 50936771}, {"filename": "/data/PhotonEvaporation5.2/z81.a210", "start": 50936771, "end": 50937301}, {"filename": "/data/PhotonEvaporation5.2/z81.a211", "start": 50937301, "end": 50937340}, {"filename": "/data/PhotonEvaporation5.2/z81.a212", "start": 50937340, "end": 50937379}, {"filename": "/data/PhotonEvaporation5.2/z81.a213", "start": 50937379, "end": 50937418}, {"filename": "/data/PhotonEvaporation5.2/z81.a214", "start": 50937418, "end": 50937457}, {"filename": "/data/PhotonEvaporation5.2/z81.a215", "start": 50937457, "end": 50937496}, {"filename": "/data/PhotonEvaporation5.2/z81.a216", "start": 50937496, "end": 50937535}, {"filename": "/data/PhotonEvaporation5.2/z81.a217", "start": 50937535, "end": 50937574}, {"filename": "/data/PhotonEvaporation5.2/z82.a178", "start": 50937574, "end": 50937613}, {"filename": "/data/PhotonEvaporation5.2/z82.a179", "start": 50937613, "end": 50937652}, {"filename": "/data/PhotonEvaporation5.2/z82.a180", "start": 50937652, "end": 50938439}, {"filename": "/data/PhotonEvaporation5.2/z82.a181", "start": 50938439, "end": 50938517}, {"filename": "/data/PhotonEvaporation5.2/z82.a182", "start": 50938517, "end": 50939678}, {"filename": "/data/PhotonEvaporation5.2/z82.a183", "start": 50939678, "end": 50939756}, {"filename": "/data/PhotonEvaporation5.2/z82.a184", "start": 50939756, "end": 50940630}, {"filename": "/data/PhotonEvaporation5.2/z82.a185", "start": 50940630, "end": 50940982}, {"filename": "/data/PhotonEvaporation5.2/z82.a186", "start": 50940982, "end": 50942504}, {"filename": "/data/PhotonEvaporation5.2/z82.a187", "start": 50942504, "end": 50943978}, {"filename": "/data/PhotonEvaporation5.2/z82.a188", "start": 50943978, "end": 50947771}, {"filename": "/data/PhotonEvaporation5.2/z82.a189", "start": 50947771, "end": 50951882}, {"filename": "/data/PhotonEvaporation5.2/z82.a190", "start": 50951882, "end": 50961726}, {"filename": "/data/PhotonEvaporation5.2/z82.a191", "start": 50961726, "end": 50972014}, {"filename": "/data/PhotonEvaporation5.2/z82.a192", "start": 50972014, "end": 50995095}, {"filename": "/data/PhotonEvaporation5.2/z82.a193", "start": 50995095, "end": 51036207}, {"filename": "/data/PhotonEvaporation5.2/z82.a194", "start": 51036207, "end": 51070710}, {"filename": "/data/PhotonEvaporation5.2/z82.a195", "start": 51070710, "end": 51097440}, {"filename": "/data/PhotonEvaporation5.2/z82.a196", "start": 51097440, "end": 51176451}, {"filename": "/data/PhotonEvaporation5.2/z82.a197", "start": 51176451, "end": 51221518}, {"filename": "/data/PhotonEvaporation5.2/z82.a198", "start": 51221518, "end": 51257510}, {"filename": "/data/PhotonEvaporation5.2/z82.a199", "start": 51257510, "end": 51294773}, {"filename": "/data/PhotonEvaporation5.2/z82.a200", "start": 51294773, "end": 51308383}, {"filename": "/data/PhotonEvaporation5.2/z82.a201", "start": 51308383, "end": 51341810}, {"filename": "/data/PhotonEvaporation5.2/z82.a202", "start": 51341810, "end": 51362434}, {"filename": "/data/PhotonEvaporation5.2/z82.a203", "start": 51362434, "end": 51389365}, {"filename": "/data/PhotonEvaporation5.2/z82.a204", "start": 51389365, "end": 51437328}, {"filename": "/data/PhotonEvaporation5.2/z82.a205", "start": 51437328, "end": 51472267}, {"filename": "/data/PhotonEvaporation5.2/z82.a206", "start": 51472267, "end": 51517454}, {"filename": "/data/PhotonEvaporation5.2/z82.a207", "start": 51517454, "end": 51546549}, {"filename": "/data/PhotonEvaporation5.2/z82.a208", "start": 51546549, "end": 51624962}, {"filename": "/data/PhotonEvaporation5.2/z82.a209", "start": 51624962, "end": 51638344}, {"filename": "/data/PhotonEvaporation5.2/z82.a210", "start": 51638344, "end": 51643674}, {"filename": "/data/PhotonEvaporation5.2/z82.a211", "start": 51643674, "end": 51647028}, {"filename": "/data/PhotonEvaporation5.2/z82.a212", "start": 51647028, "end": 51647956}, {"filename": "/data/PhotonEvaporation5.2/z82.a213", "start": 51647956, "end": 51647995}, {"filename": "/data/PhotonEvaporation5.2/z82.a214", "start": 51647995, "end": 51648681}, {"filename": "/data/PhotonEvaporation5.2/z82.a215", "start": 51648681, "end": 51648720}, {"filename": "/data/PhotonEvaporation5.2/z82.a216", "start": 51648720, "end": 51649406}, {"filename": "/data/PhotonEvaporation5.2/z82.a217", "start": 51649406, "end": 51649445}, {"filename": "/data/PhotonEvaporation5.2/z82.a218", "start": 51649445, "end": 51649484}, {"filename": "/data/PhotonEvaporation5.2/z82.a219", "start": 51649484, "end": 51649523}, {"filename": "/data/PhotonEvaporation5.2/z82.a220", "start": 51649523, "end": 51649562}, {"filename": "/data/PhotonEvaporation5.2/z83.a184", "start": 51649562, "end": 51649679}, {"filename": "/data/PhotonEvaporation5.2/z83.a185", "start": 51649679, "end": 51649718}, {"filename": "/data/PhotonEvaporation5.2/z83.a186", "start": 51649718, "end": 51649796}, {"filename": "/data/PhotonEvaporation5.2/z83.a187", "start": 51649796, "end": 51650709}, {"filename": "/data/PhotonEvaporation5.2/z83.a188", "start": 51650709, "end": 51650826}, {"filename": "/data/PhotonEvaporation5.2/z83.a189", "start": 51650826, "end": 51652548}, {"filename": "/data/PhotonEvaporation5.2/z83.a190", "start": 51652548, "end": 51652752}, {"filename": "/data/PhotonEvaporation5.2/z83.a191", "start": 51652752, "end": 51655545}, {"filename": "/data/PhotonEvaporation5.2/z83.a192", "start": 51655545, "end": 51655623}, {"filename": "/data/PhotonEvaporation5.2/z83.a193", "start": 51655623, "end": 51664323}, {"filename": "/data/PhotonEvaporation5.2/z83.a194", "start": 51664323, "end": 51664614}, {"filename": "/data/PhotonEvaporation5.2/z83.a195", "start": 51664614, "end": 51667654}, {"filename": "/data/PhotonEvaporation5.2/z83.a196", "start": 51667654, "end": 51669511}, {"filename": "/data/PhotonEvaporation5.2/z83.a197", "start": 51669511, "end": 51674582}, {"filename": "/data/PhotonEvaporation5.2/z83.a198", "start": 51674582, "end": 51684108}, {"filename": "/data/PhotonEvaporation5.2/z83.a199", "start": 51684108, "end": 51691563}, {"filename": "/data/PhotonEvaporation5.2/z83.a200", "start": 51691563, "end": 51696901}, {"filename": "/data/PhotonEvaporation5.2/z83.a201", "start": 51696901, "end": 51711973}, {"filename": "/data/PhotonEvaporation5.2/z83.a202", "start": 51711973, "end": 51720484}, {"filename": "/data/PhotonEvaporation5.2/z83.a203", "start": 51720484, "end": 51732783}, {"filename": "/data/PhotonEvaporation5.2/z83.a204", "start": 51732783, "end": 51743088}, {"filename": "/data/PhotonEvaporation5.2/z83.a205", "start": 51743088, "end": 51760453}, {"filename": "/data/PhotonEvaporation5.2/z83.a206", "start": 51760453, "end": 51774331}, {"filename": "/data/PhotonEvaporation5.2/z83.a207", "start": 51774331, "end": 51785668}, {"filename": "/data/PhotonEvaporation5.2/z83.a208", "start": 51785668, "end": 51834499}, {"filename": "/data/PhotonEvaporation5.2/z83.a209", "start": 51834499, "end": 51862546}, {"filename": "/data/PhotonEvaporation5.2/z83.a210", "start": 51862546, "end": 51917735}, {"filename": "/data/PhotonEvaporation5.2/z83.a211", "start": 51917735, "end": 51924152}, {"filename": "/data/PhotonEvaporation5.2/z83.a212", "start": 51924152, "end": 51925987}, {"filename": "/data/PhotonEvaporation5.2/z83.a213", "start": 51925987, "end": 51926574}, {"filename": "/data/PhotonEvaporation5.2/z83.a214", "start": 51926574, "end": 51930186}, {"filename": "/data/PhotonEvaporation5.2/z83.a215", "start": 51930186, "end": 51931542}, {"filename": "/data/PhotonEvaporation5.2/z83.a216", "start": 51931542, "end": 51931620}, {"filename": "/data/PhotonEvaporation5.2/z83.a217", "start": 51931620, "end": 51932493}, {"filename": "/data/PhotonEvaporation5.2/z83.a218", "start": 51932493, "end": 51932532}, {"filename": "/data/PhotonEvaporation5.2/z83.a219", "start": 51932532, "end": 51932571}, {"filename": "/data/PhotonEvaporation5.2/z83.a220", "start": 51932571, "end": 51932610}, {"filename": "/data/PhotonEvaporation5.2/z83.a221", "start": 51932610, "end": 51932649}, {"filename": "/data/PhotonEvaporation5.2/z83.a223", "start": 51932649, "end": 51932688}, {"filename": "/data/PhotonEvaporation5.2/z83.a224", "start": 51932688, "end": 51932727}, {"filename": "/data/PhotonEvaporation5.2/z84.a186", "start": 51932727, "end": 51932766}, {"filename": "/data/PhotonEvaporation5.2/z84.a187", "start": 51932766, "end": 51932805}, {"filename": "/data/PhotonEvaporation5.2/z84.a188", "start": 51932805, "end": 51932844}, {"filename": "/data/PhotonEvaporation5.2/z84.a189", "start": 51932844, "end": 51933070}, {"filename": "/data/PhotonEvaporation5.2/z84.a190", "start": 51933070, "end": 51934418}, {"filename": "/data/PhotonEvaporation5.2/z84.a191", "start": 51934418, "end": 51935244}, {"filename": "/data/PhotonEvaporation5.2/z84.a192", "start": 51935244, "end": 51936405}, {"filename": "/data/PhotonEvaporation5.2/z84.a193", "start": 51936405, "end": 51937801}, {"filename": "/data/PhotonEvaporation5.2/z84.a194", "start": 51937801, "end": 51941324}, {"filename": "/data/PhotonEvaporation5.2/z84.a195", "start": 51941324, "end": 51942711}, {"filename": "/data/PhotonEvaporation5.2/z84.a196", "start": 51942711, "end": 51947679}, {"filename": "/data/PhotonEvaporation5.2/z84.a197", "start": 51947679, "end": 51948357}, {"filename": "/data/PhotonEvaporation5.2/z84.a198", "start": 51948357, "end": 51958349}, {"filename": "/data/PhotonEvaporation5.2/z84.a199", "start": 51958349, "end": 51962022}, {"filename": "/data/PhotonEvaporation5.2/z84.a200", "start": 51962022, "end": 51969342}, {"filename": "/data/PhotonEvaporation5.2/z84.a201", "start": 51969342, "end": 51972447}, {"filename": "/data/PhotonEvaporation5.2/z84.a202", "start": 51972447, "end": 51980341}, {"filename": "/data/PhotonEvaporation5.2/z84.a203", "start": 51980341, "end": 51991290}, {"filename": "/data/PhotonEvaporation5.2/z84.a204", "start": 51991290, "end": 52006075}, {"filename": "/data/PhotonEvaporation5.2/z84.a205", "start": 52006075, "end": 52026568}, {"filename": "/data/PhotonEvaporation5.2/z84.a206", "start": 52026568, "end": 52047741}, {"filename": "/data/PhotonEvaporation5.2/z84.a207", "start": 52047741, "end": 52074533}, {"filename": "/data/PhotonEvaporation5.2/z84.a208", "start": 52074533, "end": 52105053}, {"filename": "/data/PhotonEvaporation5.2/z84.a209", "start": 52105053, "end": 52117113}, {"filename": "/data/PhotonEvaporation5.2/z84.a210", "start": 52117113, "end": 52146422}, {"filename": "/data/PhotonEvaporation5.2/z84.a211", "start": 52146422, "end": 52158650}, {"filename": "/data/PhotonEvaporation5.2/z84.a212", "start": 52158650, "end": 52163247}, {"filename": "/data/PhotonEvaporation5.2/z84.a213", "start": 52163247, "end": 52165601}, {"filename": "/data/PhotonEvaporation5.2/z84.a214", "start": 52165601, "end": 52207560}, {"filename": "/data/PhotonEvaporation5.2/z84.a215", "start": 52207560, "end": 52212682}, {"filename": "/data/PhotonEvaporation5.2/z84.a216", "start": 52212682, "end": 52213991}, {"filename": "/data/PhotonEvaporation5.2/z84.a217", "start": 52213991, "end": 52214404}, {"filename": "/data/PhotonEvaporation5.2/z84.a218", "start": 52214404, "end": 52216648}, {"filename": "/data/PhotonEvaporation5.2/z84.a219", "start": 52216648, "end": 52216687}, {"filename": "/data/PhotonEvaporation5.2/z84.a220", "start": 52216687, "end": 52216726}, {"filename": "/data/PhotonEvaporation5.2/z84.a221", "start": 52216726, "end": 52216765}, {"filename": "/data/PhotonEvaporation5.2/z84.a222", "start": 52216765, "end": 52216804}, {"filename": "/data/PhotonEvaporation5.2/z84.a223", "start": 52216804, "end": 52216843}, {"filename": "/data/PhotonEvaporation5.2/z84.a224", "start": 52216843, "end": 52216882}, {"filename": "/data/PhotonEvaporation5.2/z84.a225", "start": 52216882, "end": 52216921}, {"filename": "/data/PhotonEvaporation5.2/z84.a226", "start": 52216921, "end": 52216960}, {"filename": "/data/PhotonEvaporation5.2/z84.a227", "start": 52216960, "end": 52216999}, {"filename": "/data/PhotonEvaporation5.2/z85.a191", "start": 52216999, "end": 52217077}, {"filename": "/data/PhotonEvaporation5.2/z85.a192", "start": 52217077, "end": 52217194}, {"filename": "/data/PhotonEvaporation5.2/z85.a193", "start": 52217194, "end": 52217311}, {"filename": "/data/PhotonEvaporation5.2/z85.a194", "start": 52217311, "end": 52217428}, {"filename": "/data/PhotonEvaporation5.2/z85.a195", "start": 52217428, "end": 52219903}, {"filename": "/data/PhotonEvaporation5.2/z85.a196", "start": 52219903, "end": 52220129}, {"filename": "/data/PhotonEvaporation5.2/z85.a197", "start": 52220129, "end": 52220581}, {"filename": "/data/PhotonEvaporation5.2/z85.a198", "start": 52220581, "end": 52220659}, {"filename": "/data/PhotonEvaporation5.2/z85.a199", "start": 52220659, "end": 52220924}, {"filename": "/data/PhotonEvaporation5.2/z85.a200", "start": 52220924, "end": 52221376}, {"filename": "/data/PhotonEvaporation5.2/z85.a201", "start": 52221376, "end": 52222759}, {"filename": "/data/PhotonEvaporation5.2/z85.a202", "start": 52222759, "end": 52223024}, {"filename": "/data/PhotonEvaporation5.2/z85.a203", "start": 52223024, "end": 52226643}, {"filename": "/data/PhotonEvaporation5.2/z85.a204", "start": 52226643, "end": 52228152}, {"filename": "/data/PhotonEvaporation5.2/z85.a205", "start": 52228152, "end": 52235247}, {"filename": "/data/PhotonEvaporation5.2/z85.a206", "start": 52235247, "end": 52239158}, {"filename": "/data/PhotonEvaporation5.2/z85.a207", "start": 52239158, "end": 52246999}, {"filename": "/data/PhotonEvaporation5.2/z85.a208", "start": 52246999, "end": 52261896}, {"filename": "/data/PhotonEvaporation5.2/z85.a209", "start": 52261896, "end": 52275925}, {"filename": "/data/PhotonEvaporation5.2/z85.a210", "start": 52275925, "end": 52307049}, {"filename": "/data/PhotonEvaporation5.2/z85.a211", "start": 52307049, "end": 52328541}, {"filename": "/data/PhotonEvaporation5.2/z85.a212", "start": 52328541, "end": 52343001}, {"filename": "/data/PhotonEvaporation5.2/z85.a213", "start": 52343001, "end": 52345371}, {"filename": "/data/PhotonEvaporation5.2/z85.a214", "start": 52345371, "end": 52347966}, {"filename": "/data/PhotonEvaporation5.2/z85.a215", "start": 52347966, "end": 52349127}, {"filename": "/data/PhotonEvaporation5.2/z85.a216", "start": 52349127, "end": 52353752}, {"filename": "/data/PhotonEvaporation5.2/z85.a217", "start": 52353752, "end": 52357176}, {"filename": "/data/PhotonEvaporation5.2/z85.a218", "start": 52357176, "end": 52357215}, {"filename": "/data/PhotonEvaporation5.2/z85.a219", "start": 52357215, "end": 52357254}, {"filename": "/data/PhotonEvaporation5.2/z85.a220", "start": 52357254, "end": 52357293}, {"filename": "/data/PhotonEvaporation5.2/z85.a221", "start": 52357293, "end": 52357332}, {"filename": "/data/PhotonEvaporation5.2/z85.a222", "start": 52357332, "end": 52357371}, {"filename": "/data/PhotonEvaporation5.2/z85.a223", "start": 52357371, "end": 52357410}, {"filename": "/data/PhotonEvaporation5.2/z85.a224", "start": 52357410, "end": 52357449}, {"filename": "/data/PhotonEvaporation5.2/z85.a225", "start": 52357449, "end": 52357488}, {"filename": "/data/PhotonEvaporation5.2/z85.a226", "start": 52357488, "end": 52357527}, {"filename": "/data/PhotonEvaporation5.2/z85.a227", "start": 52357527, "end": 52357566}, {"filename": "/data/PhotonEvaporation5.2/z85.a228", "start": 52357566, "end": 52357605}, {"filename": "/data/PhotonEvaporation5.2/z85.a229", "start": 52357605, "end": 52357644}, {"filename": "/data/PhotonEvaporation5.2/z86.a193", "start": 52357644, "end": 52357683}, {"filename": "/data/PhotonEvaporation5.2/z86.a194", "start": 52357683, "end": 52357722}, {"filename": "/data/PhotonEvaporation5.2/z86.a195", "start": 52357722, "end": 52357800}, {"filename": "/data/PhotonEvaporation5.2/z86.a196", "start": 52357800, "end": 52357839}, {"filename": "/data/PhotonEvaporation5.2/z86.a197", "start": 52357839, "end": 52357917}, {"filename": "/data/PhotonEvaporation5.2/z86.a198", "start": 52357917, "end": 52358891}, {"filename": "/data/PhotonEvaporation5.2/z86.a199", "start": 52358891, "end": 52358969}, {"filename": "/data/PhotonEvaporation5.2/z86.a200", "start": 52358969, "end": 52360430}, {"filename": "/data/PhotonEvaporation5.2/z86.a201", "start": 52360430, "end": 52360508}, {"filename": "/data/PhotonEvaporation5.2/z86.a202", "start": 52360508, "end": 52362913}, {"filename": "/data/PhotonEvaporation5.2/z86.a203", "start": 52362913, "end": 52365518}, {"filename": "/data/PhotonEvaporation5.2/z86.a204", "start": 52365518, "end": 52374553}, {"filename": "/data/PhotonEvaporation5.2/z86.a205", "start": 52374553, "end": 52379511}, {"filename": "/data/PhotonEvaporation5.2/z86.a206", "start": 52379511, "end": 52382460}, {"filename": "/data/PhotonEvaporation5.2/z86.a207", "start": 52382460, "end": 52385313}, {"filename": "/data/PhotonEvaporation5.2/z86.a208", "start": 52385313, "end": 52394130}, {"filename": "/data/PhotonEvaporation5.2/z86.a209", "start": 52394130, "end": 52401220}, {"filename": "/data/PhotonEvaporation5.2/z86.a210", "start": 52401220, "end": 52416046}, {"filename": "/data/PhotonEvaporation5.2/z86.a211", "start": 52416046, "end": 52427446}, {"filename": "/data/PhotonEvaporation5.2/z86.a212", "start": 52427446, "end": 52434379}, {"filename": "/data/PhotonEvaporation5.2/z86.a213", "start": 52434379, "end": 52444960}, {"filename": "/data/PhotonEvaporation5.2/z86.a214", "start": 52444960, "end": 52452455}, {"filename": "/data/PhotonEvaporation5.2/z86.a215", "start": 52452455, "end": 52456065}, {"filename": "/data/PhotonEvaporation5.2/z86.a216", "start": 52456065, "end": 52460428}, {"filename": "/data/PhotonEvaporation5.2/z86.a217", "start": 52460428, "end": 52462752}, {"filename": "/data/PhotonEvaporation5.2/z86.a218", "start": 52462752, "end": 52468128}, {"filename": "/data/PhotonEvaporation5.2/z86.a219", "start": 52468128, "end": 52478077}, {"filename": "/data/PhotonEvaporation5.2/z86.a220", "start": 52478077, "end": 52482635}, {"filename": "/data/PhotonEvaporation5.2/z86.a221", "start": 52482635, "end": 52482713}, {"filename": "/data/PhotonEvaporation5.2/z86.a222", "start": 52482713, "end": 52487489}, {"filename": "/data/PhotonEvaporation5.2/z86.a223", "start": 52487489, "end": 52487528}, {"filename": "/data/PhotonEvaporation5.2/z86.a224", "start": 52487528, "end": 52487567}, {"filename": "/data/PhotonEvaporation5.2/z86.a225", "start": 52487567, "end": 52487606}, {"filename": "/data/PhotonEvaporation5.2/z86.a226", "start": 52487606, "end": 52487645}, {"filename": "/data/PhotonEvaporation5.2/z86.a227", "start": 52487645, "end": 52487684}, {"filename": "/data/PhotonEvaporation5.2/z86.a228", "start": 52487684, "end": 52487723}, {"filename": "/data/PhotonEvaporation5.2/z86.a229", "start": 52487723, "end": 52487762}, {"filename": "/data/PhotonEvaporation5.2/z87.a199", "start": 52487762, "end": 52487801}, {"filename": "/data/PhotonEvaporation5.2/z87.a200", "start": 52487801, "end": 52487840}, {"filename": "/data/PhotonEvaporation5.2/z87.a201", "start": 52487840, "end": 52487918}, {"filename": "/data/PhotonEvaporation5.2/z87.a202", "start": 52487918, "end": 52487996}, {"filename": "/data/PhotonEvaporation5.2/z87.a203", "start": 52487996, "end": 52488035}, {"filename": "/data/PhotonEvaporation5.2/z87.a204", "start": 52488035, "end": 52488152}, {"filename": "/data/PhotonEvaporation5.2/z87.a205", "start": 52488152, "end": 52488191}, {"filename": "/data/PhotonEvaporation5.2/z87.a206", "start": 52488191, "end": 52488456}, {"filename": "/data/PhotonEvaporation5.2/z87.a207", "start": 52488456, "end": 52489143}, {"filename": "/data/PhotonEvaporation5.2/z87.a208", "start": 52489143, "end": 52489556}, {"filename": "/data/PhotonEvaporation5.2/z87.a209", "start": 52489556, "end": 52489595}, {"filename": "/data/PhotonEvaporation5.2/z87.a210", "start": 52489595, "end": 52495365}, {"filename": "/data/PhotonEvaporation5.2/z87.a211", "start": 52495365, "end": 52501294}, {"filename": "/data/PhotonEvaporation5.2/z87.a212", "start": 52501294, "end": 52509386}, {"filename": "/data/PhotonEvaporation5.2/z87.a213", "start": 52509386, "end": 52518140}, {"filename": "/data/PhotonEvaporation5.2/z87.a214", "start": 52518140, "end": 52529977}, {"filename": "/data/PhotonEvaporation5.2/z87.a215", "start": 52529977, "end": 52534888}, {"filename": "/data/PhotonEvaporation5.2/z87.a216", "start": 52534888, "end": 52541528}, {"filename": "/data/PhotonEvaporation5.2/z87.a217", "start": 52541528, "end": 52544829}, {"filename": "/data/PhotonEvaporation5.2/z87.a218", "start": 52544829, "end": 52549738}, {"filename": "/data/PhotonEvaporation5.2/z87.a219", "start": 52549738, "end": 52558047}, {"filename": "/data/PhotonEvaporation5.2/z87.a220", "start": 52558047, "end": 52568232}, {"filename": "/data/PhotonEvaporation5.2/z87.a221", "start": 52568232, "end": 52584251}, {"filename": "/data/PhotonEvaporation5.2/z87.a222", "start": 52584251, "end": 52584329}, {"filename": "/data/PhotonEvaporation5.2/z87.a223", "start": 52584329, "end": 52607786}, {"filename": "/data/PhotonEvaporation5.2/z87.a224", "start": 52607786, "end": 52607825}, {"filename": "/data/PhotonEvaporation5.2/z87.a225", "start": 52607825, "end": 52638703}, {"filename": "/data/PhotonEvaporation5.2/z87.a226", "start": 52638703, "end": 52638742}, {"filename": "/data/PhotonEvaporation5.2/z87.a227", "start": 52638742, "end": 52652987}, {"filename": "/data/PhotonEvaporation5.2/z87.a228", "start": 52652987, "end": 52653026}, {"filename": "/data/PhotonEvaporation5.2/z87.a229", "start": 52653026, "end": 52653065}, {"filename": "/data/PhotonEvaporation5.2/z87.a230", "start": 52653065, "end": 52653104}, {"filename": "/data/PhotonEvaporation5.2/z87.a231", "start": 52653104, "end": 52653143}, {"filename": "/data/PhotonEvaporation5.2/z87.a232", "start": 52653143, "end": 52653182}, {"filename": "/data/PhotonEvaporation5.2/z87.a233", "start": 52653182, "end": 52653221}, {"filename": "/data/PhotonEvaporation5.2/z88.a201", "start": 52653221, "end": 52653299}, {"filename": "/data/PhotonEvaporation5.2/z88.a202", "start": 52653299, "end": 52653338}, {"filename": "/data/PhotonEvaporation5.2/z88.a203", "start": 52653338, "end": 52653416}, {"filename": "/data/PhotonEvaporation5.2/z88.a204", "start": 52653416, "end": 52653455}, {"filename": "/data/PhotonEvaporation5.2/z88.a205", "start": 52653455, "end": 52653533}, {"filename": "/data/PhotonEvaporation5.2/z88.a206", "start": 52653533, "end": 52654320}, {"filename": "/data/PhotonEvaporation5.2/z88.a207", "start": 52654320, "end": 52654398}, {"filename": "/data/PhotonEvaporation5.2/z88.a208", "start": 52654398, "end": 52655855}, {"filename": "/data/PhotonEvaporation5.2/z88.a209", "start": 52655855, "end": 52655894}, {"filename": "/data/PhotonEvaporation5.2/z88.a210", "start": 52655894, "end": 52658434}, {"filename": "/data/PhotonEvaporation5.2/z88.a211", "start": 52658434, "end": 52659556}, {"filename": "/data/PhotonEvaporation5.2/z88.a212", "start": 52659556, "end": 52661770}, {"filename": "/data/PhotonEvaporation5.2/z88.a213", "start": 52661770, "end": 52662596}, {"filename": "/data/PhotonEvaporation5.2/z88.a214", "start": 52662596, "end": 52674093}, {"filename": "/data/PhotonEvaporation5.2/z88.a215", "start": 52674093, "end": 52681583}, {"filename": "/data/PhotonEvaporation5.2/z88.a216", "start": 52681583, "end": 52685197}, {"filename": "/data/PhotonEvaporation5.2/z88.a217", "start": 52685197, "end": 52692305}, {"filename": "/data/PhotonEvaporation5.2/z88.a218", "start": 52692305, "end": 52707006}, {"filename": "/data/PhotonEvaporation5.2/z88.a219", "start": 52707006, "end": 52720157}, {"filename": "/data/PhotonEvaporation5.2/z88.a220", "start": 52720157, "end": 52729841}, {"filename": "/data/PhotonEvaporation5.2/z88.a221", "start": 52729841, "end": 52738481}, {"filename": "/data/PhotonEvaporation5.2/z88.a222", "start": 52738481, "end": 52752361}, {"filename": "/data/PhotonEvaporation5.2/z88.a223", "start": 52752361, "end": 52783831}, {"filename": "/data/PhotonEvaporation5.2/z88.a224", "start": 52783831, "end": 52799930}, {"filename": "/data/PhotonEvaporation5.2/z88.a225", "start": 52799930, "end": 52824763}, {"filename": "/data/PhotonEvaporation5.2/z88.a226", "start": 52824763, "end": 52841158}, {"filename": "/data/PhotonEvaporation5.2/z88.a227", "start": 52841158, "end": 52857941}, {"filename": "/data/PhotonEvaporation5.2/z88.a228", "start": 52857941, "end": 52877330}, {"filename": "/data/PhotonEvaporation5.2/z88.a229", "start": 52877330, "end": 52886337}, {"filename": "/data/PhotonEvaporation5.2/z88.a230", "start": 52886337, "end": 52894375}, {"filename": "/data/PhotonEvaporation5.2/z88.a231", "start": 52894375, "end": 52901216}, {"filename": "/data/PhotonEvaporation5.2/z88.a232", "start": 52901216, "end": 52902077}, {"filename": "/data/PhotonEvaporation5.2/z88.a233", "start": 52902077, "end": 52902116}, {"filename": "/data/PhotonEvaporation5.2/z88.a234", "start": 52902116, "end": 52902155}, {"filename": "/data/PhotonEvaporation5.2/z89.a206", "start": 52902155, "end": 52902233}, {"filename": "/data/PhotonEvaporation5.2/z89.a207", "start": 52902233, "end": 52902272}, {"filename": "/data/PhotonEvaporation5.2/z89.a208", "start": 52902272, "end": 52902350}, {"filename": "/data/PhotonEvaporation5.2/z89.a209", "start": 52902350, "end": 52902389}, {"filename": "/data/PhotonEvaporation5.2/z89.a210", "start": 52902389, "end": 52902428}, {"filename": "/data/PhotonEvaporation5.2/z89.a211", "start": 52902428, "end": 52902467}, {"filename": "/data/PhotonEvaporation5.2/z89.a212", "start": 52902467, "end": 52902632}, {"filename": "/data/PhotonEvaporation5.2/z89.a213", "start": 52902632, "end": 52903106}, {"filename": "/data/PhotonEvaporation5.2/z89.a214", "start": 52903106, "end": 52903232}, {"filename": "/data/PhotonEvaporation5.2/z89.a215", "start": 52903232, "end": 52904105}, {"filename": "/data/PhotonEvaporation5.2/z89.a216", "start": 52904105, "end": 52904309}, {"filename": "/data/PhotonEvaporation5.2/z89.a217", "start": 52904309, "end": 52906810}, {"filename": "/data/PhotonEvaporation5.2/z89.a218", "start": 52906810, "end": 52914845}, {"filename": "/data/PhotonEvaporation5.2/z89.a219", "start": 52914845, "end": 52926756}, {"filename": "/data/PhotonEvaporation5.2/z89.a220", "start": 52926756, "end": 52943161}, {"filename": "/data/PhotonEvaporation5.2/z89.a221", "start": 52943161, "end": 52953437}, {"filename": "/data/PhotonEvaporation5.2/z89.a222", "start": 52953437, "end": 52953593}, {"filename": "/data/PhotonEvaporation5.2/z89.a223", "start": 52953593, "end": 52957622}, {"filename": "/data/PhotonEvaporation5.2/z89.a224", "start": 52957622, "end": 52964560}, {"filename": "/data/PhotonEvaporation5.2/z89.a225", "start": 52964560, "end": 52969959}, {"filename": "/data/PhotonEvaporation5.2/z89.a226", "start": 52969959, "end": 52970661}, {"filename": "/data/PhotonEvaporation5.2/z89.a227", "start": 52970661, "end": 52985659}, {"filename": "/data/PhotonEvaporation5.2/z89.a228", "start": 52985659, "end": 52986594}, {"filename": "/data/PhotonEvaporation5.2/z89.a229", "start": 52986594, "end": 52990032}, {"filename": "/data/PhotonEvaporation5.2/z89.a230", "start": 52990032, "end": 52995593}, {"filename": "/data/PhotonEvaporation5.2/z89.a231", "start": 52995593, "end": 53011056}, {"filename": "/data/PhotonEvaporation5.2/z89.a232", "start": 53011056, "end": 53011700}, {"filename": "/data/PhotonEvaporation5.2/z89.a233", "start": 53011700, "end": 53011739}, {"filename": "/data/PhotonEvaporation5.2/z89.a234", "start": 53011739, "end": 53011778}, {"filename": "/data/PhotonEvaporation5.2/z89.a235", "start": 53011778, "end": 53011817}, {"filename": "/data/PhotonEvaporation5.2/z9.a14", "start": 53011817, "end": 53011973}, {"filename": "/data/PhotonEvaporation5.2/z9.a15", "start": 53011973, "end": 53012051}, {"filename": "/data/PhotonEvaporation5.2/z9.a16", "start": 53012051, "end": 53013143}, {"filename": "/data/PhotonEvaporation5.2/z9.a17", "start": 53013143, "end": 53016638}, {"filename": "/data/PhotonEvaporation5.2/z9.a18", "start": 53016638, "end": 53045703}, {"filename": "/data/PhotonEvaporation5.2/z9.a19", "start": 53045703, "end": 53088388}, {"filename": "/data/PhotonEvaporation5.2/z9.a20", "start": 53088388, "end": 53111143}, {"filename": "/data/PhotonEvaporation5.2/z9.a21", "start": 53111143, "end": 53114250}, {"filename": "/data/PhotonEvaporation5.2/z9.a22", "start": 53114250, "end": 53115844}, {"filename": "/data/PhotonEvaporation5.2/z9.a23", "start": 53115844, "end": 53117218}, {"filename": "/data/PhotonEvaporation5.2/z9.a24", "start": 53117218, "end": 53117779}, {"filename": "/data/PhotonEvaporation5.2/z9.a25", "start": 53117779, "end": 53118414}, {"filename": "/data/PhotonEvaporation5.2/z9.a26", "start": 53118414, "end": 53118640}, {"filename": "/data/PhotonEvaporation5.2/z9.a27", "start": 53118640, "end": 53119092}, {"filename": "/data/PhotonEvaporation5.2/z9.a28", "start": 53119092, "end": 53119170}, {"filename": "/data/PhotonEvaporation5.2/z9.a29", "start": 53119170, "end": 53119209}, {"filename": "/data/PhotonEvaporation5.2/z9.a30", "start": 53119209, "end": 53119248}, {"filename": "/data/PhotonEvaporation5.2/z90.a208", "start": 53119248, "end": 53119287}, {"filename": "/data/PhotonEvaporation5.2/z90.a209", "start": 53119287, "end": 53119326}, {"filename": "/data/PhotonEvaporation5.2/z90.a210", "start": 53119326, "end": 53119365}, {"filename": "/data/PhotonEvaporation5.2/z90.a211", "start": 53119365, "end": 53119404}, {"filename": "/data/PhotonEvaporation5.2/z90.a212", "start": 53119404, "end": 53119443}, {"filename": "/data/PhotonEvaporation5.2/z90.a213", "start": 53119443, "end": 53119482}, {"filename": "/data/PhotonEvaporation5.2/z90.a214", "start": 53119482, "end": 53120269}, {"filename": "/data/PhotonEvaporation5.2/z90.a215", "start": 53120269, "end": 53120668}, {"filename": "/data/PhotonEvaporation5.2/z90.a216", "start": 53120668, "end": 53122538}, {"filename": "/data/PhotonEvaporation5.2/z90.a217", "start": 53122538, "end": 53122764}, {"filename": "/data/PhotonEvaporation5.2/z90.a218", "start": 53122764, "end": 53123738}, {"filename": "/data/PhotonEvaporation5.2/z90.a219", "start": 53123738, "end": 53127914}, {"filename": "/data/PhotonEvaporation5.2/z90.a220", "start": 53127914, "end": 53137515}, {"filename": "/data/PhotonEvaporation5.2/z90.a221", "start": 53137515, "end": 53141317}, {"filename": "/data/PhotonEvaporation5.2/z90.a222", "start": 53141317, "end": 53149139}, {"filename": "/data/PhotonEvaporation5.2/z90.a223", "start": 53149139, "end": 53158667}, {"filename": "/data/PhotonEvaporation5.2/z90.a224", "start": 53158667, "end": 53163696}, {"filename": "/data/PhotonEvaporation5.2/z90.a225", "start": 53163696, "end": 53172936}, {"filename": "/data/PhotonEvaporation5.2/z90.a226", "start": 53172936, "end": 53179387}, {"filename": "/data/PhotonEvaporation5.2/z90.a227", "start": 53179387, "end": 53192325}, {"filename": "/data/PhotonEvaporation5.2/z90.a228", "start": 53192325, "end": 53287273}, {"filename": "/data/PhotonEvaporation5.2/z90.a229", "start": 53287273, "end": 53330407}, {"filename": "/data/PhotonEvaporation5.2/z90.a230", "start": 53330407, "end": 53367335}, {"filename": "/data/PhotonEvaporation5.2/z90.a231", "start": 53367335, "end": 53403057}, {"filename": "/data/PhotonEvaporation5.2/z90.a232", "start": 53403057, "end": 53429364}, {"filename": "/data/PhotonEvaporation5.2/z90.a233", "start": 53429364, "end": 53462969}, {"filename": "/data/PhotonEvaporation5.2/z90.a234", "start": 53462969, "end": 53468545}, {"filename": "/data/PhotonEvaporation5.2/z90.a235", "start": 53468545, "end": 53468584}, {"filename": "/data/PhotonEvaporation5.2/z90.a236", "start": 53468584, "end": 53468623}, {"filename": "/data/PhotonEvaporation5.2/z90.a237", "start": 53468623, "end": 53468662}, {"filename": "/data/PhotonEvaporation5.2/z90.a238", "start": 53468662, "end": 53468701}, {"filename": "/data/PhotonEvaporation5.2/z91.a212", "start": 53468701, "end": 53468740}, {"filename": "/data/PhotonEvaporation5.2/z91.a213", "start": 53468740, "end": 53468779}, {"filename": "/data/PhotonEvaporation5.2/z91.a214", "start": 53468779, "end": 53468818}, {"filename": "/data/PhotonEvaporation5.2/z91.a215", "start": 53468818, "end": 53468857}, {"filename": "/data/PhotonEvaporation5.2/z91.a216", "start": 53468857, "end": 53468896}, {"filename": "/data/PhotonEvaporation5.2/z91.a217", "start": 53468896, "end": 53468974}, {"filename": "/data/PhotonEvaporation5.2/z91.a218", "start": 53468974, "end": 53469013}, {"filename": "/data/PhotonEvaporation5.2/z91.a219", "start": 53469013, "end": 53469091}, {"filename": "/data/PhotonEvaporation5.2/z91.a220", "start": 53469091, "end": 53469169}, {"filename": "/data/PhotonEvaporation5.2/z91.a221", "start": 53469169, "end": 53469208}, {"filename": "/data/PhotonEvaporation5.2/z91.a222", "start": 53469208, "end": 53469325}, {"filename": "/data/PhotonEvaporation5.2/z91.a223", "start": 53469325, "end": 53469403}, {"filename": "/data/PhotonEvaporation5.2/z91.a224", "start": 53469403, "end": 53469442}, {"filename": "/data/PhotonEvaporation5.2/z91.a225", "start": 53469442, "end": 53469481}, {"filename": "/data/PhotonEvaporation5.2/z91.a226", "start": 53469481, "end": 53469559}, {"filename": "/data/PhotonEvaporation5.2/z91.a227", "start": 53469559, "end": 53469598}, {"filename": "/data/PhotonEvaporation5.2/z91.a228", "start": 53469598, "end": 53469637}, {"filename": "/data/PhotonEvaporation5.2/z91.a229", "start": 53469637, "end": 53477963}, {"filename": "/data/PhotonEvaporation5.2/z91.a230", "start": 53477963, "end": 53481317}, {"filename": "/data/PhotonEvaporation5.2/z91.a231", "start": 53481317, "end": 53503327}, {"filename": "/data/PhotonEvaporation5.2/z91.a232", "start": 53503327, "end": 53503366}, {"filename": "/data/PhotonEvaporation5.2/z91.a233", "start": 53503366, "end": 53527892}, {"filename": "/data/PhotonEvaporation5.2/z91.a234", "start": 53527892, "end": 53529780}, {"filename": "/data/PhotonEvaporation5.2/z91.a235", "start": 53529780, "end": 53531727}, {"filename": "/data/PhotonEvaporation5.2/z91.a236", "start": 53531727, "end": 53533376}, {"filename": "/data/PhotonEvaporation5.2/z91.a237", "start": 53533376, "end": 53534195}, {"filename": "/data/PhotonEvaporation5.2/z91.a238", "start": 53534195, "end": 53534234}, {"filename": "/data/PhotonEvaporation5.2/z91.a239", "start": 53534234, "end": 53534273}, {"filename": "/data/PhotonEvaporation5.2/z92.a217", "start": 53534273, "end": 53534312}, {"filename": "/data/PhotonEvaporation5.2/z92.a218", "start": 53534312, "end": 53534390}, {"filename": "/data/PhotonEvaporation5.2/z92.a219", "start": 53534390, "end": 53534429}, {"filename": "/data/PhotonEvaporation5.2/z92.a221", "start": 53534429, "end": 53534468}, {"filename": "/data/PhotonEvaporation5.2/z92.a222", "start": 53534468, "end": 53534507}, {"filename": "/data/PhotonEvaporation5.2/z92.a223", "start": 53534507, "end": 53534546}, {"filename": "/data/PhotonEvaporation5.2/z92.a224", "start": 53534546, "end": 53534585}, {"filename": "/data/PhotonEvaporation5.2/z92.a225", "start": 53534585, "end": 53534624}, {"filename": "/data/PhotonEvaporation5.2/z92.a226", "start": 53534624, "end": 53538091}, {"filename": "/data/PhotonEvaporation5.2/z92.a227", "start": 53538091, "end": 53538130}, {"filename": "/data/PhotonEvaporation5.2/z92.a228", "start": 53538130, "end": 53538208}, {"filename": "/data/PhotonEvaporation5.2/z92.a229", "start": 53538208, "end": 53538286}, {"filename": "/data/PhotonEvaporation5.2/z92.a230", "start": 53538286, "end": 53543101}, {"filename": "/data/PhotonEvaporation5.2/z92.a231", "start": 53543101, "end": 53544041}, {"filename": "/data/PhotonEvaporation5.2/z92.a232", "start": 53544041, "end": 53557720}, {"filename": "/data/PhotonEvaporation5.2/z92.a233", "start": 53557720, "end": 53587563}, {"filename": "/data/PhotonEvaporation5.2/z92.a234", "start": 53587563, "end": 53656962}, {"filename": "/data/PhotonEvaporation5.2/z92.a235", "start": 53656962, "end": 53732917}, {"filename": "/data/PhotonEvaporation5.2/z92.a236", "start": 53732917, "end": 53756683}, {"filename": "/data/PhotonEvaporation5.2/z92.a237", "start": 53756683, "end": 53801336}, {"filename": "/data/PhotonEvaporation5.2/z92.a238", "start": 53801336, "end": 53850823}, {"filename": "/data/PhotonEvaporation5.2/z92.a239", "start": 53850823, "end": 53866523}, {"filename": "/data/PhotonEvaporation5.2/z92.a240", "start": 53866523, "end": 53869453}, {"filename": "/data/PhotonEvaporation5.2/z92.a242", "start": 53869453, "end": 53869492}, {"filename": "/data/PhotonEvaporation5.2/z93.a225", "start": 53869492, "end": 53869531}, {"filename": "/data/PhotonEvaporation5.2/z93.a226", "start": 53869531, "end": 53869570}, {"filename": "/data/PhotonEvaporation5.2/z93.a227", "start": 53869570, "end": 53869609}, {"filename": "/data/PhotonEvaporation5.2/z93.a228", "start": 53869609, "end": 53869648}, {"filename": "/data/PhotonEvaporation5.2/z93.a229", "start": 53869648, "end": 53869687}, {"filename": "/data/PhotonEvaporation5.2/z93.a230", "start": 53869687, "end": 53869726}, {"filename": "/data/PhotonEvaporation5.2/z93.a231", "start": 53869726, "end": 53869765}, {"filename": "/data/PhotonEvaporation5.2/z93.a232", "start": 53869765, "end": 53869843}, {"filename": "/data/PhotonEvaporation5.2/z93.a233", "start": 53869843, "end": 53871728}, {"filename": "/data/PhotonEvaporation5.2/z93.a234", "start": 53871728, "end": 53871806}, {"filename": "/data/PhotonEvaporation5.2/z93.a235", "start": 53871806, "end": 53880043}, {"filename": "/data/PhotonEvaporation5.2/z93.a236", "start": 53880043, "end": 53880238}, {"filename": "/data/PhotonEvaporation5.2/z93.a237", "start": 53880238, "end": 53912372}, {"filename": "/data/PhotonEvaporation5.2/z93.a238", "start": 53912372, "end": 53937126}, {"filename": "/data/PhotonEvaporation5.2/z93.a239", "start": 53937126, "end": 53954109}, {"filename": "/data/PhotonEvaporation5.2/z93.a240", "start": 53954109, "end": 53956006}, {"filename": "/data/PhotonEvaporation5.2/z93.a241", "start": 53956006, "end": 53956045}, {"filename": "/data/PhotonEvaporation5.2/z93.a242", "start": 53956045, "end": 53957837}, {"filename": "/data/PhotonEvaporation5.2/z93.a243", "start": 53957837, "end": 53958734}, {"filename": "/data/PhotonEvaporation5.2/z93.a244", "start": 53958734, "end": 53958773}, {"filename": "/data/PhotonEvaporation5.2/z94.a228", "start": 53958773, "end": 53958812}, {"filename": "/data/PhotonEvaporation5.2/z94.a229", "start": 53958812, "end": 53958851}, {"filename": "/data/PhotonEvaporation5.2/z94.a230", "start": 53958851, "end": 53958890}, {"filename": "/data/PhotonEvaporation5.2/z94.a231", "start": 53958890, "end": 53958929}, {"filename": "/data/PhotonEvaporation5.2/z94.a232", "start": 53958929, "end": 53958968}, {"filename": "/data/PhotonEvaporation5.2/z94.a233", "start": 53958968, "end": 53959007}, {"filename": "/data/PhotonEvaporation5.2/z94.a234", "start": 53959007, "end": 53959085}, {"filename": "/data/PhotonEvaporation5.2/z94.a235", "start": 53959085, "end": 53961038}, {"filename": "/data/PhotonEvaporation5.2/z94.a236", "start": 53961038, "end": 53964661}, {"filename": "/data/PhotonEvaporation5.2/z94.a237", "start": 53964661, "end": 53973474}, {"filename": "/data/PhotonEvaporation5.2/z94.a238", "start": 53973474, "end": 53987771}, {"filename": "/data/PhotonEvaporation5.2/z94.a239", "start": 53987771, "end": 54011154}, {"filename": "/data/PhotonEvaporation5.2/z94.a240", "start": 54011154, "end": 54057025}, {"filename": "/data/PhotonEvaporation5.2/z94.a241", "start": 54057025, "end": 54076529}, {"filename": "/data/PhotonEvaporation5.2/z94.a242", "start": 54076529, "end": 54084722}, {"filename": "/data/PhotonEvaporation5.2/z94.a243", "start": 54084722, "end": 54103782}, {"filename": "/data/PhotonEvaporation5.2/z94.a244", "start": 54103782, "end": 54111287}, {"filename": "/data/PhotonEvaporation5.2/z94.a245", "start": 54111287, "end": 54114038}, {"filename": "/data/PhotonEvaporation5.2/z94.a246", "start": 54114038, "end": 54115441}, {"filename": "/data/PhotonEvaporation5.2/z94.a247", "start": 54115441, "end": 54115480}, {"filename": "/data/PhotonEvaporation5.2/z95.a230", "start": 54115480, "end": 54115519}, {"filename": "/data/PhotonEvaporation5.2/z95.a232", "start": 54115519, "end": 54115558}, {"filename": "/data/PhotonEvaporation5.2/z95.a233", "start": 54115558, "end": 54115597}, {"filename": "/data/PhotonEvaporation5.2/z95.a234", "start": 54115597, "end": 54115636}, {"filename": "/data/PhotonEvaporation5.2/z95.a235", "start": 54115636, "end": 54115675}, {"filename": "/data/PhotonEvaporation5.2/z95.a236", "start": 54115675, "end": 54115753}, {"filename": "/data/PhotonEvaporation5.2/z95.a237", "start": 54115753, "end": 54115831}, {"filename": "/data/PhotonEvaporation5.2/z95.a238", "start": 54115831, "end": 54115909}, {"filename": "/data/PhotonEvaporation5.2/z95.a239", "start": 54115909, "end": 54116969}, {"filename": "/data/PhotonEvaporation5.2/z95.a240", "start": 54116969, "end": 54119231}, {"filename": "/data/PhotonEvaporation5.2/z95.a241", "start": 54119231, "end": 54145355}, {"filename": "/data/PhotonEvaporation5.2/z95.a242", "start": 54145355, "end": 54168505}, {"filename": "/data/PhotonEvaporation5.2/z95.a243", "start": 54168505, "end": 54172831}, {"filename": "/data/PhotonEvaporation5.2/z95.a244", "start": 54172831, "end": 54219644}, {"filename": "/data/PhotonEvaporation5.2/z95.a245", "start": 54219644, "end": 54230006}, {"filename": "/data/PhotonEvaporation5.2/z95.a246", "start": 54230006, "end": 54232329}, {"filename": "/data/PhotonEvaporation5.2/z95.a247", "start": 54232329, "end": 54232368}, {"filename": "/data/PhotonEvaporation5.2/z95.a248", "start": 54232368, "end": 54232407}, {"filename": "/data/PhotonEvaporation5.2/z96.a233", "start": 54232407, "end": 54232446}, {"filename": "/data/PhotonEvaporation5.2/z96.a234", "start": 54232446, "end": 54232485}, {"filename": "/data/PhotonEvaporation5.2/z96.a235", "start": 54232485, "end": 54232563}, {"filename": "/data/PhotonEvaporation5.2/z96.a236", "start": 54232563, "end": 54232641}, {"filename": "/data/PhotonEvaporation5.2/z96.a237", "start": 54232641, "end": 54232719}, {"filename": "/data/PhotonEvaporation5.2/z96.a238", "start": 54232719, "end": 54232797}, {"filename": "/data/PhotonEvaporation5.2/z96.a239", "start": 54232797, "end": 54232875}, {"filename": "/data/PhotonEvaporation5.2/z96.a240", "start": 54232875, "end": 54233179}, {"filename": "/data/PhotonEvaporation5.2/z96.a241", "start": 54233179, "end": 54234231}, {"filename": "/data/PhotonEvaporation5.2/z96.a242", "start": 54234231, "end": 54234909}, {"filename": "/data/PhotonEvaporation5.2/z96.a243", "start": 54234909, "end": 54236227}, {"filename": "/data/PhotonEvaporation5.2/z96.a244", "start": 54236227, "end": 54238684}, {"filename": "/data/PhotonEvaporation5.2/z96.a245", "start": 54238684, "end": 54249966}, {"filename": "/data/PhotonEvaporation5.2/z96.a246", "start": 54249966, "end": 54283852}, {"filename": "/data/PhotonEvaporation5.2/z96.a247", "start": 54283852, "end": 54290141}, {"filename": "/data/PhotonEvaporation5.2/z96.a248", "start": 54290141, "end": 54303753}, {"filename": "/data/PhotonEvaporation5.2/z96.a249", "start": 54303753, "end": 54321109}, {"filename": "/data/PhotonEvaporation5.2/z96.a250", "start": 54321109, "end": 54321187}, {"filename": "/data/PhotonEvaporation5.2/z96.a251", "start": 54321187, "end": 54321226}, {"filename": "/data/PhotonEvaporation5.2/z96.a252", "start": 54321226, "end": 54321265}, {"filename": "/data/PhotonEvaporation5.2/z97.a234", "start": 54321265, "end": 54321304}, {"filename": "/data/PhotonEvaporation5.2/z97.a238", "start": 54321304, "end": 54321343}, {"filename": "/data/PhotonEvaporation5.2/z97.a239", "start": 54321343, "end": 54321460}, {"filename": "/data/PhotonEvaporation5.2/z97.a240", "start": 54321460, "end": 54321586}, {"filename": "/data/PhotonEvaporation5.2/z97.a241", "start": 54321586, "end": 54321742}, {"filename": "/data/PhotonEvaporation5.2/z97.a242", "start": 54321742, "end": 54321898}, {"filename": "/data/PhotonEvaporation5.2/z97.a243", "start": 54321898, "end": 54322093}, {"filename": "/data/PhotonEvaporation5.2/z97.a244", "start": 54322093, "end": 54322288}, {"filename": "/data/PhotonEvaporation5.2/z97.a245", "start": 54322288, "end": 54322444}, {"filename": "/data/PhotonEvaporation5.2/z97.a246", "start": 54322444, "end": 54322522}, {"filename": "/data/PhotonEvaporation5.2/z97.a247", "start": 54322522, "end": 54326309}, {"filename": "/data/PhotonEvaporation5.2/z97.a248", "start": 54326309, "end": 54328734}, {"filename": "/data/PhotonEvaporation5.2/z97.a249", "start": 54328734, "end": 54356774}, {"filename": "/data/PhotonEvaporation5.2/z97.a250", "start": 54356774, "end": 54365817}, {"filename": "/data/PhotonEvaporation5.2/z97.a251", "start": 54365817, "end": 54368505}, {"filename": "/data/PhotonEvaporation5.2/z97.a252", "start": 54368505, "end": 54368544}, {"filename": "/data/PhotonEvaporation5.2/z97.a253", "start": 54368544, "end": 54368622}, {"filename": "/data/PhotonEvaporation5.2/z98.a237", "start": 54368622, "end": 54368661}, {"filename": "/data/PhotonEvaporation5.2/z98.a238", "start": 54368661, "end": 54368700}, {"filename": "/data/PhotonEvaporation5.2/z98.a239", "start": 54368700, "end": 54368739}, {"filename": "/data/PhotonEvaporation5.2/z98.a240", "start": 54368739, "end": 54368778}, {"filename": "/data/PhotonEvaporation5.2/z98.a241", "start": 54368778, "end": 54368856}, {"filename": "/data/PhotonEvaporation5.2/z98.a242", "start": 54368856, "end": 54368895}, {"filename": "/data/PhotonEvaporation5.2/z98.a243", "start": 54368895, "end": 54369721}, {"filename": "/data/PhotonEvaporation5.2/z98.a244", "start": 54369721, "end": 54369838}, {"filename": "/data/PhotonEvaporation5.2/z98.a245", "start": 54369838, "end": 54370103}, {"filename": "/data/PhotonEvaporation5.2/z98.a246", "start": 54370103, "end": 54370220}, {"filename": "/data/PhotonEvaporation5.2/z98.a247", "start": 54370220, "end": 54373391}, {"filename": "/data/PhotonEvaporation5.2/z98.a248", "start": 54373391, "end": 54376892}, {"filename": "/data/PhotonEvaporation5.2/z98.a249", "start": 54376892, "end": 54390661}, {"filename": "/data/PhotonEvaporation5.2/z98.a250", "start": 54390661, "end": 54402785}, {"filename": "/data/PhotonEvaporation5.2/z98.a251", "start": 54402785, "end": 54424114}, {"filename": "/data/PhotonEvaporation5.2/z98.a252", "start": 54424114, "end": 54427020}, {"filename": "/data/PhotonEvaporation5.2/z98.a253", "start": 54427020, "end": 54428438}, {"filename": "/data/PhotonEvaporation5.2/z98.a254", "start": 54428438, "end": 54428477}, {"filename": "/data/PhotonEvaporation5.2/z98.a255", "start": 54428477, "end": 54428516}, {"filename": "/data/PhotonEvaporation5.2/z98.a256", "start": 54428516, "end": 54428555}, {"filename": "/data/PhotonEvaporation5.2/z99.a241", "start": 54428555, "end": 54428672}, {"filename": "/data/PhotonEvaporation5.2/z99.a242", "start": 54428672, "end": 54428750}, {"filename": "/data/PhotonEvaporation5.2/z99.a243", "start": 54428750, "end": 54429280}, {"filename": "/data/PhotonEvaporation5.2/z99.a244", "start": 54429280, "end": 54429397}, {"filename": "/data/PhotonEvaporation5.2/z99.a245", "start": 54429397, "end": 54429749}, {"filename": "/data/PhotonEvaporation5.2/z99.a246", "start": 54429749, "end": 54429827}, {"filename": "/data/PhotonEvaporation5.2/z99.a247", "start": 54429827, "end": 54429905}, {"filename": "/data/PhotonEvaporation5.2/z99.a248", "start": 54429905, "end": 54429944}, {"filename": "/data/PhotonEvaporation5.2/z99.a249", "start": 54429944, "end": 54430170}, {"filename": "/data/PhotonEvaporation5.2/z99.a250", "start": 54430170, "end": 54430248}, {"filename": "/data/PhotonEvaporation5.2/z99.a251", "start": 54430248, "end": 54436956}, {"filename": "/data/PhotonEvaporation5.2/z99.a252", "start": 54436956, "end": 54437460}, {"filename": "/data/PhotonEvaporation5.2/z99.a253", "start": 54437460, "end": 54438512}, {"filename": "/data/PhotonEvaporation5.2/z99.a254", "start": 54438512, "end": 54441122}, {"filename": "/data/PhotonEvaporation5.2/z99.a255", "start": 54441122, "end": 54441161}, {"filename": "/data/PhotonEvaporation5.2/z99.a256", "start": 54441161, "end": 54441239}, {"filename": "/data/PhotonEvaporation5.2/z99.a257", "start": 54441239, "end": 54441278}], "remote_package_size": 54441278});

  })();


    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();
  
    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach(function(task) {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });
  

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = nodePath.dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js
read_ = (filename, binary) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return fs.readFileSync(filename, binary ? undefined : 'utf8');
};

readBinary = (filename) => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, onload, onerror, binary = true) => {
  // See the comment in the `read_` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
    if (err) onerror(err);
    else onload(binary ? data.buffer : data);
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  process.on('uncaughtException', (ex) => {
    // suppress ExitStatus exceptions from showing an error
    if (ex !== 'unwind' && !(ex instanceof ExitStatus) && !(ex.context instanceof ExitStatus)) {
      throw ex;
    }
  });

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  if (typeof read != 'undefined') {
    read_ = read;
  }

  readBinary = (f) => {
    if (typeof readbuffer == 'function') {
      return new Uint8Array(readbuffer(f));
    }
    let data = read(f, 'binary');
    assert(typeof data == 'object');
    return data;
  };

  readAsync = (f, onload, onerror) => {
    setTimeout(() => onload(readBinary(f)));
  };

  if (typeof clearTimeout == 'undefined') {
    globalThis.clearTimeout = (id) => {};
  }

  if (typeof setTimeout == 'undefined') {
    // spidermonkey lacks setTimeout but we use it above in readAsync.
    globalThis.setTimeout = (f) => (typeof f == 'function') ? f() : abort();
  }

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit == 'function') {
    quit_ = (status, toThrow) => {
      // Unlike node which has process.exitCode, d8 has no such mechanism. So we
      // have no way to set the exit code and then let the program exit with
      // that code when it naturally stops running (say, when all setTimeouts
      // have completed). For that reason, we must call `quit` - the only way to
      // set the exit code - but quit also halts immediately.  To increase
      // consistency with node (and the web) we schedule the actual quit call
      // using a setTimeout to give the current stack and any exception handlers
      // a chance to run.  This enables features such as addOnPostRun (which
      // expected to be able to run code after main returns).
      setTimeout(() => {
        if (!(toThrow instanceof ExitStatus)) {
          let toLog = toThrow;
          if (toThrow && typeof toThrow == 'object' && toThrow.stack) {
            toLog = [toThrow, toThrow.stack];
          }
          err(`exiting due to exception: ${toLog}`);
        }
        quit(status);
      });
      throw toThrow;
    };
  }

  if (typeof print != 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console == 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr != 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js
read_ = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  }

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  }

// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) quit_ = Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('read', 'read_');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');


// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary; 
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
function _malloc() {
  abort('malloc() called but not included in the build - add `_malloc` to EXPORTED_FUNCTIONS');
}
function _free() {
  // Show a helpful error since we used to include free by default in the past.
  abort('free() called but not included in the build - add `_free` to EXPORTED_FUNCTIONS');
}

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_assertions.js
// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
if (!Module['noFSInit'] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name) {
  return function() {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    return f.apply(null, arguments);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
var wasmBinaryFile;
  wasmBinaryFile = 'index.wasm';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, try to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary
      && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch == 'function'
      && !isFileURI(binaryFile)
    ) {
      return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
        if (!response['ok']) {
          throw `failed to load wasm binary file at '${binaryFile}'`;
        }
        return response['arrayBuffer']();
      }).catch(() => getBinarySync(binaryFile));
    }
    else if (readAsync) {
      // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
      return new Promise((resolve, reject) => {
        readAsync(binaryFile, (response) => resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))), reject)
      });
    }
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then((instance) => {
    return instance;
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err(`wasm streaming compile failed: ${reason}`);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 16777216);
    updateMemoryViews();

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {

    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        return false;
    }
  }

  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
function legacyModuleProp(prop, newName, incomming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incomming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingGlobal(sym, msg) {
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
        return undefined;
      }
    });
  }
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  if (typeof globalThis !== 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        // Can't `abort()` here because it would break code that does runtime
        // checks.  e.g. `if (typeof SDL === 'undefined')`.
        var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
        // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
        // library.js, which means $name for a JS name with no prefix, or name
        // for a JS name like _name.
        var librarySymbol = sym;
        if (!librarySymbol.startsWith('_')) {
          librarySymbol = '$' + sym;
        }
        msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        warnOnce(msg);
        return undefined;
      }
    });
  }
  // Any symbol that is not included from the JS libary is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(text) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn.apply(console, arguments);
}
// end include: runtime_debug.js
// === Body ===

// end include: preamble.js

  var _emscripten_set_main_loop_timing = (mode, value) => {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!Browser.mainLoop.running) {
        
        Browser.mainLoop.running = true;
      }
      if (mode == 0) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof Browser.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var Browser_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", Browser_setImmediate_messageHandler, true);
            Browser.setImmediate = /** @type{function(function(): ?, ...?): number} */(function Browser_emulated_setImmediate(func) {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                if (Module['setImmediates'] === undefined) Module['setImmediates'] = [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            Browser.setImmediate = setImmediate;
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          Browser.setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    };
  
  var _emscripten_get_now;
      // Modern environment where performance.now() is supported:
      // N.B. a shorter form "_emscripten_get_now = performance.now;" is
      // unfortunately not allowed even in current browsers (e.g. FF Nightly 75).
      _emscripten_get_now = () => performance.now();
  ;
  
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (browserIterationFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
  
      Browser.mainLoop.func = browserIterationFunc;
      Browser.mainLoop.arg = arg;
  
      // Closure compiler bug(?): Closure does not see that the assignment
      //   var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop
      // is a value copy of a number (even with the JSDoc @type annotation)
      // but optimizeis the code as if the assignment was a reference assignment,
      // which results in Browser.mainLoop.pause() not working. Hence use a
      // workaround to make Closure believe this is a value copy that should occur:
      // (TODO: Minimize this down to a small test case and report - was unable
      // to reproduce in a small written test case)
      /** @type{number} */
      var thisMainLoopId = (() => Browser.mainLoop.currentlyRunningMainloop)();
      function checkIsRunning() {
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) {
          
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      Browser.mainLoop.running = false;
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          Browser.mainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        Browser.mainLoop.runIter(browserIterationFunc);
  
        checkStackCookie();
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL == 'object') SDL.audio?.queueNewAudioData?.();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  
  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  /** @param {number=} timeout */
  var safeSetTimeout = (func, timeout) => {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    };
  
  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };
  
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  
  var Browser = {
  mainLoop:{
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  pause() {
          Browser.mainLoop.scheduler = null;
          // Incrementing this signals the previous main loop that it's now become old, and it must return.
          Browser.mainLoop.currentlyRunningMainloop++;
        },
  resume() {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          // do not set timing and call scheduler, we will do it on the next lines
          setMainLoop(func, 0, false, Browser.mainLoop.arg, true);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },
  updateStatus() {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },
  runIter(func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          callUserCallback(func);
          Module['postMainLoop']?.();
        },
  },
  isFullscreen:false,
  pointerLock:false,
  moduleContextCreatedCallbacks:[],
  workers:[],
  init() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = () => {
            assert(img.complete, `Image ${name} could not be decoded`);
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            preloadedAudios[name] = new Audio(); // empty shim
            onerror?.();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === Module['canvas'] ||
                                document['mozPointerLockElement'] === Module['canvas'] ||
                                document['webkitPointerLockElement'] === Module['canvas'] ||
                                document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                Module['canvas'].requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx == 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },
  destroyContext(canvas, useWebGL, setInModule) {},
  fullscreenHandlersInstalled:false,
  lockPointer:undefined,
  resizeCanvas:undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },
  requestFullScreen() {
        abort('Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)');
      },
  exitFullscreen() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = Browser.fakeRequestAnimationFrame;
        RAF(func);
      },
  safeSetTimeout(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },
  safeRequestAnimationFrame(func) {
        
        return Browser.requestAnimationFrame(() => {
          
          callUserCallback(func);
        });
      },
  getMimetype(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },
  getUserMedia(func) {
        window.getUserMedia ||= navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
  getMovementX(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },
  getMovementY(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },
  getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
  mouseX:0,
  mouseY:0,
  mouseMovementX:0,
  mouseMovementY:0,
  touches:{
  },
  lastTouches:{
  },
  calculateMouseCoords(pageX, pageY) {
        // Calculate the movement based on the changes
        // in the coordinates.
        var rect = Module["canvas"].getBoundingClientRect();
        var cw = Module["canvas"].width;
        var ch = Module["canvas"].height;
  
        // Neither .scrollX or .pageXOffset are defined in a spec, but
        // we prefer .scrollX because it is currently in a spec draft.
        // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
        var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
        var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
        // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
        // and we have no viable fallback.
        assert((typeof scrollX != 'undefined') && (typeof scrollY != 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
  
        // the canvas might be CSS-scaled compared to its backbuffer;
        // SDL-using content will want mouse coordinates in terms
        // of backbuffer units.
        adjustedX = adjustedX * (cw / rect.width);
        adjustedY = adjustedY * (ch / rect.height);
  
        return { x: adjustedX, y: adjustedY };
      },
  setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
  calculateMouseEvent(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // check if SDL is available
          if (typeof SDL != "undefined") {
            Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
            Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
            // just add the mouse delta to the current absolut mouse position
            // FIXME: ideally this should be clamped against the canvas size and zero
            Browser.mouseX += Browser.mouseMovementX;
            Browser.mouseY += Browser.mouseMovementY;
          }
        } else {
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
  resizeListeners:[],
  updateResizeListeners() {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },
  setCanvasSize(width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
  windowedWidth:0,
  windowedHeight:0,
  setFullscreenCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  setWindowedCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },
  updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },
  };


  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module['noExitRuntime'] || true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }


  var nowIsMonotonic = 1;
  var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

  var _abort = () => {
      abort('native code called abort()');
    };

  var _emscripten_date_now = () => Date.now();


  var _emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  
  var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) / 65536;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
        err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
        return false;
      }
  
      var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
      return false;
    };

  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:function() {
        var paths = Array.prototype.slice.call(arguments);
        return PATH.normalize(paths.join('/'));
      },
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort('no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };');
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
            // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          } else {
            result = null;
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else if (typeof readline == 'function') {
          // Command line.
          result = readline();
          if (result !== null) {
            result += '\n';
          }
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  },
  };
  
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  var mmapAlloc = (size) => {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw FS.genericErrors[44];
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url, (arrayBuffer) => {
        assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
        onload(new Uint8Array(arrayBuffer));
        if (dep) removeRunDependency(dep);
      }, (event) => {
        if (onerror) {
          onerror();
        } else {
          throw `Loading data file "${url}" failed.`;
        }
      });
      if (dep) addRunDependency(dep);
    };
  
  
  var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
  
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  var ERRNO_MESSAGES = {
  0:"Success",
  1:"Arg list too long",
  2:"Permission denied",
  3:"Address already in use",
  4:"Address not available",
  5:"Address family not supported by protocol family",
  6:"No more processes",
  7:"Socket already connected",
  8:"Bad file number",
  9:"Trying to read unreadable message",
  10:"Mount device busy",
  11:"Operation canceled",
  12:"No children",
  13:"Connection aborted",
  14:"Connection refused",
  15:"Connection reset by peer",
  16:"File locking deadlock error",
  17:"Destination address required",
  18:"Math arg out of domain of func",
  19:"Quota exceeded",
  20:"File exists",
  21:"Bad address",
  22:"File too large",
  23:"Host is unreachable",
  24:"Identifier removed",
  25:"Illegal byte sequence",
  26:"Connection already in progress",
  27:"Interrupted system call",
  28:"Invalid argument",
  29:"I/O error",
  30:"Socket is already connected",
  31:"Is a directory",
  32:"Too many symbolic links",
  33:"Too many open files",
  34:"Too many links",
  35:"Message too long",
  36:"Multihop attempted",
  37:"File or path name too long",
  38:"Network interface is not configured",
  39:"Connection reset by network",
  40:"Network is unreachable",
  41:"Too many open files in system",
  42:"No buffer space available",
  43:"No such device",
  44:"No such file or directory",
  45:"Exec format error",
  46:"No record locks available",
  47:"The link has been severed",
  48:"Not enough core",
  49:"No message of desired type",
  50:"Protocol not available",
  51:"No space left on device",
  52:"Function not implemented",
  53:"Socket is not connected",
  54:"Not a directory",
  55:"Directory not empty",
  56:"State not recoverable",
  57:"Socket operation on non-socket",
  59:"Not a typewriter",
  60:"No such device or address",
  61:"Value too large for defined data type",
  62:"Previous owner died",
  63:"Not super-user",
  64:"Broken pipe",
  65:"Protocol error",
  66:"Unknown protocol",
  67:"Protocol wrong type for socket",
  68:"Math result not representable",
  69:"Read only file system",
  70:"Illegal seek",
  71:"No such process",
  72:"Stale file handle",
  73:"Connection timed out",
  74:"Text file busy",
  75:"Cross-device link",
  100:"Device not a stream",
  101:"Bad font file fmt",
  102:"Invalid slot",
  103:"Invalid request code",
  104:"No anode",
  105:"Block device required",
  106:"Channel number out of range",
  107:"Level 3 halted",
  108:"Level 3 reset",
  109:"Link number out of range",
  110:"Protocol driver not attached",
  111:"No CSI structure available",
  112:"Level 2 halted",
  113:"Invalid exchange",
  114:"Invalid request descriptor",
  115:"Exchange full",
  116:"No data (for no delay io)",
  117:"Timer expired",
  118:"Out of streams resources",
  119:"Machine is not on the network",
  120:"Package not installed",
  121:"The object is remote",
  122:"Advertise error",
  123:"Srmount error",
  124:"Communication error on send",
  125:"Cross mount point (not really error)",
  126:"Given log. name not unique",
  127:"f.d. invalid for this operation",
  128:"Remote address changed",
  129:"Can   access a needed shared lib",
  130:"Accessing a corrupted shared lib",
  131:".lib section in a.out corrupted",
  132:"Attempting to link in too many libs",
  133:"Attempting to exec a shared library",
  135:"Streams pipe error",
  136:"Too many users",
  137:"Socket type not supported",
  138:"Not supported",
  139:"Protocol family not supported",
  140:"Can't send after socket shutdown",
  141:"Too many references",
  142:"Host is down",
  148:"No medium (in tape drive)",
  156:"Level 2 not synchronized",
  };
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:class extends Error {
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(ERRNO_MESSAGES[errno]);
          // TODO(sbc): Use the inline member delclaration syntax once we
          // support it in acorn and closure.
          this.name = 'ErrnoError';
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  genericErrors:{
  },
  filesystems:null,
  syncFSRequests:0,
  lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function() {
            this.shared = { };
          };
          FS.FSStream.prototype = {};
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              /** @this {FS.FSStream} */
              get() { return this.node; },
              /** @this {FS.FSStream} */
              set(val) { this.node = val; }
            },
            isRead: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 1024); }
            },
            flags: {
              /** @this {FS.FSStream} */
              get() { return this.shared.flags; },
              /** @this {FS.FSStream} */
              set(val) { this.shared.flags = val; },
            },
            position : {
              /** @this {FS.FSStream} */
              get() { return this.shared.position; },
              /** @this {FS.FSStream} */
              set(val) { this.shared.position = val; },
            },
          });
        }
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  create(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open(path, flags, mode) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  munmap:(stream) => 0,
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init(input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },
  quit() {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (from, to) => {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            }
            return intArrayFromString(xhr.responseText || '', true);
          };
          var lazyArray = this;
          lazyArray.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble = stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(24))>>2)] = tempI64[0],HEAP32[(((buf)+(28))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble = Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble = Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble = Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble = stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        return 0;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  varargs:undefined,
  get() {
        assert(SYSCALLS.varargs != undefined);
        // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
        var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
        SYSCALLS.varargs += 4;
        return ret;
      },
  getp() { return SYSCALLS.get() },
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  };
  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  
  var convertI32PairToI53Checked = (lo, hi) => {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    };
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);;
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble = stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }






  var FS_unlink = (path) => FS.unlink(path);

      // exports
      Module["requestFullscreen"] = Browser.requestFullscreen;
      Module["requestFullScreen"] = Browser.requestFullScreen;
      Module["requestAnimationFrame"] = Browser.requestAnimationFrame;
      Module["setCanvasSize"] = Browser.setCanvasSize;
      Module["pauseMainLoop"] = Browser.mainLoop.pause;
      Module["resumeMainLoop"] = Browser.mainLoop.resume;
      Module["getUserMedia"] = Browser.getUserMedia;
      Module["createContext"] = Browser.createContext;
      var preloadedImages = {};
      var preloadedAudios = {};;

  var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_unlink"] = FS.unlink;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createDevice"] = FS.createDevice;;
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
  /** @export */
  abort: _abort,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_get_now: _emscripten_get_now,
  /** @export */
  emscripten_memcpy_js: _emscripten_memcpy_js,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors');
var _main = Module['_main'] = createExportWrapper('main');
var _fflush = createExportWrapper('fflush');
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var stackSave = createExportWrapper('stackSave');
var stackRestore = createExportWrapper('stackRestore');
var stackAlloc = createExportWrapper('stackAlloc');
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji');


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

if (ENVIRONMENT_IS_WORKER) {
// include: webGLWorker.js
// WebGLWorker worker code

function WebGLBuffer(id) {
  this.what = 'buffer';
  this.id = id;
}
function WebGLProgram(id) {
  this.what = 'program';
  this.id = id;
  this.shaders = [];
  this.attributes = {};
  this.attributeVec = [];
  this.nextAttributes = {};
  this.nextAttributeVec = [];
}
function WebGLFramebuffer(id) {
  this.what = 'frameBuffer';
  this.id = id;
}
function WebGLRenderbuffer(id) {
  this.what = 'renderBuffer';
  this.id = id;
}
function WebGLTexture(id) {
  this.what = 'texture';
  this.id = id;
  this.binding = 0;
}

function WebGLWorker() {
  //===========
  // Constants
  //===========

  /* ClearBufferMask */
  this.DEPTH_BUFFER_BIT               = 0x00000100;
  this.STENCIL_BUFFER_BIT             = 0x00000400;
  this.COLOR_BUFFER_BIT               = 0x00004000;
  
  /* BeginMode */
  this.POINTS                         = 0x0000;
  this.LINES                          = 0x0001;
  this.LINE_LOOP                      = 0x0002;
  this.LINE_STRIP                     = 0x0003;
  this.TRIANGLES                      = 0x0004;
  this.TRIANGLE_STRIP                 = 0x0005;
  this.TRIANGLE_FAN                   = 0x0006;
  
  /* AlphaFunction (not supported in ES20) */
  /*      NEVER */
  /*      LESS */
  /*      EQUAL */
  /*      LEQUAL */
  /*      GREATER */
  /*      NOTEQUAL */
  /*      GEQUAL */
  /*      ALWAYS */
  
  /* BlendingFactorDest */
  this.ZERO                           = 0;
  this.ONE                            = 1;
  this.SRC_COLOR                      = 0x0300;
  this.ONE_MINUS_SRC_COLOR            = 0x0301;
  this.SRC_ALPHA                      = 0x0302;
  this.ONE_MINUS_SRC_ALPHA            = 0x0303;
  this.DST_ALPHA                      = 0x0304;
  this.ONE_MINUS_DST_ALPHA            = 0x0305;
  
  /* BlendingFactorSrc */
  /*      ZERO */
  /*      ONE */
  this.DST_COLOR                      = 0x0306;
  this.ONE_MINUS_DST_COLOR            = 0x0307;
  this.SRC_ALPHA_SATURATE             = 0x0308;
  /*      SRC_ALPHA */
  /*      ONE_MINUS_SRC_ALPHA */
  /*      DST_ALPHA */
  /*      ONE_MINUS_DST_ALPHA */
  
  /* BlendEquationSeparate */
  this.FUNC_ADD                       = 0x8006;
  this.BLEND_EQUATION                 = 0x8009;
  this.BLEND_EQUATION_RGB             = 0x8009;   /* same as BLEND_EQUATION */
  this.BLEND_EQUATION_ALPHA           = 0x883D;
  
  /* BlendSubtract */
  this.FUNC_SUBTRACT                  = 0x800A;
  this.FUNC_REVERSE_SUBTRACT          = 0x800B;
  
  /* Separate Blend Functions */
  this.BLEND_DST_RGB                  = 0x80C8;
  this.BLEND_SRC_RGB                  = 0x80C9;
  this.BLEND_DST_ALPHA                = 0x80CA;
  this.BLEND_SRC_ALPHA                = 0x80CB;
  this.CONSTANT_COLOR                 = 0x8001;
  this.ONE_MINUS_CONSTANT_COLOR       = 0x8002;
  this.CONSTANT_ALPHA                 = 0x8003;
  this.ONE_MINUS_CONSTANT_ALPHA       = 0x8004;
  this.BLEND_COLOR                    = 0x8005;
  
  /* Buffer Objects */
  this.ARRAY_BUFFER                   = 0x8892;
  this.ELEMENT_ARRAY_BUFFER           = 0x8893;
  this.ARRAY_BUFFER_BINDING           = 0x8894;
  this.ELEMENT_ARRAY_BUFFER_BINDING   = 0x8895;
  
  this.STREAM_DRAW                    = 0x88E0;
  this.STATIC_DRAW                    = 0x88E4;
  this.DYNAMIC_DRAW                   = 0x88E8;
  
  this.BUFFER_SIZE                    = 0x8764;
  this.BUFFER_USAGE                   = 0x8765;
  
  this.CURRENT_VERTEX_ATTRIB          = 0x8626;
  
  /* CullFaceMode */
  this.FRONT                          = 0x0404;
  this.BACK                           = 0x0405;
  this.FRONT_AND_BACK                 = 0x0408;
  
  /* DepthFunction */
  /*      NEVER */
  /*      LESS */
  /*      EQUAL */
  /*      LEQUAL */
  /*      GREATER */
  /*      NOTEQUAL */
  /*      GEQUAL */
  /*      ALWAYS */
  
  /* EnableCap */
  /* TEXTURE_2D */
  this.CULL_FACE                      = 0x0B44;
  this.BLEND                          = 0x0BE2;
  this.DITHER                         = 0x0BD0;
  this.STENCIL_TEST                   = 0x0B90;
  this.DEPTH_TEST                     = 0x0B71;
  this.SCISSOR_TEST                   = 0x0C11;
  this.POLYGON_OFFSET_FILL            = 0x8037;
  this.SAMPLE_ALPHA_TO_COVERAGE       = 0x809E;
  this.SAMPLE_COVERAGE                = 0x80A0;
  
  /* ErrorCode */
  this.NO_ERROR                       = 0;
  this.INVALID_ENUM                   = 0x0500;
  this.INVALID_VALUE                  = 0x0501;
  this.INVALID_OPERATION              = 0x0502;
  this.OUT_OF_MEMORY                  = 0x0505;
  
  /* FrontFaceDirection */
  this.CW                             = 0x0900;
  this.CCW                            = 0x0901;
  
  /* GetPName */
  this.LINE_WIDTH                     = 0x0B21;
  this.ALIASED_POINT_SIZE_RANGE       = 0x846D;
  this.ALIASED_LINE_WIDTH_RANGE       = 0x846E;
  this.CULL_FACE_MODE                 = 0x0B45;
  this.FRONT_FACE                     = 0x0B46;
  this.DEPTH_RANGE                    = 0x0B70;
  this.DEPTH_WRITEMASK                = 0x0B72;
  this.DEPTH_CLEAR_VALUE              = 0x0B73;
  this.DEPTH_FUNC                     = 0x0B74;
  this.STENCIL_CLEAR_VALUE            = 0x0B91;
  this.STENCIL_FUNC                   = 0x0B92;
  this.STENCIL_FAIL                   = 0x0B94;
  this.STENCIL_PASS_DEPTH_FAIL        = 0x0B95;
  this.STENCIL_PASS_DEPTH_PASS        = 0x0B96;
  this.STENCIL_REF                    = 0x0B97;
  this.STENCIL_VALUE_MASK             = 0x0B93;
  this.STENCIL_WRITEMASK              = 0x0B98;
  this.STENCIL_BACK_FUNC              = 0x8800;
  this.STENCIL_BACK_FAIL              = 0x8801;
  this.STENCIL_BACK_PASS_DEPTH_FAIL   = 0x8802;
  this.STENCIL_BACK_PASS_DEPTH_PASS   = 0x8803;
  this.STENCIL_BACK_REF               = 0x8CA3;
  this.STENCIL_BACK_VALUE_MASK        = 0x8CA4;
  this.STENCIL_BACK_WRITEMASK         = 0x8CA5;
  this.VIEWPORT                       = 0x0BA2;
  this.SCISSOR_BOX                    = 0x0C10;
  /*      SCISSOR_TEST */
  this.COLOR_CLEAR_VALUE              = 0x0C22;
  this.COLOR_WRITEMASK                = 0x0C23;
  this.UNPACK_ALIGNMENT               = 0x0CF5;
  this.PACK_ALIGNMENT                 = 0x0D05;
  this.MAX_TEXTURE_SIZE               = 0x0D33;
  this.MAX_VIEWPORT_DIMS              = 0x0D3A;
  this.SUBPIXEL_BITS                  = 0x0D50;
  this.RED_BITS                       = 0x0D52;
  this.GREEN_BITS                     = 0x0D53;
  this.BLUE_BITS                      = 0x0D54;
  this.ALPHA_BITS                     = 0x0D55;
  this.DEPTH_BITS                     = 0x0D56;
  this.STENCIL_BITS                   = 0x0D57;
  this.POLYGON_OFFSET_UNITS           = 0x2A00;
  /*      POLYGON_OFFSET_FILL */
  this.POLYGON_OFFSET_FACTOR          = 0x8038;
  this.TEXTURE_BINDING_2D             = 0x8069;
  this.SAMPLE_BUFFERS                 = 0x80A8;
  this.SAMPLES                        = 0x80A9;
  this.SAMPLE_COVERAGE_VALUE          = 0x80AA;
  this.SAMPLE_COVERAGE_INVERT         = 0x80AB;
  
  /* GetTextureParameter */
  /*      TEXTURE_MAG_FILTER */
  /*      TEXTURE_MIN_FILTER */
  /*      TEXTURE_WRAP_S */
  /*      TEXTURE_WRAP_T */
  
  this.COMPRESSED_TEXTURE_FORMATS     = 0x86A3;
  
  /* HintMode */
  this.DONT_CARE                      = 0x1100;
  this.FASTEST                        = 0x1101;
  this.NICEST                         = 0x1102;
  
  /* HintTarget */
  this.GENERATE_MIPMAP_HINT            = 0x8192;
  
  /* DataType */
  this.BYTE                           = 0x1400;
  this.UNSIGNED_BYTE                  = 0x1401;
  this.SHORT                          = 0x1402;
  this.UNSIGNED_SHORT                 = 0x1403;
  this.INT                            = 0x1404;
  this.UNSIGNED_INT                   = 0x1405;
  this.FLOAT                          = 0x1406;
  
  /* PixelFormat */
  this.DEPTH_COMPONENT                = 0x1902;
  this.ALPHA                          = 0x1906;
  this.RGB                            = 0x1907;
  this.RGBA                           = 0x1908;
  this.LUMINANCE                      = 0x1909;
  this.LUMINANCE_ALPHA                = 0x190A;
  
  /* PixelType */
  /*      UNSIGNED_BYTE */
  this.UNSIGNED_SHORT_4_4_4_4         = 0x8033;
  this.UNSIGNED_SHORT_5_5_5_1         = 0x8034;
  this.UNSIGNED_SHORT_5_6_5           = 0x8363;
  
  /* Shaders */
  this.FRAGMENT_SHADER                  = 0x8B30;
  this.VERTEX_SHADER                    = 0x8B31;
  this.MAX_VERTEX_ATTRIBS               = 0x8869;
  this.MAX_VERTEX_UNIFORM_VECTORS       = 0x8DFB;
  this.MAX_VARYING_VECTORS              = 0x8DFC;
  this.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
  this.MAX_VERTEX_TEXTURE_IMAGE_UNITS   = 0x8B4C;
  this.MAX_TEXTURE_IMAGE_UNITS          = 0x8872;
  this.MAX_FRAGMENT_UNIFORM_VECTORS     = 0x8DFD;
  this.SHADER_TYPE                      = 0x8B4F;
  this.DELETE_STATUS                    = 0x8B80;
  this.LINK_STATUS                      = 0x8B82;
  this.VALIDATE_STATUS                  = 0x8B83;
  this.ATTACHED_SHADERS                 = 0x8B85;
  this.ACTIVE_UNIFORMS                  = 0x8B86;
  this.ACTIVE_ATTRIBUTES                = 0x8B89;
  this.SHADING_LANGUAGE_VERSION         = 0x8B8C;
  this.CURRENT_PROGRAM                  = 0x8B8D;
  
  /* StencilFunction */
  this.NEVER                          = 0x0200;
  this.LESS                           = 0x0201;
  this.EQUAL                          = 0x0202;
  this.LEQUAL                         = 0x0203;
  this.GREATER                        = 0x0204;
  this.NOTEQUAL                       = 0x0205;
  this.GEQUAL                         = 0x0206;
  this.ALWAYS                         = 0x0207;
  
  /* StencilOp */
  /*      ZERO */
  this.KEEP                           = 0x1E00;
  this.REPLACE                        = 0x1E01;
  this.INCR                           = 0x1E02;
  this.DECR                           = 0x1E03;
  this.INVERT                         = 0x150A;
  this.INCR_WRAP                      = 0x8507;
  this.DECR_WRAP                      = 0x8508;
  
  /* StringName */
  this.VENDOR                         = 0x1F00;
  this.RENDERER                       = 0x1F01;
  this.VERSION                        = 0x1F02;
  
  /* TextureMagFilter */
  this.NEAREST                        = 0x2600;
  this.LINEAR                         = 0x2601;
  
  /* TextureMinFilter */
  /*      NEAREST */
  /*      LINEAR */
  this.NEAREST_MIPMAP_NEAREST         = 0x2700;
  this.LINEAR_MIPMAP_NEAREST          = 0x2701;
  this.NEAREST_MIPMAP_LINEAR          = 0x2702;
  this.LINEAR_MIPMAP_LINEAR           = 0x2703;
  
  /* TextureParameterName */
  this.TEXTURE_MAG_FILTER             = 0x2800;
  this.TEXTURE_MIN_FILTER             = 0x2801;
  this.TEXTURE_WRAP_S                 = 0x2802;
  this.TEXTURE_WRAP_T                 = 0x2803;
  
  /* TextureTarget */
  this.TEXTURE_2D                     = 0x0DE1;
  this.TEXTURE                        = 0x1702;
  
  this.TEXTURE_CUBE_MAP               = 0x8513;
  this.TEXTURE_BINDING_CUBE_MAP       = 0x8514;
  this.TEXTURE_CUBE_MAP_POSITIVE_X    = 0x8515;
  this.TEXTURE_CUBE_MAP_NEGATIVE_X    = 0x8516;
  this.TEXTURE_CUBE_MAP_POSITIVE_Y    = 0x8517;
  this.TEXTURE_CUBE_MAP_NEGATIVE_Y    = 0x8518;
  this.TEXTURE_CUBE_MAP_POSITIVE_Z    = 0x8519;
  this.TEXTURE_CUBE_MAP_NEGATIVE_Z    = 0x851A;
  this.MAX_CUBE_MAP_TEXTURE_SIZE      = 0x851C;
  
  /* TextureUnit */
  this.TEXTURE0                       = 0x84C0;
  this.TEXTURE1                       = 0x84C1;
  this.TEXTURE2                       = 0x84C2;
  this.TEXTURE3                       = 0x84C3;
  this.TEXTURE4                       = 0x84C4;
  this.TEXTURE5                       = 0x84C5;
  this.TEXTURE6                       = 0x84C6;
  this.TEXTURE7                       = 0x84C7;
  this.TEXTURE8                       = 0x84C8;
  this.TEXTURE9                       = 0x84C9;
  this.TEXTURE10                      = 0x84CA;
  this.TEXTURE11                      = 0x84CB;
  this.TEXTURE12                      = 0x84CC;
  this.TEXTURE13                      = 0x84CD;
  this.TEXTURE14                      = 0x84CE;
  this.TEXTURE15                      = 0x84CF;
  this.TEXTURE16                      = 0x84D0;
  this.TEXTURE17                      = 0x84D1;
  this.TEXTURE18                      = 0x84D2;
  this.TEXTURE19                      = 0x84D3;
  this.TEXTURE20                      = 0x84D4;
  this.TEXTURE21                      = 0x84D5;
  this.TEXTURE22                      = 0x84D6;
  this.TEXTURE23                      = 0x84D7;
  this.TEXTURE24                      = 0x84D8;
  this.TEXTURE25                      = 0x84D9;
  this.TEXTURE26                      = 0x84DA;
  this.TEXTURE27                      = 0x84DB;
  this.TEXTURE28                      = 0x84DC;
  this.TEXTURE29                      = 0x84DD;
  this.TEXTURE30                      = 0x84DE;
  this.TEXTURE31                      = 0x84DF;
  this.ACTIVE_TEXTURE                 = 0x84E0;
  
  /* TextureWrapMode */
  this.REPEAT                         = 0x2901;
  this.CLAMP_TO_EDGE                  = 0x812F;
  this.MIRRORED_REPEAT                = 0x8370;
  
  /* Uniform Types */
  this.FLOAT_VEC2                     = 0x8B50;
  this.FLOAT_VEC3                     = 0x8B51;
  this.FLOAT_VEC4                     = 0x8B52;
  this.INT_VEC2                       = 0x8B53;
  this.INT_VEC3                       = 0x8B54;
  this.INT_VEC4                       = 0x8B55;
  this.BOOL                           = 0x8B56;
  this.BOOL_VEC2                      = 0x8B57;
  this.BOOL_VEC3                      = 0x8B58;
  this.BOOL_VEC4                      = 0x8B59;
  this.FLOAT_MAT2                     = 0x8B5A;
  this.FLOAT_MAT3                     = 0x8B5B;
  this.FLOAT_MAT4                     = 0x8B5C;
  this.SAMPLER_2D                     = 0x8B5E;
  this.SAMPLER_3D                     = 0x8B5F;
  this.SAMPLER_CUBE                   = 0x8B60;
  
  /* Vertex Arrays */
  this.VERTEX_ATTRIB_ARRAY_ENABLED        = 0x8622;
  this.VERTEX_ATTRIB_ARRAY_SIZE           = 0x8623;
  this.VERTEX_ATTRIB_ARRAY_STRIDE         = 0x8624;
  this.VERTEX_ATTRIB_ARRAY_TYPE           = 0x8625;
  this.VERTEX_ATTRIB_ARRAY_NORMALIZED     = 0x886A;
  this.VERTEX_ATTRIB_ARRAY_POINTER        = 0x8645;
  this.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F;
  
  /* Read Format */
  this.IMPLEMENTATION_COLOR_READ_TYPE   = 0x8B9A;
  this.IMPLEMENTATION_COLOR_READ_FORMAT = 0x8B9B;

  /* Shader Source */
  this.COMPILE_STATUS                 = 0x8B81;
  
  /* Shader Precision-Specified Types */
  this.LOW_FLOAT                      = 0x8DF0;
  this.MEDIUM_FLOAT                   = 0x8DF1;
  this.HIGH_FLOAT                     = 0x8DF2;
  this.LOW_INT                        = 0x8DF3;
  this.MEDIUM_INT                     = 0x8DF4;
  this.HIGH_INT                       = 0x8DF5;
  
  /* Framebuffer Object. */
  this.FRAMEBUFFER                    = 0x8D40;
  this.RENDERBUFFER                   = 0x8D41;
  
  this.RGBA4                          = 0x8056;
  this.RGB5_A1                        = 0x8057;
  this.RGB565                         = 0x8D62;
  this.DEPTH_COMPONENT16              = 0x81A5;
  this.STENCIL_INDEX                  = 0x1901;
  this.STENCIL_INDEX8                 = 0x8D48;
  this.DEPTH_STENCIL                  = 0x84F9;
  
  this.RENDERBUFFER_WIDTH             = 0x8D42;
  this.RENDERBUFFER_HEIGHT            = 0x8D43;
  this.RENDERBUFFER_INTERNAL_FORMAT   = 0x8D44;
  this.RENDERBUFFER_RED_SIZE          = 0x8D50;
  this.RENDERBUFFER_GREEN_SIZE        = 0x8D51;
  this.RENDERBUFFER_BLUE_SIZE         = 0x8D52;
  this.RENDERBUFFER_ALPHA_SIZE        = 0x8D53;
  this.RENDERBUFFER_DEPTH_SIZE        = 0x8D54;
  this.RENDERBUFFER_STENCIL_SIZE      = 0x8D55;
  
  this.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE           = 0x8CD0;
  this.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME           = 0x8CD1;
  this.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL         = 0x8CD2;
  this.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3;
  
  this.COLOR_ATTACHMENT0              = 0x8CE0;
  this.DEPTH_ATTACHMENT               = 0x8D00;
  this.STENCIL_ATTACHMENT             = 0x8D20;
  this.DEPTH_STENCIL_ATTACHMENT       = 0x821A;
  
  this.NONE                           = 0;
  
  this.FRAMEBUFFER_COMPLETE                      = 0x8CD5;
  this.FRAMEBUFFER_INCOMPLETE_ATTACHMENT         = 0x8CD6;
  this.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
  this.FRAMEBUFFER_INCOMPLETE_DIMENSIONS         = 0x8CD9;
  this.FRAMEBUFFER_UNSUPPORTED                   = 0x8CDD;
  
  this.ACTIVE_TEXTURE                 = 0x84E0;
  this.FRAMEBUFFER_BINDING            = 0x8CA6;
  this.RENDERBUFFER_BINDING           = 0x8CA7;
  this.MAX_RENDERBUFFER_SIZE          = 0x84E8;
  
  this.INVALID_FRAMEBUFFER_OPERATION  = 0x0506;
  
  /* WebGL-specific enums */
  this.UNPACK_FLIP_Y_WEBGL            = 0x9240;
  this.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
  this.CONTEXT_LOST_WEBGL             = 0x9242;
  this.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
  this.BROWSER_DEFAULT_WEBGL          = 0x9244;

  //=======
  // State
  //=======

  var commandBuffer = [];

  var nextId = 1; // valid ids are > 0

  var bindings = {
    texture2D: null,
    arrayBuffer: null,
    elementArrayBuffer: null,
    program: null,
    framebuffer: null,
    activeTexture: this.TEXTURE0,
    generateMipmapHint: this.DONT_CARE,
    blendSrcRGB: this.ONE,
    blendSrcAlpha: this.ONE,
    blendDstRGB: this.ZERO,
    blendDstAlpha: this.ZERO,
    blendEquationRGB: this.FUNC_ADD,
    blendEquationAlpha: this.FUNC_ADD,
    enabledState: {} // Stores whether various GL state via glEnable/glDisable/glIsEnabled/getParameter are enabled.
  };
  var stateDisabledByDefault = [this.BLEND, this.CULL_FACE, this.DEPTH_TEST, this.DITHER, this.POLYGON_OFFSET_FILL, this.SAMPLE_ALPHA_TO_COVERAGE, this.SAMPLE_COVERAGE, this.SCISSOR_TEST, this.STENCIL_TEST];
  for (var i in stateDisabledByDefault) {
    bindings.enabledState[stateDisabledByDefault[i]] = false; // It will be important to distinguish between false and undefined (undefined meaning the state cap enum is unknown/unsupported).
  }

  //==========
  // Functions
  //==========

  var that = this;

  // Helpers

  this.onmessage = function(msg) {
    //dump('worker GL got ' + JSON.stringify(msg) + '\n');
    switch (msg.op) {
      case 'setPrefetched': {
        WebGLWorker.prototype.prefetchedParameters = msg.parameters;
        WebGLWorker.prototype.prefetchedExtensions = msg.extensions;
        WebGLWorker.prototype.prefetchedPrecisions = msg.precisions;
        removeRunDependency('gl-prefetch');
        break;
      }
      default: throw 'weird gl onmessage ' + JSON.stringify(msg);
    }
  };

  function revname(name) {
    for (var x in that) if (that[x] === name) return x;
    return null;
  }

  // GL

  this.getParameter = function(name) {
    assert(name);
    if (name in this.prefetchedParameters) return this.prefetchedParameters[name];
    switch (name) {
      case this.TEXTURE_BINDING_2D: {
        return bindings.texture2D;
      }
      case this.ARRAY_BUFFER_BINDING: {
        return bindings.arrayBuffer;
      }
      case this.ELEMENT_ARRAY_BUFFER_BINDING: {
        return bindings.elementArrayBuffer;
      }
      case this.CURRENT_PROGRAM: {
        return bindings.program;
      }
      case this.FRAMEBUFFER_BINDING: {
        return bindings.framebuffer;
      }
      case this.ACTIVE_TEXTURE: {
        return bindings.activeTexture;
      }
      case this.GENERATE_MIPMAP_HINT: {
        return bindings.generateMipmapHint;
      }
      case this.BLEND_SRC_RGB: {
        return bindings.blendSrcRGB;
      }
      case this.BLEND_SRC_ALPHA: {
        return bindings.blendSrcAlpha;
      }
      case this.BLEND_DST_RGB: {
        return bindings.blendDstRGB;
      }
      case this.BLEND_DST_ALPHA: {
        return bindings.blendDstAlpha;
      }
      case this.BLEND_EQUATION_RGB: {
        return bindings.blendEquationRGB;
      }
      case this.BLEND_EQUATION_ALPHA: {
        return bindings.blendEquationAlpha;
      }
      default: {
        if (bindings.enabledState[name] !== undefined) return bindings.enabledState[name];
        throw 'TODO: get parameter ' + name + ' : ' + revname(name);
      }
    }
  };
  this.getExtension = function(name) {
    var i = this.prefetchedExtensions.indexOf(name);
    if (i < 0) return null;
    commandBuffer.push(1, name);
    switch (name) {
      case 'EXT_texture_filter_anisotropic': {
        return {
          TEXTURE_MAX_ANISOTROPY_EXT:     0x84FE,
          MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84FF
        };
      }
      case 'WEBGL_draw_buffers': {
        return {
          COLOR_ATTACHMENT0_WEBGL     : 0x8CE0,
          COLOR_ATTACHMENT1_WEBGL     : 0x8CE1,
          COLOR_ATTACHMENT2_WEBGL     : 0x8CE2,
          COLOR_ATTACHMENT3_WEBGL     : 0x8CE3,
          COLOR_ATTACHMENT4_WEBGL     : 0x8CE4,
          COLOR_ATTACHMENT5_WEBGL     : 0x8CE5,
          COLOR_ATTACHMENT6_WEBGL     : 0x8CE6,
          COLOR_ATTACHMENT7_WEBGL     : 0x8CE7,
          COLOR_ATTACHMENT8_WEBGL     : 0x8CE8,
          COLOR_ATTACHMENT9_WEBGL     : 0x8CE9,
          COLOR_ATTACHMENT10_WEBGL    : 0x8CEA,
          COLOR_ATTACHMENT11_WEBGL    : 0x8CEB,
          COLOR_ATTACHMENT12_WEBGL    : 0x8CEC,
          COLOR_ATTACHMENT13_WEBGL    : 0x8CED,
          COLOR_ATTACHMENT14_WEBGL    : 0x8CEE,
          COLOR_ATTACHMENT15_WEBGL    : 0x8CEF,

          DRAW_BUFFER0_WEBGL          : 0x8825,
          DRAW_BUFFER1_WEBGL          : 0x8826,
          DRAW_BUFFER2_WEBGL          : 0x8827,
          DRAW_BUFFER3_WEBGL          : 0x8828,
          DRAW_BUFFER4_WEBGL          : 0x8829,
          DRAW_BUFFER5_WEBGL          : 0x882A,
          DRAW_BUFFER6_WEBGL          : 0x882B,
          DRAW_BUFFER7_WEBGL          : 0x882C,
          DRAW_BUFFER8_WEBGL          : 0x882D,
          DRAW_BUFFER9_WEBGL          : 0x882E,
          DRAW_BUFFER10_WEBGL         : 0x882F,
          DRAW_BUFFER11_WEBGL         : 0x8830,
          DRAW_BUFFER12_WEBGL         : 0x8831,
          DRAW_BUFFER13_WEBGL         : 0x8832,
          DRAW_BUFFER14_WEBGL         : 0x8833,
          DRAW_BUFFER15_WEBGL         : 0x8834,

          MAX_COLOR_ATTACHMENTS_WEBGL : 0x8CDF,
          MAX_DRAW_BUFFERS_WEBGL      : 0x8824,

          drawBuffersWEBGL: function(buffers) {
            that.drawBuffersWEBGL(buffers);
          }
        };
      }
      case 'OES_standard_derivatives': {
        return { FRAGMENT_SHADER_DERIVATIVE_HINT_OES: 0x8B8B };
      }
    };
    return true; // TODO: return an object here
  };
  this.getSupportedExtensions = function() {
    return this.prefetchedExtensions;
  };
  this.getShaderPrecisionFormat = function(shaderType, precisionType) {
    return this.prefetchedPrecisions[shaderType][precisionType];
  };
  this.enable = function(cap) {
    commandBuffer.push(2, cap);
    bindings.enabledState[cap] = true;
  };
  this.isEnabled = function(cap) {
    return bindings.enabledState[cap];
  };
  this.disable = function(cap) {
    commandBuffer.push(3, cap);
    bindings.enabledState[cap] = false;
  };
  this.clear = function(mask) {
    commandBuffer.push(4, mask);
  };
  this.clearColor = function(r, g, b, a) {
    commandBuffer.push(5, r, g, b, a);
  };
  this.createShader = function(type) {
    var id = nextId++;
    commandBuffer.push(6, type, id);
    return { id, what: 'shader', type };
  };
  this.deleteShader = function(shader) {
    if (!shader) return;
    commandBuffer.push(7, shader.id);
  };
  this.shaderSource = function(shader, source) {
    shader.source = source;
    commandBuffer.push(8, shader.id, source);
  };
  this.compileShader = function(shader) {
    commandBuffer.push(9, shader.id);
  };
  this.getShaderInfoLog = function(shader) {
    return ''; // optimistic assumption of success; no proxying
  };
  this.createProgram = function() {
    var id = nextId++;
    commandBuffer.push(10, id);
    return new WebGLProgram(id);
  };
  this.deleteProgram = function(program) {
    if (!program) return;
    commandBuffer.push(11, program.id);
  };
  this.attachShader = function(program, shader) {
    program.shaders.push(shader);
    commandBuffer.push(12, program.id, shader.id);
  };
  this.bindAttribLocation = function(program, index, name) {
    program.nextAttributes[name] = { what: 'attribute', name, size: -1, location: index, type: '?' }; // fill in size, type later
    program.nextAttributeVec[index] = name;
    commandBuffer.push(13, program.id, index, name);
  };
  this.getAttribLocation = function(program, name) {
    // all existing attribs are cached locally
    if (name in program.attributes) return program.attributes[name].location;
    return -1;
  };
  this.linkProgram = function(program) {
    // parse shader sources
    function getTypeId(text) {
      switch (text) {
        case 'bool': return that.BOOL;
        case 'int': return that.INT;
        case 'uint': return that.UNSIGNED_INT;
        case 'float': return that.FLOAT;
        case 'vec2': return that.FLOAT_VEC2;
        case 'vec3': return that.FLOAT_VEC3;
        case 'vec4': return that.FLOAT_VEC4;
        case 'ivec2': return that.INT_VEC2;
        case 'ivec3': return that.INT_VEC3;
        case 'ivec4': return that.INT_VEC4;
        case 'bvec2': return that.BOOL_VEC2;
        case 'bvec3': return that.BOOL_VEC3;
        case 'bvec4': return that.BOOL_VEC4;
        case 'mat2': return that.FLOAT_MAT2;
        case 'mat3': return that.FLOAT_MAT3;
        case 'mat4': return that.FLOAT_MAT4;
        case 'sampler2D': return that.SAMPLER_2D;
        case 'sampler3D': return that.SAMPLER_3D;
        case 'samplerCube': return that.SAMPLER_CUBE;
        default: throw 'not yet recognized type text: ' + text;
      }
    }
    function parseElementType(shader, type, obj, vec) {
      var source = shader.source;
      source = source.replace(/\n/g, '|\n'); // barrier between lines, to make regexing easier
      var newItems = source.match(new RegExp(type + '\\s+\\w+\\s+[\\w,\\s\[\\]]+;', 'g'));
      if (!newItems) return;
      newItems.forEach(function(item) {
        var m = new RegExp(type + '\\s+(\\w+)\\s+([\\w,\\s\[\\]]+);').exec(item);
        assert(m);
        m[2].split(',').map(function(name) { name = name.trim(); return name.search(/\s/) >= 0 ? '' : name }).filter(function(name) { return !!name }).forEach(function(name) {
          var size = 1;
          var open = name.indexOf('[');
          var fullname = name;
          if (open >= 0) {
            var close = name.indexOf(']');
            size = parseInt(name.substring(open+1, close));
            name = name.substr(0, open);
            fullname = name + '[0]';
          }
          if (!obj[name]) {
            obj[name] = { what: type, name: fullname, size, location: -1, type: getTypeId(m[1]) };
            vec?.push(name);
          }
        });
      });
    }

    program.uniforms = {};
    program.uniformVec = [];

    program.attributes = program.nextAttributes;
    program.attributeVec = program.nextAttributeVec;
    program.nextAttributes = {};
    program.nextAttributeVec = [];

    var existingAttributes = {};

    program.shaders.forEach(function(shader) {
      parseElementType(shader, 'uniform', program.uniforms, program.uniformVec);
      parseElementType(shader, 'attribute', existingAttributes, null);
    });

    // bind not-yet bound attributes
    for (var attr in existingAttributes) {
      if (!(attr in program.attributes)) {
        var index = program.attributeVec.length;
        program.attributes[attr] = { what: 'attribute', name: attr, size: -1, location: index, type: '?' }; // fill in size, type later
        program.attributeVec[index] = attr;
        commandBuffer.push(13, program.id, index, attr); // do a bindAttribLocation as well, so this takes effect in the link we are about to do
      }
      program.attributes[attr].size = existingAttributes[attr].size;
      program.attributes[attr].type = existingAttributes[attr].type;
    }

    commandBuffer.push(14, program.id);
  };
  this.getProgramParameter = function(program, name) {
    switch (name) {
      case this.ACTIVE_UNIFORMS: return program.uniformVec.length;
      case this.ACTIVE_ATTRIBUTES: return program.attributeVec.length;
      case this.LINK_STATUS: {
        // optimisticaly return success; client will abort on an actual error. we assume an error-free async workflow
        commandBuffer.push(15, program.id, name);
        return true;
      }
      default: throw 'bad getProgramParameter ' + revname(name);
    }
  };
  this.getActiveAttrib = function(program, index) {
    var name = program.attributeVec[index];
    if (!name) return null;
    return program.attributes[name];
  };
  this.getActiveUniform = function(program, index) {
    var name = program.uniformVec[index];
    if (!name) return null;
    return program.uniforms[name];
  };
  this.getUniformLocation = function(program, name) {
    var fullname = name;
    var index = -1;
    var open = name.indexOf('[');
    if (open >= 0) {
      var close = name.indexOf(']');
      index = parseInt(name.substring(open+1, close));
      name = name.substr(0, open);
    }
    if (!(name in program.uniforms)) return null;
    var id = nextId++;
    commandBuffer.push(16, program.id, fullname, id);
    return { what: 'location', uniform: program.uniforms[name], id, index };
  };
  this.getProgramInfoLog = function(shader) {
    return ''; // optimistic assumption of success; no proxying
  };
  this.useProgram = function(program) {
    commandBuffer.push(17, program ? program.id : 0);
    bindings.program = program;
  };
  this.uniform1i = function(location, data) {
    if (!location) return;
    commandBuffer.push(18, location.id, data);
  };
  this.uniform1f = function(location, data) {
    if (!location) return;
    commandBuffer.push(19, location.id, data);
  };
  this.uniform3fv = function(location, data) {
    if (!location) return;
    commandBuffer.push(20, location.id, new Float32Array(data));
  };
  this.uniform4f = function(location, x, y, z, w) {
    if (!location) return;
    commandBuffer.push(21, location.id, new Float32Array([x, y, z, w]));
  };
  this.uniform4fv = function(location, data) {
    if (!location) return;
    commandBuffer.push(21, location.id, new Float32Array(data));
  };
  this.uniformMatrix4fv = function(location, transpose, data) {
    if (!location) return;
    commandBuffer.push(22, location.id, transpose, new Float32Array(data));
  };
  this.vertexAttrib4fv = function(index, values) {
    commandBuffer.push(23, index, new Float32Array(values));
  };
  this.createBuffer = function() {
    var id = nextId++;
    commandBuffer.push(24, id);
    return new WebGLBuffer(id);
  };
  this.deleteBuffer = function(buffer) {
    if (!buffer) return;
    commandBuffer.push(25, buffer.id);
  };
  this.bindBuffer = function(target, buffer) {
    commandBuffer.push(26, target, buffer ? buffer.id : 0);
    switch (target) {
      case this.ARRAY_BUFFER_BINDING: {
        bindings.arrayBuffer = buffer;
        break;
      }
      case this.ELEMENT_ARRAY_BUFFER_BINDING: {
        bindings.elementArrayBuffer = buffer;
        break;
      }
    }
  };
  function duplicate(something) {
    // clone data properly: handles numbers, null, typed arrays, js arrays and array buffers
    if (!something || typeof something == 'number') return something;
    if (something.slice) return something.slice(0); // ArrayBuffer or js array
    return new something.constructor(something); // typed array
  }
  this.bufferData = function(target, something, usage) {
    commandBuffer.push(27, target, duplicate(something), usage);
  };
  this.bufferSubData = function(target, offset, something) {
    commandBuffer.push(28, target, offset, duplicate(something));
  };
  this.viewport = function(x, y, w, h) {
    commandBuffer.push(29, x, y, w, h);
  };
  this.vertexAttribPointer = function(index, size, type, normalized, stride, offset) {
    commandBuffer.push(30, index, size, type, normalized, stride, offset);
  };
  this.enableVertexAttribArray = function(index) {
    commandBuffer.push(31, index);
  };
  this.disableVertexAttribArray = function(index) {
    commandBuffer.push(32, index);
  };
  this.drawArrays = function(mode, first, count) {
    commandBuffer.push(33, mode, first, count);
  };
  this.drawElements = function(mode, count, type, offset) {
    commandBuffer.push(34, mode, count, type, offset);
  };
  this.getError = function() {
    // optimisticaly return success; client will abort on an actual error. we assume an error-free async workflow
    commandBuffer.push(35);
    return this.NO_ERROR;
  };
  this.createTexture = function() {
    var id = nextId++;
    commandBuffer.push(36, id);
    return new WebGLTexture(id);
  };
  this.deleteTexture = function(texture) {
    if (!texture) return;
    commandBuffer.push(37, texture.id);
    texture.id = 0;
  };
  this.isTexture = function(texture) {
    return texture && texture.what === 'texture' && texture.id > 0 && texture.binding;
  };
  this.bindTexture = function(target, texture) {
    switch (target) {
      case that.TEXTURE_2D: {
        bindings.texture2D = texture;
        break;
      }
    }
    if (texture) texture.binding = target;
    commandBuffer.push(38, target, texture ? texture.id : 0);
  };
  this.texParameteri = function(target, pname, param) {
    commandBuffer.push(39, target, pname, param);
  };
  this.texImage2D = function(target, level, internalformat, width, height, border, format, type, pixels) {
    if (pixels === undefined) {
      format = width; // width, height, border do not exist in the shorter overload
      type = height;
      pixels = border;
      assert(pixels instanceof Image);
      assert(internalformat === format && format === this.RGBA); // HTML Images are RGBA, 8-bit
      assert(type === this.UNSIGNED_BYTE);
      var data = pixels.data;
      width = data.width;
      height = data.height;
      border = 0;
      pixels = new Uint8Array(data.data); // XXX transform from clamped to normal, could have been done in duplicate
    }
    commandBuffer.push(40, target, level, internalformat, width, height, border, format, type, duplicate(pixels));
  };
  this.compressedTexImage2D = function(target, level, internalformat, width, height, border, pixels) {
    commandBuffer.push(41, target, level, internalformat, width, height, border, duplicate(pixels));
  };
  this.activeTexture = function(texture) {
    commandBuffer.push(42, texture);
    bindings.activeTexture = texture;
  };
  this.getShaderParameter = function(shader, pname) {
    switch (pname) {
      case this.SHADER_TYPE: return shader.type;
      case this.COMPILE_STATUS: {
        // optimisticaly return success; client will abort on an actual error. we assume an error-free async workflow
        commandBuffer.push(43, shader.id, pname);
        return true;
      }
      default: throw 'unsupported getShaderParameter ' + pname;
    }
  };
  this.clearDepth = function(depth) {
    commandBuffer.push(44, depth);
  };
  this.depthFunc = function(depth) {
    commandBuffer.push(45, depth);
  };
  this.frontFace = function(depth) {
    commandBuffer.push(46, depth);
  };
  this.cullFace = function(depth) {
    commandBuffer.push(47, depth);
  };
  this.readPixels = function(depth) {
    abort('readPixels is impossible, we are async GL');
  };
  this.pixelStorei = function(pname, param) {
    commandBuffer.push(48, pname, param);
  };
  this.depthMask = function(flag) {
    commandBuffer.push(49, flag);
  };
  this.depthRange = function(near, far) {
    commandBuffer.push(50, near, far);
  };
  this.blendFunc = function(sfactor, dfactor) {
    commandBuffer.push(51, sfactor, dfactor);
    bindings.blendSrcRGB = bindings.blendSrcAlpha = sfactor;
    bindings.blendDstRGB = bindings.blendDstAlpha = dfactor;
  };
  this.scissor = function(x, y, width, height) {
    commandBuffer.push(52, x, y, width, height);
  };
  this.colorMask = function(red, green, blue, alpha) {
    commandBuffer.push(53, red, green, blue, alpha);
  };
  this.lineWidth = function(width) {
    commandBuffer.push(54, width);
  };
  this.createFramebuffer = function() {
    var id = nextId++;
    commandBuffer.push(55, id);
    return new WebGLFramebuffer(id);
  };
  this.deleteFramebuffer = function(framebuffer) {
    if (!framebuffer) return;
    commandBuffer.push(56, framebuffer.id);
  };
  this.bindFramebuffer = function(target, framebuffer) {
    commandBuffer.push(57, target, framebuffer ? framebuffer.id : 0);
    bindings.framebuffer = framebuffer;
  };
  this.framebufferTexture2D = function(target, attachment, textarget, texture, level) {
    commandBuffer.push(58, target, attachment, textarget, texture ? texture.id : 0, level);
  };
  this.checkFramebufferStatus = function(target) {
    return this.FRAMEBUFFER_COMPLETE; // XXX totally wrong
  };
  this.createRenderbuffer = function() {
    var id = nextId++;
    commandBuffer.push(59, id);
    return new WebGLRenderbuffer(id);
  };
  this.deleteRenderbuffer = function(renderbuffer) {
    if (!renderbuffer) return;
    commandBuffer.push(60, renderbuffer.id);
  };
  this.bindRenderbuffer = function(target, renderbuffer) {
    commandBuffer.push(61, target, renderbuffer ? renderbuffer.id : 0);
  };
  this.renderbufferStorage = function(target, internalformat, width, height) {
    commandBuffer.push(62, target, internalformat, width, height);
  };
  this.framebufferRenderbuffer = function(target, attachment, renderbuffertarget, renderbuffer) {
    commandBuffer.push(63, target, attachment, renderbuffertarget, renderbuffer ? renderbuffer.id : 0);
  };
  this.debugPrint = function(text) { // useful to interleave debug output properly with client GL commands
    commandBuffer.push(64, text);
  };
  this.hint = function(target, mode) {
    commandBuffer.push(65, target, mode);
    if (target == this.GENERATE_MIPMAP_HINT) bindings.generateMipmapHint = mode;
  };
  this.blendEquation = function(mode) {
    commandBuffer.push(66, mode);
    bindings.blendEquationRGB = bindings.blendEquationAlpha = mode;
  };
  this.generateMipmap = function(target) {
    commandBuffer.push(67, target);
  };
  this.uniformMatrix3fv = function(location, transpose, data) {
    if (!location) return;
    commandBuffer.push(68, location.id, transpose, new Float32Array(data));
  };
  this.stencilMask = function(mask) {
    commandBuffer.push(69, mask);
  };
  this.clearStencil = function(s) {
    commandBuffer.push(70, s);
  };
  this.texSubImage2D = function(target, level, xoffset, yoffset, width, height, format, type, pixels) {
    if (pixels === undefined) {
      // shorter overload:      target, level, xoffset, yoffset, format,  type, pixels
      var formatTemp = format;
      format = width;
      type = height;
      pixels = formatTemp;
      assert(pixels instanceof Image);
      assert(format === this.RGBA); // HTML Images are RGBA, 8-bit
      assert(type === this.UNSIGNED_BYTE);
      var data = pixels.data;
      width = data.width;
      height = data.height;
      pixels = new Uint8Array(data.data); // XXX transform from clamped to normal, could have been done in duplicate
    }
    commandBuffer.push(71, target, level, xoffset, yoffset, width, height, format, type, duplicate(pixels));
  };
  this.uniform3f = function(location, x, y, z) {
    if (!location) return;
    commandBuffer.push(72, location.id, x, y, z);
  };
  this.blendFuncSeparate = function(srcRGB, dstRGB, srcAlpha, dstAlpha) {
    commandBuffer.push(73, srcRGB, dstRGB, srcAlpha, dstAlpha);
    bindings.blendSrcRGB = srcRGB;
    bindings.blendSrcAlpha = srcAlpha;
    bindings.blendDstRGB = dstRGB;
    bindings.blendDstAlpha = dstAlpha;
  }
  this.uniform2fv = function(location, data) {
    if (!location) return;
    commandBuffer.push(74, location.id, new Float32Array(data));
  };
  this.texParameterf = function(target, pname, param) {
    commandBuffer.push(75, target, pname, param);
  };
  this.isContextLost = function() {
    // optimisticaly return that everything is ok; client will abort on an actual context loss. we assume an error-free async workflow
    commandBuffer.push(76);
    return false;
  };
  this.isProgram = function(program) {
    return program && program.what === 'program';
  };
  this.blendEquationSeparate = function(rgb, alpha) {
    commandBuffer.push(77, rgb, alpha);
    bindings.blendEquationRGB = rgb;
    bindings.blendEquationAlpha = alpha;
  };
  this.stencilFuncSeparate = function(face, func, ref, mask) {
    commandBuffer.push(78, face, func, ref, mask);
  };
  this.stencilOpSeparate = function(face, fail, zfail, zpass) {
    commandBuffer.push(79, face, fail, zfail, zpass);
  };
  this.drawBuffersWEBGL = function(buffers) {
    commandBuffer.push(80, buffers);
  };
  this.uniform1iv = function(location, data) {
    if (!location) return;
    commandBuffer.push(81, location.id, new Int32Array(data));
  };
  this.uniform1fv = function(location, data) {
    if (!location) return;
    commandBuffer.push(82, location.id, new Float32Array(data));
  };

  // Setup

  var theoreticalTracker = new FPSTracker('server (theoretical)');
  var throttledTracker = new FPSTracker('server (client-throttled)');

  function preRAF() {
    //theoreticalTracker.tick();
    // if too many frames in queue, skip a main loop iter
    if (Math.abs(frameId - clientFrameId) >= 4) {
      return false;
    }
    //throttledTracker.tick();
  }

  var postRAFed = false;

  function postRAF() {
    if (commandBuffer.length > 0) {
      postMessage({ target: 'gl', op: 'render', commandBuffer: commandBuffer });
      commandBuffer = [];
    }
    postRAFed = true;
  }

  assert(!Browser.doSwapBuffers);
  Browser.doSwapBuffers = postRAF;

  var trueRAF = window.requestAnimationFrame;
  window.requestAnimationFrame = function(func) {
    trueRAF(function() {
      if (preRAF() === false) {
        window.requestAnimationFrame(func); // skip this frame, do it later
        return;
      }
      postRAFed = false;
      func();
      if (!postRAFed) { // if we already posted this frame (e.g. from doSwapBuffers) do not post again
        postRAF();
      }
    });
  }

}

// share prefetched data among all instances

WebGLWorker.prototype.prefetchedParameters = {};
WebGLWorker.prototype.prefetchedExtensions = {};
WebGLWorker.prototype.prefetchedPrecisions = {};

// end include: webGLWorker.js
// include: proxyWorker.js
/*
 * Implements the server/worker side of proxyClient.js.
 * This code gets included in the main emscripten output
 * when PROXY_TO_WORKER is used. The resulting code then
 * needs to be run in a worker and receive events from
 * proxyClient.js running on the main thread.
 */

if (!ENVIRONMENT_IS_NODE) {

function FPSTracker(text) {
  var last = 0;
  var mean = 0;
  var counter = 0;
  this.tick = () => {
    var now = Date.now();
    if (last > 0) {
      var diff = now - last;
      mean = 0.99*mean + 0.01*diff;
      if (counter++ === 60) {
        counter = 0;
        dump(text + ' fps: ' + (1000/mean).toFixed(2) + '\n');
      }
    }
    last = now;
  }
}

function Element() { throw 'TODO: Element' }
function HTMLCanvasElement() { throw 'TODO: HTMLCanvasElement' }
function HTMLVideoElement() { throw 'TODO: HTMLVideoElement' }

var KeyboardEvent = {
  'DOM_KEY_LOCATION_RIGHT': 2,
};

function PropertyBag() {
  this.addProperty = () => {};
  this.removeProperty = () => {};
  this.setProperty = () => {};
};

var IndexedObjects = {
  nextId: 1,
  cache: {},
  add(object) {
    object.id = this.nextId++;
    this.cache[object.id] = object;
  }
};

function EventListener() {
  this.listeners = {};

  this.addEventListener = function addEventListener(event, func) {
    this.listeners[event] ||= [];
    this.listeners[event].push(func);
  };

  this.removeEventListener = function(event, func) {
    var list = this.listeners[event];
    if (!list) return;
    var me = list.indexOf(func);
    if (me < 0) return;
    list.splice(me, 1);
  };

  this.fireEvent = function(event) {
    event.preventDefault = () => {};

    if (event.type in this.listeners) {
      this.listeners[event.type].forEach((listener) => listener(event));
    }
  }
}

function Image() {
  IndexedObjects.add(this);
  EventListener.call(this);
  var src = '';
  Object.defineProperty(this, 'src', {
    set: (value) => {
      src = value;
      assert(this.id);
      postMessage({ target: 'Image', method: 'src', src, id: this.id });
    },
    get: () => src
  });
}
Image.prototype.onload = () => {};
Image.prototype.onerror = () => {};

var HTMLImageElement = Image;

var window = this;
var windowExtra = new EventListener();
for (var x in windowExtra) window[x] = windowExtra[x];

window.close = () => {
  postMessage({ target: 'window', method: 'close' });
};

window.alert = (text) => {
  err(`alert forever: ${text}`);
  while (1) {};
};

window.scrollX = window.scrollY = 0; // TODO: proxy these

window.WebGLRenderingContext = WebGLWorker;

window.requestAnimationFrame = (function() {
  // similar to Browser.requestAnimationFrame
  var nextRAF = 0;
  return function(func) {
    // try to keep 60fps between calls to here
    var now = Date.now();
    if (nextRAF === 0) {
      nextRAF = now + 1000/60;
    } else {
      while (now + 2 >= nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
        nextRAF += 1000/60;
      }
    }
    var delay = Math.max(nextRAF - now, 0);
    setTimeout(func, delay);
  };
})();

var webGLWorker = new WebGLWorker();

var document = new EventListener();

document.createElement = (what) => {
  switch (what) {
    case 'canvas': {
      var canvas = new EventListener();
      canvas.ensureData = () => {
        if (!canvas.data || canvas.data.width !== canvas.width || canvas.data.height !== canvas.height) {
          canvas.data = {
            width: canvas.width,
            height: canvas.height,
            data: new Uint8Array(canvas.width*canvas.height*4)
          };
          if (canvas === Module['canvas']) {
            postMessage({ target: 'canvas', op: 'resize', width: canvas.width, height: canvas.height });
          }
        }
      };
      canvas.getContext = (type, attributes) => {
        if (canvas === Module['canvas']) {
          postMessage({ target: 'canvas', op: 'getContext', type, attributes });
        }
        if (type === '2d') {
          return {
            getImageData: (x, y, w, h) => {
              assert(x == 0 && y == 0 && w == canvas.width && h == canvas.height);
              canvas.ensureData();
              return {
                width: canvas.data.width,
                height: canvas.data.height,
                data: new Uint8Array(canvas.data.data) // TODO: can we avoid this copy?
              };
            },
            putImageData: (image, x, y) => {
              canvas.ensureData();
              assert(x == 0 && y == 0 && image.width == canvas.width && image.height == canvas.height);
              canvas.data.data.set(image.data); // TODO: can we avoid this copy?
              if (canvas === Module['canvas']) {
                postMessage({ target: 'canvas', op: 'render', image: canvas.data });
              }
            },
            drawImage: (image, x, y, w, h, ox, oy, ow, oh) => {
              assert (!x && !y && !ox && !oy);
              assert(w === ow && h === oh);
              assert(canvas.width === w || w === undefined);
              assert(canvas.height === h || h === undefined);
              assert(image.width === canvas.width && image.height === canvas.height);
              canvas.ensureData();
              canvas.data.data.set(image.data.data); // TODO: can we avoid this copy?
              if (canvas === Module['canvas']) {
                postMessage({ target: 'canvas', op: 'render', image: canvas.data });
              }
            }
          };
        } else {
          return webGLWorker;
        }
      };
      canvas.boundingClientRect = {};
      canvas.getBoundingClientRect = () => ({
        width: canvas.boundingClientRect.width,
        height: canvas.boundingClientRect.height,
        top: canvas.boundingClientRect.top,
        left: canvas.boundingClientRect.left,
        bottom: canvas.boundingClientRect.bottom,
        right: canvas.boundingClientRect.right
      });
      canvas.style = new PropertyBag();
      canvas.exitPointerLock = () => {};

      canvas.width_ ||= 0;
      canvas.height_ ||= 0;
      Object.defineProperty(canvas, 'width', {
        set: (value) => {
          canvas.width_ = value;
          if (canvas === Module['canvas']) {
            postMessage({ target: 'canvas', op: 'resize', width: canvas.width_, height: canvas.height_ });
          }
        },
        get: () => canvas.width_
      });
      Object.defineProperty(canvas, 'height', {
        set: (value) => {
          canvas.height_ = value;
          if (canvas === Module['canvas']) {
            postMessage({ target: 'canvas', op: 'resize', width: canvas.width_, height: canvas.height_ });
          }
        },
        get: () => canvas.height_
      });

      var style = {
        parentCanvas: canvas,
        removeProperty: () => {},
        setProperty:  () => {},
      };

      Object.defineProperty(style, 'cursor', {
        set: (value) => {
          if (!style.cursor_ || style.cursor_ !== value) {
            style.cursor_ = value;
            if (style.parentCanvas === Module['canvas']) {
              postMessage({ target: 'canvas', op: 'setObjectProperty', object: 'style', property: 'cursor', value: style.cursor_ });
            }
          }
        },
        get: () => style.cursor,
      });

      canvas.style = style;
      return canvas;
    }
    default: {
      throw 'document.createElement ' + what;
    }
  }
};

document.getElementById = (id) => {
  if (id === 'canvas' || id === 'application-canvas') {
    return Module.canvas;
  }
  throw 'document.getElementById failed on ' + id;
};

document.querySelector = (id) => {
  if (id === '#canvas' || id === '#application-canvas' || id === 'canvas' || id === 'application-canvas') {
    return Module.canvas;
  }
  throw 'document.querySelector failed on ' + id;
};

document.documentElement = {};

document.styleSheets = [{
  cssRules: [], // TODO: forward to client
  insertRule(rule, i) {
    this.cssRules.splice(i, 0, rule);
  }
}];

document.URL = 'http://worker.not.yet.ready.wait.for.window.onload?fake';

function Audio() {
  warnOnce('faking Audio elements, no actual sound will play');
}
Audio.prototype = new EventListener();
Object.defineProperty(Audio.prototype, 'src', {
  set(value) {
    if (value[0] === 'd') return; // ignore data urls
    this.onerror();
  },
});

Audio.prototype.play = () => {};
Audio.prototype.pause = () => {};

Audio.prototype.cloneNode = () => new Audio;

function AudioContext() {
  warnOnce('faking WebAudio elements, no actual sound will play');
  var makeNode = () => {
    return {
      connect: () => {},
      disconnect: () => {},
    }
  };
  this.listener = {
    setPosition: () => {},
    setOrientation: () => {},
  };
  this.decodeAudioData = () => {}; // ignore callbacks
  this.createBuffer = makeNode;
  this.createBufferSource = makeNode;
  this.createGain = makeNode;
  this.createPanner = makeNode;
}

var screen = {
  width: 0,
  height: 0
};

Module.canvas = document.createElement('canvas');

Module.setStatus = () => {};

out = (x) => {
  //dump('OUT: ' + x + '\n');
  postMessage({ target: 'stdout', content: x });
};
err = (x) => {
  //dump('ERR: ' + x + '\n');
  postMessage({ target: 'stderr', content: x });
};

// Frame throttling

var frameId = 0;
var clientFrameId = 0;

var postMainLoop = Module['postMainLoop'];
Module['postMainLoop'] = () => {
  postMainLoop?.();
  // frame complete, send a frame id
  postMessage({ target: 'tick', id: frameId++ });
  commandBuffer = [];
};

// Wait to start running until we receive some info from the client

  addRunDependency('gl-prefetch');
  addRunDependency('worker-init');

}

// buffer messages until the program starts to run

var messageBuffer = null;
var messageResenderTimeout = null;
var calledMain = false;

// Set calledMain to true during postRun which happens onces main returns
Module['postRun'] ||= [];
if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
Module['postRun'].push(() => { calledMain = true; });

function messageResender() {
  if (calledMain) {
    assert(messageBuffer && messageBuffer.length > 0);
    messageResenderTimeout = null;
    messageBuffer.forEach(onmessage);
    messageBuffer = null;
  } else {
    messageResenderTimeout = setTimeout(messageResender, 100);
  }
}

function onMessageFromMainEmscriptenThread(message) {
  if (!calledMain && !message.data.preMain) {
    if (!messageBuffer) {
      messageBuffer = [];
      messageResenderTimeout = setTimeout(messageResender, 100);
    }
    messageBuffer.push(message);
    return;
  }
  if (calledMain && messageResenderTimeout) {
    clearTimeout(messageResenderTimeout);
    messageResender();
  }
  //dump('worker got ' + JSON.stringify(message.data).substr(0, 150) + '\n');
  switch (message.data.target) {
    case 'document': {
      document.fireEvent(message.data.event);
      break;
    }
    case 'window': {
      window.fireEvent(message.data.event);
      break;
    }
    case 'canvas': {
      if (message.data.event) {
        Module.canvas.fireEvent(message.data.event);
      } else if (message.data.boundingClientRect) {
        Module.canvas.boundingClientRect = message.data.boundingClientRect;
      } else throw 'ey?';
      break;
    }
    case 'gl': {
      webGLWorker.onmessage(message.data);
      break;
    }
    case 'tock': {
      clientFrameId = message.data.id;
      break;
    }
    case 'Image': {
      var img = IndexedObjects.cache[message.data.id];
      switch (message.data.method) {
        case 'onload': {
          img.width = message.data.width;
          img.height = message.data.height;
          img.data = { width: img.width, height: img.height, data: message.data.data };
          img.complete = true;
          img.onload();
          break;
        }
        case 'onerror': {
          img.onerror({ srcElement: img });
          break;
        }
      }
      break;
    }
    case 'IDBStore': {
      assert(message.data.method === 'response');
      assert(IDBStore.pending);
      IDBStore.pending(message.data);
      break;
    }
    case 'worker-init': {
      Module.canvas = document.createElement('canvas');
      screen.width = Module.canvas.width_ = message.data.width;
      screen.height = Module.canvas.height_ = message.data.height;
      Module.canvas.boundingClientRect = message.data.boundingClientRect;
      if (ENVIRONMENT_IS_NODE)
      document.URL = message.data.URL;
      window.fireEvent({ type: 'load' });
      removeRunDependency('worker-init');
      break;
    }
    case 'custom': {
      if (Module['onCustomMessage']) {
        Module['onCustomMessage'](message);
      } else {
        throw 'Custom message received but worker Module.onCustomMessage not implemented.';
      }
      break;
    }
    case 'setimmediate': {
      if (Module['setImmediates']) Module['setImmediates'].shift()();
      break;
    }
    default: throw 'wha? ' + message.data.target;
  }
};

  onmessage = onMessageFromMainEmscriptenThread;

// proxyWorker.js has defined 'document' and 'window' objects above, so need to
// initialize them for library_html5.js explicitly here.
if (typeof specialHTMLTargets != 'undefined') {
  specialHTMLTargets = [0, document, window];
}

function postCustomMessage(data) {
  postMessage({ target: 'custom', userData: data });
}
// end include: proxyWorker.js
}

Module['addRunDependency'] = addRunDependency;
Module['removeRunDependency'] = removeRunDependency;
Module['FS_createPath'] = FS.createPath;
Module['FS_createLazyFile'] = FS.createLazyFile;
Module['FS_createDevice'] = FS.createDevice;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_unlink'] = FS.unlink;
var missingLibrarySymbols = [
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'getCallstack',
  'emscriptenLog',
  'convertPCtoSourceLocation',
  'readEmAsmArgs',
  'jstoi_q',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'stringToUTF8',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'demangle',
  'jsStackTrace',
  'stackTrace',
  'getEnvStrings',
  'checkWasiClock',
  'doReadv',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'ExceptionInfo',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'heapAccessShiftForWebGLHeap',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  '__glGenObject',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'SDL_unicode',
  'SDL_ttfContext',
  'SDL_audio',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'FS_createFolder',
  'FS_createLink',
  'FS_readFile',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'stackAlloc',
  'stackSave',
  'stackRestore',
  'getTempRet0',
  'setTempRet0',
  'writeStackCookie',
  'checkStackCookie',
  'convertI32PairToI53Checked',
  'ptrToString',
  'zeroMemory',
  'exitJS',
  'getHeapMax',
  'growMemory',
  'ENV',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'ERRNO_CODES',
  'ERRNO_MESSAGES',
  'DNS',
  'Protocols',
  'Sockets',
  'initRandomFill',
  'randomFill',
  'timers',
  'warnOnce',
  'UNWIND_CACHE',
  'readEmAsmArgsArray',
  'jstoi_s',
  'handleException',
  'keepRuntimeAlive',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'wasmTable',
  'noExitRuntime',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'lengthBytesUTF8',
  'intArrayFromString',
  'UTF16Decoder',
  'JSEvents',
  'specialHTMLTargets',
  'findCanvasEventTarget',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'ExitStatus',
  'doWritev',
  'safeSetTimeout',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'Browser',
  'setMainLoop',
  'wget',
  'SYSCALLS',
  'preloadPlugins',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'emscripten_webgl_power_preferences',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'allocateUTF8',
  'allocateUTF8OnStack',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain() {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = _main;

  var argc = 0;
  var argv = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain();

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();


// end include: postamble.js
