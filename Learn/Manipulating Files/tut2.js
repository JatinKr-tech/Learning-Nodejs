//Node.js File Paths

//Getting information out of a path

//You need to import node:path
//after that you will have these methods:
//--> dirname: gets the parent folder of a file
//--> basename: gets the filename part
//--> extname: gets the file extension

const path = require('node:path')

const notes = './Users/Jatin.txt';

console.log(path.dirname(notes)); //./Users
console.log(path.basename(notes)); //Jatin.txt
console.log(path.extname(notes)); //.txt

//You can get the file name without the extension by specifying a second argument to basename:

console.log(path.basename(notes, path.extname(notes))); //Jatin

//...............................

//Working with paths

//path.join():
let folderName = 'Users';

let x = path.join('./', folderName, 'Jatin.txt');
console.log(x);

const fs = require('node:fs')

console.log(fs.statSync(x) == fs.statSync('./Users/Jatin.txt')); //false, because after retrieving data from same url they are occupying different ram space (different stat objects).

//path.resolve():
//You can get the absolute path calculation of a relative path

console.log(path.resolve('Jatin.txt')); //C:\Users\jatin kumar\Learning-Nodejs\Learn\Manipulating Files\Jatin.txt
console.log(path.resolve('Utkarsh.txt')); //C:\Users\jatin kumar\Learning-Nodejs\Learn\Manipulating Files\Utkarsh.txt
console.log(path.resolve('Users', 'Saumya.txt')); //C:\Users\jatin kumar\Learning-Nodejs\Learn\Manipulating Files\Users\Saumya.txt

// If the first parameter starts with a slash, that means it's an absolute path:
console.log(path.resolve('abcd', 'Messi')); //C:\Users\jatin kumar\Learning-Nodejs\Learn\Manipulating Files\abcd\Messi
console.log(path.resolve('/abcd', 'Messi')); //C:\abcd\Messi
console.log(path.resolve('/Users', 'Messi')); //C:\Users\Messi

// path.normalize() is another useful function, that will try and calculate the actual path

console.log(path.normalize('./Users/./Jatin.txt')); //Users\Jatin.txt
console.log(path.normalize('./Users/../Jatin.txt')); //Jatin.txt
console.log(path.normalize('./Users/Jatin.txt')); //Users\Jatin.txt

//Neither resolve nor normalize will check if the path exists. They just calculate a path based on the information they got.