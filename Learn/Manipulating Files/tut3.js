// Reading files with Node.js
/*
const fs = require('node:fs');
const fsp = require('node:fs/promises');
*/

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import path from 'path';

const jatinP = './Users/Jatin.txt'

//'fs.readFile()':
fs.readFile(jatinP, (err, data)=>{
    if (err) {
        console.log(err)
        return;
    }
    console.log(data);
    console.log(data.toString(), '\n', 'readFile');
});

//you can use the synchronous version 'fs.readFileSync()':

try {
    let data = fs.readFileSync(jatinP, 'utf8')
    console.log(data, '\n', 'readFileSync')
} catch (err) {
    console.log(err)
};

//'fsPromises.readFile()':

async function example() {
  try {
    const data = await fsp.readFile(jatinP, { encoding: 'utf8' });
    console.log(data, '\n', 'fs/promises');
  } catch (err) {
    console.error(err);
  }
}
example();

//...................................

// All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() read the full content of the file in memory before returning the data.

// This means that big files are going to have a major impact on your memory consumption and speed of execution of the program.

// In this case, a better option is to read the file content using streams as it is more memory efficient.

const fileUrl = 'https://www.gutenberg.org/files/2701/2701-0.txt';
const outputFilePath = path.join(process.cwd(), 'moby.md');

async function downloadFile(url, outputPath) {
    const response = await fetch(url);
    if (!response.ok || !response.body) {
        // consuming the response body is mandatory: https://undici.nodejs.org/#/?id=garbage-collection
        await response.body?.cancel();
        throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
    }
    const fileStream = fs.createWriteStream(outputPath);
    console.log(`Downloading file from ${url} to ${outputPath}`);
    await pipeline(response.body, fileStream);
    console.log('File downloaded successfully');
}
//readable stream: because we wanna see stream chunks log in terminal, not needed actually.
let i = 0;
async function readFile(filePath) {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    try {
        for await (const chunk of readStream) {
            console.log('--- File chunk start ---');
            // console.log(chunk);
            console.log(++i)
            console.log('--- File chunk end ---');
        }
        console.log('Finished reading the file.');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}
try {
    await downloadFile(fileUrl, outputFilePath);
    await readFile(outputFilePath);
} catch (error) {
    console.error(`Error: ${error.message}`);
};