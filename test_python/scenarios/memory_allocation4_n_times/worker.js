importScripts("./index.js");

const timeStamps = [];

timeStamps.push(["create_module", performance.now()]);

createModule().then((Module) => {
  timeStamps.push(["start_main", performance.now()]);
  Module._main();
  timeStamps.push(["end_main", performance.now()]);

  postMessage({ type: "result", data: timeStamps });

  close();
});
