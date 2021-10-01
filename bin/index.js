#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const Axios = require('axios')

const yargs = require("yargs");
const usage = "\nUsage: ocr image_url";
const options = yargs.usage(usage).argv;

const fileName = path.basename(yargs.argv._[0]);
const imgURL = yargs.argv._[0];

async function downloadImage(url, filepath) {
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
    });
}

downloadImage(imgURL, fileName);

const spawn = require("child_process").spawn;
const pythonProcess = spawn('python3',["./ocr.py", fileName]);

//output from ocr.py
pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
});
