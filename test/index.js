const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const { exec, execSync } = require('node:child_process');

const createPsMem = (name, logFile, interval = 0.2) => {
    const ps = exec(`python3 ./watch_memory.py -l ${logFile} -n ${name} -t ${interval} `, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });

    var cleanExit = function () {
        console.log('Killing logging process', ps.kill('SIGKILL'));
        process.off('SIGINT', cleanExit);
        process.off('SIGTERM', cleanExit);
    };
    process.on('SIGINT', cleanExit); // catch ctrl-c
    process.on('SIGTERM', cleanExit); // catch kill

    return ps;
}

const withMemoryLogging = async (name, logFile, func) => {
    const ps = createPsMem(name, logFile, 0.1);
    const result = await func();
    console.log('Killing logging process', ps.kill('SIGKILL'));

    return result;
};


const fs = require('fs');
const { Builder } = require('selenium-webdriver');
const screen = {
    width: 640,
    height: 480
};

if (!fs.existsSync('./tmp'))
    fs.mkdirSync('./tmp');

if (!fs.existsSync('./output'))
    fs.mkdirSync('./output');

let resultFileNames = [];

const executeTest = async (browser, driver) => {
    await driver.get('http://127.0.0.1:5500/example/web/shell_minimal_worker.html');
    const result = await driver.executeScript(`return window.runSimulation();`);
    console.log(browser, result.time);

    const files = result.files
    // save files to disk
    for (const file of files) {
        const path = `./output/${browser}-${file.name}`;
        fs.writeFileSync(path, file.content);
        console.log(`File saved to ${path}`);
    }

    resultFileNames = files.map(file => file.name);
};

const chromeTest = async () => {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();
    try {
        await executeTest('Chrome', driver);
    } finally {
        await driver.quit();
    }
}

const firefoxTest = async () => {
    let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless().windowSize(screen)).build();
    try {
        await executeTest('Firefox', driver);
    } finally {
        await driver.quit();
    }
}

const nativeTest = async () => {

    // copy files from native g4geom,exampleB1 to tmp folder
    const files = [
        'exampleB1.in',
        'exampleB1',
        'g4geom.txt']

    if (!fs.existsSync('./tmp/native'))
        fs.mkdirSync('./tmp/native', { recursive: true });
    for (const file of files)
        fs.copyFileSync(`../example/B1/build/native/${file}`, `./tmp/native/${file}`);


    // run compiled c++ code 
    execSync("cd ./tmp/native && ./exampleB1", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
    });

    // copy result files to output folder
    for (const file of resultFileNames) {
        const path = `./output/Native-${file}`;
        fs.copyFileSync(`./tmp/native/${file}`, path);
        console.log(`File saved to ${path}`);
    }

    // read time from time.txt
    const time = fs.readFileSync('./tmp/native/time.txt', { encoding: 'utf8' });
    console.log('Native', + time);
}

const runTests = async () => {
    await withMemoryLogging('Chrome', './tmp/chrome_memory.log', chromeTest);
    await withMemoryLogging('Firefox', './tmp/firefox_memory.log', firefoxTest);
    await withMemoryLogging('Native', './tmp/native_memory.log', nativeTest);
    ;
}

runTests();
