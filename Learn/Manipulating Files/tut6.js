//Working with folders in Node.js

const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
// import fs from 'node:fs';


//Check if a folder exists

//Use fs.access() or fsPromises.access() to check if the folder exists and Node.js can access it with its permissions.

//..........................

//Create a new folder

//Use fs.mkdir() or fs.mkdirSync() or fsPromises.mkdir() to create a new folder.

const url = './Public';
const url2 = './Public2';
const url3 = './Users';

try {
    if(!fs.existsSync(url)){
        fs.mkdirSync(url);
    }
} catch (err) {
    console.log(err);
}

// try {
//     if(!fs.access(url2)){
//         fs.mkdirSync(url2)
//     };
// } catch (err) {
//     console.log(err);
// }

//.................................

//Read the content of a directory

// Use fs.readdir() or fs.readdirSync() or fsPromises.readdir() to read the contents of a directory.

console.log(fs.readdirSync(url)); 
// console.log(fs.readdirSync('./DoesNotExist')); //Error
console.log(fs.readdirSync(url3));

//to get complete path of items in the file:

let arr1 = fs.readdirSync(url3);

arr1 = arr1.map(item=>{
    // return `${url3}/${item}`
    return path.join(url3, item);
});
console.log(arr1);

//

const isFile = fileName => {
    // return fs.statSync(fileName).isFile();
    return !fs.statSync(fileName).isFile();
};

let arr2 = fs.readdirSync(url3);

arr2 = arr2.map(item=>{
    return path.join(url3, item)
}).filter(isFile);

console.log(arr2)

//..............................

//Rename a folder

//Use fs.rename() or fs.renameSync() or fsPromises.rename() to rename folder. The first parameter is the current path, the second the new path:

/*
fs.mkdirSync('./Users/test1').catch(err=>{console.log(err)});
fs.mkdirSync('./Users/test2').catch(err=>{console.log(err)});
fs.mkdirSync('./Users/test3').catch(err=>{console.log(err)});

fs.rename('./Users/test1', './Users/testing1', err=>{
    if(err){
        console.log(err);
    }
});

fs.renameSync('./Users/test2', './Users/testing2').catch(err=>{
    console.log(err)
});

fsp.rename('./Users/test3', './Users/testing3').catch(err=>{
    console.log(err)
});

//..............................

//Remove a folder

//Use fs.rmdir() or fs.rmdirSync() or fsPromises.rmdir() to remove a folder.

fs.rmdir('./Users/testing1', err=>{
    if(err){
        console.log(err);
    }
});

try {
    fs.rmdirSync('./Users/testing2');
} catch (err) {
    console.log(err);
}

fsp.rmdir('./Users/testing3').catch(err => {
    console.log(err)
});
*/

//
//To remove a folder that has contents use fs.rm() with the option { recursive: true } to recursively remove the contents.
//{ recursive: true, force: true } makes it so that exceptions will be ignored if the folder does not exist.

/*
fs.rmdir('./Public', err=>{
    console.log(err)
})
*/
//Error, cannot delete as folder is not empty, we must use fs.rm:

fs.rm('./Public', {recursive: true, force: true}, err=>{
    if(err){
        console.log(err);
    }
});