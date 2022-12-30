
self.dependecyArray = new Set();

var preModule = {
    preRun: [function () {

        FS.createLazyFile('/', 'exampleB1.in', '/wasm/B1/build/exampleB1.in', true, true);

    }],
    postRun: [],
    onRuntimeInitialized: function () {
        console.log("onRuntimeInitialized");
        postMessage({ type: 'event', data: "onRuntimeInitialized" });
    },
    print: (function () {

        return function (text) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');

            console.log(text);
            postMessage({ type: 'print', data: text });

        };
    })(),

    setStatus: function (text) {
        if (!preModule.setStatus.last) preModule.setStatus.last = { time: Date.now(), text: '' };
        if (text === preModule.setStatus.last.text) return;
        var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
        var now = Date.now();
        if (m && now - preModule.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
        preModule.setStatus.last.time = now;
        preModule.setStatus.last.text = text;
        postMessage({ type: 'status', data: text });
    },
    totalDependencies: 0,
    monitorRunDependencies: function (left) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        preModule.setStatus(left ? 'Preparing... (' + (this.totalDependencies - left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
    }
};

preModule['locateFile'] = function (path, prefix) {
    // if it's a mem init file, use a custom dir
    if (path.endsWith(".data") || path.endsWith(".wasm")) return "/example/B1/build/wasm/" + path;
    // otherwise, use the default, the prefix (JS file's dir) + the path
    return prefix + path;
}

preModule.setStatus('Downloading...');

var Module = preModule;


importScripts("../B1/build/wasm/exampleB1.js")


const writeFile = (data) => {
    FS.writeFile('example.in', data);
    var contents = FS.readFile('example.in', { encoding: 'utf8' });
    console.log(contents);

    Module.init();

    Module.run('example.in');

    // console.log(self.dependecyArray)  
    

    // Module.run('exampleB1.in');
    postMessage({ type: 'result', data: self.fullTime });

    Module.clear();

    var contents = FS.readFile('nOfStepGamma.txt', { encoding: 'utf8' });
    console.log(contents);

}

self.addEventListener("message", function (e) {
    writeFile(e.data)
}, false);


