#! /usr/bin/env node
const yargs = require("yargs");
const usage = "\nUsage: ocr image";
const options = yargs.usage(usage).argv;

const spawn = require("child_process").spawn;
const pythonProcess = spawn('python3',["./ocr.py", yargs.argv._]);

//output from ocr.py
pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
});
