
self.dependecyArray = new Set();


var compiledModule = null;
var preModule = {
    preRun: [],
    postRun: [],
    onRuntimeInitialized: function () {
        console.log("onRuntimeInitialized");
        postMessage({ type: 'event', data: "onRuntimeInitialized" });
    },
    instantiateWasm: function (info, receiveInstance) {
        WebAssembly.instantiate(compiledModule, info).then(instance => {
            receiveInstance(instance, compiledModule);
        });

        return {};
    },
    print: (function () {

        return function (text) {
            // if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');

            // // console.log(text);
            // postMessage({ type: 'print', data: text });

        };
    })(),
};

preModule['locateFile'] = function (path, prefix) {
    // if it's a mem init file, use a custom dir
    if (path.endsWith(".data") || path.endsWith(".wasm")) return "/example/B1/build/wasm/" + path;
    // otherwise, use the default, the prefix (JS file's dir) + the path
    return prefix + path;
}


var Module = preModule;

importScripts("../B1/build/wasm/exampleB1.js")

self.onmessage = function (e) {
    if (e.data.type === 'module') {
        compiledModule = e.data.module;
        runModule();
    }
}

function runModule() {
    createModule(preModule).then((Module) => {
        const FS = Module.FS;

        const writeFile = (data) => {
            const useCustomInput = data && 'input' in data && data.input && data.input.length > 0;
            const inputFileName = 'example.in';
            const nWorkers = data.nWorkers ?? 1;

            if (useCustomInput)
                FS.writeFile(inputFileName, data.input);
            else
                FS.writeFile(inputFileName, FS.readFile('exampleB1.in', { encoding: 'utf8' }));

            const inputFile = FS.readFile(inputFileName, { encoding: 'utf8' });
            console.log(inputFileName, inputFile);

            //  find lines with /score/dumpQuantityToFile and get the file names
            const lines = inputFile.split('\n');
            const dumpQuantityToFileLines = lines.filter(line => line.includes('/score/dumpQuantityToFile'));
            const resultFileNames = dumpQuantityToFileLines.map(line => line.split(' ')[3]);
            console.log('resultFileNames', resultFileNames);

            //  replace line in file /run/beamOn N with /run/beamOn N/4
            const beamOnLine = lines.find(line => line.includes('/run/beamOn'));
            console.log('beamOnLine', beamOnLine);
            const beamOn = beamOnLine.split(' ')[1];
            console.log('beamOn', beamOnLine.split(' '));
            console.log('beamOn', beamOn);
            const newBeamOn = Math.floor(beamOn / nWorkers);
            const newInputFile = inputFile.replace(beamOnLine, `/run/beamOn ${newBeamOn}`);
            console.log('newInputFile', newInputFile);

            FS.writeFile(inputFileName, newInputFile);

            const preInit = Date.now()
            console.log('init');
            Module.init(data.seed, data.nWorkers);
            const preRun = Date.now()

            console.log('run');
            const fullTime = Module.run(inputFileName);

            // const resultFiles = resultFileNames.map(fileName => ({ name: fileName, content: FS.readFile(fileName, { encoding: 'utf8' }) }));
            const resultFiles = [];


            const preClear = Date.now()
            console.log('clear');
            Module.clear();

            const end = Date.now()


            postMessage({
                type: 'result', data: {
                    time: fullTime, files: resultFiles, times: {
                        preInit,
                        init: preRun - preInit,
                        preRun,
                        run: preClear - preRun,
                        preClear,
                        clear: end - preClear,
                        end
                    }
                }
            });

            close();
        }

        self.addEventListener("message", function (e) {

            writeFile(e.data)
        }, false);
    });
}



